import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Building, Calendar, Sparkles } from 'lucide-react';
import { portfolioImages } from '../config/portfolioImages';

export const AchievementsSection: React.FC = () => {
  const achievements = portfolioImages.achievements;

  const getPositionStyling = (pos?: string) => {
    if (pos?.includes('1st Runner-up')) {
      return {
        badgeBg: 'bg-emerald-500/15 dark:bg-emerald-500/20 light:bg-emerald-50',
        badgeBorder: 'border-emerald-500/40 light:border-emerald-300',
        badgeText: 'text-emerald-400 dark:text-emerald-400 light:text-emerald-700',
        glow: 'hover:border-emerald-500/50 shadow-emerald-500/10',
        icon: <Sparkles className="w-4 h-4 text-emerald-400 light:text-emerald-600" />
      };
    }
    if (pos?.includes('3rd')) {
      return {
        badgeBg: 'bg-amber-500/15 dark:bg-amber-500/20 light:bg-amber-50',
        badgeBorder: 'border-amber-500/40 light:border-amber-300',
        badgeText: 'text-amber-400 dark:text-amber-400 light:text-amber-700',
        glow: 'hover:border-amber-500/50 shadow-amber-500/10',
        icon: <Trophy className="w-4 h-4 text-amber-400 light:text-amber-600" />
      };
    }
    return {
      badgeBg: 'bg-cyber-cyan/15 dark:bg-cyber-cyan/20 light:bg-sky-50',
      badgeBorder: 'border-cyber-cyan/40 light:border-sky-300',
      badgeText: 'text-cyber-cyan dark:text-cyber-cyan light:text-sky-700',
      glow: 'hover:border-cyber-cyan/50 shadow-cyber-cyan/10',
      icon: <Award className="w-4 h-4 text-cyber-cyan light:text-sky-600" />
    };
  };

  return (
    <section id="achievements" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyber-blue/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyber-orange/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyber-orange/30 text-xs font-mono text-cyber-orange mb-4 shadow-glow-subtle"
          >
            <Trophy className="w-4 h-4" />
            <span>HONORS &amp; COMPETITIONS</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-extrabold text-cyber-text dark:text-cyber-text light:text-slate-900 tracking-tight mb-4"
          >
            Achievements
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-cyber-muted dark:text-cyber-muted light:text-slate-600 leading-relaxed font-sans"
          >
            Key competitive honors, technical presentations, and hackathon placements verified from academic and competition records.
          </motion.p>
        </div>

        {/* Exactly Three Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {achievements.map((item, idx) => {
            const style = getPositionStyling(item.position);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`p-6 sm:p-8 rounded-3xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 dark:bg-cyber-card/85 light:bg-white ${style.glow} transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden`}
              >
                <div>
                  {/* Prominent Position Badge */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className={`px-4 py-2 rounded-2xl text-xs font-mono font-extrabold ${style.badgeBg} ${style.badgeText} border ${style.badgeBorder} flex items-center gap-2 shadow-sm`}>
                      {style.icon}
                      <span>{item.position || 'Award Winner'}</span>
                    </span>

                    {item.date && (
                      <span className="flex items-center gap-1.5 text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-cyber-cyan" />
                        {item.date}
                      </span>
                    )}
                  </div>

                  {/* Title & Competition */}
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-cyber-text dark:text-cyber-text light:text-slate-900 group-hover:text-cyber-orange transition-colors mb-3 leading-tight">
                    {item.title}
                  </h3>

                  {/* Event & Institution */}
                  <div className="space-y-1.5 mb-6 text-xs font-mono">
                    {item.event && (
                      <div className="flex items-center gap-2 text-cyber-cyan dark:text-cyber-cyan light:text-sky-600 font-semibold">
                        <Award className="w-3.5 h-3.5 shrink-0" />
                        <span>Event: {item.event}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-cyber-muted dark:text-cyber-muted light:text-slate-600">
                      <Building className="w-3.5 h-3.5 shrink-0 text-cyber-blue dark:text-cyber-cyan light:text-sky-600" />
                      <span>{item.issuer}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-cyber-muted dark:text-cyber-muted light:text-slate-600 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Subtle Card Footer Line */}
                <div className="pt-6 mt-6 border-t border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-100 flex items-center justify-end text-[11px] font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500">
                  <span className="text-cyber-orange font-bold">{item.category}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
