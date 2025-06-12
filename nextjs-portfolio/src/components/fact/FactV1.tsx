'use client';

import CountUp from 'react-countup'
// import ReactWOW from "react-wow" // Note: ReactWOW compatibility issue with Next.js

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
                        <div className="funfact-style-two-item">
                            <div className="icon">
                                <img src="/assets/img/icon/xd.png" alt="Image Not Found" />
                            </div>
                            <div className="fun-fact">
                                <div className="counter">
                                    <div className="timer"><CountUp end={80} enableScrollSpy={true} /></div>
                                    <div className="operator">%</div>
                                </div>
                                <span className="medium">Adobe XD</span>
                            </div>
                        </div>

                        {/* Single item */}
                        <div className="funfact-style-two-item">
                            <div className="icon">
                                <img src="/assets/img/icon/figma.png" alt="Image Not Found" />
                            </div>
                            <div className="fun-fact">
                                <div className="counter">
                                    <div className="timer"><CountUp end={90} enableScrollSpy={true} /></div>
                                    <div className="operator">%</div>
                                </div>
                                <span className="medium">Figma</span>
                            </div>
                        </div>

                        {/* Single item */}
                        <div className="funfact-style-two-item">
                            <div className="icon">
                                <img src="/assets/img/icon/wordpress.png" alt="Image Not Found" />
                            </div>
                            <div className="fun-fact">
                                <div className="counter">
                                    <div className="timer"><CountUp end={70} enableScrollSpy={true} /></div>
                                    <div className="operator">%</div>
                                </div>
                                <span className="medium">WordPress</span>
                            </div>
                        </div>

                        {/* Single item */}
                        <div className="funfact-style-two-item">
                            <div className="icon">
                                <img src="/assets/img/icon/photoshop.png" alt="Image Not Found" />
                            </div>
                            <div className="fun-fact">
                                <div className="counter">
                                    <div className="timer"><CountUp end={80} enableScrollSpy={true} /></div>
                                    <div className="operator">%</div>
                                </div>
                                <span className="medium">Photoshop</span>
                            </div>
                        </div>

                        {/* Single item */}
                        <div className="funfact-style-two-item">
                            <div className="icon">
                                <img src="/assets/img/icon/diamon.png" alt="Image Not Found" />
                            </div>
                            <div className="fun-fact">
                                <div className="counter">
                                    <div className="timer"><CountUp end={60} enableScrollSpy={true} /></div>
                                    <div className="operator">%</div>
                                </div>
                                <span className="medium">Sketch</span>
                            </div>
                        </div>

                        {/* Single item */}
                        <div className="funfact-style-two-item">
                            <div className="icon">
                                <img src="/assets/img/icon/ai.png" alt="Image Not Found" />
                            </div>
                            <div className="fun-fact">
                                <div className="counter">
                                    <div className="timer"><CountUp end={90} enableScrollSpy={true} /></div>
                                    <div className="operator">%</div>
                                </div>
                                <span className="medium">Illustrator</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FactV1; 