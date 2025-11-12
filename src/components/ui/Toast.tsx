/**
 * Toast Notification Component
 *
 * Provides non-intrusive feedback to users with automatic dismissal
 * and smooth animations using Framer Motion.
 */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  /**
   * Unique identifier for the toast
   */
  id: string;

  /**
   * Toast message content
   */
  message: string;

  /**
   * Type of toast determines icon and colors
   */
  type: ToastType;

  /**
   * Duration in milliseconds before auto-dismiss (default: 5000)
   */
  duration?: number;

  /**
   * Callback when toast is dismissed
   */
  onDismiss: (id: string) => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    textColor: 'text-emerald-400',
    iconColor: 'text-emerald-500',
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    textColor: 'text-red-400',
    iconColor: 'text-red-500',
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    textColor: 'text-yellow-400',
    iconColor: 'text-yellow-500',
  },
  info: {
    icon: Info,
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
    textColor: 'text-cyan-400',
    iconColor: 'text-cyan-500',
  },
};

/**
 * Individual toast notification component
 */
export function Toast({ id, message, type, duration = 5000, onDismiss }: ToastProps) {
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onDismiss(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      className={`${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg backdrop-blur-xl p-4 flex items-start gap-3 min-w-[300px] max-w-md`}
    >
      <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
      <p className={`${config.textColor} flex-1 text-sm font-medium`}>{message}</p>
      <button
        onClick={() => onDismiss(id)}
        className={`${config.textColor} hover:opacity-70 transition-opacity`}
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

/**
 * Toast Container Component
 *
 * Manages positioning and stacking of multiple toasts
 */
export interface ToastContainerProps {
  toasts: Array<ToastProps & { id: string }>;
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
