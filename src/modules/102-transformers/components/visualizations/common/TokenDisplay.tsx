import { motion } from 'framer-motion'
import { cn } from '../../../lib/utils'
import { fadeInUp } from '../../../lib/animations'

interface TokenDisplayProps {
  tokens: string[]
  highlightedIndex?: number | null
  selectedIndex?: number | null
  onTokenHover?: (index: number) => void
  onTokenLeave?: () => void
  onTokenClick?: (index: number) => void
  variant?: 'default' | 'query' | 'key' | 'value'
  showIndices?: boolean
  className?: string
}

const variantStyles = {
  default: 'bg-surface-alt border-slate-200 dark:border-slate-700',
  query: 'bg-accent-query/10 border-accent-query/30',
  key: 'bg-accent-key/10 border-accent-key/30',
  value: 'bg-accent-value/10 border-accent-value/30',
}

const variantHighlight = {
  default: 'border-accent-attention bg-accent-attention/20',
  query: 'border-accent-query bg-accent-query/30',
  key: 'border-accent-key bg-accent-key/30',
  value: 'border-accent-value bg-accent-value/30',
}

export function TokenDisplay({
  tokens,
  highlightedIndex,
  selectedIndex,
  onTokenHover,
  onTokenLeave,
  onTokenClick,
  variant = 'default',
  showIndices = false,
  className,
}: TokenDisplayProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn('flex flex-wrap gap-2 justify-center', className)}
    >
      {tokens.map((token, index) => {
        const isHighlighted = highlightedIndex === index
        const isSelected = selectedIndex === index

        return (
          <motion.div
            key={index}
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            {showIndices && (
              <span className="text-[10px] text-text-secondary font-mono">
                {index}
              </span>
            )}
            <motion.button
              className={cn(
                'px-3 py-2 rounded-lg border-2 font-medium transition-all',
                isHighlighted || isSelected
                  ? variantHighlight[variant]
                  : variantStyles[variant],
                onTokenClick && 'cursor-pointer hover:scale-105',
                !onTokenClick && 'cursor-default'
              )}
              onMouseEnter={() => onTokenHover?.(index)}
              onMouseLeave={onTokenLeave}
              onClick={() => onTokenClick?.(index)}
              whileHover={onTokenClick ? { scale: 1.05 } : undefined}
              whileTap={onTokenClick ? { scale: 0.98 } : undefined}
            >
              {token}
            </motion.button>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

interface TokenPairDisplayProps {
  sourceTokens: string[]
  targetTokens: string[]
  sourceLabel?: string
  targetLabel?: string
  attentionWeights?: number[][]
  highlightedSource?: number | null
  highlightedTarget?: number | null
  onSourceHover?: (index: number) => void
  onTargetHover?: (index: number) => void
  onLeave?: () => void
}

export function TokenPairDisplay({
  sourceTokens,
  targetTokens,
  sourceLabel = 'Source',
  targetLabel = 'Target',
  highlightedSource,
  highlightedTarget,
  onSourceHover,
  onTargetHover,
  onLeave,
}: TokenPairDisplayProps) {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-sm text-text-secondary mb-2 text-center">{sourceLabel}</div>
        <TokenDisplay
          tokens={sourceTokens}
          highlightedIndex={highlightedSource}
          onTokenHover={onSourceHover}
          onTokenLeave={onLeave}
          variant="key"
        />
      </div>
      <div>
        <div className="text-sm text-text-secondary mb-2 text-center">{targetLabel}</div>
        <TokenDisplay
          tokens={targetTokens}
          highlightedIndex={highlightedTarget}
          onTokenHover={onTargetHover}
          onTokenLeave={onLeave}
          variant="query"
        />
      </div>
    </div>
  )
}
