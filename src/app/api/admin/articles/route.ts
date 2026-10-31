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
 * GET /api/admin/articles
 * Admin-restricted: Paginated articles list, search, status, category, and stats
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

    // Fetch paginated articles
    const [articles]: any = await pool.query(
      `SELECT id, title_kn, title_en, summary_kn, summary_en, 
              LEFT(content_kn, 180) as excerpt_kn,
              LEFT(content_en, 180) as excerpt_en,
              content_kn, content_en,
              category, author, banner_url, read_time, status, views_count,
              DATE_FORMAT(published_at, '%Y-%m-%d') as published_at,
              created_by, created_at, updated_at
       FROM articles 
       WHERE ${whereClause} 
       ORDER BY id DESC 
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    // Live Stats
    const [statsRows]: any = await pool.query(`
      SELECT 
        COUNT(*) as totalArticles,
        SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as publishedArticles,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draftArticles,
        SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) as archivedArticles,
        COALESCE(SUM(views_count), 0) as totalViews
      FROM articles
    `);

    const stats = {
      totalArticles: Number(statsRows[0]?.totalArticles || 0),
      publishedArticles: Number(statsRows[0]?.publishedArticles || 0),
      draftArticles: Number(statsRows[0]?.draftArticles || 0),
      archivedArticles: Number(statsRows[0]?.archivedArticles || 0),
      totalViews: Number(statsRows[0]?.totalViews || 0),
    };

    return NextResponse.json({
      success: true,
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      stats,
    });
  } catch (error: any) {
    console.error('Admin articles fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve admin articles.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/articles
 * Admin-restricted: Publish a new article
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
      summary_kn,
      summary_en,
      content_kn,
      content_en,
      category = 'general',
      author = 'Shri Harshanand Guttedar Office',
      banner_url = null,
      read_time = '4 min read',
      status = 'published',
    } = body;

    if (!title_kn?.trim() || !title_en?.trim() || !content_kn?.trim() || !content_en?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Title and content in both Kannada and English are required.' },
        { status: 400 }
      );
    }

    const validStatus = ['published', 'draft', 'archived'].includes(status) ? status : 'published';

    const [result]: any = await pool.query(
      `INSERT INTO articles 
       (title_kn, title_en, summary_kn, summary_en, content_kn, content_en, category, author, banner_url, read_time, status, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title_kn.trim(),
        title_en.trim(),
        summary_kn?.trim() || title_kn.trim().substring(0, 150),
        summary_en?.trim() || title_en.trim().substring(0, 150),
        content_kn.trim(),
        content_en.trim(),
        category,
        author?.trim() || 'Shri Harshanand Guttedar Office',
        banner_url || null,
        read_time?.trim() || '4 min read',
        validStatus,
        admin.mobile || 'admin',
      ]
    );

    // Audit log
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '::1';
    await pool.query(
      `INSERT INTO user_activity_logs (user_id, mobile, action, ip_address, device_type, user_agent, metadata)
       VALUES (?, ?, 'ARTICLE_PUBLISHED', ?, 'Desktop', ?, ?)`,
      [
        admin.userId || null,
        admin.mobile,
        clientIp,
        req.headers.get('user-agent') || 'Admin UI',
        JSON.stringify({ articleId: result.insertId, title_en, status: validStatus }),
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Article published successfully.',
      articleId: result.insertId,
    });
  } catch (error: any) {
    console.error('Admin publish article error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to publish article.' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/articles
 * Admin-restricted: Update an existing article
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
      summary_kn,
      summary_en,
      content_kn,
      content_en,
      category,
      author,
      banner_url,
      read_time,
      status,
    } = body;

    const articleId = parseInt(id, 10);
    if (!articleId) {
      return NextResponse.json({ success: false, message: 'Article ID is required.' }, { status: 400 });
    }

    const validStatus = ['published', 'draft', 'archived'].includes(status) ? status : 'published';

    await pool.query(
      `UPDATE articles 
       SET title_kn = ?, title_en = ?, summary_kn = ?, summary_en = ?, 
           content_kn = ?, content_en = ?, category = ?, author = ?, 
           banner_url = ?, read_time = ?, status = ?
       WHERE id = ?`,
      [
        title_kn.trim(),
        title_en.trim(),
        summary_kn?.trim() || null,
        summary_en?.trim() || null,
        content_kn.trim(),
        content_en.trim(),
        category,
        author?.trim() || 'Shri Harshanand Guttedar Office',
        banner_url || null,
        read_time?.trim() || '4 min read',
        validStatus,
        articleId,
      ]
    );

    // Audit log
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '::1';
    await pool.query(
      `INSERT INTO user_activity_logs (user_id, mobile, action, ip_address, device_type, user_agent, metadata)
       VALUES (?, ?, 'ARTICLE_UPDATED', ?, 'Desktop', ?, ?)`,
      [
        admin.userId || null,
        admin.mobile,
        clientIp,
        req.headers.get('user-agent') || 'Admin UI',
        JSON.stringify({ articleId, title_en, status: validStatus }),
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Article updated successfully.',
    });
  } catch (error: any) {
    console.error('Admin update article error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update article.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/articles
 * Admin-restricted: Delete an article
 */
export async function DELETE(req: NextRequest) {
  try {
    const admin = await authenticateAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Forbidden: Admin access required.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id') || '', 10);
    if (!id) {
      return NextResponse.json({ success: false, message: 'Article ID is required.' }, { status: 400 });
    }

    await pool.query(`DELETE FROM articles WHERE id = ?`, [id]);

    // Audit log
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '::1';
    await pool.query(
      `INSERT INTO user_activity_logs (user_id, mobile, action, ip_address, device_type, user_agent, metadata)
       VALUES (?, ?, 'ARTICLE_DELETED', ?, 'Desktop', ?, ?)`,
      [
        admin.userId || null,
        admin.mobile,
        clientIp,
        req.headers.get('user-agent') || 'Admin UI',
        JSON.stringify({ articleId: id }),
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully.',
    });
  } catch (error: any) {
    console.error('Admin delete article error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete article.' },
      { status: 500 }
    );
  }
}
