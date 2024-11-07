import Student from '@/models/Student';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Get filters from query params
    const filters = {};
    if (searchParams.get('name')) {
      filters.name = { $regex: searchParams.get('name'), $options: 'i' };
    }
    // Add other filters similarly...

    const [students, totalItems] = await Promise.all([
      Student.find(filters)
        .skip(skip)
        .limit(limit)
        .lean(),
      Student.countDocuments(filters)
    ]);

    return NextResponse.json({
      students,
      totalItems,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalItems / limit)
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const newStudent = await Student.create(req.body);
    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create student', error: error.message }, { status: 500 });
  }
}
