'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getOptimizedImageUrl, isCloudinaryUrl } from '@/lib/cloudinary';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  fill = false,
  style,
  quality = 80,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Determine if we should use Cloudinary optimization
  const isCloudinary = isCloudinaryUrl(src);

  // Generate optimized Cloudinary URL if applicable
  const optimizedSrc = isCloudinary
    ? getOptimizedImageUrl(extractPublicIdFromUrl(src), {
        width,
        height,
        quality: quality === 80 ? 'auto:good' : quality,
        format: 'auto',
        crop: 'limit',
      })
    : src;

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || (
    fill
      ? '100vw'
      : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  );

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
    onError?.();
  };

  // Fallback for broken images
  if (imageError) {
    return (
      <div
        className={`optimized-image-fallback ${className || ''}`}
        style={{
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
          ...style,
        }}
      >
        <div className="fallback-content">
          <i className="fas fa-image fa-2x text-muted"></i>
          <div className="text-muted small mt-2">Image not found</div>
        </div>

        <style jsx>{`
          .optimized-image-fallback {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 4px;
            position: relative;
          }

          .fallback-content {
            text-align: center;
            padding: 1rem;
          }
        `}</style>
      </div>
    );
  }

  // Render loading placeholder
  const LoadingPlaceholder = () => (
    <div
      className={`image-loading-placeholder ${className || ''}`}
      style={{
        width: fill ? '100%' : width,
        height: fill ? '100%' : height,
        ...style,
      }}
    >
      <div className="loading-spinner">
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>

      <style jsx>{`
        .image-loading-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8f9fa;
          border-radius: 4px;
          position: relative;
        }

        .loading-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );

  return (
    <div className="optimized-image-wrapper" style={{ position: 'relative' }}>
      {isLoading && placeholder === 'empty' && <LoadingPlaceholder />}

      <Image
        src={optimizedSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={className}
        priority={priority}
        sizes={responsiveSizes}
        style={style}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        unoptimized={!isCloudinary} // Let Cloudinary handle optimization for their URLs
      />
    </div>
  );
}

// Helper function to extract public ID from Cloudinary URL
function extractPublicIdFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');

    // Find the version index (if present)
    const versionIndex = pathParts.findIndex(part => part.startsWith('v') && /^\d+$/.test(part.substring(1)));

    // Public ID is everything after version (or after upload if no version)
    const startIndex = versionIndex !== -1 ? versionIndex + 1 : pathParts.indexOf('upload') + 1;
    const publicIdParts = pathParts.slice(startIndex);

    // Remove file extension from the last part
    if (publicIdParts.length > 0) {
      const lastPart = publicIdParts[publicIdParts.length - 1];
      publicIdParts[publicIdParts.length - 1] = lastPart.replace(/\.[^.]+$/, '');
    }

    return publicIdParts.join('/');
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return '';
  }
}

// Specialized component for blog thumbnails
export function BlogThumbnail({
  src,
  alt,
  className = '',
  ...props
}: Omit<OptimizedImageProps, 'width' | 'height'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={400}
      height={300}
      className={`blog-thumbnail ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+i+zPY32XbQ="
      {...props}
    />
  );
}

// Specialized component for blog featured images
export function BlogFeaturedImage({
  src,
  alt,
  className = '',
  ...props
}: Omit<OptimizedImageProps, 'width' | 'height'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1200}
      height={600}
      className={`blog-featured ${className}`}
      sizes="100vw"
      priority
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+i+zPY32XbQ="
      {...props}
    />
  );
}

// Specialized component for admin previews
export function AdminPreview({
  src,
  alt,
  className = '',
  ...props
}: Omit<OptimizedImageProps, 'width' | 'height'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={300}
      height={200}
      className={`admin-preview ${className}`}
      sizes="300px"
      {...props}
    />
  );
}