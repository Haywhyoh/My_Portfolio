'use client';

import { useEffect, useRef, useState } from 'react';
import PortfolioData from "../../assets/jsonData/portfolio/PortfolioData.json"
import Link from "next/link";

const IsotopeGallery = () => {
    const galleryRef = useRef<HTMLDivElement | null>(null);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const totalImages = PortfolioData.length;

    const handleImageLoad = () => {
        setLoadedImagesCount((prevCount) => prevCount + 1);
    };

    useEffect(() => {
        // For Next.js, we'll use a simpler approach without Isotope
        // since Isotope can have SSR issues with Next.js
        if (loadedImagesCount === totalImages && galleryRef.current) {
            // Simple layout adjustment for masonry-like effect
            const items = galleryRef.current.querySelectorAll('.gallery-item');
            items.forEach((item, index) => {
                (item as HTMLElement).style.animationDelay = `${index * 0.1}s`;
            });
        }
    }, [loadedImagesCount, totalImages]);

    return (
        <>
            <div id="gallery-masonary" className="gallery-items colums-3" ref={galleryRef}>
                {PortfolioData.map(portfolio => (
                    <div className="gallery-item" key={portfolio.id}>
                        <div className="gallery-style-one">
                            <img src={`/assets/img/projects/${portfolio.thumb}`} alt="Thumb" onLoad={handleImageLoad} />
                            <div className="info">
                                <div className="overlay">
                                    <div className="content">
                                        <ul className="pf-tags">
                                            {portfolio.tags.map((data, index) =>
                                                <li key={index} >
                                                    <Link href="#">{data}</Link>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="icon">
                                        <Link href={`/project-details/${portfolio.id}`}><i className="fas fa-long-arrow-right" /></Link>
                                    </div>
                                </div>
                                <h4><Link href={`/project-details/${portfolio.id}`}>{portfolio.title}</Link></h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default IsotopeGallery; 