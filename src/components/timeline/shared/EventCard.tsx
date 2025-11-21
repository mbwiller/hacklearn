/**
 * EventCard Component
 * Reusable event card for timeline views
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronRight } from 'lucide-react';
import type { TimelineEvent } from '@/data/timeline/types';
import type { EventCardVariant } from '../types/timeline-ui';
import { ImpactBadge } from './ImpactBadge';
import { CategoryTag } from './CategoryTag';

interface EventCardProps extends EventCardVariant {
  event: TimelineEvent;
  era?: { name: string; color: string };
  onSelect?: (eventId: string) => void;
}

/**
 * Format date from YYYY-MM to readable format
 */
function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  era,
  variant = 'detailed',
  isSelected = false,
  showTechniques = true,
  showDescription = true,
  onSelect,
  className = ''
}) => {
  const isCompact = variant === 'compact';
  const isGrid = variant === 'grid';

  const handleClick = () => {
    if (onSelect) {
      onSelect(event.id);
    }
  };

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-lg border backdrop-blur-xl
        transition-all duration-300 cursor-pointer
        ${isSelected
          ? 'border-cyan-400/50 bg-slate-900/70 shadow-xl shadow-cyan-400/20'
          : 'border-white/10 bg-slate-900/50 hover:border-cyan-400/30 hover:bg-slate-900/60'
        }
        ${isCompact ? 'p-3' : 'p-4'}
        ${className}
      `}
      onClick={handleClick}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      layout
    >
      {/* Era accent bar */}
      {era && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ backgroundColor: era.color }}
        />
      )}

      <div className="space-y-3">
        {/* Header: Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <ImpactBadge level={event.impact} size="sm" />
          <CategoryTag category={event.category} size="sm" />
          {!isCompact && (
            <span className="text-xs text-slate-400 ml-auto">
              {formatDate(event.date)}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={`font-bold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
          {event.title}
        </h3>

        {/* Description */}
        {showDescription && !isCompact && (
          <p className={`text-slate-300 ${isGrid ? 'line-clamp-2' : 'line-clamp-3'} text-sm leading-relaxed`}>
            {event.description}
          </p>
        )}

        {/* Tags */}
        {showTechniques && event.tags && event.tags.length > 0 && !isCompact && (
          <div className="flex flex-wrap gap-1.5">
            {event.tags.slice(0, isGrid ? 3 : 5).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-xs rounded bg-slate-800/50 text-slate-400 border border-slate-700/50"
              >
                {tag}
              </span>
            ))}
            {event.tags.length > (isGrid ? 3 : 5) && (
              <span className="px-2 py-0.5 text-xs rounded bg-slate-800/50 text-slate-400">
                +{event.tags.length - (isGrid ? 3 : 5)}
              </span>
            )}
          </div>
        )}

        {/* Footer: CTA */}
        <div className="flex items-center justify-between pt-2">
          <button
            className="text-sm text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              if (onSelect) onSelect(event.id);
            }}
          >
            View Details
            <ChevronRight className="h-4 w-4" />
          </button>

          {event.source_url && (
            <a
              href={event.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
              onClick={(e) => e.stopPropagation()}
              aria-label="View source"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
