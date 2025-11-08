export type Language = 'python' | 'javascript' | 'sql';

export interface ExecuteRequest {
  code: string;
  language: Language;
  problemId: number;
}

export interface TestResult {
  status: 'accepted' | 'wrong_answer' | 'runtime_error' | 'time_limit_exceeded';
  runtime?: string;
  memory?: string;
  testsPassed: number;
  testsTotal: number;
  output: string;
  error?: string;
}

export interface ExecuteResponse extends TestResult {}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTime: number;
  error?: string;
}
