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
    <div className="modern-related-posts-widget">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-header">
              <h2 className="section-title">Similar Articles</h2>
              <p className="section-subtitle">Discover more insightful content</p>
            </div>
          </div>
        </div>
        <div className="row g-4">
          {relatedPosts.map((post) => (
            <div key={post.id} className="col-lg-4 col-md-6">
              <article className="related-post-card">
                <Link href={`/blog/${post.slug}`} className="card-link">
                  <div className="card-image">
                    <Image
                      src={post.thumbnail
                        ? (post.thumbnail.startsWith('http') ? post.thumbnail : `/assets/img/blog/${post.thumbnail}`)
                        : `/assets/img/blog/default.jpg`}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="img-fluid"
                    />
                    <div className="image-overlay">
                      <div className="read-more-icon">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                  <div className="card-content">
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
                    <h3 className="card-title">{post.title}</h3>
                    <p className="card-excerpt">{post.excerpt}</p>
                  </div>
                </Link>
              </article>
            </div>
          ))}
        </div>
        <div className="section-footer">
          <Link href="/blog" className="view-all-btn">
            <span>View All Articles</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .modern-related-posts-widget {
          padding: 80px 0;
          background: #f9fafb;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-subtitle {
          font-size: 1.125rem;
          color: #6b7280;
          margin: 0;
          max-width: 500px;
          margin: 0 auto;
        }

        .related-post-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          border: 1px solid rgba(99, 102, 241, 0.1);
        }

        .related-post-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.2);
        }

        .card-link {
          display: block;
          text-decoration: none;
          color: inherit;
          height: 100%;
        }

        .card-image {
          position: relative;
          width: 100%;
          height: 250px;
          overflow: hidden;
          background: #e5e7eb;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .related-post-card:hover .card-image img {
          transform: scale(1.08);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8));
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .related-post-card:hover .image-overlay {
          opacity: 1;
        }

        .read-more-icon {
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6366f1;
          font-size: 20px;
          transform: scale(0.8);
          transition: transform 0.3s ease;
        }

        .related-post-card:hover .read-more-icon {
          transform: scale(1);
        }

        .card-content {
          padding: 32px;
        }

        .post-meta {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 16px;
          font-size: 14px;
          color: #8b5cf6;
        }

        .post-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
        }

        .post-meta i {
          font-size: 12px;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.4;
          color: #1f2937;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s ease;
        }

        .related-post-card:hover .card-title {
          color: #6366f1;
        }

        .card-excerpt {
          font-size: 15px;
          line-height: 1.6;
          color: #6b7280;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .section-footer {
          text-align: center;
          margin-top: 60px;
        }

        .view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
        }

        .view-all-btn:hover {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(99, 102, 241, 0.4);
        }

        .view-all-btn i {
          font-size: 14px;
          transition: transform 0.3s ease;
        }

        .view-all-btn:hover i {
          transform: translateX(4px);
        }

        .no-related-posts {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .no-related-posts p {
          font-size: 18px;
          margin-bottom: 24px;
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .section-title {
            font-size: 2.25rem;
          }

          .modern-related-posts-widget {
            padding: 60px 0;
          }

          .section-header {
            margin-bottom: 50px;
          }

          .card-content {
            padding: 24px;
          }

          .card-title {
            font-size: 1.125rem;
          }
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }

          .section-subtitle {
            font-size: 1rem;
          }

          .modern-related-posts-widget {
            padding: 50px 0;
          }

          .section-header {
            margin-bottom: 40px;
          }

          .section-footer {
            margin-top: 50px;
          }

          .card-image {
            height: 200px;
          }

          .card-content {
            padding: 20px;
          }

          .card-title {
            font-size: 1.1rem;
          }

          .card-excerpt {
            font-size: 14px;
          }

          .view-all-btn {
            padding: 14px 28px;
            font-size: 15px;
          }
        }

        @media (max-width: 576px) {
          .section-title {
            font-size: 1.75rem;
          }

          .modern-related-posts-widget {
            padding: 40px 0;
          }

          .section-header {
            margin-bottom: 30px;
          }

          .section-footer {
            margin-top: 40px;
          }

          .card-image {
            height: 180px;
          }

          .card-content {
            padding: 16px;
          }

          .post-meta {
            gap: 16px;
            font-size: 13px;
          }

          .card-title {
            font-size: 1rem;
            margin-bottom: 12px;
          }

          .card-excerpt {
            font-size: 13px;
          }

          .view-all-btn {
            padding: 12px 24px;
            font-size: 14px;
          }

          .read-more-icon {
            width: 50px;
            height: 50px;
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}




