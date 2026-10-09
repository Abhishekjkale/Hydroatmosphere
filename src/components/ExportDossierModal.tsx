import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText } from 'lucide-react';

interface ExportDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportDossierModal: React.FC<ExportDossierModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const dossierReport = `================================================================================
EXECUTIVE INTELLIGENCE BRIEF: CLIMATE AND WATER DIPLOMACY
ENGINEERING THE ATMOSPHERE AND DAMMING THE RIVERS
Panel on Climate & Transboundary Risk | Public Policy Strategic Assessment
================================================================================

1. CORE STRATEGIC BASELINES:
- Transboundary River Basins: 263
- Binding Treaties Regulating Solar Radiation Management (SRM): 0
- Global Freshwater Flows in Transboundary Basins: > 60%
- Paris Agreement Warming Threshold: 1.5°C
- Active Atmospheric Intervention Flashpoints Monitored: 12 Regions

2. THE CENTRAL GEOPOLITICAL DILEMMA:
A single nation or private capital entity now possesses the technological and
financial capability ($10B-$20B/year) to alter global solar radiation through
stratospheric aerosol injection (SAI), or manipulate downstream water survival
through upstream mega-dam cascades (e.g., Upper Lancang-Mekong cascade holding
over 47 billion m³). Reactive international consensus leaves a hazardous vacuum.

3. THE GOVERNANCE VACUUM:
- 1976 ENMOD Convention: Strictly governs hostile or military manipulation,
  failing to cover unilateral peaceful, defensive, or mitigation-oriented actions.
- CBD Decision X/33: Non-binding moratorium lacking any enforcement machinery.
- International Water Law: Zero established doctrine or property rights over
  atmospheric water vapor or cloud seeding moisture interception.

4. CASE STUDY FINDINGS:
- Upper Lancang-Mekong: 11+ mega-dams constructed since 1995 grant Beijing unilateral
  control over dry-season pulses. Downstream consequences include 75% sediment
  loss, Tonle Sap reverse-flow delay by 4-6 weeks, and severe saltwater intrusion
  (+45km inland) in Vietnam's Mekong Delta.
- Indus Waters Treaty (IWT): 1960 World Bank treaty facing imminent collapse. India
  requests modifications while Pakistan fears unilateral water throttling affecting
  200M people amid accelerating Karakoram glacial retreat.
- Harvard SCoPEx Termination (2023): Demonstrates that outdoor geoengineering
  conducted without inclusive, democratically legitimized multilateral consent
  will face decisive diplomatic resistance and shutdown.

5. STRATEGIC POLICY RECOMMENDATIONS:
- Multilateral Atmospheric Oversight: UN-backed binding moratorium on outdoor SRM
  pending universal consensus and comprehensive planetary risk evaluation.
- Transboundary Benefit-Sharing: Transition from rigid volumetric zero-sum
  allocations toward joint automated real-time telemetry and flood management.
- Equitable Adaptation Finance: Enforce climate finance commitments ($100B+) to
  ensure climate-vulnerable states do not resort to unilateral geoengineering.

================================================================================
Generated via HydroAtmosphere Strategic Intelligence Platform
================================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(dossierReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([dossierReport], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Climate_Water_Diplomacy_Executive_Dossier_2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 space-y-4 text-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Export Executive Strategic Intelligence Dossier
              </h3>
              <p className="text-xs text-slate-400">
                Full analytical assessment ready for multilateral delegation briefings
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Text Preview Box */}
        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed max-h-[380px] overflow-y-auto whitespace-pre-wrap select-text">
          {dossierReport}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors inline-flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs transition-colors inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File (.TXT)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
