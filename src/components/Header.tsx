import React from 'react';
import { TabId } from '../types';
import { ShieldAlert, Download, Menu, X, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenExportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  mobileMenuOpen,
  setMobileMenuOpen,
  onOpenExportModal,
}) => {
  const navItems: { id: TabId; label: string }[] = [
    { id: 'overview', label: 'Executive Overview' },
    { id: 'atmospheric', label: 'Atmospheric SRM/CDR' },
    { id: 'hydro', label: 'Hydro-Diplomacy' },
    { id: 'incidents', label: 'Incident Archive' },
    { id: 'roadmap', label: 'Policy Roadmap' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('overview')}
              className="text-left font-bold text-lg tracking-tight text-slate-100 hover:text-cyan-400 transition-colors whitespace-nowrap"
            >
              HydroAtmosphere
            </button>
            <span className="hidden sm:inline-block text-xs font-mono text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
              STRATEGIC INTEL
            </span>
          </div>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`whitespace-nowrap transition-colors pb-0.5 border-b-2 text-sm ${
                    isActive
                      ? 'border-cyan-400 text-cyan-300 font-semibold'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenExportModal}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 rounded-md transition-colors shadow-sm whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Dossier</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-200 rounded-md hover:bg-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
