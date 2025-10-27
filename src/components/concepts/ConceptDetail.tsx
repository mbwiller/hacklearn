import { CheckCircle, Star, BookOpen, AlertTriangle, Brain, Shield, Target } from 'lucide-react';
import type { Concept } from '../../types';
import { DifficultyBadge } from '../ui/DifficultyBadge';

interface ConceptDetailProps {
  concept: Concept;
  isCompleted: boolean;
  onBack: () => void;
  onStartChallenge: () => void;
}

export const ConceptDetail = ({ concept, isCompleted, onBack, onStartChallenge }: ConceptDetailProps) => {
  // If concept has a detailed component, render that instead
  if (concept.detailedComponent) {
    return <>{concept.detailedComponent({ onBack, onStartChallenge })}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] hover:border-emerald-500 rounded-lg transition-all text-gray-900 dark:text-white"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-2xl p-8 shadow-lg transition-colors">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl">
              {concept.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{concept.title}</h2>
                {isCompleted && <CheckCircle className="w-8 h-8 text-green-400" />}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-emerald-500">{concept.category}</span>
                <DifficultyBadge difficulty={concept.difficulty} />
                <span className="text-emerald-500 flex items-center gap-1">
                  <Star className="w-4 h-4" /> {concept.points} pts
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                <BookOpen className="w-5 h-5" /> Overview
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{concept.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                <AlertTriangle className="w-5 h-5" /> Real-World Example
              </h3>
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                <p className="text-gray-600 dark:text-gray-300">{concept.realWorldExample}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                <Brain className="w-5 h-5" /> Key Takeaways
              </h3>
              <ul className="space-y-2">
                {concept.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                <Shield className="w-5 h-5" /> Defense Strategies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {concept.defenses.map((defense, idx) => (
                  <div key={idx} className="bg-green-500/20 border border-green-500/50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 dark:text-gray-300">{defense}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onStartChallenge}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-white"
            >
              <Target className="w-6 h-6" />
              Take the Challenge!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
