'use client';

import { useEffect, useRef, useState } from 'react';
import PortfolioData from "../../assets/jsonData/portfolio/PortfolioData.json"
import Link from "next/link";
import dynamic from 'next/dynamic';

const IsotopeGallery = () => {
    const galleryRef = useRef<HTMLDivElement | null>(null);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const totalImages = PortfolioData.length;

    const handleImageLoad = () => {
        setLoadedImagesCount((prevCount) => prevCount + 1);
    };

    // Project links mapping
    const projectLinks: { [key: string]: string } = {
        'Hillpad - Online Course Marketplace': 'https://hillpad.com/',
        'GraviitalBeats - Music Marketplace': 'http://graviitalbeats.com/',
        'Beinitiative - Community Platform': 'https://beinitiative.com/',
        'Flexibug - Beauty Industry Booking App': '#',
        'TattoAdmin - Tattoo Expert Booking Site': '#',
        'Mbuktu - African Items Ecommerce Store': '#'
    };

    useEffect(() => {
        if (loadedImagesCount === totalImages && galleryRef.current && typeof window !== 'undefined') {
            import('isotope-layout').then((IsotopeModule) => {
                const Isotope = IsotopeModule.default;

                const iso = new Isotope(galleryRef.current!, {
                    itemSelector: '.gallery-item',
                    layoutMode: 'masonry',
                });

                // Force layout after a short delay to ensure proper rendering
                setTimeout(() => {
                    iso.layout();
                }, 100);

                // Cleanup function
                return () => {
                    if (iso) {
                        iso.destroy();
                    }
                };
            }).catch(error => {
                console.error('Failed to load Isotope:', error);
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
                                        {projectLinks[portfolio.title] && projectLinks[portfolio.title] !== '#' ? (
                                            <a href={projectLinks[portfolio.title]} target="_blank" rel="noopener noreferrer">
                                                <i className="fas fa-external-link-alt" />
                                            </a>
                                        ) : (
                                            <Link href={`/project-details/${portfolio.id}`}>
                                                <i className="fas fa-long-arrow-right" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                <h4>
                                    {projectLinks[portfolio.title] && projectLinks[portfolio.title] !== '#' ? (
                                        <a href={projectLinks[portfolio.title]} target="_blank" rel="noopener noreferrer">
                                            {portfolio.title}
                                        </a>
                                    ) : (
                                        <Link href={`/project-details/${portfolio.id}`}>{portfolio.title}</Link>
                                    )}
                                </h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default IsotopeGallery; 