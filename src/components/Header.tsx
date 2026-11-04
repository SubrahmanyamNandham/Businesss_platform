import React, { useState } from 'react';
import { useAgency, AppView } from '../context/AgencyContext';
import { Menu, X, Lock, Unlock, ArrowUpRight } from 'lucide-react';
import { Brand } from './Brand';

export const Header: React.FC<{ onOpenAdminLogin: () => void }> = ({ onOpenAdminLogin }) => {
  const { currentView, setCurrentView, isAdmin, setIsAdmin } = useAgency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; view: AppView }[] = [
    { label: 'Work', view: 'work' },
    { label: 'Services', view: 'services' },
    { label: 'Industries', view: 'industries' },
    { label: 'Process', view: 'process' },
    { label: 'Proposals', view: 'proposals' }
  ];

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark in display face */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-sm"
        >
          <Brand compact />
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          {navLinks.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 relative text-sm ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'hover:text-neutral-200'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + discrete Admin button */}
        <div className="flex items-center gap-3 shrink-0">
          {isAdmin ? (
            <button
              onClick={() => handleNavClick('admin')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded border transition-colors cursor-pointer ${
                currentView === 'admin'
                  ? 'bg-neutral-800 text-emerald-400 border-neutral-700'
                  : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
              }`}
              title="Evolvex AI command center"
            >
              <Unlock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Mode</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1 text-xs text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
              title="Evolvex AI portal login"
            >
              <Lock className="w-3 h-3" />
              <span>Studio Portal</span>
            </button>
          )}

          <button
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 rounded transition-all cursor-pointer shadow-sm active:scale-95 whitespace-nowrap shrink-0"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white rounded focus:outline-none focus:ring-1 focus:ring-neutral-500 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`text-left py-2 px-3 text-sm font-medium rounded transition-colors ${
                  currentView === link.view
                    ? 'bg-neutral-900 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            {isAdmin ? (
              <button
                onClick={() => handleNavClick('admin')}
                className="text-left py-2 px-3 text-sm font-mono text-emerald-400 hover:bg-neutral-900 rounded"
              >
                Command Center (Admin)
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminLogin();
                }}
                className="text-left py-2 px-3 text-xs text-neutral-500 hover:text-neutral-300"
              >
                Studio Portal Login
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
