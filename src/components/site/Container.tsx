import { ReactNode } from 'react';

export default function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`tw-mx-auto tw-w-full tw-max-w-content tw-px-5 sm:tw-px-8 lg:tw-px-10 ${className}`}>
      {children}
    </div>
  );
}
