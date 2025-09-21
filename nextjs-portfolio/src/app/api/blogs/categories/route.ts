import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      select: { category: true },
      where: { isPublished: true },
    });

    const categories = Array.from(new Set(blogs.map(blog => blog.category)));

    return NextResponse.json({
      success: true,
      categories: categories.sort()
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}