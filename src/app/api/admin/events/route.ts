import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuthToken } from '@/lib/auth';

/**
 * Helper to verify Admin authorization via anti-hijack JWT cookie session
 */
async function authenticateAdmin(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return null;

  const userAgent = req.headers.get('user-agent') || 'Unknown';
  const verification = await verifyAuthToken(token, userAgent);

  if (!verification.valid || !verification.payload || verification.payload.role !== 'admin') {
    return null;
  }

  return verification.payload;
}

/**
 * GET /api/admin/events
 * Admin-restricted: Paginated events list, search, status, category, and stats
 */
export async function GET(req: NextRequest) {
  try {
    const admin = await authenticateAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Forbidden: Admin access required.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '15', 10)));
    const search = searchParams.get('search')?.trim() || '';
    const status = searchParams.get('status')?.trim() || 'all';
    const category = searchParams.get('category')?.trim() || 'all';
    const offset = (page - 1) * limit;

    const conditions: string[] = ['1=1'];
    const queryParams: any[] = [];

    if (status && status !== 'all') {
      conditions.push('status = ?');
      queryParams.push(status);
    }

    if (category && category !== 'all') {
      conditions.push('category = ?');
      queryParams.push(category);
    }

    if (search) {
      conditions.push('(title_kn LIKE ? OR title_en LIKE ? OR location_kn LIKE ? OR location_en LIKE ? OR description_kn LIKE ? OR description_en LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereClause = conditions.join(' AND ');

    // Total Count
    const [countRows]: any = await pool.query(
      `SELECT COUNT(*) as totalCount FROM events WHERE ${whereClause}`,
      queryParams
    );
    const total = Number(countRows[0]?.totalCount || 0);
    const totalPages = Math.ceil(total / limit) || 1;

    // Events List
    const [events]: any = await pool.query(
      `SELECT id, title_kn, title_en, description_kn, description_en, 
              DATE_FORMAT(event_date, '%Y-%m-%d') as event_date,
              start_time, end_time, location_kn, location_en, category, status, 
              banner_url, contact_person, contact_phone, created_by, created_at, updated_at
       FROM events
       WHERE ${whereClause}
       ORDER BY event_date DESC, id DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    // High-level statistics
    const [statRows]: any = await pool.query(`
      SELECT 
        COUNT(*) as totalEvents,
        SUM(CASE WHEN status = 'upcoming' THEN 1 ELSE 0 END) as upcomingCount,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completedCount,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelledCount
      FROM events
    `);

    const stats = statRows[0] || {};

    return NextResponse.json({
      success: true,
      events,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      stats: {
        total: Number(stats.totalEvents || 0),
        upcoming: Number(stats.upcomingCount || 0),
        completed: Number(stats.completedCount || 0),
        cancelled: Number(stats.cancelledCount || 0),
      },
    });
  } catch (error: any) {
    console.error('Admin GET events error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve admin events.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/events
 * Admin-restricted: Publish a new event
 */
export async function POST(req: NextRequest) {
  try {
    const admin = await authenticateAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Forbidden: Admin access required.' }, { status: 403 });
    }

    const body = await req.json();
    const {
      title_kn,
      title_en,
      description_kn,
      description_en,
      event_date,
      start_time,
      end_time,
      location_kn,
      location_en,
      category = 'public_meeting',
      status = 'upcoming',
      banner_url,
      contact_person,
      contact_phone,
    } = body;

    // Field Validations
    if (!title_kn?.trim() || !title_en?.trim() || !event_date || !start_time?.trim() || !location_kn?.trim() || !location_en?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields (Bilingual Titles, Date, Start Time, and Bilingual Locations).' },
        { status: 400 }
      );
    }

    const [result]: any = await pool.query(
      `INSERT INTO events 
       (title_kn, title_en, description_kn, description_en, event_date, start_time, end_time, location_kn, location_en, category, status, banner_url, contact_person, contact_phone, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title_kn.trim(),
        title_en.trim(),
        description_kn?.trim() || null,
        description_en?.trim() || null,
        event_date,
        start_time.trim(),
        end_time?.trim() || null,
        location_kn.trim(),
        location_en.trim(),
        category,
        status,
        banner_url || null,
        contact_person?.trim() || null,
        contact_phone?.trim() || null,
        admin.userId,
      ]
    );

    const eventId = result.insertId;

    // Log admin audit activity
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    await pool.query(
      `INSERT INTO user_activity_logs (user_id, mobile, action, ip_address, user_agent, device_type, metadata)
       VALUES (?, ?, 'EVENT_PUBLISHED', ?, ?, 'Admin Web Console', ?)`,
      [
        admin.userId,
        admin.mobile,
        clientIp,
        req.headers.get('user-agent') || 'Unknown',
        JSON.stringify({ eventId, title_en, event_date }),
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Event published successfully.',
      eventId,
    });
  } catch (error: any) {
    console.error('Admin POST event error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to publish event.' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/events
 * Admin-restricted: Update an existing event
 */
export async function PUT(req: NextRequest) {
  try {
    const admin = await authenticateAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Forbidden: Admin access required.' }, { status: 403 });
    }

    const body = await req.json();
    const {
      id,
      title_kn,
      title_en,
      description_kn,
      description_en,
      event_date,
      start_time,
      end_time,
      location_kn,
      location_en,
      category,
      status,
      banner_url,
      contact_person,
      contact_phone,
    } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Event ID is required for update.' }, { status: 400 });
    }

    // Verify event exists
    const [existing]: any = await pool.query('SELECT id FROM events WHERE id = ?', [id]);
    if (!existing || existing.length === 0) {
      return NextResponse.json({ success: false, message: 'Event not found.' }, { status: 404 });
    }

    await pool.query(
      `UPDATE events 
       SET title_kn = ?,
           title_en = ?,
           description_kn = ?,
           description_en = ?,
           event_date = ?,
           start_time = ?,
           end_time = ?,
           location_kn = ?,
           location_en = ?,
           category = ?,
           status = ?,
           banner_url = ?,
           contact_person = ?,
           contact_phone = ?,
           updated_at = NOW()
       WHERE id = ?`,
      [
        title_kn.trim(),
        title_en.trim(),
        description_kn?.trim() || null,
        description_en?.trim() || null,
        event_date,
        start_time.trim(),
        end_time?.trim() || null,
        location_kn.trim(),
        location_en.trim(),
        category || 'public_meeting',
        status || 'upcoming',
        banner_url || null,
        contact_person?.trim() || null,
        contact_phone?.trim() || null,
        id,
      ]
    );

    // Audit log
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    await pool.query(
      `INSERT INTO user_activity_logs (user_id, mobile, action, ip_address, user_agent, device_type, metadata)
       VALUES (?, ?, 'EVENT_UPDATED', ?, ?, 'Admin Web Console', ?)`,
      [
        admin.userId,
        admin.mobile,
        clientIp,
        req.headers.get('user-agent') || 'Unknown',
        JSON.stringify({ eventId: id, title_en }),
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Event updated successfully.',
    });
  } catch (error: any) {
    console.error('Admin PUT event error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update event.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/events
 * Admin-restricted: Delete an event
 */
export async function DELETE(req: NextRequest) {
  try {
    const admin = await authenticateAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Forbidden: Admin access required.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('id');

    if (!eventId) {
      return NextResponse.json({ success: false, message: 'Event ID is required for deletion.' }, { status: 400 });
    }

    const [existing]: any = await pool.query('SELECT id, title_en FROM events WHERE id = ?', [eventId]);
    if (!existing || existing.length === 0) {
      return NextResponse.json({ success: false, message: 'Event not found.' }, { status: 404 });
    }

    await pool.query('DELETE FROM events WHERE id = ?', [eventId]);

    // Audit log
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    await pool.query(
      `INSERT INTO user_activity_logs (user_id, mobile, action, ip_address, user_agent, device_type, metadata)
       VALUES (?, ?, 'EVENT_DELETED', ?, ?, 'Admin Web Console', ?)`,
      [
        admin.userId,
        admin.mobile,
        clientIp,
        req.headers.get('user-agent') || 'Unknown',
        JSON.stringify({ eventId, title: existing[0].title_en }),
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully.',
    });
  } catch (error: any) {
    console.error('Admin DELETE event error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete event.' },
      { status: 500 }
    );
  }
}

