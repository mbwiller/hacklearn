import { useState } from 'react';
import { Zap, ArrowLeft, BookOpen, Code, Shield, Database, Server, Activity, Network, AlertTriangle, Cloud } from 'lucide-react';

interface DoSAttacksConceptProps {
  onBack?: () => void;
}

export const DoSAttacksConcept = ({ onBack }: DoSAttacksConceptProps = {}) => {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white py-16">
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
              <Zap className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2">Denial of Service (DoS/DDoS) Attacks</h1>
              <p className="text-xl text-white/90">
                Overwhelming systems to make them unavailable
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <span className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
              Intermediate
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
              150 points
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
              MITRE ATT&CK: T1498, T1499
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
                Understanding DoS/DDoS Attacks
              </h2>
              <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Denial of Service (DoS) attacks overwhelm systems with excessive requests, making them unavailable to
                  legitimate users. Distributed Denial of Service (DDoS) attacks amplify this by coordinating attacks
                  from multiple sources—often hundreds of thousands of compromised devices forming botnets. Modern DDoS
                  attacks can generate traffic exceeding 3+ Terabits per second (Tbps), far surpassing most
                  organizations' bandwidth capacity.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  DoS/DDoS attacks target different layers of the network stack: Layer 3/4 (network/transport) attacks
                  flood bandwidth with volumetric traffic, while Layer 7 (application) attacks exhaust server resources
                  with seemingly legitimate requests. The 2016 Mirai botnet attack on Dyn DNS demonstrated the
                  catastrophic impact—taking down major websites including Twitter, Netflix, and Reddit by enslaving
                  600,000+ IoT devices. As of 2024, DDoS attacks have increased 214% year-over-year, with ransom DDoS
                  becoming a major threat vector demanding cryptocurrency payments.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
                    <Server className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Layer 3/4 Attacks</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      SYN floods, UDP floods, amplification attacks targeting network bandwidth and connection tables
                    </p>
                  </div>
                  <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-6">
                    <Activity className="w-8 h-8 text-pink-600 dark:text-pink-400 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Layer 7 Attacks</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      HTTP floods, Slowloris, application resource exhaustion with legitimate-looking requests
                    </p>
                  </div>
                  <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-6">
                    <Network className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Botnet Coordination</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Mirai variants enslaving IoT devices, DDoS-as-a-Service marketplaces, command and control infrastructure
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Attacks */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Major DDoS Attacks (2020-2024)
              </h2>
              <div className="space-y-6">
                {/* Attack 1: Microsoft Azure */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Microsoft Azure DDoS Attack (October 2021)
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                          Largest Volumetric Attack
                        </span>
                        <span className="px-3 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                          3.47 Tbps Peak
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Attack Type & Scale</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Multi-vector UDP reflection/amplification attack combining DNS, CLDAP, SSDP, NTP, memcached, and
                        CHARGEN protocols. Peak traffic: 3.47 Tbps, 340+ million packets per second from 10,000 sources.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Impact & Duration</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Targeted Azure customer in Europe. Attack lasted 15 minutes with multiple peaks. Azure DDoS
                        Protection absorbed attack; customer experienced zero downtime.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Financial Cost</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        $12+ million in Microsoft infrastructure and mitigation costs (absorbed by Azure Shield)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Outcome & Significance</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Set new record for largest DDoS attack. Microsoft published detailed technical analysis.
                        Demonstrated effectiveness of cloud-scale DDoS protection and need for multi-terabit capacity.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Attack 2: Google Cloud */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Google Cloud HTTP Flood (September 2021)
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                          Largest HTTP Flood
                        </span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                          46M RPS
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Attack Vector</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Multi-vector HTTPS flood from compromised cloud infrastructure (NOT IoT). 5,256 source IPs
                        across 132 countries. Peak: 46 million requests per second—10,000x normal traffic for target.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Impact</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Targeted Google Cloud customer. Attack lasted 69 minutes. Completely mitigated by Cloud Armor
                        with zero customer downtime. Largest Layer 7 attack recorded at the time.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Financial Cost</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Estimated $8 million in detection/mitigation infrastructure costs
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Outcome</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Demonstrated evolution of botnets: compromised cloud VMs instead of IoT devices. Led to enhanced
                        Cloud Armor rules and HTTP/2 flood protection.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Attack 3: AWS */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        AWS CLDAP Reflection Attack (February 2020)
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                          Amplification Attack
                        </span>
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">
                          2.3 Tbps
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Attack Mechanism</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        CLDAP (Connectionless Lightweight Directory Access Protocol) reflection attack with 56-70x
                        amplification factor. 27,000+ compromised CLDAP servers weaponized. Peak: 2.3 Tbps.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Impact</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Targeted AWS infrastructure and customers. Attack lasted 3 days with intermittent peaks. AWS
                        Shield mitigated most traffic, some customers experienced service degradation.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Financial Cost</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Estimated $5-10 million in mitigation costs and customer compensation
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Outcome</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        AWS improved Shield Advanced detection. Led to industry-wide CLDAP server hardening and port
                        blocking. Demonstrated continued evolution of amplification attack vectors.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Attack 4: Ransom DDoS */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Ransom DDoS Campaigns (2023-2024 Ongoing)
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                          Extortion
                        </span>
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium">
                          Cryptocurrency Ransom
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Attack Pattern</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Multi-stage extortion: Initial demonstration attack (100-500 Gbps), followed by ransom demand
                        (typically 5-50 Bitcoin). Threats of 1+ Tbps attacks if payment not received. Targets: financial
                        institutions, healthcare, gaming platforms.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Impact Statistics</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        37% of targeted organizations paid ransom (Cloudflare 2024). Average payment: $120,000 in
                        cryptocurrency. 73% of those who paid were attacked again within 6 months.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Financial Impact</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Industry-wide losses exceeding $500 million annually from ransom payments and business disruption
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Law Enforcement Response</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        FBI/CISA issued joint advisory AA24-131A. Groups often use false attribution (claiming to be
                        "Fancy Bear," "Lazarus Group"). FBI recommends: Do not pay, implement DDoS protection, report
                        to IC3.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Attack Types */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                DDoS Attack Techniques
              </h2>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Layer 3/4 Attacks (Network/Transport)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                    <div className="flex items-center mb-4">
                      <Network className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">SYN Flood</h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Exploits TCP three-way handshake. Sends SYN packets with spoofed source IPs. Server allocates
                      resources waiting for ACK that never arrives. Exhausts connection table (typical limit: 128-1024
                      half-open connections).
                    </p>
                    <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">MITRE ATT&CK: T1498.001</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Mitigation: SYN cookies, rate limiting, increased backlog queue
                      </p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                    <div className="flex items-center mb-4">
                      <Server className="w-6 h-6 text-pink-600 dark:text-pink-400 mr-3" />
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">DNS Amplification</h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Exploits open DNS resolvers. Sends DNS queries with spoofed source (victim IP). Amplification
                      factor: 28-54x typical, up to 179x with DNSSEC. Query: 60 bytes → Response: 3,000+ bytes.
                    </p>
                    <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Amplification: 28-179x</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Mitigation: Response Rate Limiting (RRL), DNSSEC validation
                      </p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                    <div className="flex items-center mb-4">
                      <Activity className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3" />
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">NTP Amplification</h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Exploits NTP monlist command (returns 600 most recent clients). Amplification factor: 556.9x.
                      Query: 234 bytes → Response: 130,000+ bytes. Largely mitigated (monlist disabled in NTP 4.2.7+).
                    </p>
                    <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Amplification: 556.9x</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Mitigation: Disable monlist, restrict queries, update NTP
                      </p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                    <div className="flex items-center mb-4">
                      <Database className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Memcached Amplification</h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Exploits exposed memcached servers (port 11211). Amplification factor: 51,000x. Query: 15 bytes
                      → Response: 750 KB. Used in GitHub 1.35 Tbps attack (2018). Now rare due to port blocking.
                    </p>
                    <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Amplification: 51,000x</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Mitigation: Bind to localhost only, firewall rules, ISP port blocking
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Layer 7 Attacks (Application)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                    <div className="flex items-center mb-4">
                      <Cloud className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">HTTP Flood</h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Mimics legitimate HTTP GET/POST requests. Harder to detect (looks like real traffic). Targets
                      resource-intensive pages (search, login, database queries). Can bypass volumetric defenses.
                      Modern variant: HTTP/2 Rapid Reset (CVE-2023-44487).
                    </p>
                    <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Record: 71M rps (2024)</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Mitigation: Rate limiting, CAPTCHA challenges, JavaScript validation
                      </p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                    <div className="flex items-center mb-4">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-3" />
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Slowloris</h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Opens multiple HTTP connections, sends partial requests. Keeps connections open by sending headers
                      slowly. Exhausts connection pool without high bandwidth. Effective against Apache, ineffective
                      against Nginx.
                    </p>
                    <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Low-bandwidth attack</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Mitigation: Connection timeouts, reverse proxy, mod_reqtimeout
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Takeaways */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Key Takeaways
              </h2>
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
                <ul className="space-y-4">
                  {[
                    'DDoS attacks increased 214% YoY (Cloudflare Q4 2024); average attack: 12 minutes duration',
                    'Record attacks: 3.47 Tbps volumetric (Microsoft Azure 2021), 71M rps HTTP (Cloudflare 2024)',
                    'Layer 3/4 attacks flood bandwidth with amplification (DNS 28-179x, NTP 556x, memcached 51,000x)',
                    'Layer 7 attacks exhaust application resources with legitimate-looking HTTP/HTTPS requests',
                    'Mirai botnet variants continue evolving: 330,000+ IoT devices enslaved in modern campaigns',
                    'Ransom DDoS growing threat: $500M+ annual losses, 37% pay ransom, 73% attacked again',
                    'Cloud-based mitigation essential: AWS Shield (96 Tbps), Cloudflare (167 Tbps), Akamai (17 Tbps)',
                    'HTTP/2 Rapid Reset (CVE-2023-44487) enabled 201M rps attacks, patched October 2023',
                    'Defense requires multi-layer approach: rate limiting, traffic shaping, WAF, CDN, cloud scrubbing',
                    'DDoS-as-a-Service marketplaces offer attacks for $10-$300/month (100-400 Gbps capability)'
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
                Hands-On DoS/DDoS Analysis & Defense
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Learn to implement rate limiting, detect attack patterns, and configure defenses against DoS/DDoS
                attacks. All attack demonstrations are for educational purposes only and must only be used in authorized
                testing environments.
              </p>
            </div>

            {/* Lab 1: Rate Limiting */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Lab 1: Token Bucket Rate Limiting
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Implement a token bucket rate limiter to prevent resource exhaustion from excessive requests. This is
                the primary defense against application-layer DoS attacks.
              </p>

              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                  SECURE CODE - Production-Ready Rate Limiter
                </p>
                <div className="bg-gray-900 dark:bg-slate-950 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100"><code>{`import time
from collections import defaultdict

class TokenBucket:
    """Token bucket rate limiter for DoS prevention"""

    def __init__(self, capacity: int, refill_rate: float):
        """
        Args:
            capacity: Maximum burst size (tokens)
            refill_rate: Tokens added per second
        """
        self.capacity = capacity
        self.refill_rate = refill_rate
        self.buckets = defaultdict(
            lambda: {"tokens": capacity, "last_refill": time.time()}
        )

    def allow_request(self, client_id: str) -> bool:
        """Check if request is allowed for client"""
        bucket = self.buckets[client_id]

        # Refill tokens based on time elapsed
        now = time.time()
        elapsed = now - bucket["last_refill"]
        tokens_to_add = elapsed * self.refill_rate
        bucket["tokens"] = min(self.capacity, bucket["tokens"] + tokens_to_add)
        bucket["last_refill"] = now

        # Check if token available
        if bucket["tokens"] >= 1:
            bucket["tokens"] -= 1
            return True

        return False

# Usage example
limiter = TokenBucket(capacity=10, refill_rate=1.0)
# 10 req burst, 1 req/sec sustained

for i in range(15):
    client_ip = "192.168.1.50"
    allowed = limiter.allow_request(client_ip)

    status = "ALLOWED" if allowed else "BLOCKED (rate limit)"
    print(f"Request {i+1}: {status}")

    time.sleep(0.5)  # 500ms between requests`}</code></pre>
                </div>
              </div>
            </div>

            {/* Lab 2: HTTP Flood Detection */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Lab 2: HTTP Flood Detection in Logs
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Analyze web server access logs to detect HTTP flood patterns. Identifies IPs making excessive requests
                within time windows.
              </p>

              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                  DETECTION CODE - Log Analysis for HTTP Floods
                </p>
                <div className="bg-gray-900 dark:bg-slate-950 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100"><code>{`import re
from collections import defaultdict
from datetime import datetime

def analyze_access_log(log_file: str, time_window: int = 60, threshold: int = 100):
    """
    Detect HTTP floods in access logs

    Args:
        log_file: Path to access.log
        time_window: Time window in seconds (default: 60)
        threshold: Requests per window to flag (default: 100)
    """

    # Parse log entries (Apache/Nginx combined format)
    entries = []
    with open(log_file, 'r') as f:
        for line in f:
            # Example: 192.168.1.1 - - [01/Jan/2024:12:00:00 +0000] "GET / HTTP/1.1" 200 1234
            match = re.match(r'(\\S+) .* \\[(.*?)\\] "(.*?)" (\\d+) (\\d+)', line)
            if match:
                ip = match.group(1)
                timestamp_str = match.group(2)
                request = match.group(3)
                status = int(match.group(4))

                # Parse timestamp
                timestamp = datetime.strptime(timestamp_str, '%d/%b/%Y:%H:%M:%S %z')
                entries.append((ip, timestamp, request, status))

    # Detect floods: >threshold requests from single IP in time_window
    ip_windows = defaultdict(list)

    for ip, timestamp, request, status in entries:
        ip_windows[ip].append(timestamp)

    # Check each IP for flood patterns
    flood_ips = []
    for ip, timestamps in ip_windows.items():
        timestamps.sort()
        for i, ts in enumerate(timestamps):
            # Count requests in time window
            count = sum(1 for t in timestamps[i:]
                       if (t - ts).total_seconds() <= time_window)

            if count > threshold:
                flood_ips.append((ip, count, ts))
                break

    # Display results
    print(f"HTTP Flood Detection Report")
    print(f"="*60)
    print(f"Analyzed {len(entries)} log entries")
    print(f"Threshold: {threshold} requests per {time_window} seconds\\n")

    if flood_ips:
        print(f"[!] DETECTED {len(flood_ips)} POTENTIAL FLOOD ATTACKS:\\n")
        for ip, count, timestamp in flood_ips:
            print(f"  IP: {ip}")
            print(f"  Requests: {count} in {time_window}s window")
            print(f"  First detected: {timestamp}")
            print(f"  Recommended action: Block {ip} at firewall\\n")
    else:
        print("[+] No flood patterns detected")

    return flood_ips

# Example usage (create sample log file first)
# flood_ips = analyze_access_log('/var/log/nginx/access.log')

# Simulated output:
print("Example: Analyzing sample access log...")
print("="*60)
print("[!] DETECTED 2 POTENTIAL FLOOD ATTACKS:")
print("")
print("  IP: 203.0.113.45")
print("  Requests: 523 in 60s window")
print("  First detected: 2024-01-15 14:23:11")
print("  Recommended action: Block 203.0.113.45 at firewall")
print("")
print("  IP: 198.51.100.89")
print("  Requests: 312 in 60s window")
print("  First detected: 2024-01-15 14:25:33")
print("  Recommended action: Block 198.51.100.89 at firewall")`}</code></pre>
                </div>
              </div>
            </div>

            {/* Lab 3: DNS Amplification Calculator */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Server className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Lab 3: DNS Amplification Factor Demonstration
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Measure DNS response sizes to understand amplification potential. This demonstrates why open DNS
                resolvers are dangerous and should be secured.
              </p>

              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  EDUCATIONAL CODE - DNS Amplification Measurement
                </p>
                <div className="bg-gray-900 dark:bg-slate-950 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100"><code>{`import socket
import struct

def calculate_dns_amplification():
    """
    Measure DNS amplification factor
    Educational demonstration of why DNS reflection is dangerous
    """

    # Construct DNS query for TXT records (often large)
    # Transaction ID
    query = b'\\xaa\\xaa'
    # Flags: standard query
    query += b'\\x01\\x00'
    # Questions: 1, Answer/Authority/Additional RRs: 0
    query += b'\\x00\\x01\\x00\\x00\\x00\\x00\\x00\\x00'

    # Query: TXT record for example.com
    # 7 bytes: "example", 3 bytes: "com", 1 byte: null terminator
    query += b'\\x07example\\x03com\\x00'
    # Type: TXT (16), Class: IN (1)
    query += b'\\x00\\x10\\x00\\x01'

    # Send to public DNS resolver (educational purpose)
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.settimeout(2)

    try:
        # Query Google's DNS
        sock.sendto(query, ('8.8.8.8', 53))
        response, _ = sock.recvfrom(4096)

        query_size = len(query)
        response_size = len(response)
        amplification = response_size / query_size

        print(f"DNS Amplification Analysis")
        print(f"="*60)
        print(f"Query size:       {query_size} bytes")
        print(f"Response size:    {response_size} bytes")
        print(f"Amplification:    {amplification:.1f}x")
        print(f"")
        print(f"Attack Scenario:")
        print(f"  Attacker sends:  1 MB of DNS queries (spoofed source)")
        print(f"  Victim receives: {amplification:.1f} MB of DNS responses")
        print(f"")
        print(f"[!] This is why open DNS resolvers must be secured!")
        print(f"    Defense: Implement Response Rate Limiting (RRL)")

    except socket.timeout:
        print("DNS query timeout")
    finally:
        sock.close()

calculate_dns_amplification()`}</code></pre>
                </div>
              </div>
            </div>

            {/* Lab 4: SYN Flood Defense */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Network className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Lab 4: Configuring SYN Cookies Defense
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Configure Linux kernel parameters to defend against SYN flood attacks using SYN cookies and increased
                backlog queues.
              </p>

              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                  SECURE CONFIGURATION - Linux Kernel Hardening
                </p>
                <div className="bg-gray-900 dark:bg-slate-950 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100"><code>{`# /etc/sysctl.conf - SYN Flood Protection

# Enable SYN cookies (protects against SYN floods)
net.ipv4.tcp_syncookies=1

# Increase SYN backlog queue
net.ipv4.tcp_max_syn_backlog=4096

# Reduce SYN-ACK retries (faster timeout)
net.ipv4.tcp_synack_retries=2

# Reduce SYN retries
net.ipv4.tcp_syn_retries=3

# Enable reverse path filtering (prevent IP spoofing)
net.ipv4.conf.all.rp_filter=1
net.ipv4.conf.default.rp_filter=1

# Ignore ICMP redirects (prevent MITM)
net.ipv4.conf.all.accept_redirects=0
net.ipv4.conf.default.accept_redirects=0

# Ignore source-routed packets
net.ipv4.conf.all.accept_source_route=0
net.ipv4.conf.default.accept_source_route=0

# Log suspicious packets
net.ipv4.conf.all.log_martians=1

# Apply changes:
# sudo sysctl -p

# Verify SYN cookies enabled:
# sysctl net.ipv4.tcp_syncookies
# Expected output: net.ipv4.tcp_syncookies = 1`}</code></pre>
                </div>
              </div>
            </div>

            {/* Lab 5: Nginx Rate Limiting */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Cloud className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Lab 5: Nginx Rate Limiting Configuration
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Configure Nginx rate limiting to protect against HTTP floods. Implements both request rate limits and
                concurrent connection limits.
              </p>

              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                  SECURE CONFIGURATION - Nginx Rate Limiting
                </p>
                <div className="bg-gray-900 dark:bg-slate-950 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100"><code>{`# nginx.conf - DoS Protection Configuration

http {
    # Define rate limit zones
    # Zone 'one': 10MB memory, tracks by IP, 10 req/sec
    limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;

    # Zone 'api': 10MB memory, 30 req/sec for API endpoints
    limit_req_zone $binary_remote_addr zone=api:10m rate=30r/s;

    # Connection limit: max 10 concurrent connections per IP
    limit_conn_zone $binary_remote_addr zone=addr:10m;

    server {
        listen 443 ssl http2;
        server_name example.com;

        # Global connection limit
        limit_conn addr 10;

        # Main site rate limit (10 req/sec, burst 20)
        location / {
            limit_req zone=one burst=20 nodelay;
            limit_req_status 429;  # Return 429 Too Many Requests

            root /var/www/html;
            index index.html;
        }

        # API endpoints (higher limit, strict)
        location /api/ {
            limit_req zone=api burst=50 nodelay;
            limit_req_status 429;

            proxy_pass http://backend;
        }

        # Custom 429 error page
        error_page 429 /429.html;
        location = /429.html {
            root /var/www/errors;
            internal;
        }
    }
}

# iptables firewall rules for additional protection
# Block IPs making >100 connections in 60 seconds

# sudo iptables -A INPUT -p tcp --dport 80 -m state --state NEW \\
#   -m recent --name http --set
# sudo iptables -A INPUT -p tcp --dport 80 -m state --state NEW \\
#   -m recent --name http --update --seconds 60 --hitcount 100 \\
#   -j DROP`}</code></pre>
                </div>
              </div>
            </div>

            {/* Interactive Notebook Link */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
              <div className="flex items-center mb-4">
                <Code className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Interactive Jupyter Notebook
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Practice DoS/DDoS analysis and defense techniques with executable code examples
                  </p>
                </div>
              </div>
              <a
                href="/notebooks/18-dos-attacks.ipynb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all"
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
                DoS/DDoS Tools & Mitigation
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Comprehensive toolkit for understanding, testing, and defending against Denial of Service attacks.
                Attack tools should only be used in authorized penetration testing environments with proper legal
                authorization.
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
                      <Activity className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">hping3</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">TCP/IP Packet Crafting Tool</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Command-line TCP/IP packet assembler/analyzer. Can perform SYN floods, UDP floods, ICMP floods
                    for testing network resilience. Supports various packet manipulation techniques.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                      hping3 -S -p 80 --flood target.com
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-red-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-red-500/20 rounded-lg mr-4">
                      <Network className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">LOIC / HOIC</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Low/High Orbit Ion Cannon</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Open-source network stress testing tools. LOIC performs TCP/UDP/HTTP floods. HOIC adds HTTP/HTTPS
                    support with randomization. Historical use by Anonymous hacktivist group.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      GUI-based stress testing with adjustable threads and protocols
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-red-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-red-500/20 rounded-lg mr-4">
                      <Server className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Slowloris</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Low-Bandwidth DoS Tool</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Perl-based slow HTTP DoS tool. Opens multiple connections sending partial HTTP headers slowly.
                    Exhausts web server connection pools with minimal bandwidth. Effective against Apache.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                      perl slowloris.pl -dns target.com -port 80 -timeout 30
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-red-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-red-500/20 rounded-lg mr-4">
                      <Cloud className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Mirai Botnet (Research)</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">IoT Botnet Framework</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Open-source IoT botnet code (2016 leak). Scans for devices with default credentials, enslaves
                    routers/cameras/DVRs. Source code study reveals botnet operation mechanics. Variants still active.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Educational study of botnet C2 architecture, infection vectors, DDoS capabilities
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-red-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-red-500/20 rounded-lg mr-4">
                      <Zap className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">GoldenEye</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">HTTP DoS Tool</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Python-based HTTP DoS tool. Sends legitimate-looking requests to exhaust server resources. Targets
                    resource-intensive pages. Randomizes User-Agent and headers to evade detection.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                      python goldeneye.py https://target.com -w 500 -s 100
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-red-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-red-500/20 rounded-lg mr-4">
                      <Database className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">R.U.D.Y.</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">R U Dead Yet?</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Slow POST attack tool. Sends form data byte-by-byte, keeping connections open indefinitely.
                    Targets web applications with POST upload handlers. Low-bandwidth, high-impact.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Sends POST data at 1 byte per 10 seconds, exhausting server resources
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Defense Tools */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Defense & Mitigation Solutions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-emerald-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-emerald-500/20 rounded-lg mr-4">
                      <Cloud className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Cloudflare DDoS Protection</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">167 Tbps Network Capacity</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Anycast network with global scrubbing centers. Automatic attack detection and mitigation. Unmetered
                    DDoS protection on all plans. Magic Transit for network-layer protection. 330+ PoPs globally.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Free tier available; Pro $20/mo; Enterprise custom pricing
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-emerald-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-emerald-500/20 rounded-lg mr-4">
                      <Server className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">AWS Shield</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">96 Tbps Mitigation Capacity</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Standard: Free automatic protection for all AWS customers (Layer 3/4). Advanced: $3,000/month +
                    data transfer fees. Includes DDoS Response Team (DRT), cost protection, real-time notifications.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Integration with AWS WAF for Layer 7 protection
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-emerald-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-emerald-500/20 rounded-lg mr-4">
                      <Network className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Akamai Prolexic</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">17 Tbps Scrubbing Capacity</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Scrubbing center-based mitigation. 24/7 Security Operations Center (SOC). Always-on or on-demand
                    deployment. BGP-based traffic diversion. Custom mitigation policies. Enterprise-grade solution.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Enterprise pricing: $5,000-$50,000/month depending on bandwidth
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-emerald-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-emerald-500/20 rounded-lg mr-4">
                      <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Suricata IPS</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Open-Source Intrusion Prevention</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    High-performance IDS/IPS engine. Multi-threaded architecture. DDoS detection rules for SYN floods,
                    UDP floods, HTTP floods. Real-time traffic analysis and blocking capabilities.
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
                      <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Fail2ban</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Log-Based Intrusion Prevention</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Monitors log files and bans IPs showing malicious behavior. Configurable thresholds for request
                    rates. Integrates with iptables/firewalld. Effective against application-layer DoS attacks.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Protects SSH, web servers, email servers from brute force and floods
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-emerald-500/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-emerald-500/20 rounded-lg mr-4">
                      <Database className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">ModSecurity WAF</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Open-Source Web Application Firewall</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    OWASP Core Rule Set (CRS) provides DoS protection rules. Rate limiting, request size limits, slow
                    attack detection. Integrates with Apache, Nginx, IIS. Customizable rule sets.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Free and open-source; enterprise support available via Trustwave
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Defense Best Practices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                    Infrastructure Level
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                      <span>Deploy cloud-based DDoS mitigation (Cloudflare, AWS Shield, Akamai)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                      <span>Use anycast networks to distribute attack traffic globally</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                      <span>Implement BGP blackholing for volumetric attacks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                      <span>Over-provision bandwidth (3-5x normal peak traffic)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Network className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                    Application Level
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                      <span>Configure rate limiting on all public endpoints (10-100 req/sec per IP)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                      <span>Enable SYN cookies and increase TCP backlog queues</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                      <span>Implement connection timeouts and request size limits</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                      <span>Deploy WAF with OWASP CRS for Layer 7 protection</span>
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
                Official documentation, research papers, and authoritative sources for DoS/DDoS attack understanding
                and mitigation.
              </p>
            </div>

            {/* Official Documentation */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Database className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Official Standards & Documentation
              </h3>
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                <ul className="space-y-4">
                  {[
                    {
                      title: "NIST SP 800-83 Rev 1 - Guide to Malware Incident Prevention",
                      description: "Includes DDoS as malware-driven attack vector. Recommends network segmentation, egress filtering, and incident response plans for botnet-based attacks.",
                      url: "https://csrc.nist.gov/publications/detail/sp/800-83/rev-1/final"
                    },
                    {
                      title: "MITRE ATT&CK: T1498 - Network Denial of Service",
                      description: "Catalogs DoS techniques including direct network floods (T1498.001) and reflection amplification (T1498.002). Includes real-world attack patterns and mitigations.",
                      url: "https://attack.mitre.org/techniques/T1498/"
                    },
                    {
                      title: "OWASP API Security Top 10 - API4:2023 Unrestricted Resource Consumption",
                      description: "Addresses API-based DoS attacks from unrestricted resource consumption. Covers rate limiting failures, lack of pagination, and resource allocation vulnerabilities.",
                      url: "https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/"
                    },
                    {
                      title: "RFC 4987 - TCP SYN Flooding Attacks and Common Mitigations",
                      description: "IETF standard documenting SYN flood attack mechanisms and defense techniques including SYN cookies, increased backlog queues, and filtering strategies.",
                      url: "https://datatracker.ietf.org/doc/html/rfc4987"
                    },
                    {
                      title: "CISA/FBI Joint Advisory - Ransom DDoS Campaigns",
                      description: "AA24-131A: Official guidance on responding to Ransom DDoS (RDDoS) extortion campaigns. Recommends: do not pay, implement DDoS protection, report to IC3.",
                      url: "https://www.cisa.gov/news-events/cybersecurity-advisories"
                    }
                  ].map((ref, index) => (
                    <li key={index} className="flex items-start pb-4 border-b border-gray-200 dark:border-slate-800 last:border-0">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">{ref.title}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{ref.description}</p>
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
                        >
                          {ref.url.split('/').slice(0, 3).join('/')}... →
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CVE Examples */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
                Notable CVE Examples
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    cve: "CVE-2023-44487",
                    title: "HTTP/2 Rapid Reset",
                    description: "Enabled 201 million rps attacks by rapidly opening and resetting HTTP/2 streams. Affected Cloudflare, Google, AWS, nginx. Patched October 2023.",
                    severity: "CVSS 7.5 (High)"
                  },
                  {
                    cve: "CVE-2024-3094",
                    title: "XZ Utils Backdoor",
                    description: "Supply chain compromise enabling potential botnet enrollment. SSH connection manipulation could add compromised systems to DDoS infrastructure.",
                    severity: "CVSS 10.0 (Critical)"
                  },
                  {
                    cve: "CVE-2013-5211",
                    title: "NTP monlist Amplification",
                    description: "NTP monlist command enabled 556.9x amplification attacks. Affected millions of NTP servers. Fixed in NTP 4.2.7+ (monlist disabled).",
                    severity: "CVSS 5.0 (Medium)"
                  },
                  {
                    cve: "CVE-2018-1000115",
                    title: "Memcached Amplification",
                    description: "Exposed memcached servers enabled 51,000x amplification. Used in GitHub 1.35 Tbps attack. Mitigated by binding to localhost and port blocking.",
                    severity: "CVSS 7.5 (High)"
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-3 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                        {item.cve}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{item.severity}</span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Reports */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Industry Research & Reports
              </h3>
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                <ul className="space-y-4">
                  {[
                    {
                      title: "Cloudflare DDoS Threat Report Q4 2024",
                      source: "Cloudflare",
                      findings: "214% YoY increase in HTTP DDoS attacks. Average duration: 12 minutes. Largest attack: 71M rps. Ransom DDoS up 67%."
                    },
                    {
                      title: "Akamai State of the Internet 2024",
                      source: "Akamai Technologies",
                      findings: "15% of attacks target gaming. Median: 5 Gbps. Maximum observed: 1.44 Tbps (financial services). 52% last under 30 minutes."
                    },
                    {
                      title: "Arbor Networks ATLAS Report 2023",
                      source: "NETSCOUT Arbor",
                      findings: "13.7M DDoS attacks globally. Multi-vector attacks +25%. Largest volumetric: 800 Gbps. Ransom DDoS major threat."
                    },
                    {
                      title: "Microsoft Azure DDoS Protection Report 2021",
                      source: "Microsoft",
                      findings: "3.47 Tbps attack (largest recorded). Multi-vector UDP reflection. 340M pps. 15 minute duration. Technical analysis published."
                    },
                    {
                      title: "Google Cloud DDoS Analysis 2021",
                      source: "Google",
                      findings: "46M rps HTTPS flood (largest Layer 7). Compromised cloud VMs (not IoT). 5,256 sources, 132 countries. 69 minutes."
                    }
                  ].map((report, index) => (
                    <li key={index} className="pb-4 border-b border-gray-200 dark:border-slate-800 last:border-0">
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">{report.title}</p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-2">{report.source}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{report.findings}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Practice Platforms */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Code className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                Practice & Training Platforms
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "HackTheBox",
                    description: "DoS/DDoS scenarios in penetration testing labs. Practice stress testing and mitigation strategies in safe environments.",
                    url: "https://www.hackthebox.com"
                  },
                  {
                    name: "TryHackMe",
                    description: "Guided rooms on DoS attacks including 'Network Security' and 'Wireshark' modules. Beginner-friendly walkthroughs.",
                    url: "https://tryhackme.com"
                  },
                  {
                    name: "SANS Cyber Ranges",
                    description: "Advanced network security challenges including DDoS detection and defense. Part of SANS NetWars program.",
                    url: "https://www.sans.org/cyber-ranges/"
                  },
                  {
                    name: "AWS DDoS Simulation",
                    description: "AWS Shield testing using AWS-approved simulation tools. Practice mitigation strategies with AWS DDoS Response Team.",
                    url: "https://aws.amazon.com/shield/"
                  }
                ].map((platform, index) => (
                  <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800 transition-colors">
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">{platform.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{platform.description}</p>
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
                    >
                      Visit Platform →
                    </a>
                  </div>
                ))}
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
                    <strong>Unauthorized DoS/DDoS attacks are federal crimes.</strong> Only perform stress testing on
                    systems you own or have explicit written authorization to test. Unauthorized attacks violate Computer
                    Fraud and Abuse Act (CFAA), 18 U.S.C. § 1030.
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 mt-1">⚠️</span>
                  <span>
                    <strong>Penalties:</strong> Up to $250,000 fine and 20 years imprisonment for repeat offenders.
                    Additional civil liability for damages caused to victims.
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 mt-1">⚠️</span>
                  <span>
                    <strong>DDoS-as-a-Service is illegal.</strong> FBI Operation PowerOFF (2024) seized major booter/stresser
                    services. Using or operating these services results in criminal prosecution.
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="text-emerald-600 dark:text-emerald-400 mr-3 mt-1">✓</span>
                  <span>
                    <strong>Authorized Use Cases:</strong> Penetration testing with signed contracts, load testing your
                    own infrastructure, academic research in isolated labs, defensive security testing with authorization.
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="text-emerald-600 dark:text-emerald-400 mr-3 mt-1">✓</span>
                  <span>
                    <strong>Reporting Ransom DDoS:</strong> Do NOT pay ransom. Report to FBI IC3 (ic3.gov), implement DDoS
                    protection immediately, coordinate with ISP and cloud provider.
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