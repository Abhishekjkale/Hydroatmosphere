import React from 'react';
import { X, ShieldAlert, Download, Copy, Check, ExternalLink } from 'lucide-react';
import { ThreatZone, TabId } from '../types';

interface DetailModalProps {
  zone: ThreatZone | null;
  onClose: () => void;
  onNavigateTab: (tab: TabId) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  zone,
  onClose,
  onNavigateTab,
}) => {
  if (!zone) return null;

  const handleGoToDeepDive = () => {
    if (zone.type === 'hydro') {
      onNavigateTab('hydro');
    } else if (zone.type === 'srm') {
      onNavigateTab('atmospheric');
    } else if (zone.type === 'weather_mod') {
      onNavigateTab('incidents');
    } else {
      onNavigateTab('hydro');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 space-y-5 text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  zone.riskLevel === 'critical'
                    ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                    : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                }`}
              >
                {zone.riskLevel} Risk
              </span>
              <span className="text-xs text-slate-400 font-mono uppercase">{zone.type} Corridor</span>
            </div>
            <h3 className="text-lg font-bold text-slate-100">{zone.name}</h3>
            <p className="text-xs text-slate-400">{zone.region}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 text-xs">
          {/* Flashpoint Barometer */}
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200">Flashpoint Probability Barometer</span>
              <span className="font-mono font-bold text-rose-400 text-sm">
                {zone.flashpointProbability}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-rose-500 h-full rounded-full"
                style={{ width: `${zone.flashpointProbability}%` }}
              ></div>
            </div>
          </div>

          {/* Assessment Summary */}
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Strategic Assessment Brief
            </span>
            <p className="text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800">
              {zone.summary}
            </p>
          </div>

          {/* Actors & Affected */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Primary Actors / Upper Riparian
              </span>
              <p className="text-slate-200 font-medium">{zone.primaryActors.join(', ')}</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Affected States / Downstream
              </span>
              <p className="text-slate-200 font-medium">{zone.downstreamOrAffected.join(', ')}</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              Key Monitoring Metrics
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {zone.keyMetrics.map((metric, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                  <div className="text-[10px] text-slate-400 truncate">{metric.label}</div>
                  <div className="font-mono font-bold text-cyan-300 text-sm mt-0.5">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Framework */}
          <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Treaty Framework & Regulatory Vacuum
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">{zone.treatyStatus}</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
          >
            Close Dossier
          </button>

          <button
            onClick={handleGoToDeepDive}
            className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs transition-colors inline-flex items-center gap-1.5"
          >
            <span>Jump to Deep Dive View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
