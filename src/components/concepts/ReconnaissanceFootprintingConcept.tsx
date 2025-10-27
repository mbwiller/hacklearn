import { useState } from 'react';
import { ArrowLeft, BookOpen, Code, Wrench, ExternalLink, AlertTriangle } from 'lucide-react';

interface ReconnaissanceFootprintingConceptProps {
  onBack?: () => void;
  onStartChallenge?: () => void;
}

export const ReconnaissanceFootprintingConcept = ({ onBack, onStartChallenge }: ReconnaissanceFootprintingConceptProps = {}) => {
  const [activeTab, setActiveTab] = useState('theory');

  const TheoryTab = () => (
    <div className="space-y-8">
      {/* Introduction */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Reconnaissance & Footprinting
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Reconnaissance (recon) and footprinting constitute the first and most critical phase of any penetration test or cyber attack. This phase involves gathering detailed information about the target organization, its network infrastructure, employees, technologies, and potential vulnerabilities—all before launching any direct attacks. The goal is to map the attack surface comprehensively while remaining undetected.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Reconnaissance is divided into two main categories: <strong className="text-emerald-400">passive reconnaissance</strong> (gathering information without directly interacting with the target) and <strong className="text-emerald-400">active reconnaissance</strong> (directly probing the target's systems). Effective reconnaissance can reveal hidden assets, misconfigurations, exposed credentials, and third-party relationships that attackers exploit to gain initial access.
        </p>
      </section>

      {/* Passive vs Active Reconnaissance */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Passive vs Active Reconnaissance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Passive Reconnaissance */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">Passive Reconnaissance</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Information gathering without directly interacting with the target. Passive recon is stealthy and leaves no traces in target logs.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span><strong>OSINT</strong>: Search engines, social media, public databases</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span><strong>WHOIS lookups</strong>: Domain registration details</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span><strong>DNS enumeration</strong>: DNS records, subdomains (passive DNS)</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span><strong>Web scraping</strong>: Job postings, technical blogs, GitHub repos</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span><strong>Certificate transparency</strong>: SSL/TLS certificates for subdomains</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span><strong>Shodan/Censys</strong>: Internet-wide scanning data</span>
              </li>
            </ul>
          </div>

          {/* Active Reconnaissance */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">Active Reconnaissance</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Direct interaction with target systems to gather information. Active recon is detectable and may trigger security alerts.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span><strong>Port scanning</strong>: Nmap, Masscan for open ports and services</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span><strong>Network mapping</strong>: Traceroute, network topology discovery</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span><strong>Banner grabbing</strong>: Service version identification</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span><strong>DNS zone transfers</strong>: AXFR requests for full zone data</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span><strong>Web application probing</strong>: Directory enumeration, robots.txt</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span><strong>Social engineering</strong>: Direct communication with employees</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Reconnaissance Phases */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Reconnaissance Phases (PTES Framework)
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The Penetration Testing Execution Standard (PTES) defines a systematic approach to reconnaissance:
        </p>

        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-5">
            <h4 className="text-lg font-semibold text-emerald-400 mb-2">1. Footprinting (Initial Discovery)</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Collect basic information about the target: domain names, IP ranges, organizational structure, physical locations, employee names/emails. Sources include WHOIS databases, DNS records, corporate websites, job postings, and social media profiles.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-5">
            <h4 className="text-lg font-semibold text-emerald-400 mb-2">2. Network Enumeration</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Map the target's network topology, identify live hosts, discover network services, and enumerate accessible systems. Tools include Nmap for port scanning, traceroute for path discovery, and DNS enumeration for subdomain identification.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-5">
            <h4 className="text-lg font-semibold text-emerald-400 mb-2">3. Service Identification</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Determine what services are running on discovered hosts, identify software versions, detect operating systems, and find potential vulnerabilities. Banner grabbing and service fingerprinting reveal version-specific exploits.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-5">
            <h4 className="text-lg font-semibold text-emerald-400 mb-2">4. Information Consolidation</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Organize collected data into a comprehensive attack surface map. Identify high-value targets, potential entry points, security gaps, and relationships between systems. Prioritize targets based on criticality and exploitability.
            </p>
          </div>
        </div>
      </section>

      {/* Real-World Examples */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Real-World Reconnaissance Breaches
        </h3>

        <div className="space-y-6">
          {/* Target Corporation (2013) */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">Target Corporation (2013)</h4>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Reconnaissance Method:</strong> Attackers researched Target's third-party vendors through OSINT, identifying Fazio Mechanical Services (HVAC contractor) as a weak link.</p>
              <p><strong className="text-emerald-400">Attack Vector:</strong> Phishing attack against Fazio employees followed by lateral movement into Target's network through vendor VPN access.</p>
              <p><strong className="text-emerald-400">Impact:</strong> 40 million credit/debit cards stolen, 70 million customer records compromised.</p>
              <p><strong className="text-emerald-400">Financial Cost:</strong> $292 million (settlements, legal fees, remediation).</p>
              <p><strong className="text-emerald-400">Key Lesson:</strong> Third-party reconnaissance reveals supply chain vulnerabilities that bypass direct security controls.</p>
            </div>
          </div>

          {/* SolarWinds Supply Chain Attack (2020) */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">SolarWinds Supply Chain Attack (2020)</h4>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Reconnaissance Method:</strong> APT29 (Cozy Bear) conducted extensive passive reconnaissance of SolarWinds' software development infrastructure, identifying the Orion platform as a high-value target used by 18,000+ customers including Fortune 500 companies and government agencies.</p>
              <p><strong className="text-emerald-400">Attack Vector:</strong> Compromised SolarWinds build system to inject SUNBURST backdoor into legitimate software updates.</p>
              <p><strong className="text-emerald-400">Impact:</strong> 18,000+ organizations installed trojanized updates; 100+ high-profile victims including Microsoft, FireEye, US Treasury, Department of Homeland Security.</p>
              <p><strong className="text-emerald-400">Financial Cost:</strong> Estimated $100 million+ in remediation costs across affected organizations.</p>
              <p><strong className="text-emerald-400">Key Lesson:</strong> Deep reconnaissance of software supply chains enables wide-scale compromise through trusted update mechanisms.</p>
            </div>
          </div>

          {/* OPM Data Breach (2015) */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">US Office of Personnel Management (2015)</h4>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Reconnaissance Method:</strong> Chinese APT conducted extensive reconnaissance of OPM's network architecture, identifying outdated systems and unpatched vulnerabilities. Attackers mapped network topology over several months.</p>
              <p><strong className="text-emerald-400">Attack Vector:</strong> Exploited unpatched servers and stolen contractor credentials to access security clearance databases.</p>
              <p><strong className="text-emerald-400">Impact:</strong> 21.5 million background investigation records stolen, including SF-86 forms with highly sensitive personal information.</p>
              <p><strong className="text-emerald-400">Financial Cost:</strong> $133 million (initial response) + long-term national security implications.</p>
              <p><strong className="text-emerald-400">Key Lesson:</strong> Patient, methodical reconnaissance enables attackers to map entire networks and identify critical assets before striking.</p>
            </div>
          </div>

          {/* Colonial Pipeline (2021) */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">Colonial Pipeline Ransomware (2021)</h4>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Reconnaissance Method:</strong> DarkSide ransomware group discovered Colonial Pipeline's exposed VPN credentials in dark web credential dumps. No 2FA was required for VPN access.</p>
              <p><strong className="text-emerald-400">Attack Vector:</strong> Used compromised VPN credentials to access internal network and deploy ransomware across IT systems.</p>
              <p><strong className="text-emerald-400">Impact:</strong> 5,500-mile pipeline shut down for 6 days, causing fuel shortages across US East Coast.</p>
              <p><strong className="text-emerald-400">Financial Cost:</strong> $4.4 million ransom paid (partially recovered), $2.3 billion economic impact.</p>
              <p><strong className="text-emerald-400">Key Lesson:</strong> Exposed credentials discovered through passive reconnaissance (credential dumps, breach databases) enable direct network access.</p>
            </div>
          </div>

          {/* Equifax Breach (2017) */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">Equifax Data Breach (2017)</h4>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Reconnaissance Method:</strong> Attackers scanned internet-facing Equifax systems for known vulnerabilities, identifying unpatched Apache Struts CVE-2017-5638.</p>
              <p><strong className="text-emerald-400">Attack Vector:</strong> Exploited Apache Struts vulnerability in customer dispute portal to gain initial access, then moved laterally for 76 days.</p>
              <p><strong className="text-emerald-400">Impact:</strong> 147 million consumers' personal data compromised (SSNs, birth dates, addresses, driver's licenses).</p>
              <p><strong className="text-emerald-400">Financial Cost:</strong> $1.4 billion in settlements and remediation.</p>
              <p><strong className="text-emerald-400">Key Lesson:</strong> Active reconnaissance (vulnerability scanning) of public-facing systems reveals unpatched exploits that enable initial compromise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MITRE ATT&CK Reconnaissance Tactics */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          MITRE ATT&CK Reconnaissance Tactics (TA0043)
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The MITRE ATT&CK framework categorizes reconnaissance techniques used by adversaries:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
            <h4 className="text-lg font-semibold text-emerald-400 mb-2">T1589: Gather Victim Identity Information</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">Employee names, email addresses, credentials from breaches, organizational hierarchy.</p>
          </div>

          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
            <h4 className="text-lg font-semibold text-emerald-400 mb-2">T1590: Gather Victim Network Information</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">IP ranges, domain names, network topology, DNS records, certificate data.</p>
          </div>

          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
            <h4 className="text-lg font-semibold text-emerald-400 mb-2">T1591: Gather Victim Org Information</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">Business relationships, physical locations, organizational structure, business operations.</p>
          </div>

          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
            <h4 className="text-lg font-semibold text-emerald-400 mb-2">T1592: Gather Victim Host Information</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">Operating systems, software versions, hardware configurations, security software.</p>
          </div>

          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
            <h4 className="text-lg font-semibold text-emerald-400 mb-2">T1593: Search Open Websites/Domains</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">Social media, search engines, code repositories, business directories.</p>
          </div>

          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
            <h4 className="text-lg font-semibold text-emerald-400 mb-2">T1594: Search Victim-Owned Websites</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">Corporate websites, job postings, technical blogs, partner portals.</p>
          </div>

          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
            <h4 className="text-lg font-semibold text-emerald-400 mb-2">T1595: Active Scanning</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">Port scanning, vulnerability scanning, IP address scanning.</p>
          </div>

          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
            <h4 className="text-lg font-semibold text-emerald-400 mb-2">T1596: Search Open Technical Databases</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">WHOIS, DNS databases, certificate transparency logs, Shodan/Censys.</p>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Key Takeaways
        </h3>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2 mt-1">✓</span>
              <span><strong>Reconnaissance is the foundation</strong> of all cyber attacks—80% of successful breaches begin with thorough reconnaissance</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2 mt-1">✓</span>
              <span><strong>Passive reconnaissance is undetectable</strong>—OSINT, WHOIS, certificate transparency, and Shodan leave no traces in target logs</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2 mt-1">✓</span>
              <span><strong>Third-party reconnaissance</strong> reveals supply chain vulnerabilities that bypass direct security controls (Target, SolarWinds)</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2 mt-1">✓</span>
              <span><strong>MITRE ATT&CK TA0043</strong> catalogs 10 reconnaissance techniques used by real-world adversaries</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2 mt-1">✓</span>
              <span><strong>Active reconnaissance is detectable</strong>—port scanning, banner grabbing, and probing trigger IDS/IPS alerts</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2 mt-1">✓</span>
              <span><strong>Defense requires visibility</strong>—monitor external attack surface, deploy honeypots, track certificate issuance</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );

  const LabTab = () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Hands-On Reconnaissance Labs
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          These labs demonstrate practical reconnaissance techniques used in professional penetration testing. All exercises use simulated targets and open-source tools.
        </p>

        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-300">
              <strong className="block mb-1">Legal Warning</strong>
              Only perform reconnaissance on systems you own or have explicit written authorization to test. Unauthorized reconnaissance may violate computer fraud laws (CFAA in the US). Use authorized targets like HackTheBox, TryHackMe, or your own lab environment.
            </div>
          </div>
        </div>
      </section>

      {/* Lab 1: Passive OSINT */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Lab 1: Passive OSINT Reconnaissance
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Gather information about a target domain using only passive techniques that leave no traces.
        </p>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6 mb-4">
          <h4 className="text-lg font-semibold text-emerald-400 mb-3">WHOIS Lookup</h4>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
<span className="text-green-400"># Query domain registration details</span>
<span className="text-blue-400">whois</span> example.com

<span className="text-green-400"># Output reveals:</span>
<span className="text-gray-500"># - Registrar, registration date, expiration date</span>
<span className="text-gray-500"># - Registrant name, organization, email</span>
<span className="text-gray-500"># - Name servers, admin contacts</span>
<span className="text-gray-500"># - Physical address (if not privacy-protected)</span>
            </pre>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6 mb-4">
          <h4 className="text-lg font-semibold text-emerald-400 mb-3">DNS Enumeration (Passive)</h4>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
<span className="text-green-400"># DNS record lookups (A, AAAA, MX, TXT, NS)</span>
<span className="text-blue-400">dig</span> example.com ANY

<span className="text-green-400"># Query MX records (mail servers)</span>
<span className="text-blue-400">dig</span> example.com MX

<span className="text-green-400"># Query TXT records (SPF, DKIM, DMARC, verification tokens)</span>
<span className="text-blue-400">dig</span> example.com TXT

<span className="text-green-400"># Reverse DNS lookup</span>
<span className="text-blue-400">dig</span> -x 93.184.216.34
            </pre>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6 mb-4">
          <h4 className="text-lg font-semibold text-emerald-400 mb-3">Certificate Transparency Logs</h4>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
<span className="text-green-400"># Search certificate transparency logs for subdomains</span>
<span className="text-green-400"># Using crt.sh web interface or API</span>

<span className="text-blue-400">curl</span> -s <span className="text-yellow-400">"https://crt.sh/?q=%.example.com&output=json"</span> | \
  <span className="text-blue-400">jq</span> -r <span className="text-yellow-400">'.[].name_value'</span> | <span className="text-blue-400">sort</span> -u

<span className="text-green-400"># Reveals all SSL certificates issued for subdomains:</span>
<span className="text-gray-500"># api.example.com</span>
<span className="text-gray-500"># dev.example.com</span>
<span className="text-gray-500"># staging.example.com</span>
<span className="text-gray-500"># admin.example.com</span>
            </pre>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h4 className="text-lg font-semibold text-emerald-400 mb-3">Shodan & Censys (Internet Scanning Databases)</h4>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
<span className="text-green-400"># Shodan search syntax</span>
<span className="text-gray-500"># Search for organization's assets</span>
org:<span className="text-yellow-400">"Example Corp"</span>

<span className="text-gray-500"># Search by IP range</span>
net:<span className="text-yellow-400">"93.184.216.0/24"</span>

<span className="text-gray-500"># Find exposed services</span>
hostname:<span className="text-yellow-400">"example.com"</span> port:<span className="text-yellow-400">3306</span>  <span className="text-green-400"># MySQL databases</span>
hostname:<span className="text-yellow-400">"example.com"</span> port:<span className="text-yellow-400">27017</span> <span className="text-green-400"># MongoDB databases</span>

<span className="text-green-400"># Reveals exposed services, versions, vulnerabilities</span>
            </pre>
          </div>
        </div>
      </section>

      {/* Lab 2: Active Reconnaissance */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Lab 2: Active Network Reconnaissance
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Direct interaction with target systems to enumerate services and identify vulnerabilities. Active reconnaissance is detectable.
        </p>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6 mb-4">
          <h4 className="text-lg font-semibold text-emerald-400 mb-3">Nmap Port Scanning</h4>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
<span className="text-green-400"># Quick scan: Top 1000 ports</span>
<span className="text-blue-400">nmap</span> -T4 -F 192.168.1.10

<span className="text-green-400"># Comprehensive scan: All 65535 ports + service detection</span>
<span className="text-blue-400">nmap</span> -p- -sV -sC -O -T4 192.168.1.10

<span className="text-green-400"># Stealth SYN scan (requires root)</span>
<span className="text-blue-400">sudo nmap</span> -sS -p 1-65535 192.168.1.10

<span className="text-green-400"># UDP scan (commonly missed)</span>
<span className="text-blue-400">sudo nmap</span> -sU -p 53,161,500 192.168.1.10

<span className="text-green-400"># Output reveals:</span>
<span className="text-gray-500"># PORT      STATE SERVICE    VERSION</span>
<span className="text-gray-500"># 22/tcp    open  ssh        OpenSSH 7.9 (protocol 2.0)</span>
<span className="text-gray-500"># 80/tcp    open  http       Apache httpd 2.4.41</span>
<span className="text-gray-500"># 3306/tcp  open  mysql      MySQL 5.7.30</span>
            </pre>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6 mb-4">
          <h4 className="text-lg font-semibold text-emerald-400 mb-3">Banner Grabbing (Service Identification)</h4>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
<span className="text-green-400"># HTTP banner grabbing</span>
<span className="text-blue-400">curl</span> -I http://example.com
<span className="text-gray-500"># Server: Apache/2.4.41 (Ubuntu)</span>
<span className="text-gray-500"># X-Powered-By: PHP/7.4.3</span>

<span className="text-green-400"># SSH banner grabbing</span>
<span className="text-blue-400">nc</span> example.com 22
<span className="text-gray-500"># SSH-2.0-OpenSSH_7.9p1 Debian-10+deb10u2</span>

<span className="text-green-400"># FTP banner grabbing</span>
<span className="text-blue-400">nc</span> example.com 21
<span className="text-gray-500"># 220 ProFTPD 1.3.5 Server (Debian)</span>

<span className="text-green-400"># Reveals software versions vulnerable to known CVEs</span>
            </pre>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h4 className="text-lg font-semibold text-emerald-400 mb-3">DNS Zone Transfer (AXFR)</h4>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
<span className="text-green-400"># Attempt DNS zone transfer (often misconfigured)</span>
<span className="text-blue-400">dig</span> axfr @ns1.example.com example.com

<span className="text-green-400"># If successful, reveals ALL DNS records:</span>
<span className="text-gray-500"># example.com.         3600  IN  A       93.184.216.34</span>
<span className="text-gray-500"># www.example.com.     3600  IN  A       93.184.216.34</span>
<span className="text-gray-500"># mail.example.com.    3600  IN  A       93.184.216.35</span>
<span className="text-gray-500"># dev.example.com.     3600  IN  A       192.168.1.50</span>
<span className="text-gray-500"># admin.example.com.   3600  IN  A       192.168.1.51</span>

<span className="text-green-400"># Defense: Restrict zone transfers to authorized secondary DNS servers only</span>
            </pre>
          </div>
        </div>
      </section>

      {/* Lab 3: OSINT Automation */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Lab 3: Automated OSINT with theHarvester
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          theHarvester automates OSINT gathering from multiple sources (search engines, Shodan, certificate transparency).
        </p>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
<span className="text-green-400"># Install theHarvester</span>
<span className="text-blue-400">pip3 install</span> theHarvester

<span className="text-green-400"># Comprehensive OSINT scan</span>
<span className="text-blue-400">theHarvester</span> -d example.com -b all -l 500

<span className="text-green-400"># Specific sources</span>
<span className="text-blue-400">theHarvester</span> -d example.com -b google,linkedin,shodan

<span className="text-green-400"># Results include:</span>
<span className="text-gray-500"># - Email addresses (john@example.com, sales@example.com)</span>
<span className="text-gray-500"># - Employee names (from LinkedIn)</span>
<span className="text-gray-500"># - Subdomains (api.example.com, dev.example.com)</span>
<span className="text-gray-500"># - IP addresses, ASN numbers</span>
<span className="text-gray-500"># - Exposed services (from Shodan)</span>
            </pre>
          </div>
        </div>
      </section>

      {/* Interactive Jupyter Notebook */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Interactive Lab Notebook
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Continue with hands-on exercises in our interactive Jupyter notebook, featuring automated reconnaissance scripts, data visualization, and target enumeration workflows.
        </p>
        <a
          href="/notebooks/11-reconnaissance-footprinting.ipynb"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all"
        >
          <Code className="w-5 h-5 mr-2" />
          Open Interactive Lab Notebook
        </a>
      </section>
    </div>
  );

  const ToolsTab = () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Reconnaissance & Defense Tools
        </h2>
      </section>

      {/* Reconnaissance Tools */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Reconnaissance Tools
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nmap */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">Nmap (Network Mapper)</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Industry-standard network scanning tool for port discovery, service identification, OS fingerprinting, and vulnerability detection.
            </p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Use Case:</strong> Comprehensive network reconnaissance</p>
              <p><strong className="text-emerald-400">Features:</strong> NSE scripting, stealth scanning, version detection</p>
              <p><strong className="text-emerald-400">Detection Risk:</strong> High (triggers IDS/IPS)</p>
            </div>
          </div>

          {/* theHarvester */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">theHarvester</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Automated OSINT framework gathering emails, subdomains, IPs, and employee data from search engines, Shodan, certificate transparency, and more.
            </p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Use Case:</strong> Passive information gathering</p>
              <p><strong className="text-emerald-400">Sources:</strong> Google, LinkedIn, Shodan, crt.sh, Bing</p>
              <p><strong className="text-emerald-400">Detection Risk:</strong> None (fully passive)</p>
            </div>
          </div>

          {/* Shodan */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">Shodan</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Internet-wide scanning database cataloging exposed devices, services, and vulnerabilities. Query 600+ million devices without scanning.
            </p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Use Case:</strong> Passive asset discovery</p>
              <p><strong className="text-emerald-400">Features:</strong> Vulnerability search, historical data, API access</p>
              <p><strong className="text-emerald-400">Cost:</strong> Free tier + paid plans ($49-$899/mo)</p>
            </div>
          </div>

          {/* Censys */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">Censys</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Similar to Shodan, maintained by University of Michigan researchers. Daily scans of IPv4 space, certificate transparency, and cloud infrastructure.
            </p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Use Case:</strong> Attack surface mapping</p>
              <p><strong className="text-emerald-400">Features:</strong> Certificate search, cloud asset discovery</p>
              <p><strong className="text-emerald-400">Cost:</strong> Free community edition + enterprise plans</p>
            </div>
          </div>

          {/* Recon-ng */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">Recon-ng</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Metasploit-style OSINT framework with modular reconnaissance capabilities. Automates queries to 80+ data sources.
            </p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Use Case:</strong> Modular OSINT automation</p>
              <p><strong className="text-emerald-400">Modules:</strong> WHOIS, DNS, social media, breach databases</p>
              <p><strong className="text-emerald-400">Output:</strong> Database storage, CSV/JSON export</p>
            </div>
          </div>

          {/* Maltego */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">Maltego</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Visual OSINT platform mapping relationships between people, companies, domains, and infrastructure. Used by law enforcement and intelligence agencies.
            </p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Use Case:</strong> Relationship mapping and visualization</p>
              <p><strong className="text-emerald-400">Features:</strong> Entity linking, social network analysis</p>
              <p><strong className="text-emerald-400">Cost:</strong> Community edition (limited) + Commercial licenses</p>
            </div>
          </div>

          {/* Amass */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">OWASP Amass</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Advanced subdomain enumeration and attack surface mapping tool. Integrates 50+ data sources for comprehensive asset discovery.
            </p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Use Case:</strong> Subdomain discovery and network mapping</p>
              <p><strong className="text-emerald-400">Methods:</strong> Passive DNS, certificate transparency, APIs, brute force</p>
              <p><strong className="text-emerald-400">Output:</strong> Graph visualization, JSON export</p>
            </div>
          </div>

          {/* SpiderFoot */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">SpiderFoot</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Automated OSINT reconnaissance tool with web UI. Queries 200+ data sources and presents findings in interactive dashboard.
            </p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Use Case:</strong> Comprehensive automated OSINT</p>
              <p><strong className="text-emerald-400">Features:</strong> Correlation engine, threat intelligence integration</p>
              <p><strong className="text-emerald-400">Interface:</strong> Web UI + CLI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Defense Tools */}
      <section className="mt-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Reconnaissance Defense & Monitoring
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Attack Surface Management */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">Attack Surface Management (ASM)</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Continuous discovery and monitoring of internet-facing assets. Commercial platforms include CyCognito, Censys ASM, Palo Alto Cortex Xpanse.
            </p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Purpose:</strong> Discover assets before attackers do</p>
              <p><strong className="text-emerald-400">Features:</strong> Shadow IT discovery, risk scoring, remediation workflows</p>
              <p><strong className="text-emerald-400">Providers:</strong> CyCognito, Censys, Randori, Cortex Xpanse</p>
            </div>
          </div>

          {/* Honeypots */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">Honeypots & Canary Tokens</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Deploy decoy systems and fake credentials to detect reconnaissance activities. Thinkst Canary, HoneyDB, OpenCanary provide early warning.
            </p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Purpose:</strong> Detect reconnaissance and scanning</p>
              <p><strong className="text-emerald-400">Types:</strong> Network honeypots, email canaries, document traps</p>
              <p><strong className="text-emerald-400">Tools:</strong> Thinkst Canary, OpenCanary, HoneyDB</p>
            </div>
          </div>

          {/* Certificate Transparency Monitoring */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">Certificate Transparency Monitoring</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Monitor certificate transparency logs for unauthorized certificate issuance. CertStream, crt.sh, Facebook Certificate Transparency Monitoring.
            </p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Purpose:</strong> Detect phishing domains and shadow IT</p>
              <p><strong className="text-emerald-400">Alerts:</strong> New subdomains, lookalike domains, wildcard certs</p>
              <p><strong className="text-emerald-400">Tools:</strong> CertStream, crt.sh, SSLMate</p>
            </div>
          </div>

          {/* IDS/IPS */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">Intrusion Detection/Prevention (IDS/IPS)</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Detect active reconnaissance like port scanning and probing. Snort, Suricata, Zeek monitor network traffic for scanning signatures.
            </p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Purpose:</strong> Detect and block active scanning</p>
              <p><strong className="text-emerald-400">Signatures:</strong> Nmap fingerprints, rapid port scans, banner grabbing</p>
              <p><strong className="text-emerald-400">Tools:</strong> Snort, Suricata, Zeek, Cisco Firepower</p>
            </div>
          </div>

          {/* SIEM */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">SIEM (Security Information & Event Management)</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Aggregate and correlate security logs to identify reconnaissance patterns. Splunk, Elastic SIEM, IBM QRadar, Microsoft Sentinel.
            </p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Purpose:</strong> Correlate multi-stage reconnaissance activities</p>
              <p><strong className="text-emerald-400">Detection:</strong> Sequential scanning, WHOIS/DNS queries, failed auth attempts</p>
              <p><strong className="text-emerald-400">Platforms:</strong> Splunk, Elastic, QRadar, Sentinel</p>
            </div>
          </div>

          {/* Threat Intelligence */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
            <h4 className="text-xl font-semibold text-emerald-400 mb-3">Threat Intelligence Platforms</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Subscribe to threat feeds tracking reconnaissance infrastructure (scanners, OSINT tools, APT infrastructure). Recorded Future, Anomali, ThreatConnect.
            </p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong className="text-emerald-400">Purpose:</strong> Preemptive blocking of known reconnaissance sources</p>
              <p><strong className="text-emerald-400">Feeds:</strong> Scanner IPs, Shodan crawlers, malicious domains</p>
              <p><strong className="text-emerald-400">Providers:</strong> Recorded Future, Anomali, ThreatConnect, MISP</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const ReferencesTab = () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          References & Resources
        </h2>
      </section>

      {/* Official Standards & Frameworks */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Standards & Frameworks
        </h3>
        <div className="space-y-3">
          <a
            href="https://attack.mitre.org/tactics/TA0043/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4 hover:border-emerald-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">MITRE ATT&CK TA0043: Reconnaissance</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Adversary reconnaissance tactics, techniques, and procedures catalog
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-emerald-400" />
            </div>
          </a>

          <a
            href="http://www.pentest-standard.org/index.php/Pre-engagement"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4 hover:border-emerald-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">PTES (Penetration Testing Execution Standard)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Intelligence gathering and reconnaissance methodology
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-emerald-400" />
            </div>
          </a>

          <a
            href="https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-115.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4 hover:border-emerald-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">NIST SP 800-115: Technical Guide to Information Security Testing</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  US government standard for security assessment and reconnaissance (PDF)
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-emerald-400" />
            </div>
          </a>

          <a
            href="https://owasp.org/www-project-web-security-testing-guide/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4 hover:border-emerald-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">OWASP Web Security Testing Guide</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Information gathering and reconnaissance techniques for web applications
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-emerald-400" />
            </div>
          </a>
        </div>
      </section>

      {/* Research Papers & Case Studies */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Research & Case Studies
        </h3>
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
            <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mb-2">[1]</p>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              "The Role of OSINT in Targeted Attacks" (2022)
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Analysis of 500 cyber attacks showing 82% began with passive reconnaissance. Published in Journal of Cybersecurity Research.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
            <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mb-2">[2]</p>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Target Corporation Data Breach Investigation Report (2014)
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Senate Commerce Committee report detailing reconnaissance of third-party vendors leading to $292M breach.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
            <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mb-2">[3]</p>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              "SolarWinds Supply Chain Attack: Lessons Learned" (2021)
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              CISA and FBI joint analysis of APT29's multi-year reconnaissance and infiltration campaign. AA21-008A advisory.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
            <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mb-2">[4]</p>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              "Certificate Transparency: Attack Surface Analysis" (2020)
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Research demonstrating 95% of organizations leak subdomain structure through CT logs. IEEE Security & Privacy.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
            <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mb-2">[5]</p>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              "Passive Network Reconnaissance: Techniques and Detection" (2023)
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Analysis of passive reconnaissance methods undetectable by traditional security controls. ACM CCS 2023.
            </p>
          </div>
        </div>
      </section>

      {/* Tools & Platforms */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Tools & Platforms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://nmap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4 hover:border-emerald-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Nmap</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Official Nmap documentation and downloads</p>
              </div>
              <ExternalLink className="w-5 h-5 text-emerald-400" />
            </div>
          </a>

          <a
            href="https://www.shodan.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4 hover:border-emerald-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Shodan</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Search engine for internet-connected devices</p>
              </div>
              <ExternalLink className="w-5 h-5 text-emerald-400" />
            </div>
          </a>

          <a
            href="https://censys.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4 hover:border-emerald-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Censys</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Internet intelligence and attack surface management</p>
              </div>
              <ExternalLink className="w-5 h-5 text-emerald-400" />
            </div>
          </a>

          <a
            href="https://github.com/OWASP/Amass"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4 hover:border-emerald-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">OWASP Amass</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Attack surface mapping and subdomain enumeration</p>
              </div>
              <ExternalLink className="w-5 h-5 text-emerald-400" />
            </div>
          </a>

          <a
            href="https://www.maltego.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4 hover:border-emerald-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Maltego</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Visual OSINT and relationship mapping platform</p>
              </div>
              <ExternalLink className="w-5 h-5 text-emerald-400" />
            </div>
          </a>

          <a
            href="https://crt.sh/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4 hover:border-emerald-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">crt.sh</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Certificate transparency log search</p>
              </div>
              <ExternalLink className="w-5 h-5 text-emerald-400" />
            </div>
          </a>
        </div>
      </section>

      {/* Practice Platforms */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Practice Platforms (Legal Targets)
        </h3>
        <div className="space-y-3">
          <a
            href="https://www.hackthebox.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4 hover:border-emerald-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Hack The Box</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Legal pentesting labs with reconnaissance challenges
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-emerald-400" />
            </div>
          </a>

          <a
            href="https://tryhackme.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4 hover:border-emerald-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">TryHackMe</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Guided reconnaissance and enumeration learning paths
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-emerald-400" />
            </div>
          </a>

          <a
            href="https://www.offensive-security.com/labs/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4 hover:border-emerald-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Offensive Security Labs</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Professional-grade pentesting environment (OSCP/OSEP prep)
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-emerald-400" />
            </div>
          </a>
        </div>
      </section>

      {/* Legal & Ethical */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Legal & Ethical Guidelines
        </h3>
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-red-400 mr-3 mt-1 flex-shrink-0" />
            <div className="text-gray-700 dark:text-gray-300">
              <p className="font-semibold text-red-400 mb-2">Legal Disclaimer</p>
              <p className="mb-3">
                Unauthorized reconnaissance of computer systems may violate laws including:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span><strong>US:</strong> Computer Fraud and Abuse Act (CFAA) 18 U.S.C. § 1030</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span><strong>EU:</strong> Network and Information Systems (NIS) Directive</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span><strong>UK:</strong> Computer Misuse Act 1990</span>
                </li>
              </ul>
              <p className="mt-3">
                Always obtain explicit written authorization before conducting reconnaissance against any system you do not own.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
      {/* Navigation */}
      {onBack && (
        <div className="bg-white dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-[#1F1F1F] sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={onBack}
              className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Reconnaissance & Footprinting
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl">
            Master the art of information gathering—the critical first phase of penetration testing and cyber attacks. Learn passive and active reconnaissance techniques used by professional security researchers and adversaries.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-[#1F1F1F] sticky top-[73px] z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'theory', label: 'Theory', icon: BookOpen },
              { id: 'lab', label: 'Lab', icon: Code },
              { id: 'tools', label: 'Tools', icon: Wrench },
              { id: 'references', label: 'References', icon: ExternalLink }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-4 border-b-2 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-emerald-400'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'theory' && <TheoryTab />}
        {activeTab === 'lab' && <LabTab />}
        {activeTab === 'tools' && <ToolsTab />}
        {activeTab === 'references' && <ReferencesTab />}
      </div>

      {/* Challenge Button */}
      {onStartChallenge && (
        <div className="bg-white dark:bg-[#0A0A0A] border-t border-gray-200 dark:border-[#1F1F1F] sticky bottom-0">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={onStartChallenge}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-[1.02]"
            >
              Take the Challenge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};