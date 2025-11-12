/**
 * Fetch with timeout utility
 *
 * Wraps the native fetch API with timeout and AbortController support
 * to prevent hanging requests and provide better error handling.
 */

import { ERROR_MESSAGES, TIMEOUTS } from '../config/constants';

/**
 * Error thrown when a fetch request times out
 */
export class TimeoutError extends Error {
  constructor(message: string = ERROR_MESSAGES.TIMEOUT_ERROR) {
    super(message);
    this.name = 'TimeoutError';
  }
}

/**
 * Options for fetchWithTimeout
 */
export interface FetchWithTimeoutOptions extends RequestInit {
  /**
   * Timeout in milliseconds
   * @default TIMEOUTS.API_REQUEST (60000ms)
   */
  timeout?: number;
}

/**
 * Fetch with automatic timeout handling
 *
 * @param url - The URL to fetch
 * @param options - Fetch options including timeout
 * @returns Promise that resolves to Response or rejects on timeout/error
 *
 * @throws {TimeoutError} When the request exceeds the timeout duration
 * @throws {Error} When the request fails for other reasons
 *
 * @example
 * ```ts
 * try {
 *   const response = await fetchWithTimeout('/api/data', {
 *     method: 'POST',
 *     timeout: 30000, // 30 seconds
 *     body: JSON.stringify({ query: 'test' }),
 *   });
 *   const data = await response.json();
 * } catch (error) {
 *   if (error instanceof TimeoutError) {
 *     console.error('Request timed out');
 *   } else {
 *     console.error('Request failed:', error);
 *   }
 * }
 * ```
 */
export async function fetchWithTimeout(
  url: string,
  options: FetchWithTimeoutOptions = {}
): Promise<Response> {
  const { timeout = TIMEOUTS.API_REQUEST, ...fetchOptions } = options;

  // Create AbortController to cancel the request
  const controller = new AbortController();
  const { signal } = controller;

  // Merge our abort signal with any existing signal
  const mergedSignal = fetchOptions.signal
    ? createCombinedSignal([signal, fetchOptions.signal])
    : signal;

  // Set up timeout
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: mergedSignal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    // Check if error was caused by our timeout abort
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new TimeoutError(`Request to ${url} timed out after ${timeout}ms`);
      }
    }

    // Re-throw other errors
    throw error;
  }
}

/**
 * Creates a combined AbortSignal from multiple signals
 * When any signal aborts, the combined signal aborts
 *
 * @param signals - Array of AbortSignals to combine
 * @returns Combined AbortSignal
 */
function createCombinedSignal(signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();

  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort();
      break;
    }

    signal.addEventListener('abort', () => {
      controller.abort();
    });
  }

  return controller.signal;
}

/**
 * Retry a fetch request with exponential backoff
 *
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @param maxRetries - Maximum number of retry attempts (default: 3)
 * @param backoffMs - Initial backoff duration in ms (default: 1000)
 * @returns Promise that resolves to Response or rejects after all retries fail
 *
 * @example
 * ```ts
 * const response = await fetchWithRetry('/api/data', {
 *   method: 'GET',
 * }, 3, 1000); // 3 retries with 1s initial backoff
 * ```
 */
export async function fetchWithRetry(
  url: string,
  options: FetchWithTimeoutOptions = {},
  maxRetries: number = 3,
  backoffMs: number = 1000
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options);

      // Only retry on 5xx errors or network errors
      if (response.ok || (response.status >= 400 && response.status < 500)) {
        return response;
      }

      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on timeout errors
      if (lastError instanceof TimeoutError) {
        throw lastError;
      }
    }

    // Wait before retrying (exponential backoff)
    if (attempt < maxRetries) {
      const delay = backoffMs * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Fetch failed after all retries');
}
