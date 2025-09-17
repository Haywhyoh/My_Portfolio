'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { BlogFiltersProps, BLOG_CONFIG } from '@/lib/types';

const BlogFilters = ({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  onCategoryChange,
  onTagChange
}: BlogFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams);

    if (category === BLOG_CONFIG.DEFAULT_CATEGORY) {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    // Clear tag and reset page
    params.delete('tag');
    params.delete('page');

    const queryString = params.toString();
    const newUrl = queryString ? `/blog?${queryString}` : '/blog';
    router.push(newUrl);

    onCategoryChange(category === BLOG_CONFIG.DEFAULT_CATEGORY ? undefined : category);
  };

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams);

    if (selectedTag === tag) {
      // Toggle off if already selected
      params.delete('tag');
      onTagChange(undefined);
    } else {
      params.set('tag', tag);
      onTagChange(tag);
    }

    // Clear category and reset page
    params.delete('category');
    params.delete('page');

    const queryString = params.toString();
    const newUrl = queryString ? `/blog?${queryString}` : '/blog';
    router.push(newUrl);
  };

  return (
    <div className="blog-filters">
      {/* Category Filters */}
      <div className="filter-section mb-4">
        <h5 className="filter-title">Categories</h5>
        <div className="filter-options">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`filter-btn ${
                (selectedCategory === category) ||
                (category === BLOG_CONFIG.DEFAULT_CATEGORY && !selectedCategory)
                  ? 'active'
                  : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filters */}
      <div className="filter-section">
        <h5 className="filter-title">Tags</h5>
        <div className="filter-options tag-options">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`filter-btn tag-btn ${selectedTag === tag ? 'active' : ''}`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategory || selectedTag) && (
        <div className="filter-actions mt-3">
          <button
            onClick={() => {
              router.push('/blog');
              onCategoryChange(undefined);
              onTagChange(undefined);
            }}
            className="btn btn-outline-secondary btn-sm"
          >
            <i className="fas fa-times me-1"></i>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogFilters;