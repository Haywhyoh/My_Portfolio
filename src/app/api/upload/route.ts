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

    // Check if Cloudinary is properly configured
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // Environment variables loaded correctly

    const hasCloudinaryConfig = cloudName &&
                                 apiKey &&
                                 apiSecret &&
                                 cloudName !== "your-cloud-name" &&
                                 apiKey !== "your-api-key" &&
                                 apiSecret !== "your-api-secret";

    if (!hasCloudinaryConfig) {
      console.error('Cloudinary configuration missing or incomplete');
      return NextResponse.json(
        {
          error: 'Cloudinary is not properly configured. Please check your environment variables.',
          details: 'CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET must be set with valid values.',
          debug: {
            cloudName: cloudName ? 'SET' : 'MISSING',
            apiKey: apiKey ? 'SET' : 'MISSING',
            apiSecret: apiSecret ? 'SET' : 'MISSING'
          }
        },
        { status: 500 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
      // Upload to Cloudinary with timeout
      const result = await Promise.race([
        uploadToCloudinary(buffer, {
          folder: 'portfolio/blog',
          tags: ['blog', 'portfolio', 'admin-upload'],
          transformation: [
            { width: 1200, height: 800, crop: 'limit', quality: 'auto:good', format: 'webp' }
          ]
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Upload timeout after 30 seconds')), 30000)
        )
      ]) as any;

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
        thumbnail: transformations.thumbnail,
        preview: transformations.preview,
        responsive: transformations.responsive,
      });

    } catch (uploadError: any) {
      console.error('Cloudinary upload failed:', uploadError);

      // Return proper error response with more details
      return NextResponse.json(
        {
          error: 'Failed to upload image to Cloudinary',
          details: uploadError.message || 'Unknown upload error occurred',
          errorCode: uploadError.http_code || uploadError.code,
          errorType: uploadError.name || 'UnknownError'
        },
        { status: 500 }
      );
    }

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