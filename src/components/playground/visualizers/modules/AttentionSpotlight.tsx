import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { AttentionMatrix, ContextToken } from '@/types/context-visualizer';

interface AttentionSpotlightProps {
  tokens: ContextToken[];
  attentionMatrices: AttentionMatrix[];
  selectedLayer: number;
  selectedHead: number;
  selectedToken?: ContextToken | null;
  filterSinks?: boolean;
}

export const AttentionSpotlight = ({
  tokens,
  attentionMatrices,
  selectedLayer,
  selectedHead,
  selectedToken,
  filterSinks = true,
}: AttentionSpotlightProps) => {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  // Extract attention weights for selected layer/head
  const attentionData = useMemo(() => {
    const matrix = attentionMatrices.find(
      (m) => m.layer === selectedLayer && m.head === selectedHead
    );

    if (!matrix) return null;

    // Filter out attention sink artifacts if enabled
    if (filterSinks) {
      return matrix.weights.map((row) =>
        row.map((weight, colIdx) => {
          const sourceToken = tokens[colIdx];
          return sourceToken?.isAttentionSink ? 0 : weight;
        })
      );
    }

    return matrix.weights;
  }, [attentionMatrices, selectedLayer, selectedHead, filterSinks, tokens]);

  // Color scale: attention weight -> RGB color
  const getHeatmapColor = (weight: number): string => {
    // Cyan-purple gradient for HackLearn aesthetic
    const normalizedWeight = Math.min(1, Math.max(0, weight));

    // Low attention = dark slate
    if (normalizedWeight < 0.1) {
      return 'rgb(30, 41, 59)'; // slate-800
    }

    // Interpolate cyan -> purple
    const cyan = { r: 34, g: 211, b: 238 }; // cyan-400
    const purple = { r: 168, g: 85, b: 247 }; // purple-500

    const r = cyan.r + (purple.r - cyan.r) * normalizedWeight;
    const g = cyan.g + (purple.g - cyan.g) * normalizedWeight;
    const b = cyan.b + (purple.b - cyan.b) * normalizedWeight;

    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  };

  if (!attentionData) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        No attention data available for Layer {selectedLayer}, Head {selectedHead}
      </div>
    );
  }

  const cellSize = 20; // pixels
  const numTokens = tokens.length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-white">
          Layer {selectedLayer} • Head {selectedHead}
        </h4>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-16 h-3 rounded" style={{
            background: 'linear-gradient(to right, rgb(30, 41, 59), rgb(34, 211, 238), rgb(168, 85, 247))',
          }} />
          <span>Low → High Attention</span>
        </div>
      </div>

      {/* Heatmap Container */}
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 overflow-auto max-h-[600px]">
        <div className="relative" style={{
          width: numTokens * cellSize,
          height: numTokens * cellSize
        }}>
          {/* Heatmap cells */}
          {attentionData.map((row, rowIdx) => (
            row.map((weight, colIdx) => {
              const isHighlighted = selectedToken &&
                (selectedToken.position === rowIdx || selectedToken.position === colIdx);

              const isHovered = hoveredCell &&
                (hoveredCell.row === rowIdx || hoveredCell.col === colIdx);

              return (
                <motion.div
                  key={`cell-${rowIdx}-${colIdx}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isHighlighted || isHovered ? 1 : 0.8,
                    scale: isHighlighted || isHovered ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute border border-slate-900/50 cursor-pointer"
                  style={{
                    left: colIdx * cellSize,
                    top: rowIdx * cellSize,
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: getHeatmapColor(weight),
                  }}
                  onMouseEnter={() => setHoveredCell({ row: rowIdx, col: colIdx })}
                  onMouseLeave={() => setHoveredCell(null)}
                  title={`${tokens[rowIdx]?.text} ← ${tokens[colIdx]?.text}: ${weight.toFixed(4)}`}
                />
              );
            })
          ))}

          {/* Token labels on axes */}
          <div className="absolute -left-24 top-0 h-full flex flex-col justify-around text-xs text-gray-400 font-mono">
            {tokens.map((token, idx) => (
              <div key={`y-label-${idx}`} className="truncate w-20 text-right pr-2">
                {token.text}
              </div>
            ))}
          </div>

          <div className="absolute left-0 -top-16 w-full flex justify-around text-xs text-gray-400 font-mono">
            {tokens.map((token, idx) => (
              <div
                key={`x-label-${idx}`}
                className="truncate w-20 transform -rotate-45 origin-bottom-left"
              >
                {token.text}
              </div>
            ))}
          </div>
        </div>

        {/* Hover tooltip */}
        {hoveredCell && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-2 right-2 backdrop-blur-xl bg-slate-800/95 border border-white/20 rounded-lg p-3 text-sm text-white shadow-2xl"
          >
            <div className="font-semibold mb-1">Attention Flow</div>
            <div className="text-gray-300">
              <strong>{tokens[hoveredCell.row]?.text}</strong> ← {tokens[hoveredCell.col]?.text}
            </div>
            <div className="text-cyan-400 font-mono mt-1">
              Weight: {attentionData[hoveredCell.row][hoveredCell.col].toFixed(4)}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
