import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronRight, ChevronDown, Sparkles } from 'lucide-react';

interface HintsPanelProps {
  hints: string[];
}

export const HintsPanel = ({ hints }: HintsPanelProps) => {
  const [expandedHints, setExpandedHints] = useState<Set<number>>(new Set());

  const toggleHint = (index: number) => {
    const newExpanded = new Set(expandedHints);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedHints(newExpanded);
  };

  return (
    <div className="h-full bg-slate-900 p-4 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-6 h-6 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Hints</h3>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          Stuck? Reveal hints one at a time to guide you through the solution.
        </p>
      </motion.div>

      {/* Hints List */}
      <div className="space-y-3 mb-8">
        {hints.map((hint, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="bg-slate-800 rounded-lg overflow-hidden border border-transparent hover:border-cyan-400/30 transition-all"
          >
            <button
              onClick={() => toggleHint(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-400/20 text-cyan-400 text-xs font-semibold">
                  {index + 1}
                </span>
                <span className="text-white font-medium text-sm">
                  Hint {index + 1}
                </span>
              </div>
              <motion.div
                animate={{ rotate: expandedHints.has(index) ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {expandedHints.has(index) ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedHints.has(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-sm text-slate-300 leading-relaxed border-t border-slate-700">
                    <p className="pt-3">{hint}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Premium Upsell */}
      <div className="mt-8 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-lg p-5 border border-purple-500/30">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-400 font-semibold">HackLearn Pro</span>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          Unlock step-by-step video walkthroughs, detailed explanations for every line of code, and access to 100+ advanced security challenges.
        </p>
        <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded font-medium text-sm transition-all">
          Upgrade to Pro
        </button>
      </div>

      {/* Additional Resources */}
      <div className="mt-6">
        <h4 className="text-white font-semibold text-sm mb-3">
          Related Topics
        </h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 bg-slate-800 text-gray-400 rounded-full text-xs hover:bg-opacity-80 cursor-pointer transition-colors">
            Security
          </span>
          <span className="px-3 py-1.5 bg-slate-800 text-gray-400 rounded-full text-xs hover:bg-opacity-80 cursor-pointer transition-colors">
            Web Vulnerabilities
          </span>
          <span className="px-3 py-1.5 bg-slate-800 text-gray-400 rounded-full text-xs hover:bg-opacity-80 cursor-pointer transition-colors">
            Ethical Hacking
          </span>
        </div>
      </div>
    </div>
  );
};
