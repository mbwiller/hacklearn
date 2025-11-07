import { motion } from 'framer-motion';
import { Calculator, Puzzle, Link2 } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

/** Problem difficulty levels */
export type Difficulty = 'easy' | 'medium' | 'hard';

/** Problem definition */
export interface Problem {
  id: string | number;
  title: string;
  content: string;
  difficulty: Difficulty;
  icon?: LucideIcon;
  expectedAnswer?: string;
}

/** Problem selector props */
export interface ProblemSelectorProps {
  /** Available problems */
  problems: Problem[];
  /** Currently selected problem */
  selectedProblem?: Problem;
  /** Callback when problem is selected */
  onSelect: (problem: Problem) => void;
  /** Custom className */
  className?: string;
}

/**
 * Get icon for problem type (default icons for common types)
 */
const getDefaultIcon = (title: string): LucideIcon => {
  const lower = title.toLowerCase();
  if (lower.includes('math') || lower.includes('calculate')) return Calculator;
  if (lower.includes('logic') || lower.includes('puzzle')) return Puzzle;
  if (lower.includes('multi') || lower.includes('chain')) return Link2;
  return Calculator; // Default
};

/**
 * Get difficulty badge colors
 */
const getDifficultyColors = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy':
      return {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
      };
    case 'medium':
      return {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/30',
        text: 'text-yellow-400',
      };
    case 'hard':
      return {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
      };
  }
};

/**
 * Premium problem selector with visual cards and hover effects
 */
export const ProblemSelector = ({
  problems,
  selectedProblem,
  onSelect,
  className = '',
}: ProblemSelectorProps) => {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
        Quick Start Problems
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {problems.map((problem, idx) => {
          const Icon = problem.icon || getDefaultIcon(problem.title);
          const difficultyColors = getDifficultyColors(problem.difficulty);
          const isSelected = selectedProblem?.id === problem.id;

          return (
            <motion.button
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(problem)}
              className={`
                group relative p-5 rounded-xl text-left transition-all
                backdrop-blur-xl border shadow-xl
                ${isSelected
                  ? 'bg-cyan-500/20 border-cyan-500/50 shadow-cyan-500/20'
                  : 'bg-white/5 border-white/10 hover:border-cyan-500/30 hover:shadow-cyan-500/10'
                }
              `}
            >
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent rounded-xl pointer-events-none" />

              {/* Content */}
              <div className="relative space-y-3">
                {/* Title with icon */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className={`text-base font-semibold mb-1 transition-colors ${
                      isSelected ? 'text-cyan-400' : 'text-gray-300 group-hover:text-cyan-400'
                    }`}>
                      {problem.title}
                    </h4>
                    {/* Underline decoration */}
                    <div className={`h-0.5 w-12 rounded-full transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-400 to-emerald-400'
                        : 'bg-gradient-to-r from-gray-600 to-gray-700 group-hover:from-cyan-400 group-hover:to-emerald-400'
                    }`} />
                  </div>

                  {/* Icon */}
                  <div className={`p-2.5 rounded-lg transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20'
                      : 'bg-white/5 group-hover:bg-cyan-500/10'
                  }`}>
                    <Icon className={`w-6 h-6 transition-colors ${
                      isSelected ? 'text-cyan-400' : 'text-gray-400 group-hover:text-cyan-400'
                    }`} />
                  </div>
                </div>

                {/* Problem preview */}
                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                  {problem.content}
                </p>

                {/* Difficulty badge */}
                <div className="flex items-center justify-between">
                  <span className={`
                    inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold
                    ${difficultyColors.bg} ${difficultyColors.border} ${difficultyColors.text}
                    border transition-all
                  `}>
                    {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                  </span>

                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xs text-cyan-400 font-semibold"
                    >
                      ✓ Selected
                    </motion.span>
                  )}
                </div>
              </div>

              {/* Hover glow effect */}
              <div className={`
                absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
                ${isSelected ? 'opacity-100' : ''}
              `} style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.1), transparent 70%)',
              }} />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Preset problems for CoT module
 */
export const COT_PRESET_PROBLEMS: Problem[] = [
  {
    id: 1,
    title: 'Math Word Problem',
    content: 'A restaurant served 9 pizzas during lunch and 6 during dinner today. It served 3 pizzas yesterday. How many pizzas were served in total?',
    difficulty: 'easy',
    icon: Calculator,
    expectedAnswer: '18',
  },
  {
    id: 2,
    title: 'Logic Puzzle',
    content: 'If all roses are flowers and some flowers fade quickly, can we conclude that some roses fade quickly?',
    difficulty: 'medium',
    icon: Puzzle,
    expectedAnswer: 'No',
  },
  {
    id: 3,
    title: 'Multi-Step Reasoning',
    content: 'Sarah has 3 times as many apples as oranges. She has 12 more apples than bananas. If she has 8 bananas, how many pieces of fruit does she have in total?',
    difficulty: 'hard',
    icon: Link2,
    expectedAnswer: '36',
  },
];
