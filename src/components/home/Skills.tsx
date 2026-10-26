import { Cloud, Code2, Database, Layers } from 'lucide-react';
import Container from '@/components/site/Container';
import SectionHeading from '@/components/site/SectionHeading';
import { skillGroups } from '@/lib/resumeData';

const groupMeta: Record<string, { note: string; span: string; icon: typeof Code2 }> = {
  Languages: {
    note: 'What I write production code in.',
    span: 'lg:tw-col-span-7',
    icon: Code2,
  },
  Frameworks: {
    note: 'Where the product actually gets built.',
    span: 'lg:tw-col-span-5',
    icon: Layers,
  },
  'Data & ORM': {
    note: 'How data is stored, queried, and kept honest.',
    span: 'lg:tw-col-span-7',
    icon: Database,
  },
  'Infra & Tooling': {
    note: 'How the work gets from my machine to users.',
    span: 'lg:tw-col-span-5',
    icon: Cloud,
  },
};

const toolGroups = skillGroups.filter((group) => group.label !== 'Practices');
const practices = skillGroups.find((group) => group.label === 'Practices');

export default function Skills() {
  return (
    <section
      id="skills"
      className="tw-relative tw-scroll-mt-20 tw-overflow-hidden tw-border-t tw-border-white/10 tw-bg-ink-900 tw-py-20 sm:tw-py-28"
    >
      <div
        aria-hidden
        className="tw-pointer-events-none tw-absolute tw-inset-0"
        style={{
          background:
            'radial-gradient(520px circle at 12% 0%, rgba(255,255,255,0.06), transparent 60%)',
        }}
      />

      <Container className="tw-relative">
        <SectionHeading
          eyebrow="Skills"
          title="The toolkit behind the work."
          description="Languages, frameworks, data, and the practices I use to ship software that stays maintainable."
        />

        <div className="tw-mt-14 tw-grid tw-grid-cols-1 tw-gap-4 lg:tw-grid-cols-12">
          {toolGroups.map((group, index) => {
            const meta = groupMeta[group.label];
            const Icon = meta?.icon ?? Code2;

            return (
              <article
                key={group.label}
                className={`tw-group tw-relative tw-overflow-hidden tw-rounded-3xl tw-border tw-border-white/10 tw-bg-ink-950 tw-p-6 tw-shadow-card tw-transition-colors hover:tw-border-white/25 sm:tw-p-7 ${meta?.span ?? 'lg:tw-col-span-6'}`}
              >
                <div className="tw-flex tw-items-center tw-justify-between tw-gap-4">
                  <p className="tw-m-0 tw-flex tw-items-center tw-gap-3 tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.18em] tw-text-accent-400">
                    <span className="tw-text-mist-400">{String(index + 1).padStart(2, '0')}</span>
                    {group.label}
                  </p>
                  <span className="tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-xl tw-border tw-border-white/10 tw-bg-white/[0.03] tw-text-mist-200 tw-transition-colors group-hover:tw-border-white/25 group-hover:tw-text-white">
                    <Icon className="tw-h-4 tw-w-4" aria-hidden />
                  </span>
                </div>

                <p className="tw-m-0 tw-mt-5 tw-max-w-sm tw-text-sm tw-leading-relaxed tw-text-mist-400">
                  {meta?.note}
                </p>

                <ul className="tw-m-0 tw-mt-6 tw-flex tw-list-none tw-flex-wrap tw-gap-2 tw-p-0">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="tw-inline-flex tw-rounded-full tw-border tw-border-white/10 tw-bg-white/[0.03] tw-px-3 tw-py-1.5 tw-text-sm tw-text-mist-100 tw-transition-colors hover:tw-border-white hover:tw-bg-white hover:tw-text-ink-950">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {practices && (
          <div className="tw-mt-4 tw-overflow-hidden tw-rounded-3xl tw-border tw-border-white/10 tw-bg-ink-950">
            <div className="tw-flex tw-flex-col tw-gap-1 tw-border-b tw-border-white/10 tw-px-6 tw-py-5 sm:tw-flex-row sm:tw-items-end sm:tw-justify-between sm:tw-px-7">
              <div>
                <p className="tw-m-0 tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.18em] tw-text-accent-400">
                  Practices
                </p>
                <p className="tw-m-0 tw-mt-2 tw-text-sm tw-text-mist-400">
                  How I work with a team, not just a codebase.
                </p>
              </div>
              <p className="tw-m-0 tw-font-mono tw-text-xs tw-text-mist-400">05</p>
            </div>
            <ol className="tw-m-0 tw-grid tw-list-none tw-grid-cols-1 tw-gap-px tw-bg-white/10 tw-p-0 sm:tw-grid-cols-2 lg:tw-grid-cols-5">
              {practices.items.map((item, index) => (
                <li key={item} className="tw-bg-ink-950 tw-px-6 tw-py-6 sm:tw-px-7">
                  <span className="tw-font-mono tw-text-xs tw-text-mist-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="tw-m-0 tw-mt-3 tw-text-base tw-font-medium tw-leading-snug tw-text-white">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </Container>
    </section>
  );
}
