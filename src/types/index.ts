export type TabId = 'overview' | 'atmospheric' | 'hydro' | 'incidents' | 'roadmap';

export interface ThreatZone {
  id: string;
  name: string;
  region: string;
  type: 'hydro' | 'srm' | 'weather_mod' | 'composite';
  riskLevel: 'critical' | 'high' | 'moderate';
  coordinates: { x: number; y: number }; // percentage for map coordinates
  primaryActors: string[];
  downstreamOrAffected: string[];
  summary: string;
  keyMetrics: { label: string; value: string }[];
  treatyStatus: string;
  flashpointProbability: number; // 0 - 100
}

export interface TechnologyComparison {
  id: string;
  name: string;
  category: 'CDR' | 'SRM';
  subTechnique: string;
  primaryMechanism: string;
  speedAndResponse: string;
  economicCost: string;
  transboundaryRisk: string;
  riskRating: 'Extreme' | 'High' | 'Moderate' | 'Low';
  feasibilityPolitics: string;
  terminationShockRisk: boolean;
  governanceStatus: string;
}

export interface DamCascadeNode {
  name: string;
  yearCompleted: number;
  capacityMW: number;
  storageBillionM3: number;
  heightMeters: number;
  status: string;
  impactNote: string;
}

export interface CloudSeedingInitiative {
  id: string;
  country: string;
  programName: string;
  technique: string;
  classification: 'Targeted Success' | 'Operational Failure / Hazard' | 'Contested Transboundary';
  operationalResults: string;
  transboundaryFriction: string;
  annualBudgetOrScale: string;
}

export interface TreatyDraftConfig {
  scope: 'srm_only' | 'comprehensive_atmospheric' | 'full_atmospheric_hydro';
  enforcement: 'binding_moratorium' | 'un_oversight_council' | 'scientific_advisory';
  consentMandate: 'mandatory_fpic' | 'supermajority_un' | 'regional_consensus';
  liabilityMechanism: 'strict_loss_fund' | 'compulsory_insurance' | 'arbitration_tribunal';
  hydroDataStandard: 'open_telemetry' | 'bilateral_verified' | 'un_repository';
}
