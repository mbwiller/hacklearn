/**
 * Attack Simulator Component
 * Demonstrates tokenization-based attack vectors
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, Info } from 'lucide-react';
import type { AttackPattern } from '../types/tokenization';
import { ATTACK_PATTERNS } from '../utils/attackPatterns';

interface AttackSimulatorProps {
  onAttackSelect: (pattern: AttackPattern) => void;
}

export const AttackSimulator = ({ onAttackSelect }: AttackSimulatorProps) => {
  const [selectedAttack, setSelectedAttack] = useState<AttackPattern | null>(null);

  const handleAttackSelect = useCallback((pattern: AttackPattern) => {
    setSelectedAttack(pattern);
    onAttackSelect(pattern);
  }, [onAttackSelect]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-red-400 to-red-600 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">Attack Demonstrations</h3>
      </div>

      {/* Attack pattern grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ATTACK_PATTERNS.map((pattern) => (
          <motion.button
            key={pattern.name}
            onClick={() => handleAttackSelect(pattern)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative backdrop-blur-xl bg-white/5 rounded-xl border-2 p-6 text-left transition-all
              ${selectedAttack?.name === pattern.name
                ? 'border-red-400/50 bg-red-500/10'
                : 'border-white/10 hover:border-red-400/30'
              }
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-white font-semibold mb-1">{pattern.name}</h4>
                <span className="text-xs px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-red-400 uppercase">
                  {pattern.category}
                </span>
              </div>
              <Shield className="w-5 h-5 text-red-400" />
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              {pattern.description}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Selected attack details */}
      <AnimatePresence>
        {selectedAttack && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="backdrop-blur-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6"
          >
            <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" />
              How This Attack Works
            </h4>

            {/* Example */}
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-400 mb-2">Attack Example:</div>
                <code className="block bg-slate-900/50 rounded-lg p-3 text-sm text-red-300 font-mono whitespace-pre-wrap">
                  {selectedAttack.example}
                </code>
              </div>

              {/* Explanation */}
              <div>
                <div className="text-xs text-gray-400 mb-2">Why It Works:</div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedAttack.explanation}
                </p>
              </div>

              {/* Mitigation */}
              <div>
                <div className="text-xs text-gray-400 mb-2">Defense Strategy:</div>
                <p className="text-sm text-emerald-300 leading-relaxed">
                  {selectedAttack.mitigation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
