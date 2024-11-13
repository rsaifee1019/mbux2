import Teacher3 from '@/models/Teacher';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';

export async function GET(request) {
  await connectionToDatabase();
  const teachers = await Teacher3.find();
  return NextResponse.json(teachers);
}