import { Shield, Trophy, Star, Target, Award, Brain, Lock } from 'lucide-react';
import type { Concept, Progress } from '../types';
import { StatsCard } from './ui/StatsCard';
import { ProgressBar } from './ui/ProgressBar';
import { AchievementCard } from './ui/AchievementCard';
import { ConceptCard } from './concepts/ConceptCard';

interface DashboardProps {
  concepts: Concept[];
  progress: Progress;
  points: number;
  level: number;
  achievements: string[];
  progressPercent: number;
  onConceptClick: (conceptId: number) => void;
}

export const Dashboard = ({
  concepts,
  progress,
  points,
  level,
  achievements,
  progressPercent,
  onConceptClick,
}: DashboardProps) => {
  const completedCount = Object.values(progress).filter(v => v).length;

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

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard icon={Trophy} label="Level" value={level} iconColor="text-emerald-500" />
          <StatsCard icon={Star} label="Points" value={points} iconColor="text-emerald-500" />
          <StatsCard
            icon={Target}
            label="Completed"
            value={`${completedCount}/${concepts.length}`}
            iconColor="text-emerald-500"
          />
          <StatsCard icon={Award} label="Achievements" value={achievements.length} iconColor="text-emerald-500" />
        </div>

        {/* Progress Bar */}
        <ProgressBar progress={progressPercent} />

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-xl p-6 mt-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
              <Award className="w-6 h-6 text-emerald-500" />
              Recent Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {achievements.slice(-4).map((achievement, idx) => (
                <AchievementCard key={idx} achievement={achievement} />
              ))}
            </div>
          </div>
        )}

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
