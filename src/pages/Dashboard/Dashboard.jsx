import React, { useState, useMemo, useCallback } from 'react';
import { savedScenarios, demandChartData, cumulativeDemandData } from '../../data/mockData';
import ComparisonSelector from '../../components/Dashboard/ComparisonSelector';
import StatsCard from '../../components/Dashboard/StatsCard';
import DemandChart from '../../components/Dashboard/DemandChart';
import PieChartCard from '../../components/Dashboard/PieChartCard';

const Dashboard = ({ savedScenariosList }) => {
  const [selectedBaseline, setSelectedBaseline] = useState('baseline');
  const [selectedScenario, setSelectedScenario] = useState('scenario_1');
  const [demandType, setDemandType] = useState('excluding');
  const [chartType, setChartType] = useState('annual');

  const allScenarios = useMemo(() => {
    return [...savedScenarios, ...savedScenariosList];
  }, [savedScenariosList]);

  const getScenarioMultiplier = useCallback((scenarioId) => {
    if (scenarioId === 'baseline') return 1;
    if (scenarioId === 'scenario_1') return 1.2;
    const customScenario = savedScenariosList.find(s => s.id === scenarioId);
    if (customScenario) {
      return 1 + (customScenario.config.demographics.length * 0.15);
    }
    return 1;
  }, [savedScenariosList]);

  const chartData = useMemo(() => {
    const baseData = chartType === 'annual' ? demandChartData : cumulativeDemandData;
    const baselineMultiplier = getScenarioMultiplier(selectedBaseline);
    const scenarioMultiplier = getScenarioMultiplier(selectedScenario);
    const demandMultiplier = demandType === 'including' ? 1.3 : 1;
    
    return baseData.map(item => ({
      ...item,
      baseline: Math.round(item.baseline * baselineMultiplier * demandMultiplier),
      scenario1: Math.round(item.scenario1 * scenarioMultiplier * demandMultiplier),
    }));
  }, [chartType, selectedBaseline, selectedScenario, demandType, getScenarioMultiplier]);

  const statsData = useMemo(() => {
    const baselineMultiplier = getScenarioMultiplier(selectedBaseline);
    const scenarioMultiplier = getScenarioMultiplier(selectedScenario);
    const demandMultiplier = demandType === 'including' ? 1.5 : 1;
    
    return {
      outstandingDemand: {
        houses: { 
          baseline: Math.round(120000 * baselineMultiplier * demandMultiplier), 
          scenario: Math.round(1200000 * scenarioMultiplier) 
        },
        land: { 
          baseline: Math.round(120000 * baselineMultiplier * demandMultiplier), 
          scenario: Math.round(1200000 * scenarioMultiplier) 
        },
      },
      unallocatedSupply: {
        houses: { 
          baseline: Math.round(120000 * baselineMultiplier), 
          scenario: Math.round(1200000 * scenarioMultiplier) 
        },
        land: { 
          baseline: Math.round(120000 * baselineMultiplier), 
          scenario: Math.round(1200000 * scenarioMultiplier) 
        },
      },
      totalGap: {
        houses: { 
          baseline: Math.round(120000 * baselineMultiplier), 
          scenario: Math.round(1200000 * scenarioMultiplier) 
        },
        land: { 
          baseline: Math.round(120000 * baselineMultiplier), 
          scenario: Math.round(1200000 * scenarioMultiplier) 
        },
      },
    };
  }, [selectedBaseline, selectedScenario, demandType, getScenarioMultiplier]);

  const pieSplitData = useMemo(() => {
    const scenarioMultiplier = getScenarioMultiplier(selectedScenario);
    const housePercentage = Math.min(85, 70.55 + (scenarioMultiplier - 1) * 20);
    const landPercentage = 100 - housePercentage;
    
    return [
      { name: 'House', value: parseFloat(housePercentage.toFixed(2)), color: '#3D6B59' },
      { name: 'Land', value: parseFloat(landPercentage.toFixed(2)), color: '#5FCFB5' },
    ];
  }, [selectedScenario, getScenarioMultiplier]);

  const handleSwapScenarios = () => {
    const temp = selectedBaseline;
    setSelectedBaseline(selectedScenario);
    setSelectedScenario(temp);
  };

  return (
    <div className="flex-1 p-5 lg:p-6 xl:p-7 bg-gray-50 overflow-y-auto custom-scrollbar">
      <ComparisonSelector
        selectedBaseline={selectedBaseline}
        setSelectedBaseline={setSelectedBaseline}
        selectedScenario={selectedScenario}
        setSelectedScenario={setSelectedScenario}
        scenarios={allScenarios}
        onSwap={handleSwapScenarios}
      />

      {/* Stats Cards - with proper spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        <StatsCard
          title="Outstanding Demand"
          headerVariant="pink"
          houses={statsData.outstandingDemand.houses}
          land={statsData.outstandingDemand.land}
          icon={<span>📋</span>}
        />
        <StatsCard
          title="Unallocated Supply"
          headerVariant="dark"
          houses={statsData.unallocatedSupply.houses}
          land={statsData.unallocatedSupply.land}
          icon={<span>⚠️</span>}
        />
        <StatsCard
          title="Total Gap"
          headerVariant="grey"
          houses={statsData.totalGap.houses}
          land={statsData.totalGap.land}
          icon={<span>📋</span>}
        />
      </div>

      {/* Charts Section - adjusted grid for proper width distribution */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_380px] gap-5">
        <DemandChart
          chartData={chartData}
          demandType={demandType}
          setDemandType={setDemandType}
          chartType={chartType}
          setChartType={setChartType}
        />
        <PieChartCard data={pieSplitData} />
      </div>
    </div>
  );
};

export default Dashboard;
