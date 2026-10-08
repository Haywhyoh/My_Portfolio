import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Container from '@/components/site/Container';
import SectionHeading from '@/components/site/SectionHeading';
import Button from '@/components/site/Button';
import { caseStudies } from '@/lib/projectsData';

export default function FeaturedWork() {
  return (
    <section id="work" className="tw-border-t tw-border-white/10 tw-bg-ink-900/40 tw-py-20 sm:tw-py-28">
      <Container>
        <div className="tw-flex tw-flex-col tw-items-start tw-justify-between tw-gap-6 sm:tw-flex-row sm:tw-items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Products I've shipped end to end."
            description="Five live products across AI SaaS, e-commerce, industrial B2B, and healthcare — each one built, not just styled."
          />
          <Button href="/work" variant="secondary">
            All projects <ArrowUpRight className="tw-h-4 tw-w-4" />
          </Button>
        </div>

        <div className="tw-mt-14 tw-grid tw-grid-cols-1 tw-gap-6 lg:tw-grid-cols-2">
          {caseStudies.map((project, index) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className={`tw-group tw-relative tw-overflow-hidden tw-rounded-3xl tw-border tw-border-white/10 tw-bg-ink-950 tw-shadow-card tw-transition-all tw-duration-300 hover:-tw-translate-y-1 hover:tw-border-accent-400/50 ${
                index === 0 ? 'lg:tw-col-span-2' : ''
              }`}
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
                    <span
                      key={tag}
                      className="tw-rounded-full tw-bg-white/5 tw-px-2.5 tw-py-1 tw-text-xs tw-font-medium tw-text-mist-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="tw-mt-4 tw-text-xl tw-font-semibold tw-text-white sm:tw-text-2xl">
                  {project.name}
                </h3>
                <p className="tw-mt-2 tw-max-w-xl tw-text-sm tw-leading-relaxed tw-text-mist-300 sm:tw-text-base">
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
  );
}
