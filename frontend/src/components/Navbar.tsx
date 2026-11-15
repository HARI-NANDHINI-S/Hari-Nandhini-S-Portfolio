import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  FileDown, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { resumeFiles } from '../config/resumeConfig';

interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'Experience', href: '#experience' },
  { name: 'Leadership', href: '#leadership' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Active section spy
      const sections = NAV_ITEMS.map(item => item.href.substring(1));
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
      setIsMobileMenuOpen(false);
      setIsResumeDropdownOpen(false);
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 sm:py-3 bg-cyber-bg/92 dark:bg-cyber-bg/92 light:bg-white/95 backdrop-blur-md border-b border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 shadow-lg shadow-black/20 dark:shadow-black/40 light:shadow-slate-300/30'
            : 'py-3.5 sm:py-4 bg-cyber-bg/80 dark:bg-cyber-bg/80 light:bg-white/90 backdrop-blur-md border-b border-cyber-cardBorder/40 dark:border-cyber-cardBorder/40 light:border-slate-200/60'
        }`}
      >
        <nav className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between gap-4 w-full">
            
            {/* Left: Brand Monogram & Name (Aligned closer to left edge) */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-3 group cursor-pointer shrink-0"
              aria-label="Hari Nandhini S - Portfolio Home"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-cyber-card dark:bg-cyber-card light:bg-white border-2 border-cyber-blue/50 dark:border-cyber-blue/50 light:border-light-accentBlue/40 flex items-center justify-center font-display font-extrabold text-cyber-text group-hover:border-cyber-cyan transition-all duration-300 shadow-glow-subtle overflow-hidden">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-cyan group-hover:from-cyber-cyan group-hover:to-cyber-orange transition-all font-mono text-sm sm:text-base font-extrabold">
                  HN
                </span>
                <div className="absolute inset-0 bg-cyber-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex flex-col justify-center">
                <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-cyber-text dark:text-cyber-text light:text-slate-900 group-hover:text-cyber-cyan transition-colors leading-tight whitespace-nowrap">
                  HARI NANDHINI S
                </span>
                <span className="text-[11px] sm:text-xs font-mono font-semibold text-cyber-orange dark:text-cyber-orange light:text-light-accentOrange leading-tight mt-0.5 whitespace-nowrap">
                  Software Systems
                </span>
              </div>
            </a>

            {/* Center: Desktop Navigation Links (Evenly distributed across available space) */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-4 xl:mx-8">
              <div className="flex items-center justify-between w-full max-w-4xl px-3 py-1.5 rounded-full bg-cyber-card/85 dark:bg-cyber-card/85 light:bg-slate-100/90 backdrop-blur-md border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200/90 shadow-xs">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`relative px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                        isActive
                          ? 'text-white'
                          : 'text-cyber-muted dark:text-cyber-muted light:text-slate-600 hover:text-cyber-text dark:hover:text-white light:hover:text-slate-900 hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavPill"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-cyan shadow-glow-subtle z-0"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right: Controls (Theme Toggle, Resume Button, Mobile Menu) */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Direct Resume Download Dropdown */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setIsResumeDropdownOpen(!isResumeDropdownOpen)}
                  className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white shadow-glow-subtle hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
                  aria-expanded={isResumeDropdownOpen}
                >
                  <FileDown className="w-4 h-4" />
                  <span>Resume</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isResumeDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isResumeDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-72 p-2 rounded-2xl glass-panel border border-cyber-blue/30 dark:border-cyber-blue/30 light:border-slate-200 bg-cyber-card dark:bg-cyber-card light:bg-white shadow-2xl z-50 text-left"
                    >
                      <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-cyber-muted dark:text-cyber-muted light:text-slate-500 border-b border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 mb-1.5 uppercase tracking-wider">
                        TARGETED RESUME DOWNLOAD
                      </div>

                      {/* SDE Resume Option */}
                      <a
                        href={resumeFiles.softwareDevelopment.path}
                        download={resumeFiles.softwareDevelopment.filename}
                        onClick={() => setIsResumeDropdownOpen(false)}
                        className="block p-2.5 rounded-xl hover:bg-cyber-blue/10 dark:hover:bg-cyber-blue/10 light:hover:bg-blue-50 transition-colors group cursor-pointer mb-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-cyber-text dark:text-cyber-text light:text-slate-900 group-hover:text-cyber-cyan">
                            Software Development (SDE)
                          </span>
                          <FileDown className="w-3.5 h-3.5 text-cyber-cyan" />
                        </div>
                        <span className="text-[10px] text-cyber-muted dark:text-cyber-muted light:text-slate-500 block mt-0.5">
                          Full-Stack, Web &amp; Systems Architecture
                        </span>
                      </a>

                      {/* Data & AI Resume Option */}
                      <a
                        href={resumeFiles.dataAI.path}
                        download={resumeFiles.dataAI.filename}
                        onClick={() => setIsResumeDropdownOpen(false)}
                        className="block p-2.5 rounded-xl hover:bg-cyber-orange/10 dark:hover:bg-cyber-orange/10 light:hover:bg-orange-50 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-cyber-text dark:text-cyber-text light:text-slate-900 group-hover:text-cyber-orange">
                            Data Analytics &amp; AI
                          </span>
                          <FileDown className="w-3.5 h-3.5 text-cyber-orange" />
                        </div>
                        <span className="text-[10px] text-cyber-muted dark:text-cyber-muted light:text-slate-500 block mt-0.5">
                          ML Models, NLP &amp; Speech Intelligence
                        </span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Hamburger Menu Toggle Button (Visible on < lg) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 sm:p-2.5 rounded-xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 text-cyber-text dark:text-cyber-text light:text-slate-800 hover:text-cyber-cyan hover:border-cyber-cyan transition-all cursor-pointer"
                aria-label="Toggle Navigation Menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-cyber-cyan" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {/* Mobile Full-Screen/Drawer Navigation Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="lg:hidden mt-3 p-4 sm:p-5 rounded-3xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 bg-cyber-card/95 dark:bg-cyber-card/95 light:bg-white/95 backdrop-blur-2xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
              >
                {/* Navigation Links Grid */}
                <div className="grid grid-cols-2 gap-1.5 mb-4">
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.href.substring(1);
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white shadow-glow-subtle font-bold'
                            : 'text-cyber-muted dark:text-cyber-muted light:text-slate-600 hover:text-cyber-text dark:hover:text-white light:hover:text-slate-900 hover:bg-cyber-blue/10 dark:hover:bg-cyber-blue/10 light:hover:bg-slate-100'
                        }`}
                      >
                        <span>{item.name}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </a>
                    );
                  })}
                </div>

                {/* Mobile Direct Resume Download Section */}
                <div className="pt-3 border-t border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-200 space-y-2">
                  <div className="text-[10px] font-mono font-bold text-cyber-muted dark:text-cyber-muted light:text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>DOWNLOAD TARGETED RESUMES</span>
                    <Sparkles className="w-3 h-3 text-cyber-cyan" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href={resumeFiles.softwareDevelopment.path}
                      download={resumeFiles.softwareDevelopment.filename}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-blue/20 to-cyber-cyan/20 border border-cyber-cyan/40 hover:border-cyber-cyan text-cyber-text dark:text-white light:text-slate-900 transition-all text-xs font-semibold cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <FileDown className="w-4 h-4 text-cyber-cyan" />
                        <span>Software Dev (SDE)</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyber-cyan">PDF</span>
                    </a>

                    <a
                      href={resumeFiles.dataAI.path}
                      download={resumeFiles.dataAI.filename}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-orange/20 to-cyber-orange/10 border border-cyber-orange/40 hover:border-cyber-orange text-cyber-text dark:text-white light:text-slate-900 transition-all text-xs font-semibold cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <FileDown className="w-4 h-4 text-cyber-orange" />
                        <span>Data Analytics &amp; AI</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyber-orange">PDF</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </nav>
      </header>

      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
};
