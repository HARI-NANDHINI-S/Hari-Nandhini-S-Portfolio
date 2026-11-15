import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setShowBackToTop(latest > 350);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollPercent(Math.round((latest / total) * 100));
      }
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-orange origin-left z-[9990] shadow-glow-cyan"
        style={{ scaleX }}
      />

      {/* Floating Back To Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full glass-panel border border-cyber-blue/30 text-cyber-text hover:text-cyber-cyan hover:border-cyber-cyan shadow-glow-subtle hover:shadow-glow-cyan transition-all duration-300 group flex items-center justify-center"
        >
          <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
          <span className="sr-only">Scroll to top ({scrollPercent}%)</span>
        </motion.button>
      )}
    </>
  );
};

