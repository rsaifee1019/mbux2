import Post from '@/models/Post';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';

export async function GET(req) {
  await connectionToDatabase()
  try {
    const posts = await Post.find();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to retrieve posts', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  // Ensure the request body is parsed as JSON
  await connectionToDatabase()
  const body = await req.json();
  try {
    const newPost = await Post.create(body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create post', error: error.message }, { status: 500 });
  }
}
