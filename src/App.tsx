import React, { useState } from 'react';
import { TabId, ThreatZone } from './types';
import { Header } from './components/Header';
import { ExecutiveOverviewTab } from './components/ExecutiveOverviewTab';
import { AtmosphericInterventionTab } from './components/AtmosphericInterventionTab';
import { HydroDiplomacyTab } from './components/HydroDiplomacyTab';
import { IncidentArchiveTab } from './components/IncidentArchiveTab';
import { StrategicRoadmapTab } from './components/StrategicRoadmapTab';
import { DetailModal } from './components/DetailModal';
import { ExportDossierModal } from './components/ExportDossierModal';
import {
  Globe,
  Wind,
  Droplets,
  Archive,
  BookOpen,
  ShieldAlert,
  Sliders,
  FileCheck,
  ChevronRight,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedZone, setSelectedZone] = useState<ThreatZone | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);

  const sidebarLinks = [
    {
      id: 'overview' as TabId,
      label: 'Executive Overview',
      subtitle: 'Global Risk Matrix & Threats',
      icon: Globe,
      badge: 'Critical 7.8',
      badgeColor: 'text-rose-400',
    },
    {
      id: 'atmospheric' as TabId,
      label: 'Atmospheric Intervention',
      subtitle: 'SRM vs. CDR & Simulator',
      icon: Wind,
      badge: '88% Void',
      badgeColor: 'text-amber-400',
    },
    {
      id: 'hydro' as TabId,
      label: 'Hydro-Diplomacy',
      subtitle: 'Mekong & Indus Basins',
      icon: Droplets,
      badge: '263 Basins',
      badgeColor: 'text-cyan-400',
    },
    {
      id: 'incidents' as TabId,
      label: 'Incident Archive',
      subtitle: 'SCoPEx & Cloud Seeding',
      icon: Archive,
      badge: '12 Sites',
      badgeColor: 'text-slate-400',
    },
    {
      id: 'roadmap' as TabId,
      label: 'Policy Roadmap',
      subtitle: 'Treaty Draft Builder',
      icon: BookOpen,
      badge: 'IC-AITHG',
      badgeColor: 'text-emerald-400',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header adhering to Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenExportModal={() => setExportModalOpen(true)}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Desktop Sidebar Navigation (3 Cols) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-5">
            <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 px-2">
                INTELLIGENCE DOMAINS
              </div>
              <nav className="space-y-1">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeTab === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => setActiveTab(link.id)}
                      className={`w-full text-left p-2.5 rounded-lg transition-all flex items-center justify-between text-xs ${
                        isActive
                          ? 'bg-slate-800 border border-cyan-500/50 text-slate-100 shadow-sm'
                          : 'text-slate-400 hover:bg-slate-850 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-cyan-400' : 'text-slate-500'
                          }`}
                        />
                        <div>
                          <div className={`font-semibold ${isActive ? 'text-cyan-200' : 'text-slate-200'}`}>
                            {link.label}
                          </div>
                          <div className="text-[10px] text-slate-400">{link.subtitle}</div>
                        </div>
                      </div>
                      <span className={`font-mono text-[10px] font-bold ${link.badgeColor}`}>
                        {link.badge}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Interactive Tool Launchers */}
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-3 text-xs">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                FEATURED WORKSPACES
              </div>

              <button
                onClick={() => setActiveTab('atmospheric')}
                className="w-full text-left p-2.5 rounded bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-cyan-400" /> SRM Trade-off Tool
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Simulate cooling (°C) vs. monsoon disruption (%)
                </div>
              </button>

              <button
                onClick={() => setActiveTab('roadmap')}
                className="w-full text-left p-2.5 rounded bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-400" /> Model Treaty Builder
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Draft & export international convention articles
                </div>
              </button>
            </div>

            {/* Source Reference Attribution */}
            <div className="p-3 text-[11px] text-slate-400 border border-slate-800/60 rounded-lg bg-slate-950/40 leading-relaxed">
              <div className="font-semibold text-slate-300 text-xs mb-1">Source Assessment:</div>
              "Climate and Water Diplomacy: Engineering the Atmosphere and Damming the Rivers"
              <div className="mt-1 text-[10px] text-slate-400">
                Panel on Climate & Transboundary Risk · Public Policy Document
              </div>
            </div>
          </aside>

          {/* Main Content Viewport (9 Cols) */}
          <main className="lg:col-span-9 min-h-[700px]">
            {activeTab === 'overview' && (
              <ExecutiveOverviewTab
                onSelectZone={(zone) => setSelectedZone(zone)}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'atmospheric' && <AtmosphericInterventionTab />}

            {activeTab === 'hydro' && <HydroDiplomacyTab />}

            {activeTab === 'incidents' && <IncidentArchiveTab />}

            {activeTab === 'roadmap' && <StrategicRoadmapTab />}
          </main>
        </div>
      </div>

      {/* Global Modals */}
      <DetailModal
        zone={selectedZone}
        onClose={() => setSelectedZone(null)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setSelectedZone(null);
        }}
      />

      <ExportDossierModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />

      {/* Clean Global Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950/80 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">HydroAtmosphere Intelligence Platform</span>
            <span aria-hidden="true">·</span>
            <span>Transboundary Climate & Water Security</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>263 Basins Monitored</span>
            <span aria-hidden="true">·</span>
            <span>UNEP / WMO / ENMOD Framework Compliance</span>
            <span aria-hidden="true">·</span>
            <span>Model Treaty IC-AITHG</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
