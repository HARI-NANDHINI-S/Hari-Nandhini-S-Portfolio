import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    // Check saved theme or fallback to dark mode default
    const saved = localStorage.getItem('hn_theme');
    if (saved) {
      const dark = saved === 'dark';
      setIsDark(dark);
      document.documentElement.classList.toggle('dark', dark);
      document.documentElement.classList.toggle('light', !dark);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('hn_theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle('dark', nextDark);
    document.documentElement.classList.toggle('light', !nextDark);
    localStorage.setItem('hn_theme', nextDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle visual theme"
      className="relative p-2 rounded-xl glass-panel border border-cyber-blue/30 dark:border-cyber-blue/30 light:border-slate-300 text-cyber-text hover:border-cyber-cyan transition-all duration-300 group flex items-center justify-center overflow-hidden"
    >
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 45, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-cyber-orange group-hover:rotate-45 transition-transform" />
        ) : (
          <Moon className="w-5 h-5 text-light-accentBlue group-hover:-rotate-12 transition-transform" />
        )}
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

