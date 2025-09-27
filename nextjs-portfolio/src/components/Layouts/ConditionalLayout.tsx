'use client';

import { usePathname } from 'next/navigation';
import HeaderV1 from '@/components/header/HeaderV1';
import FooterV1 from '@/components/footer/FooterV1';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Check if the current path is an admin page
  const isAdminPage = pathname?.startsWith('/admin');
  
  // If it's an admin page, don't render header and footer
  if (isAdminPage) {
    return <>{children}</>;
  }
  
  // For all other pages, render with header and footer
  return (
    <>
      <HeaderV1 />
      <main>
        {children}
      </main>
      <FooterV1 />
    </>
  );
}
