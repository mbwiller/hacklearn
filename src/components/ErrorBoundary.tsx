/**
 * Error Boundary Component
 *
 * Catches React errors in child components and displays a fallback UI
 * instead of crashing the entire application.
 */

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './ui/Button';

interface ErrorBoundaryProps {
  /**
   * Child components to wrap with error boundary
   */
  children: ReactNode;

  /**
   * Optional custom fallback UI
   */
  fallback?: (error: Error, reset: () => void) => ReactNode;

  /**
   * Optional callback when an error is caught
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary for graceful error handling
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <CoTPlayground />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Call optional error callback
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleReset);
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-white flex items-center justify-center p-8">
          <div className="max-w-2xl w-full">
            <div className="bg-slate-900 rounded-xl border border-red-500/20 shadow-2xl shadow-red-500/10 p-8">
              {/* Error Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>
              </div>

              {/* Error Message */}
              <h2 className="text-2xl font-bold text-center text-cyan-400 mb-4">
                Something went wrong
              </h2>
              <p className="text-center text-gray-300 mb-6">
                An unexpected error occurred while rendering this component. The error has been logged.
              </p>

              {/* Error Details */}
              <div className="bg-slate-950 rounded-lg p-4 mb-6 border border-slate-800">
                <p className="text-sm font-mono text-red-400 mb-2">{this.state.error.name}</p>
                <p className="text-sm font-mono text-gray-400 break-words">
                  {this.state.error.message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4 justify-center">
                <Button onClick={this.handleReset} variant="primary" className="px-6">
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="px-6"
                >
                  Reload Page
                </Button>
              </div>

              {/* Help Text */}
              <p className="text-center text-sm text-gray-500 mt-6">
                If this problem persists, please check the browser console for more details.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Functional wrapper for ErrorBoundary with custom fallback
 *
 * @example
 * ```tsx
 * <ErrorBoundaryWithFallback
 *   fallback={(error, reset) => (
 *     <div>
 *       <h1>Oops! {error.message}</h1>
 *       <button onClick={reset}>Retry</button>
 *     </div>
 *   )}
 * >
 *   <MyComponent />
 * </ErrorBoundaryWithFallback>
 * ```
 */
export function ErrorBoundaryWithFallback({
  children,
  fallback,
  onError,
}: ErrorBoundaryProps): JSX.Element {
  return (
    <ErrorBoundary fallback={fallback} onError={onError}>
      {children}
    </ErrorBoundary>
  );
}
