import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuthToken } from '@/lib/auth';

/**
 * POST /api/contact - Public contact & farmer inquiry form submission
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      location = 'Aland, Kalaburagi',
      message,
      source = 'contact_page',
    } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, phone number, and message are required.' },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '').slice(-10);

    const [result]: any = await pool.query(
      `INSERT INTO contact_messages (name, email, phone, location, message, source, status)
       VALUES (?, ?, ?, ?, ?, ?, 'new')`,
      [
        name.trim(),
        email ? email.trim() : null,
        cleanPhone || phone.trim(),
        location.trim(),
        message.trim(),
        source,
      ]
    );

    return NextResponse.json({
      success: true,
      message_id: result.insertId,
      message: 'Your message has been received by our secretariat.',
    });
  } catch (error: any) {
    console.error('Error saving contact message:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact - Admin view of contact messages
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
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const [rows]: any = await pool.query(
      `SELECT id, name, email, phone, location, message, source, status, admin_notes,
              DATE_FORMAT(created_at, '%d %b %Y, %h:%i %p') as created_at_formatted,
              created_at
       FROM contact_messages
       ORDER BY created_at DESC
       LIMIT 50`
    );

    return NextResponse.json({
      success: true,
      messages: rows || [],
      total: rows.length,
    });
  } catch (error: any) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve messages.' },
      { status: 500 }
    );
  }
}

