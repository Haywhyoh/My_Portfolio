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
    <div className={`social-share ${variant}`}>
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

        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn facebook"
          aria-label="Share on Facebook"
        >
          <i className="fab fa-facebook-f"></i>
          {variant === 'horizontal' && <span>Facebook</span>}
        </a>

        {/* Reddit */}
        <a
          href={shareLinks.reddit}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn reddit"
          aria-label="Share on Reddit"
        >
          <i className="fab fa-reddit-alien"></i>
          {variant === 'horizontal' && <span>Reddit</span>}
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

        {/* Telegram */}
        <a
          href={shareLinks.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn telegram"
          aria-label="Share on Telegram"
        >
          <i className="fab fa-telegram-plane"></i>
          {variant === 'horizontal' && <span>Telegram</span>}
        </a>

        {/* Email */}
        <button
          onClick={handleEmailShare}
          className="share-btn email"
          aria-label="Share via Email"
        >
          <i className="far fa-envelope"></i>
          {variant === 'horizontal' && <span>Email</span>}
        </button>

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
        .social-share {
          display: flex;
          align-items: center;
        }

        .social-share.vertical {
          flex-direction: column;
          gap: 15px;
        }

        .social-share.horizontal {
          flex-direction: row;
          gap: 10px;
          flex-wrap: wrap;
        }

        .share-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .social-share.vertical .share-buttons {
          flex-direction: column;
          width: 100%;
        }

        .social-share.horizontal .share-buttons {
          flex-direction: row;
        }

        .share-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 16px;
          border: none;
          border-radius: 6px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 44px;
          min-height: 44px;
        }

        .social-share.vertical .share-btn {
          width: 100%;
          justify-content: flex-start;
        }

        .share-btn i {
          font-size: 16px;
        }

        .share-btn span {
          font-size: 14px;
          font-weight: 500;
        }

        /* Twitter */
        .share-btn.twitter {
          background: #1da1f2;
          color: white;
        }

        .share-btn.twitter:hover {
          background: #0d8bd9;
          transform: translateY(-2px);
        }

        /* LinkedIn */
        .share-btn.linkedin {
          background: #0077b5;
          color: white;
        }

        .share-btn.linkedin:hover {
          background: #005885;
          transform: translateY(-2px);
        }

        /* Facebook */
        .share-btn.facebook {
          background: #4267b2;
          color: white;
        }

        .share-btn.facebook:hover {
          background: #365899;
          transform: translateY(-2px);
        }

        /* Reddit */
        .share-btn.reddit {
          background: #ff4500;
          color: white;
        }

        .share-btn.reddit:hover {
          background: #e03d00;
          transform: translateY(-2px);
        }

        /* WhatsApp */
        .share-btn.whatsapp {
          background: #25d366;
          color: white;
        }

        .share-btn.whatsapp:hover {
          background: #1da851;
          transform: translateY(-2px);
        }

        /* Telegram */
        .share-btn.telegram {
          background: #0088cc;
          color: white;
        }

        .share-btn.telegram:hover {
          background: #006699;
          transform: translateY(-2px);
        }

        /* Email */
        .share-btn.email {
          background: #6c757d;
          color: white;
        }

        .share-btn.email:hover {
          background: #5a6268;
          transform: translateY(-2px);
        }

        /* Copy Link */
        .share-btn.copy {
          background: #28a745;
          color: white;
        }

        .share-btn.copy:hover {
          background: #218838;
          transform: translateY(-2px);
        }

        .share-btn.copy.copied {
          background: #20c997;
          animation: pulse 0.6s ease-in-out;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .social-share.horizontal .share-buttons {
            gap: 8px;
          }

          .share-btn {
            padding: 10px 12px;
            font-size: 13px;
            min-width: 40px;
            min-height: 40px;
          }

          .share-btn i {
            font-size: 14px;
          }

          .share-btn span {
            font-size: 13px;
          }

          .social-share.horizontal .share-btn span {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .social-share.horizontal {
            justify-content: center;
          }

          .share-btn {
            padding: 8px 10px;
            min-width: 36px;
            min-height: 36px;
          }

          .share-btn i {
            font-size: 12px;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .share-btn {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          }
        }

        /* Focus styles for accessibility */
        .share-btn:focus {
          outline: 2px solid #007bff;
          outline-offset: 2px;
        }

        /* Hover effects for touch devices */
        @media (hover: none) {
          .share-btn:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
