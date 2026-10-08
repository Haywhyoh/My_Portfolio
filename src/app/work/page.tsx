import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Container from '@/components/site/Container';
import SectionHeading from '@/components/site/SectionHeading';
import CTASection from '@/components/site/CTASection';
import { caseStudies, moreProjects } from '@/lib/projectsData';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies from Adedayo Ayomide Samuel: an AI WhatsApp assistant, e-commerce, industrial, and healthcare platforms built end to end with Next.js, NestJS, and PostgreSQL.',
  alternates: { canonical: `${siteConfig.url}/work` },
  openGraph: {
    title: `Work | ${siteConfig.name}`,
    description: 'Case studies and shipped products across AI, SaaS, e-commerce, and healthcare.',
    url: `${siteConfig.url}/work`,
  },
};

export default function WorkPage() {
  return (
    <>
      <section className="tw-border-b tw-border-white/10 tw-py-20 sm:tw-py-28">
        <Container>
          <SectionHeading
            eyebrow="Work"
            title="Case studies, not screenshots."
            description="Five in-depth breakdowns of products I designed, built, and shipped — the problem, the decisions, the stack, and the result."
          />
        </Container>
      </section>

      <section className="tw-py-20 sm:tw-py-24">
        <Container>
          <div className="tw-grid tw-grid-cols-1 tw-gap-6 lg:tw-grid-cols-2">
            {caseStudies.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="tw-group tw-relative tw-overflow-hidden tw-rounded-3xl tw-border tw-border-white/10 tw-bg-ink-900/60 tw-shadow-card tw-transition-all tw-duration-300 hover:-tw-translate-y-1 hover:tw-border-accent-400/50"
              >
                <div className="tw-relative tw-aspect-[16/10] tw-w-full tw-overflow-hidden tw-bg-ink-800">
                  <Image
                    src={project.heroImage}
                    alt={`${project.name} preview`}
                    fill
                    className="tw-object-cover tw-object-top tw-transition-transform tw-duration-500 tw-group-hover:tw-scale-[1.03]"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-ink-950 tw-via-ink-950/10 tw-to-transparent" />
                </div>
                <div className="tw-p-6 sm:tw-p-7">
                  <div className="tw-flex tw-flex-wrap tw-gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tw-rounded-full tw-bg-white/5 tw-px-2.5 tw-py-1 tw-text-xs tw-font-medium tw-text-mist-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="tw-mt-4 tw-text-xl tw-font-semibold tw-text-white sm:tw-text-2xl">{project.name}</h2>
                  <p className="tw-mt-2 tw-text-sm tw-leading-relaxed tw-text-mist-300 sm:tw-text-base">
                    {project.tagline}
                  </p>
                  <span className="tw-mt-5 tw-inline-flex tw-items-center tw-gap-1.5 tw-text-sm tw-font-medium tw-text-accent-400 tw-transition-transform tw-group-hover:tw-translate-x-1">
                    Read case study <ArrowUpRight className="tw-h-4 tw-w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="tw-border-t tw-border-white/10 tw-bg-ink-900/40 tw-py-20 sm:tw-py-24">
        <Container>
          <SectionHeading eyebrow="More projects" title="A few more things I've built." />
          <div className="tw-mt-10 tw-grid tw-grid-cols-1 tw-gap-5 sm:tw-grid-cols-2 lg:tw-grid-cols-4">
            {moreProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="tw-group tw-overflow-hidden tw-rounded-2xl tw-border tw-border-white/10 tw-bg-ink-950 tw-shadow-card tw-transition-all hover:-tw-translate-y-1 hover:tw-border-accent-400/40"
              >
                <div className="tw-relative tw-aspect-[4/3] tw-w-full tw-overflow-hidden tw-bg-ink-800">
                  <Image
                    src={project.thumb}
                    alt={`${project.name} preview`}
                    fill
                    className="tw-object-cover tw-transition-transform tw-duration-500 tw-group-hover:tw-scale-105"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                </div>
                <div className="tw-p-4">
                  <h3 className="tw-text-base tw-font-semibold tw-text-white">{project.name}</h3>
                  <p className="tw-mt-1 tw-text-xs tw-text-mist-400">{project.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
