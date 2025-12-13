import { motion } from 'framer-motion'
import { Section, SectionHeader } from '../../components/layout/Section'
import { Card, StatCard } from '../../components/ui/Card'
import { fadeInUp, staggerContainer } from '../../lib/animations'
import { PAPER_RESULTS, TRANSFORMER_CONFIG } from '../../data/constants'

export function ResultsSection() {
  return (
    <Section id="results" dark>
      <SectionHeader
        title="The Numbers That Changed Everything"
        subtitle="State-of-the-art results with unprecedented efficiency"
      />

      <motion.div variants={fadeInUp} className="prose-custom mb-12 text-center">
        <p>
          The Transformer didn't just match existing results—it <strong>shattered</strong> them,
          while training faster and using fewer resources than previous state-of-the-art models.
        </p>
      </motion.div>

      {/* Main results */}
      <motion.div
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
      >
        <StatCard
          value={PAPER_RESULTS.enDeBLEU}
          label="BLEU (EN→DE)"
          highlight
        />
        <StatCard
          value={PAPER_RESULTS.enFrBLEU}
          label="BLEU (EN→FR)"
          highlight
        />
        <StatCard
          value={`${PAPER_RESULTS.trainingDays} days`}
          label="Training time"
        />
        <StatCard
          value={`${PAPER_RESULTS.numGPUs} P100s`}
          label="GPUs used"
        />
      </motion.div>

      {/* Comparison bars */}
      <Card className="mb-12">
        <h3 className="text-lg font-semibold mb-6">BLEU Score Comparison (WMT 2014)</h3>

        <div className="space-y-6">
          <ComparisonBar
            label="English → German"
            transformer={PAPER_RESULTS.enDeBLEU}
            previous={PAPER_RESULTS.previousBestEnDe}
            previousLabel="Previous best (ensemble)"
          />
          <ComparisonBar
            label="English → French"
            transformer={PAPER_RESULTS.enFrBLEU}
            previous={PAPER_RESULTS.previousBestEnFr}
            previousLabel="Previous best"
          />
        </div>

        <p className="text-sm text-text-secondary mt-6 text-center">
          The Transformer (base model) achieved better results than previous ensemble models
          at a fraction of the training cost.
        </p>
      </Card>

      {/* Training efficiency */}
      <Card className="mb-12">
        <h3 className="text-lg font-semibold mb-6">Training Efficiency Revolution</h3>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium mb-4">Why so fast?</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-accent-value mt-1">✓</span>
                <span><strong>Full parallelization</strong>: No sequential dependencies during training</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-value mt-1">✓</span>
                <span><strong>Efficient attention</strong>: Matrix operations optimized for GPUs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-value mt-1">✓</span>
                <span><strong>Simpler architecture</strong>: No recurrence, no convolutions</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Model configurations</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-surface rounded">
                <span className="text-text-secondary">Base model</span>
                <span>65M parameters</span>
              </div>
              <div className="flex justify-between p-2 bg-surface rounded">
                <span className="text-text-secondary">Big model</span>
                <span>213M parameters</span>
              </div>
              <div className="flex justify-between p-2 bg-accent-attention/10 rounded font-medium">
                <span>Training (base)</span>
                <span>12 hours × 8 GPUs</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Architecture summary */}
      <Card className="mb-12">
        <h3 className="text-lg font-semibold mb-6 text-center">
          The Transformer Architecture at a Glance
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Layers', value: TRANSFORMER_CONFIG.N },
            { label: 'd_model', value: TRANSFORMER_CONFIG.d_model },
            { label: 'd_ff', value: TRANSFORMER_CONFIG.d_ff },
            { label: 'Heads', value: TRANSFORMER_CONFIG.h },
            { label: 'd_k = d_v', value: TRANSFORMER_CONFIG.d_k },
            { label: 'Dropout', value: TRANSFORMER_CONFIG.dropout },
          ].map(({ label, value }) => (
            <motion.div
              key={label}
              variants={fadeInUp}
              className="p-3 bg-surface rounded-lg text-center"
            >
              <div className="text-xl font-bold text-accent-attention">{value}</div>
              <div className="text-xs text-text-secondary">{label}</div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Legacy section */}
      <motion.div variants={fadeInUp}>
        <Card className="text-center bg-gradient-to-br from-accent-attention/10 to-transparent border-accent-attention/30">
          <h3 className="text-2xl font-bold mb-4">The Foundation of Modern AI</h3>

          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            This 2017 paper introduced the architecture that would power the AI revolution.
            From GPT to BERT, from Claude to Gemini, from ChatGPT to GitHub Copilot—
            modern large language models are all built on the Transformer.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {['GPT', 'BERT', 'T5', 'PaLM', 'Claude', 'LLaMA', 'Gemini'].map((model) => (
              <span
                key={model}
                className="px-3 py-1 bg-surface rounded-full text-sm font-medium"
              >
                {model}
              </span>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-text-secondary">
              "Attention Is All You Need" — Vaswani et al., 2017
            </p>
            <p className="text-xs text-text-secondary mt-2">
              Google Brain & Google Research
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Footer */}
      <motion.footer
        variants={fadeInUp}
        className="mt-16 text-center text-text-secondary"
      >
        <p className="text-sm">
          An interactive exploration of the Transformer architecture
        </p>
        <p className="text-xs mt-2">
          Created with React, Framer Motion, and attention to detail
        </p>
      </motion.footer>
    </Section>
  )
}

function ComparisonBar({
  label,
  transformer,
  previous,
  previousLabel,
}: {
  label: string
  transformer: number
  previous: number
  previousLabel: string
}) {
  const maxVal = Math.max(transformer, previous) * 1.1
  const transformerWidth = (transformer / maxVal) * 100
  const previousWidth = (previous / maxVal) * 100
  const improvement = ((transformer - previous) / previous * 100).toFixed(1)

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{label}</span>
        <span className="text-sm text-accent-value">+{improvement}%</span>
      </div>

      <div className="space-y-2">
        {/* Transformer */}
        <div className="flex items-center gap-3">
          <div className="w-24 text-sm text-text-secondary">Transformer</div>
          <div className="flex-1 h-8 bg-surface rounded overflow-hidden">
            <motion.div
              className="h-full bg-accent-attention flex items-center justify-end pr-3"
              initial={{ width: 0 }}
              animate={{ width: `${transformerWidth}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-sm font-bold text-white">{transformer}</span>
            </motion.div>
          </div>
        </div>

        {/* Previous */}
        <div className="flex items-center gap-3">
          <div className="w-24 text-sm text-text-secondary truncate" title={previousLabel}>
            {previousLabel}
          </div>
          <div className="flex-1 h-8 bg-surface rounded overflow-hidden">
            <motion.div
              className="h-full bg-slate-400 flex items-center justify-end pr-3"
              initial={{ width: 0 }}
              animate={{ width: `${previousWidth}%` }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sm font-bold text-white">{previous}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
