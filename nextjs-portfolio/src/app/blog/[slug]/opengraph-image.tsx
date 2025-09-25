import { ImageResponse } from 'next/og';
import { getBlogBySlug } from '@/lib/blog';

export const runtime = 'edge';

export const alt = 'Blog Post';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  try {
    const blog = await getBlogBySlug(params.slug);

    if (!blog) {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1a1a1a',
              backgroundImage: 'linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 100%)',
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                marginBottom: 20,
              }}
            >
              Blog Post Not Found
            </div>
            <div
              style={{
                fontSize: 24,
                color: '#888',
                textAlign: 'center',
              }}
            >
              The requested blog post could not be found.
            </div>
          </div>
        ),
        {
          ...size,
        }
      );
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#1a1a1a',
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
            }}
          />
          
          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              padding: '60px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '20px',
                }}
              >
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }}
                >
                  📝
                </div>
              </div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: 'white',
                }}
              >
                Web Development Blog
              </div>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                marginBottom: '20px',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {blog.title}
            </div>

            {/* Excerpt */}
            <div
              style={{
                fontSize: '24px',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.4,
                marginBottom: '40px',
                maxWidth: '900px',
              }}
            >
              {blog.excerpt}
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '20px',
                    }}
                  >
                    👤
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: 'white',
                    }}
                  >
                    {blog.author}
                  </div>
                  <div
                    style={{
                      fontSize: '16px',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '16px',
                      marginRight: '8px',
                    }}
                  >
                    ⏱️
                  </div>
                  <div
                    style={{
                      fontSize: '16px',
                      color: 'white',
                    }}
                  >
                    {blog.readTime} min read
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '16px',
                      marginRight: '8px',
                    }}
                  >
                    🏷️
                  </div>
                  <div
                    style={{
                      fontSize: '16px',
                      color: 'white',
                    }}
                  >
                    {blog.category}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error('Error generating OpenGraph image:', error);
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1a1a',
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}
          >
            Error Loading Blog Post
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}




