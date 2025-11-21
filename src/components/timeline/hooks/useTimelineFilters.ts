/**
 * useTimelineFilters Hook
 * Manages timeline filter state and filtering logic
 */

import { useReducer, useMemo, useCallback } from 'react';
import { searchEvents, type TimelineEvent } from '@/data/timeline';
import type { TimelineFilters, FilterAction, FilterPresetType } from '../types/timeline-ui';

const initialFilters: TimelineFilters = {
  eras: new Set(),
  impactLevels: new Set(),
  categories: new Set(),
  searchQuery: '',
  dateRange: null,
  selectedTechniques: new Set()
};

/**
 * Filter preset configurations
 */
const filterPresets: Record<FilterPresetType, Partial<TimelineFilters>> = {
  all: initialFilters,
  critical: {
    impactLevels: new Set(['critical', 'foundational'])
  },
  recent: {
    dateRange: ['2024-01', '2025-12'] as [string, string]
  },
  jailbreaks: {
    categories: new Set(['Jailbreak'])
  },
  research: {
    categories: new Set(['Research'])
  }
};

/**
 * Reducer for filter state management
 */
function filterReducer(state: TimelineFilters, action: FilterAction): TimelineFilters {
  switch (action.type) {
    case 'SET_ERAS':
      return { ...state, eras: action.payload };

    case 'TOGGLE_ERA': {
      const newEras = new Set(state.eras);
      if (newEras.has(action.payload)) {
        newEras.delete(action.payload);
      } else {
        newEras.add(action.payload);
      }
      return { ...state, eras: newEras };
    }

    case 'SET_IMPACT':
      return { ...state, impactLevels: action.payload };

    case 'TOGGLE_IMPACT': {
      const newImpact = new Set(state.impactLevels);
      if (newImpact.has(action.payload)) {
        newImpact.delete(action.payload);
      } else {
        newImpact.add(action.payload);
      }
      return { ...state, impactLevels: newImpact };
    }

    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };

    case 'TOGGLE_CATEGORY': {
      const newCategories = new Set(state.categories);
      if (newCategories.has(action.payload)) {
        newCategories.delete(action.payload);
      } else {
        newCategories.add(action.payload);
      }
      return { ...state, categories: newCategories };
    }

    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };

    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload };

    case 'TOGGLE_TECHNIQUE': {
      const newTechniques = new Set(state.selectedTechniques);
      if (newTechniques.has(action.payload)) {
        newTechniques.delete(action.payload);
      } else {
        newTechniques.add(action.payload);
      }
      return { ...state, selectedTechniques: newTechniques };
    }

    case 'RESET_ALL':
      return initialFilters;

    case 'APPLY_PRESET': {
      const preset = filterPresets[action.payload];
      return { ...initialFilters, ...preset };
    }

    default:
      return state;
  }
}

/**
 * Apply filters to events array
 */
function applyFilters(events: TimelineEvent[], filters: TimelineFilters): TimelineEvent[] {
  let filtered = events;

  // Filter by era
  if (filters.eras.size > 0) {
    filtered = filtered.filter(event => filters.eras.has(event.era));
  }

  // Filter by impact level
  if (filters.impactLevels.size > 0) {
    filtered = filtered.filter(event => filters.impactLevels.has(event.impact));
  }

  // Filter by category
  if (filters.categories.size > 0) {
    filtered = filtered.filter(event => filters.categories.has(event.category));
  }

  // Filter by search query
  if (filters.searchQuery.trim() !== '') {
    const searchResults = searchEvents(filters.searchQuery);
    const searchIds = new Set(searchResults.map(e => e.id));
    filtered = filtered.filter(event => searchIds.has(event.id));
  }

  // Filter by date range
  if (filters.dateRange) {
    const [start, end] = filters.dateRange;
    filtered = filtered.filter(event => event.date >= start && event.date <= end);
  }

  // Filter by selected techniques
  if (filters.selectedTechniques.size > 0) {
    filtered = filtered.filter(event => {
      // Check if event has any of the selected techniques
      return event.tags?.some(tag => filters.selectedTechniques.has(tag));
    });
  }

  return filtered;
}

interface UseTimelineFiltersReturn {
  filters: TimelineFilters;
  filteredEvents: TimelineEvent[];
  dispatch: React.Dispatch<FilterAction>;
  applyPreset: (preset: FilterPresetType) => void;
  resetFilters: () => void;
  isFiltered: boolean;
}

/**
 * Hook for timeline filtering functionality
 */
export function useTimelineFilters(
  allEvents: TimelineEvent[],
  initialState?: Partial<TimelineFilters>
): UseTimelineFiltersReturn {
  const [filters, dispatch] = useReducer(
    filterReducer,
    { ...initialFilters, ...initialState }
  );

  // Memoize filtered events
  const filteredEvents = useMemo(
    () => applyFilters(allEvents, filters),
    [allEvents, filters]
  );

  // Apply preset callback
  const applyPreset = useCallback((preset: FilterPresetType) => {
    dispatch({ type: 'APPLY_PRESET', payload: preset });
  }, []);

  // Reset filters callback
  const resetFilters = useCallback(() => {
    dispatch({ type: 'RESET_ALL' });
  }, []);

  // Check if any filters are active
  const isFiltered = useMemo(() => {
    return (
      filters.eras.size > 0 ||
      filters.impactLevels.size > 0 ||
      filters.categories.size > 0 ||
      filters.searchQuery !== '' ||
      filters.dateRange !== null ||
      filters.selectedTechniques.size > 0
    );
  }, [filters]);

  return {
    filters,
    filteredEvents,
    dispatch,
    applyPreset,
    resetFilters,
    isFiltered
  };
}
