import React, { useState } from 'react';
import { X } from 'lucide-react';
import { demographicOptions, eligibilityOptions } from '../../data/mockData';
import { Accordion, ToggleButton } from '../common';

const applicationRateOptions = [
  { id: 'base_rate', label: 'Base Rate' },
  { id: 'growth_rate', label: 'Growth Rate' },
  { id: 'seasonal_adjustment', label: 'Seasonal Adjustment' },
  { id: 'approval_ratio', label: 'Approval Ratio' },
];

const additionalAdjustmentOptions = [
  { id: 'inflation_factor', label: 'Inflation Factor' },
  { id: 'market_correction', label: 'Market Correction' },
  { id: 'policy_impact', label: 'Policy Impact' },
];

const Sidebar = ({ scenarioConfig, setScenarioConfig, onVisualize, onSave, isOpen, onClose }) => {
  const [openAccordions, setOpenAccordions] = useState({
    demographics: true,
    mortality: true,
    policy: true,
    applicationRates: false,
    additionalAdjustment: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleServiceTypeChange = (type) => {
    setScenarioConfig((prev) => ({ ...prev, serviceType: type }));
  };

  const handleDemographicToggle = (id) => {
    setScenarioConfig((prev) => {
      const demographics = prev.demographics.includes(id)
        ? prev.demographics.filter((d) => d !== id)
        : [...prev.demographics, id];
      return { ...prev, demographics };
    });
  };

  const handleEligibilityToggle = (id) => {
    setScenarioConfig((prev) => {
      const eligibility = prev.eligibility.includes(id)
        ? prev.eligibility.filter((e) => e !== id)
        : [...prev.eligibility, id];
      return { ...prev, eligibility };
    });
  };

  const handleApplicationRateToggle = (id) => {
    setScenarioConfig((prev) => {
      const applicationRates = prev.applicationRates || [];
      const newRates = applicationRates.includes(id)
        ? applicationRates.filter((r) => r !== id)
        : [...applicationRates, id];
      return { ...prev, applicationRates: newRates };
    });
  };

  const handleAdjustmentToggle = (id) => {
    setScenarioConfig((prev) => {
      const adjustments = prev.additionalAdjustments || [];
      const newAdjustments = adjustments.includes(id)
        ? adjustments.filter((a) => a !== id)
        : [...adjustments, id];
      return { ...prev, additionalAdjustments: newAdjustments };
    });
  };

  const handleInputChange = (field, value) => {
    setScenarioConfig((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed lg:sticky inset-y-0 left-0 lg:top-0 z-50 lg:z-auto
        w-[280px] lg:w-[300px] xl:w-[320px]
        h-screen lg:h-screen bg-white border-r border-gray-300 
        flex flex-col overflow-hidden
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-300 lg:hidden flex-shrink-0">
          <span className="text-sm font-semibold text-dark">Scenario Config</span>
          <button 
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 lg:p-4">
          {/* Service Type Tabs */}
          <div className="flex bg-gray-150 rounded-md p-0.5 mb-3 lg:mb-4">
            <button
              className={`flex-1 py-2 px-3 border-none font-inter text-[11px] font-medium cursor-pointer rounded transition-all duration-200
                ${scenarioConfig.serviceType === 'core' 
                  ? 'bg-dark text-white' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-300'
                }`}
              onClick={() => handleServiceTypeChange('core')}
            >
              Core Services
            </button>
            <button
              className={`flex-1 py-2 px-3 border-none font-inter text-[11px] font-medium cursor-pointer rounded transition-all duration-200
                ${scenarioConfig.serviceType === 'loan' 
                  ? 'bg-dark text-white' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-300'
                }`}
              onClick={() => handleServiceTypeChange('loan')}
            >
              Loan Services
            </button>
          </div>

          {/* Scenario Name Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Type Your Scenario Name"
              value={scenarioConfig.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full py-2.5 px-3 border border-gray-300 rounded-md font-inter text-xs text-gray-700 bg-white transition-colors duration-200 placeholder:text-gray-500 focus:outline-none focus:border-dark"
            />
          </div>

          {/* Demographic Rates Accordion */}
          <Accordion
            title="Demographic Rates"
            isOpen={openAccordions.demographics}
            onToggle={() => toggleAccordion('demographics')}
          >
            <div className="flex flex-wrap gap-1.5 bg-gray-100 p-2.5 rounded-lg">
              {demographicOptions.map((option) => (
                <ToggleButton
                  key={option.id}
                  label={option.label}
                  isActive={scenarioConfig.demographics.includes(option.id)}
                  onClick={() => handleDemographicToggle(option.id)}
                />
              ))}
            </div>
          </Accordion>

          {/* Yearly Mortality Rate & Age */}
          <div className="py-3 border-b border-gray-200">
            <div className="text-xs font-semibold text-dark mb-1">Yearly Mortality Rate & Age</div>
            <div className="text-[11px] text-gray-500 mb-3">
              Year {scenarioConfig.yearRange.start} - {scenarioConfig.yearRange.end}
            </div>
            <div className="flex gap-2 mb-3">
              <div className="flex-1">
                <label className="block text-[10px] text-gray-500 mb-1">Rate</label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50">
                  <input
                    type="number"
                    value={scenarioConfig.mortalityRate}
                    onChange={(e) => handleInputChange('mortalityRate', parseFloat(e.target.value) || 0)}
                    step="0.01"
                    className="flex-1 py-2 px-2 border-none bg-transparent font-inter text-xs text-gray-700 w-[40px] focus:outline-none"
                  />
                  <span className="py-2 px-2 bg-gray-200 text-[10px] text-gray-600 border-l border-gray-300">%</span>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-[10px] text-gray-500 mb-1">Age</label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50">
                  <input
                    type="number"
                    value={scenarioConfig.age}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                    className="flex-1 py-2 px-2 border-none bg-transparent font-inter text-xs text-gray-700 w-[40px] focus:outline-none"
                  />
                  <span className="py-2 px-2 bg-gray-200 text-[10px] text-gray-600 border-l border-gray-300">Years</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="checkbox"
                id="splitYears"
                checked={scenarioConfig.splitYears}
                onChange={(e) => handleInputChange('splitYears', e.target.checked)}
                className="w-3.5 h-3.5 accent-dark cursor-pointer"
              />
              <label htmlFor="splitYears" className="text-[11px] text-gray-600 cursor-pointer">Split years</label>
            </div>
          </div>

          {/* Policy Configuration Accordion */}
          <Accordion
            title="Policy Configuration"
            isOpen={openAccordions.policy}
            onToggle={() => toggleAccordion('policy')}
          >
            <div className="pt-1">
              <div className="text-[11px] font-medium text-gray-600 mb-2">Eligibility</div>
              <div className="flex flex-wrap gap-1.5 bg-gray-100 p-2.5 rounded-lg">
                {eligibilityOptions.map((option) => (
                  <ToggleButton
                    key={option.id}
                    label={option.label}
                    isActive={scenarioConfig.eligibility.includes(option.id)}
                    onClick={() => handleEligibilityToggle(option.id)}
                  />
                ))}
              </div>
            </div>
          </Accordion>

          {/* Application & Approval Rates Accordion */}
          <Accordion
            title="Application & Approval Rates"
            isOpen={openAccordions.applicationRates}
            onToggle={() => toggleAccordion('applicationRates')}
          >
            <div className="pt-1">
              <div className="text-[11px] font-medium text-gray-600 mb-2">Rate Configuration</div>
              <div className="flex flex-wrap gap-1.5 bg-gray-100 p-2.5 rounded-lg">
                {applicationRateOptions.map((option) => (
                  <ToggleButton
                    key={option.id}
                    label={option.label}
                    isActive={(scenarioConfig.applicationRates || []).includes(option.id)}
                    onClick={() => handleApplicationRateToggle(option.id)}
                  />
                ))}
              </div>
            </div>
          </Accordion>

          {/* Application Rate Additional Adjustment Accordion */}
          <Accordion
            title="Application Rate Additional Adjustment"
            isOpen={openAccordions.additionalAdjustment}
            onToggle={() => toggleAccordion('additionalAdjustment')}
          >
            <div className="pt-1">
              <div className="text-[11px] font-medium text-gray-600 mb-2">Adjustment Factors</div>
              <div className="flex flex-wrap gap-1.5 bg-gray-100 p-2.5 rounded-lg">
                {additionalAdjustmentOptions.map((option) => (
                  <ToggleButton
                    key={option.id}
                    label={option.label}
                    isActive={(scenarioConfig.additionalAdjustments || []).includes(option.id)}
                    onClick={() => handleAdjustmentToggle(option.id)}
                  />
                ))}
              </div>
            </div>
          </Accordion>
        </div>

        {/* Action Buttons */}
        <div className="p-3 border-t border-gray-300 flex gap-2 flex-shrink-0">
          <button 
            className="flex-1 py-2.5 px-3 border border-gray-300 rounded-md bg-white font-inter text-xs font-medium text-gray-700 cursor-pointer transition-all duration-200 hover:bg-gray-150 hover:border-dark"
            onClick={() => { onVisualize(); onClose(); }}
          >
            Visualise Scenario
          </button>
          <button 
            className="flex-1 py-2.5 px-3 border-none rounded-md bg-primary font-inter text-xs font-medium text-white cursor-pointer transition-all duration-200 hover:bg-primary-hover"
            onClick={() => { onSave(); onClose(); }}
          >
            Save Scenario
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
