import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Post from '@/models/Post';

// GET /api/posts/[id] — get a single post by ID or slug
export async function GET(request, { params }) {
  try {
    await connectMongoDB();

    // Try finding by MongoDB _id first, then by slug
    let post = null;
    const { id } = params;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      post = await Post.findById(id).lean();
    }

    if (!post) {
      post = await Post.findOne({ slug: id }).lean();
    }

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Increment view count (fire-and-forget)
    Post.findByIdAndUpdate(post._id, { $inc: { views: 1 } }).exec();

    return NextResponse.json({ success: true, data: post }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/posts/[id]]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/posts/[id] — update a post
export async function PUT(request, { params }) {
  try {
    await connectMongoDB();

    const body = await request.json();

    // Recalculate read time if body changed
    if (body.body) {
      const wordCount = body.body.split(/\s+/).length || 0;
      body.readTime = Math.max(1, Math.ceil(wordCount / 200));
    }

    const post = await Post.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post }, { status: 200 });
  } catch (error) {
    console.error('[PUT /api/posts/[id]]', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id] — delete a post
export async function DELETE(request, { params }) {
  try {
    await connectMongoDB();

    const post = await Post.findByIdAndDelete(params.id).lean();

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[DELETE /api/posts/[id]]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
