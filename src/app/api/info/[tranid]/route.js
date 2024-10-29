import { NextResponse } from 'next/server';
import sequelize from "@/lib/sequelize";
import Applicant from '@/models/Applicant';
import Payment from '@/models/Payment';
import Student from '@/models/Student';

export async function GET(req, { params }) {
  
  const { tranid } = params; // Ensure this matches the dynamic route name
 // Log the transaction ID
  
  if (!tranid) {
    return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 });
  }
  
  try {
    const payment = await Payment.findOne({ where: { transactionId: tranid } });
    let applicant;
    if(payment.userType === 'applicant'){
      applicant = await Applicant.findOne({ where: { ssc_registration: payment.applicantId } });
    }
    let student;
    if(payment.userType === 'student'){
      student = await Student.findOne({ where: { id: payment.studentId } });
    }
    
    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }
    

    return NextResponse.json({ payment, applicant, student });
  } catch (error) {
  
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}