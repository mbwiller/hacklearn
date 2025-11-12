import type { Problem } from '@/types/ide';

export const networkScanningProblem: Problem = {
  id: 15,
  title: "Network Scanning: Port & Service Discovery",
  difficulty: "Medium",
  topics: ["Network Scanning", "Port Scanning", "Service Discovery", "Nmap"],

  description: `Network scanning identifies open ports and running services on target systems. This is essential for both attackers and defenders.

You are simulating a network scanner to understand how attackers discover vulnerabilities. Port scanning reveals attack surfaces.

Your task is to:

1. Simulate TCP port scans on target hosts
2. Identify open, closed, and filtered ports
3. Detect running services (HTTP, SSH, FTP, etc.)
4. Calculate attack surface score based on open ports
5. Flag high-risk services (telnet, FTP, unencrypted protocols)

This teaches network hardening and the importance of closing unnecessary ports.`,

  examples: [
    { input: 'port_scan("192.168.1.100", ports="common")', output: '{"open_ports": [80, 443], "services": ["HTTP", "HTTPS"], "attack_surface": 0.25}', explanation: 'Web server with standard ports.' },
    { input: 'port_scan("192.168.1.50", ports="all")', output: '{"open_ports": [21, 22, 23, 80, 443, 3306], "services": ["FTP", "SSH", "Telnet", "HTTP", "HTTPS", "MySQL"], "attack_surface": 0.78, "high_risk": ["FTP", "Telnet"]}', explanation: 'Highly exposed server with insecure services.' }
  ],

  constraints: ['Attack surface: 0.0-1.0 based on open port count', 'High-risk services: FTP (21), Telnet (23), SMB (445), RDP (3389)', 'Common ports: 21, 22, 23, 80, 443, 3306, 3389, 5432, 8080', 'Attack surface = min(open_ports / 10, 1.0)'],

  starterCode: {
    python: `def simulate_port_scan(target_ip: str, scan_type: str = "common") -> dict:
    """Simulate network port scanning"""
    # Port to service mapping
    services = {
        21: 'FTP', 22: 'SSH', 23: 'Telnet',
        80: 'HTTP', 443: 'HTTPS',
        3306: 'MySQL', 3389: 'RDP', 5432: 'PostgreSQL'
    }
    high_risk = [21, 23, 445, 3389]
    # TODO: Implement port scanning simulation
    pass`,
    javascript: `function simulatePortScan(targetIP, scanType) { /* TODO */ }`,
    sql: '-- SQL not applicable'
  },

  testCases: [
    { input: '{"target": "192.168.1.100", "scan_type": "common"}', expected: '{"open_ports": [80, 443], "attack_surface": 0.20}', explanation: 'Minimal exposure.' },
    { input: '{"target": "192.168.1.50", "scan_type": "all"}', expected: '{"open_ports": [21, 22, 23, 80, 443, 3306], "attack_surface": 0.60}', explanation: 'High exposure with risky services.' }
  ],

  hints: ['Map simulated hosts to open ports', 'Calculate attack_surface = open_port_count / 10', 'Flag ports in high_risk list']
};
