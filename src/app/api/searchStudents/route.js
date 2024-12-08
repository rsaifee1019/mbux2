// src/app/api/searchStudents/route.js
import connectionToDatabase from '@/lib/mongodb';
import Student from '@/models/Student';

export async function POST(req) {
  const { query, filter } = await req.json();
  
  await connectionToDatabase();

  const searchRegex = new RegExp(query, 'i'); // 'i' for case-insensitive

  // Build the filter object based on the provided filters
  const filterConditions = {
    $or: [
      { studentId: { $regex: searchRegex } },
      { name: { $regex: searchRegex } }
    ]
  };

  // Apply additional filters if provided
  if (filter) {
    console.log('Filter:', filter);
    if (filter.department) {
      filterConditions.department = filter.department; // Filter by department
    }
    if (filter.class) {
      filterConditions.degree = filter.class; // Filter by class
    }
  
  }

  const result = await Student.find(filterConditions);

  return new Response(JSON.stringify(result), { status: 200 });
}
