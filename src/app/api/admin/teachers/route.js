import Teacher from '@/models/Teacher';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Get filters from query params
    const filters = {};
    if (searchParams.get('name')) {
      filters.title = { $regex: searchParams.get('name'), $options: 'i' };
    }
    if (searchParams.get('email')) {
      filters.email = { $regex: searchParams.get('email'), $options: 'i' };
    }
    if (searchParams.get('designation')) {
      filters.designation = { $regex: searchParams.get('designation'), $options: 'i' };
    }
    if (searchParams.get('status')) {
      filters.status = searchParams.get('status');
    }

    const [teachers, totalItems] = await Promise.all([
      Teacher.find(filters)
        .skip(skip)
        .limit(limit)
        .lean(),
      Teacher.countDocuments(filters)
    ]);

    return NextResponse.json({
      teachers,
      totalItems,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalItems / limit)
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch teachers' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const newTeacher = await Teacher.create(req.body);
    return NextResponse.json(newTeacher, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create teacher', error: error.message }, { status: 500 });
  }
}
