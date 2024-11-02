"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/Spinner';
import Image from 'next/image';
import Error from '@/components/Error';
import Cookies  from "js-cookie"
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
    name:'',
    phone:''
  });

  const paymentTypes = {
    interTuition: 300,
    mastersTuition: 100,
    honsTuition: 100
  };
const fetchFees = async () => {
    const response = await fetch(`/api/fees`);
    const data = await response.json();
    setFees(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchFees();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    const response = await fetch(`/api/student`, {
      method: 'POST',
      body: JSON.stringify(formData)
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
    console.log(formData)
  };

  if (loading) {
    return <Spinner />;
  }
  if(error){
    return <Error />
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">ফি পরিশোধ</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <Label htmlFor="paymentType">ফি এর উদ্দেশ্য </Label>
            <select
              id="paymentType"
              name="paymentType"
              className="w-full rounded-md border border-gray-300 p-2"
              required
              value={formData.paymentType}
              onChange={handleInputChange}
            >
              <option value="">বাছাই করুন</option>
              {Array.from(new Set(fees.map(fee => fee.subtype))).map((subtype, index) => {
                console.log(`Subtype: ${subtype}`); // Log the subtype for debugging
                return (
                  <option key={index} value={subtype}>{subtype}</option>
                );
              })}
            </select>
          </div>

          {formData.paymentType && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-lg font-semibold">
              পরিমান: Tk {paymentTypes[formData.paymentType]}
              </p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter>
     {buttonLoading ?   <Button 
    
      onClick={handleSubmit}
   
        className="w-full py-2 rounded-md"
     
      >
        <Image src="/spinner-white.svg" alt="Loading..." width={40} height={40} />
      </Button>
     : (
        <Button 
       
        
          type="submit"
          className="w-full py-2 rounded-md"
          onClick={handleSubmit}
        >
          Proceed to Payment
        </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Fees;