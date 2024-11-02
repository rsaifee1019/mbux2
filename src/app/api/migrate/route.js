import connectionToDatabase from '@/lib/mongodb';
import Teacher3 from '@/models/Teacher';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
    await connectionToDatabase();
    const teachers = await Teacher3.find();
    for (const teacher of teachers) {
        console.log(teacher.title);
        teacher.status = "current";
        console.log(teacher.status);
        await teacher.save();
    }
    return NextResponse.json(teachers);
}