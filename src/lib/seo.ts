import { siteConfig } from './siteConfig';

/**
 * Person JSON-LD — identifies the site owner for Google's Knowledge
 * Graph / rich results and ties the resume/skills together for SEO.
 */
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  jobTitle: siteConfig.role,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  sameAs: [siteConfig.social.github, siteConfig.social.linkedin, siteConfig.social.twitter],
  knowsAbout: [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'NestJS',
    'Django', 'PostgreSQL', 'System Design', 'AI Product Engineering',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Independent / Available for hire',
  },
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    '@type': 'Person',
    name: siteConfig.name,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/blog?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export function projectJsonLd(project: {
  name: string;
  summary: string;
  liveUrl?: string;
  heroImage: string;
  stack: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.summary,
    url: project.liveUrl,
    image: `${siteConfig.url}${project.heroImage}`,
    creator: {
      '@type': 'Person',
      name: siteConfig.name,
    },
    keywords: project.stack.join(', '),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
