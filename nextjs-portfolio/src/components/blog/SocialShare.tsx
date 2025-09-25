'use client';

import { useState } from 'react';

interface SocialShareProps {
  title: string;
  url: string;
  description: string;
  variant?: 'vertical' | 'horizontal';
}

export default function SocialShare({ 
  title, 
  url, 
  description, 
  variant = 'vertical' 
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Check out this article: ${title}`);
    const body = encodeURIComponent(`${description}\n\nRead more: ${url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <div className={`modern-social-share ${variant}`}>
      <div className="share-buttons">
        {/* Twitter */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn twitter"
          aria-label="Share on Twitter"
        >
          <i className="fab fa-twitter"></i>
          {variant === 'horizontal' && <span>Twitter</span>}
        </a>

        {/* WhatsApp */}
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn whatsapp"
          aria-label="Share on WhatsApp"
        >
          <i className="fab fa-whatsapp"></i>
          {variant === 'horizontal' && <span>WhatsApp</span>}
        </a>

        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn linkedin"
          aria-label="Share on LinkedIn"
        >
          <i className="fab fa-linkedin-in"></i>
          {variant === 'horizontal' && <span>LinkedIn</span>}
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`share-btn copy ${copied ? 'copied' : ''}`}
          aria-label="Copy link"
        >
          <i className={copied ? 'fas fa-check' : 'far fa-copy'}></i>
          {variant === 'horizontal' && (
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          )}
        </button>
      </div>

      <style jsx>{`
        .modern-social-share {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modern-social-share.vertical {
          flex-direction: column;
          gap: 20px;
        }

        .modern-social-share.horizontal {
          flex-direction: row;
          gap: 16px;
          flex-wrap: wrap;
        }

        .share-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .modern-social-share.vertical .share-buttons {
          flex-direction: column;
          width: 100%;
          max-width: 300px;
        }

        .modern-social-share.horizontal .share-buttons {
          flex-direction: row;
        }

        .share-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 48px;
          height: 48px;
          border: none;
          border-radius: 12px;
          text-decoration: none;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          background: #6366f1;
          color: white;
        }

        .modern-social-share.vertical .share-btn {
          width: 100%;
          height: 56px;
          padding: 0 20px;
          justify-content: flex-start;
          border-radius: 14px;
        }

        .modern-social-share.horizontal .share-btn span {
          display: none;
        }

        .modern-social-share.vertical .share-btn span {
          display: block;
        }

        .share-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
        }

        .share-btn i {
          font-size: 18px;
          flex-shrink: 0;
        }

        .share-btn span {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        /* Twitter */
        .share-btn.twitter {
          background: linear-gradient(135deg, #1da1f2, #1991db);
        }

        .share-btn.twitter:hover {
          background: linear-gradient(135deg, #0d8bd9, #0c7bc4);
          box-shadow: 0 8px 25px rgba(29, 161, 242, 0.4);
        }

        /* WhatsApp */
        .share-btn.whatsapp {
          background: linear-gradient(135deg, #25d366, #1ebe58);
        }

        .share-btn.whatsapp:hover {
          background: linear-gradient(135deg, #1da851, #189544);
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
        }

        /* LinkedIn */
        .share-btn.linkedin {
          background: linear-gradient(135deg, #0077b5, #005885);
        }

        .share-btn.linkedin:hover {
          background: linear-gradient(135deg, #005885, #004a6b);
          box-shadow: 0 8px 25px rgba(0, 119, 181, 0.4);
        }

        /* Copy Link */
        .share-btn.copy {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
        }

        .share-btn.copy:hover {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
        }

        .share-btn.copy.copied {
          background: linear-gradient(135deg, #10b981, #059669);
          animation: copyPulse 0.6s ease-in-out;
        }

        @keyframes copyPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .modern-social-share.horizontal {
            gap: 12px;
          }

          .modern-social-share.horizontal .share-buttons {
            gap: 12px;
          }

          .share-btn {
            width: 44px;
            height: 44px;
          }

          .share-btn i {
            font-size: 16px;
          }

          .modern-social-share.vertical .share-btn {
            height: 52px;
          }
        }

        @media (max-width: 576px) {
          .modern-social-share.horizontal {
            gap: 10px;
          }

          .modern-social-share.horizontal .share-buttons {
            gap: 10px;
          }

          .share-btn {
            width: 40px;
            height: 40px;
          }

          .share-btn i {
            font-size: 14px;
          }

          .modern-social-share.vertical .share-btn {
            height: 48px;
            padding: 0 16px;
          }

          .modern-social-share.vertical .share-btn span {
            font-size: 14px;
          }
        }

        /* Focus styles for accessibility */
        .share-btn:focus {
          outline: 2px solid #6366f1;
          outline-offset: 2px;
        }

        /* Hover effects for touch devices */
        @media (hover: none) {
          .share-btn:hover {
            transform: none;
          }
        }

        /* Print styles */
        @media print {
          .modern-social-share {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}




