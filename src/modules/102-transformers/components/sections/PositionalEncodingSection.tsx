import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { Section, SectionHeader } from '../../components/layout/Section'
import { Card } from '../../components/ui/Card'
import { EquationBlock, EQUATIONS } from '../../components/math/Equation'
import { fadeInUp } from '../../lib/animations'
import { cn } from '../../lib/utils'
import { TRANSFORMER_CONFIG } from '../../data/constants'

export function PositionalEncodingSection() {
  const [highlightedPos, setHighlightedPos] = useState<number | null>(null)
  const [highlightedDim, setHighlightedDim] = useState<number | null>(null)

  // Generate positional encodings
  const maxPos = 50
  const dims = 64 // Show subset of dimensions
  const encodings = useMemo(() => {
    const result: number[][] = []
    for (let pos = 0; pos < maxPos; pos++) {
      const encoding: number[] = []
      for (let i = 0; i < dims; i++) {
        const angle = pos / Math.pow(10000, (2 * Math.floor(i / 2)) / TRANSFORMER_CONFIG.d_model)
        encoding.push(i % 2 === 0 ? Math.sin(angle) : Math.cos(angle))
      }
      result.push(encoding)
    }
    return result
  }, [])

  return (
    <Section id="positional-encoding" dark>
      <SectionHeader
        title="The Problem of Position"
        subtitle="How the Transformer knows where each token belongs"
      />

      <motion.div variants={fadeInUp} className="prose-custom mb-12">
        <p>
          Attention treats tokens as a <strong>set</strong>, not a sequence.
          Without position information, "The cat sat on the mat" and "mat the on sat cat The"
          would be identical to the model.
        </p>
        <p className="mt-4">
          The Transformer adds <strong>positional encodings</strong> to inject sequence order.
          These encodings use sine and cosine functions at different frequencies.
        </p>
      </motion.div>

      {/* Why sinusoids */}
      <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-4 mb-12">
        <ReasonCard
          title="No Learned Parameters"
          description="Sinusoids are deterministic—no extra parameters to train"
        />
        <ReasonCard
          title="Relative Positions"
          description="The encoding at position p+k can be expressed as a linear function of position p"
        />
        <ReasonCard
          title="Extrapolation"
          description="Can handle sequences longer than those seen during training"
        />
      </motion.div>

      {/* Equations */}
      <motion.div variants={fadeInUp} className="space-y-4 mb-12">
        <EquationBlock
          latex={EQUATIONS.positionalEncodingSin}
          caption="Even dimensions use sine"
        />
        <EquationBlock
          latex={EQUATIONS.positionalEncodingCos}
          caption="Odd dimensions use cosine"
        />
      </motion.div>

      {/* Interactive visualization */}
      <Card className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Positional Encoding Visualization
        </h3>
        <p className="text-sm text-text-secondary text-center mb-6">
          Each row is a position, each column is a dimension.
          Low dimensions change rapidly, high dimensions change slowly.
        </p>

        {/* Heatmap */}
        <div className="overflow-x-auto mb-6">
          <div className="min-w-[600px]">
            <div className="flex">
              {/* Y-axis label */}
              <div className="w-16 flex items-center justify-end pr-2 text-xs text-text-secondary">
                Position
              </div>

              {/* Heatmap grid */}
              <div className="flex-1">
                {/* X-axis labels */}
                <div className="flex mb-1">
                  <div className="w-8" /> {/* Spacer for row labels */}
                  <div className="flex-1 flex justify-between text-xs text-text-secondary px-1">
                    <span>dim 0</span>
                    <span>dim {dims - 1}</span>
                  </div>
                </div>

                {/* Heatmap rows */}
                {encodings.slice(0, 32).map((row, pos) => (
                  <div
                    key={pos}
                    className={cn(
                      'flex items-center transition-all',
                      highlightedPos === pos && 'bg-accent-attention/10'
                    )}
                    onMouseEnter={() => setHighlightedPos(pos)}
                    onMouseLeave={() => setHighlightedPos(null)}
                  >
                    {/* Position label */}
                    <div className="w-8 text-[10px] text-text-secondary text-right pr-1">
                      {pos}
                    </div>

                    {/* Cells */}
                    <div className="flex flex-1">
                      {row.map((value, dim) => (
                        <div
                          key={dim}
                          className={cn(
                            'h-3 flex-1 min-w-[2px] transition-all',
                            highlightedDim === dim && 'ring-1 ring-accent-attention'
                          )}
                          style={{
                            backgroundColor: valueToColor(value),
                          }}
                          onMouseEnter={() => setHighlightedDim(dim)}
                          onMouseLeave={() => setHighlightedDim(null)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color scale legend */}
            <div className="flex justify-center mt-4 gap-4 items-center">
              <span className="text-xs text-text-secondary">-1</span>
              <div className="w-32 h-3 rounded" style={{
                background: 'linear-gradient(to right, #3b82f6, #f8fafc, #ef4444)'
              }} />
              <span className="text-xs text-text-secondary">+1</span>
            </div>
          </div>
        </div>

        {/* Info display */}
        {(highlightedPos !== null || highlightedDim !== null) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-text-secondary"
          >
            {highlightedPos !== null && highlightedDim !== null && (
              <span>
                Position {highlightedPos}, Dimension {highlightedDim}:{' '}
                <span className="font-mono">
                  {encodings[highlightedPos][highlightedDim].toFixed(4)}
                </span>
              </span>
            )}
          </motion.div>
        )}
      </Card>

      {/* Wave visualization */}
      <Card>
        <h3 className="text-lg font-semibold mb-4 text-center">
          Different Frequencies for Different Dimensions
        </h3>

        <WaveVisualization encodings={encodings} />

        <p className="text-sm text-text-secondary text-center mt-4">
          Lower dimensions (blue) oscillate rapidly, capturing fine position differences.
          Higher dimensions (red) oscillate slowly, capturing broader patterns.
        </p>
      </Card>
    </Section>
  )
}

function ReasonCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="p-4 rounded-lg bg-surface border border-slate-200 dark:border-slate-700"
    >
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-text-secondary">{description}</p>
    </motion.div>
  )
}

function valueToColor(value: number): string {
  // Map [-1, 1] to color scale
  if (value < 0) {
    const intensity = Math.abs(value)
    return `rgba(59, 130, 246, ${intensity})`  // Blue for negative
  } else {
    const intensity = value
    return `rgba(239, 68, 68, ${intensity})`    // Red for positive
  }
}

function WaveVisualization({ encodings }: { encodings: number[][] }) {
  const width = 600
  const height = 200
  const dims = [0, 4, 16, 48] // Show select dimensions

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      {dims.map((dim, idx) => {
        const color = `hsl(${(idx / dims.length) * 240}, 70%, 50%)`
        const points = encodings.slice(0, 50).map((enc, pos) => {
          const x = (pos / 50) * width
          const y = height / 2 - (enc[dim] * height * 0.4)
          return `${x},${y}`
        }).join(' ')

        return (
          <g key={dim}>
            <motion.polyline
              points={points}
              fill="none"
              stroke={color}
              strokeWidth={2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: idx * 0.2 }}
            />
            <text
              x={width - 60}
              y={height / 2 - (encodings[40][dim] * height * 0.4) - 8}
              fill={color}
              className="text-xs"
            >
              dim {dim}
            </text>
          </g>
        )
      })}

      {/* Axis */}
      <line x1={0} y1={height / 2} x2={width} y2={height / 2}
            stroke="currentColor" strokeOpacity={0.2} />
    </svg>
  )
}
