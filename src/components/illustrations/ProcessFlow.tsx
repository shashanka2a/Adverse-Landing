import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, FileText, Video, Mic, Send } from 'lucide-react';

export const ProcessFlow: React.FC = () => {
  const steps = [
    { icon: Lightbulb, title: 'Concept', color: '#f59e0b' },
    { icon: FileText, title: 'Script', color: '#10b981' },
    { icon: Video, title: 'Generate', color: '#8b5cf6' },
    { icon: Mic, title: 'Audio', color: '#ec4899' },
    { icon: Send, title: 'Deliver', color: '#06b6d4' }
  ];

  return (
    <div className="relative w-full h-64">
      <svg viewBox="0 0 1000 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="25%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="75%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          
          <filter id="processGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Animated Flow Line */}
        <motion.path
          d="M 50 150 Q 250 100 450 150 Q 650 200 950 150"
          fill="none"
          stroke="url(#flowGradient)"
          strokeWidth="4"
          filter="url(#processGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Data Flow Particles */}
        {[...Array(8)].map((_, index) => (
          <motion.circle
            key={index}
            r="4"
            fill="#ffffff"
            opacity="0.8"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{
              duration: 4,
              delay: index * 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              offsetPath: "path('M 50 150 Q 250 100 450 150 Q 650 200 950 150')"
            }}
          />
        ))}
        
        {/* Step Nodes */}
        {steps.map((step, index) => {
          const x = 50 + (index * 225);
          const y = index % 2 === 0 ? 150 : 150 + (index === 1 ? -50 : index === 3 ? 50 : 0);
          
          return (
            <motion.g
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                bounce: 0.5
              }}
            >
              {/* Node Background */}
              <motion.circle
                cx={x}
                cy={y}
                r="40"
                fill={step.color}
                opacity="0.2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ 
                  duration: 2,
                  delay: index * 0.3,
                  repeat: Infinity 
                }}
              />
              
              {/* Node Core */}
              <circle
                cx={x}
                cy={y}
                r="25"
                fill={step.color}
                filter="url(#processGlow)"
              />
              
              {/* Pulse Ring */}
              <motion.circle
                cx={x}
                cy={y}
                r="25"
                fill="none"
                stroke={step.color}
                strokeWidth="2"
                opacity="0.6"
                animate={{ 
                  r: [25, 45, 25],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{ 
                  duration: 2,
                  delay: index * 0.4,
                  repeat: Infinity 
                }}
              />
            </motion.g>
          );
        })}
        
        {/* Step Labels */}
        {steps.map((step, index) => {
          const x = 50 + (index * 225);
          const y = index % 2 === 0 ? 150 : 150 + (index === 1 ? -50 : index === 3 ? 50 : 0);
          
          return (
            <motion.text
              key={`label-${index}`}
              x={x}
              y={y + 60}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="14"
              fontWeight="500"
              initial={{ opacity: 0, y: y + 80 }}
              animate={{ opacity: 1, y: y + 60 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
            >
              {step.title}
            </motion.text>
          );
        })}
      </svg>
    </div>
  );
};