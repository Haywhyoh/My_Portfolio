'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PaginationProps } from '@/lib/types';
import { generatePaginationUrl } from '@/lib/pagination';

const BlogPagination = ({
  currentPage,
  totalPages,
  basePath,
  maxPageButtons = 5,
  showInfo = true
}: PaginationProps) => {
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  // Calculate visible pages
  const halfRange = Math.floor(maxPageButtons / 2);
  let startPage = Math.max(1, currentPage - halfRange);
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage + 1 < maxPageButtons && totalPages >= maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const generateUrl = (page: number) => generatePaginationUrl(basePath, page, searchParams);

  return (
    <div className="blog-pagination-wrapper">
      {showInfo && (
        <div className="pagination-info text-center mb-3">
          <p className="text-muted">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      )}

      <nav aria-label="Blog pagination" className="pagination-nav">
        <ul className="pagination justify-content-center">
          {/* Previous Button */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            {currentPage === 1 ? (
              <span className="page-link">
                <i className="fas fa-angle-double-left"></i>
              </span>
            ) : (
              <Link href={generateUrl(currentPage - 1)} className="page-link">
                <i className="fas fa-angle-double-left"></i>
              </Link>
            )}
          </li>

          {/* First page if not visible */}
          {startPage > 1 && (
            <>
              <li className="page-item">
                <Link href={generateUrl(1)} className="page-link">
                  1
                </Link>
              </li>
              {startPage > 2 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
            </>
          )}

          {/* Visible page numbers */}
          {visiblePages.map((pageNum) => (
            <li
              key={pageNum}
              className={`page-item ${currentPage === pageNum ? 'active' : ''}`}
            >
              {currentPage === pageNum ? (
                <span className="page-link">{pageNum}</span>
              ) : (
                <Link href={generateUrl(pageNum)} className="page-link">
                  {pageNum}
                </Link>
              )}
            </li>
          ))}

          {/* Last page if not visible */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
              <li className="page-item">
                <Link href={generateUrl(totalPages)} className="page-link">
                  {totalPages}
                </Link>
              </li>
            </>
          )}

          {/* Next Button */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            {currentPage === totalPages ? (
              <span className="page-link">
                <i className="fas fa-angle-double-right"></i>
              </span>
            ) : (
              <Link href={generateUrl(currentPage + 1)} className="page-link">
                <i className="fas fa-angle-double-right"></i>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BlogPagination;