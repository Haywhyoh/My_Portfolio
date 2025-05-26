import xd from "/assets/img/icon/xd.png"
import figma from "/assets/img/icon/figma.png"
import wordpress from "/assets/img/icon/wordpress.png"
import photoshop from "/assets/img/icon/photoshop.png"
import diamon from "/assets/img/icon/diamon.png"
import ai from "/assets/img/icon/ai.png"
import CountUp from 'react-countup'
import ReactWOW from "react-wow"

const FactV1 = () => {
    return (
        <>
            <div className="fun-factor-area default-padding overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Top Skills</h4>
                                <h2 className="title">See my expertise</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="fun-fact-style-two-items text-center">

                        {/* Single item */}
                        <ReactWOW animation="fadeInUp">
                            <div className="funfact-style-two-item">
                                <div className="icon">
                                    <img src={xd} alt="Image Not Found" />
                                </div>
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={80} enableScrollSpy={true} /></div>
                                        <div className="operator">%</div>
                                    </div>
                                    <span className="medium">Adobe XD</span>
                                </div>
                            </div>
                        </ReactWOW>

                        {/* Single item */}
                        <ReactWOW animation="fadeInUp" delay="100ms">
                            <div className="funfact-style-two-item">
                                <div className="icon">
                                    <img src={figma} alt="Image Not Found" />
                                </div>
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={90} enableScrollSpy={true} /></div>
                                        <div className="operator">%</div>
                                    </div>
                                    <span className="medium">Figma</span>
                                </div>
                            </div>
                        </ReactWOW>

                        {/* Single item */}
                        <ReactWOW animation="fadeInUp" delay="200ms">
                            <div className="funfact-style-two-item">
                                <div className="icon">
                                    <img src={wordpress} alt="Image Not Found" />
                                </div>
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={70} enableScrollSpy={true} /></div>
                                        <div className="operator">%</div>
                                    </div>
                                    <span className="medium">WordPress</span>
                                </div>
                            </div>
                        </ReactWOW>

                        {/* Single item */}
                        <ReactWOW animation="fadeInUp" delay="300ms">
                            <div className="funfact-style-two-item wow fadeInUp">
                                <div className="icon">
                                    <img src={photoshop} alt="Image Not Found" />
                                </div>
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={80} enableScrollSpy={true} /></div>
                                        <div className="operator">%</div>
                                    </div>
                                    <span className="medium">Photoshop</span>
                                </div>
                            </div>
                        </ReactWOW>

                        {/* Single item */}
                        <ReactWOW animation="fadeInUp" delay="400ms">
                            <div className="funfact-style-two-item">
                                <div className="icon">
                                    <img src={diamon} alt="Image Not Found" />
                                </div>
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={60} enableScrollSpy={true} /></div>
                                        <div className="operator">%</div>
                                    </div>
                                    <span className="medium">Sketch</span>
                                </div>
                            </div>
                        </ReactWOW>

                        {/* Single item */}
                        <ReactWOW animation="fadeInUp" delay="500ms">
                            <div className="funfact-style-two-item">
                                <div className="icon">
                                    <img src={ai} alt="Image Not Found" />
                                </div>
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={90} enableScrollSpy={true} /></div>
                                        <div className="operator">%</div>
                                    </div>
                                    <span className="medium">Illustrator</span>
                                </div>
                            </div>
                        </ReactWOW>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FactV1;