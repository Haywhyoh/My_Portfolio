import { BlogPost } from './types';

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

/**
 * Generate JSON-LD structured data for a blog post
 */
export function generateBlogPostStructuredData(
  blog: BlogPost,
  siteUrl: string = 'https://yourportfolio.com'
): StructuredData {
  const baseUrl = siteUrl.replace(/\/$/, '');
  const blogUrl = `${baseUrl}/blog/${blog.slug}`;
  const authorUrl = `${baseUrl}/about`;
  const imageUrl = blog.featuredImage || blog.thumbnail || `${baseUrl}/images/default-blog.jpg`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Person',
      name: blog.author,
      url: authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Adedayo Portfolio',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
        width: 60,
        height: 60,
      },
    },
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt || blog.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': blogUrl,
    },
    url: blogUrl,
    wordCount: blog.content ? blog.content.split(/\s+/).length : 0,
    timeRequired: `PT${blog.readTime}M`,
    keywords: blog.tags,
    articleSection: blog.category,
    isAccessibleForFree: true,
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/ReadAction',
      userInteractionCount: blog.viewCount || 0,
    },
    potentialAction: {
      '@type': 'ReadAction',
      target: [blogUrl],
    },
  };
}

/**
 * Generate JSON-LD structured data for the blog listing page
 */
export function generateBlogListingStructuredData(
  blogs: BlogPost[],
  siteUrl: string = 'https://yourportfolio.com'
): StructuredData {
  const baseUrl = siteUrl.replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Web Development Blog',
    description: 'Insights on React, Next.js, web development, and modern software engineering practices.',
    url: `${baseUrl}/blog`,
    author: {
      '@type': 'Person',
      name: 'Adedayo',
      url: `${baseUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Adedayo Portfolio',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
        width: 60,
        height: 60,
      },
    },
    blogPost: blogs.slice(0, 10).map((blog) => ({
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.excerpt,
      url: `${baseUrl}/blog/${blog.slug}`,
      datePublished: blog.publishedAt,
      author: {
        '@type': 'Person',
        name: blog.author,
      },
      image: blog.thumbnail || `${baseUrl}/images/default-blog.jpg`,
    })),
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>,
  siteUrl: string = 'https://yourportfolio.com'
): StructuredData {
  const baseUrl = siteUrl.replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generate website structured data
 */
export function generateWebsiteStructuredData(
  siteUrl: string = 'https://yourportfolio.com'
): StructuredData {
  const baseUrl = siteUrl.replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Adedayo Portfolio',
    url: baseUrl,
    description: 'Professional web developer portfolio showcasing modern web applications and technical expertise.',
    author: {
      '@type': 'Person',
      name: 'Adedayo',
      url: `${baseUrl}/about`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    sameAs: [
      // Add your social media profiles here
      'https://github.com/adedayo',
      'https://linkedin.com/in/adedayo',
      'https://twitter.com/adedayo',
    ],
  };
}

/**
 * Component to render structured data as JSON-LD script tag
 */
export function StructuredDataScript({ data }: { data: StructuredData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2),
      }}
    />
  );
}