import Link from 'next/link';
import { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-full tw-font-medium tw-transition-all tw-duration-200 focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-accent-400 disabled:tw-opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'tw-bg-accent-500 tw-text-white hover:tw-bg-accent-400 tw-shadow-glow hover:-tw-translate-y-0.5',
  secondary:
    'tw-bg-white/5 tw-text-mist-100 tw-ring-1 tw-ring-inset tw-ring-white/15 hover:tw-bg-white/10 hover:-tw-translate-y-0.5',
  ghost:
    'tw-bg-transparent tw-text-mist-200 hover:tw-text-white',
};

const sizes: Record<Size, string> = {
  md: 'tw-px-5 tw-py-2.5 tw-text-sm',
  lg: 'tw-px-7 tw-py-3.5 tw-text-base',
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
