import axios from 'axios';
import type { ExecuteRequest, ExecuteResponse } from '@/types/ide';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15s timeout (10s execution + 5s overhead)
  headers: {
    'Content-Type': 'application/json',
  },
});

export const executeCode = async (request: ExecuteRequest): Promise<ExecuteResponse> => {
  const response = await api.post<ExecuteResponse>('/api/execute', request);
  return response.data;
};

export const checkHealth = async (): Promise<{ status: string }> => {
  const response = await api.get('/health');
  return response.data;
};
