import connectionToDatabase from "@/lib/mongodb";
import Student from "@/models/Student";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {studentIds} = await req.json();
    await connectionToDatabase();

    const students = await Student.find({_id: {$in: studentIds}});
    const messages = students.map(student => {
        
        
        return ({to: `88${student.phone}`,
             message: `প্রিয় অভিভাবক, ${student.name} আজ অনুপস্থিত।`})
    });

    const smsData = {
        api_key: process.env.NEXT_PUBLIC_SMS_API_KEY,
        senderid: process.env.NEXT_PUBLIC_SMS_SENDER_ID,
        messages: messages
    };
console.log(smsData);

    // Send the SMS using axios
    try {
        const res = await axios.post("http://bulksmsbd.net/api/smsapimany", smsData);
        return NextResponse.json(res.data);
    } catch (error) {
        console.error("Error sending SMS:", error);
        return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
    }
   
}