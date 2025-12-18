import React from 'react';
import { Info, Grid3X3, Download } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ChartTooltip from './ChartTooltip';

const DemandChart = ({ 
  chartData, 
  demandType, 
  setDemandType, 
  chartType, 
  setChartType 
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-300 p-5">
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-4">
          <h3 className="text-sm font-semibold text-dark m-0">Demand (New Applications)</h3>
          <Info size={12} className="text-gray-500 cursor-pointer" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-gray-150 rounded-md p-0.5">
            <button
              className={`py-1.5 px-3 border-none font-inter text-[11px] font-medium cursor-pointer rounded transition-all duration-200 whitespace-nowrap
                ${demandType === 'excluding' ? 'bg-dark text-white' : 'bg-transparent text-gray-600 hover:bg-gray-300'}`}
              onClick={() => setDemandType('excluding')}
            >
              Excl. Current Demand
            </button>
            <button
              className={`py-1.5 px-3 border-none font-inter text-[11px] font-medium cursor-pointer rounded transition-all duration-200 whitespace-nowrap
                ${demandType === 'including' ? 'bg-dark text-white' : 'bg-transparent text-gray-600 hover:bg-gray-300'}`}
              onClick={() => setDemandType('including')}
            >
              Incl. Current Demand
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[11px] text-gray-600">
              <span className="w-2 h-2 rounded-full bg-teal"></span>
              Base Line
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-gray-600">
              <span className="w-2 h-2 rounded-full bg-teal-light"></span>
              Scenario 1
            </span>
          </div>
          <div className="flex bg-gray-150 rounded-md p-0.5">
            <button
              className={`py-1.5 px-3 border-none font-inter text-[11px] font-medium cursor-pointer rounded transition-all duration-200 whitespace-nowrap
                ${chartType === 'annual' ? 'bg-dark text-white' : 'bg-transparent text-gray-600 hover:bg-gray-300'}`}
              onClick={() => setChartType('annual')}
            >
              Annual
            </button>
            <button
              className={`py-1.5 px-3 border-none font-inter text-[11px] font-medium cursor-pointer rounded transition-all duration-200 whitespace-nowrap
                ${chartType === 'cumulative' ? 'bg-dark text-white' : 'bg-transparent text-gray-600 hover:bg-gray-300'}`}
              onClick={() => setChartType('cumulative')}
            >
              Cumulative
            </button>
          </div>
          <div className="flex gap-1.5 ml-auto">
            <button className="w-8 h-8 border border-gray-300 rounded-md bg-white flex items-center justify-center cursor-pointer text-gray-600 transition-all duration-200 hover:bg-gray-150 hover:border-dark">
              <Grid3X3 size={14} />
            </button>
            <button className="w-8 h-8 border border-gray-300 rounded-md bg-white flex items-center justify-center cursor-pointer text-gray-600 transition-all duration-200 hover:bg-gray-150 hover:border-dark">
              <Download size={14} />
            </button>
          </div>
        </div>
      </div>
      <div className="relative">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData} margin={{ top: 16, right: 24, left: 10, bottom: 16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#999999' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#999999' }}
              tickFormatter={(value) => {
                if (value >= 1000) return (value / 1000) + 'K';
                return value;
              }}
              label={{ value: 'Units', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#999999', fontSize: 11 } }}
            />
            <Tooltip content={<ChartTooltip />} />
            <Line
              type="linear"
              dataKey="baseline"
              stroke="#3D6B59"
              strokeWidth={2.5}
              dot={{ fill: '#3D6B59', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, fill: '#3D6B59' }}
            />
            <Line
              type="linear"
              dataKey="scenario1"
              stroke="#5FCFB5"
              strokeWidth={2.5}
              strokeDasharray="6 4"
              dot={{ fill: '#5FCFB5', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, fill: '#5FCFB5' }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="text-center text-[11px] text-gray-500 mt-2">Year</div>
      </div>
    </div>
  );
};

export default DemandChart;
