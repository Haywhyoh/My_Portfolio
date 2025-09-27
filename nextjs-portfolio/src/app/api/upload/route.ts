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
    const hasCloudinaryConfig = process.env.CLOUDINARY_CLOUD_NAME &&
                                 process.env.CLOUDINARY_API_KEY &&
                                 process.env.CLOUDINARY_API_SECRET &&
                                 process.env.CLOUDINARY_CLOUD_NAME !== "your-cloud-name" &&
                                 process.env.CLOUDINARY_API_KEY !== "your-api-key";

    // Helper function to create mock response
    const createMockResponse = (reason = 'development') => {
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop() || 'jpg';

      console.warn(`Using mock upload response for ${reason}`);

      return NextResponse.json({
        success: true,
        url: `https://via.placeholder.com/800x600/4a90e2/ffffff?text=Mock+Image`,
        publicId: `mock_${timestamp}`,
        width: 800,
        height: 600,
        format: fileExtension,
        size: file.size,
        filename: file.name,
        type: file.type,
        createdAt: new Date().toISOString(),
        transformations: {
          thumbnail: `https://via.placeholder.com/150x150/4a90e2/ffffff?text=Thumb`,
          preview: `https://via.placeholder.com/400x300/4a90e2/ffffff?text=Preview`,
        },
        message: `Mock upload - ${reason === 'development' ? 'Configure Cloudinary for actual uploads' : 'Cloudinary upload failed, using fallback'}`
      });
    };

    if (!hasCloudinaryConfig) {
      return createMockResponse('development');
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
      console.error('Cloudinary upload failed, using mock response:', uploadError.message);

      // If Cloudinary fails, return mock response instead of error
      return createMockResponse('Cloudinary upload failed');
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