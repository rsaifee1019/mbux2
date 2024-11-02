import Fee from "@/models/Fee";
import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongodb";

export async function GET(request) {
    await connectionToDatabase()
    const fees = await Fee.find()
    return NextResponse.json(fees);
}