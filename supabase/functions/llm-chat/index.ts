// Supabase Edge Function for LLM Chat Proxy
// Migrated from Express server - handles OpenAI API calls with streaming support

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// CORS headers to allow requests from Vercel frontend
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Type definitions (matching backend API contract)
type LLMModel = 'gpt-4o-mini' | 'gpt-4o' | 'gpt-4';
type MessageRole = 'system' | 'user' | 'assistant';

interface ChatMessage {
  role: MessageRole;
  content: string;
}

interface ChatRequest {
  model: LLMModel;
  messages: ChatMessage[];
  apiKey: string;
  stream?: boolean;
}

interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

// OpenAI pricing per 1M tokens (January 2025)
const MODEL_PRICING: Record<LLMModel, { input: number; output: number }> = {
  'gpt-4o-mini': { input: 0.15, output: 0.60 },
  'gpt-4o': { input: 2.50, output: 10.00 },
  'gpt-4': { input: 30.00, output: 60.00 }
};

// Calculate cost in USD
function calculateCost(model: LLMModel, usage: TokenUsage): number {
  const pricing = MODEL_PRICING[model];
  const inputCost = (usage.prompt_tokens / 1_000_000) * pricing.input;
  const outputCost = (usage.completion_tokens / 1_000_000) * pricing.output;
  return Math.round((inputCost + outputCost) * 1000000) / 1000000;
}

// Validate chat request
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

// Main handler
Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      const errorResponse: ErrorResponse = {
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Method not allowed. Use POST.'
        }
      };
      return new Response(JSON.stringify(errorResponse), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Parse request body
    const body = await req.json();

    // Validate request
    const validationError = validateChatRequest(body);
    if (validationError) {
      const errorResponse: ErrorResponse = {
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: validationError
        }
      };
      return new Response(JSON.stringify(errorResponse), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { model, messages, apiKey, stream = false } = body as ChatRequest;

    console.log(`[LLM] ${stream ? 'Streaming' : 'Non-streaming'} request:`, {
      model,
      messageCount: messages.length,
      stream
    });

    // Handle streaming response
    if (stream) {
      return handleStreamingRequest(model, messages, apiKey, startTime);
    } else {
      return await handleNonStreamingRequest(model, messages, apiKey, startTime);
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
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

// Handle non-streaming request
async function handleNonStreamingRequest(
  model: LLMModel,
  messages: ChatMessage[],
  apiKey: string,
  startTime: number
): Promise<Response> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }

    const data = await response.json();

    const message = data.choices[0]?.message?.content || '';
    const usage: TokenUsage = {
      prompt_tokens: data.usage?.prompt_tokens || 0,
      completion_tokens: data.usage?.completion_tokens || 0,
      total_tokens: data.usage?.total_tokens || 0
    };

    const cost = calculateCost(model, usage);

    const duration = Date.now() - startTime;
    console.log(`[LLM] Non-streaming completed in ${duration}ms`);

    const successResponse = {
      success: true,
      data: {
        message,
        usage,
        cost,
        model
      }
    };

    return new Response(JSON.stringify(successResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorResponse = handleOpenAIError(error);
    const statusCode = getStatusCode(errorResponse.error.code);
    return new Response(JSON.stringify(errorResponse), {
      status: statusCode,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Handle streaming request
function handleStreamingRequest(
  model: LLMModel,
  messages: ChatMessage[],
  apiKey: string,
  startTime: number
): Response {
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: model,
            messages: messages,
            temperature: 0.7,
            max_tokens: 4096,
            stream: true,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(JSON.stringify(error));
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        const decoder = new TextDecoder();
        let totalPromptTokens = 0;
        let totalCompletionTokens = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);

              if (data === '[DONE]') {
                // Send final usage/cost chunk
                const usage: TokenUsage = {
                  prompt_tokens: totalPromptTokens,
                  completion_tokens: totalCompletionTokens,
                  total_tokens: totalPromptTokens + totalCompletionTokens
                };
                const cost = calculateCost(model, usage);

                const finalChunk = {
                  usage,
                  cost,
                  done: true
                };

                controller.enqueue(
                  new TextEncoder().encode(`data: ${JSON.stringify(finalChunk)}\n\n`)
                );

                const duration = Date.now() - startTime;
                console.log(`[LLM] Streaming completed in ${duration}ms`);
                break;
              }

              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices[0]?.delta?.content;

                if (delta) {
                  const deltaChunk = {
                    delta,
                    done: false
                  };
                  controller.enqueue(
                    new TextEncoder().encode(`data: ${JSON.stringify(deltaChunk)}\n\n`)
                  );
                }

                // Track usage if provided
                if (parsed.usage) {
                  totalPromptTokens = parsed.usage.prompt_tokens || 0;
                  totalCompletionTokens = parsed.usage.completion_tokens || 0;
                }
              } catch (parseError) {
                // Skip invalid JSON
                console.error('[LLM] Failed to parse chunk:', parseError);
              }
            }
          }
        }

        controller.close();
      } catch (error) {
        console.error('[LLM] Streaming error:', error);
        const errorChunk = {
          done: true,
          error: handleOpenAIError(error)
        };
        controller.enqueue(
          new TextEncoder().encode(`data: ${JSON.stringify(errorChunk)}\n\n`)
        );
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  });
}

// Error handler
function handleOpenAIError(error: unknown): ErrorResponse {
  try {
    if (error instanceof Error && error.message.startsWith('{')) {
      const parsed = JSON.parse(error.message);
      const status = parsed.error?.status || 500;
      const message = parsed.error?.message || 'OpenAI API error';

      let errorCode = 'NETWORK_ERROR';
      let errorMessage = 'Failed to communicate with OpenAI API';

      if (status === 401) {
        errorCode = 'INVALID_API_KEY';
        errorMessage = 'Invalid OpenAI API key. Please check your API key and try again.';
      } else if (status === 429) {
        errorCode = 'RATE_LIMIT_EXCEEDED';
        errorMessage = 'OpenAI rate limit exceeded. Please try again later.';
      } else if (status === 400) {
        errorCode = 'INVALID_REQUEST';
        errorMessage = message || 'Invalid request to OpenAI API';
      } else if (status >= 500) {
        errorCode = 'NETWORK_ERROR';
        errorMessage = 'OpenAI service is temporarily unavailable. Please try again later.';
      }

      return {
        success: false,
        error: {
          code: errorCode,
          message: errorMessage
        }
      };
    }
  } catch {
    // Fall through to generic error
  }

  return {
    success: false,
    error: {
      code: 'NETWORK_ERROR',
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  };
}

// Get HTTP status code from error code
function getStatusCode(errorCode: string): number {
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
