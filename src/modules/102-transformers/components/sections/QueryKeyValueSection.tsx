import { motion } from 'framer-motion'
import { useState } from 'react'
import { Section, SectionHeader } from '../../components/layout/Section'
import { Card } from '../../components/ui/Card'
import { EquationBlock, EQUATIONS } from '../../components/math/Equation'
import { MatrixGrid } from '../../components/visualizations/common/MatrixGrid'
import { TokenDisplay } from '../../components/visualizations/common/TokenDisplay'
import { fadeInUp, staggerContainer } from '../../lib/animations'
import { softmax } from '../../lib/utils'

const TOKENS = ["The", "cat", "sat", "on", "mat"]

// Pre-computed attention scores for demo (before softmax)
const RAW_SCORES = [
  [2.0, 0.5, 0.3, 0.1, 0.2],
  [0.4, 2.1, 0.8, 0.3, 0.5],
  [0.3, 0.6, 2.0, 0.9, 0.4],
  [0.2, 0.3, 0.7, 1.8, 0.6],
  [0.3, 0.4, 0.5, 0.8, 2.2],
]

// Apply softmax to get attention weights
const ATTENTION_WEIGHTS = RAW_SCORES.map(row => softmax(row))

export function QueryKeyValueSection() {
  const [selectedToken, setSelectedToken] = useState<number | null>(1) // Start with "cat"
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)

  return (
    <Section id="query-key-value">
      <SectionHeader
        title="The Art of Asking Questions"
        subtitle="Understanding the Query-Key-Value mechanism"
      />

      <motion.div variants={fadeInUp} className="prose-custom mb-12">
        <p>
          Attention works through a elegant mechanism: every token creates three different
          representations of itself:
        </p>
      </motion.div>

      {/* Q, K, V Explanation */}
      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-3 gap-4 mb-12"
      >
        <QKVCard
          letter="Q"
          name="Query"
          description="What am I looking for?"
          color="query"
          example="'cat' asks: who is relevant to me?"
        />
        <QKVCard
          letter="K"
          name="Key"
          description="What do I contain?"
          color="key"
          example="Each token advertises its content"
        />
        <QKVCard
          letter="V"
          name="Value"
          description="What information do I provide?"
          color="value"
          example="The actual content to retrieve"
        />
      </motion.div>

      {/* Step-by-step visualization */}
      <Card className="mb-12">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[1, 2, 3, 4].map(s => (
            <button
              key={s}
              onClick={() => setStep(s as 1 | 2 | 3 | 4)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                step === s
                  ? 'bg-accent-attention/20 border-2 border-accent-attention'
                  : 'bg-surface-alt border-2 border-slate-200 dark:border-slate-700'
              }`}
            >
              Step {s}: {['Dot Product', 'Scale', 'Softmax', 'Weighted Sum'][s - 1]}
            </button>
          ))}
        </div>

        <StepVisualization
          step={step}
          selectedToken={selectedToken}
          onTokenSelect={setSelectedToken}
        />
      </Card>

      {/* The Core Equation */}
      <motion.div variants={fadeInUp} className="mb-12">
        <h3 className="text-xl font-semibold text-center mb-6">The Attention Equation</h3>
        <EquationBlock
          latex={EQUATIONS.attention}
          label="(1)"
          caption="Scaled Dot-Product Attention"
        />
      </motion.div>

      {/* Interactive attention matrix */}
      <Card>
        <h3 className="text-lg font-semibold mb-4 text-center">
          Attention Weights Matrix
        </h3>
        <p className="text-sm text-text-secondary text-center mb-6">
          Click a token to see which other tokens it attends to
        </p>

        <div className="flex flex-col items-center gap-6">
          <TokenDisplay
            tokens={TOKENS}
            selectedIndex={selectedToken}
            onTokenClick={setSelectedToken}
            variant="query"
          />

          <div className="flex items-center gap-4">
            <div className="text-sm text-text-secondary -rotate-90 origin-center">
              Query
            </div>
            <MatrixGrid
              data={ATTENTION_WEIGHTS}
              rowLabels={TOKENS}
              colLabels={TOKENS}
              highlightedRow={selectedToken}
              showValues
              cellSize={50}
            />
            <div className="text-sm text-text-secondary">Key</div>
          </div>

          {selectedToken !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-4 bg-surface-alt rounded-lg"
            >
              <p className="text-sm text-text-secondary mb-2">
                "{TOKENS[selectedToken]}" attention distribution:
              </p>
              <div className="flex justify-center gap-2 flex-wrap">
                {ATTENTION_WEIGHTS[selectedToken].map((weight, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded text-sm"
                    style={{
                      backgroundColor: `rgba(168, 85, 247, ${weight})`,
                    }}
                  >
                    {TOKENS[i]}: {(weight * 100).toFixed(1)}%
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </Section>
  )
}

function QKVCard({
  letter,
  name,
  description,
  color,
  example,
}: {
  letter: string
  name: string
  description: string
  color: 'query' | 'key' | 'value'
  example: string
}) {
  const colorClasses = {
    query: 'bg-accent-query/10 border-accent-query/30 text-accent-query',
    key: 'bg-accent-key/10 border-accent-key/30 text-accent-key',
    value: 'bg-accent-value/10 border-accent-value/30 text-accent-value',
  }

  return (
    <motion.div
      variants={fadeInUp}
      className={`p-6 rounded-xl border-2 ${colorClasses[color].replace('text-', 'border-').split(' ')[0]} ${colorClasses[color].split(' ')[0]}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className={`w-10 h-10 rounded-lg flex items-center justify-center
                         text-xl font-bold ${colorClasses[color]}`}>
          {letter}
        </span>
        <span className="font-semibold text-lg">{name}</span>
      </div>
      <p className="text-text-primary font-medium mb-2">{description}</p>
      <p className="text-sm text-text-secondary italic">{example}</p>
    </motion.div>
  )
}

function StepVisualization({
  step,
  selectedToken,
  onTokenSelect,
}: {
  step: 1 | 2 | 3 | 4
  selectedToken: number | null
  onTokenSelect: (index: number | null) => void
}) {
  const d_k = 64 // Dimension of keys

  const descriptions = {
    1: "The query vector from one token is compared against all key vectors using dot product. Higher values mean more similarity.",
    2: `We divide by √${d_k} = 8 to prevent the dot products from becoming too large, which would cause softmax to output near-one-hot vectors.`,
    3: "Softmax converts the scores into a probability distribution that sums to 1. Now we have attention weights.",
    4: "Finally, we compute a weighted sum of value vectors using the attention weights, producing the output for this position.",
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <TokenDisplay
          tokens={TOKENS}
          selectedIndex={selectedToken}
          onTokenClick={onTokenSelect}
        />
      </div>

      <div className="p-4 bg-surface rounded-lg border border-slate-200 dark:border-slate-700">
        <motion.p
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-text-secondary"
        >
          {descriptions[step]}
        </motion.p>
      </div>

      {/* Visual representation of current step */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center items-center gap-4 flex-wrap"
      >
        {step === 1 && (
          <div className="text-center">
            <div className="font-mono text-lg mb-2">Q · K<sup>T</sup></div>
            <div className="text-sm text-text-secondary">
              Raw similarity scores: [2.0, 0.5, 0.3, 0.1, 0.2]
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="text-center">
            <div className="font-mono text-lg mb-2">Q · K<sup>T</sup> / √d<sub>k</sub></div>
            <div className="text-sm text-text-secondary">
              Scaled scores: [0.25, 0.06, 0.04, 0.01, 0.03]
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="text-center">
            <div className="font-mono text-lg mb-2">softmax(·)</div>
            <div className="text-sm text-text-secondary">
              Attention weights: [0.42, 0.17, 0.15, 0.12, 0.14]
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="text-center">
            <div className="font-mono text-lg mb-2">Σ attention<sub>i</sub> × V<sub>i</sub></div>
            <div className="text-sm text-text-secondary">
              Output: weighted combination of value vectors
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
