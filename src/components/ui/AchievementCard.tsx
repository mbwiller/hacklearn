import { Trophy } from 'lucide-react';

interface AchievementCardProps {
  achievement: string;
}

export const AchievementCard = ({ achievement }: AchievementCardProps) => {
  return (
    <div className="bg-emerald-500/10 border border-emerald-500/30 dark:border-emerald-500/50 rounded-lg p-3 flex items-center gap-2 transition-colors">
      <Trophy className="w-5 h-5 text-emerald-500" />
      <span className="text-sm text-gray-900 dark:text-gray-100">{achievement}</span>
    </div>
  );
};
