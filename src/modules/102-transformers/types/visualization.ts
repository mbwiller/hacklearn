import type { Vector3Tuple } from 'three'

// ===== Component Identifiers =====
export type StackType = 'encoder' | 'decoder'
export type BlockType = 'attention' | 'masked-attention' | 'cross-attention' | 'ffn'
export type ComponentId =
  | StackType
  | `${StackType}-layer-${number}`
  | `${StackType}-layer-${number}-${BlockType}`
  | 'input-embeddings'
  | 'output-embeddings'
  | 'cross-attention-bridge'

// ===== State Types =====
export type PlaybackState = 'idle' | 'playing' | 'paused'
export type VisualizationMode = 'guided' | 'explore'

export type AnimationStep =
  | 'input-embedding'
  | 'positional-encoding'
  | 'encoder-attention-1'
  | 'encoder-attention-2'
  | 'encoder-complete'
  | 'decoder-masked-attention'
  | 'cross-attention'
  | 'output-generation'

export const ANIMATION_STEPS: AnimationStep[] = [
  'input-embedding',
  'positional-encoding',
  'encoder-attention-1',
  'encoder-attention-2',
  'encoder-complete',
  'decoder-masked-attention',
  'cross-attention',
  'output-generation',
]

export const STEP_LABELS: Record<AnimationStep, string> = {
  'input-embedding': 'Input Embedding',
  'positional-encoding': 'Positional Encoding',
  'encoder-attention-1': 'Encoder Layers 1-3',
  'encoder-attention-2': 'Encoder Layers 4-6',
  'encoder-complete': 'Encoder Complete',
  'decoder-masked-attention': 'Decoder Masked Attention',
  'cross-attention': 'Cross-Attention',
  'output-generation': 'Output Generation',
}

// ===== Tour Stages =====
export type TourStage = 1 | 2 | 3 | 4

export interface TourStageData {
  stage: TourStage
  title: string
  dialogue: string
  cameraPosition: Vector3Tuple
  cameraTarget: Vector3Tuple
  highlightComponent?: ComponentId
}

export const TOUR_STAGES: TourStageData[] = [
  {
    stage: 1,
    title: 'The Input',
    dialogue: 'Your sentence enters here, converted to 512-dimensional vectors',
    cameraPosition: [-2, 1, 5],
    cameraTarget: [-3, 0, 0],
    highlightComponent: 'input-embeddings',
  },
  {
    stage: 2,
    title: 'Attention in Action',
    dialogue: "Watch how 'it' finds 'animal' — this is attention in action",
    cameraPosition: [-2, 3, 4],
    cameraTarget: [-3, 2, 0],
    highlightComponent: 'encoder-layer-1-attention',
  },
  {
    stage: 3,
    title: 'Layer by Layer',
    dialogue: 'Six layers refine understanding progressively',
    cameraPosition: [0, 4, 8],
    cameraTarget: [0, 3, 0],
    highlightComponent: 'encoder',
  },
  {
    stage: 4,
    title: 'Encoder Meets Decoder',
    dialogue: "The decoder queries the encoder: 'What word comes next?'",
    cameraPosition: [0, 3, 6],
    cameraTarget: [0, 3, 0],
    highlightComponent: 'cross-attention-bridge',
  },
]

// ===== Camera =====
export interface CameraState {
  position: Vector3Tuple
  target: Vector3Tuple
}

export const DEFAULT_CAMERA: CameraState = {
  position: [0, 4, 10],
  target: [0, 2, 0],
}

// ===== Selection =====
export interface SelectionState {
  hoveredComponent: ComponentId | null
  selectedComponent: ComponentId | null
  hoveredToken: number | null
  focusedLayer: number | null
  focusedHead: number | null
}

// ===== Animation =====
export interface AnimationState {
  playback: PlaybackState
  speed: number // 0.5, 1, or 2
  stepIndex: number
  stepProgress: number // 0-1 progress within current step
}

// ===== Head Patterns =====
export interface HeadPattern {
  name: string
  description: string
  pattern: string
}

export const HEAD_PATTERNS: HeadPattern[] = [
  { name: 'Local', description: 'Attends to adjacent tokens', pattern: 'local' },
  { name: 'Syntax', description: 'Subject-verb relationships', pattern: 'syntax' },
  { name: 'Position', description: 'Relative position patterns', pattern: 'position' },
  { name: 'Global', description: 'Broad context gathering', pattern: 'global' },
  { name: 'Entity', description: 'Noun phrase tracking', pattern: 'entity' },
  { name: 'Semantic', description: 'Meaning-based connections', pattern: 'semantic' },
  { name: 'Copy', description: 'Identity/repetition patterns', pattern: 'copy' },
  { name: 'Rare', description: 'Infrequent but important', pattern: 'rare' },
]

// ===== Component Info =====
export interface ComponentInfo {
  title: string
  description: string
  details?: string[]
  linkedSection?: string
}

export const COMPONENT_INFO: Record<string, ComponentInfo> = {
  encoder: {
    title: 'Encoder Stack',
    description: 'Processes the input sequence through 6 identical layers',
    details: [
      'Each layer has multi-head self-attention',
      'Followed by position-wise feed-forward network',
      'Residual connections and layer normalization',
    ],
    linkedSection: 'encoder',
  },
  decoder: {
    title: 'Decoder Stack',
    description: 'Generates output sequence through 6 identical layers',
    details: [
      'Masked self-attention prevents future peeking',
      'Cross-attention queries the encoder output',
      'Same feed-forward structure as encoder',
    ],
    linkedSection: 'decoder',
  },
  'input-embeddings': {
    title: 'Input Embeddings',
    description: 'Converts tokens to 512-dimensional vectors',
    linkedSection: 'positional-encoding',
  },
  'cross-attention-bridge': {
    title: 'Cross-Attention',
    description: 'Decoder queries encoder representations',
    details: [
      'Keys and Values from encoder output',
      'Queries from decoder self-attention output',
      'Allows decoder to focus on relevant input parts',
    ],
    linkedSection: 'decoder',
  },
}

// ===== Main Store State =====
export interface VisualizationState {
  // Mode
  mode: VisualizationMode
  tourStage: TourStage | null
  tourActive: boolean

  // Camera
  camera: CameraState

  // Selection
  selection: SelectionState

  // Animation
  animation: AnimationState

  // Display options
  showAttentionBeams: boolean
  showLabels: boolean
  selectedHead: number | null // null = all heads

  // Actions
  setMode: (mode: VisualizationMode) => void
  startTour: () => void
  nextTourStage: () => void
  endTour: () => void

  setCamera: (camera: Partial<CameraState>) => void
  setCameraPreset: (position: Vector3Tuple, target: Vector3Tuple) => void

  setHovered: (component: ComponentId | null) => void
  setSelected: (component: ComponentId | null) => void
  setHoveredToken: (index: number | null) => void
  setFocusedLayer: (layer: number | null) => void
  setFocusedHead: (head: number | null) => void

  play: () => void
  pause: () => void
  togglePlayback: () => void
  setSpeed: (speed: number) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (index: number) => void
  setStepProgress: (progress: number) => void

  setSelectedHead: (head: number | null) => void
  toggleAttentionBeams: () => void
  toggleLabels: () => void

  reset: () => void
}
