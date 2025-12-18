import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const Accordion = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="mb-1.5 border-b border-gray-200">
      <button 
        className="w-full flex justify-between items-center py-3 border-none bg-transparent cursor-pointer font-inter"
        onClick={onToggle}
      >
        <span className="text-xs font-semibold text-dark">{title}</span>
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-600" />
        ) : (
          <ChevronDown size={16} className="text-gray-600" />
        )}
      </button>
      {isOpen && <div className="pb-3">{children}</div>}
    </div>
  );
};

export default Accordion;

