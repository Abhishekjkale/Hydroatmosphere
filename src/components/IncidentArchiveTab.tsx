import React, { useState } from 'react';
import {
  Archive,
  CloudLightning,
  AlertTriangle,
  ChevronRight,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Scale,
  Sparkles,
  Search,
} from 'lucide-react';
import { SCOPEX_TIMELINE_STEPS, CLOUD_SEEDING_INITIATIVES } from '../data/intelligenceData';
import { CloudSeedingInitiative } from '../types';

export const IncidentArchiveTab: React.FC = () => {
  // SCoPEx stepper state
  const [activeStep, setActiveStep] = useState<number>(1);

  // Cloud seeding filter
  const [seedingFilter, setSeedingFilter] = useState<'ALL' | 'Targeted Success' | 'Operational Failure / Hazard' | 'Contested Transboundary'>('ALL');
  const [selectedSeeding, setSelectedSeeding] = useState<CloudSeedingInitiative | null>(CLOUD_SEEDING_INITIATIVES[2]); // UAE by default

  const filteredSeeding = CLOUD_SEEDING_INITIATIVES.filter((item) => {
    if (seedingFilter === 'ALL') return true;
    return item.classification === seedingFilter;
  });

  const currentStepData = SCOPEX_TIMELINE_STEPS.find((s) => s.step === activeStep) || SCOPEX_TIMELINE_STEPS[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono uppercase tracking-wider mb-1">
            <Archive className="w-4 h-4" /> Dimension 4: Historical & Operational Incidents
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            Incident & Case Study Archive: Precedents & Legal Flashpoints
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Documenting the Harvard SCoPEx cancellation trajectory and modern tropospheric cloud seeding friction
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded">
          <span>CASE STUDIES: 2 STRATEGIC CORRIDORS</span>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE SCOPEX CASE STUDY ANALYSIS (Harvard/Sweden/Kenya 2023) */}
      <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              SCoPEx Case Study: The Defeat of Unilateral Atmospheric Testing (2021–2023)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Step through the historic trajectory from Cambridge laboratory conception to public termination
            </p>
          </div>
          <span className="text-xs font-mono text-rose-400 px-2.5 py-1 rounded bg-rose-950/60 border border-rose-800/40">
            PRECEDENT: CLIMATE COLONIALISM BACKLASH
          </span>
        </div>

        {/* Visual Asset + Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-950/60 p-5 rounded-lg border border-slate-800">
          <div className="lg:col-span-5 relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-800">
            <img
              src="/src/assets/images/scopex_balloon_sensor_1791536259348.jpg"
              alt="Harvard SCoPEx Stratospheric Balloon Payload Visualization"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-sm p-2 rounded text-[11px] text-slate-300 border border-slate-800 font-mono">
              Fig 4.1: High-Altitude Balloon Gondola for Aerosol Perturbation (20km altitude)
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h4 className="text-sm font-bold text-slate-100 text-cyan-400 uppercase tracking-wide">
              The Political & Ethical Anatomy of an Outdoor Test Shutdown
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              The cancellation of Harvard University’s Stratospheric Controlled Perturbation Experiment
              (SCoPEx) stands as a landmark historical indicator of political and ethical resistance
              surrounding outdoor geoengineering testing. Originally designed to evaluate the physical
              behavior of aerosol plumes in the stratosphere using high-altitude balloons, the project sought
              field testing in Sweden in 2021 before exploring Kenya in 2023.
            </p>
            <div className="p-3 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="font-semibold text-slate-100 block mb-1">Key Diplomatic Takeaway:</span>
              "Technological research operating outside transparent, inclusive, and democratically sanctioned
              global governance frameworks will be met with decisive diplomatic resistance and public shutdown."
            </div>
          </div>
        </div>

        {/* Interactive Step-by-Step Timeline Navigation */}
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {SCOPEX_TIMELINE_STEPS.map((s) => {
              const isCurrent = activeStep === s.step;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(s.step)}
                  className={`p-3 rounded-lg text-left transition-all border text-xs ${
                    isCurrent
                      ? 'bg-slate-800 border-cyan-400 text-slate-100 ring-1 ring-cyan-400/40'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-300'
                  }`}
                >
                  <div className="font-mono text-[10px] text-cyan-400">STEP {s.step} · {s.year}</div>
                  <div className="font-bold text-slate-200 mt-1 truncate">{s.title}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Active Step Inspector Card */}
          <div className="p-5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono text-xs flex items-center justify-center font-bold">
                  {currentStepData.step}
                </span>
                <span className="text-sm font-bold text-slate-100">{currentStepData.title}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {currentStepData.location}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300">
                  {currentStepData.status}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentStepData.description}
            </p>

            <div className="p-3 rounded bg-slate-900/80 border border-slate-800 text-xs">
              <span className="font-semibold text-slate-300 text-[11px] uppercase tracking-wider block mb-1">
                Strategic Implications & Opposition Argument:
              </span>
              <p className="text-slate-400 italic leading-relaxed text-[11px]">
                "{currentStepData.significance}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: CLOUD SEEDING & TROPOSPHERIC WEATHER MODIFICATION TRACKER */}
      <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <CloudLightning className="w-4 h-4 text-cyan-400" />
              Tropospheric Weather Modification: Success, Failure & Transboundary Conflict
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparing snowpack augmentation successes against urban cloudburst disasters and "rain theft" disputes
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center p-1 bg-slate-950 rounded border border-slate-800 text-xs shrink-0">
            <button
              onClick={() => setSeedingFilter('ALL')}
              className={`px-2.5 py-1 rounded transition-colors ${
                seedingFilter === 'ALL'
                  ? 'bg-slate-800 text-cyan-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Programs
            </button>
            <button
              onClick={() => setSeedingFilter('Targeted Success')}
              className={`px-2.5 py-1 rounded transition-colors ${
                seedingFilter === 'Targeted Success'
                  ? 'bg-slate-800 text-emerald-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Targeted Success
            </button>
            <button
              onClick={() => setSeedingFilter('Operational Failure / Hazard')}
              className={`px-2.5 py-1 rounded transition-colors ${
                seedingFilter === 'Operational Failure / Hazard'
                  ? 'bg-slate-800 text-rose-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Operational Failure
            </button>
            <button
              onClick={() => setSeedingFilter('Contested Transboundary')}
              className={`px-2.5 py-1 rounded transition-colors ${
                seedingFilter === 'Contested Transboundary'
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Contested Borders
            </button>
          </div>
        </div>

        {/* Grid of Initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSeeding.map((item) => {
            const isSelected = selectedSeeding?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedSeeding(item)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-400 ring-1 ring-cyan-400/30'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-cyan-400">{item.country}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      item.classification === 'Targeted Success'
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                        : item.classification === 'Operational Failure / Hazard'
                        ? 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
                        : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                    }`}
                  >
                    {item.classification}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-100">{item.programName}</h4>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">{item.technique}</div>

                <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="text-slate-400">Budget / Scale: <span className="text-slate-200 font-mono">{item.annualBudgetOrScale}</span></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Initiative Inspector */}
        {selectedSeeding && (
          <div className="p-5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <span className="text-sm font-bold text-slate-100">
                Detailed Evaluation: {selectedSeeding.programName}
              </span>
              <span className="text-xs font-mono text-slate-400">{selectedSeeding.country}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px]">
                  Hydrological Results & Operational Efficacy
                </span>
                <p className="text-slate-300 leading-relaxed p-3 rounded bg-slate-900 border border-slate-800">
                  {selectedSeeding.operationalResults}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-rose-400 uppercase tracking-wider text-[10px]">
                  Transboundary Friction & Neighboring Allegations
                </span>
                <p className="text-slate-300 leading-relaxed p-3 rounded bg-slate-900 border border-slate-800">
                  {selectedSeeding.transboundaryFriction}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: LEGAL CONFLICT ANALYZER - "RAIN THEFT" & ATMOSPHERIC VAPOR VACUUM */}
        <div className="p-5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-slate-100">
              Legal Conflict Analyzer: The "Rain Theft" Dilemma in International Water Law
            </h4>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            At the international level, weather modification is increasingly becoming a flashpoint for interstate
            friction. Neighboring states frequently exchange allegations of "rain theft" or atmospheric moisture
            interception.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="p-3 rounded bg-slate-900 border border-slate-800">
              <span className="font-bold text-slate-200 block mb-1">0 Property Rights Over Vapor</span>
              <span className="text-slate-400 text-[11px] leading-relaxed">
                Neither the 1997 UN Watercourses Convention nor customary international law establishes sovereign
                ownership over atmospheric moisture plumes prior to precipitation.
              </span>
            </div>

            <div className="p-3 rounded bg-slate-900 border border-slate-800">
              <span className="font-bold text-slate-200 block mb-1">The "Harm Principle" Burden</span>
              <span className="text-slate-400 text-[11px] leading-relaxed">
                Demonstrating "significant transboundary harm" under customary law is virtually impossible due to
                the chaotic non-linear dynamics of weather fronts and natural precipitation variance.
              </span>
            </div>

            <div className="p-3 rounded bg-slate-900 border border-slate-800">
              <span className="font-bold text-slate-200 block mb-1">Unilateral Upwind Depletion</span>
              <span className="text-slate-400 text-[11px] leading-relaxed">
                As megaprojects like China’s "Sky River" expand, downstream nations risk systematic atmospheric
                drying without a formal arbitral tribunal to lodge diplomatic claims.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
