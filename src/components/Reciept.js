"use client"
import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Receipt = ({ 
  studentName = "John Doe",
  studentId = "STU2024001",
  transactionId = "TRX987654321",
  paymentType = "Credit Card",
  amount = "5,000.00",
  date = "October 23, 2024",
  months =[]
}) => {
  const [html2pdf, setHtml2pdf] = useState(null);

  useEffect(() => {
    // Dynamically import html2pdf.js only in the browser
    const loadHtml2pdf = async () => {
      const { default: html2pdf } = await import('html2pdf.js');
      setHtml2pdf(() => html2pdf);
    };

    loadHtml2pdf();
  }, []);

  const handleDownloadPDF = () => {
    if (!html2pdf) return; // Ensure html2pdf is loaded

    const receipt = document.getElementById('receipt');
    const opt = {
      margin: 0.5,
      filename: `receipt-${transactionId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(receipt).save();
  };
  console.log(months)
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Receipt Card */}
        <div id="receipt" className="bg-white rounded-lg shadow-md p-8 mb-6">
          {/* Header */}
          <div className="text-center pb-8 border-b border-gray-200">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Image src="/logo-icon.jpg" alt="Logo" width={100} height={100} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">জামানত রিসিট</h1>
            <p className="text-gray-600">মাদার বখ্শ হোম ইকোনমিক্স কলেজ </p>
          </div>

          {/* Receipt Details */}
          <div className="mt-6 space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">তারিখ:</span>
              <span className="font-medium text-gray-800">
                <span className="font-medium text-gray-800 mr-2">{new Date(date).toLocaleDateString()}</span>
                {new Date(date).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">নাম:</span>
              <span className="font-medium text-gray-800">{studentName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">রোল নং:</span>
              <span className="font-medium text-gray-800">{studentId}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">রিসিট নং:</span>
              <span className="font-medium text-gray-800">{transactionId}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">জামানতের উদ্দেশ্য:</span>
              <span className="font-medium text-gray-800">{paymentType}</span>
            </div>

            {(months.length > 0) && (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Months</span>
                <div className="flex flex-wrap justify-start gap-x-2 max-w-[50%] text-right ">
                {months.map((month, index) => {
                  const date = new Date(month);
                  const formattedMonth = date.toLocaleDateString("bn-BD", { year: "numeric", month: "long" }); // Bangla format
                  return <span key={index} className="font-medium text-gray-800">{formattedMonth} {(index < months.length -1) && ','}</span>;
                })}
                </div>
              </div>
            )}
           
           
           
            {/* Amount */}
            <div className="mt-8 text-right">
              <span className="text-gray-600">জামানতের পরিমান</span>
              <div className="text-2xl font-bold text-text-red">Tk. {amount}</div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-gray-600 text-sm">
            <p> ধন্যবাদ। এটি একটি ইলেকট্রনিক রিসিট। </p>
            <p className='mt-1 text-lg text-text-red'> এই রিসিটসহ কলেজ অফিস এ আসতে অনুরোধ করা হলো </p>
          </div>
        </div>

        {/* Download Button */}
        <Button     
          onClick={handleDownloadPDF}
          className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium "
        >
          <Download size={20} />
          ডাউনলোড করুন
        </Button>
      </div>
    </div>
  );
};

export default Receipt;