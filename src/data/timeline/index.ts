/**
 * Timeline Data Export for Module 1: Prompt Injection Attacks
 *
 * This module provides structured timeline data extracted from comprehensive research
 * on the evolution of LLM vulnerabilities and prompt injection attacks (2020-2025).
 *
 * Data sources:
 * - DEEP_RESEARCH_Prompt_Injection_Timeline.md
 * - DEEP_THINK_Timeline_Narrative.txt
 *
 * @module timeline
 */

import timelineData from './prompt-injection-timeline.json';
import type { PromptInjectionTimeline } from './types';

// Cast the imported JSON to the proper type
export const promptInjectionTimeline: PromptInjectionTimeline = timelineData as PromptInjectionTimeline;

// Export individual sections for convenient access
export const { metadata, eras, events, attack_techniques, vulnerability_categories, key_insights } = promptInjectionTimeline;

// Export the introductory narrative for the Interactive Timeline section
export const TIMELINE_INTRODUCTION_NARRATIVE = `
# **The Adversarial Singularity: Five Years of the AI Security Arms Race**

In November 2022, OpenAI released ChatGPT to the public. Within forty-eight hours, the first jailbreak appeared. A user calling themselves "DAN"—short for "Do Anything Now"—had discovered that a simple prompt could strip away the model's safety constraints, transforming a helpful assistant into an unfiltered oracle willing to generate anything: hate speech, illegal instructions, malware blueprints. The technique spread across Reddit and Discord like wildfire. OpenAI patched it within days. DAN returned in a new form within hours.

This was not a software bug. It was the opening salvo in a conflict that would define the next five years of artificial intelligence security—a Red Queen's Race where every defensive measure would be met with an equally sophisticated countermeasure, where the very architecture of Large Language Models would prove to be both their greatest strength and their fundamental vulnerability.

The problem is deceptively simple: **transformer models cannot reliably distinguish instructions from data**. When an LLM processes text, it treats your question, the system prompt defining its behavior, and external content scraped from the web as a single, undifferentiated stream of tokens. This architectural debt—inherited from models designed for language understanding, not adversarial robustness—would become the attack surface for an escalating campaign of exploitation.
`;

// Export types
export * from './types';

// Helper functions for filtering and querying timeline data

/**
 * Get all events for a specific era
 */
export function getEventsByEra(eraId: string) {
  return events.filter(event => event.era === eraId);
}

/**
 * Get all events of a specific category
 */
export function getEventsByCategory(category: string) {
  return events.filter(event => event.category === category);
}

/**
 * Get all events within a date range
 */
export function getEventsByDateRange(startDate: string, endDate: string) {
  return events.filter(event => event.date >= startDate && event.date <= endDate);
}

/**
 * Get all events with a specific impact level
 */
export function getEventsByImpact(impact: string) {
  return events.filter(event => event.impact === impact);
}

/**
 * Get all events tagged with a specific keyword
 */
export function getEventsByTag(tag: string) {
  return events.filter(event => event.tags.includes(tag));
}

/**
 * Get attack technique by ID
 */
export function getAttackTechnique(techniqueId: string) {
  return attack_techniques.find(technique => technique.id === techniqueId);
}

/**
 * Get all attack techniques by category
 */
export function getAttackTechniquesByCategory(category: string) {
  return attack_techniques.filter(technique => technique.category === category);
}

/**
 * Get all attack techniques by effectiveness level
 */
export function getAttackTechniquesByEffectiveness(effectiveness: string) {
  return attack_techniques.filter(technique => technique.effectiveness === effectiveness);
}

/**
 * Get era by ID
 */
export function getEra(eraId: string) {
  return eras.find(era => era.id === eraId);
}

/**
 * Get vulnerability category by ID
 */
export function getVulnerabilityCategory(vulnId: string) {
  return vulnerability_categories.find(vuln => vuln.id === vulnId);
}

/**
 * Get all patchable vulnerabilities
 */
export function getPatchableVulnerabilities() {
  return vulnerability_categories.filter(vuln => vuln.is_patchable);
}

/**
 * Get all unpatchable (architectural) vulnerabilities
 */
export function getArchitecturalVulnerabilities() {
  return vulnerability_categories.filter(vuln => !vuln.is_patchable);
}

/**
 * Search events by keyword in title or description
 */
export function searchEvents(keyword: string) {
  const lowerKeyword = keyword.toLowerCase();
  return events.filter(event =>
    event.title.toLowerCase().includes(lowerKeyword) ||
    event.description.toLowerCase().includes(lowerKeyword)
  );
}

/**
 * Get event statistics
 */
export function getStatistics() {
  return {
    totalEvents: events.length,
    totalEras: eras.length,
    totalAttackTechniques: attack_techniques.length,
    totalVulnerabilities: vulnerability_categories.length,
    eventsByImpact: {
      foundational: events.filter(e => e.impact === 'foundational').length,
      critical: events.filter(e => e.impact === 'critical').length,
      high: events.filter(e => e.impact === 'high').length,
      medium: events.filter(e => e.impact === 'medium').length,
      low: events.filter(e => e.impact === 'low').length,
    },
    eventsByCategory: events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };
}
