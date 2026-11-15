import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  ArrowUpRight,
  Info,
  Code2
} from 'lucide-react';
import { Project } from '../types';
import { fetchProjects } from '../services/api';
import { INITIAL_PROJECTS } from '../data/portfolioData';
import { ProjectModal } from '../components/ProjectModal';

const CATEGORIES = [
  'All',
  'Artificial Intelligence',
  'Software Development',
  'Machine Learning'
];

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetchProjects(activeCategory)
      .then((data) => {
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          const fallback = activeCategory === 'All' 
            ? INITIAL_PROJECTS 
            : INITIAL_PROJECTS.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
          setProjects(fallback);
        }
        setIsLoading(false);
      })
      .catch(() => {
        const fallback = activeCategory === 'All' 
            ? INITIAL_PROJECTS 
            : INITIAL_PROJECTS.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
        setProjects(fallback);
        setIsLoading(false);
      });
  }, [activeCategory]);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan mb-4 shadow-glow-subtle">
            <Code2 className="w-4 h-4" />
            <span>AUTHENTIC REPOSITORIES &amp; REAL IMPLEMENTATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-cyber-text dark:text-cyber-text light:text-slate-900 tracking-tight mb-4">
            FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-orange">PROJECTS</span>
          </h2>
          <p className="text-sm sm:text-base text-cyber-muted dark:text-cyber-muted light:text-slate-600 leading-relaxed font-sans">
            Genuine applications with inspectable GitHub repositories, original screenshots, computer vision models, and full-stack systems architecture.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white font-bold shadow-glow-subtle'
                  : 'glass-panel text-cyber-muted dark:text-cyber-muted light:text-slate-600 hover:text-cyber-text dark:hover:text-white light:hover:text-slate-900 border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 hover:border-cyber-blue/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {projects.map((p, idx) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative rounded-3xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 hover:border-cyber-cyan/50 dark:hover:border-cyber-cyan/50 light:hover:border-light-accentBlue/60 transition-all duration-300 flex flex-col justify-between overflow-hidden bg-cyber-card/90 dark:bg-cyber-card/90 light:bg-white shadow-lg hover:shadow-glow-cyan hover:-translate-y-1"
              >
                <div>
                  {/* Image Frame with Aspect Ratio */}
                  <div
                    onClick={() => setSelectedProject(p)}
                    className="relative aspect-[16/10] overflow-hidden bg-cyber-bg dark:bg-cyber-bg light:bg-slate-100 cursor-pointer group/img"
                  >
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/projects/vox-nira-cover.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-transparent to-transparent opacity-60 dark:opacity-70 light:opacity-20" />

                    {/* Category Tag Overlay */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-cyber-bg/90 dark:bg-cyber-bg/90 light:bg-white/95 backdrop-blur-md text-cyber-cyan dark:text-cyber-cyan light:text-light-accentBlue border border-cyber-blue/30 dark:border-cyber-blue/30 light:border-light-accentBlue/30">
                      {p.category}
                    </div>

                    {/* Quick View Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                      <span className="px-4 py-2 rounded-xl bg-cyber-blue text-white text-xs font-semibold flex items-center gap-1.5 shadow-glow-cyan">
                        <Info className="w-4 h-4" /> Inspect Deep Dive
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h3
                      onClick={() => setSelectedProject(p)}
                      className="text-lg font-display font-bold text-cyber-text dark:text-cyber-text light:text-slate-900 group-hover:text-cyber-cyan dark:group-hover:text-cyber-cyan light:group-hover:text-cyber-blue transition-colors cursor-pointer mb-2.5 line-clamp-1"
                    >
                      {p.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-cyber-muted dark:text-cyber-muted light:text-slate-600 line-clamp-3 leading-relaxed mb-4 font-sans">
                      {p.short_description}
                    </p>

                    {/* Prominent Technology Stack Display */}
                    <div className="mb-2">
                      <span className="text-[10px] font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500 uppercase tracking-wider block mb-1.5 font-semibold">
                        Core Tech Stack
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {p.technologies.slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-cyber-blue/10 dark:bg-cyber-blue/10 light:bg-slate-100 border border-cyber-blue/20 dark:border-cyber-blue/20 light:border-slate-200 text-cyber-cyan dark:text-cyber-cyan light:text-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                        {p.technologies.length > 6 && (
                          <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-cyber-bg dark:bg-cyber-bg light:bg-slate-100 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 text-cyber-orange dark:text-cyber-orange light:text-light-accentOrange font-semibold">
                            +{p.technologies.length - 6}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-6 py-4 border-t border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-200 flex items-center justify-between text-xs gap-2">
                  <button
                    onClick={() => setSelectedProject(p)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white font-mono text-xs font-bold shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {p.github_url ? (
                      <a
                        href={p.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyber-bg/80 dark:bg-cyber-bg/80 light:bg-slate-100 hover:bg-cyber-blue/20 dark:hover:bg-cyber-blue/20 light:hover:bg-slate-200 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 text-cyber-text dark:text-cyber-text light:text-slate-800 hover:text-cyber-cyan transition-colors font-mono text-xs font-semibold cursor-pointer"
                        title={`View ${p.title} GitHub Repository`}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    ) : (
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-200 bg-cyber-bg/40 dark:bg-cyber-bg/40 light:bg-slate-50 text-[11px] font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500 cursor-not-allowed"
                        title="Repository is private / pending public release"
                      >
                        <Github className="w-3.5 h-3.5 opacity-50" />
                        <span>Private Repo</span>
                      </span>
                    )}

                    {p.live_url && (
                      <a
                        href={p.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-xl text-cyber-cyan hover:text-cyber-orange hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer border border-cyber-cyan/30"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal Deep Dive */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
