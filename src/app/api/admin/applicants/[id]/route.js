import Applicant from '@/models/Applicant';
import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';
import PersonalDetails from '@/models/PersonalDetails'; // Import the PersonalDetails model


export async function GET(req, { params }) {
  const { id } = params; // Get the ID from the URL parameters
  await connectionToDatabase();
  try {
    let applicant = await Applicant.findById(id).populate('personalDetailsId');
    applicant = applicant.personalDetailsId;
    if (!applicant) return NextResponse.json({ message: 'Applicant not found' }, { status: 404 });
    return NextResponse.json(applicant, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to retrieve applicant', error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {

  await connectionToDatabase();
  const { id } = params; // Get the ID from the URL parameters
  const body = await req.json(); // Parse the request body

  try {
    const applicant = await Applicant.findByIdAndUpdate(id, body, { new: true });
    if (!applicant) return NextResponse.json({ message: 'Applicant not found' }, { status: 404 });
    return NextResponse.json(applicant, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update applicant', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params; // Get the ID from the URL parameters

  try {
    await connectionToDatabase();
    console.log('DELETE request is triggered');
    const applicant = await Applicant.findByIdAndDelete(id);
    console.log('applicant', applicant);
    if (!applicant) return NextResponse.json({ message: 'Applicant not found' }, { status: 404 });
    return NextResponse.json({ message: 'Applicant deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete applicant', error: error.message }, { status: 500 });
  }
}
