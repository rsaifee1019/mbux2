import FeeRecord from '@/models/FeeRecord';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';
import Student from '@/models/Student';

export async function GET(request) {
  try {
    await connectionToDatabase();
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const studentName = searchParams.get('studentName');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const monthFrom = searchParams.get('monthFrom');
    const monthTo = searchParams.get('monthTo');

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Prepare base query
    let query = {};

    // If status is provided, add to query
    if (status) {
      query.status = status.toUpperCase(); // Ensure status is in uppercase
    }

    // If monthFrom and monthTo are provided, add to query
    if (monthFrom) {
      query.month = { $gte: new Date(monthFrom) }; // Greater than or equal to monthFrom
    }
    if (monthTo) {
      query.month = { ...query.month, $lte: new Date(monthTo) }; // Less than or equal to monthTo
    }

    // If studentId is provided, find the student first
    if (studentId) {
      // Find student by studentId (string field)
      const student = await Student.findOne({ studentId});

      if (!student) {
        query = {};
      }
      else{
        query = { student: student._id };
      }
    }
    if (studentName) {
      console.log('studentName', studentName);
      const searchRegex = new RegExp(studentName, 'i'); // 'i' for case-insensitive
      const student = await Student.findOne({ name: { $regex: searchRegex } });
      if (!student) {
        query = {};
      }
      else{
        query = { student: student._id };
      }
    }

    // Find fee records with optional student filtering
    const [fees, total] = await Promise.all([
      FeeRecord.find(query)
        .populate({
          path: 'student',
          select: 'name email studentId degree department' // Select specific student fields
        })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }), // Sort by most recent first
      
      FeeRecord.countDocuments(query)
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    // Return the paginated fee records with metadata
    return NextResponse.json({
      fees,
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords: total,
        recordsOnPage: fees.length
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching fee records:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
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
