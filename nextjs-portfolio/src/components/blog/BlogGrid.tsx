'use client';

import { BlogGridProps } from '@/lib/types';
import BlogCard from './BlogCard';

const BlogGrid = ({ posts, loading = false }: BlogGridProps) => {
  if (loading) {
    return (
      <div className="blog-grid-loading">
        <div className="row">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="col-xl-4 col-lg-6 col-md-6 mb-30">
              <div className="blog-skeleton">
                <div className="skeleton-thumb"></div>
                <div className="skeleton-content">
                  <div className="skeleton-meta"></div>
                  <div className="skeleton-title"></div>
                  <div className="skeleton-excerpt"></div>
                  <div className="skeleton-button"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="no-posts-found">
        <div className="text-center py-5">
          <i className="fas fa-search fa-3x text-muted mb-3"></i>
          <h3>No Blog Posts Found</h3>
          <p className="text-muted">
            No blog posts match your current filters. Try adjusting your search criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-grid">
      <div className="row">
        {posts.map((post, index) => (
          <div key={post.id} className="col-xl-4 col-lg-6 col-md-6 mb-30">
            <BlogCard
              post={post}
              variant={index === 0 ? 'featured' : 'default'}
              showExcerpt={true}
              showReadTime={true}
              showAuthor={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogGrid;