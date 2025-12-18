import React from 'react';

const ToggleButton = ({ label, isActive, onClick, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
  };

  return (
    <button
      className={`${sizeClasses[size]} border rounded-md font-inter font-medium cursor-pointer transition-all duration-200
        ${isActive 
          ? 'bg-dark border-dark text-white' 
          : 'bg-white border-gray-300 text-gray-600 hover:border-dark hover:text-dark'
        }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ToggleButton;

