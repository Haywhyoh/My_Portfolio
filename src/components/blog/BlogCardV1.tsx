'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { BlogCardProps } from '@/lib/types';
import { formatDate } from '@/lib/markdown';

function resolveBlogImage(src?: string | null) {
  if (!src) return null;
  if (src.startsWith('http') || src.startsWith('/')) return src;
  return `/assets/img/blog/${src}`;
}

const BlogCardV1 = ({
  post,
  showExcerpt = true,
  showReadTime = true,
}: BlogCardProps) => {
  const [imageError, setImageError] = useState(false);
  const imageSrc = resolveBlogImage(post.thumbnail);
  const dateLabel = post.publishedAt || post.date;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="tw-group tw-flex tw-h-full tw-flex-col tw-overflow-hidden tw-rounded-3xl tw-border tw-border-white/10 tw-bg-ink-900/50 tw-shadow-card tw-transition-all hover:-tw-translate-y-1 hover:tw-border-accent-400/40"
    >
      <div className="tw-relative tw-aspect-[16/10] tw-w-full tw-overflow-hidden tw-bg-ink-800">
        {imageSrc && !imageError ? (
          <Image
            src={imageSrc}
            alt={post.title}
            fill
            className="tw-object-cover tw-transition-transform tw-duration-500 group-hover:tw-scale-[1.03]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="tw-flex tw-h-full tw-items-center tw-justify-center tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.18em] tw-text-mist-400">
            {post.category}
          </div>
        )}
      </div>
      <div className="tw-flex tw-flex-1 tw-flex-col tw-p-5 sm:tw-p-6">
        {post.category && (
          <span className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.18em] tw-text-accent-400">
            {post.category}
          </span>
        )}
        <h3 className="tw-mt-2 tw-text-lg tw-font-semibold tw-text-white group-hover:tw-text-accent-300">
          {post.title}
        </h3>
        {showExcerpt && post.excerpt && (
          <p className="tw-mt-2 tw-line-clamp-3 tw-text-sm tw-leading-relaxed tw-text-mist-300">{post.excerpt}</p>
        )}
        <p className="tw-mt-auto tw-pt-4 tw-font-mono tw-text-xs tw-text-mist-400">
          {dateLabel ? formatDate(dateLabel) : null}
          {showReadTime && post.readTime ? ` · ${post.readTime} min read` : null}
        </p>
      </div>
    </Link>
  );
};

export default BlogCardV1;
