import Receipt from "@/components/Reciept";
import Spinner from "@/components/Spinner";

export default async function Success({ searchParams }) {
  const tran_id = searchParams.tran_id;
  console.log(tran_id)

  // Initialize loading state
  let loading = true;
  let data = null;
  let error = null;

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

  return (
    <Receipt 
      studentName={data.student ? data.student.name : data.applicant.name}
      studentId={data.student ? data.student.studentId : data.applicant.ssc_registration}
      transactionId={data.payment.transactionId}
      paymentType={data.payment.paymentType}
      amount={data.payment.amount}
      date={data.payment.paymentDate}
    />
  );
}