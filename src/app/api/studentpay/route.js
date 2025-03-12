// src/app/api/init/route.js
import { NextResponse } from 'next/server';
import { SSLCommerzPayment } from '../lib/sslcommerz';
import Payment from '@/models/Payment';
import connectionToDatabase from '@/lib/mongodb';

export async function POST(req) {
  await connectionToDatabase();
  const body = await req.json();
  const { tran_id } = body;
  
  // Log the transaction ID for debugging
  // const store_id_test = process.env.NEXT_PUBLIC_SSLCOMMERZ_STORE_ID_TEST
  // const store_passwd_test = process.env.NEXT_PUBLIC_SSLCOMMERZ_STORE_PASSWORD_TEST
let store_id = process.env.NEXT_PUBLIC_SSLCOMMERZ_STORE_ID_TUITION
let store_passwd = process.env.NEXT_PUBLIC_SSLCOMMERZ_STORE_PASSWORD_TUITION


  // Check if payment exists
  const payment = await Payment.findOne({ transactionId: tran_id });
  if(payment.paymentType == 'admission' || payment.fund == 'general'){
    store_id = process.env.NEXT_PUBLIC_SSLCOMMERZ_STORE_ID_ADMISSION
    store_passwd = process.env.NEXT_PUBLIC_SSLCOMMERZ_STORE_PASSWORD_ADMISSION
  }

  if(payment.fund == 'internal'){
    store_id = process.env.NEXT_PUBLIC_SSLCOMMERZ_STORE_ID_TEST_EXAM
    store_passwd = process.env.NEXT_PUBLIC_SSLCOMMERZ_STORE_PASSWORD_TEST_EXAM
  }

  if(payment.fund == 'external'){
    store_id = process.env.NEXT_PUBLIC_SSLCOMMERZ_STORE_ID_EXT
    store_passwd = process.env.NEXT_PUBLIC_SSLCOMMERZ_STORE_PASSWORD_EXT
  }
    
    

 
  
  // Log the payment object for debugging
  console.log('Payment object:', payment);

  // Check if payment is found
  if (!payment) {
    return NextResponse.json({ error: 'Reciept not found' }, { status: 404 });
  }


  // Ensure payment has the expected structure
  const amount = payment.amount;
  const name = payment.userType === 'student' && payment.student ? payment.student.name : payment.applicant ? payment.applicant.name : 'Unknown';
  const phone = payment.userType === 'student' && payment.student ? payment.student.phone : payment.applicant ? payment.applicant.phone : 'Unknown';

  try {
      const data = {
        store_id: store_id,
        store_passwd: store_passwd,
      total_amount: amount,
      currency: 'BDT',
      tran_id,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/success`,
      fail_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/cancel`,
      ipn_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/ipn`,
      shipping_method: 'NO',
      product_name: 'N/A',
      product_category: 'N/A',
      product_profile: 'non-physical-goods',
      cus_name: name,
      cus_email: 'N/A',
      cus_add1: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'Bangladesh',
      cus_phone: phone
    };

    const sslcz = new SSLCommerzPayment(
      store_id,
      store_passwd,
      true
    );

    const apiResponse = await sslcz.init(data);
 

    if (apiResponse?.GatewayPageURL) {
      return NextResponse.json({ GatewayPageURL: apiResponse.GatewayPageURL });
    }

    return NextResponse.json(apiResponse, { status: 400 });
  } catch (error) {
    console.error('SSL Error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
