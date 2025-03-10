"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Spinner from '@/components/Spinner';
import Image from 'next/image';
import Error from '@/components/Error';
import Cookies from "js-cookie";

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    year: '',
    degree: '',
    paymentType: '',
    name: '',
    phone: '',
    selectedMonths: []
  });
  const [feesData, setFeesData] = useState([]);
  const [baseAmount, setBaseAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  
  // List of months
  const months = [
    { id: 'january', label: 'জানুয়ারী' },
    { id: 'february', label: 'ফেব্রুয়ারী' },
    { id: 'march', label: 'মার্চ' },
    { id: 'april', label: 'এপ্রিল' },
    { id: 'may', label: 'মে' },
    { id: 'june', label: 'জুন' },
    { id: 'july', label: 'জুলাই' },
    { id: 'august', label: 'আগস্ট' },
    { id: 'september', label: 'সেপ্টেম্বর' },
    { id: 'october', label: 'অক্টোবর' },
    { id: 'november', label: 'নভেম্বর' },
    { id: 'december', label: 'ডিসেম্বর' }
  ];

  const fetchFees = async () => {
    const response = await fetch(`/api/fees`);
    const data = await response.json();
    const filteredArray = data.filter(function(item) {
      return item.subtype !== 'admission';
    });

    setFees(data);
    setFeesData(data);
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.selectedMonths.length === 0 && formData.paymentType === 'tuition-fee') {
      alert('দয়া করে কমপক্ষে একটি মাস নির্বাচন করুন।');
      return;
    }
    
    setButtonLoading(true);
    
    // Add selected months to the payload
    const payloadData = {
      ...formData,
      amount: totalAmount // Use the calculated total amount
    };
    
    const response = await fetch(`/api/student`, {
      method: 'POST',
      body: JSON.stringify(payloadData)
    });
    
    if(response.status === 400){
      setError(true);
      setButtonLoading(false);
      return;
    }

    const data = await response.json()
    Cookies.set('tran_id', data.tran_id)
    
    const response2 = await fetch(`/api/studentpay`, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    const data2 = await response2.json()
    window.location.href = data2.GatewayPageURL
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMonthChange = (monthId) => {
    setFormData(prev => {
      const selectedMonths = [...prev.selectedMonths];
      
      if (selectedMonths.includes(monthId)) {
        // Remove month if already selected
        return {
          ...prev,
          selectedMonths: selectedMonths.filter(id => id !== monthId)
        };
      } else {
        // Add month if not selected
        return {
          ...prev,
          selectedMonths: [...selectedMonths, monthId]
        };
      }
    });
  };

  useEffect(() => {
    if(formData.paymentType && formData.degree){
      try{
        const fee = feesData.find(fee => 
          fee.subtype === formData.paymentType && 
          fee.degree === formData.degree
        );
        
        setBaseAmount(fee?.amount || 0);
      } catch(error){
        setBaseAmount(0);
      }
    }

    if(formData.paymentType === 'test-exam'){
      try{
        const fee = feesData.find(fee => 
          fee.subtype === formData.paymentType && 
          fee.degree === formData.degree && 
          fee.year === formData.year
        );
        setBaseAmount(fee?.amount || 0);
      } catch(error){
        setBaseAmount(0);
      }
    }
  }, [formData.paymentType, formData.degree, formData.year, feesData]);

  // Calculate total amount based on selected months
  useEffect(() => {
    if (formData.paymentType === 'tuition-fee') {
      setTotalAmount(baseAmount * formData.selectedMonths.length);
    } else {
      setTotalAmount(baseAmount);
    }
  }, [baseAmount, formData.selectedMonths, formData.paymentType]);

  if (loading) {
    return <Spinner />;
  }
  
  if(error){
    return <Error />
  }

  return (
    <Card className="w-full max-w-md mx-auto my-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">ফি পরিশোধ ফর্ম</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            <div className="space-y-2">
              <Label htmlFor="degree">ডিগ্রী</Label>
              <select
                id="degree"
                name="degree"
                className="w-full rounded-md border border-gray-300 p-2"
                required
                value={formData.degree}
                onChange={handleInputChange}
              >
                <option value="">বাছাই করুন</option>
                {Array.from(new Set(fees.map(fee => fee.degree))).map((degree, index) => (
                  <option key={index} value={degree}>{degree}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">বর্ষ</Label>
              <select
                id="year"
                name="year"
                className="w-full rounded-md border border-gray-300 p-2"
                required
                value={formData.year}
                onChange={handleInputChange}
              >
                <option value="">বাছাই করুন</option>
                <option value={1}>১ম বর্ষ</option>
                <option value={2}>২য় বর্ষ</option>
                <option value={3}>৩য় বর্ষ</option>
                <option value={4}>৪র্থ বর্ষ</option>
              </select>
            </div>
          </div>
        
          <div className="space-y-2">
            <Label htmlFor="name">নাম</Label>
            <Input
              id="name"
              name="name"
              placeholder="নাম লিখুন "
              required
              className="w-full"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-between">  
            <div className="space-y-2">
              <Label htmlFor="studentId">রোল নং</Label>
              <Input
                id="studentId"
                name="studentId"
                placeholder="রোল নং লিখুন "
                required
                className="w-full"
                value={formData.studentId}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">মোবাইল নং</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="মোবাইল নং লিখুন "
                required
                className="w-full"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="paymentType">ফি এর উদ্দেশ্য</Label>
            <select
              id="paymentType"
              name="paymentType"
              className="w-full rounded-md border border-gray-300 p-2"
              required
              value={formData.paymentType}
              onChange={handleInputChange}
            >
              <option value="">বাছাই করুন</option>
              {Array.from(new Set(fees.map(fee => fee.subtype))).map((subtype, index) => (
                <option key={index} value={subtype}>{subtype}</option>
              ))}
            </select>
          </div>
  
          {/* Month selection appears only when payment type is tuition-fee */}
          {formData.paymentType === 'tuition' && (
            <div className="space-y-2">
              <Label>মাস নির্বাচন করুন</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {months.map((month) => (
                  <div key={month.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`month-${month.id}`}
                      checked={formData.selectedMonths.includes(month.id)}
                      onCheckedChange={() => handleMonthChange(month.id)}
                    />
                    <label
                      htmlFor={`month-${month.id}`}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {month.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(formData.paymentType && formData.paymentType !== 'tuition-fee') || 
          (formData.paymentType === 'tuition-fee' && formData.selectedMonths.length > 0) ? (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-lg font-semibold">
                পরিমান: {totalAmount ? `Tk ${totalAmount}` : '?'}
              </p>
              {formData.paymentType === 'tuition-fee' && formData.selectedMonths.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  ({formData.selectedMonths.length} মাস × Tk {baseAmount})
                </p>
              )}
            </div>
          ) : null}
        </form>
      </CardContent>
      <CardFooter className='flex justify-end'>
        {buttonLoading ? (
          <Button className="w-24 py-2 rounded-[20px]">
            <Image src="/spinner-white.svg" alt="Loading..." width={40} height={40} />
          </Button>
        ) : (
          <Button 
            type="submit"
            className="w-24 py-2 rounded-[20px]"
            onClick={handleSubmit}
          >
            জমা দিন
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Fees;