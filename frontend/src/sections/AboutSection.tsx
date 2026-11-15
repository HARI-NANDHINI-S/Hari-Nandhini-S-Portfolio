import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Cpu, 
  Users2, 
  GraduationCap, 
  Sparkles,
  ArrowRight,
  Terminal,
  Fingerprint
} from 'lucide-react';

interface DimensionPanel {
  id: string;
  number: string;
  title: string;
  icon: any;
  color: string;
  tagline: string;
  content: string;
  skills: string[];
}

const PANELS: DimensionPanel[] = [
  {
    id: 'developer',
    number: '01',
    title: 'THE DEVELOPER',
    icon: Code2,
    color: '#168BFF',
    tagline: 'Full-Stack Architecture & Clean Engineering',
    content: 'My primary drive is building robust, scalable software that solves practical operational bottlenecks. I love creating responsive user interfaces with React, paired with high-performance Python FastAPI and relational database backends.',
    skills: ['Python', 'C++', 'Java', 'React', 'FastAPI', 'MySQL', 'RESTful APIs']
  },
  {
    id: 'data-explorer',
    number: '02',
    title: 'THE DATA EXPLORER',
    icon: Database,
    color: '#38D9FF',
    tagline: 'Data Analytics, ML & Predictive Models',
    content: 'Data reveals patterns that intuition overlooks. I focus on end-to-end data pipelines—cleaning raw datasets, engineering meaningful features with Pandas and NumPy, and training Scikit-learn predictive models to uncover actionable intelligence.',
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'Feature Engineering', 'EDA', 'Matplotlib', 'Seaborn']
  },
  {
    id: 'problem-solver',
    number: '03',
    title: 'THE PROBLEM SOLVER',
    icon: Cpu,
    color: '#FF852E',
    tagline: 'Algorithmic Thinking & Systematic Logic',
    content: 'Whether handling severe class imbalance in fraud detection or designing speech-to-text triage pipelines for regional dialects, I approach complex problems by breaking them down into first principles, evaluating constraints, and iterating methodically.',
    skills: ['Algorithmic Logic', 'Data Structures', 'Class Imbalance Mitigation', 'Error Analysis']
  },
  {
    id: 'team-player',
    number: '04',
    title: 'THE TEAM PLAYER',
    icon: Users2,
    color: '#168BFF',
    tagline: 'Leadership, Collaboration & Student Mentorship',
    content: 'As Secretary and former Joint Secretary of 403 STRATS, I actively facilitate technical workshops, organize hackathons, coordinate cross-functional student teams, and mentor junior developers in computer science foundations.',
    skills: ['Technical Leadership', 'Event Operations', 'Team Collaboration', 'Mentorship']
  },
  {
    id: 'learner',
    number: '05',
    title: 'THE LEARNER',
    icon: GraduationCap,
    color: '#38D9FF',
    tagline: 'Continuous Exploration of Cutting-Edge Tech',
    content: 'Technology evolves constantly, and so do I. From completing certified courses in Generative AI and Machine Learning to diving deep into Linux kernel fundamentals and cloud deployment, I relish learning challenging new tools.',
    skills: ['Generative AI', 'Deep Learning Concepts', 'Linux Administration', 'Continuous Growth']
  }
];

export const AboutSection: React.FC = () => {
  const [activePanelId, setActivePanelId] = useState<string>('developer');
  const activePanel = PANELS.find((p) => p.id === activePanelId) || PANELS[0];

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden border-t border-cyber-cardBorder dark:border-cyber-cardBorder light:border-light-cardBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyber-blue/15 text-cyber-cyan border border-cyber-blue/30 dark:border-cyber-blue/30 light:border-light-accentBlue/30 mb-3">
            <Fingerprint className="w-3.5 h-3.5 text-cyber-orange" />
            DIGITAL IDENTITY FINALE
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-cyber-text dark:text-cyber-text light:text-light-text tracking-tight mb-4">
            BEHIND THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-orange">CODE</span>
          </h2>
          <p className="text-sm sm:text-base text-cyber-muted dark:text-cyber-muted light:text-light-muted leading-relaxed font-sans">
            A multi-dimensional view of how I think, build, analyze, collaborate, and evolve as a software engineer and AI practitioner.
          </p>
        </div>

        {/* 5 Interactive Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Tabs (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {PANELS.map((panel) => {
              const Icon = panel.icon;
              const isSelected = activePanelId === panel.id;
              return (
                <button
                  key={panel.id}
                  onClick={() => setActivePanelId(panel.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    isSelected
                      ? 'bg-cyber-card dark:bg-cyber-card light:bg-white border-cyber-cyan dark:border-cyber-cyan light:border-light-accentBlue shadow-md scale-[1.01]'
                      : 'bg-cyber-card/50 dark:bg-cyber-card/50 light:bg-slate-50/80 border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 hover:border-cyber-blue/40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold text-cyber-muted dark:text-cyber-muted light:text-slate-400 group-hover:text-cyber-orange transition-colors">
                      {panel.number}
                    </span>
                    <div
                      className="p-2.5 rounded-xl transition-colors"
                      style={{
                        backgroundColor: isSelected ? `${panel.color}20` : 'rgba(128, 128, 128, 0.08)',
                        color: isSelected ? panel.color : '#9BAAC0',
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`font-display font-bold text-sm sm:text-base ${
                        isSelected 
                          ? 'text-cyber-text dark:text-cyber-text light:text-light-text' 
                          : 'text-cyber-muted dark:text-cyber-muted light:text-slate-500'
                      }`}>
                        {panel.title}
                      </h3>
                      <p className="text-[11px] text-cyber-muted dark:text-cyber-muted light:text-slate-400 font-mono">
                        {panel.tagline}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      isSelected ? 'bg-cyber-orange scale-125' : 'bg-transparent'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Panel Details Display (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePanel.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-10 rounded-3xl glass-panel border border-cyber-blue/30 dark:border-cyber-blue/30 light:border-light-cardBorder shadow-2xl relative overflow-hidden dark:bg-cyber-card/90 light:bg-white"
              >
                {/* Decorative Background Watermark */}
                <span className="absolute -top-6 -right-4 font-mono font-black text-8xl text-black/5 dark:text-white/5 select-none pointer-events-none">
                  {activePanel.number}
                </span>

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-3.5 rounded-2xl"
                    style={{ backgroundColor: `${activePanel.color}25`, color: activePanel.color }}
                  >
                    <activePanel.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-400 uppercase tracking-wider">
                      Identity Dimension {activePanel.number}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-cyber-text dark:text-cyber-text light:text-light-text">
                      {activePanel.title}
                    </h3>
                  </div>
                </div>

                <h4 className="text-sm font-mono text-cyber-cyan dark:text-cyber-cyan light:text-light-accentBlue mb-4 font-semibold">
                  {activePanel.tagline}
                </h4>

                <p className="text-sm sm:text-base text-cyber-muted dark:text-cyber-muted light:text-light-muted leading-relaxed mb-8 font-sans">
                  {activePanel.content}
                </p>

                <div>
                  <h5 className="text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-400 uppercase tracking-wider mb-3">
                    Engineered Competencies
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {activePanel.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl text-xs font-mono bg-cyber-bg dark:bg-cyber-bg light:bg-slate-50 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 text-cyber-text dark:text-cyber-text light:text-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};
