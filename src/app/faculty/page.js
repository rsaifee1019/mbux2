'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PageHero from '@/components/PageHero'
import Spinner from '@/components/Spinner'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.jsx"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Faculty() {
  const [teachers, setTeachers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // Fetch teachers data
  const fetchTeachers = async () => {
    const response = await fetch(`/api/teachers?page=${page}&status=${filter}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch teachers');
    }
    const data = await response.json();
    setTeachers(data);
  };

  useEffect(() => {
    fetchTeachers().catch((error) => console.error(error));
  }, [page, filter]);
  useEffect(() => {
      setLoading(false);
  },[teachers]);

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Sign in attempted with:', userId, password);
  };

  {loading && (
  <div className='h-[100vh] w-[95vw] bg-slate-600 flex justify-center items-center'>
  <Spinner />
  </div>)}

  return (
    <div className="container mx-auto px-4 pb-8">
     { /*  <section className="relative h-[500px] flex items-center justify-center text-center text-white">
<Image
      src="/faculty.jpeg"
      alt="University campus"
      layout="fill"
      objectFit="cover"
      className="absolute inset-0 z-0 "
    />
    <div className="absolute z-10 h-full w-full bg-transparent/30 flex items-center justify-center">
      <h1 className="text-4xl md:text-8 xl font-bangla">ফ্যাকাল্টি শাখা</h1>
    

    </div>
  </section>*/}

    
    <Dialog open={showSignIn} onOpenChange={setShowSignIn}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your user ID"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#e81727] hover:bg-[#c71522] text-white"
          >
            Sign In
          </Button>
        </form>
      </DialogContent>
    </Dialog>


   



         
     
    
    
  
      
      <div className="mb-6 flex items-center justify-between gap-4 px-4 md:mt-8">
      <h1 className="text-4xl md:text-8 xl font-bangla md:w-40">         </h1>
      <h1 className="text-4xl md:text-5xl  text-accent">ফ্যাকাল্টি শাখা</h1>
      
  
        <Select className='border border-gray-500 text-black' onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="সব ফ্যাকাল্টি" />
          </SelectTrigger>
          <SelectContent className='border border-gray-500 text-black' >
            <SelectItem value="all">সব ফ্যাকাল্টি</SelectItem>
            <SelectItem value="retired">প্রাক্তন শিক্ষকবৃন্দ</SelectItem>
            <SelectItem value="current">বর্তমান শিক্ষকবৃন্দ</SelectItem>
            <SelectItem value="staff">স্টাফ </SelectItem>
          </SelectContent>
        </Select>
      
      </div>    

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      {teachers.length === 0 && (
        <div className='h-[70vh] w-[95vw]  flex justify-center items-center'>
  <Image src="/Spinner.svg" alt="Loading..." width={100} height={100} />
  </div>
      )}
      {teachers && teachers.map((teacher) => (
          <Card key={teacher.id} className='rounded-none'>
            <CardContent className="p-6 flex flex-col items-center">
              <Image
                src={teacher.imageUrl? teacher.imageUrl : "/logo-icon.jpg"} // Use the image from the API or a placeholder
                alt={teacher.title || teacher.designation} // Use title or designation as alt text
                width={150}
                height={150}
                className=" mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 text-[#585252]">{teacher.title || "No Name"}</h2>
              <p className="text-[#585252] ">{teacher.designation || "No Designation"}</p>
              <p className="text-[#585252] ">{teacher.educationBackground || "No Education Background"}</p>
              <p className="text-[#585252] ">{teacher.mobileNo || "No Mobile Number"}</p>
              <Button asChild className="bg-primary text-white">
                <Link href={`/faculty/${teacher.id}`}>View Profile</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination className="mt-6">
      <div className="flex justify-between items-center">
        <PaginationPrevious onClick={() => setPage(page - 1)} />
        <PaginationNext onClick={() => setPage(page + 1)} />
      </div>
      </Pagination>
    </div>
  );
}