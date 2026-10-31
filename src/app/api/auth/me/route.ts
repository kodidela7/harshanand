import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuthToken, logUserActivity } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false, message: 'No authentication token found' },
        { status: 401 }
      );
    }

    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const verification = await verifyAuthToken(token, userAgent);

    if (!verification.valid || !verification.payload) {
      // If hijack attempt was detected, log a security alert
      if (verification.reason?.includes('HIJACK_DETECTED')) {
        await logUserActivity({
          mobile: 'UNKNOWN',
          action: 'SECURITY_ALERT_HIJACK_ATTEMPT',
          headers: req.headers,
          metadata: { reason: verification.reason },
        });
      }

      // Clear invalid cookie
      const response = NextResponse.json(
        { 
          authenticated: false, 
          message: verification.reason || 'Session expired or invalid token' 
        },
        { status: 401 }
      );
      response.cookies.delete('auth_token');
      return response;
    }

    // Fetch user from DB
    const [rows]: any = await pool.query(
      `SELECT id, mobile, name, role, preferred_language, status, last_login_at, created_at 
       FROM users WHERE id = ? LIMIT 1`,
      [verification.payload.userId]
    );

    if (!rows || rows.length === 0 || rows[0].status === 'suspended') {
      const response = NextResponse.json(
        { authenticated: false, message: 'User not found or account suspended' },
        { status: 401 }
      );
      response.cookies.delete('auth_token');
      return response;
    }

    const user = rows[0];

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        mobile: user.mobile,
        name: user.name,
        role: user.role,
        preferred_language: user.preferred_language,
        last_login_at: user.last_login_at,
        created_at: user.created_at,
      },
      sessionId: verification.payload.sessionId,
    });
  } catch (error: any) {
    console.error('Error in /api/auth/me:', error);
    return NextResponse.json(
      { authenticated: false, message: 'Server error checking authentication' },
      { status: 500 }
    );
  }
}
