'use client';

interface DataType {
    sectionClass?: string;
}

const ResumeV1 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div id="resume" className={`resume-area ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Resume</h4>
                                <h2 className="title">My Experience & Education</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="time-style-one-items">
                                <h3 className="title">Experience</h3>
                                
                                <div className="timeline-style-one-item">
                                    <div className="timeline-header">
                                        <span>01/2025 – 04/2025</span>
                                        <h4>Software Engineer</h4>
                                        <p>CodeMyGig - Remote</p>
                                    </div>
                                    <div className="timeline-body">
                                        <p>
                                            Leading a 6-person contract development team, working on 3 different client projects, serving more than 8,000 users. 
                                            Resolved an average of 20 medium bugs per iteration and encouraged TDD adoption, bringing 20% of code under test coverage.
                                        </p>
                                    </div>
                                </div>

                                <div className="timeline-style-one-item">
                                    <div className="timeline-header">
                                        <span>06/2024 – 01/2025</span>
                                        <h4>Fullstack Web Developer</h4>
                                        <p>Hux Ventures - Remote, USA</p>
                                    </div>
                                    <div className="timeline-body">
                                        <p>
                                            Led a 5-person team that delivered two web applications and SaaS, serving 13,000 combined users. 
                                            Independently responsible for Staff and Partners dashboard with referral and affiliate system tracking earnings for over 200 partners.
                                        </p>
                                    </div>
                                </div>

                                <div className="timeline-style-one-item">
                                    <div className="timeline-header">
                                        <span>06/2023 – 12/2024</span>
                                        <h4>Frontend Engineer</h4>
                                        <p>Remote</p>
                                    </div>
                                    <div className="timeline-body">
                                        <p>
                                            Redesigned the Hillpad web app interface using React, reducing client onboarding time by 40%. 
                                            Enhanced performance of three portfolio websites, resulting in 30% increase in engagement and decreased bounce rates.
                                        </p>
                                    </div>
                                </div>

                                <div className="timeline-style-one-item">
                                    <div className="timeline-header">
                                        <span>06/2022 – 05/2023</span>
                                        <h4>Web Developer</h4>
                                        <p>Probus Technologies - Remote, Lagos</p>
                                    </div>
                                    <div className="timeline-body">
                                        <p>
                                            Built and maintained static landing pages and React/WordPress websites for various clients. 
                                            Developed unit tests using Pytest and Jest, created comprehensive API documentation to enhance developer understanding.
                                        </p>
                                    </div>
                                </div>

                                <div className="timeline-style-one-item">
                                    <div className="timeline-header">
                                        <span>02/2021 – 03/2022</span>
                                        <h4>Software Engineering Intern</h4>
                                        <p>ALX Africa - Remote, Kenya</p>
                                    </div>
                                    <div className="timeline-body">
                                        <p>
                                            Built dynamic web applications using React for frontend and Node.js for backend. 
                                            Improved user experience by implementing responsive design and optimizing load times through intensive project-based learning.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="time-style-one-items">
                                <h3 className="title">Education</h3>
                                
                                <div className="timeline-style-one-item">
                                    <div className="timeline-header">
                                        <span>02/2016 – 12/2021</span>
                                        <h4>BSc. Electronic and Electrical Engineering</h4>
                                        <p>Obafemi Awolowo University</p>
                                    </div>
                                    <div className="timeline-body">
                                        <p>
                                            Comprehensive study of electronic and electrical engineering principles, including circuit design, 
                                            digital systems, and engineering mathematics. Strong foundation in problem-solving and analytical thinking.
                                        </p>
                                    </div>
                                </div>

                                <div className="timeline-style-one-item">
                                    <div className="timeline-header">
                                        <span>02/2021 – 03/2022</span>
                                        <h4>Holberton Full-Stack Software Engineering Program</h4>
                                        <p>Holberton School</p>
                                    </div>
                                    <div className="timeline-body">
                                        <p>
                                            Intensive 70 hours/week project-based learning program focused on full-stack software engineering. 
                                            Mastered modern web technologies, algorithms, data structures, and collaborative development practices.
                                        </p>
                                    </div>
                                </div>

                                <div className="timeline-style-one-item">
                                    <div className="timeline-header">
                                        <span>2019 – 2021</span>
                                        <h4>Independent Freelancer</h4>
                                        <p>Various Clients</p>
                                    </div>
                                    <div className="timeline-body">
                                        <p>
                                            Managed 10+ clients, developing WordPress websites, landing pages, and writing SEO technical content. 
                                            Built strong client relationships and delivered custom web solutions across diverse industries.
                                        </p>
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

export default ResumeV1; 