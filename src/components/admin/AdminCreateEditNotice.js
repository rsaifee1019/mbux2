'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import FileUploader from '@/components/FileUploader';

const AdminCreateEditNotice = ({ noticeId }) => {
  const [fileUrl, setFileUrl] = useState('');


  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    dateUploaded: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchNotice = async () => {
      if (noticeId && noticeId !== 'new') {
        try {
          const response = await fetch(`/api/admin/notices/${noticeId}`);
          if (!response.ok) throw new Error('Failed to fetch notice');
          const data = await response.json();
          setFormData({
            title: data.title || '',
            description: data.description || '',
            link: data.link || '',
            dateUploaded: new Date(data.dateUploaded).toISOString().split('T')[0]
          });
          setIsEditing(true);
        } catch (err) {
          setError('Failed to fetch notice details');
        }
      }
    };

    fetchNotice();
  }, [noticeId]);

  useEffect(() => {
  setFormData(prev => ({
    ...prev,
    link: fileUrl
  }));
  console.log(formData);
  console.log('file ' + fileUrl);
  }, [fileUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    console.log(formData);
    console.log(fileUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEditing 
        ? `/api/admin/notices/${noticeId}`
        : '/api/admin/notices';
      
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

    
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      router.push('/admin');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Notice' : 'Create New Notice'}</CardTitle>
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
              Title *
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter notice title"
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
              placeholder="Enter notice description"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="link" className="block text-sm font-medium">
              Link
            </label>
            <Input
              id="link"
              name="link"
              type="url"
              value={formData.link}
              onChange={handleChange}
              placeholder="Enter file link (optional)"
            />
          </div>
          <FileUploader setFileUrl={setFileUrl} />

          <div className="space-y-2">
            <label htmlFor="dateUploaded" className="block text-sm font-medium">
              Date
            </label>
            <Input
              id="dateUploaded"
              name="dateUploaded"
              type="date"
              value={formData.dateUploaded}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Saving...' : isEditing ? 'Update Notice' : 'Create Notice'}
            </Button>
            
            <Button 
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/notices')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminCreateEditNotice;