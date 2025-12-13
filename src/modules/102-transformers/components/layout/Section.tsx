import { motion } from 'framer-motion'
import { useInViewAnimation } from '../../hooks/useInViewAnimation'
import { staggerContainer } from '../../lib/animations'
import { cn } from '../../lib/utils'
import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  dark?: boolean
}

export function Section({ id, children, className, dark }: SectionProps) {
  const { ref, animationProps } = useInViewAnimation({ threshold: 0.2 })

  return (
    <section
      id={id}
      className={cn(
        'section-container',
        dark && 'bg-surface-alt',
        className
      )}
    >
      <motion.div
        ref={ref}
        className="section-content"
        variants={staggerContainer}
        {...animationProps}
      >
        {children}
      </motion.div>
    </section>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <motion.header
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
    >
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.header>
  )
}
