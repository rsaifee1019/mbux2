// app/api/students/bulk-upload/route.js
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb'; // Ensure you have this setup
import Student from '@/models/Student';

export async function POST(req) {
  try {
    await connectionToDatabase();
    
    const { students } = await req.json();
    
    let successful = 0;
    let failed = 0;
    
    // Process students in batches to avoid overwhelming the database
    const batchSize = 50;
    for (let i = 0; i < students.length; i += batchSize) {
      const batch = students.slice(i, i + batchSize);
      
      try {
        // Use insertMany for bulk insertion
        await Student.insertMany(batch, { ordered: false });
        successful += batch.length;
      } catch (error) {
        // If some documents fail to insert, count the failures
        if (error.writeErrors) {
          successful += error.insertedDocs?.length || 0;
          failed += batch.length - (error.insertedDocs?.length || 0);
        } else {
          failed += batch.length;
        }
      }
    }

    return NextResponse.json({
      message: 'Bulk upload completed',
      successful,
      failed,
    });
  } catch (error) {
    console.error('Bulk upload error:', error);
    return NextResponse.json(
      { message: 'Failed to process bulk upload' },
      { status: 500 }
    );
  }
}