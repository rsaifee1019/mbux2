"use client"

import { useState, useEffect } from "react"
import Receipt from "@/components/Reciept"
import Spinner from "@/components/Spinner"
import { useRouter } from 'next/navigation'

// Remove the dynamic export since we're using "use client"
export default function Success() {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        let isMounted = true

        async function fetchData() {
          try {
            if (!isMounted) return

            // Add check for window
            if (typeof window === 'undefined') return

            const Cookies = (await import('js-cookie')).default
            const tran_id = Cookies.get("tran_id")

            if (!tran_id) {
              setError('Transaction ID not found')
              setLoading(false)
              // Optionally redirect to home or error page
              router.push('/')
              return
            }
            
            const response = await fetch(`/api/info/${tran_id}`)
            if (!response.ok) {
              throw new Error('Failed to fetch payment details')
            }
            
            if (isMounted) {
              const responseData = await response.json()
              setData(responseData)
            }
           
          } catch (err) {
            if (isMounted) {
              console.error('Error fetching payment:', err)
              setError(err.message)
            }
          } finally {
            if (isMounted) {
              setLoading(false)
            }
          }
        }
    
        fetchData()

        // Cleanup function
        return () => {
          isMounted = false
        }
    }, [router])

    // Add null check for data
    if (loading) return <Spinner />
    if (error) return <div>Error: {error}</div>
    if (!data) return <div>No payment data found</div>

    // Safely access nested properties
    const getName = () => {
      try {
        return data.student?.name || data.applicant?.name || 'N/A'
      } catch (e) {
        return 'N/A'
      }
    }

    const getId = () => {
      try {
        return data.student?.studentId || data.applicant?.ssc_registration || 'N/A'
      } catch (e) {
        return 'N/A'
      }
    }

    return (
      <Receipt 
        studentName={getName()}
        studentId={getId()}
        transactionId={data.payment?.transactionId || 'N/A'}
        paymentType={data.payment?.paymentType || 'N/A'}
        amount={data.payment?.amount || 'N/A'}
        date={data.payment?.paymentDate || 'N/A'}
      />
    )
}