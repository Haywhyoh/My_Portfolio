'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { parseMarkdown, formatDate, formatReadTime } from '@/lib/markdown';
import ArticleNavigation from './ArticleNavigation';
import SocialShare from './SocialShare';
import RelatedPosts from './RelatedPosts';

interface BlogDetailProps {
  post: BlogPost;
}

export default function BlogDetail({ post }: BlogDetailProps) {
  const [readingProgress, setReadingProgress] = useState(0);

  // Reading progress calculation
  useEffect(() => {
    const updateReadingProgress = () => {
      const article = document.querySelector('.modern-article-content') as HTMLElement;
      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      const progress = Math.min(
        100,
        Math.max(0, ((scrollTop - articleTop + windowHeight) / articleHeight) * 100)
      );

      setReadingProgress(progress);
    };

    const handleScroll = () => {
      updateReadingProgress();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parsedContent = parseMarkdown(post.content);

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="modern-reading-progress">
        <div
          className="modern-reading-progress-bar"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header Section */}
      <section className="modern-blog-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="modern-blog-header-content">
                {/* Breadcrumb */}
                <nav className="modern-breadcrumb">
                  <Link href="/blog" className="breadcrumb-link">
                    ← Blog & Articles
                  </Link>
                </nav>

                {/* Article Title */}
                <h1 className="modern-blog-title">{post.title}</h1>

                {/* Article Meta */}
                <div className="modern-article-meta">
                  <div className="meta-author">
                    <div className="author-avatar-placeholder">{post.author?.charAt(0) || 'A'}</div>
                    <span className="author-name">{post.author}</span>
                  </div>
                  <span className="meta-date">{formatDate(post.publishedAt || post.date)}</span>
                  <span className="meta-read-time">{formatReadTime(post.readTime || 5)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      {post.featuredImage && (
        <section className="modern-featured-image">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="featured-image-wrapper">
                  <Image
                    src={`/assets/img/blog/${post.featuredImage}`}
                    alt={post.title}
                    width={1200}
                    height={600}
                    className="img-fluid"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="modern-article-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <article className="modern-article-content">
                <div
                  className="modern-content-body"
                  dangerouslySetInnerHTML={{ __html: parsedContent }}
                />

                {/* Author Profile Card */}
                <div className="modern-author-card">
                  <div className="author-card-content">
                    <div className="author-avatar-large">
                      <div className="author-avatar-large-placeholder">{post.author?.charAt(0) || 'A'}</div>
                    </div>
                    <div className="author-info">
                      <h4 className="author-name">{post.author}</h4>
                      <p className="author-bio">
                        Full-stack developer passionate about creating innovative web solutions
                        and sharing knowledge through technical writing.
                      </p>
                      <div className="author-social-links">
                        <a href="#" className="social-link">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="social-link">
                          <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="#" className="social-link">
                          <i className="fab fa-github"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Share */}
                <div className="modern-social-share">
                  <h4>Share this article with others</h4>
                  <SocialShare
                    title={post.title}
                    url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${post.slug}`}
                    description={post.excerpt}
                    variant="horizontal"
                  />
                </div>

                {/* Article Navigation */}
                <ArticleNavigation postId={post.id} />
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="modern-related-posts">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="related-posts-title">Similar articles</h2>
              <RelatedPosts currentPostId={post.id} />
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Modern Reading Progress */
        .modern-reading-progress {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: rgba(0, 0, 0, 0.05);
          z-index: 1000;
        }

        .modern-reading-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          transition: width 0.3s ease;
        }

        /* Modern Blog Header */
        .modern-blog-header {
          padding: 60px 0 40px;
          background: white;
        }

        .modern-blog-header-content {
          text-align: center;
        }

        .modern-breadcrumb {
          margin-bottom: 30px;
        }

        .breadcrumb-link {
          color: #6366f1;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .breadcrumb-link:hover {
          color: #4f46e5;
        }

        .modern-blog-title {
          font-size: 2.75rem;
          font-weight: 700;
          line-height: 1.2;
          color: #1f2937;
          margin-bottom: 30px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .modern-article-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .meta-author {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .author-avatar {
          border-radius: 50%;
        }

        .author-avatar-placeholder {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
        }


        .author-name {
          font-weight: 600;
          color: #1f2937;
          font-size: 14px;
        }

        .meta-date,
        .meta-read-time {
          color: #6b7280;
          font-size: 14px;
        }

        /* Featured Image */
        .modern-featured-image {
          padding: 0 0 60px;
          background: white;
        }

        .featured-image-wrapper {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
        }

        .featured-image-wrapper img {
          width: 100%;
          height: auto;
        }

        /* Article Content */
        .modern-article-section {
          padding: 60px 0;
          background: white;
        }

        .modern-article-content {
          max-width: 700px;
          margin: 0 auto;
        }

        .modern-content-body {
          font-size: 1.125rem;
          line-height: 1.75;
          color: #374151;
          margin-bottom: 60px;
        }

        .modern-content-body h1,
        .modern-content-body h2,
        .modern-content-body h3,
        .modern-content-body h4,
        .modern-content-body h5,
        .modern-content-body h6 {
          color: #1f2937;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
        }

        .modern-content-body h2 {
          font-size: 1.875rem;
          margin-top: 3rem;
        }

        .modern-content-body h3 {
          font-size: 1.5rem;
        }

        .modern-content-body h4 {
          font-size: 1.25rem;
        }

        .modern-content-body p {
          margin-bottom: 1.75rem;
        }

        .modern-content-body ol {
          counter-reset: item;
          padding-left: 0;
          margin-bottom: 2rem;
        }

        .modern-content-body ol > li {
          display: block;
          margin-bottom: 1.5rem;
          padding-left: 60px;
          position: relative;
        }

        .modern-content-body ol > li:before {
          content: counter(item);
          counter-increment: item;
          position: absolute;
          left: 0;
          top: 0;
          width: 40px;
          height: 40px;
          background: #6366f1;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
        }

        .modern-content-body ul {
          padding-left: 2rem;
          margin-bottom: 2rem;
        }

        .modern-content-body ul > li {
          margin-bottom: 0.75rem;
          position: relative;
        }

        .modern-content-body ul > li:before {
          content: '';
          position: absolute;
          left: -1.5rem;
          top: 0.75rem;
          width: 6px;
          height: 6px;
          background: #6366f1;
          border-radius: 50%;
        }

        .modern-content-body blockquote {
          border-left: 4px solid #6366f1;
          padding: 1.5rem 2rem;
          margin: 2rem 0;
          background: #f8fafc;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #475569;
        }

        .modern-content-body code {
          background: #f1f5f9;
          padding: 4px 8px;
          border-radius: 6px;
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
          font-size: 0.875em;
          color: #e11d48;
        }

        .modern-content-body pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 2rem;
          border-radius: 12px;
          overflow-x: auto;
          margin: 2rem 0;
        }

        .modern-content-body pre code {
          background: none;
          color: inherit;
          padding: 0;
        }

        .modern-content-body a {
          color: #6366f1;
          text-decoration: none;
          font-weight: 500;
        }

        .modern-content-body a:hover {
          color: #4f46e5;
          text-decoration: underline;
        }

        .modern-content-body img {
          border-radius: 12px;
          margin: 2rem 0;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        /* Author Card */
        .modern-author-card {
          background: #f8fafc;
          border-radius: 16px;
          padding: 40px;
          margin: 60px 0;
          border: 1px solid #e2e8f0;
        }

        .author-card-content {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .author-avatar-large img {
          border-radius: 50%;
          border: 4px solid white;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .author-avatar-large-placeholder {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 24px;
          border: 4px solid white;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .author-info .author-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .author-bio {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .author-social-links {
          display: flex;
          gap: 12px;
        }

        .author-social-links .social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: #6366f1;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .author-social-links .social-link:hover {
          background: #4f46e5;
          transform: translateY(-2px);
        }

        /* Social Share */
        .modern-social-share {
          text-align: center;
          padding: 40px 0;
          border-top: 1px solid #e5e7eb;
          margin-top: 40px;
        }

        .modern-social-share h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 24px;
        }

        /* Related Posts */
        .modern-related-posts {
          padding: 80px 0;
          background: #f9fafb;
        }

        .related-posts-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          text-align: center;
          margin-bottom: 60px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .modern-blog-title {
            font-size: 2rem;
          }

          .modern-article-meta {
            flex-direction: column;
            gap: 12px;
          }

          .modern-content-body {
            font-size: 1rem;
            line-height: 1.7;
          }

          .modern-content-body ol > li {
            padding-left: 50px;
          }

          .modern-content-body ol > li:before {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }

          .author-card-content {
            flex-direction: column;
            text-align: center;
          }

          .modern-author-card {
            padding: 30px 20px;
          }
        }

        @media (max-width: 576px) {
          .modern-blog-header {
            padding: 40px 0 30px;
          }

          .modern-blog-title {
            font-size: 1.75rem;
          }

          .modern-content-body {
            font-size: 0.95rem;
          }

          .modern-content-body ol > li {
            padding-left: 45px;
          }

          .modern-content-body ol > li:before {
            width: 28px;
            height: 28px;
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
}
