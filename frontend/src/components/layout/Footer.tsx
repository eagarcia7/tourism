import React from 'react';
import type { FooterProps, SocialMediaLink, FooterNavSection } from '../../types/index';
import '../../styles/footer.css';

/**
 * Footer component for the Hawaii Tourism website
 * Provides site navigation, social links, and copyright information
 */
const Footer: React.FC<FooterProps> = ({
  title = "Explore Hawaii",
  subtitle = "Demo for Travel & Tourism CMS Integration Project",
  techStack = [],
  copyrightText = "This is a demo application for technical lead role demonstration purposes.",
  socialLinks = [],
  navSections = [],
  year = new Date().getFullYear()
}) => {
  return (
    <footer className="footer">
    <div className="footer-container">
        <div className="footer-grid">
        <div className="footer-main-column">
            <h3 className="footer-title text-white">{title}</h3>
            <p className="footer-subtitle">{subtitle}</p>

            {socialLinks.length > 0 && (
            <div className="footer-social">
                {socialLinks.map((social, index) => (
                <a 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.platform}`}
                    className="footer-social-link"
                >
                    <i className={social.icon}></i>
                </a>
                ))}
            </div>
            )}
        </div>

        {navSections.map((section, i) => (
            <div key={i} className="footer-main-column">
            <h4 className="footer-section-title">{section.title}</h4>
            <ul className="footer-section-list">
                {section.links.map((link, j) => (
                <li key={j}>
                    <a href={link.url} className="footer-link">
                    {link.label}
                    </a>
                </li>
                ))}
            </ul>
            </div>
        ))}

        {techStack.length > 0 && (
            <div className={navSections.length > 0 ? "" : "footer-main-column"}>
            <h4 className="footer-section-title">Tech Stack</h4>
            <ul className="footer-tech-list">
                {techStack.map((tech, index) => (
                <li key={index}>• {tech}</li>
                ))}
            </ul>
            </div>
        )}
        </div>

        <div className="footer-copyright">
        <div className="footer-copyright-inner">
            <p>{copyrightText}</p>
            <p>© {year} Hawaii Tourism. All rights reserved.</p>
        </div>
        </div>
    </div>
    </footer>
  );
};

export default Footer;