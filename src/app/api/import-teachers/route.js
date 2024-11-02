// src/app/api/import-teachers/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Teacher3 from '@/models/Teacher';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import connectionToDatabase from '@/lib/mongodb';

// MongoDB connection URI
const uri = "mongodb+srv://mbuxbd:rzrz0H3ScGu1U1C7@mbux.nlzep.mongodb.net/mbux?retryWrites=true&w=majority&appName=mbux";

// Connect to MongoDB
export async function GET() {
  try {
    console.log("pressed on import teachers");
    await connectionToDatabase();
    console.log("connected to database");
    const filePath = path.join(process.cwd(), 'src', 'teachers.csv');
    const teachers = [];

    // Read and parse the CSV file
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {


          const teacherData = {
            id: data['id'],
            imageUrl: data['Image URL'],
            title: data['Title'],
            publicationDate: new Date(data['Publication Date']),
            nationalId: data['National ID'],
            gender: data['Gender'],
            religion: data['Religion'],
            bloodGroup: data['Blood Group'],
            mobileNo: data['Mobile No'],
            email: data['Email'],
            designation: data['Designation'],
            educationQualifications: data['Education Qualifications'],
            educationBackground: data['Education Background'],
            presentAddress: data['Present Address'],
            permanentAddress: data['Permanent Address'],
            maritalStatus: data['Marital Status'],
            fathersName: data["Father's Name"],
            mothersName: data["Mother's Name"],
            
          };

          // Log the image URL for each teacher
        // Log all teacher data
          console.log('Image URL:', teacherData.imageUrl); // Log the image URL specifically

          teachers.push(teacherData);
        })
        .on('end', async () => {
       // Log the parsed teachers
          try {
            console.log('teachers[2].imageUrl', teachers[2].imageUrl)
           const result = await  Teacher3.insertMany(teachers);
            resolve(NextResponse.json({ message: 'Teachers imported successfully!', result }));
          } catch (insertError) {
            console.error('Error inserting teachers:', insertError); // Log insertion error
            reject(NextResponse.json({ error: 'Failed to import teachers', details: insertError }));
          }
        })
        .on('error', (error) => {
          console.error('Error reading CSV:', error); // Log the error
          reject(NextResponse.json({ error: 'Failed to import teachers', details: error }));
        });
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error); // Log connection error
    return NextResponse.json({ error: 'Failed to connect to MongoDB', details: error });
  }
}
