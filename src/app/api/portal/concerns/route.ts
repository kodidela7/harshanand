import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuthToken } from '@/lib/auth';

/**
 * GET /api/portal/concerns - Returns the authenticated citizen's submitted concerns
 */
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized session' }, { status: 401 });
    }

    const userAgent = req.headers.get('user-agent') || '';
    const auth = await verifyAuthToken(token, userAgent);
    if (!auth.valid || !auth.payload) {
      return NextResponse.json({ success: false, message: 'Invalid or expired session' }, { status: 401 });
    }

    const { userId, mobile } = auth.payload;
    const cleanMobile = mobile ? mobile.replace(/[^0-9]/g, '').slice(-10) : '';

    const [rows]: any = await pool.query(
      `SELECT id, tracking_id, citizen_name, mobile, email, category, urgency, 
              village, village as village_name, taluk, district, pincode, title, description, 
              status, assigned_to, admin_remarks,
              DATE_FORMAT(resolved_at, '%d %b %Y, %h:%i %p') as resolved_at_formatted,
              DATE_FORMAT(created_at, '%d %b %Y, %h:%i %p') as created_at_formatted,
              DATE_FORMAT(updated_at, '%d %b %Y, %h:%i %p') as updated_at_formatted,
              created_at, updated_at
       FROM concerns
       WHERE user_id = ? OR mobile = ?
       ORDER BY created_at DESC`,
      [userId || 0, cleanMobile]
    );

    // Also fetch any farmer consultations or contact requests submitted with this mobile number
    const [farmerRows]: any = await pool.query(
      `SELECT id, name, email, phone, location, message, source, status, admin_notes,
              DATE_FORMAT(created_at, '%d %b %Y, %h:%i %p') as created_at_formatted,
              created_at
       FROM contact_messages
       WHERE phone = ? OR phone LIKE ?
       ORDER BY created_at DESC`,
      [cleanMobile, `%${cleanMobile}`]
    );

    return NextResponse.json({
      success: true,
      concerns: rows || [],
      farmerRequests: farmerRows || [],
      totalConcerns: rows.length,
      totalFarmerRequests: farmerRows.length,
      total: rows.length + farmerRows.length,
    });
  } catch (error: any) {
    console.error('Error fetching citizen concerns:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve concerns.' },
      { status: 500 }
    );
  }
}

