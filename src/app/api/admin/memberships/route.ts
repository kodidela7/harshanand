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
      return NextResponse.json({ success: false, message: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '15', 10)));
    const search = searchParams.get('search')?.trim() || '';
    const status = searchParams.get('status')?.trim() || 'all';
    const offset = (page - 1) * limit;

    const conditions: string[] = ['1=1'];
    const queryParams: any[] = [];

    if (status && status !== 'all') {
      conditions.push('status = ?');
      queryParams.push(status);
    }

    if (search) {
      conditions.push('(full_name LIKE ? OR mobile LIKE ? OR village LIKE ? OR taluk LIKE ? OR membership_id LIKE ? OR interest LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereClause = conditions.join(' AND ');

    // 1. Total count
    const [countRows]: any = await pool.query(
      `SELECT COUNT(*) as totalCount FROM memberships WHERE ${whereClause}`,
      queryParams
    );
    const total = Number(countRows[0]?.totalCount || 0);
    const totalPages = Math.ceil(total / limit) || 1;

    // 2. Paginated rows
    const [memberships]: any = await pool.query(
      `SELECT * FROM memberships 
       WHERE ${whereClause} 
       ORDER BY id DESC 
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    // 3. Overall stats
    const [statsRows]: any = await pool.query(`
      SELECT 
        COUNT(*) as totalMembers,
        SUM(CASE WHEN taluk LIKE '%Aland%' OR taluk LIKE '%ಆಳಂದ%' THEN 1 ELSE 0 END) as alandMembers,
        SUM(CASE WHEN created_at >= NOW() - INTERVAL 7 DAY THEN 1 ELSE 0 END) as recentMembers
      FROM memberships
    `);

    return NextResponse.json({
      success: true,
      memberships,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      stats: {
        totalMembers: Number(statsRows[0]?.totalMembers || 0),
        alandMembers: Number(statsRows[0]?.alandMembers || 0),
        recentMembers: Number(statsRows[0]?.recentMembers || 0),
      },
    });
  } catch (error: any) {
    console.error('Error fetching admin memberships:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

