import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
    const search = searchParams.get('search')?.trim() || '';
    const status = searchParams.get('status')?.trim() || 'published';
    const category = searchParams.get('category')?.trim() || 'all';
    const offset = (page - 1) * limit;

    const conditions: string[] = ['1=1'];
    const queryParams: any[] = [];

    // Filter by status (public view only sees published unless specified)
    if (status && status !== 'all') {
      conditions.push('status = ?');
      queryParams.push(status);
    }

    // Filter by category
    if (category && category !== 'all') {
      conditions.push('category = ?');
      queryParams.push(category);
    }

    // Search query parameter
    if (search) {
      conditions.push('(title_kn LIKE ? OR title_en LIKE ? OR summary_kn LIKE ? OR summary_en LIKE ? OR content_kn LIKE ? OR content_en LIKE ? OR author LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereClause = conditions.join(' AND ');

    // Total count for pagination
    const [countRows]: any = await pool.query(
      `SELECT COUNT(*) as totalCount FROM articles WHERE ${whereClause}`,
      queryParams
    );
    const total = Number(countRows[0]?.totalCount || 0);
    const totalPages = Math.ceil(total / limit) || 1;

    // Fetch paginated articles ordered by published_at DESC
    const [articles]: any = await pool.query(
      `SELECT id, title_kn, title_en, summary_kn, summary_en, 
              LEFT(content_kn, 250) as excerpt_kn,
              LEFT(content_en, 250) as excerpt_en,
              category, author, banner_url, read_time, status, views_count,
              DATE_FORMAT(published_at, '%Y-%m-%d') as published_at,
              created_at
       FROM articles 
       WHERE ${whereClause} 
       ORDER BY published_at DESC, id DESC 
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    return NextResponse.json({
      success: true,
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error: any) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve articles.' },
      { status: 500 }
    );
  }
}
