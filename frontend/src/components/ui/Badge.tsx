import React from 'react';

interface BadgeProps {
  /** Text to display in the badge */
  label: string;
  /** Color theme for the badge */
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray';
  /** Size of the badge */
  size?: 'xs' | 'sm' | 'md';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Reusable badge component for status indicators and labels
 */
const Badge: React.FC<BadgeProps> = ({
  label,
  color = 'gray',
  size = 'xs',
  className = ''
}) => {
  // Map colors to tailwind classes
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    purple: 'bg-purple-100 text-purple-800',
    gray: 'bg-gray-100 text-gray-800'
  };

  // Map sizes to tailwind classes
  const sizeClasses = {
    xs: 'text-xs px-2 py-1',
    sm: 'text-sm px-2.5 py-1',
    md: 'text-sm px-3 py-1.5'
  };

  return (
    <span className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full font-medium whitespace-nowrap ${className}`}>
      {label}
    </span>
  );
};

export default Badge;