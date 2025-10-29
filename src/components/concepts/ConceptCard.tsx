import { CheckCircle, ChevronRight } from 'lucide-react';
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
      className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-xl p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#0F0F0F] hover:border-emerald-500 transition-all transform hover:scale-105 group relative overflow-hidden"
    >
      {isCompleted && (
        <div className="absolute top-3 right-3">
          <CheckCircle className="w-6 h-6 text-green-500" />
        </div>
      )}

      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg">
          {concept.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{concept.title}</h3>
          <DifficultyBadge difficulty={concept.difficulty} />
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{concept.description}</p>

      <div className="flex items-center justify-end">
        <ChevronRight className="w-5 h-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
