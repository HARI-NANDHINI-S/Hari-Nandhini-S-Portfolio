import React from 'react';
import { motion } from 'framer-motion';
import { Users2, Calendar, MapPin, CheckCircle2, Award, Sparkles } from 'lucide-react';

interface LeadershipRole {
  id: number;
  role: string;
  organization: string;
  period: string;
  location: string;
  isCurrent: boolean;
  description: string;
  responsibilities: string[];
}

const LEADERSHIP_ROLES: LeadershipRole[] = [
  {
    id: 1,
    role: "Joint Secretary",
    organization: "403 STRATS",
    period: "June 2025 – July 2026",
    location: "Coimbatore, India",
    isCurrent: false,
    description: "Coordinated teams, supported decision-making and helped drive club initiatives through effective collaboration and community engagement.",
    responsibilities: [
      "Assisted in managing club sessions, hackathons, and technical bootcamps",
      "Supported operational decision-making across multidisciplinary student teams",
      "Facilitated peer-to-peer technical knowledge sharing sessions"
    ]
  },
  {
    id: 2,
    role: "Secretary",
    organization: "403 STRATS",
    period: "July 2026 – Present",
    location: "Coimbatore, India",
    isCurrent: true,
    description: "Coordinated club operations, collaborating with team members to ensure seamless planning and execution of technical activities, workshops, and student mentorship.",
    responsibilities: [
      "Directing club initiatives and leading strategic student project showcases",
      "Coordinating with faculty and technical teams for seamless event operations",
      "Mentoring junior peers in computing fundamentals and collaborative development"
    ]
  }
];

export const LeadershipSection: React.FC = () => {
  return (
    <section id="leadership" className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-cyber-text dark:text-cyber-text light:text-light-text tracking-tight mb-4">
            LEADERSHIP <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-orange">EXPERIENCE</span>
          </h2>
          <p className="text-sm sm:text-base text-cyber-muted dark:text-cyber-muted light:text-light-muted leading-relaxed font-sans">
            Involvement in coordinating club activities, working with teams, and taking student leadership responsibilities at CIT.
          </p>
        </div>

        {/* Chronological Leadership Timeline / Cards */}
        <div className="space-y-8 sm:space-y-10">
          {LEADERSHIP_ROLES.map((role, idx) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`p-8 sm:p-10 rounded-3xl glass-panel border transition-all duration-300 shadow-xl relative overflow-hidden ${
                role.isCurrent
                  ? 'border-cyber-cyan/60 dark:border-cyber-cyan/60 light:border-light-accentBlue dark:bg-cyber-card/95 light:bg-white shadow-[0_0_30px_rgba(56,217,255,0.12)]'
                  : 'border-cyber-cardBorder dark:border-cyber-cardBorder light:border-light-cardBorder dark:bg-cyber-card/80 light:bg-white hover:border-cyber-orange/40'
              }`}
            >
              {/* Active Aura for Current Role */}
              {role.isCurrent && (
                <div className="absolute top-0 right-0 w-72 h-36 bg-gradient-to-bl from-cyber-cyan/15 via-cyber-blue/10 to-transparent pointer-events-none rounded-bl-full" />
              )}

              {/* Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  {/* 403 STRATS Official Logo */}
                  <div className="w-16 h-16 rounded-2xl bg-cyber-bg dark:bg-cyber-bg light:bg-slate-50 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 p-2 flex items-center justify-center shrink-0 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                    <img
                      src="/assets/images/logos/403-strats-logo.png"
                      alt={role.organization}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/logos/403-strats-logo.svg';
                      }}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyber-orange/15 text-cyber-orange dark:text-cyber-orange light:text-light-accentOrange border border-cyber-orange/30">
                        Technical Club Leadership
                      </span>
                      {role.isCurrent && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping" />
                          Active Role
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-cyber-text dark:text-cyber-text light:text-slate-900">
                      {role.role}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-cyber-orange dark:text-cyber-orange light:text-light-accentOrange mt-0.5">
                      {role.organization} • Coimbatore Institute of Technology
                    </p>
                  </div>
                </div>

                {/* Period & Location */}
                <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyber-blue/10 dark:bg-cyber-blue/10 light:bg-light-accentBlue/10 border border-cyber-blue/20 dark:border-cyber-blue/20 light:border-light-accentBlue/20 text-xs font-mono text-cyber-cyan dark:text-cyber-cyan light:text-light-accentBlue font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{role.period}</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-cyber-orange" />
                    <span>{role.location}</span>
                  </div>
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-xs sm:text-sm text-cyber-muted dark:text-cyber-muted light:text-slate-600 leading-relaxed font-sans mb-6">
                {role.description}
              </p>

              {/* Responsibilities */}
              <div className="pt-4 border-t border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {role.responsibilities.map((resp, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-3.5 rounded-2xl bg-cyber-bg/70 dark:bg-cyber-bg/70 light:bg-slate-50 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
                      <span className="text-xs text-cyber-muted dark:text-cyber-muted light:text-slate-700 leading-relaxed">
                        {resp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

