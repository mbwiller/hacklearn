import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Copy, Check, Maximize2, Minimize2 } from 'lucide-react';

/**
 * Represents a single reasoning step in the chain of thought process
 */
export interface ReasoningStep {
  /** Unique identifier for React keys */
  id: string;
  /** Step number in the sequence */
  number: number;
  /** Title/header for the step */
  title: string;
  /** Full content/reasoning for this step */
  content: string;
  /** Whether this step is currently expanded */
  isExpanded: boolean;
  /** Token count for this step (if available) */
  tokens?: number;
  /** Time taken for this step in seconds (if available) */
  timing?: number;
  /** Confidence level derived from content analysis */
  confidence: 'high' | 'medium' | 'low';
  /** Category of reasoning for this step */
  category: 'understanding' | 'calculation' | 'verification' | 'conclusion';
  /** Whether this step is currently being streamed */
  isCurrent?: boolean;
}

export interface ReasoningFlowProps {
  /** Raw LLM response containing reasoning steps */
  response: string;
  /** Token usage per step (if available) */
  tokenUsage?: number[];
  /** Whether the response is currently streaming */
  isStreaming?: boolean;
  /** Time elapsed for each step (if available) */
  stepTimings?: number[];
  /** Callback when user expands/collapses a step */
  onStepInteraction?: (stepIndex: number, isExpanded: boolean) => void;
  /** Custom parsing strategy */
  parseStrategy?: 'auto' | 'numbered' | 'lettered' | 'paragraphs';
  /** Custom title for the visualizer */
  title?: string;
}

/**
 * Premium Chain of Thought reasoning visualizer with smooth animations,
 * intelligent parsing, and beautiful glassmorphism design.
 */
export const ReasoningFlow = ({
  response,
  tokenUsage = [],
  isStreaming = false,
  stepTimings = [],
  onStepInteraction,
  parseStrategy = 'auto',
  title = 'Reasoning Flow',
}: ReasoningFlowProps) => {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  /**
   * Calculate confidence level based on content analysis
   */
  const calculateConfidence = useCallback((content: string): 'high' | 'medium' | 'low' => {
    const uncertainWords = ['maybe', 'perhaps', 'possibly', 'might', 'could', 'uncertain', 'assume'];
    const confidentWords = ['clearly', 'definitely', 'obviously', 'certainly', 'must', 'will'];

    const lower = content.toLowerCase();
    const uncertainCount = uncertainWords.filter(word => lower.includes(word)).length;
    const confidentCount = confidentWords.filter(word => lower.includes(word)).length;

    if (confidentCount > uncertainCount) return 'high';
    if (uncertainCount > confidentCount + 1) return 'low';
    return 'medium';
  }, []);

  /**
   * Categorize reasoning step based on content and position
   */
  const categorizeStep = useCallback((
    content: string,
    index: number,
    total: number
  ): ReasoningStep['category'] => {
    const lower = content.toLowerCase();

    // First step usually understanding
    if (index === 0 && (lower.includes('understand') || lower.includes('given') || lower.includes('problem'))) {
      return 'understanding';
    }

    // Last step usually conclusion
    if (index === total - 1 && (lower.includes('therefore') || lower.includes('answer') || lower.includes('conclusion'))) {
      return 'conclusion';
    }

    // Check for verification keywords
    if (lower.includes('check') || lower.includes('verify') || lower.includes('confirm') || lower.includes('correct')) {
      return 'verification';
    }

    // Check for calculation keywords
    if (lower.match(/\d+|calculate|multiply|divide|add|subtract|equals|\+|\-|\*|\/|=/)) {
      return 'calculation';
    }

    return 'calculation'; // Default
  }, []);

  /**
   * Parse reasoning steps from response using multiple strategies
   */
  const parseReasoningSteps = useCallback((text: string): ReasoningStep[] => {
    if (!text?.trim()) return [];

    const steps: ReasoningStep[] = [];

    // Strategy 1: Explicit "Step N:" patterns
    const stepPattern = /(?:^|\n)(?:step\s+(\d+)[:\.]?\s*)(.+?)(?=\n(?:step\s+\d+|$))/gis;
    let matches = [...text.matchAll(stepPattern)];

    if (matches.length > 0 && (parseStrategy === 'auto' || parseStrategy === 'numbered')) {
      matches.forEach((match, idx) => {
        const number = parseInt(match[1]);
        const content = match[2].trim();
        steps.push({
          id: `step-${number}`,
          number,
          title: `Step ${number}`,
          content,
          isExpanded: true, // Start expanded
          tokens: tokenUsage[idx],
          timing: stepTimings[idx],
          confidence: calculateConfidence(content),
          category: categorizeStep(content, idx, matches.length),
        });
      });
      return steps;
    }

    // Strategy 2: Numbered lists (1., 2., 3.)
    const numberedPattern = /(?:^|\n)(\d+)\.\s+(.+?)(?=\n\d+\.|$)/gs;
    matches = [...text.matchAll(numberedPattern)];

    if (matches.length > 1 && (parseStrategy === 'auto' || parseStrategy === 'numbered')) {
      matches.forEach((match, idx) => {
        const number = parseInt(match[1]);
        const content = match[2].trim();
        steps.push({
          id: `step-${number}`,
          number,
          title: `Part ${number}`,
          content,
          isExpanded: true,
          tokens: tokenUsage[idx],
          timing: stepTimings[idx],
          confidence: calculateConfidence(content),
          category: categorizeStep(content, idx, matches.length),
        });
      });
      return steps;
    }

    // Strategy 3: Lettered lists (a), b), c))
    const letteredPattern = /(?:^|\n)([a-z])\)\s+(.+?)(?=\n[a-z]\)|$)/gs;
    matches = [...text.matchAll(letteredPattern)];

    if (matches.length > 1 && (parseStrategy === 'auto' || parseStrategy === 'lettered')) {
      matches.forEach((match, idx) => {
        const content = match[2].trim();
        steps.push({
          id: `step-${idx}`,
          number: idx + 1,
          title: `Part ${match[1].toUpperCase()}`,
          content,
          isExpanded: true,
          tokens: tokenUsage[idx],
          timing: stepTimings[idx],
          confidence: calculateConfidence(content),
          category: categorizeStep(content, idx, matches.length),
        });
      });
      return steps;
    }

    // Strategy 4: Paragraph breaks (fallback)
    if (parseStrategy === 'auto' || parseStrategy === 'paragraphs') {
      const paragraphs = text
        .split(/\n\n+/)
        .filter(p => p.trim().length > 15) // Filter short lines
        .slice(0, 10); // Max 10 steps

      if (paragraphs.length > 1) {
        paragraphs.forEach((para, idx) => {
          steps.push({
            id: `step-${idx}`,
            number: idx + 1,
            title: `Part ${idx + 1}`,
            content: para.trim(),
            isExpanded: true,
            tokens: tokenUsage[idx],
            timing: stepTimings[idx],
            confidence: calculateConfidence(para),
            category: categorizeStep(para, idx, paragraphs.length),
          });
        });
        return steps;
      }
    }

    // Ultimate fallback: single step
    return [{
      id: 'step-1',
      number: 1,
      title: 'Response',
      content: text.trim(),
      isExpanded: true,
      confidence: calculateConfidence(text),
      category: 'understanding',
    }];
  }, [parseStrategy, tokenUsage, stepTimings, calculateConfidence, categorizeStep]);

  // Parse steps and mark current if streaming
  const steps = useMemo(() => {
    const parsed = parseReasoningSteps(response);
    if (isStreaming && parsed.length > 0) {
      parsed[parsed.length - 1].isCurrent = true;
    }
    return parsed;
  }, [response, isStreaming, parseReasoningSteps]);

  // Toggle individual step
  const toggleStep = useCallback((stepNumber: number) => {
    const newExpanded = new Set(expandedSteps);
    const isExpanded = newExpanded.has(stepNumber);

    if (isExpanded) {
      newExpanded.delete(stepNumber);
    } else {
      newExpanded.add(stepNumber);
    }

    setExpandedSteps(newExpanded);
    onStepInteraction?.(stepNumber, !isExpanded);
  }, [expandedSteps, onStepInteraction]);

  // Expand all steps
  const expandAll = useCallback(() => {
    setExpandedSteps(new Set(steps.map(s => s.number)));
  }, [steps]);

  // Collapse all steps
  const collapseAll = useCallback(() => {
    setExpandedSteps(new Set());
  }, []);

  // Copy step content
  const copyStep = useCallback((stepNumber: number, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedStep(stepNumber);
    setTimeout(() => setCopiedStep(null), 2000);
  }, []);

  // Color scheme by category
  const getCategoryColors = (category: ReasoningStep['category']) => {
    switch (category) {
      case 'understanding':
        return {
          border: 'border-cyan-400/30',
          glow: 'shadow-cyan-500/10',
          text: 'text-cyan-400',
          bg: 'bg-cyan-400/5',
        };
      case 'calculation':
        return {
          border: 'border-emerald-400/30',
          glow: 'shadow-emerald-500/10',
          text: 'text-emerald-400',
          bg: 'bg-emerald-400/5',
        };
      case 'verification':
        return {
          border: 'border-purple-400/30',
          glow: 'shadow-purple-500/10',
          text: 'text-purple-400',
          bg: 'bg-purple-400/5',
        };
      case 'conclusion':
        return {
          border: 'border-yellow-400/30',
          glow: 'shadow-yellow-500/10',
          text: 'text-yellow-400',
          bg: 'bg-yellow-400/5',
        };
    }
  };

  // Don't show if no valid steps
  if (steps.length === 0) return null;

  // Don't show if only one step with same content as response
  if (steps.length === 1 && steps[0].content === response.trim()) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full" />
          {title}
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={expandAll}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-all"
            aria-label="Expand all steps"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Expand All
          </button>
          <span className="text-gray-600">|</span>
          <button
            onClick={collapseAll}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-all"
            aria-label="Collapse all steps"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            Collapse All
          </button>
        </div>
      </div>

      {/* Reasoning steps timeline */}
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isExpanded = expandedSteps.has(step.number) || step.isExpanded;
          const isLast = idx === steps.length - 1;
          const colors = getCategoryColors(step.category);

          return (
            <div key={step.id}>
              {/* Step card */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1, ease: 'easeOut' }}
                className="relative"
              >
                <div
                  className={`
                    relative backdrop-blur-xl bg-white/5 rounded-xl border ${colors.border}
                    shadow-2xl ${colors.glow} transition-all duration-300
                    ${step.isCurrent ? 'animate-pulse ring-2 ring-cyan-400/50' : ''}
                    ${isExpanded ? 'shadow-2xl ' + colors.glow : 'hover:shadow-xl hover:' + colors.glow}
                    hover:border-white/20 cursor-pointer
                  `}
                  onClick={() => toggleStep(step.number)}
                >
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent rounded-xl pointer-events-none" />

                  <div className="relative p-6">
                    <div className="flex items-start gap-4">
                      {/* Step number badge */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center font-bold text-lg ${colors.text}`}>
                        {step.number}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Title and controls */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex-1">
                            <h4 className={`text-base font-semibold ${colors.text} mb-1`}>
                              {step.title}
                            </h4>
                            {step.category && (
                              <span className="text-xs text-gray-500 capitalize">
                                {step.category}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {/* Copy button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyStep(step.number, step.content);
                              }}
                              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                              aria-label="Copy step content"
                            >
                              {copiedStep === step.number ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-400 hover:text-gray-300" />
                              )}
                            </button>

                            {/* Expand/collapse button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStep(step.number);
                              }}
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

                        {/* Content with animation */}
                        <AnimatePresence initial={false}>
                          {isExpanded ? (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm text-white leading-relaxed whitespace-pre-wrap mb-4">
                                {step.content}
                                {step.isCurrent && <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-pulse" />}
                              </p>

                              {/* Metadata badges */}
                              <div className="flex items-center gap-3 text-xs text-gray-400">
                                {step.tokens !== undefined && (
                                  <span className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg">
                                    <span className="text-yellow-400">🪙</span>
                                    {step.tokens} tokens
                                  </span>
                                )}
                                {step.timing !== undefined && (
                                  <span className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg">
                                    <span className="text-blue-400">⏱</span>
                                    {step.timing.toFixed(1)}s
                                  </span>
                                )}
                                <span className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg">
                                  <span className="text-purple-400">📊</span>
                                  <span className={`
                                    ${step.confidence === 'high' ? 'text-emerald-400' : ''}
                                    ${step.confidence === 'medium' ? 'text-yellow-400' : ''}
                                    ${step.confidence === 'low' ? 'text-red-400' : ''}
                                  `}>
                                    {step.confidence === 'high' ? 'High' : step.confidence === 'medium' ? 'Medium' : 'Low'} confidence
                                  </span>
                                </span>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-sm text-gray-400 line-clamp-2"
                            >
                              {step.content}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Connection line with animation */}
              {!isLast && (
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 + 0.2 }}
                  className="flex justify-center my-3"
                  style={{ originY: 0 }}
                >
                  <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-400/50 to-cyan-600/50 rounded-full" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary footer */}
      {steps.length > 1 && !isStreaming && (
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
                Reasoning Complete
              </h4>
              <p className="text-xs text-gray-400">
                {steps.length} {steps.length === 1 ? 'step' : 'steps'} identified in the reasoning chain
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
