'use client';

import Link from "next/link";
import Image from "next/image";
import { BlogCardProps } from '@/lib/types';

const BlogCardV1 = ({
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

  return (
    <>
      <div
        className="modern-blog-card"
        style={{
          animationDelay: animationDelay,
          animation: 'fadeInUp 0.6s ease-out'
        }}
      >
        <div className="modern-blog-thumb">
          <Link href={`/blog/${slug}`}>
            <Image
              src={`/assets/img/blog/${thumbnail}`}
              alt={title}
              width={400}
              height={280}
              style={{ objectFit: 'cover', width: '100%', height: '280px' }}
            />
          </Link>
        </div>
        <div className="modern-blog-content">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCardV1;
