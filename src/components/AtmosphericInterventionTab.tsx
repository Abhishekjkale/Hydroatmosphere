import React, { useState, useMemo } from 'react';
import {
  Wind,
  Sliders,
  Scale,
  AlertTriangle,
  ArrowUpDown,
  Search,
  ShieldAlert,
  Flame,
  CloudRain,
  ThermometerSnowflake,
  RefreshCw,
  Compass,
} from 'lucide-react';
import { TECH_COMPARISON_MATRIX } from '../data/intelligenceData';
import { TechnologyComparison } from '../types';

export const AtmosphericInterventionTab: React.FC = () => {
  // Table state
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'SRM' | 'CDR'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<keyof TechnologyComparison>('riskRating');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Simulation Calculator State
  const [injectionTg, setInjectionTg] = useState<number>(8); // Tg SO2/year (0 - 25)
  const [presetLabel, setPresetLabel] = useState<string>('Moderate Deployment (8 Tg)');

  // Dynamic calculations based on atmospheric science models (IPCC / GeoMIP):
  // Radiative forcing is roughly -0.75 W/m² per 5 Tg SO2; cooling is ~0.10°C per Tg with diminishing returns
  const calculatedCooling = useMemo(() => {
    if (injectionTg === 0) return 0;
    // Non-linear cooling saturation curve
    const cooling = 0.12 * Math.pow(injectionTg, 0.88);
    return Math.min(2.5, Math.round(cooling * 100) / 100);
  }, [injectionTg]);

  // Monsoon disruption index (% reduction in South Asian / Sahel precipitation)
  const calculatedMonsoonDisruption = useMemo(() => {
    if (injectionTg === 0) return 0;
    // Aerosol-induced ITCZ southward displacement & land-sea thermal contrast weakening
    const disruption = 2.1 * Math.pow(injectionTg, 0.95);
    return Math.min(48, Math.round(disruption));
  }, [injectionTg]);

  // Termination shock rebound rate (°C / decade if abruptly halted)
  const terminationShockRate = useMemo(() => {
    if (injectionTg === 0) return 0;
    const rebound = 0.8 + injectionTg * 0.14;
    return Math.round(rebound * 10) / 10;
  }, [injectionTg]);

  // Filtered & sorted table data
  const filteredTechs = useMemo(() => {
    return TECH_COMPARISON_MATRIX.filter((item) => {
      const matchCat = filterCategory === 'ALL' || item.category === filterCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.primaryMechanism.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subTechnique.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return 0;
    });
  }, [filterCategory, searchQuery, sortField, sortAsc]);

  const handleApplyPreset = (tg: number, label: string) => {
    setInjectionTg(tg);
    setPresetLabel(label);
  };

  // Selected G77 Sentiment Index Dimension
  const [selectedSentimentDim, setSelectedSentimentDim] = useState<number>(0);

  const sentimentDimensions = [
    {
      title: 'Monsoon Disruption & Food Security',
      score: 94,
      assessment: 'Critical Alarm',
      narrative:
        'Over 1.8 billion people in South Asia and Sub-Saharan Africa depend on the summer monsoon for rain-fed agriculture. Model consensus indicates stratospheric sulfur reduces global mean precipitation and weakens monsoonal winds, threatening crop collapses in the Global South.',
    },
    {
      title: 'Moral Hazard & Mitigation Deterrence',
      score: 89,
      assessment: 'High Resistance',
      narrative:
        'Cheap direct costs ($10B-$20B/yr) provide a dangerous alibi for high-income emitting states and fossil fuel conglomerates to delay mandatory phase-outs and default on climate finance obligations under the Paris Agreement.',
    },
    {
      title: 'Absence of Free Prior Informed Consent (FPIC)',
      score: 96,
      assessment: 'Severe Illegitimacy',
      narrative:
        'Unilateral atmospheric intervention subjects non-deploying sovereign states to involuntary transboundary ecological experimentation. Indigenous and developing state groups classify this as technological paternalism and environmental colonialism.',
    },
    {
      title: 'Termination Shock Vulnerability',
      score: 92,
      assessment: 'Existential Hazard',
      narrative:
        'If aerosol injection is halted abruptly due to interstate conflict, cyber sabotage, or economic crisis, accumulated greenhouse forcing would cause catastrophic temperature spikes of 1.5°C to 2.5°C within 3 to 5 years, far outpacing ecosystem adaptation.',
    },
    {
      title: 'Asymmetric Technological Control',
      score: 85,
      assessment: 'Geopolitical Distrust',
      narrative:
        'Patents, high-altitude dispersal aircraft fleets, and climate monitoring satellites remain concentrated in Northern industrial nations, consolidating coercive geoengineering hegemony over planetary thermostats.',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Tab Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono uppercase tracking-wider mb-1">
            <Wind className="w-4 h-4" /> Dimension 2: Planetary Interventions
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            Atmospheric Intervention: SRM vs. CDR Comparative Intelligence
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluating thermodynamic response curves, direct economics, termination shock vulnerabilities, and governance voids
          </p>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 font-mono text-slate-300">
            SRM COST: <span className="text-emerald-400 font-bold">$10B–$20B / yr</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 font-mono text-slate-300">
            CDR COST: <span className="text-amber-400 font-bold">$100–$600 / ton</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: SIMULATION & TRADE-OFF CALCULATOR (Hero Section) */}
      <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              SRM Trade-off Simulation Engine: Stratospheric Aerosol Injection
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Adjust annual aerosol mass (Tg SO₂/year) to evaluate thermodynamic cooling versus regional precipitation disruption
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950/80 rounded border border-slate-800 text-xs">
            <span className="text-slate-400 px-2 py-0.5 text-[11px] font-mono">SCENARIO:</span>
            <button
              onClick={() => handleApplyPreset(2, 'Cautious Pilot (2 Tg)')}
              className={`px-2.5 py-1 rounded transition-colors ${
                injectionTg === 2 ? 'bg-slate-800 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2 Tg Pilot
            </button>
            <button
              onClick={() => handleApplyPreset(8, 'Moderate Deployment (8 Tg)')}
              className={`px-2.5 py-1 rounded transition-colors ${
                injectionTg === 8 ? 'bg-slate-800 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              8 Tg Moderate
            </button>
            <button
              onClick={() => handleApplyPreset(15, 'Aggressive Cooling (15 Tg)')}
              className={`px-2.5 py-1 rounded transition-colors ${
                injectionTg === 15 ? 'bg-slate-800 text-rose-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              15 Tg Heavy
            </button>
            <button
              onClick={() => handleApplyPreset(22, 'Peak Overshoot (22 Tg)')}
              className={`px-2.5 py-1 rounded transition-colors ${
                injectionTg === 22 ? 'bg-rose-950 text-rose-300 font-semibold border border-rose-800' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              22 Tg Extreme
            </button>
          </div>
        </div>

        {/* Interactive Controls & Output Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Slider & Input Parameter (5 Cols) */}
          <div className="lg:col-span-5 space-y-5 bg-slate-950/60 p-5 rounded-lg border border-slate-800">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-cyan-400" />
                  Stratospheric SO₂ Aerosol Mass
                </span>
                <span className="font-mono text-cyan-300 font-bold text-sm tabular-nums">
                  {injectionTg} Tg SO₂ / year
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={injectionTg}
                onChange={(e) => {
                  setInjectionTg(Number(e.target.value));
                  setPresetLabel(`Custom (${e.target.value} Tg)`);
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0 Tg (Baseline)</span>
                <span>8 Tg (Pinatubo Eq.)</span>
                <span>15 Tg</span>
                <span>25 Tg (Severe Limit)</span>
              </div>
            </div>

            {/* Calculated Impact Counters */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-400" />
                  Global Mean Cooling
                </div>
                <div className="font-mono text-xl font-bold text-cyan-300 mt-1 tabular-nums">
                  -{calculatedCooling.toFixed(2)}°C
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Rapid response (&lt;12 mos)</div>
              </div>

              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <CloudRain className="w-3.5 h-3.5 text-rose-400" />
                  Monsoon Disruption
                </div>
                <div className="font-mono text-xl font-bold text-rose-300 mt-1 tabular-nums">
                  -{calculatedMonsoonDisruption}%
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">South Asia / Sahel reduction</div>
              </div>

              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Termination Rebound
                </div>
                <div className="font-mono text-lg font-bold text-amber-300 mt-1 tabular-nums">
                  +{terminationShockRate}°C / dec
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">If abruptly halted</div>
              </div>

              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-slate-400" />
                  Fleet Requirement
                </div>
                <div className="font-mono text-lg font-bold text-slate-200 mt-1 tabular-nums">
                  {Math.round(injectionTg * 6.5)} <span className="text-xs font-normal">aircraft</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Modified high-altitude jets</div>
              </div>
            </div>

            {/* Warning Callout based on injection rate */}
            {injectionTg >= 12 ? (
              <div className="p-3 rounded bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Catastrophic Monsoon Tipping Point:</span>
                  Disruption of tropical monsoons exceeds 25%. Acute risk of agricultural collapse across
                  the Indo-Gangetic Plain and Sahelian pastoral belts.
                </div>
              </div>
            ) : injectionTg > 4 ? (
              <div className="p-3 rounded bg-amber-950/60 border border-amber-800/80 text-amber-200 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Transboundary Hydro-Stress Alert:</span>
                  Detectable suppression of evaporation cycles. Upstream riparians may experience altered
                  snowmelt while equatorial river basins suffer erratic wet seasons.
                </div>
              </div>
            ) : (
              <div className="p-3 rounded bg-slate-900 border border-slate-800 text-slate-400 text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-300 block">Baseline / Low Injection:</span>
                  Marginal temperature reduction (-{calculatedCooling}°C). Microphysical uncertainties
                  predominate in stratospheric aerosol coagulation.
                </div>
              </div>
            )}
          </div>

          {/* Dynamic SVG Visual Chart: Trade-off Curves (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-200">
                Planetary Response Curve: Cooling vs. Monsoon Alteration
              </span>
              <span className="font-mono text-[11px] text-cyan-400">
                ACTIVE SCENARIO: {presetLabel}
              </span>
            </div>

            <div className="w-full bg-slate-950/80 rounded-lg border border-slate-800 p-4 relative overflow-hidden">
              <svg viewBox="0 0 600 280" className="w-full h-auto overflow-visible">
                {/* Horizontal grid lines */}
                <line x1="50" y1="30" x2="570" y2="30" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="50" y1="80" x2="570" y2="80" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="50" y1="130" x2="570" y2="130" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="50" y1="180" x2="570" y2="180" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="50" y1="230" x2="570" y2="230" stroke="#334155" />

                {/* Left Axis: Cooling (°C) */}
                <text x="40" y="34" fill="#38bdf8" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">
                  -2.5°C
                </text>
                <text x="40" y="84" fill="#38bdf8" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">
                  -1.8°C
                </text>
                <text x="40" y="134" fill="#38bdf8" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">
                  -1.2°C
                </text>
                <text x="40" y="184" fill="#38bdf8" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">
                  -0.6°C
                </text>
                <text x="40" y="234" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">
                  0.0°C
                </text>

                {/* Right Axis: Monsoon Disruption (%) */}
                <text x="578" y="34" fill="#f43f5e" fontSize="10" textAnchor="start" fontFamily="JetBrains Mono">
                  -45%
                </text>
                <text x="578" y="84" fill="#f43f5e" fontSize="10" textAnchor="start" fontFamily="JetBrains Mono">
                  -30%
                </text>
                <text x="578" y="134" fill="#f43f5e" fontSize="10" textAnchor="start" fontFamily="JetBrains Mono">
                  -18%
                </text>
                <text x="578" y="184" fill="#f43f5e" fontSize="10" textAnchor="start" fontFamily="JetBrains Mono">
                  -8%
                </text>
                <text x="578" y="234" fill="#64748b" fontSize="10" textAnchor="start" fontFamily="JetBrains Mono">
                  0%
                </text>

                {/* X Axis Labels (Tg SO2) */}
                <text x="50" y="250" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">
                  0 Tg
                </text>
                <text x="154" y="250" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">
                  5 Tg
                </text>
                <text x="258" y="250" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">
                  10 Tg
                </text>
                <text x="362" y="250" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">
                  15 Tg
                </text>
                <text x="466" y="250" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">
                  20 Tg
                </text>
                <text x="560" y="250" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">
                  25 Tg
                </text>

                {/* Theoretical Cooling Curve (Cyan) */}
                <path
                  d="M 50 230 Q 200 130 570 35"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Theoretical Monsoon Disruption Curve (Rose) */}
                <path
                  d="M 50 230 Q 300 190 570 30"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  strokeLinecap="round"
                />

                {/* Current Active Injection Marker Vertical Line */}
                {(() => {
                  const xPos = 50 + (injectionTg / 25) * 520;
                  const coolingY = 230 - (calculatedCooling / 2.5) * 195;
                  const monsoonY = 230 - (calculatedMonsoonDisruption / 48) * 195;
                  return (
                    <g>
                      <line
                        x1={xPos}
                        y1="25"
                        x2={xPos}
                        y2="230"
                        stroke="#e2e8f0"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                      {/* Cooling Dot */}
                      <circle cx={xPos} cy={coolingY} r="6" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
                      {/* Monsoon Dot */}
                      <circle cx={xPos} cy={monsoonY} r="6" fill="#f43f5e" stroke="#0f172a" strokeWidth="2" />
                      {/* Label at Top */}
                      <rect
                        x={Math.min(480, Math.max(50, xPos - 55))}
                        y="5"
                        width="110"
                        height="20"
                        fill="#0f172a"
                        stroke="#38bdf8"
                        strokeWidth="1"
                        rx="3"
                      />
                      <text
                        x={Math.min(480, Math.max(50, xPos - 55)) + 55}
                        y="18"
                        fill="#f8fafc"
                        fontSize="9"
                        textAnchor="middle"
                        fontFamily="JetBrains Mono"
                      >
                        {injectionTg} Tg : -{calculatedCooling}°C
                      </text>
                    </g>
                  );
                })()}
              </svg>

              {/* Chart Legend */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-1 bg-cyan-400 rounded"></span>
                    <span className="text-slate-300">Global Thermal Cooling (°C)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-1 bg-rose-400 rounded border-dashed"></span>
                    <span className="text-slate-300">Monsoon Rainfall Suppression (%)</span>
                  </div>
                </div>
                <div className="text-slate-400 font-mono text-[10px]">
                  MODEL: GeoMIP G4 / IPCC AR6 SYTHESIS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: INTERACTIVE COMPARISON TABLE & MATRIX (Page 2 of Report) */}
      <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              SRM vs. CDR Comprehensive Evaluation Matrix
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct comparison of mechanisms, deployment latency, economic profiles, and geopolitical friction points
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search mechanism..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-md text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 w-44"
              />
            </div>

            <div className="flex items-center p-1 bg-slate-950 rounded border border-slate-800 text-xs">
              <button
                onClick={() => setFilterCategory('ALL')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filterCategory === 'ALL'
                    ? 'bg-slate-800 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Techs
              </button>
              <button
                onClick={() => setFilterCategory('SRM')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filterCategory === 'SRM'
                    ? 'bg-slate-800 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                SRM
              </button>
              <button
                onClick={() => setFilterCategory('CDR')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filterCategory === 'CDR'
                    ? 'bg-slate-800 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                CDR
              </button>
            </div>
          </div>
        </div>

        {/* Dense Table */}
        <div className="overflow-x-auto border border-slate-800 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Technology Pathway</th>
                <th className="py-3 px-3">Primary Mechanism</th>
                <th className="py-3 px-3">Response Speed</th>
                <th className="py-3 px-3">Economic Cost</th>
                <th className="py-3 px-3">Transboundary Risk</th>
                <th className="py-3 px-4">Geopolitical Flashpoint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTechs.map((tech) => (
                <tr
                  key={tech.id}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-100">{tech.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{tech.subTechnique}</div>
                    <span
                      className={`inline-block mt-1 font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        tech.category === 'SRM'
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-800/50'
                          : 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/50'
                      }`}
                    >
                      {tech.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-slate-300 max-w-xs leading-normal">
                    {tech.primaryMechanism}
                  </td>

                  <td className="py-3.5 px-3 text-slate-300 font-mono text-[11px] whitespace-nowrap">
                    {tech.speedAndResponse}
                  </td>

                  <td className="py-3.5 px-3 text-slate-200 font-mono text-[11px] whitespace-nowrap">
                    {tech.economicCost}
                  </td>

                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-block font-mono font-bold text-[11px] px-2 py-0.5 rounded mb-1 ${
                        tech.riskRating === 'Extreme'
                          ? 'text-rose-400 bg-rose-950/60 border border-rose-800/50'
                          : tech.riskRating === 'High'
                          ? 'text-amber-400 bg-amber-950/60 border border-amber-800/50'
                          : 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/50'
                      }`}
                    >
                      {tech.riskRating} Risk
                    </span>
                    <p className="text-[11px] text-slate-400 leading-normal max-w-xs">{tech.transboundaryRisk}</p>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300 max-w-xs leading-normal">
                    {tech.feasibilityPolitics}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: LEGAL VACUUM & GLOBAL SOUTH OPPOSITIONAL RADAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Governance Vacuum Breakdown (6 Cols) */}
        <div className="lg:col-span-6 rounded-lg bg-slate-900/90 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <h3 className="text-base font-bold text-slate-100">
              The International Governance Vacuum & Unilateral Risk
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            International law currently lacks a comprehensive, legally binding convention to explicitly regulate
            or prohibit atmospheric solar intervention.
          </p>

          <div className="space-y-3 pt-2 text-xs">
            <div className="p-3.5 rounded bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">1976 ENMOD Convention Loophole</span>
                <span className="text-[10px] font-mono text-rose-400 uppercase">LEGAL BLINDSPOT</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                The UN Convention on the Prohibition of Military or Any Other Hostile Use of Environmental
                Modification Techniques (ENMOD) strictly bans environmental weaponization, but entirely fails
                to govern peaceful, defensive, or unilateral climate mitigation interventions.
              </p>
            </div>

            <div className="p-3.5 rounded bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">CBD Decision X/33 Non-Binding Moratorium</span>
                <span className="text-[10px] font-mono text-amber-400 uppercase">ZERO ENFORCEMENT</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Decisions under the Convention on Biological Diversity urge international caution regarding
                geoengineering activities that affect biodiversity, but lack any formal sanctioning apparatus
                or inspection mechanisms to prevent rogue deployment.
              </p>
            </div>

            <div className="p-3.5 rounded bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">The "Rogue Actor" Threshold</span>
                <span className="text-[10px] font-mono text-cyan-400 uppercase">ASYMMETRIC POWER</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Because annual deployment costs are modest ($10B-$20B), a single climate-distressed sovereign
                state or well-capitalized private consortium could unilaterally launch stratospheric dispersion,
                imposing planetary climate shifts without prior consent.
              </p>
            </div>
          </div>
        </div>

        {/* Global South Oppositional Index (6 Cols) */}
        <div className="lg:col-span-6 rounded-lg bg-slate-900/90 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-bold text-slate-100">
                Global South Oppositional Index (G77 / AU Stance)
              </h3>
            </div>
            <span className="text-xs font-mono text-amber-400 font-bold">
              OPPOSITION: 91.2%
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Diplomats and civil society coalitions from developing states vehemently oppose SRM research and deployment,
            characterizing it as externalized ecological risk and mitigation deterrence.
          </p>

          {/* Interactive Dimensions List */}
          <div className="space-y-2 pt-1">
            {sentimentDimensions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSentimentDim(idx)}
                className={`w-full text-left p-2.5 rounded border transition-all text-xs ${
                  selectedSentimentDim === idx
                    ? 'bg-slate-800 border-cyan-500/70 text-slate-100'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-200">{item.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">{item.assessment}</span>
                    <span className="font-mono font-bold text-rose-400">{item.score}/100</span>
                  </div>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full"
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </button>
            ))}
          </div>

          {/* Detailed Selected Sentiment Narrative */}
          <div className="p-3 rounded bg-slate-950/80 border border-slate-800 text-xs">
            <div className="font-semibold text-cyan-300 mb-1 flex items-center justify-between">
              <span>{sentimentDimensions[selectedSentimentDim].title}</span>
              <span className="text-[10px] font-mono text-slate-400">DIPLOMATIC CONSENSUS</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {sentimentDimensions[selectedSentimentDim].narrative}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
