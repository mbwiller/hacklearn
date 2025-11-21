/**
 * ImpactBadge Component
 * Displays color-coded impact level badges
 */

import React from 'react';
import { AlertTriangle, Zap, AlertCircle, Info, Star } from 'lucide-react';
import type { ImpactLevel } from '@/data/timeline/types';
import type { ImpactBadgeProps } from '../types/timeline-ui';

const impactConfig: Record<ImpactLevel, { color: string; bgColor: string; icon: React.ElementType; label: string }> = {
  foundational: {
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10 border-cyan-500/30',
    icon: Star,
    label: 'Foundational'
  },
  critical: {
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/30',
    icon: AlertTriangle,
    label: 'Critical'
  },
  high: {
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10 border-orange-500/30',
    icon: Zap,
    label: 'High'
  },
  medium: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10 border-yellow-500/30',
    icon: AlertCircle,
    label: 'Medium'
  },
  low: {
    color: 'text-green-400',
    bgColor: 'bg-green-500/10 border-green-500/30',
    icon: Info,
    label: 'Low'
  }
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base'
};

const iconSizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5'
};

export const ImpactBadge: React.FC<ImpactBadgeProps> = ({
  level,
  size = 'md',
  showIcon = true,
  className = ''
}) => {
  const config = impactConfig[level];
  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full border font-medium
        ${config.color} ${config.bgColor} ${sizeClasses[size]} ${className}
      `}
    >
      {showIcon && <Icon className={iconSizeClasses[size]} />}
      {config.label}
    </span>
  );
};
