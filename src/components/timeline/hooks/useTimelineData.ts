/**
 * useTimelineData Hook
 * Loads and memoizes timeline data from the data layer
 */

import { useMemo } from 'react';
import {
  promptInjectionTimeline,
  events,
  eras,
  attack_techniques,
  vulnerability_categories,
  key_insights,
  getStatistics,
  type TimelineEvent,
  type Era,
  type AttackTechnique,
  type VulnerabilityCategory,
  type KeyInsight
} from '@/data/timeline';
import type { TimelineStatistics } from '../types/timeline-ui';

interface TimelineData {
  events: TimelineEvent[];
  eras: Era[];
  techniques: AttackTechnique[];
  vulnerabilities: VulnerabilityCategory[];
  insights: KeyInsight[];
  statistics: TimelineStatistics;
  metadata: typeof promptInjectionTimeline.metadata;
}

/**
 * Hook to load and provide memoized timeline data
 * Returns all timeline data with derived statistics
 */
export function useTimelineData(): TimelineData {
  // Memoize events array
  const memoizedEvents = useMemo(() => events, []);

  // Memoize eras array
  const memoizedEras = useMemo(() => eras, []);

  // Memoize techniques
  const memoizedTechniques = useMemo(() => attack_techniques, []);

  // Memoize vulnerabilities
  const memoizedVulnerabilities = useMemo(() => vulnerability_categories, []);

  // Memoize insights
  const memoizedInsights = useMemo(() => key_insights, []);

  // Calculate statistics (memoized)
  const statistics = useMemo(() => getStatistics(), []);

  // Return all data
  return {
    events: memoizedEvents,
    eras: memoizedEras,
    techniques: memoizedTechniques,
    vulnerabilities: memoizedVulnerabilities,
    insights: memoizedInsights,
    statistics,
    metadata: promptInjectionTimeline.metadata
  };
}
