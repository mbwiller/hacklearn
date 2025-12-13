import { useEffect, useRef } from 'react'
import katex from 'katex'
import { motion } from 'framer-motion'
import { fadeIn } from '../../lib/animations'
import { cn } from '../../lib/utils'

interface EquationProps {
  latex: string
  displayMode?: boolean
  className?: string
}

export function Equation({ latex, displayMode = false, className }: EquationProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      katex.render(latex, containerRef.current, {
        displayMode,
        throwOnError: false,
        trust: true,
      })
    }
  }, [latex, displayMode])

  return (
    <span
      ref={containerRef}
      className={cn('katex-container', className)}
    />
  )
}

interface EquationBlockProps {
  latex: string
  label?: string
  caption?: string
  className?: string
}

export function EquationBlock({ latex, label, caption, className }: EquationBlockProps) {
  return (
    <motion.div
      variants={fadeIn}
      className={cn('equation-block relative', className)}
    >
      <div className="flex items-center justify-center gap-4">
        <Equation latex={latex} displayMode />
        {label && (
          <span className="text-text-secondary text-sm font-mono">
            {label}
          </span>
        )}
      </div>
      {caption && (
        <p className="text-center text-sm text-text-secondary mt-4">
          {caption}
        </p>
      )}
    </motion.div>
  )
}

// Pre-defined equations from the paper
export const EQUATIONS = {
  attention: String.raw`\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V`,

  multiHead: String.raw`\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h)W^O`,

  headI: String.raw`\text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)`,

  positionalEncodingSin: String.raw`PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)`,

  positionalEncodingCos: String.raw`PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)`,

  ffn: String.raw`\text{FFN}(x) = \max(0, xW_1 + b_1)W_2 + b_2`,

  layerNorm: String.raw`\text{LayerNorm}(x + \text{Sublayer}(x))`,

  softmax: String.raw`\text{softmax}(x_i) = \frac{e^{x_i}}{\sum_j e^{x_j}}`,

  dotProduct: String.raw`Q \cdot K^T = \sum_{i=1}^{d_k} q_i \cdot k_i`,

  variance: String.raw`\text{Var}(q \cdot k) = d_k`,
}
