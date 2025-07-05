import React, { useState, useEffect } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-900 to-purple-700">
      <header className="bg-gradient-to-r from-purple-800 to-purple-900 text-white p-2 shadow-md flex flex-col sm:flex-row items-center justify-center sm:justify-between border-b-4 border-purple-600">
        <h1 className="text-2xl font-bold mb-1 sm:mb-0">Build Pipeline</h1>
        {isMobile && (
          <div className="text-sm text-purple-100">
            <span>Rotate device for better experience</span>
          </div>
        )}
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
