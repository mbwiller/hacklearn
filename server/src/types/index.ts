/**
 * TypeScript type definitions for HackLearn Backend API
 */

export type LLMModel = 'gpt-4o-mini' | 'gpt-4o' | 'gpt-4';

export type MessageRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

export interface ChatRequest {
  model: LLMModel;
  messages: ChatMessage[];
  apiKey: string;
  stream?: boolean;
}

export interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface ChatResponse {
  success: true;
  data: {
    message: string;
    usage: TokenUsage;
    cost: number;
    model: string;
  };
}

export interface StreamChunk {
  delta?: string;
  usage?: TokenUsage;
  cost?: number;
  done: boolean;
}

export type ErrorCode =
  | 'INVALID_API_KEY'
  | 'RATE_LIMIT_EXCEEDED'
  | 'NETWORK_ERROR'
  | 'INVALID_REQUEST'
  | 'SERVER_ERROR';

export interface ErrorResponse {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
  };
}

export type APIResponse = ChatResponse | ErrorResponse;

/**
 * OpenAI pricing per 1M tokens (as of January 2025)
 */
export const MODEL_PRICING: Record<LLMModel, { input: number; output: number }> = {
  'gpt-4o-mini': { input: 0.15, output: 0.60 },
  'gpt-4o': { input: 2.50, output: 10.00 },
  'gpt-4': { input: 30.00, output: 60.00 }
};

/**
 * Calculate cost in USD for token usage
 */
export function calculateCost(model: LLMModel, usage: TokenUsage): number {
  const pricing = MODEL_PRICING[model];
  const inputCost = (usage.prompt_tokens / 1_000_000) * pricing.input;
  const outputCost = (usage.completion_tokens / 1_000_000) * pricing.output;
  return Math.round((inputCost + outputCost) * 1000000) / 1000000; // Round to 6 decimals
}
