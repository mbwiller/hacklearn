/**
 * EraIndicator Component
 * Displays era badge with color coding
 */

import React from 'react';
import type { Era } from '@/data/timeline/types';
import type { EraBadgeProps } from '../types/timeline-ui';

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base'
};

export const EraIndicator: React.FC<EraBadgeProps> = ({
  era,
  size = 'md',
  showPeriod = false,
  className = ''
}) => {
  return (
    <span
      className={`
        inline-flex items-center gap-2 rounded-full border font-medium
        ${sizeClasses[size]} ${className}
      `}
      style={{
        borderColor: `${era.color}40`,
        backgroundColor: `${era.color}15`,
        color: era.color
      }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: era.color }}
      />
      <span>{era.name}</span>
      {showPeriod && (
        <span className="text-slate-400 text-xs">
          ({era.period})
        </span>
      )}
    </span>
  );
};
