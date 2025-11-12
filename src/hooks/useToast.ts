/**
 * useToast Hook
 *
 * Manages toast notifications with automatic IDs and dismissal
 */

import { useState, useCallback } from 'react';
import type { ToastType } from '../components/ui/Toast';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

let toastIdCounter = 0;

/**
 * Hook for managing toast notifications
 *
 * @example
 * ```tsx
 * const { toasts, showToast, dismissToast } = useToast();
 *
 * // Show success toast
 * showToast('Changes saved successfully!', 'success');
 *
 * // Show error toast
 * showToast('Failed to save changes', 'error', 10000);
 *
 * // Render toasts
 * <ToastContainer toasts={toasts} onDismiss={dismissToast} />
 * ```
 */
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * Show a new toast notification
   *
   * @param message - Toast message to display
   * @param type - Type of toast (success, error, warning, info)
   * @param duration - Duration in ms before auto-dismiss (default: 5000)
   * @returns Toast ID for manual dismissal
   */
  const showToast = useCallback((message: string, type: ToastType, duration?: number): string => {
    const id = `toast-${++toastIdCounter}`;
    const newToast: Toast = {
      id,
      message,
      type,
      duration,
    };

    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  /**
   * Dismiss a specific toast by ID
   *
   * @param id - Toast ID to dismiss
   */
  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Clear all toasts
   */
  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    showToast,
    dismissToast,
    clearToasts,
  };
}
