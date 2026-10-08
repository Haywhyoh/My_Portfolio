import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Container from '@/components/site/Container';
import SectionHeading from '@/components/site/SectionHeading';
import CTASection from '@/components/site/CTASection';
import ServicesData from '@/assets/jsonData/services/ServicesData.json';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Full-stack product engineering, AI automation, and web platforms built end to end.',
  alternates: { canonical: `${siteConfig.url}/services` },
};

function serviceSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function ServicePage() {
  return (
    <>
      <section className="tw-border-b tw-border-white/10 tw-py-16 sm:tw-py-24">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="What I can take off your plate."
            description="I join as the engineer who owns the product: architecture, implementation, and getting it in front of real users."
          />
        </Container>
      </section>

      <section className="tw-py-16 sm:tw-py-24">
        <Container>
          <div className="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2">
            {ServicesData.map((service) => (
              <Link
                key={service.id}
                href={`/services/${serviceSlug(service.title)}`}
                className="tw-group tw-rounded-3xl tw-border tw-border-white/10 tw-bg-ink-900/50 tw-p-7 tw-shadow-card tw-transition-all hover:-tw-translate-y-1 hover:tw-border-accent-400/40"
              >
                <h2 className="tw-text-xl tw-font-semibold tw-text-white">{service.title}</h2>
                <p className="tw-mt-3 tw-text-sm tw-leading-relaxed tw-text-mist-300">{service.text}</p>
                <span className="tw-mt-6 tw-inline-flex tw-items-center tw-gap-1 tw-text-sm tw-font-medium tw-text-accent-400 group-hover:tw-text-accent-300">
                  Read more <ArrowUpRight className="tw-h-3.5 tw-w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
