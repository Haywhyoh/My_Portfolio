'use client';

import Link from "next/link";
import Image from "next/image";
import IsotopeGallery from '../project/IsotopeGallery'

interface DataType {
    sectionClass?: string;
    hasTitle?: React.ReactNode;
}

const PortfolioV1 = ({ sectionClass, hasTitle }: DataType) => {
    return (
        <>
            <div id="portfolio" className={`portfolio-style-one-area ${sectionClass ? sectionClass : ""}`}>
                <div className="shape-top-left">
                    <Image src="/assets/img/shape/9.png" alt="Shape" width={200} height={200} />
                </div>

                {hasTitle &&
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <div className="site-heading text-center">
                                    <h4 className="sub-title">Portfolio</h4>
                                    <h2 className="title">My Recent Work</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="container">
                    <div className="row">
                        <div className="col-md-12 gallery-content">
                            <div className="magnific-mix-gallery gallery-masonary">
                                <IsotopeGallery />
                            </div>
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <div className="load-more-info text-center mt-60 mt-xs-30">
                                        <p>
                                            Are you interested to show more portfolios? <Link href="#">Load More</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PortfolioV1; 