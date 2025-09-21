import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  created_at: string;
  resource_type: string;
  folder?: string;
}

export interface UploadOptions {
  folder?: string;
  transformation?: Array<{
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
  }>;
  tags?: string[];
  overwrite?: boolean;
}

/**
 * Upload an image to Cloudinary
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: options.folder || 'blog',
      transformation: options.transformation || [
        { width: 1200, height: 800, crop: 'limit', quality: 'auto:good', format: 'webp' }
      ],
      tags: options.tags || ['blog', 'portfolio'],
      overwrite: options.overwrite || false,
      resource_type: 'image' as const,
      use_filename: true,
      unique_filename: true,
    };

    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result as CloudinaryUploadResult);
        } else {
          reject(new Error('Upload failed - no result returned'));
        }
      }
    ).end(fileBuffer);
  });
}

/**
 * Delete an image from Cloudinary
 */
export async function deleteFromCloudinary(publicId: string): Promise<any> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
}

/**
 * Get optimized image URL from Cloudinary
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'limit' | 'scale' | 'crop' | 'pad';
    quality?: 'auto' | 'auto:low' | 'auto:good' | 'auto:best' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west';
  } = {}
): string {
  const {
    width,
    height,
    crop = 'limit',
    quality = 'auto:good',
    format = 'auto',
    gravity = 'auto'
  } = options;

  return cloudinary.url(publicId, {
    width,
    height,
    crop,
    quality,
    format,
    gravity,
    secure: true,
    fetch_format: 'auto',
    dpr: 'auto',
  });
}

/**
 * Generate responsive image URLs for different screen sizes
 */
export function getResponsiveImageUrls(publicId: string) {
  const sizes = [
    { width: 400, height: 300, suffix: 'sm' },
    { width: 800, height: 600, suffix: 'md' },
    { width: 1200, height: 900, suffix: 'lg' },
    { width: 1600, height: 1200, suffix: 'xl' },
  ];

  return sizes.reduce((acc, size) => {
    acc[size.suffix] = getOptimizedImageUrl(publicId, {
      width: size.width,
      height: size.height,
      crop: 'fill',
      quality: 'auto:good',
      format: 'auto',
    });
    return acc;
  }, {} as Record<string, string>);
}

/**
 * Get thumbnail URL
 */
export function getThumbnailUrl(
  publicId: string,
  size: 'small' | 'medium' | 'large' = 'medium'
): string {
  const sizes = {
    small: { width: 150, height: 150 },
    medium: { width: 300, height: 300 },
    large: { width: 500, height: 500 },
  };

  return getOptimizedImageUrl(publicId, {
    ...sizes[size],
    crop: 'fill',
    quality: 'auto:good',
    format: 'auto',
  });
}

/**
 * Search images in Cloudinary
 */
export async function searchImages(options: {
  folder?: string;
  tags?: string[];
  maxResults?: number;
  nextCursor?: string;
} = {}) {
  try {
    const searchQuery = [];

    if (options.folder) {
      searchQuery.push(`folder:${options.folder}`);
    }

    if (options.tags && options.tags.length > 0) {
      searchQuery.push(`tags:${options.tags.join(' OR tags:')}`);
    }

    const result = await cloudinary.search
      .expression(searchQuery.join(' AND ') || 'resource_type:image')
      .sort_by([['created_at', 'desc']])
      .max_results(options.maxResults || 20)
      .next_cursor(options.nextCursor)
      .execute();

    return {
      resources: result.resources,
      nextCursor: result.next_cursor,
      totalCount: result.total_count,
    };
  } catch (error) {
    console.error('Error searching images:', error);
    throw error;
  }
}

/**
 * Generate image transformations for the admin interface
 */
export function getImageTransformations(publicId: string) {
  return {
    original: getOptimizedImageUrl(publicId),
    thumbnail: getThumbnailUrl(publicId, 'small'),
    preview: getOptimizedImageUrl(publicId, { width: 800, height: 600, crop: 'fit' }),
    banner: getOptimizedImageUrl(publicId, { width: 1200, height: 400, crop: 'fill' }),
    responsive: getResponsiveImageUrls(publicId),
  };
}

/**
 * Extract public ID from Cloudinary URL
 */
export function extractPublicId(cloudinaryUrl: string): string | null {
  try {
    const url = new URL(cloudinaryUrl);
    const pathParts = url.pathname.split('/');

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
    return null;
  }
}

/**
 * Validate if URL is a Cloudinary URL
 */
export function isCloudinaryUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('cloudinary.com');
  } catch {
    return false;
  }
}

export { cloudinary };