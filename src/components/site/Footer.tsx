import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import Container from './Container';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './BrandIcons';
import { siteConfig } from '@/lib/siteConfig';

export default function Footer() {
  return (
    <footer className="tw-relative tw-border-t tw-border-white/10 tw-bg-ink-950">
      <Container className="tw-py-14 sm:tw-py-20">
        <div className="tw-grid tw-grid-cols-1 tw-gap-12 lg:tw-grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Link href="/" className="tw-font-display tw-text-xl tw-font-semibold tw-text-white">
              Ayomide Samuel
            </Link>
            <p className="tw-mt-4 tw-max-w-sm tw-text-sm tw-leading-relaxed tw-text-mist-400">
              {siteConfig.tagline} Currently {siteConfig.availability.toLowerCase()}.
            </p>
            <div className="tw-mt-6 tw-flex tw-items-center tw-gap-3">
              <SocialIcon href={siteConfig.social.github} label="GitHub">
                <GithubIcon />
              </SocialIcon>
              <SocialIcon href={siteConfig.social.linkedin} label="LinkedIn">
                <LinkedinIcon />
              </SocialIcon>
              <SocialIcon href={siteConfig.social.twitter} label="Twitter / X">
                <TwitterIcon />
              </SocialIcon>
              <SocialIcon href={`mailto:${siteConfig.email}`} label="Email">
                <Mail className="tw-h-4 tw-w-4" />
              </SocialIcon>
            </div>
          </div>

          <div>
            <p className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.2em] tw-text-mist-400">Sitemap</p>
            <ul className="tw-mt-4 tw-space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="tw-text-sm tw-text-mist-300 tw-transition-colors hover:tw-text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.2em] tw-text-mist-400">Get in touch</p>
            <ul className="tw-mt-4 tw-space-y-3 tw-text-sm tw-text-mist-300">
              <li>{siteConfig.location}</li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="tw-link-underline hover:tw-text-white">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="tw-inline-flex tw-items-center tw-gap-1 tw-font-medium tw-text-accent-400 hover:tw-text-accent-300"
                >
                  Start a project <ArrowUpRight className="tw-h-3.5 tw-w-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="tw-mt-14 tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-4 tw-border-t tw-border-white/10 tw-pt-6 sm:tw-flex-row">
          <p className="tw-text-xs tw-text-mist-500">
            © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js &amp; Tailwind CSS.
          </p>
          <p className="tw-font-mono tw-text-xs tw-text-mist-500">Open to full-time &amp; contract roles.</p>
        </div>
      </Container>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-white/10 tw-text-mist-300 tw-transition-colors hover:tw-border-accent-400 hover:tw-text-white"
    >
      {children}
    </a>
  );
}
