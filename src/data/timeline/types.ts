/**
 * Type definitions for the Prompt Injection Timeline data structure
 * Module 1: Prompt Injection Attacks
 */

export interface TimelineMetadata {
  module_id: number;
  module_name: string;
  timeline_version: string;
  last_updated: string;
  description: string;
  source_documents: string[];
}

export interface Era {
  id: string;
  name: string;
  period: string;
  description: string;
  color: string;
}

export type EventCategory =
  | 'Model Release'
  | 'Alignment'
  | 'Research'
  | 'Jailbreak'
  | 'Prompt Injection'
  | 'Behavioral Anomaly'
  | 'Data Privacy'
  | 'Vulnerability'
  | 'Red Teaming'
  | 'Commercial Liability'
  | 'Jailbreak Technique'
  | 'Malware'
  | 'Supply Chain'
  | 'Analysis';

export type ImpactLevel = 'foundational' | 'critical' | 'high' | 'medium' | 'low';

export interface TimelineEvent {
  id: string;
  date: string;
  era: string;
  title: string;
  category: EventCategory;
  description: string;
  impact: ImpactLevel;
  tags: string[];
  source_url: string;
}

export type AttackCategory =
  | 'Social Engineering'
  | 'Semantic Manipulation'
  | 'Context Window Exploitation'
  | 'Data Poisoning'
  | 'Automated Optimization'
  | 'Abstraction'
  | 'In-Context Learning Exploitation'
  | 'Multi-Turn Exploitation'
  | 'Autonomous Malware';

export type EffectivenessLevel = 'critical' | 'high' | 'medium' | 'low';
export type MitigationDifficulty = 'very-high' | 'high' | 'medium' | 'low';

export interface AttackTechnique {
  id: string;
  name: string;
  category: AttackCategory;
  description: string;
  first_seen: string;
  effectiveness: EffectivenessLevel;
  mitigation_difficulty: MitigationDifficulty;
  related_events: string[];
}

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';

export interface VulnerabilityCategory {
  id: string;
  name: string;
  description: string;
  severity: SeverityLevel;
  is_patchable: boolean;
}

export interface KeyInsight {
  insight: string;
  evidence: string;
}

export interface PromptInjectionTimeline {
  metadata: TimelineMetadata;
  eras: Era[];
  events: TimelineEvent[];
  attack_techniques: AttackTechnique[];
  vulnerability_categories: VulnerabilityCategory[];
  key_insights: KeyInsight[];
}
