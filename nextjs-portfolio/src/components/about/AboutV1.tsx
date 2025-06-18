'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import Link from "next/link";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import dynamic from 'next/dynamic';
// import 'react-modal-video/css/modal-video.css';
// const ModalVideo = dynamic(() => import('react-modal-video'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const AboutV1 = () => {

    // Modal Video (temporarily disabled)
    // const [isOpen, setOpen] = useState(false);

    // Scroll Animation 
    useEffect(() => {
        const upDown_Scroll = document.querySelector(".upDownScrol");

        if (upDown_Scroll) {
            gsap.set(upDown_Scroll, { yPercent: 105 });

            const scrollAnimation = gsap.to(upDown_Scroll, {
                yPercent: -105,
                ease: "none",
                scrollTrigger: {
                    trigger: upDown_Scroll,
                    end: "bottom center",
                    scrub: 1,
                },
            });

            // Cleanup function to kill the animation on unmount
            return () => {
                scrollAnimation.kill();
                const scrollTriggers = ScrollTrigger.getAll();
                scrollTriggers.forEach((trigger) => trigger.kill());
            };
        }
    }, []);

    return (
        <>
            <div id="about" className="about-style-one-area bg-gray default-padding">
                <div className="shape-style-one">
                    <img src="/assets/img/shape/3.png" alt="Image Not Found" />
                    <img className="upDownScrol" src="/assets/img/shape/8.png" alt="Image Not Found" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="fun-fact-style-one-items">
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"> <CountUp end={5} enableScrollSpy={true} /></div>
                                        <div className="operator">+</div>
                                    </div>
                                    <span className="medium">Years of Experience</span>
                                </div>
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={25} enableScrollSpy={true} /></div>
                                        <div className="operator">+</div>
                                    </div>
                                    <span className="medium">Projects Completed</span>
                                </div>
                            </div>
                            <div className="clieents-list mt-40">
                                <div className="d-flex">
                                    <div className="thumb">
                                        <img src="/assets/img/team/14.jpg" alt="Image Not Found" />
                                        <img src="/assets/img/team/15.jpg" alt="Image Not Found" />
                                        <img src="/assets/img/team/16.jpg" alt="Image Not Found" />
                                        <img src="/assets/img/team/17.jpg" alt="Image Not Found" />
                                    </div>
                                    <div className="info">
                                        <h5>21K+ Users Served</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 pl-80 pl-md-15 pl-xs-15">
                            <div className="about-style-one-info">
                                <p>
                                    As a Full-Stack Software Engineer with 5+ years of experience in EdTech and SaaS industries, I specialize in building scalable web applications using React, Next.js, Python, and Node.js. I have successfully led development teams serving over 21,000 users and have a proven track record of improving user experience and system performance. My expertise spans from frontend development to backend architecture, with a passion for creating efficient, user-centric solutions.
                                </p>
                                <Link className="btn-style-regular btn-border" href="#" ><span>Learn More</span> <i className="fas fa-arrow-right" /></Link>
                            </div>
                        </div>
                    </div>
                    <div className="about-style-one-bottom-info mt-50">
                        <div className="row">
                            <div className="col-lg-8 pr-60 pr-md-15 pr-xs-15">
                                <div className="img-container">
                                    <img src="/assets/img/about/1.jpg" alt="Image Not Found" />
                                    <Link href="#" className="popup-youtube video-play-button" >
                                        <i className="fas fa-play" />
                                        <div className="effect" />
                                    </Link>
                                    {/* <ModalVideo channel='youtube' isOpen={isOpen} videoId="aTC_RNYtEb0" onClose={() => setOpen(false)} /> */}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <img src="/assets/img/about/2.jpg" alt="Image Not Found" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutV1; 