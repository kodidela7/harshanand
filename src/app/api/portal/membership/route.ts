import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuthToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized session' }, { status: 401 });
    }

    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const verification = await verifyAuthToken(token, userAgent);

    if (!verification.valid || !verification.payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid or hijacked session token' },
        { status: 401 }
      );
    }

    // Get user details directly from verified JWT payload (secure anti-hijack)
    const { userId, mobile } = verification.payload;

    if (!mobile) {
      return NextResponse.json({ success: false, message: 'User identification missing in token' }, { status: 400 });
    }

    // Query MySQL for this citizen's membership record
    const [membershipRows]: any = await pool.query(
      `SELECT m.*, u.preferred_language, u.status as user_status
       FROM memberships m
       LEFT JOIN users u ON m.mobile = u.mobile
       WHERE m.mobile = ? OR m.user_id = ?
       LIMIT 1`,
      [mobile, userId || 0]
    );

    if (membershipRows.length === 0) {
      return NextResponse.json({
        success: true,
        hasMembership: false,
        user: {
          id: userId,
          mobile,
        },
      });
    }

    const membership = membershipRows[0];

    return NextResponse.json({
      success: true,
      hasMembership: true,
      membership: {
        id: membership.id,
        membership_id: membership.membership_id,
        full_name: membership.full_name,
        mobile: membership.mobile,
        email: membership.email,
        age: membership.age,
        village: membership.village,
        taluk: membership.taluk,
        district: membership.district,
        pincode: membership.pincode,
        interest: membership.interest,
        suggestion: membership.suggestion,
        status: membership.status,
        created_at: membership.created_at,
      },
    });
  } catch (error: any) {
    console.error('Error fetching portal membership:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

