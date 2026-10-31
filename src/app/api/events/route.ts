import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
    const search = searchParams.get('search')?.trim() || '';
    const status = searchParams.get('status')?.trim() || 'all';
    const category = searchParams.get('category')?.trim() || 'all';
    const offset = (page - 1) * limit;

    const conditions: string[] = ['1=1'];
    const queryParams: any[] = [];

    // Filter by status if specified
    if (status && status !== 'all') {
      conditions.push('status = ?');
      queryParams.push(status);
    }

    // Filter by category if specified
    if (category && category !== 'all') {
      conditions.push('category = ?');
      queryParams.push(category);
    }

    // Search query parameter
    if (search) {
      conditions.push('(title_kn LIKE ? OR title_en LIKE ? OR description_kn LIKE ? OR description_en LIKE ? OR location_kn LIKE ? OR location_en LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereClause = conditions.join(' AND ');

    // Total count for pagination
    const [countRows]: any = await pool.query(
      `SELECT COUNT(*) as totalCount FROM events WHERE ${whereClause}`,
      queryParams
    );
    const total = Number(countRows[0]?.totalCount || 0);
    const totalPages = Math.ceil(total / limit) || 1;

    // Fetch paginated events ordered by event_date ASC (for upcoming) or DESC
    const [events]: any = await pool.query(
      `SELECT id, title_kn, title_en, description_kn, description_en, 
              DATE_FORMAT(event_date, '%Y-%m-%d') as event_date,
              start_time, end_time, location_kn, location_en, category, status, 
              banner_url, contact_person, contact_phone, created_at, updated_at
       FROM events
       WHERE ${whereClause}
       ORDER BY event_date ASC, id ASC
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    return NextResponse.json({
      success: true,
      events,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve events.' },
      { status: 500 }
    );
  }
}

