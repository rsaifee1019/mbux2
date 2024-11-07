import Notice from '@/models/Notice';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Get filters from query params
    const filters = {};
    if (searchParams.get('title')) {
      filters.title = { $regex: searchParams.get('title'), $options: 'i' };
    }
    if (searchParams.get('dateFrom')) {
      filters.dateUploaded = { $gte: new Date(searchParams.get('dateFrom')) };
    }
    if (searchParams.get('dateTo')) {
      filters.dateUploaded = { 
        ...filters.dateUploaded,
        $lte: new Date(searchParams.get('dateTo'))
      };
    }

    const [notices, totalItems] = await Promise.all([
      Notice.find(filters)
        .sort({ dateUploaded: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Notice.countDocuments(filters)
    ]);

    return NextResponse.json({
      notices,
      totalItems,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalItems / limit)
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch notices' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const newNotice = await Notice.create(req.body);
    return NextResponse.json(newNotice, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create notice', error: error.message }, 
      { status: 500 }
    );
  }
}
