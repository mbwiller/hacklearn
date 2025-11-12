import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'warning' | 'info' | 'danger';
}

/**
 * ConfirmationDialog Component
 *
 * A reusable confirmation modal with glassmorphism styling and Framer Motion animations.
 * Matches the HackLearn design system aesthetic.
 *
 * Features:
 * - Smooth entrance/exit animations
 * - Backdrop blur with glassmorphism
 * - Keyboard support (Escape to cancel, Enter to confirm)
 * - Accessible (ARIA labels, focus management)
 * - Customizable labels and variants
 */
export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'info',
}) => {
  // Handle keyboard events
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      } else if (e.key === 'Enter' && e.ctrlKey) {
        onConfirm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onConfirm, onCancel]);

  // Get variant-specific colors
  const getVariantColors = () => {
    switch (variant) {
      case 'warning':
        return {
          icon: 'text-yellow-400',
          border: 'border-yellow-500/20',
          confirmBg: 'bg-yellow-500 hover:bg-yellow-600',
        };
      case 'danger':
        return {
          icon: 'text-red-400',
          border: 'border-red-500/20',
          confirmBg: 'bg-red-500 hover:bg-red-600',
        };
      default:
        return {
          icon: 'text-cyan-400',
          border: 'border-cyan-500/20',
          confirmBg: 'bg-cyan-500 hover:bg-cyan-600',
        };
    }
  };

  const colors = getVariantColors();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onCancel}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-message"
          >
            <div
              className={`
                relative w-full max-w-md
                backdrop-blur-xl bg-slate-900/95
                border ${colors.border}
                rounded-xl shadow-2xl shadow-black/50
                p-6
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onCancel}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>

              {/* Icon and Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`${colors.icon} mt-1`}>
                  <AlertTriangle size={24} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3
                    id="dialog-title"
                    className="text-xl font-semibold text-slate-100 mb-2"
                  >
                    {title}
                  </h3>
                  <p
                    id="dialog-message"
                    className="text-slate-300 leading-relaxed"
                  >
                    {message}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={onCancel}
                  className="
                    flex-1 px-4 py-2.5
                    bg-slate-800 hover:bg-slate-700
                    text-slate-200 font-medium
                    rounded-lg
                    transition-all duration-200
                    border border-slate-700
                    focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-900
                  "
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={onConfirm}
                  className={`
                    flex-1 px-4 py-2.5
                    ${colors.confirmBg}
                    text-white font-medium
                    rounded-lg
                    transition-all duration-200
                    shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
                  `}
                >
                  {confirmLabel}
                </button>
              </div>

              {/* Keyboard hint */}
              <p className="text-xs text-slate-500 mt-4 text-center">
                Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">Esc</kbd> to cancel
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationDialog;
