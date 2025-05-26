import ReactWOW from "react-wow";
import shape15 from "/assets/img/shape/15.png"
import { Link } from "react-router-dom";

interface DataType {
    sectionClass?: string;
    hasTitle?: React.ReactNode
}

const PriceV1 = ({ sectionClass, hasTitle }: DataType) => {
    return (
        <>
            <div id="pricing" className={`pricing-style-one-area ${sectionClass ? sectionClass : ""}`}>
                <div className="shape-right-top">
                    <img src={shape15} alt="Image Not Found" />
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
                            <ReactWOW animation="fadeInUp" delay="100ms">
                                <div className="pricing-style-one">
                                    <div className="pricing-top">
                                        <div className="right">
                                            <i className="fab fa-wordpress" />
                                        </div>
                                        <div className="left">
                                            <h4>WordPress Development</h4>
                                            <p>
                                                Simple and flexible per - user pricing
                                            </p>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <div className="price">
                                            <h2><sup>$</sup>48</h2>
                                        </div>
                                        <ul>
                                            <li>1 Page with Elementor</li>
                                            <li>Design Customization</li>
                                            <li>Responsive Design</li>
                                            <li>1 Page with Elementor</li>
                                            <li>Design Customization</li>
                                            <li>Responsive Design</li>
                                        </ul>
                                        <div className="button mt-30">
                                            <Link className="btn-style-regular" to="/contact"><span>Order Now</span> <i className="fas fa-arrow-right" /></Link>
                                        </div>
                                    </div>
                                </div>
                            </ReactWOW>
                        </div>

                        {/* Single Item */}
                        <div className="col-lg-6 pricing-one-single">
                            <ReactWOW animation="fadeInUp" delay="300ms">
                                <div className="pricing-style-one">
                                    <div className="pricing-top">
                                        <div className="right">
                                            <i className="fab fa-bootstrap" />
                                        </div>
                                        <div className="left">
                                            <h4>Static frontend design</h4>
                                            <p>
                                                Simple and flexible per - user pricing
                                            </p>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <div className="price">
                                            <h2><sup>$</sup>28</h2>
                                        </div>
                                        <ul>
                                            <li>2 Page with Bootstrap5</li>
                                            <li>Design implement</li>
                                            <li>Responsive Design</li>
                                            <li>2 Page with Bootstrap5</li>
                                            <li>Design implement</li>
                                            <li>Responsive Design</li>
                                        </ul>
                                        <div className="button mt-30">
                                            <Link className="btn-style-regular btn-border" to="/contact"><span>Order Now</span> <i className="fas fa-arrow-right" /></Link>
                                        </div>
                                    </div>
                                </div>
                            </ReactWOW>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PriceV1;