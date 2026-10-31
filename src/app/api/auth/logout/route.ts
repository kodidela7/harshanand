import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuthToken, logUserActivity } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;

    if (token) {
      const userAgent = req.headers.get('user-agent') || 'Unknown';
      const verification = await verifyAuthToken(token, userAgent);

      if (verification.payload?.sessionId) {
        // Revoke session in DB
        await pool.query(
          'UPDATE user_sessions SET is_revoked = 1 WHERE session_id = ?',
          [verification.payload.sessionId]
        );

        // Log logout activity
        await logUserActivity({
          userId: verification.payload.userId,
          mobile: verification.payload.mobile,
          action: 'LOGOUT',
          headers: req.headers,
          metadata: { sessionId: verification.payload.sessionId },
        });
      }
    }

    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
      messageKn: 'ಯಶಸ್ವಿಯಾಗಿ ನಿರ್ಗಮಿಸಲಾಗಿದೆ',
    });

    // Clear auth cookie
    response.cookies.set('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (error: any) {
    console.error('Error during logout:', error);
    const response = NextResponse.json(
      { success: false, message: 'Error processing logout' },
      { status: 500 }
    );
    response.cookies.delete('auth_token');
    return response;
  }
}

