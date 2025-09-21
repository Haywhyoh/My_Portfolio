'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import AdminLayout from '@/components/admin/AdminLayout';
import { blogApi } from '@/lib/blogApi';
import { BlogPost, UpdateBlogRequest } from '@/lib/types';
import { toast } from 'react-toastify';

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  thumbnail: string;
  featuredImage: string;
  tags: string[];
  category: string;
  seoTitle: string;
  seoDescription: string;
  isPublished: boolean;
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = parseInt(params.id as string);

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    thumbnail: '',
    featuredImage: '',
    tags: [],
    category: '',
    seoTitle: '',
    seoDescription: '',
    isPublished: false,
  });

  const [tagInput, setTagInput] = useState('');

  // Quill editor configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'indent',
    'link', 'image', 'video', 'blockquote', 'code-block', 'align'
  ];

  useEffect(() => {
    if (blogId) {
      loadBlog();
    }
  }, [blogId]);

  const loadBlog = async () => {
    try {
      setIsLoading(true);
      const blogData = await blogApi.getBlog(blogId);
      setBlog(blogData);

      // Populate form data
      setFormData({
        title: blogData.title,
        excerpt: blogData.excerpt || '',
        content: blogData.content,
        author: blogData.author,
        thumbnail: blogData.thumbnail || '',
        featuredImage: blogData.featuredImage || '',
        tags: blogData.tags,
        category: blogData.category,
        seoTitle: blogData.seoTitle || '',
        seoDescription: blogData.seoDescription || '',
        isPublished: blogData.isPublished,
      });
    } catch (error: any) {
      console.error('Error loading blog:', error);
      toast.error('Failed to load blog');
      router.push('/admin/blogs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof BlogFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (action: 'draft' | 'publish') => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    setIsSaving(true);

    try {
      const updateData: UpdateBlogRequest = {
        ...formData,
        isPublished: action === 'publish',
        publishedAt: action === 'publish' && !blog?.publishedAt ? new Date().toISOString() : undefined,
      };

      const updatedBlog = await blogApi.updateBlog(blogId, updateData);
      setBlog(updatedBlog);

      toast.success(`Blog ${action === 'publish' ? 'published' : 'saved as draft'} successfully!`);
    } catch (error: any) {
      console.error('Error updating blog:', error);
      toast.error(error.message || 'Failed to update blog');
    } finally {
      setIsSaving(false);
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

  if (!blog) {
    return (
      <AdminLayout>
        <div className="text-center">
          <h3>Blog not found</h3>
          <p>The blog post you're looking for doesn't exist.</p>
          <button onClick={() => router.push('/admin/blogs')} className="btn btn-primary">
            Back to Blogs
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="edit-blog-page">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 mb-0">Edit Blog Post</h1>
            <div className="text-muted small">
              Created: {new Date(blog.createdAt).toLocaleString()}
              {blog.publishedAt && (
                <> • Published: {new Date(blog.publishedAt).toLocaleString()}</>
              )}
            </div>
          </div>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => router.push('/admin/blogs')}
              disabled={isSaving}
            >
              <i className="fas fa-arrow-left me-1"></i>
              Back to List
            </button>
            {blog.isPublished && (
              <a
                href={`/blog/${blog.slug}`}
                target="_blank"
                className="btn btn-outline-info"
              >
                <i className="fas fa-external-link-alt me-1"></i>
                View Live
              </a>
            )}
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => handleSubmit('draft')}
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="spinner-border spinner-border-sm me-1"></span>
              ) : (
                <i className="fas fa-save me-1"></i>
              )}
              Save Draft
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSubmit('publish')}
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="spinner-border spinner-border-sm me-1"></span>
              ) : (
                <i className="fas fa-publish me-1"></i>
              )}
              {formData.isPublished ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            {/* Main Content */}
            <div className="card">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'content' ? 'active' : ''}`}
                      onClick={() => setActiveTab('content')}
                    >
                      <i className="fas fa-edit me-1"></i>
                      Content
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'seo' ? 'active' : ''}`}
                      onClick={() => setActiveTab('seo')}
                    >
                      <i className="fas fa-search me-1"></i>
                      SEO
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                      onClick={() => setActiveTab('settings')}
                    >
                      <i className="fas fa-cog me-1"></i>
                      Settings
                    </button>
                  </li>
                </ul>
              </div>

              <div className="card-body">
                {activeTab === 'content' && (
                  <div className="content-tab">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter blog title..."
                        disabled={isSaving}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="excerpt" className="form-label">
                        Excerpt
                      </label>
                      <textarea
                        className="form-control"
                        id="excerpt"
                        rows={3}
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                        placeholder="Brief description of the blog post..."
                        disabled={isSaving}
                      />
                      <div className="form-text">
                        This will be shown in blog listings and social media previews.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Content <span className="text-danger">*</span>
                      </label>
                      <div className="quill-wrapper">
                        <ReactQuill
                          value={formData.content}
                          onChange={(value) => handleInputChange('content', value)}
                          modules={quillModules}
                          formats={quillFormats}
                          placeholder="Write your blog content here..."
                          readOnly={isSaving}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'seo' && (
                  <div className="seo-tab">
                    <div className="mb-3">
                      <label htmlFor="seoTitle" className="form-label">
                        SEO Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="seoTitle"
                        value={formData.seoTitle}
                        onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                        placeholder="SEO optimized title..."
                        disabled={isSaving}
                      />
                      <div className="form-text">
                        {formData.seoTitle.length}/60 characters recommended
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="seoDescription" className="form-label">
                        SEO Description
                      </label>
                      <textarea
                        className="form-control"
                        id="seoDescription"
                        rows={3}
                        value={formData.seoDescription}
                        onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                        placeholder="SEO meta description..."
                        disabled={isSaving}
                      />
                      <div className="form-text">
                        {formData.seoDescription.length}/160 characters recommended
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">URL Slug</label>
                      <input
                        type="text"
                        className="form-control"
                        value={blog.slug}
                        disabled
                        readOnly
                      />
                      <div className="form-text">
                        URL: /blog/{blog.slug}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="settings-tab">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="author" className="form-label">
                          Author
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="author"
                          value={formData.author}
                          onChange={(e) => handleInputChange('author', e.target.value)}
                          disabled={isSaving}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="category" className="form-label">
                          Category
                        </label>
                        <select
                          className="form-select"
                          id="category"
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          disabled={isSaving}
                        >
                          <option value="Technology">Technology</option>
                          <option value="Development">Development</option>
                          <option value="Design">Design</option>
                          <option value="Programming">Programming</option>
                          <option value="Tutorial">Tutorial</option>
                          <option value="General">General</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="thumbnail" className="form-label">
                        Thumbnail URL
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        id="thumbnail"
                        value={formData.thumbnail}
                        onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        disabled={isSaving}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="featuredImage" className="form-label">
                        Featured Image URL
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        id="featuredImage"
                        value={formData.featuredImage}
                        onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                        placeholder="https://example.com/featured-image.jpg"
                        disabled={isSaving}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Tags</label>
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                          placeholder="Add a tag..."
                          disabled={isSaving}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={handleAddTag}
                          disabled={isSaving}
                        >
                          Add
                        </button>
                      </div>
                      <div className="tags-display">
                        {formData.tags.map((tag, index) => (
                          <span key={index} className="badge bg-primary me-1 mb-1">
                            {tag}
                            <button
                              type="button"
                              className="btn-close btn-close-white ms-1"
                              onClick={() => handleRemoveTag(tag)}
                              disabled={isSaving}
                            ></button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {/* Sidebar */}
            <div className="card">
              <div className="card-header">
                <h6 className="mb-0">
                  <i className="fas fa-info-circle me-1"></i>
                  Blog Information
                </h6>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isPublished"
                      checked={formData.isPublished}
                      onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                      disabled={isSaving}
                    />
                    <label className="form-check-label" htmlFor="isPublished">
                      Published
                    </label>
                  </div>
                </div>

                <div className="blog-stats">
                  <div className="stat-item">
                    <strong>ID:</strong>
                    <span className="ms-1">{blog.id}</span>
                  </div>
                  <div className="stat-item">
                    <strong>Views:</strong>
                    <span className="ms-1">{blog.viewCount || 0}</span>
                  </div>
                  <div className="stat-item">
                    <strong>Word Count:</strong>
                    <span className="ms-1">
                      {formData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length}
                    </span>
                  </div>
                  <div className="stat-item">
                    <strong>Read Time:</strong>
                    <span className="ms-1">
                      {Math.max(1, Math.ceil(formData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length / 200))} min
                    </span>
                  </div>
                  <div className="stat-item">
                    <strong>Category:</strong>
                    <span className="ms-1">{formData.category}</span>
                  </div>
                  <div className="stat-item">
                    <strong>Tags:</strong>
                    <span className="ms-1">{formData.tags.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            {formData.thumbnail && (
              <div className="card mt-3">
                <div className="card-header">
                  <h6 className="mb-0">
                    <i className="fas fa-image me-1"></i>
                    Thumbnail Preview
                  </h6>
                </div>
                <div className="card-body p-0">
                  <img
                    src={formData.thumbnail}
                    alt="Thumbnail"
                    className="img-fluid"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .quill-wrapper {
          border: 1px solid #dee2e6;
          border-radius: 0.375rem;
        }

        .quill-wrapper .ql-editor {
          min-height: 300px;
        }

        .tags-display {
          min-height: 40px;
        }

        .blog-stats .stat-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .nav-tabs .nav-link {
          border: none;
          color: #6c757d;
        }

        .nav-tabs .nav-link.active {
          background-color: transparent;
          border-bottom: 2px solid #0d6efd;
          color: #0d6efd;
        }
      `}</style>
    </AdminLayout>
  );
}