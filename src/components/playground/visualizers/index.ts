/**
 * Context Window Visualizer - Main exports
 * Educational visualization tool for LLM attention mechanics
 */

// Main component
export { ContextWindowVisualizer } from './ContextWindowVisualizer';

// Individual modules (for custom layouts)
export { ContextStream } from './modules/ContextStream';
export { AttentionSpotlight } from './modules/AttentionSpotlight';
export { SemanticTugOfWar } from './modules/SemanticTugOfWar';
export { InfluenceHorizon } from './modules/InfluenceHorizon';

// Controls (for custom configurations)
export { TimelineScrubber } from './controls/TimelineScrubber';
export { LayerSelector } from './controls/LayerSelector';
export { InjectionSimulator } from './controls/InjectionSimulator';

// Hooks (for building custom visualizations)
export { useAttentionData } from '@/hooks/useAttentionData';
export { useContextState } from '@/hooks/useContextState';
export { useInjectionDetection } from '@/hooks/useInjectionDetection';

// Types (for TypeScript consumers)
export type {
  ContextToken,
  AttentionMatrix,
  ContextWindowState,
  VisualizationConfig,
  InjectionSimulation,
  ContextWindowVisualizerProps,
  MockDataConfig,
} from '@/types/context-visualizer';
