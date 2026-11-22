import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { ExperienceDetailPage } from './pages/ExperienceDetailPage';
import { BookingFlowPage } from './pages/BookingFlowPage';
import { OrganizerDashboardPage } from './pages/OrganizerDashboardPage';
import { CreateExperiencePage } from './pages/CreateExperiencePage';
import { ManageSessionsPage } from './pages/ManageSessionsPage';
import { AuthPage } from './pages/AuthPage';
import { EXPERIENCES } from './data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { pageVariants } from './lib/motion';
import { AppBackground } from './components/AppBackground';

export function App() {
  const [experiences, setExperiences] = useState(EXPERIENCES);
  const [currentView, setCurrentView] = useState('landing');
  const [selectedExperience, setSelectedExperience] = useState(EXPERIENCES[0]);
  const [selectedSession, setSelectedSession] = useState(
    EXPERIENCES[0].sessions && EXPERIENCES[0].sessions.length > 0 ? EXPERIENCES[0].sessions[0] : null
  );
  const [currentUser, setCurrentUser] = useState({
    id: 'user-101',
    name: 'Parth Deshmukh',
    role: 'USER',
    phone: '+91 98221 44021',
    email: 'deshmukhparth080@gmail.com',
    avatarInitials: 'PD'
  });
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleSelectExperience = (exp) => {
    setSelectedExperience(exp);
    setSelectedSession(exp.sessions && exp.sessions.length > 0 ? exp.sessions[0] : null);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookSession = (exp, session) => {
    setSelectedExperience(exp);
    setSelectedSession(session);
    setCurrentView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExperienceCreated = (newExp) => {
    setExperiences([newExp, ...experiences]);
    setSelectedExperience(newExp);
    setSelectedSession(null);
    setCurrentView('manage-sessions');
    showToast(`"${newExp.title}" published! Add available session slots below.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser({
      ...userData,
      avatarInitials: userData.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    });
    showToast(`Signed in as ${userData.name} (${userData.role === 'HOST' ? 'Superhost' : 'Experience Seeker'})`);
    if (userData.role === 'HOST') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('discover');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingPage
            onSelectExperience={handleSelectExperience}
            onViewChange={setCurrentView}
            experiences={experiences}
          />
        );
      case 'discover':
        return (
          <DiscoverPage
            onSelectExperience={handleSelectExperience}
            experiences={experiences}
          />
        );
      case 'detail':
        return (
          <ExperienceDetailPage
            experience={selectedExperience}
            currentUser={currentUser}
            showToast={showToast}
            onBack={() => setCurrentView('discover')}
            onBookSession={handleBookSession}
          />
        );
      case 'booking':
        return (
          <BookingFlowPage
            experience={selectedExperience}
            session={selectedSession}
            onBack={() => setCurrentView('detail')}
            onComplete={() => setCurrentView('landing')}
          />
        );
      case 'dashboard':
        return (
          <OrganizerDashboardPage
            onViewChange={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectExperience={(exp) => {
              setSelectedExperience(exp);
              setCurrentView('manage-sessions');
            }}
          />
        );
      case 'create-experience':
        return (
          <CreateExperiencePage
            onBack={() => setCurrentView('dashboard')}
            onViewChange={setCurrentView}
            onExperienceCreated={handleExperienceCreated}
          />
        );
      case 'manage-sessions':
        return (
          <ManageSessionsPage
            selectedExperience={selectedExperience}
            onBack={() => setCurrentView('dashboard')}
            onViewChange={setCurrentView}
            onNavigateToExperience={(exp) => {
              setSelectedExperience(exp);
              setCurrentView('detail');
            }}
          />
        );
      case 'auth':
        return (
          <AuthPage
            onBack={() => setCurrentView('landing')}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      default:
        return null;
    }
  };

  const isAuthView = currentView === 'auth';

  return (
    <div className={`min-h-screen ${isAuthView ? 'h-screen overflow-hidden' : ''} flex flex-col bg-[#F6F4EE] text-[#1A1917] relative selection:bg-[#1A1917] selection:text-white`}>
      {/* Global Dribbble Atmospheric Background Theme (Across Every Page) */}
      {!isAuthView && <AppBackground currentView={currentView} />}

      {/* Toast Notification — Framer Motion enter/exit */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-20 right-4 sm:right-6 z-50 bg-[#1A1917] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 text-xs sm:text-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-[#7C1D2F] shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Universal Top Navigation (Hidden on Dedicated Full-Screen Auth View) */}
      {!isAuthView && (
        <Navbar
          currentView={currentView}
          onViewChange={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          currentUser={currentUser}
        />
      )}

      {/* Main Page Viewport — animated page transitions */}
      <main className={`flex-1 ${isAuthView ? '' : 'pb-12'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Universal Footer (Hidden on Dedicated Full-Screen Auth View) */}
      {!isAuthView && <Footer onViewChange={setCurrentView} />}
    </div>
  );
}

export default App;
