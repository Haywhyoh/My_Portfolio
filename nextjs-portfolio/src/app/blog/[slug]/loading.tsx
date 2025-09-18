export default function BlogDetailLoading() {
  return (
    <div className="blog-detail-loading">
      {/* Hero Section Skeleton */}
      <div className="blog-hero-skeleton">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="skeleton-hero-image"></div>
              <div className="skeleton-hero-content">
                <div className="skeleton-meta"></div>
                <div className="skeleton-title"></div>
                <div className="skeleton-excerpt"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="blog-content-skeleton">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="skeleton-content">
                <div className="skeleton-paragraph"></div>
                <div className="skeleton-paragraph"></div>
                <div className="skeleton-paragraph"></div>
                <div className="skeleton-paragraph"></div>
                <div className="skeleton-paragraph"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
