import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Blog - Portfolio',
    default: 'Blog - Portfolio'
  },
  description: 'Insights on web development, React, Next.js, and modern software engineering practices.',
  keywords: ['blog', 'web development', 'react', 'nextjs', 'javascript', 'typescript', 'programming'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Portfolio Blog',
    images: [
      {
        url: '/assets/img/blog/blog-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@yourhandle'
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-layout">
      {/* Breadcrumb section */}
      {/* <div className="breadcrumb-area bg-gray text-center shadow dark-hard">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1>Blog</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Blog
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div> */}

      {/* Blog content - full width, no sidebar */}
      <div className="blog-area full-blog default-padding">
        <div className="container">
          {children}
        </div>
      </div>
    </div>
  );
}