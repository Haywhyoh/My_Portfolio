import Container from '@/components/site/Container';
import SectionHeading from '@/components/site/SectionHeading';
import { skillGroups } from '@/lib/resumeData';

export default function About() {
  return (
    <section id="about" className="tw-border-t tw-border-white/10 tw-bg-ink-950 tw-py-20 sm:tw-py-28">
      <Container>
        <div className="tw-grid tw-grid-cols-1 tw-gap-16 lg:tw-grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="About me"
              title="I turn ambiguous product ideas into stable, shipped software."
            />
            <div className="tw-mt-6 tw-space-y-4 tw-text-base tw-leading-relaxed tw-text-mist-300">
              <p>
                Over the last 5+ years I&apos;ve worked across EdTech, SaaS, and now AI-powered automation —
                usually as the engineer trusted to take a feature from a Figma file (or sometimes just a Slack
                message) to something real users depend on.
              </p>
              <p>
                I&apos;ve led small engineering teams, built the billing/affiliate backbone for a 200-partner
                business, and most recently built <strong className="tw-text-white">Botglam</strong>, an AI
                WhatsApp agent that now runs the front desk for beauty businesses across Africa — answering
                clients, booking appointments, and collecting payments without a human in the loop.
              </p>
              <p>
                I care about code that stays maintainable after I leave the room: tests, clear boundaries, and
                systems that fail loudly instead of silently.
              </p>
            </div>
          </div>

          <div className="tw-grid tw-grid-cols-1 tw-gap-5 sm:tw-grid-cols-2">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="tw-rounded-2xl tw-border tw-border-white/10 tw-bg-white/[0.03] tw-p-5 tw-shadow-card tw-transition-colors hover:tw-border-accent-400/40"
              >
                <p className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.18em] tw-text-accent-400">
                  {group.label}
                </p>
                <div className="tw-mt-4 tw-flex tw-flex-wrap tw-gap-2">
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
  );
}
