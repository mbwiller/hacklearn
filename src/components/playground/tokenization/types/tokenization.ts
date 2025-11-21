/**
 * TypeScript type definitions for Tokenization Deep Dive Visualizer
 */

/**
 * Token type classification for color coding
 */
export type TokenType =
  | 'normal'      // Standard token
  | 'special'     // Control token (<|begin_of_text|>, etc.)
  | 'glitch'      // Known glitch token
  | 'number'      // Numeric token
  | 'whitespace'  // Space/newline token
  | 'byte'        // Byte-level fallback
  | 'suspicious'; // Potentially malicious pattern

/**
 * Individual token representation
 */
export interface Token {
  id: number;           // Token ID in vocabulary
  text: string;         // Decoded text
  bytes: number[];      // UTF-8 byte representation
  position: number;     // Position in sequence
  type: TokenType;      // Classification
  mergeSteps?: MergeStep[]; // BPE merge history (optional)
}

/**
 * Tokenization result from a specific model
 */
export interface TokenizerResult {
  tokens: Token[];
  totalTokens: number;
  compressionRatio: number;
  vocabulary: string; // e.g., "GPT-4 (cl100k_base - 100,256 tokens)"
}

/**
 * BPE merge step for visualization
 */
export interface MergeStep {
  step: number;           // Merge iteration number
  pair: [string, string]; // Characters/tokens being merged
  frequency: number;      // Occurrence count in corpus
  newToken: string;       // Resulting merged token
  tokenId: number;        // ID assigned to new token
}

/**
 * Attack pattern definition for demonstrations
 */
export interface AttackPattern {
  name: string;
  description: string;
  category: 'smuggling' | 'splitting' | 'glitch' | 'obfuscation';
  example: string;
  targetTokenization: Token[]; // How it tokenizes
  explanation: string;         // Why it works
  mitigation: string;          // How to defend
}

/**
 * Comparative tokenization result across models
 */
export interface ComparativeResult {
  input: string;
  gpt4: TokenizerResult;
  llama3: TokenizerResult;
  gemini?: TokenizerResult;
  differences: TokenDifference[];
}

/**
 * Difference between two tokenization results
 */
export interface TokenDifference {
  position: number;
  gpt4Token: string;
  llama3Token: string;
  reason: 'vocabulary' | 'merge-strategy' | 'special-handling';
}

/**
 * Token hover metadata for detailed inspection
 */
export interface TokenMetadata {
  token: Token;
  unicodePoints: string[];  // U+0048, U+0065, etc.
  hexBytes: string;         // "48 65 6C 6C 6F"
  binaryRep: string;        // "01001000 01100101..."
  vocabRank: number;        // Position in vocabulary by frequency
  estimatedFrequency: number; // Corpus frequency (if available)
}

/**
 * Supported tokenizer models
 */
export type TokenizerModel = 'gpt-4' | 'llama-3' | 'gemini';

/**
 * Color scheme for token types
 */
export interface TokenColorScheme {
  bg: string;
  border: string;
  text: string;
  glow: string;
}
