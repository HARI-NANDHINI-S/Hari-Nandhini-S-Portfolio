import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layout, Server, Database, BrainCircuit, Wrench } from 'lucide-react';
import { TechIcon } from '../components/tech-icons/TechIcon';

interface CategoryConfig {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  items: string[];
}

const SKILL_CATEGORIES_DATA: CategoryConfig[] = [
  {
    id: 'programming-languages',
    name: 'Programming Languages',
    icon: Code2,
    accentColor: 'from-cyber-blue to-cyber-cyan',
    items: ['Python', 'C++', 'Java']
  },
  {
    id: 'frontend-development',
    name: 'Frontend Development',
    icon: Layout,
    accentColor: 'from-cyber-cyan to-cyber-blue',
    items: ['HTML5', 'CSS3', 'React']
  },
  {
    id: 'backend-development',
    name: 'Backend Development',
    icon: Server,
    accentColor: 'from-cyber-blue to-cyber-orange',
    items: ['FastAPI', 'REST APIs']
  },
  {
    id: 'databases-storage',
    name: 'Databases and Storage',
    icon: Database,
    accentColor: 'from-cyber-cyan to-cyber-blue',
    items: ['MySQL', 'SQLite', 'MongoDB', 'Redis', 'Supabase']
  },
  {
    id: 'data-science-ml',
    name: 'Data Science and Machine Learning',
    icon: BrainCircuit,
    accentColor: 'from-cyber-orange to-cyber-cyan',
    items: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'Matplotlib', 'Seaborn']
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    icon: Wrench,
    accentColor: 'from-cyber-blue to-cyber-cyan',
    items: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook']
  }
];

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyber-blue/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (No small eyebrow badge) */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-cyber-text dark:text-cyber-text light:text-light-text tracking-tight mb-4">
            TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-orange">COMPETENCIES</span>
          </h2>
          <p className="text-sm sm:text-base text-cyber-muted dark:text-cyber-muted light:text-light-muted leading-relaxed font-sans">
            Core technologies, frameworks, and developer tools applied across software engineering, relational databases, data analytics, and machine learning.
          </p>
        </div>

        {/* Clean Static Technology Dashboard Grid (Zero Marquee, Zero Animation) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {SKILL_CATEGORIES_DATA.map((category, idx) => {
            const CategoryIcon = category.icon;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 sm:p-7 rounded-3xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 bg-cyber-card/85 dark:bg-cyber-card/85 light:bg-white shadow-lg hover:border-cyber-cyan/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-cyber-blue/15 text-cyber-cyan dark:text-cyber-cyan light:text-light-accentBlue group-hover:scale-105 transition-transform">
                        <CategoryIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-display font-bold text-cyber-text dark:text-cyber-text light:text-slate-900">
                        {category.name}
                      </h3>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyber-blue/10 dark:bg-cyber-blue/10 light:bg-light-accentBlue/10 text-cyber-cyan dark:text-cyber-cyan light:text-light-accentBlue border border-cyber-blue/20 shrink-0">
                      {category.items.length} Skills
                    </span>
                  </div>

                  {/* Stationary Technology Cards Grid */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    {category.items.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-cyber-bg/75 dark:bg-cyber-bg/75 light:bg-slate-50 border border-cyber-cardBorder/70 dark:border-cyber-cardBorder/70 light:border-slate-200 hover:border-cyber-cyan/50 dark:hover:border-cyber-cyan/50 light:hover:border-light-accentBlue transition-all group/tech shadow-xs"
                      >
                        <div className="w-6 h-6 flex items-center justify-center shrink-0">
                          <TechIcon name={tech} size={20} />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold font-sans text-cyber-text dark:text-cyber-text light:text-slate-800 truncate">
                          {tech}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom subtle category gradient line */}
                <div className={`mt-6 h-1 w-12 rounded-full bg-gradient-to-r ${category.accentColor} opacity-50 group-hover:w-full group-hover:opacity-100 transition-all duration-300`} />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
