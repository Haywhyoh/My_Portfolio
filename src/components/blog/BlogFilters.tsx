'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { BlogFiltersProps, BLOG_CONFIG } from '@/lib/types';

const BlogFilters = ({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  onCategoryChange,
  onTagChange,
  variant = "default"
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

  const getFilterClasses = () => {
    if (variant === 'hero') {
      return 'blog-filters hero-filters';
    }
    return 'blog-filters';
  };

  const getButtonClasses = () => {
    if (variant === 'hero') {
      return 'btn btn-outline-light dropdown-toggle w-100 hero-filter-btn';
    }
    return 'btn btn-outline-primary dropdown-toggle w-100';
  };

  return (
    <div className={getFilterClasses()}>
      {/* Filter Dropdown */}
      <div className="dropdown">
        <button
          className={getButtonClasses()}
          type="button"
          id="blogFiltersDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-filter me-2"></i>
          {selectedCategory || selectedTag || 'Tags'}
        </button>
        <ul className="dropdown-menu w-100" aria-labelledby="blogFiltersDropdown">
          {/* Categories */}
          <li><h6 className="dropdown-header">Categories</h6></li>
          {categories.map((category) => (
            <li key={category}>
              <button
                className={`dropdown-item ${
                  (selectedCategory === category) ||
                  (category === BLOG_CONFIG.DEFAULT_CATEGORY && !selectedCategory)
                    ? 'active'
                    : ''
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <i className="fas fa-folder me-2"></i>
                {category}
              </button>
            </li>
          ))}

          {tags.length > 0 && (
            <>
              <li><hr className="dropdown-divider" /></li>
              <li><h6 className="dropdown-header">Tags</h6></li>
              {tags.slice(0, 8).map((tag) => (
                <li key={tag}>
                  <button
                    className={`dropdown-item ${selectedTag === tag ? 'active' : ''}`}
                    onClick={() => handleTagClick(tag)}
                  >
                    <i className="fas fa-tag me-2"></i>
                    {tag}
                  </button>
                </li>
              ))}
            </>
          )}

          {(selectedCategory || selectedTag) && (
            <>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => {
                    router.push('/blog');
                    onCategoryChange(undefined);
                    onTagChange(undefined);
                  }}
                >
                  <i className="fas fa-times me-2"></i>
                  Clear All Filters
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BlogFilters;