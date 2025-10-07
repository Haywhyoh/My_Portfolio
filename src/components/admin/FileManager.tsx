'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

interface FileItem {
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

interface FileManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  title?: string;
}

export default function FileManager({
  isOpen,
  onClose,
  onSelect,
  title = 'Select Image'
}: FileManagerProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadFiles();
    }
  }, [isOpen]);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/media?folder=portfolio/blog&limit=50');
      if (!response.ok) {
        throw new Error('Failed to fetch media files');
      }

      const result = await response.json();
      if (result.success) {
        setFiles(result.resources);
      } else {
        throw new Error('Failed to load media files');
      }
    } catch (error) {
      console.error('Error loading files:', error);
      toast.error('Failed to load files');
      // Fallback to empty array instead of mock data
      setFiles([]);
    } finally {
      setLoading(false);
    }
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
    });
  };

  const getFileName = (publicId: string) => {
    const parts = publicId.split('/');
    return parts[parts.length - 1];
  };

  const filteredFiles = files.filter(file =>
    getFileName(file.publicId).toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelect = () => {
    if (selectedFile) {
      onSelect(selectedFile);
      onClose();
    } else {
      toast.warning('Please select a file first');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="file-manager-overlay">
      <div className="file-manager-modal">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>

        <div className="modal-body">
          {/* Search */}
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* File Grid */}
          <div className="file-grid">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="text-center py-4 text-muted">
                <i className="fas fa-folder-open fa-3x mb-3"></i>
                <div>No files found</div>
                {searchQuery && (
                  <button
                    className="btn btn-sm btn-outline-secondary mt-2"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <div className="row g-3">
                {filteredFiles.map((file) => (
                  <div key={file.publicId} className="col-md-6 col-lg-4">
                    <div
                      className={`file-item ${selectedFile === file.url ? 'selected' : ''}`}
                      onClick={() => setSelectedFile(file.url)}
                    >
                      <div className="file-preview">
                        <Image
                          src={file.transformations.thumbnail}
                          alt={getFileName(file.publicId)}
                          className="file-image"
                          width={100}
                          height={100}
                          loading="lazy"
                        />
                        <div className="file-overlay">
                          <i className="fas fa-check-circle"></i>
                        </div>
                        <div className="file-info-overlay">
                          <div className="file-dimensions">
                            {file.width} × {file.height}
                          </div>
                          <div className="file-format">
                            {file.format.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <div className="file-info">
                        <div className="file-name" title={getFileName(file.publicId)}>
                          {getFileName(file.publicId)}
                        </div>
                        <div className="file-meta">
                          <span className="file-size">
                            {formatFileSize(file.size)}
                          </span>
                          <span className="file-date">
                            {formatDate(file.createdAt)}
                          </span>
                        </div>
                        {file.tags.length > 0 && (
                          <div className="file-tags">
                            {file.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="badge bg-secondary me-1">
                                {tag}
                              </span>
                            ))}
                            {file.tags.length > 2 && (
                              <span className="text-muted small">+{file.tags.length - 2}</span>
                            )}
                          </div>
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
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSelect}
            disabled={!selectedFile}
          >
            Select File
          </button>
        </div>
      </div>

      <style jsx>{`
        .file-manager-overlay {
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

        .file-manager-modal {
          background: white;
          border-radius: 8px;
          width: 100%;
          max-width: 800px;
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
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .file-grid {
          min-height: 200px;
        }

        .file-item {
          border: 2px solid #dee2e6;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }

        .file-item:hover {
          border-color: #0d6efd;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .file-item.selected {
          border-color: #0d6efd;
          box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
        }

        .file-preview {
          position: relative;
          height: 150px;
          overflow: hidden;
        }

        .file-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .file-overlay {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: rgba(13, 110, 253, 0.9);
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .file-item.selected .file-overlay,
        .file-item:hover .file-overlay {
          opacity: 1;
        }

        .file-info {
          padding: 0.75rem;
        }

        .file-name {
          font-weight: 500;
          margin-bottom: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.875rem;
        }

        .file-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #6c757d;
        }

        .file-info-overlay {
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

        .file-tags {
          margin-top: 0.5rem;
        }

        .file-tags .badge {
          font-size: 0.65rem;
        }

        @media (max-width: 768px) {
          .file-manager-modal {
            margin: 0.5rem;
            max-height: 95vh;
          }

          .modal-header,
          .modal-body,
          .modal-footer {
            padding: 1rem;
          }

          .file-preview {
            height: 120px;
          }
        }
      `}</style>
    </div>
  );
}