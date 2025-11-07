import OpenAI from 'openai';
import {
  LLMModel,
  ChatMessage,
  TokenUsage,
  calculateCost,
  ErrorCode
} from '../types';

/**
 * OpenAI Service
 * Handles all interactions with OpenAI API
 * Supports both streaming and non-streaming responses
 */

export class OpenAIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({
      apiKey: apiKey,
      timeout: 30000, // 30 second timeout
      maxRetries: 2
    });
  }

  /**
   * Non-streaming chat completion
   * Returns the full response at once
   */
  async chatCompletion(
    model: LLMModel,
    messages: ChatMessage[]
  ): Promise<{ message: string; usage: TokenUsage; cost: number }> {
    try {
      const response = await this.client.chat.completions.create({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 4096
      });

      const message = response.choices[0]?.message?.content || '';
      const usage: TokenUsage = {
        prompt_tokens: response.usage?.prompt_tokens || 0,
        completion_tokens: response.usage?.completion_tokens || 0,
        total_tokens: response.usage?.total_tokens || 0
      };

      const cost = calculateCost(model, usage);

      console.log('[OpenAI] Chat completion:', {
        model,
        usage,
        cost: `$${cost.toFixed(6)}`,
        messageLength: message.length
      });

      return { message, usage, cost };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Streaming chat completion
   * Yields delta chunks as they arrive
   */
  async *chatCompletionStream(
    model: LLMModel,
    messages: ChatMessage[]
  ): AsyncGenerator<{ delta?: string; usage?: TokenUsage; cost?: number; done: boolean }> {
    try {
      const stream = await this.client.chat.completions.create({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 4096,
        stream: true
      });

      let totalPromptTokens = 0;
      let totalCompletionTokens = 0;
      let fullMessage = '';

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content;

        if (delta) {
          fullMessage += delta;
          yield { delta, done: false };
        }

        // OpenAI provides usage info in the last chunk
        if (chunk.usage) {
          totalPromptTokens = chunk.usage.prompt_tokens || 0;
          totalCompletionTokens = chunk.usage.completion_tokens || 0;
        }
      }

      // Calculate final usage and cost
      const usage: TokenUsage = {
        prompt_tokens: totalPromptTokens,
        completion_tokens: totalCompletionTokens,
        total_tokens: totalPromptTokens + totalCompletionTokens
      };

      const cost = calculateCost(model, usage);

      console.log('[OpenAI] Streaming completion:', {
        model,
        usage,
        cost: `$${cost.toFixed(6)}`,
        messageLength: fullMessage.length
      });

      yield { usage, cost, done: true };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Error handler
   * Converts OpenAI errors to standardized error format
   */
  private handleError(error: unknown): Error & { code: ErrorCode } {
    if (error instanceof OpenAI.APIError) {
      console.error('[OpenAI] API Error:', {
        status: error.status,
        message: error.message,
        code: error.code,
        type: error.type
      });

      // Determine error code based on OpenAI error
      let errorCode: ErrorCode = 'NETWORK_ERROR';
      let errorMessage = 'Failed to communicate with OpenAI API';

      if (error.status === 401) {
        errorCode = 'INVALID_API_KEY';
        errorMessage = 'Invalid OpenAI API key. Please check your API key and try again.';
      } else if (error.status === 429) {
        errorCode = 'RATE_LIMIT_EXCEEDED';
        errorMessage = 'OpenAI rate limit exceeded. Please try again later.';
      } else if (error.status === 400) {
        errorCode = 'INVALID_REQUEST';
        errorMessage = error.message || 'Invalid request to OpenAI API';
      } else if (error.status && error.status >= 500) {
        errorCode = 'NETWORK_ERROR';
        errorMessage = 'OpenAI service is temporarily unavailable. Please try again later.';
      }

      const customError = new Error(errorMessage) as Error & { code: ErrorCode };
      customError.code = errorCode;
      return customError;
    }

    // Generic network error
    console.error('[OpenAI] Unknown error:', error);
    const genericError = new Error('An unexpected error occurred while communicating with OpenAI') as Error & { code: ErrorCode };
    genericError.code = 'NETWORK_ERROR';
    return genericError;
  }
}

/**
 * Factory function to create OpenAI service instances
 * Each request gets its own instance with the provided API key
 */
export function createOpenAIService(apiKey: string): OpenAIService {
  return new OpenAIService(apiKey);
}
