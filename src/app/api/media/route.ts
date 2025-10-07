import { NextRequest, NextResponse } from 'next/server';
import { searchImages, deleteFromCloudinary, getImageTransformations } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const folder = url.searchParams.get('folder') || 'portfolio/blog';
    const tags = url.searchParams.get('tags')?.split(',') || [];
    const maxResults = parseInt(url.searchParams.get('limit') || '20');
    const nextCursor = url.searchParams.get('cursor') || undefined;

    const result = await searchImages({
      folder,
      tags: tags.length > 0 ? tags : undefined,
      maxResults,
      nextCursor,
    });

    // Transform the results to include our custom transformations
    const transformedResources = result.resources.map((resource: any) => ({
      publicId: resource.public_id,
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      size: resource.bytes,
      createdAt: resource.created_at,
      folder: resource.folder,
      tags: resource.tags || [],
      transformations: getImageTransformations(resource.public_id),
    }));

    return NextResponse.json({
      success: true,
      resources: transformedResources,
      nextCursor: result.nextCursor,
      totalCount: result.totalCount,
    });

  } catch (error: any) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media files' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }

    const result = await deleteFromCloudinary(publicId);

    return NextResponse.json({
      success: true,
      result,
    });

  } catch (error: any) {
    console.error('Error deleting media:', error);
    return NextResponse.json(
      { error: 'Failed to delete media file' },
      { status: 500 }
    );
  }
}