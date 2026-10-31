import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuthToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      full_name,
      mobile,
      email,
      age,
      village,
      taluk,
      district,
      pincode,
      interest,
      suggestion,
      consent_info_correct,
      consent_contact,
    } = body;

    // Validation
    if (!full_name || !mobile || !village || !taluk || !district || !pincode || !interest) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required membership fields.' },
        { status: 400 }
      );
    }

    const cleanMobile = mobile.replace(/\D/g, '').slice(-10);
    if (cleanMobile.length !== 10) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid 10-digit mobile number.' },
        { status: 400 }
      );
    }

    if (!consent_info_correct) {
      return NextResponse.json(
        { success: false, message: 'Please accept the declaration of information accuracy.' },
        { status: 400 }
      );
    }

    // Check if user is currently logged in via JWT
    let userId: number | null = null;
    const token = req.cookies.get('auth_token')?.value;
    if (token) {
      const userAgent = req.headers.get('user-agent') || 'Unknown';
      const verification = await verifyAuthToken(token, userAgent);
      if (verification.valid && verification.payload) {
        userId = verification.payload.userId || null;
      }
    }

    // Check if membership already exists for this mobile
    const [existingRows]: any = await pool.query(
      'SELECT id, membership_id, full_name FROM memberships WHERE mobile = ? LIMIT 1',
      [cleanMobile]
    );

    if (existingRows.length > 0) {
      return NextResponse.json({
        success: true,
        alreadyRegistered: true,
        membership_id: existingRows[0].membership_id,
        message: `Already registered as a member with ID: ${existingRows[0].membership_id}`,
      });
    }

    // Generate unique membership ID: HG-MEM-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const membershipId = `HG-MEM-2026-${randomSuffix}`;

    // Insert into MySQL
    await pool.query(
      `INSERT INTO memberships 
       (membership_id, user_id, full_name, mobile, email, age, village, taluk, district, pincode, interest, suggestion, consent_info_correct, consent_contact, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
      [
        membershipId,
        userId,
        full_name.trim(),
        cleanMobile,
        email ? email.trim() : null,
        age ? Number(age) : null,
        village.trim(),
        taluk.trim(),
        district.trim(),
        pincode.trim(),
        interest.trim(),
        suggestion ? suggestion.trim() : null,
        consent_info_correct ? 1 : 0,
        consent_contact ? 1 : 0,
      ]
    );

    // Also update or insert user into `users` table so they can log in via OTP
    const [userRows]: any = await pool.query('SELECT id FROM users WHERE mobile = ? LIMIT 1', [cleanMobile]);
    if (userRows.length === 0) {
      await pool.query(
        'INSERT INTO users (mobile, name, role, preferred_language, status) VALUES (?, ?, ?, ?, ?)',
        [cleanMobile, full_name.trim(), 'user', 'kn', 'active']
      );
    } else {
      await pool.query('UPDATE users SET name = ? WHERE mobile = ? AND (name IS NULL OR name = "")', [
        full_name.trim(),
        cleanMobile,
      ]);
    }

    // Log this action in user_activity_logs
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    await pool.query(
      `INSERT INTO user_activity_logs (user_id, mobile, action, ip_address, user_agent, device_type, metadata)
       VALUES (?, ?, 'MEMBERSHIP_REGISTERED', ?, ?, 'Web', ?)`,
      [userId, cleanMobile, ip, userAgent, JSON.stringify({ membershipId, village, interest })]
    );

    return NextResponse.json({
      success: true,
      membership_id: membershipId,
      message: 'Membership registered successfully!',
    });
  } catch (error: any) {
    console.error('Error registering membership:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit registration: ' + error.message },
      { status: 500 }
    );
  }
}

