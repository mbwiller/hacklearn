import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconColor?: string;
}

export const StatsCard = ({ icon: Icon, label, value, iconColor = 'text-yellow-400' }: StatsCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <Icon className={`w-6 h-6 ${iconColor}`} />
        <span className="text-gray-300">{label}</span>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};
