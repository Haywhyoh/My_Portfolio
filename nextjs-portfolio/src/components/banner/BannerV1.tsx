'use client';

import Link from 'next/link';
import SocialShareV1 from '../social/SocialShareV1';
import { ReactTyped } from 'react-typed';

const BannerV1 = () => {

    const textLines = [
        '<b className="">Web Developer</b>',
        '<b className="">UI/UX Designer</b>',
        '<b className="">Professional Dev</b>'
    ]

    return (
        <>
            <div className="banner-style-one-area bg-gray">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="banner-style-one-items">
                                <div className="info">
                                    <h1>I👋 am Dalton </h1>
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
                                        Hi, my name is Dalton Grant and I began using WordPress when it first began. I've spent most of my waking hours for the last ten years designing, programming and operating WordPress sites.
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
                                    <img src="/assets/img/illustration/1.png" alt="Image Not Found" />
                                    <img src="/assets/img/shape/1.png" alt="Image Not Found" />
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