import { motion } from 'framer-motion'
import { fadeInUp } from '../../lib/animations'
import { cn } from '../../lib/utils'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
}

export function Card({ children, className, hoverable }: CardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        'viz-container',
        hoverable && 'hover:border-accent-attention/50 transition-colors',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

interface StatCardProps {
  value: string | number
  label: string
  highlight?: boolean
}

export function StatCard({ value, label, highlight }: StatCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        'p-6 rounded-xl text-center',
        highlight
          ? 'bg-accent-attention/10 border border-accent-attention/30'
          : 'bg-surface-alt border border-slate-200 dark:border-slate-700'
      )}
    >
      <div className={cn(
        'text-4xl font-bold mb-2',
        highlight && 'text-accent-attention'
      )}>
        {value}
      </div>
      <div className="text-sm text-text-secondary">{label}</div>
    </motion.div>
  )
}
