/**
 * CategoryTag Component
 * Displays event category tags with optional interaction
 */

import React from 'react';
import {
  Rocket,
  ShieldAlert,
  BookOpen,
  Database,
  AlertTriangle,
  Cpu,
  Bug,
  TrendingUp,
  FileText
} from 'lucide-react';
import type { EventCategory } from '@/data/timeline/types';
import type { CategoryTagProps } from '../types/timeline-ui';

const categoryConfig: Record<EventCategory, { color: string; icon: React.ElementType }> = {
  'Model Release': { color: 'bg-blue-500/10 text-blue-400 border-blue-500/30', icon: Rocket },
  'Jailbreak': { color: 'bg-red-500/10 text-red-400 border-red-500/30', icon: ShieldAlert },
  'Research': { color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30', icon: BookOpen },
  'Vulnerability': { color: 'bg-orange-500/10 text-orange-400 border-orange-500/30', icon: Bug },
  'Prompt Injection': { color: 'bg-purple-500/10 text-purple-400 border-purple-500/30', icon: AlertTriangle },
  'Data Privacy': { color: 'bg-pink-500/10 text-pink-400 border-pink-500/30', icon: Database },
  'Alignment': { color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', icon: TrendingUp },
  'Behavioral Anomaly': { color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30', icon: Cpu },
  'Red Teaming': { color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30', icon: ShieldAlert },
  'Commercial Liability': { color: 'bg-rose-500/10 text-rose-400 border-rose-500/30', icon: FileText },
  'Supply Chain': { color: 'bg-amber-500/10 text-amber-400 border-amber-500/30', icon: Database },
  'Malware': { color: 'bg-red-600/10 text-red-500 border-red-600/30', icon: Bug },
  'Jailbreak Technique': { color: 'bg-violet-500/10 text-violet-400 border-violet-500/30', icon: ShieldAlert },
  'Analysis': { color: 'bg-slate-500/10 text-slate-400 border-slate-500/30', icon: BookOpen }
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm'
};

export const CategoryTag: React.FC<CategoryTagProps> = ({
  category,
  size = 'sm',
  isActive = false,
  onClick,
  className = ''
}) => {
  const config = categoryConfig[category];
  const Icon = config.icon;

  const baseClasses = `
    inline-flex items-center gap-1.5 rounded-full border font-medium
    transition-all duration-200
    ${config.color} ${sizeClasses[size]} ${className}
  `;

  const interactiveClasses = onClick
    ? 'cursor-pointer hover:scale-105 hover:shadow-lg'
    : '';

  const activeClasses = isActive
    ? 'ring-2 ring-cyan-400/50 scale-105'
    : '';

  return (
    <span
      className={`${baseClasses} ${interactiveClasses} ${activeClasses}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined}
    >
      <Icon className="h-3 w-3" />
      {category}
    </span>
  );
};
