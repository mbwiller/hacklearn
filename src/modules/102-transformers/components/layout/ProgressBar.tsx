import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-surface-alt z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-accent-query via-accent-attention to-accent-value"
        style={{ width: `${progress * 100}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  )
}
