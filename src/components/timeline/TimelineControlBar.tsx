/**
 * TimelineControlBar Component
 * Filters and view mode controls for the timeline
 */

import React, { useState, useMemo } from 'react';
import { Search, X, Filter, BarChart3, History, Target, Sparkles } from 'lucide-react';
import type { Era, ImpactLevel, EventCategory } from '@/data/timeline/types';
import type { ViewMode, FilterAction } from './types/timeline-ui';

interface TimelineControlBarProps {
  // View mode
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;

  // Filters
  eras: Era[];
  selectedEras: Set<string>;
  selectedImpactLevels: Set<ImpactLevel>;
  selectedCategories: Set<EventCategory>;
  searchQuery: string;
  onFilterDispatch: React.Dispatch<FilterAction>;
  isFiltered: boolean;
  onResetFilters: () => void;

  // Results count
  filteredCount: number;
  totalCount: number;
}

const viewModes: Array<{ id: ViewMode; label: string; icon: React.ElementType }> = [
  { id: 'timeline', label: 'Timeline', icon: History },
  { id: 'era-focus', label: 'Era Focus', icon: Target },
  { id: 'statistics', label: 'Statistics', icon: BarChart3 }
];

const impactLevels: ImpactLevel[] = ['foundational', 'critical', 'high', 'medium', 'low'];

const impactColors: Record<ImpactLevel, string> = {
  foundational: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  critical: 'bg-red-500/10 text-red-400 border-red-500/30',
  high: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  low: 'bg-green-500/10 text-green-400 border-green-500/30'
};

export const TimelineControlBar: React.FC<TimelineControlBarProps> = ({
  currentMode,
  onModeChange,
  eras,
  selectedEras,
  selectedImpactLevels,
  selectedCategories,
  searchQuery,
  onFilterDispatch,
  isFiltered,
  onResetFilters,
  filteredCount,
  totalCount
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  // Available categories from unique event categories
  const availableCategories = useMemo<EventCategory[]>(() => [
    'Model Release',
    'Jailbreak',
    'Research',
    'Vulnerability',
    'Prompt Injection',
    'Data Privacy',
    'Alignment',
    'Red Teaming',
    'Malware',
    'Supply Chain'
  ], []);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    // Debounce search (simplified - instant for now)
    onFilterDispatch({ type: 'SET_SEARCH', payload: value });
  };

  return (
    <div className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 pb-4">
      <div className="flex flex-col gap-4">
        {/* Top Row: View Mode Selector & Search */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* View Mode Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-lg bg-slate-900/50 border border-white/10">
            {viewModes.map((mode) => {
              const Icon = mode.icon;
              const isActive = currentMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => onModeChange(mode.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all
                    ${isActive
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search events..."
                className="w-full pl-10 pr-10 py-2 rounded-lg bg-slate-900/50 border border-white/10
                         text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50
                         focus:ring-1 focus:ring-cyan-400/50 transition-all"
              />
              {searchInput && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400
                           hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Toggle & Reset */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-all
                ${showFilters
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                  : 'bg-slate-900/50 text-slate-300 border-white/10 hover:border-cyan-400/30'
                }
              `}
            >
              <Filter className="h-4 w-4" />
              Filters
              {isFiltered && (
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </button>

            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700
                         hover:text-white border border-slate-700 transition-all font-medium"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Filters Panel (Collapsible) */}
        {showFilters && (
          <div className="p-4 rounded-lg bg-slate-900/30 border border-white/10 space-y-4">
            {/* Era Filters */}
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                Eras
              </label>
              <div className="flex flex-wrap gap-2">
                {eras.map((era) => {
                  const isSelected = selectedEras.has(era.id);
                  return (
                    <button
                      key={era.id}
                      onClick={() => onFilterDispatch({ type: 'TOGGLE_ERA', payload: era.id })}
                      className={`
                        px-3 py-1.5 rounded-full text-sm font-medium border transition-all
                        ${isSelected
                          ? 'scale-105 shadow-lg'
                          : 'hover:scale-105'
                        }
                      `}
                      style={{
                        borderColor: isSelected ? era.color : `${era.color}40`,
                        backgroundColor: isSelected ? `${era.color}25` : `${era.color}10`,
                        color: era.color
                      }}
                    >
                      {era.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Impact Level Filters */}
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                Impact Level
              </label>
              <div className="flex flex-wrap gap-2">
                {impactLevels.map((level) => {
                  const isSelected = selectedImpactLevels.has(level);
                  return (
                    <button
                      key={level}
                      onClick={() => onFilterDispatch({ type: 'TOGGLE_IMPACT', payload: level })}
                      className={`
                        px-3 py-1.5 rounded-full text-sm font-medium border transition-all capitalize
                        ${impactColors[level]}
                        ${isSelected ? 'scale-105 shadow-lg ring-2 ring-offset-2 ring-offset-slate-950' : 'hover:scale-105'}
                      `}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filters */}
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((category) => {
                  const isSelected = selectedCategories.has(category);
                  return (
                    <button
                      key={category}
                      onClick={() => onFilterDispatch({ type: 'TOGGLE_CATEGORY', payload: category })}
                      className={`
                        px-3 py-1.5 rounded-full text-sm font-medium border transition-all
                        ${isSelected
                          ? 'bg-purple-500/20 text-purple-400 border-purple-500/30 scale-105 shadow-lg'
                          : 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:border-purple-500/30 hover:scale-105'
                        }
                      `}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <Sparkles className="h-4 w-4" />
            <span>
              Showing <span className="text-cyan-400 font-semibold">{filteredCount}</span> of{' '}
              <span className="text-white font-semibold">{totalCount}</span> events
            </span>
          </div>

          {isFiltered && (
            <span className="text-cyan-400 text-xs font-medium">
              Filters active
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
