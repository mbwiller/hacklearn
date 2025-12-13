import { motion } from 'framer-motion'
import { useVisualizationStore } from '../../../../stores/visualizationStore'
import { HEAD_PATTERNS } from '../../../../types/visualization'
import { cn } from '../../../../lib/utils'

export function HeadSelector() {
  const selectedHead = useVisualizationStore((s) => s.selectedHead)
  const setSelectedHead = useVisualizationStore((s) => s.setSelectedHead)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-700"
    >
      <h3 className="text-sm font-semibold text-slate-300 mb-3">Attention Heads</h3>

      <div className="flex flex-col gap-1">
        {/* All heads option */}
        <button
          onClick={() => setSelectedHead(null)}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all',
            selectedHead === null
              ? 'bg-accent-attention/20 text-accent-attention'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          )}
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
          <span>All Heads</span>
        </button>

        {/* Individual heads */}
        {HEAD_PATTERNS.map((head, index) => (
          <button
            key={index}
            onClick={() => setSelectedHead(index)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all group',
              selectedHead === index
                ? 'bg-accent-attention/20 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            )}
          >
            <HeadIndicator index={index} />
            <div className="flex flex-col items-start">
              <span className="font-medium">{head.name}</span>
              <span className="text-xs text-slate-500 group-hover:text-slate-400">
                {head.description}
              </span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

function HeadIndicator({ index }: { index: number }) {
  return (
    <div
      className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
      style={{ backgroundColor: `hsl(${index * 45}, 70%, 50%)` }}
    >
      {index + 1}
    </div>
  )
}
