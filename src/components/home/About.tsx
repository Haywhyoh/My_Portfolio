import Image from 'next/image';
import Container from '@/components/site/Container';
import SectionHeading from '@/components/site/SectionHeading';
import { siteConfig } from '@/lib/siteConfig';

export default function About() {
  return (
    <section id="about" className="tw-scroll-mt-20 tw-border-t tw-border-white/10 tw-bg-ink-950 tw-py-20 sm:tw-py-28">
      <Container>
        <div className="tw-grid tw-grid-cols-1 tw-items-center tw-gap-12 lg:tw-grid-cols-[1.15fr_0.85fr] lg:tw-gap-16">
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

          <figure className="tw-relative tw-m-0 tw-mx-auto tw-w-full tw-max-w-md lg:tw-mx-0 lg:tw-max-w-none">
            <div
              aria-hidden
              className="tw-pointer-events-none tw-absolute -tw-bottom-3 -tw-right-3 tw-hidden tw-h-full tw-w-full tw-rounded-[1.75rem] tw-border tw-border-white/20 sm:tw-block"
            />
            <div className="tw-relative tw-overflow-hidden tw-rounded-[1.75rem] tw-border tw-border-white/10 tw-bg-ink-800 tw-shadow-card">
              <Image
                src="/assets/img/potrait.png"
                alt={`Portrait of ${siteConfig.name}`}
                width={894}
                height={800}
                className="tw-block tw-h-auto tw-w-full"
                sizes="(min-width: 1024px) 38vw, 28rem"
              />
            </div>
            <figcaption className="tw-absolute tw-inset-x-3 tw-bottom-3 tw-flex tw-items-center tw-justify-between tw-gap-3 tw-rounded-2xl tw-border tw-border-white/10 tw-bg-ink-950/80 tw-px-4 tw-py-3 tw-backdrop-blur-md">
              <div>
                <p className="tw-m-0 tw-text-sm tw-font-medium tw-text-white">{siteConfig.name}</p>
                <p className="tw-m-0 tw-mt-0.5 tw-text-xs tw-text-mist-300">{siteConfig.role}</p>
              </div>
              <p className="tw-m-0 tw-shrink-0 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.16em] tw-text-mist-300">
                Lagos
              </p>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
