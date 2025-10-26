import { CheckCircle, Star, ChevronRight } from 'lucide-react';
import type { Concept } from '../../types';
import { DifficultyBadge } from '../ui/DifficultyBadge';

interface ConceptCardProps {
  concept: Concept;
  isCompleted: boolean;
  onClick: () => void;
}

export const ConceptCard = ({ concept, isCompleted, onClick }: ConceptCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all transform hover:scale-105 group relative overflow-hidden"
    >
      {isCompleted && (
        <div className="absolute top-3 right-3">
          <CheckCircle className="w-6 h-6 text-green-400" />
        </div>
      )}

      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg">
          {concept.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{concept.title}</h3>
          <DifficultyBadge difficulty={concept.difficulty} />
        </div>
      </div>

      <p className="text-sm text-gray-300 mb-4 line-clamp-2">{concept.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-yellow-400 flex items-center gap-1">
          <Star className="w-4 h-4" /> {concept.points} pts
        </span>
        <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
