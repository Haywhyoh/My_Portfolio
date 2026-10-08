import { ReactNode } from 'react';

export default function Badge({
  children,
  className = '',
  dot = false,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={`tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-border tw-border-white/10 tw-bg-white/5 tw-px-3 tw-py-1 tw-text-xs tw-font-medium tw-text-mist-200 ${className}`}
    >
      {dot && <span className="tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-glow-500" />}
      {children}
    </span>
  );
}
