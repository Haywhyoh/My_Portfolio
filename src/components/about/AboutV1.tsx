import { useEffect, useState } from 'react';
import shape3 from "/assets/img/shape/3.png"
import shape8 from "/assets/img/shape/8.png"
import team14 from "/assets/img/team/14.jpg"
import team15 from "/assets/img/team/15.jpg"
import team16 from "/assets/img/team/16.jpg"
import team17 from "/assets/img/team/17.jpg"
import about1 from "/assets/img/about/1.jpg"
import about2 from "/assets/img/about/2.jpg"
import CountUp from 'react-countup';
import ModalVideo from 'react-modal-video';
import { Link } from "react-router-dom";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const AboutV1 = () => {

    // Modal Video
    const [isOpen, setOpen] = useState(false);

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
                    <img src={shape3} alt="Image Not Found" />
                    <img className="upDownScrol" src={shape8} alt="Image Not Found" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="fun-fact-style-one-items">
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"> <CountUp end={12} enableScrollSpy={true} /></div>
                                        <div className="operator">+</div>
                                    </div>
                                    <span className="medium">Years of Experience</span>
                                </div>
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={138} enableScrollSpy={true} /></div>
                                        <div className="operator">+</div>
                                    </div>
                                    <span className="medium">Projects completed on 30 countries</span>
                                </div>
                            </div>
                            <div className="clieents-list mt-40">
                                <div className="d-flex">
                                    <div className="thumb">
                                        <img src={team14} alt="Image Not Found" />
                                        <img src={team15} alt="Image Not Found" />
                                        <img src={team16} alt="Image Not Found" />
                                        <img src={team17} alt="Image Not Found" />
                                    </div>
                                    <div className="info">
                                        <h5>20K+ Clients</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 pl-80 pl-md-15 pl-xs-15">
                            <div className="about-style-one-info">
                                <p>
                                    As a skilled web developer, I specialize in creating responsive, user-friendly websites with a focus on modern design and efficient code. I excel in front-end development, with a deep understanding of HTML, CSS, JavaScript, and various frameworks. My passion is turning ideas into functional and aesthetically pleasing digital experiences.
                                </p>
                                <Link className="btn-style-regular btn-border" to="#" ><span>Learn More</span> <i className="fas fa-arrow-right" /></Link>
                            </div>
                        </div>
                    </div>
                    <div className="about-style-one-bottom-info mt-50">
                        <div className="row">
                            <div className="col-lg-8 pr-60 pr-md-15 pr-xs-15">
                                <div className="img-container">
                                    <img src={about1} alt="Image Not Found" />
                                    <Link to="#" className="popup-youtube video-play-button" onClick={() => setOpen(true)} >
                                        <i className="fas fa-play" />
                                        <div className="effect" />
                                    </Link>
                                    <ModalVideo channel='youtube' isOpen={isOpen} videoId="aTC_RNYtEb0" onClose={() => setOpen(false)} />
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <img src={about2} alt="Image Not Found" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutV1;