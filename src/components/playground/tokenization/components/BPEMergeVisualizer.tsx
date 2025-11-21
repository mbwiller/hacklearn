/**
 * BPE Merge Visualizer Component
 * Animated visualization of the Byte Pair Encoding merge process
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, FastForward, Zap } from 'lucide-react';
import type { MergeStep } from '../types/tokenization';

interface BPEMergeVisualizerProps {
  text: string;
  mergeSteps: MergeStep[];
  autoPlay?: boolean;
}

export const BPEMergeVisualizer = ({
  mergeSteps,
  autoPlay = false,
}: BPEMergeVisualizerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [speed, setSpeed] = useState(1000); // ms per step

  // Auto-advance animation
  useEffect(() => {
    if (!isPlaying || currentStep >= mergeSteps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, mergeSteps.length, speed]);

  const handlePlayPause = useCallback(() => {
    if (currentStep >= mergeSteps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  }, [currentStep, mergeSteps.length, isPlaying]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const handleStepForward = useCallback(() => {
    if (currentStep < mergeSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, mergeSteps.length]);

  if (mergeSteps.length === 0) {
    return (
      <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-12">
        <div className="text-center space-y-3">
          <div className="inline-block p-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-400">
            Enter text to see BPE merge visualization
          </p>
        </div>
      </div>
    );
  }

  const currentMerge = mergeSteps[currentStep];

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">BPE Merge Process</h3>

        <div className="flex items-center gap-3">
          {/* Speed control */}
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="bg-slate-800 text-white text-sm rounded-lg px-3 py-1.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value={2000}>Slow (2s)</option>
            <option value={1000}>Normal (1s)</option>
            <option value={500}>Fast (0.5s)</option>
          </select>

          {/* Playback controls */}
          <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1">
            <button
              onClick={handlePlayPause}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-cyan-400" />
              ) : (
                <Play className="w-4 h-4 text-cyan-400" />
              )}
            </button>
            <button
              onClick={handleStepForward}
              disabled={currentStep >= mergeSteps.length - 1}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
              aria-label="Step forward"
            >
              <FastForward className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              onClick={handleReset}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Reset"
            >
              <RotateCcw className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-cyan-600"
          initial={false}
          animate={{ width: `${((currentStep + 1) / mergeSteps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Merge visualization */}
      <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Step header */}
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">
                Step {currentStep + 1} of {mergeSteps.length}
              </div>
              <div className="text-2xl font-bold text-cyan-400">
                Merge: "{currentMerge.pair[0]}" + "{currentMerge.pair[1]}"
                → "{currentMerge.newToken}"
              </div>
              <div className="text-sm text-gray-400 mt-2">
                Frequency: {currentMerge.frequency.toLocaleString()} occurrences
                • Token ID: {currentMerge.tokenId}
              </div>
            </div>

            {/* Visual merge animation */}
            <div className="flex items-center justify-center gap-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
                className="px-6 py-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border-2 border-emerald-400/50 rounded-xl text-emerald-300 font-mono text-xl"
              >
                {currentMerge.pair[0]}
              </motion.div>

              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-cyan-400 text-3xl"
              >
                +
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="px-6 py-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border-2 border-emerald-400/50 rounded-xl text-emerald-300 font-mono text-xl"
              >
                {currentMerge.pair[1]}
              </motion.div>

              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                className="text-cyan-400 text-3xl"
              >
                →
              </motion.div>

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
                className="px-6 py-4 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border-2 border-cyan-400/50 rounded-xl text-cyan-300 font-mono text-xl shadow-xl shadow-cyan-500/20"
              >
                {currentMerge.newToken}
              </motion.div>
            </div>

            {/* Explanation */}
            <div className="max-w-2xl mx-auto text-center text-sm text-gray-400 leading-relaxed">
              The tokenizer identified that the pair <span className="text-emerald-400 font-mono">"{currentMerge.pair[0]}"</span> and{' '}
              <span className="text-emerald-400 font-mono">"{currentMerge.pair[1]}"</span> appears{' '}
              <span className="text-cyan-400 font-semibold">{currentMerge.frequency.toLocaleString()} times</span>{' '}
              in the training corpus. This pair is now merged into a single token{' '}
              <span className="text-cyan-400 font-mono">"{currentMerge.newToken}"</span>{' '}
              with ID <span className="text-purple-400">{currentMerge.tokenId}</span>.
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
