// Mock data for the POS Scenario Dashboard

export const demographicOptions = [
  { id: 'single_male', label: 'Single Male' },
  { id: 'single_female', label: 'Single Female' },
  { id: 'female_married_local', label: 'Female Married to Local' },
  { id: 'female_married_non_local', label: 'Female Married to Non- Local' },
  { id: 'divorced_female', label: 'Divorced Female' },
  { id: 'widowed_female', label: 'Widowed Female' },
];

export const eligibilityOptions = [
  { id: 'supporter_status', label: 'Supporter Status' },
  { id: 'eligibility_age', label: 'Eligibility Age' },
  { id: 'low_income_sensitivity', label: 'Low income Sensitivity' },
];

export const initialScenarioConfig = {
  name: '',
  serviceType: 'core',
  demographics: ['female_married_local'],
  yearRange: { start: 2024, end: 2034 },
  mortalityRate: 2.00,
  age: 0,
  splitYears: false,
  eligibility: ['supporter_status', 'eligibility_age'],
  applicationRates: [],
  additionalAdjustments: [],
};

export const savedScenarios = [
  {
    id: 'baseline',
    name: 'Base Line',
    config: {
      ...initialScenarioConfig,
      demographics: ['single_male', 'single_female'],
      mortalityRate: 1.5,
    },
  },
  {
    id: 'scenario_1',
    name: 'Scenario 1',
    config: {
      ...initialScenarioConfig,
      demographics: ['female_married_local', 'divorced_female'],
      mortalityRate: 2.5,
    },
  },
];

export const outstandingDemandData = {
  baseline: { houses: 120000, land: 120000 },
  scenario_1: { houses: 1200000, land: 1200000 },
};

export const unallocatedSupplyData = {
  baseline: { houses: 120000, land: 120000 },
  scenario_1: { houses: 1200000, land: 1200000 },
};

export const totalGapData = {
  baseline: { houses: 120000, land: 120000 },
  scenario_1: { houses: 1200000, land: 1200000 },
};

export const demandChartData = [
  { year: 2024, baseline: 17000, scenario1: 15000 },
  { year: 2025, baseline: 15500, scenario1: 14000 },
  { year: 2026, baseline: 16500, scenario1: 18000 },
  { year: 2027, baseline: 22000, scenario1: 26000 },
  { year: 2028, baseline: 12500, scenario1: 25000 },
  { year: 2029, baseline: 28000, scenario1: 32000 },
  { year: 2030, baseline: 32000, scenario1: 38000 },
  { year: 2031, baseline: 35000, scenario1: 40000 },
  { year: 2032, baseline: 28000, scenario1: 32000 },
  { year: 2033, baseline: 20000, scenario1: 25000 },
  { year: 2034, baseline: 15000, scenario1: 18000 },
];

export const cumulativeDemandData = [
  { year: 2024, baseline: 17000, scenario1: 15000 },
  { year: 2025, baseline: 32500, scenario1: 29000 },
  { year: 2026, baseline: 49000, scenario1: 47000 },
  { year: 2027, baseline: 71000, scenario1: 73000 },
  { year: 2028, baseline: 83500, scenario1: 98000 },
  { year: 2029, baseline: 111500, scenario1: 130000 },
  { year: 2030, baseline: 143500, scenario1: 168000 },
  { year: 2031, baseline: 178500, scenario1: 208000 },
  { year: 2032, baseline: 206500, scenario1: 240000 },
  { year: 2033, baseline: 226500, scenario1: 265000 },
  { year: 2034, baseline: 241500, scenario1: 283000 },
];

export const houseLandSplitData = [
  { name: 'House', value: 70.55, color: '#3D6B59' },
  { name: 'Land', value: 29.45, color: '#5FCFB5' },
];

export const chatMessages = [
  {
    id: 1,
    type: 'bot',
    content: "Hello, I'm your ADHA Roshd! 👋 I'm your AI-Powered personal sport assistant. How can I help you?",
  },
  {
    id: 2,
    type: 'user',
    content: 'Increase marriage rates across Abu Dhabi by 5% over the next 5 years and show the impact on supply and demand.',
  },
  {
    id: 3,
    type: 'user',
    content: 'Apply it across all regions.',
  },
  {
    id: 4,
    type: 'bot',
    content: 'Would you like me to:\n1. Apply this change across **all regions**, or\n2. Focus on **specific municipalities**?',
  },
  {
    id: 5,
    type: 'bot',
    content: 'Scenario created: "Marriage Rate Increase – 5% (2026–2030)"\n• Parameter Applied: +5% marriage rate growth for 5 years\n• Scope: All Abu Dhabi regions',
  },
  {
    id: 6,
    type: 'bot',
    content: 'Would you like me to run the simulation now or save it for later analysis?',
    hasActions: true,
  },
];

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toString();
};
