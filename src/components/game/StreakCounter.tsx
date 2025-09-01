'use client';

import React from 'react';

interface StreakCounterProps {
  count: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ count }) => {
  if (count === 0) {
    return null; // Don't show if streak is 0
  }

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-white text-2xl font-bold px-4 py-2 rounded-full shadow-lg animate-bounce">
      🔥 Streak: {count}
    </div>
  );
};

export default StreakCounter;
