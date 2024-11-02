import Notice from '@/models/Notice';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';

export async function GET(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  console.log(id);

  try {
    const notice = await Notice.findById(id);
    if (!notice) return NextResponse.json({ message: 'Notice not found' }, { status: 404 });
    return NextResponse.json(notice, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to retrieve notice', error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  try {
    const notice = await Notice.findById(id);
    if (!notice) return NextResponse.json({ message: 'Notice not found' }, { status: 404 });
    // Update the notice with the request body
    Object.assign(notice, req.body); // Update the notice with new data
    await notice.save(); // Save the updated notice
    return NextResponse.json(notice, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update notice', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  try {
    const notice = await Notice.findById(id);
    if (!notice) return NextResponse.json({ message: 'Notice not found' }, { status: 404 });
    await notice.remove(); // Use remove() instead of destroy()
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete notice', error: error.message }, { status: 500 });
  }
}
