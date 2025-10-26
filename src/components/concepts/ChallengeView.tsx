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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-cyan-400" />
            <h2 className="text-2xl font-bold">Challenge: {concept.title}</h2>
          </div>

          <div className="bg-white/5 rounded-xl p-6 mb-6">
            <p className="text-lg mb-6">{concept.challenge.question}</p>

            <div className="space-y-3">
              {concept.challenge.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => onAnswerSelect(option.charAt(0))}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    answer === option.charAt(0)
                      ? 'bg-cyan-500/30 border-2 border-cyan-400'
                      : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
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
                <p className="font-semibold">{result.message}</p>
              </div>
              {!result.success && (
                <p className="mt-2 text-sm text-gray-200">{concept.challenge.explanation}</p>
              )}
              {result.success && (
                <p className="mt-2 text-sm text-gray-200">
                  You earned {concept.points} points!
                </p>
              )}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={onSubmit}
              disabled={!answer || !!result}
              className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-all"
            >
              {result ? 'Continue' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
