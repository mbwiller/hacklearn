import { motion } from 'framer-motion'
import { useVisualizationStore } from '../../../../stores/visualizationStore'
import { cn } from '../../../../lib/utils'

export function ModeToggle() {
  const mode = useVisualizationStore((s) => s.mode)
  const tourActive = useVisualizationStore((s) => s.tourActive)
  const setMode = useVisualizationStore((s) => s.setMode)
  const startTour = useVisualizationStore((s) => s.startTour)
  const endTour = useVisualizationStore((s) => s.endTour)

  const handleModeChange = (newMode: 'guided' | 'explore') => {
    if (newMode === 'guided' && !tourActive) {
      startTour()
    } else if (newMode === 'explore' && tourActive) {
      endTour()
    }
    setMode(newMode)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/90 backdrop-blur-sm rounded-lg p-1 border border-slate-700 flex"
    >
      <ModeButton
        label="Guided Tour"
        isActive={mode === 'guided'}
        onClick={() => handleModeChange('guided')}
      />
      <ModeButton
        label="Free Explore"
        isActive={mode === 'explore'}
        onClick={() => handleModeChange('explore')}
      />
    </motion.div>
  )
}

interface ModeButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

function ModeButton({ label, isActive, onClick }: ModeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-md text-sm font-medium transition-all',
        isActive
          ? 'bg-accent-attention text-white'
          : 'text-slate-400 hover:text-white'
      )}
    >
      {label}
    </button>
  )
}
