import { Router } from 'express';
import { z } from 'zod';
import { CodeExecutor } from '../services/executor';
import type { ExecuteRequest, ExecuteResponse, TestResult } from '../types/index';
import { logger } from '../server';

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
executeRouter.post('/execute', async (req, res) => {
  try {
    // Validate request body
    const validatedData = executeRequestSchema.parse(req.body) as ExecuteRequest;
    const { code, language, problemId } = validatedData;

    logger.info({
      language,
      problemId,
      codeLength: code.length,
    }, 'Code execution request received');

    // Execute code
    const executionResult = await executor.execute(code, language);

    logger.info({
      language,
      problemId,
      exitCode: executionResult.exitCode,
      executionTime: executionResult.executionTime,
    }, 'Code execution completed');

    // Map execution result to TestResult format
    const testResult: TestResult = mapExecutionResultToTestResult(executionResult);

    // Return response
    const response: ExecuteResponse = testResult;
    return res.json(response);

  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      logger.warn({ errors: error.issues }, 'Invalid request');
      return res.status(400).json({
        error: 'Invalid request',
        details: error.issues.map((e: any) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }

    // Handle other errors
    logger.error({ error }, 'Execution error');
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Map ExecutionResult to TestResult format
 * This is a simplified mapping for Phase 1 (no real test case validation)
 */
function mapExecutionResultToTestResult(executionResult: any): TestResult {
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

  // Generate mock memory (Phase 1 doesn't measure real memory)
  const memory = `${(Math.random() * 5 + 10).toFixed(1)} MB`;

  // Combine stdout and stderr for output
  const output = stdout || stderr || 'No output';

  // For Phase 1, we assume 3 test cases total
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
