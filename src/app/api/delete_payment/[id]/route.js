import Payment from "@/models/Payment";
import Student from "@/models/Student";
import Applicant from "@/models/Applicant";
import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongodb";

export async function DELETE(req, {params}){
    await connectionToDatabase()

    const transactionId = params.id

    const payment = await Payment.findOne({transactionId: transactionId})
    console.log(payment)

    if(payment.userType === 'applicant'){
       const applicant = await Applicant.findOne({applicantId: payment.applicantId})
       const personalDetails = await PersonalDetails.findOne({personalDetailsId: applicant.personalDetailsId})
       await personalDetails.deleteOne()
       await applicant.deleteOne()
     
    }
    await payment.deleteOne()
    return NextResponse.json({message: 'Payment deleted'}, {status: 200})
}