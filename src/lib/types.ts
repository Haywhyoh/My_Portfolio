// Blog system TypeScript interfaces

export interface BlogPost {
  id: number;
  title: string;
  slug: string; // SEO-friendly URL
  excerpt: string; // Short description for listing
  content: string; // Full blog content (for detail page)
  author: string;
  date?: string; // Display date (for legacy compatibility)
  publishedAt: string | null; // ISO format for better parsing
  updatedAt?: string;
  createdAt: string;
  thumbnail: string | null; // Main image for cards
  featuredImage?: string | null; // Full-size image for detail page
  tags: string[];
  category: string;
  readTime: number; // Estimated reading time in minutes
  viewCount?: number; // Number of views
  isPublished: boolean;
  isDraft?: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
  animationDelay?: string; // For homepage animations
}

export interface BlogListResponse {
  posts: BlogPost[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  postsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// API-specific types
export interface CreateBlogRequest {
  title: string;
  excerpt?: string;
  content: string;
  author: string;
  thumbnail?: string;
  featuredImage?: string;
  tags?: string[];
  category?: string;
  isPublished?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
}

export interface UpdateBlogRequest extends Partial<CreateBlogRequest> {}

export interface BlogAPIResponse {
  blogs: BlogPost[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface APIError {
  error: string;
  details?: any;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  visiblePages: number[];
  startPost: number;
  endPost: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // e.g., "/blog"
  maxPageButtons?: number; // Default: 5
  showInfo?: boolean; // Show "Showing X-Y of Z posts"
}

export interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
  showExcerpt?: boolean;
  showReadTime?: boolean;
  showAuthor?: boolean;
}

export interface BlogGridProps {
  posts: BlogPost[];
  loading?: boolean;
}

export interface BlogFiltersProps {
  categories: string[];
  tags: string[];
  selectedCategory?: string;
  selectedTag?: string;
  onCategoryChange: (category: string | undefined) => void;
  onTagChange: (tag: string | undefined) => void;
  variant?: 'default' | 'hero';
}

export interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  variant?: 'default' | 'hero';
}

// Blog configuration constants
export const BLOG_CONFIG = {
  POSTS_PER_PAGE: 9, // 3x3 grid layout
  MAX_PAGINATION_BUTTONS: 5, // Show 5 page numbers
  PAGINATION_STRATEGY: 'page-based', // vs 'infinite-scroll'
  DEFAULT_CATEGORY: 'All',
  READ_TIME_WPM: 200, // Words per minute for read time calculation
} as const;

// SEO and metadata types
export interface BlogPageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

// Testimonials system TypeScript interfaces

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number; // 1-5 star rating
  reviewCount: number;
  platformLogo: string; // Logo of review platform
  testimonial: string; // The actual review text
  platformRating: string; // Overall rating on platform (e.g., "4.9")
  projectType: string; // Type of project worked on
  featured: boolean; // Whether to show in featured testimonials
}

export interface TestimonialProps {
  sectionClass?: string;
  variant?: 'default' | 'dark';
  showOnlyFeatured?: boolean;
  maxItems?: number;
  autoplay?: boolean;
  showPagination?: boolean;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export interface TestimonialSwiperProps {
  testimonials: Testimonial[];
  variant?: 'default' | 'dark';
  autoplay?: boolean;
  showPagination?: boolean;
}