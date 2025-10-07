import Link from "next/link";

export default function NotFound() {
    return (
        <div className="error-page-area default-padding-bottom pt-260 pt-md-180 pt-xs-140 text-center">
            <div className="shape-left" style={{ background: 'url(/assets/img/shape/44-left.png)' }} />
            <div className="shape-right" style={{ background: 'url(/assets/img/shape/44-right.png)' }} />
            <div className="container">
                <div className="error-box">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <h1>404</h1>
                            <h2>Sorry Page Was Not Found!</h2>
                            <p>
                                The page you're looking for doesn't exist. Feel free to explore my portfolio projects, check out my services, or get in touch to discuss potential collaborations.
                            </p>
                            <Link className="btn mt-20 btn-md btn-theme" href="/">Back to home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}