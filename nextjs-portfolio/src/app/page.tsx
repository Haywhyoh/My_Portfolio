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
      
      {/* Professional Summary Section */}
      {/* <div className="container default-padding">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="bg-gradient text-light p-5 rounded text-center">
              <h2 className="text-white mb-4">🚀 Full-Stack Software Engineer</h2>
              <div className="row">
                <div className="col-md-6">
                  <h4 className="text-white">💼 Recent Experience:</h4>
                  <ul className="list-unstyled text-light">
                    <li>🎯 CodeMyGig - Leading 6-person dev team</li>
                    <li>🏢 Hux Ventures - Led 5-person team (13K users)</li>
                    <li>🎨 Frontend Engineer - 40% faster onboarding</li>
                    <li>🌐 Probus Technologies - React & WordPress</li>
                    <li>📚 ALX Africa - Full-stack development</li>
                    <li>💡 10+ freelance WordPress projects</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h4 className="text-white">🛠️ Tech Stack:</h4>
                  <ul className="list-unstyled text-light">
                    <li>⚛️ React, Next.js, Angular, TypeScript</li>
                    <li>🐍 Python, Django, Flask, Node.js</li>
                    <li>🗄️ PostgreSQL, MongoDB, Redis, Firebase</li>
                    <li>☁️ AWS, Google Cloud, Docker</li>
                    <li>🔧 Git, TDD, Pair Programming</li>
                    <li>📱 Responsive Design & SEO</li>
                  </ul>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <h4 className="text-white">🏆 Featured Projects:</h4>
                  <div className="row">
                    <div className="col-md-4">
                      <p className="text-light mb-2">
                        <strong>🎓 Hillpad</strong><br/>
                        Online course marketplace<br/>
                        <small>30K+ monthly impressions</small>
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p className="text-light mb-2">
                        <strong>🎵 GraviitalBeats</strong><br/>
                        Musical beat marketplace<br/>
                        <small>NestJs + NextJs + Postgres</small>
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p className="text-light mb-2">
                        <strong>🎯 Various SaaS</strong><br/>
                        Multiple client projects<br/>
                        <small>21K+ combined users</small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-white">
                <strong>5+ Years Experience | EdTech & SaaS Specialist | Holberton Graduate</strong>
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </LayoutV1>
  )
} 