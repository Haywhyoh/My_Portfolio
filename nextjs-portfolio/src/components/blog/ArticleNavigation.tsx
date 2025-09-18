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
          padding: 60px 0;
          background: #f8f9fa;
          border-top: 1px solid #e9ecef;
        }

        .nav-wrapper {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 40px;
          align-items: center;
        }

        .nav-item {
          min-height: 120px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          height: 100%;
        }

        .nav-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .nav-link.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        .nav-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: #007bff;
          color: white;
          border-radius: 50%;
          font-size: 18px;
          flex-shrink: 0;
        }

        .nav-content {
          flex: 1;
        }

        .nav-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #6c757d;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }

        .nav-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 8px;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .nav-excerpt {
          font-size: 14px;
          color: #6c757d;
          line-height: 1.4;
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
          gap: 10px;
          padding: 20px;
          background: #007bff;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
          min-width: 120px;
        }

        .back-link:hover {
          background: #0056b3;
          transform: translateY(-2px);
        }

        .back-link i {
          font-size: 24px;
        }

        .back-link span {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
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

