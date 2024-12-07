import Applicant from '@/models/Applicant';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';

export async function GET(request) {
  await connectionToDatabase();
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Get filters from query params
    const filters = {};
    if (searchParams.get('name')) {
      filters.name_English = { $regex: searchParams.get('name'), $options: 'i' };
    }
    if (searchParams.get('ssc_registration')) {
      filters.ssc_registration = { $regex: searchParams.get('ssc_registration'), $options: 'i' };
    }
    if (searchParams.get('status')) {
      filters.status = searchParams.get('status');
    }
    if (searchParams.get('phone')) {
      filters.phone = { $regex: searchParams.get('phone'), $options: 'i' };
    }
    if (searchParams.get('dateFrom')) {
      filters.application_date = { $gte: new Date(searchParams.get('dateFrom')) };
    }
    if (searchParams.get('dateTo')) {
      filters.application_date = { 
        ...filters.application_date,
        $lte: new Date(searchParams.get('dateTo'))
      };
    }

    const [applicants, totalItems] = await Promise.all([
      Applicant.find(filters)
        .sort({ application_date: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Applicant.countDocuments(filters)
    ]);

    return NextResponse.json({
      applicants,
      totalItems,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalItems / limit)
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch applicants' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const newApplicant = await Applicant.create(req.body);
    return NextResponse.json(newApplicant, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create applicant', error: error.message }, 
      { status: 500 }
    );
  }
}
