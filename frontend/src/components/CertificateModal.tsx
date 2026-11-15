import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Award, Calendar, Hash, CheckCircle2 } from 'lucide-react';
import { Certification } from '../types';

interface CertificateModalProps {
  cert: Certification | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  if (!cert) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-cyber-bg/85 backdrop-blur-xl z-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl border border-cyber-cyan/30 shadow-2xl p-6 sm:p-8 bg-cyber-card/95 text-cyber-text"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyber-orange/15 text-cyber-orange border border-cyber-orange/30 mb-2">
                <Award className="w-3.5 h-3.5" />
                Verified Credential
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-cyber-text">
                {cert.title}
              </h2>
              <p className="text-sm text-cyber-cyan font-mono mt-0.5">{cert.issuer}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl glass-panel border border-cyber-cardBorder hover:border-cyber-orange text-cyber-muted hover:text-cyber-orange transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Certificate Image Frame */}
          <div className="relative rounded-2xl overflow-hidden border border-cyber-cardBorder mb-6 bg-cyber-bg aspect-[4/3] group">
            <img
              src={cert.image_url}
              alt={cert.title}
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/images/certificates/generative-ai.png';
              }}
            />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-cyber-bg/60 border border-cyber-cardBorder text-xs font-mono">
            {cert.issue_date && (
              <div className="flex items-center gap-2 text-cyber-muted">
                <Calendar className="w-4 h-4 text-cyber-blue" />
                <span>Date: {cert.issue_date}</span>
              </div>
            )}
            {cert.credential_id && (
              <div className="flex items-center gap-2 text-cyber-muted">
                <Hash className="w-4 h-4 text-cyber-orange" />
                <span>ID: {cert.credential_id}</span>
              </div>
            )}
          </div>

          {/* Skills Covered */}
          {cert.skills_covered && cert.skills_covered.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-mono font-semibold text-cyber-muted uppercase tracking-wider mb-2.5">
                Competencies Verified
              </h4>
              <div className="flex flex-wrap gap-2">
                {cert.skills_covered.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-cyber-blue/10 text-cyber-cyan border border-cyber-blue/20"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyber-cyan" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-cyber-cardBorder">
            {cert.credential_url && (
              <a
                href={cert.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white text-xs font-semibold shadow-glow-subtle hover:shadow-glow-cyan transition-all"
              >
                <span>Verify Credential</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="ml-auto px-4 py-2 rounded-xl text-xs font-medium text-cyber-muted hover:text-cyber-text transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

