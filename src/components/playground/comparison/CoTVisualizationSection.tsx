import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Loader2, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import { Button } from '../../ui/Button';
import { LaTeXRenderer } from '../../ui/LaTeXRenderer';
import { parseCoTSteps, type ReasoningStep } from '../../../utils/parseCoTSteps';

export interface CoTVisualizationSectionProps {
  cotResponse: string;
  isVisible: boolean;
  apiKey: string;
}

/**
 * Full-width CoT reasoning breakdown with button-triggered LLM-powered parsing.
 * Shows beautiful step-by-step visualization with expand/collapse, confidence indicators,
 * and smooth Framer Motion animations.
 */
export const CoTVisualizationSection = ({
  cotResponse,
  isVisible,
  apiKey,
}: CoTVisualizationSectionProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [steps, setSteps] = useState<ReasoningStep[]>([]);
  const [showSteps, setShowSteps] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await parseCoTSteps(cotResponse, apiKey);

      if (!result.parseSuccess) {
        setError(result.error || 'Failed to parse reasoning steps');
        return;
      }

      setSteps(result.steps);
      setShowSteps(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  }, [cotResponse, apiKey]);

  if (!isVisible) return null;

  return (
    <div className="space-y-6">
      {/* Analyze button - appears with pulse animation when CoT completes */}
      {!showSteps && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="flex justify-center"
        >
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !apiKey}
            variant="primary"
            className="px-8 py-4 text-lg shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Parsing reasoning steps...
              </>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                Analyze Reasoning
              </>
            )}
          </Button>
        </motion.div>
      )}

      {/* Error state */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
        >
          <p className="text-red-400 text-sm">
            <strong>Parse Error:</strong> {error}
          </p>
          <button
            onClick={handleAnalyze}
            className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 underline"
          >
            Retry Analysis
          </button>
        </motion.div>
      )}

      {/* Reasoning steps visualization - stagger animation */}
      <AnimatePresence>
        {showSteps && steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-6"
          >
            {/* Section header */}
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full" />
              Reasoning Breakdown
              <span className="text-sm font-normal text-gray-400 ml-auto">
                {steps.length} {steps.length === 1 ? 'step' : 'steps'} identified
              </span>
            </h3>

            {/* Step cards */}
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <ReasoningStepCard key={step.stepNumber} step={step} index={idx} />
              ))}
            </div>

            {/* Summary footer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: steps.length * 0.1 + 0.3 }}
              className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 rounded-xl p-4 shadow-xl shadow-emerald-500/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-emerald-400 mb-0.5">
                    Analysis Complete
                  </h4>
                  <p className="text-xs text-gray-400">
                    Chain of thought reasoning successfully parsed and visualized
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * Individual reasoning step card with expand/collapse, copy, and category-based styling
 */
const ReasoningStepCard = ({ step, index }: { step: ReasoningStep; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(step.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [step.content]);

  const getCategoryColors = (category: ReasoningStep['category']) => {
    switch (category) {
      case 'understanding':
        return {
          border: 'border-cyan-400/30',
          text: 'text-cyan-400',
          bg: 'bg-cyan-400/5',
          glow: 'shadow-cyan-500/10',
        };
      case 'calculation':
        return {
          border: 'border-emerald-400/30',
          text: 'text-emerald-400',
          bg: 'bg-emerald-400/5',
          glow: 'shadow-emerald-500/10',
        };
      case 'verification':
        return {
          border: 'border-purple-400/30',
          text: 'text-purple-400',
          bg: 'bg-purple-400/5',
          glow: 'shadow-purple-500/10',
        };
      case 'conclusion':
        return {
          border: 'border-yellow-400/30',
          text: 'text-yellow-400',
          bg: 'bg-yellow-400/5',
          glow: 'shadow-yellow-500/10',
        };
    }
  };

  const colors = getCategoryColors(step.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1, // Stagger by 100ms
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`backdrop-blur-xl bg-white/5 rounded-xl border ${colors.border} shadow-xl ${colors.glow} hover:shadow-2xl transition-shadow duration-300`}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Step number badge */}
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center font-bold text-lg ${colors.text}`}
          >
            {step.stepNumber}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title and controls */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <h4 className={`text-base font-semibold ${colors.text} mb-1`}>{step.title}</h4>
                <span className="text-xs text-gray-500 capitalize">{step.category}</span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Copy button */}
                <button
                  onClick={handleCopy}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Copy step content"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400 hover:text-gray-300" />
                  )}
                </button>

                {/* Expand/collapse button */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Content with smooth expand/collapse animation */}
            <AnimatePresence initial={false}>
              {isExpanded ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="text-sm text-white leading-relaxed mt-3 whitespace-pre-wrap">
                    <LaTeXRenderer text={step.content} />
                  </div>

                  {/* Metadata badges */}
                  <div className="flex items-center gap-3 mt-4 text-xs">
                    {/* Confidence indicator */}
                    <span
                      className={`px-2 py-1 rounded-lg bg-white/5 flex items-center gap-1.5 ${
                        step.confidence === 'high'
                          ? 'text-emerald-400'
                          : step.confidence === 'medium'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}
                    >
                      <span className="text-base">
                        {step.confidence === 'high' ? '●' : step.confidence === 'medium' ? '◐' : '○'}
                      </span>
                      {step.confidence} confidence
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-gray-400 line-clamp-2 mt-2"
                >
                  {step.content}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
