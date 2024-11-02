import Student from '@/models/Student';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';
export async function GET(req) {
  await connectionToDatabase()
    try {
      const students = await Student.find();
      return NextResponse.json(students, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to retrieve students', error: error.message }, { status: 500 });
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
