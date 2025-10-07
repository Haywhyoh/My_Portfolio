'use client';

import Image from 'next/image';

const PartnerV1 = () => {
    return (
        <>
            <div className="partner-style-one-area text-center default-padding bottom-less overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Partner</h4>
                                <h2 className="title">The Brands I&apos;ve Worked With</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-full">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="partner-style-one-items">
                                {/* Single Item */}
                                <div className="partner-style-one-item">
                                    <Image src="/assets/img/partner/hillpad.png" alt="Hillpad" width={120} height={60} />
                                </div>

                                {/* Single Item */}
                                <div className="partner-style-one-item">
                                    <Image src="/assets/img/partner/beinitiative.png" alt="Be Initiative" width={120} height={60} />
                                </div>

                                {/* Single Item */}
                                <div className="partner-style-one-item">
                                    <Image src="/assets/img/partner/mbuktu.png" alt="Mbuktu" width={120} height={60} />
                                </div>

                                {/* Single Item */}
                                <div className="partner-style-one-item">
                                    <Image src="/assets/img/partner/tri.png" alt="Tri" width={120} height={60} />
                                </div>
                            </div>
                            <div className="partner-style-one-items">
                                {/* Single Item */}
                                <div className="partner-style-one-item">
                                    <Image src="/assets/img/partner/gra.png" alt="Gra" width={120} height={60} />
                                </div>

                                {/* Single Item */}
                                <div className="partner-style-one-item">
                                    <Image src="/assets/img/partner/6.png" alt="Partner 6" width={120} height={60} />
                                </div>

                                {/* Single Item */}
                                <div className="partner-style-one-item">
                                    <Image src="/assets/img/partner/7.png" alt="Partner 7" width={120} height={60} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PartnerV1; 