import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

const StudentCSVUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const processCSVData = (csvData) => {
    // Convert CSV rows to student objects
    const students = csvData.map(row => ({
      studentId: row.studentId?.trim(),
      name: row.name?.trim(),
      phone: row.phone?.trim(),
      guardianPhone: row['guardian phone']?.trim(),
      degree: row.degree?.toLowerCase(),
      department: row.department,
      year: row.year?.toString(),
      session: row.session,
      // Default values
      email: '', // You can generate email if needed
      imageUrl: '', // Set default image or leave empty
      paymentStatus: 'pending',
    })).filter(student => student.name && student.name !== ''); // Filter out empty rows

    return students;
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      setResult(null);

      // Read the CSV file
      const text = await file.text();
      const rows = text.split('\n');
      const headers = rows[0].split(',').map(h => h.trim());
      
      const csvData = rows.slice(1).map(row => {
        const values = row.split(',');
        return headers.reduce((obj, header, index) => {
          obj[header] = values[index]?.trim() || '';
          return obj;
        }, {});
      });

      const students = processCSVData(csvData);

      // Send to API
      const response = await fetch('/api/admin/students/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ students }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload students');
      }

      setResult({
        total: students.length,
        successful: data.successful,
        failed: data.failed || 0,
      });
    } catch (err) {
      setError(err.message || 'Failed to process file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
    <div className='flex justify-between'>
      <CardHeader>
          <CardTitle>Bulk Upload Students</CardTitle>
        </CardHeader>

        <Button variant='outline' className='bg-blue-500 text-white m-4'><Link href='https://pub-67bde4aa3aa34d01a261d06d103bf2d6.r2.dev/students.csv'>স্যাম্পল ফাইল</Link></Button>
      </div>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
            <Upload className="h-12 w-12 text-gray-400 mb-2" />
            <label className="block">
              <span className="sr-only">Choose CSV file</span>
              <input
                type="file"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">Upload your CSV file with student data</p>
          </div>

          {uploading && (
            <div className="text-center text-gray-500">
              Processing file...
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert className="bg-green-50">
              <AlertDescription>
                Successfully processed {result.total} students.
                {result.failed > 0 && ` Failed to upload ${result.failed} records.`}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCSVUpload;