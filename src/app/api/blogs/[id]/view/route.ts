import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    let blog;

    // Check if it's a numeric ID or a slug
    if (!isNaN(parseInt(id))) {
      // It's a numeric ID
      const blogId = parseInt(id);
      blog = await prisma.blog.update({
        where: { id: blogId },
        data: {
          viewCount: {
            increment: 1,
          },
        },
        select: {
          id: true,
          viewCount: true,
        },
      });
    } else {
      // It's a slug
      blog = await prisma.blog.update({
        where: { slug: id },
        data: {
          viewCount: {
            increment: 1,
          },
        },
        select: {
          id: true,
          viewCount: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      viewCount: blog.viewCount,
    });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to increment view count' },
      { status: 500 }
    );
  }
}