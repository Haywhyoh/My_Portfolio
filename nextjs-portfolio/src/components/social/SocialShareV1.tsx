import Link from "next/link";

const SocialShareV1 = () => {
    return (
        <>
            <li>
                <Link href="https://x.com/cruise_dev" target='_blank'>
                    <i className="fab fa-twitter" />
                </Link>
            </li>
            <li>
                <Link href="https://www.linkedin.com/in/ayomide-samuel/" target='_blank'>
                    <i className="fab fa-linkedin-in" />
                </Link>
            </li>
            <li>
                <Link href="https://wa.link/r712vm" target='_blank'>
                    <i className="fab fa-whatsapp" />
                </Link>
            </li>
            <li>
                <Link href="https://github.com/Haywhyoh" target='_blank'>
                    <i className="fab fa-github" />
                </Link>
            </li>
        </>
    );
};

export default SocialShareV1; 