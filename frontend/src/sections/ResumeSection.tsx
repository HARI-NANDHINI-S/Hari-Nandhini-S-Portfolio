import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, ExternalLink, Code2, BrainCircuit, CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import { resumeFiles } from '../config/resumeConfig';

export const ResumeSection: React.FC = () => {
  const [activeNotice, setActiveNotice] = useState<string | null>(null);

  const handleDownloadClick = (e: React.MouseEvent, key: 'softwareDevelopment' | 'dataAI') => {
    const file = resumeFiles[key];
    if (!file.isAvailable) {
      e.preventDefault();
      setActiveNotice(file.comingSoonMessage);
      setTimeout(() => setActiveNotice(null), 6000);
    }
  };

  return (
    <section id="resume" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-cyber-text dark:text-cyber-text light:text-light-text tracking-tight mb-4">
            TARGETED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-orange">RESUMES</span>
          </h2>
          <p className="text-sm sm:text-base text-cyber-muted dark:text-cyber-muted light:text-light-muted leading-relaxed font-sans">
            Role-tailored resumes highlighting targeted competencies in software engineering and data analytics/AI.
          </p>
        </div>

        {/* Temporary Notice Banner if clicked coming soon */}
        {activeNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 dark:text-amber-300 light:text-amber-800 flex items-center gap-3 text-xs font-mono"
          >
            <Info className="w-5 h-5 shrink-0 text-amber-400" />
            <span>{activeNotice}</span>
          </motion.div>
        )}

        {/* Dual Resume Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Software Development Resume */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-10 rounded-3xl glass-panel border border-cyber-blue/40 dark:border-cyber-blue/40 light:border-slate-200 dark:bg-cyber-card/90 light:bg-white shadow-xl flex flex-col justify-between group hover:border-cyber-cyan transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-2xl bg-cyber-blue/20 dark:bg-cyber-blue/20 light:bg-light-accentBlue/10 text-cyber-blue dark:text-cyber-cyan light:text-light-accentBlue border border-cyber-blue/30 group-hover:scale-110 transition-transform">
                  <Code2 className="w-7 h-7" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyber-blue/10 dark:bg-cyber-blue/10 light:bg-light-accentBlue/10 text-cyber-cyan dark:text-cyber-cyan light:text-light-accentBlue border border-cyber-blue/20">
                    SDE Track
                  </span>
                  {!resumeFiles.softwareDevelopment.isAvailable && (
                    <span className="text-[10px] font-mono text-amber-400 dark:text-amber-400 light:text-amber-600 font-medium">
                      Placeholder • Coming Soon
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-2xl font-display font-bold text-cyber-text dark:text-cyber-text light:text-slate-900 mb-2">
                {resumeFiles.softwareDevelopment.label}
              </h3>
              <p className="text-xs font-mono text-cyber-cyan dark:text-cyber-cyan light:text-light-accentBlue mb-4">
                Full-Stack Architecture • Systems Programming • Cloud &amp; Web
              </p>

              <p className="text-xs sm:text-sm text-cyber-muted dark:text-cyber-muted light:text-slate-600 leading-relaxed mb-6 font-sans">
                {resumeFiles.softwareDevelopment.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2.5 mb-8">
                {resumeFiles.softwareDevelopment.tracks.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-cyber-muted dark:text-cyber-muted light:text-slate-700 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-cyber-blue dark:text-cyber-cyan light:text-light-accentBlue shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-200 flex flex-col sm:flex-row gap-3">
              {resumeFiles.softwareDevelopment.isAvailable ? (
                <>
                  <a
                    href={resumeFiles.softwareDevelopment.path}
                    download={resumeFiles.softwareDevelopment.filename}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white text-xs font-semibold shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Download SDE Resume</span>
                  </a>
                  <a
                    href={resumeFiles.softwareDevelopment.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-300 hover:border-cyber-cyan text-cyber-muted dark:text-cyber-muted light:text-slate-700 hover:text-cyber-cyan text-xs font-semibold transition-colors"
                  >
                    <span>Preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </>
              ) : (
                <button
                  onClick={(e) => handleDownloadClick(e, 'softwareDevelopment')}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-cyber-card/60 dark:bg-cyber-card/60 light:bg-slate-100 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-300 text-cyber-muted dark:text-cyber-muted light:text-slate-600 text-xs font-mono hover:border-cyber-cyan transition-all cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-cyber-blue" />
                  <span>Resume Coming Soon (Placeholder Active)</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Card 2: Data Analytics / AI Resume */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-10 rounded-3xl glass-panel border border-cyber-orange/40 dark:border-cyber-orange/40 light:border-slate-200 dark:bg-cyber-card/90 light:bg-white shadow-xl flex flex-col justify-between group hover:border-cyber-orange transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-2xl bg-cyber-orange/20 dark:bg-cyber-orange/20 light:bg-light-accentOrange/10 text-cyber-orange dark:text-cyber-orange light:text-light-accentOrange border border-cyber-orange/30 group-hover:scale-110 transition-transform">
                  <BrainCircuit className="w-7 h-7" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyber-orange/10 dark:bg-cyber-orange/10 light:bg-light-accentOrange/10 text-cyber-orange dark:text-cyber-orange light:text-light-accentOrange border border-cyber-orange/20">
                    Data &amp; AI Track
                  </span>
                  {!resumeFiles.dataAI.isAvailable && (
                    <span className="text-[10px] font-mono text-amber-400 dark:text-amber-400 light:text-amber-600 font-medium">
                      Placeholder • Coming Soon
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-2xl font-display font-bold text-cyber-text dark:text-cyber-text light:text-slate-900 mb-2">
                {resumeFiles.dataAI.label}
              </h3>
              <p className="text-xs font-mono text-cyber-orange dark:text-cyber-orange light:text-light-accentOrange mb-4">
                Machine Learning • Predictive Analytics • Speech NLP • EDA
              </p>

              <p className="text-xs sm:text-sm text-cyber-muted dark:text-cyber-muted light:text-slate-600 leading-relaxed mb-6 font-sans">
                {resumeFiles.dataAI.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2.5 mb-8">
                {resumeFiles.dataAI.tracks.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-cyber-muted dark:text-cyber-muted light:text-slate-700 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-cyber-orange dark:text-cyber-orange light:text-light-accentOrange shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-200 flex flex-col sm:flex-row gap-3">
              {resumeFiles.dataAI.isAvailable ? (
                <>
                  <a
                    href={resumeFiles.dataAI.path}
                    download={resumeFiles.dataAI.filename}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-cyber-orange to-red-500 text-white text-xs font-semibold shadow-glow-orange hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Download Data &amp; AI Resume</span>
                  </a>
                  <a
                    href={resumeFiles.dataAI.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-300 hover:border-cyber-orange text-cyber-muted dark:text-cyber-muted light:text-slate-700 hover:text-cyber-orange text-xs font-semibold transition-colors"
                  >
                    <span>Preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </>
              ) : (
                <button
                  onClick={(e) => handleDownloadClick(e, 'dataAI')}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-cyber-card/60 dark:bg-cyber-card/60 light:bg-slate-100 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-300 text-cyber-muted dark:text-cyber-muted light:text-slate-600 text-xs font-mono hover:border-cyber-orange transition-all cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-cyber-orange" />
                  <span>Resume Coming Soon (Placeholder Active)</span>
                </button>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
