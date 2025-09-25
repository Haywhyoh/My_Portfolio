'use client';

import { useState, useEffect } from 'react';
import SingleBlogV1 from './SingleBlogV1';
import { BlogPost } from '@/lib/types';

const BlogV1 = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/blogs?limit=3&published=true');

                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }

                const data = await response.json();

                // Transform API data to match component expectations and add animation delays
                const transformedBlogs = data.blogs.slice(0, 6).map((blog: BlogPost, index: number) => ({
                    ...blog,
                    thumb: blog.thumbnail,
                    tag: blog.category,
                    date: blog.date || new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    animationDelay: `${index * 0.1}s`
                }));

                setBlogs(transformedBlogs);
                setError(null);
            } catch (err) {
                console.error('Error fetching blogs:', err);
                setError('Failed to load blog posts');
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
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
                        {[...Array(6)].map((_, index) => (
                            <div className="col-xl-4 col-md-6 col-lg-6 mb-30" key={index}>
                                <div className="home-blog-style-one-item">
                                    <div className="home-blog-thumb">
                                        <div className="skeleton-loader" style={{ height: '200px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}></div>
                                    </div>
                                    <div className="content">
                                        <div className="skeleton-loader" style={{ height: '20px', backgroundColor: '#f0f0f0', marginBottom: '10px', width: '60%' }}></div>
                                        <div className="skeleton-loader" style={{ height: '24px', backgroundColor: '#f0f0f0', marginBottom: '10px' }}></div>
                                        <div className="skeleton-loader" style={{ height: '16px', backgroundColor: '#f0f0f0', width: '40%' }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
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
                        <div className="col-12 text-center">
                            <p className="text-muted">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                        {blogs.map(blog =>
                            <div className="col-xl-4 col-md-6 col-lg-6 mb-30" key={blog.id}>
                                <SingleBlogV1 blog={blog} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogV1;