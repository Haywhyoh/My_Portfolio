'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlogSearchProps } from '@/lib/types';

const BlogSearch = ({
  onSearch,
  placeholder = "Search blog posts...",
  initialValue = "",
  variant = "default"
}: BlogSearchProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    // Create new search params
    const params = new URLSearchParams(searchParams);

    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    } else {
      params.delete('search');
    }

    // Reset to first page when searching
    params.delete('page');

    // Update URL
    const queryString = params.toString();
    const newUrl = queryString ? `/blog?${queryString}` : '/blog';
    router.push(newUrl);

    // Call parent handler
    onSearch(searchQuery.trim());
  }, [searchQuery, searchParams, router, onSearch]);

  const handleClear = () => {
    setSearchQuery('');

    // Clear search from URL
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    params.delete('page');

    const queryString = params.toString();
    const newUrl = queryString ? `/blog?${queryString}` : '/blog';
    router.push(newUrl);

    onSearch('');
  };

  const getSearchClasses = () => {
    if (variant === 'hero') {
      return 'blog-search-widget hero-search';
    }
    return 'blog-search-widget';
  };

  return (
    <div className={getSearchClasses()}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group search-input-group">
          <span className="input-group-text search-icon">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            className="form-control search-input"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-outline-secondary clear-btn"
              aria-label="Clear search"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
          {variant !== 'hero' && (
            <button
              type="submit"
              className="btn btn-primary search-btn"
              aria-label="Search"
            >
              Search
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BlogSearch;