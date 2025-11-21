import { useState, useEffect } from 'react';
import type { AttentionMatrix, MockDataConfig } from '@/types/context-visualizer';

/**
 * Generates realistic mock attention data for visualization
 * In production, this would fetch real attention weights from model inference
 */
export const useAttentionData = (config: MockDataConfig) => {
  const [attentionMatrices, setAttentionMatrices] = useState<AttentionMatrix[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateMockData = () => {
      const matrices: AttentionMatrix[] = [];

      for (let layer = 0; layer < config.numLayers; layer++) {
        for (let head = 0; head < config.numHeads; head++) {
          // Generate attention weights matrix
          const weights: number[][] = [];

          for (let target = 0; target < config.sequenceLength; target++) {
            const row: number[] = [];

            for (let source = 0; source < config.sequenceLength; source++) {
              // Causal mask: can't attend to future tokens
              if (source > target) {
                row.push(0);
                continue;
              }

              // Base attention score (random with bias)
              let score = Math.random();

              // Apply positional decay (RoPE simulation)
              if (config.usePositionalDecay) {
                const distance = target - source;
                const decayFactor = Math.exp(-distance / 30);
                score *= decayFactor;
              }

              // Attention sink (first token gets extra attention)
              if (source === 0 && Math.random() < config.attentionSinkRatio) {
                score += 0.5;
              }

              // Heavy hitter concentration
              if (Math.random() > config.sparsityFactor) {
                score *= 0.1; // Most tokens get very little attention
              }

              row.push(score);
            }

            // Normalize row to sum to 1.0 (softmax property)
            const sum = row.reduce((a, b) => a + b, 0);
            const normalized = row.map(v => sum > 0 ? v / sum : 0);

            weights.push(normalized);
          }

          matrices.push({
            layer,
            head,
            weights,
            headType: head === 0 ? 'induction' : 'generic',
          });
        }
      }

      setAttentionMatrices(matrices);
      setIsLoading(false);
    };

    generateMockData();
  }, [config]);

  return { attentionMatrices, isLoading };
};
