import { useEffect, useRef } from 'react';
import type { ContextWindowState } from '@/types/context-visualizer';

/**
 * Monitors context state for anomalies indicating prompt injection
 */
export const useInjectionDetection = (
  state: ContextWindowState,
  onDetection?: (state: ContextWindowState) => void
) => {
  const previousSAR = useRef(state.systemAttentionRatio);

  useEffect(() => {
    // Detect sudden drop in SAR (Distraction Effect)
    const sarDrop = previousSAR.current - state.systemAttentionRatio;
    const suddenDrop = sarDrop > 0.3; // More than 30% drop

    // Detect high task drift
    const highDrift = state.taskDriftScore > 0.5;

    if ((suddenDrop || highDrift) && onDetection) {
      onDetection(state);
    }

    previousSAR.current = state.systemAttentionRatio;
  }, [state, onDetection]);
};
