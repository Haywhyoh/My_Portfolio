import Link from "next/link";

const SocialShareV1 = () => {
    return (
        <>
            <li>
                <Link href="https://www.facebook.com" target='_blank'>
                    <i className="fab fa-facebook" />
                </Link>
            </li>
            <li>
                <Link href="https://www.linkedin.com" target='_blank'>
                    <i className="fab fa-linkedin-in" />
                </Link>
            </li>
            <li>
                <Link href="https://dribbble.com" target='_blank'>
                    <i className="fab fa-dribbble" />
                </Link>
            </li>
        </>
    );
};

export default SocialShareV1; 