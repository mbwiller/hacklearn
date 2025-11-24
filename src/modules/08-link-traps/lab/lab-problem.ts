import type { Problem } from '@/types/ide';

export const linkTrapsProblem: Problem = {
  id: 8,
  title: "Link Traps: Malicious URL Detection in LLM Outputs",
  difficulty: "Hard",
  topics: ["AI Security", "URL Obfuscation", "Phishing", "Link Safety"],

  description: `LLMs can be manipulated to generate malicious URLs through prompt injection, creating phishing and malware distribution risks.

You are building URL safety validation for an LLM application. Attackers use obfuscation techniques (URL shorteners, homoglyphs, typosquatting) to bypass filters.

Your task is to:

1. Detect obfuscated URLs (bit.ly, IP addresses, suspicious TLDs)
2. Identify typosquatting attempts (g00gle.com vs google.com)
3. Check for homoglyph attacks (using similar Unicode characters)
4. Calculate URL safety scores
5. Warn users about suspicious links before clickthrough

This demonstrates why LLM outputs need URL validation before user exposure.`,

  examples: [
    { input: 'analyze_url("https://github.com/repo")', output: '{"safe": true, "risk_score": 0.08}', explanation: 'Legitimate well-known domain.' },
    { input: 'analyze_url("http://bit.ly/a1b2c3")', output: '{"safe": false, "risk_score": 0.72, "issues": ["url_shortener", "obfuscated"]}', explanation: 'URL shortener hides destination—medium-high risk.' },
    { input: 'analyze_url("https://g00gle.com/login")', output: '{"safe": false, "risk_score": 0.89, "issues": ["typosquatting", "phishing_pattern"]}', explanation: 'Typosquatting attack (g00gle vs google)—high risk phishing.' }
  ],

  constraints: ['Risk score 0.0-1.0', 'Detect: shorteners, IPs, typos, suspicious TLDs', 'Safe if risk < 0.40'],

  starterCode: {
    python: `def analyze_url_safety(url: str) -> dict:
    """Detect malicious URL patterns"""
    # TODO: Check for URL shorteners
    # TODO: Detect typosquatting
    # TODO: Identify suspicious TLDs
    pass`,
    javascript: `function analyzeURLSafety(url) { /* TODO */ }`,
    sql: '-- SQL not applicable'
  },

  testCases: [
    { input: 'https://github.com', expected: '{"safe": true, "risk_score": 0.08}', explanation: 'Trusted domain.' },
    { input: 'http://bit.ly/x', expected: '{"safe": false, "risk_score": 0.72}', explanation: 'URL shortener obfuscation.' },
    { input: 'https://g00gle.com', expected: '{"safe": false, "risk_score": 0.89}', explanation: 'Typosquatting attack.' }
  ],

  hints: ['Check for bit.ly, tinyurl, goo.gl', 'Detect common typos: g00gle, micr0soft', 'Weight multiple indicators']
};
