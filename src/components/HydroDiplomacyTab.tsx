import React, { useState } from 'react';
import {
  Droplets,
  Calendar,
  AlertTriangle,
  Scale,
  Activity,
  Layers,
  ShieldAlert,
  ChevronRight,
  TrendingDown,
  Info,
} from 'lucide-react';
import { MEKONG_DAM_CASCADE } from '../data/intelligenceData';
import { DamCascadeNode } from '../types';

export const HydroDiplomacyTab: React.FC = () => {
  // Sub-case study active tab
  const [activeCaseStudy, setActiveCaseStudy] = useState<'mekong' | 'indus'>('mekong');

  // Mekong state
  const [selectedDam, setSelectedDam] = useState<DamCascadeNode>(MEKONG_DAM_CASCADE[3]); // Nuozhadu

  // Indus Simulator state
  const [treatyScenario, setTreatyScenario] = useState<'status_quo' | 'renegotiation' | 'unilateral_suspension'>('status_quo');

  const scenarioDetails = {
    status_quo: {
      name: 'Status Quo (1960 Framework with Legal Stagnation)',
      color: 'text-amber-400',
      badgeBg: 'bg-amber-950/60 border-amber-800/60 text-amber-300',
      description:
        'Continued adherence to rigid 1960 volumetric division, while dispute escalation on Kishanganga (330 MW) and Ratle (850 MW) remains locked in parallel Hague Court of Arbitration and World Bank Neutral Expert proceedings.',
      metrics: {
        downstreamWaterSecurity: 'Moderate Risk (62%)',
        militaryFlashpoint: 'Elevated (58%)',
        agriculturalImpact: 'Marginal decline due to unshared glacial variability data',
        legalPrecedent: 'Strained bilateral paralysis',
      },
      keyProjections:
        'Glacial retreat in the Karakoram is unmonitored jointly; Pakistan faces unpredicted sudden flood pulses and dry spells without real-time Indian hydrological data sharing.',
    },
    renegotiation: {
      name: 'Structured Modernization & Climate Annex Re-negotiation',
      color: 'text-emerald-400',
      badgeBg: 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300',
      description:
        'Formal modification of the IWT to integrate climate change, glacial retreat telemetry, joint automated flood warning sensors, and optimized non-consumptive hydroelectric design standards.',
      metrics: {
        downstreamWaterSecurity: 'High Stability (88%)',
        militaryFlashpoint: 'Low Risk (24%)',
        agriculturalImpact: '+18% improved predictive water scheduling for 200M people',
        legalPrecedent: 'Model of 21st-century adaptive hydro-diplomacy',
      },
      keyProjections:
        'Both nations establish joint glacier observation stations and shared digital telemetry, neutralizing hydro-weaponization rhetoric and stabilizing South Asian food security.',
    },
    unilateral_suspension: {
      name: 'Unilateral Suspension / Abrogation by India',
      color: 'text-rose-400',
      badgeBg: 'bg-rose-950/60 border-rose-800/60 text-rose-300',
      description:
        'Upper riparian unilaterally suspends Indus Commission meetings and redirects or restricts Western River flows (Indus, Jhelum, Chenab) during political friction or retaliation.',
      metrics: {
        downstreamWaterSecurity: 'Catastrophic Failure (12%)',
        militaryFlashpoint: 'Extreme Flashpoint (94%)',
        agriculturalImpact: 'Loss of up to 45% of irrigated wheat & cotton yields in Pakistani Punjab and Sindh',
        legalPrecedent: 'Direct breach of customary international water law & Vienna Convention',
      },
      keyProjections:
        'Threatens water and food survival for over 200 million people downstream; acute risk of triggering conventional military mobilization between two nuclear-armed states.',
    },
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Tab Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono uppercase tracking-wider mb-1">
            <Droplets className="w-4 h-4" /> Dimension 3: Hydro-Politics & Mega-Dams
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            Hydro-Diplomacy: Transboundary Basins & Asymmetric River Control
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Deep-dive geopolitical analysis of Asia’s primary hydro-hegemon cascades and the unraveling Indus Waters Treaty
          </p>
        </div>

        {/* Case Study Switcher */}
        <div className="flex items-center p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs shrink-0">
          <button
            onClick={() => setActiveCaseStudy('mekong')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeCaseStudy === 'mekong'
                ? 'bg-slate-800 text-cyan-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Lancang-Mekong Cascade
          </button>
          <button
            onClick={() => setActiveCaseStudy('indus')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeCaseStudy === 'indus'
                ? 'bg-slate-800 text-cyan-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Indus Waters Treaty Crisis
          </button>
        </div>
      </div>

      {/* CASE STUDY 1: LANCANG-MEKONG RIVER CASCADE */}
      {activeCaseStudy === 'mekong' && (
        <div className="space-y-6">
          {/* Hero Banner with Satellite Image */}
          <div className="rounded-lg bg-slate-900/90 border border-slate-800 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 items-center">
              <div className="lg:col-span-5 relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-800">
                <img
                  src="/src/assets/images/mekong_hydro_cascade_1791536236174.jpg"
                  alt="Upper Lancang-Mekong Nuozhadu Dam Satellite View"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-sm p-2 rounded text-[11px] text-slate-300 border border-slate-800 font-mono">
                  Fig 3.1: Upper Lancang Gorge & Nuozhadu Mega-Reservoir (21.7 Bm³)
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/40">
                    HYDRO-HEGEMONY EXERCISE
                  </span>
                  <span className="text-xs text-slate-400 font-mono">UPPER RIPARIAN CONTROL</span>
                </div>

                <h3 className="text-lg font-bold text-slate-100">
                  Case Study 1: China's Upstream Dam Cascade on the Upper Lancang
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  The People’s Republic of China occupies a commanding position as Asia’s primary hydro-hegemon,
                  holding territorial sovereignty over the Tibetan Plateau—the glacial source of the continent’s
                  major transboundary rivers (Mekong, Brahmaputra, Indus, Salween).
                </p>

                <p className="text-xs text-slate-300 leading-relaxed">
                  China’s construction of 11+ mega-dam cascades along the Upper Lancang grants Beijing
                  unprecedented unilateral control over downstream river flow volumes, seasonal timing, and sediment
                  distribution. Operating outside full membership in the downstream Mekong River Commission (MRC),
                  China effectively leverages hydro-infrastructure as a powerful strategic tool in bilateral diplomacy.
                </p>

                {/* 4 Metric Pill-Free Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Active Storage</div>
                    <div className="text-base font-bold text-cyan-300 font-mono mt-0.5">47.2 Bm³</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Upper basin cascade</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Sediment Trapped</div>
                    <div className="text-base font-bold text-rose-300 font-mono mt-0.5">75%</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Delta erosion crisis</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Delta Salinity</div>
                    <div className="text-base font-bold text-amber-300 font-mono mt-0.5">+45 km</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Inland intrusion (VN)</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Fisheries Yield</div>
                    <div className="text-base font-bold text-rose-400 font-mono mt-0.5">-38%</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Tonle Sap collapse</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dam Cascade Timeline & Interactive Node Inspector */}
          <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Upper Lancang Mega-Dam Cascade Timeline (1995 – Present)
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select a dam structure to inspect engineering specifications, active retention volume, and downstream ecological impacts
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
                TOTAL POWER: 21,300+ MW
              </span>
            </div>

            {/* Stepper / Timeline Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {MEKONG_DAM_CASCADE.map((dam) => (
                <button
                  key={dam.name}
                  onClick={() => setSelectedDam(dam)}
                  className={`text-left p-3 rounded-lg border transition-all text-xs ${
                    selectedDam.name === dam.name
                      ? 'bg-slate-800 border-cyan-400 text-slate-100 shadow-md ring-1 ring-cyan-400/40'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                  }`}
                >
                  <div className="font-mono text-[10px] text-cyan-400">{dam.yearCompleted}</div>
                  <div className="font-bold text-slate-200 text-xs mt-1 truncate">{dam.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {dam.storageBillionM3} Bm³
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Dam Detailed Specifications */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-2">
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-base text-slate-100">{selectedDam.name}</h5>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                    Completed {selectedDam.yearCompleted}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedDam.impactNote}</p>
                <div className="text-[11px] text-slate-400 pt-1">
                  Downstream riparian impact: Delays annual Tonle Sap flood pulse by up to 6 weeks, disrupting
                  spawning migrations of over 100 migratory fish species and reducing nutrient-rich silt delivery.
                </div>
              </div>

              <div className="md:col-span-4 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Dam Height</span>
                  <div className="font-mono font-bold text-slate-100 text-sm mt-0.5">
                    {selectedDam.heightMeters} meters
                  </div>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Installed Power</span>
                  <div className="font-mono font-bold text-slate-100 text-sm mt-0.5">
                    {selectedDam.capacityMW} MW
                  </div>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 col-span-2">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Active Reservoir Storage</span>
                  <div className="font-mono font-bold text-cyan-300 text-sm mt-0.5">
                    {selectedDam.storageBillionM3} Billion m³
                  </div>
                </div>
              </div>
            </div>

            {/* Natural Baseline vs Post-Cascade Regulated Flow Chart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-200">
                  Hydro-Hydrograph Variance: Pre-Dam Natural Baseline vs. Post-Cascade Regulated Flow
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  MEASUREMENT: CHIANG SAEN / VIENTIANE GAUGE
                </span>
              </div>

              <div className="w-full bg-slate-950/80 rounded-lg border border-slate-800 p-4">
                <svg viewBox="0 0 600 200" className="w-full h-auto">
                  {/* Grid lines */}
                  <line x1="50" y1="20" x2="570" y2="20" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="50" y1="70" x2="570" y2="70" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="50" y1="120" x2="570" y2="120" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="50" y1="170" x2="570" y2="170" stroke="#334155" />

                  {/* Flow Rate Labels (m³/s) */}
                  <text x="40" y="24" fill="#64748b" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">
                    12,000
                  </text>
                  <text x="40" y="74" fill="#64748b" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">
                    8,000
                  </text>
                  <text x="40" y="124" fill="#64748b" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">
                    4,000
                  </text>
                  <text x="40" y="174" fill="#64748b" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">
                    0 m³/s
                  </text>

                  {/* Months on X-Axis */}
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
                    (month, idx) => {
                      const x = 50 + idx * (520 / 11);
                      return (
                        <text
                          key={month}
                          x={x}
                          y="188"
                          fill="#64748b"
                          fontSize="9"
                          textAnchor="middle"
                          fontFamily="JetBrains Mono"
                        >
                          {month}
                        </text>
                      );
                    }
                  )}

                  {/* Natural Baseline Curve (Dashed Emerald) */}
                  {/* Dry season low (Mar-Apr ~1500), Monsoon peak (Aug-Sep ~11000) */}
                  <path
                    d="M 50 155 Q 140 165 235 150 T 375 30 T 470 70 T 570 145"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />

                  {/* Post-Cascade Regulated Flow (Solid Cyan/Red) */}
                  {/* Monsoon truncated to store water, dry season artificially boosted/held for power generation */}
                  <path
                    d="M 50 135 Q 140 140 235 135 T 375 75 T 470 95 T 570 130"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />

                  {/* Tonle Sap Pulse Suppression Area Shading */}
                  <polygon
                    points="330,78 375,30 420,50 420,85 375,75 330,78"
                    fill="#f43f5e"
                    fillOpacity="0.25"
                  />
                  <text x="375" y="60" fill="#f43f5e" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">
                    Monsoon Pulse Truncated (-35%)
                  </text>
                </svg>

                {/* Legend */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-emerald-400 border-dashed"></span>
                      <span className="text-slate-300">Natural Hydrological Baseline (Pre-1995)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-cyan-400"></span>
                      <span className="text-slate-300">Regulated Cascading Hydrograph (Current)</span>
                    </div>
                  </div>
                  <span className="text-rose-400 font-mono text-[10px]">
                    ECO-IMPACT: Tonle Sap Reverse-Flow Delayed 4-6 Weeks
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CASE STUDY 2: INDUS WATER TREATY CRISIS */}
      {activeCaseStudy === 'indus' && (
        <div className="space-y-6">
          {/* Hero Banner with Indus Glacier Asset */}
          <div className="rounded-lg bg-slate-900/90 border border-slate-800 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 items-center">
              <div className="lg:col-span-5 relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-800">
                <img
                  src="/src/assets/images/indus_glacier_basin_1791536247356.jpg"
                  alt="Karakoram and Indus Basin Glacial Headwaters Satellite"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-sm p-2 rounded text-[11px] text-slate-300 border border-slate-800 font-mono">
                  Fig 3.2: Karakoram Glacial Headwaters Feeding Indus Basin
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/40">
                    BILATERAL FLASHPOINT
                  </span>
                  <span className="text-xs text-slate-400 font-mono">NUCLEAR-ARMED RIPARIANS</span>
                </div>

                <h3 className="text-lg font-bold text-slate-100">
                  Case Study 2: The Indus Waters Treaty (IWT) Crisis
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  The 1960 Indus Waters Treaty (IWT) between India and Pakistan, mediated by the World Bank,
                  has long served as a benchmark for durable transboundary hydro-diplomacy, surviving multiple armed
                  conflicts. The treaty allocates the Eastern Rivers (Sutlej, Beas, Ravi) to India and the Western
                  Rivers (Indus, Jhelum, Chenab) to Pakistan, while granting India specific non-consumptive
                  hydroelectric rights on the Western tributaries.
                </p>

                <p className="text-xs text-slate-300 leading-relaxed">
                  However, climate-driven glacial retreat, shifting monsoons, and heightened political tensions have
                  pushed the treaty toward structural collapse. India has formally requested modifications to the
                  treaty, citing changing demographic needs, clean energy priorities, and persistent procedural
                  delays caused by Pakistani legal challenges to Indian hydro-electric projects (Kishanganga 330MW, Ratle 850MW).
                </p>

                {/* Bilateral Risk Barometer */}
                <div className="p-3 rounded bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-rose-400" />
                      Bilateral Hydro-Tension Barometer (India vs. Pakistan)
                    </span>
                    <span className="font-mono font-bold text-rose-400 text-sm">
                      8.4 / 10 (CRITICAL FLASHPOINT)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full w-[84%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>1960 Peaceful Partition</span>
                    <span>1999 Kargil Test</span>
                    <span className="text-rose-400 font-bold">2023-Present Modification Demand</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Allocation Breakdown: Eastern vs Western Rivers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300">Eastern Rivers (Allocated to India)</span>
                <span className="font-mono text-xs text-slate-400">~33 Million Acre-Feet</span>
              </div>
              <p className="text-xs text-slate-300">
                Sutlej, Beas, Ravi. India enjoys unrestricted domestic and agricultural usage rights. Extensive
                diversion canal networks (e.g. Indira Gandhi Canal) support arid agriculture in Rajasthan and Punjab.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-300">Western Rivers (Allocated to Pakistan)</span>
                <span className="font-mono text-xs text-slate-400">~135 Million Acre-Feet</span>
              </div>
              <p className="text-xs text-slate-300">
                Indus, Jhelum, Chenab. Pakistan holds rights to flow, while India maintains run-of-the-river
                hydroelectric rights under stringent storage, pondage, and spillway design restrictions.
              </p>
            </div>
          </div>

          {/* INTERACTIVE TREATY MODIFICATION SCENARIO SIMULATOR */}
          <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-cyan-400" />
                  Interactive Treaty Modification Scenario Simulator
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Evaluate geopolitical, agricultural, and security trajectories under three distinct policy outcomes
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                200M+ PEOPLE DEPENDENT DOWNSTREAM
              </span>
            </div>

            {/* Scenario Selector Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => setTreatyScenario('status_quo')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  treatyScenario === 'status_quo'
                    ? 'bg-slate-800 border-amber-400/80 ring-1 ring-amber-400/30'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-850'
                }`}
              >
                <div className="text-xs font-bold text-slate-200">Scenario A: Status Quo</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Parallel arbitration & persistent procedural delays
                </div>
              </button>

              <button
                onClick={() => setTreatyScenario('renegotiation')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  treatyScenario === 'renegotiation'
                    ? 'bg-slate-800 border-emerald-400/80 ring-1 ring-emerald-400/30'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-850'
                }`}
              >
                <div className="text-xs font-bold text-slate-200">Scenario B: Re-negotiation</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Climate adaptation & joint automated telemetry
                </div>
              </button>

              <button
                onClick={() => setTreatyScenario('unilateral_suspension')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  treatyScenario === 'unilateral_suspension'
                    ? 'bg-slate-800 border-rose-400/80 ring-1 ring-rose-400/30'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-850'
                }`}
              >
                <div className="text-xs font-bold text-slate-200">Scenario C: Unilateral Suspension</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Upper riparian abrogation & severe military crisis
                </div>
              </button>
            </div>

            {/* Dynamic Output Dashboard for Scenario */}
            <div className="p-5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <span className={`text-sm font-bold ${scenarioDetails[treatyScenario].color}`}>
                  {scenarioDetails[treatyScenario].name}
                </span>
                <span className={`text-xs font-mono px-2 py-0.5 rounded border ${scenarioDetails[treatyScenario].badgeBg}`}>
                  PROJECTION ACTIVE
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {scenarioDetails[treatyScenario].description}
              </p>

              {/* Projections Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Downstream Water Security</div>
                  <div className="text-xs font-bold text-slate-100 mt-1">
                    {scenarioDetails[treatyScenario].metrics.downstreamWaterSecurity}
                  </div>
                </div>

                <div className="p-3 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Military Flashpoint</div>
                  <div className="text-xs font-bold text-slate-100 mt-1">
                    {scenarioDetails[treatyScenario].metrics.militaryFlashpoint}
                  </div>
                </div>

                <div className="p-3 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Agricultural Impact</div>
                  <div className="text-xs font-bold text-slate-100 mt-1">
                    {scenarioDetails[treatyScenario].metrics.agriculturalImpact}
                  </div>
                </div>

                <div className="p-3 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">International Law Status</div>
                  <div className="text-xs font-bold text-slate-100 mt-1">
                    {scenarioDetails[treatyScenario].metrics.legalPrecedent}
                  </div>
                </div>
              </div>

              {/* Assessment Narrative */}
              <div className="p-3 rounded bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                <span className="font-semibold text-slate-200 block mb-1">Strategic Intelligence Takeaway:</span>
                {scenarioDetails[treatyScenario].keyProjections}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
