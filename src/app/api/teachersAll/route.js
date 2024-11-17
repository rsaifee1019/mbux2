import Teacher3 from '@/models/Teacher';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';

export async function GET(request) {
  await connectionToDatabase();
  const teachers = await Teacher3.find();

  // Set headers to prevent caching
  const response = NextResponse.json(teachers);
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');

  return response;
}