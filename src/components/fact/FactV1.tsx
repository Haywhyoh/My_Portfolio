'use client';

import CountUp from 'react-countup'
import Image from 'next/image'
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
                                <Image src="/assets/img/gallery/react.png" alt="React" width={60} height={60} />
                            </div>
                            <div className="fun-fact">
                            <div className="counter">
                                <span className="operator">ReactJs</span>
                            </div>
                                <div className="">
                                    <div className="medium"><CountUp end={5} enableScrollSpy={true} />+years</div>
                                    
                                </div>
                            </div>
                        </div>

                        {/* Single item */}
                        <div className="funfact-style-two-item">
                            <div className="icon">
                                <Image src="/assets/img/gallery/node.png" alt="Node.js" width={60} height={60} />
                            </div>
                            <div className="fun-fact">
                            <div className="counter">
                                <span className="operator">NodeJs</span>
                            </div>
                                <div className="">
                                    <div className="medium"><CountUp end={5} enableScrollSpy={true} />+years</div>
                                    
                                </div>
                            </div>
                        </div>

                        {/* Single item */}
                        <div className="funfact-style-two-item">
                            <div className="icon">
                                <Image src="/assets/img/icon/wordpress.png" alt="WordPress" width={60} height={60} />
                            </div>
                            <div className="fun-fact">
                            <div className="counter">
                                <span className="operator">Wordpress</span>
                            </div>
                                <div className="">
                                    <div className="medium"><CountUp end={6} enableScrollSpy={true} />+years</div>
                                    
                                </div>
                            </div>
                        </div>

                        {/* Single item */}
                        <div className="funfact-style-two-item">
                            <div className="icon">
                                <Image src="/assets/img/gallery/nextjs.png" alt="Next.js" width={60} height={60} />
                            </div>
                            <div className="fun-fact">
                            <div className="counter">
                                <span className="operator">NextJs</span>
                            </div>
                                <div className="">
                                    <div className="medium"><CountUp end={3} enableScrollSpy={true} />+years</div>
                                    
                                </div>
                            </div>
                            
                        </div>

                        {/* Single item */}
                        <div className="funfact-style-two-item">
                            <div className="icon">
                                <Image src="/assets/img/gallery/django.png" alt="Django" width={60} height={60} />
                            </div>
                            <div className="fun-fact">
                            <div className="counter">
                                <span className="operator">Django</span>
                            </div>
                                <div className="">
                                    <div className="medium"><CountUp end={5} enableScrollSpy={true} />+years</div>
                                    
                                </div>
                            </div>
                        </div>
                        

                        {/* Single item */}
                        <div className="funfact-style-two-item">
                            <div className="icon">
                                <Image src="/assets/img/gallery/py.png" alt="Python" width={60} height={60} />
                            </div>
                            <div className="fun-fact">
                            <div className="counter">
                                <span className="operator">Python</span>
                            </div>
                                <div className="">
                                    <div className="medium"><CountUp end={5} enableScrollSpy={true} />+years</div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FactV1; 