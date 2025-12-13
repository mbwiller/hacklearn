import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { Section, SectionHeader } from '../../components/layout/Section'
import { Card } from '../../components/ui/Card'
import { EquationBlock, Equation } from '../../components/math/Equation'
import { fadeInUp } from '../../lib/animations'
import { softmax } from '../../lib/utils'

export function ScalingSection() {
  const [d_k, setD_k] = useState(64)

  // Simulate dot products at different dimensions
  const simulatedScores = useMemo(() => {
    // Variance of dot product grows with d_k
    const variance = Math.sqrt(d_k)
    return [
      variance * 0.8,
      variance * 0.3,
      variance * 0.1,
      variance * -0.2,
      variance * -0.5,
    ]
  }, [d_k])

  const unscaledSoftmax = softmax(simulatedScores)
  const scaledSoftmax = softmax(simulatedScores.map(s => s / Math.sqrt(d_k)))

  return (
    <Section id="scaling" dark>
      <SectionHeader
        title="Why √d_k?"
        subtitle="The crucial scaling factor that keeps gradients healthy"
      />

      <motion.div variants={fadeInUp} className="prose-custom mb-12">
        <p>
          The attention equation divides by <Equation latex="\sqrt{d_k}" /> before applying softmax.
          This small detail is <strong>crucial</strong> for training stability.
        </p>
      </motion.div>

      {/* The Problem */}
      <Card className="mb-8">
        <h3 className="text-lg font-semibold mb-4">The Problem: Variance Explosion</h3>

        <div className="space-y-4">
          <p className="text-text-secondary">
            When we compute <Equation latex="q \cdot k = \sum_{i=1}^{d_k} q_i k_i" />, we're summing{' '}
            <span className="font-mono">d_k</span> products of random values.
          </p>

          <div className="p-4 bg-surface rounded-lg">
            <p className="text-sm text-text-secondary mb-2">
              If q and k have unit variance, the variance of their dot product is:
            </p>
            <div className="text-center">
              <Equation latex="\text{Var}(q \cdot k) = d_k" displayMode />
            </div>
          </div>

          <p className="text-text-secondary">
            With <span className="font-mono">d_k = 64</span>, dot products can easily reach
            values of ±20 or more. When these large values go into softmax...
          </p>
        </div>
      </Card>

      {/* Interactive Comparison */}
      <Card className="mb-8">
        <h3 className="text-lg font-semibold mb-6 text-center">
          Softmax Behavior: Scaled vs Unscaled
        </h3>

        {/* d_k slider */}
        <div className="mb-8">
          <label className="block text-sm text-text-secondary mb-2">
            Key dimension (d_k): <span className="font-mono font-bold">{d_k}</span>
          </label>
          <input
            type="range"
            min="8"
            max="512"
            step="8"
            value={d_k}
            onChange={(e) => setD_k(parseInt(e.target.value))}
            className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer
                       accent-accent-attention"
          />
          <div className="flex justify-between text-xs text-text-secondary mt-1">
            <span>8</span>
            <span>256</span>
            <span>512</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Without scaling */}
          <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20">
            <h4 className="font-medium mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              Without Scaling
            </h4>
            <SoftmaxBars values={unscaledSoftmax} colorClass="bg-red-500" />
            <div className="mt-4 text-xs text-text-secondary">
              <p>Max weight: {(Math.max(...unscaledSoftmax) * 100).toFixed(1)}%</p>
              <p className="text-red-500 mt-1">
                {Math.max(...unscaledSoftmax) > 0.9 && "⚠️ Near one-hot: gradients vanish!"}
              </p>
            </div>
          </div>

          {/* With scaling */}
          <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
            <h4 className="font-medium mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              With √d_k Scaling
            </h4>
            <SoftmaxBars values={scaledSoftmax} colorClass="bg-green-500" />
            <div className="mt-4 text-xs text-text-secondary">
              <p>Max weight: {(Math.max(...scaledSoftmax) * 100).toFixed(1)}%</p>
              <p className="text-green-500 mt-1">
                ✓ Smooth distribution: healthy gradients
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Why this matters */}
      <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
          <h4 className="font-semibold mb-3 text-red-600 dark:text-red-400">
            Without Scaling
          </h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>• Softmax outputs become near-deterministic</li>
            <li>• One token gets ~100% attention</li>
            <li>• Gradients in saturated regions → 0</li>
            <li>• Model stops learning: vanishing gradients</li>
          </ul>
        </div>

        <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20">
          <h4 className="font-semibold mb-3 text-green-600 dark:text-green-400">
            With Scaling
          </h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>• Softmax outputs remain differentiable</li>
            <li>• Attention is distributed across tokens</li>
            <li>• Gradients flow through all connections</li>
            <li>• Stable training at any dimension</li>
          </ul>
        </div>
      </motion.div>

      {/* The equation */}
      <motion.div variants={fadeInUp}>
        <EquationBlock
          latex={String.raw`\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\colorbox{yellow}{$\sqrt{d_k}$}}\right)V`}
          caption="Dividing by √d_k normalizes variance back to 1, keeping softmax in its useful range"
        />
      </motion.div>
    </Section>
  )
}

function SoftmaxBars({ values, colorClass }: { values: number[]; colorClass: string }) {
  return (
    <div className="space-y-2">
      {values.map((value, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-xs font-mono w-8">t{i}</span>
          <div className="flex-1 h-6 bg-surface rounded overflow-hidden">
            <motion.div
              className={`h-full ${colorClass}`}
              initial={{ width: 0 }}
              animate={{ width: `${value * 100}%` }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            />
          </div>
          <span className="text-xs font-mono w-12 text-right">
            {(value * 100).toFixed(1)}%
          </span>
        </div>
      ))}
    </div>
  )
}
