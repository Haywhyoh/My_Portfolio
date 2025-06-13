import LayoutV1 from '@/components/Layouts/LayoutV1'
import ContactV1 from '@/components/contact/ContactV1'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Portfolio',
  description: 'Get in touch with me for your next project',
}

export default function ContactPage() {
  return (
    <LayoutV1>
      <div className="container default-padding">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading text-center">
              <h4 className="sub-title">Get In Touch</h4>
              <h1 className="title">Contact Me</h1>
              <p>Ready to start your next project? Let's work together!</p>
            </div>
          </div>
        </div>
      </div>
      <ContactV1 sectionClass="default-padding" />
    </LayoutV1>
  )
} 