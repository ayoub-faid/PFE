import React, { useState, useEffect } from 'react';

export default function DebugCategories() {
  const [debugInfo, setDebugInfo] = useState('Loading...');

  useEffect(() => {
    async function debug() {
      try {
        const response = await fetch('http://localhost:5000/api/categories?active=true');
        const data = await response.json();
        setDebugInfo(JSON.stringify({
          status: response.status,
          dataLength: data.data ? data.data.length : 0,
          data: data
        }, null, 2));
      } catch (error) {
        setDebugInfo('Error: ' + error.message);
      }
    }
    debug();
  }, []);

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl mb-4">Debug Info</h1>
      <pre className="bg-gray-800 p-4 rounded overflow-auto">
        {debugInfo}
      </pre>
    </div>
  );
}
