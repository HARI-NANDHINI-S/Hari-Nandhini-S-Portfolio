import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Cpu, 
  TrendingUp, 
  Layers, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  Braces, 
  Terminal,
  Briefcase,
  Users2
} from 'lucide-react';
import { TechIcon } from '../tech-icons/TechIcon';

export const DeveloperProfileCard: React.FC = () => {
  return (
    <div className="relative w-full max-w-[500px] mx-auto flex items-center justify-center p-2 sm:p-4">
      
      {/* =================================================================== */}
      {/* SMALL FLOATING SOFTWARE-RELATED ICONS AROUND THE CARD               */}
      {/* =================================================================== */}
      {/* Floating Icon 1: Code Brackets (Top-Left) */}
      <motion.div
        animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 z-20 p-2.5 rounded-2xl bg-cyber-card/90 dark:bg-[#0A1428]/90 light:bg-white backdrop-blur-md border border-cyber-cyan/40 dark:border-cyber-cyan/40 light:border-slate-300 shadow-lg shadow-cyber-cyan/15 pointer-events-none"
      >
        <Braces className="w-4 h-4 text-cyber-cyan" />
      </motion.div>

      {/* Floating Icon 2: AI / Machine Learning Symbol (Top-Right) */}
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 6, delay: 0.6, ease: 'easeInOut' }}
        className="absolute -top-4 -right-2 sm:-top-5 sm:-right-3 z-20 p-2.5 rounded-2xl bg-cyber-card/90 dark:bg-[#0A1428]/90 light:bg-white backdrop-blur-md border border-cyber-orange/40 dark:border-cyber-orange/40 light:border-slate-300 shadow-lg shadow-cyber-orange/15 pointer-events-none"
      >
        <Cpu className="w-4 h-4 text-cyber-orange" />
      </motion.div>

      {/* Floating Icon 3: Python Icon (Middle-Left) */}
      <motion.div
        animate={{ y: [0, 8, 0], x: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 5.5, delay: 1.2, ease: 'easeInOut' }}
        className="hidden sm:flex absolute top-1/2 -left-6 -translate-y-1/2 z-20 p-2 rounded-xl bg-cyber-card/90 dark:bg-[#0A1428]/90 light:bg-white backdrop-blur-md border border-cyber-blue/40 dark:border-cyber-blue/40 light:border-slate-300 shadow-lg shadow-cyber-blue/15 pointer-events-none items-center justify-center"
      >
        <TechIcon name="python" size={18} />
      </motion.div>

      {/* Floating Icon 4: Database Storage (Middle-Right) */}
      <motion.div
        animate={{ y: [0, -7, 0], x: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 6.5, delay: 0.9, ease: 'easeInOut' }}
        className="hidden sm:flex absolute top-1/2 -right-5 -translate-y-1/2 z-20 p-2.5 rounded-2xl bg-cyber-card/90 dark:bg-[#0A1428]/90 light:bg-white backdrop-blur-md border border-cyber-blue/40 dark:border-cyber-blue/40 light:border-slate-300 shadow-lg shadow-cyber-blue/15 pointer-events-none items-center justify-center"
      >
        <Database className="w-4 h-4 text-cyber-blue" />
      </motion.div>

      {/* Floating Icon 5: Data Chart / Analytics (Bottom-Right) */}
      <motion.div
        animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 5.8, delay: 1.5, ease: 'easeInOut' }}
        className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-3 z-20 p-2.5 rounded-2xl bg-cyber-card/90 dark:bg-[#0A1428]/90 light:bg-white backdrop-blur-md border border-cyber-cyan/40 dark:border-cyber-cyan/40 light:border-slate-300 shadow-lg shadow-cyber-cyan/15 pointer-events-none"
      >
        <TrendingUp className="w-4 h-4 text-cyber-cyan" />
      </motion.div>

      {/* =================================================================== */}
      {/* MAIN DEVELOPER PROFILE CARD (Glassmorphism & Neon-Blue Glow)        */}
      {/* =================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -6, transition: { duration: 0.3 } }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative w-full rounded-3xl bg-cyber-bg/92 dark:bg-[#070D1E]/92 light:bg-white/95 backdrop-blur-2xl border-2 border-cyber-blue/35 dark:border-cyber-blue/35 light:border-slate-300 hover:border-cyber-cyan dark:hover:border-cyber-cyan light:hover:border-cyber-blue p-5 sm:p-7 shadow-2xl dark:shadow-[0_20px_50px_rgba(22,139,255,0.18)] light:shadow-[0_20px_45px_rgba(15,23,42,0.1)] transition-all duration-500 overflow-hidden group"
      >
        {/* Subtle Ambient Background Glow & Circuit Watermark */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyber-blue/15 dark:bg-cyber-blue/15 light:bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-cyber-orange/10 dark:bg-cyber-orange/10 light:bg-orange-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Subtle SVG Circuit Lines Background Watermark */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-15 dark:opacity-15 light:opacity-10 pointer-events-none -z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="#168BFF" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="90%" y1="0" x2="90%" y2="100%" stroke="#38D9FF" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="0" y1="35%" x2="100%" y2="35%" stroke="#168BFF" strokeWidth="0.8" strokeDasharray="3 6" />
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#FF852E" strokeWidth="0.8" strokeDasharray="3 6" />
        </svg>

        {/* 1. TOP HEADER ROW: AVATAR MONOGRAM + OPEN TO INTERNSHIPS STATUS */}
        <div className="flex items-center justify-between gap-3 mb-5">
          {/* Monogram Badge */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-cyber-blue to-cyber-cyan p-0.5 flex items-center justify-center shrink-0 shadow-glow-subtle group-hover:shadow-glow-cyan transition-shadow">
              <div className="w-full h-full rounded-[14px] bg-cyber-bg dark:bg-[#070D1E] light:bg-white flex items-center justify-center font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-cyan text-base">
                HN
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-cyber-muted dark:text-cyber-muted light:text-slate-500 uppercase tracking-widest block">
                DEVELOPER PROFILE
              </span>
              <span className="text-xs font-mono font-bold text-cyber-cyan">
                Software Systems
              </span>
            </div>
          </div>

          {/* Current Status Pill: Open to Internship Opportunities */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10.5px] font-mono text-emerald-400 font-bold shadow-xs shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="whitespace-nowrap">Open to Internships</span>
          </div>
        </div>

        {/* 2. DEVELOPER IDENTITY & ACADEMIC INSTITUTION */}
        <div className="mb-5 pb-4 border-b border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-200">
          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-cyber-text dark:text-cyber-text light:text-slate-900 tracking-tight leading-tight mb-1">
            Hari Nandhini S.
          </h3>
          <p className="text-xs sm:text-sm font-display font-semibold text-cyber-cyan mb-0.5">
            M.Sc. Software Systems
          </p>
          <p className="text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-600">
            Coimbatore Institute of Technology (CIT)
          </p>
        </div>

        {/* 3. KEY METRICS DISPLAY: CGPA, PROJECTS, LEADERSHIP ROLES */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
          {/* CGPA */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-cyber-blue/10 dark:bg-cyber-blue/10 light:bg-blue-50/80 border border-cyber-blue/30 dark:border-cyber-blue/30 light:border-blue-200 text-center">
            <div className="text-xl sm:text-2xl font-mono font-bold text-cyber-cyan dark:text-cyber-cyan light:text-blue-600 leading-tight">
              8.85
            </div>
            <div className="text-[10px] font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
              CGPA
            </div>
          </div>

          {/* Projects */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-cyber-card dark:bg-cyber-card light:bg-slate-50 border border-cyber-cardBorder/70 dark:border-cyber-cardBorder/70 light:border-slate-200 text-center">
            <div className="text-xl sm:text-2xl font-mono font-bold text-cyber-blue dark:text-cyber-blue light:text-blue-600 leading-tight">
              5+
            </div>
            <div className="text-[10px] font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
              Projects
            </div>
          </div>

          {/* Leadership Roles */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-cyber-orange/10 dark:bg-cyber-orange/10 light:bg-orange-50/80 border border-cyber-orange/30 dark:border-cyber-orange/30 light:border-orange-200 text-center">
            <div className="text-xl sm:text-2xl font-mono font-bold text-cyber-orange dark:text-cyber-orange light:text-orange-600 leading-tight">
              2
            </div>
            <div className="text-[10px] font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
              Leadership
            </div>
          </div>
        </div>

        {/* 4. CORE INTERESTS */}
        <div className="mb-4">
          <div className="text-[10px] font-mono font-bold text-cyber-muted dark:text-cyber-muted light:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyber-cyan" />
            <span>Core Interests</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <span className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-semibold bg-cyber-blue/15 text-cyber-cyan border border-cyber-blue/30 shadow-2xs">
              Software Development
            </span>
            <span className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-semibold bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30 shadow-2xs">
              Data Science
            </span>
            <span className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-semibold bg-cyber-orange/15 text-cyber-orange border border-cyber-orange/30 shadow-2xs">
              Artificial Intelligence
            </span>
          </div>
        </div>

        {/* 5. TECHNICAL FOCUS */}
        <div className="mb-5">
          <div className="text-[10px] font-mono font-bold text-cyber-muted dark:text-cyber-muted light:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Code2 className="w-3 h-3 text-cyber-orange" />
            <span>Technical Interests</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-mono bg-cyber-card dark:bg-[#050A17] light:bg-slate-100 text-cyber-text dark:text-cyber-text light:text-slate-800 border border-cyber-cardBorder/80">
              <Layers className="w-3 h-3 text-cyber-cyan" />
              <span>Full-Stack Development</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-mono bg-cyber-card dark:bg-[#050A17] light:bg-slate-100 text-cyber-text dark:text-cyber-text light:text-slate-800 border border-cyber-cardBorder/80">
              <Cpu className="w-3 h-3 text-cyber-orange" />
              <span>Machine Learning</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-mono bg-cyber-card dark:bg-[#050A17] light:bg-slate-100 text-cyber-text dark:text-cyber-text light:text-slate-800 border border-cyber-cardBorder/80">
              <TrendingUp className="w-3 h-3 text-cyber-blue" />
              <span>Data Analytics</span>
            </span>
          </div>
        </div>

        {/* 6. BOTTOM CARD FOOTER */}
        <div className="pt-3 border-t border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-200 flex items-center justify-between text-[10px] font-mono text-cyber-darkMuted dark:text-cyber-darkMuted light:text-slate-500">
          <span className="flex items-center gap-1.5 text-cyber-cyan">
            <Terminal className="w-3 h-3 text-cyber-cyan" />
            cit_systems • Verified Profile
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Ready for SDE &amp; AI Roles
          </span>
        </div>

      </motion.div>
    </div>
  );
};
