import React from 'react';

interface BackButtonProps {
  /** Function to handle back button click */
  onBack?: () => void;
  /** Label text for the button */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Reusable back button with fallback navigation logic
 */
const BackButton: React.FC<BackButtonProps> = ({
  onBack,
  label = 'Back',
  className = ''
}) => {
  // Local back handler that works on the client
  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    
    // If no onBack provided, use browser history
    if (typeof window !== 'undefined') {
      // Check if there's history to go back to
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // Fallback to redirect to the home page
        window.location.href = '/';
      }
    }
  };

  return (
    <button 
      onClick={handleBack}
      className={`ml-4 mt-4 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm ${className}`}
      aria-label={label}
    >
      ← {label}
    </button>
  );
};

export default BackButton;