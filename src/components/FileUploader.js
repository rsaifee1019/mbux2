




// site/src/components/ImageUploader.js
'use client';
import { useState, useEffect } from 'react';

export default function FileUploader({ setFileUrl }) {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  const handleFileChange = async (event) => {
    console.log("file changed")
    setFile(event.target.files[0]);
  };
useEffect(()=>{
  handleUpload()
}, [file])
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    console.log('setting')
    setUploadResult(result);
    setFileUrl(`https://pub-67bde4aa3aa34d01a261d06d103bf2d6.r2.dev/${result.Key}`);
    console.log('set')
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
     </div>
  );
}