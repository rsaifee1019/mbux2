import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Here you would validate the credentials against your database
    // This is just an example
    if (body.userId === "romel" && body.password === "1234") {
      return NextResponse.json({
        token: "sample-jwt-token",
        user: {
          id: 1,
          name: "Romel",
          role: "teacher"
        }
      });
    }
    
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}