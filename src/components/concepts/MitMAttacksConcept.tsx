import { useState } from 'react';
import { AlertTriangle, ArrowLeft, BookOpen, Code, Shield, Database, Lock, Wifi, Network, Server, Key, Globe } from 'lucide-react';

interface MitMAttacksConceptProps {
  onBack?: () => void;
}

export const MitMAttacksConcept = ({ onBack }: MitMAttacksConceptProps = {}) => {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center text-white/90 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
          )}

          <div className="flex items-center mb-6">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm mr-6">
              <AlertTriangle className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2">Man-in-the-Middle (MitM) Attacks</h1>
              <p className="text-xl text-white/90">
                Intercepting, manipulating, and hijacking communications between parties
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <span className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
              Advanced
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
              200 points
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
              MITRE ATT&CK: T1557
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
              Traditional Hacking
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'theory', label: 'Theory', icon: BookOpen },
              { id: 'lab', label: 'Lab', icon: Code },
              { id: 'tools', label: 'Tools', icon: Shield },
              { id: 'references', label: 'References', icon: Database }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'theory' && (
          <div className="space-y-12">
            {/* Introduction */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Understanding Man-in-the-Middle Attacks
              </h2>
              <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Man-in-the-Middle (MitM) attacks occur when an attacker secretly intercepts and potentially alters
                  communications between two parties who believe they are directly communicating with each other. The
                  attacker positions themselves between the victim and their intended destination—whether a website,
                  email server, or network resource—enabling eavesdropping, data theft, session hijacking, and traffic
                  manipulation.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  MitM attacks exploit fundamental vulnerabilities in network protocols, trust models, and encryption
                  implementations. They can occur at various layers: network layer (ARP spoofing, BGP hijacking),
                  transport layer (SSL/TLS downgrade attacks), and application layer (session hijacking, phishing).
                  The rise of HTTPS has mitigated many traditional MitM vectors, but new attack surfaces continue to
                  emerge through compromised Certificate Authorities, corporate HTTPS inspection, and sophisticated
                  nation-state capabilities.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                    <Network className="w-8 h-8 text-red-600 dark:text-red-400 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Network Layer</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ARP spoofing, DNS hijacking, BGP route manipulation to intercept traffic at infrastructure level
                    </p>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
                    <Lock className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Encryption Attacks</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      SSL stripping, TLS downgrade attacks, certificate manipulation to compromise encrypted connections
                    </p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                    <Wifi className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Wireless Threats</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Evil twin access points, rogue WiFi networks that mimic legitimate infrastructure
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Breaches */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Real-World MitM Attacks
              </h2>
              <div className="space-y-6">
                {/* Breach 1: Lenovo Superfish */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Lenovo Superfish Adware (2015)
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                          Certificate Manipulation
                        </span>
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">
                          CVE-2015-2077
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Attack Vector</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Pre-installed Superfish Visual Discovery adware installed a self-signed root certificate,
                        enabling MitM on all HTTPS traffic using Komodia SSL Hijacker with the same private key
                        across all installations
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Impact</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Approximately 750,000 consumer laptops shipped with vulnerability (2014-2015 models).
                        Every HTTPS connection interceptable by anyone with extracted private key.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Financial Cost</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        $3.5 million FTC settlement + $7.3 million class action settlement = $10.8 million total
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Outcome</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Lenovo discontinued Superfish, issued removal tool. Demonstrated dangers of pre-installed
                        bloatware and certificate chain manipulation. Led to increased scrutiny of OEM software practices.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Breach 2: DigiNotar */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        DigiNotar Certificate Authority Compromise (2011)
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                          Nation-State Attack
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                          PKI Compromise
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Attack Vector</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Attackers compromised DigiNotar's infrastructure and issued over 500 fraudulent SSL
                        certificates for high-profile domains (Google, Yahoo, Microsoft, Skype, Mozilla, CIA, Mossad)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Impact</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        300,000+ Iranian citizens targeted with Gmail MitM attacks. Complete compromise of PKI trust
                        model. Global certificate revocation crisis affecting all DigiNotar certificates.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Financial Cost</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        DigiNotar declared bankruptcy within months. Estimated €40 million ($52 million USD) in damages
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Outcome</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        All major browsers removed DigiNotar from trust stores. Led to Certificate Transparency
                        (RFC 6962) standard and enhanced CA oversight. Demonstrated need for public CT logs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Breach 3: BGP Hijacking */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        BGP Hijacking: MyEtherWallet Attack (2018)
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                          Infrastructure Attack
                        </span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                          Cryptocurrency Theft
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Attack Vector</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        BGP route hijacking redirected MyEtherWallet DNS traffic through attacker-controlled servers.
                        Fraudulent Route53 DNS responses directed users to phishing site with valid SSL certificate.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Impact</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Users entering private keys on phishing site had cryptocurrency wallets drained. Attack
                        lasted 2+ hours before detection. Demonstrated BGP infrastructure vulnerabilities.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Financial Cost</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        $152,000 in cryptocurrency stolen during this specific attack. 2018-2024 cumulative BGP/DNS
                        hijacking losses estimated at $100+ million
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Outcome</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Highlighted lack of BGP authentication. Accelerated RPKI (Resource Public Key Infrastructure)
                        adoption, though global deployment remains under 50% as of 2024.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Breach 4: Kazakhstan Certificate */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Kazakhstan Government Root Certificate (2019)
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                          State Surveillance
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                          Mass Interception
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Attack Vector</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Kazakhstan government mandated ISP customers install state-issued root certificate to enable
                        nationwide HTTPS interception and surveillance of all encrypted web traffic.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Impact</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Estimated 100,000+ users forced to install certificate. All HTTPS traffic (banking, email,
                        social media) decryptable by government. Targeted specific platforms including Facebook, Twitter.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Financial Cost</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        N/A (state-sponsored surveillance program, not financially motivated attack)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Outcome</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Mozilla, Chrome, Safari blocked the certificate within days. Kazakhstan suspended program
                        after international pressure. Demonstrated browser vendor power in protecting user security.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Attack Types */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                MitM Attack Techniques
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                  <div className="flex items-center mb-4">
                    <Network className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">ARP Spoofing</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Exploits Address Resolution Protocol lack of authentication. Attacker sends forged ARP replies
                    associating their MAC address with victim's gateway IP. All victim traffic flows through attacker
                    machine before forwarding to legitimate gateway.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">MITRE ATT&CK: T1557.002</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Detection: Dynamic ARP Inspection (DAI), monitoring ARP tables for duplicates
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                  <div className="flex items-center mb-4">
                    <Globe className="w-6 h-6 text-orange-600 dark:text-orange-400 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">DNS Spoofing</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Intercepts DNS queries and returns malicious IP addresses. Can be achieved via local network ARP
                    spoofing + DNS response injection, ISP-level rogue DNS servers, or BGP hijacking to redirect DNS
                    traffic to attacker nameservers.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">CVE-2008-1447 (Kaminsky)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Defense: DNSSEC, DNS over HTTPS (DoH), DNS over TLS (DoT)
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                  <div className="flex items-center mb-4">
                    <Lock className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">SSL/TLS Stripping</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Intercepts HTTPS requests, maintains encrypted connection to server but serves HTTP to victim.
                    Downgrade attacks (POODLE, FREAK, Logjam) force TLS version or cipher suite downgrades to
                    exploitable configurations.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">CVE-2014-3566 (POODLE)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Defense: HSTS (HTTP Strict Transport Security), HSTS preload lists, TLS 1.3
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                  <div className="flex items-center mb-4">
                    <Wifi className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Evil Twin Access Points</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Rogue WiFi access point mimicking legitimate network (same SSID). Higher signal strength causes
                    clients to auto-connect. All traffic routed through attacker infrastructure enabling interception,
                    credential harvesting, malware injection.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Attack Surface</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Defense: WPA3-Enterprise with certificate validation, mandatory VPN policies
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                  <div className="flex items-center mb-4">
                    <Server className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Session Hijacking</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Steal session cookies/tokens via packet sniffing (Wireshark), XSS injection, or MitM interception.
                    Replay stolen session to impersonate victim. Particularly effective against HTTP-only sessions or
                    sessions with long timeouts.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">MITRE ATT&CK: T1539</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Defense: HttpOnly cookies, Secure flag, SameSite attribute, token rotation
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                  <div className="flex items-center mb-4">
                    <Globe className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">BGP Hijacking</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Announce more specific IP prefix routes via Border Gateway Protocol. Internet routers prefer more
                    specific routes, redirecting traffic to attacker AS (Autonomous System). Can intercept, modify,
                    and forward to legitimate destination.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Notable: YouTube (2008)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Defense: RPKI (Resource Public Key Infrastructure), BGP monitoring, ROV
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Takeaways */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Key Takeaways
              </h2>
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-8">
                <ul className="space-y-4">
                  {[
                    'MitM attacks intercept communications between two parties who believe they are directly connected',
                    'Attack vectors span network layer (ARP/DNS/BGP), transport layer (TLS downgrade), and application layer (session hijacking)',
                    'HTTPS adoption (95.6% of Chrome page loads) has mitigated many traditional MitM attacks but new vectors emerge',
                    'Certificate-based attacks remain viable: compromised CAs (DigiNotar), pre-installed malware (Superfish), state surveillance (Kazakhstan)',
                    'BGP hijacking enables nation-state level interception; RPKI adoption remains under 50% globally as of 2024',
                    'Public WiFi networks remain high-risk: 23% vulnerable to MitM attacks according to 2023 research',
                    'Corporate HTTPS interception affects 11% of connections, with 64% of middleboxes weakening security',
                    'Primary defenses: HSTS, certificate pinning, Certificate Transparency, VPNs on untrusted networks, DNSSEC',
                    'TLS 1.3 eliminates many downgrade attacks but requires both client and server support (65% adoption in 2024)',
                    'Detection requires network monitoring (Zeek, Suricata), certificate validation, and behavioral analysis'
                  ].map((takeaway, index) => (
                    <li key={index} className="flex items-start">
                      <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'lab' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Hands-On MitM Detection & Defense
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Learn to detect and defend against Man-in-the-Middle attacks through practical code examples.
                All attack demonstrations are for educational purposes only and should only be used in authorized
                testing environments.
              </p>
            </div>

            {/* Lab 1: TLS Certificate Validation */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Lock className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Lab 1: TLS Certificate Validation & Detection
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Verify TLS certificates to detect self-signed, expired, or fraudulent certificates that indicate
                potential MitM attacks. This Python example validates certificates and checks for common red flags.
              </p>

              <div className="space-y-4">
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                    SECURE CODE - Production Ready Certificate Validation
                  </p>
                  <div className="bg-gray-900 dark:bg-slate-950 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-100"><code>{`import ssl
import socket
import certifi
from datetime import datetime

def check_certificate(hostname, port=443):
    """Validate TLS certificate and detect potential MitM"""
    context = ssl.create_default_context(cafile=certifi.where())

    try:
        with socket.create_connection((hostname, port), timeout=10) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert = ssock.getpeercert()

                # Validate expiration
                not_after = datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z')
                days_until_expiry = (not_after - datetime.now()).days

                print(f"[+] {hostname}: VALID certificate")
                print(f"    Issued to: {dict(x[0] for x in cert['subject'])}")
                print(f"    Issued by: {dict(x[0] for x in cert['issuer'])}")
                print(f"    Valid until: {cert['notAfter']} ({days_until_expiry} days)")
                print(f"    Serial: {cert['serialNumber']}")

                # Check Subject Alternative Names
                if 'subjectAltName' in cert:
                    san = [name[1] for name in cert['subjectAltName']]
                    print(f"    SAN: {', '.join(san)}")

                # Warnings
                if days_until_expiry < 30:
                    print(f"    [!] WARNING: Certificate expires in {days_until_expiry} days")

                return True

    except ssl.SSLCertVerificationError as e:
        print(f"[-] {hostname}: CERTIFICATE VALIDATION FAILED")
        print(f"    Error: {e}")
        print(f"    [!] POSSIBLE MAN-IN-THE-MIDDLE ATTACK!")
        return False
    except ssl.SSLError as e:
        print(f"[-] {hostname}: SSL ERROR - {e}")
        return False
    except Exception as e:
        print(f"[-] {hostname}: CONNECTION FAILED - {e}")
        return False

# Test legitimate sites
sites = ['google.com', 'github.com', 'microsoft.com']
for site in sites:
    check_certificate(site)
    print()`}</code></pre>
                  </div>
                </div>

                <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    Advanced: Certificate Pinning Implementation
                  </p>
                  <div className="bg-gray-900 dark:bg-slate-950 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-100"><code>{`import hashlib

def get_certificate_fingerprint(hostname, port=443):
    """Extract SHA-256 fingerprint of certificate"""
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
    context.check_hostname = False
    context.verify_mode = ssl.CERT_NONE

    with socket.create_connection((hostname, port)) as sock:
        with context.wrap_socket(sock, server_hostname=hostname) as ssock:
            der_cert = ssock.getpeercert(binary_form=True)
            fingerprint = hashlib.sha256(der_cert).hexdigest()
            return fingerprint

def validate_pinned_certificate(hostname, expected_fingerprint, port=443):
    """Validate certificate matches pinned fingerprint"""
    actual_fingerprint = get_certificate_fingerprint(hostname, port)

    if actual_fingerprint == expected_fingerprint:
        print(f"[+] {hostname}: Certificate matches pinned fingerprint")
        return True
    else:
        print(f"[-] {hostname}: CERTIFICATE PINNING FAILURE!")
        print(f"    Expected: {expected_fingerprint}")
        print(f"    Actual:   {actual_fingerprint}")
        print(f"    [!] POSSIBLE MAN-IN-THE-MIDDLE ATTACK!")
        return False

# Pin Google's certificate (store securely in production)
google_fingerprint = get_certificate_fingerprint('google.com')
print(f"Google certificate SHA-256: {google_fingerprint}\\n")

# Later validation
validate_pinned_certificate('google.com', google_fingerprint)`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Lab 2: ARP Spoofing Detection */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Network className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Lab 2: ARP Spoofing Detection
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Monitor ARP tables for suspicious changes that indicate ARP poisoning attacks. This Scapy-based
                monitor tracks IP-to-MAC mappings and alerts on conflicts.
              </p>

              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                  DETECTION CODE - ARP Spoofing Monitor
                </p>
                <div className="bg-gray-900 dark:bg-slate-950 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100"><code>{`from scapy.all import *
from collections import defaultdict
import time

# Track IP -> MAC mappings
arp_table = defaultdict(set)

def detect_arp_spoofing(packet):
    """Detect ARP poisoning by monitoring for duplicate IP/MAC pairs"""
    if ARP in packet and packet[ARP].op == 2:  # ARP reply
        ip = packet[ARP].psrc
        mac = packet[ARP].hwsrc

        # Check if we've seen this IP with a different MAC
        if ip in arp_table and mac not in arp_table[ip]:
            print(f"\\n[!] ARP SPOOFING DETECTED!")
            print(f"    IP Address: {ip}")
            print(f"    Previous MAC(s): {', '.join(arp_table[ip])}")
            print(f"    New MAC: {mac}")
            print(f"    [!] Possible attacker MAC: {mac}")

            # Log to file
            with open('arp_spoofing_log.txt', 'a') as f:
                timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
                f.write(f"{timestamp} - ARP spoofing: {ip} "
                       f"changed from {arp_table[ip]} to {mac}\\n")

        # Add to tracking table
        arp_table[ip].add(mac)
        print(f"[*] ARP: {ip} <-> {mac}")

print("[*] Starting ARP spoofing detection...")
print("[*] Monitoring network for suspicious ARP traffic\\n")
print("[*] Press Ctrl+C to stop\\n")

try:
    sniff(filter="arp", prn=detect_arp_spoofing, store=0)
except KeyboardInterrupt:
    print("\\n[*] Stopping detection...")
    print(f"[*] Monitored {len(arp_table)} unique IP addresses")`}</code></pre>
                </div>
              </div>
            </div>

            {/* Lab 3: SSL Strip Detection */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Lock className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Lab 3: SSL Stripping Detection
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Detect HTTPS downgrade attacks where attackers strip SSL/TLS to intercept plaintext traffic.
                This monitor identifies HTTP connections to known HTTPS-only domains.
              </p>

              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                  DETECTION CODE - SSL Strip Monitor
                </p>
                <div className="bg-gray-900 dark:bg-slate-950 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100"><code>{`from scapy.all import *

# Known HTTPS-only domains (extend with HSTS preload list)
https_only_domains = {
    'google.com', 'facebook.com', 'twitter.com', 'github.com',
    'amazon.com', 'paypal.com', 'bankofamerica.com'
}

def detect_ssl_strip(packet):
    """Detect HTTP traffic to HTTPS-only domains"""
    if packet.haslayer(TCP) and packet.haslayer(Raw):
        try:
            payload = packet[Raw].load.decode('utf-8', errors='ignore')

            # Check for HTTP traffic
            if 'Host: ' in payload and packet[TCP].dport == 80:
                # Extract hostname
                for line in payload.split('\\r\\n'):
                    if 'Host: ' in line:
                        hostname = line.split('Host: ')[1].strip()

                        # Check if this is a known HTTPS-only domain
                        if any(domain in hostname for domain in https_only_domains):
                            print(f"\\n[!] POSSIBLE SSL STRIP ATTACK DETECTED!")
                            print(f"    HTTPS-only domain accessed via HTTP: {hostname}")
                            print(f"    Source IP: {packet[IP].src}")
                            print(f"    Destination IP: {packet[IP].dst}")
                            print(f"    [!] User credentials may be exposed!")

                        break

            # Track HTTPS redirects to build domain list
            if 'Location: https://' in payload:
                for line in payload.split('\\r\\n'):
                    if 'Location: https://' in line:
                        url = line.split('Location: https://')[1].split('/')[0]
                        https_only_domains.add(url)

        except Exception:
            pass

print("[*] Starting SSL Strip detection...")
print("[*] Monitoring for HTTP traffic to HTTPS-only domains\\n")
print(f"[*] Tracking {len(https_only_domains)} known HTTPS-only domains\\n")

try:
    sniff(filter="tcp port 80", prn=detect_ssl_strip, store=0)
except KeyboardInterrupt:
    print("\\n[*] Stopping detection...")`}</code></pre>
                </div>
              </div>
            </div>

            {/* Lab 4: Certificate Transparency Monitoring */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Server className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Lab 4: Certificate Transparency Monitoring
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Monitor Certificate Transparency logs to detect rogue certificates issued for your domains—a key
                indicator of MitM attacks or compromised Certificate Authorities.
              </p>

              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                  MONITORING CODE - Certificate Transparency Log Query
                </p>
                <div className="bg-gray-900 dark:bg-slate-950 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100"><code>{`import requests
import json
from datetime import datetime

def monitor_certificate_transparency(domain):
    """Query CT logs for certificates issued to domain"""
    url = f"https://crt.sh/?q=%.{domain}&output=json"

    try:
        response = requests.get(url, timeout=30)
        if response.status_code == 200:
            certificates = response.json()

            print(f"\\n[*] Certificate Transparency Scan: {domain}")
            print(f"[*] Found {len(certificates)} certificates\\n")

            # Group by issuer
            issuers = {}
            for cert in certificates:
                issuer = cert.get('issuer_name', 'Unknown')
                if issuer not in issuers:
                    issuers[issuer] = []
                issuers[issuer].append(cert)

            # Display summary
            for issuer, certs in issuers.items():
                print(f"\\nIssuer: {issuer}")
                print(f"  Total Certificates: {len(certs)}")

                # Show recent certificates
                recent = sorted(certs,
                              key=lambda x: x.get('entry_timestamp', ''),
                              reverse=True)[:3]

                for cert in recent:
                    cn = cert.get('common_name', cert.get('name_value', 'N/A'))
                    timestamp = cert.get('entry_timestamp', 'Unknown')
                    print(f"    - {cn}")
                    print(f"      Logged: {timestamp}")

            # Alert on suspicious issuers
            suspicious_keywords = ['free', 'test', 'fake', 'phishing']
            print("\\n[*] Security Analysis:")

            for cert in certificates:
                issuer_lower = cert.get('issuer_name', '').lower()
                if any(keyword in issuer_lower for keyword in suspicious_keywords):
                    print(f"\\n[!] SUSPICIOUS CERTIFICATE DETECTED!")
                    print(f"    Domain: {cert.get('common_name', 'N/A')}")
                    print(f"    Issuer: {cert.get('issuer_name', 'N/A')}")
                    print(f"    Logged: {cert.get('entry_timestamp', 'Unknown')}")
                    print(f"    [!] Possible rogue certificate!")

            # Check for unexpected domains
            print("\\n[*] All discovered subdomains:")
            unique_domains = set()
            for cert in certificates:
                name = cert.get('name_value', '')
                for subdomain in name.split('\\n'):
                    unique_domains.add(subdomain.strip())

            for subdomain in sorted(unique_domains):
                print(f"    - {subdomain}")

            return certificates

    except Exception as e:
        print(f"[-] Error querying CT logs: {e}")
        return []

# Monitor your domains
domains_to_monitor = ['example.com', 'yourdomain.com']

for domain in domains_to_monitor:
    certificates = monitor_certificate_transparency(domain)
    print(f"\\n{'='*60}\\n")`}</code></pre>
                </div>
              </div>
            </div>

            {/* Lab 5: HSTS Implementation */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Lab 5: HSTS (HTTP Strict Transport Security) Implementation
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Implement HTTP Strict Transport Security to prevent SSL stripping attacks by forcing all connections
                to use HTTPS. This is the primary defense against MitM downgrade attacks.
              </p>

              <div className="space-y-4">
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                    SECURE CODE - Nginx HSTS Configuration
                  </p>
                  <div className="bg-gray-900 dark:bg-slate-950 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-100"><code>{`server {
    listen 443 ssl http2;
    server_name example.com;

    # SSL/TLS Configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers on;

    # HSTS Header (2 years, include subdomains, preload)
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    # Additional Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer" always;

    # Content Security Policy
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; object-src 'none'" always;

    location / {
        root /var/www/html;
        index index.html;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}`}</code></pre>
                  </div>
                </div>

                <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    Python Flask HSTS Implementation
                  </p>
                  <div className="bg-gray-900 dark:bg-slate-950 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-100"><code>{`from flask import Flask, request, redirect
from flask_talisman import Talisman

app = Flask(__name__)

# Force HTTPS with HSTS
Talisman(app,
    force_https=True,
    strict_transport_security=True,
    strict_transport_security_max_age=63072000,  # 2 years
    strict_transport_security_include_subdomains=True,
    strict_transport_security_preload=True,
    content_security_policy={
        'default-src': "'self'",
        'script-src': "'self'",
        'style-src': "'self' 'unsafe-inline'",
        'img-src': "'self' data:",
    }
)

@app.before_request
def before_request():
    """Ensure all requests use HTTPS"""
    if not request.is_secure and app.env != "development":
        url = request.url.replace("http://", "https://", 1)
        return redirect(url, code=301)

@app.route('/')
def index():
    return "Secure connection established with HSTS!"

if __name__ == '__main__':
    # Development: python app.py
    # Production: Use gunicorn with SSL certificates
    app.run(ssl_context='adhoc')  # Development only

    # Production example:
    # gunicorn --certfile=cert.pem --keyfile=key.pem app:app`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Notebook Link */}
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-8">
              <div className="flex items-center mb-4">
                <Code className="w-8 h-8 text-red-600 dark:text-red-400 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Interactive Jupyter Notebook
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Practice MitM detection and defense techniques in an interactive environment with executable code cells
                  </p>
                </div>
              </div>
              <a
                href="/notebooks/17-mitm-attacks.ipynb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-700 transition-all"
              >
                <Code className="w-5 h-5 mr-2" />
                Open Interactive Lab Notebook
              </a>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                MitM Attack & Defense Tools
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Comprehensive toolkit for understanding, testing, and defending against Man-in-the-Middle attacks.
                Attack tools should only be used in authorized penetration testing environments.
              </p>
            </div>

            {/* Attack Tools */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
                Attack Tools (Authorized Testing Only)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-red-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-red-500/20 rounded-lg mr-4">
                      <Network className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Ettercap</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Classic MitM Framework</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Comprehensive suite for network sniffing and MitM attacks. Supports ARP poisoning, DNS spoofing,
                    SSL stripping, and packet manipulation. GUI and CLI modes available.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                      ettercap -T -M arp:remote /target-ip/ /gateway-ip/
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-red-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-red-500/20 rounded-lg mr-4">
                      <Network className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Bettercap</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Modern Network Attack Framework</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Powerful, modular framework for network reconnaissance and MitM attacks. Supports WiFi, Bluetooth
                    LE, HID, and Ethernet. Real-time traffic manipulation and credential harvesting.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                      bettercap -iface eth0
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-red-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-red-500/20 rounded-lg mr-4">
                      <Lock className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">mitmproxy</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Interactive HTTPS Proxy</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Python-based interactive HTTPS proxy for penetration testing. Intercept, inspect, modify, and
                    replay HTTP/HTTPS traffic. Powerful scripting API for custom attacks.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                      mitmproxy --mode transparent --showhost
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-red-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-red-500/20 rounded-lg mr-4">
                      <Wifi className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">WiFi Pineapple</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Wireless Penetration Testing Platform</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Dedicated hardware for wireless auditing. Creates evil twin access points, performs credential
                    harvesting, and enables wireless MitM attacks. Web-based management interface.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Hardware device with modules for evil twin, deauth, and packet capture
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-red-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-red-500/20 rounded-lg mr-4">
                      <Lock className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">SSLstrip / SSLstrip+</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">SSL/TLS Downgrade Attack Tool</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Transparently hijacks HTTP traffic and strips HTTPS connections to HTTP. SSLstrip+ adds IPv6
                    support and HSTS bypass capabilities. Classic tool demonstrating SSL stripping attacks.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                      sslstrip -l 8080 -w sslstrip.log
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-red-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-red-500/20 rounded-lg mr-4">
                      <Key className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Evilginx2</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Advanced Phishing Framework</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Man-in-the-middle attack framework for phishing credentials and session cookies. Bypasses 2FA
                    by stealing session tokens. Reverse proxy architecture for real-time interception.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Advanced phishing platform requiring significant setup and infrastructure
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Defense Tools */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Defense & Detection Tools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-emerald-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-emerald-500/20 rounded-lg mr-4">
                      <Network className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Zeek (formerly Bro)</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Network Security Monitor</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Powerful network analysis framework for detecting MitM attacks. Protocol analysis for TLS, DNS,
                    HTTP. Custom scripting for certificate anomalies, SSL stripping, suspicious connections.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                      zeek -i eth0 ssl-detect.zeek
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-emerald-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-emerald-500/20 rounded-lg mr-4">
                      <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Suricata</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">IDS/IPS Engine</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    High-performance IDS/IPS with TLS/SSL inspection capabilities. JA3/JA3S fingerprinting for
                    encrypted traffic analysis. Real-time alerting on certificate validation failures.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                      suricata -c suricata.yaml -i eth0
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-emerald-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-emerald-500/20 rounded-lg mr-4">
                      <Network className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">arpwatch</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">ARP Monitoring Tool</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Monitors Ethernet activity and tracks IP/MAC address pairings. Alerts on ARP table changes
                    indicating potential ARP spoofing attacks. Email notification support.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                      arpwatch -i eth0 -f arp.dat
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-emerald-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-emerald-500/20 rounded-lg mr-4">
                      <Server className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Certificate Transparency Monitors</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Rogue Certificate Detection</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Tools like crt.sh, Facebook CT Monitor, CertSpotter (SSLMate) monitor public Certificate
                    Transparency logs for unauthorized certificates issued to your domains.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Web-based services with API access for automated monitoring and alerting
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-emerald-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-emerald-500/20 rounded-lg mr-4">
                      <Lock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">WireGuard / OpenVPN</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">VPN Protection</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Modern VPN protocols providing encrypted tunnels resistant to MitM attacks. WireGuard offers
                    superior performance (1000+ Mbps) with 4,000 lines of code vs OpenVPN's 400,000+.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Cryptokey routing prevents interception, kernel-level integration (Linux 5.6+)
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-emerald-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-emerald-500/20 rounded-lg mr-4">
                      <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">BGPmon / RIPE RIS</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">BGP Hijacking Detection</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Real-time BGP monitoring services detecting route hijacking and unauthorized prefix announcements.
                    RPKI (Resource Public Key Infrastructure) validates route origin authenticity.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Subscription-based monitoring with real-time alerts for BGP anomalies
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Defense Best Practices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                    Network Level
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                      <span>Enable Dynamic ARP Inspection (DAI) on network switches</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                      <span>Implement DNSSEC for DNS integrity validation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                      <span>Deploy RPKI for BGP route origin validation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                      <span>Use VPN on untrusted networks (public WiFi)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                    Application Level
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                      <span>Enforce HSTS with preload on all web properties</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                      <span>Implement certificate pinning for critical applications</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                      <span>Monitor Certificate Transparency logs for your domains</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                      <span>Use TLS 1.3 exclusively (disable TLS 1.0/1.1)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'references' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                References & Resources
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Authoritative sources, academic research, and official documentation for Man-in-the-Middle attack
                understanding, detection, and mitigation.
              </p>
            </div>

            {/* Official Documentation */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Database className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Official Documentation & Standards
              </h3>
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                <ul className="space-y-4">
                  <li className="flex items-start pb-4 border-b border-gray-200 dark:border-slate-800">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        NIST SP 800-52 Rev 2 - Guidelines for TLS Implementations
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        Official NIST guidance on secure TLS configuration, cipher suite selection, and MitM prevention.
                        Mandates TLS 1.2+ and deprecation of TLS 1.0/1.1.
                      </p>
                      <a
                        href="https://csrc.nist.gov/publications/detail/sp/800-52/rev-2/final"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
                      >
                        https://csrc.nist.gov/publications/detail/sp/800-52/rev-2/final
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start pb-4 border-b border-gray-200 dark:border-slate-800">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        RFC 6797 - HTTP Strict Transport Security (HSTS)
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        IETF standard defining HSTS mechanism to prevent SSL stripping attacks by forcing HTTPS
                        connections. Includes preload list specification.
                      </p>
                      <a
                        href="https://datatracker.ietf.org/doc/html/rfc6797"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
                      >
                        https://datatracker.ietf.org/doc/html/rfc6797
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start pb-4 border-b border-gray-200 dark:border-slate-800">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        RFC 6962 - Certificate Transparency
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        Public framework for monitoring and auditing SSL certificates to detect rogue certificates
                        and compromised CAs. Arose from DigiNotar incident.
                      </p>
                      <a
                        href="https://datatracker.ietf.org/doc/html/rfc6962"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
                      >
                        https://datatracker.ietf.org/doc/html/rfc6962
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start pb-4 border-b border-gray-200 dark:border-slate-800">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">4</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        RFC 8446 - TLS 1.3
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        Latest TLS specification removing downgrade attack vectors, renegotiation vulnerabilities,
                        and weak cipher suites. Mandatory for modern security.
                      </p>
                      <a
                        href="https://datatracker.ietf.org/doc/html/rfc8446"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
                      >
                        https://datatracker.ietf.org/doc/html/rfc8446
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start pb-4 border-b border-gray-200 dark:border-slate-800">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">5</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        OWASP Transport Layer Protection Cheat Sheet
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        Comprehensive guidance on implementing TLS/SSL correctly, including HSTS, certificate
                        pinning, and secure cipher configuration.
                      </p>
                      <a
                        href="https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
                      >
                        OWASP Transport Layer Protection Cheat Sheet
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">6</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        RFC 8205 - BGPsec Protocol Specification
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        BGP security extension providing path validation to prevent route hijacking. Part of
                        RPKI infrastructure for securing internet routing.
                      </p>
                      <a
                        href="https://datatracker.ietf.org/doc/html/rfc8205"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
                      >
                        https://datatracker.ietf.org/doc/html/rfc8205
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* CWE Entries */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                CWE (Common Weakness Enumeration)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">
                    CWE-300: Channel Accessible by Non-Endpoint
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Communication channel accessible by unauthorized endpoints, enabling MitM interception
                  </p>
                  <a
                    href="https://cwe.mitre.org/data/definitions/300.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
                  >
                    View CWE-300 →
                  </a>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">
                    CWE-295: Improper Certificate Validation
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Failure to properly validate SSL/TLS certificates enables MitM with fraudulent certificates
                  </p>
                  <a
                    href="https://cwe.mitre.org/data/definitions/295.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
                  >
                    View CWE-295 →
                  </a>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">
                    CWE-319: Cleartext Transmission of Sensitive Information
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Transmitting sensitive data without encryption allows passive MitM eavesdropping
                  </p>
                  <a
                    href="https://cwe.mitre.org/data/definitions/319.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
                  >
                    View CWE-319 →
                  </a>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">
                    CWE-757: Selection of Less-Secure Algorithm During Negotiation
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Downgrade attacks force use of weak cryptographic algorithms (POODLE, FREAK, Logjam)
                  </p>
                  <a
                    href="https://cwe.mitre.org/data/definitions/757.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
                  >
                    View CWE-757 →
                  </a>
                </div>
              </div>
            </div>

            {/* CVE Examples */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
                Notable CVE Examples
              </h3>
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                <ul className="space-y-4">
                  <li className="flex items-start pb-4 border-b border-gray-200 dark:border-slate-800">
                    <div className="flex-shrink-0">
                      <span className="inline-block px-3 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium mr-4">
                        CVE-2015-2077
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        Lenovo Superfish Vulnerability
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Pre-installed Superfish adware enabled MitM on all HTTPS traffic via self-signed root
                        certificate with same private key across all installations. Affected 750,000 laptops.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start pb-4 border-b border-gray-200 dark:border-slate-800">
                    <div className="flex-shrink-0">
                      <span className="inline-block px-3 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium mr-4">
                        CVE-2014-3566
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        POODLE (Padding Oracle On Downgraded Legacy Encryption)
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        TLS downgrade attack forcing fallback to SSL 3.0, enabling decryption of encrypted traffic.
                        Led to industry-wide SSL 3.0 deprecation.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start pb-4 border-b border-gray-200 dark:border-slate-800">
                    <div className="flex-shrink-0">
                      <span className="inline-block px-3 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium mr-4">
                        CVE-2015-0204
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        FREAK (Factoring RSA Export Keys)
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Downgrade attack forcing use of weak 512-bit export-grade RSA keys. Affected major websites
                        and mobile devices. Factored keys in 7 hours on Amazon EC2.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start pb-4 border-b border-gray-200 dark:border-slate-800">
                    <div className="flex-shrink-0">
                      <span className="inline-block px-3 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium mr-4">
                        CVE-2015-4000
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        Logjam Attack
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Downgrade Diffie-Hellman key exchange to 512-bit, enabling MitM decryption. Affected 8.4%
                        of Alexa Top 1 Million sites. NSA capability for 1024-bit DH estimated.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start pb-4 border-b border-gray-200 dark:border-slate-800">
                    <div className="flex-shrink-0">
                      <span className="inline-block px-3 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium mr-4">
                        CVE-2011-3389
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        BEAST (Browser Exploit Against SSL/TLS)
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Exploited CBC mode vulnerability in TLS 1.0. JavaScript code in browser could decrypt
                        HTTPS cookies. Led to TLS 1.2 adoption and GCM cipher mode.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="inline-block px-3 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium mr-4">
                        CVE-2008-1447
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        Kaminsky DNS Cache Poisoning
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        DNS transaction ID prediction enabling cache poisoning at scale. Affected 70%+ of DNS
                        servers. Led to DNSSEC development and source port randomization.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Academic Research */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Academic Research Papers
              </h3>
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                <ul className="space-y-4">
                  <li className="pb-4 border-b border-gray-200 dark:border-slate-800">
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">
                      "The Security Impact of HTTPS Interception" (2023)
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      Durumeric et al., Stanford/Google. Analysis finding 11% of HTTPS connections intercepted,
                      with 64% of middleboxes weakening security.
                    </p>
                    <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                      Stanford/Google Research
                    </p>
                  </li>
                  <li className="pb-4 border-b border-gray-200 dark:border-slate-800">
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">
                      "BGP Hijacking: A Survey of Recent Attacks" (2022)
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      Hlavacek et al., IEEE Communications Surveys & Tutorials. Documents 200+ BGP hijacking
                      incidents 2017-2021.
                    </p>
                    <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                      IEEE Communications Surveys & Tutorials
                    </p>
                  </li>
                  <li className="pb-4 border-b border-gray-200 dark:border-slate-800">
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">
                      "Certificate Transparency at Scale" (2024)
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      Stark, Sleevi, et al. (Google), USENIX Security. Analysis of 10 billion certificates
                      logged in CT system.
                    </p>
                    <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                      USENIX Security 2024
                    </p>
                  </li>
                  <li className="pb-4 border-b border-gray-200 dark:border-slate-800">
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">
                      "WiFi Network Interception in the Wild" (2023)
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      Vanhoef et al., ACM CCS. Study of 3,000+ public WiFi networks finding 23% vulnerable to MitM.
                    </p>
                    <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                      ACM Conference on Computer and Communications Security
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">
                      "SoK: TLS 1.3 in Practice" (2022)
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      Sy et al., IEEE EuroS&P. Deployment study showing 45% of HTTPS sites using TLS 1.3 as of 2022.
                    </p>
                    <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                      IEEE European Symposium on Security and Privacy
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Practice Platforms */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Code className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Practice Platforms & Training
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">HackTheBox</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Realistic MitM attack scenarios in penetration testing labs. Practice ARP spoofing, SSL
                    stripping, and session hijacking in safe environments.
                  </p>
                  <a href="https://www.hackthebox.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">
                    Visit Platform →
                  </a>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">TryHackMe</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Guided rooms on network attacks including "Network Security" and "Wireshark" modules.
                    Beginner-friendly MitM walkthroughs.
                  </p>
                  <a href="https://tryhackme.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">
                    Visit Platform →
                  </a>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">PentesterLab</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Hands-on exercises for SSL/TLS attacks including certificate validation bypasses and HTTPS
                    interception techniques.
                  </p>
                  <a href="https://pentesterlab.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">
                    Visit Platform →
                  </a>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">SANS NetWars</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Advanced network security challenges including MitM detection and defense. Part of SANS
                    Cyber Aces training program.
                  </p>
                  <a href="https://www.sans.org/cyber-ranges/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">
                    Visit Platform →
                  </a>
                </div>
              </div>
            </div>

            {/* Legal & Ethical */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
                Legal & Ethical Considerations
              </h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 mt-1">⚠️</span>
                  <span>
                    <strong>All MitM attack techniques must only be used on systems you own or have explicit written
                    authorization to test.</strong> Unauthorized interception of communications is a serious crime.
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 mt-1">⚠️</span>
                  <span>
                    <strong>Computer Fraud and Abuse Act (CFAA), 18 U.S.C. § 1030:</strong> Unauthorized access to
                    computer systems, including MitM attacks, carries federal criminal penalties including fines up
                    to $250,000 and imprisonment up to 20 years for repeat offenders.
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 mt-1">⚠️</span>
                  <span>
                    <strong>Wiretap Act, 18 U.S.C. § 2511:</strong> Interception of electronic communications
                    without consent is illegal. MitM attacks intercepting traffic without authorization violate
                    federal wiretapping laws.
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 mt-1">⚠️</span>
                  <span>
                    <strong>Responsible Disclosure:</strong> If you discover vulnerabilities enabling MitM attacks
                    during authorized testing, follow responsible disclosure practices (90-day disclosure window,
                    coordinate with security teams).
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="text-emerald-600 dark:text-emerald-400 mr-3 mt-1">✓</span>
                  <span>
                    <strong>Authorized Use Cases:</strong> Penetration testing with signed contracts, corporate
                    security assessments with written authorization, academic research in isolated lab environments,
                    personal networks for defensive testing.
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Challenge Button */}
      
    </div>
  );
};