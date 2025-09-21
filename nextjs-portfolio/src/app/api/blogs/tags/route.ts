import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      select: { tags: true },
      where: { isPublished: true },
    });

    const allTags = new Set<string>();

    blogs.forEach(blog => {
      try {
        const tags = JSON.parse(blog.tags || '[]');
        tags.forEach((tag: string) => allTags.add(tag));
      } catch (error) {
        console.error('Error parsing tags:', error);
      }
    });

    return NextResponse.json({
      success: true,
      tags: Array.from(allTags).sort()
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}