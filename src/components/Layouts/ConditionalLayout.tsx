'use client';

import { usePathname } from 'next/navigation';
import HeaderV1 from '@/components/header/HeaderV1';
import HeaderV2 from '@/components/header/HeaderV2';
import FooterV1 from '@/components/footer/FooterV1';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Check if the current path is an admin page
  const isAdminPage = pathname?.startsWith('/admin');
  
  // Check if the current path is the home page
  const isHomePage = pathname === '/';
  
  // If it's an admin page, don't render header and footer
  if (isAdminPage) {
    return <>{children}</>;
  }
  
  // For home page only, use HeaderV1
  if (isHomePage) {
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
  
  // For all other pages, use HeaderV2
  return (
    <>
      <HeaderV2 />
      <main>
        {children}
      </main>
      <FooterV1 />
    </>
  );
}
