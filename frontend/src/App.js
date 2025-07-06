import React, { useState, useEffect } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
      <header className="ai-pipeline-header">
        <div className="icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex flex-col">
          <h1 className="title">Build Pipeline</h1>
          {isMobile && (
            <div className="subtitle">
              <span>Rotate device for better experience</span>
            </div>
          )}
        </div>
      </header>
      <div className="flex-grow flex flex-col overflow-hidden">
        <PipelineToolbar />
        <div className="flex-grow overflow-hidden">
          <PipelineUI isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
}

export default App;
