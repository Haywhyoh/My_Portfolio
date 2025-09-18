import { BlogPost } from './types';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/**
 * Generate JSON-LD structured data for a blog post
 */
export function generateBlogPostStructuredData(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage ? `${baseUrl}/assets/img/blog/${post.featuredImage}` : undefined,
    author: {
      '@type': 'Person',
      name: post.author,
      url: `${baseUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Web Development Portfolio',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/assets/img/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    url: `${baseUrl}/blog/${post.slug}`,
    articleSection: post.category,
    keywords: post.tags.join(', '),
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readTime}M`,
    inLanguage: 'en-US',
  };
}

/**
 * Generate JSON-LD structured data for blog listing page
 */
export function generateBlogListStructuredData(posts: BlogPost[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog - Web Development Insights',
    description: 'Discover insights on React, Next.js, web development, and modern software engineering practices.',
    url: `${baseUrl}/blog`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          url: `${baseUrl}/blog/${post.slug}`,
          datePublished: post.publishedAt,
          author: {
            '@type': 'Person',
            name: post.author,
          },
        },
      })),
    },
  };
}

/**
 * Generate JSON-LD structured data for the website
 */
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Web Development Portfolio',
    description: 'Professional web development portfolio showcasing React, Next.js, and modern web technologies.',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Person',
      name: 'Web Developer',
      url: baseUrl,
    },
  };
}

/**
 * Generate JSON-LD structured data for breadcrumbs
 */
export function generateBreadcrumbStructuredData(items: Array<{ label: string; href?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${baseUrl}${item.href}` : undefined,
    })),
  };
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Web Development Portfolio',
    url: baseUrl,
    logo: `${baseUrl}/assets/img/logo.png`,
    description: 'Professional web development services specializing in React, Next.js, and modern web technologies.',
    sameAs: [
      'https://github.com/yourusername',
      'https://linkedin.com/in/yourusername',
      'https://twitter.com/yourusername',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact@example.com',
    },
  };
}

/**
 * Generate JSON-LD structured data for FAQ page
 */
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD structured data for portfolio projects
 */
export function generatePortfolioStructuredData(projects: Array<{
  name: string;
  description: string;
  url?: string;
  image?: string;
  technologies: string[];
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Portfolio Projects',
    description: 'A collection of web development projects showcasing various technologies and skills.',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.name,
        description: project.description,
        url: project.url,
        image: project.image,
        keywords: project.technologies.join(', '),
      },
    })),
  };
}
