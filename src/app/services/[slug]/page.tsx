import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Container from '@/components/site/Container';
import Button from '@/components/site/Button';
import CTASection from '@/components/site/CTASection';
import ServicesData from '@/assets/jsonData/services/ServicesData.json';
import { siteConfig } from '@/lib/siteConfig';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

function serviceSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function generateStaticParams() {
  return ServicesData.map((service) => ({
    slug: serviceSlug(service.title),
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = ServicesData.find((s) => serviceSlug(s.title) === slug);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: service.title,
    description: service.text,
    alternates: { canonical: `${siteConfig.url}/services/${slug}` },
  };
}

export default async function ServiceDetailsPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = ServicesData.find((s) => serviceSlug(s.title) === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <section className="tw-py-16 sm:tw-py-24">
        <Container className="tw-max-w-3xl">
          <Link
            href="/services"
            className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-sm tw-text-mist-400 hover:tw-text-white"
          >
            <ArrowLeft className="tw-h-3.5 tw-w-3.5" /> All services
          </Link>
          <h1 className="tw-mt-6 tw-text-4xl tw-font-semibold tw-tracking-tight tw-text-white sm:tw-text-5xl">
            {service.title}
          </h1>
          <p className="tw-mt-6 tw-text-lg tw-leading-relaxed tw-text-mist-300">{service.text}</p>
          <div className="tw-mt-10">
            <Button href="/contact" size="lg">
              Talk about this <ArrowUpRight className="tw-h-4 tw-w-4" />
            </Button>
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
