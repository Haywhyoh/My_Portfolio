import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary, getImageTransformations } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB for Cloudinary)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await uploadToCloudinary(buffer, {
      folder: 'portfolio/blog',
      tags: ['blog', 'portfolio', 'admin-upload'],
      transformation: [
        { width: 1200, height: 800, crop: 'limit', quality: 'auto:good', format: 'webp' }
      ]
    });

    // Generate different image transformations
    const transformations = getImageTransformations(result.public_id);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes,
      filename: file.name,
      type: file.type,
      createdAt: result.created_at,
      transformations,
      // Provide commonly used sizes
      thumbnail: transformations.thumbnail,
      preview: transformations.preview,
      responsive: transformations.responsive,
    });

  } catch (error: any) {
    console.error('Cloudinary upload error:', error);

    // Handle specific Cloudinary errors
    if (error.error && error.error.message) {
      return NextResponse.json(
        { error: `Upload failed: ${error.error.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to upload file to cloud storage' },
      { status: 500 }
    );
  }
}