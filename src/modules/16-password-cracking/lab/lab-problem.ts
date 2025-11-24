import type { Problem } from '@/types/ide';

export const passwordCrackingProblem: Problem = {
  id: 16,
  title: "Password Cracking: Weak Password Detection & Analysis",
  difficulty: "Medium",
  topics: ["Password Cracking", "Cryptography", "Authentication", "Password Strength"],

  description: `Password cracking reveals why strong passwords and proper hashing are critical for security.

You are analyzing password strength and simulating dictionary attacks. Weak passwords can be cracked in seconds.

Your task is to:

1. Calculate password strength based on length, character diversity, patterns
2. Simulate dictionary attacks to estimate crack time
3. Detect common patterns (dictionary words, keyboard patterns, dates)
4. Score passwords from 0 (very weak) to 1.0 (very strong)
5. Recommend improvements for weak passwords

This teaches password policy best practices and the importance of password managers.`,

  examples: [
    { input: 'analyze_password("password123")', output: '{"strength": 0.15, "crack_time": "< 1 second", "issues": ["dictionary_word", "common_pattern"]}', explanation: 'Extremely weak password.' },
    { input: 'analyze_password("Tr0ub4dor&3")', output: '{"strength": 0.65, "crack_time": "~2 days", "issues": ["predictable_substitution"]}', explanation: 'Moderate strength with common substitutions.' },
    { input: 'analyze_password("kJ#9mP$2nQz@8wX")', output: '{"strength": 0.98, "crack_time": "> 100 years", "issues": []}', explanation: 'Strong random password.' }
  ],

  constraints: ['Strength: 0.0-1.0', 'Factors: length (min 12), uppercase, lowercase, numbers, symbols', 'Common patterns: qwerty, 12345, password, admin', 'Crack time estimates: <1s, minutes, hours, days, years'],

  starterCode: {
    python: `def analyze_password_strength(password: str) -> dict:
    """Analyze password strength and estimate crack time"""
    common_passwords = ['password', '123456', 'qwerty', 'admin', 'letmein']
    keyboard_patterns = ['qwerty', 'asdf', '1234']
    # TODO: Calculate strength based on length and character diversity
    # TODO: Check for dictionary words and patterns
    # TODO: Estimate crack time
    pass`,
    javascript: `function analyzePasswordStrength(password) { /* TODO */ }`,
    sql: '-- SQL not applicable'
  },

  testCases: [
    { input: 'password123', expected: '{"strength": 0.15, "crack_time": "< 1 second"}', explanation: 'Very weak password.' },
    { input: 'Tr0ub4dor&3', expected: '{"strength": 0.65, "crack_time": "~2 days"}', explanation: 'Moderate strength.' },
    { input: 'kJ#9mP$2nQz@8wX', expected: '{"strength": 0.98, "crack_time": "> 100 years"}', explanation: 'Very strong password.' }
  ],

  hints: ['Base strength on length (12+ chars), character types (4 types max)', 'Penalize dictionary words and common patterns', 'Crack time based on strength: <0.3 = seconds, 0.3-0.5 = minutes, 0.5-0.7 = days, >0.7 = years']
};
