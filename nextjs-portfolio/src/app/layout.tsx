import type { Metadata } from 'next'
// Third-party CSS imports first
import 'bootstrap/dist/css/bootstrap.min.css'
import 'swiper/css'
import 'swiper/css/bundle'
import 'react-modal-video/css/modal-video.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-photo-view/dist/react-photo-view.css'

// Custom CSS imports - order matters for proper overrides
import '../assets/css/font-awesome.min.css'
import '../assets/css/animate.css'
import '../assets/css/validnavs.css'
import '../assets/css/unit-test.css'
import '../assets/css/helper.css'
import '../assets/css/style.css'
import './globals.css'

import ClientProviders from '@/components/providers/ClientProviders'

export const metadata: Metadata = {
  title: 'Portfolio - Next.js',
  description: 'Professional portfolio website built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ClientProviders />
      </body>
    </html>
  )
} 