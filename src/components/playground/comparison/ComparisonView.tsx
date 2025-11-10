import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { diffWords, type Change } from 'diff';
import {
  Loader2,
  Copy,
  Check,
  Trophy,
  TrendingUp,
  Coins,
  DollarSign,
  Clock,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react';
import { useLLMChat, type ChatMessage } from '../../../hooks/useLLMChat';
import { type GenerationParams, type ModelOption } from '../controls/ParameterPanel';

/** Strategy configuration */
export interface Strategy {
  name: string;
  prompt: string;
  model: ModelOption;
  parameters: GenerationParams;
}

/** Execution result for a strategy */
export interface ExecutionResult {
  response: string;
  tokens: number;
  cost: number;
  time: number;
  error?: string;
}

/** Comparison results */
export interface ComparisonResults {
  standard: ExecutionResult & { reasoningDepth: number };
  enhanced: ExecutionResult & { reasoningDepth: number };
  winner: 'standard' | 'enhanced' | 'tie';
  insights: string[];
  diffHighlights?: Change[];
}

/** Comparison view props */
export interface ComparisonViewProps {
  /** Problem being tested */
  problem: string;
  /** Standard prompting strategy */
  standardStrategy: Strategy;
  /** Enhanced strategy (e.g., CoT) */
  enhancedStrategy: Strategy;
  /** Expected answer for correctness checking */
  expectedAnswer?: string;
  /** Callback when comparison completes */
  onComplete?: (results: ComparisonResults) => void;
  /** Custom renderer for enhanced response (e.g., ReasoningFlow) */
  enhancedRenderer?: (response: string, isStreaming: boolean) => ReactNode;
}

type ExecutionState = 'waiting' | 'running' | 'complete' | 'error';

/**
 * Premium side-by-side comparison view with streaming, insights, and diff highlighting
 */
export const ComparisonView = ({
  problem,
  standardStrategy,
  enhancedStrategy,
  expectedAnswer,
  onComplete,
  enhancedRenderer,
}: ComparisonViewProps) => {
  // State for both strategies
  const [standardState, setStandardState] = useState<ExecutionState>('waiting');
  const [enhancedState, setEnhancedState] = useState<ExecutionState>('waiting');

  const [standardResponse, setStandardResponse] = useState('');
  const [enhancedResponse, setEnhancedResponse] = useState('');

  const [standardMetrics, setStandardMetrics] = useState<{ tokens: number; cost: number; time: number } | null>(null);
  const [enhancedMetrics, setEnhancedMetrics] = useState<{ tokens: number; cost: number; time: number } | null>(null);

  const [results, setResults] = useState<ComparisonResults | null>(null);
  const [showInsights, setShowInsights] = useState(true); // Visible by default as per user's request

  const [copiedSide, setCopiedSide] = useState<'standard' | 'enhanced' | null>(null);

  // Hooks for LLM chat
  const standardChat = useLLMChat();
  const enhancedChat = useLLMChat();

  /**
   * Calculate reasoning depth score based on response analysis
   */
  const calculateReasoningDepth = useCallback((response: string): number => {
    let score = 0;

    // Check for explicit steps
    const stepMatches = response.match(/(?:step|part|phase)\s+\d+/gi);
    score += Math.min(stepMatches?.length || 0, 4);

    // Check for logical connectors
    const connectors = ['therefore', 'because', 'thus', 'so', 'hence', 'consequently'];
    score += Math.min(
      connectors.filter(c => response.toLowerCase().includes(c)).length,
      3
    );

    // Check for calculations
    const calculations = response.match(/\d+\s*[+\-*/=]\s*\d+/g);
    score += Math.min(calculations?.length || 0, 2);

    // Check for verification language
    if (/check|verify|confirm/i.test(response)) score += 1;

    return Math.min(score, 10);
  }, []);

  /**
   * Check if response contains correct answer
   */
  const checkAnswer = useCallback((response: string, correctAnswer: string): boolean => {
    // Try to extract the final answer from the response
    const patterns = [
      /(?:the answer is|answer:|final answer:)\s*\$?(\d+(?:,\d{3})*(?:\.\d+)?)/i,
      /\$?(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:dollars?|bolts?|meters?|cups?|balls?)/i,
      /=\s*\$?(\d+(?:,\d{3})*(?:\.\d+)?)/,
    ];

    for (const pattern of patterns) {
      const match = response.match(pattern);
      if (match) {
        const extracted = match[1].replace(/,/g, '');
        if (extracted === correctAnswer.replace(/,/g, '')) {
          return true;
        }
      }
    }

    // Fallback: check if the number appears in the response
    const cleanAnswer = correctAnswer.replace(/,/g, '');
    return response.includes(cleanAnswer);
  }, []);

  /**
   * Analyze and compare results
   */
  const analyzeResults = useCallback((
    standard: ExecutionResult,
    enhanced: ExecutionResult
  ): ComparisonResults => {
    const insights: string[] = [];

    // Calculate reasoning depth
    const standardDepth = calculateReasoningDepth(standard.response);
    const enhancedDepth = calculateReasoningDepth(enhanced.response);

    // Token efficiency analysis
    const tokenRatio = enhanced.tokens / standard.tokens;
    if (tokenRatio > 3) {
      insights.push(`Enhanced strategy used ${tokenRatio.toFixed(1)}× more tokens, providing more detailed reasoning`);
    } else if (tokenRatio < 1.5) {
      insights.push(`Enhanced strategy was surprisingly token-efficient (only ${tokenRatio.toFixed(1)}× more tokens)`);
    } else {
      insights.push(`Enhanced strategy used ${tokenRatio.toFixed(1)}× more tokens for added transparency`);
    }

    // Cost comparison
    const costDiff = enhanced.cost - standard.cost;
    if (costDiff < 0.01) {
      insights.push(`Cost difference: $${costDiff.toFixed(4)} (negligible)`);
    } else if (costDiff < 0.10) {
      insights.push(`Cost difference: $${costDiff.toFixed(4)} (acceptable for transparency gain)`);
    } else {
      insights.push(`Cost difference: $${costDiff.toFixed(4)} (consider for production use)`);
    }

    // Reasoning depth comparison
    insights.push(`Reasoning depth: Standard ${standardDepth}/10, Enhanced ${enhancedDepth}/10`);

    // Correctness check
    if (expectedAnswer) {
      const standardCorrect = checkAnswer(standard.response, expectedAnswer);
      const enhancedCorrect = checkAnswer(enhanced.response, expectedAnswer);

      if (standardCorrect && enhancedCorrect) {
        insights.push('Both strategies arrived at the correct answer');
      } else if (enhancedCorrect && !standardCorrect) {
        insights.push('Enhanced strategy found the correct answer while standard prompting failed');
      } else if (!enhancedCorrect && standardCorrect) {
        insights.push('Standard prompting succeeded while enhanced strategy made an error');
      } else {
        insights.push('Neither strategy found the correct answer');
      }
    }

    // Recommendation
    if (enhancedDepth > standardDepth + 3) {
      insights.push('Recommendation: Use enhanced strategy for problems requiring step-by-step verification');
    } else if (tokenRatio < 1.5 && enhancedDepth > standardDepth) {
      insights.push('Recommendation: Enhanced strategy is a clear winner - transparent and efficient');
    } else {
      insights.push('Recommendation: Standard prompting may be sufficient for simple problems');
    }

    // Determine winner
    let winner: 'standard' | 'enhanced' | 'tie' = 'tie';

    if (expectedAnswer) {
      const standardCorrect = checkAnswer(standard.response, expectedAnswer);
      const enhancedCorrect = checkAnswer(enhanced.response, expectedAnswer);

      if (enhancedCorrect && !standardCorrect) {
        winner = 'enhanced';
      } else if (standardCorrect && !enhancedCorrect) {
        winner = 'standard';
      } else if (enhancedCorrect && enhancedDepth > standardDepth + 2) {
        winner = 'enhanced';
      }
    } else {
      // No expected answer - judge by reasoning depth
      if (enhancedDepth > standardDepth + 3) {
        winner = 'enhanced';
      }
    }

    // Generate diff highlights
    const diffHighlights = diffWords(standard.response, enhanced.response);

    return {
      standard: { ...standard, reasoningDepth: standardDepth },
      enhanced: { ...enhanced, reasoningDepth: enhancedDepth },
      winner,
      insights,
      diffHighlights,
    };
  }, [calculateReasoningDepth, checkAnswer, expectedAnswer]);

  /**
   * Execute strategy with streaming support
   */
  const executeStrategy = useCallback(async (
    strategy: Strategy,
    chat: ReturnType<typeof useLLMChat>,
    onStateChange: (state: ExecutionState) => void,
    onResponseUpdate: (response: string) => void
  ): Promise<ExecutionResult> => {
    onStateChange('running');

    const startTime = performance.now();
    const messages: ChatMessage[] = [{ role: 'user', content: strategy.prompt }];

    try {
      let fullResponse = '';

      const result = await chat.sendStreamingMessage(
        messages,
        {
          model: strategy.model,
          systemPrompt: strategy.parameters.systemPrompt,
        },
        (delta) => {
          fullResponse += delta;
          onResponseUpdate(fullResponse);
        }
      );

      const endTime = performance.now();

      if (result) {
        onStateChange('complete');
        return {
          response: result.message,
          tokens: result.usage.total_tokens,
          cost: result.cost,
          time: (endTime - startTime) / 1000,
        };
      } else {
        throw new Error(chat.error || 'Request failed');
      }
    } catch (error) {
      onStateChange('error');
      throw error;
    }
  }, []);

  /**
   * Run comparison when component mounts or strategies change
   */
  useEffect(() => {
    const runComparison = async () => {
      // Reset state
      setStandardResponse('');
      setEnhancedResponse('');
      setStandardMetrics(null);
      setEnhancedMetrics(null);
      setResults(null);

      try {
        // Execute both strategies in parallel with streaming
        const [standardResult, enhancedResult] = await Promise.all([
          executeStrategy(
            standardStrategy,
            standardChat,
            setStandardState,
            setStandardResponse
          ),
          executeStrategy(
            enhancedStrategy,
            enhancedChat,
            setEnhancedState,
            setEnhancedResponse
          ),
        ]);

        // Store metrics
        setStandardMetrics({
          tokens: standardResult.tokens,
          cost: standardResult.cost,
          time: standardResult.time,
        });

        setEnhancedMetrics({
          tokens: enhancedResult.tokens,
          cost: enhancedResult.cost,
          time: enhancedResult.time,
        });

        // Analyze results
        const analysis = analyzeResults(standardResult, enhancedResult);
        setResults(analysis);

        // Call completion callback
        onComplete?.(analysis);
      } catch (error) {
        console.error('Comparison failed:', error);
      }
    };

    runComparison();
  }, [problem]); // Only run when problem changes

  /**
   * Copy response to clipboard
   */
  const copyResponse = useCallback((side: 'standard' | 'enhanced', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSide(side);
    setTimeout(() => setCopiedSide(null), 2000);
  }, []);

  /**
   * Get status badge configuration
   */
  const getStatusBadge = (state: ExecutionState) => {
    switch (state) {
      case 'waiting':
        return { text: 'Waiting', color: 'text-gray-400', bg: 'bg-gray-400/10', icon: null };
      case 'running':
        return { text: 'Running', color: 'text-cyan-400', bg: 'bg-cyan-400/10', icon: Loader2 };
      case 'complete':
        return { text: 'Complete', color: 'text-emerald-400', bg: 'bg-emerald-400/10', icon: null };
      case 'error':
        return { text: 'Error', color: 'text-red-400', bg: 'bg-red-400/10', icon: AlertCircle };
    }
  };

  const standardBadge = getStatusBadge(standardState);
  const enhancedBadge = getStatusBadge(enhancedState);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white flex items-center gap-3">
        <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
        Strategy Comparison
      </h3>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Standard Strategy */}
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${standardBadge.bg} ${standardState === 'running' ? 'animate-pulse' : ''}`} />
              <h4 className="text-lg font-semibold text-gray-300">{standardStrategy.name}</h4>
              <span className={`text-xs px-2 py-1 rounded-lg ${standardBadge.bg} ${standardBadge.color} flex items-center gap-1`}>
                {standardBadge.icon && <standardBadge.icon className="w-3 h-3 animate-spin" />}
                {standardBadge.text}
              </span>
            </div>
            <button
              onClick={() => copyResponse('standard', standardResponse)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              disabled={!standardResponse}
              aria-label="Copy response"
            >
              {copiedSide === 'standard' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>

          {/* Response card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 min-h-[300px] shadow-xl">
            {standardState === 'running' && !standardResponse ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
                  <p className="text-sm text-gray-400">Generating response...</p>
                </div>
              </div>
            ) : standardState === 'error' ? (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{standardChat.error}</p>
              </div>
            ) : standardResponse ? (
              <div className="space-y-4">
                <pre className="whitespace-pre-wrap text-sm text-white leading-relaxed">
                  {standardResponse}
                  {standardState === 'running' && <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-pulse" />}
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-gray-500">Waiting to run...</p>
              </div>
            )}
          </div>

          {/* Metrics footer */}
          {standardMetrics && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg text-sm"
            >
              <span className="flex items-center gap-1.5 text-gray-400">
                <Coins className="w-4 h-4 text-yellow-400" />
                {standardMetrics.tokens} tokens
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                ${standardMetrics.cost.toFixed(6)}
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <Clock className="w-4 h-4 text-blue-400" />
                {standardMetrics.time.toFixed(1)}s
              </span>
            </motion.div>
          )}
        </div>

        {/* Enhanced Strategy */}
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${enhancedBadge.bg} ${enhancedState === 'running' ? 'animate-pulse' : ''}`} />
              <h4 className="text-lg font-semibold text-gray-300">{enhancedStrategy.name}</h4>
              <span className={`text-xs px-2 py-1 rounded-lg ${enhancedBadge.bg} ${enhancedBadge.color} flex items-center gap-1`}>
                {enhancedBadge.icon && <enhancedBadge.icon className="w-3 h-3 animate-spin" />}
                {enhancedBadge.text}
              </span>
            </div>
            <button
              onClick={() => copyResponse('enhanced', enhancedResponse)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              disabled={!enhancedResponse}
              aria-label="Copy response"
            >
              {copiedSide === 'enhanced' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>

          {/* Response card with custom renderer if provided */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 min-h-[300px] shadow-xl">
            {enhancedState === 'running' && !enhancedResponse ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
                  <p className="text-sm text-gray-400">Generating response...</p>
                </div>
              </div>
            ) : enhancedState === 'error' ? (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{enhancedChat.error}</p>
              </div>
            ) : enhancedResponse ? (
              <div className="space-y-4">
                {enhancedRenderer ? (
                  enhancedRenderer(enhancedResponse, enhancedState === 'running')
                ) : (
                  <pre className="whitespace-pre-wrap text-sm text-white leading-relaxed">
                    {enhancedResponse}
                    {enhancedState === 'running' && <span className="inline-block w-2 h-4 ml-1 bg-emerald-400 animate-pulse" />}
                  </pre>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-gray-500">Waiting to run...</p>
              </div>
            )}
          </div>

          {/* Metrics footer */}
          {enhancedMetrics && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg text-sm"
            >
              <span className="flex items-center gap-1.5 text-gray-400">
                <Coins className="w-4 h-4 text-yellow-400" />
                {enhancedMetrics.tokens} tokens
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                ${enhancedMetrics.cost.toFixed(6)}
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <Clock className="w-4 h-4 text-blue-400" />
                {enhancedMetrics.time.toFixed(1)}s
              </span>
              {results && (
                <span className="ml-auto flex items-center gap-1.5 text-gray-400">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  Depth: {results.enhanced.reasoningDepth}/10
                </span>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Winner indicator - NO CONFETTI as per user's request */}
      {results && standardState === 'complete' && enhancedState === 'complete' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-gradient-to-r from-yellow-500/10 to-emerald-500/10 border border-emerald-500/30 rounded-xl shadow-xl"
        >
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <div className="flex-1">
              <span className="text-lg font-semibold text-white">
                {results.winner === 'enhanced' ? `Winner: ${enhancedStrategy.name}` :
                 results.winner === 'standard' ? `Winner: ${standardStrategy.name}` :
                 'Result: Tie'}
              </span>
              <p className="text-sm text-gray-400 mt-1">
                {results.insights[results.insights.length - 1]}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Insights Panel - Visible by default */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <button
            onClick={() => setShowInsights(!showInsights)}
            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <h4 className="text-lg font-semibold text-white">Insights & Analysis</h4>
            </div>
            {showInsights ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {/* Content */}
          <AnimatePresence initial={false}>
            {showInsights && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 space-y-4">
                  {/* Key Insights */}
                  <div className="space-y-2">
                    {results.insights.map((insight, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span className="text-gray-300">{insight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Diff Highlighting - Visible by default */}
                  {results.diffHighlights && results.diffHighlights.length > 0 && (
                    <div className="space-y-2 pt-4 border-t border-white/10">
                      <h5 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                        Response Differences
                      </h5>
                      <div className="p-4 bg-slate-900/50 rounded-lg text-sm font-mono leading-relaxed overflow-x-auto">
                        {results.diffHighlights.map((part, idx) => (
                          <span
                            key={idx}
                            className={
                              part.added
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : part.removed
                                ? 'bg-red-500/20 text-red-300 line-through'
                                : 'text-gray-400'
                            }
                          >
                            {part.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
