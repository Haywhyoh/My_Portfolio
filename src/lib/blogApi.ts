import {
  BlogPost,
  BlogAPIResponse,
  CreateBlogRequest,
  UpdateBlogRequest,
  APIError
} from './types';

const API_BASE = '/api/blogs';

class BlogApiError extends Error {
  constructor(public status: number, message: string, public details?: any) {
    super(message);
    this.name = 'BlogApiError';
  }
}

async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData: APIError = await response.json().catch(() => ({
      error: 'An unexpected error occurred'
    }));
    throw new BlogApiError(response.status, errorData.error, errorData.details);
  }
  return response.json();
}

// Blog CRUD operations
export const blogApi = {
  // Get all blogs with pagination and filters
  async getBlogs(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    tag?: string;
    published?: boolean;
  }): Promise<BlogAPIResponse> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.tag) searchParams.set('tag', params.tag);
    if (params?.published !== undefined) searchParams.set('published', params.published.toString());

    const url = `${API_BASE}?${searchParams.toString()}`;
    const response = await fetch(url);
    return handleApiResponse<BlogAPIResponse>(response);
  },

  // Get single blog by ID or slug
  async getBlog(idOrSlug: string | number): Promise<BlogPost> {
    const response = await fetch(`${API_BASE}/${idOrSlug}`);
    return handleApiResponse<BlogPost>(response);
  },

  // Create new blog
  async createBlog(data: CreateBlogRequest): Promise<BlogPost> {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleApiResponse<BlogPost>(response);
  },

  // Update existing blog
  async updateBlog(id: number, data: UpdateBlogRequest): Promise<BlogPost> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleApiResponse<BlogPost>(response);
  },

  // Delete blog
  async deleteBlog(id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    return handleApiResponse<{ message: string }>(response);
  },

  // Get all categories
  async getCategories(): Promise<string[]> {
    const response = await fetch(`${API_BASE}/categories`);
    return handleApiResponse<string[]>(response);
  },

  // Get all tags
  async getTags(): Promise<string[]> {
    const response = await fetch(`${API_BASE}/tags`);
    return handleApiResponse<string[]>(response);
  },

  // Publish blog
  async publishBlog(id: number): Promise<BlogPost> {
    return this.updateBlog(id, {
      isPublished: true,
      publishedAt: new Date().toISOString()
    });
  },

  // Unpublish blog (make draft)
  async unpublishBlog(id: number): Promise<BlogPost> {
    return this.updateBlog(id, {
      isPublished: false,
      publishedAt: null
    });
  },
};

// Helper functions for client-side use
export async function fetchPublishedBlogs(page = 1, limit = 9) {
  return blogApi.getBlogs({ page, limit, published: true });
}

export async function fetchBlogBySlug(slug: string) {
  return blogApi.getBlog(slug);
}

export async function searchBlogs(query: string, page = 1) {
  return blogApi.getBlogs({ search: query, page, published: true });
}

export async function fetchBlogsByCategory(category: string, page = 1) {
  return blogApi.getBlogs({ category, page, published: true });
}

export async function fetchBlogsByTag(tag: string, page = 1) {
  return blogApi.getBlogs({ tag, page, published: true });
}

// Admin functions (requires authentication)
export async function fetchAllBlogs(page = 1, limit = 10) {
  return blogApi.getBlogs({ page, limit });
}

export async function createNewBlog(data: CreateBlogRequest) {
  return blogApi.createBlog(data);
}

export async function updateExistingBlog(id: number, data: UpdateBlogRequest) {
  return blogApi.updateBlog(id, data);
}

export async function deleteExistingBlog(id: number) {
  return blogApi.deleteBlog(id);
}

export { BlogApiError };