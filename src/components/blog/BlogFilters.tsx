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
}: BlogFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrl = (mutate: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams);
    mutate(params);
    params.delete('page');
    const queryString = params.toString();
    router.push(queryString ? `/blog?${queryString}` : '/blog');
  };

  const handleCategoryClick = (category: string) => {
    updateUrl((params) => {
      if (category === BLOG_CONFIG.DEFAULT_CATEGORY) {
        params.delete('category');
      } else {
        params.set('category', category);
      }
      params.delete('tag');
    });
    onCategoryChange(category === BLOG_CONFIG.DEFAULT_CATEGORY ? undefined : category);
    onTagChange(undefined);
  };

  const handleTagClick = (tag: string) => {
    const next = selectedTag === tag ? undefined : tag;
    updateUrl((params) => {
      if (next) {
        params.set('tag', next);
      } else {
        params.delete('tag');
      }
      params.delete('category');
    });
    onTagChange(next);
    onCategoryChange(undefined);
  };

  const chip = (active: boolean) =>
    `tw-rounded-full tw-px-3 tw-py-1.5 tw-text-xs tw-font-medium tw-transition-colors ${
      active
        ? 'tw-bg-accent-500 tw-text-white'
        : 'tw-bg-white/5 tw-text-mist-300 hover:tw-bg-white/10 hover:tw-text-white'
    }`;

  return (
    <div className="tw-flex tw-flex-wrap tw-gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={chip(
            selectedCategory === category ||
              (category === BLOG_CONFIG.DEFAULT_CATEGORY && !selectedCategory && !selectedTag)
          )}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
      {tags.slice(0, 8).map((tag) => (
        <button key={tag} type="button" className={chip(selectedTag === tag)} onClick={() => handleTagClick(tag)}>
          #{tag}
        </button>
      ))}
    </div>
  );
};

export default BlogFilters;
