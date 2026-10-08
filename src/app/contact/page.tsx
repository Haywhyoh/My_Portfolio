import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import Container from '@/components/site/Container';
import SectionHeading from '@/components/site/SectionHeading';
import ContactForm from '@/components/contact/ContactForm';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${siteConfig.name} for full-time software engineering roles and contract work.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  return (
    <section className="tw-py-16 sm:tw-py-24">
      <Container>
        <div className="tw-grid tw-grid-cols-1 tw-gap-16 lg:tw-grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let's talk about the work."
              description="I'm looking for full-time software engineering roles and select contract work. If you need someone who can own a product end to end, send a note."
            />
            <div className="tw-mt-10 tw-space-y-5 tw-text-sm tw-text-mist-300">
              <p>
                <span className="tw-block tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.18em] tw-text-mist-400">
                  Email
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="tw-mt-1 tw-inline-flex tw-items-center tw-gap-2 tw-text-base tw-text-white hover:tw-text-accent-300"
                >
                  <Mail className="tw-h-4 tw-w-4 tw-text-accent-400" />
                  {siteConfig.email}
                </a>
              </p>
              <p>
                <span className="tw-block tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.18em] tw-text-mist-400">
                  Location
                </span>
                <span className="tw-mt-1 tw-block tw-text-base tw-text-white">{siteConfig.location}</span>
              </p>
              <p>
                <span className="tw-block tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.18em] tw-text-mist-400">
                  Availability
                </span>
                <span className="tw-mt-1 tw-block tw-text-base tw-text-glow-500">{siteConfig.availability}</span>
              </p>
            </div>
          </div>
          <div className="tw-rounded-3xl tw-border tw-border-white/10 tw-bg-ink-900/60 tw-p-6 tw-shadow-card sm:tw-p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
