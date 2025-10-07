'use client';

import dynamic from 'next/dynamic';

const Link = dynamic(() => import('react-scroll').then(mod => ({ default: mod.Link })), { ssr: false });

interface DataType {
    closeMenu?: () => void;
}

const ScrollContact: React.FC<DataType> = ({ closeMenu }) => {
    return (
        <>
            <li className='button'>
                {/* <Link className="smooth-menu" to="contact" offset={-50} onClick={closeMenu}>Let&apos;s Talk <i className="fas fa-comment-alt" /></Link> */}
                <button className="smooth-menu btn" onClick={closeMenu}>Let&apos;s Talk <i className="fas fa-comment-alt" /></button>
            </li>
        </>
    );
};

export default ScrollContact; 