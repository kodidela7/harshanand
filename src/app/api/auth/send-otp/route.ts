import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import pool from '@/lib/db';
import { logUserActivity } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let rawMobile = String(body.mobile || '').trim();

    // Clean phone number: remove spaces, dashes, +91 prefix
    let cleanMobile = rawMobile.replace(/[\s-]/g, '');
    if (cleanMobile.startsWith('+91')) {
      cleanMobile = cleanMobile.substring(3);
    } else if (cleanMobile.startsWith('91') && cleanMobile.length === 12) {
      cleanMobile = cleanMobile.substring(2);
    } else if (cleanMobile.startsWith('0') && cleanMobile.length === 11) {
      cleanMobile = cleanMobile.substring(1);
    }

    // Validate 10-digit Indian mobile number
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid mobile number. Please enter a valid 10-digit Indian phone number.',
          messageKn: 'ಅಮಾನ್ಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ. ದಯವಿಟ್ಟು ಸರಿಯಾದ 10-ಅಂಕಿಯ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.' 
        },
        { status: 400 }
      );
    }

    // Rate Limiting: Check OTP requests in last 10 minutes
    const [rateCheck]: any = await pool.query(
      `SELECT COUNT(*) as count FROM otp_verifications 
       WHERE mobile = ? AND created_at > (NOW() - INTERVAL 10 MINUTE)`,
      [cleanMobile]
    );

    if (rateCheck[0]?.count >= 6) {
      await logUserActivity({
        mobile: cleanMobile,
        action: 'OTP_RATE_LIMITED',
        headers: req.headers,
        metadata: { attemptsIn10Min: rateCheck[0].count },
      });

      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many OTP requests. Please wait 10 minutes before trying again.',
          messageKn: 'ಹೆಚ್ಚಿನ ಒಟಿಪಿ ವಿನಂತಿಗಳು ಬಂದಿವೆ. ದಯವಿಟ್ಟು 10 ನಿಮಿಷಗಳ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.' 
        },
        { status: 429 }
      );
    }

    // Invalidate existing unused OTPs for this mobile
    await pool.query(
      `UPDATE otp_verifications SET is_used = 1 
       WHERE mobile = ? AND is_used = 0`,
      [cleanMobile]
    );

    // Generate secure 6-digit numeric OTP
    const generatedOtp = crypto.randomInt(100000, 999999).toString();
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const forwarded = req.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    // Store in DB with 5-minute expiry
    await pool.query(
      `INSERT INTO otp_verifications (mobile, otp_code, expires_at, is_used, attempts, ip_address, user_agent)
       VALUES (?, ?, NOW() + INTERVAL 5 MINUTE, 0, 0, ?, ?)`,
      [cleanMobile, generatedOtp, ipAddress, userAgent]
    );

    // Log user activity
    await logUserActivity({
      mobile: cleanMobile,
      action: 'OTP_REQUESTED',
      headers: req.headers,
      metadata: { method: 'internal_dev_generation', expiresIn: '5m' },
    });

    // Return success response. As requested, we provide devOtp in the response for now.
    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully to +91 ' + cleanMobile,
      messageKn: '+91 ' + cleanMobile + ' ಗೆ ಒಟಿಪಿ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ',
      mobile: cleanMobile,
      expiresInSeconds: 300,
      devOtp: generatedOtp, // Internal generation until SMS provider is integrated
    });
  } catch (error: any) {
    console.error('Error in send-otp API:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error while generating OTP: ' + (error?.message || ''),
        messageKn: 'ಒಟಿಪಿ ರಚಿಸುವಾಗ ಸರ್ವರ್ ದೋಷ ಉಂಟಾಗಿದೆ.' 
      },
      { status: 500 }
    );
  }
}

