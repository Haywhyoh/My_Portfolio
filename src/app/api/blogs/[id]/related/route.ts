import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const blogId = parseInt(params.id);
  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit') || '3');

  if (isNaN(blogId)) {
    return NextResponse.json(
      { success: false, error: 'Invalid blog ID' },
      { status: 400 }
    );
  }

  try {
    // Get the current blog to find related ones
    const currentBlog = await prisma.blog.findUnique({
      where: { id: blogId },
      select: { category: true, tags: true },
    });

    if (!currentBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Parse tags from the current blog
    let currentTags: string[] = [];
    try {
      currentTags = JSON.parse(currentBlog.tags || '[]');
    } catch (error) {
      console.error('Error parsing tags:', error);
    }

    // Find related blogs
    const relatedBlogs = await prisma.blog.findMany({
      where: {
        AND: [
          { id: { not: blogId } }, // Exclude current blog
          { isPublished: true },
          {
            OR: [
              { category: currentBlog.category }, // Same category
              // For tag matching, we need to use raw SQL or handle in application
            ],
          },
        ],
      },
      orderBy: [
        { publishedAt: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit * 2, // Get more than needed to filter by tags
    });

    // Filter by tags in application (since SQLite doesn't have good JSON functions)
    const filteredBlogs = relatedBlogs.filter(blog => {
      if (blog.category === currentBlog.category) return true;

      try {
        const blogTags = JSON.parse(blog.tags || '[]');
        return currentTags.some(tag => blogTags.includes(tag));
      } catch (error) {
        return false;
      }
    });

    // Take only the requested number
    const finalBlogs = filteredBlogs.slice(0, limit);

    return NextResponse.json({
      success: true,
      relatedBlogs: finalBlogs,
    });
  } catch (error) {
    console.error('Error fetching related blogs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch related blogs' },
      { status: 500 }
    );
  }
}