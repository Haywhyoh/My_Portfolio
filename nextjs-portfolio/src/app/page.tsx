import LayoutV1 from '@/components/Layouts/LayoutV1'

export default function Home() {
  return (
    <LayoutV1>
      <main>
        <div className="container" style={{ minHeight: '60vh', paddingTop: '100px' }}>
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1>Next.js Portfolio - Migration in Progress</h1>
              <p className="lead">Welcome to your converted Next.js portfolio!</p>
              <p>✅ Header and Footer components successfully migrated</p>
              <p>✅ Layout system working correctly</p>
              <p>⏳ Page components migration in progress...</p>
              <div className="mt-4">
                <h3>Migration Status:</h3>
                <ul className="list-unstyled">
                  <li>✅ Project Structure Setup</li>
                  <li>✅ Core Layout Components</li>
                  <li>✅ Navigation & Header</li>
                  <li>✅ Footer & Global Components</li>
                  <li>⏳ CSS Styles & Assets</li>
                  <li>⏳ Page Components</li>
                  <li>⏳ Dynamic Routing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutV1>
  )
} 