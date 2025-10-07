'use client'

import TestimonialV1 from '../testimonial/TestimonialV1'
import PromoV1 from '../promo/PromoV1'
import Image from 'next/image'

interface Service {
  id: number
  title: string
  text: string
  icon: string
}

interface ServicesDetailsContentProps {
  service: Service
}

// Map service titles to banner images
const bannerImages: { [key: string]: string } = { 
  'AI Engineering': '/assets/img/skill1.png',
  'Full Stack Development': '/assets/img/skill2.png',
  'WordPress Development': '/assets/img/skill3.png',
  'Mobile Development': '/assets/img/skill1.png', // You can adjust as needed
}

const ServicesDetailsContent = ({ service }: ServicesDetailsContentProps) => {
  // Service-specific content based on the service type
  const getServiceContent = (serviceTitle: string) => {
    switch (serviceTitle) {
      case 'AI Engineering':
        return {
          mainTitle: 'AI Engineering & Automation Solutions',
          description: 'Transform your business with intelligent AI agents and automation systems that work around the clock. I specialize in building custom AI solutions that integrate seamlessly with your existing workflows, from intelligent chatbots to complex automation pipelines that save your team hours of manual work daily.',
          additionalText: 'My AI engineering approach focuses on practical, business-driven solutions that deliver immediate value. Whether you need process automation, intelligent data analysis, or conversational AI, I build systems that understand your business context and adapt to your specific needs.',
          features: [
            'Custom AI chatbot development',
            'Workflow automation systems',
            'Intelligent data processing',
            'Machine learning model integration',
            'API development and integration'
          ],
          process: [
            {
              step: '01',
              title: 'Discovery & Analysis',
              description: 'Understanding your business processes, identifying automation opportunities, and defining success metrics for AI implementation.'
            },
            {
              step: '02',
              title: 'Design & Architecture',
              description: 'Creating a comprehensive AI solution architecture that integrates seamlessly with your existing systems and workflows.'
            },
            {
              step: '03',
              title: 'Development & Testing',
              description: 'Building and rigorously testing AI models and automation systems to ensure reliability and performance in production.'
            }
          ],
          faq: [
            {
              question: 'What types of AI solutions can you build?',
              answer: 'I specialize in custom AI chatbots, workflow automation, data analysis tools, and machine learning integrations. Each solution is tailored to your specific business needs and existing technology stack.'
            },
            {
              question: 'How long does an AI project typically take?',
              answer: 'Project timelines vary based on complexity, but most AI automation projects take 2-6 weeks. Simple chatbots can be delivered in 1-2 weeks, while complex automation systems may take 4-8 weeks.'
            },
            {
              question: 'Do you provide ongoing support for AI systems?',
              answer: 'Yes, I offer comprehensive support including model monitoring, performance optimization, and updates as your business needs evolve. AI systems require ongoing maintenance to ensure optimal performance.'
            },
            {
              question: 'Can AI solutions integrate with my existing software?',
              answer: 'Absolutely. I design AI solutions to work with your current systems through APIs, webhooks, and custom integrations. Compatibility with your existing tech stack is a priority in every project.'
            }
          ]
        }

      case 'Full Stack Development':
        return {
          mainTitle: 'Complete Full Stack Web Applications',
          description: 'Build robust, scalable web applications from the ground up. With expertise in modern technologies like React, Next.js, Python, and Node.js, I create complete solutions that handle everything from user interface to database management, serving over 21,000 users across various platforms.',
          additionalText: 'My full-stack development approach combines cutting-edge frontend technologies with robust backend systems. I focus on creating applications that are not just functional, but also performant, secure, and maintainable for long-term success.',
          features: [
            'React & Next.js frontend development',
            'Python & Node.js backend services',
            'Database design and optimization',
            'API development and integration',
            'Cloud deployment and scaling'
          ],
          process: [
            {
              step: '01',
              title: 'Planning & Architecture',
              description: 'Defining project requirements, choosing the optimal tech stack, and designing a scalable architecture that supports your business goals.'
            },
            {
              step: '02',
              title: 'Development & Integration',
              description: 'Building both frontend and backend components, ensuring seamless integration between all parts of the application.'
            },
            {
              step: '03',
              title: 'Testing & Deployment',
              description: 'Comprehensive testing across all layers, followed by deployment to production with monitoring and optimization.'
            }
          ],
          faq: [
            {
              question: 'What technologies do you use for full-stack development?',
              answer: 'I primarily use React/Next.js for frontend, Python (Django/FastAPI) and Node.js for backend, PostgreSQL/MongoDB for databases, and AWS/Vercel for deployment. I choose the best tools for each project\'s specific needs.'
            },
            {
              question: 'How do you ensure application security?',
              answer: 'Security is built into every layer - from input validation and authentication to database security and API protection. I follow OWASP guidelines and implement best practices for data protection and user privacy.'
            },
            {
              question: 'Can you work with existing codebases?',
              answer: 'Yes, I can integrate with existing systems, refactor legacy code, or build new features that work seamlessly with your current application architecture.'
            },
            {
              question: 'Do you provide maintenance and updates?',
              answer: 'I offer ongoing maintenance, security updates, feature additions, and performance optimization to keep your application running smoothly and securely.'
            }
          ]
        }

      case 'WordPress Development':
        return {
          mainTitle: 'Custom WordPress Solutions That Convert',
          description: 'Create powerful WordPress websites that turn visitors into customers. I specialize in custom themes, plugins, and optimizations that make your site lightning-fast, SEO-friendly, and perfectly aligned with your brand and business objectives.',
          additionalText: 'Every WordPress site I build is designed for performance and conversion. From custom post types to advanced integrations, I ensure your WordPress site stands out from the competition while delivering exceptional user experience.',
          features: [
            'Custom WordPress theme development',
            'Plugin development and customization',
            'SEO optimization and performance tuning',
            'E-commerce integration (WooCommerce)',
            'Security hardening and maintenance'
          ],
          process: [
            {
              step: '01',
              title: 'Strategy & Design',
              description: 'Analyzing your brand, target audience, and business goals to create a WordPress strategy that drives conversions and engagement.'
            },
            {
              step: '02',
              title: 'Custom Development',
              description: 'Building custom themes, plugins, and functionality tailored to your specific needs, ensuring optimal performance and user experience.'
            },
            {
              step: '03',
              title: 'Optimization & Launch',
              description: 'Fine-tuning performance, implementing SEO best practices, and launching your site with comprehensive training and ongoing support.'
            }
          ],
          faq: [
            {
              question: 'Do you build custom themes or use existing ones?',
              answer: 'I primarily build custom themes tailored to your brand and business needs. This ensures better performance, unique design, and functionality that matches your specific requirements.'
            },
            {
              question: 'How do you optimize WordPress for speed?',
              answer: 'I implement multiple optimization strategies including custom code optimization, image compression, caching solutions, CDN integration, and database optimization to achieve fast loading times.'
            },
            {
              question: 'Can you integrate third-party services?',
              answer: 'Yes, I can integrate payment gateways, CRM systems, email marketing tools, analytics platforms, and any other third-party services your business needs.'
            },
            {
              question: 'Do you provide WordPress training?',
              answer: 'I provide comprehensive training on managing your WordPress site, including content updates, basic maintenance, and best practices for ongoing site management.'
            }
          ]
        }

      case 'Mobile Development':
        return {
          mainTitle: 'Cross-Platform Mobile App Development',
          description: 'Build powerful mobile applications that work seamlessly on both iOS and Android. Using React Native and Kotlin, I create responsive, feature-rich apps that provide native performance while sharing code across platforms for faster development and easier maintenance.',
          additionalText: 'My mobile development approach focuses on creating apps that feel native on each platform while maximizing code reuse. I ensure your app delivers exceptional user experience across all devices and screen sizes.',
          features: [
            'React Native cross-platform development',
            'Native iOS and Android development',
            'UI/UX design and implementation',
            'API integration and data management',
            'App store deployment and optimization'
          ],
          process: [
            {
              step: '01',
              title: 'Research & Prototyping',
              description: 'Understanding your target audience, analyzing competitors, and creating interactive prototypes to validate concepts before development.'
            },
            {
              step: '02',
              title: 'Development & Integration',
              description: 'Building the mobile app with focus on performance, user experience, and seamless integration with backend services and APIs.'
            },
            {
              step: '03',
              title: 'Testing & Deployment',
              description: 'Comprehensive testing across devices and platforms, followed by app store submission and launch with ongoing support and updates.'
            }
          ],
          faq: [
            {
              question: 'Should I choose React Native or native development?',
              answer: 'React Native is ideal for most projects as it allows faster development and easier maintenance. I recommend native development only when you need platform-specific features or maximum performance for complex applications.'
            },
            {
              question: 'How do you ensure app performance?',
              answer: 'I optimize performance through efficient code architecture, image optimization, lazy loading, and platform-specific optimizations. Regular performance testing ensures smooth user experience across all devices.'
            },
            {
              question: 'Can you integrate with existing backend systems?',
              answer: 'Yes, I can integrate your mobile app with existing APIs, databases, and backend services. I ensure secure and efficient data flow between your mobile app and server infrastructure.'
            },
            {
              question: 'Do you handle app store submissions?',
              answer: 'I handle the complete app store submission process, including preparing store listings, screenshots, descriptions, and managing the approval process for both iOS App Store and Google Play Store.'
            }
          ]
        }

      default:
        return {
          mainTitle: service.title,
          description: service.text,
          additionalText: 'Professional service delivery with focus on quality and client satisfaction.',
          features: ['Professional service', 'Quality delivery', 'Client satisfaction'],
          process: [
            { step: '01', title: 'Consultation', description: 'Understanding your needs and requirements.' },
            { step: '02', title: 'Planning', description: 'Creating a detailed project plan and timeline.' },
            { step: '03', title: 'Delivery', description: 'Executing the project with regular updates and communication.' }
          ],
          faq: [
            { question: 'How can I get started?', answer: 'Contact me to discuss your project requirements and get a detailed proposal.' },
            { question: 'What is your process?', answer: 'I follow a structured approach from consultation to delivery, ensuring quality at every step.' }
          ]
        }
    }
  }

  const content = getServiceContent(service.title)

  // Determine the banner image based on the service title, fallback to default if not found
  const bannerImage =
    bannerImages[service.title] || '/assets/img/banner/3.jpg'

  return (
    <>
      <div className="services-details-area default-padding-bottom">
        <div className="container">
          <div className="services-details-items">
            <div className="row">
              <div className="col-xl-12">
                <div className="service-single-thumb">
                  <Image src={bannerImage} alt="Service Banner" width={1200} height={400} />
                </div>
              </div>
            </div>
            <div className="row mt-50">
              <div className="col-lg-7">
                <h2>{content.mainTitle}</h2>
                <p>{content.description}</p>
              </div>
              <div className="col-lg-5 pl-60 pl-md-15 pl-xs-15">
                <p>{content.additionalText}</p>
                <ul className="list-style-one">
                  {content.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-50 mt-xs-40">
                <h2>My work process</h2>
                <div className="process-style-one">
                  {content.process.map((step, index) => (
                    <div className="process-style-one-item" key={index}>
                      <span>{step.step}</span>
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="services-details-area default-padding bg-gray">
        <div className="container">
          <div className="services-details-items">
            <div className="d-grid colums-2">
              <div className="thumb-style-two">
                <Image src="/assets/img/skill1.jpg" alt="Service Details" width={600} height={400} />
              </div>
              <div className="item">
                <h2>Any questions find here.</h2>
                <div className="accordion" id="faqAccordion">
                  {content.faq.map((item, index) => (
                    <div className="accordion-item accordion-style-one" key={index}>
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <button 
                          className={`accordion-button ${index === 0 ? '' : 'collapsed'}`} 
                          type="button" 
                          data-bs-toggle="collapse" 
                          data-bs-target={`#collapse${index}`} 
                          aria-expanded={index === 0 ? 'true' : 'false'} 
                          aria-controls={`collapse${index}`}
                        >
                          {item.question}
                        </button>
                      </h2>
                      <div 
                        id={`collapse${index}`} 
                        className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
                        aria-labelledby={`heading${index}`} 
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body">
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TestimonialV1 />
      <PromoV1 />
    </>
  )
}

export default ServicesDetailsContent
