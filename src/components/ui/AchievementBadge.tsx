import React from 'react';
import { Award, Trophy, Medal, Star, Target, Zap, Lock } from 'lucide-react';

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon?: 'award' | 'trophy' | 'medal' | 'star' | 'target' | 'zap';
  color?: 'cyan' | 'purple' | 'green' | 'amber' | 'blue' | 'pink';
  earned?: boolean;
  earnedDate?: string;
  className?: string;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  title,
  description,
  icon = 'award',
  color = 'cyan',
  earned = false,
  earnedDate,
  className = ''
}) => {
  // Icon mapping
  const iconMap = {
    award: Award,
    trophy: Trophy,
    medal: Medal,
    star: Star,
    target: Target,
    zap: Zap
  };

  const IconComponent = iconMap[icon];

  // Color mapping for gradients
  const gradientClasses = {
    cyan: 'from-cyan-400 to-blue-500',
    purple: 'from-purple-400 to-pink-500',
    green: 'from-green-400 to-emerald-500',
    amber: 'from-amber-400 to-orange-500',
    blue: 'from-blue-400 to-indigo-500',
    pink: 'from-pink-400 to-rose-500'
  };

  // Glow color for earned badges
  const glowClasses = {
    cyan: 'shadow-cyan-500/50',
    purple: 'shadow-purple-500/50',
    green: 'shadow-green-500/50',
    amber: 'shadow-amber-500/50',
    blue: 'shadow-blue-500/50',
    pink: 'shadow-pink-500/50'
  };

  return (
    <div
      className={`
        relative group
        bg-white dark:bg-slate-900
        border-2
        ${earned
          ? `border-${color}-500 dark:border-${color}-400`
          : 'border-gray-300 dark:border-slate-700'
        }
        rounded-xl p-4
        transition-all duration-300
        hover:scale-105
        ${earned ? `hover:shadow-lg ${glowClasses[color]}` : 'hover:shadow-md'}
        ${className}
      `}
    >
      {/* Icon */}
      <div className="flex justify-center mb-3">
        <div
          className={`
            p-4 rounded-full
            ${earned
              ? `bg-gradient-to-br ${gradientClasses[color]} shadow-lg`
              : 'bg-gray-200 dark:bg-slate-800'
            }
            transition-transform duration-300
            group-hover:scale-110
          `}
        >
          {earned ? (
            <IconComponent className="w-8 h-8 text-white" />
          ) : (
            <Lock className="w-8 h-8 text-gray-400 dark:text-slate-600" />
          )}
        </div>
      </div>

      {/* Title */}
      <h4
        className={`
          text-center font-bold text-sm mb-1
          ${earned
            ? 'text-gray-900 dark:text-white'
            : 'text-gray-500 dark:text-gray-500'
          }
        `}
      >
        {title}
      </h4>

      {/* Description */}
      <p
        className={`
          text-center text-xs
          ${earned
            ? 'text-gray-600 dark:text-gray-400'
            : 'text-gray-400 dark:text-gray-600'
          }
        `}
      >
        {description}
      </p>

      {/* Earned Date */}
      {earned && earnedDate && (
        <div className="mt-2 text-center">
          <span className="text-xs text-gray-500 dark:text-gray-500">
            Earned {earnedDate}
          </span>
        </div>
      )}

      {/* Locked Overlay (optional visual enhancement) */}
      {!earned && (
        <div className="absolute inset-0 bg-gray-100/50 dark:bg-slate-950/50 rounded-xl pointer-events-none" />
      )}

      {/* Glow effect for earned badges */}
      {earned && (
        <div
          className={`
            absolute inset-0 -z-10 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300
            bg-gradient-to-br ${gradientClasses[color]}
          `}
        />
      )}
    </div>
  );
};
