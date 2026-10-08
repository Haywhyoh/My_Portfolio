'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from '@/lib/types';
import { generatePaginationUrl } from '@/lib/pagination';

const BlogPagination = ({
  currentPage,
  totalPages,
  basePath,
  maxPageButtons = 5,
}: PaginationProps) => {
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const halfRange = Math.floor(maxPageButtons / 2);
  let startPage = Math.max(1, currentPage - halfRange);
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage + 1 < maxPageButtons && totalPages >= maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  const generateUrl = (page: number) => generatePaginationUrl(basePath, page, searchParams);

  const itemClass = (active?: boolean, disabled?: boolean) =>
    `tw-inline-flex tw-h-10 tw-min-w-10 tw-items-center tw-justify-center tw-rounded-full tw-px-3 tw-text-sm tw-transition-colors ${
      disabled
        ? 'tw-pointer-events-none tw-text-mist-400/40'
        : active
          ? 'tw-bg-accent-500 tw-text-white'
          : 'tw-text-mist-300 hover:tw-bg-white/10 hover:tw-text-white'
    }`;

  return (
    <nav aria-label="Blog pagination" className="tw-mt-12 tw-flex tw-items-center tw-justify-center tw-gap-1">
      {currentPage === 1 ? (
        <span className={itemClass(false, true)}>
          <ChevronLeft className="tw-h-4 tw-w-4" />
        </span>
      ) : (
        <Link href={generateUrl(currentPage - 1)} className={itemClass()}>
          <ChevronLeft className="tw-h-4 tw-w-4" />
        </Link>
      )}

      {visiblePages.map((pageNum) => (
        <Link key={pageNum} href={generateUrl(pageNum)} className={itemClass(pageNum === currentPage)}>
          {pageNum}
        </Link>
      ))}

      {currentPage === totalPages ? (
        <span className={itemClass(false, true)}>
          <ChevronRight className="tw-h-4 tw-w-4" />
        </span>
      ) : (
        <Link href={generateUrl(currentPage + 1)} className={itemClass()}>
          <ChevronRight className="tw-h-4 tw-w-4" />
        </Link>
      )}
    </nav>
  );
};

export default BlogPagination;
