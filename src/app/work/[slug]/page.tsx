import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Container from '@/components/site/Container';
import Badge from '@/components/site/Badge';
import Button from '@/components/site/Button';
import CTASection from '@/components/site/CTASection';
import {
  caseStudies,
  moreProjects,
  getAllSlugs,
  getCaseStudyBySlug,
  getMoreProjectBySlug,
} from '@/lib/projectsData';
import { siteConfig } from '@/lib/siteConfig';
import { projectJsonLd } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug) ?? getMoreProjectBySlug(slug);
  if (!project) return {};

  const description = project.summary;

  return {
    title: project.name,
    description,
    alternates: { canonical: `${siteConfig.url}/work/${slug}` },
    openGraph: {
      title: `${project.name} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/work/${slug}`,
      images: ['heroImage' in project ? project.heroImage : project.thumb],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  const lightProject = !caseStudy ? getMoreProjectBySlug(slug) : undefined;

  if (!caseStudy && !lightProject) {
    notFound();
  }

  const allSlugsOrdered = [...caseStudies.map((c) => c.slug), ...moreProjects.map((p) => p.slug)];
  const currentIndex = allSlugsOrdered.indexOf(slug);
  const prevSlug = allSlugsOrdered[(currentIndex - 1 + allSlugsOrdered.length) % allSlugsOrdered.length];
  const nextSlug = allSlugsOrdered[(currentIndex + 1) % allSlugsOrdered.length];
  const prevProject = getCaseStudyBySlug(prevSlug) ?? getMoreProjectBySlug(prevSlug);
  const nextProject = getCaseStudyBySlug(nextSlug) ?? getMoreProjectBySlug(nextSlug);

  if (caseStudy) {
    const jsonLd = projectJsonLd(caseStudy);
    return (
      <>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <section className="tw-border-b tw-border-white/10 tw-py-16 sm:tw-py-24">
          <Container>
            <Link href="/work" className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-sm tw-text-mist-400 hover:tw-text-white">
              <ArrowLeft className="tw-h-3.5 tw-w-3.5" /> All work
            </Link>

            <div className="tw-mt-6 tw-flex tw-flex-wrap tw-gap-2">
              {caseStudy.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            <h1 className="tw-mt-5 tw-max-w-3xl tw-text-balance tw-text-4xl tw-font-semibold tw-tracking-tight tw-text-white sm:tw-text-5xl">
              {caseStudy.name}
            </h1>
            <p className="tw-mt-4 tw-max-w-2xl tw-text-lg tw-leading-relaxed tw-text-mist-300">
              {caseStudy.tagline}
            </p>

            <div className="tw-mt-8 tw-flex tw-flex-wrap tw-items-center tw-gap-8 tw-border-t tw-border-white/10 tw-pt-6">
              <Meta label="Role" value={caseStudy.role} />
              <Meta label="Year" value={caseStudy.year} />
              {caseStudy.liveUrl && (
                <Button href={caseStudy.liveUrl} external variant="secondary">
                  Visit live site <ArrowUpRight className="tw-h-4 tw-w-4" />
                </Button>
              )}
            </div>
          </Container>
        </section>

        <section className="tw-py-0">
          <Container>
            <div className="tw-relative tw-mt-[-1px] tw-aspect-[16/9] tw-w-full tw-overflow-hidden tw-rounded-3xl tw-border tw-border-white/10 tw-shadow-card sm:tw-aspect-[16/8]">
              <Image src={caseStudy.heroImage} alt={`${caseStudy.name} screenshot`} fill className="tw-object-cover tw-object-top" priority />
            </div>
          </Container>
        </section>

        <section className="tw-py-16 sm:tw-py-24">
          <Container>
            <div className="tw-grid tw-grid-cols-1 tw-gap-12 lg:tw-grid-cols-[1fr_1fr]">
              <div>
                <h2 className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.2em] tw-text-accent-400">The problem</h2>
                <p className="tw-mt-4 tw-text-base tw-leading-relaxed tw-text-mist-300 sm:tw-text-lg">
                  {caseStudy.problem}
                </p>
              </div>
              <div>
                <h2 className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.2em] tw-text-glow-500">The solution</h2>
                <p className="tw-mt-4 tw-text-base tw-leading-relaxed tw-text-mist-300 sm:tw-text-lg">
                  {caseStudy.solution}
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="tw-border-t tw-border-white/10 tw-bg-ink-900/40 tw-py-16 sm:tw-py-24">
          <Container>
            <h2 className="tw-text-2xl tw-font-semibold tw-text-white sm:tw-text-3xl">What it does</h2>
            <ul className="tw-mt-8 tw-grid tw-grid-cols-1 tw-gap-4 sm:tw-grid-cols-2">
              {caseStudy.features.map((feature) => (
                <li key={feature} className="tw-flex tw-items-start tw-gap-3 tw-rounded-2xl tw-border tw-border-white/10 tw-bg-ink-950 tw-p-4">
                  <CheckCircle2 className="tw-mt-0.5 tw-h-5 tw-w-5 tw-flex-shrink-0 tw-text-accent-400" />
                  <span className="tw-text-sm tw-leading-relaxed tw-text-mist-200 sm:tw-text-base">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="tw-mt-10 tw-flex tw-flex-wrap tw-gap-2">
              {caseStudy.stack.map((tech) => (
                <span key={tech} className="tw-rounded-full tw-border tw-border-white/10 tw-bg-white/5 tw-px-3 tw-py-1.5 tw-text-sm tw-text-mist-200">
                  {tech}
                </span>
              ))}
            </div>
          </Container>
        </section>

        <section className="tw-py-16 sm:tw-py-24">
          <Container>
            <h2 className="tw-text-2xl tw-font-semibold tw-text-white sm:tw-text-3xl">Results</h2>
            <ul className="tw-mt-6 tw-space-y-3">
              {caseStudy.results.map((result) => (
                <li key={result} className="tw-flex tw-gap-3 tw-text-base tw-leading-relaxed tw-text-mist-300">
                  <span className="tw-mt-2.5 tw-h-1.5 tw-w-1.5 tw-flex-shrink-0 tw-rounded-full tw-bg-glow-500" />
                  {result}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <ProjectNav prev={prevProject} prevSlug={prevSlug} next={nextProject} nextSlug={nextSlug} />
        <CTASection />
      </>
    );
  }

  // Lightweight "more projects" layout
  const project = lightProject!;
  return (
    <>
      <section className="tw-border-b tw-border-white/10 tw-py-16 sm:tw-py-24">
        <Container>
          <Link href="/work" className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-sm tw-text-mist-400 hover:tw-text-white">
            <ArrowLeft className="tw-h-3.5 tw-w-3.5" /> All work
          </Link>
          <div className="tw-mt-6 tw-flex tw-flex-wrap tw-gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h1 className="tw-mt-5 tw-text-4xl tw-font-semibold tw-tracking-tight tw-text-white sm:tw-text-5xl">{project.name}</h1>
          <p className="tw-mt-4 tw-max-w-2xl tw-text-lg tw-leading-relaxed tw-text-mist-300">{project.tagline}</p>
          <div className="tw-mt-8 tw-flex tw-flex-wrap tw-items-center tw-gap-8 tw-border-t tw-border-white/10 tw-pt-6">
            <Meta label="Role" value={project.role} />
            <Meta label="Year" value={project.year} />
            {project.liveUrl && (
              <Button href={project.liveUrl} external variant="secondary">
                Visit live site <ArrowUpRight className="tw-h-4 tw-w-4" />
              </Button>
            )}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="tw-relative tw-mt-[-1px] tw-aspect-[16/9] tw-w-full tw-overflow-hidden tw-rounded-3xl tw-border tw-border-white/10 tw-shadow-card">
            <Image src={project.thumb} alt={`${project.name} preview`} fill className="tw-object-cover" />
          </div>
        </Container>
      </section>

      <section className="tw-py-16 sm:tw-py-24">
        <Container>
          <p className="tw-max-w-2xl tw-text-base tw-leading-relaxed tw-text-mist-300 sm:tw-text-lg">{project.summary}</p>
          <div className="tw-mt-8 tw-flex tw-flex-wrap tw-gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="tw-rounded-full tw-border tw-border-white/10 tw-bg-white/5 tw-px-3 tw-py-1.5 tw-text-sm tw-text-mist-200">
                {tech}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <ProjectNav prev={prevProject} prevSlug={prevSlug} next={nextProject} nextSlug={nextSlug} />
      <CTASection />
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.18em] tw-text-mist-500">{label}</p>
      <p className="tw-mt-1 tw-text-sm tw-font-medium tw-text-mist-200">{value}</p>
    </div>
  );
}

function ProjectNav({
  prev,
  prevSlug,
  next,
  nextSlug,
}: {
  prev?: { name: string };
  prevSlug: string;
  next?: { name: string };
  nextSlug: string;
}) {
  if (!prev || !next) return null;
  return (
    <section className="tw-border-t tw-border-white/10 tw-py-10">
      <Container className="tw-flex tw-flex-col tw-gap-4 sm:tw-flex-row sm:tw-items-center sm:tw-justify-between">
        <Link href={`/work/${prevSlug}`} className="tw-group tw-flex tw-items-center tw-gap-2 tw-text-mist-300 hover:tw-text-white">
          <ArrowLeft className="tw-h-4 tw-w-4 tw-transition-transform tw-group-hover:-tw-translate-x-1" />
          <span>
            <span className="tw-block tw-text-xs tw-text-mist-500">Previous</span>
            {prev.name}
          </span>
        </Link>
        <Link href={`/work/${nextSlug}`} className="tw-group tw-flex tw-items-center tw-gap-2 tw-text-right tw-text-mist-300 hover:tw-text-white">
          <span>
            <span className="tw-block tw-text-xs tw-text-mist-500">Next</span>
            {next.name}
          </span>
          <ArrowRight className="tw-h-4 tw-w-4 tw-transition-transform tw-group-hover:tw-translate-x-1" />
        </Link>
      </Container>
    </section>
  );
}
