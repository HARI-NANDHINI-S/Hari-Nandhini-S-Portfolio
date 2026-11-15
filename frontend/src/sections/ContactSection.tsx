import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Send, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { submitContact } from '../services/api';

interface ContactSectionProps {
  onShowToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submissionFeedback, setSubmissionFeedback] = useState<string>('');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    onShowToast('info', `Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isSubmitting) return; // Prevent duplicate concurrent submissions

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      setSubmissionState('error');
      const missingMsg = 'Please fill in all contact fields (name, email, subject, and message).';
      setSubmissionFeedback(missingMsg);
      onShowToast('error', missingMsg);
      return;
    }

    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setSubmissionState('error');
      const invalidEmailMsg = 'Please provide a valid email address.';
      setSubmissionFeedback(invalidEmailMsg);
      onShowToast('error', invalidEmailMsg);
      return;
    }

    setIsSubmitting(true);
    setSubmissionState('loading');
    setSubmissionFeedback('Sending your message...');

    try {
      const res = await submitContact({
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
      });

      // Strictly verify boolean success flag from provider
      if (res && res.success === true) {
        setSubmissionState('success');
        const successMsg = typeof res.message === 'string' && res.message.trim()
          ? res.message
          : 'Your message has been sent successfully!';
        setSubmissionFeedback(successMsg);
        onShowToast('success', successMsg);

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#168BFF', '#38D9FF', '#FF852E']
          });
        } catch (err) {}

        // Clear form fields ONLY on verified delivery success
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Delivery failed: preserve user input so they can easily retry
        setSubmissionState('error');
        const errorMsg = typeof res?.message === 'string' && res.message.trim()
          ? res.message
          : 'Email delivery could not be completed. Please check your details and retry.';
        setSubmissionFeedback(errorMsg);
        onShowToast('error', errorMsg);
      }
    } catch (err: any) {
      setSubmissionState('error');
      const errorMsg = typeof err?.message === 'string' && err.message.trim()
        ? err.message
        : 'An unexpected connection error occurred. Please try again.';
      setSubmissionFeedback(errorMsg);
      onShowToast('error', errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-cyber-text dark:text-cyber-text light:text-light-text tracking-tight mb-4">
            LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-orange">CONNECT</span>
          </h2>
          <p className="text-sm sm:text-base text-cyber-muted dark:text-cyber-muted light:text-light-muted leading-relaxed font-sans">
            I welcome opportunities to connect with recruiters, engineering leads, and collaborators regarding software internships, developer roles, and technical discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contact & Social Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-5 rounded-2xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 hover:border-cyber-blue/40 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-cyber-blue/15 text-cyber-blue group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500 uppercase tracking-wider block">Direct Email</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm font-mono font-semibold text-cyber-text dark:text-cyber-text light:text-slate-900 hover:text-cyber-cyan transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'Email')}
                className="p-2 rounded-lg text-cyber-muted hover:text-cyber-cyan hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedField === 'Email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 hover:border-cyber-cyan/40 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-cyber-cyan/15 text-cyber-cyan group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500 uppercase tracking-wider block">Phone</span>
                  <a
                    href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                    className="text-sm font-mono font-semibold text-cyber-text dark:text-cyber-text light:text-slate-900 hover:text-cyber-cyan transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'Phone')}
                className="p-2 rounded-lg text-cyber-muted hover:text-cyber-cyan hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                title="Copy phone to clipboard"
              >
                {copiedField === 'Phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location Card */}
            <div className="p-5 rounded-2xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 flex items-center gap-4 group">
              <div className="p-3 rounded-xl bg-cyber-orange/15 text-cyber-orange group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-500 uppercase tracking-wider block">Current Location</span>
                <span className="text-sm font-mono font-semibold text-cyber-text dark:text-cyber-text light:text-slate-900">
                  {PERSONAL_INFO.location}
                </span>
              </div>
            </div>

            {/* Social Network Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 hover:border-cyber-blue/40 text-cyber-text dark:text-cyber-text light:text-slate-900 hover:text-cyber-cyan transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-cyber-blue group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono font-semibold">LinkedIn</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-cyber-muted" />
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass-panel border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-200 hover:border-cyber-orange/40 text-cyber-text dark:text-cyber-text light:text-slate-900 hover:text-cyber-orange transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-cyber-orange group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono font-semibold">GitHub</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-cyber-muted" />
              </a>
            </div>
          </div>

          {/* Right Column: Single Professional Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-cyber-blue/30 dark:border-cyber-blue/30 light:border-slate-200 shadow-2xl bg-cyber-card/90 dark:bg-cyber-card/90 light:bg-white">
              <h3 className="text-xl font-display font-bold text-cyber-text dark:text-cyber-text light:text-slate-900 mb-2">
                Send Direct Message
              </h3>
              <p className="text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-600 mb-6">
                Fill in the fields below to send a message directly to Hari Nandhini.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-700 mb-1.5 uppercase font-medium">
                      Your Name <span className="text-cyber-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Smith"
                      className="w-full px-4 py-3 rounded-xl bg-cyber-bg dark:bg-cyber-bg light:bg-slate-50 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-300 text-cyber-text dark:text-cyber-text light:text-slate-900 placeholder:text-cyber-muted/40 light:placeholder:text-slate-400 text-xs font-mono focus:outline-none focus:border-cyber-cyan transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-700 mb-1.5 uppercase font-medium">
                      Your Email <span className="text-cyber-orange">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-cyber-bg dark:bg-cyber-bg light:bg-slate-50 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-300 text-cyber-text dark:text-cyber-text light:text-slate-900 placeholder:text-cyber-muted/40 light:placeholder:text-slate-400 text-xs font-mono focus:outline-none focus:border-cyber-cyan transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-700 mb-1.5 uppercase font-medium">
                    Subject <span className="text-cyber-orange">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. SDE Internship Opportunity / Project Inquiry"
                    className="w-full px-4 py-3 rounded-xl bg-cyber-bg dark:bg-cyber-bg light:bg-slate-50 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-300 text-cyber-text dark:text-cyber-text light:text-slate-900 placeholder:text-cyber-muted/40 light:placeholder:text-slate-400 text-xs font-mono focus:outline-none focus:border-cyber-cyan transition-colors"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-mono text-cyber-muted dark:text-cyber-muted light:text-slate-700 mb-1.5 uppercase font-medium">
                    Message <span className="text-cyber-orange">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-xl bg-cyber-bg dark:bg-cyber-bg light:bg-slate-50 border border-cyber-cardBorder dark:border-cyber-cardBorder light:border-slate-300 text-cyber-text dark:text-cyber-text light:text-slate-900 placeholder:text-cyber-muted/40 light:placeholder:text-slate-400 text-xs font-mono focus:outline-none focus:border-cyber-cyan transition-colors resize-none"
                  />
                </div>

                {/* Submission State Notification Banners */}
                {submissionState === 'loading' && (
                  <div className="p-3.5 rounded-xl bg-cyber-blue/10 border border-cyber-blue/30 flex items-center gap-3 text-cyber-cyan animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin shrink-0 text-cyber-cyan" />
                    <span className="text-xs font-mono font-medium">Sending your message...</span>
                  </div>
                )}

                {submissionState === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                    <div className="flex-1">
                      <p className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">Message Delivered</p>
                      <p className="text-xs font-mono text-emerald-300/90 mt-1 leading-relaxed">
                        {submissionFeedback || 'Your message has been sent successfully! Hari will review and respond shortly.'}
                      </p>
                    </div>
                  </div>
                )}

                {submissionState === 'error' && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-cyber-orange" />
                    <div className="flex-1">
                      <p className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-orange">Delivery Notice</p>
                      <p className="text-xs font-mono text-red-300/90 mt-1 leading-relaxed">
                        {submissionFeedback}
                      </p>
                      <p className="text-[11px] font-mono text-cyber-muted mt-2">
                        Your entered details are preserved above. You may edit and retry, or reach out directly at{' '}
                        <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyber-cyan underline hover:text-cyber-blue transition-colors">
                          {PERSONAL_INFO.email}
                        </a>.
                      </p>
                    </div>
                  </div>
                )}

                {/* Single Professional Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-orange hover:opacity-95 text-white text-xs sm:text-sm font-semibold shadow-glow-cyan hover:scale-[1.01] active:scale-[0.99] disabled:hover:scale-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Sending your message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{submissionState === 'error' ? 'Retry Sending Message' : 'Send Message'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
