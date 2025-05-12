import React from 'react';
import Icon from '../ui/Icon';
import type { IconName } from '../../types/icon-types';

interface ArrowLinkProps {
  /** Label text for the link */
  label: string;
  /** Additional CSS classes */
  className?: string;
  /** Direction of the arrow */
  direction?: 'right' | 'left' | 'up' | 'down';
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * Reusable component for links with animated arrows
 */
const ArrowLink: React.FC<ArrowLinkProps> = ({
  label,
  className = '',
  direction = 'right',
  onClick
}) => {
  // Map direction to icon name
  const getIconName = (): IconName => {
    switch (direction) {
      case 'right': return 'arrow-right';
      case 'left': return 'arrow-left';
      case 'up': return 'arrow-up';
      case 'down': return 'arrow-down';
      default: return 'arrow-right';
    }
  };
  
  // Transform class based on direction
  const getTransformClass = () => {
    switch (direction) {
      case 'right': return 'group-hover:translate-x-1';
      case 'left': return 'group-hover:-translate-x-1';
      case 'up': return 'group-hover:-translate-y-1';
      case 'down': return 'group-hover:translate-y-1';
      default: return 'group-hover:translate-x-1';
    }
  };

  return (
    <div 
      className={`flex items-center text-sm font-medium ${className}`}
      onClick={onClick}
    >
      <span>{label}</span>
      <Icon 
        name={getIconName()} 
        size="sm"
        className={`ml-1 transform transition-transform duration-300 ${getTransformClass()}`}
      />
    </div>
  );
};

export default ArrowLink;