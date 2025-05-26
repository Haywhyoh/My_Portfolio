import ReactWOW from "react-wow"
import partner1 from "/assets/img/partner/1.png"
import partner2 from "/assets/img/partner/2.png"
import partner3 from "/assets/img/partner/3.png"
import partner4 from "/assets/img/partner/4.png"
import partner5 from "/assets/img/partner/5.png"
import partner6 from "/assets/img/partner/6.png"
import partner7 from "/assets/img/partner/7.png"

const PartnerV1 = () => {
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
                                        <img src={partner1} alt="Image Not Found" />
                                    </div>
                                </ReactWOW>

                                {/* Single Item */}
                                <ReactWOW animation="fadeInLeft">
                                    <div className="partner-style-one-item">
                                        <img src={partner2} alt="Image Not Found" />
                                    </div>
                                </ReactWOW>

                                {/* Single Item */}
                                <ReactWOW animation="fadeInLeft">
                                    <div className="partner-style-one-item">
                                        <img src={partner3} alt="Image Not Found" />
                                    </div>
                                </ReactWOW>

                                {/* Single Item */}
                                <ReactWOW animation="fadeInLeft">
                                    <div className="partner-style-one-item">
                                        <img src={partner4} alt="Image Not Found" />
                                    </div>
                                </ReactWOW>

                            </div>
                            <div className="partner-style-one-items">
                                {/* Single Item */}
                                <ReactWOW animation="fadeInLeft">
                                    <div className="partner-style-one-item">
                                        <img src={partner5} alt="Image Not Found" />
                                    </div>
                                </ReactWOW>

                                {/* Single Item */}
                                <ReactWOW animation="fadeInLeft">
                                    <div className="partner-style-one-item">
                                        <img src={partner6} alt="Image Not Found" />
                                    </div>
                                </ReactWOW>

                                {/* Single Item */}
                                <ReactWOW animation="fadeInLeft">
                                    <div className="partner-style-one-item">
                                        <img src={partner7} alt="Image Not Found" />
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

export default PartnerV1;