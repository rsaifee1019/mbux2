import { NextResponse } from 'next/server';
import Payment from '@/models/Payment';
import Student from '@/models/Student';
import connectionToDatabase from '@/lib/mongodb';
export async function POST(req) {
  await connectionToDatabase()
  try {
    // Parse the incoming form data
    const formData = await req.formData();
    
    // Convert FormData to a plain object
    const body = Object.fromEntries(formData.entries());
    console.log('Payment Gateway Response:', body);
    const {status, tran_id, store_amount, verify_sign} = body;
    console.log(status, tran_id);
    if(status === 'VALID'){
      const payment = await Payment.findOne({transactionId: tran_id})
      console.log(payment);
      if(payment){
        payment.status = 'completed';
        await payment.save();
        await payment.save()
        if(payment.userType === 'student'){
          const student = await Student.findOne({where: {id: payment.studentId}})
          if(student && student.paymentStatus !== 'paid'){
            student.update({paymentStatus: 'paid'})
            await student.save()
        }
      }
    }
  }
    
    // Process the payment data here
    // For example, validate the payment, save to the database, etc.

    // Construct the absolute URL for the redirect
    const url = new URL(req.url);
    const redirectUrl = `${url.protocol}//${url.host}/success?tran_id=${tran_id}`;

    return NextResponse.redirect(redirectUrl, 302);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req) {
  await connectionToDatabase()
  try {
    const url = new URL(req.url);
    const redirectUrl = `${url.protocol}//${url.host}/success`;

    return NextResponse.redirect(redirectUrl,);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}




