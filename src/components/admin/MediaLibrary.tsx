'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ImageUpload from './ImageUpload';
import { OptimizedImage } from '@/components/OptimizedImage';

interface MediaItem {
  publicId: string;
  url: string;
  width: number;
  height: number;
  format: string;
  size: number;
  createdAt: string;
  folder: string;
  tags: string[];
  transformations: {
    original: string;
    thumbnail: string;
    preview: string;
    banner: string;
    responsive: Record<string, string>;
  };
}

interface MediaLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (url: string) => void;
  allowUpload?: boolean;
  allowDelete?: boolean;
  selectionMode?: 'single' | 'multiple';
  title?: string;
}

export default function MediaLibrary({
  isOpen,
  onClose,
  onSelect,
  allowUpload = true,
  allowDelete = true,
  selectionMode = 'single',
  title = 'Media Library'
}: MediaLibraryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'size' | 'name'>('date');
  const [filterByTag, setFilterByTag] = useState<string>('');
  const [showUploadArea, setShowUploadArea] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen]);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/media?folder=portfolio/blog&limit=100');
      if (!response.ok) {
        throw new Error('Failed to fetch media files');
      }

      const result = await response.json();
      if (result.success) {
        setMedia(result.resources);
      } else {
        throw new Error('Failed to load media files');
      }
    } catch (error) {
      console.error('Error loading media:', error);
      toast.error('Failed to load media files');
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (publicId: string) => {
    if (!confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch('/api/media', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      toast.success('Image deleted successfully');
      loadMedia(); // Reload the media list
    } catch (error: any) {
      console.error('Error deleting image:', error);
      toast.error(error.message || 'Failed to delete image');
    }
  };

  const handleUpload = (url: string) => {
    toast.success('Image uploaded successfully!');
    loadMedia(); // Reload to show the new image
    setShowUploadArea(false);
  };

  const handleSelectItem = (url: string) => {
    if (selectionMode === 'single') {
      setSelectedItems([url]);
    } else {
      setSelectedItems(prev =>
        prev.includes(url)
          ? prev.filter(item => item !== url)
          : [...prev, url]
      );
    }
  };

  const handleConfirmSelection = () => {
    if (selectedItems.length === 0) {
      toast.warning('Please select at least one image');
      return;
    }

    if (onSelect) {
      if (selectionMode === 'single') {
        onSelect(selectedItems[0]);
      } else {
        // For multiple selection, you might want to handle this differently
        onSelect(selectedItems[0]);
      }
    }
    onClose();
  };

  const getFileName = (publicId: string) => {
    const parts = publicId.split('/');
    return parts[parts.length - 1];
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filter and sort media
  const filteredMedia = media
    .filter(item => {
      const matchesSearch = getFileName(item.publicId).toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = !filterByTag || item.tags.includes(filterByTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'size':
          return b.size - a.size;
        case 'name':
          return getFileName(a.publicId).localeCompare(getFileName(b.publicId));
        default:
          return 0;
      }
    });

  // Get unique tags
  const allTags = Array.from(new Set(media.flatMap(item => item.tags))).sort();

  if (!isOpen) return null;

  return (
    <div className="media-library-overlay">
      <div className="media-library-modal">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>

        <div className="modal-body">
          {/* Toolbar */}
          <div className="media-toolbar mb-4">
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search images..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-2">
                <select
                  className="form-select"
                  value={filterByTag}
                  onChange={(e) => setFilterByTag(e.target.value)}
                >
                  <option value="">All Tags</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-2">
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="size">Sort by Size</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>

              <div className="col-md-2">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <i className="fas fa-th"></i>
                  </button>
                  <button
                    type="button"
                    className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <i className="fas fa-list"></i>
                  </button>
                </div>
              </div>

              <div className="col-md-2">
                {allowUpload && (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setShowUploadArea(!showUploadArea)}
                  >
                    <i className="fas fa-plus me-1"></i>
                    Upload
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Upload Area */}
          {showUploadArea && allowUpload && (
            <div className="upload-section mb-4">
              <div className="card">
                <div className="card-body">
                  <ImageUpload onUpload={handleUpload} label="Upload New Image" />
                </div>
              </div>
            </div>
          )}

          {/* Media Grid/List */}
          <div className="media-content">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="mt-2">Loading media...</div>
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <i className="fas fa-images fa-3x mb-3"></i>
                <div>No images found</div>
                {searchQuery && (
                  <button
                    className="btn btn-sm btn-outline-secondary mt-2"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : viewMode === 'grid' ? (
              <div className="row g-3">
                {filteredMedia.map((item) => (
                  <div key={item.publicId} className="col-xl-2 col-lg-3 col-md-4 col-6">
                    <div
                      className={`media-item ${selectedItems.includes(item.url) ? 'selected' : ''}`}
                      onClick={() => handleSelectItem(item.url)}
                    >
                      <div className="media-preview">
                        <OptimizedImage
                          src={item.transformations.thumbnail}
                          alt={getFileName(item.publicId)}
                          width={200}
                          height={150}
                          className="media-image"
                        />
                        <div className="media-overlay">
                          <div className="overlay-actions">
                            {selectedItems.includes(item.url) && (
                              <i className="fas fa-check-circle selected-icon"></i>
                            )}
                            {allowDelete && (
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(item.publicId);
                                }}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="media-info-overlay">
                          <div className="file-dimensions">
                            {item.width} × {item.height}
                          </div>
                          <div className="file-format">
                            {item.format.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <div className="media-info">
                        <div className="media-name" title={getFileName(item.publicId)}>
                          {getFileName(item.publicId)}
                        </div>
                        <div className="media-meta">
                          <span className="file-size">{formatFileSize(item.size)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="media-list">
                {filteredMedia.map((item) => (
                  <div
                    key={item.publicId}
                    className={`media-list-item ${selectedItems.includes(item.url) ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(item.url)}
                  >
                    <div className="d-flex align-items-center">
                      <div className="media-thumbnail me-3">
                        <OptimizedImage
                          src={item.transformations.thumbnail}
                          alt={getFileName(item.publicId)}
                          width={60}
                          height={60}
                          className="rounded"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-medium">{getFileName(item.publicId)}</div>
                        <div className="text-muted small">
                          {item.width} × {item.height} • {formatFileSize(item.size)} • {formatDate(item.createdAt)}
                        </div>
                        <div className="mt-1">
                          {item.tags.map(tag => (
                            <span key={tag} className="badge bg-secondary me-1">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="media-actions">
                        {selectedItems.includes(item.url) && (
                          <i className="fas fa-check-circle text-primary me-2"></i>
                        )}
                        {allowDelete && (
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item.publicId);
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="text-muted">
              {selectedItems.length > 0 && (
                <span>{selectedItems.length} item(s) selected</span>
              )}
            </div>
            <div>
              <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                Cancel
              </button>
              {onSelect && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirmSelection}
                  disabled={selectedItems.length === 0}
                >
                  Select
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .media-library-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
          padding: 1rem;
        }

        .media-library-modal {
          background: white;
          border-radius: 8px;
          width: 100%;
          max-width: 1200px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid #dee2e6;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .modal-body {
          padding: 1.5rem;
          flex: 1;
          overflow-y: auto;
        }

        .modal-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid #dee2e6;
        }

        .media-item {
          border: 2px solid #dee2e6;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }

        .media-item:hover {
          border-color: #0d6efd;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .media-item.selected {
          border-color: #0d6efd;
          box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
        }

        .media-preview {
          position: relative;
          height: 150px;
          overflow: hidden;
        }

        .media-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .media-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .media-item:hover .media-overlay {
          opacity: 1;
        }

        .media-item.selected .media-overlay {
          opacity: 1;
          background: rgba(13, 110, 253, 0.8);
        }

        .overlay-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .selected-icon {
          font-size: 2rem;
          color: white;
        }

        .media-info-overlay {
          position: absolute;
          bottom: 0.5rem;
          left: 0.5rem;
          display: flex;
          gap: 0.25rem;
        }

        .file-dimensions,
        .file-format {
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .media-info {
          padding: 0.75rem;
        }

        .media-name {
          font-weight: 500;
          margin-bottom: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.875rem;
        }

        .media-meta {
          font-size: 0.75rem;
          color: #6c757d;
        }

        .media-list-item {
          padding: 1rem;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          margin-bottom: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .media-list-item:hover {
          border-color: #0d6efd;
          background-color: #f8f9fa;
        }

        .media-list-item.selected {
          border-color: #0d6efd;
          background-color: #e3f2fd;
        }

        @media (max-width: 768px) {
          .media-library-modal {
            margin: 0.5rem;
            max-height: 95vh;
          }

          .modal-header,
          .modal-body,
          .modal-footer {
            padding: 1rem;
          }

          .media-preview {
            height: 120px;
          }
        }
      `}</style>
    </div>
  );
}