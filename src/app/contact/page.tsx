import ContactV1 from '@/components/contact/ContactV1'
import { Metadata } from 'next'
import LayoutV2 from '@/components/Layouts/LayoutV2'

export const metadata: Metadata = {
  title: 'Contact - Portfolio',
  description: 'Get in touch with me for your next project',
}

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '100px' }}>
      <ContactV1 sectionClass="default-padding" />
    </div>
  )
} 