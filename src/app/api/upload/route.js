// app/api/upload/route.js
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(request) {
  const formData = await request.formData();
  const imageFile = formData.get('image'); // Assume the file input is named 'image'

  if (!imageFile) {
    return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
  }

  // Convert file to a buffer
  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Configure AWS S3 SDK for Cloudflare R2 using v3
  const s3Client = new S3Client({
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    region: process.env.CLOUDFLARE_REGION || 'auto', // "auto" for automatic regions
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
    },
  });

  // Generate a more unique filename
  const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${imageFile.name}`;
  
  // Create the command for uploading the file
  const putCommand = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
    Key: uniqueFileName, // Use the generated unique filename
    Body: buffer,
    ContentType: imageFile.type, // Set the correct content type
  });

  try {
    // Send the command to upload the file
    const uploadResult = await s3Client.send(putCommand);
    
    // Return the result with the file URL
    return NextResponse.json({
      Location: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.CLOUDFLARE_BUCKET_NAME}/${uniqueFileName}`,
      Key: uniqueFileName,
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      ETag: uploadResult.ETag
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}