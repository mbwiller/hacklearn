import { motion } from 'framer-motion'
import { useState } from 'react'
import { Section, SectionHeader } from '../../components/layout/Section'
import { Card } from '../../components/ui/Card'
import { fadeInUp } from '../../lib/animations'
import { cn } from '../../lib/utils'
import { TRANSFORMER_CONFIG } from '../../data/constants'

type ArchComponent =
  | 'input-embedding'
  | 'output-embedding'
  | 'positional-encoding'
  | 'encoder-self-attn'
  | 'encoder-ffn'
  | 'decoder-masked-attn'
  | 'decoder-cross-attn'
  | 'decoder-ffn'
  | 'linear'
  | 'softmax'
  | null

const componentInfo: Record<Exclude<ArchComponent, null>, { title: string; description: string }> = {
  'input-embedding': {
    title: 'Input Embedding',
    description: 'Converts input tokens to d_model-dimensional vectors. Weights are shared with output embedding.',
  },
  'output-embedding': {
    title: 'Output Embedding',
    description: 'Converts output tokens to vectors. Shares weights with input embedding.',
  },
  'positional-encoding': {
    title: 'Positional Encoding',
    description: 'Adds position information using sine and cosine functions.',
  },
  'encoder-self-attn': {
    title: 'Encoder Self-Attention',
    description: 'Each position attends to all positions. Q, K, V all come from encoder.',
  },
  'encoder-ffn': {
    title: 'Encoder Feed-Forward',
    description: 'Two linear layers with ReLU. Applied independently to each position.',
  },
  'decoder-masked-attn': {
    title: 'Masked Self-Attention',
    description: 'Self-attention with causal mask. Can only attend to previous positions.',
  },
  'decoder-cross-attn': {
    title: 'Encoder-Decoder Attention',
    description: 'Q from decoder, K and V from encoder. Connects decoder to input.',
  },
  'decoder-ffn': {
    title: 'Decoder Feed-Forward',
    description: 'Same structure as encoder FFN. Applied position-wise.',
  },
  'linear': {
    title: 'Linear Projection',
    description: 'Projects to vocabulary size. Shares weights with embedding layers.',
  },
  'softmax': {
    title: 'Softmax',
    description: 'Converts logits to probability distribution over vocabulary.',
  },
}

export function FullArchitectureSection() {
  const [hoveredComponent, setHoveredComponent] = useState<ArchComponent>(null)

  return (
    <Section id="full-architecture">
      <SectionHeader
        title="The Complete Architecture"
        subtitle="All the pieces working together"
      />

      <motion.div variants={fadeInUp} className="prose-custom mb-8 text-center">
        <p>
          The full Transformer brings together everything we've explored.
          Hover over any component to learn more.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Architecture diagram */}
        <Card className="flex-1 p-4 sm:p-8">
          <ArchitectureDiagram
            hoveredComponent={hoveredComponent}
            onHover={setHoveredComponent}
          />
        </Card>

        {/* Info panel */}
        <div className="lg:w-80 lg:sticky lg:top-8">
          <Card className="p-6">
            {hoveredComponent ? (
              <motion.div
                key={hoveredComponent}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="font-semibold text-lg mb-2">
                  {componentInfo[hoveredComponent].title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {componentInfo[hoveredComponent].description}
                </p>
              </motion.div>
            ) : (
              <div className="text-center text-text-secondary">
                <p className="text-sm">Hover over a component to see details</p>
              </div>
            )}

            {/* Key numbers */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h4 className="font-medium mb-3 text-sm">Architecture Parameters</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-text-secondary">Layers (N)</div>
                <div className="font-mono">{TRANSFORMER_CONFIG.N}</div>
                <div className="text-text-secondary">d_model</div>
                <div className="font-mono">{TRANSFORMER_CONFIG.d_model}</div>
                <div className="text-text-secondary">d_ff</div>
                <div className="font-mono">{TRANSFORMER_CONFIG.d_ff}</div>
                <div className="text-text-secondary">Heads (h)</div>
                <div className="font-mono">{TRANSFORMER_CONFIG.h}</div>
                <div className="text-text-secondary">d_k = d_v</div>
                <div className="font-mono">{TRANSFORMER_CONFIG.d_k}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Weight sharing note */}
      <motion.div variants={fadeInUp} className="mt-8">
        <Card className="p-6 bg-accent-attention/5 border-accent-attention/20">
          <h4 className="font-semibold mb-2">Weight Sharing</h4>
          <p className="text-sm text-text-secondary">
            The Transformer shares weights between three places: the input embedding layer,
            the output embedding layer, and the pre-softmax linear transformation.
            This reduces parameters and improves generalization.
          </p>
        </Card>
      </motion.div>
    </Section>
  )
}

function ArchitectureDiagram({
  hoveredComponent,
  onHover,
}: {
  hoveredComponent: ArchComponent
  onHover: (c: ArchComponent) => void
}) {
  // Layer positions for visual stacking
  const encoderLayerY = [155, 245, 335]
  const decoderLayerY = [155, 265, 375]

  return (
    <svg viewBox="0 0 620 720" className="w-full max-w-3xl mx-auto">
      {/* Definitions */}
      <defs>
        <marker id="arrow-down" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 z" className="fill-slate-400 dark:fill-slate-500" />
        </marker>
        <marker id="arrow-right" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 z" className="fill-accent-encoder" />
        </marker>
        {/* Gradient for stacked layers indication */}
        <linearGradient id="stack-fade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* ========== OUTPUT SECTION ========== */}
      <g transform="translate(430, 15)">
        <DiagramBlock
          x={0} y={0} width={130} height={35}
          label="Output Probabilities"
          component="softmax"
          hovered={hoveredComponent}
          onHover={onHover}
          color="slate"
        />
        <line x1="0" y1="35" x2="0" y2="55" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" markerEnd="url(#arrow-down)" />

        <DiagramBlock
          x={0} y={55} width={130} height={35}
          label="Linear Layer"
          component="linear"
          hovered={hoveredComponent}
          onHover={onHover}
          color="slate"
        />
        <line x1="0" y1="90" x2="0" y2="110" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" markerEnd="url(#arrow-down)" />
      </g>

      {/* ========== ENCODER SECTION ========== */}
      <g transform="translate(20, 110)">
        {/* Encoder background */}
        <rect x="30" y="10" width="200" height="430" rx="12"
              className="fill-accent-encoder/5 stroke-accent-encoder/30" strokeWidth="2" />

        {/* Encoder title */}
        <text x="130" y="35" textAnchor="middle" className="fill-accent-encoder font-bold text-base">
          Encoder
        </text>
        <text x="130" y="52" textAnchor="middle" className="fill-text-secondary text-xs">
          N = 6 layers
        </text>

        {/* Stacked layers representation */}
        {encoderLayerY.map((y, layerIdx) => (
          <g key={`enc-layer-${layerIdx}`} transform={`translate(130, ${y})`}>
            {/* Layer container */}
            <rect x="-75" y="-5" width="150" height="80" rx="8"
                  className="fill-white dark:fill-slate-800/50 stroke-slate-200 dark:stroke-slate-700"
                  strokeWidth="1" />

            {/* FFN */}
            <DiagramBlock
              x={0} y={0} width={130} height={30}
              label="Feed-Forward"
              component="encoder-ffn"
              hovered={hoveredComponent}
              onHover={onHover}
              color="value"
            />
            <text x="75" y="18" className="fill-text-secondary text-[10px]">Add & Norm</text>

            {/* Self-Attention */}
            <DiagramBlock
              x={0} y={40} width={130} height={30}
              label="Multi-Head Attention"
              component="encoder-self-attn"
              hovered={hoveredComponent}
              onHover={onHover}
              color="attention"
            />
            <text x="75" y="58" className="fill-text-secondary text-[10px]">Add & Norm</text>

            {/* Layer number */}
            <text x="-85" y="40" className="fill-text-secondary text-xs font-mono">
              L{layerIdx === 0 ? '1' : layerIdx === 1 ? '...' : '6'}
            </text>
          </g>
        ))}

        {/* Arrows between layers */}
        <line x1="130" y1="230" x2="130" y2="240" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" markerEnd="url(#arrow-down)" />
        <line x1="130" y1="320" x2="130" y2="330" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" markerEnd="url(#arrow-down)" />

        {/* Positional Encoding */}
        <DiagramBlock
          x={130} y={450} width={130} height={30}
          label="+ Positional Encoding"
          component="positional-encoding"
          hovered={hoveredComponent}
          onHover={onHover}
          color="key"
        />
        <line x1="130" y1="410" x2="130" y2="445" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" markerEnd="url(#arrow-down)" />

        {/* Input Embedding */}
        <DiagramBlock
          x={130} y={500} width={130} height={35}
          label="Input Embedding"
          component="input-embedding"
          hovered={hoveredComponent}
          onHover={onHover}
          color="query"
        />
        <line x1="130" y1="480" x2="130" y2="495" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" markerEnd="url(#arrow-down)" />

        {/* Input label */}
        <text x="130" y="555" textAnchor="middle" className="fill-text-secondary text-sm font-medium">
          Input Sequence
        </text>
        <line x1="130" y1="535" x2="130" y2="545" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" markerEnd="url(#arrow-down)" />
      </g>

      {/* ========== DECODER SECTION ========== */}
      <g transform="translate(340, 110)">
        {/* Decoder background */}
        <rect x="30" y="10" width="200" height="430" rx="12"
              className="fill-accent-decoder/5 stroke-accent-decoder/30" strokeWidth="2" />

        {/* Decoder title */}
        <text x="130" y="35" textAnchor="middle" className="fill-accent-decoder font-bold text-base">
          Decoder
        </text>
        <text x="130" y="52" textAnchor="middle" className="fill-text-secondary text-xs">
          N = 6 layers
        </text>

        {/* Stacked layers representation */}
        {decoderLayerY.map((y, layerIdx) => (
          <g key={`dec-layer-${layerIdx}`} transform={`translate(130, ${y})`}>
            {/* Layer container */}
            <rect x="-75" y="-5" width="150" height="100" rx="8"
                  className="fill-white dark:fill-slate-800/50 stroke-slate-200 dark:stroke-slate-700"
                  strokeWidth="1" />

            {/* FFN */}
            <DiagramBlock
              x={0} y={0} width={130} height={26}
              label="Feed-Forward"
              component="decoder-ffn"
              hovered={hoveredComponent}
              onHover={onHover}
              color="value"
            />
            <text x="75" y="16" className="fill-text-secondary text-[9px]">Add & Norm</text>

            {/* Cross-Attention */}
            <DiagramBlock
              x={0} y={32} width={130} height={26}
              label="Cross-Attention"
              component="decoder-cross-attn"
              hovered={hoveredComponent}
              onHover={onHover}
              color="encoder"
            />
            <text x="75" y="48" className="fill-text-secondary text-[9px]">Add & Norm</text>

            {/* Masked Self-Attention */}
            <DiagramBlock
              x={0} y={64} width={130} height={26}
              label="Masked Self-Attn"
              component="decoder-masked-attn"
              hovered={hoveredComponent}
              onHover={onHover}
              color="decoder"
            />
            <text x="75" y="80" className="fill-text-secondary text-[9px]">Add & Norm</text>

            {/* Layer number */}
            <text x="-85" y="50" className="fill-text-secondary text-xs font-mono">
              L{layerIdx === 0 ? '1' : layerIdx === 1 ? '...' : '6'}
            </text>
          </g>
        ))}

        {/* Arrows between layers */}
        <line x1="130" y1="260" x2="130" y2="255" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" markerEnd="url(#arrow-down)" />
        <line x1="130" y1="370" x2="130" y2="360" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" markerEnd="url(#arrow-down)" />

        {/* Positional Encoding */}
        <DiagramBlock
          x={130} y={500} width={130} height={30}
          label="+ Positional Encoding"
          component="positional-encoding"
          hovered={hoveredComponent}
          onHover={onHover}
          color="key"
        />
        <line x1="130" y1="475" x2="130" y2="495" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" markerEnd="url(#arrow-down)" />

        {/* Output Embedding */}
        <DiagramBlock
          x={130} y={550} width={130} height={35}
          label="Output Embedding"
          component="output-embedding"
          hovered={hoveredComponent}
          onHover={onHover}
          color="query"
        />
        <line x1="130" y1="530" x2="130" y2="545" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" markerEnd="url(#arrow-down)" />

        {/* Output label */}
        <text x="130" y="605" textAnchor="middle" className="fill-text-secondary text-sm font-medium">
          Output Sequence
        </text>
        <text x="130" y="620" textAnchor="middle" className="fill-text-secondary text-[10px]">
          (shifted right)
        </text>
        <line x1="130" y1="585" x2="130" y2="593" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" markerEnd="url(#arrow-down)" />
      </g>

      {/* ========== CROSS-ATTENTION CONNECTIONS ========== */}
      {/* Curved arrow from encoder to decoder cross-attention */}
      <motion.path
        d="M 250 350 C 290 350 290 300 330 300"
        fill="none"
        className="stroke-accent-encoder"
        strokeWidth="3"
        strokeDasharray="6 3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        markerEnd="url(#arrow-right)"
      />
      <text x="290" y="290" textAnchor="middle" className="fill-accent-encoder text-xs font-semibold">
        K, V
      </text>

      {/* Additional encoder output arrow */}
      <motion.path
        d="M 250 280 C 285 280 285 205 320 205"
        fill="none"
        className="stroke-accent-encoder"
        strokeWidth="2"
        strokeDasharray="4 2"
        strokeOpacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.7 }}
      />

      {/* Legend */}
      <g transform="translate(20, 680)">
        <text x="0" y="0" className="fill-text-secondary text-xs font-semibold">Data Flow:</text>
        <line x1="70" y1="-3" x2="100" y2="-3" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" markerEnd="url(#arrow-down)" />
        <text x="105" y="0" className="fill-text-secondary text-[10px]">Sequential</text>

        <line x1="180" y1="-3" x2="210" y2="-3" className="stroke-accent-encoder" strokeWidth="2" strokeDasharray="4 2" />
        <text x="215" y="0" className="fill-text-secondary text-[10px]">Cross-attention (K,V from encoder)</text>
      </g>
    </svg>
  )
}

function DiagramBlock({
  x,
  y,
  width,
  height,
  label,
  component,
  hovered,
  onHover,
  color,
}: {
  x: number
  y: number
  width: number
  height: number
  label: string
  component: ArchComponent
  hovered: ArchComponent
  onHover: (c: ArchComponent) => void
  color: 'encoder' | 'decoder' | 'attention' | 'query' | 'key' | 'value' | 'slate'
}) {
  const isHovered = hovered === component
  const colorMap = {
    encoder: { fill: 'fill-accent-encoder/20', stroke: 'stroke-accent-encoder' },
    decoder: { fill: 'fill-accent-decoder/20', stroke: 'stroke-accent-decoder' },
    attention: { fill: 'fill-accent-attention/20', stroke: 'stroke-accent-attention' },
    query: { fill: 'fill-accent-query/20', stroke: 'stroke-accent-query' },
    key: { fill: 'fill-accent-key/20', stroke: 'stroke-accent-key' },
    value: { fill: 'fill-accent-value/20', stroke: 'stroke-accent-value' },
    slate: { fill: 'fill-slate-100 dark:fill-slate-700', stroke: 'stroke-slate-400 dark:stroke-slate-500' },
  }

  return (
    <g
      onMouseEnter={() => onHover(component)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer"
      style={{ transform: isHovered ? 'scale(1.03)' : 'scale(1)', transformOrigin: `${x}px ${y + height/2}px`, transition: 'transform 0.2s ease-out' }}
    >
      <motion.rect
        x={x - width / 2}
        y={y}
        width={width}
        height={height}
        rx={6}
        className={cn(
          colorMap[color].fill,
          colorMap[color].stroke,
          'transition-all duration-200'
        )}
        strokeWidth={isHovered ? 2.5 : 1.5}
        style={{
          filter: isHovered ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' : 'none'
        }}
      />
      <text
        x={x}
        y={y + height / 2 + 4}
        textAnchor="middle"
        className="fill-text-primary text-xs font-medium pointer-events-none"
      >
        {label}
      </text>
    </g>
  )
}
