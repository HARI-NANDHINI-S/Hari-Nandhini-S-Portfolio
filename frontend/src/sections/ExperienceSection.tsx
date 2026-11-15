import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2, FileText } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-cyber-text dark:text-cyber-text light:text-light-text tracking-tight mb-4">
            WORK <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-orange">EXPERIENCE</span>
          </h2>
          <p className="text-sm sm:text-base text-cyber-muted dark:text-cyber-muted light:text-light-muted leading-relaxed font-sans">
            Practical experience developing client-facing management systems, building responsive web interfaces, and collaborating to implement software requirements.
          </p>
        </div>

        {/* Professional Experience Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-10 rounded-3xl glass-panel border border-cyber-blue/40 dark:border-cyber-blue/40 light:border-slate-200 dark:bg-cyber-card/90 light:bg-white shadow-2xl relative overflow-hidden group hover:border-cyber-cyan transition-all"
        >
          {/* Subtle Ambient Hover Glow */}
          <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-bl from-cyber-blue/10 via-cyber-cyan/5 to-transparent pointer-events-none rounded-bl-full" />

          {/* Top Row: Institution, Role, Period */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-5">
              {/* Studio 3 Interactive Logo */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyber-bg dark:bg-cyber-bg light:bg-slate-50 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 p-2 flex items-center justify-center shrink-0 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                <img
                  src="/assets/images/logos/studio3-logo.png"
                  alt="Studio 3 Interactive"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/logos/studio3-logo.svg';
                  }}
                />
              </div>

              <div>
                <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-cyber-blue/15 text-cyber-cyan dark:text-cyber-cyan light:text-light-accentBlue border border-cyber-blue/30 mb-1.5 uppercase">
                  Part-Time Professional Experience
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-cyber-text dark:text-cyber-text light:text-slate-900 group-hover:text-cyber-cyan transition-colors">
                  Web Developer (Part-Time)
                </h3>
                <p className="text-sm sm:text-base font-semibold text-cyber-orange dark:text-cyber-orange light:text-light-accentOrange flex items-center gap-1.5 mt-0.5">
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>Studio 3 Interactive</span>
                </p>
              </div>
            </div>

            {/* Duration & Location Badges */}
            <div className="flex flex-col sm:items-end gap-2 shrink-0">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyber-blue/10 dark:bg-cyber-blue/10 light:bg-light-accentBlue/10 border border-cyber-blue/20 dark:border-cyber-blue/20 light:border-light-accentBlue/20 text-xs font-mono text-cyber-cyan dark:text-cyber-cyan light:text-light-accentBlue font-bold">
                <Calendar className="w-3.5 h-3.5" />
                <span>March 2026 – July 2026</span>
              </div>
              <div className="inline-flex items-center gap-1 text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-cyber-orange" />
                <span>Coimbatore, India</span>
              </div>
            </div>
          </div>

          {/* Role Summary */}
          <p className="text-sm sm:text-base text-cyber-muted dark:text-cyber-muted light:text-slate-600 leading-relaxed font-sans mb-8">
            Developed customer management systems to streamline data handling and operations, built responsive web interfaces and collaborated with the development team to implement and maintain features based on business requirements.
          </p>

          {/* Key Engineering Responsibilities */}
          <div className="pt-6 border-t border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-200">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyber-cyan dark:text-cyber-cyan light:text-light-accentBlue font-bold mb-4">
              Key Contributions &amp; Responsibilities
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-cyber-bg/70 dark:bg-cyber-bg/70 light:bg-slate-50 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyber-blue shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-cyber-muted dark:text-cyber-muted light:text-slate-700 leading-relaxed">
                  Developed scalable customer data management systems streamlining business workflows.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-cyber-bg/70 dark:bg-cyber-bg/70 light:bg-slate-50 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyber-cyan shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-cyber-muted dark:text-cyber-muted light:text-slate-700 leading-relaxed">
                  Built responsive, accessible web interfaces adhering to high UI/UX production standards.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-cyber-bg/70 dark:bg-cyber-bg/70 light:bg-slate-50 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyber-orange shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-cyber-muted dark:text-cyber-muted light:text-slate-700 leading-relaxed">
                  Collaborated with senior engineers to implement and test features against production criteria.
                </span>
              </div>
            </div>

            {/* Official Verification Document */}
            <div className="mt-8 pt-5 border-t border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500">
                Verified Project Internship: <strong className="text-cyber-text dark:text-cyber-text light:text-slate-800">CUBIX CRM</strong> (17 Mar 2026 – 28 Jul 2026)
              </span>
              <a
                href="/assets/documents/certificates/internship-completion-certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white text-xs font-mono font-semibold shadow-glow-cyan hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Internship Certificate</span>
              </a>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
