// site/src/components/PaymentFailed.js
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowRight, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function FailPageLayout({payment, student, applicant}) {
  const [isRetrying, setIsRetrying] = useState(false);
  const router = useRouter()
  const handleRetry = async () => {
    setIsRetrying(true);
    // Simulate a payment retry
if (payment.userType === 'student'){
    const response = await fetch(`/api/studentpay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tran_id: payment.transactionId})
    })
    const data2 = await response.json()
    window.location.href = data2.GatewayPageURL
      // Here you would typically redirect to a payment gateway or update the UI based on the retry result
  }
  if (payment.userType === 'applicant'){
    const response = await fetch(`/api/init`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tran_id: payment.transactionId})
    })

  }
  };

  const handleCancel = async () => {
    // Here you would typically redirect to a cancellation page or the home page
   const response = await fetch(`/api/delete_payment/${payment.transactionId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
   })
   if(response.ok){
    router.push('/')
   }

  };

  return (
    <div className='flex justify-center items-center h-screen'>
   <Card className='max-w-lg max-h-96 pt-6'>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>ত্রুটি</AlertTitle>
          <AlertDescription>
            আপনার কার্ডের তথ্য যাচাই করা যায়নি। অনুগ্রহ করে আপনার তথ্য পরীক্ষা করুন এবং আবার চেষ্টা করুন।
          </AlertDescription>
        </Alert>
        <p className="text-sm text-muted-foreground">
          সম্ভাব্য কারণ: অপর্যাপ্ত তহবিল, কার্ড সীমা অতিক্রম, বা নেটওয়ার্ক সমস্যা।
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          onClick={handleRetry} 
          className="w-full" 
          disabled={isRetrying}
        >
          {isRetrying ? (
            <span className="flex items-center">
              পেমেন্ট পুনরায় চেষ্টা করা হচ্ছে...
            </span>
          ) : (
            <span className="flex items-center">
              পেমেন্ট পুনরায় চেষ্টা করুন <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          )}
        </Button>
        <Button 
          onClick={handleCancel} 
          variant="outline" 
          className="w-full"
        >
          <span className="flex items-center">
            <XCircle className="mr-2 h-4 w-4" /> পেমেন্ট বাতিল করুন
          </span>
        </Button>
      </CardFooter>
      </Card>
    </div>
  );
}