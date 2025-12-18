import React from 'react';
import { Info, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatNumber } from '../../data/mockData';

const StatsCard = ({ title, headerVariant, houses, land, icon }) => {
  const getHeaderClasses = () => {
    const baseClasses = 'flex items-center gap-2 py-3 px-3 lg:px-4';
    switch (headerVariant) {
      case 'pink':
        return `${baseClasses} bg-pink-light`;
      case 'dark':
        return `${baseClasses} bg-dark-card`;
      case 'grey':
        return `${baseClasses} bg-gray-100`;
      default:
        return `${baseClasses} bg-white`;
    }
  };

  const getTitleColor = () => {
    return headerVariant === 'dark' ? 'text-white' : 'text-dark';
  };

  const getInfoIconColor = () => {
    return headerVariant === 'dark' ? 'text-white/60' : 'text-gray-500';
  };

  return (
    <div className="rounded-lg border border-gray-300 bg-white overflow-hidden">
      <div className={getHeaderClasses()}>
        <div className="w-5 h-5 flex items-center justify-center text-xs">{icon}</div>
        <span className={`text-xs font-semibold flex-1 ${getTitleColor()}`}>{title}</span>
        <Info size={12} className={`cursor-pointer ${getInfoIconColor()}`} />
      </div>
      <div className="flex gap-4 p-3 lg:p-4 bg-white">
        <div className="flex-1">
          <div className="text-[10px] font-medium text-gray-600 mb-2 pb-1.5 border-b border-gray-200">Houses</div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-[10px] text-gray-500 w-12">Base Line</span>
            <span className="text-xs font-semibold text-dark min-w-[40px]">{formatNumber(houses.baseline)}</span>
            <span className="text-[9px] text-green-500 flex items-center gap-0.5">
              <ArrowUpRight size={9} /> 00%
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-gray-500 w-12">Scenario</span>
            <span className={`text-xs font-semibold min-w-[40px] ${
              headerVariant === 'dark' 
                ? 'bg-teal/15 px-1.5 py-0.5 rounded text-teal' 
                : 'text-teal'
            }`}>
              {formatNumber(houses.scenario)}
            </span>
            <span className="text-[9px] text-red-500 flex items-center gap-0.5">
              <ArrowDownRight size={9} /> 00%
            </span>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-medium text-gray-600 mb-2 pb-1.5 border-b border-gray-200">Land</div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-[10px] text-gray-500 w-12">Base Line</span>
            <span className="text-xs font-semibold text-dark min-w-[40px]">{formatNumber(land.baseline)}</span>
            <span className="text-[9px] text-green-500 flex items-center gap-0.5">
              <ArrowUpRight size={9} /> 00%
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-gray-500 w-12">Scenario</span>
            <span className={`text-xs font-semibold min-w-[40px] ${
              headerVariant === 'dark' 
                ? 'bg-teal/15 px-1.5 py-0.5 rounded text-teal' 
                : 'text-teal'
            }`}>
              {formatNumber(land.scenario)}
            </span>
            <span className="text-[9px] text-red-500 flex items-center gap-0.5">
              <ArrowDownRight size={9} /> 00%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;

