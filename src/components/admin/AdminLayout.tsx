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
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .admin-sidebar {
          width: 280px;
          background: white;
          color: #333;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          z-index: 1000;
          border-right: 1px solid #e9ecef;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        }

        .sidebar-header {
          padding: 2rem 1.5rem;
          border-bottom: 1px solid #e9ecef;
          background: white;
        }

        .sidebar-brand {
          color: #333;
          text-decoration: none;
          font-size: 1.375rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }

        .sidebar-brand:hover {
          color: #007bff;
        }

        .sidebar-brand i {
          color: #007bff;
          margin-right: 0.75rem;
          font-size: 1.5rem;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0;
        }

        .nav {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          margin-bottom: 0.25rem;
        }

        .nav-link {
          color: #6c757d;
          padding: 0.75rem 1.5rem;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          border-radius: 0;
        }

        .nav-link:hover {
          color: #333;
          background: #f8f9fa;
          border-right: 3px solid #6c757d;
        }

        .nav-link.active {
          color: #333;
          background: #e9ecef;
          border-right: 3px solid #333;
          font-weight: 600;
        }

        .nav-link i {
          width: 20px;
          text-align: center;
          margin-right: 0.75rem;
          font-size: 1rem;
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid #e9ecef;
          background: #f8f9fa;
        }

        .user-info {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: white;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .user-avatar {
          font-size: 1.5rem;
          margin-right: 0.75rem;
          color: #007bff;
          width: 40px;
          height: 40px;
          background: #e3f2fd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #bbdefb;
        }

        .user-details {
          flex: 1;
        }

        .user-name {
          font-weight: 600;
          margin-bottom: 0.25rem;
          font-size: 0.9rem;
          color: #333;
        }

        .user-email {
          font-size: 0.75rem;
          color: #6c757d;
          margin-bottom: 0.25rem;
        }

        .user-role {
          font-size: 0.65rem;
          color: #007bff;
          text-transform: uppercase;
          font-weight: 600;
          background: #e3f2fd;
          padding: 2px 6px;
          border-radius: 4px;
          display: inline-block;
          border: 1px solid #bbdefb;
        }

        .admin-main {
          flex: 1;
          margin-left: 280px;
          display: flex;
          flex-direction: column;
        }

        .admin-topbar {
          background: white;
          border-bottom: 1px solid #e9ecef;
          padding: 1.25rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .topbar-left {
          display: flex;
          align-items: center;
        }

        .page-title {
          margin: 0;
          font-size: 1.75rem;
          font-weight: 700;
          color: #333;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .topbar-right .btn {
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid #007bff;
        }

        .topbar-right .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
        }

        .user-dropdown .dropdown-toggle {
          background: none;
          border: none;
          color: #333;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          transition: all 0.3s ease;
          border: 1px solid #e9ecef;
        }

        .user-dropdown .dropdown-toggle:hover {
          background: #f8f9fa;
          border-color: #007bff;
        }

        .admin-content {
          flex: 1;
          padding: 2rem;
          background: #f8f9fa;
        }

        .sidebar-toggle {
          background: none;
          border: none;
          color: #333;
          font-size: 1.25rem;
          margin-right: 1rem;
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

          .admin-topbar {
            padding: 1rem;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .admin-content {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}