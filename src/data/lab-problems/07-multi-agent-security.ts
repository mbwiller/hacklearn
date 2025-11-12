import type { Problem } from '@/types/ide';

export const multiAgentSecurityProblem: Problem = {
  id: 7,
  title: "Multi-Agent Security: Message Interception Detector",
  difficulty: "Hard",
  topics: ["AI Security", "Multi-Agent Systems", "Message Tampering", "Agent Communication"],

  description: `Multi-agent AI systems are vulnerable to man-in-the-middle attacks where malicious actors intercept and modify messages between agents.

You are securing an autonomous multi-agent system. Agents communicate to coordinate tasks, but attackers can inject false messages to manipulate agent behavior.

Your task is to:

1. Detect tampered messages between agents
2. Validate message authenticity and integrity
3. Identify impersonation attempts (fake sender IDs)
4. Calculate message trust scores
5. Implement basic message signing/verification simulation

This teaches why multi-agent systems need cryptographic message authentication.`,

  examples: [
    { input: 'verify_message({"from": "AgentA", "to": "AgentB", "message": "Task complete", "signature": "valid"})', output: '{"authentic": true, "risk_score": 0.02}', explanation: 'Valid signed message between agents.' },
    { input: 'verify_message({"from": "AgentA", "to": "AgentB", "message": "ABORT ALL TASKS", "signature": "invalid"})', output: '{"authentic": false, "risk_score": 0.94, "attack_type": "message_tampering"}', explanation: 'Tampered message with invalid signature detected.' }
  ],

  constraints: ['Validate message signatures', 'Detect impersonation', 'Trust threshold 0.50'],

  starterCode: {
    python: `def verify_agent_message(message: dict) -> dict:
    """Verify multi-agent message authenticity"""
    # TODO: Check signature validity
    # TODO: Detect suspicious message patterns
    # TODO: Calculate trust score
    pass`,
    javascript: `function verifyAgentMessage(message) { /* TODO */ }`,
    sql: '-- SQL not applicable'
  },

  testCases: [
    { id: 1, input: '{"message": "Task complete", "signature": "valid"}', expected: '{"authentic": true, "risk_score": 0.02}', explanation: 'Valid message.' },
    { id: 2, input: '{"message": "ABORT ALL TASKS", "signature": "invalid"}', expected: '{"authentic": false, "risk_score": 0.94}', explanation: 'Tampered message.' }
  ],

  hints: ['Check signature field first', 'Detect dangerous keywords in messages', 'Invalid signature = high risk']
};
