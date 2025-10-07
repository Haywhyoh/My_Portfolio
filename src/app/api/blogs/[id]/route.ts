import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/lib/blog';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const isNumericId = !isNaN(Number(id));

    const blog = await prisma.blog.findFirst({
      where: isNumericId
        ? { id: parseInt(id) }
        : { slug: id },
    });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Increment view count only for slug-based requests (actual page views)
    if (!isNumericId) {
      await prisma.blog.update({
        where: { id: blog.id },
        data: { viewCount: { increment: 1 } },
      });
    }

    // Parse tags JSON string to array
    const blogWithParsedTags = {
      ...blog,
      tags: JSON.parse(blog.tags || '[]'),
    };

    return NextResponse.json(blogWithParsedTags);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
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
      isPublished,
      seoTitle,
      seoDescription,
      publishedAt,
    } = body;

    const blogId = parseInt(id);
    if (isNaN(blogId)) {
      return NextResponse.json(
        { error: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};

    if (title !== undefined && title !== existingBlog.title) {
      updateData.title = title;
      updateData.slug = generateSlug(title);

      // Check if new slug conflicts with another blog
      const slugConflict = await prisma.blog.findFirst({
        where: {
          slug: updateData.slug,
          id: { not: blogId },
        },
      });

      if (slugConflict) {
        return NextResponse.json(
          { error: 'A blog with this title already exists' },
          { status: 409 }
        );
      }
    } else if (title !== undefined && title === existingBlog.title) {
      // If title hasn't changed, don't update slug
      updateData.title = title;
    }

    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) {
      updateData.content = content;
      updateData.readTime = Math.ceil(content.split(/\s+/).length / 200);
    }
    if (author !== undefined) updateData.author = author;
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail;
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage;
    if (tags !== undefined) updateData.tags = JSON.stringify(tags);
    if (category !== undefined) updateData.category = category;
    if (seoTitle !== undefined) updateData.seoTitle = seoTitle;
    if (seoDescription !== undefined) updateData.seoDescription = seoDescription;

    if (isPublished !== undefined) {
      updateData.isPublished = isPublished;
      updateData.isDraft = !isPublished;

      if (isPublished && !existingBlog.publishedAt) {
        updateData.publishedAt = publishedAt ? new Date(publishedAt) : new Date();
      }
    }

    // Update blog
    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: updateData,
    });

    // Parse tags back to array for response
    const blogWithParsedTags = {
      ...updatedBlog,
      tags: JSON.parse(updatedBlog.tags),
    };

    return NextResponse.json(blogWithParsedTags);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const blogId = parseInt(id);

    if (isNaN(blogId)) {
      return NextResponse.json(
        { error: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Delete blog
    await prisma.blog.delete({
      where: { id: blogId },
    });

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}