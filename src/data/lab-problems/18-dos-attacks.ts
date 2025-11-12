import type { Problem } from '@/types/ide';

export const dosAttacksProblem: Problem = {
  id: 18,
  title: "DoS/DDoS Attacks: Traffic Anomaly Detection",
  difficulty: "Medium",
  topics: ["DoS", "DDoS", "Network Security", "Traffic Analysis"],

  description: `Denial of Service (DoS) attacks overwhelm systems with traffic to make them unavailable to legitimate users.

You are building a traffic monitoring system to detect DoS/DDoS attacks. Attackers flood servers with requests to exhaust resources.

Your task is to:

1. Analyze traffic patterns for anomalies (request rate, source diversity)
2. Detect DoS vs DDoS (single source vs distributed)
3. Calculate attack severity scores
4. Identify attack types (SYN flood, HTTP flood, amplification)
5. Recommend rate limiting and traffic filtering

This teaches capacity planning and the importance of DDoS mitigation services.`,

  examples: [
    { input: 'analyze_traffic({"requests_per_sec": 100, "unique_ips": 50})', output: '{"dos_detected": false, "severity": 0.12}', explanation: 'Normal traffic pattern.' },
    { input: 'analyze_traffic({"requests_per_sec": 10000, "unique_ips": 3})', output: '{"dos_detected": true, "severity": 0.95, "attack_type": "dos"}', explanation: 'DoS attack from few sources.' },
    { input: 'analyze_traffic({"requests_per_sec": 50000, "unique_ips": 5000})', output: '{"dos_detected": true, "severity": 0.98, "attack_type": "ddos"}', explanation: 'DDoS from distributed sources.' }
  ],

  constraints: ['Severity: 0.0-1.0', 'DoS if unique_ips < 10, DDoS if >= 100', 'Normal traffic: < 500 req/s', 'DoS detected if severity >= 0.60'],

  starterCode: {
    python: `def detect_dos_attack(traffic_data: dict) -> dict:
    """Detect DoS/DDoS attacks from traffic patterns"""
    # TODO: Calculate severity based on request rate
    # TODO: Classify as DoS vs DDoS based on IP diversity
    # TODO: Determine if attack is occurring
    pass`,
    javascript: `function detectDosAttack(trafficData) { /* TODO */ }`,
    sql: '-- SQL not applicable'
  },

  testCases: [
    { input: '{"requests_per_sec": 100, "unique_ips": 50}', expected: '{"dos_detected": false, "severity": 0.12}', explanation: 'Normal traffic.' },
    { input: '{"requests_per_sec": 10000, "unique_ips": 3}', expected: '{"dos_detected": true, "severity": 0.95, "attack_type": "dos"}', explanation: 'DoS attack.' },
    { input: '{"requests_per_sec": 50000, "unique_ips": 5000}', expected: '{"dos_detected": true, "severity": 0.98, "attack_type": "ddos"}', explanation: 'DDoS attack.' }
  ],

  hints: ['Severity = min(requests_per_sec / 50000, 1.0)', 'DoS if unique_ips < 10, DDoS if >= 100', 'DoS detected if severity >= 0.60']
};
