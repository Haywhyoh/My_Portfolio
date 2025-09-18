'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getRelatedBlogs } from '@/lib/blog';
import { BlogPost } from '@/lib/types';
import { formatDate, formatReadTime } from '@/lib/markdown';

interface RelatedPostsProps {
  currentPostId: number;
  limit?: number;
}

export default function RelatedPosts({ currentPostId, limit = 3 }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelatedPosts = async () => {
      try {
        const posts = await getRelatedBlogs(currentPostId, limit);
        setRelatedPosts(posts);
      } catch (error) {
        console.error('Error loading related posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRelatedPosts();
  }, [currentPostId, limit]);

  if (loading) {
    return (
      <div className="sidebar-widget related-posts-widget">
        <h4>Related Posts</h4>
        <div className="related-posts-skeleton">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="skeleton-post">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-meta"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedPosts.length === 0) {
    return (
      <div className="sidebar-widget related-posts-widget">
        <h4>Related Posts</h4>
        <div className="no-related-posts">
          <p>No related posts found.</p>
          <Link href="/blog" className="view-all-link">
            View All Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar-widget related-posts-widget">
      <h4>Related Posts</h4>
      <div className="related-posts-list">
        {relatedPosts.map((post) => (
          <article key={post.id} className="related-post">
            <Link href={`/blog/${post.slug}`} className="post-link">
              <div className="post-thumbnail">
                <Image
                  src={`/assets/img/blog/${post.thumbnail}`}
                  alt={post.title}
                  width={80}
                  height={60}
                  className="img-fluid"
                />
              </div>
              <div className="post-content">
                <h5 className="post-title">{post.title}</h5>
                <div className="post-meta">
                  <span className="post-date">
                    <i className="far fa-calendar-alt"></i>
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="post-read-time">
                    <i className="far fa-clock"></i>
                    {formatReadTime(post.readTime)}
                  </span>
                </div>
                <p className="post-excerpt">{post.excerpt}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
      <div className="widget-footer">
        <Link href="/blog" className="view-all-link">
          View All Posts
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>

      <style jsx>{`
        .related-posts-widget {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 8px;
          margin-bottom: 30px;
        }

        .related-posts-widget h4 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: #2c3e50;
          border-bottom: 2px solid #e9ecef;
          padding-bottom: 10px;
        }

        .related-posts-list {
          margin-bottom: 20px;
        }

        .related-post {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .related-post:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .post-link {
          display: flex;
          gap: 15px;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
        }

        .post-link:hover {
          transform: translateX(5px);
        }

        .post-thumbnail {
          flex-shrink: 0;
          width: 80px;
          height: 60px;
          border-radius: 6px;
          overflow: hidden;
          background: #e9ecef;
        }

        .post-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .post-link:hover .post-thumbnail img {
          transform: scale(1.05);
        }

        .post-content {
          flex: 1;
          min-width: 0;
        }

        .post-title {
          font-size: 0.95rem;
          font-weight: 600;
          line-height: 1.3;
          margin-bottom: 8px;
          color: #2c3e50;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .post-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 8px;
          font-size: 12px;
          color: #6c757d;
        }

        .post-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .post-meta i {
          font-size: 10px;
        }

        .post-excerpt {
          font-size: 13px;
          color: #6c757d;
          line-height: 1.4;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .widget-footer {
          text-align: center;
          padding-top: 15px;
          border-top: 1px solid #e9ecef;
        }

        .view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #007bff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .view-all-link:hover {
          color: #0056b3;
          transform: translateX(3px);
        }

        .view-all-link i {
          font-size: 12px;
          transition: transform 0.3s ease;
        }

        .view-all-link:hover i {
          transform: translateX(3px);
        }

        .no-related-posts {
          text-align: center;
          padding: 20px 0;
        }

        .no-related-posts p {
          color: #6c757d;
          margin-bottom: 15px;
        }

        /* Skeleton Loading */
        .related-posts-skeleton {
          margin-bottom: 20px;
        }

        .skeleton-post {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .skeleton-post:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .skeleton-image {
          width: 80px;
          height: 60px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .skeleton-content {
          flex: 1;
        }

        .skeleton-title {
          height: 16px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .skeleton-meta {
          height: 12px;
          width: 80%;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
        }

        @keyframes loading {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .related-posts-widget {
            padding: 20px;
          }

          .post-link {
            gap: 12px;
          }

          .post-thumbnail {
            width: 70px;
            height: 50px;
          }

          .post-title {
            font-size: 0.9rem;
          }

          .post-meta {
            gap: 8px;
            font-size: 11px;
          }

          .post-excerpt {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .related-posts-widget {
            padding: 15px;
          }

          .post-link {
            flex-direction: column;
            gap: 10px;
          }

          .post-thumbnail {
            width: 100%;
            height: 120px;
          }

          .post-content {
            text-align: center;
          }

          .post-meta {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

