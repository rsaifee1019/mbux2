import FeeRecord from '@/models/FeeRecord';
import Fee from "@/models/Fee";
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';

export async function GET(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  console.log(id);

  try {
    const fee = await Fee.findById(id);
    if (!fee) return NextResponse.json({ message: 'Fee not found' }, { status: 404 });
    return NextResponse.json(fee, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to retrieve fee', error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path
  console.log('id', id);

  try {
    const fee = await Fee.findById(id);
    console.log('fee', fee);


     const body = await req.json(); // Ensure the body is parsed correctly
    Object.assign(fee, body); // Update the notice with new data
    console.log(body);
    
    await fee.save(); // Save the updated notice
    return NextResponse.json(fee, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update fee', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  try {
    const fee = await FeeRecord.findByIdAndDelete(id);
    if (!fee) return NextResponse.json({ message: 'Fee not found' }, { status: 404 });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete fee', error: error.message }, { status: 500 });
  }
}
