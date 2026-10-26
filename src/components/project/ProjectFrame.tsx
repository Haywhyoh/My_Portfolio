import Image from 'next/image';
import { isDeviceMockup } from '@/lib/projectsData';

interface ProjectFrameProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Aspect used when the file is a plain screenshot, not a device mockup. */
  fallbackClassName?: string;
  className?: string;
}

export default function ProjectFrame({
  src,
  alt,
  sizes,
  priority = false,
  fallbackClassName = 'tw-aspect-[16/10]',
  className = '',
}: ProjectFrameProps) {
  const mockup = isDeviceMockup(src);

  return (
    <div
      className={`tw-relative tw-w-full tw-overflow-hidden ${
        mockup ? 'tw-aspect-[3142/1804] tw-bg-black' : `tw-bg-ink-800 ${fallbackClassName}`
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={mockup ? 'tw-object-contain' : 'tw-object-cover tw-object-top'}
      />
    </div>
  );
}
