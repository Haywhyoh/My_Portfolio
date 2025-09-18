'use client';

import Link from 'next/link';
import SocialShareV1 from '../social/SocialShareV1';
import { ReactTyped } from 'react-typed';

const BannerV1 = () => {

    const textLines = [
        '<b className="">Software Engineer</b>',
        '<b className="">Wordpress Expert</b>',
        '<b className="">AI Automation</b>',
        // '<b className="">EdTech & SaaS Specialist</b>'
    ]

    return (
        <>
            <div className="banner-style-one-area bg-gray">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="banner-style-one-items">
                                <div className="info">
                                    <h1>I👋 am  Samuel </h1>
                                    <h2>
                                        <span className="header-caption" id="page-top">
                                            <span className="cd-headline clip is-full-width">
                                                <span className="cd-words-wrapper">
                                                    <ReactTyped
                                                        strings={textLines} typeSpeed={35} backSpeed={35} backDelay={2000} loop>
                                                    </ReactTyped>
                                                </span>
                                            </span>
                                        </span>
                                    </h2>
                                    <p>
                                        Hi, I&apos;m Adedayo Ayomide Samuel, a Full-Stack Software Engineer with 5+ years of experience in EdTech and SaaS industries. I specialize in building scalable web applications using React, Next.js, Python, and Node.js, having led teams that serve over 21,000 combined users.
                                    </p>
                                    <div className="flex-social mt-40">
                                        <div className="button">
                                            <Link className="btn-style-regular" href="/contact"><span>Hire Me Now</span> <i className="fas fa-arrow-right" /></Link>
                                        </div>
                                        <ul className="social-info">
                                            <SocialShareV1 />
                                        </ul>
                                    </div>
                                </div>
                                <div className="thumb">
                                    <img src="/assets/img/banner/ayomide.png" alt="Image Not Found" />
                                    <img src="/assets/img/shape/bg.png" alt="Image Not Found" />
                                    <img src="/assets/img/shape/3.png" alt="Image Not Found" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BannerV1; 