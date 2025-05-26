import { useEffect, useRef, useState } from 'react';
import PortfolioData from "../../assets/jsonData/portfolio/PortfolioData.json"
import Isotope from 'isotope-layout';
import { Link } from "react-router-dom";

const IsotopeGallery = () => {

    const galleryRef = useRef<HTMLDivElement | null>(null);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const totalImages = PortfolioData.length;

    const handleImageLoad = () => {
        setLoadedImagesCount((prevCount) => prevCount + 1);
    };

    useEffect(() => {
        if (loadedImagesCount === totalImages && galleryRef.current) {
            const iso = new Isotope(galleryRef.current, {
                itemSelector: '.gallery-item',
                layoutMode: 'masonry',
            });

            setTimeout(() => {
                iso.layout();
            }, 500);

            return () => {
                iso.destroy();
            };
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
                                                    <Link to="#" >{data}</Link>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="icon">
                                        <Link to={`/project-details/${portfolio.id}`}><i className="fas fa-long-arrow-right" /></Link>
                                    </div>
                                </div>
                                <h4><Link to={`/project-details/${portfolio.id}`}>{portfolio.title}</Link></h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default IsotopeGallery;