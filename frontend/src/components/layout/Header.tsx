import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NavigationItem } from '../../types/index';
import '../../styles/header.css';

/**
 * Props for the Header component
 */
export interface HeaderProps {
  /** Main title for the header */
  title?: string;
  /** Subtitle or tagline */
  subtitle?: string;
  /** Optional badge text (like "New!" or "Special Promo") */
  badge?: string;
  /** Optional background image URL */
  backgroundImage?: string;
  /** Whether header should be transparent (for hero overlays) */
  isTransparent?: boolean;
  /** Array of navigation items */
  navigationItems?: NavigationItem[];
}

/**
 * Header component for the Hawaii Tourism website
 * Provides main navigation and branding elements
 */
const Header: React.FC<HeaderProps> = ({
  title = "Explore Hawaii",
  subtitle = "Discover paradise with our interactive travel guide",
  badge,
  backgroundImage,
  isTransparent = false,
  navigationItems = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic styles based on props
  const headerStyles: React.CSSProperties = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
    backgroundColor: isTransparent ? 'transparent' : undefined,
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isTransparent && !hasScrolled ? 'bg-transparent' : 'bg-primary shadow-lg'
      }`}
      style={headerStyles}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="Hawaii Tourism" className="h-12" />
            <h1 className="text-3xl font-bold">{title}</h1>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="group relative">
              <button className="nav-link">Islands</button>
              <div className="hidden group-hover:block absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg overflow-hidden">
                <a href="/islands/kauai" className="block px-6 py-3 hover:bg-gray-50 text-gray-700">Kauaʻi</a>
                <a href="/islands/oahu" className="block px-6 py-3 hover:bg-gray-50 text-gray-700">Oʻahu</a>
                <a href="/islands/molokai" className="block px-6 py-3 hover:bg-gray-50 text-gray-700">Molokaʻi</a>
                <a href="/islands/lanai" className="block px-6 py-3 hover:bg-gray-50 text-gray-700">Lānaʻi</a>
                <a href="/islands/maui" className="block px-6 py-3 hover:bg-gray-50 text-gray-700">Maui</a>
                <a href="/islands/hawaii" className="block px-6 py-3 hover:bg-gray-50 text-gray-700">Island of Hawaiʻi</a>
              </div>
            </div>

            <div className="group relative">
              <button className="nav-link">Experiences</button>
              <div className="hidden group-hover:block absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg overflow-hidden">
                <a href="/experiences/adventure" className="block px-6 py-3 hover:bg-gray-50 text-gray-700">Adventure</a>
                <a href="/experiences/beaches" className="block px-6 py-3 hover:bg-gray-50 text-gray-700">Beaches</a>
                <a href="/experiences/culture" className="block px-6 py-3 hover:bg-gray-50 text-gray-700">Culture</a>
                <a href="/experiences/cuisine" className="block px-6 py-3 hover:bg-gray-50 text-gray-700">Cuisine</a>
              </div>
            </div>

            <a href="/trip-planning" className="nav-link">Trip Planning</a>
            <a href="/places-to-stay" className="nav-link">Places to Stay</a>
            <a href="/special-offers" className="nav-link">Special Offers</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="font-semibold text-gray-900 mb-2">Islands</div>
                  <div className="space-y-2">
                    <a href="/islands/kauai" className="block text-gray-600 hover:text-primary">Kauaʻi</a>
                    <a href="/islands/oahu" className="block text-gray-600 hover:text-primary">Oʻahu</a>
                    <a href="/islands/molokai" className="block text-gray-600 hover:text-primary">Molokaʻi</a>
                    <a href="/islands/lanai" className="block text-gray-600 hover:text-primary">Lānaʻi</a>
                    <a href="/islands/maui" className="block text-gray-600 hover:text-primary">Maui</a>
                    <a href="/islands/hawaii" className="block text-gray-600 hover:text-primary">Island of Hawaiʻi</a>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <div className="font-semibold text-gray-900 mb-2">Experiences</div>
                  <div className="space-y-2">
                    <a href="/experiences/adventure" className="block text-gray-600 hover:text-primary">Adventure</a>
                    <a href="/experiences/beaches" className="block text-gray-600 hover:text-primary">Beaches</a>
                    <a href="/experiences/culture" className="block text-gray-600 hover:text-primary">Culture</a>
                    <a href="/experiences/cuisine" className="block text-gray-600 hover:text-primary">Cuisine</a>
                  </div>
                </div>

                <a href="/trip-planning" className="block font-semibold text-gray-900 hover:text-primary">Trip Planning</a>
                <a href="/places-to-stay" className="block font-semibold text-gray-900 hover:text-primary">Places to Stay</a>
                <a href="/special-offers" className="block font-semibold text-gray-900 hover:text-primary">Special Offers</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;