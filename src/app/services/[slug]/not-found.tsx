import Link from 'next/link'

export default function ServiceNotFound() {
  return (
    <div className="container default-padding">
      <div className="row">
        <div className="col-lg-8 offset-lg-2 text-center">
          <div className="error-content">
            <h1>404</h1>
            <h2>Service Not Found</h2>
            <p>The service you&apos;re looking for doesn&apos;t exist or has been moved.</p>
            <Link href="/service" className="btn-style-one">
              Back to Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
