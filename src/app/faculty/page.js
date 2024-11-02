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
} from "@/components/ui/pagination"

export default function Faculty() {
  const [teachers, setTeachers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
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


 {loading && <Spinner />}

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHero />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#a6192e]">Our Faculty</h1>
        <div className="flex items-center">
          <Pagination className="w-fit">
            <PaginationPrevious className={page === 1 ? "opacity-50 cursor-not-allowed" : ""} onClick={() => setPage(page - 1)} />
            <PaginationNext className={teachers.length === 0 ? "opacity-50 cursor-not-allowed" : ""} onClick={() => setPage(page + 1)} />
          </Pagination>
        </div>
      </div>
      
      <div className="mb-6">
        <Select onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teachers</SelectItem>
            <SelectItem value="retired">Retired</SelectItem>
            <SelectItem value="current">Current</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>    

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teachers.length === 0 && <div>No teachers found</div>}
      {teachers && teachers.map((teacher) => (
          <Card key={teacher.id}>
            <CardContent className="p-6 flex flex-col items-center">
              <Image
                src={teacher.imageUrl? teacher.imageUrl : "/placeholder.svg"} // Use the image from the API or a placeholder
                alt={teacher.title || teacher.designation} // Use title or designation as alt text
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 text-[#585252]">{teacher.title || "No Name"}</h2>
              <p className="text-[#585252] mb-2">{teacher.designation || "No Designation"}</p>
              <p className="text-[#585252] mb-2">{teacher.educationBackground || "No Education Background"}</p>
              <p className="text-[#585252] mb-4">{teacher.mobileNo || "No Mobile Number"}</p>
              <Button asChild className="bg-[#e81727] hover:bg-[#c71522] text-white">
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