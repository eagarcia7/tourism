import React from 'react';

interface InfoSectionProps {
  /** Title for the section */
  title: string;
  /** Content text for the section */
  content: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Reusable information section component with consistent styling
 */
const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  content,
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="font-bold text-lg text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

export default InfoSection;