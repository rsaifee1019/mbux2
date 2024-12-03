import connectionToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from 'next/server';

export async function GET() {
    await connectionToDatabase();
    const users = await User.find();
    return NextResponse.json(users);
}
