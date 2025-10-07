import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Portfolio',
  description: 'Admin dashboard for portfolio management',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root">
      {children}
    </div>
  );
}