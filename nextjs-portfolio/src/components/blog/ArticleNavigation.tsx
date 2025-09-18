'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllBlogs, getBlogById } from '@/lib/blog';
import { BlogPost } from '@/lib/types';

interface ArticleNavigationProps {
  postId: number;
}

export default function ArticleNavigation({ postId }: ArticleNavigationProps) {
  const [prevPost, setPrevPost] = useState<BlogPost | null>(null);
  const [nextPost, setNextPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNavigationPosts = async () => {
      try {
        const allPosts = await getAllBlogs();
        const currentIndex = allPosts.findIndex(post => post.id === postId);
        
        if (currentIndex !== -1) {
          // Get previous post (newer post)
          if (currentIndex > 0) {
            setPrevPost(allPosts[currentIndex - 1]);
          }
          
          // Get next post (older post)
          if (currentIndex < allPosts.length - 1) {
            setNextPost(allPosts[currentIndex + 1]);
          }
        }
      } catch (error) {
        console.error('Error loading navigation posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNavigationPosts();
  }, [postId]);

  if (loading) {
    return (
      <div className="article-navigation loading">
        <div className="nav-skeleton">
          <div className="skeleton-item"></div>
          <div className="skeleton-item"></div>
        </div>
      </div>
    );
  }

  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <nav className="article-navigation">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="nav-wrapper">
              {/* Previous Post */}
              <div className="nav-item prev-post">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="nav-link">
                    <div className="nav-arrow">
                      <i className="fas fa-arrow-left"></i>
                    </div>
                    <div className="nav-content">
                      <span className="nav-label">Previous Post</span>
                      <h4 className="nav-title">{prevPost.title}</h4>
                      <p className="nav-excerpt">{prevPost.excerpt}</p>
                    </div>
                  </Link>
                ) : (
                  <div className="nav-link disabled">
                    <div className="nav-arrow">
                      <i className="fas fa-arrow-left"></i>
                    </div>
                    <div className="nav-content">
                      <span className="nav-label">Previous Post</span>
                      <h4 className="nav-title">No previous post</h4>
                    </div>
                  </div>
                )}
              </div>

              {/* Back to Blog */}
              <div className="nav-item back-to-blog">
                <Link href="/blog" className="back-link">
                  <i className="fas fa-th-large"></i>
                  <span>All Posts</span>
                </Link>
              </div>

              {/* Next Post */}
              <div className="nav-item next-post">
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="nav-link">
                    <div className="nav-content">
                      <span className="nav-label">Next Post</span>
                      <h4 className="nav-title">{nextPost.title}</h4>
                      <p className="nav-excerpt">{nextPost.excerpt}</p>
                    </div>
                    <div className="nav-arrow">
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </Link>
                ) : (
                  <div className="nav-link disabled">
                    <div className="nav-content">
                      <span className="nav-label">Next Post</span>
                      <h4 className="nav-title">No next post</h4>
                    </div>
                    <div className="nav-arrow">
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .article-navigation {
          padding: 80px 0;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-top: 1px solid #e2e8f0;
        }

        .nav-wrapper {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 40px;
          align-items: center;
        }

        .nav-item {
          min-height: 140px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 28px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.08);
          text-decoration: none;
          color: inherit;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          border: 1px solid rgba(99, 102, 241, 0.1);
        }

        .nav-link:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.2);
        }

        .nav-link.disabled {
          opacity: 0.4;
          cursor: not-allowed;
          pointer-events: none;
          background: #f1f5f9;
        }

        .nav-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border-radius: 50%;
          font-size: 20px;
          flex-shrink: 0;
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        }

        .nav-content {
          flex: 1;
        }

        .nav-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          color: #8b5cf6;
          margin-bottom: 10px;
          letter-spacing: 0.8px;
        }

        .nav-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 10px;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .nav-excerpt {
          font-size: 15px;
          color: #6b7280;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0;
        }

        .back-to-blog {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .back-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 24px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 140px;
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
        }

        .back-link:hover {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.4);
        }

        .back-link i {
          font-size: 28px;
        }

        .back-link span {
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .loading {
          padding: 40px 0;
        }

        .nav-skeleton {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 40px;
          align-items: center;
        }

        .skeleton-item {
          height: 120px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 8px;
        }

        @keyframes loading {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @media (max-width: 768px) {
          .nav-wrapper {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .back-to-blog {
            order: -1;
          }

          .nav-link {
            flex-direction: row;
          }

          .next-post .nav-link {
            flex-direction: row-reverse;
          }

          .nav-arrow {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }

          .nav-title {
            font-size: 1rem;
          }

          .nav-excerpt {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .article-navigation {
            padding: 40px 0;
          }

          .nav-link {
            padding: 15px;
            gap: 15px;
          }

          .nav-arrow {
            width: 35px;
            height: 35px;
            font-size: 14px;
          }

          .back-link {
            padding: 15px;
            min-width: 100px;
          }

          .back-link i {
            font-size: 20px;
          }

          .back-link span {
            font-size: 12px;
          }
        }
      `}</style>
    </nav>
  );
}

