import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import pool from '@/lib/db';
import { 
  generateFingerprint, 
  signAuthToken, 
  logUserActivity, 
  getClientIp 
} from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let rawMobile = String(body.mobile || '').trim();
    const enteredOtp = String(body.otp || '').trim();
    const preferredLang = body.preferred_language === 'en' ? 'en' : 'kn';
    const loginType = body.loginType === 'admin' ? 'admin' : 'user';

    // Normalize phone number
    let cleanMobile = rawMobile.replace(/[\s-]/g, '');
    if (cleanMobile.startsWith('+91')) {
      cleanMobile = cleanMobile.substring(3);
    } else if (cleanMobile.startsWith('91') && cleanMobile.length === 12) {
      cleanMobile = cleanMobile.substring(2);
    }

    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid phone number format.',
          messageKn: 'ಅಮಾನ್ಯ ಫೋನ್ ಸಂಖ್ಯೆ.' 
        },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(enteredOtp)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please enter a valid 6-digit OTP code.',
          messageKn: 'ದಯವಿಟ್ಟು ಸರಿಯಾದ 6-ಅಂಕಿಯ ಒಟಿಪಿ ಕೋಡ್ ನಮೂದಿಸಿ.' 
        },
        { status: 400 }
      );
    }

    // Lookup latest active OTP for this mobile
    const [otpRecords]: any = await pool.query(
      `SELECT id, mobile, otp_code, attempts, is_used, expires_at, (expires_at < NOW()) as is_expired 
       FROM otp_verifications 
       WHERE mobile = ? AND is_used = 0 
       ORDER BY id DESC LIMIT 1`,
      [cleanMobile]
    );

    if (!otpRecords || otpRecords.length === 0) {
      await logUserActivity({
        mobile: cleanMobile,
        action: 'OTP_NOT_FOUND',
        headers: req.headers,
      });

      return NextResponse.json(
        { 
          success: false, 
          message: 'No active OTP found. Please request a new OTP.',
          messageKn: 'ಯಾವುದೇ ಸಕ್ರಿಯ ಒಟಿಪಿ ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ಹೊಸ ಒಟಿಪಿ ವಿನಂತಿಸಿ.' 
        },
        { status: 400 }
      );
    }

    const record = otpRecords[0];

    // Check expiry
    const isExpired = Boolean(record.is_expired);
    if (isExpired) {
      await pool.query('UPDATE otp_verifications SET is_used = 1 WHERE id = ?', [record.id]);
      await logUserActivity({
        mobile: cleanMobile,
        action: 'OTP_EXPIRED',
        headers: req.headers,
      });

      return NextResponse.json(
        { 
          success: false, 
          message: 'OTP has expired. Please request a new one.',
          messageKn: 'ಒಟಿಪಿ ಅವಧಿ ಮುಗಿದಿದೆ. ದಯವಿಟ್ಟು ಹೊಸದನ್ನು ವಿನಂತಿಸಿ.' 
        },
        { status: 400 }
      );
    }

    // Check attempt limits (max 5 invalid guesses)
    if (record.attempts >= 5) {
      await pool.query('UPDATE otp_verifications SET is_used = 1 WHERE id = ?', [record.id]);
      await logUserActivity({
        mobile: cleanMobile,
        action: 'OTP_MAX_ATTEMPTS_EXCEEDED',
        headers: req.headers,
      });

      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many incorrect attempts. Please request a new OTP.',
          messageKn: 'ಹೆಚ್ಚು ತಪ್ಪು ಪ್ರಯತ್ನಗಳು ನಡೆದಿವೆ. ದಯವಿಟ್ಟು ಹೊಸ ಒಟಿಪಿ ವಿನಂತಿಸಿ.' 
        },
        { status: 400 }
      );
    }

    // Verify OTP code match
    if (record.otp_code !== enteredOtp) {
      // Increment attempt count
      await pool.query(
        'UPDATE otp_verifications SET attempts = attempts + 1 WHERE id = ?',
        [record.id]
      );
      await logUserActivity({
        mobile: cleanMobile,
        action: 'OTP_INCORRECT',
        headers: req.headers,
        metadata: { attempt: record.attempts + 1 },
      });

      const remainingAttempts = 4 - record.attempts;
      return NextResponse.json(
        { 
          success: false, 
          message: `Incorrect OTP. You have ${remainingAttempts} attempts remaining.`,
          messageKn: `ತಪ್ಪು ಒಟಿಪಿ. ನಿಮಗೆ ಇನ್ನೂ ${remainingAttempts} ಪ್ರಯತ್ನಗಳು ಉಳಿದಿವೆ.` 
        },
        { status: 400 }
      );
    }

    // OTP IS VALID! Mark as used
    await pool.query('UPDATE otp_verifications SET is_used = 1 WHERE id = ?', [record.id]);

    // Find or create User
    const [existingUsers]: any = await pool.query(
      'SELECT id, mobile, role, preferred_language, status FROM users WHERE mobile = ? LIMIT 1',
      [cleanMobile]
    );

    let user: any;
    if (existingUsers && existingUsers.length > 0) {
      user = existingUsers[0];
      if (user.status === 'suspended') {
        await logUserActivity({
          userId: user.id,
          mobile: cleanMobile,
          action: 'LOGIN_BLOCKED_SUSPENDED',
          headers: req.headers,
        });

        return NextResponse.json(
          { 
            success: false, 
            message: 'Your account has been suspended. Please contact office helpline.',
            messageKn: 'ನಿಮ್ಮ ಖಾತೆಯನ್ನು ಸ್ಥಗಿತಗೊಳಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ಕಚೇರಿ ಸಹಾಯವಾಣಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.' 
          },
          { status: 403 }
        );
      }

      // Update last login & preferred language
      await pool.query(
        'UPDATE users SET last_login_at = NOW(), preferred_language = ? WHERE id = ?',
        [preferredLang, user.id]
      );
    } else {
      // First time login - auto register user
      const [insertResult]: any = await pool.query(
        `INSERT INTO users (mobile, role, preferred_language, status, last_login_at)
         VALUES (?, 'user', ?, 'active', NOW())`,
        [cleanMobile, preferredLang]
      );
      user = {
        id: insertResult.insertId,
        mobile: cleanMobile,
        role: 'user',
        preferred_language: preferredLang,
        status: 'active',
      };
    }

    // Administrator Authorization Check for Admin Logins
    const adminMobiles = (process.env.ADMIN_MOBILES || '').split(',').map((m) => m.trim()).filter(Boolean);
    const isConfiguredAdmin = adminMobiles.includes(cleanMobile);

    if (loginType === 'admin') {
      const isAdmin = user.role === 'admin' || isConfiguredAdmin;
      if (!isAdmin) {
        await logUserActivity({
          userId: user.id,
          mobile: cleanMobile,
          action: 'ADMIN_LOGIN_UNAUTHORIZED',
          headers: req.headers,
        });

        return NextResponse.json(
          {
            success: false,
            message: 'Access Denied: This mobile number is not registered as an administrator.',
            messageKn: 'ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ: ಈ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ನಿರ್ವಾಹಕರ (Admin) ಅನುಮತಿ ಇಲ್ಲ. ದಯವಿಟ್ಟು ನಾಗರಿಕ ಲಾಗಿನ್ ಬಳಸಿ.',
          },
          { status: 403 }
        );
      }

      // Promote to admin in DB if configured in ADMIN_MOBILES
      if (user.role !== 'admin' && isConfiguredAdmin) {
        await pool.query("UPDATE users SET role = 'admin' WHERE id = ?", [user.id]);
        user.role = 'admin';
      }
    }

    // Generate Session & Anti-Hijack Fingerprint
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const fingerprint = generateFingerprint(userAgent);
    const sessionId = crypto.randomUUID();
    const ipAddress = getClientIp(req.headers);

    // Insert into user_sessions (valid for 7 days)
    await pool.query(
      `INSERT INTO user_sessions (user_id, session_id, user_agent_hash, ip_address, expires_at)
       VALUES (?, ?, ?, ?, NOW() + INTERVAL 7 DAY)`,
      [user.id, sessionId, fingerprint, ipAddress]
    );

    // Sign hardened JWT
    const token = signAuthToken({
      userId: user.id,
      mobile: user.mobile,
      role: user.role,
      sessionId,
      fingerprint,
    });

    // Log successful login activity
    await logUserActivity({
      userId: user.id,
      mobile: cleanMobile,
      action: user.role === 'admin' ? 'ADMIN_LOGIN_SUCCESS' : 'LOGIN_SUCCESS',
      headers: req.headers,
      metadata: { sessionId, isNewUser: !existingUsers || existingUsers.length === 0, role: user.role },
    });

    // Create JSON response
    const isAdminUser = user.role === 'admin';
    const response = NextResponse.json({
      success: true,
      message: isAdminUser
        ? 'Admin authentication successful. Welcome Administrator!'
        : 'Authentication successful. Welcome to Citizen Portal!',
      messageKn: isAdminUser
        ? 'ನಿರ್ವಾಹಕರ ದೃಢೀಕರಣ ಯಶಸ್ವಿಯಾಗಿದೆ. ಸುಸ್ವಾಗತ!'
        : 'ದೃಢೀಕರಣ ಯಶಸ್ವಿಯಾಗಿದೆ. ನಾಗರಿಕ ಪೋರ್ಟಲ್‌ಗೆ ಸುಸ್ವಾಗತ!',
      user: {
        id: user.id,
        mobile: user.mobile,
        role: user.role,
        preferred_language: preferredLang,
      },
      redirectUrl: isAdminUser ? '/admin/dashboard' : '/portal',
    });

    // Set secure HTTP-Only cookie
    const isProd = process.env.NODE_ENV === 'production';
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return response;
  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error during OTP verification: ' + (error?.message || ''),
        messageKn: 'ಒಟಿಪಿ ಪರಿಶೀಲನೆಯಲ್ಲಿ ಸರ್ವರ್ ದೋಷ ಉಂಟಾಗಿದೆ.' 
      },
      { status: 500 }
    );
  }
}
