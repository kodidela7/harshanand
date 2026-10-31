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
      conditions.push('(mobile LIKE ? OR name LIKE ? OR role LIKE ? OR status LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereClause = conditions.join(' AND ');

    const [countRows]: any = await pool.query(
      `SELECT COUNT(*) as totalCount FROM users WHERE ${whereClause}`,
      queryParams
    );
    const total = Number(countRows[0]?.totalCount || 0);
    const totalPages = Math.ceil(total / limit) || 1;

    const [users]: any = await pool.query(
      `SELECT id, mobile, name, role, preferred_language, status, last_login_at, created_at, updated_at
       FROM users
       WHERE ${whereClause}
       ORDER BY id DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

