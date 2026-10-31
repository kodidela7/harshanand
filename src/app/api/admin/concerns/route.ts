import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuthToken } from '@/lib/auth';

/**
 * GET /api/admin/concerns - Admin list of all citizen grievances & concerns
 */
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userAgent = req.headers.get('user-agent') || '';
    const auth = await verifyAuthToken(token, userAgent);
    if (!auth.valid || !auth.payload || auth.payload.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '15', 10)));
    const offset = (page - 1) * limit;

    const status = searchParams.get('status')?.trim() || '';
    const category = searchParams.get('category')?.trim() || '';
    const search = searchParams.get('search')?.trim() || '';

    const conditions: string[] = ['1=1'];
    const params: any[] = [];

    if (status && status !== 'all') {
      conditions.push('status = ?');
      params.push(status);
    }

    if (category && category !== 'all') {
      conditions.push('category = ?');
      params.push(category);
    }

    if (search) {
      conditions.push('(tracking_id LIKE ? OR citizen_name LIKE ? OR mobile LIKE ? OR village LIKE ? OR title LIKE ?)');
      const wild = `%${search}%`;
      params.push(wild, wild, wild, wild, wild);
    }

    const whereClause = conditions.join(' AND ');

    // Total count for current filter
    const [countRows]: any = await pool.query(
      `SELECT COUNT(*) as total FROM concerns WHERE ${whereClause}`,
      params
    );
    const total = countRows[0]?.total || 0;

    // Aggregate stats by status
    const [statsRows]: any = await pool.query(
      `SELECT 
         COUNT(*) as total_all,
         SUM(CASE WHEN status = 'submitted' THEN 1 ELSE 0 END) as count_submitted,
         SUM(CASE WHEN status = 'under_review' THEN 1 ELSE 0 END) as count_under_review,
         SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as count_in_progress,
         SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as count_resolved,
         SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as count_rejected
       FROM concerns`
    );

    // Fetch paginated concerns
    const [concerns]: any = await pool.query(
      `SELECT id, tracking_id, user_id, citizen_name, mobile, email, category, urgency, 
              village, taluk, district, pincode, title, description, 
              status, assigned_to, admin_remarks,
              DATE_FORMAT(resolved_at, '%d %b %Y, %h:%i %p') as resolved_at_formatted,
              DATE_FORMAT(created_at, '%d %b %Y, %h:%i %p') as created_at_formatted,
              DATE_FORMAT(updated_at, '%d %b %Y, %h:%i %p') as updated_at_formatted,
              created_at, updated_at
       FROM concerns
       WHERE ${whereClause}
       ORDER BY (urgency = 'urgent') DESC, (urgency = 'high') DESC, created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return NextResponse.json({
      success: true,
      concerns: concerns || [],
      stats: statsRows[0] || {
        total_all: total,
        count_submitted: 0,
        count_under_review: 0,
        count_in_progress: 0,
        count_resolved: 0,
        count_rejected: 0,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error: any) {
    console.error('Error fetching admin concerns:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve concerns.' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/concerns - Admin update concern status, remarks, and department assignment
 */
export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userAgent = req.headers.get('user-agent') || '';
    const auth = await verifyAuthToken(token, userAgent);
    if (!auth.valid || !auth.payload || auth.payload.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }

    const body = await req.json();
    const { id, status, admin_remarks, assigned_to, urgency } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Concern ID is required.' }, { status: 400 });
    }

    const validStatuses = ['submitted', 'under_review', 'in_progress', 'resolved', 'rejected'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ success: false, message: 'Invalid status value.' }, { status: 400 });
    }

    // Check existing
    const [existingRows]: any = await pool.query(
      'SELECT id, tracking_id, mobile, status FROM concerns WHERE id = ?',
      [id]
    );
    if (existingRows.length === 0) {
      return NextResponse.json({ success: false, message: 'Concern not found.' }, { status: 404 });
    }
    const prevConcern = existingRows[0];

    const isResolved = status === 'resolved';

    await pool.query(
      `UPDATE concerns 
       SET status = COALESCE(?, status),
           admin_remarks = COALESCE(?, admin_remarks),
           assigned_to = COALESCE(?, assigned_to),
           urgency = COALESCE(?, urgency),
           resolved_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE resolved_at END,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        status || null,
        admin_remarks !== undefined ? admin_remarks : null,
        assigned_to !== undefined ? assigned_to : null,
        urgency || null,
        isResolved ? 1 : 0,
        id,
      ]
    );

    // Audit Log
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    await pool.query(
      `INSERT INTO user_activity_logs (user_id, mobile, action, metadata, ip_address, user_agent)
       VALUES (?, ?, 'CONCERN_STATUS_UPDATED', ?, ?, ?)`,
      [
        auth.payload.userId,
        auth.payload.mobile,
        JSON.stringify({
          concern_id: id,
          tracking_id: prevConcern.tracking_id,
          citizen_mobile: prevConcern.mobile,
          old_status: prevConcern.status,
          new_status: status || prevConcern.status,
          assigned_to,
        }),
        clientIp,
        userAgent,
      ]
    );

    return NextResponse.json({
      success: true,
      message: `Concern ${prevConcern.tracking_id} updated successfully.`,
    });
  } catch (error: any) {
    console.error('Error updating concern status:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update concern status.' },
      { status: 500 }
    );
  }
}

