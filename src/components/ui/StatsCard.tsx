import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  color?: 'cyan' | 'purple' | 'green' | 'amber' | 'blue';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  label,
  value,
  subtitle,
  color = 'cyan',
  trend,
  trendValue,
  className = ''
}) => {
  // Color mapping for gradient backgrounds
  const gradientClasses = {
    cyan: 'from-cyan-400 to-blue-500',
    purple: 'from-purple-400 to-pink-500',
    green: 'from-green-400 to-emerald-500',
    amber: 'from-amber-400 to-orange-500',
    blue: 'from-blue-400 to-indigo-500'
  };

  // Text color mapping
  const textColorClasses = {
    cyan: 'text-cyan-500 dark:text-cyan-400',
    purple: 'text-purple-500 dark:text-purple-400',
    green: 'text-green-500 dark:text-green-400',
    amber: 'text-amber-500 dark:text-amber-400',
    blue: 'text-blue-500 dark:text-blue-400'
  };

  return (
    <div
      className={`
        bg-white dark:bg-slate-900
        border border-gray-200 dark:border-slate-800
        rounded-xl p-6
        transition-all duration-300
        hover:shadow-lg hover:scale-[1.02]
        ${className}
      `}
    >
      {/* Icon and Label */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-gradient-to-br ${gradientClasses[color]} rounded-lg shadow-md`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            {label}
          </h3>
        </div>

        {/* Trend Indicator */}
        {trend && trend !== 'neutral' && (
          <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {trendValue && <span className="font-medium">{trendValue}</span>}
          </div>
        )}
      </div>

      {/* Main Value */}
      <div className={`text-4xl font-bold mb-2 ${textColorClasses[color]}`}>
        {value}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
};
