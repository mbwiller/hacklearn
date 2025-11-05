export type Language = 'python' | 'javascript' | 'sql';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface ProblemExample {
  input: string;
  output: string;
  explanation: string;
}

export interface TestCase {
  input: string;
  expected: string;
  explanation: string;
}

export interface StarterCode {
  python: string;
  javascript: string;
  sql: string;
}

export interface Problem {
  id: number;
  title: string;
  difficulty: DifficultyLevel;
  topics: string[];
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  starterCode: StarterCode;
  testCases: TestCase[];
  hints: string[];
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

export type TabType = 'description' | 'editorial' | 'solutions' | 'submissions';
export type ConsoleTab = 'testcase' | 'result';
