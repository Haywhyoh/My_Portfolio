import { ArrowUpRight, Download } from 'lucide-react';
import Container from './Container';
import Button from './Button';
import { siteConfig } from '@/lib/siteConfig';

export default function CTASection({
  title = "Let's build something that ships.",
  description = "I'm actively looking for full-time software engineering roles and select contract work. If you need someone who can own a product end to end, let's talk.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="tw-relative tw-overflow-hidden tw-border-y tw-border-white/10 tw-bg-ink-900 tw-py-20 sm:tw-py-28">
      <div
        className="tw-pointer-events-none tw-absolute tw-inset-0 tw-opacity-70"
        style={{
          background:
            'radial-gradient(600px circle at 20% 20%, rgba(109,91,255,0.18), transparent 60%), radial-gradient(500px circle at 80% 80%, rgba(0,230,168,0.12), transparent 60%)',
        }}
      />
      <Container className="tw-relative tw-text-center">
        <h2 className="tw-mx-auto tw-max-w-2xl tw-text-balance tw-text-3xl tw-font-semibold tw-tracking-tight tw-text-white sm:tw-text-4xl">
          {title}
        </h2>
        <p className="tw-mx-auto tw-mt-4 tw-max-w-xl tw-text-base tw-text-mist-300 sm:tw-text-lg">
          {description}
        </p>
        <div className="tw-mt-8 tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-4">
          <Button href="/contact" size="lg">
            Hire me <ArrowUpRight className="tw-h-4 tw-w-4" />
          </Button>
          <Button href={siteConfig.resumeFile} external size="lg" variant="secondary">
            Download résumé <Download className="tw-h-4 tw-w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
