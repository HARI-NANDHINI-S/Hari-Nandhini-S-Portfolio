import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { PERSONAL_INFO, INITIAL_PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command: string;
  output: string | React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-cyber-cyan">
          <p className="font-bold">Hari Nandhini S — Digital Shell [v2.4.0-release]</p>
          <p className="text-cyber-muted text-xs">Type <span className="text-cyber-orange font-mono">help</span> to list available commands.</p>
        </div>
      ),
    },
  ]);
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    setCmdHistory((prev) => [...prev, cmd]);
    setCmdIndex(-1);

    const parts = cmd.toLowerCase().split(' ');
    const main = parts[0];

    let output: React.ReactNode = null;

    switch (main) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-cyber-orange font-bold">AVAILABLE COMMANDS:</p>
            <p><span className="text-cyber-cyan font-mono w-24 inline-block">about</span> — View biography &amp; background</p>
            <p><span className="text-cyber-cyan font-mono w-24 inline-block">skills</span> — List technical competencies</p>
            <p><span className="text-cyber-cyan font-mono w-24 inline-block">projects</span> — List engineered projects</p>
            <p><span className="text-cyber-cyan font-mono w-24 inline-block">education</span> — View academic qualifications</p>
            <p><span className="text-cyber-cyan font-mono w-24 inline-block">contact</span> — Reach out directly</p>
            <p><span className="text-cyber-cyan font-mono w-24 inline-block">resume</span> — Open verified resumes</p>
            <p><span className="text-cyber-cyan font-mono w-24 inline-block">clear</span> — Clear terminal output</p>
            <p><span className="text-cyber-cyan font-mono w-24 inline-block">exit</span> — Close terminal session</p>
          </div>
        );
        break;

      case 'about':
        output = (
          <p className="text-xs text-cyber-muted leading-relaxed">
            {PERSONAL_INFO.bio} Currently pursuing M.Sc. Software Systems (5-Year Integrated) at Coimbatore Institute of Technology with an aggregate 8.85 CGPA.
          </p>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1.5 text-xs">
            {SKILL_CATEGORIES.map((cat) => (
              <p key={cat.id}>
                <span className="text-cyber-orange font-mono font-semibold">{cat.name}:</span>{' '}
                <span className="text-cyber-text">
                  {cat.groups.flatMap((g) => g.skills).join(', ')}
                </span>
              </p>
            ))}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-1 text-xs">
            {INITIAL_PROJECTS.map((p, idx) => (
              <p key={p.id}>
                <span className="text-cyber-cyan font-mono">[{idx + 1}]</span>{' '}
                <span className="font-semibold text-cyber-text">{p.title}</span> —{' '}
                <span className="text-cyber-muted">{p.category}</span>
              </p>
            ))}
          </div>
        );
        break;

      case 'education':
        output = (
          <div className="space-y-1 text-xs">
            <p><span className="text-cyber-cyan font-bold">M.Sc. Software Systems:</span> CIT, CGPA: 8.85 (2024–Present)</p>
            <p><span className="text-cyber-cyan font-bold">HSC:</span> G.K.D. Matriculation HSS, 93.67% (2023–2024)</p>
            <p><span className="text-cyber-cyan font-bold">SSLC:</span> G.K.D. Matriculation HSS, 91.00% (2020–2021)</p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-0.5 text-xs text-cyber-muted">
            <p>Email: <span className="text-cyber-cyan">{PERSONAL_INFO.email}</span></p>
            <p>Phone: <span className="text-cyber-cyan">{PERSONAL_INFO.phone}</span></p>
            <p>Location: <span className="text-cyber-cyan">{PERSONAL_INFO.location}</span></p>
            <p>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-cyber-orange underline">github.com/HARI-NANDHINI-S</a></p>
          </div>
        );
        break;

      case 'resume':
        output = (
          <div className="text-xs space-y-1">
            <p>Software Development Resume: <a href="#resume" onClick={onClose} className="text-cyber-cyan underline">Open Resume Hub (SDE Track)</a></p>
            <p>Data Analytics &amp; AI Resume: <a href="#resume" onClick={onClose} className="text-cyber-orange underline">Open Resume Hub (Data/AI Track)</a></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        setInputVal('');
        return;

      default:
        output = (
          <p className="text-xs text-red-400">
            command not found: '{cmd}'. Type <span className="text-cyber-orange underline">help</span> for available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = cmdIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdIndex !== -1) {
        const nextIdx = cmdIndex + 1;
        if (nextIdx >= cmdHistory.length) {
          setCmdIndex(-1);
          setInputVal('');
        } else {
          setCmdIndex(nextIdx);
          setInputVal(cmdHistory[nextIdx]);
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-0"
        />

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-2xl h-[460px] flex flex-col rounded-2xl bg-cyber-bg/95 border border-cyber-blue/40 shadow-2xl overflow-hidden font-mono text-sm"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-cyber-card border-b border-cyber-cardBorder select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 hover:opacity-100 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs font-mono text-cyber-muted flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-cyber-cyan" />
                hari@portfolio:~
              </span>
            </div>
            <button onClick={onClose} className="text-cyber-muted hover:text-cyber-orange transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Console Content */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#030712]/90">
            {history.map((log, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-2 text-cyber-blue">
                  <span className="text-cyber-orange">visitor@hn-portfolio:~$</span>
                  <span className="text-cyber-text font-bold">{log.command}</span>
                </div>
                <div className="pl-4 text-cyber-muted">{log.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Line */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 px-4 py-3 bg-cyber-card border-t border-cyber-cardBorder">
            <span className="text-cyber-orange shrink-0">visitor@hn-portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-cyber-cyan outline-none font-mono text-xs placeholder:text-cyber-muted/50"
              placeholder="type 'help' or command..."
            />
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

