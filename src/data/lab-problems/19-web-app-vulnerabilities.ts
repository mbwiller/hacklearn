import type { Problem } from '@/types/ide';

export const webAppVulnerabilitiesProblem: Problem = {
  id: 19,
  title: "Web App Vulnerabilities: OWASP Top 10 Scanner",
  difficulty: "Hard",
  topics: ["Web Security", "OWASP Top 10", "Vulnerability Scanning", "Penetration Testing"],

  description: `Web applications face multiple vulnerability types. This lab combines knowledge from previous modules.

You are building a vulnerability scanner that checks for OWASP Top 10 issues in web applications.

Your task is to:

1. Scan for common vulnerabilities (injection, XSS, broken auth, misconfig)
2. Calculate overall security score
3. Prioritize vulnerabilities by severity (critical, high, medium, low)
4. Generate vulnerability reports
5. Recommend remediation steps

This synthesizes multiple security concepts into comprehensive assessment.`,

  examples: [
    { input: 'scan_webapp({"input_validation": true, "https": true, "auth": "strong"})', output: '{"security_score": 0.88, "vulnerabilities": [], "grade": "A"}', explanation: 'Well-secured application.' },
    { input: 'scan_webapp({"input_validation": false, "https": false, "auth": "weak"})', output: '{"security_score": 0.25, "vulnerabilities": ["SQL Injection", "XSS", "Broken Auth"], "grade": "F"}', explanation: 'Multiple critical vulnerabilities.' }
  ],

  constraints: ['Score: 0.0-1.0', 'Grades: A (>0.85), B (0.70-0.85), C (0.55-0.70), D (0.40-0.55), F (<0.40)', 'Check: input validation, HTTPS, authentication, session management, error handling'],

  starterCode: {
    python: `def scan_web_application(app_config: dict) -> dict:
    """Scan web application for OWASP Top 10 vulnerabilities"""
    # TODO: Check each security control
    # TODO: Calculate security score
    # TODO: List vulnerabilities
    pass`,
    javascript: `function scanWebApplication(appConfig) { /* TODO */ }`,
    sql: '-- SQL not applicable'
  },

  testCases: [
    { input: '{"input_validation": true, "https": true, "auth": "strong"}', expected: '{"security_score": 0.88, "grade": "A"}', explanation: 'Secure app.' },
    { input: '{"input_validation": false, "https": false, "auth": "weak"}', expected: '{"security_score": 0.25, "grade": "F"}', explanation: 'Vulnerable app.' }
  ],

  hints: ['Score starts at 1.0', 'Deduct 0.30 for no input validation', 'Deduct 0.25 for no HTTPS', 'Deduct 0.30 for weak auth', 'Grade based on final score']
};
