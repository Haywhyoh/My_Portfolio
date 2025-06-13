import LayoutV1 from '@/components/Layouts/LayoutV1'
import ServicesV1 from '@/components/services/ServicesV1'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services - Portfolio',
  description: 'Professional web development and design services',
}

export default function ServicePage() {
  return (
    <LayoutV1>
      <div className="container default-padding">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading text-center">
              <h4 className="sub-title">What I Do</h4>
              <h1 className="title">My Services</h1>
              <p>I provide comprehensive web development and design solutions</p>
            </div>
          </div>
        </div>
      </div>
      <ServicesV1 sectionClass="default-padding" hasTitle={false} />
    </LayoutV1>
  )
} 