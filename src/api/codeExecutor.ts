/**
 * Code Executor API
 * Uses browser-based Pyodide for Python execution (no backend required)
 */

import type { ExecuteRequest, ExecuteResponse } from '@/types/ide';
import { executeCode as executePyodideCode, initPyodide, isPyodideLoaded, isPyodideLoading } from '@/lib/pyodide-executor';

/**
 * Execute code using Pyodide (browser-based)
 * Replaces server-side execution with client-side Pyodide
 */
export const executeCode = async (request: ExecuteRequest): Promise<ExecuteResponse> => {
  const { code, language, problemId } = request;

  try {
    // Execute using Pyodide
    return await executePyodideCode(code, language, problemId);
  } catch (error) {
    return {
      status: 'runtime_error',
      testsPassed: 0,
      testsTotal: 0,
      output: '',
      error: error instanceof Error ? error.message : 'Code execution failed'
    };
  }
};

/**
 * Pre-initialize Pyodide runtime
 * Call this on IDE mount to reduce first-run latency
 */
export const preloadPyodide = async (): Promise<void> => {
  if (!isPyodideLoaded() && !isPyodideLoading()) {
    await initPyodide();
  }
};

/**
 * Check Pyodide status
 * Useful for displaying loading indicators
 */
export const getPyodideStatus = () => ({
  loaded: isPyodideLoaded(),
  loading: isPyodideLoading()
});

/**
 * Health check (always returns OK since no server required)
 */
export const checkHealth = async (): Promise<{ status: string }> => {
  return { status: 'ok - browser-based execution' };
};
