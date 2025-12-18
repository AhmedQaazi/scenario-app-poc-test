import React from 'react';
import { RefreshCw } from 'lucide-react';

const ComparisonSelector = ({ 
  selectedBaseline, 
  setSelectedBaseline, 
  selectedScenario, 
  setSelectedScenario, 
  scenarios,
  onSwap 
}) => {
  return (
    <div className="mb-4 lg:mb-5">
      <div className="flex flex-wrap items-center gap-3 lg:gap-5">
        <span className="text-xs lg:text-sm font-semibold text-dark">Select Comparison</span>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-full py-1 px-3">
            <span className="text-[10px] lg:text-xs text-gray-600 whitespace-nowrap">Select Scenario:</span>
            <select
              value={selectedBaseline}
              onChange={(e) => setSelectedBaseline(e.target.value)}
              className="border-none bg-transparent font-inter text-xs font-medium text-dark cursor-pointer outline-none pr-1 min-w-[70px]"
            >
              {scenarios.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </option>
              ))}
            </select>
          </div>
          <button 
            className="w-7 h-7 border border-gray-300 rounded-md bg-white flex items-center justify-center cursor-pointer text-gray-600 transition-all duration-200 hover:bg-gray-150 hover:border-dark"
            onClick={onSwap}
          >
            <RefreshCw size={12} />
          </button>
          <div className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-full py-1 px-3">
            <span className="text-[10px] lg:text-xs text-gray-600 whitespace-nowrap">Scenario 2:</span>
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
              className="border-none bg-transparent font-inter text-xs font-medium text-dark cursor-pointer outline-none pr-1 min-w-[70px]"
            >
              {scenarios.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSelector;

