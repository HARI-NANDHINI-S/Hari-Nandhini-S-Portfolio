import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GlobalBackground } from './components/GlobalBackground';
import { CustomCursor } from './components/CustomCursor';
import { SpotlightEffect } from './components/SpotlightEffect';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { LeadershipSection } from './sections/LeadershipSection';
import { SkillsSection } from './sections/SkillsSection';
import { EducationSection } from './sections/EducationSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { AchievementsSection } from './sections/AchievementsSection';
import { ResumeSection } from './sections/ResumeSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';
import { LoadingScreen } from './components/LoadingScreen';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-cyber-bg dark:bg-cyber-bg light:bg-light-bg text-cyber-text dark:text-cyber-text light:text-light-text selection:bg-cyber-blue selection:text-white overflow-x-hidden">
      {/* 1. Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* 2. Global Cyber Ambient Canvas Background */}
      <GlobalBackground />

      {/* 3. Soft Cursor-Following Radial Spotlight */}
      <SpotlightEffect />

      {/* 4. Custom Glowing Cursor */}
      <CustomCursor />

      {/* 5. Top Scroll Progress Indicator & Back to Top */}
      <ScrollProgress />

      {/* 6. Sticky / Floating Intelligent Navbar */}
      <Navbar />

      {/* 7. Main Portfolio Sections in Strategic Progression */}
      <main className="relative z-10">
        <HeroSection />
        <ExperienceSection />
        <LeadershipSection />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection />
        <CertificationsSection />
        <AchievementsSection />
        <ResumeSection />
        <ContactSection onShowToast={addToast} />
      </main>

      {/* 8. Footer */}
      <Footer />

      {/* 9. Feedback Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

export default App;
