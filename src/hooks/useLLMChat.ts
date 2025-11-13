import { useState, useCallback } from 'react';

// Backend API contract interfaces
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface ChatOptions {
  model?: 'gpt-3.5-turbo' | 'gpt-4o-mini' | 'gpt-4o' | 'gpt-4';
  stream?: boolean;
  systemPrompt?: string;
}

export interface ChatResponse {
  message: string;
  usage: TokenUsage;
  cost: number;
}

interface UseLLMChatReturn {
  sendMessage: (
    messages: ChatMessage[],
    options?: ChatOptions
  ) => Promise<ChatResponse | null>;
  sendStreamingMessage: (
    messages: ChatMessage[],
    options?: ChatOptions,
    onChunk?: (delta: string) => void
  ) => Promise<ChatResponse | null>;
  response: string;
  isLoading: boolean;
  error: string | null;
  usage: TokenUsage | null;
  cost: number;
  duration: number;
  clearResponse: () => void;
  clearError: () => void;
}

// Supabase Edge Function URL (environment-aware)
const SUPABASE_FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || 'https://ajigpytercayzftfjtle.supabase.co/functions/v1';
const API_BASE_URL = `${SUPABASE_FUNCTIONS_URL}/llm-chat`;

// Map backend error codes to user-friendly messages
const ERROR_MESSAGES: Record<string, string> = {
  INVALID_API_KEY: 'Invalid OpenAI API key. Please check your key and try again.',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded. Please wait a moment before trying again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  INVALID_REQUEST: 'Invalid request. Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
};

export const useLLMChat = (): UseLLMChatReturn => {
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState<TokenUsage | null>(null);
  const [cost, setCost] = useState(0);
  const [duration, setDuration] = useState<number>(0);

  // Get API key from localStorage
  const getApiKey = (): string | null => {
    return localStorage.getItem('hacklearn_openai_api_key');
  };

  // Clear response and related state
  const clearResponse = useCallback(() => {
    setResponse('');
    setUsage(null);
    setCost(0);
  }, []);

  // Clear error state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Non-streaming message sending
  const sendMessage = useCallback(
    async (
      messages: ChatMessage[],
      options: ChatOptions = {}
    ): Promise<ChatResponse | null> => {
      const apiKey = getApiKey();
      if (!apiKey) {
        setError('API key not configured. Please enter your OpenAI API key.');
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const requestBody = {
          model: options.model || 'gpt-4o-mini',
          messages: options.systemPrompt
            ? [{ role: 'system' as const, content: options.systemPrompt }, ...messages]
            : messages,
          apiKey,
          stream: false,
        };

        const res = await fetch(`${API_BASE_URL}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!res.ok) {
          const errorData = await res.json();
          const errorCode = errorData.error?.code || 'SERVER_ERROR';
          const errorMessage =
            ERROR_MESSAGES[errorCode] || errorData.error?.message || 'An unknown error occurred';
          throw new Error(errorMessage);
        }

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.error?.message || 'Request failed');
        }

        // Update state with response
        setResponse(data.data.message);
        setUsage(data.data.usage);
        setCost(data.data.cost);

        return {
          message: data.data.message,
          usage: data.data.usage,
          cost: data.data.cost,
        };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Streaming message sending
  const sendStreamingMessage = useCallback(
    async (
      messages: ChatMessage[],
      options: ChatOptions = {},
      onChunk?: (delta: string) => void
    ): Promise<ChatResponse | null> => {
      const apiKey = getApiKey();
      if (!apiKey) {
        setError('API key not configured. Please enter your OpenAI API key.');
        return null;
      }

      setIsLoading(true);
      setError(null);
      setResponse(''); // Clear previous response

      const startTime = performance.now();

      try {
        const requestBody = {
          model: options.model || 'gpt-4o-mini',
          messages: options.systemPrompt
            ? [{ role: 'system' as const, content: options.systemPrompt }, ...messages]
            : messages,
          apiKey,
          stream: true,
        };

        const res = await fetch(`${API_BASE_URL}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!res.ok) {
          const errorData = await res.json();
          const errorCode = errorData.error?.code || 'SERVER_ERROR';
          const errorMessage =
            ERROR_MESSAGES[errorCode] || errorData.error?.message || 'An unknown error occurred';
          throw new Error(errorMessage);
        }

        // Handle streaming response
        const reader = res.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        const decoder = new TextDecoder();
        let accumulated = '';
        let finalUsage: TokenUsage | null = null;
        let finalCost = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));

                if (data.done) {
                  // Final chunk with usage/cost
                  finalUsage = data.usage;
                  finalCost = data.cost;
                  setUsage(data.usage);
                  setCost(data.cost);
                } else if (data.delta) {
                  // Incremental text chunk
                  accumulated += data.delta;
                  setResponse(accumulated);

                  // Call optional chunk callback
                  if (onChunk) {
                    onChunk(data.delta);
                  }
                }
              } catch (parseError) {
                console.error('Failed to parse SSE chunk:', parseError);
              }
            }
          }
        }

        const endTime = performance.now();
        setDuration((endTime - startTime) / 1000); // Convert to seconds

        return {
          message: accumulated,
          usage: finalUsage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
          cost: finalCost,
        };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    sendMessage,
    sendStreamingMessage,
    response,
    isLoading,
    error,
    usage,
    cost,
    duration,
    clearResponse,
    clearError,
  };
};
