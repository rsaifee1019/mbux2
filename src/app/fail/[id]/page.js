import connectionToDatabase from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { redirect } from "next/navigation";
import Student from "@/models/Student";
import Applicant from "@/models/Applicant";
import FailPageLayout from "@/components/FailPageLayout";
export default async function FailPage({ params }) {
  await connectionToDatabase();
  let payment, applicant, student;

  payment = await Payment.findOne({ transactionId: params.id });
    
  if (payment.userType === 'student') {
    student = await Student.findOne({ studentId: payment.studentId });
    console.log(student);


    };


  if (payment.userType === 'applicant') {
    applicant = await Applicant.findOne({ applicantId: payment.applicantId });
   

 
  }

  // Ensure deleteOne is defined before rendering the button
  return (
    <FailPageLayout payment={payment} student={student} applicant={applicant}>
      
    </FailPageLayout>
  );
}