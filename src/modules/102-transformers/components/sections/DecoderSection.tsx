import { motion } from 'framer-motion'
import { useState } from 'react'
import { Section, SectionHeader } from '../../components/layout/Section'
import { Card } from '../../components/ui/Card'
import { MatrixGrid } from '../../components/visualizations/common/MatrixGrid'
import { fadeInUp } from '../../lib/animations'
import { cn } from '../../lib/utils'

const OUTPUT_TOKENS = ["<start>", "Le", "chat", "est", "assis"]

export function DecoderSection() {
  const [showMask, setShowMask] = useState(true)
  const [currentStep, setCurrentStep] = useState(3)

  // Simpler mask visualization
  const maskedWeights = OUTPUT_TOKENS.map((_, i) => {
    const row = OUTPUT_TOKENS.map((_, j) => {
      if (showMask && j > i) return 0
      return 1 / (Math.abs(i - j) + 1) + (i === j ? 0.5 : 0)
    })
    const sum = row.reduce((a, b) => a + b, 0)
    return row.map(val => val / sum)
  })

  return (
    <Section id="decoder" dark>
      <SectionHeader
        title="The Decoder's Dance"
        subtitle="Generating output while looking back at the input"
      />

      <motion.div variants={fadeInUp} className="prose-custom mb-12">
        <p>
          The decoder is similar to the encoder, but with a crucial difference:
          it has <strong>three</strong> attention sub-layers instead of one.
        </p>
      </motion.div>

      {/* Three attention types */}
      <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-4 mb-12">
        <AttentionTypeCard
          number={1}
          title="Masked Self-Attention"
          description="Attend only to previous positions—no peeking at future tokens"
          color="decoder"
        />
        <AttentionTypeCard
          number={2}
          title="Cross-Attention"
          description="Queries from decoder, keys and values from encoder output"
          color="encoder"
        />
        <AttentionTypeCard
          number={3}
          title="Feed-Forward"
          description="Same position-wise FFN as in the encoder"
          color="value"
        />
      </motion.div>

      {/* Masked attention visualization */}
      <Card className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Masked Self-Attention</h3>
          <button
            onClick={() => setShowMask(!showMask)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              showMask
                ? 'bg-accent-decoder/20 border-2 border-accent-decoder'
                : 'bg-surface-alt border-2 border-slate-200 dark:border-slate-700'
            )}
          >
            {showMask ? 'Mask: ON' : 'Mask: OFF'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Attention matrix */}
          <div className="flex flex-col items-center">
            <MatrixGrid
              data={maskedWeights}
              rowLabels={OUTPUT_TOKENS}
              colLabels={OUTPUT_TOKENS}
              showValues
              cellSize={50}
            />
            <p className="text-sm text-text-secondary mt-2">
              {showMask ? "Future positions are masked (0)" : "No masking—can see everything"}
            </p>
          </div>

          {/* Mask explanation */}
          <div className="max-w-xs">
            <div className="p-4 bg-surface rounded-lg">
              <h4 className="font-medium mb-2">Why mask?</h4>
              <p className="text-sm text-text-secondary mb-3">
                During training, we process all positions in parallel. But each position
                should only attend to positions before it—as if generating one token at a time.
              </p>
              <p className="text-sm text-text-secondary">
                The mask sets future positions to <span className="font-mono">-∞</span> before
                softmax, making their attention weights <span className="font-mono">0</span>.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Cross-attention explanation */}
      <Card className="mb-8">
        <h3 className="text-lg font-semibold mb-6">Cross-Attention: Connecting Encoder and Decoder</h3>

        <CrossAttentionVisualization />

        <div className="mt-6 p-4 bg-surface rounded-lg">
          <p className="text-sm text-text-secondary">
            In cross-attention, the <span className="text-accent-query font-medium">queries</span> come
            from the decoder, while the <span className="text-accent-key font-medium">keys</span> and{' '}
            <span className="text-accent-value font-medium">values</span> come from the encoder output.
            This allows each decoder position to attend to all positions in the input sequence.
          </p>
        </div>
      </Card>

      {/* Autoregressive generation */}
      <Card>
        <h3 className="text-lg font-semibold mb-6 text-center">
          Autoregressive Generation
        </h3>

        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            {OUTPUT_TOKENS.map((token, i) => (
              <motion.div
                key={i}
                className={cn(
                  'px-3 py-2 rounded-lg border-2 transition-all',
                  i <= currentStep
                    ? 'bg-accent-decoder/20 border-accent-decoder'
                    : 'bg-surface-alt border-slate-200 dark:border-slate-700 opacity-40'
                )}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: i <= currentStep ? 1 : 0.4 }}
                transition={{ delay: i * 0.1 }}
              >
                {token}
              </motion.div>
            ))}
          </div>

          {/* Step slider */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-text-secondary">Generation step:</span>
            <input
              type="range"
              min={0}
              max={OUTPUT_TOKENS.length - 1}
              value={currentStep}
              onChange={(e) => setCurrentStep(parseInt(e.target.value))}
              className="w-48 accent-accent-decoder"
            />
            <span className="font-mono text-sm">{currentStep + 1}</span>
          </div>

          <p className="text-center text-sm text-text-secondary">
            At step {currentStep + 1}, the model can see tokens 1-{currentStep + 1} and predicts token {currentStep + 2}
          </p>
        </div>
      </Card>
    </Section>
  )
}

function AttentionTypeCard({
  number,
  title,
  description,
  color,
}: {
  number: number
  title: string
  description: string
  color: 'decoder' | 'encoder' | 'value'
}) {
  const colorClasses = {
    decoder: 'bg-accent-decoder/10 border-accent-decoder/30',
    encoder: 'bg-accent-encoder/10 border-accent-encoder/30',
    value: 'bg-accent-value/10 border-accent-value/30',
  }

  return (
    <motion.div
      variants={fadeInUp}
      className={cn('p-5 rounded-xl border-2', colorClasses[color])}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="w-8 h-8 rounded-full bg-surface flex items-center justify-center font-bold text-sm">
          {number}
        </span>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="text-sm text-text-secondary">{description}</p>
    </motion.div>
  )
}

function CrossAttentionVisualization() {
  const encoderTokens = ["The", "cat", "sat"]
  const decoderTokens = ["Le", "chat"]

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 400 200" className="w-full max-w-lg">
        {/* Encoder tokens (top) */}
        {encoderTokens.map((token, i) => {
          const x = 80 + i * 100
          return (
            <g key={`enc-${i}`}>
              <rect
                x={x - 30}
                y={20}
                width={60}
                height={30}
                rx={6}
                className="fill-accent-encoder/20 stroke-accent-encoder"
                strokeWidth={2}
              />
              <text x={x} y={40} textAnchor="middle" className="fill-text-primary text-sm">
                {token}
              </text>
            </g>
          )
        })}

        {/* Label */}
        <text x={350} y={40} className="fill-text-secondary text-xs">
          Encoder
        </text>

        {/* Decoder tokens (bottom) */}
        {decoderTokens.map((token, i) => {
          const x = 130 + i * 100
          return (
            <g key={`dec-${i}`}>
              <rect
                x={x - 30}
                y={150}
                width={60}
                height={30}
                rx={6}
                className="fill-accent-decoder/20 stroke-accent-decoder"
                strokeWidth={2}
              />
              <text x={x} y={170} textAnchor="middle" className="fill-text-primary text-sm">
                {token}
              </text>
            </g>
          )
        })}

        <text x={350} y={170} className="fill-text-secondary text-xs">
          Decoder
        </text>

        {/* Attention arrows from decoder to encoder */}
        {decoderTokens.map((_, decIdx) => (
          encoderTokens.map((_, encIdx) => {
            const startX = 130 + decIdx * 100
            const startY = 150
            const endX = 80 + encIdx * 100
            const endY = 50
            const opacity = 0.3 + Math.random() * 0.5

            return (
              <motion.line
                key={`${decIdx}-${encIdx}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                className="stroke-accent-attention"
                strokeWidth={2}
                strokeOpacity={opacity}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: decIdx * 0.1 + encIdx * 0.05 }}
              />
            )
          })
        ))}

        {/* Labels for Q, K, V */}
        <text x={30} y={100} className="fill-accent-key text-xs">K, V</text>
        <text x={30} y={170} className="fill-accent-query text-xs">Q</text>
      </svg>
    </div>
  )
}
