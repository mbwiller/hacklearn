/**
 * Timeline UI Component Types
 * Additional UI-specific types for the Interactive Timeline component
 */

import type { Era, ImpactLevel, EventCategory } from '@/data/timeline/types';

// Re-export types for external use
export type { Era, TimelineEvent, AttackTechnique } from '@/data/timeline/types';

export type ViewMode = 'timeline' | 'era-focus' | 'techniques' | 'statistics';

export interface ViewModeState {
  current: ViewMode;
  previous: ViewMode;
  shouldAnimate: boolean;
}

export interface TimelineFilters {
  eras: Set<string>;
  impactLevels: Set<ImpactLevel>;
  categories: Set<EventCategory>;
  searchQuery: string;
  dateRange: [string, string] | null;
  selectedTechniques: Set<string>;
}

export type FilterAction =
  | { type: 'SET_ERAS'; payload: Set<string> }
  | { type: 'TOGGLE_ERA'; payload: string }
  | { type: 'SET_IMPACT'; payload: Set<ImpactLevel> }
  | { type: 'TOGGLE_IMPACT'; payload: ImpactLevel }
  | { type: 'SET_CATEGORIES'; payload: Set<EventCategory> }
  | { type: 'TOGGLE_CATEGORY'; payload: EventCategory }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_DATE_RANGE'; payload: [string, string] | null }
  | { type: 'TOGGLE_TECHNIQUE'; payload: string }
  | { type: 'RESET_ALL' }
  | { type: 'APPLY_PRESET'; payload: FilterPresetType };

export type FilterPresetType = 'all' | 'critical' | 'recent' | 'jailbreaks' | 'research';

export interface TimelineSelection {
  selectedEventId: string | null;
  selectedEraId: string | null;
  selectedTechniqueId: string | null;
  highlightedEventIds: Set<string>;
}

export interface EventCardVariant {
  variant?: 'compact' | 'detailed' | 'grid';
  isSelected?: boolean;
  showTechniques?: boolean;
  showDescription?: boolean;
  className?: string;
}

export interface ImpactBadgeProps {
  level: ImpactLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export interface EraBadgeProps {
  era: Era;
  size?: 'sm' | 'md' | 'lg';
  showPeriod?: boolean;
  className?: string;
}

export interface CategoryTagProps {
  category: EventCategory;
  size?: 'sm' | 'md';
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface TimelineStatistics {
  totalEvents: number;
  totalEras: number;
  totalAttackTechniques: number;
  totalVulnerabilities: number;
  eventsByImpact: Record<ImpactLevel, number>;
  eventsByCategory: Record<string, number>;
  eventsByEra: Record<string, number>;
}

export interface FilterPreset {
  id: FilterPresetType;
  label: string;
  icon: string;
  description: string;
  filters: Partial<TimelineFilters>;
}
