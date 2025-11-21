import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

interface LayerSelectorProps {
  numLayers: number;
  numHeads: number;
  selectedLayer: number;
  selectedHead: number;
  onLayerChange: (layer: number) => void;
  onHeadChange: (head: number) => void;
}

export const LayerSelector = ({
  numLayers,
  numHeads,
  selectedLayer,
  selectedHead,
  onLayerChange,
  onHeadChange,
}: LayerSelectorProps) => {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Layers className="w-5 h-5 text-cyan-400" />
        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
          Network Depth
        </h4>
      </div>

      {/* Layer selection */}
      <div className="space-y-2">
        <label className="text-xs text-gray-400">Layer (0 = Input, {numLayers - 1} = Output)</label>
        <div className="relative">
          <input
            type="range"
            min={0}
            max={numLayers - 1}
            value={selectedLayer}
            onChange={(e) => onLayerChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Early (Broad)</span>
            <span className="font-mono text-cyan-400">Layer {selectedLayer}</span>
            <span>Late (Focused)</span>
          </div>
        </div>
      </div>

      {/* Head selection */}
      <div className="space-y-2">
        <label className="text-xs text-gray-400">Attention Head</label>
        <select
          value={selectedHead}
          onChange={(e) => onHeadChange(Number(e.target.value))}
          className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
        >
          {Array.from({ length: numHeads }, (_, i) => (
            <option key={i} value={i}>
              Head {i} {i === 0 ? '(Primary)' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Info box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-xs text-gray-400"
      >
        <div className="font-semibold text-white mb-1">Layer Behavior</div>
        {selectedLayer < numLayers / 3 ? (
          <p>Early layers perform broad context gathering ("Attend First")</p>
        ) : selectedLayer > (2 * numLayers) / 3 ? (
          <p>Late layers focus on specific reasoning ("Consolidate Later")</p>
        ) : (
          <p>Middle layers balance retrieval and processing</p>
        )}
      </motion.div>
    </div>
  );
};
