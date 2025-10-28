# Module #15: Network Scanning & Enumeration

## Real-World Breach Examples

### 1. Equifax Breach (2017)
- **Company:** Equifax
- **Year:** 2017
- **Attack Vector:** Apache Struts vulnerability (CVE-2017-5638) discovered via automated scanning
- **Scanning Technique:** Attackers used automated tools to identify vulnerable Struts versions across public-facing web servers
- **Impact:** 147.9 million consumers affected (names, SSNs, birth dates, addresses, driver's licenses, credit card numbers)
- **Financial Cost:** $1.4 billion in total costs ($575M settlement + $850M remediation)
- **Outcome:** CIO and CISO resigned, FTC enforcement action, ongoing credit monitoring obligations

### 2. SolarWinds Supply Chain Attack (2020)
- **Company:** SolarWinds (affecting 18,000+ organizations)
- **Year:** 2020
- **Attack Vector:** Multi-month reconnaissance including extensive network scanning and enumeration of internal build infrastructure
- **Scanning Technique:** APT29 (Cozy Bear) performed stealthy network mapping using custom tools to identify software build servers, avoided IDS detection with slow scanning techniques
- **Impact:** 18,000+ organizations compromised (including 9 US federal agencies, Fortune 500 companies)
- **Financial Cost:** Estimated $100 billion total economic impact
- **Outcome:** Led to executive order on cybersecurity (EO 14028), CISA emergency directive, massive security overhaul

### 3. Colonial Pipeline Ransomware (2021)
- **Company:** Colonial Pipeline
- **Year:** 2021
- **Attack Vector:** Exposed VPN credentials found in dark web data dumps, followed by internal network scanning
- **Scanning Technique:** DarkSide ransomware operators performed rapid enumeration of Active Directory, SMB shares, and domain controllers to identify critical assets
- **Impact:** 5,500-mile pipeline shutdown for 6 days, fuel shortages across US East Coast
- **Financial Cost:** $4.4 million ransom paid (recovered $2.3M) + $2.3 billion economic impact + $3.5M CISA emergency response
- **Outcome:** Executive order on pipeline security, renewed focus on OT/ICS security

### 4. Target Corporation Breach (2013)
- **Company:** Target Corporation
- **Year:** 2013
- **Attack Vector:** Network enumeration via compromised HVAC vendor (Fazio Mechanical Services)
- **Scanning Technique:** Attackers pivoted from vendor network to POS systems using network scanning to map internal topology and identify data repositories
- **Impact:** 40 million credit/debit card records + 70 million customer records stolen
- **Financial Cost:** $292 million ($18.5M settlement + $273.5M in fraud losses and remediation)
- **Outcome:** CEO and CIO resigned, complete security infrastructure overhaul

### 5. NotPetya Wiper Attack (2017)
- **Company:** Maersk, Merck, FedEx TNT, others (global)
- **Year:** 2017
- **Attack Vector:** EternalBlue exploit (SMB vulnerability) spread via aggressive network scanning
- **Scanning Technique:** Worm used rapid SMB enumeration on port 445 to identify vulnerable Windows systems, combined with WMIC and PsExec for lateral movement
- **Impact:** 300,000+ systems across 65 countries destroyed, supply chain disruption
- **Financial Cost:** $10+ billion total damage (Maersk: $300M, Merck: $870M, FedEx: $400M)
- **Outcome:** Classified as most costly cyberattack in history, attributed to Russian military

### 6. Marriott International Breach (2014-2018)
- **Company:** Marriott International (Starwood Hotels acquisition)
- **Year:** 2014-2018 (discovered 2018)
- **Attack Vector:** Chinese APT group performed multi-year reconnaissance including SNMP enumeration and network mapping
- **Scanning Technique:** Slow SNMP enumeration to discover network topology, database locations, and sensitive data repositories while evading detection for 4 years
- **Impact:** 500 million guest records (383M unique guests) including passport numbers, payment cards
- **Financial Cost:** $124 million (£18.4M GDPR fine + $52M settlement + remediation)
- **Outcome:** Largest hotel breach in history, attributed to Chinese MSS intelligence operation

### 7. OPM (Office of Personnel Management) Breach (2014-2015)
- **Company:** US Office of Personnel Management
- **Year:** 2014-2015
- **Attack Vector:** Patient network topology mapping over 9+ months using custom scanning tools
- **Scanning Technique:** Chinese APT group used custom network scanners and enumeration tools to map OPM network architecture, identify database servers, and exfiltrate SF-86 security clearance forms
- **Impact:** 21.5 million security clearance background investigations stolen (including fingerprints, SF-86 forms with sensitive personal data)
- **Financial Cost:** $133 million initial response + estimated $500M+ in long-term security clearance program changes
- **Outcome:** OPM Director resigned, complete background investigation system overhaul

### 8. Shodan-Discovered ICS Vulnerabilities (Ongoing)
- **Platform:** Shodan.io search engine
- **Year:** 2013-present (continuous exposure)
- **Attack Vector:** Public internet scanning revealing misconfigured industrial control systems, SCADA, medical devices
- **Scanning Technique:** Automated banner grabbing on all IPv4 addresses identifying 3+ million ICS/SCADA devices with default credentials or no authentication
- **Impact:** Thousands of critical infrastructure targets exposed (water treatment, power grids, traffic systems, hospital equipment)
- **Financial Cost:** Variable (individual incidents: $1M-$50M each)
- **Outcome:** Coined "Shodan Effect" - demonstrated massive attack surface exposure, led to ICS-CERT advisories

---

## Technical Concepts

### TCP/UDP Scanning Techniques

**SYN Scan (Half-Open Scan)**
- Mechanism: Sends SYN packet, analyzes SYN-ACK response, never completes handshake
- Advantages: Stealthy (doesn't complete connection), fast, accurate
- Detection: Most IDS detect SYN scans
- Nmap flag: `-sS`

**TCP Connect Scan**
- Mechanism: Completes full three-way handshake
- Advantages: Works without root privileges, bypasses some stateful firewalls
- Detection: Fully logged in application logs
- Nmap flag: `-sT`

**ACK Scan (Firewall Detection)**
- Mechanism: Sends ACK packets to determine firewall rule sets
- Advantages: Maps firewall rules, distinguishes filtered from unfiltered ports
- Nmap flag: `-sA`

**FIN/NULL/XMAS Scans (Stealth Scans)**
- Mechanism: Sends packets with unusual flag combinations
- FIN: FIN flag set
- NULL: No flags set
- XMAS: FIN, PSH, URG flags set
- Advantages: Bypasses some non-stateful firewalls
- Nmap flags: `-sF`, `-sN`, `-sX`

**UDP Scan**
- Mechanism: Sends UDP packets to ports, interprets ICMP unreachable messages
- Advantages: Discovers UDP services (DNS, SNMP, DHCP)
- Disadvantages: Slow, unreliable (ICMP rate limiting)
- Nmap flag: `-sU`

**Idle Scan (Zombie Scan)**
- Mechanism: Uses third-party "zombie" host to scan target without revealing attacker IP
- Advantages: Complete anonymity
- Nmap flag: `-sI <zombie_host>`

### OS Fingerprinting

**TCP/IP Stack Fingerprinting:**
- Initial Window Size variations
- TTL values (Linux: 64, Windows: 128, Cisco: 255)
- TCP options (MSS, Window scaling, SACK)
- IP ID sequencing patterns
- ICMP response characteristics

**Application Layer Fingerprinting:**
- HTTP server headers (Apache, nginx, IIS)
- SSH version strings
- SMB protocol dialects
- SNMP system descriptions

### Enumeration Protocols

**SMB/NetBIOS (TCP 139, 445)**
- Data Extracted: Shared folders, user accounts, group memberships, password policies, domain information
- Tools: enum4linux, SMBclient, rpcclient, CrackMapExec
- Vulnerabilities: SMBv1 (EternalBlue CVE-2017-0144), null sessions

**LDAP (TCP 389, 636 SSL)**
- Data Extracted: Active Directory structure, user attributes, group memberships, organizational units
- Tools: ldapsearch, ADExplorer, BloodHound
- Attacks: LDAP injection, anonymous bind exploitation

**SNMP (UDP 161)**
- Data Extracted: Network device configurations, routing tables, ARP caches, running processes, installed software
- Community Strings: Default "public" (read) and "private" (write)
- Tools: SNMPwalk, Onesixtyone, snmp-check
- Vulnerabilities: SNMPv1/v2c lack encryption

**DNS Zone Transfer (TCP 53)**
- Mechanism: AXFR request to transfer entire zone file
- Data Extracted: All subdomains, IP addresses, internal hostnames
- Tools: dig, nslookup, fierce, dnsrecon
- Modern Defense: 99% of public DNS servers now deny AXFR

**RPC (TCP 135, 593)**
- Data Extracted: RPC services and endpoints, DCOM and COM+ objects, Windows service configurations
- Tools: rpcdump, rpcinfo, Impacket suite

**NFS (TCP/UDP 2049)**
- Data Extracted: Exported file systems, access permissions, mounted shares on Unix/Linux
- Tools: showmount, nfsshell, nmap NSE scripts

### IDS/IPS Evasion Techniques

**Packet Fragmentation**
- Mechanism: Split scan packets into tiny fragments to bypass signature detection
- Nmap flag: `-f`

**Timing Manipulation**
- Mechanism: Slow scan rates to avoid threshold-based detection
- Nmap flags: `-T0` to `-T5`

**Decoy Scanning**
- Mechanism: Generate scan traffic from multiple spoofed IP addresses
- Nmap flag: `-D <decoy1>,<decoy2>,ME`

**Source Port Manipulation**
- Mechanism: Use trusted ports (53 DNS, 80 HTTP) as source ports
- Nmap flag: `--source-port <port>`

### MITRE ATT&CK Techniques

- **T1046:** Network Service Discovery
- **T1018:** Remote System Discovery
- **T1082:** System Information Discovery
- **T1049:** System Network Connections Discovery
- **T1016:** System Network Configuration Discovery
- **T1135:** Network Share Discovery
- **T1087:** Account Discovery
- **T1069:** Permission Groups Discovery

---

## Tools Research

### Scanning Tools

**1. Nmap (Network Mapper)**
- Industry-standard open-source network scanner with 600+ NSE scripts
- All scan types (SYN, ACK, FIN, UDP, Xmas, Idle)
- Service/version detection with 99% accuracy
- OS fingerprinting database with 5,000+ signatures
- NSE scripting for vulnerability detection

**2. Masscan**
- Ultra-fast TCP port scanner (10 million packets/second)
- Scans entire IPv4 space for web servers at 10K pps
- 200x faster than Nmap for simple port detection
- Asynchronous transmission (stateless)

**3. Unicornscan**
- Advanced asynchronous network scanner
- Active and passive OS fingerprinting
- Distributed scanning across multiple hosts
- Correlation engine for passive traffic analysis

**4. Zmap**
- Fast single-packet network scanner
- Scans entire IPv4 space in under 45 minutes (10Gbps)
- Stateless design for performance
- Used by academic research (University of Michigan)

**5. Angry IP Scanner**
- Cross-platform GUI scanner
- Fast multithreaded scanning
- NetBIOS, hostname, MAC address detection
- Plugin architecture

**6. Advanced IP Scanner**
- Windows-based fast network scanner
- Shared folder access from GUI
- Remote shutdown/wake-on-LAN
- No installation required (portable)

**7. Nessus**
- Commercial vulnerability scanner by Tenable
- 175,000+ vulnerability checks
- Compliance auditing (PCI DSS, HIPAA, CIS)
- Authenticated and unauthenticated scanning

**8. OpenVAS**
- Open-source vulnerability scanner
- 50,000+ Network Vulnerability Tests (NVTs)
- Fully automated vulnerability detection
- Cost-effective alternative to Nessus

**9. Shodan**
- Internet-connected device search engine
- Searches banners from 500+ million devices
- Industrial Control System (ICS) detection
- Vulnerability search (CVE queries)

**10. Censys**
- Academic research platform for internet-wide scanning
- Daily ZMap scans of entire IPv4 space
- Certificate transparency monitoring
- Attack surface management

**11. Netcat**
- Simple utility for reading/writing network connections
- Banner grabbing, port scanning, file transfers
- Bind/reverse shells

### Enumeration Tools

**1. enum4linux**
- Perl script for enumerating Windows and Samba systems
- User enumeration via RID cycling
- Share enumeration (permissions)
- Password policy extraction

**2. SNMPwalk**
- Query SNMP-enabled devices for management information
- Walk entire MIB tree
- Extract device configurations
- Network topology mapping

**3. ldapsearch**
- Command-line tool for LDAP directory queries
- Active Directory enumeration
- User attribute extraction
- Anonymous bind exploitation

**4. rpcclient**
- Samba RPC client for Windows enumeration
- User enumeration (enumdomusers)
- Share enumeration (netshareenum)
- SID-to-name resolution

**5. smbclient**
- FTP-like client for accessing SMB shares
- List shares (no authentication required with misconfigurations)
- Download/upload files
- Null session testing

**6. nbtscan**
- NetBIOS name scanner for Windows networks
- Rapid NetBIOS name resolution
- MAC address extraction
- Workgroup/domain identification

**7. DNSenum**
- Perl script for DNS enumeration
- Zone transfer attempts (AXFR)
- Subdomain brute-forcing
- Reverse lookup on IP ranges

**8. Nikto**
- Web server scanner for vulnerabilities
- 6,700+ vulnerability checks
- Server version detection
- SSL/TLS testing

### Defense Tools

**1. Snort**
- Open-source IDS/IPS
- Real-time traffic analysis
- Signature-based detection (300,000+ rules)
- Protocol analysis and anomaly detection

**2. Suricata**
- Modern multi-threaded IDS/IPS/NSM engine
- Hardware acceleration support
- Protocol identification and parsing
- File extraction and MD5 checksums

**3. Zeek (formerly Bro)**
- Network security monitoring framework
- Protocol analysis (50+ protocols)
- Connection logging and metadata extraction
- Scripting language for custom analysis

**4. PortSentry**
- Port scan detection and response tool
- Detects stealth scans (SYN, FIN, NULL)
- Automatic firewall rule creation
- Blocks attacking IPs in real-time

**5. OSSEC**
- Open-source Host Intrusion Detection System (HIDS)
- Log analysis (file integrity, rootkit detection)
- Active response (automatic blocking)
- Compliance monitoring (PCI DSS)

**6. Fail2Ban**
- Intrusion prevention framework for log monitoring
- Parses logs for failed authentication attempts
- Automatically bans IPs via iptables/firewalld
- Email alerting

---

## Academic & Official References

### Official Standards
1. NIST SP 800-115: Technical Guide to Information Security Testing
2. PTES: Penetration Testing Execution Standard - Intelligence Gathering
3. OWASP Testing Guide v4.2 - Enumeration
4. NIST SP 800-53 Rev. 5: Security and Privacy Controls
5. CIS Controls v8 - Control 13: Network Monitoring and Defense

### MITRE Frameworks
6. MITRE ATT&CK - Discovery (TA0007)
7. MITRE ATT&CK - T1046: Network Service Discovery
8. MITRE D3FEND - Network Mapping Countermeasures

### CVE Databases
9. CVE-2017-0144 (EternalBlue - SMB Exploit)
10. CVE-2017-5638 (Apache Struts - Equifax Breach)
11. CVE-2020-1472 (Zerologon - Netlogon Elevation)
12. CVE-2021-34527 (PrintNightmare - Windows Print Spooler RCE)

### RFC Documents
13. RFC 1035 - Domain Names Implementation
14. RFC 1157 - Simple Network Management Protocol (SNMP)
15. RFC 4511 - Lightweight Directory Access Protocol (LDAP)
16. RFC 1001/1002 - NetBIOS Protocol

### Academic Papers
17. "ZMap: Fast Internet-Wide Scanning" (USENIX Security 2013)
18. "A Search Engine Backed by Internet-Wide Scanning" (CCS 2015)
19. "Scanning the Internet for Liveness" (SIGCOMM 2007)
20. "Network Intrusion Detection: Evasion and Traffic Normalization" (USENIX 2001)
21. "Remote OS Detection via TCP/IP Stack Fingerprinting" (Phrack 54, 1998)
22. "Idle Scan: A Stealthy Port Scanning Technique" (Phrack 57, 2001)
23. "Attacks Against Intrusion Detection Systems" (RAID 1999)
24. "A Survey of Network Scanning Techniques" (University of Calgary, 2005)

### Industry Reports
25. Verizon DBIR 2024: 29% of breaches involved scanning/enumeration
26. CrowdStrike Global Threat Report 2024: 84-minute breakout time
27. SANS 2023 Threat Landscape Survey
28. Shodan 2023 Exposure Report: 3.2M ICS/SCADA devices exposed
29. Equifax Breach Report - House Committee (2018)
30. Colonial Pipeline Ransomware Attack - GAO Report (2021)

---

## Lab Concepts

### Lab 1: Nmap Scanning Techniques
**Skills:** TCP scan types, service version detection, OS fingerprinting, NSE scripts

**Code Example:**
```python
import subprocess

def nmap_syn_scan(target):
    result = subprocess.run(
        ['nmap', '-sS', '-p-', '-T4', target],
        capture_output=True, text=True
    )
    return result.stdout

def nmap_service_detection(target):
    result = subprocess.run(
        ['nmap', '-sV', '-O', '--version-intensity', '9', target],
        capture_output=True, text=True
    )
    return result.stdout
```

### Lab 2: SMB Enumeration
**Skills:** Share enumeration, user extraction, password policies, null sessions

**Code Example:**
```bash
# SMB Version Detection
nmap -p445 --script smb-protocols $TARGET

# List SMB Shares (Null Session)
smbclient -L //$TARGET -N

# Enumerate Users
enum4linux -U $TARGET

# Extract Password Policy
enum4linux -P $TARGET

# RPC User Enumeration
rpcclient -U "" -N $TARGET -c enumdomusers
```

### Lab 3: SNMP Enumeration
**Skills:** Community string brute-forcing, MIB tree walking, network topology extraction

**Code Example:**
```python
from pysnmp.hlapi import *

def snmp_walk(target, community='public', oid='1.3.6.1.2.1'):
    results = []
    for (errorIndication, errorStatus, errorIndex, varBinds) in nextCmd(
        SnmpEngine(),
        CommunityData(community),
        UdpTransportTarget((target, 161)),
        ContextData(),
        ObjectType(ObjectIdentity(oid)),
        lexicographicMode=False
    ):
        if not errorIndication and not errorStatus:
            for varBind in varBinds:
                results.append(f"{varBind[0]} = {varBind[1]}")
    return results
```

### Lab 4: Vulnerability Scanning
**Skills:** OpenVAS/Nessus setup, authenticated scans, report analysis, CVSS prioritization

### Lab 5: IDS Evasion Techniques
**Skills:** Fragmentation, timing manipulation, decoy scanning, Scapy custom packets

**Code Example:**
```bash
# Fragmented Scan
nmap -sS -f -p80,443 $TARGET

# Slow Timing (T0 - Paranoid)
nmap -sS -T0 -p80 $TARGET

# Decoy Scan
nmap -sS -D 192.168.1.50,192.168.1.51,ME -p80,443 $TARGET

# Source Port Spoofing
nmap -sS --source-port 53 -p80,443 $TARGET
```

---

## Key Statistics

- 29% of breaches involved scanning/enumeration in reconnaissance phase (Verizon DBIR 2024)
- 68% involved human element (misconfigurations enabling enumeration)
- Average breakout time: 84 minutes (CrowdStrike 2024)
- 62% of organizations experienced network scanning attacks (SANS 2023)
- 3.2 million ICS/SCADA devices publicly exposed (Shodan 2023)
- IDS/IPS detected only 45% of reconnaissance activities
- 90% of APT groups use T1046 (Network Service Discovery)
