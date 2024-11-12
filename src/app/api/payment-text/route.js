import { NextResponse } from "next/server";
import Student from "@/models/Student";
import connectionToDatabase from "@/lib/mongodb";
import axios from "axios";

export async function GET(request) {
    await connectionToDatabase();

    // Extract studentId from query parameters
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");

    // Find the student using the studentId
    const student = await Student.findOne({ studentId });

    // Prepare the SMS data
    const smsData = {
        api_key: "oEKM8g9x0ugr5prM1K2V",
        senderid: "8809617622219",
        messages: [
            {
                to: "8801329671994", // Replace with the actual recipient number
                message: "Hello Mr.Romel, do your work in Nabil Group? Can we talk? kjsdfj"
            },
        ]
    };


    // Send the SMS using axios
    try {
        const res = await axios.post("http://bulksmsbd.net/api/smsapimany", smsData);
        return NextResponse.json(res.data);
    } catch (error) {
        console.error("Error sending SMS:", error);
        return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
    }
}   