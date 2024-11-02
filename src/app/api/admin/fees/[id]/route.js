import FeeRecord from '@/models/FeeRecord';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';

export async function GET(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  console.log(id);

  try {
    const fee = await FeeRecord.findById(id);
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

  try {
    const fee = await FeeRecord.findById(id);
    if (!fee) return NextResponse.json({ message: 'Fee not found' }, { status: 404 });
    // Update the fee with the request body
    Object.assign(fee, req.body); // Update the fee with new data
    await fee.save(); // Save the updated fee
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
