import { motion } from 'framer-motion'
import { cn } from '../../../lib/utils'

interface VectorDisplayProps {
  values: number[]
  label?: string
  variant?: 'query' | 'key' | 'value' | 'default'
  orientation?: 'horizontal' | 'vertical'
  showValues?: boolean
  maxDisplay?: number
  className?: string
}

const variantColors = {
  query: 'from-accent-query/20 to-accent-query/60',
  key: 'from-accent-key/20 to-accent-key/60',
  value: 'from-accent-value/20 to-accent-value/60',
  default: 'from-slate-200 to-slate-400 dark:from-slate-700 dark:to-slate-500',
}

const variantBorders = {
  query: 'border-accent-query/30',
  key: 'border-accent-key/30',
  value: 'border-accent-value/30',
  default: 'border-slate-300 dark:border-slate-600',
}

export function VectorDisplay({
  values,
  label,
  variant = 'default',
  orientation = 'horizontal',
  showValues = false,
  maxDisplay = 8,
  className,
}: VectorDisplayProps) {
  const displayValues = values.slice(0, maxDisplay)
  const hasMore = values.length > maxDisplay

  // Normalize values for visualization
  const maxVal = Math.max(...values.map(Math.abs))
  const normalizedValues = displayValues.map(v => v / (maxVal || 1))

  return (
    <motion.div
      className={cn(
        'flex gap-1 items-center',
        orientation === 'vertical' && 'flex-col',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <span className={cn(
          'text-xs font-medium text-text-secondary',
          orientation === 'horizontal' ? 'mr-2' : 'mb-1'
        )}>
          {label}
        </span>
      )}

      <div className={cn(
        'flex gap-[2px] p-1 rounded border',
        orientation === 'vertical' && 'flex-col',
        variantBorders[variant]
      )}>
        {normalizedValues.map((normalizedVal, i) => {
          const intensity = (normalizedVal + 1) / 2 // Map [-1, 1] to [0, 1]

          return (
            <motion.div
              key={i}
              className={cn(
                'rounded-sm relative group',
                orientation === 'horizontal' ? 'w-4 h-8' : 'w-8 h-4'
              )}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.03, duration: 0.2 }}
            >
              <div
                className={cn(
                  'absolute inset-0 rounded-sm bg-gradient-to-t',
                  variantColors[variant]
                )}
                style={{
                  opacity: intensity,
                }}
              />

              {showValues && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2
                                opacity-0 group-hover:opacity-100 transition-opacity
                                bg-surface-elevated px-1 rounded text-[10px] font-mono
                                shadow-lg whitespace-nowrap z-10">
                  {displayValues[i].toFixed(2)}
                </div>
              )}
            </motion.div>
          )
        })}

        {hasMore && (
          <div className="flex items-center justify-center px-1 text-xs text-text-secondary">
            ...
          </div>
        )}
      </div>

      <span className="text-[10px] text-text-secondary ml-1">
        [{values.length}]
      </span>
    </motion.div>
  )
}

interface VectorOperationProps {
  leftVector: number[]
  rightVector: number[]
  operation: 'dot' | 'add' | 'multiply'
  result?: number | number[]
  leftLabel?: string
  rightLabel?: string
  className?: string
}

export function VectorOperation({
  leftVector,
  rightVector,
  operation,
  result,
  leftLabel,
  rightLabel,
  className,
}: VectorOperationProps) {
  const operationSymbol = {
    dot: '·',
    add: '+',
    multiply: '×',
  }[operation]

  return (
    <div className={cn('flex items-center gap-3 flex-wrap justify-center', className)}>
      <VectorDisplay values={leftVector} label={leftLabel} variant="query" showValues />
      <span className="text-2xl text-text-secondary">{operationSymbol}</span>
      <VectorDisplay values={rightVector} label={rightLabel} variant="key" showValues />
      {result !== undefined && (
        <>
          <span className="text-2xl text-text-secondary">=</span>
          {typeof result === 'number' ? (
            <motion.span
              className="text-xl font-mono font-bold text-accent-attention"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              {result.toFixed(2)}
            </motion.span>
          ) : (
            <VectorDisplay values={result} variant="value" showValues />
          )}
        </>
      )}
    </div>
  )
}
