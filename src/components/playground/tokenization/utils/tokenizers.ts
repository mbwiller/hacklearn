/**
 * Tokenization utilities for multiple LLM models
 * Integrates gpt-tokenizer and llama3-tokenizer-js for real-time visualization
 */

import { encode as gptEncode, decode as gptDecode } from 'gpt-tokenizer';
import llama3Tokenizer from 'llama3-tokenizer-js';
import type { Token, TokenType, TokenizerResult, TokenizerModel } from '../types/tokenization';
import { GLITCH_TOKEN_IDS } from './attackPatterns';

/**
 * Tokenize text using specified model
 */
export const tokenizeText = (
  text: string,
  model: TokenizerModel
): TokenizerResult => {
  switch (model) {
    case 'gpt-4':
      return tokenizeGPT4(text);
    case 'llama-3':
      return tokenizeLlama3(text);
    case 'gemini':
      return tokenizeGemini(text);
  }
};

/**
 * GPT-4 tokenization (cl100k_base)
 * Uses gpt-tokenizer for synchronous, lightweight tokenization
 */
const tokenizeGPT4 = (text: string): TokenizerResult => {
  if (!text.trim()) {
    return {
      tokens: [],
      totalTokens: 0,
      compressionRatio: 0,
      vocabulary: 'GPT-4 (cl100k_base - 100,256 tokens)',
    };
  }

  const tokenIds = gptEncode(text);

  const tokens: Token[] = tokenIds.map((id, idx) => {
    // Decode single token to get text
    const tokenText = gptDecode([id]);
    const bytes = Array.from(new TextEncoder().encode(tokenText));

    return {
      id,
      text: tokenText,
      bytes,
      position: idx,
      type: classifyToken(id, tokenText),
    };
  });

  return {
    tokens,
    totalTokens: tokenIds.length,
    compressionRatio: text.length / Math.max(tokenIds.length, 1),
    vocabulary: 'GPT-4 (cl100k_base - 100,256 tokens)',
  };
};

/**
 * Llama 3 tokenization (128k BPE)
 */
const tokenizeLlama3 = (text: string): TokenizerResult => {
  if (!text.trim()) {
    return {
      tokens: [],
      totalTokens: 0,
      compressionRatio: 0,
      vocabulary: 'Llama 3 (128,256 tokens)',
    };
  }

  const tokenIds = llama3Tokenizer.encode(text);

  const tokens: Token[] = tokenIds.map((id: number, idx: number) => {
    const tokenText = llama3Tokenizer.decode([id]);
    const bytes = Array.from(new TextEncoder().encode(tokenText));

    return {
      id,
      text: tokenText,
      bytes,
      position: idx,
      type: classifyToken(id, tokenText),
    };
  });

  return {
    tokens,
    totalTokens: tokenIds.length,
    compressionRatio: text.length / Math.max(tokenIds.length, 1),
    vocabulary: 'Llama 3 (128,256 tokens)',
  };
};

/**
 * Gemini tokenization (256k Unigram)
 * Note: Requires API call or SentencePiece WASM
 * For MVP, uses GPT-4 with disclaimer
 */
const tokenizeGemini = (text: string): TokenizerResult => {
  const result = tokenizeGPT4(text);
  return {
    ...result,
    vocabulary: 'Gemini (256,000 tokens) - Using GPT-4 approximation',
  };
};

/**
 * Classify token based on ID and content
 */
const classifyToken = (id: number, text: string): TokenType => {
  // Special tokens (GPT-4 range: 100000+)
  if (id >= 100000) return 'special';

  // Known glitch tokens from research
  if (GLITCH_TOKEN_IDS.has(id)) return 'glitch';

  // Numeric tokens
  if (/^\d+$/.test(text.trim())) return 'number';

  // Whitespace
  if (/^\s+$/.test(text)) return 'whitespace';

  // Byte-level fallback (unusual characters)
  if (text.includes('Ä') || text.includes('Ã') || text.includes('Ġ')) return 'byte';

  // Suspicious patterns (mixed case, hyphens in unusual places)
  if (/[A-Z][a-z]*-[a-z]+/.test(text)) return 'suspicious';

  return 'normal';
};

/**
 * Generate mock BPE merge steps for visualization
 * In production, this would trace actual BPE algorithm
 */
export const generateBPEMergeSteps = (text: string) => {
  if (!text || text.length < 2) return [];

  // Simple demonstration: show common pairs being merged
  const commonPairs: Array<[string, string]> = [
    ['t', 'h'],
    ['th', 'e'],
    ['i', 'n'],
    ['e', 'r'],
    ['o', 'n'],
  ];

  return commonPairs.slice(0, Math.min(5, text.length / 2)).map((pair, idx) => ({
    step: idx + 1,
    pair,
    frequency: Math.floor(Math.random() * 10000) + 1000,
    newToken: pair.join(''),
    tokenId: 1000 + idx,
  }));
};

/**
 * Get token metadata for detailed inspection
 */
export const getTokenMetadata = (token: Token) => {
  return {
    token,
    unicodePoints: Array.from(token.text).map(
      char => `U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`
    ),
    hexBytes: token.bytes.map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(' '),
    binaryRep: token.bytes.map(b => b.toString(2).padStart(8, '0')).join(' '),
    vocabRank: token.id,
    estimatedFrequency: 0, // Would require corpus data
  };
};
