import React from 'react';

interface ProgressRingProps {
  value: number; // 0-100
  max?: number; // Default 100
  size?: 'sm' | 'md' | 'lg'; // Size variants
  color?: 'cyan' | 'purple' | 'green' | 'amber' | 'blue';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'cyan',
  showLabel = true,
  label,
  className = ''
}) => {
  // Size configurations
  const sizeConfig = {
    sm: { dimension: 80, strokeWidth: 6, fontSize: 'text-lg' },
    md: { dimension: 120, strokeWidth: 8, fontSize: 'text-2xl' },
    lg: { dimension: 160, strokeWidth: 10, fontSize: 'text-3xl' }
  };

  const { dimension, strokeWidth, fontSize } = sizeConfig[size];
  const radius = (dimension - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((value / max) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  // Color mapping for stroke
  const colorClasses = {
    cyan: 'stroke-cyan-500',
    purple: 'stroke-purple-500',
    green: 'stroke-green-500',
    amber: 'stroke-amber-500',
    blue: 'stroke-blue-500'
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
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: dimension, height: dimension }}>
        <svg
          width={dimension}
          height={dimension}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            className="stroke-gray-200 dark:stroke-slate-800"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Progress circle */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            className={colorClasses[color]}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out'
            }}
          />
        </svg>

        {/* Center text */}
        {showLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`${fontSize} font-bold ${textColorClasses[color]}`}>
              {Math.round(percentage)}%
            </span>
            {label && (
              <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {label}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Value display below ring */}
      <div className="mt-2 text-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {value} / {max}
        </span>
      </div>
    </div>
  );
};
