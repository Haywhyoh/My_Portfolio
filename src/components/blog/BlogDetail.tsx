'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { parseMarkdown, formatDate, formatReadTime } from '@/lib/markdown';
import { incrementViewCount } from '@/lib/blog';
import Container from '@/components/site/Container';
import RelatedPosts from './RelatedPosts';
import SocialShare from './SocialShare';
import { siteConfig } from '@/lib/siteConfig';

interface BlogDetailProps {
  post: BlogPost;
}

function resolveBlogImage(src?: string | null) {
  if (!src) return null;
  if (src.startsWith('http') || src.startsWith('/')) return src;
  return `/assets/img/blog/${src}`;
}

export default function BlogDetail({ post }: BlogDetailProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const heroImage = resolveBlogImage(post.featuredImage || post.thumbnail);
  const dateLabel = post.publishedAt || post.date;

  useEffect(() => {
    incrementViewCount(post.slug);
  }, [post.slug]);

  useEffect(() => {
    const updateReadingProgress = () => {
      const article = document.querySelector('.tw-prose') as HTMLElement | null;
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

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  const parsedContent = parseMarkdown(post.content);
  const shareUrl = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <>
      <div className="tw-pointer-events-none tw-fixed tw-left-0 tw-top-0 tw-z-[60] tw-h-0.5 tw-w-full">
        <div className="tw-h-full tw-bg-accent-400" style={{ width: `${readingProgress}%` }} />
      </div>

      <article className="tw-py-16 sm:tw-py-24">
        <Container className="tw-max-w-3xl">
          <Link
            href="/blog"
            className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-sm tw-text-mist-400 hover:tw-text-white"
          >
            <ArrowLeft className="tw-h-3.5 tw-w-3.5" /> All articles
          </Link>

          {post.category && (
            <p className="tw-mt-8 tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.2em] tw-text-accent-400">
              {post.category}
            </p>
          )}
          <h1 className="tw-mt-3 tw-text-balance tw-text-3xl tw-font-semibold tw-tracking-tight tw-text-white sm:tw-text-5xl">
            {post.title}
          </h1>
          <div className="tw-mt-6 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-4 tw-border-b tw-border-white/10 tw-pb-6 tw-text-sm tw-text-mist-400">
            <p>
              {post.author}
              {dateLabel ? ` · ${formatDate(dateLabel)}` : ''}
              {post.readTime ? ` · ${formatReadTime(post.readTime)}` : ''}
            </p>
            <SocialShare title={post.title} url={shareUrl} description={post.excerpt} />
          </div>
        </Container>

        {heroImage && (
          <Container className="tw-mt-10 tw-max-w-4xl">
            <div className="tw-relative tw-aspect-[16/9] tw-overflow-hidden tw-rounded-3xl tw-border tw-border-white/10 tw-bg-ink-800">
              <Image src={heroImage} alt={post.title} fill className="tw-object-cover" priority />
            </div>
          </Container>
        )}

        <Container className="tw-mt-12 tw-max-w-3xl">
          <div className="tw-prose" dangerouslySetInnerHTML={{ __html: parsedContent }} />

          {post.tags?.length > 0 && (
            <div className="tw-mt-12 tw-flex tw-flex-wrap tw-gap-2 tw-border-t tw-border-white/10 tw-pt-8">
              {post.tags.map((tag) => (
                <span key={tag} className="tw-rounded-full tw-bg-white/5 tw-px-3 tw-py-1 tw-text-xs tw-text-mist-300">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </Container>
      </article>

      <RelatedPosts currentPostId={post.id} />
    </>
  );
}
