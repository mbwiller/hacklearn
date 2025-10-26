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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-cyan-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              HackLearn Pro
            </h1>
          </div>
          <p className="text-xl text-gray-300">Master Ethical Hacking & AI Security</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard icon={Trophy} label="Level" value={level} iconColor="text-yellow-400" />
          <StatsCard icon={Star} label="Points" value={points} iconColor="text-yellow-400" />
          <StatsCard
            icon={Target}
            label="Completed"
            value={`${completedCount}/${concepts.length}`}
            iconColor="text-cyan-400"
          />
          <StatsCard icon={Award} label="Achievements" value={achievements.length} iconColor="text-purple-400" />
        </div>

        {/* Progress Bar */}
        <ProgressBar progress={progressPercent} />

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mt-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-400" />
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
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                {category === 'AI/ML Security' ? (
                  <Brain className="w-6 h-6" />
                ) : (
                  <Lock className="w-6 h-6" />
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
