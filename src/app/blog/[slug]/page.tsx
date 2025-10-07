import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBlogBySlug, getAllBlogs } from '@/lib/blog';
import BlogDetail from '@/components/blog/BlogDetail';
import { generateSlug } from '@/lib/blog';
import {
  generateBlogPostStructuredData,
  generateBreadcrumbStructuredData,
  StructuredDataScript
} from '@/lib/structured-data';

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.excerpt,
    keywords: blog.tags,
    authors: [{ name: blog.author }],
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.excerpt,
      type: 'article',
      publishedTime: blog.publishedAt || undefined,
      modifiedTime: blog.updatedAt || blog.publishedAt || undefined,
      authors: [blog.author],
      tags: blog.tags,
      images: blog.featuredImage || blog.thumbnail ? [
        {
          url: blog.featuredImage || blog.thumbnail!,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.excerpt,
      images: blog.featuredImage || blog.thumbnail ? [blog.featuredImage || blog.thumbnail!] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  // Generate structured data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://samueladedayo.com';
  const blogStructuredData = generateBlogPostStructuredData(blog, siteUrl);
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: blog.title, url: `/blog/${blog.slug}` }
  ], siteUrl);

  return (
    <div style={{ paddingTop: '100px' }}>
      {/* Structured Data */}
      <StructuredDataScript data={blogStructuredData} />
      <StructuredDataScript data={breadcrumbStructuredData} />

      {/* Blog Content */}
      <BlogDetail post={blog} />
    </div>
  );
}




