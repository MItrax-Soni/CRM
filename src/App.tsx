import React from 'react';
import { CrmProvider, useCrm } from './context/CrmContext';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { CopilotDrawer } from './components/CopilotDrawer';
import { NewLeadModal } from './components/NewLeadModal';
import { ToastContainer } from './components/ToastContainer';

import { PipelineDashboardView } from './views/PipelineDashboardView';
import { LeadFeedScoringView } from './views/LeadFeedScoringView';
import { MeetingDebriefView } from './views/MeetingDebriefView';
import { ContactDossierCopilotView } from './views/ContactDossierCopilotView';
import { AnalyticsView } from './views/AnalyticsView';
import { SettingsView } from './views/SettingsView';

const MainContent: React.FC = () => {
  const { activeView } = useCrm();

  return (
    <main className={`ml-72 ${activeView === 'copilot' ? 'pt-16 p-4 h-screen overflow-hidden' : 'pt-20 px-8 pb-12 min-h-screen overflow-y-auto'}`}>
      {activeView === 'pipeline' && <PipelineDashboardView />}
      {activeView === 'leads' && <LeadFeedScoringView />}
      {activeView === 'debriefs' && <MeetingDebriefView />}
      {activeView === 'copilot' && <ContactDossierCopilotView />}
      {activeView === 'analytics' && <AnalyticsView />}
      {activeView === 'settings' && <SettingsView />}
    </main>
  );
};

export function App() {
  return (
    <CrmProvider>
      <div className="bg-background text-on-surface min-h-screen antialiased selection:bg-primary-container selection:text-on-primary-container">
        {/* Persistent Desktop Sidebar */}
        <Sidebar />

        {/* Top App Bar */}
        <TopNav />

        {/* Dynamic Main Workspace Canvas */}
        <MainContent />

        {/* Global Dialogs & Overlays */}
        <CommandPaletteModal />
        <CopilotDrawer />
        <NewLeadModal />
        <ToastContainer />
      </div>
    </CrmProvider>
  );
}

export default App;
