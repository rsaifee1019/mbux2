'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';
import Image from 'next/image';

const AdminCreateEditTeacher = ({ teacherId }) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState({
    id: teacherId,
    title: '',
    publicationDate: '',
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
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTeacher = async () => {
      if (teacherId && teacherId !== 'new') {
        try {
          const response = await fetch(`/api/admin/teachers/${teacherId}`);
          if (!response.ok) throw new Error('Failed to fetch teacher');
          const data = await response.json();
          setFormData({
            title: data.title || '',
            publicationDate: data.publicationDate || '',
            nationalId: data.nationalId || '',
            gender: data.gender || '',
            religion: data.religion || '',
            bloodGroup: data.bloodGroup || '',
            mobileNo: data.mobileNo || '',
            email: data.email || '',
            designation: data.designation || '',
            educationQualifications: data.educationQualifications || '',
            educationBackground: data.educationBackground || '',
            presentAddress: data.presentAddress || '',
            permanentAddress: data.permanentAddress || '',
            maritalStatus: data.maritalStatus || '',
            fathersName: data.fathersName || '',
            mothersName: data.mothersName || '',
            imageUrl: data.imageUrl || '',
          });
          setIsEditing(true);
        } catch (err) {
          setError('Failed to fetch teacher details');
        }
      }
    };

    fetchTeacher();
  }, [teacherId]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      imageUrl
    }));
  }, [imageUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    console.log(formData);
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

      // Redirect to teachers list after successful submission
    //   router.push('/admin');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Teacher' : 'Create New Teacher'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              Name *
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter teacher name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter teacher description"
              rows={4}
            />
          </div>

          {/* Additional fields for the other properties */}
          <div className="space-y-2">
            <label htmlFor="nationalId" className="block text-sm font-medium">
              National ID
            </label>
            <Input
              id="nationalId"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
              placeholder="Enter national ID"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="gender" className="block text-sm font-medium">
              Gender
            </label>
            <Input
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Enter gender"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="religion" className="block text-sm font-medium">
              Religion
            </label>
            <Input
              id="religion"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              placeholder="Enter religion"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="bloodGroup" className="block text-sm font-medium">
              Blood Group
            </label>
            <Input
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              placeholder="Enter blood group"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="mobileNo" className="block text-sm font-medium">
              Mobile No
            </label>
            <Input
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="Enter mobile number"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="designation" className="block text-sm font-medium">
              Designation
            </label>
            <Input
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Enter designation"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="educationQualifications" className="block text-sm font-medium">
              Education Qualifications
            </label>
            <Input
              id="educationQualifications"
              name="educationQualifications"
              value={formData.educationQualifications}
              onChange={handleChange}
              placeholder="Enter education qualifications"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="educationBackground" className="block text-sm font-medium">
              Education Background
            </label>
            <Input
              id="educationBackground"
              name="educationBackground"
              value={formData.educationBackground}
              onChange={handleChange}
              placeholder="Enter education background"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="presentAddress" className="block text-sm font-medium">
              Present Address
            </label>
            <Textarea
              id="presentAddress"
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleChange}
              placeholder="Enter present address"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="permanentAddress" className="block text-sm font-medium">
              Permanent Address
            </label>
            <Textarea
              id="permanentAddress"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              placeholder="Enter permanent address"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="maritalStatus" className="block text-sm font-medium">
              Marital Status
            </label>
            <Input
              id="maritalStatus"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              placeholder="Enter marital status"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="fathersName" className="block text-sm font-medium">
              Father's Name
            </label>
            <Input
              id="fathersName"
              name="fathersName"
              value={formData.fathersName}
              onChange={handleChange}
              placeholder="Enter father's name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="mothersName" className="block text-sm font-medium">
              Mother's Name
            </label>
            <Input
              id="mothersName"
              name="mothersName"
              value={formData.mothersName}
              onChange={handleChange}
              placeholder="Enter mother's name"
            />
          </div>
          <ImageUploader setImageUrl={setImageUrl} />
          <div className="space-y-2">
            <label htmlFor="imageUrl" className="block text-sm font-medium">
              Current Image
            </label>
            <Image src={formData.imageUrl} alt="Current Teacher Image" width={100} height={100} />
          </div>

          

          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Saving...' : isEditing ? 'Update Teacher' : 'Create Teacher'}
            </Button>
            
            <Button 
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/teachers')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminCreateEditTeacher;