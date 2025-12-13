import { motion } from 'framer-motion'
import { useState } from 'react'
import { Section, SectionHeader } from '../../components/layout/Section'
import { Card } from '../../components/ui/Card'
import { EquationBlock, EQUATIONS } from '../../components/math/Equation'
import { MatrixGrid } from '../../components/visualizations/common/MatrixGrid'
import { fadeInUp } from '../../lib/animations'
import { cn, softmax } from '../../lib/utils'
import { TRANSFORMER_CONFIG } from '../../data/constants'

const TOKENS = ["The", "cat", "sat", "on", "mat"]

// Different attention patterns for different heads
const HEAD_PATTERNS = [
  { name: "Local", description: "Attends to adjacent tokens", pattern: 'local' },
  { name: "Syntax", description: "Subject-verb relationships", pattern: 'syntax' },
  { name: "Position", description: "Relative position patterns", pattern: 'position' },
  { name: "Global", description: "Broad context gathering", pattern: 'global' },
  { name: "Entity", description: "Noun phrase tracking", pattern: 'entity' },
  { name: "Semantic", description: "Meaning-based connections", pattern: 'semantic' },
  { name: "Copy", description: "Identity/repetition patterns", pattern: 'copy' },
  { name: "Rare", description: "Infrequent but important", pattern: 'rare' },
] as const

function generateHeadPattern(pattern: string, size: number): number[][] {
  const result: number[][] = []

  for (let i = 0; i < size; i++) {
    const row: number[] = []
    for (let j = 0; j < size; j++) {
      let score: number

      switch (pattern) {
        case 'local':
          score = Math.exp(-Math.abs(i - j) * 1.5)
          break
        case 'syntax':
          // Subject (1) attends to verb (2), and vice versa
          score = (i === 1 && j === 2) || (i === 2 && j === 1) ? 3 : 0.2
          break
        case 'position':
          score = 1 / (Math.abs(i - j) + 1)
          break
        case 'global':
          score = 0.8 + Math.random() * 0.4
          break
        case 'entity':
          // Focus on nouns (cat, mat)
          score = (j === 1 || j === 4) ? 2 : 0.3
          break
        case 'semantic':
          // cat-sat, mat-on semantic groups
          score = Math.abs(i - j) <= 1 ? 1.5 : 0.3
          break
        case 'copy':
          score = i === j ? 5 : 0.1
          break
        case 'rare':
          score = Math.random() > 0.7 ? 3 : 0.1
          break
        default:
          score = 1
      }
      row.push(score)
    }
    result.push(softmax(row))
  }

  return result
}

export function MultiHeadSection() {
  const [selectedHead, setSelectedHead] = useState(0)
  const [showAll, setShowAll] = useState(false)

  const headWeights = HEAD_PATTERNS.map(h =>
    generateHeadPattern(h.pattern, TOKENS.length)
  )

  return (
    <Section id="multi-head">
      <SectionHeader
        title="The Council of Eight"
        subtitle="Multiple attention heads learn different relationship patterns"
      />

      <motion.div variants={fadeInUp} className="prose-custom mb-12">
        <p>
          A single attention head can only focus on one type of relationship at a time.
          But language has many types of relationships: syntactic, semantic, positional, and more.
        </p>
        <p className="mt-4">
          <strong>Multi-head attention</strong> runs {TRANSFORMER_CONFIG.h} attention operations in parallel,
          each with its own learned projections. Each head can specialize in different patterns.
        </p>
      </motion.div>

      {/* Architecture stats */}
      <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatBox label="Heads" value={TRANSFORMER_CONFIG.h} />
        <StatBox label="d_model" value={TRANSFORMER_CONFIG.d_model} />
        <StatBox label="d_k per head" value={TRANSFORMER_CONFIG.d_k} />
        <StatBox label="d_v per head" value={TRANSFORMER_CONFIG.d_v} />
      </motion.div>

      {/* Head selector */}
      <Card className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Explore Attention Heads</h3>
          <button
            onClick={() => setShowAll(!showAll)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              showAll
                ? 'bg-accent-attention/20 border-2 border-accent-attention'
                : 'bg-surface-alt border-2 border-slate-200 dark:border-slate-700'
            )}
          >
            {showAll ? 'Show Selected' : 'Show All'}
          </button>
        </div>

        {showAll ? (
          // Grid of all heads
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HEAD_PATTERNS.map((head, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={cn(
                  'p-3 rounded-lg cursor-pointer transition-all',
                  selectedHead === idx
                    ? 'ring-2 ring-accent-attention bg-accent-attention/10'
                    : 'bg-surface-alt hover:bg-surface-alt/80'
                )}
                onClick={() => {
                  setSelectedHead(idx)
                  setShowAll(false)
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <HeadIndicator index={idx} />
                  <span className="text-sm font-medium">{head.name}</span>
                </div>
                <div className="flex justify-center">
                  <MiniMatrix data={headWeights[idx]} />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Single head detail view
          <div className="space-y-6">
            {/* Head tabs */}
            <div className="flex flex-wrap gap-2 justify-center">
              {HEAD_PATTERNS.map((head, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedHead(idx)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all',
                    selectedHead === idx
                      ? 'bg-accent-attention/20 border-2 border-accent-attention'
                      : 'bg-surface-alt border-2 border-transparent hover:border-slate-300'
                  )}
                >
                  <HeadIndicator index={idx} />
                  {head.name}
                </button>
              ))}
            </div>

            {/* Selected head detail */}
            <motion.div
              key={selectedHead}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="text-center">
                <h4 className="text-lg font-semibold">
                  Head {selectedHead + 1}: {HEAD_PATTERNS[selectedHead].name}
                </h4>
                <p className="text-sm text-text-secondary">
                  {HEAD_PATTERNS[selectedHead].description}
                </p>
              </div>

              <MatrixGrid
                data={headWeights[selectedHead]}
                rowLabels={TOKENS}
                colLabels={TOKENS}
                showValues
                cellSize={50}
              />
            </motion.div>
          </div>
        )}
      </Card>

      {/* Concatenation explanation */}
      <motion.div variants={fadeInUp} className="mb-8">
        <Card>
          <h3 className="text-lg font-semibold mb-4">How Heads Combine</h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            {/* Visual: 8 heads → concat → project */}
            <div className="flex items-center gap-2">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-8 h-16 rounded"
                  style={{
                    backgroundColor: `hsl(${i * 45}, 70%, 60%)`,
                    opacity: 0.8,
                  }}
                />
              ))}
              <span className="text-text-secondary">...</span>
              {[5, 6, 7].map(i => (
                <div
                  key={i}
                  className="w-8 h-16 rounded"
                  style={{
                    backgroundColor: `hsl(${i * 45}, 70%, 60%)`,
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>

            <span className="text-2xl text-text-secondary">→</span>

            {/* Concatenated */}
            <div className="flex gap-[2px]">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-16 rounded-sm"
                  style={{
                    backgroundColor: `hsl(${i * 45}, 70%, 60%)`,
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>

            <span className="text-2xl text-text-secondary">→</span>

            {/* Projected */}
            <div className="w-16 h-16 rounded bg-accent-attention/50 flex items-center justify-center">
              <span className="text-xs font-mono">d_model</span>
            </div>
          </div>

          <p className="text-sm text-text-secondary text-center">
            Each head outputs a {TRANSFORMER_CONFIG.d_v}-dimensional vector.
            All 8 heads are concatenated (8 × 64 = 512) and projected back to d_model.
          </p>
        </Card>
      </motion.div>

      {/* Equations */}
      <motion.div variants={fadeInUp} className="space-y-4">
        <EquationBlock
          latex={EQUATIONS.multiHead}
          caption="Multi-head attention concatenates outputs from all heads"
        />
        <EquationBlock
          latex={EQUATIONS.headI}
          caption="Each head has its own learned projection matrices"
        />
      </motion.div>
    </Section>
  )
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="p-4 bg-surface-alt rounded-lg text-center"
    >
      <div className="text-2xl font-bold text-accent-attention">{value}</div>
      <div className="text-sm text-text-secondary">{label}</div>
    </motion.div>
  )
}

function HeadIndicator({ index }: { index: number }) {
  return (
    <div
      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
      style={{ backgroundColor: `hsl(${index * 45}, 70%, 50%)` }}
    >
      {index + 1}
    </div>
  )
}

function MiniMatrix({ data }: { data: number[][] }) {
  const size = 4 // Show 4x4 preview
  return (
    <div
      className="grid gap-[1px]"
      style={{ gridTemplateColumns: `repeat(${size}, 8px)` }}
    >
      {data.slice(0, size).map((row, i) =>
        row.slice(0, size).map((value, j) => (
          <div
            key={`${i}-${j}`}
            className="w-2 h-2 rounded-[1px]"
            style={{ backgroundColor: `rgba(168, 85, 247, ${value})` }}
          />
        ))
      )}
    </div>
  )
}
