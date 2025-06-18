'use client';

const BlogV1 = () => {
    return (
        <>
            <div id="blog" className="blog-area home-blog default-padding bottom-less">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Blog Insight</h4>
                                <h2 className="title">Valuable insights to change your startup idea</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {/* Blog Item 1 */}
                        <div className="col-xl-4 col-md-6 col-lg-6 mb-30">
                            <div className="blog-item">
                                <img src="/assets/img/blog/1.jpg" alt="Blog Post 1" />
                                <div className="blog-content">
                                    <h4>Understanding React Hooks</h4>
                                    <p>A comprehensive guide to React Hooks and how they can improve your development workflow.</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Blog Item 2 */}
                        <div className="col-xl-4 col-md-6 col-lg-6 mb-30">
                            <div className="blog-item">
                                <img src="/assets/img/blog/2.jpg" alt="Blog Post 2" />
                                <div className="blog-content">
                                    <h4>Next.js Best Practices</h4>
                                    <p>Learn the best practices for building scalable applications with Next.js framework.</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Blog Item 3 */}
                        <div className="col-xl-4 col-md-6 col-lg-6 mb-30">
                            <div className="blog-item">
                                <img src="/assets/img/blog/3.jpg" alt="Blog Post 3" />
                                <div className="blog-content">
                                    <h4>Full-Stack Development Tips</h4>
                                    <p>Essential tips for becoming a successful full-stack developer in 2024.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogV1; 