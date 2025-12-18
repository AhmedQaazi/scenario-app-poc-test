import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const ChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 rounded-md p-2 shadow-card">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-teal"></span>
          <span className="text-[10px] text-gray-600">Base Line:</span>
          <span className="text-[11px] font-semibold text-dark">{payload[0]?.value}</span>
          <span className="text-[9px] text-green-500 flex items-center gap-0.5">
            <ArrowUpRight size={9} /> 00% YoY
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-light"></span>
          <span className="text-[10px] text-gray-600">Scenario 1:</span>
          <span className="text-[11px] font-semibold text-dark">{payload[1]?.value}</span>
          <span className="text-[9px] text-red-500 flex items-center gap-0.5">
            <ArrowDownRight size={9} /> 00% YoY
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default ChartTooltip;

