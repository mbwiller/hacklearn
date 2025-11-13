import type { Problem } from '@/types/ide';

export const invisibleUnicodeProblem: Problem = {
  id: 9,
  title: "Invisible Unicode: Hidden Character Injection Detector",
  difficulty: "Hard",
  topics: ["AI Security", "Unicode Attacks", "Homoglyphs", "Input Sanitization"],

  description: `Unicode attacks use invisible characters and homoglyphs to inject malicious content that appears benign to users but is processed differently by systems.

You are building input validation for an LLM application. Attackers use zero-width spaces, right-to-left overrides, and lookalike characters to bypass filters.

Your task is to:

1. Detect invisible Unicode characters (zero-width, non-printing)
2. Identify homoglyph substitutions (Cyrillic 'a' vs Latin 'a')
3. Find bidirectional text attacks (right-to-left overrides)
4. Calculate injection risk scores
5. Sanitize inputs by removing/replacing dangerous Unicode

This demonstrates why applications need Unicode normalization and validation.`,

  examples: [
    { input: 'scan_unicode("Hello world")', output: '{"clean": true, "risk_score": 0.0, "invisible_chars": 0}', explanation: 'Standard ASCII text—no Unicode risks.' },
    { input: 'scan_unicode("Hello​world")  # Contains zero-width space', output: '{"clean": false, "risk_score": 0.65, "invisible_chars": 1, "issues": ["zero_width_space"]}', explanation: 'Zero-width space detected—often used to bypass filters.' },
    { input: 'scan_unicode("Gооgle")  # Cyrillic o', output: '{"clean": false, "risk_score": 0.78, "issues": ["homoglyph_attack"]}', explanation: 'Homoglyph attack: Cyrillic о (U+043E) instead of Latin o (U+006F).' }
  ],

  constraints: ['Detect: U+200B (zero-width space), U+FEFF (BOM), homoglyphs', 'Risk score based on invisible char count', 'Clean if risk < 0.30'],

  starterCode: {
    python: `def scan_unicode_injection(text: str) -> dict:
    """Detect invisible Unicode and homoglyph attacks"""
    # TODO: Count invisible characters
    # TODO: Detect homoglyphs
    # TODO: Calculate risk score
    pass`,
    javascript: `function scanUnicodeInjection(text) { /* TODO */ }`,
    sql: '-- SQL not applicable'
  },

  testCases: [
    { input: 'Hello world', expected: '{"clean": true, "risk_score": 0.0, "invisible_chars": 0}', explanation: 'Clean ASCII.' },
    { input: 'Hello\u200Bworld', expected: '{"clean": false, "risk_score": 0.65, "invisible_chars": 1}', explanation: 'Zero-width space.' },
    { input: 'Gооgle', expected: '{"clean": false, "risk_score": 0.78}', explanation: 'Homoglyph attack.' }
  ],

  hints: ['Check Unicode codepoints > U+0080', 'Zero-width chars: U+200B, U+200C, U+200D, U+FEFF', 'Each invisible char adds 0.25-0.35 to risk']
};
