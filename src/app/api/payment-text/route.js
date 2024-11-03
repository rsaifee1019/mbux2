import { getPaymentText } from "@/lib/payment-text";
import { NextResponse } from "next/server";
import Student from "@/models/Student";
import connectionToDatabase from "@/lib/mongodb";

export async function POST(request) {
    await connectionToDatabase();
    const { studentId } = await request.json();
    const student = await Student.find({studentId});
    const paymentText = await getPaymentText();
    return NextResponse.json(paymentText);
}