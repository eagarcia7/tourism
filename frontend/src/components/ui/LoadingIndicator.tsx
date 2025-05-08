import React from 'react';

interface LoadingIndicatorProps {
  /** Message to display under the loading spinner */
  message?: string;
  /** Size of the spinner (small, medium, large) */
  size?: 'small' | 'medium' | 'large';
  /** Whether to render a full-page overlay */
  fullPage?: boolean;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Loading indicator component with customizable appearance
 */
const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = 'Loading...',
  size = 'medium',
  fullPage = false,
  className = '',
}) => {
  // Determine spinner size based on the size prop
  const getSizeClasses = (): string => {
    switch (size) {
      case 'small':
        return 'h-4 w-4 border-2';
      case 'large':
        return 'h-12 w-12 border-4';
      case 'medium':
      default:
        return 'h-8 w-8 border-4';
    }
  };
  
  // Get container classes based on fullPage prop
  const containerClasses = fullPage
    ? 'fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50'
    : `flex justify-center items-center h-64 ${className}`;
  
  const spinnerSizeClasses = getSizeClasses();
  
  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <div className="text-center">
        <div 
          className={`inline-block ${spinnerSizeClasses} animate-spin rounded-full border-solid border-blue-600 border-r-transparent`}
          aria-hidden="true"
        ></div>
        {message && (
          <p className="mt-2 text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingIndicator;