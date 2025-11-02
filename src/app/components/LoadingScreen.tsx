'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Firing up the ovens...');

  const messages = [
    'Firing up the ovens... 🔥',
    'Stretching the dough... 🤏',
    'Choosing the finest cheese... 🧀',
    'Adding secret sauce... 🍅',
    'Sprinkling magic dust... ✨',
    'Almost ready to serve! 🍕'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        const messageIndex = Math.floor((newProgress / 100) * messages.length);
        setMessage(messages[Math.min(messageIndex, messages.length - 1)]);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-32 h-32 md:w-48 md:h-48 mb-8 mx-auto">
          <Image
            src="/logo.png"
            alt="Bits & Pizzas Logo"
            fill
            className="object-contain animate-pulse"
            priority
          />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-300 mb-6">
          Bits & Pizzas
        </h1>
        
        <div className="w-64 bg-gray-700 rounded-full h-4 mb-4 mx-auto">
          <div 
            className="bg-red-600 h-4 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-white text-lg animate-pulse">
          {message}
        </p>
        
        <div className="mt-4 text-gray-400 text-sm">
          {Math.round(progress)}% loaded
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;