import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Get filters from query params
    const filters = {};
    if (searchParams.get('title')) {
      filters.title = { $regex: searchParams.get('title'), $options: 'i' };
    }
    if (searchParams.get('category')) {
      filters.category = searchParams.get('category');
    }
    if (searchParams.get('dateFrom')) {
      filters.dateUploaded = { $gte: new Date(searchParams.get('dateFrom')) };
    }
    if (searchParams.get('dateTo')) {
      filters.dateUploaded = { 
        ...filters.dateUploaded,
        $lte: new Date(searchParams.get('dateTo'))
      };
    }

    const [posts, totalItems] = await Promise.all([
      Post.find(filters)
        .sort({ dateUploaded: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Post.countDocuments(filters)
    ]);

    return NextResponse.json({
      posts,
      totalItems,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalItems / limit)
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const newPost = await Post.create(req.body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create post', error: error.message }, 
      { status: 500 }
    );
  }
}
