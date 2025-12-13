import { motion } from 'framer-motion'
import { useState } from 'react'
import { Section, SectionHeader } from '../../components/layout/Section'
import { Card } from '../../components/ui/Card'
import { fadeInUp } from '../../lib/animations'
import { cn } from '../../lib/utils'

const TOKENS = ["The", "cat", "sat", "on", "the", "mat"]

export function AttentionParadigmSection() {
  return (
    <Section id="attention-paradigm" dark>
      <SectionHeader
        title="Seeing Everything at Once"
        subtitle="The attention mechanism enables parallel processing with O(1) sequential operations"
      />

      <motion.div variants={fadeInUp} className="prose-custom mb-12">
        <p>
          What if <strong>every token could directly see every other token</strong> in a single step?
          No waiting, no information decay through chains of hidden states.
        </p>
        <p className="mt-4">
          This is the core insight of attention: instead of sequential processing,
          compute relationships between all pairs of tokens <strong>simultaneously</strong>.
        </p>
      </motion.div>

      <Card className="mb-12">
        <h3 className="text-lg font-semibold mb-6 text-center">
          Attention: All-to-All Connections
        </h3>
        <AttentionWebVisualization />
      </Card>

      <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6 mb-12">
        <ComparisonCard
          title="Recurrence (RNN)"
          complexity="O(n)"
          description="Sequential steps"
          problems={[
            "Must wait for previous step",
            "Information travels through chain",
            "Gradient vanishing over distance",
            "Cannot parallelize across time"
          ]}
          variant="bad"
        />
        <ComparisonCard
          title="Self-Attention"
          complexity="O(1)"
          description="Sequential steps"
          benefits={[
            "All positions processed in parallel",
            "Direct path between any two tokens",
            "Constant path length",
            "Fully parallelizable on GPUs"
          ]}
          variant="good"
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="prose-custom text-center">
        <p className="text-lg">
          With attention, information flows directly from any position to any other.
        </p>
        <p className="text-xl font-semibold text-accent-attention mt-4">
          But how does the model decide which tokens should attend to which?
        </p>
      </motion.div>
    </Section>
  )
}

function AttentionWebVisualization() {
  const [hoveredToken, setHoveredToken] = useState<number | null>(null)
  const [showAllConnections, setShowAllConnections] = useState(true)

  // SVG dimensions
  const width = 600
  const height = 300
  const tokenY = 80
  const spacing = width / (TOKENS.length + 1)

  // Generate attention weights (demo)
  const getAttentionWeight = (from: number, to: number): number => {
    // Simulate interesting attention pattern
    if (from === to) return 0.3
    // "it" (index 3) attends strongly to "cat" (index 1)
    if (from === 4 && to === 1) return 0.8
    // Adjacent tokens have moderate attention
    if (Math.abs(from - to) === 1) return 0.4
    return 0.1 + Math.random() * 0.2
  }

  return (
    <div className="space-y-6">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-2xl mx-auto"
      >
        {/* Attention arcs */}
        {TOKENS.map((_, fromIdx) =>
          TOKENS.map((_, toIdx) => {
            if (fromIdx === toIdx) return null

            const weight = getAttentionWeight(fromIdx, toIdx)
            const shouldShow = showAllConnections ||
              hoveredToken === fromIdx ||
              (hoveredToken !== null && toIdx === hoveredToken)

            const fromX = spacing * (fromIdx + 1)
            const toX = spacing * (toIdx + 1)
            const arcHeight = Math.abs(fromIdx - toIdx) * 25 + 40

            // Create arc path
            const path = `M ${fromX} ${tokenY + 15}
                         Q ${(fromX + toX) / 2} ${tokenY + 15 + arcHeight}
                         ${toX} ${tokenY + 15}`

            return (
              <motion.path
                key={`${fromIdx}-${toIdx}`}
                d={path}
                fill="none"
                stroke={`rgba(168, 85, 247, ${weight})`}
                strokeWidth={weight * 4}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: shouldShow ? 1 : 0,
                  opacity: shouldShow ? weight : 0,
                }}
                transition={{ duration: 0.5 }}
              />
            )
          })
        )}

        {/* Token circles and labels */}
        {TOKENS.map((token, idx) => {
          const x = spacing * (idx + 1)
          const isHovered = hoveredToken === idx

          return (
            <g key={idx}>
              <motion.circle
                cx={x}
                cy={tokenY}
                r={isHovered ? 28 : 24}
                className={cn(
                  'fill-surface stroke-2 cursor-pointer',
                  isHovered ? 'stroke-accent-attention' : 'stroke-slate-300 dark:stroke-slate-600'
                )}
                onMouseEnter={() => setHoveredToken(idx)}
                onMouseLeave={() => setHoveredToken(null)}
                animate={{ r: isHovered ? 28 : 24 }}
              />
              <text
                x={x}
                y={tokenY + 5}
                textAnchor="middle"
                className="fill-text-primary text-sm font-medium pointer-events-none"
              >
                {token}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowAllConnections(!showAllConnections)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all',
            showAllConnections
              ? 'bg-accent-attention/20 border-2 border-accent-attention text-accent-attention'
              : 'bg-surface-alt border-2 border-slate-200 dark:border-slate-700'
          )}
        >
          {showAllConnections ? 'Showing All' : 'Hover to Explore'}
        </button>
      </div>

      <p className="text-center text-sm text-text-secondary">
        {hoveredToken !== null
          ? `"${TOKENS[hoveredToken]}" attends to all other tokens simultaneously`
          : 'Hover over a token to see its attention pattern'}
      </p>
    </div>
  )
}

function ComparisonCard({
  title,
  complexity,
  description,
  problems,
  benefits,
  variant,
}: {
  title: string
  complexity: string
  description: string
  problems?: string[]
  benefits?: string[]
  variant: 'good' | 'bad'
}) {
  const items = problems || benefits || []
  const isGood = variant === 'good'

  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        'p-6 rounded-xl border',
        isGood
          ? 'bg-green-500/5 border-green-500/20'
          : 'bg-red-500/5 border-red-500/20'
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className={cn(
          'px-3 py-1 rounded-full text-sm font-mono font-bold',
          isGood
            ? 'bg-green-500/20 text-green-600 dark:text-green-400'
            : 'bg-red-500/20 text-red-600 dark:text-red-400'
        )}>
          {complexity}
        </span>
      </div>
      <p className="text-sm text-text-secondary mb-4">{description}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className={cn(
              'mt-1 w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0',
              isGood
                ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                : 'bg-red-500/20 text-red-600 dark:text-red-400'
            )}>
              {isGood ? '✓' : '×'}
            </span>
            <span className="text-text-secondary">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
