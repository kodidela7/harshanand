import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuthToken } from '@/lib/auth';

/**
 * POST /api/concerns - Submit a citizen concern / grievance
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      citizen_name,
      mobile,
      email,
      category,
      urgency = 'normal',
      village,
      village_name,
      taluk = 'Aland',
      district = 'Kalaburagi',
      pincode = '585302',
      title,
      description,
    } = body;

    const resolvedVillage = (village || village_name || '').trim();

    if (!citizen_name || !mobile || !category || !resolvedVillage || !title || !description) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all mandatory fields (Name, Mobile, Category, Village, Title, Description).' },
        { status: 400 }
      );
    }

    const cleanMobile = mobile.replace(/[^0-9]/g, '').slice(-10);
    if (cleanMobile.length !== 10) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid 10-digit mobile number.' },
        { status: 400 }
      );
    }

    // Optional user identification from JWT session
    let userId: number | null = null;
    const token = req.cookies.get('auth_token')?.value;
    if (token) {
      const userAgent = req.headers.get('user-agent') || '';
      const auth = await verifyAuthToken(token, userAgent);
      if (auth.valid && auth.payload) {
        userId = auth.payload.userId || null;
      }
    }

    // Generate unique Tracking ID: HG-GRV-2026-XXXX
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `HG-GRV-2026-${randomDigits}`;

    const [result]: any = await pool.query(
      `INSERT INTO concerns 
       (tracking_id, user_id, citizen_name, mobile, email, category, urgency, village, taluk, district, pincode, title, description, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'submitted')`,
      [
        trackingId,
        userId,
        citizen_name.trim(),
        cleanMobile,
        email ? email.trim() : null,
        category,
        urgency,
        resolvedVillage,
        taluk.trim(),
        district.trim(),
        pincode.trim(),
        title.trim(),
        description.trim(),
      ]
    );

    // Audit log
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    await pool.query(
      `INSERT INTO user_activity_logs (user_id, mobile, action, metadata, ip_address, user_agent)
       VALUES (?, ?, 'CONCERN_SUBMITTED', ?, ?, ?)`,
      [
        userId,
        cleanMobile,
        JSON.stringify({ tracking_id: trackingId, category, urgency, village: resolvedVillage }),
        clientIp,
        req.headers.get('user-agent') || 'Citizen Client'
      ]
    );

    return NextResponse.json({
      success: true,
      tracking_id: trackingId,
      concern_id: result.insertId,
      message: 'Concern submitted successfully.',
    });
  } catch (error: any) {
    console.error('Error submitting concern:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to record concern. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/concerns?tracking_id=HG-GRV-2026-XXXX - Public or Citizen tracking lookup
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const trackingId = searchParams.get('tracking_id')?.trim();

    if (!trackingId) {
      return NextResponse.json(
        { success: false, message: 'Tracking ID is required.' },
        { status: 400 }
      );
    }

    const [rows]: any = await pool.query(
      `SELECT id, tracking_id, citizen_name, category, urgency, village, taluk, title, description, 
              status, assigned_to, admin_remarks, resolved_at, created_at, updated_at
       FROM concerns
       WHERE tracking_id = ?
       LIMIT 1`,
      [trackingId]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No concern found with the provided Tracking ID.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      concern: rows[0],
    });
  } catch (error: any) {
    console.error('Error fetching concern:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to lookup concern.' },
      { status: 500 }
    );
  }
}

