import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse the incoming form data
    const formData = await req.formData();
    
    // Convert FormData to a plain object
    const body = Object.fromEntries(formData.entries());
    console.log('Payment Cancel Response:', body);
    
    // Process the cancel data here
    // For example, log the cancellation, notify the user, etc.

    // Construct the absolute URL for the redirect
    const url = new URL(req.url);
    const redirectUrl = `${url.protocol}//${url.host}/cancel`;

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const redirectUrl = `${url.protocol}//${url.host}/cancel`;

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}