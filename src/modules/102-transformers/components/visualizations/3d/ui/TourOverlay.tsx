import { motion, AnimatePresence } from 'framer-motion'
import { useVisualizationStore } from '../../../../stores/visualizationStore'
import { TOUR_STAGES } from '../../../../types/visualization'
import { cn } from '../../../../lib/utils'

export function TourOverlay() {
  const tourActive = useVisualizationStore((s) => s.tourActive)
  const tourStage = useVisualizationStore((s) => s.tourStage)
  const nextTourStage = useVisualizationStore((s) => s.nextTourStage)
  const endTour = useVisualizationStore((s) => s.endTour)

  if (!tourActive || tourStage === null) return null

  const currentStage = TOUR_STAGES[tourStage - 1]
  const isLastStage = tourStage === 4

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tourStage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 max-w-lg"
      >
        <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-2xl">
          {/* Stage indicator */}
          <div className="flex items-center gap-2 mb-3">
            {TOUR_STAGES.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  i + 1 === tourStage
                    ? 'bg-accent-attention scale-125'
                    : i + 1 < tourStage
                    ? 'bg-accent-attention/50'
                    : 'bg-slate-600'
                )}
              />
            ))}
            <span className="ml-2 text-xs text-slate-500">
              Stage {tourStage} of 4
            </span>
          </div>

          {/* Stage title */}
          <h3 className="text-xl font-bold text-white mb-2">{currentStage.title}</h3>

          {/* Stage dialogue */}
          <p className="text-slate-300 mb-4">{currentStage.dialogue}</p>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={endTour}
              className="text-sm text-slate-500 hover:text-white transition-colors"
            >
              Skip Tour
            </button>

            <button
              onClick={nextTourStage}
              className={cn(
                'px-6 py-2 rounded-lg font-medium transition-all',
                'bg-accent-attention hover:bg-accent-attention/80 text-white'
              )}
            >
              {isLastStage ? 'Start Exploring' : 'Next'}
            </button>
          </div>
        </div>

        {/* Pointer arrow */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900/95 border-l border-t border-slate-700 rotate-45" />
      </motion.div>
    </AnimatePresence>
  )
}
