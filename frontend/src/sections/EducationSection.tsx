import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { 
  GraduationCap, 
  Calendar, 
  Building, 
  BookOpen, 
  School, 
  MapPin, 
  Compass,
  FileText,
  AlertCircle
} from 'lucide-react';

interface EducationStageData {
  id: number;
  stageNumber: string;
  stageLabel: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  scoreDisplay: string;
  logo: string;
  isCurrent: boolean;
  academicIcon: 'graduation' | 'book' | 'school';
  marksheetKey: 'college' | 'hsc' | 'sslc';
}

const MARKSHEETS_CONFIG: Record<'college' | 'hsc' | 'sslc', { isAvailable: boolean; path: string; label: string }> = {
  college: {
    isAvailable: true,
    path: '/assets/documents/marksheets/semester-marksheets.pdf',
    label: 'View Semester Marksheet'
  },
  hsc: {
    isAvailable: true,
    path: '/assets/documents/marksheets/12th-marksheet.pdf',
    label: 'View HSC Marksheet'
  },
  sslc: {
    isAvailable: false,
    path: '',
    label: 'Marksheet not uploaded'
  }
};

const EDUCATION_ROADMAP_DATA: EducationStageData[] = [
  {
    id: 1,
    stageNumber: "03",
    stageLabel: "HIGHER EDUCATION • ACTIVE PROGRAMME",
    degree: "M.Sc. Software Systems – 5-Year Integrated Programme",
    institution: "Coimbatore Institute of Technology (CIT)",
    location: "Coimbatore, Tamil Nadu",
    period: "2024 – Present",
    scoreDisplay: "CGPA: 8.85",
    logo: "/assets/images/education/cit-logo.png",
    isCurrent: true,
    academicIcon: "graduation",
    marksheetKey: "college"
  },
  {
    id: 2,
    stageNumber: "02",
    stageLabel: "SENIOR SECONDARY • HSC",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "G.K.D. Matriculation Higher Secondary School",
    location: "Coimbatore, Tamil Nadu",
    period: "2023 – 2024",
    scoreDisplay: "Percentage: 93.67%",
    logo: "/assets/images/education/gkd-logo.png",
    isCurrent: false,
    academicIcon: "book",
    marksheetKey: "hsc"
  },
  {
    id: 3,
    stageNumber: "01",
    stageLabel: "SECONDARY EDUCATION • SSLC",
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "G.K.D. Matriculation Higher Secondary School",
    location: "Coimbatore, Tamil Nadu",
    period: "2021 – 2022",
    scoreDisplay: "Percentage: 91%",
    logo: "/assets/images/education/gkd-logo.png",
    isCurrent: false,
    academicIcon: "school",
    marksheetKey: "sslc"
  }
];

export const EducationSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for animated road path
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 75%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001
  });

  const beaconY = useTransform(smoothProgress, [0, 1], ["2%", "98%"]);

  return (
    <section id="education" ref={containerRef} className="relative py-24 sm:py-32 overflow-hidden">
      
      {/* Background Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyber-blue/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-5xl font-display font-extrabold text-cyber-text dark:text-cyber-text light:text-light-text tracking-tight mb-4"
          >
            EDUCATION &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-orange">ACADEMIC JOURNEY</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base text-cyber-muted dark:text-cyber-muted light:text-light-muted leading-relaxed font-sans"
          >
            My academic journey from school to the integrated M.Sc. Software Systems programme at CIT.
          </motion.p>
        </div>

        {/* Roadmap Connected Track Container */}
        <div className="relative">

          {/* Desktop SVG Highway Path (md and above) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-28 pointer-events-none z-0">
            <svg 
              className="w-full h-full"
              viewBox="0 0 100 1000"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <filter id="eduRoadGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                <linearGradient id="eduCyberGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38D9FF" />
                  <stop offset="50%" stopColor="#007CC3" />
                  <stop offset="100%" stopColor="#FF852E" />
                </linearGradient>
              </defs>

              {/* Base Road Bed */}
              <path
                d="M 50,20 C 80,180 20,340 50,500 C 80,660 20,820 50,980"
                stroke="currentColor"
                className="text-cyber-cardBorder/40 dark:text-cyber-cardBorder/40 light:text-light-cardBorder/80"
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* Center Dotted Guide */}
              <path
                d="M 50,20 C 80,180 20,340 50,500 C 80,660 20,820 50,980"
                stroke="rgba(56,217,255,0.25)"
                strokeWidth="2"
                strokeDasharray="8 8"
                strokeLinecap="round"
              />

              {/* Dynamic Scroll-Drawn Highway Line */}
              <motion.path
                d="M 50,20 C 80,180 20,340 50,500 C 80,660 20,820 50,980"
                stroke="url(#eduCyberGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#eduRoadGlow)"
                style={{
                  pathLength: smoothProgress,
                }}
              />
            </svg>

            {/* Glowing Traveling Beacon Point */}
            <motion.div
              style={{ top: beaconY }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cyber-cyan/30 flex items-center justify-center pointer-events-none"
            >
              <div className="w-3.5 h-3.5 rounded-full bg-cyber-cyan shadow-[0_0_15px_#38D9FF] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </div>
            </motion.div>
          </div>

          {/* Mobile Left-Anchored Road Path (< md) */}
          <div className="md:hidden absolute left-6 sm:left-8 top-0 bottom-0 -translate-x-1/2 w-1 pointer-events-none z-0">
            <div className="w-full h-full bg-cyber-cardBorder dark:bg-cyber-cardBorder/60 light:bg-light-cardBorder rounded-full" />
            <motion.div
              style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
              className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-cyber-cyan via-cyber-blue to-cyber-orange shadow-[0_0_12px_#38D9FF] rounded-full"
            />
            <motion.div
              style={{ top: beaconY }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-cyber-cyan/30 flex items-center justify-center"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-cyber-cyan shadow-[0_0_10px_#38D9FF]" />
            </motion.div>
          </div>

          {/* Stages (Alternating on Desktop, Left-Aligned on Mobile) */}
          <div className="space-y-14 sm:space-y-18 relative z-10">
            {EDUCATION_ROADMAP_DATA.map((stage, idx) => {
              const isEven = idx % 2 === 0;
              const marksheet = MARKSHEETS_CONFIG[stage.marksheetKey];

              return (
                <div 
                  key={stage.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  
                  {/* Pin Node Icon */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="absolute left-6 sm:left-8 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
                  >
                    <div className="relative group/node cursor-pointer">
                      {stage.isCurrent && (
                        <div className="absolute -inset-2.5 rounded-full bg-cyber-cyan/30 blur-md animate-pulse" />
                      )}

                      <div className={`
                        w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300
                        ${stage.isCurrent
                          ? 'bg-cyber-bg dark:bg-cyber-bg light:bg-white border-2 border-cyber-cyan shadow-[0_0_20px_rgba(56,217,255,0.4)] text-cyber-cyan scale-105'
                          : 'bg-cyber-card dark:bg-cyber-card light:bg-white border-2 border-cyber-cardBorder dark:border-cyber-cardBorder light:border-light-cardBorder text-cyber-muted hover:border-cyber-cyan/60 hover:text-cyber-cyan'
                        }
                      `}>
                        {stage.academicIcon === 'graduation' && (
                          <GraduationCap className={`w-5 h-5 sm:w-6 sm:h-6 ${stage.isCurrent ? 'text-cyber-cyan' : 'text-cyber-orange'}`} />
                        )}
                        {stage.academicIcon === 'book' && (
                          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-cyber-blue" />
                        )}
                        {stage.academicIcon === 'school' && (
                          <School className="w-5 h-5 sm:w-6 sm:h-6 text-cyber-orange" />
                        )}
                      </div>

                      <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyber-blue text-white shadow-sm">
                        {stage.stageNumber}
                      </span>
                    </div>
                  </motion.div>

                  {/* Concise Stage Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: 0.15 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className={`
                      w-full pl-14 sm:pl-20 md:pl-0
                      md:w-[calc(50%-56px)]
                      ${isEven ? 'md:mr-auto' : 'md:ml-auto'}
                    `}
                  >
                    <div className={`
                      relative p-6 sm:p-8 rounded-3xl glass-panel transition-all duration-300 shadow-xl overflow-hidden
                      ${stage.isCurrent 
                        ? 'border-2 border-cyber-cyan/80 shadow-[0_0_35px_rgba(56,217,255,0.18)] dark:bg-cyber-card/95 light:bg-white' 
                        : 'border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 dark:bg-cyber-card/85 light:bg-white hover:border-cyber-cyan/40'
                      }
                    `}>

                      {/* Header Badge & Period */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                        <span className={`
                          inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wide uppercase
                          ${stage.isCurrent
                            ? 'bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/40 shadow-sm'
                            : 'bg-cyber-blue/10 dark:bg-cyber-blue/10 light:bg-light-accentBlue/10 text-cyber-muted dark:text-cyber-muted light:text-slate-600 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200'
                          }
                        `}>
                          {stage.isCurrent ? (
                            <>
                              <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping mr-1" />
                              CURRENT PROGRAMME
                            </>
                          ) : (
                            stage.stageLabel
                          )}
                        </span>

                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-blue/10 dark:bg-cyber-blue/10 light:bg-light-accentBlue/10 border border-cyber-blue/20 dark:border-cyber-blue/20 light:border-light-accentBlue/20 text-xs font-mono text-cyber-cyan dark:text-cyber-cyan light:text-light-accentBlue">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{stage.period}</span>
                        </div>
                      </div>

                      {/* Institution & Emblem */}
                      <div className="flex items-start gap-4 sm:gap-5 mb-5">
                        {stage.isCurrent ? (
                          /* Enhanced High-Contrast Emblem Tile for CIT College Card */
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white shadow-lg border-2 border-cyber-cyan/50 dark:border-cyber-cyan/50 p-2 sm:p-2.5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <img
                              src={stage.logo}
                              alt={stage.institution}
                              className="w-full h-full object-contain filter drop-shadow-xs"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/assets/images/education/cit-logo.png';
                              }}
                            />
                          </div>
                        ) : (
                          /* Preserved standard container for School Cards */
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyber-bg dark:bg-cyber-bg light:bg-slate-50 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                            <img
                              src={stage.logo}
                              alt={stage.institution}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/assets/images/education/cit-logo.png';
                              }}
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0 pt-0.5 sm:pt-1">
                          <h3 className="text-lg sm:text-xl font-display font-extrabold text-cyber-text dark:text-cyber-text light:text-slate-900 leading-snug group-hover:text-cyber-cyan transition-colors">
                            {stage.degree}
                          </h3>
                          <p className="text-xs sm:text-sm font-semibold text-cyber-orange dark:text-cyber-orange light:text-light-accentOrange flex items-center gap-1.5 mt-1">
                            <Building className="w-3.5 h-3.5 shrink-0" />
                            <span>{stage.institution}</span>
                          </p>
                          <p className="text-[11px] text-cyber-muted dark:text-cyber-muted light:text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span>{stage.location}</span>
                          </p>
                        </div>
                      </div>

                      {/* Academic Performance Display (Bold & Prominent) */}
                      <div className={`
                        p-4 rounded-2xl mb-5 flex items-center justify-between border
                        ${stage.isCurrent
                          ? 'bg-cyber-cyan/10 dark:bg-cyber-cyan/10 light:bg-cyan-50/70 border-cyber-cyan/30 light:border-cyan-200'
                          : 'bg-cyber-bg/70 dark:bg-cyber-bg/70 light:bg-slate-50 border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200'
                        }
                      `}>
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyber-muted dark:text-cyber-muted light:text-slate-600">
                          Academic Standing
                        </span>

                        <span className={`
                          text-xl sm:text-2xl font-mono font-extrabold
                          ${stage.isCurrent
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan dark:via-white light:via-cyber-blue to-cyber-blue shadow-glow-cyan'
                            : 'text-cyber-text dark:text-cyber-text light:text-slate-900 font-bold'
                          }
                        `}>
                          {stage.scoreDisplay}
                        </span>
                      </div>

                      {/* Marksheet Action Button */}
                      <div className="pt-4 border-t border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-light-cardBorder flex items-center justify-between">
                        {marksheet.isAvailable ? (
                          <a
                            href={marksheet.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white text-xs font-mono font-semibold shadow-glow-cyan hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>{marksheet.label}</span>
                          </a>
                        ) : (
                          <button
                            disabled
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyber-bg/60 dark:bg-cyber-bg/60 light:bg-slate-100 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-300 text-cyber-muted/60 dark:text-cyber-muted/60 light:text-slate-400 text-xs font-mono cursor-not-allowed"
                            title="Marksheet document has not been uploaded yet"
                          >
                            <FileText className="w-3.5 h-3.5 opacity-50" />
                            <span>{marksheet.label}</span>
                          </button>
                        )}

                        <span className="text-[11px] font-mono text-cyber-muted dark:text-cyber-muted light:text-light-muted hidden sm:inline">
                          {marksheet.isAvailable ? 'Official Document Attached' : 'Not Uploaded'}
                        </span>
                      </div>

                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
