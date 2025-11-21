/**
 * TimelineMode Component
 * Horizontal timeline visualization with era bands and event nodes
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { TimelineEvent, Era } from '@/data/timeline/types';
import { EventCard } from '../shared/EventCard';

interface TimelineModeProps {
  events: TimelineEvent[];
  eras: Era[];
  selectedEventId: string | null;
  onSelectEvent: (eventId: string) => void;
}

/**
 * Simple horizontal timeline visualization (simplified from full D3 implementation)
 * This is a React-based approach that's easier to implement quickly
 */
export const TimelineMode: React.FC<TimelineModeProps> = ({
  events,
  eras,
  selectedEventId,
  onSelectEvent
}) => {
  // Group events by era
  const eventsByEra = useMemo(() => {
    const grouped: Record<string, TimelineEvent[]> = {};
    eras.forEach(era => {
      grouped[era.id] = events.filter(e => e.era === era.id);
    });
    return grouped;
  }, [events, eras]);

  // Find selected event's era
  const selectedEvent = useMemo(
    () => events.find(e => e.id === selectedEventId),
    [events, selectedEventId]
  );

  return (
    <div className="space-y-8">
      {/* Timeline visualization */}
      <div className="space-y-12">
        {eras.map((era) => {
          const eraEvents = eventsByEra[era.id] || [];

          return (
            <motion.div
              key={era.id}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Era Header */}
              <div className="mb-6 pb-4 border-b-2" style={{ borderColor: `${era.color}40` }}>
                <div className="flex items-center gap-4 mb-2">
                  <div
                    className="h-3 w-3 rounded-full animate-pulse"
                    style={{ backgroundColor: era.color }}
                  />
                  <h3 className="text-2xl font-bold text-white">{era.name}</h3>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${era.color}20`,
                      color: era.color
                    }}
                  >
                    {era.period}
                  </span>
                </div>
                <p className="text-slate-400 text-sm ml-7 max-w-3xl">
                  {era.description}
                </p>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 ml-7">
                {eraEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                  >
                    <EventCard
                      event={event}
                      era={era}
                      variant="grid"
                      isSelected={event.id === selectedEventId}
                      onSelect={onSelectEvent}
                      showTechniques={true}
                      showDescription={true}
                    />
                  </motion.div>
                ))}
              </div>

              {/* No events message */}
              {eraEvents.length === 0 && (
                <div className="ml-7 p-8 rounded-lg border border-dashed border-slate-700
                              text-center text-slate-400">
                  No events match the current filters for this era
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Detail Panel (Desktop - Right Side) */}
      {selectedEvent && (
        <motion.div
          className="hidden lg:block fixed right-8 top-32 w-96 max-h-[calc(100vh-10rem)]
                   overflow-y-auto rounded-xl bg-slate-900/95 backdrop-blur-xl
                   border border-cyan-400/30 shadow-2xl shadow-cyan-400/20 p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <EventCard
            event={selectedEvent}
            era={eras.find(e => e.id === selectedEvent.era)}
            variant="detailed"
            isSelected={true}
            showTechniques={true}
            showDescription={true}
            onSelect={onSelectEvent}
          />
        </motion.div>
      )}
    </div>
  );
};
