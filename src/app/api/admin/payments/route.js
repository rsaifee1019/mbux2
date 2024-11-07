import Payment from '@/models/Payment';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Get filters from query params
    const filters = {};
    if (searchParams.get('status')) {
      filters.status = searchParams.get('status');
    }
    if (searchParams.get('userType')) {
      filters.userType = searchParams.get('userType');
    }
    if (searchParams.get('transactionId')) {
      filters.transactionId = { $regex: searchParams.get('transactionId'), $options: 'i' };
    }
    if (searchParams.get('dateFrom')) {
      filters.paymentDate = { $gte: new Date(searchParams.get('dateFrom')) };
    }
    if (searchParams.get('dateTo')) {
      filters.paymentDate = { 
        ...filters.paymentDate,
        $lte: new Date(searchParams.get('dateTo'))
      };
    }

    const [payments, totalItems] = await Promise.all([
      Payment.find(filters)
        .sort({ paymentDate: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Payment.countDocuments(filters)
    ]);

    return NextResponse.json({
      payments,
      totalItems,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalItems / limit)
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const newPayment = await Payment.create(req.body);
    return NextResponse.json(newPayment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create payment', error: error.message }, 
      { status: 500 }
    );
  }
}
