import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { ContextToken } from '@/types/context-visualizer';

interface ContextStreamProps {
  tokens: ContextToken[];
  currentTimestep: number;
  onTokenHover?: (token: ContextToken | null) => void;
  onTokenClick?: (token: ContextToken) => void;
}

export const ContextStream = ({
  tokens,
  currentTimestep,
  onTokenHover,
  onTokenClick
}: ContextStreamProps) => {
  // Calculate influence decay for each token
  const tokensWithDecay = useMemo(() => {
    return tokens.map((token) => {
      // Exponential decay: newer tokens have higher opacity
      const age = currentTimestep - token.position;
      const decayFactor = Math.exp(-age / 50); // Decay constant = 50 tokens

      // Boost for Heavy Hitters (resist decay)
      const boostFactor = token.isHeavyHitter ? 2.0 : 1.0;

      const effectiveInfluence = Math.min(
        1.0,
        token.influenceScore * decayFactor * boostFactor
      );

      return { ...token, effectiveInfluence };
    });
  }, [tokens, currentTimestep]);

  // Color mapping: influence score -> color intensity
  const getTokenColor = (token: typeof tokensWithDecay[0]) => {
    const baseColor = (() => {
      switch (token.role) {
        case 'system':
          return 'cyan'; // System instructions
        case 'user':
          return 'emerald'; // User input
        case 'assistant':
          return 'purple'; // Model responses
        case 'special':
          return 'yellow'; // Special tokens
        default:
          return 'slate';
      }
    })();

    // Attention Sink gets special treatment
    if (token.isAttentionSink) {
      return 'bg-red-500 border-red-400'; // Red-500 (artifact warning)
    }

    // Heavy Hitter gets glow effect
    const intensity = Math.round(token.effectiveInfluence * 500);
    const glowIntensity = token.isHeavyHitter ? 'shadow-xl shadow-current/50' : '';

    return `bg-${baseColor}-${intensity} border-${baseColor}-${intensity + 100} ${glowIntensity}`;
  };

  return (
    <div className="relative w-full h-24 bg-slate-950 rounded-xl border border-white/10 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(to right, rgb(148 163 184 / 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 100%',
        }} />
      </div>

      {/* Token stream */}
      <div className="relative h-full flex items-center gap-1 px-4 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700">
        {tokensWithDecay.map((token) => {
          const opacity = token.effectiveInfluence;
          const scale = 0.8 + (token.effectiveInfluence * 0.4); // 0.8 to 1.2

          return (
            <motion.div
              key={`token-${token.position}`}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{
                opacity,
                scale,
                y: 0,
              }}
              exit={{ opacity: 0, scale: 0.5, y: -20 }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay: token.position * 0.02 // Staggered entrance
              }}
              className={`
                relative flex-shrink-0 h-16 px-3 flex items-center justify-center
                rounded-lg text-xs font-mono
                ${token.isSpecial ? 'border-2 border-dashed' : 'border border-white/20'}
                ${getTokenColor(token)}
                backdrop-blur-sm cursor-pointer
                hover:scale-110 hover:z-10 transition-transform
              `}
              onMouseEnter={() => onTokenHover?.(token)}
              onMouseLeave={() => onTokenHover?.(null)}
              onClick={() => onTokenClick?.(token)}
              style={{
                backgroundColor: `rgba(255, 255, 255, ${0.05 * opacity})`,
              }}
            >
              {/* Heavy Hitter indicator */}
              {token.isHeavyHitter && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border border-slate-900 animate-pulse" />
              )}

              {/* Token text */}
              <span className="text-white truncate max-w-[80px]">
                {token.text}
              </span>

              {/* Attention Sink indicator */}
              {token.isAttentionSink && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-[8px] text-red-400 font-bold">
                  SINK
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Current timestep indicator */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-500 font-mono">
        t = {currentTimestep}
      </div>
    </div>
  );
};
