import React, { useState, useMemo } from 'react';
import {
  FileText,
  Copy,
  Download,
  Check,
  Shield,
  Sliders,
  Scale,
  Award,
  Globe2,
  BookOpen,
  Send,
} from 'lucide-react';
import { TreatyDraftConfig } from '../types';

export const StrategicRoadmapTab: React.FC = () => {
  // Treaty Draft Builder configuration state
  const [config, setConfig] = useState<TreatyDraftConfig>({
    scope: 'full_atmospheric_hydro',
    enforcement: 'binding_moratorium',
    consentMandate: 'mandatory_fpic',
    liabilityMechanism: 'strict_loss_fund',
    hydroDataStandard: 'open_telemetry',
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [activeClauseTab, setActiveClauseTab] = useState<'preview' | 'legal_articles'>('preview');

  // Dynamic Treaty Generation Logic
  const generatedTreatyText = useMemo(() => {
    const scopeTitle =
      config.scope === 'full_atmospheric_hydro'
        ? 'COMPREHENSIVE ATMOSPHERIC MODIFICATION AND TRANSBOUNDARY HYDRO-HEGEMONY CONVENTION (CAM-THHC)'
        : config.scope === 'srm_only'
        ? 'INTERNATIONAL CONVENTION ON THE PROHIBITION AND OVERSIGHT OF SOLAR RADIATION MANAGEMENT (ICP-SRM)'
        : 'CONVENTION ON TRANSBOUNDARY RIVER CASCADES AND TROPOSPHERIC VAPOR INTEGRITY (TRC-TVI)';

    const scopePreamble =
      config.scope === 'full_atmospheric_hydro'
        ? 'RECOGNIZING the grave risks posed to planetary stability by uncoordinated stratospheric aerosol injection and the unilateral withholding of transboundary freshwater flows by upstream hydro-hegemons;'
        : config.scope === 'srm_only'
        ? 'CONSCIOUS that unilateral Solar Radiation Management poses severe risks of monsoon disruption, termination shock, and moral hazard;'
        : 'AWARE that upstream dam construction and uncoordinated cloud seeding threaten downstream riparians with artificial droughts and uncompensated flash floods;';

    const enforcementArticle =
      config.enforcement === 'binding_moratorium'
        ? 'ARTICLE 4: BINDING MORATORIUM & SANCTIONS\n1. State Parties agree to an immediate, legally binding moratorium on all outdoor Solar Radiation Management deployments and large-scale atmospheric aerosol dispersals.\n2. Any unilateral deployment shall trigger immediate referral to the United Nations Security Council and multilateral economic sanctions under Chapter VII of the UN Charter.'
        : config.enforcement === 'un_oversight_council'
        ? 'ARTICLE 4: MULTILATERAL OVERSIGHT COUNCIL\n1. There is hereby established the Planetary Atmospheric Governance Council (PAGC) under the auspices of UNEP and WMO.\n2. No environmental modification experiment exceeding 100 kg of dispersed particulate shall proceed without unanimous PAGC certification.'
        : 'ARTICLE 4: SCIENTIFIC ADVISORY PROTOCOL\n1. State Parties establish an Independent Scientific Review Panel to monitor and publish risk assessments regarding atmospheric interventions and hydrological diversions.';

    const consentArticle =
      config.consentMandate === 'mandatory_fpic'
        ? 'ARTICLE 7: MANDATORY FREE, PRIOR, AND INFORMED CONSENT (FPIC)\n1. No state party or private legal entity under its jurisdiction shall conduct atmospheric modification or alter transboundary baseline river flows without the explicit, documented Free, Prior, and Informed Consent of all downstream and downwind sovereign states within a 3,000-kilometer radius.'
        : config.consentMandate === 'supermajority_un'
        ? 'ARTICLE 7: UNITED NATIONS GENERAL ASSEMBLY SUPERMAJORITY MANDATE\n1. Planetary-scale interventions shall require a two-thirds (2/3) supermajority vote of the United Nations General Assembly prior to authorization.'
        : 'ARTICLE 7: REGIONAL RIPARIAN CONSENSUS\n1. Watercourse states and atmospheric corridor littoral states must reach formal consensus via regional commissions prior to commissioning major diversion infrastructure.';

    const liabilityArticle =
      config.liabilityMechanism === 'strict_loss_fund'
        ? 'ARTICLE 11: STRICT TRANSBOUNDARY LIABILITY & COMPENSATION FUND\n1. Deploying states shall be held strictly and jointly liable for any agricultural loss, precipitation anomaly, or flood disaster documented downstream or downwind.\n2. A Global Loss & Damage Geoengineering Reserve Fund of USD $50 Billion shall be capitalized by prospective operators to provide automated, immediate compensation.'
        : config.liabilityMechanism === 'compulsory_insurance'
        ? 'ARTICLE 11: COMPULSORY SOVEREIGN INSURANCE REQUIREMENT\n1. All entities undertaking climate engineering research must maintain comprehensive third-party indemnity insurance underwritten by sovereign guarantees.'
        : 'ARTICLE 11: PERMANENT COURT OF ENVIRONMENTAL ARBITRATION\n1. All transboundary water withholding and moisture interception disputes shall be subject to compulsory and binding arbitration before the International Court of Environmental Justice.';

    const telemetryArticle =
      config.hydroDataStandard === 'open_telemetry'
        ? 'ARTICLE 15: MANDATORY REAL-TIME HYDROLOGICAL TELEMETRY\n1. All upstream dam operators with storage capacity exceeding 500 million m³ must stream unencrypted, real-time discharge, inflow, and sediment data to a public United Nations satellite data repository accessible to all downstream riparians.'
        : config.hydroDataStandard === 'un_repository'
        ? 'ARTICLE 15: CENTRALIZED UN HYDROLOGICAL REPOSITORY\n1. States must deposit monthly seasonal water storage forecasts and flood control schedules with the UN International Hydrological Programme.'
        : 'ARTICLE 15: BILATERAL VERIFIED DATA EXCHANGE\n1. Neighboring riparian states shall conduct annual synchronized telemetry verification audits along transboundary river gauges.';

    return `MODEL DIPLOMATIC CONVENTION DRAFT
TREATY IDENTIFIER: IC-AITHG/2026/REV.4
CLASSIFICATION: UN CODIFICATION TEXT

${scopeTitle}

PREAMBLE
The High Contracting Parties to this Convention,
${scopePreamble}
AFFIRMING that the Earth's atmosphere and shared freshwater basins constitute common planetary concerns of humankind;
DETERMINED to transition international water diplomacy away from zero-sum volumetric hegemony toward anticipatory multilateral benefit-sharing;
HAVE AGREED AS FOLLOWS:

${enforcementArticle}

${consentArticle}

${liabilityArticle}

${telemetryArticle}

ARTICLE 22: ENTRY INTO FORCE & DISPUTE RESOLUTION
This Convention shall enter into force thirty (30) days following the deposit of the fortieth (40th) instrument of ratification. Unresolved disputes regarding atmospheric vapor interception or cascade operation shall be submitted to the International Court of Justice.

IN WITNESS WHEREOF the undersigned Plenipotentiaries have signed this Convention.
DONE AT GENEVA, this 9th day of October, 2026.`;
  }, [config]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTreatyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedTreatyText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Model_Treaty_Draft_${config.scope}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" /> Dimension 5: Anticipatory Governance
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            Strategic Policy & Governance Roadmap: Model Treaty Builder
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Operationalizing the report's actionable diplomatic frameworks into verifiable legal conventions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-slate-200 hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Convention'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .TXT</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: ACTIONABLE RECOMMENDATIONS ENGINE (Direct from Section 8 of Report) */}
      <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            Strategic Recommendations & Global Solutions (Section 8 Brief)
          </h3>
          <span className="text-xs font-mono text-cyan-400">UN ACTIONABLE PILLARS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Pillar 1 */}
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Pillar 1: Atmospheric Oversight</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">Multilateral Moratorium & Review</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Establish a UN-backed governance regime and a global moratorium on outdoor Solar Radiation
              Management deployment pending comprehensive planetary risk assessment and universal consensus.
            </p>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              Closing the 1976 ENMOD loophole for non-military environmental interventions.
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <Scale className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Pillar 2: Transboundary Hydro</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">Benefit-Sharing & Real-Time Data</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Transition transboundary river agreements away from rigid volumetric allocation toward shared
              economic benefits, joint flood and drought management, and mandatory real-time data integration.
            </p>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              Replacing zero-sum water sovereignty with open digital telemetry grids.
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400">
              <Globe2 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Pillar 3: Equitable Finance</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">Adaptation & Loss Redress</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enforce climate finance commitments from major historical emitters to bolster regional water
              resilience, ensuring climate-distressed states do not resort to high-risk unilateral geoengineering.
            </p>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              Removing financial incentives for cheap high-risk "quick fixes".
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: INTERACTIVE MODEL TREATY BUILDER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Configuration Controls (5 Cols) */}
        <div className="lg:col-span-5 rounded-lg bg-slate-900/90 border border-slate-800 p-5 space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Treaty Drafting Parameters
            </h3>
            <span className="text-xs font-mono text-slate-400">CONFIGURE CLAUSES</span>
          </div>

          {/* Scope Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 block">Convention Scope</label>
            <select
              value={config.scope}
              onChange={(e) => setConfig({ ...config, scope: e.target.value as any })}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="full_atmospheric_hydro">
                Full Spectrum: Atmospheric SRM & Transboundary Hydro-Cascades
              </option>
              <option value="srm_only">Targeted: Outdoor Solar Radiation Management Only</option>
              <option value="comprehensive_atmospheric">
                Transboundary Hydrology & Cloud Seeding Focus
              </option>
            </select>
          </div>

          {/* Enforcement Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 block">Enforcement Regime</label>
            <select
              value={config.enforcement}
              onChange={(e) => setConfig({ ...config, enforcement: e.target.value as any })}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="binding_moratorium">
                Binding UN Moratorium with Chapter VII UNSC Sanctions
              </option>
              <option value="un_oversight_council">
                Planetary Atmospheric Governance Council (UNEP / WMO Permit System)
              </option>
              <option value="scientific_advisory">
                Voluntary Scientific Advisory Panel & Transparency Register
              </option>
            </select>
          </div>

          {/* Sovereign Consent Mandate */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 block">Sovereign Consent Mandate</label>
            <select
              value={config.consentMandate}
              onChange={(e) => setConfig({ ...config, consentMandate: e.target.value as any })}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="mandatory_fpic">
                Mandatory Free Prior Informed Consent (FPIC) of All Downstream/Downwind States
              </option>
              <option value="supermajority_un">
                UN General Assembly Two-Thirds (2/3) Supermajority Authorization
              </option>
              <option value="regional_consensus">
                Regional Riparian & Meteorological Basin Consensus
              </option>
            </select>
          </div>

          {/* Liability Mechanism */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 block">Liability & Redress Protocol</label>
            <select
              value={config.liabilityMechanism}
              onChange={(e) => setConfig({ ...config, liabilityMechanism: e.target.value as any })}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="strict_loss_fund">
                Strict Transboundary Liability + $50B Geoengineering Loss Reserve Fund
              </option>
              <option value="compulsory_insurance">
                Compulsory Sovereign Third-Party Insurance Requirement
              </option>
              <option value="arbitration_tribunal">
                Permanent Court of Environmental Arbitration
              </option>
            </select>
          </div>

          {/* Hydro Data Standard */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 block">Hydrological Telemetry Standard</label>
            <select
              value={config.hydroDataStandard}
              onChange={(e) => setConfig({ ...config, hydroDataStandard: e.target.value as any })}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="open_telemetry">
                Mandatory Open-Source Real-Time Dam Inflow/Discharge Telemetry
              </option>
              <option value="un_repository">
                Centralized UN Hydrological Repository (Monthly Resolution)
              </option>
              <option value="bilateral_verified">
                Bilateral Synchronized Audit Protocols
              </option>
            </select>
          </div>

          {/* Diplomatic Viability Meter */}
          <div className="p-3.5 rounded bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200">Multilateral Adoption Probability</span>
              <span className="font-mono font-bold text-cyan-400">
                {config.enforcement === 'binding_moratorium' ? '78% (G77 / EU Backed)' : '62% (Moderate Consensus)'}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                style={{ width: config.enforcement === 'binding_moratorium' ? '78%' : '62%' }}
              ></div>
            </div>
            <div className="text-[11px] text-slate-400">
              High support among G77 developing nations and downstream riparians; potential resistance from
              unilateral tech developers.
            </div>
          </div>
        </div>

        {/* Live Treaty Document Viewport (7 Cols) */}
        <div className="lg:col-span-7 rounded-lg bg-slate-900/90 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-100">
                Model Convention Document Viewport
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors inline-flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="text-xs px-2.5 py-1 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold transition-colors inline-flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Formatted Legal Document Box */}
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed max-h-[500px] overflow-y-auto whitespace-pre-wrap select-text">
            {generatedTreatyText}
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
            <span>READY FOR MULTILATERAL DEPOSIT AT UN LEGAL AFFAIRS (OLA)</span>
            <span className="font-mono text-cyan-400">IC-AITHG CODIFICATION DRAFT</span>
          </div>
        </div>
      </div>
    </div>
  );
};
