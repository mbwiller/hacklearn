import { Router, Request, Response } from 'express';
import { createOpenAIService } from '../services/openai';
import {
  ChatRequest,
  ChatResponse,
  ErrorResponse,
  LLMModel,
  ChatMessage
} from '../types';

const router = Router();

/**
 * POST /api/llm/chat
 * Main LLM proxy endpoint
 * Supports both streaming and non-streaming responses
 */
router.post('/chat', async (req: Request, res: Response): Promise<void> => {
  const startTime = Date.now();

  try {
    // Validate request body
    const validationError = validateChatRequest(req.body);
    if (validationError) {
      const errorResponse: ErrorResponse = {
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: validationError
        }
      };
      res.status(400).json(errorResponse);
      return;
    }

    const { model, messages, apiKey, stream = false } = req.body as ChatRequest;

    console.log(`[LLM] ${stream ? 'Streaming' : 'Non-streaming'} request:`, {
      model,
      messageCount: messages.length,
      stream
    });

    // Create OpenAI service with user's API key
    const openaiService = createOpenAIService(apiKey);

    if (stream) {
      // Streaming response
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      try {
        for await (const chunk of openaiService.chatCompletionStream(model, messages)) {
          res.write(`data: ${JSON.stringify(chunk)}\n\n`);
        }
        res.end();

        const duration = Date.now() - startTime;
        console.log(`[LLM] Streaming completed in ${duration}ms`);
      } catch (error) {
        const errorChunk = {
          done: true,
          error: getErrorResponse(error)
        };
        res.write(`data: ${JSON.stringify(errorChunk)}\n\n`);
        res.end();
      }
    } else {
      // Non-streaming response
      try {
        const result = await openaiService.chatCompletion(model, messages);
        const response: ChatResponse = {
          success: true,
          data: {
            message: result.message,
            usage: result.usage,
            cost: result.cost,
            model: model
          }
        };

        const duration = Date.now() - startTime;
        console.log(`[LLM] Non-streaming completed in ${duration}ms`);

        res.json(response);
      } catch (error) {
        const errorResponse = getErrorResponse(error);
        const statusCode = getStatusCode(errorResponse.error.code);
        res.status(statusCode).json(errorResponse);
      }
    }
  } catch (error) {
    console.error('[LLM] Unexpected error:', error);
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'An unexpected error occurred'
      }
    };
    res.status(500).json(errorResponse);
  }
});

/**
 * Validate chat request body
 * Returns error message if invalid, null if valid
 */
function validateChatRequest(body: unknown): string | null {
  if (!body || typeof body !== 'object') {
    return 'Request body must be a JSON object';
  }

  const req = body as Partial<ChatRequest>;

  // Validate model
  if (!req.model) {
    return 'Missing required field: model';
  }
  const validModels: LLMModel[] = ['gpt-4o-mini', 'gpt-4o', 'gpt-4'];
  if (!validModels.includes(req.model as LLMModel)) {
    return `Invalid model. Must be one of: ${validModels.join(', ')}`;
  }

  // Validate messages
  if (!req.messages || !Array.isArray(req.messages)) {
    return 'Missing or invalid field: messages (must be an array)';
  }
  if (req.messages.length === 0) {
    return 'Messages array cannot be empty';
  }

  // Validate each message
  for (let i = 0; i < req.messages.length; i++) {
    const msg = req.messages[i];
    if (!msg || typeof msg !== 'object') {
      return `Invalid message at index ${i}: must be an object`;
    }

    const message = msg as Partial<ChatMessage>;
    if (!message.role || !message.content) {
      return `Invalid message at index ${i}: missing role or content`;
    }

    const validRoles = ['system', 'user', 'assistant'];
    if (!validRoles.includes(message.role)) {
      return `Invalid message role at index ${i}: must be one of ${validRoles.join(', ')}`;
    }

    if (typeof message.content !== 'string') {
      return `Invalid message content at index ${i}: must be a string`;
    }
  }

  // Validate API key
  if (!req.apiKey || typeof req.apiKey !== 'string') {
    return 'Missing or invalid field: apiKey';
  }
  if (!req.apiKey.startsWith('sk-')) {
    return 'Invalid API key format. OpenAI API keys start with "sk-"';
  }

  // Validate stream (optional)
  if (req.stream !== undefined && typeof req.stream !== 'boolean') {
    return 'Invalid field: stream (must be a boolean)';
  }

  return null;
}

/**
 * Convert error to ErrorResponse
 */
function getErrorResponse(error: unknown): ErrorResponse {
  if (error instanceof Error && 'code' in error) {
    return {
      success: false,
      error: {
        code: (error as Error & { code: string }).code as ErrorResponse['error']['code'],
        message: error.message
      }
    };
  }

  return {
    success: false,
    error: {
      code: 'SERVER_ERROR',
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  };
}

/**
 * Get HTTP status code from error code
 */
function getStatusCode(errorCode: ErrorResponse['error']['code']): number {
  switch (errorCode) {
    case 'INVALID_API_KEY':
      return 401;
    case 'RATE_LIMIT_EXCEEDED':
      return 429;
    case 'INVALID_REQUEST':
      return 400;
    case 'NETWORK_ERROR':
      return 503;
    case 'SERVER_ERROR':
    default:
      return 500;
  }
}

export default router;
