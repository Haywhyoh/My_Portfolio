import ResumeV1 from '@/components/resume/ResumeV1'
import FactV1 from '@/components/fact/FactV1'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume - Portfolio',
  description: 'My professional experience and education background',
}

export default function ResumePage() {
  return (
    <>
      <div className="container default-padding">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading text-center">
              <h4 className="sub-title">My Journey</h4>
              <h1 className="title">Resume</h1>
              <p>Professional experience, education, and skills</p>
            </div>
          </div>
        </div>
      </div>
      <ResumeV1 sectionClass="default-padding" />
      <FactV1 />
    </>
  )
} 