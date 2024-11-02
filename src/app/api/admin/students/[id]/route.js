import Student from '@/models/Student';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';

export async function GET(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  console.log(id);

  try {
    const student = await Student.findById(id);
    if (!student) return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to retrieve student', error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  try {
    // Ensure the request body is parsed as JSON
    const body = await req.json(); // Parse the request body
    const student = await Student.findById(id);
    
    if (!student) return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    
    // Update the student with the request body
    console.log(body); // Log the parsed body
    Object.assign(student, body);
    console.log(student); // Log the updated student object
    
    // Save the updated student
    await student.save();
    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update student', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path
  console.log(id);
  try {
    const studentName = await Student.findById(id);
    console.log(studentName);
    const student = await Student.findByIdAndDelete(id);
    console.log(student);
    if (!student) return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete student', error: error.message }, { status: 500 });
  }
}
