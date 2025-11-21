/**
 * InteractiveTimelineView Component
 * Root component that orchestrates the entire interactive timeline experience
 */

import React, { useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTimelineData } from './hooks/useTimelineData';
import { useTimelineFilters } from './hooks/useTimelineFilters';
import { useTimelineSelection } from './hooks/useTimelineSelection';
import { useTimelineMode } from './hooks/useTimelineMode';
import { TimelineNarrativeIntro } from './TimelineNarrativeIntro';
import { TimelineControlBar } from './TimelineControlBar';
import { TimelineMode } from './modes/TimelineMode';
import { EraFocusMode } from './modes/EraFocusMode';
import { EventDetailModal } from './shared/EventDetailModal';

interface InteractiveTimelineViewProps {
  className?: string;
}

export const InteractiveTimelineView: React.FC<InteractiveTimelineViewProps> = ({
  className = ''
}) => {
  // Load timeline data
  const { events, eras } = useTimelineData();

  // Initialize filters
  const {
    filters,
    filteredEvents,
    dispatch: filterDispatch,
    resetFilters,
    isFiltered
  } = useTimelineFilters(events);

  // Initialize selection state
  const {
    selectedEventId,
    selectEvent
  } = useTimelineSelection();

  // Initialize view mode
  const { current: currentMode, switchMode } = useTimelineMode('timeline');

  // Get selected event details
  const selectedEvent = selectedEventId
    ? events.find(e => e.id === selectedEventId) || null
    : null;

  const selectedEra = selectedEvent
    ? eras.find(e => e.id === selectedEvent.era)
    : undefined;

  // Related events (events from same era, limited to 4)
  const relatedEvents = selectedEvent
    ? events
      .filter(e => e.era === selectedEvent.era && e.id !== selectedEvent.id)
      .slice(0, 4)
    : [];

  // CTA Handlers
  const handleExploreTimeline = useCallback(() => {
    switchMode('timeline');
    // Smooth scroll to timeline section
    setTimeout(() => {
      const timelineSection = document.getElementById('timeline-visualization');
      timelineSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, [switchMode]);

  const handleViewTechniques = useCallback(() => {
    switchMode('techniques');
  }, [switchMode]);

  const handleViewStatistics = useCallback(() => {
    switchMode('statistics');
  }, [switchMode]);

  // Modal navigation handlers
  const handleModalClose = useCallback(() => {
    selectEvent(null);
  }, [selectEvent]);

  const handleNavigatePrev = useCallback(() => {
    if (!selectedEventId) return;
    const currentIndex = filteredEvents.findIndex(e => e.id === selectedEventId);
    if (currentIndex > 0) {
      selectEvent(filteredEvents[currentIndex - 1].id);
    }
  }, [selectedEventId, filteredEvents, selectEvent]);

  const handleNavigateNext = useCallback(() => {
    if (!selectedEventId) return;
    const currentIndex = filteredEvents.findIndex(e => e.id === selectedEventId);
    if (currentIndex < filteredEvents.length - 1) {
      selectEvent(filteredEvents[currentIndex + 1].id);
    }
  }, [selectedEventId, filteredEvents, selectEvent]);

  const handleSelectRelated = useCallback((eventId: string) => {
    selectEvent(eventId);
  }, [selectEvent]);

  return (
    <div className={`min-h-screen ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Narrative Introduction */}
        <TimelineNarrativeIntro
          onExploreTimeline={handleExploreTimeline}
          onViewTechniques={handleViewTechniques}
          onViewStatistics={handleViewStatistics}
        />

        {/* Control Bar */}
        <div id="timeline-visualization">
          <TimelineControlBar
            currentMode={currentMode}
            onModeChange={switchMode}
            eras={eras}
            selectedEras={filters.eras}
            selectedImpactLevels={filters.impactLevels}
            selectedCategories={filters.categories}
            searchQuery={filters.searchQuery}
            onFilterDispatch={filterDispatch}
            isFiltered={isFiltered}
            onResetFilters={resetFilters}
            filteredCount={filteredEvents.length}
            totalCount={events.length}
          />
        </div>

        {/* Timeline Visualization - Mode Switch */}
        <AnimatePresence mode="wait">
          {currentMode === 'timeline' && (
            <TimelineMode
              key="timeline-mode"
              events={filteredEvents}
              eras={eras}
              selectedEventId={selectedEventId}
              onSelectEvent={selectEvent}
            />
          )}

          {currentMode === 'era-focus' && (
            <EraFocusMode
              key="era-focus-mode"
              events={filteredEvents}
              eras={eras}
              onSelectEvent={selectEvent}
              onBackToTimeline={() => switchMode('timeline')}
            />
          )}

          {currentMode === 'techniques' && (
            <div
              key="techniques-mode"
              className="p-12 rounded-lg border border-dashed border-slate-700 text-center"
            >
              <p className="text-slate-400 text-lg mb-2">Technique Explorer Mode</p>
              <p className="text-slate-500 text-sm">Coming soon - explore attack techniques in a matrix view</p>
            </div>
          )}

          {currentMode === 'statistics' && (
            <div
              key="statistics-mode"
              className="p-12 rounded-lg border border-dashed border-slate-700 text-center"
            >
              <p className="text-slate-400 text-lg mb-2">Statistics Dashboard Mode</p>
              <p className="text-slate-500 text-sm">Coming soon - view comprehensive statistics and analytics</p>
            </div>
          )}
        </AnimatePresence>

        {/* Event Detail Modal */}
        <EventDetailModal
          event={selectedEvent}
          era={selectedEra}
          isOpen={!!selectedEvent}
          onClose={handleModalClose}
          onNavigatePrev={
            selectedEventId && filteredEvents.findIndex(e => e.id === selectedEventId) > 0
              ? handleNavigatePrev
              : undefined
          }
          onNavigateNext={
            selectedEventId && filteredEvents.findIndex(e => e.id === selectedEventId) < filteredEvents.length - 1
              ? handleNavigateNext
              : undefined
          }
          relatedEvents={relatedEvents}
          onSelectRelated={handleSelectRelated}
        />
      </div>
    </div>
  );
};
