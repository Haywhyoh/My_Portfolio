'use client';

interface DataType {
    sectionClass?: string;
}

const TestimonialV1 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`testimonial-style-one-area default-padding ${sectionClass ? sectionClass : ""}`}>
                <div className="shape-left-top">
                    <img src="/assets/img/shape/10.png" alt="Image Not Found" />
                </div>
                <div className="container">
                    <div className="heading-left">
                        <div className="row">
                            <div className="col-xl-6">
                                <h4 className="sub-title">Testimonials</h4>
                                <h2 className="title">Clients Testimonials</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="testimonial-style-one-items">
                                {/* Single testimonial item */}
                                <div className="testimonial-style-one">
                                    <div className="item">
                                        <div className="thumb">
                                            <div className="inner">
                                                <img src="/assets/img/illustration/2.png" alt="Image Not Found" />
                                            </div>
                                        </div>
                                        <div className="content">
                                            <div className="tm-review">
                                                <div className="top">
                                                    <h5>Reviews On</h5>
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                </div>
                                                <div className="bottom">
                                                    <img src="/assets/img/partner/9.png" alt="Image Not Found" />
                                                    <p>4.9/ 60 Reviews</p>
                                                </div>
                                            </div>
                                            <p>
                                                {`"Thanks to your web agency team for their professional work. The
                                                website they created for my business exceeded my expectations, and
                                                my clients have given positive feedback about its design and
                                                user-friendliness."`}
                                            </p>
                                            <div className="tm-footer">
                                                <div className="provider">
                                                    <h4>Brooklyn Simmons</h4>
                                                    <span>UI/UX DESIGNER</span>
                                                </div>
                                                <span>01</span>
                                            </div>
                                        </div>
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

export default TestimonialV1; 