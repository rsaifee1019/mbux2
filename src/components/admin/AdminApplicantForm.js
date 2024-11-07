'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminApplicantForm = ({ applicantId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ssc_registration: '',
    name_English: '',
    application_date: new Date().toISOString().split('T')[0],
    status: 'unpaid',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchApplicant = async () => {
      if (applicantId && applicantId !== 'new') {
        try {
          const response = await fetch(`/api/admin/applicants/${applicantId}`);
          if (!response.ok) throw new Error('Failed to fetch applicant');
          const data = await response.json();
          setFormData({
            ssc_registration: data.ssc_registration || '',
            name_English: data.name_English || '',
            application_date: new Date(data.application_date).toISOString().split('T')[0],
            status: data.status || 'unpaid',
            phone: data.phone || '',
          });
          setIsEditing(true);
        } catch (err) {
          setError('Failed to fetch applicant details');
        }
      }
    };

    fetchApplicant();
  }, [applicantId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEditing 
        ? `/api/admin/applicants/${applicantId}`
        : '/api/admin/applicants';
      
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

      router.push('/admin/applicants');
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
        <CardTitle>{isEditing ? 'Edit Applicant' : 'Create New Applicant'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <label htmlFor="ssc_registration" className="block text-sm font-medium">
              SSC Registration Number *
            </label>
            <Input
              id="ssc_registration"
              name="ssc_registration"
              value={formData.ssc_registration}
              onChange={handleChange}
              required
              placeholder="Enter SSC registration number"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="name_English" className="block text-sm font-medium">
              Name (English) *
            </label>
            <Input
              id="name_English"
              name="name_English"
              value={formData.name_English}
              onChange={handleChange}
              required
              placeholder="Enter name in English"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="application_date" className="block text-sm font-medium">
              Application Date
            </label>
            <Input
              id="application_date"
              name="application_date"
              type="date"
              value={formData.application_date}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-medium">
              Status
            </label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Saving...' : isEditing ? 'Update Applicant' : 'Create Applicant'}
            </Button>
            
            <Button 
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/applicants')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminApplicantForm;
