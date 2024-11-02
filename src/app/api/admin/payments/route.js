import Payment from '@/models/Payment';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';
export async function GET(req) {
  await connectionToDatabase()
    try {
      const payments = await Payment.find();
      return NextResponse.json(payments, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Failed to retrieve payments', error: error.message }, { status: 500 });
    }
  } 
  export async function POST(req) {
    try {
      const newPayment = await Payment.create(req.body);
      return NextResponse.json(newPayment, { status: 201 });
    } catch (error) {
      return NextResponse.json({ message: 'Failed to create payment', error: error.message }, { status: 500 });
    }
  } 
