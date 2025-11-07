import rateLimit from 'express-rate-limit';
import { ErrorResponse } from '../types';

/**
 * Rate limiter configuration
 * Limits: 10 requests per minute per IP
 * Window: 60 seconds
 * Storage: Memory (sufficient for single-server deployment)
 */
export const rateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10', 10),
  message: () => {
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests. Please wait before trying again.'
      }
    };
    return errorResponse;
  },
  standardHeaders: true,
  legacyHeaders: false
});
