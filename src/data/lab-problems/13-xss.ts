import type { Problem } from '@/types/ide';

export const xssProblem: Problem = {
  id: 13,
  title: "Cross-Site Scripting (XSS): Malicious Script Detection",
  difficulty: "Medium",
  topics: ["XSS", "Web Security", "OWASP Top 10", "Client-Side Security"],

  description: `Cross-Site Scripting (XSS) allows attackers to inject malicious JavaScript into web pages viewed by other users.

You are securing a web application against XSS attacks. Attackers try to inject scripts through user inputs, URLs, or stored content.

Your task is to:

1. Detect XSS patterns in user inputs (script tags, event handlers, encoded payloads)
2. Classify XSS type (reflected, stored, DOM-based)
3. Calculate injection risk scores
4. Identify dangerous patterns (script tags, onerror, javascript: URLs)
5. Recommend proper output encoding

This demonstrates OWASP A03:2021 - Injection and why input sanitization is critical.`,

  examples: [
    { input: 'check_xss("Hello, World!")', output: '{"safe": true, "risk_score": 0.03}', explanation: 'Normal text with no XSS indicators.' },
    { input: 'check_xss("<script>alert(1)</script>")', output: '{"safe": false, "risk_score": 0.98, "xss_type": "stored", "patterns": ["script_tag"]}', explanation: 'Classic XSS payload with script tag.' },
    { input: 'check_xss("<img src=x onerror=alert(1)>")', output: '{"safe": false, "risk_score": 0.95, "xss_type": "reflected", "patterns": ["onerror_handler", "img_tag"]}', explanation: 'XSS via image error handler.' }
  ],

  constraints: ['Risk score 0.0-1.0', 'XSS types: none, reflected, stored, dom_based', 'Patterns: script_tag, onerror, onload, javascript_url, iframe', 'Safe if risk < 0.40'],

  starterCode: {
    python: `def detect_xss(user_input: str) -> dict:
    """Detect XSS attempts in user input"""
    xss_patterns = {
        '<script': 0.50,
        'onerror': 0.40,
        'onload': 0.40,
        'javascript:': 0.45,
        '<iframe': 0.45,
        'eval(': 0.40
    }
    # TODO: Implement XSS detection
    pass`,
    javascript: `function detectXSS(userInput) { /* TODO */ }`,
    sql: '-- SQL not applicable for XSS detection'
  },

  testCases: [
    { input: 'Hello, World!', expected: '{"safe": true, "risk_score": 0.03, "xss_type": "none"}', explanation: 'Safe text.' },
    { input: '<script>alert(1)</script>', expected: '{"safe": false, "risk_score": 0.98, "xss_type": "stored"}', explanation: 'Script tag XSS.' },
    { input: '<img src=x onerror=alert(1)>', expected: '{"safe": false, "risk_score": 0.95, "xss_type": "reflected"}', explanation: 'Event handler XSS.' }
  ],

  hints: ['Convert to lowercase for matching', 'Check for <script, onerror, onload, javascript:', 'Classify by context: script tags = stored, event handlers = reflected']
};
