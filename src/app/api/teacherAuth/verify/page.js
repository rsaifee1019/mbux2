import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }

    // Here you would verify the JWT token
    // This is just an example
    if (token === "sample-jwt-token") {
      return NextResponse.json({
        id: 1,
        name: "John Doe",
        role: "teacher"
      });
    }
    
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}