import { BlogPost, BlogListResponse, BLOG_CONFIG } from './types';
import { calculatePagination, getPaginatedPosts } from './pagination';

// This will be our enhanced blog data
// For now, we'll use JSON files, but this can easily be replaced with a CMS or API
let cachedBlogs: BlogPost[] | null = null;

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
 * Load and transform blog data
 */
async function loadBlogData(): Promise<BlogPost[]> {
  if (cachedBlogs) {
    return cachedBlogs;
  }

  try {
    // Import the existing blog data
    const BlogData = await import('../assets/jsonData/blog/BlogData.json');

    // Transform and enhance the existing data
    cachedBlogs = BlogData.default.map((blog: any) => ({
      id: blog.id,
      title: blog.title,
      slug: generateSlug(blog.title),
      excerpt: blog.text || 'No excerpt available.',
      content: generateBlogContent(blog), // Generate full content
      author: blog.author,
      date: blog.date,
      publishedAt: new Date(blog.date).toISOString(),
      updatedAt: new Date(blog.date).toISOString(),
      thumbnail: blog.thumb,
      featuredImage: blog.thumbFull || blog.thumb,
      tags: generateTags(blog.title), // Generate tags based on title
      category: generateCategory(blog.author), // Generate category based on author
      readTime: calculateReadTime(blog.text || ''),
      isPublished: true,
      seoTitle: blog.title,
      seoDescription: blog.text?.substring(0, 160) || 'Read this blog post.',
      animationDelay: blog.animationDelay || '100ms'
    }));

    return cachedBlogs;
  } catch (error) {
    console.error('Failed to load blog data:', error);
    return [];
  }
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
 * Get all blog posts
 */
export async function getAllBlogs(): Promise<BlogPost[]> {
  return await loadBlogData();
}

/**
 * Get blog post by slug
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const blogs = await loadBlogData();
  return blogs.find(blog => blog.slug === slug) || null;
}

/**
 * Get blog post by ID (for backward compatibility)
 */
export async function getBlogById(id: number): Promise<BlogPost | null> {
  const blogs = await loadBlogData();
  return blogs.find(blog => blog.id === id) || null;
}

/**
 * Get blogs by category
 */
export async function getBlogsByCategory(category: string): Promise<BlogPost[]> {
  const blogs = await loadBlogData();
  if (category === BLOG_CONFIG.DEFAULT_CATEGORY) {
    return blogs;
  }
  return blogs.filter(blog => blog.category.toLowerCase() === category.toLowerCase());
}

/**
 * Get blogs by tag
 */
export async function getBlogsByTag(tag: string): Promise<BlogPost[]> {
  const blogs = await loadBlogData();
  return blogs.filter(blog =>
    blog.tags.some(blogTag => blogTag.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Search blogs by title, excerpt, or content
 */
export async function searchBlogs(query: string): Promise<BlogPost[]> {
  if (!query || query.trim().length === 0) {
    return await getAllBlogs();
  }

  const blogs = await loadBlogData();
  const searchQuery = query.toLowerCase().trim();

  return blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery) ||
    blog.excerpt.toLowerCase().includes(searchQuery) ||
    blog.content.toLowerCase().includes(searchQuery) ||
    blog.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
    blog.category.toLowerCase().includes(searchQuery) ||
    blog.author.toLowerCase().includes(searchQuery)
  );
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
  let blogs = await loadBlogData();

  // Apply filters
  if (search) {
    blogs = await searchBlogs(search);
  } else if (category && category !== BLOG_CONFIG.DEFAULT_CATEGORY) {
    blogs = await getBlogsByCategory(category);
  } else if (tag) {
    blogs = await getBlogsByTag(tag);
  }

  // Sort by publication date (newest first)
  blogs = blogs.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const totalPosts = blogs.length;
  const pagination = calculatePagination(totalPosts, page);
  const paginatedPosts = getPaginatedPosts(blogs, page);

  return {
    posts: paginatedPosts,
    totalPosts,
    totalPages: pagination.totalPages,
    currentPage: pagination.currentPage,
    postsPerPage: pagination.postsPerPage,
    hasNextPage: pagination.hasNextPage,
    hasPrevPage: pagination.hasPrevPage
  };
}

/**
 * Get all unique categories
 */
export async function getAllCategories(): Promise<string[]> {
  const blogs = await loadBlogData();
  const categories = Array.from(new Set(blogs.map(blog => blog.category)));
  return [BLOG_CONFIG.DEFAULT_CATEGORY, ...categories.sort()];
}

/**
 * Get all unique tags
 */
export async function getAllTags(): Promise<string[]> {
  const blogs = await loadBlogData();
  const allTags = blogs.flatMap(blog => blog.tags);
  const uniqueTags = Array.from(new Set(allTags));
  return uniqueTags.sort();
}

/**
 * Get related blog posts (same category or similar tags)
 */
export async function getRelatedBlogs(blogId: number, limit: number = 3): Promise<BlogPost[]> {
  const blogs = await loadBlogData();
  const currentBlog = blogs.find(blog => blog.id === blogId);

  if (!currentBlog) return [];

  // Get blogs from same category or with similar tags
  const relatedBlogs = blogs
    .filter(blog => blog.id !== blogId)
    .filter(blog =>
      blog.category === currentBlog.category ||
      blog.tags.some(tag => currentBlog.tags.includes(tag))
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);

  return relatedBlogs;
}