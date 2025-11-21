/**
 * EraFocusMode Component
 * Focused view of a single era with detailed event cards
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import type { TimelineEvent, Era } from '@/data/timeline/types';
import { EventCard } from '../shared/EventCard';

interface EraFocusModeProps {
  events: TimelineEvent[];
  eras: Era[];
  initialEraId?: string;
  onSelectEvent: (eventId: string) => void;
  onBackToTimeline?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    } as const
  },
  exit: { y: 20, opacity: 0 }
};

export const EraFocusMode: React.FC<EraFocusModeProps> = ({
  events,
  eras,
  initialEraId,
  onSelectEvent,
  onBackToTimeline
}) => {
  const [currentEraIndex, setCurrentEraIndex] = useState(() => {
    if (initialEraId) {
      const index = eras.findIndex(e => e.id === initialEraId);
      return index >= 0 ? index : 0;
    }
    return 0;
  });

  const currentEra = eras[currentEraIndex];
  const eraEvents = events.filter(e => e.era === currentEra.id);

  const handlePrevEra = () => {
    setCurrentEraIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextEra = () => {
    setCurrentEraIndex(prev => Math.min(eras.length - 1, prev + 1));
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb / Back Navigation */}
      {onBackToTimeline && (
        <button
          onClick={onBackToTimeline}
          className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Timeline</span>
        </button>
      )}

      {/* Era Header */}
      <motion.div
        className="relative overflow-hidden rounded-xl p-8 backdrop-blur-xl border"
        style={{
          background: `linear-gradient(135deg, ${currentEra.color}15 0%, transparent 100%)`,
          borderColor: `${currentEra.color}40`
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-3">
          <div
            className="h-4 w-4 rounded-full animate-pulse"
            style={{ backgroundColor: currentEra.color }}
          />
          <h2 className="text-4xl font-bold text-white">
            {currentEra.name}
          </h2>
          <span
            className="px-4 py-1.5 rounded-full text-sm font-medium"
            style={{
              backgroundColor: `${currentEra.color}25`,
              color: currentEra.color
            }}
          >
            {currentEra.period}
          </span>
        </div>

        <p className="text-lg text-slate-300 ml-8 max-w-4xl leading-relaxed">
          {currentEra.description}
        </p>

        <div className="mt-4 ml-8">
          <span className="text-sm text-slate-400">
            {eraEvents.length} {eraEvents.length === 1 ? 'Event' : 'Events'}
          </span>
        </div>
      </motion.div>

      {/* Events Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEra.id}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {eraEvents.map((event) => (
            <motion.div key={event.id} variants={cardVariants}>
              <EventCard
                event={event}
                era={currentEra}
                variant="detailed"
                onSelect={onSelectEvent}
                showTechniques={true}
                showDescription={true}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* No events message */}
      {eraEvents.length === 0 && (
        <motion.div
          className="p-12 rounded-lg border border-dashed border-slate-700 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-slate-400 text-lg">
            No events match the current filters for this era
          </p>
        </motion.div>
      )}

      {/* Era Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-white/10">
        <button
          onClick={handlePrevEra}
          disabled={currentEraIndex === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800
                   text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50
                   disabled:cursor-not-allowed transition-all font-medium"
        >
          <ChevronLeft className="h-5 w-5" />
          Previous Era
          {currentEraIndex > 0 && (
            <span className="hidden md:inline text-sm text-slate-400">
              ({eras[currentEraIndex - 1].name})
            </span>
          )}
        </button>

        {/* Era Indicator */}
        <div className="flex items-center gap-2">
          {eras.map((era, idx) => (
            <button
              key={era.id}
              onClick={() => setCurrentEraIndex(idx)}
              className="h-2 w-2 rounded-full transition-all"
              style={{
                backgroundColor: idx === currentEraIndex ? era.color : `${era.color}40`,
                transform: idx === currentEraIndex ? 'scale(1.5)' : 'scale(1)'
              }}
              aria-label={`Go to ${era.name}`}
            />
          ))}
        </div>

        <button
          onClick={handleNextEra}
          disabled={currentEraIndex === eras.length - 1}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800
                   text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50
                   disabled:cursor-not-allowed transition-all font-medium"
        >
          {currentEraIndex < eras.length - 1 && (
            <span className="hidden md:inline text-sm text-slate-400">
              ({eras[currentEraIndex + 1].name})
            </span>
          )}
          Next Era
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
