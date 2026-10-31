import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuthToken } from '@/lib/auth';

/**
 * GET /api/admin/contact - Paginated and filtered contact & farmer messages
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
      return NextResponse.json({ success: false, message: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
    const search = searchParams.get('search')?.trim() || '';
    const status = searchParams.get('status') || 'all';
    const source = searchParams.get('source') || 'all';

    const conditions: string[] = [];
    const params: any[] = [];

    if (status && status !== 'all') {
      conditions.push('status = ?');
      params.push(status);
    }

    if (source && source !== 'all') {
      if (source === 'general' || source === 'enquiries') {
        conditions.push("source IN ('contact_page', 'newsletter')");
      } else {
        conditions.push('source = ?');
        params.push(source);
      }
    }

    if (search) {
      conditions.push('(name LIKE ? OR phone LIKE ? OR location LIKE ? OR message LIKE ?)');
      const wild = `%${search}%`;
      params.push(wild, wild, wild, wild);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Total count for current filter
    const [countResult]: any = await pool.query(
      `SELECT COUNT(*) as total FROM contact_messages ${whereClause}`,
      params
    );
    const total = countResult[0]?.total || 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const offset = (page - 1) * limit;

    // Fetch messages with pagination
    const [messages]: any = await pool.query(
      `SELECT id, name, email, phone, location, message, source, status, admin_notes,
              DATE_FORMAT(created_at, '%d %b %Y, %h:%i %p') as created_at_formatted,
              created_at
       FROM contact_messages
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    // Global Stats for Sub-bar summary
    const [statsRows]: any = await pool.query(
      `SELECT 
         COUNT(*) as total,
         SUM(CASE WHEN source = 'farmers_page' THEN 1 ELSE 0 END) as farmers,
         SUM(CASE WHEN source = 'contact_page' THEN 1 ELSE 0 END) as contact,
         SUM(CASE WHEN source = 'newsletter' THEN 1 ELSE 0 END) as newsletter,
         SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as newCount,
         SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as inProgressCount,
         SUM(CASE WHEN status = 'contacted' THEN 1 ELSE 0 END) as contactedCount,
         SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as resolvedCount
       FROM contact_messages`
    );

    const stats = statsRows[0] || {
      total: 0,
      farmers: 0,
      contact: 0,
      newsletter: 0,
      newCount: 0,
      inProgressCount: 0,
      contactedCount: 0,
      resolvedCount: 0,
    };

    return NextResponse.json({
      success: true,
      messages: messages || [],
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      stats,
    });
  } catch (error: any) {
    console.error('Error fetching admin contact messages:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve messages.' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/contact - Admin update contact status & notes
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
      return NextResponse.json({ success: false, message: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { id, status, admin_notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'Message ID and status are required.' },
        { status: 400 }
      );
    }

    const allowedStatuses = ['new', 'in_progress', 'contacted', 'resolved'];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status provided.' },
        { status: 400 }
      );
    }

    await pool.query(
      `UPDATE contact_messages 
       SET status = ?, admin_notes = ? 
       WHERE id = ?`,
      [status, admin_notes ? admin_notes.trim() : null, id]
    );

    // Audit trail
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    await pool.query(
      `INSERT INTO user_activity_logs (user_id, mobile, action, ip_address, device_type, user_agent, metadata)
       VALUES (?, ?, 'ADMIN_UPDATE_CONTACT_STATUS', ?, 'desktop', ?, ?)`,
      [
        auth.payload.userId || null,
        auth.payload.mobile,
        ip,
        userAgent,
        JSON.stringify({ message_id: id, status, admin_notes }),
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Contact request updated successfully.',
    });
  } catch (error: any) {
    console.error('Error updating contact message:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update contact request.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/contact - Admin delete contact message
 */
export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userAgent = req.headers.get('user-agent') || '';
    const auth = await verifyAuthToken(token, userAgent);
    if (!auth.valid || !auth.payload || auth.payload.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Message ID is required' }, { status: 400 });
    }

    await pool.query('DELETE FROM contact_messages WHERE id = ?', [id]);

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    await pool.query(
      `INSERT INTO user_activity_logs (user_id, mobile, action, ip_address, device_type, user_agent, metadata)
       VALUES (?, ?, 'ADMIN_DELETE_CONTACT_MESSAGE', ?, 'desktop', ?, ?)`,
      [auth.payload.userId || null, auth.payload.mobile, ip, userAgent, JSON.stringify({ message_id: id })]
    );

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully.',
    });
  } catch (error: any) {
    console.error('Error deleting contact message:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete message.' },
      { status: 500 }
    );
  }
}

