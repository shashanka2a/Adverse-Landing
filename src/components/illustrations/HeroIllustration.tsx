import React from 'react';
import { motion } from 'framer-motion';

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Animated Background Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <motion.path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="url(#gridGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </pattern>
          
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
          </linearGradient>
          
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect width="800" height="600" fill="url(#grid)" opacity="0.1" />
        
        {/* Neural Network Nodes */}
        {[
          { x: 100, y: 150, delay: 0 },
          { x: 200, y: 100, delay: 0.2 },
          { x: 300, y: 200, delay: 0.4 },
          { x: 450, y: 120, delay: 0.6 },
          { x: 550, y: 180, delay: 0.8 },
          { x: 650, y: 140, delay: 1.0 },
          { x: 150, y: 350, delay: 0.3 },
          { x: 300, y: 400, delay: 0.5 },
          { x: 500, y: 380, delay: 0.7 },
          { x: 650, y: 350, delay: 0.9 }
        ].map((node, index) => (
          <motion.circle
            key={index}
            cx={node.x}
            cy={node.y}
            r="8"
            fill="url(#neuralGradient)"
            filter="url(#glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 1, 0.8]
            }}
            transition={{ 
              duration: 1.5,
              delay: node.delay,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 2
            }}
          />
        ))}
        
        {/* Animated Connections */}
        {[
          { x1: 100, y1: 150, x2: 200, y2: 100 },
          { x1: 200, y1: 100, x2: 300, y2: 200 },
          { x1: 300, y1: 200, x2: 450, y2: 120 },
          { x1: 450, y1: 120, x2: 550, y2: 180 },
          { x1: 550, y1: 180, x2: 650, y2: 140 },
          { x1: 150, y1: 350, x2: 300, y2: 400 },
          { x1: 300, y1: 400, x2: 500, y2: 380 },
          { x1: 500, y1: 380, x2: 650, y2: 350 },
          { x1: 300, y1: 200, x2: 300, y2: 400 },
          { x1: 450, y1: 120, x2: 500, y2: 380 }
        ].map((connection, index) => (
          <motion.line
            key={index}
            x1={connection.x1}
            y1={connection.y1}
            x2={connection.x2}
            y2={connection.y2}
            stroke="url(#neuralGradient)"
            strokeWidth="2"
            opacity="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 2,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Floating Data Particles */}
        {[...Array(15)].map((_, index) => (
          <motion.circle
            key={`particle-${index}`}
            cx={Math.random() * 800}
            cy={Math.random() * 600}
            r="3"
            fill="#06b6d4"
            opacity="0.6"
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Central AI Brain */}
        <motion.g
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          <circle
            cx="400"
            cy="300"
            r="50"
            fill="none"
            stroke="url(#neuralGradient)"
            strokeWidth="3"
            opacity="0.8"
            filter="url(#glow)"
          />
          <motion.circle
            cx="400"
            cy="300"
            r="30"
            fill="url(#neuralGradient)"
            opacity="0.3"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Brain waves */}
          {[...Array(3)].map((_, index) => (
            <motion.circle
              key={`wave-${index}`}
              cx="400"
              cy="300"
              r={70 + index * 20}
              fill="none"
              stroke="url(#neuralGradient)"
              strokeWidth="1"
              opacity="0.2"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0, 0.2]
              }}
              transition={{ 
                duration: 3,
                delay: index * 0.5,
                repeat: Infinity 
              }}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
};