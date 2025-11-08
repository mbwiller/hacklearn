import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { CodeExecutor } from '../services/codeExecutor';
import type { ExecuteRequest, ExecuteResponse, TestResult, ExecutionResult } from '../types/ide';

export const executeRouter = Router();
const executor = new CodeExecutor();

// Zod schema for request validation
const executeRequestSchema = z.object({
  code: z.string().min(1, 'Code cannot be empty').max(50000, 'Code exceeds 50KB limit'),
  language: z.enum(['python', 'javascript', 'sql']),
  problemId: z.number().int().positive('Problem ID must be a positive integer'),
});

/**
 * POST /api/execute
 * Execute user code and return results
 */
executeRouter.post('/execute', async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = executeRequestSchema.parse(req.body) as ExecuteRequest;
    const { code, language, problemId } = validatedData;

    console.log(`[Execute API] Received ${language} code execution request for problem ${problemId}`);

    // Execute code
    const executionResult = await executor.execute(code, language);

    console.log(`[Execute API] Execution completed - Exit code: ${executionResult.exitCode}, Time: ${executionResult.executionTime}ms`);

    // Map execution result to TestResult format
    const testResult: TestResult = mapExecutionResultToTestResult(executionResult);

    // Return response
    const response: ExecuteResponse = testResult;
    return res.json(response);

  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      console.warn('[Execute API] Invalid request:', error.issues);
      return res.status(400).json({
        error: 'Invalid request',
        details: error.issues.map((e: any) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }

    // Handle other errors
    console.error('[Execute API] Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Map ExecutionResult to TestResult format
 * This is a simplified mapping for MVP (no real test case validation yet)
 */
function mapExecutionResultToTestResult(executionResult: ExecutionResult): TestResult {
  const { stdout, stderr, exitCode, executionTime, error } = executionResult;

  // Determine status based on exit code
  let status: TestResult['status'];
  if (error && error.includes('Timeout')) {
    status = 'time_limit_exceeded';
  } else if (exitCode === 0) {
    status = 'accepted';
  } else {
    status = 'runtime_error';
  }

  // Format runtime
  const runtime = `${executionTime}ms`;

  // Generate mock memory (we don't measure real memory yet)
  const memory = `${(Math.random() * 5 + 10).toFixed(1)} MB`;

  // Combine stdout and stderr for output
  const output = stdout || stderr || 'No output';

  // For MVP, we assume 3 test cases total
  // If code executed successfully, assume all passed (mocked)
  const testsPassed = status === 'accepted' ? 3 : 0;
  const testsTotal = 3;

  return {
    status,
    runtime: status === 'accepted' ? runtime : undefined,
    memory: status === 'accepted' ? memory : undefined,
    testsPassed,
    testsTotal,
    output,
    error: status !== 'accepted' ? (error || stderr || 'Execution failed') : undefined,
  };
}
