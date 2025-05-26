import logo from "/assets/img/logo.png"
import { Link } from "react-router-dom";
import useSidebarMenu from "../../hooks/useSidebarMenu";
import useStickyMenu from "../../hooks/useStickyMenu";
import useSubMenuToggle from "../../hooks/useSubMenuToggle";

const HeaderV2 = () => {

    const { isOpen, openMenu, closeMenu } = useSidebarMenu();
    const isMenuSticky = useStickyMenu();
    const toggleSubMenu = useSubMenuToggle();

    return (
        <>
            <header>
                <nav className={`navbar mobile-sidenav navbar-box navbar-default validnavs navbar-sticky on no-full ${isMenuSticky ? "sticked" : ""} ${isOpen ? "navbar-responsive" : ""}`}>
                    <div className="top-search">
                        <div className="container-xl">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-search" /></span>
                                <input type="text" className="form-control" placeholder="Search" name="search" />
                                <span className="input-group-addon close-search"><i className="fa fa-times" /></span>
                            </div>
                        </div>
                    </div>
                    <div className="container nav-box d-flex justify-content-between align-items-center">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={openMenu}>
                                <i className="fa fa-bars" />
                            </button>
                            <Link className="navbar-brand" to="/">
                                <img src={logo} className="logo" alt="Logo" />
                            </Link>
                        </div>
                        <div className={`collapse navbar-collapse collapse-mobile ${isOpen ? "show" : ""}`} id="navbar-menu">
                            <img src={logo} alt="Logo" />
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={closeMenu}>
                                <i className="fa fa-times" />
                            </button>
                            <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                                <li className="dropdown">
                                    <Link to="#" className="dropdown-toggle active" data-toggle="dropdown" onClick={toggleSubMenu}>Home</Link>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/">Home Version Light</Link></li>
                                        <li><Link to="/home-dark">Home Version Dark</Link></li>
                                    </ul>
                                </li>
                                <li>
                                    <Link className="smooth-menu" to="/service">Services</Link>
                                </li>
                                <li>
                                    <Link className="smooth-menu" to="/projects">Portfolio</Link>
                                </li>
                                <li>
                                    <Link className="smooth-menu" to="/resume">Resume</Link>
                                </li>
                                <li>
                                    <Link className="smooth-menu" to="/pricing">Pricing</Link>
                                </li>
                                <li>
                                    <Link className="smooth-menu" to="/contact">Contact</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="nav-right">
                            <div className="attr-right">
                                <div className="attr-nav attr-box">
                                    <ul>
                                        <li className="button">
                                            <Link className="smooth-menu" to="/contact">{`Let's Talk`} <i className="fas fa-comment-alt" /></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`overlay-screen ${isOpen ? "opened" : ""}`} onClick={closeMenu}></div>
                </nav>
            </header>
        </>
    );
};

export default HeaderV2;