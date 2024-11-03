import Teacher3 from '@/models/Teacher';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';

export async function GET(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  console.log(id);

  try {
    const teacher = await Teacher3.findOne({ id });
    if (!teacher) return NextResponse.json({ message: 'Teacher not found' }, { status: 404 });
    return NextResponse.json(teacher, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to retrieve teacher', error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  try {
    // Assuming req.body is not directly accessible due to the context of the application
    // and the need to parse the request body manually
    const requestBody = await req.json(); // Parse the request body as JSON

    const teacher = await Teacher3.findOne({id});
   
    if (!teacher) return NextResponse.json({ message: 'Teacher not found' }, { status: 404 });
    // Update the teacher with the request body
    console.log(requestBody);
    Object.assign(teacher, requestBody); // Update the teacher with new data
    await teacher.save(); // Save the updated teacher
    return NextResponse.json(teacher, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update teacher', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectionToDatabase();
  
  // Access the id from req.nextUrl.pathname
  const { pathname } = req.nextUrl;
  const id = pathname.split('/').pop(); // Get the last segment of the path

  try {
    const teacher = await Teacher3.findById(id);
    if (!teacher) return NextResponse.json({ message: 'Teacher not found' }, { status: 404 });
    await teacher.remove(); // Use remove() instead of destroy()
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete teacher', error: error.message }, { status: 500 });
  }
}
