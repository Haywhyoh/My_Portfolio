'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { BlogSearchProps } from '@/lib/types';

const BlogSearch = ({
  onSearch,
  placeholder = 'Search posts…',
  initialValue = '',
}: BlogSearchProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const router = useRouter();
  const searchParams = useSearchParams();

  const pushParams = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams);
      if (query.trim()) {
        params.set('search', query.trim());
      } else {
        params.delete('search');
      }
      params.delete('page');
      const queryString = params.toString();
      router.push(queryString ? `/blog?${queryString}` : '/blog');
      onSearch(query.trim());
    },
    [searchParams, router, onSearch]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    pushParams(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="tw-relative tw-w-full">
      <Search className="tw-pointer-events-none tw-absolute tw-left-4 tw-top-1/2 tw-h-4 tw-w-4 -tw-translate-y-1/2 tw-text-mist-400" />
      <input
        type="search"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="tw-w-full tw-rounded-full tw-border tw-border-white/10 tw-bg-white/5 tw-py-3 tw-pl-11 tw-pr-12 tw-text-sm tw-text-white tw-outline-none placeholder:tw-text-mist-400 focus:tw-border-accent-400"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => {
            setSearchQuery('');
            pushParams('');
          }}
          aria-label="Clear search"
          className="tw-absolute tw-right-3 tw-top-1/2 tw-flex tw-h-7 tw-w-7 -tw-translate-y-1/2 tw-items-center tw-justify-center tw-rounded-full tw-text-mist-400 hover:tw-text-white"
        >
          <X className="tw-h-4 tw-w-4" />
        </button>
      )}
    </form>
  );
};

export default BlogSearch;
