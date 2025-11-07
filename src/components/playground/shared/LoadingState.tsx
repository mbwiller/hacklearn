import { motion } from 'framer-motion';
import { Loader2, Zap, DollarSign } from 'lucide-react';
import { useMemo } from 'react';

/** Loading state configuration */
export interface LoadingStateProps {
  /** Current loading message */
  message?: string;
  /** Current token count (for streaming) */
  currentTokens?: number;
  /** Maximum tokens expected */
  maxTokens?: number;
  /** Estimated cost so far */
  currentCost?: number;
  /** Loading stage for contextual messaging */
  stage?: 'initializing' | 'connecting' | 'generating' | 'streaming' | 'complete';
  /** Custom className */
  className?: string;
}

/**
 * Premium loading state with live token counter and contextual messages
 */
export const LoadingState = ({
  message,
  currentTokens = 0,
  maxTokens = 1000,
  currentCost = 0,
  stage = 'generating',
  className = '',
}: LoadingStateProps) => {
  // Calculate progress percentage
  const progress = useMemo(() => {
    if (maxTokens === 0) return 0;
    return Math.min((currentTokens / maxTokens) * 100, 100);
  }, [currentTokens, maxTokens]);

  // Get contextual message based on stage
  const getStageMessage = () => {
    if (message) return message;

    switch (stage) {
      case 'initializing':
        return 'Preparing your experiment...';
      case 'connecting':
        return 'Connecting to OpenAI API...';
      case 'generating':
        return 'Generating response...';
      case 'streaming':
        return `Streaming token ${currentTokens}/${maxTokens}...`;
      case 'complete':
        return 'Complete!';
      default:
        return 'Processing...';
    }
  };

  // Cost color based on value
  const getCostColor = (cost: number) => {
    if (cost < 0.01) return 'text-emerald-400';
    if (cost < 0.10) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-8 shadow-xl ${className}`}
    >
      <div className="space-y-6">
        {/* Spinner and message */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-400"
            />
            {/* Inner icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
          </div>

          <p className="text-base font-medium text-white text-center">
            {getStageMessage()}
          </p>
        </div>

        {/* Progress bar (shown during streaming) */}
        {(stage === 'streaming' || stage === 'generating') && currentTokens > 0 && (
          <div className="space-y-3">
            <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
              />
            </div>

            {/* Token and cost info */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                {/* Token counter */}
                <motion.span
                  key={currentTokens}
                  initial={{ scale: 1.2, color: 'rgb(34 211 238)' }}
                  animate={{ scale: 1, color: 'rgb(156 163 175)' }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5 text-gray-400"
                >
                  <span className="text-yellow-400">🪙</span>
                  <span className="font-mono font-semibold">
                    {currentTokens.toLocaleString()}
                  </span>
                  <span className="text-gray-500">/ {maxTokens.toLocaleString()} tokens</span>
                </motion.span>

                {/* Percentage */}
                <span className="text-gray-500 font-mono">
                  {progress.toFixed(1)}%
                </span>
              </div>

              {/* Live cost */}
              {currentCost > 0 && (
                <motion.span
                  key={currentCost}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center gap-1.5 font-mono ${getCostColor(currentCost)}`}
                >
                  <DollarSign className="w-4 h-4" />
                  ${currentCost.toFixed(4)}
                </motion.span>
              )}
            </div>
          </div>
        )}

        {/* Simple spinner for non-streaming states */}
        {stage !== 'streaming' && stage !== 'generating' && (
          <div className="flex items-center justify-center gap-1.5">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 bg-cyan-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-cyan-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-cyan-400 rounded-full"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

/**
 * Compact loading indicator for inline use
 */
export const CompactLoader = ({ message = 'Loading...' }: { message?: string }) => (
  <div className="flex items-center gap-3 text-sm text-gray-400">
    <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
    <span>{message}</span>
  </div>
);
