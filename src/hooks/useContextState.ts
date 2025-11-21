import { useState, useCallback, useMemo } from 'react';
import type { ContextToken, ContextWindowState, AttentionMatrix } from '@/types/context-visualizer';

/**
 * Manages the state of the context window, including tokenization,
 * attention accumulation, and Heavy Hitter identification
 */
export const useContextState = (
  systemPrompt: string,
  userInput: string,
  attentionMatrices: AttentionMatrix[]
) => {
  const [timestep, setTimestep] = useState(0);

  // Simple tokenization (in production, use real tokenizer)
  const tokens = useMemo((): ContextToken[] => {
    const systemTokens = systemPrompt.split(' ');
    const userTokens = userInput.split(' ');

    const allTokens: ContextToken[] = [];
    let charOffset = 0;

    // System tokens
    systemTokens.forEach((text, idx) => {
      allTokens.push({
        id: idx,
        text,
        position: idx,
        role: 'system',
        isSpecial: false,
        accumulatedAttention: 0,
        isHeavyHitter: false,
        isAttentionSink: idx === 0,
        influenceScore: 1.0,
        charStart: charOffset,
        charEnd: charOffset + text.length,
      });
      charOffset += text.length + 1;
    });

    // User tokens
    userTokens.forEach((text, idx) => {
      const pos = systemTokens.length + idx;
      allTokens.push({
        id: pos,
        text,
        position: pos,
        role: 'user',
        isSpecial: false,
        accumulatedAttention: 0,
        isHeavyHitter: false,
        isAttentionSink: false,
        influenceScore: 1.0,
        charStart: charOffset,
        charEnd: charOffset + text.length,
      });
      charOffset += text.length + 1;
    });

    return allTokens;
  }, [systemPrompt, userInput]);

  // Calculate accumulated attention and Heavy Hitters
  const enrichedTokens = useMemo(() => {
    if (attentionMatrices.length === 0) return tokens;

    return tokens.map((token, idx) => {
      // Sum attention across all layers/heads
      let totalAttention = 0;

      attentionMatrices.forEach((matrix) => {
        matrix.weights.forEach((row: number[]) => {
          totalAttention += row[idx] || 0;
        });
      });

      const avgAttention = totalAttention / (attentionMatrices.length * tokens.length);

      return {
        ...token,
        accumulatedAttention: avgAttention,
        influenceScore: avgAttention,
      };
    });
  }, [tokens, attentionMatrices]);

  // Identify Heavy Hitters (top 20%)
  const tokensWithHeavyHitters = useMemo(() => {
    const sorted = [...enrichedTokens].sort((a, b) => b.accumulatedAttention - a.accumulatedAttention);
    const threshold = sorted[Math.floor(sorted.length * 0.2)]?.accumulatedAttention || 0;

    return enrichedTokens.map(token => ({
      ...token,
      isHeavyHitter: token.accumulatedAttention >= threshold,
    }));
  }, [enrichedTokens]);

  // Calculate system attention ratio (SAR)
  const systemAttentionRatio = useMemo(() => {
    const systemTokens = tokensWithHeavyHitters.filter(t => t.role === 'system');
    const totalSystemAttention = systemTokens.reduce((sum, t) => sum + t.accumulatedAttention, 0);
    const totalAttention = tokensWithHeavyHitters.reduce((sum, t) => sum + t.accumulatedAttention, 0);

    return totalAttention > 0 ? totalSystemAttention / totalAttention : 1.0;
  }, [tokensWithHeavyHitters]);

  // Build complete context state
  const contextState: ContextWindowState = useMemo(() => ({
    tokens: tokensWithHeavyHitters,
    attentionMatrices,
    timestep,
    cacheOccupancy: tokensWithHeavyHitters.length * 512, // Mock: 512 bytes per token
    cacheCapacity: 100000, // Mock: 100KB
    systemAttentionRatio,
    injectionDetected: systemAttentionRatio < 0.4,
    taskDriftScore: Math.max(0, 1 - systemAttentionRatio),
  }), [tokensWithHeavyHitters, attentionMatrices, timestep, systemAttentionRatio]);

  const updateTimestep = useCallback((newTimestep: number) => {
    setTimestep(newTimestep);
  }, []);

  return {
    contextState,
    updateTimestep,
  };
};
