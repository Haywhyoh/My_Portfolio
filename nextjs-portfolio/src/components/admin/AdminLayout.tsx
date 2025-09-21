'use client';

import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === 'loading') {
    return (
      <div className="admin-loading">
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="admin-unauthorized">
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
          <div className="row">
            <div className="col-md-6 mx-auto text-center">
              <h1 className="h3 mb-3">Access Denied</h1>
              <p className="text-muted mb-4">You need to be logged in to access the admin area.</p>
              <Link href="/admin/login" className="btn btn-primary">
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const navigationItems = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: 'fas fa-tachometer-alt',
      active: pathname === '/admin/dashboard'
    },
    {
      label: 'All Blogs',
      href: '/admin/blogs',
      icon: 'fas fa-newspaper',
      active: pathname === '/admin/blogs' || pathname.startsWith('/admin/blogs/')
    },
    {
      label: 'New Blog',
      href: '/admin/blogs/new',
      icon: 'fas fa-plus-circle',
      active: pathname === '/admin/blogs/new'
    },
    {
      label: 'Categories & Tags',
      href: '/admin/categories',
      icon: 'fas fa-tags',
      active: pathname === '/admin/categories'
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: 'fas fa-cog',
      active: pathname === '/admin/settings'
    }
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <Link href="/admin/dashboard" className="sidebar-brand">
            <i className="fas fa-crown me-2"></i>
            <span>Portfolio Admin</span>
          </Link>
        </div>

        <div className="sidebar-nav">
          <ul className="nav flex-column">
            {navigationItems.map((item) => (
              <li key={item.href} className="nav-item">
                <Link
                  href={item.href}
                  className={`nav-link ${item.active ? 'active' : ''}`}
                >
                  <i className={`${item.icon} me-2`}></i>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <i className="fas fa-user-circle"></i>
            </div>
            <div className="user-details">
              <div className="user-name">{session.user.name}</div>
              <div className="user-email">{session.user.email}</div>
              <div className="user-role">{session.user.role}</div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="btn btn-outline-light btn-sm w-100 mt-2"
          >
            <i className="fas fa-sign-out-alt me-2"></i>
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Navigation */}
        <div className="admin-topbar">
          <div className="topbar-left">
            <button className="btn btn-link sidebar-toggle d-lg-none">
              <i className="fas fa-bars"></i>
            </button>
            <h1 className="page-title">
              {navigationItems.find(item => item.active)?.label || 'Admin'}
            </h1>
          </div>
          <div className="topbar-right">
            <Link href="/" className="btn btn-outline-primary btn-sm me-2">
              <i className="fas fa-eye me-1"></i>
              View Site
            </Link>
            <div className="user-dropdown dropdown">
              <button
                className="btn btn-link dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="fas fa-user-circle me-1"></i>
                {session.user.name}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" href="/admin/profile">
                    <i className="fas fa-user me-2"></i>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/admin/settings">
                    <i className="fas fa-cog me-2"></i>
                    Settings
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="admin-content">
          {children}
        </div>
      </div>

      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #f8f9fa;
        }

        .admin-sidebar {
          width: 280px;
          background: #2c3e50;
          color: white;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          z-index: 1000;
        }

        .sidebar-header {
          padding: 1.5rem;
          border-bottom: 1px solid #34495e;
        }

        .sidebar-brand {
          color: white;
          text-decoration: none;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .sidebar-brand:hover {
          color: #3498db;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0;
        }

        .nav-link {
          color: #bdc3c7;
          padding: 0.75rem 1.5rem;
          border-radius: 0;
          transition: all 0.3s ease;
        }

        .nav-link:hover,
        .nav-link.active {
          color: white;
          background: #3498db;
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid #34495e;
        }

        .user-info {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .user-avatar {
          font-size: 2rem;
          margin-right: 0.75rem;
          color: #3498db;
        }

        .user-details {
          flex: 1;
        }

        .user-name {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .user-email {
          font-size: 0.875rem;
          color: #bdc3c7;
          margin-bottom: 0.25rem;
        }

        .user-role {
          font-size: 0.75rem;
          color: #3498db;
          text-transform: uppercase;
          font-weight: 500;
        }

        .admin-main {
          flex: 1;
          margin-left: 280px;
          display: flex;
          flex-direction: column;
        }

        .admin-topbar {
          background: white;
          border-bottom: 1px solid #dee2e6;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .topbar-left {
          display: flex;
          align-items: center;
        }

        .page-title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: #2c3e50;
        }

        .topbar-right {
          display: flex;
          align-items: center;
        }

        .admin-content {
          flex: 1;
          padding: 1.5rem;
        }

        @media (max-width: 991.98px) {
          .admin-sidebar {
            margin-left: -280px;
            transition: margin-left 0.3s ease;
          }

          .admin-sidebar.show {
            margin-left: 0;
          }

          .admin-main {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}