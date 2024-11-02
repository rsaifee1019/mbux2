import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Payment from '@/models/Payment';
import Applicant from '@/models/Applicant';
import Student from '@/models/Student';
import connectionToDatabase from '@/lib/mongodb';

export async function GET(req, { params }) {
  console.log("API route hit");
  await connectionToDatabase();
  
  const { tranid } = params; // Ensure this matches the dynamic route name
  console.log("Transaction ID:", tranid);

  try {
    console.log("Attempting to find payment...");
    const payment = await Payment.findOne({ transactionId: tranid });
    console.log("Payment found:", payment);

    if (!payment) {
      console.log("Payment not found for transaction ID:", tranid);
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    let applicant;
    if (payment.userType === 'applicant') {
      console.log("Finding applicant...");
      applicant = await Applicant.findOne({ ssc_registration: payment.applicantId });
      console.log("Applicant found:", applicant);
    }

    let student;
    if (payment.userType === 'student') {
      console.log("Finding student with ID:", payment.studentId);
      student = await Student.findOne({ studentId: payment.studentId });
      console.log("Student found:", student);
    }

    return NextResponse.json({ payment, applicant, student });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}