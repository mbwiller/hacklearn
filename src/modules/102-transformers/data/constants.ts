// Transformer architecture constants from the paper
export const TRANSFORMER_CONFIG = {
  d_model: 512,        // Model dimension
  d_ff: 2048,          // Feed-forward inner dimension
  h: 8,                // Number of attention heads
  d_k: 64,             // Key dimension per head
  d_v: 64,             // Value dimension per head
  N: 6,                // Number of encoder/decoder layers
  dropout: 0.1,        // Dropout rate
  labelSmoothing: 0.1, // Label smoothing value
} as const

// Results from the paper
export const PAPER_RESULTS = {
  enDeBLEU: 28.4,      // English-German WMT 2014
  enFrBLEU: 41.8,      // English-French WMT 2014
  trainingDays: 3.5,   // Days to train base model
  numGPUs: 8,          // P100 GPUs used
  previousBestEnDe: 26.36, // Previous SOTA
  previousBestEnFr: 41.29, // Previous SOTA
} as const

// Section IDs for navigation
export const SECTION_IDS = [
  'hero',
  'sequential-bottleneck',
  'attention-paradigm',
  'query-key-value',
  'scaling',
  'multi-head',
  'positional-encoding',
  'encoder',
  'decoder',
  'full-architecture',
  'results',
  'living-architecture',
] as const

export type SectionId = typeof SECTION_IDS[number]

// Example sentences for visualizations
export const EXAMPLE_SENTENCES = {
  primary: {
    text: "The animal didn't cross the street because it was too tired",
    tokens: ["The", "animal", "didn't", "cross", "the", "street", "because", "it", "was", "too", "tired"],
    // "it" refers to "animal" - classic attention demonstration
    interestingPairs: [[1, 7], [7, 1]] as [number, number][],
  },
  simple: {
    text: "The cat sat on the mat",
    tokens: ["The", "cat", "sat", "on", "the", "mat"],
  },
  translation: {
    source: "I love machine learning",
    sourceTokens: ["I", "love", "machine", "learning"],
    target: "J'aime l'apprentissage automatique",
    targetTokens: ["J'", "aime", "l'", "apprentissage", "automatique"],
  },
} as const
