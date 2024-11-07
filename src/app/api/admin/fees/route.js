import FeeRecord from '@/models/FeeRecord';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';

export async function GET(request) {
  try {
    await connectionToDatabase();
    console.log('GET request received');
    const { searchParams } = new URL(request.url);
    console.log('Search params:', searchParams);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Get filters from query params
    const filters = {};
    if (searchParams.get('studentName')) {
      filters['student.name'] = { $regex: searchParams.get('studentName'), $options: 'i' };
    }
    if (searchParams.get('studentId')) {
      filters['student.studentId'] = { $regex: searchParams.get('studentId'), $options: 'i' };
    }
    if (searchParams.get('status')) {
      filters.status = searchParams.get('status');
    }
    if (searchParams.get('paymentType')) {
      filters.paymentType = searchParams.get('paymentType');
    }
    if (searchParams.get('monthFrom')) {
      filters.month = { $gte: new Date(searchParams.get('monthFrom')) };
    }
    if (searchParams.get('monthTo')) {
      filters.month = { 
        ...filters.month,
        $lte: new Date(searchParams.get('monthTo'))
      };
    }
    console.log('Filters:', filters);
    const fees = await FeeRecord.find(filters)
      .populate('student', 'name studentId')
      .sort({ dueDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    console.log('Fees:', fees);
    const totalItems = await FeeRecord.countDocuments(filters);
    console.log('Total items:', totalItems);

    return NextResponse.json({
      fees,
      totalItems,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalItems / limit)
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch fees' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectionToDatabase();
    const newFee = await FeeRecord.create(req.body);
    return NextResponse.json(newFee, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create fee', error: error.message }, 
      { status: 500 }
    );
  }
}
