import React from 'react';
import { Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const PieChartCard = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-300 p-5">
      <div className="mb-4">
        <div className="flex items-center gap-1.5">
          <h3 className="text-sm font-semibold text-dark m-0">House & Land Applications Split</h3>
          <Info size={12} className="text-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={85}
              outerRadius={120}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-3 mt-4 w-full max-w-[200px]">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-xs text-gray-600 flex-1">{item.name}</span>
              <span className="text-sm font-semibold text-dark">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartCard;
