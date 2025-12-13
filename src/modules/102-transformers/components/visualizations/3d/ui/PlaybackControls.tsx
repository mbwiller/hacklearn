import { motion } from 'framer-motion'
import { useVisualizationStore } from '../../../../stores/visualizationStore'
import { ANIMATION_STEPS, STEP_LABELS } from '../../../../types/visualization'
import { cn } from '../../../../lib/utils'

export function PlaybackControls() {
  const playback = useVisualizationStore((s) => s.animation.playback)
  const speed = useVisualizationStore((s) => s.animation.speed)
  const stepIndex = useVisualizationStore((s) => s.animation.stepIndex)

  const togglePlayback = useVisualizationStore((s) => s.togglePlayback)
  const setSpeed = useVisualizationStore((s) => s.setSpeed)
  const nextStep = useVisualizationStore((s) => s.nextStep)
  const prevStep = useVisualizationStore((s) => s.prevStep)
  const goToStep = useVisualizationStore((s) => s.goToStep)

  const currentStep = ANIMATION_STEPS[stepIndex]
  const stepLabel = STEP_LABELS[currentStep]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/90 backdrop-blur-sm rounded-xl px-6 py-4 border border-slate-700"
    >
      <div className="flex flex-col gap-3">
        {/* Main controls */}
        <div className="flex items-center justify-center gap-2">
          {/* Jump to start */}
          <ControlButton onClick={() => goToStep(0)} title="Jump to start">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
            </svg>
          </ControlButton>

          {/* Previous step */}
          <ControlButton onClick={prevStep} title="Previous step" disabled={stepIndex === 0}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
            </svg>
          </ControlButton>

          {/* Play/Pause */}
          <button
            onClick={togglePlayback}
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center',
              'bg-accent-attention hover:bg-accent-attention/80',
              'transition-all duration-200 hover:scale-105'
            )}
            title={playback === 'playing' ? 'Pause' : 'Play'}
          >
            {playback === 'playing' ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            )}
          </button>

          {/* Next step */}
          <ControlButton
            onClick={nextStep}
            title="Next step"
            disabled={stepIndex === ANIMATION_STEPS.length - 1}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </ControlButton>

          {/* Jump to end */}
          <ControlButton
            onClick={() => goToStep(ANIMATION_STEPS.length - 1)}
            title="Jump to end"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zm2 0V6l8.5 6L8 18zm8-12h2v12h-2V6z" />
            </svg>
          </ControlButton>

          {/* Separator */}
          <div className="w-px h-8 bg-slate-600 mx-2" />

          {/* Speed controls */}
          <div className="flex items-center gap-1">
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={cn(
                  'px-2 py-1 rounded text-xs font-medium transition-all',
                  speed === s
                    ? 'bg-accent-attention/30 text-accent-attention'
                    : 'text-slate-400 hover:text-white'
                )}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm text-slate-300">
            Step {stepIndex + 1} of {ANIMATION_STEPS.length}: {stepLabel}
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-1">
            {ANIMATION_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => goToStep(i)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  i === stepIndex
                    ? 'bg-accent-attention scale-125'
                    : i < stepIndex
                    ? 'bg-accent-attention/50'
                    : 'bg-slate-600 hover:bg-slate-500'
                )}
                title={STEP_LABELS[ANIMATION_STEPS[i]]}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface ControlButtonProps {
  onClick: () => void
  title: string
  disabled?: boolean
  children: React.ReactNode
}

function ControlButton({ onClick, title, disabled, children }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        'w-10 h-10 rounded-lg flex items-center justify-center',
        'bg-slate-800 hover:bg-slate-700 transition-colors',
        'text-slate-300 hover:text-white',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {children}
    </button>
  )
}
