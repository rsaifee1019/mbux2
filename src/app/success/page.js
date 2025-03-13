import Receipt from "@/components/Reciept";
import Spinner from "@/components/Spinner";
import Payment from "@/models/Payment";
import connectionToDatabase from "@/lib/mongodb";
import Applicant from "@/models/Applicant";
import Student from "@/models/Student";

export default async function Success({ searchParams }) {
  const tran_id = searchParams.tran_id;
  await connectionToDatabase();


  // Initialize loading state
  let loading = true;
  let data = null;
  let error = null;

  console.log("Attempting to find payment...");
  const payment = await Payment.findOne({ transactionId: tran_id });
  console.log("Payment found:", payment);
  let applicant;
  if (payment.userType === 'applicant') {
    console.log("Finding applicant...");
    applicant = await Applicant.findOne({ ssc_registration: payment.applicantId });
    console.log("Applicant found:", applicant);
  }

  let student;
  if (payment.userType === 'student') {
    console.log("Finding student with ID:", payment.studentId);
    student = await Student.findOne({ studentId: payment.studentId });
    console.log("Student found:", student);
  }



  async function fetchData() {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; // Fallback to localhost
      const response = await fetch(`${baseUrl}/api/info/${tran_id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch payment details');
      }
      const fetchedData = await response.json();
   
      return fetchedData;

    } catch (err) {
      console.error('Error fetching payment:', err);
      error = err.message; // Capture the error message
      return null; // Return null if there's an error
    } finally {
      loading = false; // Set loading to false after fetching
    }
  }

  data = await fetchData();

  // Handle loading state
  if (loading) {
    return <Spinner />;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Ensure data is defined before accessing its properties
  if (!data) {
    return <div>No data available</div>;
  }

  console.log("Transaction ID:", tran_id); // Log the transaction ID

  return (
    <Receipt 
      studentName={data.student?.name || data.applicant?.name || 'Unknown'}
      studentId={data.student?.studentId || data.applicant?.ssc_registration || 'Unknown'}
      transactionId={data.payment.transactionId}
      paymentType={data.payment.paymentType}
      amount={data.payment.amount}
      date={data.payment.paymentDate}
      months={data.payment.months}
    />
  );
}