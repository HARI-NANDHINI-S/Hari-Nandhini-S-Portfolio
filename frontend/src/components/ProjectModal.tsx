import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Code2, 
  Sparkles, 
  Play, 
  Activity, 
  Sliders, 
  ShieldAlert,
  Stethoscope,
  Wheat
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator'>('overview');

  // VoxNira Simulator State
  const [selectedSymptom, setSelectedSymptom] = useState<string>(
    'Acute chest pressure with radiating left shoulder numbness and shortness of breath'
  );
  const [triageResult, setTriageResult] = useState<{
    urgency: string;
    confidence: number;
    entities: string[];
    priority: number;
    color: string;
  } | null>(null);

  // AgriMind Simulator State
  const [soilN, setSoilN] = useState<number>(75);
  const [soilP, setSoilP] = useState<number>(45);
  const [soilK, setSoilK] = useState<number>(38);
  const [rainfall, setRainfall] = useState<number>(180);

  // CivicVision Simulator State
  const [defectClass, setDefectClass] = useState<string>('Pothole');
  const [agingHours, setAgingHours] = useState<number>(18);
  const [duplicateReports, setDuplicateReports] = useState<number>(2);

  if (!project) return null;

  // Run VoxNira Triage calculation
  const runVoxNiraTriage = () => {
    const text = selectedSymptom.toLowerCase();
    let urgency = 'ROUTINE (Priority 3)';
    let priority = 3;
    let confidence = 0.88;
    let color = '#38D9FF';
    let entities: string[] = [];

    if (text.includes('chest') || text.includes('numbness') || text.includes('breath') || text.includes('acute')) {
      urgency = 'EMERGENT (Priority 1) - Critical Triage';
      priority = 1;
      confidence = 0.96;
      color = '#FF852E';
      entities = ['Chest Pressure [Cardiovascular]', 'Shoulder Numbness [Neurological]', 'Dyspnea [Respiratory]'];
    } else if (text.includes('fever') || text.includes('cough') || text.includes('pain')) {
      urgency = 'URGENT (Priority 2) - Clinic Review';
      priority = 2;
      confidence = 0.91;
      color = '#168BFF';
      entities = ['Hyperthermia [Infectious]', 'Persistent Cough [Respiratory]'];
    } else {
      entities = ['Mild Cutaneous Reaction [Dermatology]'];
    }

    setTriageResult({ urgency, confidence, entities, priority, color });
  };

  // Run AgriMind calculation
  const getRecommendedCrop = () => {
    if (rainfall > 160 && soilN > 60) return { crop: 'Rice (Paddy)', confidence: '94%', note: 'High rainfall & nitrogen balance' };
    if (soilK > 40 && soilP > 40) return { crop: 'Cotton', confidence: '89%', note: 'High potassium & phosphorus' };
    if (soilN < 50 && rainfall < 100) return { crop: 'Chickpea / Pulses', confidence: '92%', note: 'Drought-tolerant leguminous crop' };
    if (soilN > 70) return { crop: 'Maize (Corn)', confidence: '90%', note: 'High nitrogen feeding demands' };
    return { crop: 'Wheat / Millets', confidence: '87%', note: 'Balanced nutrient soil' };
  };

  // Run CivicVision Priority Calculation (0 - 100 explainable formula from City_Care repo)
  const getCivicPriority = () => {
    const weights: Record<string, { weight: number; dept: string; conf: string }> = {
      'Pothole': { weight: 35, dept: 'Road & Public Works (PWD)', conf: '92.4%' },
      'Open Manhole': { weight: 45, dept: 'Sewerage & Underground Drainage', conf: '96.1%' },
      'Waterlogging': { weight: 30, dept: 'Stormwater Drainage Department', conf: '88.7%' },
      'Broken Streetlight': { weight: 25, dept: 'Electrical Infrastructure', conf: '91.0%' },
      'Garbage Accumulation': { weight: 20, dept: 'Solid Waste Management', conf: '89.5%' },
      'Road Damage': { weight: 32, dept: 'Road & Public Works (PWD)', conf: '90.2%' }
    };
    const info = weights[defectClass] || { weight: 25, dept: 'General Municipal Works', conf: '90%' };
    const ageBonus = Math.min(25, Math.floor(agingHours * 0.35));
    const dupBonus = Math.min(30, duplicateReports * 7);
    const score = Math.min(99, info.weight + ageBonus + dupBonus);
    return { score, dept: info.dept, conf: info.conf };
  };

  const hasSimulator = ['voxnira', 'agrimind', 'civicvision-ai'].includes(project.slug);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-cyber-bg/85 dark:bg-cyber-bg/85 light:bg-slate-900/60 backdrop-blur-xl z-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto glass-panel rounded-3xl border border-cyber-blue/30 dark:border-cyber-blue/30 light:border-slate-200 shadow-2xl p-6 sm:p-8 bg-cyber-card/95 dark:bg-cyber-card/95 light:bg-white text-cyber-text dark:text-cyber-text light:text-slate-900"
        >
          {/* Header Controls */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyber-blue/15 text-cyber-cyan border border-cyber-blue/30 mb-2">
                <Cpu className="w-3.5 h-3.5 text-cyber-orange" />
                {project.category}
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-cyber-text dark:text-cyber-text light:text-slate-900">
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 hover:border-cyber-orange text-cyber-muted hover:text-cyber-orange transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub-Tabs: Overview vs Interactive Engineering Simulator */}
          {hasSimulator && (
            <div className="flex items-center gap-2 mb-6 border-b border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 pb-3 text-xs font-mono">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-cyber-blue text-white font-bold shadow-glow-subtle'
                    : 'text-cyber-muted hover:text-cyber-text dark:hover:text-white light:hover:text-slate-900 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                Project Deep Dive
              </button>
              <button
                onClick={() => {
                  setActiveTab('simulator');
                  if (project.slug === 'voxnira' && !triageResult) runVoxNiraTriage();
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'simulator'
                    ? 'bg-cyber-orange text-white font-bold shadow-glow-orange'
                    : 'text-cyber-orange border border-cyber-orange/30 hover:bg-cyber-orange/10'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Live Interactive Simulator</span>
              </button>
            </div>
          )}

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <>
              {/* Project Cover */}
              <div className="relative rounded-2xl overflow-hidden border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 mb-6 bg-cyber-bg dark:bg-cyber-bg light:bg-slate-100 aspect-video group">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/projects/vox-nira-cover.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg dark:from-cyber-bg light:from-white via-transparent to-transparent opacity-60 dark:opacity-60 light:opacity-20" />
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-cyber-muted dark:text-cyber-muted light:text-slate-600 mb-6 leading-relaxed font-sans">
                {project.full_description || project.short_description}
              </p>

              {/* Problem Statement & Solution */}
              {(project.problem_statement || project.solution) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {project.problem_statement && (
                    <div className="p-4 rounded-2xl bg-cyber-bg/70 dark:bg-cyber-bg/70 light:bg-slate-50 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200">
                      <h4 className="text-xs font-mono font-semibold text-cyber-orange uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-orange" />
                        Problem Statement
                      </h4>
                      <p className="text-xs sm:text-sm text-cyber-muted dark:text-cyber-muted light:text-slate-600 leading-relaxed font-sans">
                        {project.problem_statement}
                      </p>
                    </div>
                  )}
                  {project.solution && (
                    <div className="p-4 rounded-2xl bg-cyber-bg/70 dark:bg-cyber-bg/70 light:bg-slate-50 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200">
                      <h4 className="text-xs font-mono font-semibold text-cyber-cyan uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
                        Architectural Solution
                      </h4>
                      <p className="text-xs sm:text-sm text-cyber-muted dark:text-cyber-muted light:text-slate-600 leading-relaxed font-sans">
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Key Features */}
              {project.key_features && project.key_features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-mono font-semibold text-cyber-text dark:text-cyber-text light:text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyber-cyan" />
                    Key Engineered Capabilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.key_features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-cyber-bg/50 dark:bg-cyber-bg/50 light:bg-slate-50 border border-cyber-cardBorder/60 dark:border-cyber-cardBorder/60 light:border-slate-200 text-xs text-cyber-muted dark:text-cyber-muted light:text-slate-700 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-cyber-blue shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* My Direct Contribution */}
              {project.my_contribution && (
                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-cyber-blue/10 to-cyber-cyan/10 dark:from-cyber-blue/10 dark:to-cyber-cyan/10 light:from-blue-50/80 light:to-cyan-50/80 border border-cyber-blue/20 dark:border-cyber-blue/20 light:border-blue-200">
                  <h4 className="text-xs font-mono font-semibold text-cyber-cyan uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-cyber-cyan" />
                    My Direct Contribution
                  </h4>
                  <p className="text-xs sm:text-sm text-cyber-text dark:text-cyber-text light:text-slate-800 leading-relaxed font-sans">
                    {project.my_contribution}
                  </p>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-6">
                <h3 className="text-xs font-mono font-semibold text-cyber-muted uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-cyber-orange" />
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-cyber-bg border border-cyber-cardBorder text-cyber-cyan font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Tab 2: Interactive Simulators */}
          {activeTab === 'simulator' && (
            <div className="space-y-6">
              
              {/* Simulator 1: VoxNira */}
              {project.slug === 'voxnira' && (
                <div className="p-6 rounded-2xl bg-cyber-bg border border-cyber-blue/40 space-y-4">
                  <div className="flex items-center gap-2 text-cyber-cyan font-mono text-xs font-bold uppercase">
                    <Stethoscope className="w-4 h-4 text-cyber-orange" />
                    VoxNira Clinical NLP &amp; Random Forest Triage Simulator
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-cyber-muted mb-2">
                      Select or Input Patient Symptom Speech Transcription:
                    </label>
                    <select
                      value={selectedSymptom}
                      onChange={(e) => setSelectedSymptom(e.target.value)}
                      className="w-full p-3 rounded-xl bg-cyber-card border border-cyber-cardBorder text-cyber-text text-xs font-mono outline-none focus:border-cyber-cyan"
                    >
                      <option value="Acute chest pressure with radiating left shoulder numbness and shortness of breath">
                        Case A: Severe Chest Pressure &amp; Radiating Shoulder Pain
                      </option>
                      <option value="Moderate intermittent fever with persistent dry cough and body chills for 3 days">
                        Case B: Moderate Fever &amp; Respiratory Cough
                      </option>
                      <option value="Mild cutaneous itchy skin rash on left forearm after garden walk">
                        Case C: Mild Cutaneous Skin Rash
                      </option>
                    </select>
                  </div>

                  <button
                    onClick={runVoxNiraTriage}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white text-xs font-semibold shadow-glow-cyan flex items-center gap-2"
                  >
                    <Activity className="w-4 h-4" /> Run Triage Engine
                  </button>

                  {triageResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl border border-cyber-cardBorder bg-cyber-card space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-cyber-cardBorder/60 pb-2">
                        <span className="text-xs font-mono text-cyber-muted">Model Urgency Classification:</span>
                        <span
                          className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full"
                          style={{ color: triageResult.color, backgroundColor: `${triageResult.color}15`, border: `1px solid ${triageResult.color}40` }}
                        >
                          {triageResult.urgency}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-mono text-cyber-muted">
                        <div>
                          <span>Model Confidence:</span>
                          <span className="text-cyber-text font-bold ml-2">{(triageResult.confidence * 100).toFixed(1)}%</span>
                        </div>
                        <div>
                          <span>Clinician Action:</span>
                          <span className="text-cyber-cyan font-bold ml-2">Verification Required</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-mono text-cyber-muted block mb-1.5">spaCy Extracted Entities:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {triageResult.entities.map((ent, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-cyber-bg border border-cyber-cardBorder text-cyber-cyan">
                              {ent}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Simulator 2: AgriMind */}
              {project.slug === 'agrimind' && (
                <div className="p-6 rounded-2xl bg-cyber-bg border border-cyber-orange/40 space-y-5">
                  <div className="flex items-center gap-2 text-cyber-orange font-mono text-xs font-bold uppercase">
                    <Wheat className="w-4 h-4" />
                    AgriMind Soil N-P-K &amp; Climate Crop Recommendation Predictor
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-cyber-muted">Nitrogen (N):</span>
                        <span className="text-cyber-cyan font-bold">{soilN} mg/kg</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="120"
                        value={soilN}
                        onChange={(e) => setSoilN(Number(e.target.value))}
                        className="w-full accent-cyber-blue"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-cyber-muted">Phosphorus (P):</span>
                        <span className="text-cyber-cyan font-bold">{soilP} mg/kg</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="90"
                        value={soilP}
                        onChange={(e) => setSoilP(Number(e.target.value))}
                        className="w-full accent-cyber-cyan"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-cyber-muted">Potassium (K):</span>
                        <span className="text-cyber-cyan font-bold">{soilK} mg/kg</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="80"
                        value={soilK}
                        onChange={(e) => setSoilK(Number(e.target.value))}
                        className="w-full accent-cyber-orange"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-cyber-muted">Rainfall Forecast:</span>
                        <span className="text-cyber-cyan font-bold">{rainfall} mm</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="260"
                        value={rainfall}
                        onChange={(e) => setRainfall(Number(e.target.value))}
                        className="w-full accent-cyber-blue"
                      />
                    </div>
                  </div>

                  {/* Predicted Crop Output */}
                  {(() => {
                    const rec = getRecommendedCrop();
                    return (
                      <div className="p-4 rounded-xl border border-cyber-cardBorder bg-cyber-card flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block">Recommended Crop</span>
                          <span className="text-base font-display font-bold text-cyber-orange">{rec.crop}</span>
                          <span className="text-xs text-cyber-muted block mt-0.5 font-sans">{rec.note}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block">Yield Probability</span>
                          <span className="text-lg font-mono font-bold text-cyber-cyan">{rec.confidence}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Simulator 3: CivicVision AI Priority Scoring */}
              {project.slug === 'civicvision-ai' && (
                <div className="p-6 rounded-2xl bg-cyber-bg border border-cyber-cyan/40 space-y-4">
                  <div className="flex items-center gap-2 text-cyber-cyan font-mono text-xs font-bold uppercase">
                    <ShieldAlert className="w-4 h-4" />
                    Explainable Multi-Factor Priority Scoring &amp; Dispatch Engine
                  </div>

                  <div className="space-y-3 text-xs font-mono">
                    <div>
                      <span className="text-cyber-muted block mb-1.5">Detected Infrastructure Defect Class:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {['Pothole', 'Open Manhole', 'Waterlogging', 'Broken Streetlight', 'Garbage Accumulation', 'Road Damage'].map((c) => (
                          <button
                            key={c}
                            onClick={() => setDefectClass(c)}
                            className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                              defectClass === c
                                ? 'bg-cyber-blue/20 text-cyber-cyan border-cyber-cyan font-bold shadow-sm'
                                : 'bg-cyber-card text-cyber-muted border-cyber-cardBorder hover:border-cyber-cyan/40'
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-cyber-muted">Unresolved Aging:</span>
                          <span className="text-cyber-orange font-bold">{agingHours} hours</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="72"
                          value={agingHours}
                          onChange={(e) => setAgingHours(Number(e.target.value))}
                          className="w-full accent-cyber-orange"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-cyber-muted">Nearby Duplicate Reports (50m):</span>
                          <span className="text-cyber-cyan font-bold">{duplicateReports} reports</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="6"
                          value={duplicateReports}
                          onChange={(e) => setDuplicateReports(Number(e.target.value))}
                          className="w-full accent-cyber-cyan"
                        />
                      </div>
                    </div>
                  </div>

                  {(() => {
                    const res = getCivicPriority();
                    const isCritical = res.score > 70;
                    return (
                      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isCritical ? 'bg-red-950/20 border-red-500/40 text-red-300' : 'bg-cyan-950/20 border-cyan-500/40 text-cyan-300'
                      }`}>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider block text-cyber-muted">Department Routing</span>
                          <span className="text-sm font-bold font-mono text-white">{res.dept}</span>
                          <span className="text-xs text-cyber-muted block mt-0.5">YOLO Detection Confidence: {res.conf}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-mono uppercase tracking-wider block text-cyber-muted">Calculated Priority</span>
                          <span className={`text-2xl font-mono font-black ${isCritical ? 'text-red-400' : 'text-cyber-cyan'}`}>
                            {res.score}/100
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

            </div>
          )}

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-cyber-cardBorder mt-6">
            {project.github_url ? (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyber-card hover:bg-cyber-cardHover border border-cyber-blue/40 text-cyber-text hover:text-cyber-cyan text-xs font-semibold shadow-glow-subtle transition-all"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub Repository</span>
                <ExternalLink className="w-3 h-3 text-cyber-muted" />
              </a>
            ) : (
              <span
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyber-card/50 border border-cyber-cardBorder/50 text-cyber-muted/50 text-xs font-semibold cursor-not-allowed"
                title="Code repository private / pending publication"
              >
                <Github className="w-4 h-4" />
                <span>Repository Private</span>
              </span>
            )}

            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan hover:from-cyber-cyan hover:to-cyber-orange text-white text-xs font-semibold shadow-glow-cyan transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live Project</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="ml-auto px-4 py-2.5 rounded-xl text-xs font-medium text-cyber-muted hover:text-cyber-text transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
