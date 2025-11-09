import { motion } from 'framer-motion';
import { Copy, Check, Loader2 } from 'lucide-react';
import { useState, useCallback } from 'react';
import { LaTeXRenderer } from '../../ui/LaTeXRenderer';
import type { ModelOption } from '../controls/ParameterPanel';

export interface RawOutputComparisonProps {
  standardResponse: string;
  cotResponse: string;
  standardState: 'streaming' | 'complete' | 'error';
  cotState: 'streaming' | 'complete' | 'error';
  standardMetrics: { tokens: number; cost: number; time: number } | null;
  cotMetrics: { tokens: number; cost: number; time: number } | null;
  standardError?: string;
  cotError?: string;
  model: ModelOption;
}

/**
 * Side-by-side raw output comparison with LaTeX rendering and real-time metrics.
 * Shows standard prompting vs CoT prompting on the same model.
 */
export const RawOutputComparison = ({
  standardResponse,
  cotResponse,
  standardState,
  cotState,
  standardMetrics,
  cotMetrics,
  standardError,
  cotError,
  model,
}: RawOutputComparisonProps) => {
  const [copiedSide, setCopiedSide] = useState<'standard' | 'cot' | null>(null);

  const copyToClipboard = useCallback((side: 'standard' | 'cot', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSide(side);
    setTimeout(() => setCopiedSide(null), 2000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header with model info */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
          Strategy Comparison
        </h3>
        <div className="text-sm text-gray-400">
          Model: <span className="text-cyan-400 font-semibold">{model}</span> - Both strategies use the same model
        </div>
      </div>

      {/* Side-by-side raw outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Standard Prompting */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-300">Standard Prompting</h4>
            <button
              onClick={() => copyToClipboard('standard', standardResponse)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              disabled={!standardResponse}
              aria-label="Copy standard response"
            >
              {copiedSide === 'standard' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 min-h-[300px] shadow-xl">
            {standardState === 'streaming' && !standardResponse ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
                  <p className="text-sm text-gray-400">Generating response...</p>
                </div>
              </div>
            ) : standardState === 'error' ? (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{standardError || 'An error occurred'}</p>
              </div>
            ) : standardResponse ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-white leading-relaxed"
              >
                <LaTeXRenderer text={standardResponse} />
                {standardState === 'streaming' && (
                  <motion.span
                    className="inline-block w-2 h-4 ml-1 bg-cyan-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-gray-500">Waiting to run...</p>
              </div>
            )}
          </div>

          {/* Real-time metrics */}
          {(standardState === 'streaming' || standardState === 'complete') && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg text-sm"
            >
              {standardState === 'streaming' ? (
                <span className="text-cyan-400 flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Streaming... | {standardMetrics?.tokens || 0} tokens | ${(standardMetrics?.cost || 0).toFixed(6)}
                </span>
              ) : standardMetrics ? (
                <motion.span
                  initial={{ color: '#22d3ee' }}
                  animate={{ color: '#10b981' }}
                  transition={{ duration: 0.3 }}
                  className="text-emerald-400"
                >
                  ✓ Complete | {standardMetrics.tokens} tokens | ${standardMetrics.cost.toFixed(6)} | {standardMetrics.time.toFixed(1)}s
                </motion.span>
              ) : null}
            </motion.div>
          )}
        </div>

        {/* Chain of Thought */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-300">Chain of Thought</h4>
            <button
              onClick={() => copyToClipboard('cot', cotResponse)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              disabled={!cotResponse}
              aria-label="Copy CoT response"
            >
              {copiedSide === 'cot' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 min-h-[300px] shadow-xl">
            {cotState === 'streaming' && !cotResponse ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
                  <p className="text-sm text-gray-400">Generating response...</p>
                </div>
              </div>
            ) : cotState === 'error' ? (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{cotError || 'An error occurred'}</p>
              </div>
            ) : cotResponse ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-white leading-relaxed"
              >
                <LaTeXRenderer text={cotResponse} />
                {cotState === 'streaming' && (
                  <motion.span
                    className="inline-block w-2 h-4 ml-1 bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-gray-500">Waiting to run...</p>
              </div>
            )}
          </div>

          {/* Real-time metrics */}
          {(cotState === 'streaming' || cotState === 'complete') && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg text-sm"
            >
              {cotState === 'streaming' ? (
                <span className="text-cyan-400 flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Streaming... | {cotMetrics?.tokens || 0} tokens | ${(cotMetrics?.cost || 0).toFixed(6)}
                </span>
              ) : cotMetrics ? (
                <motion.span
                  initial={{ color: '#22d3ee' }}
                  animate={{ color: '#10b981' }}
                  transition={{ duration: 0.3 }}
                  className="text-emerald-400"
                >
                  ✓ Complete | {cotMetrics.tokens} tokens | ${cotMetrics.cost.toFixed(6)} | {cotMetrics.time.toFixed(1)}s
                </motion.span>
              ) : null}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
