import React, { useState, useCallback } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Chatbot from './components/Chatbot/Chatbot';
import { initialScenarioConfig } from './data/mockData';
import './App.css';

const App = () => {
  const [scenarioConfig, setScenarioConfig] = useState(initialScenarioConfig);
  const [savedScenarios, setSavedScenarios] = useState([]);
  const [notification, setNotification] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleVisualize = useCallback(() => {
    showNotification('Visualizing scenario...', 'info');
    console.log('Visualizing scenario:', scenarioConfig);
  }, [scenarioConfig]);

  const handleSave = useCallback(() => {
    if (!scenarioConfig.name.trim()) {
      showNotification('Please enter a scenario name', 'error');
      return;
    }

    const newScenario = {
      id: `scenario_${Date.now()}`,
      name: scenarioConfig.name,
      config: { ...scenarioConfig },
    };

    setSavedScenarios((prev) => [...prev, newScenario]);
    showNotification(`Scenario "${scenarioConfig.name}" saved successfully!`, 'success');
    setScenarioConfig((prev) => ({ ...prev, name: '' }));
  }, [scenarioConfig]);

  const getNotificationClasses = () => {
    const baseClasses = 'fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-lg font-inter text-xs font-medium z-[2000] notification-animate shadow-card';
    switch (notification?.type) {
      case 'success':
        return `${baseClasses} bg-green-500 text-white`;
      case 'error':
        return `${baseClasses} bg-red-500 text-white`;
      case 'info':
        return `${baseClasses} bg-blue-500 text-white`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Header with Hamburger */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-300 p-3 flex items-center gap-3 lg:hidden">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} className="text-gray-700" />
        </button>
        <span className="text-sm font-semibold text-dark">Scenario Dashboard</span>
      </div>

      {/* Spacer for mobile header */}
      <div className="h-14 lg:hidden" />

      <Sidebar
        scenarioConfig={scenarioConfig}
        setScenarioConfig={setScenarioConfig}
        onVisualize={handleVisualize}
        onSave={handleSave}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col pt-14 lg:pt-0">
        <Dashboard savedScenariosList={savedScenarios} />
      </div>
      
      <Chatbot />
      
      {notification && (
        <div className={getNotificationClasses()}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default App;
