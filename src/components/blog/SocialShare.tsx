'use client';

import { useState } from 'react';
import { Check, Link as LinkIcon } from 'lucide-react';
import { LinkedinIcon, TwitterIcon } from '@/components/site/BrandIcons';

interface SocialShareProps {
  title: string;
  url: string;
  description: string;
  variant?: 'vertical' | 'horizontal';
}

export default function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const itemClass =
    'tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-white/10 tw-text-mist-300 tw-transition-colors hover:tw-border-accent-400 hover:tw-text-white';

  return (
    <div className="tw-flex tw-items-center tw-gap-2">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className={itemClass}
      >
        <TwitterIcon />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={itemClass}
      >
        <LinkedinIcon />
      </a>
      <button type="button" onClick={handleCopyLink} aria-label="Copy link" className={itemClass}>
        {copied ? <Check className="tw-h-4 tw-w-4 tw-text-glow-500" /> : <LinkIcon className="tw-h-4 tw-w-4" />}
      </button>
    </div>
  );
}
