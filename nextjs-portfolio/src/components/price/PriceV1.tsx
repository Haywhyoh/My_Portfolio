'use client';

import Link from "next/link";

interface DataType {
    sectionClass?: string;
    hasTitle?: React.ReactNode
}

const PriceV1 = ({ sectionClass, hasTitle }: DataType) => {
    return (
        <>
            <div id="pricing" className={`pricing-style-one-area ${sectionClass ? sectionClass : ""}`}>
                <div className="shape-right-top">
                    <img src="/assets/img/shape/15.png" alt="Image Not Found" />
                </div>

                {hasTitle &&
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <div className="site-heading text-center">
                                    <h4 className="sub-title">Pricing</h4>
                                    <h2 className="title">The best pricing plans to get your best</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="container">
                    <div className="row">
                        {/* Single Item */}
                        <div className="col-lg-6 pricing-one-single">
                            <div className="pricing-style-one">
                                <div className="pricing-top">
                                    <div className="right">
                                        <i className="fab fa-wordpress" />
                                    </div>
                                    <div className="left">
                                        <h4>WordPress Development</h4>
                                        <p>
                                            Business Website, NGO Website, Agency Website
                                        </p>
                                    </div>
                                </div>
                                <div className="content">
                                    <div className="price">
                                        <h2><sup>$</sup>200</h2>
                                    </div>
                                    <ul>
                                        <li>5 Pages with Elementor</li>
                                        <li>Theme Customization</li>
                                        <li>Responsive Design</li>
                                        <li>SEO and AI Optimized</li>
                                        <li>Payment Gateway Integration</li>
                                        <li>30 Days Support</li>
                                    </ul>
                                    <div className="button mt-30">
                                        <Link className="btn-style-regular" href="/contact"><span>Order Now</span> <i className="fas fa-arrow-right" /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Single Item */}
                        <div className="col-lg-6 pricing-one-single">
                            <div className="pricing-style-one">
                                <div className="pricing-top">
                                    <div className="right">
                                        <i className="fab fa-bootstrap" />
                                    </div>
                                    <div className="left">
                                        <h4>Single Landing Page</h4>
                                        <p>
                                            Single Landing Page for your business
                                        </p>
                                    </div>
                                </div>
                                <div className="content">
                                    <div className="price">
                                        <h2><sup>$</sup>30</h2>
                                    </div>
                                    <ul>
                                        <li>1 Page with Elementor</li>
                                        <li>Social Media Integration</li>
                                        <li>Responsive Design</li>
                                        <li>SEO and AI Optimized</li>
                                        <li>Contact Form</li>
                                        <li>7 Days Support</li>
                                    </ul>
                                    <div className="button mt-30">
                                        <Link className="btn-style-regular btn-border" href="/contact"><span>Order Now</span> <i className="fas fa-arrow-right" /></Link>
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

export default PriceV1; 