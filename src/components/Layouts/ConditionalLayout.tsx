'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Admin pages render their own chrome entirely.
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <div className="tw-min-h-screen tw-bg-ink-950 tw-text-mist-200">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
