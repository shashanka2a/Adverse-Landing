import React from 'react';
import { motion } from 'framer-motion';

export const MorphingBlob: React.FC<{ className?: string }> = ({ className = "" }) => {
  const paths = [
    "M60,-25.2C63.8,-5.6,47.3,14.8,26.7,25.3C6.1,35.8,-18.6,36.5,-36.1,25.9C-53.6,15.3,-63.8,-6.7,-60,-26.3C-56.2,-45.9,-38.4,-63.1,-16.4,-65.7C5.6,-68.3,31.1,-55.3,48.7,-35.9C66.3,-16.5,75.9,9.3,60,-25.2Z",
    "M45.2,-22.8C51.7,-7.3,46.4,10.9,35.6,23.8C24.8,36.7,8.5,44.3,-10.4,43.5C-29.3,42.7,-50.8,33.5,-59.6,16.6C-68.4,-0.3,-64.5,-24.9,-50.9,-40.4C-37.3,-55.9,-14,-62.3,4.8,-64.7C23.6,-67.1,38.7,-38.3,45.2,-22.8Z",
    "M35.8,-15.9C40.6,-2.8,35.2,11.6,25.1,21.4C15,31.2,0.2,36.4,-16.7,35.3C-33.6,34.2,-52.6,26.8,-59.1,13.2C-65.6,-0.4,-59.6,-20.2,-47.8,-35.2C-36,-50.2,-18.4,-60.4,-1.8,-59.5C14.8,-58.6,31,-15.9,35.8,-15.9Z",
    "M42.1,-19.6C48.3,-4.2,43.1,13.7,32.6,26.9C22.1,40.1,6.3,48.6,-11.8,47.8C-29.9,47,-50.3,36.9,-58.2,21.1C-66.1,5.3,-61.5,-16.2,-50.6,-31.4C-39.7,-46.6,-22.5,-55.5,-4.8,-53.5C12.9,-51.5,35.9,-35,42.1,-19.6Z"
  ];

  return (
    <div className={`absolute ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
          </linearGradient>
          
          <filter id="blobGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <motion.path
          d={paths[0]}
          fill="url(#blobGradient)"
          filter="url(#blobGlow)"
          transform="translate(100 100)"
          animate={{
            d: paths
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Smaller inner blob */}
        <motion.path
          d={paths[1]}
          fill="url(#blobGradient)"
          transform="translate(100 100) scale(0.6)"
          animate={{
            d: [...paths].reverse()
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
};