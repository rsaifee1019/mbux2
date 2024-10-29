import { NextResponse } from 'next/server';
import Payment from '@/models/Payment';
import Student from '@/models/Student';
export async function POST(req) {
  try {
    // Parse the incoming form data
    const formData = await req.formData();
    
    // Convert FormData to a plain object
    const body = Object.fromEntries(formData.entries());
    console.log('Payment Gateway Response:', body);
    const {status, tran_id, store_amount, verify_sign} = body;
    if(status === 'VALID'){
      const payment = await Payment.findOne({where: {transactionId: tran_id}})
      if(payment){
        payment.update({status: 'completed'})
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
  try {
    const url = new URL(req.url);
    const redirectUrl = `${url.protocol}//${url.host}/success`;

    return NextResponse.redirect(redirectUrl,);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}




