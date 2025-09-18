'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { BlogCardProps } from '@/lib/types';

const BlogCardV1 = ({
  post,
  variant = 'default',
  showExcerpt = true,
  showReadTime = true,
  showAuthor = true
}: BlogCardProps) => {
  const [imageError, setImageError] = useState(false);

  const {
    slug,
    title,
    excerpt,
    author,
    date,
    thumbnail,
    category,
    tags,
    readTime,
    animationDelay
  } = post;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <div
        className={`modern-blog-card ${variant === 'featured' ? 'featured' : ''}`}
        style={{
          animationDelay: animationDelay,
          animation: 'fadeInUp 0.6s ease-out'
        }}
      >
        <div className="modern-blog-thumb">
          <Link href={`/blog/${slug}`}>
            {!imageError ? (
              <Image
                src={`/assets/img/blog/${thumbnail}`}
                alt={title}
                width={400}
                height={280}
                style={{ objectFit: 'cover', width: '100%', height: '280px' }}
                onError={handleImageError}
                priority={variant === 'featured'}
              />
            ) : (
              <div className="blog-image-fallback">
                <div className="fallback-content">
                  <i className="fas fa-code text-primary mb-2"></i>
                  <span className="fallback-text">{category}</span>
                </div>
              </div>
            )}
          </Link>
        </div>
        <div className="modern-blog-content">
          {category && (
            <span className="modern-blog-category">{category}</span>
          )}
          <h3 className="modern-blog-title">
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h3>
          {showExcerpt && (
            <p className="modern-blog-excerpt">{excerpt}</p>
          )}
          <div className="modern-blog-meta">
            {showAuthor && (
              <span className="blog-author">{author}</span>
            )}
            <span className="blog-date">{date}</span>
            {showReadTime && readTime && (
              <span className="blog-read-time">{readTime} min read</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCardV1;
