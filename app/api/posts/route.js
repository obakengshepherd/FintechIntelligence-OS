import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Post from '@/models/Post';

// GET /api/posts — fetch all published posts (or all if admin=true query param)
export async function GET(request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin') === 'true';
    const category = searchParams.get('category');
    const sector = searchParams.get('sector');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit')) || 0;

    let query = {};

    if (!admin) query.status = 'published';
    if (category) query.category = category;
    if (sector) query.sector = sector;
    if (featured === 'true') query.featured = true;

    let postsQuery = Post.find(query).sort({ createdAt: -1 });

    if (limit > 0) postsQuery = postsQuery.limit(limit);

    const posts = await postsQuery.lean();

    return NextResponse.json(
      { success: true, count: posts.length, data: posts },
      { status: 200 }
    );
  } catch (error) {
    console.error('[GET /api/posts]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/posts — create a new post
export async function POST(request) {
  try {
    await connectMongoDB();

    const body = await request.json();

    // Calculate read time based on body word count (~200 wpm)
    const wordCount = body.body?.split(/\s+/).length || 0;
    body.readTime = Math.max(1, Math.ceil(wordCount / 200));

    const post = await Post.create(body);

    return NextResponse.json(
      { success: true, data: post },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/posts]', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A post with this title already exists.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
