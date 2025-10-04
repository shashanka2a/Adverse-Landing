import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from './button';

interface MagneticButtonProps extends ButtonProps {
  children: React.ReactNode;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  strength = 20,
  className = "",
  ...props 
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 100;
    
    if (distance < maxDistance) {
      const factor = (maxDistance - distance) / maxDistance;
      setPosition({
        x: deltaX * factor * (strength / 100),
        y: deltaY * factor * (strength / 100)
      });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ 
        type: "spring", 
        stiffness: 150, 
        damping: 15,
        mass: 0.5
      }}
      className="inline-block"
    >
      <Button
        ref={buttonRef}
        className={`relative overflow-hidden ${className}`}
        {...props}
      >
        <motion.div
          className="relative z-10"
          animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {children}
        </motion.div>
        
        {/* Magnetic field indicator */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0"
          animate={{ 
            opacity: Math.abs(position.x) + Math.abs(position.y) > 0 ? 0.5 : 0,
            scale: Math.abs(position.x) + Math.abs(position.y) > 0 ? 1.05 : 1
          }}
          transition={{ duration: 0.2 }}
        />
      </Button>
    </motion.div>
  );
};