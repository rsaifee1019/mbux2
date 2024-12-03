import connectionToDatabase from "@/lib/mongodb";
import Student from "@/models/Student";
import Absent from "@/models/Absent";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
    let {studentIds} = await req.json();

    let existingStudentIds = [];
    await connectionToDatabase();
    const date = new Date().setHours(0, 0, 0, 0);
    
    let absent = await Absent.findOne({date});
    if(!absent){
     absent = await Absent.create({ date});
   
    }
   
    console.log(absent);
    if(absent){
         existingStudentIds = absent.studentId || []; // Ensure existingStudentIds is defined
        // Check if existingStudentIds is empty
        if (existingStudentIds.length === 0) {
            studentIds = [...studentIds]; // No filtering needed, use all studentIds
        } else {
            const newStudentIds = studentIds.filter(id => !existingStudentIds.includes(id));
            if(newStudentIds.length === 0){
                return NextResponse.json({error: "sent already"}, {status: 200});
            }
            studentIds = newStudentIds;
        }
    }
  
   

    const students = await Student.find({_id: {$in: studentIds}});
    const messages = students.map(student => {
        let phone = student.guardianPhone;
        if(phone.startsWith('0')){
            phone = phone.slice(1);
        }
    
        
        
        return ({to: `880${phone}`,
             message: `প্রিয় অভিভাবক, ${student.name} আজ অনুপস্থিত।`})
    });

    const smsData = {
        api_key: process.env.NEXT_PUBLIC_SMS_API_KEY,
        senderid: process.env.NEXT_PUBLIC_SMS_SENDER_ID,
        messages: messages
    };

    await Absent.findByIdAndUpdate(absent._id, {studentId: [...existingStudentIds, ...studentIds]});

    // Send the SMS using axios
    try {
        const res = await axios.post("http://bulksmsbd.net/api/smsapimany", smsData);
        console.log(smsData);
        return NextResponse.json({message: "sent"}, {status: 200});
    } catch (error) {
        console.error("Error sending SMS:", error);
        return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
    }
   
}