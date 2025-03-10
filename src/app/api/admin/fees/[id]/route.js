import Fee from '@/models/Fee';
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

    // Convert the ReadableStream to a JSON object
    const requestBody = await req.json();
    console.log('req.body', requestBody);
    let status = requestBody.status; // Extract status from request body
    if (status !== 'PAID'){
      status = 'PAID';
    }
    else{
      status = 'PENDING';
    }

    
    fee.status = status; // Update the fee's status
    await fee.save(); // Save the updated fee
    return NextResponse.json(fee, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update fee', error: error.message }, { status: 500 });
  }
}





export async function DELETE(req) {
  await connectionToDatabase();
  console.log('delete id');
 
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path
  try {
    console.log('id', id); // Fixed missing comma here

    const fee = await Fee.findByIdAndDelete(id);
    console.log('fee', fee); // Fixed missing comma here
    if (!fee) return NextResponse.json({ message: 'Fee not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Fee deleted successfully' }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Failed to delete fee', error: error.message }, { status: 500 });
  }
}
