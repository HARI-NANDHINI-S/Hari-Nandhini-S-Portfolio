import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  FileDown, 
  Send,
  ChevronDown
} from 'lucide-react';
import { DeveloperProfileCard } from '../components/hero/DeveloperProfileCard';
import { resumeFiles } from '../config/resumeConfig';

const FULL_SENTENCES = [
  "Building intelligent solutions through Software.",
  "Building intelligent solutions through Data.",
  "Building intelligent solutions through Artificial Intelligence."
];
const PREFIX_LENGTH = "Building intelligent solutions through ".length; // 39

export const HeroSection: React.FC = () => {
  // Start with 'B' immediately on mount so the full sentence types character by character with zero delay
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('B');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Typewriter effect loop typing and erasing the entire sentence character by character
  useEffect(() => {
    const currentSentence = FULL_SENTENCES[wordIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing forward
      if (displayedText.length < currentSentence.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentSentence.slice(0, displayedText.length + 1));
        }, 42); // moderate typing speed
      } else {
        // Completed full statement, pause briefly
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      // Erasing backward character by character
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentSentence.slice(0, displayedText.length - 1));
        }, 20); // smooth erasing speed
      } else {
        // Switched to next statement, immediately start typing next full sentence
        setIsDeleting(false);
        const nextIndex = (wordIndex + 1) % FULL_SENTENCES.length;
        setWordIndex(nextIndex);
        setDisplayedText(FULL_SENTENCES[nextIndex].slice(0, 1));
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 flex items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Balanced Two-Column Desktop Grid (6 cols left, 6 cols right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Column: Headline, Bio & Actions (6 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col items-start z-10 w-full"
          >
            {/* Name Heading with Gradient Accent */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-cyber-text dark:text-cyber-text light:text-light-text leading-[1.1] mb-3.5">
              <span>HARI </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-orange">
                NANDHINI S
              </span>
            </h1>

            {/* Dynamic Typewriter Headline (Types the entire sentence character by character) */}
            <div className="min-h-[4.5rem] sm:min-h-[5rem] lg:min-h-[5.5rem] flex items-center mb-3.5 w-full">
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-display font-semibold text-cyber-text dark:text-cyber-text light:text-slate-900 leading-snug break-words">
                {displayedText.length <= PREFIX_LENGTH ? (
                  <span>{displayedText}</span>
                ) : (
                  <>
                    <span>{displayedText.slice(0, PREFIX_LENGTH)}</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-orange font-bold font-display">
                      {displayedText.slice(PREFIX_LENGTH)}
                    </span>
                  </>
                )}
                <span className="inline-block w-[3px] h-5 sm:h-6 lg:h-7 bg-cyber-cyan dark:bg-cyber-cyan light:bg-cyber-blue ml-1.5 animate-pulse align-middle" />
              </h2>
            </div>

            {/* Grounded, Professional Academic Introduction */}
            <p className="text-sm sm:text-base text-cyber-muted dark:text-cyber-muted light:text-slate-600 mb-6 leading-relaxed font-sans max-w-xl lg:max-w-none">
              I am an M.Sc. Software Systems student at Coimbatore Institute of Technology with a strong interest in software development, data science, and artificial intelligence. Through academic coursework and hands-on projects, I have developed practical exposure to full-stack web engineering, structured data processing, and applied machine learning models. I enjoy analyzing problem requirements and engineering practical, reliable software applications that address real-world needs.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 w-full sm:w-auto mb-6">
              <button
                onClick={() => scrollTo('projects')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white text-xs sm:text-sm font-semibold shadow-glow-cyan hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group whitespace-nowrap"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Direct Resume Download Dropdown (Dual SDE and Data & AI Resumes) */}
              <div className="relative flex-1 sm:flex-none">
                <button
                  type="button"
                  onClick={() => setIsResumeOpen(!isResumeOpen)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4.5 sm:px-5 py-3 sm:py-3.5 rounded-xl glass-panel border border-cyber-blue/30 dark:border-cyber-blue/30 light:border-slate-300 text-cyber-text dark:text-cyber-text light:text-slate-800 hover:text-cyber-cyan dark:hover:text-cyber-cyan light:hover:text-cyber-blue hover:border-cyber-cyan text-xs sm:text-sm font-semibold transition-all cursor-pointer group whitespace-nowrap"
                  aria-expanded={isResumeOpen}
                >
                  <FileDown className="w-4 h-4 text-cyber-cyan transition-transform group-hover:-translate-y-0.5" />
                  <span>Download Resume</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-cyber-muted transition-transform duration-200 ${isResumeOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isResumeOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-72 p-2.5 rounded-2xl glass-panel border border-cyber-blue/30 dark:border-cyber-blue/30 light:border-slate-200 bg-cyber-card dark:bg-cyber-card light:bg-white shadow-2xl z-50 text-left"
                    >
                      <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-cyber-muted dark:text-cyber-muted light:text-slate-500 border-b border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 mb-1.5 uppercase tracking-wider">
                        CHOOSE TARGETED RESUME
                      </div>

                      {/* SDE Resume */}
                      <a
                        href={resumeFiles.softwareDevelopment.path}
                        download={resumeFiles.softwareDevelopment.filename}
                        onClick={() => setIsResumeOpen(false)}
                        className="block p-2.5 rounded-xl hover:bg-cyber-blue/10 dark:hover:bg-cyber-blue/10 light:hover:bg-blue-50 transition-colors group/item cursor-pointer mb-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-cyber-text dark:text-cyber-text light:text-slate-900 group-hover/item:text-cyber-cyan">
                            Software Development (SDE)
                          </span>
                          <FileDown className="w-3.5 h-3.5 text-cyber-cyan" />
                        </div>
                        <span className="text-[10px] text-cyber-muted dark:text-cyber-muted light:text-slate-500 block mt-0.5">
                          Full-Stack, Systems &amp; Web Architectures
                        </span>
                      </a>

                      {/* Data & AI Resume */}
                      <a
                        href={resumeFiles.dataAI.path}
                        download={resumeFiles.dataAI.filename}
                        onClick={() => setIsResumeOpen(false)}
                        className="block p-2.5 rounded-xl hover:bg-cyber-orange/10 dark:hover:bg-cyber-orange/10 light:hover:bg-orange-50 transition-colors group/item cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-cyber-text dark:text-cyber-text light:text-slate-900 group-hover/item:text-cyber-orange">
                            Data Analytics &amp; AI
                          </span>
                          <FileDown className="w-3.5 h-3.5 text-cyber-orange" />
                        </div>
                        <span className="text-[10px] text-cyber-muted dark:text-cyber-muted light:text-slate-500 block mt-0.5">
                          ML Models, NLP &amp; Predictive Analytics
                        </span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => scrollTo('contact')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4.5 sm:px-5 py-3 sm:py-3.5 rounded-xl glass-panel border border-cyber-orange/40 light:border-slate-300 text-cyber-text dark:text-cyber-text light:text-slate-800 hover:text-cyber-orange dark:hover:text-cyber-orange light:hover:text-cyber-orange hover:border-cyber-orange text-xs sm:text-sm font-semibold transition-all cursor-pointer group whitespace-nowrap"
              >
                <Send className="w-4 h-4 text-cyber-orange transition-transform group-hover:scale-110" />
                <span>Get In Touch</span>
              </button>
            </div>

            {/* Status / Availability Indicator (Positioned BELOW Action Buttons) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyber-blue/30 dark:border-cyber-blue/30 light:border-slate-300 text-[11px] sm:text-xs font-mono text-cyber-cyan dark:text-cyber-cyan light:text-slate-700 shadow-glow-subtle mb-6"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
              </span>
              <span>Software Systems Student @ CIT • Open to Internship Opportunities</span>
            </motion.div>

            {/* Micro Stats Counter: Exact Requirements */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 mt-1 border-t border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-200 w-full max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-cyber-cyan dark:text-cyber-cyan light:text-cyber-blue">
                  8.85
                </div>
                <div className="text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500 uppercase tracking-wider font-semibold mt-1">
                  CGPA
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-cyber-blue dark:text-cyber-blue light:text-cyber-blue">
                  5+
                </div>
                <div className="text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500 uppercase tracking-wider font-semibold mt-1">
                  Projects Built
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-cyber-orange dark:text-cyber-orange light:text-cyber-orange">
                  2
                </div>
                <div className="text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500 uppercase tracking-wider font-semibold mt-1">
                  Leadership Roles
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Personal Developer Profile Card (6 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-6 w-full flex items-center justify-center relative mt-6 lg:mt-0"
          >
            <DeveloperProfileCard />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
