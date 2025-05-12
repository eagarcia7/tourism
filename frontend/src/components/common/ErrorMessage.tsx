import React from 'react';
import Icon from '../ui/Icon';
import type { IconName } from '../../types/icon-types';

interface ErrorMessageProps {
  /** Error message to display */
  message: string;
  /** Icon to display alongside the message */
  icon?: IconName;
  /** Type of error message */
  type?: 'error' | 'warning' | 'info';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Reusable error message component
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  icon,
  type = 'error',
  className = ''
}) => {
  // Map types to tailwind classes and defaults
  const typeMap = {
    error: {
      containerClass: 'bg-red-50 border-red-200 text-red-800',
      defaultIcon: 'warning' as IconName
    },
    warning: {
      containerClass: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      defaultIcon: 'warning' as IconName
    },
    info: {
      containerClass: 'bg-blue-50 border-blue-200 text-blue-800',
      defaultIcon: 'info' as IconName
    }
  };

  const { containerClass, defaultIcon } = typeMap[type];
  const iconToShow = icon || defaultIcon;

  return (
    <div className={`border rounded-lg p-4 mb-6 flex items-start ${containerClass} ${className}`}>
      <div className="flex-shrink-0 mr-3">
        <Icon name={iconToShow} size="md" />
      </div>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;