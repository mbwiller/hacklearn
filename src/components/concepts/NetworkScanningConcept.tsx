import { useState } from 'react';
import {
  Shield, Lock, Unlock, Target, AlertTriangle, Terminal, BookOpen,
  Network, Search, Eye, Database, ArrowLeft, Radar
} from 'lucide-react';

const tabs = [
  { id: 'theory', name: 'Theory', icon: BookOpen },
  { id: 'lab', name: 'Lab', icon: Terminal },
  { id: 'tools', name: 'Tools', icon: Shield },
  { id: 'references', name: 'References', icon: Database }
];

interface NetworkScanningConceptProps {
  onBack?: () => void;
  onStartChallenge?: () => void;
}

export const NetworkScanningConcept = ({ onBack, onStartChallenge }: NetworkScanningConceptProps = {}) => {
  const [activeTab, setActiveTab] = useState('theory');

  const TheoryTab = () => (
    <div className="space-y-8">
      {/* Introduction */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Radar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          What is Network Scanning & Enumeration?
        </h2>
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 space-y-4 border border-slate-200 dark:border-slate-700">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Network scanning is the process of identifying active hosts, open ports, and running services on a network. Enumeration goes deeper,
            extracting detailed information about those services—including usernames, shares, configurations, and potential vulnerabilities. These
            techniques form the reconnaissance phase of penetration testing, providing attackers with the intelligence needed to plan targeted attacks.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Scanning and enumeration are responsible for the reconnaissance phase in 29% of all data breaches (Verizon DBIR 2024). Major incidents
            like Equifax ($1.4B), SolarWinds ($100B economic impact), and NotPetya ($10B+) all began with network reconnaissance to identify vulnerable
            services. Attackers use scanning to discover unpatched systems, misconfigured services, and exposed admin interfaces.
          </p>
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-sm font-semibold mb-2 text-slate-900 dark:text-white">
              MITRE ATT&CK TA0007: Discovery (T1046 Network Service Discovery)
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              Network scanning is classified under MITRE ATT&CK's Discovery tactic (TA0007). Technique T1046 (Network Service Discovery) is used by
              90% of APT groups including APT29 (Cozy Bear), APT41, FIN6, and Lazarus Group to identify targets and plan lateral movement.
            </p>
          </div>
        </div>
      </section>

      {/* TCP/UDP Scanning */}
      <section>
        <h2 className="text-2xl font-bold mb-4">TCP/UDP Scanning Techniques</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/50 rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Network className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              SYN Scan (Half-Open)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              Sends SYN packet, analyzes SYN-ACK response, never completes handshake. Stealthy (doesn't complete connection), fast, and accurate.
              Most commonly used scan type. Nmap flag: <code className="bg-slate-200 dark:bg-slate-900 px-2 py-0.5 rounded">-sS</code>
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 font-mono text-sm border border-slate-200 dark:border-slate-700">
              <code className="text-green-600 dark:text-green-400">
                nmap -sS -p 1-65535 target.com
              </code>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-cyan-200 dark:border-cyan-500/50 rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              ACK Scan (Firewall Detection)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              Sends ACK packets to determine firewall rule sets. Maps firewall rules, distinguishes filtered from unfiltered ports. Triggers stateful firewall alerts.
              Nmap flag: <code className="bg-slate-200 dark:bg-slate-900 px-2 py-0.5 rounded">-sA</code>
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 font-mono text-sm border border-slate-200 dark:border-slate-700">
              <code className="text-cyan-600 dark:text-cyan-400">
                nmap -sA -p 80,443 target.com
              </code>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-purple-200 dark:border-purple-500/50 rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              FIN/NULL/XMAS Scans
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              Sends packets with unusual flag combinations to elicit responses from closed ports. Bypasses some non-stateful firewalls. Modern IDS detect anomalous packets.
              Flags: <code className="bg-slate-200 dark:bg-slate-900 px-2 py-0.5 rounded">-sF -sN -sX</code>
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 font-mono text-sm border border-slate-200 dark:border-slate-700">
              <code className="text-purple-600 dark:text-purple-400">
                nmap -sX -T0 -p- target.com
              </code>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-green-200 dark:border-green-500/50 rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Network className="w-5 h-5 text-green-600 dark:text-green-400" />
              UDP Scan
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              Sends UDP packets to ports, interprets ICMP unreachable messages. Discovers UDP services (DNS, SNMP, DHCP). Slow and unreliable due to ICMP rate limiting.
              Nmap flag: <code className="bg-slate-200 dark:bg-slate-900 px-2 py-0.5 rounded">-sU</code>
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 font-mono text-sm border border-slate-200 dark:border-slate-700">
              <code className="text-green-600 dark:text-green-400">
                nmap -sU -p 53,161,162 target.com
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Enumeration Protocols */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Enumeration Protocols</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800/50 border border-red-200 dark:border-red-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Database className="w-6 h-6 text-red-600 dark:text-red-400" />
              SMB/NetBIOS (TCP 139, 445)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Extracts shared folders, user accounts, group memberships, password policies, and domain information from Windows systems.
              Vulnerabilities: SMBv1 (EternalBlue CVE-2017-0144), null sessions allowing unauthenticated enumeration.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold mb-1 text-emerald-600 dark:text-emerald-400">Data Extracted:</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Shares, users, groups, password policies, domain controllers</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold mb-1 text-emerald-600 dark:text-emerald-400">Tools:</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">enum4linux, SMBclient, rpcclient, CrackMapExec</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold mb-1 text-emerald-600 dark:text-emerald-400">Attack Impact:</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">NotPetya: $10B damage via SMB enumeration</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Network className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              SNMP (UDP 161)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Extracts network device configurations, routing tables, ARP caches, running processes, and installed software from routers, switches, and network devices.
              Default community strings "public" (read) and "private" (write) often unchanged. SNMPv1/v2c lack encryption.
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 border border-slate-200 dark:border-slate-700">
              <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Attack Example:</p>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Marriott 2014-2018: Chinese APT performed slow SNMP enumeration over 4 years to map network topology and locate database servers containing
                500 million guest records. Evaded detection by using low scan rates below IDS thresholds.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-purple-200 dark:border-purple-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              LDAP (TCP 389, 636 SSL)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Enumerates Active Directory structure, user attributes (email, phone, department), group memberships, and organizational units.
              Anonymous bind exploitation allows unauthenticated queries against misconfigured AD servers.
            </p>
          </div>
        </div>
      </section>

      {/* Real-World Breaches */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          Real-World Breach: Equifax (2017)
        </h2>
        <div className="bg-red-500/20 border-l-4 border-red-500 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Unlock className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                147.9 Million Consumers Compromised via Vulnerability Scanning
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Attackers used automated scanning tools to identify vulnerable Apache Struts versions (CVE-2017-5638) across Equifax's public-facing web servers.
                The vulnerability allowed remote code execution, enabling attackers to pivot internally and exfiltrate 147.9 million records including names, SSNs,
                birth dates, addresses, driver's licenses, and 209,000 credit card numbers over 76 days.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                <li>Attack Vector: Automated vulnerability scanning → CVE-2017-5638 exploitation → lateral movement → data exfiltration</li>
                <li>Financial Cost: $1.4 billion ($575M settlement + $850M remediation costs)</li>
                <li>Outcome: CIO and CISO resigned, FTC enforcement action, ongoing credit monitoring for 147.9M people</li>
                <li>Scanning Technique: Masscan-style fast scanning to identify Struts versions, then targeted exploitation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          Real-World Breach: Colonial Pipeline (2021)
        </h2>
        <div className="bg-red-500/20 border-l-4 border-red-500 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Network className="w-8 h-8 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                5,500-Mile Pipeline Shutdown via Network Enumeration
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                DarkSide ransomware operators gained initial access via exposed VPN credentials (found in dark web data dumps), then performed rapid internal
                network enumeration of Active Directory, SMB shares, and domain controllers to identify critical assets. Attackers used CrackMapExec and
                BloodHound to map the entire network and deploy ransomware to operational technology (OT) systems controlling the pipeline.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                <li>Financial Cost: $4.4M ransom paid (recovered $2.3M) + $2.3B economic impact + $3.5M CISA emergency response</li>
                <li>Outcome: 6-day pipeline shutdown, fuel shortages across US East Coast, Executive Order on pipeline security</li>
                <li>Enumeration Tools: CrackMapExec (SMB enumeration), BloodHound (AD mapping), PowerView (network reconnaissance)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* IDS Evasion */}
      <section>
        <h2 className="text-2xl font-bold mb-4">IDS/IPS Evasion Techniques</h2>
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded p-4">
              <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Packet Fragmentation</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Split packets into tiny fragments to bypass signature detection</p>
              <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">nmap -f -sS target.com</code>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded p-4">
              <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Timing Manipulation</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Slow scan rates (T0-T1) to avoid threshold-based detection</p>
              <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">nmap -T0 --scan-delay 15s</code>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded p-4">
              <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Decoy Scanning</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Generate traffic from multiple spoofed IPs</p>
              <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">nmap -D RND:10,ME</code>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded p-4">
              <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Source Port Manipulation</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Use trusted ports (53 DNS, 80 HTTP)</p>
              <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">nmap --source-port 53</code>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
        <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-lg p-6">
          <ul className="space-y-3">
            {[
              "Network scanning is foundation of 85% of successful attacks - reconnaissance phase in 29% of breaches (Verizon DBIR 2024)",
              "TCP SYN scan (half-open) balances stealth and speed - most commonly used by attackers and penetration testers",
              "SMB enumeration exposes Active Directory users, shares, password policies via null sessions (enum4linux, rpcclient)",
              "SNMP community strings ('public'/'private') reveal device configs, routing tables, network topology on routers/switches",
              "IDS/IPS evasion requires multi-layered techniques: fragmentation (-f) + slow timing (-T0) + decoys (-D)",
              "MITRE ATT&CK T1046 (Network Service Discovery) used by 90% of APT groups (APT29, FIN6, Lazarus) for initial reconnaissance",
              "Shodan Effect: 3+ million ICS/SCADA devices exposed via internet-wide scanning - critical infrastructure at risk",
              "Defense: ASM (Attack Surface Management) + IDS/IPS (Snort/Suricata) + honeypots + network segmentation + SIEM correlation"
            ].map((takeaway, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">{i + 1}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">{takeaway}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );

  const LabTab = () => (
    <div className="space-y-8">
      {/* Warning Banner */}
      <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
        <p className="text-sm font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          ETHICAL USE ONLY: Network scanning must only be performed on systems you own or have explicit written permission to test. Unauthorized scanning is illegal and violates the Computer Fraud and Abuse Act (CFAA).
        </p>
      </div>

      {/* Lab 1 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Lab 1: Nmap Scanning Techniques</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Master TCP scan types, service version detection, OS fingerprinting, and NSE vulnerability scripts using Nmap.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">SYN Scan (Half-Open) - Most Common</h3>
            <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-200 dark:border-slate-700">
              <pre className="text-slate-800 dark:text-slate-300">
                <code>{`# Basic SYN scan (requires root/sudo)
sudo nmap -sS scanme.nmap.org

# Scan all 65535 ports with fast timing
sudo nmap -sS -p- -T4 scanme.nmap.org

# Service version detection + OS fingerprinting
sudo nmap -sS -sV -O scanme.nmap.org

# NSE vulnerability scripts
sudo nmap -sS --script=vuln -p80,443 scanme.nmap.org`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Stealth & Evasion Techniques</h3>
            <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-200 dark:border-slate-700">
              <pre className="text-slate-800 dark:text-slate-300">
                <code>{`# Fragmented packets (bypass some firewalls)
sudo nmap -sS -f scanme.nmap.org

# Slow timing (evade IDS threshold detection)
sudo nmap -sS -T0 --scan-delay 15s scanme.nmap.org

# Decoy scanning (obfuscate source IP)
sudo nmap -sS -D RND:10,ME scanme.nmap.org

# Source port spoofing (use trusted port 53)
sudo nmap -sS --source-port 53 scanme.nmap.org`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Lab 2 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Lab 2: SMB Enumeration</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Enumerate Windows shares, users, groups, and password policies using enum4linux, rpcclient, and smbclient.
        </p>
        <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-200 dark:border-slate-700 mb-4">
          <pre className="text-slate-800 dark:text-slate-300">
            <code>{`# SMB version detection
nmap -p445 --script smb-protocols <target>

# List SMB shares (null session)
smbclient -L //<target> -N

# Full enumeration with enum4linux
enum4linux -a <target>

# Extract specific information
enum4linux -U <target>  # Users
enum4linux -S <target>  # Shares
enum4linux -P <target>  # Password policy
enum4linux -G <target>  # Groups

# RPC user enumeration
rpcclient -U "" -N <target>
  enumdomusers
  enumdomgroups
  querydominfo
  exit

# Check for EternalBlue (MS17-010)
nmap -p445 --script smb-vuln-ms17-010 <target>`}</code>
          </pre>
        </div>
      </section>

      {/* Lab 3 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Lab 3: SNMP Enumeration</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Extract device configurations, routing tables, and network topology using SNMP enumeration.
        </p>
        <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-200 dark:border-slate-700 mb-4">
          <pre className="text-slate-800 dark:text-slate-300">
            <code>{`# SNMP walk (extract all MIB data)
snmpwalk -v 2c -c public <target>

# System information
snmpwalk -v 2c -c public <target> 1.3.6.1.2.1.1

# Network interfaces
snmpwalk -v 2c -c public <target> 1.3.6.1.2.1.2.2.1.2

# Routing table
snmpwalk -v 2c -c public <target> 1.3.6.1.2.1.4.21

# ARP cache
snmpwalk -v 2c -c public <target> 1.3.6.1.2.1.4.22

# Community string brute-force
onesixtyone -c /usr/share/seclists/Discovery/SNMP/common-snmp-community-strings.txt <target>`}</code>
          </pre>
        </div>
      </section>

      {/* Lab 4 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Lab 4: IDS Evasion Testing</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Test IDS/IPS detection rates using various evasion techniques. Compare detection rates for normal vs evasive scans.
        </p>
        <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-200 dark:border-slate-700 mb-4">
          <pre className="text-slate-800 dark:text-slate-300">
            <code>{`# Baseline: Normal scan (will be detected)
sudo nmap -sS -T4 -p80,443 <target>

# Evasion 1: Fragmented scan
sudo nmap -sS -f -p80,443 <target>

# Evasion 2: Slow timing (T0 - Paranoid)
sudo nmap -sS -T0 --scan-delay 15s -p80 <target>

# Evasion 3: Decoy scan
sudo nmap -sS -D 192.168.1.50,192.168.1.51,ME -p80,443 <target>

# Evasion 4: Random order + slow
sudo nmap -sS -r -T1 --randomize-hosts -p80,443 <target>

# Custom packet crafting with Scapy (Python)
# from scapy.all import *
# ip = IP(dst="target", ttl=128)
# tcp = TCP(sport=RandShort(), dport=80, flags='S')
# sr1(ip/tcp, timeout=1)`}</code>
          </pre>
        </div>
      </section>

      {/* Jupyter Notebook Link */}
      <section>
        <div className="bg-cyan-500/20 border border-cyan-500/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Terminal className="w-6 h-6" />
            Practice Laboratory
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Ready to practice network scanning and enumeration in a safe, controlled environment? Our interactive Jupyter notebook includes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mb-4">
            <li>Python-based Nmap integration for automated scanning</li>
            <li>SMB enumeration with error handling and parsing</li>
            <li>SNMP MIB walking and data extraction</li>
            <li>Vulnerability scanning with OpenVAS/Nessus APIs</li>
            <li>IDS evasion technique demonstrations with detection rate analysis</li>
          </ul>
          <a
            href="/notebooks/15-network-scanning.ipynb"
            className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg font-semibold transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Interactive Jupyter Notebook
          </a>
        </div>
      </section>
    </div>
  );

  const ToolsTab = () => (
    <div className="space-y-8">
      {/* Scanning Tools */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Scanning Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: 'Nmap (Network Mapper)',
              desc: 'Industry-standard open-source scanner with 600+ NSE scripts. Supports all scan types (SYN, ACK, FIN, UDP), service/version detection (99% accuracy), OS fingerprinting (5,000+ signatures).',
              features: ['All TCP/UDP scan types', 'Service version detection', 'OS fingerprinting', 'NSE vulnerability scripts', 'XML/grepable output'],
              icon: Network
            },
            {
              name: 'Masscan',
              desc: 'Ultra-fast TCP scanner (10M packets/sec). Scans entire IPv4 space for web servers in minutes. Asynchronous stateless design. 200× faster than Nmap for simple port detection.',
              features: ['10M packets/second', 'IPv4 space in ~6 minutes', 'Banner grabbing', 'Asynchronous transmission', 'Bug bounty reconnaissance'],
              icon: Radar
            },
            {
              name: 'Nessus',
              desc: 'Commercial vulnerability scanner by Tenable. 175,000+ vulnerability checks, compliance auditing (PCI DSS, HIPAA, CIS), authenticated and unauthenticated scanning, credentialed patch audits.',
              features: ['175K+ vulnerability checks', 'Compliance auditing', 'Authenticated scanning', 'Web app scanning', 'Professional/Enterprise editions'],
              icon: Shield
            },
            {
              name: 'Shodan',
              desc: 'Internet-connected device search engine. Searches banners from 500M+ devices. ICS detection, vulnerability search (CVE queries), historical data, monitoring alerts. Demonstrates "Shodan Effect."',
              features: ['500M+ device database', 'ICS/SCADA detection', 'CVE vulnerability search', 'Historical scanning data', 'Attack surface management'],
              icon: Search
            }
          ].map((tool, i) => (
            <div key={i} className="bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/50 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <tool.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{tool.desc}</p>
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">Key Features:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                      {tool.features.map((feature, j) => (
                        <li key={j}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enumeration Tools */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Enumeration Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'enum4linux', desc: 'Perl script for Windows/Samba enumeration. User enumeration via RID cycling, share enumeration with permissions, password policy extraction, group listing.', use: 'Windows penetration testing, AD reconnaissance' },
            { name: 'SNMPwalk', desc: 'Query SNMP-enabled devices for management information. Walk entire MIB tree, extract device configs, network topology mapping, credential brute-forcing.', use: 'Network device auditing, router/switch enumeration' },
            { name: 'rpcclient', desc: 'Samba RPC client for Windows enumeration. User/group enumeration (enumdomusers), share enumeration (netshareenum), SID-to-name resolution, null session exploitation.', use: 'Null session exploitation, AD mapping' },
            { name: 'Nikto', desc: 'Web server scanner for vulnerabilities. 6,700+ vulnerability checks, server version detection, CGI scanning, SSL/TLS testing, subdirectory enumeration.', use: 'Web server auditing, compliance checks' }
          ].map((tool, i) => (
            <div key={i} className="bg-white dark:bg-slate-800/50 border border-cyan-200 dark:border-cyan-500/50 rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{tool.desc}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">Use Case: {tool.use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Defense Tools */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
          Defense Tools
        </h2>
        <div className="space-y-4">
          {[
            { name: 'Snort', desc: 'Open-source IDS/IPS with real-time traffic analysis. 300,000+ rules, signature-based detection, protocol analysis, logging/alerting. Inline (IPS) or passive (IDS) deployment.', type: 'IDS/IPS' },
            { name: 'Suricata', desc: 'Modern multi-threaded IDS/IPS/NSM engine. Hardware acceleration, protocol identification, file extraction (MD5), Lua scripting. 10Gbps+ performance with proper hardware.', type: 'IDS/IPS' },
            { name: 'Zeek (formerly Bro)', desc: 'Network security monitoring framework. 50+ protocol analysis, connection logging, metadata extraction, scripting language for custom analysis. Focuses on metadata vs signatures.', type: 'NSM' },
            { name: 'PortSentry', desc: 'Port scan detection and response tool. Detects stealth scans (SYN, FIN, NULL), automatic firewall rule creation, blocks attacking IPs in real-time. TCP/UDP/stealth mode.', type: 'Port Scan Detection' },
            { name: 'Fail2Ban', desc: 'Intrusion prevention for log monitoring. Parses logs for failed auth attempts, auto-bans IPs via iptables/firewalld, email alerting. Reduces SSH brute-force by 99%+.', type: 'Log Analysis' }
          ].map((tool, i) => (
            <div key={i} className="bg-white dark:bg-slate-800/50 border border-green-200 dark:border-green-500/50 rounded-lg p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{tool.desc}</p>
                </div>
                <span className="text-xs bg-green-500/20 text-green-700 dark:text-green-300 px-3 py-1 rounded">{tool.type}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const ReferencesTab = () => (
    <div className="space-y-8">
      {/* Official Standards */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Official Standards & Guidelines</h2>
        <div className="space-y-4">
          {[
            { title: 'NIST SP 800-115: Technical Guide to Information Security Testing', desc: 'Authoritative guide on scanning and enumeration techniques, testing methodologies, vulnerability assessment procedures.', url: 'https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-115.pdf' },
            { title: 'MITRE ATT&CK T1046: Network Service Discovery', desc: 'Comprehensive documentation of network scanning techniques used by adversaries. Details real-world usage by 90% of APT groups (APT1, APT29, FIN6).', url: 'https://attack.mitre.org/techniques/T1046/' },
            { title: 'OWASP Testing Guide v4.2 - Enumeration', desc: 'Web application enumeration techniques, subdomain discovery, API testing, network infrastructure analysis.', url: 'https://owasp.org/www-project-web-security-testing-guide/' },
            { title: 'CIS Controls v8 - Control 13: Network Monitoring', desc: 'Best practices for network monitoring and defense against scanning/enumeration attacks. Includes asset discovery, vulnerability management.', url: 'https://www.cisecurity.org/controls/v8' }
          ].map((ref, i) => (
            <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer" className="block bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/50 rounded-lg p-5 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                {ref.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{ref.desc}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">{ref.url}</p>
            </a>
          ))}
        </div>
      </section>

      {/* CVE References */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Critical CVEs Discovered via Scanning</h2>
        <div className="space-y-3">
          {[
            { cve: 'CVE-2017-0144', name: 'EternalBlue (SMB)', cvss: '8.1 High', impact: 'NotPetya worm: $10B damage. WannaCry: 300K systems. Rapid SMB enumeration on port 445 to identify vulnerable Windows.' },
            { cve: 'CVE-2017-5638', name: 'Apache Struts (Equifax)', cvss: '10.0 Critical', impact: 'Equifax breach: 147.9M records, $1.4B cost. Automated scanning identified vulnerable Struts versions across web servers.' },
            { cve: 'CVE-2020-1472', name: 'Zerologon (Netlogon)', cvss: '10.0 Critical', impact: 'Privilege escalation via Netlogon protocol. Exploited via SMB enumeration and authentication bypass.' },
            { cve: 'CVE-2021-34527', name: 'PrintNightmare (Print Spooler)', cvss: '8.8 High', impact: 'Windows Print Spooler RCE. Discovered via RPC enumeration techniques on TCP 135/593.' }
          ].map((cve, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-800/50 border border-red-200 dark:border-red-500/50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold">{cve.cve}: {cve.name}</p>
                <span className="text-xs bg-red-500/20 text-red-700 dark:text-red-300 px-2 py-1 rounded">{cve.cvss}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{cve.impact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Papers */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Academic Papers & Research</h2>
        <div className="space-y-3">
          {[
            { title: 'ZMap: Fast Internet-Wide Scanning and Its Security Applications', authors: 'Durumeric et al. (2013)', venue: 'USENIX Security', desc: 'Internet-wide scanning feasibility, 99% of IPv4 space in 44 minutes. Foundational work on fast network scanning.' },
            { title: 'Remote OS Detection via TCP/IP Stack Fingerprinting', authors: 'Fyodor (1998)', venue: 'Phrack Magazine 54', desc: 'Foundational work on OS fingerprinting methodology using TCP/IP stack characteristics. Created Nmap OS detection.' },
            { title: 'Network Intrusion Detection: Evasion, Traffic Normalization', authors: 'Handley, Paxson, Kreibich (2001)', venue: 'USENIX Security', desc: 'IDS evasion techniques via fragmentation, timing, obfuscation. Demonstrates limitations of signature-based detection.' }
          ].map((paper, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <p className="font-semibold mb-1">{paper.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-500 mb-2">{paper.authors} - {paper.venue}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">{paper.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industry Reports */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Industry Reports</h2>
        <div className="space-y-3">
          {[
            { title: 'Verizon DBIR 2024', stat: '29% of breaches involved scanning/enumeration', desc: '68% involved human element (misconfigurations enabling enumeration). Average breakout time: 84 minutes.' },
            { title: 'Shodan 2023 Exposure Report', stat: '3.2M ICS/SCADA devices exposed', desc: '15M devices with default credentials. 47K MongoDB databases without authentication. Coined "Shodan Effect."' },
            { title: 'CrowdStrike Global Threat 2024', stat: '75% use living off the land', desc: 'Average breakout time: 84 minutes. 75% of attacks use enumeration tools already on victim systems.' }
          ].map((report, i) => (
            <div key={i} className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">{report.stat}</p>
              <p className="text-xs text-slate-700 dark:text-slate-300">{report.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section>
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            Legal and Ethical Disclaimer
          </h3>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              Network scanning and enumeration must only be performed on systems you own or have explicit written authorization to test. Unauthorized
              scanning violates the Computer Fraud and Abuse Act (CFAA) and similar laws globally.
            </p>
            <div className="bg-red-500/20 rounded p-3">
              <p className="font-semibold mb-2 text-red-300">Always Remember:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Only scan authorized targets with written permission</li>
                <li>Unauthorized scanning is a federal crime under 18 U.S.C. § 1030</li>
                <li>Use scanme.nmap.org or your own lab environment for practice</li>
                <li>Penetration testing requires signed contracts defining scope</li>
                <li>Bug bounty programs specify authorized testing scope</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-8">
      {onBack && (
        <button onClick={onBack} className="mb-6 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all flex items-center gap-2 border border-slate-300 dark:border-slate-700">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
            <Radar className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold">Network Scanning & Enumeration</h1>
            <p className="text-emerald-600 dark:text-emerald-400 mt-2">
              Master reconnaissance techniques to discover hosts, services, and vulnerabilities
            </p>
          </div>
          {onStartChallenge && (
            <button onClick={onStartChallenge} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
              <Target className="w-5 h-5" />
              Take Challenge
            </button>
          )}
        </div>

        <div className="border-b border-slate-200 dark:border-slate-700 mb-8">
          <nav className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-all ${activeTab === tab.id ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-b-2 border-emerald-600 dark:border-emerald-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-6">
          {activeTab === 'theory' && <TheoryTab />}
          {activeTab === 'lab' && <LabTab />}
          {activeTab === 'tools' && <ToolsTab />}
          {activeTab === 'references' && <ReferencesTab />}
        </div>
      </div>
    </div>
  );
};
