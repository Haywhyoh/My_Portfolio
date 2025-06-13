import LayoutV1 from '@/components/Layouts/LayoutV1'
import BannerV1 from '@/components/banner/BannerV1'
import AboutV1 from '@/components/about/AboutV1'
import ServicesV1 from '@/components/services/ServicesV1'
import FactV1 from '@/components/fact/FactV1'
import ResumeV1 from '@/components/resume/ResumeV1'
import ContactV1 from '@/components/contact/ContactV1'

export default function Home() {
  return (
    <LayoutV1>
      <BannerV1 />
      <AboutV1 />
      <ServicesV1 sectionClass="default-padding" hasTitle={true} />
      <FactV1 />
      <ResumeV1 sectionClass="bg-gray default-padding" />
      <ContactV1 sectionClass="bg-gray default-padding" />
      
      {/* Migration status section */}
      <div className="container default-padding">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="bg-gradient text-light p-5 rounded text-center">
              <h2 className="text-white mb-4">🎉 Next.js Migration Success!</h2>
              <div className="row">
                <div className="col-md-6">
                  <h4 className="text-white">✅ Migrated Components:</h4>
                  <ul className="list-unstyled text-light">
                    <li>🏠 BannerV1 - Hero with typed animation</li>
                    <li>👤 AboutV1 - About section with GSAP</li>
                    <li>⚙️ ServicesV1 - Services showcase</li>
                    <li>📊 FactV1 - Skills with CountUp</li>
                    <li>📄 ResumeV1 - Experience timeline</li>
                    <li>📧 ContactV1 - Contact form</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h4 className="text-white">🔧 Technical Features:</h4>
                  <ul className="list-unstyled text-light">
                    <li>⚡ Next.js 14 App Router</li>
                    <li>🎨 Bootstrap 5 + Custom CSS</li>
                    <li>📱 Fully Responsive Design</li>
                    <li>🔄 React Hooks & State</li>
                    <li>🌟 Smooth Animations</li>
                    <li>📈 Progress Counters</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-white">
                <strong>Portfolio is now fully functional with Next.js!</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutV1>
  )
} 