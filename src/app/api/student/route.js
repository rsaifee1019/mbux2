import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';
import Student from '@/models/Student';
import Payment from '@/models/Payment';
import Fee from '@/models/Fee';
import sequelize from '@/lib/sequelize';





export async function POST(req) {
  await connectionToDatabase();
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

    const {studentId, degree, year, paymentType, phone, name, type, selectedMonths} = body


    // create student
    let student = await Student.findOne({studentId}) 
    if(!student){
      student = await Student.create({studentId, degree, year, paymentStatus: 'pending', phone, name})
  
    }

if(paymentType == 'test-exam'){
    const fees = await Fee.findOne({
        degree,
        subtype: paymentType,
        year: year,
        // Corrected conditional logic
   
    });
}
     // ... existing code ...
    const fees = await Fee.findOne({
        degree,
        subtype: paymentType,
        
        // Corrected conditional logic
   
    });
    console.log('months')
    console.log(selectedMonths)

    const payment = await Payment.create({amount: (fees.amount * (selectedMonths?.length || 1)), transactionId: tran_id, userType: 'student', studentId, paymentType: paymentType, fund: fees.type, months:selectedMonths })
console.log('payment')
console.log(payment)

    return NextResponse.json({tran_id}, {status: 200})
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
