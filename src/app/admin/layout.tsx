import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/font-awesome.min.css';
import './admin.css';
import BootstrapJS from '@/components/providers/BootstrapJS';

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
      <BootstrapJS />
      {children}
    </div>
  );
}
