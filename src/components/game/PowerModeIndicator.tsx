'use client';

import React from 'react';

interface PowerModeIndicatorProps {
  isActive: boolean;
}

const PowerModeIndicator: React.FC<PowerModeIndicatorProps> = ({ isActive }) => {
  if (!isActive) {
    return null;
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600 text-5xl font-extrabold animate-pulse drop-shadow-lg z-50">
      POWER MODE!
    </div>
  );
};

export default PowerModeIndicator;
