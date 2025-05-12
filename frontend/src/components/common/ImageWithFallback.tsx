import React from 'react';

interface ImageData {
  attributes?: {
    url: string;
    alternativeText?: string;
  };
}

interface ImageWithFallbackProps {
  /** Image data object from API */
  imageData?: ImageData;
  /** Direct URL to use if imageData is not available */
  fallbackUrl?: string;
  /** Default placeholder if no image is available */
  defaultPlaceholder?: string;
  /** Alt text for the image */
  altText: string;
  /** Additional CSS classes */
  className?: string;
  /** Optional onClick handler */
  onClick?: () => void;
}

/**
 * Reusable component that handles different image data structures with fallbacks
 */
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  imageData,
  fallbackUrl,
  defaultPlaceholder = "/images/placeholder.jpg",
  altText,
  className = '',
  onClick
}) => {
  // Determine the image URL to use
  const getImageUrl = (): string => {
    // First try using the direct imageData if available
    if (imageData?.attributes?.url) {
      return imageData.attributes.url;
    }
    
    // Then try the fallback URL
    if (fallbackUrl) {
      return fallbackUrl;
    }
    
    // Finally use the default placeholder
    return defaultPlaceholder;
  };

  // Determine the alt text
  const getAltText = (): string => {
    return imageData?.attributes?.alternativeText || altText;
  };

  return (
    <img
      src={getImageUrl()}
      alt={getAltText()}
      className={className}
      onClick={onClick}
    />
  );
};

export default ImageWithFallback;