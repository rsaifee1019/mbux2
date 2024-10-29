import Fee from "@/models/Fee";
import { NextResponse } from "next/server";

export async function GET(request) {
    const fees = await Fee.findAll();
    return NextResponse.json(fees);
}