import { motion } from 'framer-motion';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import type { ContextWindowState } from '@/types/context-visualizer';

interface InfluenceHorizonProps {
  state: ContextWindowState;
}

export const InfluenceHorizon = ({ state }: InfluenceHorizonProps) => {
  const sar = state.systemAttentionRatio;
  const driftScore = state.taskDriftScore;

  // Gauge color based on SAR
  const getGaugeColor = (ratio: number): string => {
    if (ratio > 0.7) return '#10b981'; // emerald-500 (healthy)
    if (ratio > 0.4) return '#f59e0b'; // amber-500 (warning)
    return '#ef4444'; // red-500 (danger)
  };

  // Status label
  const getStatusLabel = (ratio: number): { text: string; color: string } => {
    if (ratio > 0.7) return { text: 'ADHERING TO SYSTEM', color: 'text-emerald-400' };
    if (ratio > 0.4) return { text: 'ATTENTION DRIFT', color: 'text-yellow-400' };
    return { text: 'INJECTION DETECTED', color: 'text-red-400' };
  };

  const status = getStatusLabel(sar);

  // Recharts data format
  const gaugeData = [
    {
      name: 'SAR',
      value: sar * 100,
      fill: getGaugeColor(sar),
    },
  ];

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="text-center space-y-4">
        {/* Title */}
        <h4 className="text-lg font-semibold text-white">
          System Adherence Monitor
        </h4>

        {/* Gauge Chart */}
        <div className="relative">
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              data={gaugeData}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background
                dataKey="value"
                cornerRadius={10}
                animationDuration={800}
              />
            </RadialBarChart>
          </ResponsiveContainer>

          {/* Center value display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              key={sar}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold"
              style={{ color: getGaugeColor(sar) }}
            >
              {(sar * 100).toFixed(1)}%
            </motion.div>
            <div className="text-xs text-gray-500 mt-1">SAR</div>
          </div>
        </div>

        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-sm font-semibold ${status.color}`}
        >
          {status.text}
        </motion.div>

        {/* Metrics breakdown */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
          {/* System Attention Ratio */}
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-gray-400 mb-1">System Attention</div>
            <div className="text-white font-semibold">{(sar * 100).toFixed(1)}%</div>
          </div>

          {/* Task Drift Score */}
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-gray-400 mb-1">Task Drift</div>
            <div className={`font-semibold ${
              driftScore > 0.5 ? 'text-red-400' :
              driftScore > 0.2 ? 'text-yellow-400' :
              'text-emerald-400'
            }`}>
              {(driftScore * 100).toFixed(1)}%
            </div>
          </div>

          {/* Cache Occupancy */}
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-gray-400 mb-1">KV Cache</div>
            <div className="text-white font-semibold">
              {((state.cacheOccupancy / state.cacheCapacity) * 100).toFixed(0)}%
            </div>
          </div>

          {/* Heavy Hitters Count */}
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-gray-400 mb-1">Heavy Hitters</div>
            <div className="text-cyan-400 font-semibold">
              {state.tokens.filter(t => t.isHeavyHitter).length}
            </div>
          </div>
        </div>

        {/* Warning message */}
        {state.injectionDetected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-xs text-red-400 text-left"
          >
            <div className="font-semibold mb-1">Distraction Effect Detected</div>
            <div className="text-gray-400">
              Important attention heads have shifted focus away from system instructions.
              The model may not follow original guidelines.
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
