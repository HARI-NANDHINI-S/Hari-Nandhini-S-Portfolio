import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col gap-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`pointer-events-auto p-4 rounded-2xl glass-panel shadow-2xl border flex items-start gap-3 ${
              toast.type === 'success'
                ? 'border-emerald-500/40 text-emerald-300'
                : toast.type === 'error'
                ? 'border-red-500/40 text-red-300'
                : 'border-cyber-blue/40 text-cyber-cyan'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-cyber-orange shrink-0 mt-0.5" />
            )}
            <p className="text-xs font-mono flex-1 leading-relaxed text-cyber-text">
              {toast.message}
            </p>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-cyber-muted hover:text-cyber-text transition-colors p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

