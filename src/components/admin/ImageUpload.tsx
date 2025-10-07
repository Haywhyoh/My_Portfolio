'use client';

import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentImage?: string;
  label?: string;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

interface CloudinaryUploadResponse {
  success: boolean;
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  size: number;
  filename: string;
  type: string;
  createdAt: string;
  transformations: {
    original: string;
    thumbnail: string;
    preview: string;
    banner: string;
    responsive: Record<string, string>;
  };
  thumbnail: string;
  preview: string;
  responsive: Record<string, string>;
}

export default function ImageUpload({
  onUpload,
  currentImage,
  label = 'Upload Image',
  accept = 'image/*',
  maxSize = 5,
  className = ''
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size
    const maxBytes = maxSize * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result: CloudinaryUploadResponse = await response.json();

      if (result.success) {
        onUpload(result.url);
        toast.success(`Image uploaded successfully! (${formatFileSize(result.size)}, ${result.width}x${result.height})`);
      } else {
        throw new Error('Upload failed');
      }

    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`image-upload ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        disabled={uploading}
      />

      <div
        className={`upload-area ${dragOver ? 'drag-over' : ''} ${uploading ? 'uploading' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {currentImage && !uploading ? (
          <div className="current-image">
            <Image src={currentImage} alt="Current" className="preview-image" width={200} height={200} />
            <div className="image-overlay">
              <div className="overlay-content">
                <i className="fas fa-edit fa-2x mb-2"></i>
                <div>Click to change image</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="upload-placeholder">
            {uploading ? (
              <div className="uploading-state">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Uploading...</span>
                </div>
                <div className="text-muted">Uploading image...</div>
              </div>
            ) : (
              <div className="empty-state">
                <i className="fas fa-cloud-upload-alt fa-3x text-muted mb-3"></i>
                <div className="h6 mb-2">{label}</div>
                <div className="text-muted small mb-2">
                  Drag and drop an image here, or click to select
                </div>
                <div className="text-muted small">
                  Supports: JPEG, PNG, GIF, WebP (max {maxSize}MB)
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .upload-area {
          border: 2px dashed #dee2e6;
          border-radius: 8px;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f8f9fa;
          position: relative;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-area:hover {
          border-color: #0d6efd;
          background: #f0f8ff;
        }

        .upload-area.drag-over {
          border-color: #0d6efd;
          background: #e3f2fd;
          transform: scale(1.02);
        }

        .upload-area.uploading {
          cursor: not-allowed;
          opacity: 0.8;
        }

        .current-image {
          position: relative;
          width: 100%;
          height: 200px;
          border-radius: 6px;
          overflow: hidden;
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .image-overlay {
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

        .current-image:hover .image-overlay {
          opacity: 1;
        }

        .overlay-content {
          text-align: center;
        }

        .empty-state,
        .uploading-state {
          width: 100%;
        }

        .upload-placeholder {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .upload-area {
            padding: 1.5rem 1rem;
            min-height: 150px;
          }

          .current-image {
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
}