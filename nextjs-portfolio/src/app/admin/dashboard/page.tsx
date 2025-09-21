'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { blogApi } from '@/lib/blogApi';
import { BlogPost } from '@/lib/types';

interface DashboardStats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalViews: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalViews: 0
  });
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch all blogs for stats
      const allBlogsResponse = await blogApi.getBlogs({ limit: 100 });
      const blogs = allBlogsResponse.blogs;

      // Calculate stats
      const totalBlogs = blogs.length;
      const publishedBlogs = blogs.filter(blog => blog.isPublished).length;
      const draftBlogs = blogs.filter(blog => !blog.isPublished).length;
      const totalViews = blogs.reduce((sum, blog) => sum + (blog.viewCount || 0), 0);

      setStats({
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalViews
      });

      // Get recent blogs (last 5)
      setRecentBlogs(blogs.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="dashboard">
        {/* Welcome Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="welcome-card bg-primary text-white rounded p-4">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2 className="mb-2">Welcome to Your Dashboard</h2>
                  <p className="mb-0 opacity-75">
                    Manage your blog posts, monitor performance, and create engaging content.
                  </p>
                </div>
                <div className="col-md-4 text-md-end">
                  <Link href="/admin/blogs/new" className="btn btn-light">
                    <i className="fas fa-plus me-2"></i>
                    Create New Blog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-xl-3 col-md-6 mb-3">
            <div className="stats-card bg-white rounded p-4 h-100">
              <div className="d-flex align-items-center">
                <div className="stats-icon bg-primary text-white rounded-circle me-3">
                  <i className="fas fa-newspaper"></i>
                </div>
                <div>
                  <div className="stats-number">{stats.totalBlogs}</div>
                  <div className="stats-label">Total Blogs</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-3">
            <div className="stats-card bg-white rounded p-4 h-100">
              <div className="d-flex align-items-center">
                <div className="stats-icon bg-success text-white rounded-circle me-3">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div>
                  <div className="stats-number">{stats.publishedBlogs}</div>
                  <div className="stats-label">Published</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-3">
            <div className="stats-card bg-white rounded p-4 h-100">
              <div className="d-flex align-items-center">
                <div className="stats-icon bg-warning text-white rounded-circle me-3">
                  <i className="fas fa-edit"></i>
                </div>
                <div>
                  <div className="stats-number">{stats.draftBlogs}</div>
                  <div className="stats-label">Drafts</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-3">
            <div className="stats-card bg-white rounded p-4 h-100">
              <div className="d-flex align-items-center">
                <div className="stats-icon bg-info text-white rounded-circle me-3">
                  <i className="fas fa-eye"></i>
                </div>
                <div>
                  <div className="stats-number">{stats.totalViews.toLocaleString()}</div>
                  <div className="stats-label">Total Views</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Blogs */}
        <div className="row">
          {/* Quick Actions */}
          <div className="col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-bolt me-2"></i>
                  Quick Actions
                </h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <Link href="/admin/blogs/new" className="btn btn-primary">
                    <i className="fas fa-plus me-2"></i>
                    Create New Blog Post
                  </Link>
                  <Link href="/admin/blogs" className="btn btn-outline-primary">
                    <i className="fas fa-list me-2"></i>
                    Manage All Blogs
                  </Link>
                  <Link href="/admin/categories" className="btn btn-outline-secondary">
                    <i className="fas fa-tags me-2"></i>
                    Manage Categories
                  </Link>
                  <Link href="/admin/settings" className="btn btn-outline-secondary">
                    <i className="fas fa-cog me-2"></i>
                    Site Settings
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Blogs */}
          <div className="col-lg-8 mb-4">
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="fas fa-clock me-2"></i>
                  Recent Blog Posts
                </h5>
                <Link href="/admin/blogs" className="btn btn-sm btn-outline-primary">
                  View All
                </Link>
              </div>
              <div className="card-body">
                {recentBlogs.length === 0 ? (
                  <div className="text-center py-4 text-muted">
                    <i className="fas fa-newspaper fa-3x mb-3"></i>
                    <div>No blog posts yet</div>
                    <Link href="/admin/blogs/new" className="btn btn-primary btn-sm mt-2">
                      Create Your First Blog
                    </Link>
                  </div>
                ) : (
                  <div className="list-group list-group-flush">
                    {recentBlogs.map((blog) => (
                      <div key={blog.id} className="list-group-item px-0">
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <h6 className="mb-1">
                              <Link
                                href={`/admin/blogs/edit/${blog.id}`}
                                className="text-decoration-none"
                              >
                                {blog.title}
                              </Link>
                            </h6>
                            <p className="mb-1 text-muted small">
                              {blog.excerpt?.substring(0, 100)}...
                            </p>
                            <div className="d-flex align-items-center text-muted small">
                              <span className="me-3">
                                <i className="fas fa-user me-1"></i>
                                {blog.author}
                              </span>
                              <span className="me-3">
                                <i className="fas fa-eye me-1"></i>
                                {blog.viewCount || 0} views
                              </span>
                              <span className="me-3">
                                <i className="fas fa-clock me-1"></i>
                                {blog.readTime} min read
                              </span>
                            </div>
                          </div>
                          <div className="ms-3">
                            <span className={`badge ${blog.isPublished ? 'bg-success' : 'bg-warning'}`}>
                              {blog.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stats-card {
          border: 1px solid #dee2e6;
          transition: transform 0.2s ease;
        }

        .stats-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .stats-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stats-number {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2c3e50;
        }

        .stats-label {
          font-size: 0.875rem;
          color: #6c757d;
        }

        .welcome-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .card {
          border: 1px solid #dee2e6;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .list-group-item:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </AdminLayout>
  );
}