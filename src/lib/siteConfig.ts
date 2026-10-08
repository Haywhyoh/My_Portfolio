/**
 * Single source of truth for site-wide metadata, SEO defaults,
 * and personal/contact information used across the portfolio.
 */

export const siteConfig = {
  name: 'Adedayo Ayomide Samuel',
  shortName: 'Ayomide',
  role: 'Full-Stack Software Engineer',
  title: 'Adedayo Ayomide Samuel — Full-Stack Software Engineer',
  description:
    'Full-stack software engineer with 5+ years building production SaaS, AI-powered automation, and marketplace platforms with React, Next.js, Node.js, NestJS, Django and PostgreSQL. Available for full-time roles and contract work.',
  tagline: 'I build fast, reliable products that handle real users and real money.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://samueladedayo.vercel.app',
  ogImage: '/opengraph-image',
  keywords: [
    'Adedayo Ayomide Samuel',
    'Full-Stack Software Engineer',
    'Next.js Developer',
    'React Developer',
    'Node.js Developer',
    'NestJS Developer',
    'Django Developer',
    'TypeScript Developer',
    'Software Engineer Portfolio',
    'Remote Software Engineer Nigeria',
    'AI Product Engineer',
  ],
  email: 'adefeyisayo998@gmail.com',
  location: 'Lagos, Nigeria (Remote-friendly)',
  availability: 'Open to full-time & contract opportunities',
  resumeFile: '/assets/docs/Adedayo-Ayomide-Samuel-Resume.pdf',
  twitterHandle: '@haywhyoh',
  social: {
    github: 'https://github.com/Haywhyoh',
    linkedin: 'https://www.linkedin.com/in/ayomide-samuel',
    twitter: 'https://twitter.com/haywhyoh',
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Resume', href: '/resume' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
