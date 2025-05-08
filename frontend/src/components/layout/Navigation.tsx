import React, { useState, useEffect } from 'react';
import type { NavigationTab, NavigationProps } from '../../types/index';

/**
 * Navigation component for tab-based navigation
 * Astro-compatible version (no react-router)
 */
const Navigation: React.FC<NavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  useRouter = false,
  className = '',
  variant = 'tabs'
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<string>(activeTab || tabs[0]?.id || '');
  const [currentPath, setCurrentPath] = useState<string>('');
  
  // Get current path on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);
  
  // Determine the active tab based on props or path
  const currentActiveTab = activeTab || internalActiveTab;
  
  // Get tab styles based on variant
  const getTabStyles = (isActive: boolean, isDisabled: boolean): string => {
    const baseStyles = 'py-2 px-4 font-medium transition-colors duration-200';
    const disabledStyles = 'opacity-50 cursor-not-allowed';
    
    if (isDisabled) {
      return `${baseStyles} text-gray-400 ${disabledStyles}`;
    }
    
    switch (variant) {
      case 'pills':
        return `${baseStyles} ${isActive 
          ? 'bg-blue-600 text-white rounded-lg' 
          : 'text-gray-600 hover:bg-gray-100 rounded-lg'}`;
      case 'underline':
        return `${baseStyles} ${isActive 
          ? 'text-blue-600 border-b-2 border-blue-600' 
          : 'text-gray-500 hover:text-gray-700'}`;
      case 'tabs':
      default:
        return `${baseStyles} ${isActive 
          ? 'text-blue-600 border-b-2 border-blue-600' 
          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'}`;
    }
  };
  
  const handleTabClick = (tabId: string) => {
    if (!activeTab) {
      // If no external state control, manage internally
      setInternalActiveTab(tabId);
    }
    
    // Call the change handler if provided
    if (onTabChange) {
      onTabChange(tabId);
    }
  };
  
  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      <div className={`flex border-b border-gray-200 ${variant === 'pills' ? 'border-0' : ''}`}>
        {tabs.map(tab => {
          // Check if this tab is active based on props or URL
          const isCurrentPath = tab.path && currentPath && currentPath.includes(tab.path);
          const isActive = useRouter 
            ? Boolean(isCurrentPath) 
            : currentActiveTab === tab.id;
          
          const tabContent = (
            <>
              {tab.icon && <i className={`${tab.icon} mr-2`}></i>}
              {tab.label}
            </>
          );
          
          return (
            <React.Fragment key={tab.id}>
              {useRouter && tab.path ? (
                <a
                  href={tab.path}
                  className={getTabStyles(isActive, !!tab.disabled)}
                  aria-disabled={tab.disabled ? true : undefined}
                >
                  {tabContent}
                </a>
              ) : (
                <button
                  className={getTabStyles(isActive, !!tab.disabled)}
                  onClick={() => !tab.disabled && handleTabClick(tab.id)}
                  disabled={tab.disabled}
                >
                  {tabContent}
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;