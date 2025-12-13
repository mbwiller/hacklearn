import { motion } from 'framer-motion'
import { useState } from 'react'
import { Section, SectionHeader } from '../../components/layout/Section'
import { Card } from '../../components/ui/Card'
import { EquationBlock, EQUATIONS } from '../../components/math/Equation'
import { fadeInUp, staggerContainer } from '../../lib/animations'
import { cn } from '../../lib/utils'
import { TRANSFORMER_CONFIG } from '../../data/constants'

type Component = 'self-attention' | 'add-norm-1' | 'ffn' | 'add-norm-2' | null

export function EncoderSection() {
  const [activeComponent, setActiveComponent] = useState<Component>(null)
  const [expandedLayer, setExpandedLayer] = useState<number | null>(0)

  return (
    <Section id="encoder">
      <SectionHeader
        title="Building the Encoder"
        subtitle={`${TRANSFORMER_CONFIG.N} identical layers, each refining the representation`}
      />

      <motion.div variants={fadeInUp} className="prose-custom mb-12">
        <p>
          The encoder processes the input sequence through a stack of <strong>{TRANSFORMER_CONFIG.N} identical layers</strong>.
          Each layer has two sub-layers: multi-head self-attention and a feed-forward network.
          Both are wrapped with residual connections and layer normalization.
        </p>
      </motion.div>

      {/* Layer stack visualization */}
      <Card className="mb-8">
        <h3 className="text-lg font-semibold mb-6 text-center">
          Encoder Stack
        </h3>

        <div className="flex flex-col items-center gap-2">
          {/* Output */}
          <motion.div
            variants={fadeInUp}
            className="px-6 py-3 bg-accent-encoder/20 border-2 border-accent-encoder rounded-lg"
          >
            Encoder Output
          </motion.div>

          <Arrow />

          {/* Layers */}
          {Array.from({ length: TRANSFORMER_CONFIG.N }).map((_, i) => {
            const layerNum = TRANSFORMER_CONFIG.N - 1 - i
            const isExpanded = expandedLayer === layerNum

            return (
              <motion.div
                key={layerNum}
                variants={fadeInUp}
                className="w-full max-w-md"
              >
                <button
                  onClick={() => setExpandedLayer(isExpanded ? null : layerNum)}
                  className={cn(
                    'w-full p-4 rounded-lg border-2 transition-all',
                    isExpanded
                      ? 'bg-accent-encoder/10 border-accent-encoder'
                      : 'bg-surface-alt border-slate-200 dark:border-slate-700 hover:border-accent-encoder/50'
                  )}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Encoder Layer {layerNum + 1}</span>
                    <span className="text-sm text-text-secondary">
                      {isExpanded ? '▼' : '▶'}
                    </span>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 space-y-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EncoderLayerDetail
                        activeComponent={activeComponent}
                        onComponentHover={setActiveComponent}
                      />
                    </motion.div>
                  )}
                </button>

                {i < TRANSFORMER_CONFIG.N - 1 && <Arrow />}
              </motion.div>
            )
          })}

          <Arrow />

          {/* Input */}
          <div className="flex flex-col items-center gap-2">
            <motion.div
              variants={fadeInUp}
              className="px-4 py-2 bg-surface-alt rounded-lg text-sm"
            >
              + Positional Encoding
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="px-6 py-3 bg-accent-query/20 border-2 border-accent-query rounded-lg"
            >
              Input Embeddings
            </motion.div>
          </div>
        </div>
      </Card>

      {/* Component details */}
      <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-6 mb-8">
        <ComponentCard
          title="Self-Attention"
          description="Each position attends to all positions in the input"
          isActive={activeComponent === 'self-attention'}
          color="attention"
        >
          <p className="text-sm text-text-secondary">
            The query, key, and value all come from the same place—the output of the previous layer.
            This allows each position to gather relevant information from the entire sequence.
          </p>
        </ComponentCard>

        <ComponentCard
          title="Feed-Forward Network"
          description="Two linear transformations with ReLU activation"
          isActive={activeComponent === 'ffn'}
          color="value"
        >
          <EquationBlock
            latex={EQUATIONS.ffn}
            className="!my-4 !py-3"
          />
          <p className="text-sm text-text-secondary">
            Applied to each position independently. Inner dimension: {TRANSFORMER_CONFIG.d_ff}.
          </p>
        </ComponentCard>

        <ComponentCard
          title="Residual Connection"
          description="Add the input to the output of each sub-layer"
          isActive={activeComponent === 'add-norm-1' || activeComponent === 'add-norm-2'}
          color="query"
        >
          <p className="text-sm text-text-secondary">
            The residual connection allows gradients to flow directly through the network,
            making it easier to train deep models. Output: x + Sublayer(x)
          </p>
        </ComponentCard>

        <ComponentCard
          title="Layer Normalization"
          description="Normalize across the feature dimension"
          isActive={activeComponent === 'add-norm-1' || activeComponent === 'add-norm-2'}
          color="key"
        >
          <EquationBlock
            latex={EQUATIONS.layerNorm}
            className="!my-4 !py-3"
          />
          <p className="text-sm text-text-secondary">
            Applied after each residual connection. Helps stabilize training by ensuring
            consistent activation scales.
          </p>
        </ComponentCard>
      </motion.div>

      {/* Key numbers */}
      <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6">
        <NumberBadge label="d_model" value={TRANSFORMER_CONFIG.d_model} />
        <NumberBadge label="d_ff" value={TRANSFORMER_CONFIG.d_ff} />
        <NumberBadge label="Layers" value={TRANSFORMER_CONFIG.N} />
        <NumberBadge label="Dropout" value={TRANSFORMER_CONFIG.dropout} />
      </motion.div>
    </Section>
  )
}

function Arrow() {
  return (
    <div className="h-6 flex justify-center">
      <div className="w-0.5 h-full bg-slate-300 dark:bg-slate-600" />
    </div>
  )
}

function EncoderLayerDetail({
  activeComponent,
  onComponentHover,
}: {
  activeComponent: Component
  onComponentHover: (c: Component) => void
}) {
  const components: { id: Component; label: string; color: string }[] = [
    { id: 'self-attention', label: 'Multi-Head Self-Attention', color: 'bg-accent-attention/30' },
    { id: 'add-norm-1', label: 'Add & Norm', color: 'bg-accent-query/30' },
    { id: 'ffn', label: 'Feed Forward', color: 'bg-accent-value/30' },
    { id: 'add-norm-2', label: 'Add & Norm', color: 'bg-accent-query/30' },
  ]

  return (
    <div className="space-y-2">
      {components.map((comp) => (
        <div
          key={comp.id}
          className={cn(
            'px-3 py-2 rounded text-sm text-center transition-all cursor-pointer',
            comp.color,
            activeComponent === comp.id && 'ring-2 ring-accent-attention'
          )}
          onMouseEnter={() => onComponentHover(comp.id)}
          onMouseLeave={() => onComponentHover(null)}
        >
          {comp.label}
        </div>
      ))}
    </div>
  )
}

function ComponentCard({
  title,
  description,
  children,
  isActive,
  color,
}: {
  title: string
  description: string
  children: React.ReactNode
  isActive: boolean
  color: 'attention' | 'query' | 'key' | 'value'
}) {
  const colorClasses = {
    attention: 'border-accent-attention/50 bg-accent-attention/5',
    query: 'border-accent-query/50 bg-accent-query/5',
    key: 'border-accent-key/50 bg-accent-key/5',
    value: 'border-accent-value/50 bg-accent-value/5',
  }

  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        'p-6 rounded-xl border-2 transition-all',
        isActive ? colorClasses[color] : 'border-slate-200 dark:border-slate-700'
      )}
    >
      <h4 className="font-semibold text-lg mb-2">{title}</h4>
      <p className="text-sm text-text-secondary mb-4">{description}</p>
      {children}
    </motion.div>
  )
}

function NumberBadge({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-4 py-2 bg-surface-alt rounded-lg text-center">
      <div className="text-lg font-bold text-accent-attention">{value}</div>
      <div className="text-xs text-text-secondary">{label}</div>
    </div>
  )
}
