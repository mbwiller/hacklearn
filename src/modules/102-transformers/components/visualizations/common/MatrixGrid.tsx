import { motion } from 'framer-motion'
import { cn } from '../../../lib/utils'

interface MatrixGridProps {
  data: number[][]
  rowLabels?: string[]
  colLabels?: string[]
  highlightedCell?: [number, number] | null
  highlightedRow?: number | null
  highlightedCol?: number | null
  onCellHover?: (row: number, col: number) => void
  onCellLeave?: () => void
  colorScale?: 'attention' | 'diverging' | 'sequential'
  showValues?: boolean
  cellSize?: number
  className?: string
}

function getColor(value: number, scale: 'attention' | 'diverging' | 'sequential'): string {
  const clamped = Math.max(0, Math.min(1, value))

  switch (scale) {
    case 'attention':
      // Purple gradient for attention weights
      const alpha = 0.1 + clamped * 0.8
      return `rgba(168, 85, 247, ${alpha})`
    case 'diverging':
      // Blue to white to red
      if (value < 0.5) {
        const intensity = (0.5 - value) * 2
        return `rgba(59, 130, 246, ${intensity})`
      } else {
        const intensity = (value - 0.5) * 2
        return `rgba(239, 68, 68, ${intensity})`
      }
    case 'sequential':
    default:
      return `rgba(59, 130, 246, ${clamped})`
  }
}

export function MatrixGrid({
  data,
  rowLabels,
  colLabels,
  highlightedCell,
  highlightedRow,
  highlightedCol,
  onCellHover,
  onCellLeave,
  colorScale = 'attention',
  showValues = false,
  cellSize = 40,
  className,
}: MatrixGridProps) {
  const rows = data.length
  const cols = data[0]?.length || 0

  return (
    <div className={cn('inline-block', className)}>
      {/* Column labels */}
      {colLabels && (
        <div className="flex" style={{ marginLeft: rowLabels ? cellSize + 8 : 0 }}>
          {colLabels.map((label, i) => (
            <div
              key={i}
              className={cn(
                'text-xs text-text-secondary text-center truncate px-1',
                highlightedCol === i && 'text-accent-attention font-medium'
              )}
              style={{ width: cellSize }}
            >
              {label}
            </div>
          ))}
        </div>
      )}

      <div className="flex">
        {/* Row labels */}
        {rowLabels && (
          <div className="flex flex-col justify-center mr-2">
            {rowLabels.map((label, i) => (
              <div
                key={i}
                className={cn(
                  'text-xs text-text-secondary text-right truncate pr-2',
                  highlightedRow === i && 'text-accent-attention font-medium'
                )}
                style={{ height: cellSize, lineHeight: `${cellSize}px`, width: cellSize }}
              >
                {label}
              </div>
            ))}
          </div>
        )}

        {/* Matrix cells */}
        <div
          className="grid gap-[2px] bg-slate-200 dark:bg-slate-700 p-[2px] rounded"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          }}
        >
          {data.map((row, i) =>
            row.map((value, j) => {
              const isHighlighted =
                (highlightedCell && highlightedCell[0] === i && highlightedCell[1] === j) ||
                highlightedRow === i ||
                highlightedCol === j

              return (
                <motion.div
                  key={`${i}-${j}`}
                  className={cn(
                    'flex items-center justify-center rounded-sm cursor-pointer',
                    'transition-all duration-150',
                    isHighlighted && 'ring-2 ring-accent-attention ring-offset-1'
                  )}
                  style={{ backgroundColor: getColor(value, colorScale) }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (i + j) * 0.02, duration: 0.3 }}
                  onMouseEnter={() => onCellHover?.(i, j)}
                  onMouseLeave={onCellLeave}
                  whileHover={{ scale: 1.1 }}
                >
                  {showValues && (
                    <span className="text-[10px] font-mono text-white mix-blend-difference">
                      {value.toFixed(2)}
                    </span>
                  )}
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
