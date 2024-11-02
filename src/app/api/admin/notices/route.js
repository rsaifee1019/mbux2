import Notice from '@/models/Notice';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';

export async function GET(req) {
  await connectionToDatabase()
  try {
    const notices = await Notice.find();
    return NextResponse.json(notices, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to retrieve notices', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  // Ensure the request body is parsed as JSON
  await connectionToDatabase()
  const body = await req.json();
  try {
    const newNotice = await Notice.create(body);
    return NextResponse.json(newNotice, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create notice', error: error.message }, { status: 500 });
  }
}
