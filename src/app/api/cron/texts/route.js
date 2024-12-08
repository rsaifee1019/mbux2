import { NextResponse } from 'next/server';
import connectionToDatabase from '@/lib/mongodb';
import FeeRecord from '@/models/FeeRecord';
import Student from '@/models/Student';
import axios from 'axios';


export async function POST(req) {
if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await connectionToDatabase();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const fees = await FeeRecord.find({ month, year, status: 'PENDING' });
  if(fees.length === 0){
    return NextResponse.json({ message: 'No fees to send' }, { status: 200 });
  }
  const studentIds = fees.map(fee => fee.studentId);
  const students = await Student.find({_id: {$in: studentIds}});
  const messages = students.map(student => {
    let phone = student.guardianPhone;
    if(phone.startsWith('0')){
        phone = phone.slice(1);
    }

    const fee = fees.find(fee => fee.studentId === student._id);
    return ({to: `880${phone}`,
             message: `প্রিয় অভিভাবক, ${student.name} এর ${fee.month.getMonth() + 1} মাসের বেতন জমাপ্রাপ্ত হয় নি।  অনুগ্রহ করে বেতন ${fee.amount} টাকা পরিশোধ করুন। `})
  });
  
  return NextResponse.json({ message: 'Message received' }, { status: 200 });
}