import Link from 'next/link';
import Container from '@/components/site/Container';
import Button from '@/components/site/Button';

export default function NotFound() {
  return (
    <section className="tw-flex tw-min-h-[70vh] tw-items-center tw-py-24">
      <Container className="tw-text-center">
        <p className="tw-font-mono tw-text-sm tw-uppercase tw-tracking-[0.2em] tw-text-accent-400">404</p>
        <h1 className="tw-mt-4 tw-text-4xl tw-font-semibold tw-tracking-tight tw-text-white sm:tw-text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="tw-mx-auto tw-mt-4 tw-max-w-md tw-text-mist-300">
          The URL may be outdated, or the page moved. Head home, browse the work, or send a note.
        </p>
        <div className="tw-mt-8 tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-4">
          <Button href="/">Back home</Button>
          <Link href="/work" className="tw-text-sm tw-text-mist-300 hover:tw-text-white">
            View work
          </Link>
        </div>
      </Container>
    </section>
  );
}
