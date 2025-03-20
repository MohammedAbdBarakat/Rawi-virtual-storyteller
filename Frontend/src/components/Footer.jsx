import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Footer = ({ logo, links, socialMedia, copyrightText }) => {
    return (
        <footer className="bg-[--secondary] text-[--text] py-8">
            <div className="container mx-auto px-4">
                {/* Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Logo */}
                    <div className="flex-shrink pl-16">
                        <h2 className="text-[--text] Heading_Bold_02">{logo}</h2>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-6">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                className="text-lg text-[--text] hover:text-[--text] transition-colors"
                            >
                                {link.text}
                            </Link>
                        ))}
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex gap-4 pr-16">
                        {socialMedia.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                            >
                                <img src={social.icon} alt={social.name} className="h-6 w-6 hover:opacity-75" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Copyright Text */}
                <div className="text-center mt-8 text-lg text-[--secondary2]">
                    <p>{copyrightText}</p>
                </div>
            </div>
        </footer>
    );
};


export default Footer;