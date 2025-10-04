import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate' | 'parallax';
  delay?: number;
  duration?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  animation = 'fadeUp',
  delay = 0,
  duration = 0.8
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const animations = {
    fadeUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 }
    },
    fadeLeft: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 }
    },
    fadeRight: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 }
    },
    rotate: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 }
    },
    parallax: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    }
  };

  const currentAnimation = animations[animation];
  
  // Parallax transform
  const y = useTransform(scrollYProgress, [0, 1], [0, animation === 'parallax' ? -50 : 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={currentAnimation.initial}
      animate={isInView ? currentAnimation.animate : currentAnimation.initial}
      transition={{
        duration,
        delay,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      style={{ y: animation === 'parallax' ? y : undefined }}
    >
      {children}
    </motion.div>
  );
};