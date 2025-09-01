'use client';

import React, { useEffect, useState } from 'react';

interface ScreenShakeProps {
  children: React.ReactNode;
  trigger: boolean; // A prop to trigger the shake effect
  duration?: number; // Duration of the shake in ms
  intensity?: 'low' | 'medium' | 'high'; // Intensity of the shake
}

const ScreenShake: React.FC<ScreenShakeProps> = ({
  children,
  trigger,
  duration = 500,
  intensity = 'medium',
}) => {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsShaking(true);
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  const getShakeClass = () => {
    switch (intensity) {
      case 'low':
        return 'animate-shake-low';
      case 'medium':
        return 'animate-shake-medium';
      case 'high':
        return 'animate-shake-high';
      default:
        return '';
    }
  };

  // We need to define the keyframes for the shake animation in a global CSS file
  // For now, I'll assume these are defined in globals.css or similar.
  // Example CSS (to be added to globals.css):
  /*
  @keyframes shake-low {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }
  .animate-shake-low {
    animation: shake-low 0.1s infinite;
  }
  // Similar for medium and high intensity
  */

  return (
    <div className={isShaking ? getShakeClass() : ''}>
      {children}
    </div>
  );
};

export default ScreenShake;
