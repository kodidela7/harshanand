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

    if (!verification.valid || !verification.payload) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    // Role check: Only admin can access user activity logs
    if (verification.payload.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Access denied: Administrator privileges required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '15', 10)));
    const search = searchParams.get('search')?.trim() || '';
    const filter = searchParams.get('filter')?.trim() || 'all';
    const offset = (page - 1) * limit;

    // Build WHERE clause
    const conditions: string[] = ['1=1'];
    const queryParams: any[] = [];

    // Filter categorization
    if (filter === 'completed' || filter === 'login') {
      conditions.push('(l.action LIKE ? OR l.action LIKE ?)');
      queryParams.push('%LOGIN%', '%SUCCESS%');
    } else if (filter === 'otp') {
      conditions.push('l.action LIKE ?');
      queryParams.push('%OTP%');
    } else if (filter === 'logout') {
      conditions.push('l.action LIKE ?');
      queryParams.push('%LOGOUT%');
    } else if (filter === 'security') {
      conditions.push('(l.action LIKE ? OR l.action LIKE ? OR l.action LIKE ? OR l.action LIKE ?)');
      queryParams.push('%ALERT%', '%HIJACK%', '%UNAUTHORIZED%', '%BLOCKED%');
    }

    // Search query across mobile, action, IP, device, and ID
    if (search) {
      conditions.push('(l.mobile LIKE ? OR l.action LIKE ? OR l.ip_address LIKE ? OR l.device_type LIKE ? OR CAST(l.id AS CHAR) LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereClause = conditions.join(' AND ');

    // 1. Get total matching count for pagination
    const countSql = `
      SELECT COUNT(*) as totalCount
      FROM user_activity_logs l
      WHERE ${whereClause}
    `;
    const [countRows]: any = await pool.query(countSql, queryParams);
    const total = Number(countRows[0]?.totalCount || 0);
    const totalPages = Math.ceil(total / limit) || 1;

    // 2. Query paginated logs with user details
    const logsSql = `
      SELECT l.id, l.user_id, l.mobile, l.action, l.ip_address, l.device_type, l.user_agent, l.metadata, l.created_at,
             u.name as user_name, u.role as user_role
      FROM user_activity_logs l
      LEFT JOIN users u ON l.user_id = u.id
      WHERE ${whereClause}
      ORDER BY l.id DESC
      LIMIT ? OFFSET ?
    `;
    const paginatedParams = [...queryParams, limit, offset];
    const [logs]: any = await pool.query(logsSql, paginatedParams);

    // 3. Quick aggregate statistics
    const [statsRows]: any = await pool.query(`
      SELECT 
        COUNT(*) as totalLogs,
        SUM(CASE WHEN action LIKE '%LOGIN_SUCCESS%' THEN 1 ELSE 0 END) as loginSuccess,
        SUM(CASE WHEN action LIKE '%OTP%' THEN 1 ELSE 0 END) as otpCount,
        SUM(CASE WHEN action LIKE '%UNAUTHORIZED%' OR action LIKE '%ALERT%' OR action LIKE '%HIJACK%' THEN 1 ELSE 0 END) as securityAlerts
      FROM user_activity_logs
    `);

    return NextResponse.json({
      success: true,
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      stats: {
        totalLogs: Number(statsRows[0]?.totalLogs || 0),
        loginSuccess: Number(statsRows[0]?.loginSuccess || 0),
        otpCount: Number(statsRows[0]?.otpCount || 0),
        securityAlerts: Number(statsRows[0]?.securityAlerts || 0),
      },
    });
  } catch (error: any) {
    console.error('Error fetching activity logs:', error);
    return NextResponse.json(
      { success: false, message: 'Error retrieving activity logs: ' + error.message },
      { status: 500 }
    );
  }
}
