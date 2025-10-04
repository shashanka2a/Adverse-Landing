import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardProps } from './card';

interface GlassmorphismCardProps extends CardProps {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'heavy';
  gradient?: boolean;
  hover3d?: boolean;
}

export const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  className = "",
  intensity = 'medium',
  gradient = false,
  hover3d = false,
  ...props
}) => {
  const intensityStyles = {
    light: 'bg-white/5 backdrop-blur-sm border-white/10',
    medium: 'bg-white/10 backdrop-blur-md border-white/20',
    heavy: 'bg-white/20 backdrop-blur-lg border-white/30'
  };

  const gradientStyle = gradient 
    ? 'bg-gradient-to-br from-white/20 via-white/10 to-white/5' 
    : '';

  return (
    <motion.div
      whileHover={hover3d ? {
        rotateY: 5,
        rotateX: 5,
        scale: 1.02,
        z: 50
      } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ 
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
    >
      <Card
        className={`
          ${intensityStyles[intensity]}
          ${gradientStyle}
          shadow-xl shadow-black/20
          relative overflow-hidden
          transition-all duration-300
          ${className}
        `}
        {...props}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{
            background: [
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'
            ],
            x: [-200, 200]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear"
          }}
          whileHover={{ opacity: 1 }}
        />
        
        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
        
        <div className="relative z-10">
          {children}
        </div>
      </Card>
    </motion.div>
  );
};