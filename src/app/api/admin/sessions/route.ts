import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuthToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const verification = await verifyAuthToken(token, userAgent);

    if (!verification.valid || !verification.payload || verification.payload.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '15', 10)));
    const search = searchParams.get('search')?.trim() || '';
    const offset = (page - 1) * limit;

    const conditions: string[] = ['1=1'];
    const queryParams: any[] = [];

    if (search) {
      conditions.push('(u.mobile LIKE ? OR s.session_id LIKE ? OR s.ip_address LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereClause = conditions.join(' AND ');

    const [countRows]: any = await pool.query(
      `SELECT COUNT(*) as totalCount
       FROM user_sessions s
       LEFT JOIN users u ON s.user_id = u.id
       WHERE ${whereClause}`,
      queryParams
    );
    const total = Number(countRows[0]?.totalCount || 0);
    const totalPages = Math.ceil(total / limit) || 1;

    const [sessions]: any = await pool.query(
      `SELECT s.id, s.user_id, s.session_id, s.ip_address, s.is_revoked, s.expires_at, s.created_at,
              u.mobile, u.role, (s.expires_at < NOW()) as is_expired
       FROM user_sessions s
       LEFT JOIN users u ON s.user_id = u.id
       WHERE ${whereClause}
       ORDER BY s.id DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    return NextResponse.json({
      success: true,
      sessions,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error: any) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

