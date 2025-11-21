/**
 * useTimelineSelection Hook
 * Manages selected events, eras, and techniques
 */

import { useState, useCallback } from 'react';
import type { TimelineSelection } from '../types/timeline-ui';

interface UseTimelineSelectionReturn extends TimelineSelection {
  selectEvent: (eventId: string | null) => void;
  selectEra: (eraId: string | null) => void;
  selectTechnique: (techniqueId: string | null) => void;
  highlightEvents: (eventIds: string[]) => void;
  clearHighlights: () => void;
  clearSelection: () => void;
}

/**
 * Hook for managing timeline selections and highlights
 */
export function useTimelineSelection(): UseTimelineSelectionReturn {
  const [selection, setSelection] = useState<TimelineSelection>({
    selectedEventId: null,
    selectedEraId: null,
    selectedTechniqueId: null,
    highlightedEventIds: new Set()
  });

  const selectEvent = useCallback((eventId: string | null) => {
    setSelection(prev => ({
      ...prev,
      selectedEventId: eventId
    }));
  }, []);

  const selectEra = useCallback((eraId: string | null) => {
    setSelection(prev => ({
      ...prev,
      selectedEraId: eraId
    }));
  }, []);

  const selectTechnique = useCallback((techniqueId: string | null) => {
    setSelection(prev => ({
      ...prev,
      selectedTechniqueId: techniqueId
    }));
  }, []);

  const highlightEvents = useCallback((eventIds: string[]) => {
    setSelection(prev => ({
      ...prev,
      highlightedEventIds: new Set(eventIds)
    }));
  }, []);

  const clearHighlights = useCallback(() => {
    setSelection(prev => ({
      ...prev,
      highlightedEventIds: new Set()
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setSelection({
      selectedEventId: null,
      selectedEraId: null,
      selectedTechniqueId: null,
      highlightedEventIds: new Set()
    });
  }, []);

  return {
    ...selection,
    selectEvent,
    selectEra,
    selectTechnique,
    highlightEvents,
    clearHighlights,
    clearSelection
  };
}
