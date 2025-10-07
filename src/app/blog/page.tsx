import { Suspense } from 'react';
import type { Metadata } from 'next';
import BlogListingContent from './BlogListingContent';
import { getAllBlogs } from '@/lib/blog';
import {
  generateBlogListingStructuredData,
  generateWebsiteStructuredData,
  StructuredDataScript
} from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Blog - Web Development Insights',
  description: 'Discover insights on React, Next.js, web development, and modern software engineering practices.',
  keywords: ['blog', 'web development', 'react', 'nextjs', 'javascript', 'typescript', 'programming'],
  openGraph: {
    title: 'Blog - Web Development Insights',
    description: 'Discover insights on React, Next.js, web development, and modern software engineering practices.',
    type: 'website'
  }
};

export default async function BlogPage() {
  // Get blog data for structured data
  const blogs = await getAllBlogs();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourportfolio.com';

  const blogListingStructuredData = generateBlogListingStructuredData(blogs, siteUrl);
  const websiteStructuredData = generateWebsiteStructuredData(siteUrl);

  return (
    <>
      {/* Structured Data */}
      <StructuredDataScript data={blogListingStructuredData} />
      <StructuredDataScript data={websiteStructuredData} />

      {/* Blog Listing Content */}
      <Suspense fallback={<BlogListingFallback />}>
        <BlogListingContent />
      </Suspense>
    </>
  );
}

function BlogListingFallback() {
  return (
    <div className="blog-listing-skeleton">
      {/* Search and Filters Skeleton */}
      <div className="mb-4">
        <div className="row">
          <div className="col-lg-8">
            <div className="skeleton-search-bar"></div>
          </div>
          <div className="col-lg-4">
            <div className="skeleton-filters"></div>
          </div>
        </div>
      </div>

      {/* Blog Grid Skeleton */}
      <div className="row">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-30">
            <div className="blog-skeleton">
              <div className="skeleton-thumb"></div>
              <div className="skeleton-content">
                <div className="skeleton-meta"></div>
                <div className="skeleton-title"></div>
                <div className="skeleton-excerpt"></div>
                <div className="skeleton-button"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}