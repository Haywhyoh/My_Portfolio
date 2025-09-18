import { Link } from 'react-scroll';
import NextLink from 'next/link';

interface DataType {
    closeMenu?: () => void;
}

const ScrollMenu: React.FC<DataType> = ({ closeMenu }) => {
    return (
        <>
            <li>
                <Link className="smooth-menu" to="services" offset={-50} onClick={closeMenu}>Services</Link>
            </li>
            <li>
                <Link className="smooth-menu" to="portfolio" offset={-50} onClick={closeMenu}>Portfolio</Link>
            </li>
            <li>
                <Link className="smooth-menu" to="resume" offset={-50} onClick={closeMenu}>Resume</Link>
            </li>
            <li>
                <NextLink href="/blog" className="smooth-menu" onClick={closeMenu}>Blog</NextLink>
            </li>
            <li>
                <Link className="smooth-menu" to="pricing" offset={-50} onClick={closeMenu}>Pricing</Link>
            </li>
            <li>
                <Link className="smooth-menu" to="contact" offset={-50} onClick={closeMenu}>Contact</Link>
            </li>
        </>
    );
};

export default ScrollMenu; 