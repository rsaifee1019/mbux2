import connectionToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from 'next/server';
export async function GET(req, { params }) {
    await connectionToDatabase();
    const user = await User.findById(params.id);
    return NextResponse.json(user);
}

export async function PATCH(req, { params }) {
    await connectionToDatabase();
    const user = await User.findByIdAndUpdate(params.id, req.body, { new: true });
    return NextResponse.json(user);
}

export async function DELETE(req, { params }) {
    await connectionToDatabase();
    const user = await User.findByIdAndDelete(params.id);
    return NextResponse.json(user);
}
