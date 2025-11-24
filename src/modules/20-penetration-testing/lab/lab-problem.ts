import type { Problem } from '@/types/ide';

export const penetrationTestingProblem: Problem = {
  id: 20,
  title: "Penetration Testing: Full Security Assessment",
  difficulty: "Hard",
  topics: ["Penetration Testing", "Security Assessment", "Ethical Hacking", "Comprehensive Security"],

  description: `Penetration testing combines all hacking techniques into a comprehensive security assessment. This is the final boss module.

You are conducting a full penetration test, applying knowledge from all 20 modules to assess a target system.

Your task is to:

1. Execute a multi-phase pentest (recon, scanning, exploitation, post-exploitation)
2. Score each phase based on findings
3. Calculate overall penetration depth (how far the attacker progressed)
4. Generate comprehensive security report
5. Prioritize remediation recommendations

This capstone lab demonstrates the full ethical hacking methodology.`,

  examples: [
    { input: 'pentest({"recon": 0.3, "scanning": 0.2, "exploitation": 0.0})', output: '{"penetration_depth": 0.25, "phase_reached": "scanning", "risk_level": "low"}', explanation: 'Limited penetration, stopped at scanning.' },
    { input: 'pentest({"recon": 0.8, "scanning": 0.9, "exploitation": 0.7, "post_exploit": 0.6})', output: '{"penetration_depth": 0.75, "phase_reached": "post_exploitation", "risk_level": "critical"}', explanation: 'Deep penetration with full system compromise.' }
  ],

  constraints: ['Penetration depth: 0.0-1.0 (average of phase scores)', 'Phases: reconnaissance, scanning, exploitation, post_exploitation', 'Risk levels: low (<0.30), medium (0.30-0.60), high (0.60-0.80), critical (>0.80)'],

  starterCode: {
    python: `def conduct_penetration_test(phase_scores: dict) -> dict:
    """Conduct comprehensive penetration test across all phases"""
    phases = ['reconnaissance', 'scanning', 'exploitation', 'post_exploitation']
    # TODO: Calculate average penetration depth
    # TODO: Determine furthest phase reached
    # TODO: Assess risk level
    pass`,
    javascript: `function conductPenetrationTest(phaseScores) { /* TODO */ }`,
    sql: '-- SQL not applicable'
  },

  testCases: [
    { input: '{"recon": 0.3, "scanning": 0.2, "exploitation": 0.0}', expected: '{"penetration_depth": 0.25, "phase_reached": "scanning", "risk_level": "low"}', explanation: 'Limited penetration.' },
    { input: '{"recon": 0.8, "scanning": 0.9, "exploitation": 0.7, "post_exploit": 0.6}', expected: '{"penetration_depth": 0.75, "phase_reached": "post_exploitation", "risk_level": "critical"}', explanation: 'Full system compromise.' }
  ],

  hints: ['Average all phase scores for penetration depth', 'Phase reached: last phase with score > 0.40', 'Risk level based on penetration depth thresholds']
};
