import { Link } from 'react-scroll';
import NextLink from 'next/link';

interface DataType {
    closeMenu?: () => void;
}

const ScrollMenu: React.FC<DataType> = ({ closeMenu }) => {
    return (
        <>
            <li>
                <NextLink href="/services" className="smooth-menu" onClick={closeMenu}>Services</NextLink>
            </li>
            <li>
                <NextLink href="/projects" className="smooth-menu" onClick={closeMenu}>Portfolio</NextLink>
            </li>
            {/* <li>
                <NextLink href="/resume" className="smooth-menu" onClick={closeMenu}>Resume</NextLink>
            </li> */}
            <li>
                <NextLink href="/blog" className="smooth-menu" onClick={closeMenu}>Blog</NextLink>
            </li>
            {/* <li>
                <NextLink href="/pricing" className="smooth-menu" onClick={closeMenu}>Pricing</NextLink>
            </li> */}
            <li>
                <NextLink href="/contact" className="smooth-menu" onClick={closeMenu}>Contact</NextLink>
            </li>
        </>
    );
};

export default ScrollMenu; 