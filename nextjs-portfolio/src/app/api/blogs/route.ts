import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/lib/blog';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';
    const category = url.searchParams.get('category') || '';
    const tag = url.searchParams.get('tag') || '';
    const published = url.searchParams.get('published') === 'true';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (published) {
      where.isPublished = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (tag) {
      where.tags = { contains: tag };
    }

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          author: true,
          thumbnail: true,
          featuredImage: true,
          tags: true,
          category: true,
          readTime: true,
          viewCount: true,
          isPublished: true,
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.blog.count({ where }),
    ]);

    // Parse tags JSON string to array
    const blogsWithParsedTags = blogs.map(blog => ({
      ...blog,
      tags: JSON.parse(blog.tags || '[]'),
    }));

    return NextResponse.json({
      blogs: blogsWithParsedTags,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      excerpt,
      content,
      author,
      thumbnail,
      featuredImage,
      tags,
      category,
      isPublished = false,
      seoTitle,
      seoDescription,
      publishedAt,
    } = body;

    // Validate required fields
    if (!title || !content || !author) {
      return NextResponse.json(
        { error: 'Title, content, and author are required' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = generateSlug(title);

    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (existingBlog) {
      return NextResponse.json(
        { error: 'A blog with this title already exists' },
        { status: 409 }
      );
    }

    // Calculate read time
    const readTime = Math.ceil(content.split(/\s+/).length / 200);

    // Create blog
    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt: excerpt || title.substring(0, 160),
        content,
        author,
        thumbnail,
        featuredImage,
        tags: JSON.stringify(tags || []),
        category: category || 'General',
        readTime,
        isPublished,
        isDraft: !isPublished,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt || title.substring(0, 160),
        publishedAt: isPublished ? (publishedAt ? new Date(publishedAt) : new Date()) : null,
      },
    });

    // Parse tags back to array for response
    const blogWithParsedTags = {
      ...blog,
      tags: JSON.parse(blog.tags),
    };

    return NextResponse.json(blogWithParsedTags, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}