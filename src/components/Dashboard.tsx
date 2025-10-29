import { Shield, Brain, Lock } from 'lucide-react';
import type { Concept, Progress } from '../types';
import { ConceptCard } from './concepts/ConceptCard';

interface DashboardProps {
  concepts: Concept[];
  progress: Progress;
  onConceptClick: (conceptId: number) => void;
}

export const Dashboard = ({
  concepts,
  progress,
  onConceptClick,
}: DashboardProps) => {

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-emerald-500" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              HackLearn Pro
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">Master Ethical Hacking & AI Security</p>
        </div>

        {/* Concept Categories */}
        <div className="space-y-8 mt-8">
          {['AI/ML Security', 'Traditional Hacking'].map(category => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                {category === 'AI/ML Security' ? (
                  <Brain className="w-6 h-6 text-emerald-500" />
                ) : (
                  <Lock className="w-6 h-6 text-emerald-500" />
                )}
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {concepts
                  .filter(c => c.category === category)
                  .map(concept => (
                    <ConceptCard
                      key={concept.id}
                      concept={concept}
                      isCompleted={!!progress[concept.id]}
                      onClick={() => onConceptClick(concept.id)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
