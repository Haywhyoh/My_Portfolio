import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServicesDetailsContent from '@/components/services/ServicesDetailsContent'
import ServicesData from '@/assets/jsonData/services/ServicesData.json'

interface ServicePageProps {
  params: {
    slug: string
  }
}

// Generate static params for all services
export async function generateStaticParams() {
  return ServicesData.map((service) => ({
    slug: service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  }))
}

// Generate metadata for each service
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = ServicesData.find(
    (s) => s.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === params.slug
  )

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.title} - Portfolio Services`,
    description: service.text,
  }
}

export default function ServiceDetailsPage({ params }: ServicePageProps) {
  const service = ServicesData.find(
    (s) => s.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === params.slug
  )

  if (!service) {
    notFound()
  }

  return <ServicesDetailsContent service={service} />
}
