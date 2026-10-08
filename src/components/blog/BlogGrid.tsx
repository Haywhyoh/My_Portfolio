'use client';

import { BlogGridProps } from '@/lib/types';
import BlogCardV1 from './BlogCardV1';

const BlogGrid = ({ posts, loading = false }: BlogGridProps) => {
  if (loading) {
    return (
      <div className="tw-grid tw-grid-cols-1 tw-gap-6 sm:tw-grid-cols-2 lg:tw-grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="tw-h-80 tw-animate-pulse tw-rounded-3xl tw-border tw-border-white/10 tw-bg-white/5"
          />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="tw-rounded-3xl tw-border tw-border-white/10 tw-bg-ink-900/40 tw-px-6 tw-py-16 tw-text-center">
        <h3 className="tw-text-lg tw-font-semibold tw-text-white">No posts found</h3>
        <p className="tw-mt-2 tw-text-sm tw-text-mist-400">Try a different search or clear the current filters.</p>
      </div>
    );
  }

  return (
    <div className="tw-grid tw-grid-cols-1 tw-gap-6 sm:tw-grid-cols-2 lg:tw-grid-cols-3">
      {posts.map((post) => (
        <BlogCardV1 key={post.id} post={post} showExcerpt showReadTime />
      ))}
    </div>
  );
};

export default BlogGrid;
