import { PaginationInfo, BLOG_CONFIG } from './types';

/**
 * Calculate pagination information for blog listing
 */
export function calculatePagination(
  totalPosts: number,
  currentPage: number = 1,
  postsPerPage: number = BLOG_CONFIG.POSTS_PER_PAGE
): PaginationInfo {
  // Ensure currentPage is at least 1
  currentPage = Math.max(1, currentPage);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Ensure currentPage doesn't exceed totalPages
  currentPage = Math.min(currentPage, totalPages);

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  // Calculate visible page numbers (e.g., [1, 2, 3, 4, 5] or [3, 4, 5, 6, 7])
  const maxButtons = BLOG_CONFIG.MAX_PAGINATION_BUTTONS;
  const halfRange = Math.floor(maxButtons / 2);

  let startPage = Math.max(1, currentPage - halfRange);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  // Adjust start if we're near the end
  if (endPage - startPage + 1 < maxButtons && totalPages >= maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const startPost = (currentPage - 1) * postsPerPage + 1;
  const endPost = Math.min(currentPage * postsPerPage, totalPosts);

  return {
    currentPage,
    totalPages,
    totalPosts,
    postsPerPage,
    hasNextPage,
    hasPrevPage,
    visiblePages: Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    ),
    startPost,
    endPost
  };
}

/**
 * Get posts for a specific page
 */
export function getPaginatedPosts<T>(
  allPosts: T[],
  currentPage: number = 1,
  postsPerPage: number = BLOG_CONFIG.POSTS_PER_PAGE
): T[] {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  return allPosts.slice(startIndex, endIndex);
}

/**
 * Generate pagination URLs with query parameters
 */
export function generatePaginationUrl(
  basePath: string,
  page: number,
  searchParams?: URLSearchParams
): string {
  const params = new URLSearchParams(searchParams);

  if (page > 1) {
    params.set('page', page.toString());
  } else {
    params.delete('page');
  }

  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Parse page number from URL search params
 */
export function parsePageFromParams(searchParams: URLSearchParams): number {
  const pageParam = searchParams.get('page');
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  return isNaN(page) || page < 1 ? 1 : page;
}