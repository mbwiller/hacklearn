import { useState } from 'react';
import { ArrowDown, ChevronDown, ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card';

interface ReasoningStep {
  number: number;
  content: string;
}

interface ReasoningVisualizerProps {
  response: string;
  title?: string;
}

export const ReasoningVisualizer = ({
  response,
  title = 'Reasoning Steps',
}: ReasoningVisualizerProps) => {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());

  // Parse reasoning steps from response
  const parseSteps = (text: string): ReasoningStep[] => {
    if (!text) return [];

    const steps: ReasoningStep[] = [];

    // Strategy 1: Try to match "Step N:" format (most common in CoT)
    const stepRegex = /Step\s+(\d+):\s*([^]*?)(?=Step\s+\d+:|$)/gi;
    let matches = [...text.matchAll(stepRegex)];

    if (matches.length > 0) {
      matches.forEach((match) => {
        steps.push({
          number: parseInt(match[1]),
          content: match[2].trim(),
        });
      });
      return steps;
    }

    // Strategy 2: Try numbered list format "1.", "2.", etc.
    const numberedRegex = /^(\d+)\.\s+([^]*?)(?=^\d+\.|$)/gim;
    matches = [...text.matchAll(numberedRegex)];

    if (matches.length > 1) {
      // Only use if we found at least 2 steps
      matches.forEach((match) => {
        steps.push({
          number: parseInt(match[1]),
          content: match[2].trim(),
        });
      });
      return steps;
    }

    // Strategy 3: Try numbered list with parentheses "1)", "2)", etc.
    const parenRegex = /^(\d+)\)\s+([^]*?)(?=^\d+\)|$)/gim;
    matches = [...text.matchAll(parenRegex)];

    if (matches.length > 1) {
      matches.forEach((match) => {
        steps.push({
          number: parseInt(match[1]),
          content: match[2].trim(),
        });
      });
      return steps;
    }

    // Strategy 4: Split by sentences/paragraphs if no clear structure
    // Look for natural reasoning progression
    const sentences = text
      .split(/\n+/)
      .filter((line) => line.trim().length > 10) // Filter out very short lines
      .slice(0, 10); // Max 10 steps

    if (sentences.length > 1) {
      sentences.forEach((sentence, idx) => {
        steps.push({
          number: idx + 1,
          content: sentence.trim(),
        });
      });
      return steps;
    }

    // Fallback: Return the whole response as a single step
    return [{ number: 1, content: text.trim() }];
  };

  const steps = parseSteps(response);

  // Toggle step expansion
  const toggleStep = (stepNumber: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepNumber)) {
      newExpanded.delete(stepNumber);
    } else {
      newExpanded.add(stepNumber);
    }
    setExpandedSteps(newExpanded);
  };

  // Toggle all steps
  const expandAll = () => {
    setExpandedSteps(new Set(steps.map((s) => s.number)));
  };

  const collapseAll = () => {
    setExpandedSteps(new Set());
  };

  if (steps.length === 0) {
    return null;
  }

  // Don't show visualizer if only 1 step (no reasoning chain)
  if (steps.length === 1 && steps[0].content === response.trim()) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Expand All
          </button>
          <span className="text-gray-500 dark:text-gray-600">|</span>
          <button
            onClick={collapseAll}
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => {
          const isExpanded = expandedSteps.has(step.number);
          const isLast = idx === steps.length - 1;

          return (
            <div key={step.number} className="relative">
              <Card
                className={`bg-white dark:bg-[#0A0A0A] transition-all cursor-pointer ${
                  isExpanded
                    ? 'border-cyan-500 dark:border-cyan-500 shadow-lg shadow-cyan-500/10'
                    : 'border-gray-200 dark:border-[#1F1F1F] hover:border-cyan-500/50 dark:hover:border-cyan-500/50'
                }`}
                onClick={() => toggleStep(step.number)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full">
                      <span className="text-white font-bold text-sm">{step.number}</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">
                          Step {step.number}
                        </h4>
                        {isExpanded ? (
                          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                            {step.content}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {step.content}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStep(step.number);
                        }}
                        className="flex-shrink-0 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                        aria-label={isExpanded ? 'Collapse step' : 'Expand step'}
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Connector Arrow */}
              {!isLast && (
                <div className="flex justify-center my-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-400 to-cyan-600"></div>
                    <ArrowDown className="w-5 h-5 text-cyan-400" />
                    <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-400 to-cyan-600"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Final Answer Highlight */}
      {steps.length > 1 && (
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/30">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 p-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-emerald-400 mb-1">
                Reasoning Complete
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {steps.length} steps identified in the Chain of Thought reasoning process
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
