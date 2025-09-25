'use client';

import Link from "next/link";

const FaqV1 = () => {
    return (
        <>
            <div className="faq-style-one-area default-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="thumb-style-one">
                                <img src="/assets/img/about/3.jpg" alt="Image Not Found" />
                                <div className="chat-card">
                                    <p>{`Can't find what your are loking for you?`}</p>
                                    <h5>I would like to chat with you</h5>
                                    <Link href="#"><i className="fab fa-facebook-messenger" /></Link>
                                    <img src="/assets/img/shape/12.png" alt="Image Not Found" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <div className="faq-style-one-items">
                                <h4 className="sub-title">Faq</h4>
                                <h2>Frequently Asked Questions</h2>
                                <div className="accordion mt-30" id="faqAccordion">
                                    <div className="accordion-item accordion-style-one">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Are you available for full-time or freelance work?
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                <p>
                                                    Yes, I'm open to both full-time positions and freelance projects! Whether you're looking for a dedicated team member or need help with a specific project, I'm flexible and ready to contribute. I enjoy both the stability of full-time roles and the variety that freelance work brings.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item accordion-style-one">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                What technologies do you specialize in?
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                <p>
                                                    I'm a full-stack developer specializing in the Python and TypeScript ecosystems. On the backend, I work with Python (Django, FastAPI, Flask) and Node.js. For frontend, I use React, Next.js, and TypeScript. I'm also experienced with databases like PostgreSQL and MongoDB, cloud platforms, and modern development practices.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item accordion-style-one">
                                        <h2 className="accordion-header" id="headingThree">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                How do you handle project timelines and communication?
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                <p>
                                                    I believe in clear communication and realistic timelines. I provide regular updates on project progress, use project management tools for transparency, and prefer to set achievable deadlines rather than overpromise. I'm available for meetings via video calls, Slack, or email based on your preference.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item accordion-style-one">
                                        <h2 className="accordion-header" id="headingFour">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                Can you work with existing teams and codebases?
                                            </button>
                                        </h2>
                                        <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                <p>
                                                    Absolutely! I have experience integrating with existing development teams and working with legacy codebases. I'm comfortable with code reviews, following established coding standards, and collaborating using Git workflows. I can quickly adapt to your team's processes and contribute effectively from day one.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item accordion-style-one">
                                        <h2 className="accordion-header" id="headingFive">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                Do you provide ongoing support and maintenance?
                                            </button>
                                        </h2>
                                        <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                <p>
                                                    Yes, I offer post-launch support and maintenance services. This includes bug fixes, performance optimization, security updates, and feature enhancements. I believe in building long-term relationships with clients and ensuring your applications continue to perform well after deployment.
                                                </p>
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

export default FaqV1; 