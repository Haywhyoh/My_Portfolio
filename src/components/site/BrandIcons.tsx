/**
 * lucide-react dropped brand/social icons, so these are small
 * hand-rolled SVGs for the social links in the footer/header.
 */

type IconProps = { className?: string };

export function GithubIcon({ className = 'tw-h-4 tw-w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 4.93 3.2 9.11 7.64 10.59.56.1.76-.24.76-.54 0-.27-.01-1.17-.02-2.12-3.11.68-3.77-1.32-3.77-1.32-.51-1.29-1.24-1.64-1.24-1.64-1.02-.69.08-.68.08-.68 1.12.08 1.72 1.15 1.72 1.15 1 1.72 2.62 1.22 3.26.93.1-.72.39-1.22.71-1.5-2.48-.28-5.1-1.24-5.1-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.14a10.7 10.7 0 0 1 5.6 0c2.14-1.44 3.08-1.14 3.08-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.77 1.15 2.99 0 4.29-2.63 5.24-5.12 5.51.4.35.76 1.04.76 2.09 0 1.51-.01 2.73-.01 3.1 0 .3.2.65.76.54 4.43-1.48 7.63-5.66 7.63-10.59C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon({ className = 'tw-h-4 tw-w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.93v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.56 20.45h3.56V9H3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function TwitterIcon({ className = 'tw-h-4 tw-w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.9 2h3.3l-7.2 8.2L23.5 22h-6.8l-5.3-6.9L5 22H1.7l7.7-8.8L1 2h7l4.8 6.3L18.9 2Zm-1.2 18.1h1.8L7.4 3.8H5.5l12.2 16.3Z" />
    </svg>
  );
}
