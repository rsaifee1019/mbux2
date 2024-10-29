"use client"

import { useState, useEffect } from "react"
import Receipt from "@/components/Reciept";
import Spinner from "@/components/Spinner";
import Cookies from "js-cookie"

export const dynamic = 'force-dynamic'
export default function Success() {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
          try {
            setLoading(true);
            // Check if we are in the browser
          
              const tran_id = Cookies.get("tran_id");
              if (!tran_id) {
                setError('Transaction ID not found in localStorage');
                return;
              }
              
              const response = await fetch(`/api/info/${tran_id}`);
              if (!response.ok) {
                throw new Error('Failed to fetch payment details');
              }
              
              const data = await response.json();
              setData(data);
           
          } catch (err) {
            console.error('Error fetching payment:', err);
            setError(err.message);
          } finally {
            setLoading(false);
          }
        }
    
        fetchData();
      }, []);
  
    if (loading) return <Spinner />
    if (error) return <div>Error: {error}</div>
    return <Receipt 
      studentName={data.student ? data.student.name : data.applicant.name}
      studentId={data.student ? data.student.studentId : data.applicant.ssc_registration}
      transactionId={data.payment.transactionId}
      paymentType={data.payment.paymentType}
      amount={data.payment.amount}
      date={data.payment.paymentDate}
    />
}