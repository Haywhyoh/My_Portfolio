import Link from "next/link";

const FooterV1 = () => {
    return (
        <>
            <footer className="default-padding bg-cover" style={{ backgroundImage: 'url(/assets/img/shape/1.jpg)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="footer-items text-center">
                                <Link href="/" className="footer-logot"><img src="/assets/img/logo.png" alt="Image Not Found" /></Link>
                                <ul className="foter-menu">
                                    <li><Link href="/">Home</Link></li>
                                    <li><Link href="/service">Services</Link></li>
                                    <li><Link href="/projects/2">Portfolio</Link></li>
                                    <li><Link href="/blog-with-sidebar">Blog</Link></li>
                                    <li><Link href="/contact">Contact</Link></li>
                                </ul>
                                <p>Copyright  &copy; {(new Date().getFullYear())} Antux. All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterV1; 