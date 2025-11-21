/**
 * useTimelineMode Hook
 * Manages timeline view mode state
 */

import { useState, useCallback } from 'react';
import type { ViewMode, ViewModeState } from '../types/timeline-ui';

interface UseTimelineModeReturn extends ViewModeState {
  switchMode: (newMode: ViewMode) => void;
  isMode: (mode: ViewMode) => boolean;
}

/**
 * Hook for managing timeline view mode
 */
export function useTimelineMode(initialMode: ViewMode = 'timeline'): UseTimelineModeReturn {
  const [mode, setMode] = useState<ViewModeState>({
    current: initialMode,
    previous: initialMode,
    shouldAnimate: false
  });

  const switchMode = useCallback((newMode: ViewMode) => {
    setMode(prev => ({
      current: newMode,
      previous: prev.current,
      shouldAnimate: prev.current !== newMode
    }));
  }, []);

  const isMode = useCallback((checkMode: ViewMode) => {
    return mode.current === checkMode;
  }, [mode.current]);

  return {
    ...mode,
    switchMode,
    isMode
  };
}
