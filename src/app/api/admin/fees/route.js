import { NextRequest, NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';
import FeeRecord from '@/models/FeeRecord';
import Student from '@/models/Student';

export async function GET(request) {
  try {
    await connectionToDatabase();
    
    // Get search parameters from URL
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build the aggregation pipeline
    const pipeline = [
      // Join with Student collection
      {
        $lookup: {
          from: 'students',
          localField: 'student',
          foreignField: '_id',
          as: 'studentDetails'
        }
      },
      // Unwind the studentDetails array
      {
        $unwind: '$studentDetails'
      },
      // Match based on search criteria
      {
        $match: {
          $or: [
            { 'studentDetails.name': { $regex: query, $options: 'i' } },
            { 'studentDetails.studentId': { $regex: query, $options: 'i' } }
          ]
        }
      },
      // Project the fields you want to return
      {
        $project: {
          amount: 1,
          lateFine: 1,
          status: 1,
          dueDate: 1,
          month: 1,
          student: {
            _id: '$studentDetails._id',
            name: '$studentDetails.name',
            studentId: '$studentDetails.studentId',
            degree: '$studentDetails.degree'
          },
          paymentHistory: 1,
          createdAt: 1,
          totalDue: 1
        }
      }
    ];

    // Add sorting (newest first)
    pipeline.push({ $sort: { createdAt: -1 } });

    // Get total count for pagination
    const totalCount = await FeeRecord.aggregate([...pipeline, { $count: 'total' }]);
    const total = totalCount[0]?.total || 0;

    // Add pagination
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    // Execute the aggregation
    const feeRecords = await FeeRecord.aggregate(pipeline);

    return NextResponse.json({
      status: 'success',
      data: feeRecords,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: error.message || 'Failed to search fee records' 
      },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  // Ensure the request body is parsed as JSON
  await connectionToDatabase()
  const body = await req.json();
  try {
    const newFee = await FeeRecord.create(body);
    return NextResponse.json(newFee, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create fee', error: error.message }, { status: 500 });
  }
}
