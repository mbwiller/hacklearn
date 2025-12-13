import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Section, SectionHeader } from '../../components/layout/Section'
import { Card } from '../../components/ui/Card'
import { fadeInUp } from '../../lib/animations'
import { cn } from '../../lib/utils'

const EXAMPLE_TOKENS = ["The", "cat", "sat", "on", "the", "mat"]

export function SequentialBottleneckSection() {
  return (
    <Section id="sequential-bottleneck">
      <SectionHeader
        title="The Waiting Game"
        subtitle="Why recurrence became the bottleneck of sequence modeling"
      />

      <motion.div variants={fadeInUp} className="prose-custom mb-12">
        <p>
          Before Transformers, <strong>recurrent neural networks (RNNs)</strong> were the standard
          for processing sequences. They read input one token at a time, maintaining a hidden
          state that carries information forward.
        </p>
        <p className="mt-4">
          This sequential nature creates two fundamental problems:
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <ProblemCard
          number={1}
          title="The Parallelization Problem"
          description="Each step must wait for the previous step to complete. With 100 tokens, you need 100 sequential operations—GPUs sit idle while waiting."
        />
        <ProblemCard
          number={2}
          title="The Long-Range Dependency Problem"
          description="Information must travel through every intermediate step. Over long sequences, early information fades—like a game of telephone."
        />
      </div>

      <Card className="mb-12">
        <h3 className="text-lg font-semibold mb-6 text-center">
          RNN Processing: One Token at a Time
        </h3>
        <RNNVisualization />
      </Card>

      <motion.div variants={fadeInUp} className="prose-custom">
        <p>
          The hidden state <strong>h<sub>t</sub></strong> must compress all information from
          previous tokens. As sequences grow longer, this becomes an information bottleneck.
          The model struggles to remember what came at the beginning by the time it reaches
          the end.
        </p>
        <p className="mt-4 text-lg font-medium text-text-primary">
          What if we could process all tokens simultaneously?
        </p>
      </motion.div>
    </Section>
  )
}

function ProblemCard({ number, title, description }: {
  number: number
  title: string
  description: string
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="p-6 rounded-xl bg-red-500/5 border border-red-500/20"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center
                         text-red-600 dark:text-red-400 font-bold text-sm">
          {number}
        </span>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-text-secondary">{description}</p>
    </motion.div>
  )
}

function RNNVisualization() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % (EXAMPLE_TOKENS.length + 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className="space-y-6">
      {/* Token sequence */}
      <div className="flex justify-center gap-2 flex-wrap">
        {EXAMPLE_TOKENS.map((token, i) => (
          <motion.div
            key={i}
            className={cn(
              'px-4 py-2 rounded-lg border-2 transition-all duration-300',
              i < currentStep
                ? 'bg-accent-value/20 border-accent-value/50'
                : i === currentStep
                ? 'bg-accent-attention/20 border-accent-attention animate-pulse'
                : 'bg-surface-alt border-slate-200 dark:border-slate-700 opacity-50'
            )}
          >
            <span className="font-medium">{token}</span>
          </motion.div>
        ))}
      </div>

      {/* Hidden state progression */}
      <div className="flex justify-center items-center gap-2">
        {EXAMPLE_TOKENS.map((_, i) => (
          <div key={i} className="flex items-center">
            <motion.div
              className={cn(
                'w-12 h-12 rounded-lg flex items-center justify-center text-xs font-mono',
                'transition-all duration-300',
                i < currentStep
                  ? 'bg-accent-attention/30 border-2 border-accent-attention/50'
                  : 'bg-surface-alt border-2 border-slate-200 dark:border-slate-700 opacity-30'
              )}
            >
              h<sub>{i + 1}</sub>
            </motion.div>
            {i < EXAMPLE_TOKENS.length - 1 && (
              <motion.div
                className={cn(
                  'w-6 h-0.5 mx-1 transition-all duration-300',
                  i < currentStep - 1
                    ? 'bg-accent-attention/50'
                    : 'bg-slate-200 dark:bg-slate-700'
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Controls and info */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-text-secondary">
          Step: <span className="font-mono font-bold">{currentStep}</span> / {EXAMPLE_TOKENS.length}
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-2 rounded-lg bg-surface-alt border border-slate-200
                     dark:border-slate-700 hover:border-accent-attention transition-colors
                     text-sm font-medium"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div className="text-sm text-text-secondary">
          Sequential operations: <span className="font-mono font-bold text-red-500">O(n)</span>
        </div>
      </div>

      {/* Information decay visualization */}
      <div className="mt-8 p-4 bg-surface-alt rounded-lg">
        <div className="text-sm text-text-secondary mb-3">
          Information from "The" must travel through {EXAMPLE_TOKENS.length - 1} steps to reach "mat"
        </div>
        <div className="flex items-center gap-1">
          {EXAMPLE_TOKENS.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-4 rounded transition-all duration-300"
              style={{
                backgroundColor: `rgba(168, 85, 247, ${1 - i * 0.15})`,
                opacity: i <= currentStep ? 1 : 0.3,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-text-secondary mt-2">
          <span>Full information</span>
          <span>Information decay</span>
        </div>
      </div>
    </div>
  )
}
