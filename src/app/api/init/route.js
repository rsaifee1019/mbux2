// src/app/api/init/route.js
import { NextResponse } from 'next/server';
import { SSLCommerzPayment } from '../lib/sslcommerz';
import Payment from '@/models/Payment';

export async function POST(req) {
  const body = await req.json();
  const { tran_id } = body;
  
  // Log the transaction ID for debugging
  console.log('Transaction ID:', tran_id);

  // Check if payment exists
  const payment = await Payment.findOne({ transactionId: tran_id   });
  
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
        store_id: process.env.NEXT_PUBLIC_SSLCOMMERZ_STORE_ID_ADMISSION,
      store_passwd: process.env.NEXT_PUBLIC_SSLCOMMERZ_STORE_PASSWORD_ADMISSION,
      total_amount: amount,
      currency: 'BDT',
      tran_id,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/success`,
      fail_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/fail`,
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
      process.env.NEXT_PUBLIC_SSLCOMMERZ_STORE_ID_ADMISSION,
      process.env.NEXT_PUBLIC_SSLCOMMERZ_STORE_PASSWORD_ADMISSION,
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
