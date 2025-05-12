import React from 'react';

interface FilterButtonProps {
  /** Unique identifier for the filter */
  id: string;
  /** Display text for the filter */
  label: string;
  /** Whether this filter is currently active */
  isActive: boolean;
  /** Click handler */
  onClick: (id: string) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Reusable filter button component
 */
const FilterButton: React.FC<FilterButtonProps> = ({
  id,
  label,
  isActive,
  onClick,
  className = ''
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      } ${className}`}
      onClick={() => onClick(id)}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
};

export default FilterButton;