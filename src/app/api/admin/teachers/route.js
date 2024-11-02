import Teacher3 from '@/models/Teacher';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';
export async function GET(req) {
  await connectionToDatabase()
    try {
      const teachers = await Teacher3.find();
      return NextResponse.json(teachers, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Failed to retrieve teachers', error: error.message }, { status: 500 });
    }
  } 
  export async function POST(req) {
    try {
      const newTeacher = await Teacher3.create(req.body);
      return NextResponse.json(newTeacher, { status: 201 });
    } catch (error) {
      return NextResponse.json({ message: 'Failed to create teacher', error: error.message }, { status: 500 });
    }
  } 
