'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { BlogPost } from '@/lib/types';
import { getPaginatedBlogs, getAllCategories, getAllTags } from '@/lib/blog';
import { parsePageFromParams } from '@/lib/pagination';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogPagination from '@/components/blog/BlogPagination';
import BlogSearch from '@/components/blog/BlogSearch';
import BlogFilters from '@/components/blog/BlogFilters';

export default function BlogListingContent() {
  const searchParams = useSearchParams();

  // State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  // Pagination state
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  // Filter state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  // Initialize filters from URL params
  useEffect(() => {
    const page = parsePageFromParams(searchParams);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || undefined;
    const tag = searchParams.get('tag') || undefined;

    setCurrentPage(page);
    setSearchQuery(search);
    setSelectedCategory(category);
    setSelectedTag(tag);
  }, [searchParams]);

  // Load categories and tags
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [categoriesData, tagsData] = await Promise.all([
          getAllCategories(),
          getAllTags()
        ]);

        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error('Failed to load filters:', error);
      }
    };

    loadFilters();
  }, []);

  // Load blog posts
  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getPaginatedBlogs(
        currentPage,
        selectedCategory,
        selectedTag,
        searchQuery
      );

      setPosts(result.posts);
      setTotalPages(result.totalPages);
      setTotalPosts(result.totalPosts);
    } catch (error) {
      console.error('Failed to load blog posts:', error);
      setPosts([]);
      setTotalPages(1);
      setTotalPosts(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, selectedTag, searchQuery]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Event handlers
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: string | undefined) => {
    setSelectedCategory(category);
    setSelectedTag(undefined); // Clear tag when category changes
    setCurrentPage(1);
  }, []);

  const handleTagChange = useCallback((tag: string | undefined) => {
    setSelectedTag(tag);
    setSelectedCategory(undefined); // Clear category when tag changes
    setCurrentPage(1);
  }, []);

  // Results info
  const getResultsInfo = () => {
    if (loading) return 'Loading...';
    if (totalPosts === 0) return 'No posts found';

    const start = (currentPage - 1) * 9 + 1;
    const end = Math.min(currentPage * 9, totalPosts);

    let info = `Showing ${start}-${end} of ${totalPosts} post${totalPosts !== 1 ? 's' : ''}`;

    if (searchQuery) {
      info += ` for "${searchQuery}"`;
    } else if (selectedCategory) {
      info += ` in category "${selectedCategory}"`;
    } else if (selectedTag) {
      info += ` tagged with "${selectedTag}"`;
    }

    return info;
  };

  return (
    <div className="blog-listing-content">
      {/* Header Section */}
      <div className="blog-listing-header mb-5">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <h2 className="section-title">Latest Blog Posts</h2>
            <p className="section-subtitle text-muted">
              Insights on web development, React, Next.js, and modern software engineering
            </p>
          </div>
          <div className="col-lg-4">
            <div className="results-info text-lg-end">
              <span className="text-muted">{getResultsInfo()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="blog-controls mb-5">
        <div className="row">
          <div className="col-lg-8 mb-3 mb-lg-0">
            <BlogSearch
              onSearch={handleSearch}
              initialValue={searchQuery}
              placeholder="Search articles, technologies, topics..."
            />
          </div>
          <div className="col-lg-4">
            <BlogFilters
              categories={categories}
              tags={tags}
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              onCategoryChange={handleCategoryChange}
              onTagChange={handleTagChange}
            />
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || selectedCategory || selectedTag) && (
        <div className="active-filters mb-4">
          <div className="d-flex flex-wrap align-items-center gap-2">
            <span className="text-muted me-2">Active filters:</span>

            {searchQuery && (
              <span className="badge bg-primary">
                Search: "{searchQuery}"
              </span>
            )}

            {selectedCategory && (
              <span className="badge bg-success">
                Category: {selectedCategory}
              </span>
            )}

            {selectedTag && (
              <span className="badge bg-info">
                Tag: #{selectedTag}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <div className="blog-content">
        <BlogGrid posts={posts} loading={loading} />
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="pagination-wrapper mt-5">
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
            showInfo={true}
          />
        </div>
      )}
    </div>
  );
}