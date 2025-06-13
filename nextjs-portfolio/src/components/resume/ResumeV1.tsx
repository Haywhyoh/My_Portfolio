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
                                        <span>2021 - Present</span>
                                        <h4>Senior Web Developer</h4>
                                        <p>Tech Solutions Inc.</p>
                                    </div>
                                    <div className="timeline-body">
                                        <p>
                                            Leading development of enterprise web applications using React, Next.js, and Node.js. 
                                            Mentoring junior developers and architecting scalable solutions.
                                        </p>
                                    </div>
                                </div>

                                <div className="timeline-style-one-item">
                                    <div className="timeline-header">
                                        <span>2019 - 2021</span>
                                        <h4>Frontend Developer</h4>
                                        <p>Digital Agency Pro</p>
                                    </div>
                                    <div className="timeline-body">
                                        <p>
                                            Developed responsive websites and web applications for various clients. 
                                            Specialized in React, Vue.js, and modern JavaScript frameworks.
                                        </p>
                                    </div>
                                </div>

                                <div className="timeline-style-one-item">
                                    <div className="timeline-header">
                                        <span>2017 - 2019</span>
                                        <h4>Junior Web Developer</h4>
                                        <p>StartUp Studios</p>
                                    </div>
                                    <div className="timeline-body">
                                        <p>
                                            Started my professional journey building WordPress websites and learning 
                                            modern web development technologies.
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
                                        <span>2013 - 2017</span>
                                        <h4>Bachelor of Computer Science</h4>
                                        <p>University of Technology</p>
                                    </div>
                                    <div className="timeline-body">
                                        <p>
                                            Comprehensive study of computer science fundamentals including algorithms, 
                                            data structures, and software engineering principles.
                                        </p>
                                    </div>
                                </div>

                                <div className="timeline-style-one-item">
                                    <div className="timeline-header">
                                        <span>2020</span>
                                        <h4>React Developer Certification</h4>
                                        <p>Tech Academy</p>
                                    </div>
                                    <div className="timeline-body">
                                        <p>
                                            Advanced certification in React development, including Redux, 
                                            Context API, and modern React patterns.
                                        </p>
                                    </div>
                                </div>

                                <div className="timeline-style-one-item">
                                    <div className="timeline-header">
                                        <span>2021</span>
                                        <h4>AWS Solutions Architect</h4>
                                        <p>Amazon Web Services</p>
                                    </div>
                                    <div className="timeline-body">
                                        <p>
                                            Certified in designing and deploying scalable applications 
                                            on AWS cloud infrastructure.
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