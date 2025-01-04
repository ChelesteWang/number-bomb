import React, { useState } from 'react';
import NumberBomb from './index';

const App: React.FC = () => {
  const [key, setKey] = useState(0);

  const handleRestart = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <NumberBomb key={key} onRestart={handleRestart} />
    </div>
  );
};

export default App;