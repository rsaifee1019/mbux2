import Payment from '@/models/Payment';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';

export async function GET(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  try {
    const payment = await Payment.findById(id);
    if (!payment) return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
    return NextResponse.json(payment, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to retrieve payment', error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  try {
    const payment = await Payment.findById(id);
    if (!payment) return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
    // Update the payment with the request body
    Object.assign(payment, await req.json()); // Update the payment with new data
    await payment.save(); // Save the updated payment
    return NextResponse.json(payment, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update payment', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectionToDatabase();
  console.log('DELETE request received');
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path
  console.log('ID:', id);

  try {
    const payment = await Payment.findById(id);
    console.log('Payment:', payment);
    if (!payment) return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
    await payment.deleteOne(); // Use remove() instead of deleteOne()
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete payment', error: error.message }, { status: 500 });
  }
}