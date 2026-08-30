/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import { Settings } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [downloads, setDownloads] = useState(12845); // Fake initial number

  const handleDownload = () => {
    setDownloads(prev => prev + 1);
  };

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onDownload={handleDownload} />
      ) : (
        <Dashboard totalDownloads={downloads} />
      )}

      {/* Secret toggle button for the developer to see the dashboard */}
      <button 
        onClick={() => setView(view === 'landing' ? 'dashboard' : 'landing')}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all z-[100] shadow-lg border border-white/10"
        title={view === 'landing' ? "Ver Panel de Estadísticas" : "Ver Landing Page"}
      >
        <Settings className="w-5 h-5" />
      </button>
    </>
  );
}
