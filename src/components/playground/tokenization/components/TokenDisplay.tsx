/**
 * Token Display Component
 * Visualizes token boundaries with color coding
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Token, TokenMetadata } from '../types/tokenization';
import { getTokenColorClasses, LEGEND_ITEMS } from '../utils/colorMapping';
import { getTokenMetadata } from '../utils/tokenizers';

interface TokenDisplayProps {
  tokens: Token[];
  onTokenHover?: (metadata: TokenMetadata | null) => void;
  animateEntrance?: boolean;
}

export const TokenDisplay = ({
  tokens,
  onTokenHover,
  animateEntrance = true,
}: TokenDisplayProps) => {
  const [hoveredToken, setHoveredToken] = useState<number | null>(null);

  const handleTokenHover = useCallback((token: Token | null, index: number | null) => {
    setHoveredToken(index);

    if (token && onTokenHover) {
      const metadata = getTokenMetadata(token);
      onTokenHover(metadata);
    } else {
      onTokenHover?.(null);
    }
  }, [onTokenHover]);

  if (tokens.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Token Boundaries</h3>
        </div>
        <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-12">
          <p className="text-gray-400 text-center">
            Enter text above to see token boundaries
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Token Boundaries</h3>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">Total:</span>
          <span className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 font-semibold">
            {tokens.length} tokens
          </span>
        </div>
      </div>

      {/* Token visualization */}
      <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6">
        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {tokens.map((token, idx) => (
              <motion.div
                key={`${token.id}-${idx}`}
                initial={animateEntrance ? { opacity: 0, scale: 0.8, y: 20 } : false}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  delay: animateEntrance ? idx * 0.02 : 0,
                  ease: 'easeOut',
                }}
                onMouseEnter={() => handleTokenHover(token, idx)}
                onMouseLeave={() => handleTokenHover(null, null)}
                className={`
                  relative px-3 py-2 rounded-lg border-2 transition-all cursor-pointer
                  ${getTokenColorClasses(token.type)}
                  ${hoveredToken === idx ? 'scale-110 z-10 shadow-xl' : 'hover:scale-105'}
                `}
              >
                {/* Token text */}
                <span className="font-mono text-sm whitespace-pre">
                  {token.text === ' ' ? '␣' : token.text === '\n' ? '↵' : token.text}
                </span>

                {/* Token ID badge (on hover) */}
                {hoveredToken === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-2 py-0.5 bg-slate-900 border border-white/20 rounded text-xs text-gray-300 whitespace-nowrap"
                  >
                    ID: {token.id}
                  </motion.div>
                )}

                {/* Glitch token warning */}
                {token.type === 'glitch' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Color legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
        <span className="font-semibold text-gray-300">Legend:</span>
        {LEGEND_ITEMS.map(item => (
          <div key={item.type} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded border-2 ${getTokenColorClasses(item.type)}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
