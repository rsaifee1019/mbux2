import Post from '@/models/Post';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';

export async function GET(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  console.log(id);

  try {
    const post = await Post.findById(id);
    if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to retrieve post', error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  try {
    const post = await Post.findById(id);
    if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    // Update the post with the request body
    Object.assign(post, req.body); // Update the post with new data
    await post.save(); // Save the updated post
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update post', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectionToDatabase(); 
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  try {
    const post = await Post.findById(id);
    if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    await post.remove(); // Use remove() instead of destroy()
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete post', error: error.message }, { status: 500 });
  }
}
