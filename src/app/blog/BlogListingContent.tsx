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
    <>
      {/* Hero Section */}
      <div className="blog-hero-section">
        <div className="blog-hero-overlay">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                <div className="blog-hero-content text-center">
                  <h1 className="blog-hero-title">Our Articles</h1>
                  <p className="blog-hero-description">
                    This is a melting pot of insights, tips, and innovative ways to use
                    modern web technologies, tailored for professionals who thrive on web innovation.
                  </p>

                  {/* Search and Tags */}
                  <div className="blog-hero-controls">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-lg-6 col-md-8">
                        <div className="hero-search-wrapper">
                          <BlogSearch
                            onSearch={handleSearch}
                            initialValue={searchQuery}
                            placeholder="Search..."
                            variant="hero"
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4">
                        <div className="hero-tags-wrapper">
                          <BlogFilters
                            categories={categories}
                            tags={tags}
                            selectedCategory={selectedCategory}
                            selectedTag={selectedTag}
                            onCategoryChange={handleCategoryChange}
                            onTagChange={handleTagChange}
                            variant="hero"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="blog-articles-section">
        <div className="container">
          {/* Active Filters */}
          {(searchQuery || selectedCategory || selectedTag) && (
            <div className="row mb-4">
              <div className="col-lg-12">
                <div className="active-filters-display">
                  <div className="d-flex flex-wrap align-items-center">
                    <span className="filter-label me-3">Active Filters:</span>
                    <div className="filter-badges">
                      {searchQuery && (
                        <span className="filter-badge search-badge">
                          <i className="fas fa-search me-1"></i>
                          &ldquo;{searchQuery}&rdquo;
                        </span>
                      )}
                      {selectedCategory && (
                        <span className="filter-badge category-badge">
                          <i className="fas fa-folder me-1"></i>
                          {selectedCategory}
                        </span>
                      )}
                      {selectedTag && (
                        <span className="filter-badge tag-badge">
                          <i className="fas fa-tag me-1"></i>
                          {selectedTag}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Grid */}
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <BlogGrid posts={posts} loading={loading} />
              </div>
            </div>
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="row">
              <div className="col-lg-12">
                <div className="pagination-wrapper text-center mt-60">
                  <BlogPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    basePath="/blog"
                    showInfo={false}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}