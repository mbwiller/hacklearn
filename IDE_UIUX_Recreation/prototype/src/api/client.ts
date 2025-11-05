import axios, { AxiosError } from 'axios';
import type { Language, TestResult } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds (execution can take up to 5s + network overhead)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request type (matches backend ExecuteRequest)
export interface ExecuteCodeRequest {
  code: string;
  language: Language;
  problemId: number;
}

// Response type (matches backend ExecuteResponse/TestResult)
export interface ExecuteCodeResponse extends TestResult {
  // TestResult already has all needed fields
}

/**
 * Execute user code on the backend
 * @param request Code execution request
 * @returns Test result with execution output
 * @throws Error on network failure or backend error
 */
export async function executeCode(request: ExecuteCodeRequest): Promise<ExecuteCodeResponse> {
  try {
    const response = await api.post<ExecuteCodeResponse>('/api/execute', request);
    return response.data;
  } catch (error) {
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ error: string; message?: string }>;

      // Network error (backend down, no internet, etc.)
      if (!axiosError.response) {
        throw new Error('Unable to connect to backend server. Is it running on port 3000?');
      }

      // Backend returned an error response
      if (axiosError.response.status >= 400) {
        const errorMessage = axiosError.response.data?.message
          || axiosError.response.data?.error
          || 'Server error occurred';
        throw new Error(errorMessage);
      }
    }

    // Unknown error
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
}

/**
 * Check if backend is healthy
 */
export async function checkHealth(): Promise<{ status: string; timestamp: string }> {
  try {
    const response = await api.get<{ status: string; timestamp: string }>('/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend health check failed');
  }
}
