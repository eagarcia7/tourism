import React from 'react';

interface TagListProps {
  /** Array of tag items to display */
  items: string[];
  /** CSS classes for tag styling */
  className?: string;
  /** Optional click handler for tags */
  onTagClick?: (tag: string) => void;
}

/**
 * Reusable component for displaying a list of tags
 */
const TagList: React.FC<TagListProps> = ({
  items,
  className = '',
  onTagClick
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span 
          key={index} 
          className={`text-sm px-3 py-1 rounded-full ${className}`}
          onClick={onTagClick ? () => onTagClick(item) : undefined}
          style={onTagClick ? { cursor: 'pointer' } : undefined}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default TagList;