import { NextResponse } from 'next/server';
import sequelize from "@/lib/sequelize";
import Applicant from '../../../models/Applicant'; // Import your Applicant model
import Payment from '../../../models/Payment';
import PersonalDetails from '@/models/PersonalDetails';
import Student from '@/models/Student';
import Fee from '@/models/Fee';


export async function POST(req) {

  const paymentTypes = {
    interTuition: 300,
    mastersTuition: 100,
    honsTuition: 100
  };

  try {
    const body = await req.json();
    
     // transaction id
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    const tran_id = `TXN${timestamp}${random}`;          

    const {studentId, degree, year, paymentType, phone, name} = body


    let student = await Student.findOne({where: {studentId}})
    if(!student){
      student = await Student.create({studentId,  degree, year, paymentStatus: 'pending', phone, name})

    }

    const fees = await Fee.findOne({where: {degree, subtype: paymentType}}) 

    const payment = await Payment.create({amount: fees.amount, transactionId: tran_id, userType: 'student', studentId: student.id, paymentType: paymentType })
console.log(fees, tran_id)

return NextResponse.json({tran_id}, {status: 200})
   

    
    // Extract data from the request body
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
