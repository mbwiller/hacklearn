/**
 * Centralized application constants
 *
 * This file prevents typos and inconsistencies across the codebase
 * by providing single source of truth for configuration values.
 */

/**
 * localStorage keys used throughout the application
 * @constant
 */
export const STORAGE_KEYS = {
  /**
   * Key for storing OpenAI API key in localStorage
   * Used by: ApiKeyManager, useLLMChat, CoTPlayground
   */
  OPENAI_API_KEY: 'hacklearn_openai_api_key',
} as const;

/**
 * API endpoint paths
 * @constant
 */
export const API_ENDPOINTS = {
  /**
   * LLM chat endpoint for OpenAI API proxy
   * Base URL is determined by environment (see config/env.ts)
   */
  LLM_CHAT: '/api/llm/chat',

  /**
   * Health check endpoint for backend status
   */
  HEALTH: '/health',
} as const;

/**
 * Timeout configurations (in milliseconds)
 * @constant
 */
export const TIMEOUTS = {
  /**
   * Maximum time to wait for API requests before aborting
   * 60 seconds for LLM responses (can be slow for long outputs)
   */
  API_REQUEST: 60000,

  /**
   * Timeout for health check requests
   */
  HEALTH_CHECK: 5000,
} as const;

/**
 * Model pricing information (cost per 1M tokens)
 * Source: OpenAI pricing as of 2025
 * Only includes models supported by the server
 * @constant
 */
export const MODEL_PRICING = {
  'gpt-4o-mini': {
    input: 0.15,
    output: 0.60,
  },
  'gpt-4o': {
    input: 2.50,
    output: 10.00,
  },
  'gpt-4': {
    input: 30.00,
    output: 60.00,
  },
} as const;

/**
 * Type helper for model options
 */
export type ModelOption = keyof typeof MODEL_PRICING;

/**
 * Default generation parameters
 * @constant
 */
export const DEFAULT_GENERATION_PARAMS = {
  temperature: 0.7,
  maxTokens: 2000,
  topP: 1.0,
  systemPrompt: 'You are a helpful reasoning assistant. Think step by step and provide clear explanations.',
} as const;

/**
 * Validation constants
 * @constant
 */
export const VALIDATION = {
  /**
   * Minimum length for OpenAI API keys
   */
  MIN_API_KEY_LENGTH: 20,

  /**
   * Required prefix for OpenAI API keys
   */
  API_KEY_PREFIX: 'sk-',

  /**
   * Maximum length for problem descriptions
   */
  MAX_PROBLEM_LENGTH: 5000,
} as const;

/**
 * Error messages for consistent error handling
 * @constant
 */
export const ERROR_MESSAGES = {
  API_KEY_NOT_CONFIGURED: 'API key not configured. Please enter your OpenAI API key.',
  API_KEY_INVALID: 'Invalid API key format. Please check your API key.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  RATE_LIMIT_ERROR: 'Rate limit exceeded. Please try again in a moment.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
} as const;
