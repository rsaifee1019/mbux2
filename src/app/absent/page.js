"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Search, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])
  const [filter, setFilter] = useState({ department: '', class: '' })
  const [isLoading, setIsLoading] = useState(false)

  const departments = [
    { value: 'science', label: 'বিজ্ঞান' },
    { value: 'hscience', label: 'গৃহ বিজ্ঞান' },
    { value: 'humanities', label: 'মানবিক' },
  ]

  const classes = [
    { value: 'degree', label: 'ডিগ্রি' },
    { value: 'hsc', label: 'এইচএসসি' },
    { value: 'masters', label: 'মাস্টার্স' },
    { value: 'honors', label: 'অনার্স' },
  ]

  useEffect(() => {
    fetchStudents()
  }, [filter])

  async function fetchStudents() {
    setIsLoading(true)
    try {
      const res = await axios.post('/api/searchStudents', { filter: filter })
      setSearchResults(res.data)
    } catch (err) {
      console.log('err', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (e) => {
    const value = e.target.value
    setSearchTerm(value)

    if (value.trim()) {
      setIsLoading(true)
      try {
        const response = await axios.post('/api/searchStudents', { query: value })
        setSearchResults(response.data)
      } catch (error) {
        console.error('Error fetching results:', error)
      } finally {
        setIsLoading(false)
      }
    } else {
      setSearchResults([])
    }
  }

  const handleSelectStudent = (student) => {
    if (!selectedStudents.some(s => s._id === student._id)) {
      setSelectedStudents([...selectedStudents, student])
    }
  }

  const handleRemoveStudent = (studentId) => {
    setSelectedStudents(selectedStudents.filter(student => student._id !== studentId))
  }

  const handleSubmit = async () => {
    try {
      await axios.post('/api/absent', { studentIds: selectedStudents.map(student => student._id) })
      alert("অনুপস্থিতি নোটিফিকেশন পাঠানো হয়েছে!")
      setSelectedStudents([])
    } catch (err) {
      console.log('err', err)
      alert("একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।")
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>অনুপস্থিতি তালিকা</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-[1fr,1fr,1fr,auto] items-end">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="নাম বা রোল নম্বর লিখুন..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-8"
              />
            </div>
            <Select value={filter.department} onValueChange={(value) => setFilter({ ...filter, department: value })}>
              <SelectTrigger>
                <SelectValue placeholder="বিভাগ" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.value} value={dept.value}>{dept.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filter.class} onValueChange={(value) => setFilter({ ...filter, class: value })}>
              <SelectTrigger>
                <SelectValue placeholder="ক্লাস" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.value} value={cls.value}>{cls.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={fetchStudents}>
              প্রয়োগ
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>সব ছাত্র</span>
              <Badge variant="secondary">{searchResults.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {isLoading ? (
                <p className="text-center text-muted-foreground">লোড হচ্ছে...</p>
              ) : searchResults.length > 0 ? (
                searchResults.map((student) => (
                  <div
                    key={student._id}
                    onClick={() => handleSelectStudent(student)}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
                  >
                    <span>{student.name}</span>
                    <Badge variant="outline">{student.roll}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground">কোন ছাত্র পাওয়া যায়নি</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>আজকের অনুপস্থিত</span>
              <Badge variant="destructive">{selectedStudents.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {selectedStudents.map((student) => (
                <div
                  key={student._id}
                  className="flex items-center justify-between p-2 rounded-md bg-accent"
                >
                  <span>{student.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveStudent(student._id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              onClick={handleSubmit}
              className="w-full mt-4"
              disabled={selectedStudents.length === 0}
            >
              জমা দিন
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}