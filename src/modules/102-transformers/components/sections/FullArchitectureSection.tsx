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
  return (
    <svg viewBox="0 0 500 600" className="w-full max-w-2xl mx-auto">
      {/* Background sections */}
      <rect x="30" y="100" width="180" height="380" rx="8"
            className="fill-accent-encoder/5 stroke-accent-encoder/30" strokeWidth="2" />
      <rect x="290" y="100" width="180" height="380" rx="8"
            className="fill-accent-decoder/5 stroke-accent-decoder/30" strokeWidth="2" />

      {/* Labels */}
      <text x="120" y="90" textAnchor="middle" className="fill-accent-encoder font-semibold text-sm">
        Encoder
      </text>
      <text x="380" y="90" textAnchor="middle" className="fill-accent-decoder font-semibold text-sm">
        Decoder
      </text>

      {/* Output */}
      <DiagramBlock
        x={380} y={30} width={100} height={30}
        label="Output Probs"
        component="softmax"
        hovered={hoveredComponent}
        onHover={onHover}
        color="slate"
      />
      <Arrow x={380} y1={60} y2={75} />

      <DiagramBlock
        x={380} y={75} width={100} height={25}
        label="Linear"
        component="linear"
        hovered={hoveredComponent}
        onHover={onHover}
        color="slate"
      />

      {/* Decoder stack */}
      <g transform="translate(290, 110)">
        <text x="90" y={10} textAnchor="middle" className="fill-text-secondary text-[10px]">×N</text>

        {/* Decoder FFN */}
        <DiagramBlock
          x={90} y={20} width={160} height={35}
          label="Feed Forward"
          component="decoder-ffn"
          hovered={hoveredComponent}
          onHover={onHover}
          color="value"
        />
        <text x={170} y={42} className="fill-text-secondary text-[8px]">Add & Norm</text>

        {/* Cross attention */}
        <DiagramBlock
          x={90} y={70} width={160} height={35}
          label="Cross-Attention"
          component="decoder-cross-attn"
          hovered={hoveredComponent}
          onHover={onHover}
          color="encoder"
        />
        <text x={170} y={92} className="fill-text-secondary text-[8px]">Add & Norm</text>

        {/* Masked self attention */}
        <DiagramBlock
          x={90} y={120} width={160} height={35}
          label="Masked Self-Attention"
          component="decoder-masked-attn"
          hovered={hoveredComponent}
          onHover={onHover}
          color="decoder"
        />
        <text x={170} y={142} className="fill-text-secondary text-[8px]">Add & Norm</text>
      </g>

      {/* Arrow from encoder to decoder (cross attention) */}
      <motion.path
        d="M 210 280 Q 250 280 330 220"
        fill="none"
        className="stroke-accent-encoder"
        strokeWidth="2"
        strokeDasharray="4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Encoder stack */}
      <g transform="translate(30, 110)">
        <text x="90" y={10} textAnchor="middle" className="fill-text-secondary text-[10px]">×N</text>

        {/* Encoder FFN */}
        <DiagramBlock
          x={90} y={20} width={160} height={35}
          label="Feed Forward"
          component="encoder-ffn"
          hovered={hoveredComponent}
          onHover={onHover}
          color="value"
        />
        <text x={170} y={42} className="fill-text-secondary text-[8px]">Add & Norm</text>

        {/* Self attention */}
        <DiagramBlock
          x={90} y={70} width={160} height={35}
          label="Multi-Head Attention"
          component="encoder-self-attn"
          hovered={hoveredComponent}
          onHover={onHover}
          color="attention"
        />
        <text x={170} y={92} className="fill-text-secondary text-[8px]">Add & Norm</text>
      </g>

      {/* Positional encoding */}
      <DiagramBlock
        x={120} y={340} width={120} height={25}
        label="+ Pos Encoding"
        component="positional-encoding"
        hovered={hoveredComponent}
        onHover={onHover}
        color="key"
      />
      <DiagramBlock
        x={380} y={340} width={120} height={25}
        label="+ Pos Encoding"
        component="positional-encoding"
        hovered={hoveredComponent}
        onHover={onHover}
        color="key"
      />

      {/* Embeddings */}
      <DiagramBlock
        x={120} y={380} width={120} height={30}
        label="Input Embedding"
        component="input-embedding"
        hovered={hoveredComponent}
        onHover={onHover}
        color="query"
      />
      <DiagramBlock
        x={380} y={380} width={120} height={30}
        label="Output Embedding"
        component="output-embedding"
        hovered={hoveredComponent}
        onHover={onHover}
        color="query"
      />

      {/* Arrows */}
      <Arrow x={120} y1={410} y2={430} />
      <Arrow x={380} y1={410} y2={430} />

      {/* Input/Output labels */}
      <text x="120" y="450" textAnchor="middle" className="fill-text-secondary text-xs">
        Inputs
      </text>
      <text x="380" y="450" textAnchor="middle" className="fill-text-secondary text-xs">
        Outputs (shifted right)
      </text>

      {/* Vertical arrows in stacks */}
      <Arrow x={120} y1={215} y2={335} />
      <Arrow x={380} y1={270} y2={335} />
      <Arrow x={380} y1={105} y2={110} />
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
    slate: { fill: 'fill-slate-200 dark:fill-slate-700', stroke: 'stroke-slate-400' },
  }

  return (
    <g
      onMouseEnter={() => onHover(component)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer"
    >
      <motion.rect
        x={x - width / 2}
        y={y}
        width={width}
        height={height}
        rx={4}
        className={cn(
          colorMap[color].fill,
          colorMap[color].stroke,
          'transition-all'
        )}
        strokeWidth={isHovered ? 3 : 1.5}
        animate={{ scale: isHovered ? 1.02 : 1 }}
      />
      <text
        x={x}
        y={y + height / 2 + 4}
        textAnchor="middle"
        className="fill-text-primary text-[10px] font-medium pointer-events-none"
      >
        {label}
      </text>
    </g>
  )
}

function Arrow({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return (
    <line
      x1={x}
      y1={y1}
      x2={x}
      y2={y2}
      className="stroke-slate-400"
      strokeWidth={1.5}
      markerEnd="url(#arrowhead)"
    />
  )
}
