import { BlogPost, BlogListResponse, BLOG_CONFIG } from './types';
import { prisma } from './prisma';

// API-based blog functions using the database

/**
 * Generate a slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Calculate reading time based on content length
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = BLOG_CONFIG.READ_TIME_WPM;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * API Helper to fetch from backend (for client-side calls)
 */
async function fetchFromAPI(endpoint: string, options?: RequestInit): Promise<any> {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Direct database query (for server-side calls)
 */
async function queryDatabase(options: {
  published?: boolean;
  limit?: number;
  page?: number;
  search?: string;
  category?: string;
  tag?: string;
} = {}): Promise<any> {
  try {
    const {
      published = true,
      limit = 10,
      page = 1,
      search,
      category,
      tag
    } = options;

    const skip = (page - 1) * limit;
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
          content: true,
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
          seoTitle: true,
          seoDescription: true,
        },
      }),
      prisma.blog.count({ where }),
    ]);

    return {
      blogs: blogs.map(blog => ({
        ...blog,
        tags: JSON.parse(blog.tags || '[]'),
      })),
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Database query error:', error);
    return {
      blogs: [],
      total: 0,
      currentPage: 1,
      totalPages: 1,
    };
  }
}

/**
 * Transform database blog to frontend BlogPost format
 */
function transformDatabaseBlog(dbBlog: any): BlogPost {
  const tags = typeof dbBlog.tags === 'string' ? JSON.parse(dbBlog.tags) : dbBlog.tags || [];

  return {
    id: dbBlog.id,
    title: dbBlog.title,
    slug: dbBlog.slug,
    excerpt: dbBlog.excerpt || '',
    content: dbBlog.content || '',
    author: dbBlog.author,
    date: new Date(dbBlog.publishedAt || dbBlog.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    publishedAt: dbBlog.publishedAt || dbBlog.createdAt,
    updatedAt: dbBlog.updatedAt,
    createdAt: dbBlog.createdAt,
    thumbnail: dbBlog.thumbnail || '',
    featuredImage: dbBlog.featuredImage || dbBlog.thumbnail || '',
    tags,
    category: dbBlog.category,
    readTime: dbBlog.readTime || calculateReadTime(dbBlog.content || ''),
    isPublished: dbBlog.isPublished,
    seoTitle: dbBlog.seoTitle || dbBlog.title,
    seoDescription: dbBlog.seoDescription || dbBlog.excerpt,
    viewCount: dbBlog.viewCount || 0
  };
}

/**
 * Generate realistic blog content (placeholder for now)
 */
function generateBlogContent(blog: any): string {
  return `
# ${blog.title}

${blog.text || 'No content available.'}

## Introduction

This is an expanded version of the blog post. In a real application, this would contain the full blog content with proper formatting, images, and detailed information.

## Key Points

- Important point one related to the topic
- Another significant insight worth discussing
- Technical details and implementation notes
- Best practices and recommendations

## Conclusion

This blog post covers important aspects of the topic. The content would typically be much longer and more detailed in a production environment.

---

*Published by ${blog.author} on ${blog.date}*
  `.trim();
}

/**
 * Generate tags based on title keywords
 */
function generateTags(title: string): string[] {
  const commonTags = ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Web Development', 'Frontend', 'Performance', 'SEO'];

  // Simple tag generation based on title keywords
  const titleLower = title.toLowerCase();
  const relevantTags = commonTags.filter(tag =>
    titleLower.includes(tag.toLowerCase()) ||
    titleLower.includes('development') ||
    titleLower.includes('web') ||
    titleLower.includes('application')
  );

  // Ensure we have at least 2-3 tags
  if (relevantTags.length < 2) {
    relevantTags.push('Web Development', 'Programming');
  }

  return relevantTags.slice(0, 4); // Limit to 4 tags
}

/**
 * Generate category based on author or content
 */
function generateCategory(author: string): string {
  const categories = {
    'Md Sohag': 'Development',
    'Admin': 'Technology',
    'default': 'General'
  };

  return categories[author as keyof typeof categories] || categories.default;
}

/**
 * Get all blog posts (server-side safe)
 */
export async function getAllBlogs(): Promise<BlogPost[]> {
  try {
    const data = await queryDatabase({ published: true });
    return data.blogs.map(transformDatabaseBlog);
  } catch (error) {
    console.error('Failed to fetch all blogs:', error);
    return [];
  }
}

/**
 * Get blog post by slug (server-side safe)
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        slug: slug,
        isPublished: true
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
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
        seoTitle: true,
        seoDescription: true,
      },
    });

    if (blog) {
      return transformDatabaseBlog({
        ...blog,
        tags: JSON.parse(blog.tags || '[]'),
      });
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch blog by slug:', error);
    return null;
  }
}

/**
 * Get blog post by ID (for backward compatibility)
 */
export async function getBlogById(id: number): Promise<BlogPost | null> {
  try {
    const blog = await fetchFromAPI(`blogs/${id}`);
    if (blog) {
      return transformDatabaseBlog(blog);
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch blog by ID:', error);
    return null;
  }
}

/**
 * Get paginated blogs with filters
 */
export async function getPaginatedBlogs(
  page: number = 1,
  category?: string,
  tag?: string,
  search?: string
): Promise<BlogListResponse> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: BLOG_CONFIG.POSTS_PER_PAGE.toString(),
      published: 'true'
    });

    if (category && category !== BLOG_CONFIG.DEFAULT_CATEGORY) {
      params.append('category', category);
    }
    if (tag) {
      params.append('tag', tag);
    }
    if (search) {
      params.append('search', search);
    }

    const data = await fetchFromAPI(`blogs?${params.toString()}`);

    return {
      posts: data.blogs.map(transformDatabaseBlog),
      totalPosts: data.totalCount,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
      postsPerPage: BLOG_CONFIG.POSTS_PER_PAGE,
      hasNextPage: data.currentPage < data.totalPages,
      hasPrevPage: data.currentPage > 1
    };
  } catch (error) {
    console.error('Failed to fetch paginated blogs:', error);
    return {
      posts: [],
      totalPosts: 0,
      totalPages: 1,
      currentPage: 1,
      postsPerPage: BLOG_CONFIG.POSTS_PER_PAGE,
      hasNextPage: false,
      hasPrevPage: false
    };
  }
}

/**
 * Get all unique categories
 */
export async function getAllCategories(): Promise<string[]> {
  try {
    const data = await fetchFromAPI('blogs/categories');
    return [BLOG_CONFIG.DEFAULT_CATEGORY, ...data.categories.sort()];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [BLOG_CONFIG.DEFAULT_CATEGORY];
  }
}

/**
 * Get all unique tags
 */
export async function getAllTags(): Promise<string[]> {
  try {
    const data = await fetchFromAPI('blogs/tags');
    return data.tags.sort();
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
}

/**
 * Get related blog posts (same category or similar tags)
 */
export async function getRelatedBlogs(blogId: number, limit: number = 3): Promise<BlogPost[]> {
  try {
    const data = await fetchFromAPI(`blogs/${blogId}/related?limit=${limit}`);
    return data.relatedBlogs.map(transformDatabaseBlog);
  } catch (error) {
    console.error('Failed to fetch related blogs:', error);
    return [];
  }
}

/**
 * Increment view count for a blog post
 */
export async function incrementViewCount(slugOrId: string | number): Promise<void> {
  try {
    await fetchFromAPI(`blogs/${slugOrId}/view`, {
      method: 'POST'
    });
  } catch (error) {
    console.error('Failed to increment view count:', error);
  }
}