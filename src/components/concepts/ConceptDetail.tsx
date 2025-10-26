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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl">
              {concept.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold">{concept.title}</h2>
                {isCompleted && <CheckCircle className="w-8 h-8 text-green-400" />}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-cyan-300">{concept.category}</span>
                <DifficultyBadge difficulty={concept.difficulty} />
                <span className="text-yellow-400 flex items-center gap-1">
                  <Star className="w-4 h-4" /> {concept.points} pts
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Overview
              </h3>
              <p className="text-gray-200 leading-relaxed">{concept.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Real-World Example
              </h3>
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                <p className="text-gray-200">{concept.realWorldExample}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5" /> Key Takeaways
              </h3>
              <ul className="space-y-2">
                {concept.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" /> Defense Strategies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {concept.defenses.map((defense, idx) => (
                  <div key={idx} className="bg-green-500/20 border border-green-500/50 rounded-lg p-3">
                    <p className="text-sm text-gray-200">{defense}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onStartChallenge}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
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
