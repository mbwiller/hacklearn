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
        <h3 className="text-lg font-semibold mb-2 text-center">
          Autoregressive Generation
        </h3>

        {/* Explanation */}
        <p className="text-sm text-text-secondary text-center mb-6 max-w-md mx-auto">
          <strong className="text-text-primary">Autoregressive</strong> means generating one token at a time,
          using all previous tokens to predict the next one.
        </p>

        <div className="space-y-6">
          {/* Token visualization */}
          <div className="flex justify-center items-center gap-2 flex-wrap">
            {OUTPUT_TOKENS.map((token, i) => {
              const isPast = i < currentStep
              const isCurrent = i === currentStep
              const isNext = i === currentStep + 1
              const isFuture = i > currentStep + 1

              return (
                <div key={i} className="flex items-center gap-1">
                  <motion.div
                    className={cn(
                      'px-4 py-2 rounded-lg border-2 transition-all relative',
                      isPast && 'bg-accent-decoder/20 border-accent-decoder',
                      isCurrent && 'bg-accent-decoder/30 border-accent-decoder ring-2 ring-accent-decoder/50',
                      isNext && 'bg-accent-attention/20 border-accent-attention border-dashed',
                      isFuture && 'bg-surface-alt border-slate-300 dark:border-slate-600 opacity-30'
                    )}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{
                      scale: isCurrent ? 1.05 : 1,
                      opacity: isFuture ? 0.3 : 1
                    }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className={cn(
                      'font-medium',
                      isFuture && 'opacity-50'
                    )}>
                      {token}
                    </span>
                    {/* Labels */}
                    {isCurrent && (
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-accent-decoder whitespace-nowrap">
                        current input
                      </span>
                    )}
                    {isNext && currentStep < OUTPUT_TOKENS.length - 1 && (
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-accent-attention whitespace-nowrap">
                        predicting...
                      </span>
                    )}
                  </motion.div>

                  {/* Arrow between current and next token */}
                  {isCurrent && currentStep < OUTPUT_TOKENS.length - 1 && (
                    <motion.div
                      className="text-accent-attention"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-accent-decoder/20 border border-accent-decoder" />
              <span className="text-text-secondary">Visible tokens</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-accent-attention/20 border border-dashed border-accent-attention" />
              <span className="text-text-secondary">Being predicted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-surface-alt border border-slate-300 dark:border-slate-600 opacity-50" />
              <span className="text-text-secondary">Future (hidden)</span>
            </div>
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
            <span className="font-mono text-sm bg-surface-alt px-2 py-1 rounded">{currentStep + 1}/{OUTPUT_TOKENS.length}</span>
          </div>

          {/* Status text */}
          <div className="text-center p-3 bg-surface-alt rounded-lg">
            <p className="text-sm text-text-secondary">
              {currentStep === OUTPUT_TOKENS.length - 1 ? (
                <span>Generation complete! All {OUTPUT_TOKENS.length} tokens have been generated.</span>
              ) : (
                <span>
                  The model sees tokens <strong className="text-text-primary">1 through {currentStep + 1}</strong> and
                  predicts token <strong className="text-accent-attention">{currentStep + 2}</strong>
                </span>
              )}
            </p>
          </div>
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

  // Deterministic attention weights based on semantic alignment
  // "Le" attends mostly to "The", "chat" attends mostly to "cat"
  const attentionWeights = [
    [0.7, 0.2, 0.1],   // "Le" -> [The, cat, sat]
    [0.15, 0.7, 0.15], // "chat" -> [The, cat, sat]
  ]

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 450 220" className="w-full max-w-xl">
        {/* Background regions */}
        <rect x="45" y="10" width="240" height="55" rx="8"
              className="fill-accent-encoder/5 stroke-accent-encoder/20" strokeWidth="1" />
        <rect x="85" y="140" width="160" height="55" rx="8"
              className="fill-accent-decoder/5 stroke-accent-decoder/20" strokeWidth="1" />

        {/* Encoder label */}
        <text x="330" y="40" className="fill-accent-encoder font-semibold text-sm">
          Encoder Output
        </text>
        <text x="330" y="55" className="fill-text-secondary text-[10px]">
          (provides K, V)
        </text>

        {/* Encoder tokens (top) */}
        {encoderTokens.map((token, i) => {
          const x = 95 + i * 80
          return (
            <g key={`enc-${i}`}>
              <rect
                x={x - 30}
                y={20}
                width={60}
                height={35}
                rx={6}
                className="fill-white dark:fill-slate-800 stroke-accent-encoder"
                strokeWidth={2}
              />
              <text x={x} y={43} textAnchor="middle" className="fill-text-primary text-sm font-medium">
                {token}
              </text>
            </g>
          )
        })}

        {/* K, V arrow from encoder */}
        <g>
          <motion.path
            d="M 165 55 L 165 85"
            fill="none"
            className="stroke-accent-key"
            strokeWidth={2}
            strokeDasharray="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
          <text x="145" y="78" className="fill-accent-key font-semibold text-xs">K</text>
          <text x="175" y="78" className="fill-accent-value font-semibold text-xs">V</text>
        </g>

        {/* Decoder label */}
        <text x="330" y="165" className="fill-accent-decoder font-semibold text-sm">
          Decoder State
        </text>
        <text x="330" y="180" className="fill-text-secondary text-[10px]">
          (provides Q)
        </text>

        {/* Decoder tokens (bottom) */}
        {decoderTokens.map((token, i) => {
          const x = 125 + i * 80
          return (
            <g key={`dec-${i}`}>
              <rect
                x={x - 30}
                y={150}
                width={60}
                height={35}
                rx={6}
                className="fill-white dark:fill-slate-800 stroke-accent-decoder"
                strokeWidth={2}
              />
              <text x={x} y={173} textAnchor="middle" className="fill-text-primary text-sm font-medium">
                {token}
              </text>
            </g>
          )
        })}

        {/* Q arrow from decoder */}
        <g>
          <motion.path
            d="M 165 150 L 165 120"
            fill="none"
            className="stroke-accent-query"
            strokeWidth={2}
            strokeDasharray="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <text x="175" y="137" className="fill-accent-query font-semibold text-xs">Q</text>
        </g>

        {/* Attention arrows from decoder to encoder with varying opacity based on weights */}
        {decoderTokens.map((_, decIdx) => (
          encoderTokens.map((_, encIdx) => {
            const startX = 125 + decIdx * 80
            const startY = 150
            const endX = 95 + encIdx * 80
            const endY = 55
            const weight = attentionWeights[decIdx][encIdx]
            const strokeWidth = 1 + weight * 3 // 1-4px based on attention weight

            return (
              <motion.line
                key={`${decIdx}-${encIdx}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                className="stroke-accent-attention"
                strokeWidth={strokeWidth}
                strokeOpacity={0.3 + weight * 0.6}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + decIdx * 0.15 + encIdx * 0.08 }}
              />
            )
          })
        ))}

        {/* Attention weights legend */}
        <g transform="translate(10, 90)">
          <text x="0" y="0" className="fill-text-secondary text-[9px]">Attention</text>
          <text x="0" y="12" className="fill-text-secondary text-[9px]">strength:</text>
          <line x1="0" y1="22" x2="30" y2="22" className="stroke-accent-attention" strokeWidth="1" strokeOpacity="0.4" />
          <text x="35" y="25" className="fill-text-secondary text-[8px]">low</text>
          <line x1="0" y1="35" x2="30" y2="35" className="stroke-accent-attention" strokeWidth="3" strokeOpacity="0.8" />
          <text x="35" y="38" className="fill-text-secondary text-[8px]">high</text>
        </g>
      </svg>
    </div>
  )
}
