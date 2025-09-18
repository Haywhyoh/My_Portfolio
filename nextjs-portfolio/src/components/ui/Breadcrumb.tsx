'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Skip dynamic routes like [slug]
      if (segment.startsWith('[') && segment.endsWith(']')) {
        return;
      }

      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Don't add href to the last item (current page)
      const isLast = index === pathSegments.length - 1;
      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className={`breadcrumb ${className}`} aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {breadcrumbs.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {item.href ? (
              <Link href={item.href} className="breadcrumb-link">
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumb-current" aria-current="page">
                {item.label}
              </span>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className="breadcrumb-separator" aria-hidden="true">
                /
              </span>
            )}
          </li>
        ))}
      </ol>

      <style jsx>{`
        .breadcrumb {
          margin-bottom: 20px;
        }

        .breadcrumb-list {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          font-size: 14px;
        }

        .breadcrumb-item {
          display: flex;
          align-items: center;
        }

        .breadcrumb-link {
          color: #007bff;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .breadcrumb-link:hover {
          color: #0056b3;
          text-decoration: underline;
        }

        .breadcrumb-current {
          color: #6c757d;
          font-weight: 500;
        }

        .breadcrumb-separator {
          margin: 0 8px;
          color: #6c757d;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .breadcrumb {
            margin-bottom: 15px;
          }

          .breadcrumb-list {
            font-size: 13px;
          }

          .breadcrumb-separator {
            margin: 0 6px;
          }
        }

        @media (max-width: 480px) {
          .breadcrumb-list {
            font-size: 12px;
          }

          .breadcrumb-separator {
            margin: 0 4px;
          }
        }
      `}</style>
    </nav>
  );
}
