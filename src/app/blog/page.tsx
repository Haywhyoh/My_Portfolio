import { Suspense } from 'react';
import type { Metadata } from 'next';
import BlogListingContent from './BlogListingContent';
import { getAllBlogs } from '@/lib/blog';
import {
  generateBlogListingStructuredData,
  generateWebsiteStructuredData,
  StructuredDataScript,
} from '@/lib/structured-data';
import Container from '@/components/site/Container';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on React, Next.js, and shipping production software.',
  alternates: { canonical: `${siteConfig.url}/blog` },
};

export default async function BlogPage() {
  const blogs = await getAllBlogs();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

  const blogListingStructuredData = generateBlogListingStructuredData(blogs, siteUrl);
  const websiteStructuredData = generateWebsiteStructuredData(siteUrl);

  return (
    <>
      <StructuredDataScript data={blogListingStructuredData} />
      <StructuredDataScript data={websiteStructuredData} />
      <Suspense fallback={<BlogListingFallback />}>
        <BlogListingContent />
      </Suspense>
    </>
  );
}

function BlogListingFallback() {
  return (
    <section className="tw-py-16 sm:tw-py-24">
      <Container>
        <div className="tw-h-10 tw-w-48 tw-animate-pulse tw-rounded tw-bg-white/5" />
        <div className="tw-mt-10 tw-grid tw-grid-cols-1 tw-gap-6 sm:tw-grid-cols-2 lg:tw-grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="tw-h-80 tw-animate-pulse tw-rounded-3xl tw-bg-white/5" />
          ))}
        </div>
      </Container>
    </section>
  );
}
