'use client';

import Link from "next/link";
import Image from "next/image";
import { generateSlug } from "@/lib/blog";

interface DataType {
    id?: number;
    thumb?: string;
    tag?: string;
    date?: string;
    title?: string;
    animationDelay?: string;
}

const SingleBlogV1 = ({ blog }: { blog: DataType }) => {
    const { id, thumb, date, title, animationDelay, tag } = blog;
    const slug = title ? generateSlug(title) : '';

    return (
        <>
            <div 
                className="home-blog-style-one-item"
                style={{
                    animationDelay: animationDelay,
                    animation: 'fadeInUp 0.6s ease-out'
                }}
            >
                <div className="home-blog-thumb">
                    <Link href={`/blog/${slug}`}>
                        <Image src={
                            thumb
                                ? (thumb.startsWith('http') ? thumb : `/assets/img/blog/${thumb}`)
                                : `/assets/img/blog/default-blog.jpg`
                        } alt="Blog thumbnail" width={400} height={250} />
                    </Link>
                </div>
                <div className="content">
                    <ul className="home-blog-meta">
                        <li>
                            <Link href={`/blog?tag=${encodeURIComponent(tag || '')}`}>{tag}</Link>
                        </li>
                        <li>{date}</li>
                    </ul>
                    <div className="info">
                        <h4 className="blog-title">
                            <Link href={`/blog/${slug}`}>{title}</Link>
                        </h4>
                        <Link href={`/blog/${slug}`} className="btn-read-more">Read More <i className="fas fa-arrow-right"></i></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBlogV1; 