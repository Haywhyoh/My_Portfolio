import ReactWOW from "react-wow";

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
                                    <ReactWOW animation="fadeInUp">
                                        <div className="timeline-style-one-item">
                                            <div className="timeline-header">
                                                <div className="left">
                                                    <h4>Lead Developer</h4>
                                                    <p>
                                                        Blockdots, London
                                                    </p>
                                                </div>
                                                <div className="right">
                                                    <span>2022 - Present</span>
                                                </div>
                                            </div>
                                            <div className="timeline-body">
                                                <p>
                                                    The education should be very interactual. Ut tincidunt est ac dolor aliquam
                                                    sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris
                                                    hendrerit ante. sectors of the economy or areas of culture sed mauris hendrerit,
                                                    laoreet smart software.
                                                </p>
                                            </div>
                                        </div>
                                    </ReactWOW>

                                    {/* Single Item */}
                                    <ReactWOW animation="fadeInUp">
                                        <div className="timeline-style-one-item">
                                            <div className="timeline-header">
                                                <div className="left">
                                                    <h4>Full Stack Web Developer</h4>
                                                    <p>
                                                        Parsons, The New School
                                                    </p>
                                                </div>
                                                <div className="right">
                                                    <span>2021 - 2022</span>
                                                </div>
                                            </div>
                                            <div className="timeline-body">
                                                <p>
                                                    The education should be very interactual. Ut tincidunt est ac dolor aliquam
                                                    sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris
                                                    hendrerit ante. sectors of the economy or areas of culture sed mauris hendrerit,
                                                    laoreet smart software.
                                                </p>
                                            </div>
                                        </div>
                                    </ReactWOW>

                                    {/* Single Item */}
                                    <ReactWOW animation="fadeInUp">
                                        <div className="timeline-style-one-item">
                                            <div className="timeline-header">
                                                <div className="left">
                                                    <h4>UI Designer</h4>
                                                    <p>
                                                        House of Life, Leeds
                                                    </p>
                                                </div>
                                                <div className="right">
                                                    <span>2018 - 2023</span>
                                                </div>
                                            </div>
                                            <div className="timeline-body">
                                                <p>
                                                    The education should be very interactual. Ut tincidunt est ac dolor aliquam
                                                    sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris
                                                    hendrerit ante. sectors of the economy or areas of culture sed mauris hendrerit,
                                                    laoreet smart software.
                                                </p>
                                            </div>
                                        </div>
                                    </ReactWOW>

                                </div>
                            </div>

                            <div className="col-lg-6">
                                <h2>Education Background</h2>
                                <div className="time-style-one-items">

                                    {/* Single Item */}
                                    <ReactWOW animation="fadeInUp">
                                        <div className="timeline-style-one-item">
                                            <div className="timeline-header">
                                                <div className="left">
                                                    <h4>Programming Course</h4>
                                                    <p>
                                                        Harverd University
                                                    </p>
                                                </div>
                                                <div className="right">
                                                    <span>2006 - 2014</span>
                                                </div>
                                            </div>
                                            <div className="timeline-body">
                                                <p>
                                                    The education should be very interactual. Ut tincidunt est ac dolor aliquam
                                                    sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris
                                                    hendrerit ante. sectors of the economy or areas of culture sed mauris hendrerit,
                                                    laoreet smart software.
                                                </p>
                                            </div>
                                        </div>
                                    </ReactWOW>

                                    {/* Single Item */}
                                    <ReactWOW animation="fadeInUp">
                                        <div className="timeline-style-one-item">
                                            <div className="timeline-header">
                                                <div className="left">
                                                    <h4>Graphic Design Course</h4>
                                                    <p>
                                                        Blockdots, London
                                                    </p>
                                                </div>
                                                <div className="right">
                                                    <span>2016 - 2020</span>
                                                </div>
                                            </div>
                                            <div className="timeline-body">
                                                <p>
                                                    The education should be very interactual. Ut tincidunt est ac dolor aliquam
                                                    sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris
                                                    hendrerit ante. sectors of the economy or areas of culture sed mauris hendrerit,
                                                    laoreet smart software.
                                                </p>
                                            </div>
                                        </div>
                                    </ReactWOW>

                                    {/* Single Item */}
                                    <ReactWOW animation="fadeInUp">
                                        <div className="timeline-style-one-item">
                                            <div className="timeline-header">
                                                <div className="left">
                                                    <h4>Web design course</h4>
                                                    <p>
                                                        University of California
                                                    </p>
                                                </div>
                                                <div className="right">
                                                    <span>2012 - 2015</span>
                                                </div>
                                            </div>
                                            <div className="timeline-body">
                                                <p>
                                                    The education should be very interactual. Ut tincidunt est ac dolor aliquam
                                                    sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris
                                                    hendrerit ante. sectors of the economy or areas of culture sed mauris hendrerit,
                                                    laoreet smart software.
                                                </p>
                                            </div>
                                        </div>
                                    </ReactWOW>
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