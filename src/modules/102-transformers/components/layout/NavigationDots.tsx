import { motion } from 'framer-motion'
import { SECTION_IDS } from '../../data/constants'
import { cn } from '../../lib/utils'

interface NavigationDotsProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
}

const sectionLabels: Record<string, string> = {
  'hero': 'Introduction',
  'sequential-bottleneck': 'The Problem',
  'attention-paradigm': 'Attention',
  'query-key-value': 'Q, K, V',
  'scaling': 'Scaling',
  'multi-head': 'Multi-Head',
  'positional-encoding': 'Position',
  'encoder': 'Encoder',
  'decoder': 'Decoder',
  'full-architecture': 'Architecture',
  'results': 'Results',
  'living-architecture': '3D View',
}

export function NavigationDots({ activeSection, onNavigate }: NavigationDotsProps) {
  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <ul className="flex flex-col gap-3">
        {SECTION_IDS.map((id) => {
          const isActive = activeSection === id

          return (
            <li key={id} className="relative group">
              <button
                onClick={() => onNavigate(id)}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  'border-2 border-slate-300 dark:border-slate-600',
                  'hover:border-accent-attention hover:scale-125',
                  isActive && 'bg-accent-attention border-accent-attention scale-125'
                )}
                aria-label={`Navigate to ${sectionLabels[id]}`}
              />

              {/* Tooltip */}
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute right-6 top-1/2 -translate-y-1/2 px-2 py-1
                           bg-surface-elevated rounded text-xs font-medium
                           whitespace-nowrap pointer-events-none
                           shadow-lg border border-slate-200 dark:border-slate-700
                           opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {sectionLabels[id]}
              </motion.span>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
