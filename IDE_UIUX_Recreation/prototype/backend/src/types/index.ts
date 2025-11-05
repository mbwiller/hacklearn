// Shared types between frontend and backend
// IMPORTANT: Keep in sync with frontend src/types/index.ts

export type Language = 'python' | 'javascript' | 'sql';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface TestResult {
  status: 'accepted' | 'wrong_answer' | 'runtime_error' | 'time_limit_exceeded';
  runtime?: string;       // e.g., "42ms"
  memory?: string;        // e.g., "14.2 MB"
  testsPassed: number;
  testsTotal: number;
  output: string;
  error?: string;
}

// Backend-specific types

export interface ExecuteRequest {
  code: string;
  language: Language;
  problemId: number;
}

export interface ExecuteResponse extends TestResult {
  // Extends TestResult with no additional fields for now
  // Can add backend-specific metadata later if needed
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTime: number;  // milliseconds
  error?: string;
}
