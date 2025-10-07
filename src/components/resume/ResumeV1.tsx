'use client';

interface DataType {
    sectionClass?: string;
}

const ResumeV1 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div id="resume" className={`timeline-area ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="time-line-style-one-box">
                        <div className="row guttex-xl">
                            <div className="col-lg-6">
                                <h2>My Expertise</h2>
                                <div className="time-style-one-items">

                                    {/* Single Item */}
                                    <div className="timeline-style-one-item">
                                        <div className="timeline-header">
                                            <div className="left">
                                                <h4>Software Engineer</h4>
                                                <p>
                                                    CodeMyGig - Remote
                                                </p>
                                            </div>
                                            <div className="right">
                                                <span>03/25 – present</span>
                                            </div>
                                        </div>
                                        <div className="timeline-body">
                                            <p>
                                                Leading a 6-person contract development team, working on 3 different client projects, serving more than 8,000 users. 
                                                Resolved an average of 20 medium bugs per iteration and encouraged TDD adoption, bringing 20% of code under test coverage.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Single Item */}
                                    <div className="timeline-style-one-item">
                                        <div className="timeline-header">
                                            <div className="left">
                                                <h4>Fullstack Engineer</h4>
                                                <p>
                                                    Hux Ventures - Remote, USA
                                                </p>
                                            </div>
                                            <div className="right">
                                                <span>06/24 – 03/25</span>
                                            </div>
                                        </div>
                                        <div className="timeline-body">
                                            <p>
                                                Led a 5-person team that delivered two web applications and SaaS, serving 13,000 combined users. 
                                                Independently responsible for Staff and Partners dashboard with referral and affiliate system tracking earnings for over 200 partners.
                                            </p>
                                        </div>
                                    </div>

                                 
                                    {/* Single Item */}
                                    <div className="timeline-style-one-item">
                                        <div className="timeline-header">
                                            <div className="left">
                                                <h4>Web Developer</h4>
                                                <p>
                                                    Probus Technologies - Lagos
                                                </p>
                                            </div>
                                            <div className="right">
                                                <span>06/22 – 05/23</span>
                                            </div>
                                        </div>
                                        <div className="timeline-body">
                                            <p>
                                                Built and maintained static landing pages and React/WordPress websites for various clients. 
                                                Developed unit tests using Pytest and Jest, created comprehensive API documentation to enhance developer understanding.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Single Item */}
                                        <div className="timeline-style-one-item">
                                        <div className="timeline-header">
                                            <div className="left">
                                                <h4>Software Engineer</h4>
                                                <p>
                                                    Remote - Internship
                                                </p>
                                            </div>
                                            <div className="right">
                                                <span>02/21 – 03/22</span>
                                            </div>
                                        </div>
                                        <div className="timeline-body">
                                            <p>
                                            Built dynamic web applications using React for the front end and Node.js for the back end. - Improved user experience by implementing responsive design and optimizing load times
                                            </p>
                                        </div>
                                    </div>

                                    <div className="timeline-style-one-item">
                                        <div className="timeline-header">
                                            <div className="left">
                                                <h4>Independent Freelancer</h4>
                                                <p>
                                                   Upwork - Freelance
                                                </p>
                                            </div>
                                            <div className="right">
                                                <span>2019 - 2021</span>
                                            </div>
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

                            <div className="col-lg-6">
                                <h2>Education Background</h2>
                                <div className="time-style-one-items">

                                    {/* Single Item */}
                                    <div className="timeline-style-one-item">
                                        <div className="timeline-header">
                                            <div className="left">
                                                <h4>BSc. Electronics Engineering</h4>
                                                <p>
                                                    Obafemi Awolowo University
                                                </p>
                                            </div>
                                            <div className="right">
                                                <span>2016 - 2021</span>
                                            </div>
                                        </div>
                                        <div className="timeline-body">
                                            <p>
                                                Comprehensive study of electronic and electrical engineering principles, including circuit design, 
                                                digital systems, and engineering mathematics. Strong foundation in problem-solving and analytical thinking.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Single Item */}
                                    <div className="timeline-style-one-item">
                                        <div className="timeline-header">
                                            <div className="left">
                                                <h4>Full-Stack Engineering Diploma</h4>
                                                <p>
                                                    Holberton School
                                                </p>
                                            </div>
                                            <div className="right">
                                                <span>2021 - 2022</span>
                                            </div>
                                        </div>
                                        <div className="timeline-body">
                                            <p>
                                                Intensive 70 hours/week project-based learning program focused on full-stack software engineering. 
                                                Mastered modern web technologies, algorithms, data structures, and collaborative development practices.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Single Item */}
                              
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