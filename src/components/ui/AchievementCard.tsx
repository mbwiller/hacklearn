import { Trophy } from 'lucide-react';

interface AchievementCardProps {
  achievement: string;
}

export const AchievementCard = ({ achievement }: AchievementCardProps) => {
  return (
    <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 flex items-center gap-2">
      <Trophy className="w-5 h-5 text-yellow-400" />
      <span className="text-sm">{achievement}</span>
    </div>
  );
};
