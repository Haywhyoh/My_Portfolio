'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdminLayout from '@/components/admin/AdminLayout';
import { blogApi } from '@/lib/blogApi';
import { BlogPost } from '@/lib/types';
import { toast } from 'react-toastify';

export default function BlogManagementPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBlogs, setSelectedBlogs] = useState<number[]>([]);

  const loadBlogs = useCallback(async () => {
    try {
      setIsLoading(true);

      const params: any = {
        page: currentPage,
        limit: 10,
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (filterStatus !== 'all') {
        params.published = filterStatus === 'published';
      }

      const response = await blogApi.getBlogs(params);
      setBlogs(response.blogs);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error('Error loading blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery, filterStatus]);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const handleDelete = async (blogId: number) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    try {
      await blogApi.deleteBlog(blogId);
      toast.success('Blog deleted successfully');
      loadBlogs(); // Reload the list
    } catch (error: any) {
      console.error('Error deleting blog:', error);
      toast.error(error.message || 'Failed to delete blog');
    }
  };

  const handleBulkAction = async (action: 'publish' | 'unpublish' | 'delete') => {
    if (selectedBlogs.length === 0) {
      toast.warning('Please select blogs first');
      return;
    }

    if (action === 'delete') {
      if (!confirm(`Are you sure you want to delete ${selectedBlogs.length} blog post(s)? This action cannot be undone.`)) {
        return;
      }
    }

    try {
      const promises = selectedBlogs.map(blogId => {
        switch (action) {
          case 'publish':
            return blogApi.publishBlog(blogId);
          case 'unpublish':
            return blogApi.unpublishBlog(blogId);
          case 'delete':
            return blogApi.deleteBlog(blogId);
          default:
            return Promise.resolve();
        }
      });

      await Promise.all(promises);

      toast.success(`${selectedBlogs.length} blog(s) ${action}${action === 'delete' ? 'd' : 'ed'} successfully`);
      setSelectedBlogs([]);
      loadBlogs();
    } catch (error: any) {
      console.error('Error with bulk action:', error);
      toast.error(error.message || 'Failed to perform bulk action');
    }
  };

  const toggleSelectBlog = (blogId: number) => {
    setSelectedBlogs(prev =>
      prev.includes(blogId)
        ? prev.filter(id => id !== blogId)
        : [...prev, blogId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedBlogs(
      selectedBlogs.length === blogs.length
        ? []
        : blogs.map(blog => blog.id)
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadBlogs();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <AdminLayout>
      <div className="blog-management">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Manage Blog Posts</h1>
          <Link href="/admin/blogs/new" className="btn btn-primary">
            <i className="fas fa-plus me-1"></i>
            New Blog Post
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row align-items-end">
              <div className="col-md-6">
                <form onSubmit={handleSearchSubmit}>
                  <label className="form-label">Search Blogs</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by title, content, or author..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="btn btn-outline-primary">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>

              <div className="col-md-3">
                <label className="form-label">Filter by Status</label>
                <select
                  className="form-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                >
                  <option value="all">All Posts</option>
                  <option value="published">Published</option>
                  <option value="draft">Drafts</option>
                </select>
              </div>

              <div className="col-md-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={() => {
                    setSearchQuery('');
                    setFilterStatus('all');
                    setCurrentPage(1);
                  }}
                >
                  <i className="fas fa-refresh me-1"></i>
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedBlogs.length > 0 && (
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <span className="text-muted">
                  {selectedBlogs.length} blog(s) selected
                </span>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success"
                    onClick={() => handleBulkAction('publish')}
                  >
                    <i className="fas fa-check me-1"></i>
                    Publish
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-warning"
                    onClick={() => handleBulkAction('unpublish')}
                  >
                    <i className="fas fa-pause me-1"></i>
                    Unpublish
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleBulkAction('delete')}
                  >
                    <i className="fas fa-trash me-1"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog List */}
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '40px' }}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedBlogs.length === blogs.length && blogs.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : blogs.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-muted">
                      <i className="fas fa-newspaper fa-3x mb-3"></i>
                      <div>No blog posts found</div>
                      <Link href="/admin/blogs/new" className="btn btn-primary btn-sm mt-2">
                        Create Your First Blog
                      </Link>
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr key={blog.id}>
                      <td>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedBlogs.includes(blog.id)}
                          onChange={() => toggleSelectBlog(blog.id)}
                        />
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          {blog.thumbnail && (
                            <Image
                              src={blog.thumbnail}
                              alt=""
                              width={40}
                              height={40}
                              className="me-2 rounded"
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                          )}
                          <div>
                            <Link
                              href={`/admin/blogs/edit/${blog.id}`}
                              className="text-decoration-none fw-medium"
                            >
                              {blog.title}
                            </Link>
                            {blog.excerpt && (
                              <div className="small text-muted">
                                {blog.excerpt.substring(0, 80)}...
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>{blog.author}</td>
                      <td>
                        <span className="badge bg-secondary">{blog.category}</span>
                      </td>
                      <td>
                        <span className={`badge ${blog.isPublished ? 'bg-success' : 'bg-warning'}`}>
                          {blog.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>
                        <span className="text-muted small">
                          <i className="fas fa-eye me-1"></i>
                          {blog.viewCount || 0}
                        </span>
                      </td>
                      <td className="text-muted small">
                        {formatDate(blog.publishedAt || blog.createdAt)}
                      </td>
                      <td>
                        <div className="btn-group">
                          <Link
                            href={`/admin/blogs/edit/${blog.id}`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="fas fa-edit"></i>
                          </Link>
                          {blog.isPublished && (
                            <Link
                              href={`/blog/${blog.slug}`}
                              className="btn btn-sm btn-outline-secondary"
                              target="_blank"
                            >
                              <i className="fas fa-external-link-alt"></i>
                            </Link>
                          )}
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(blog.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  return (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    </li>
                  );
                })}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}