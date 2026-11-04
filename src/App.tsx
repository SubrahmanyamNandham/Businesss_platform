/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AgencyProvider, useAgency } from './context/AgencyContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { HomeView } from './views/HomeView';
import { WorkView } from './views/WorkView';
import { ServicesView } from './views/ServicesView';
import { IndustriesView } from './views/IndustriesView';
import { ProcessView } from './views/ProcessView';
import { ProposalsView } from './views/ProposalsView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

const AppContent: React.FC = () => {
  const { currentView, selectedProject, setSelectedProject } = useAgency();
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-neutral-100 selection:text-neutral-900">
      
      {/* 3-Zone Header */}
      <Header onOpenAdminLogin={() => setAdminModalOpen(true)} />

      {/* Main Content Area with View Transition */}
      <main className="flex-1 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] as const }}
            className="w-full"
          >
            {currentView === 'home' && <HomeView />}
            {currentView === 'work' && <WorkView />}
            {currentView === 'services' && <ServicesView />}
            {currentView === 'industries' && <IndustriesView />}
            {currentView === 'process' && <ProcessView />}
            {currentView === 'proposals' && <ProposalsView />}
            {currentView === 'contact' && <ContactView />}
            {currentView === 'admin' && <AdminView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Modals */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <AdminLoginModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
};


export default function App() {
  return (
    <AgencyProvider>
      <AppContent />
    </AgencyProvider>
  );
}
