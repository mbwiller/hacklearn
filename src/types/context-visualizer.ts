/**
 * Type definitions for Context Window Visualizer
 * Educational tool for visualizing LLM attention mechanics and prompt injection
 */

/**
 * Represents a single token in the context window
 */
export interface ContextToken {
  /** Token ID (from tokenizer vocabulary) */
  id: number;

  /** Decoded text representation */
  text: string;

  /** Position in sequence (0-indexed) */
  position: number;

  /** Token role/type */
  role: 'system' | 'user' | 'assistant' | 'special' | 'text';

  /** Whether this is a special token (e.g., <|begin_of_text|>) */
  isSpecial: boolean;

  /** Accumulated attention score across all layers/heads */
  accumulatedAttention: number;

  /** Heavy Hitter status (top 20% by attention) */
  isHeavyHitter: boolean;

  /** Whether this token is an Attention Sink */
  isAttentionSink: boolean;

  /** Influence score (0-1, for "washout" effect) */
  influenceScore: number;

  /** Character offset in original text (for highlighting) */
  charStart: number;
  charEnd: number;
}

/**
 * Attention weights for a single layer/head
 */
export interface AttentionMatrix {
  /** Layer index (0-31 for 32-layer model) */
  layer: number;

  /** Head index (0-N for N attention heads) */
  head: number;

  /** Attention weights: [target_token][source_token] = weight */
  weights: number[][];

  /** Head type classification (if known) */
  headType?: 'induction' | 'delimiter' | 'copy' | 'generic';
}

/**
 * Complete context window state at a given timestep
 */
export interface ContextWindowState {
  /** All tokens in the context (chronological order) */
  tokens: ContextToken[];

  /** Attention matrices (all layers/heads) */
  attentionMatrices: AttentionMatrix[];

  /** Current generation timestep */
  timestep: number;

  /** KV cache occupancy (bytes) */
  cacheOccupancy: number;

  /** Maximum cache capacity (bytes) */
  cacheCapacity: number;

  /** System attention ratio (0-1) */
  systemAttentionRatio: number;

  /** Injection detected flag */
  injectionDetected: boolean;

  /** Task drift magnitude (0-1, higher = more drift) */
  taskDriftScore: number;
}

/**
 * Visual encoding configuration
 */
export interface VisualizationConfig {
  /** Color scheme for attention intensity */
  colorScheme: 'viridis' | 'plasma' | 'inferno' | 'cyan-purple';

  /** Show positional decay overlay */
  showRoPEDecay: boolean;

  /** Filter attention sinks (remove artifact noise) */
  filterAttentionSinks: boolean;

  /** Heavy Hitter threshold (0-1) */
  heavyHitterThreshold: number;

  /** Animation speed multiplier */
  animationSpeed: number;

  /** Show layer-wise breakdown */
  showLayerBreakdown: boolean;
}

/**
 * Injection simulation parameters
 */
export interface InjectionSimulation {
  /** Type of attack to simulate */
  attackType: 'direct' | 'token-smuggling' | 'adversarial-suffix' | 'payload-splitting';

  /** Injected text payload */
  payload: string;

  /** Position to inject (token index) */
  injectionPosition: number;

  /** Simulated attention shift magnitude */
  attackStrength: number;
}

/**
 * Props for main ContextWindowVisualizer component
 */
export interface ContextWindowVisualizerProps {
  /** Initial system prompt */
  systemPrompt: string;

  /** User input text */
  userInput: string;

  /** Whether to simulate real-time generation */
  isLive?: boolean;

  /** Configuration options */
  config?: Partial<VisualizationConfig>;

  /** Optional injection simulation */
  injectionSimulation?: InjectionSimulation;

  /** Callback when injection detected */
  onInjectionDetected?: (state: ContextWindowState) => void;
}

/**
 * Configuration for generating realistic mock attention data
 */
export interface MockDataConfig {
  /** Number of layers in the model */
  numLayers: number;

  /** Number of attention heads per layer */
  numHeads: number;

  /** Sequence length (number of tokens) */
  sequenceLength: number;

  /** Simulate positional decay (RoPE/ALiBi) */
  usePositionalDecay: boolean;

  /** Percentage of attention sinks (0-0.1 typical) */
  attentionSinkRatio: number;

  /** Heavy hitter concentration (higher = more sparse) */
  sparsityFactor: number;
}
