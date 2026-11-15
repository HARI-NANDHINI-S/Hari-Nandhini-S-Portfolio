import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 250);
          return 100;
        }
        return prev + 12;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[99999] bg-[#050B16] flex flex-col items-center justify-center p-4 select-none"
    >
      {/* Ambient Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-cyber-blue/20 blur-[100px] pointer-events-none" />

      {/* Hexagon Monogram */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl border-2 border-cyber-blue/40 shadow-glow-cyan flex items-center justify-center bg-cyber-card relative overflow-hidden">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-display font-extrabold text-3xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-orange font-mono"
          >
            HN
          </motion.span>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/10 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Title */}
      <h2 className="font-display font-bold text-lg text-cyber-text tracking-wider mb-1">
        HARI NANDHINI S
      </h2>
      <p className="text-[11px] font-mono text-cyber-muted tracking-widest mb-6 uppercase">
        Initializing Digital Workspace...
      </p>

      {/* Progress Bar */}
      <div className="w-56 h-1.5 rounded-full bg-cyber-card border border-cyber-cardBorder overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-orange shadow-glow-cyan"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage */}
      <span className="text-[10px] font-mono text-cyber-cyan mt-2">
        {Math.min(100, progress)}%
      </span>
    </motion.div>
  );
};

