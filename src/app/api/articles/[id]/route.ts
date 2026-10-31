import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = parseInt(id, 10);
    if (!articleId || isNaN(articleId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid article ID' },
        { status: 400 }
      );
    }

    // Increment views count atomically
    await pool.query(
      `UPDATE articles SET views_count = views_count + 1 WHERE id = ?`,
      [articleId]
    );

    // Fetch full article
    const [rows]: any = await pool.query(
      `SELECT id, title_kn, title_en, summary_kn, summary_en, 
              content_kn, content_en, category, author, banner_url, 
              read_time, status, views_count,
              DATE_FORMAT(published_at, '%Y-%m-%d') as published_at,
              DATE_FORMAT(published_at, '%d %M %Y') as formatted_date,
              created_at, updated_at
       FROM articles 
       WHERE id = ?`,
      [articleId]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Article not found' },
        { status: 404 }
      );
    }

    const article = rows[0];

    // Fetch related articles (same category, excluding current)
    const [related]: any = await pool.query(
      `SELECT id, title_kn, title_en, summary_kn, summary_en, 
              category, author, banner_url, read_time,
              DATE_FORMAT(published_at, '%Y-%m-%d') as published_at
       FROM articles 
       WHERE id != ? AND status = 'published'
       ORDER BY (category = ?) DESC, published_at DESC 
       LIMIT 3`,
      [articleId, article.category]
    );

    return NextResponse.json({
      success: true,
      article,
      related: related || [],
    });
  } catch (error: any) {
    console.error('Error fetching single article:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve article.' },
      { status: 500 }
    );
  }
}
