import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Eye, 
  X, 
  ExternalLink,
  ShieldCheck,
  Award,
  BookOpen,
  Trophy,
  Download,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { GENUINE_CERTIFICATES, CertificateItemConfig } from '../config/portfolioImages';
import { IssuerLogo } from '../components/tech-icons/IssuerLogo';

const CATEGORIES = [
  'All',
  'Professional / Technical Certifications',
  'Workshops & Learning',
  'Competitions & Achievements'
] as const;

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItemConfig | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'preview' | 'pdf'>('preview');

  const filteredCerts = activeCategory === 'All'
    ? GENUINE_CERTIFICATES
    : GENUINE_CERTIFICATES.filter(c => c.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    if (category.includes('Professional')) return <Award className="w-3.5 h-3.5" />;
    if (category.includes('Workshops')) return <BookOpen className="w-3.5 h-3.5" />;
    return <Trophy className="w-3.5 h-3.5" />;
  };

  const openModal = (cert: CertificateItemConfig) => {
    setSelectedCert(cert);
    setViewMode('preview');
  };

  return (
    <section id="certifications" className="relative py-24 sm:py-32 overflow-hidden">
      
      {/* Background Cyber Ambient Lights */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyber-blue/5 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyber-orange/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan mb-4 shadow-glow-subtle"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>VERIFIED ACADEMIC &amp; INDUSTRY CREDENTIALS</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-extrabold text-cyber-text dark:text-cyber-text light:text-light-text tracking-tight mb-4"
          >
            CERTIFICATIONS &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-orange">ACCREDITATIONS</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-cyber-muted dark:text-cyber-muted light:text-light-muted leading-relaxed font-sans"
          >
            Genuine credentials, certifications, and technical symposium awards. Click any card to inspect the uncropped original document or view full-screen.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' 
              ? GENUINE_CERTIFICATES.length 
              : GENUINE_CERTIFICATES.filter(c => c.category === cat).length;
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white font-bold shadow-glow-cyan'
                    : 'glass-panel text-cyber-muted dark:text-cyber-muted light:text-slate-600 hover:text-cyber-text dark:hover:text-white light:hover:text-slate-900 border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 hover:border-cyber-blue/40'
                }`}
              >
                {cat !== 'All' && getCategoryIcon(cat)}
                <span>{cat}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-cyber-blue/10 text-cyber-cyan'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, idx) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="p-6 sm:p-7 rounded-3xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-light-cardBorder dark:bg-cyber-card/85 light:bg-white hover:border-cyber-cyan/50 dark:hover:border-cyber-cyan/50 light:hover:border-light-accentBlue transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-2xl group-hover:bg-cyber-cyan/15 transition-colors pointer-events-none" />

                <div>
                  {/* Top Row: Issuer Logo & File Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="h-8 flex items-center">
                      <IssuerLogo issuer={cert.issuer || ''} size={28} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyber-blue/10 dark:bg-cyber-blue/10 light:bg-light-accentBlue/10 text-cyber-cyan dark:text-cyber-cyan light:text-light-accentBlue border border-cyber-blue/20 dark:border-cyber-blue/20 light:border-light-accentBlue/20 uppercase">
                      {cert.fileType === 'pdf' ? 'PDF Document' : 'Official Scan'}
                    </span>
                  </div>

                  {/* Certificate Preview Frame (Uncropped, Aspect Ratio Preserved) */}
                  <div
                    onClick={() => openModal(cert)}
                    className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-slate-900/60 dark:bg-slate-950/70 light:bg-slate-100 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 mb-5 cursor-pointer group/frame flex items-center justify-center p-2 transition-all duration-300 group-hover:border-cyber-cyan/50 shadow-inner"
                  >
                    <img
                      src={cert.previewImage}
                      alt={cert.title}
                      className="w-full h-full object-contain rounded-lg group-hover/frame:scale-[1.02] transition-transform duration-300 drop-shadow-md"
                    />

                    {/* Badge Overlay */}
                    {cert.badgeText && (
                      <div className="absolute top-2 left-2 z-10 pointer-events-none">
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-black/80 backdrop-blur-md text-cyber-cyan border border-cyber-cyan/40 shadow-sm">
                          {cert.badgeText}
                        </span>
                      </div>
                    )}

                    {/* Hover Inspect Pill */}
                    <div className="absolute inset-0 bg-cyber-bg/75 dark:bg-cyber-bg/75 light:bg-slate-900/50 backdrop-blur-[2px] opacity-0 group-hover/frame:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white text-xs font-semibold flex items-center gap-1.5 shadow-glow-cyan transform translate-y-1 group-hover/frame:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5" /> Full View / Inspect
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => openModal(cert)}
                    className="text-base sm:text-lg font-display font-bold text-cyber-text dark:text-cyber-text light:text-slate-900 group-hover:text-cyber-cyan transition-colors cursor-pointer mb-2 leading-snug line-clamp-2"
                  >
                    {cert.title}
                  </h3>

                  {/* Issuer & Date Row */}
                  <div className="flex items-center justify-between text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500 mb-3">
                    <span className="text-cyber-orange dark:text-cyber-orange light:text-light-accentOrange font-medium truncate max-w-[170px]">
                      {cert.issuer}
                    </span>
                    {cert.date && (
                      <span className="flex items-center gap-1 shrink-0">
                        <Calendar className="w-3 h-3 text-cyber-cyan" />
                        <span>{cert.date}</span>
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-cyber-muted dark:text-cyber-muted light:text-slate-600 leading-relaxed font-sans mb-4 line-clamp-2">
                    {cert.description}
                  </p>

                  {/* Skill Chips */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <span 
                          key={skill}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-cyber-blue/10 dark:bg-cyber-blue/10 light:bg-slate-100 text-cyber-text dark:text-cyber-text light:text-slate-700 border border-cyber-cardBorder/40 light:border-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500">
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Row: View Certificate Action Button */}
                <div className="pt-4 border-t border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-light-cardBorder flex items-center justify-between gap-2">
                  <a
                    href={cert.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white text-xs font-mono font-semibold shadow-glow-cyan hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Original ({cert.fileType.toUpperCase()})</span>
                  </a>

                  <button
                    onClick={() => openModal(cert)}
                    className="font-mono text-xs font-semibold text-cyber-muted dark:text-cyber-muted light:text-slate-500 hover:text-cyber-cyan dark:hover:text-cyber-cyan light:hover:text-light-accentBlue transition-colors flex items-center gap-1 cursor-pointer py-1.5 px-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal Full-Screen / High-Res Certificate Inspection */}
        <AnimatePresence>
          {selectedCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="fixed inset-0 bg-cyber-bg/90 dark:bg-cyber-bg/90 light:bg-slate-900/75 backdrop-blur-md z-0"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                className="relative z-10 w-full max-w-4xl glass-panel rounded-3xl border border-cyber-cyan/40 p-5 sm:p-7 dark:bg-cyber-card/95 light:bg-white text-cyber-text dark:text-cyber-text light:text-light-text shadow-2xl overflow-hidden max-h-[92vh] flex flex-col justify-between"
              >
                <div>
                  {/* Modal Header */}
                  <div className="flex items-start justify-between gap-4 mb-3 pb-3 border-b border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-200">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <IssuerLogo issuer={selectedCert.issuer || ''} size={28} />
                        <span className="text-xs font-mono text-cyber-orange dark:text-cyber-orange light:text-light-accentOrange font-semibold uppercase tracking-wider">
                          {selectedCert.issuer}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-extrabold text-cyber-text dark:text-cyber-text light:text-light-text leading-snug">
                        {selectedCert.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => setSelectedCert(null)}
                      className="p-2 rounded-xl text-cyber-muted hover:text-cyber-orange hover:bg-cyber-cardBorder/40 transition-colors shrink-0 cursor-pointer"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Mode Selector for PDF certificates */}
                  {selectedCert.fileType === 'pdf' && (
                    <div className="flex items-center justify-end gap-2 mb-2">
                      <button
                        onClick={() => setViewMode('preview')}
                        className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                          viewMode === 'preview'
                            ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40 font-bold'
                            : 'text-cyber-muted hover:text-cyber-text'
                        }`}
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>High-Res Scan</span>
                      </button>
                      <button
                        onClick={() => setViewMode('pdf')}
                        className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                          viewMode === 'pdf'
                            ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40 font-bold'
                            : 'text-cyber-muted hover:text-cyber-text'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Interactive PDF View</span>
                      </button>
                    </div>
                  )}

                  {/* Large High-Res Document Container (Uncropped, Full Aspect Ratio) */}
                  <div className="relative w-full h-[54vh] rounded-2xl bg-slate-900/80 dark:bg-slate-950/90 light:bg-slate-100 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 overflow-hidden mb-4 flex items-center justify-center p-2 shadow-inner">
                    {selectedCert.fileType === 'pdf' && viewMode === 'pdf' ? (
                      <iframe
                        src={selectedCert.documentUrl}
                        title={selectedCert.title}
                        className="w-full h-full rounded-xl border border-cyber-cardBorder/40 bg-white"
                      />
                    ) : (
                      <img
                        src={selectedCert.previewImage}
                        alt={selectedCert.title}
                        className="w-auto h-full max-w-full object-contain rounded-lg drop-shadow-xl"
                      />
                    )}

                    {selectedCert.badgeText && (
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-black/85 backdrop-blur-md text-cyber-cyan border border-cyber-cyan/40 shadow-md">
                          {selectedCert.badgeText}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono mb-2">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-cyber-bg dark:bg-cyber-bg light:bg-slate-50 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200">
                      <span className="text-cyber-muted dark:text-cyber-muted light:text-slate-600">Category</span>
                      <span className="text-cyber-cyan dark:text-cyber-cyan light:text-light-accentBlue font-semibold truncate max-w-[200px]">{selectedCert.category}</span>
                    </div>

                    {selectedCert.date && (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-cyber-bg dark:bg-cyber-bg light:bg-slate-50 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200">
                        <span className="text-cyber-muted dark:text-cyber-muted light:text-slate-600">Issued / Date</span>
                        <span className="text-cyber-text dark:text-cyber-text light:text-slate-900 font-bold">{selectedCert.date}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Modal Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-200">
                  <a
                    href={selectedCert.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan hover:shadow-glow-cyan text-white text-xs font-semibold font-mono flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Full Document ({selectedCert.fileType.toUpperCase()})</span>
                  </a>

                  <a
                    href={selectedCert.documentUrl}
                    download
                    className="py-2.5 px-4 rounded-xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 text-cyber-text dark:text-cyber-text light:text-slate-800 text-xs font-semibold font-mono flex items-center justify-center gap-1.5 hover:border-cyber-cyan/40 transition-colors"
                  >
                    <Download className="w-4 h-4 text-cyber-cyan" />
                    <span>Download</span>
                  </a>

                  {selectedCert.credentialUrl && (
                    <a
                      href={selectedCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 rounded-xl glass-panel border border-cyber-orange/40 text-cyber-orange text-xs font-semibold font-mono flex items-center justify-center gap-1.5 hover:bg-cyber-orange/10 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify Issuer</span>
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedCert(null)}
                    className="py-2.5 px-5 rounded-xl bg-cyber-card dark:bg-cyber-card light:bg-slate-100 hover:bg-cyber-cardBorder/40 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 text-cyber-text dark:text-cyber-text light:text-slate-800 text-xs font-semibold font-mono transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
