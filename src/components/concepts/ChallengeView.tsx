import { Target, CheckCircle, XCircle } from 'lucide-react';
import type { Concept, ChallengeResult } from '../../types';

interface ChallengeViewProps {
  concept: Concept;
  answer: string;
  result: ChallengeResult | null;
  onAnswerSelect: (answer: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const ChallengeView = ({
  concept,
  answer,
  result,
  onAnswerSelect,
  onSubmit,
  onClose,
}: ChallengeViewProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-8 transition-colors">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-2xl p-8 shadow-lg transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-emerald-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Challenge: {concept.title}</h2>
          </div>

          <div className="bg-gray-100 dark:bg-[#0F0F0F] rounded-xl p-6 mb-6 border border-gray-200 dark:border-[#1F1F1F]">
            <p className="text-lg mb-6 text-gray-900 dark:text-white">{concept.challenge.question}</p>

            <div className="space-y-3">
              {concept.challenge.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => onAnswerSelect(option.charAt(0))}
                  className={`w-full text-left p-4 rounded-lg transition-all text-gray-900 dark:text-white ${
                    answer === option.charAt(0)
                      ? 'bg-emerald-500/20 border-2 border-emerald-500'
                      : 'bg-white dark:bg-[#0F0F0F] border-2 border-gray-300 dark:border-[#1F1F1F] hover:border-emerald-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {result && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                result.success
                  ? 'bg-green-500/20 border border-green-500'
                  : 'bg-red-500/20 border border-red-500'
              }`}
            >
              <div className="flex items-center gap-2">
                {result.success ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                <p className="font-semibold text-gray-900 dark:text-white">{result.message}</p>
              </div>
              {!result.success && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{concept.challenge.explanation}</p>
              )}
              {result.success && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  You earned {concept.points} points!
                </p>
              )}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={onSubmit}
              disabled={!answer || !!result}
              className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white"
            >
              Submit Answer
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] hover:border-emerald-500 rounded-lg font-semibold transition-all text-gray-900 dark:text-white"
            >
              {result ? 'Continue' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
