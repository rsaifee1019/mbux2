'use client';
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



const AdminSetFee = ({ feeId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    degree: '',
    type: '', // Changed from undefined to empty string
    subtype: '',
    amount: '',
    link: '',
    image: '',
    year: '',
    dateUploaded: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (feeId && feeId !== 'new') {
        try {
          const response = await fetch(`/api/admin/SetAd/${feeId}`);
          if (!response.ok) throw new Error('Failed to fetch post');
          const data = await response.json();
          setFormData(data);
          setIsEditing(true);
        } catch (err) {
          setError('Failed to fetch post details');
        }
      }
    };

    fetchEvent();
  }, [feeId]);
  
  useEffect(() => {
    console.log(formData)
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUrl = (url) => {
    setFormData(prev => ({
      ...prev,
      image: url
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEditing 
        ? `/api/admin/SetAd/${feeId}`
        : '/api/admin/SetAd';
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Something went wrong');
      }

      router.push('/admin');
      router.refresh();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Event' : 'Create New Fee'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <label htmlFor="degree" className="block text-sm font-medium">
              Degree
            </label>
            <Input
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              placeholder="Enter degree"
            />
          </div>
          
          {/* New Type Selection using shadcn Select component */}
          
          
          <div className="space-y-2">
            <label htmlFor="subtype" className="block text-sm font-medium">
             Type
            </label>
            <Input
              id="subtype"
              name="subtype"
              value={formData.subtype}
              onChange={handleChange}
              required
              placeholder="Enter type"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="year" className="block text-sm font-medium">
              Year
            </label>
            <Input
              id="year"
              name="year"
              value={formData.year || ''}
              onChange={handleChange}
              placeholder="Enter year"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium">
              Amount
            </label>
            <Input
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              placeholder="Enter amount"
              type="number"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium">
              Fund
            </label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange('type', value)}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
       
                <SelectItem value="general">সাধারণ </SelectItem>
                <SelectItem value="tuition">টিউশন </SelectItem>
                <SelectItem value="external">বহিঃ-পরীক্ষা </SelectItem>
                <SelectItem value="internal">অভ্যন্তরীণ </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Saving...' : isEditing ? 'Update Fee' : 'Create Fee'}
            </Button>
            
            <Button 
              type="button"
              variant="outline"
              onClick={() => router.push('/admin')}
            >
              Cancel  
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminSetFee;