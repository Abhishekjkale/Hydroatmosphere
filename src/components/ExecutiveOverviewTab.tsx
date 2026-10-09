import React, { useState } from 'react';
import {
  AlertTriangle,
  Compass,
  Layers,
  Wind,
  Droplets,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldAlert,
  Info,
  Scale,
  Globe2,
} from 'lucide-react';
import { ThreatZone, TabId } from '../types';
import { GLOBAL_THREAT_ZONES } from '../data/intelligenceData';

interface ExecutiveOverviewProps {
  onSelectZone: (zone: ThreatZone) => void;
  setActiveTab: (tab: TabId) => void;
}

export const ExecutiveOverviewTab: React.FC<ExecutiveOverviewProps> = ({
  onSelectZone,
  setActiveTab,
}) => {
  const [summaryExpanded, setSummaryExpanded] = useState<boolean>(true);
  const [mapFilter, setMapFilter] = useState<'all' | 'hydro' | 'srm' | 'weather_mod'>('all');
  const [activeZoneHover, setActiveZoneHover] = useState<ThreatZone | null>(null);

  const filteredZones = GLOBAL_THREAT_ZONES.filter((zone) => {
    if (mapFilter === 'all') return true;
    if (mapFilter === 'hydro') return zone.type === 'hydro' || zone.type === 'composite';
    if (mapFilter === 'srm') return zone.type === 'srm' || zone.type === 'composite';
    if (mapFilter === 'weather_mod') return zone.type === 'weather_mod' || zone.type === 'composite';
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Intelligence Context Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-rose-500"></span>
          <span className="font-semibold text-slate-200">STRATEGIC ASSESSMENT REPORT</span>
          <span aria-hidden="true">·</span>
          <span>Transboundary Governance & Planetary Security</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-slate-400">
          <span>CLASSIFICATION: PUBLIC POLICY BRIEF</span>
          <span aria-hidden="true">·</span>
          <span className="text-cyan-400">STATUS: ACTIVE INTELLIGENCE</span>
        </div>
      </div>

      {/* KPI Hero Cards: 4 primary metrics from instructions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-5 rounded-lg bg-slate-900/90 border border-slate-800 backdrop-blur-md relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-medium">Water Conflicts Index</span>
            <span className="text-rose-400 font-mono text-xs px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800/40">
              CRITICAL
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-100 font-mono tabular-nums tracking-tight">
            7.8 <span className="text-sm font-normal text-slate-400">/ 10</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            High risk of unilateral damming & cascade withholding across 263 international basins.
          </p>
          <div className="mt-3 pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-500">
            <span>Mekong & Indus flashpoints</span>
            <button
              onClick={() => setActiveTab('hydro')}
              className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
            >
              Analyze <ChevronDown className="w-3 h-3 -rotate-90" />
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-lg bg-slate-900/90 border border-slate-800 backdrop-blur-md relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-medium">SRM Governance Gap</span>
            <span className="text-amber-400 font-mono text-xs px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40">
              UNREGULATED
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-100 font-mono tabular-nums tracking-tight">
            88% <span className="text-sm font-normal text-slate-400">Gap Score</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Zero binding treaties regulate outdoor aerosol dispersal or rogue solar interventions.
          </p>
          <div className="mt-3 pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-500">
            <span>CBD Decision X/33 non-binding</span>
            <button
              onClick={() => setActiveTab('atmospheric')}
              className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
            >
              Review <ChevronDown className="w-3 h-3 -rotate-90" />
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-lg bg-slate-900/90 border border-slate-800 backdrop-blur-md relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-medium">CDR Capacity vs Target</span>
            <span className="text-cyan-400 font-mono text-xs px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
              2.1% OPERATIONAL
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-100 font-mono tabular-nums tracking-tight">
            2.1 <span className="text-sm font-normal text-slate-400">/ 100 Mt Target</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Direct Air Capture & permanent sequestration lag far behind Paris Agreement carbon timelines.
          </p>
          <div className="mt-3 pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-500">
            <span>$100–$600 / ton cost</span>
            <span className="text-slate-400 font-mono text-xs">Decadal lag</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-lg bg-slate-900/90 border border-slate-800 backdrop-blur-md relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-medium">Geoengineering Incidents</span>
            <span className="text-rose-400 font-mono text-xs px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800/40">
              12 ACTIVE
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-100 font-mono tabular-nums tracking-tight">
            12 <span className="text-sm font-normal text-slate-400">Monitoring Zones</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Tropospheric cloud seeding disputes, SAI balloon tests, and high-altitude vapor claims.
          </p>
          <div className="mt-3 pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-500">
            <span>SCoPEx & Sky River</span>
            <button
              onClick={() => setActiveTab('incidents')}
              className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
            >
              Archive <ChevronDown className="w-3 h-3 -rotate-90" />
            </button>
          </div>
        </div>
      </div>

      {/* Baseline Core Figures from Report (263 Basins / 0 Treaties / 1.5°C / 60%+ Flows) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-lg bg-slate-900/60 border border-slate-800">
        <div className="text-center px-2 py-1">
          <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">263</div>
          <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">Transboundary Basins</div>
        </div>
        <div className="text-center px-2 py-1 border-l border-slate-800">
          <div className="text-2xl font-bold font-mono text-rose-400 tabular-nums">0</div>
          <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">Binding SRM Treaties</div>
        </div>
        <div className="text-center px-2 py-1 border-l border-slate-800">
          <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">1.5°C</div>
          <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">Warming Threshold</div>
        </div>
        <div className="text-center px-2 py-1 border-l border-slate-800">
          <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">60%+</div>
          <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">Global Water Flows</div>
        </div>
      </div>

      {/* Main Viewport Split: Interactive World Threat Map & Selected Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Threat Map Viewport (8 Cols) */}
        <div className="lg:col-span-8 rounded-lg bg-slate-900/90 border border-slate-800 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-cyan-400" />
                Global Threat Radar: Transboundary Friction Hotspots
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Cartographic telemetry tracking mega-dam cascades, SRM testing corridors, and weather modification disputes
              </p>
            </div>

            {/* Interactive Filter Controls */}
            <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded border border-slate-800 text-xs shrink-0">
              <button
                onClick={() => setMapFilter('all')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  mapFilter === 'all'
                    ? 'bg-slate-800 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Zones ({GLOBAL_THREAT_ZONES.length})
              </button>
              <button
                onClick={() => setMapFilter('hydro')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  mapFilter === 'hydro'
                    ? 'bg-slate-800 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Hydro-Hegemony
              </button>
              <button
                onClick={() => setMapFilter('srm')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  mapFilter === 'srm'
                    ? 'bg-slate-800 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Atmospheric SRM
              </button>
              <button
                onClick={() => setMapFilter('weather_mod')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  mapFilter === 'weather_mod'
                    ? 'bg-slate-800 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Cloud Seeding
              </button>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[16/9] bg-slate-950/80 rounded-md border border-slate-800/80 overflow-hidden flex items-center justify-center">
            {/* Background Grid Pattern */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="threat-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#threat-grid)" />
            </svg>

            {/* Stylized World Continents Vector Graphic */}
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full text-slate-800 stroke-slate-700/50 fill-slate-900/60"
            >
              {/* North America */}
              <path d="M 120 90 Q 200 80 250 110 T 280 180 T 200 240 T 170 190 T 110 130 Z" />
              {/* South America */}
              <path d="M 270 260 Q 340 280 320 380 T 260 460 T 240 370 T 260 290 Z" />
              {/* Europe */}
              <path d="M 460 90 Q 550 80 570 140 T 520 180 T 450 150 Z" />
              {/* Africa */}
              <path d="M 460 200 Q 580 200 580 320 T 510 420 T 440 320 T 450 220 Z" />
              {/* Asia & Eurasia */}
              <path d="M 580 80 Q 750 70 850 140 T 820 260 T 670 240 T 580 170 Z" />
              {/* Southeast Asia & Maritime */}
              <path d="M 720 280 Q 770 270 780 320 T 730 350 Z" />
              {/* Australia */}
              <path d="M 780 350 Q 860 340 870 410 T 780 430 Z" />

              {/* Equator & Tropic Lines */}
              <line x1="0" y1="250" x2="1000" y2="250" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" />
              <text x="15" y="244" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">
                EQUATOR 0°
              </text>
              <line x1="0" y1="170" x2="1000" y2="170" stroke="#1e293b" strokeDasharray="2 4" strokeWidth="0.8" />
              <text x="15" y="164" fill="#475569" fontSize="9" fontFamily="JetBrains Mono">
                TROPIC OF CANCER 23.5°N
              </text>
            </svg>

            {/* Interactive Hotspot Nodes */}
            {filteredZones.map((zone) => {
              const isSelected = activeZoneHover?.id === zone.id;
              const isCritical = zone.riskLevel === 'critical';
              return (
                <div
                  key={zone.id}
                  style={{ left: `${zone.coordinates.x}%`, top: `${zone.coordinates.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                  onClick={() => {
                    setActiveZoneHover(zone);
                    onSelectZone(zone);
                  }}
                  onMouseEnter={() => setActiveZoneHover(zone)}
                >
                  {/* Ping Ring for Critical risks */}
                  {isCritical && (
                    <span className="absolute -inset-2 rounded-full bg-rose-500/20 animate-ping"></span>
                  )}
                  {/* Outer circle */}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-200 border ${
                      isSelected
                        ? 'scale-125 ring-4 ring-cyan-500/30'
                        : 'group-hover:scale-110'
                    } ${
                      isCritical
                        ? 'bg-rose-950 text-rose-300 border-rose-500'
                        : 'bg-amber-950 text-amber-300 border-amber-500'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                  </div>

                  {/* Hotspot Hover Tooltip */}
                  <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-30 whitespace-nowrap bg-slate-900 border border-slate-700 px-2.5 py-1.5 rounded shadow-xl text-xs">
                    <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                      <span>{zone.name}</span>
                      <span className="text-[10px] font-mono uppercase text-cyan-400">
                        {zone.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Flashpoint Risk: {zone.flashpointProbability}%
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Overlay Map Legend */}
            <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-2.5 rounded text-[11px] text-slate-400 space-y-1 z-10">
              <div className="font-semibold text-slate-300 text-xs mb-1">Risk Severity</div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>Critical Risk (Dam Cascades & SAI Corridors)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>High Risk (Regional Testing / Weather Mod)</span>
              </div>
            </div>

            {/* Quick Action in Map */}
            <div className="absolute top-3 right-3 text-[11px] font-mono text-slate-400 bg-slate-950/70 border border-slate-800 px-2 py-1 rounded">
              INTERACTIVE NODES: CLICK TO INSPECT
            </div>
          </div>

          {/* Quick List of Zones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-2">
            {filteredZones.map((zone) => (
              <button
                key={zone.id}
                onClick={() => {
                  setActiveZoneHover(zone);
                  onSelectZone(zone);
                }}
                className={`text-left p-2.5 rounded border transition-all text-xs ${
                  activeZoneHover?.id === zone.id
                    ? 'bg-slate-800 border-cyan-500/60 text-slate-100'
                    : 'bg-slate-950/50 border-slate-800/80 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold truncate">{zone.name}</span>
                  <span
                    className={`font-mono text-[10px] uppercase px-1.5 py-0.2 rounded ${
                      zone.riskLevel === 'critical'
                        ? 'text-rose-400 bg-rose-950/40'
                        : 'text-amber-400 bg-amber-950/40'
                    }`}
                  >
                    {zone.riskLevel}
                  </span>
                </div>
                <div className="text-slate-400 text-[11px] truncate mt-1">
                  {zone.region}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Hotspot Intelligence Dossier (4 Cols) */}
        <div className="lg:col-span-4 rounded-lg bg-slate-900/90 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              Regional Threat Dossier
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {activeZoneHover ? activeZoneHover.id.toUpperCase() : 'SELECT A ZONE'}
            </span>
          </div>

          {activeZoneHover ? (
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="text-base font-bold text-slate-100">{activeZoneHover.name}</h4>
                <div className="text-slate-400 mt-0.5">{activeZoneHover.region}</div>
              </div>

              {/* Flashpoint Barometer */}
              <div className="p-3 rounded bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-medium">Flashpoint Probability</span>
                  <span className="font-mono font-bold text-rose-400">
                    {activeZoneHover.flashpointProbability}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${activeZoneHover.flashpointProbability}%` }}
                  ></div>
                </div>
              </div>

              {/* Actors */}
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  Primary Sovereign / Entities
                </span>
                <p className="text-slate-200">{activeZoneHover.primaryActors.join(', ')}</p>
              </div>

              {/* Affected / Downstream */}
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  Downstream / Vulnerable States
                </span>
                <p className="text-slate-300">{activeZoneHover.downstreamOrAffected.join(', ')}</p>
              </div>

              {/* Summary */}
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  Intelligence Assessment
                </span>
                <p className="text-slate-300 leading-relaxed bg-slate-950/40 p-2.5 rounded border border-slate-800/60">
                  {activeZoneHover.summary}
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {activeZoneHover.keyMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded bg-slate-950/60 border border-slate-800/80"
                  >
                    <div className="text-[10px] text-slate-400 truncate">{metric.label}</div>
                    <div className="font-mono font-bold text-slate-100 text-sm mt-0.5">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Treaty Status */}
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  International Legal Status
                </span>
                <p className="text-slate-400 mt-1 text-[11px] leading-normal">
                  {activeZoneHover.treatyStatus}
                </p>
              </div>

              <button
                onClick={() => onSelectZone(activeZoneHover)}
                className="w-full mt-2 py-2 px-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold rounded text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Open Comprehensive Case Study</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 space-y-3">
              <Compass className="w-10 h-10 mx-auto text-slate-600" />
              <p className="text-xs">
                Hover or click on any hotspot node on the world radar to inspect localized hydro-politics,
                aerosol risks, and treaty vulnerabilities.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Executive Summary Analytical Brief (Collapsible Panel as required) */}
      <div className="rounded-lg bg-slate-900/90 border border-slate-800 overflow-hidden">
        <button
          onClick={() => setSummaryExpanded(!summaryExpanded)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-850 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Executive Analytical Brief: Unilateral Action vs. Multilateral Governance
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Strategic Assessment on atmospheric geoengineering (SRM/CDR) and macro-hydrological control
              </p>
            </div>
          </div>
          <div className="text-slate-400 p-1">
            {summaryExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {summaryExpanded && (
          <div className="p-5 pt-0 border-t border-slate-800/80 space-y-6 text-sm text-slate-300 leading-relaxed">
            {/* Visual Callout with Earth Atmosphere Asset */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-4 bg-slate-950/60 p-4 rounded-lg border border-slate-800">
              <div className="md:col-span-5 relative aspect-video rounded overflow-hidden border border-slate-800">
                <img
                  src="/src/assets/images/geo_earth_atmosphere_1791536222066.jpg"
                  alt="Atmospheric Geoengineering and Transboundary Planetary Visualization"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-sm p-2 rounded text-[11px] text-slate-300 border border-slate-800 font-mono">
                  Fig 1.1: Stratospheric Aerosol Injection Corridor & Planetary Boundary Simulation
                </div>
              </div>

              <div className="md:col-span-7 space-y-3">
                <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wide text-cyan-400">
                  The Dual Threat Vector of Environmental Modification
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The 21st century marks a fundamental shift in international relations, characterized by
                  the convergence of climate destabilization and unilateral technological capability. Sovereign
                  states and private entities are increasingly turning toward dual mechanisms of environmental
                  modification:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900/80 rounded border border-slate-800">
                    <span className="font-bold text-cyan-300 flex items-center gap-1.5 mb-1">
                      <Wind className="w-3.5 h-3.5" /> Atmospheric Geoengineering
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      Solar Radiation Management (SAI, MCB) & large-scale CDR. Inexpensive direct costs ($10B-$20B/yr)
                      enable rogue unilateral deployment with global monsoon impacts.
                    </span>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded border border-slate-800">
                    <span className="font-bold text-emerald-300 flex items-center gap-1.5 mb-1">
                      <Droplets className="w-3.5 h-3.5" /> Macro-Hydrological Control
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      Transboundary mega-dams, high-altitude diversion tunnels, and upstream retention cascades
                      (e.g., Lancang-Mekong & Indus Basins).
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* In-depth Analytical Prose from Page 1 of Report */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed">
              <div className="space-y-2">
                <h5 className="font-bold text-slate-100 text-sm">
                  The Tension: Unilateral Execution vs. Multilateral Governance
                </h5>
                <p>
                  A single nation now possesses the technological and financial leverage to alter global
                  precipitation patterns through atmospheric aerosol injection, or manipulate downstream
                  freshwater access through upstream dam operations. Without binding global treaty structures,
                  these physical interventions risk triggering severe interstate conflict, ecological
                  destabilization, and deep trust deficits across international borders.
                </p>
                <p className="text-slate-400">
                  The ENMOD Convention of 1976 only prohibits hostile military modifications, leaving peaceful or
                  defensive climate interventions completely unregulated.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-100 text-sm">
                  Strategic Imperative for Anticipatory Frameworks
                </h5>
                <p>
                  Traditional international environmental law—built on reactive consensus—is structurally
                  ill-equipped to govern unilateral climate interventions and hydro-hegemony. Establishing
                  anticipatory frameworks, legal accountability mechanisms, and equitable benefit-sharing models
                  is no longer merely an ecological preference, but a non-negotiable imperative for international peace
                  and security.
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs">
                  <button
                    onClick={() => setActiveTab('roadmap')}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4"
                  >
                    View Strategic Policy Recommendations & Treaty Builder &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
