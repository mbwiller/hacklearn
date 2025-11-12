/**
 * Environment configuration
 *
 * Provides environment-aware configuration for API base URLs,
 * feature flags, and other environment-specific settings.
 */

/**
 * Determines if the app is running in development mode
 */
export const isDevelopment = import.meta.env.DEV;

/**
 * Determines if the app is running in production mode
 */
export const isProduction = import.meta.env.PROD;

/**
 * Get the API base URL based on environment
 *
 * Priority:
 * 1. VITE_API_BASE_URL environment variable (if set)
 * 2. Development: http://localhost:3001
 * 3. Production: Same origin as frontend (relative URLs)
 *
 * @returns The base URL for API requests
 */
export function getApiBaseUrl(): string {
  // Check for explicit override via environment variable
  const envApiUrl = import.meta.env.VITE_API_BASE_URL;
  if (envApiUrl) {
    return envApiUrl;
  }

  // Development: use localhost backend
  if (isDevelopment) {
    return 'http://localhost:3001';
  }

  // Production: use relative URLs (same origin)
  // This assumes frontend and backend are served from same domain
  return '';
}

/**
 * Build a full API URL from an endpoint path
 *
 * @param endpoint - The endpoint path (e.g., '/api/llm/chat')
 * @returns Full URL including base URL
 *
 * @example
 * ```ts
 * const url = buildApiUrl('/api/llm/chat');
 * // Development: 'http://localhost:3001/api/llm/chat'
 * // Production: '/api/llm/chat'
 * ```
 */
export function buildApiUrl(endpoint: string): string {
  const baseUrl = getApiBaseUrl();

  // Ensure endpoint starts with /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // If baseUrl is empty (production), just return endpoint
  if (!baseUrl) {
    return normalizedEndpoint;
  }

  // Otherwise, concatenate base + endpoint
  return `${baseUrl}${normalizedEndpoint}`;
}

/**
 * Feature flags for conditional functionality
 */
export const FEATURES = {
  /**
   * Enable debug mode with extra logging
   */
  DEBUG_MODE: isDevelopment && import.meta.env.VITE_DEBUG === 'true',

  /**
   * Enable experimental features
   */
  EXPERIMENTAL: import.meta.env.VITE_EXPERIMENTAL === 'true',
} as const;

/**
 * Application metadata
 */
export const APP_INFO = {
  NAME: 'HackLearn Pro',
  VERSION: '1.0.0',
  DESCRIPTION: 'Educational platform teaching ethical hacking + AI/ML security',
} as const;
