import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Heart, Sparkles, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 bg-cyber-bg/95 dark:bg-cyber-bg/95 light:bg-slate-50 pt-16 pb-12 overflow-hidden">
      {/* Subtle Glowing Cyan Line at top */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyber-card dark:bg-cyber-card light:bg-white border border-cyber-blue/40 dark:border-cyber-blue/40 light:border-slate-300 flex items-center justify-center font-mono font-bold text-cyber-cyan text-sm shadow-glow-subtle">
                HN
              </div>
              <span className="font-display font-bold text-lg text-cyber-text dark:text-cyber-text light:text-slate-900">
                HARI NANDHINI S
              </span>
            </div>
            <p className="text-xs sm:text-sm text-cyber-muted dark:text-cyber-muted light:text-slate-600 max-w-sm leading-relaxed font-sans">
              Software Systems student at Coimbatore Institute of Technology building full-stack applications, machine learning architectures, and data analytics tools.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 hover:border-cyber-orange text-cyber-muted dark:text-cyber-muted light:text-slate-600 hover:text-cyber-orange transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 hover:border-cyber-blue text-cyber-muted dark:text-cyber-muted light:text-slate-600 hover:text-cyber-blue transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2.5 rounded-xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 hover:border-cyber-cyan text-cyber-muted dark:text-cyber-muted light:text-slate-600 hover:text-cyber-cyan transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Jump Links (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-wider mb-4">
              Navigation Map
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-600">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Experience', id: 'experience' },
                { name: 'Leadership', id: 'leadership' },
                { name: 'Skills', id: 'skills' },
                { name: 'Education', id: 'education' },
                { name: 'Projects', id: 'projects' },
                { name: 'Certifications', id: 'certifications' },
                { name: 'Achievements', id: 'achievements' },
                { name: 'Resume', id: 'resume' },
                { name: 'Contact', id: 'contact' },
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.id)}
                  className="text-left hover:text-cyber-cyan transition-colors py-1 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Academic & Location (3 cols) */}
          <div className="md:col-span-3 space-y-2 text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-600">
            <h4 className="font-bold text-cyber-orange uppercase tracking-wider mb-3">
              Institutional Base
            </h4>
            <p className="text-cyber-text dark:text-cyber-text light:text-slate-900">Coimbatore Institute of Technology</p>
            <p>M.Sc. Software Systems (2024–Present)</p>
            <p className="text-cyber-cyan font-bold">CGPA: 8.85</p>
            <p className="pt-2 text-cyber-muted dark:text-cyber-muted light:text-slate-500">Coimbatore, Tamil Nadu, India</p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500">
          <p>© {currentYear} Hari Nandhini S. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted with React, TypeScript, Tailwind CSS &amp; FastAPI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
          </div>
        </div>
      </div>
    </footer>
  );
};

