import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const SpotlightEffect: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useSpring(0, { stiffness: 120, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 120, damping: 25 });

  useEffect(() => {
    setIsMounted(true);
    // Only track if not a touch-only device
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* Dynamic Cursor Radial Spotlight */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-40 dark:opacity-45 light:opacity-25"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(56, 217, 255, 0.22) 0%, rgba(22, 139, 255, 0.12) 40%, transparent 70%)',
        }}
      />

      {/* Restrained Secondary Orange Light in Selected Corner */}
      <div className="absolute top-1/3 -right-48 w-[450px] h-[450px] rounded-full bg-cyber-orange/10 dark:bg-cyber-orange/10 light:bg-light-accentOrange/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-[450px] h-[450px] rounded-full bg-cyber-blue/10 dark:bg-cyber-blue/10 light:bg-light-accentBlue/10 blur-[130px] pointer-events-none" />
    </div>
  );
};

