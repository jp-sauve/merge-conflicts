'use client';

import React, { useState, useEffect } from 'react';

interface ExclamationsProps {
  trigger: boolean; // Trigger to show an exclamation
  onComplete?: () => void; // Callback when animation completes
}

const exclamations = [
  "Super!",
  "Radical!",
  "Awesome!",
  "Fantastic!",
  "Amazing!",
  "Unbelievable!",
  "Incredible!",
  "Wow!",
  "Boom!",
  "Nailed it!",
];

const Exclamations: React.FC<ExclamationsProps> = ({ trigger, onComplete }) => {
  const [currentExclamation, setCurrentExclamation] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      const randomIndex = Math.floor(Math.random() * exclamations.length);
      setCurrentExclamation(exclamations[randomIndex]);
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        setCurrentExclamation(null);
        if (onComplete) {
          onComplete();
        }
      }, 1500); // Display for 1.5 seconds

      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!currentExclamation || !isVisible) {
    return null;
  }

  return (
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-purple-500 text-6xl font-extrabold animate-pop-up drop-shadow-lg z-50">
      {currentExclamation}
    </div>
  );
};

export default Exclamations;
