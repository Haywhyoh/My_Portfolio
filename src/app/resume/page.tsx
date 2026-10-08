import type { Metadata } from 'next';
import { Download } from 'lucide-react';
import Container from '@/components/site/Container';
import SectionHeading from '@/components/site/SectionHeading';
import Button from '@/components/site/Button';
import CTASection from '@/components/site/CTASection';
import { education, experience, skillGroups } from '@/lib/resumeData';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Resume',
  description: `Professional experience, education, and skills — ${siteConfig.name}, ${siteConfig.role}.`,
  alternates: { canonical: `${siteConfig.url}/resume` },
};

export default function ResumePage() {
  return (
    <>
      <section className="tw-border-b tw-border-white/10 tw-py-16 sm:tw-py-24">
        <Container className="tw-flex tw-flex-col tw-gap-8 sm:tw-flex-row sm:tw-items-end sm:tw-justify-between">
          <SectionHeading
            eyebrow="Resume"
            title="Experience, education, and the stack I ship with."
            description="A condensed view of the last five years building production software. Download the PDF if you need a copy for your ATS."
          />
          <Button href={siteConfig.resumeFile} external>
            Download PDF <Download className="tw-h-4 tw-w-4" />
          </Button>
        </Container>
      </section>

      <section className="tw-py-16 sm:tw-py-24">
        <Container>
          <h2 className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.2em] tw-text-accent-400">Experience</h2>
          <div className="tw-mt-8">
            {experience.map((item) => (
              <div
                key={`${item.company}-${item.role}-${item.period}`}
                className="tw-grid tw-grid-cols-1 tw-gap-4 tw-border-t tw-border-white/10 tw-py-8 first:tw-border-t-0 first:tw-pt-0 sm:tw-grid-cols-[200px_1fr]"
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

      <section className="tw-border-t tw-border-white/10 tw-py-16 sm:tw-py-24">
        <Container className="tw-grid tw-grid-cols-1 tw-gap-16 lg:tw-grid-cols-2">
          <div>
            <h2 className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.2em] tw-text-accent-400">Education</h2>
            <div className="tw-mt-8 tw-space-y-6">
              {education.map((item) => (
                <div key={item.school} className="tw-rounded-2xl tw-border tw-border-white/10 tw-bg-white/[0.03] tw-p-5">
                  <p className="tw-font-mono tw-text-sm tw-text-mist-400">{item.period}</p>
                  <h3 className="tw-mt-1 tw-text-lg tw-font-semibold tw-text-white">{item.credential}</h3>
                  <p className="tw-mt-1 tw-text-sm tw-text-mist-300">{item.school}</p>
                  {item.detail && <p className="tw-mt-2 tw-text-sm tw-text-mist-400">{item.detail}</p>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.2em] tw-text-accent-400">Skills</h2>
            <div className="tw-mt-8 tw-space-y-5">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <p className="tw-text-sm tw-font-medium tw-text-white">{group.label}</p>
                  <div className="tw-mt-2 tw-flex tw-flex-wrap tw-gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="tw-rounded-full tw-bg-white/5 tw-px-3 tw-py-1 tw-text-sm tw-text-mist-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
