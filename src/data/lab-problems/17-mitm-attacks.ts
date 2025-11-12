import type { Problem } from '@/types/ide';

export const mitmAttacksProblem: Problem = {
  id: 17,
  title: "Man-in-the-Middle Attacks: Traffic Interception Detection",
  difficulty: "Hard",
  topics: ["MITM", "Network Security", "Encryption", "ARP Spoofing"],

  description: `Man-in-the-Middle (MITM) attacks allow attackers to intercept and manipulate network traffic between two parties.

You are building network monitoring to detect MITM attacks. Attackers use ARP spoofing, DNS hijacking, or rogue access points.

Your task is to:

1. Detect MITM indicators (certificate mismatches, ARP anomalies, unexpected proxies)
2. Analyze traffic for interception attempts
3. Calculate MITM risk scores
4. Identify attack types (ARP spoofing, DNS hijacking, SSL stripping)
5. Recommend encryption and certificate pinning

This teaches why HTTPS and certificate validation are critical.`,

  examples: [
    { input: 'detect_mitm({"https": true, "cert_valid": true, "arp_stable": true})', output: '{"mitm_detected": false, "risk_score": 0.08}', explanation: 'Secure connection with valid certificates.' },
    { input: 'detect_mitm({"https": false, "cert_valid": false, "arp_changes": 5})', output: '{"mitm_detected": true, "risk_score": 0.94, "attack_type": "arp_spoofing"}', explanation: 'MITM detected via ARP anomalies and invalid certificates.' }
  ],

  constraints: ['Risk score 0.0-1.0', 'Attack types: arp_spoofing, dns_hijacking, ssl_stripping, rogue_ap', 'Indicators: invalid_cert, http_downgrade, arp_anomaly, dns_mismatch', 'MITM detected if risk >= 0.70'],

  starterCode: {
    python: `def detect_mitm_attack(connection_data: dict) -> dict:
    """Detect MITM attacks in network connections"""
    # TODO: Check HTTPS, certificate validity, ARP stability
    # TODO: Calculate risk score
    # TODO: Classify attack type
    pass`,
    javascript: `function detectMITMAttack(connectionData) { /* TODO */ }`,
    sql: '-- SQL not applicable'
  },

  testCases: [
    { input: '{"https": true, "cert_valid": true}', expected: '{"mitm_detected": false, "risk_score": 0.08}', explanation: 'Secure connection.' },
    { input: '{"https": false, "arp_changes": 5}', expected: '{"mitm_detected": true, "risk_score": 0.94, "attack_type": "arp_spoofing"}', explanation: 'MITM via ARP spoofing.' }
  ],

  hints: ['Check HTTPS status (+0 if true, +0.40 if false)', 'Invalid certificate adds 0.45 to risk', 'ARP changes: each change adds 0.10', 'MITM if risk >= 0.70']
};
