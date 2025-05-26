import ReactWOW from "react-wow"
import partner1Light from "/assets/img/partner/1-light.png"
import partner2Light from "/assets/img/partner/2-light.png"
import partner3Light from "/assets/img/partner/3-light.png"
import partner4Light from "/assets/img/partner/4-light.png"
import partner5Light from "/assets/img/partner/5-light.png"
import partner6Light from "/assets/img/partner/6-light.png"
import partner7Light from "/assets/img/partner/7-light.png"

const PartnerV2 = () => {
    return (
        <>
            <div className="partner-style-one-area text-center default-padding bottom-less overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Partner</h4>
                                <h2 className="title">With The World Premier 80+ Brands</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-full">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="partner-style-one-items">

                                {/* Single Item */}
                                <ReactWOW animation="fadeInLeft">
                                    <div className="partner-style-one-item">
                                        <img src={partner1Light} alt="Image Not Found" />
                                    </div>
                                </ReactWOW>

                                {/* Single Item */}
                                <ReactWOW animation="fadeInLeft">
                                    <div className="partner-style-one-item">
                                        <img src={partner2Light} alt="Image Not Found" />
                                    </div>
                                </ReactWOW>

                                {/* Single Item */}
                                <ReactWOW animation="fadeInLeft">
                                    <div className="partner-style-one-item">
                                        <img src={partner3Light} alt="Image Not Found" />
                                    </div>
                                </ReactWOW>

                                {/* Single Item */}
                                <ReactWOW animation="fadeInLeft">
                                    <div className="partner-style-one-item">
                                        <img src={partner4Light} alt="Image Not Found" />
                                    </div>
                                </ReactWOW>
                            </div>
                            <div className="partner-style-one-items">
                                {/* Single Item */}
                                <ReactWOW animation="fadeInRight">
                                    <div className="partner-style-one-item">
                                        <img src={partner5Light} alt="Image Not Found" />
                                    </div>
                                </ReactWOW>

                                {/* Single Item */}
                                <ReactWOW animation="fadeInRight">
                                    <div className="partner-style-one-item">
                                        <img src={partner6Light} alt="Image Not Found" />
                                    </div>
                                </ReactWOW>

                                {/* Single Item */}
                                <ReactWOW animation="fadeInRight">
                                    <div className="partner-style-one-item">
                                        <img src={partner7Light} alt="Image Not Found" />
                                    </div>
                                </ReactWOW>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PartnerV2;