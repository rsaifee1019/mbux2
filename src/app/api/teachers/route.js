import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';
import Teacher3 from '@/models/Teacher';


export async function GET({ nextUrl }) {
  await connectionToDatabase();
  const url = nextUrl.clone();
  const page = parseInt(url.searchParams.get('page')) || 1; // Ensure page is an integer
  const limit = 12; // Number of items per page
  const skip = (page - 1) * limit; // Calculate the number of documents to skip
  const status = url.searchParams.get('status'); // Get status from query

  try {
    // Build the query object
    const query = {};
    if (status && status !== 'all') {
      query.status = status; // Only add status to the query if it is provided
    }

    // Use skip and limit for pagination
    const teachers = await Teacher3.find(query)
      .skip(skip) // Skip the first 'skip' documents
      .limit(limit); // Limit the results to 'limit' documents

    console.log(teachers); // Log the fetched teachers
    return NextResponse.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


