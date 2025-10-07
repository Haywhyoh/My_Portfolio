'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlogCardProps } from '@/lib/types';

const BlogCard = ({
  post,
  variant = 'default',
  showExcerpt = true,
  showReadTime = true,
  showAuthor = true
}: BlogCardProps) => {
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

  const cardClasses = {
    default: "blog-card-default",
    featured: "blog-card-featured",
    compact: "blog-card-compact"
  };

  return (
    <div
      className={`blog-style-one ${cardClasses[variant]} mb-30`}
      style={{
        animationDelay: animationDelay,
        animation: 'fadeInUp 0.6s ease-out'
      }}
    >
      <div className="blog-item-box">
        {/* Thumbnail */}
        <div className="thumb">
          <Link href={`/blog/${slug}`}>
            <Image
              src={`/assets/img/blog/${thumbnail}`}
              alt={title}
              width={400}
              height={250}
              className="blog-thumbnail"
              style={{ objectFit: 'cover', width: '100%', height: '250px' }}
            />
          </Link>

          {/* Category Badge */}
          <div className="category-badge">
            <span className="badge bg-primary">{category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="info">
          {/* Meta Information */}
          <div className="meta">
            <ul>
              {showAuthor && (
                <li>
                  <i className="fas fa-user"></i>
                  <span>{author}</span>
                </li>
              )}
              <li>
                <i className="fas fa-calendar-alt"></i>
                <span>{date}</span>
              </li>
              {showReadTime && (
                <li>
                  <i className="fas fa-clock"></i>
                  <span>{readTime} min read</span>
                </li>
              )}
            </ul>
          </div>

          {/* Title */}
          <h3 className="blog-title">
            <Link href={`/blog/${slug}`}>
              {title}
            </Link>
          </h3>

          {/* Excerpt */}
          {showExcerpt && (
            <p className="blog-excerpt">{excerpt}</p>
          )}

          {/* Tags */}
          <div className="blog-tags">
            {tags.slice(0, 3).map((tag, index) => (
              <Link
                key={index}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="tag-link"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {/* Read More Button */}
          <div className="blog-actions">
            <Link href={`/blog/${slug}`} className="button-regular">
              Read More <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;