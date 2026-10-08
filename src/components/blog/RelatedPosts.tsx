'use client';

import { useState, useEffect } from 'react';
import { getRelatedBlogs } from '@/lib/blog';
import { BlogPost } from '@/lib/types';
import Container from '@/components/site/Container';
import BlogCardV1 from './BlogCardV1';

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

  if (loading || relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="tw-border-t tw-border-white/10 tw-py-16 sm:tw-py-20">
      <Container>
        <h2 className="tw-text-2xl tw-font-semibold tw-text-white">More articles</h2>
        <div className="tw-mt-8 tw-grid tw-grid-cols-1 tw-gap-6 sm:tw-grid-cols-2 lg:tw-grid-cols-3">
          {relatedPosts.map((post) => (
            <BlogCardV1 key={post.id} post={post} showExcerpt={false} />
          ))}
        </div>
      </Container>
    </section>
  );
}
