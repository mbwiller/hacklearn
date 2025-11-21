/**
 * EventDetailModal Component
 * Full-screen modal with comprehensive event details
 */

import React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X, ExternalLink, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import type { TimelineEvent, Era } from '@/data/timeline/types';
import { ImpactBadge } from './ImpactBadge';
import { CategoryTag } from './CategoryTag';
import { EraIndicator } from './EraIndicator';

interface EventDetailModalProps {
  event: TimelineEvent | null;
  era?: Era;
  isOpen: boolean;
  onClose: () => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  relatedEvents?: TimelineEvent[];
  onSelectRelated?: (eventId: string) => void;
}

/**
 * Format date from YYYY-MM to readable format
 */
function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 400,
      mass: 1
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 }
  }
};

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  era,
  isOpen,
  onClose,
  onNavigatePrev,
  onNavigateNext,
  relatedEvents = [],
  onSelectRelated
}) => {
  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 rounded-xl
                         border border-white/10 shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-400">{formatDate(event.date)}</span>
                  </div>
                  <h2 id="modal-title" className="text-2xl font-bold text-white">
                    {event.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <ImpactBadge level={event.impact} size="md" />
                  <CategoryTag category={event.category} size="md" />
                  {era && <EraIndicator era={era} size="md" />}
                </div>

                {/* Description */}
                <div id="modal-description" className="prose prose-invert max-w-none">
                  <p className="text-lg text-slate-300 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                      Related Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-sm rounded-lg bg-slate-800/50 text-slate-300
                                   border border-slate-700/50 hover:border-cyan-400/50
                                   hover:bg-slate-800 transition-all cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Events */}
                {relatedEvents && relatedEvents.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                      Related Events
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {relatedEvents.slice(0, 4).map((relEvent) => (
                        <button
                          key={relEvent.id}
                          onClick={() => onSelectRelated?.(relEvent.id)}
                          className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50
                                   hover:border-cyan-400/50 hover:bg-slate-800/50 transition-all
                                   text-left group"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                              {relEvent.title}
                            </span>
                            <ImpactBadge level={relEvent.impact} size="sm" showIcon={false} />
                          </div>
                          <span className="text-xs text-slate-400">
                            {formatDate(relEvent.date)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Source Link */}
                {event.source_url && (
                  <div className="pt-4 border-t border-white/10">
                    <a
                      href={event.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300
                               font-medium transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Original Source
                    </a>
                  </div>
                )}
              </div>

              {/* Footer - Navigation */}
              {(onNavigatePrev || onNavigateNext) && (
                <div className="flex items-center justify-between p-4 border-t border-white/10 bg-slate-900/80">
                  <button
                    onClick={onNavigatePrev}
                    disabled={!onNavigatePrev}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800
                             text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50
                             disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <button
                    onClick={onNavigateNext}
                    disabled={!onNavigateNext}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800
                             text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50
                             disabled:cursor-not-allowed transition-all"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
