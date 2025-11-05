import { spawn } from 'child_process';
import { writeFileSync, unlinkSync, mkdtempSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import type { Language, ExecutionResult } from '../types/index';
import { logger } from '../server';

const EXECUTION_TIMEOUT = 5000; // 5 seconds
const MAX_OUTPUT_SIZE = 10000; // 10KB max output

export class CodeExecutor {
  /**
   * Execute user code with timeout and output limits
   */
  async execute(code: string, language: Language): Promise<ExecutionResult> {
    const startTime = Date.now();

    try {
      // Create temporary directory for code execution
      const tempDir = mkdtempSync(join(tmpdir(), 'hacklearn-'));
      const { command, args, filePath } = this.prepareExecution(code, language, tempDir);

      logger.info({ language, tempDir }, 'Executing code');

      const result = await this.runProcess(command, args, filePath);

      // Calculate execution time
      const executionTime = Date.now() - startTime;

      return {
        ...result,
        executionTime,
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;
      logger.error({ error, language }, 'Execution failed');

      return {
        stdout: '',
        stderr: error instanceof Error ? error.message : 'Unknown error',
        exitCode: -1,
        executionTime,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Prepare execution command and write code to temp file
   */
  private prepareExecution(code: string, language: Language, tempDir: string): {
    command: string;
    args: string[];
    filePath: string;
  } {
    let command: string;
    let args: string[];
    let filePath: string;
    let fileExtension: string;

    switch (language) {
      case 'python':
        fileExtension = '.py';
        filePath = join(tempDir, `code${fileExtension}`);
        writeFileSync(filePath, code, 'utf-8');
        command = 'python';
        args = [filePath];
        break;

      case 'javascript':
        fileExtension = '.js';
        filePath = join(tempDir, `code${fileExtension}`);
        writeFileSync(filePath, code, 'utf-8');
        command = 'node';
        args = [filePath];
        break;

      case 'sql':
        // SQL not supported in Phase 1 (requires database)
        throw new Error('SQL execution not yet supported. Coming in Phase 6.');

      default:
        throw new Error(`Unsupported language: ${language}`);
    }

    return { command, args, filePath };
  }

  /**
   * Run child process with timeout and output limits
   */
  private runProcess(command: string, args: string[], filePath: string): Promise<ExecutionResult> {
    return new Promise((resolve) => {
      let stdout = '';
      let stderr = '';
      let killed = false;

      const process = spawn(command, args, {
        timeout: EXECUTION_TIMEOUT,
        killSignal: 'SIGKILL',
      });

      // Capture stdout
      process.stdout?.on('data', (data) => {
        stdout += data.toString();
        if (stdout.length > MAX_OUTPUT_SIZE) {
          stdout = stdout.slice(0, MAX_OUTPUT_SIZE) + '\n... (output truncated)';
          if (!killed) {
            killed = true;
            process.kill('SIGKILL');
          }
        }
      });

      // Capture stderr
      process.stderr?.on('data', (data) => {
        stderr += data.toString();
        if (stderr.length > MAX_OUTPUT_SIZE) {
          stderr = stderr.slice(0, MAX_OUTPUT_SIZE) + '\n... (output truncated)';
          if (!killed) {
            killed = true;
            process.kill('SIGKILL');
          }
        }
      });

      // Handle process completion
      process.on('close', (exitCode) => {
        // Clean up temp file
        try {
          unlinkSync(filePath);
        } catch (e) {
          logger.warn({ filePath, error: e }, 'Failed to clean up temp file');
        }

        const result: ExecutionResult = {
          stdout,
          stderr,
          exitCode: exitCode ?? -1,
          executionTime: 0, // Will be set by caller
        };

        if (killed && stderr.includes('')) {
          result.error = 'Execution killed: Output size limit exceeded';
        } else if (exitCode === null) {
          result.error = 'Execution killed: Timeout exceeded (5s limit)';
        }

        resolve(result);
      });

      // Handle process errors
      process.on('error', (error) => {
        try {
          unlinkSync(filePath);
        } catch (e) {
          // Ignore cleanup errors
        }

        resolve({
          stdout: '',
          stderr: error.message,
          exitCode: -1,
          executionTime: 0,
          error: error.message,
        });
      });
    });
  }
}
