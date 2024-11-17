'use client';
import React, { useState, useEffect } from 'react';
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
import ImageUploader from '@/components/ImageUploader';
import axios from 'axios';

const AdminCreateEditTeacher = ({ teacherId }) => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchAuth0Users = async () => {
      try {
        const response = await fetch(`/api/admin/teachers/emails?_=${Date.now()}`);
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching Auth0 users:', error);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchAuth0Users();
  }, []);



  const router = useRouter();
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    userEmail: '',
    nationalId: '',
    gender: '',
    religion: '',
    bloodGroup: '',
    mobileNo: '',
    email: '',
    designation: '',
    educationQualifications: '',
    educationBackground: '',
    presentAddress: '',
    permanentAddress: '',
    maritalStatus: '',
    fathersName: '',
    mothersName: '',
    imageUrl: '',
    status: 'active'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setFormData(prev => ({ ...prev, imageUrl }));
    }
  }, [imageUrl]);

  useEffect(() => {
    const fetchTeacher = async () => {
      if (teacherId && teacherId !== 'new') {
        try {
          const response = await fetch(`/api/admin/teachers/${teacherId}`);
          if (!response.ok) throw new Error('Failed to fetch teacher');
          const data = await response.json();
          setFormData(data);
          setIsEditing(true);
        } catch (err) {
          setError('Failed to fetch teacher details');
        }
      }
    };

    fetchTeacher();
  }, [teacherId]);

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
        ? `/api/admin/teachers/${teacherId}`
        : '/api/admin/teachers';
      
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

      router.push(`/admin/teachers/${teacherId}`);
      router.refresh();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Teacher' : 'Create New Teacher'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Full Name *
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
            <label htmlFor="userEmail" className="text-sm font-medium">
              User Email *
            </label>
            <Select
              value={formData.userEmail}
              onValueChange={(value) => handleSelectChange('userEmail', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={formData.userEmail || 'Select user email'} />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.user_id} value={user.email}>
                    {user.name} ({user.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

            <div className="space-y-2">
              <label htmlFor="nationalId" className="text-sm font-medium">
                National ID
              </label>
              <Input
                id="nationalId"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="text-sm font-medium">
                Gender
              </label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleSelectChange('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="religion" className="text-sm font-medium">
                Religion
              </label>
              <Input
                id="religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="bloodGroup" className="text-sm font-medium">
                Blood Group
              </label>
              <Select
                value={formData.bloodGroup}
                onValueChange={(value) => handleSelectChange('bloodGroup', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                    <SelectItem key={group} value={group}>{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="mobileNo" className="text-sm font-medium">
                Mobile Number
              </label>
              <Input
                id="mobileNo"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="designation" className="text-sm font-medium">
                Designation *
              </label>
              <Input
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="maritalStatus" className="text-sm font-medium">
                Marital Status
              </label>
              <Select
                value={formData.maritalStatus}
                onValueChange={(value) => handleSelectChange('maritalStatus', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="educationQualifications" className="text-sm font-medium">
              Education Qualifications
            </label>
            <Textarea
              id="educationQualifications"
              name="educationQualifications"
              value={formData.educationQualifications}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="educationBackground" className="text-sm font-medium">
              Education Background
            </label>
            <Textarea
              id="educationBackground"
              name="educationBackground"
              value={formData.educationBackground}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="presentAddress" className="text-sm font-medium">
                Present Address
              </label>
              <Textarea
                id="presentAddress"
                name="presentAddress"
                value={formData.presentAddress}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="permanentAddress" className="text-sm font-medium">
                Permanent Address
              </label>
              <Textarea
                id="permanentAddress"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="fathersName" className="text-sm font-medium">
                Father's Name
              </label>
              <Input
                id="fathersName"
                name="fathersName"
                value={formData.fathersName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="mothersName" className="text-sm font-medium">
                Mother's Name
              </label>
              <Input
                id="mothersName"
                name="mothersName"
                value={formData.mothersName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Profile Image</label>
            <ImageUploader setImageUrl={setImageUrl} />
            {formData.imageUrl && (
              <div className="mt-2">
                <img 
                  src={formData.imageUrl} 
                  alt="Profile" 
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/teachers')}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Saving...' : isEditing ? 'Update Teacher' : 'Create Teacher'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminCreateEditTeacher;