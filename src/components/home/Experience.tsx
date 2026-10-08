import Container from '@/components/site/Container';
import SectionHeading from '@/components/site/SectionHeading';
import Button from '@/components/site/Button';
import { experience } from '@/lib/resumeData';
import { ArrowUpRight } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="tw-border-t tw-border-white/10 tw-bg-ink-950 tw-py-20 sm:tw-py-28">
      <Container>
        <div className="tw-flex tw-flex-col tw-items-start tw-justify-between tw-gap-6 sm:tw-flex-row sm:tw-items-end">
          <SectionHeading
            eyebrow="Experience"
            title="Where I've worked."
            description="Teams, titles, and the measurable dent I left behind."
          />
          <Button href="/resume" variant="secondary">
            Full résumé <ArrowUpRight className="tw-h-4 tw-w-4" />
          </Button>
        </div>

        <div className="tw-mt-14 tw-space-y-0">
          {experience.map((item, index) => (
            <div
              key={`${item.company}-${item.role}`}
              className="tw-group tw-relative tw-grid tw-grid-cols-1 tw-gap-4 tw-border-t tw-border-white/10 tw-py-8 first:tw-border-t-0 first:tw-pt-0 sm:tw-grid-cols-[200px_1fr]"
            >
              <div>
                <p className="tw-font-mono tw-text-sm tw-text-mist-400">{item.period}</p>
                <p className="tw-mt-1 tw-text-sm tw-font-medium tw-text-mist-300">{item.location}</p>
              </div>
              <div>
                <h3 className="tw-text-lg tw-font-semibold tw-text-white sm:tw-text-xl">
                  {item.role} <span className="tw-text-mist-400">· {item.company}</span>
                </h3>
                <ul className="tw-mt-3 tw-space-y-2">
                  {item.highlights.map((h) => (
                    <li key={h} className="tw-flex tw-gap-2 tw-text-sm tw-leading-relaxed tw-text-mist-300 sm:tw-text-base">
                      <span className="tw-mt-2 tw-h-1 tw-w-1 tw-flex-shrink-0 tw-rounded-full tw-bg-accent-400" />
                      {h}
                    </li>
                  ))}
                </ul>
                {item.tech && (
                  <div className="tw-mt-4 tw-flex tw-flex-wrap tw-gap-2">
                    {item.tech.map((t) => (
                      <span key={t} className="tw-rounded-full tw-bg-white/5 tw-px-2.5 tw-py-1 tw-text-xs tw-text-mist-300">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
