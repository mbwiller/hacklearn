import type { Problem } from '@/types/ide';

export const socialEngineeringProblem: Problem = {
  id: 14,
  title: "Social Engineering: Phishing Email Detector",
  difficulty: "Easy",
  topics: ["Social Engineering", "Phishing", "Email Security", "Human Factor"],

  description: `Social engineering exploits human psychology rather than technical vulnerabilities. Phishing is the most common form.

You are building an email security filter that detects phishing attempts. Attackers use urgency, authority, and deception to trick users.

Your task is to:

1. Analyze email content for phishing indicators (urgency, threats, suspicious links)
2. Check sender authenticity (spoofing, typosquatting)
3. Calculate phishing risk scores
4. Identify attack techniques (urgency, authority, scarcity, fear)
5. Flag high-risk emails for quarantine

This teaches why security awareness training is essential.`,

  examples: [
    { input: 'analyze_email("Meeting tomorrow at 10am. -John")', output: '{"phishing": false, "risk_score": 0.08}', explanation: 'Normal business email.' },
    { input: 'analyze_email("URGENT: Your account will be closed! Click here immediately!")', output: '{"phishing": true, "risk_score": 0.92, "techniques": ["urgency", "fear"]}', explanation: 'Classic phishing with urgency and fear tactics.' }
  ],

  constraints: ['Risk score 0.0-1.0', 'Techniques: urgency, authority, fear, scarcity, curiosity', 'Indicators: URGENT, verify account, click here, limited time', 'Phishing if risk >= 0.60'],

  starterCode: {
    python: `def detect_phishing(email_content: str) -> dict:
    """Detect phishing attempts in email content"""
    indicators = {
        'URGENT': 0.30,
        'verify': 0.25,
        'account': 0.20,
        'suspended': 0.30,
        'click here': 0.25,
        'limited time': 0.25
    }
    # TODO: Implement phishing detection
    pass`,
    javascript: `function detectPhishing(emailContent) { /* TODO */ }`,
    sql: '-- SQL not applicable'
  },

  testCases: [
    { input: 'Meeting tomorrow at 10am', expected: '{"phishing": false, "risk_score": 0.08}', explanation: 'Normal email.' },
    { input: 'URGENT: Your account will be suspended!', expected: '{"phishing": true, "risk_score": 0.92}', explanation: 'Phishing with urgency and fear.' }
  ],

  hints: ['Check for urgency keywords: URGENT, IMMEDIATE, LIMITED TIME', 'Fear indicators: suspended, closed, verify', 'Sum weights and classify as phishing if >= 0.60']
};
