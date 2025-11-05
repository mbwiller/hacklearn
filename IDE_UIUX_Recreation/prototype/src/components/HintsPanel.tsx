import { useState } from 'react';
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
    <div className="h-full bg-leetcode-dark-bg-2 p-4 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-6 h-6 text-leetcode-accent-orange" />
          <h3 className="text-lg font-semibold text-leetcode-text-primary">Hints</h3>
        </div>
        <p className="text-leetcode-text-muted text-sm leading-relaxed">
          Stuck? Reveal hints one at a time to guide you through the solution.
        </p>
      </div>

      {/* Hints List */}
      <div className="space-y-3 mb-8">
        {hints.map((hint, index) => (
          <div
            key={index}
            className="bg-leetcode-dark-bg-3 rounded-lg overflow-hidden border border-transparent hover:border-leetcode-accent-blue/30 transition-all"
          >
            <button
              onClick={() => toggleHint(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-opacity-80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-leetcode-accent-blue/20 text-leetcode-accent-blue text-xs font-semibold">
                  {index + 1}
                </span>
                <span className="text-leetcode-text-primary font-medium text-sm">
                  Hint {index + 1}
                </span>
              </div>
              {expandedHints.has(index) ? (
                <ChevronDown className="w-4 h-4 text-leetcode-text-muted" />
              ) : (
                <ChevronRight className="w-4 h-4 text-leetcode-text-muted" />
              )}
            </button>

            {expandedHints.has(index) && (
              <div className="px-4 pb-4 text-sm text-leetcode-text-secondary leading-relaxed border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                <p className="pt-3">{hint}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Premium Upsell */}
      <div className="mt-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg p-5 border border-purple-500/30">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-leetcode-accent-orange" />
          <span className="text-leetcode-accent-orange font-semibold">HackLearn Pro</span>
        </div>
        <p className="text-sm text-leetcode-text-secondary leading-relaxed mb-4">
          Unlock step-by-step video walkthroughs, detailed explanations for every line of code, and access to 100+ advanced security challenges.
        </p>
        <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded font-medium text-sm transition-all">
          Upgrade to Pro
        </button>
      </div>

      {/* Additional Resources */}
      <div className="mt-6">
        <h4 className="text-leetcode-text-primary font-semibold text-sm mb-3">
          Related Topics
        </h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 bg-leetcode-dark-bg-3 text-leetcode-text-muted rounded-full text-xs hover:bg-opacity-80 cursor-pointer transition-colors">
            SQL Injection
          </span>
          <span className="px-3 py-1.5 bg-leetcode-dark-bg-3 text-leetcode-text-muted rounded-full text-xs hover:bg-opacity-80 cursor-pointer transition-colors">
            Web Security
          </span>
          <span className="px-3 py-1.5 bg-leetcode-dark-bg-3 text-leetcode-text-muted rounded-full text-xs hover:bg-opacity-80 cursor-pointer transition-colors">
            Blind Boolean
          </span>
        </div>
      </div>
    </div>
  );
};
