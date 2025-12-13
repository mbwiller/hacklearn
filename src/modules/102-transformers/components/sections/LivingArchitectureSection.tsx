import { Suspense, lazy, useState, useEffect, type ComponentType } from 'react'
import { motion } from 'framer-motion'
import { useInViewAnimation } from '../../hooks/useInViewAnimation'
import { useVisualizationStore } from '../../stores/visualizationStore'
import { PlaybackControls } from '../../components/visualizations/3d/ui/PlaybackControls'
import { HeadSelector } from '../../components/visualizations/3d/ui/HeadSelector'
import { ModeToggle } from '../../components/visualizations/3d/ui/ModeToggle'
import { TourOverlay } from '../../components/visualizations/3d/ui/TourOverlay'
import { InfoPanel } from '../../components/visualizations/3d/ui/InfoPanel'

// Lazy load the heavy 3D canvas
interface TransformerCanvasProps {
  isActive?: boolean
}

const TransformerCanvas = lazy<ComponentType<TransformerCanvasProps>>(() =>
  import('../visualizations/3d/TransformerCanvas').then((mod) => ({
    default: mod.TransformerCanvas,
  }))
)

export function LivingArchitectureSection() {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.1 })
  const [showHeadSelector, setShowHeadSelector] = useState(false)
  const reset = useVisualizationStore((s) => s.reset)

  // Reset visualization state when section comes into view
  useEffect(() => {
    if (isInView) {
      reset()
    }
  }, [isInView, reset])

  return (
    <section
      id="living-architecture"
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-slate-950"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          The Living Architecture
        </h2>
        <p className="text-slate-400 text-sm md:text-base">
          Watch attention flow through the Transformer in 3D
        </p>
      </motion.div>

      {/* Mode toggle - top right */}
      <div className="absolute top-6 right-6 z-20">
        <ModeToggle />
      </div>

      {/* Help button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        onClick={() => setShowHeadSelector(!showHeadSelector)}
        className="absolute top-6 left-6 z-20 w-10 h-10 rounded-full bg-slate-800/80
                   hover:bg-slate-700 flex items-center justify-center text-slate-400
                   hover:text-white transition-colors"
        title="Toggle attention head selector"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </motion.button>

      {/* Head selector panel - left side */}
      {showHeadSelector && (
        <div className="absolute top-20 left-6 z-20">
          <HeadSelector />
        </div>
      )}

      {/* Info panel - appears on hover/selection */}
      <InfoPanel />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Suspense fallback={<LoadingFallback />}>
          {isInView && <TransformerCanvas isActive={isInView} />}
        </Suspense>
      </div>

      {/* Tour overlay */}
      <TourOverlay />

      {/* Playback controls - bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <PlaybackControls />
      </div>

      {/* Controls hint - bottom left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-6 z-20 text-xs text-slate-500"
      >
        <p>Drag to orbit • Scroll to zoom • Click layers for info</p>
      </motion.div>
    </section>
  )
}

function LoadingFallback() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-slate-950">
      <div className="text-center">
        <div className="w-16 h-16 relative mb-4">
          <div className="absolute inset-0 border-4 border-accent-attention/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-accent-attention border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-slate-400">Loading 3D visualization...</p>
      </div>
    </div>
  )
}
