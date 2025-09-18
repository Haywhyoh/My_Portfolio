import { getAllBlogs } from '@/lib/blog';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  try {
    const blogs = await getAllBlogs();
    
    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Web Development Blog</title>
    <description>Discover insights on React, Next.js, web development, and modern software engineering practices.</description>
    <link>${baseUrl}/blog</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    ${blogs.map(blog => `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <description><![CDATA[${blog.excerpt}]]></description>
      <link>${baseUrl}/blog/${blog.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${blog.slug}</guid>
      <pubDate>${new Date(blog.publishedAt).toUTCString()}</pubDate>
      <author>${blog.author}</author>
      <category>${blog.category}</category>
      ${blog.tags.map(tag => `<category>${tag}</category>`).join('')}
    </item>`).join('')}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    
    return new Response('Error generating RSS feed', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
