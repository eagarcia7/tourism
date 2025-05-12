import React from 'react';

interface GradientOverlayProps {
  /** Direction of the gradient (Tailwind format) */
  direction?: 'to-t' | 'to-b' | 'to-l' | 'to-r' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl';
  /** From color with opacity */
  fromColor?: string;
  /** Via color with opacity (optional) */
  viaColor?: string;
  /** To color with opacity */
  toColor?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Reusable component for creating gradient overlays on images
 */
const GradientOverlay: React.FC<GradientOverlayProps> = ({
  direction = 'to-b',
  fromColor = 'black/80',
  viaColor = 'black/40',
  toColor = 'transparent',
  className = ''
}) => {
  // Build the gradient class
  const gradientClass = `bg-gradient-${direction} from-${fromColor}${viaColor ? ` via-${viaColor}` : ''} to-${toColor}`;

  return (
    <div 
      className={`absolute inset-0 ${gradientClass} transition-opacity duration-300 ${className}`}
      aria-hidden="true"
    />
  );
};

export default GradientOverlay;