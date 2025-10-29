import { useState } from 'react';
import {
  Shield, Lock, Unlock, Target, AlertTriangle, Terminal, BookOpen, Mail,
  Phone, MessageSquare, Users, Brain, Eye, Database, Globe, ArrowLeft
} from 'lucide-react';

const tabs = [
  { id: 'theory', name: 'Theory', icon: BookOpen },
  { id: 'lab', name: 'Lab', icon: Terminal },
  { id: 'tools', name: 'Tools', icon: Shield },
  { id: 'references', name: 'References', icon: Brain }
];

interface SocialEngineeringConceptProps {
  onBack?: () => void;
}

export const SocialEngineeringConcept = ({ onBack }: SocialEngineeringConceptProps = {}) => {
  const [activeTab, setActiveTab] = useState('theory');

  const TheoryTab = () => (
    <div className="space-y-8">
      {/* Introduction */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          What is Social Engineering & Phishing?
        </h2>
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 space-y-4 border border-slate-200 dark:border-slate-700">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Social engineering is the psychological manipulation of people into performing actions or divulging confidential information.
            Rather than exploiting technical vulnerabilities, attackers exploit human psychology, trust, and cognitive biases to bypass security controls.
            Phishing—the most common form of social engineering—uses fraudulent emails, websites, or messages to trick victims into revealing
            credentials, financial information, or installing malware.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Social engineering attacks are responsible for 36% of all data breaches (Verizon DBIR 2023) and cost organizations $2.7 billion annually
            through Business Email Compromise (BEC) alone (FBI IC3 2022). These attacks succeed because they target the weakest link in security:
            human behavior. No amount of technical security can protect against users who voluntarily hand over their passwords or wire transfer money
            to attackers impersonating executives.
          </p>
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-sm font-semibold mb-2 text-slate-900 dark:text-white">
              FBI IC3 Classification: Business Email Compromise (BEC)
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              The FBI Internet Crime Complaint Center classifies social engineering as the most financially damaging cybercrime type, with BEC attacks
              causing over $2.7 billion in losses in 2022 alone—more than ransomware, data breaches, and identity theft combined.
            </p>
          </div>
        </div>
      </section>

      {/* Cialdini's 6 Principles */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Cialdini's 6 Principles of Influence</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Dr. Robert Cialdini's research identified six universal principles of persuasion that social engineers exploit to manipulate victims:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800/50 border border-purple-200 dark:border-purple-500/50 rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Authority
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              People obey authority figures. Attackers impersonate executives, IT support, law enforcement, or use professional branding, credentials, and uniforms.
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 font-mono text-sm border border-slate-200 dark:border-slate-700">
              <code className="text-green-600 dark:text-green-400">
                "This is the CEO. I need you to transfer $50,000 urgently for an acquisition."
              </code>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-purple-200 dark:border-purple-500/50 rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              Scarcity
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              Rare opportunities are more valuable. Attackers create urgency with "limited time offers," "account closure warnings," or exclusive access claims.
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 font-mono text-sm border border-slate-200 dark:border-slate-700">
              <code className="text-red-600 dark:text-red-400">
                "Your account will be closed in 24 hours unless you verify your information immediately."
              </code>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-purple-200 dark:border-purple-500/50 rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Social Proof
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              People follow others' behavior. Attackers claim "your colleagues already completed this," use fake testimonials, or exploit FOMO (Fear of Missing Out).
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 font-mono text-sm border border-slate-200 dark:border-slate-700">
              <code className="text-blue-600 dark:text-blue-400">
                "87% of employees in your department have already updated their credentials."
              </code>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-purple-200 dark:border-purple-500/50 rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Consistency/Commitment
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              People honor commitments. Attackers use multi-step attacks (foot-in-the-door technique), reference past agreements, or escalate requests after initial compliance.
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 font-mono text-sm border border-slate-200 dark:border-slate-700">
              <code className="text-emerald-600 dark:text-emerald-400">
                "You agreed to our terms last month. We just need to confirm your payment information."
              </code>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-purple-200 dark:border-purple-500/50 rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              Liking
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              People trust those they like. Attackers build rapport before attacks, claim shared interests or backgrounds, and exploit attractiveness or charisma.
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 font-mono text-sm border border-slate-200 dark:border-slate-700">
              <code className="text-pink-600 dark:text-pink-400">
                "I see we both went to Stanford! I'm working on a project and could use your expertise..."
              </code>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-purple-200 dark:border-purple-500/50 rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              Reciprocity
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              People return favors. Attackers offer help or gifts first, then request information or access (quid pro quo attacks).
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 font-mono text-sm border border-slate-200 dark:border-slate-700">
              <code className="text-orange-600 dark:text-orange-400">
                "I helped you with that report last week. Could you just approve this wire transfer for me?"
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Attack Types */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Types of Social Engineering Attacks</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800/50 border border-red-200 dark:border-red-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Mail className="w-6 h-6 text-red-600 dark:text-red-400" />
              Spear Phishing
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Targeted phishing attacks against specific individuals or organizations using personalized content, researched details, and context-aware messaging.
              MITRE ATT&CK: T1566.001 (Spearphishing Attachment), T1566.002 (Spearphishing Link)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold mb-1 text-emerald-600 dark:text-emerald-400">Example Payloads:</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Weaponized Office documents with macros, PDFs with exploits, credential harvesting pages</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold mb-1 text-emerald-600 dark:text-emerald-400">Target Research:</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">LinkedIn profiles, social media, corporate directories, recent news</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold mb-1 text-emerald-600 dark:text-emerald-400">Success Rate:</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">10-30% click rate (vs 1-3% for mass phishing)</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-purple-200 dark:border-purple-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              Whaling (CEO Fraud)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Spear phishing targeting high-value executives (C-level). High reward, extensive reconnaissance, sophisticated pretexts. Common scenarios: CEO fraud, M&A impersonation, legal/compliance urgency.
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 border border-slate-200 dark:border-slate-700">
              <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Real-World Impact:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <li>Ubiquiti Networks: $46.7 million lost to CEO fraud (2015)</li>
                <li>Crelan Bank: €70 million ($75.8M USD) transferred (2016)</li>
                <li>FACC Aerospace: €50 million ($54.6M USD) lost, CEO fired (2016)</li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Vishing (Voice Phishing)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Phone-based social engineering attacks using caller ID spoofing, IVR manipulation, and authority impersonation. Example: Twitter 2020 breach where attackers called IT helpdesk impersonating support to gain credentials.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-green-200 dark:border-green-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
              Smishing (SMS Phishing)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Phishing via SMS/text messages. Techniques: Fake delivery notifications, bank alerts, 2FA bypass attempts. Growth: 700% increase 2019-2023 (Proofpoint).
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-yellow-200 dark:border-yellow-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Mail className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              Business Email Compromise (BEC)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Email account compromise for financial fraud. FBI IC3 Statistics (2022): $2.7 billion losses—the most costly cyber crime type.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold mb-1">CEO Fraud</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Executive impersonation</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold mb-1">Account Compromise</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Hijacked legitimate accounts</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold mb-1">Attorney Impersonation</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Legal urgency exploitation</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold mb-1">Vendor Compromise</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Supply chain attacks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Breaches */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          Real-World Breach: Target Corporation (2013)
        </h2>
        <div className="bg-red-500/20 border-l-4 border-red-500 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Unlock className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                40 Million Payment Cards + 70 Million Customer Records Stolen
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Attackers sent spear phishing emails to Fazio Mechanical Services, a small HVAC contractor with access to Target's vendor portal.
                Employees clicked a malicious attachment, allowing attackers to steal network credentials. Attackers used these credentials to access
                Target's network, installed malware on point-of-sale (POS) systems, and exfiltrated 40 million payment card numbers and 70 million
                customer records during the 2013 holiday shopping season.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                <li>Attack Vector: Spear phishing → third-party vendor compromise → lateral movement to POS systems</li>
                <li>Financial Cost: $292 million ($18.5M settlement, $273.5M fraud losses and remediation)</li>
                <li>Outcome: Target CEO and CIO resigned; complete security infrastructure overhaul</li>
                <li>Key Lesson: Third-party vendors are prime social engineering targets; supply chain security critical</li>
              </ul>
              <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 mt-4 border border-slate-200 dark:border-slate-700">
                <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">
                  Social Engineering Technique:
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Attackers researched Target's vendor relationships and identified a small contractor with weaker security. They crafted a believable
                  pretext (potentially a fake invoice or service request) to get employees to open the malicious attachment. This demonstrates the
                  "weakest link" principle—attackers target the least secure part of the supply chain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          Real-World Breach: Twitter Bitcoin Scam (2020)
        </h2>
        <div className="bg-red-500/20 border-l-4 border-red-500 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Phone className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                130 High-Profile Accounts Compromised via Vishing Attack
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                On July 15, 2020, attackers executed a sophisticated vishing (voice phishing) campaign against Twitter employees. Impersonating IT support,
                they convinced employees to provide credentials and access to internal admin tools. With this access, attackers compromised 130 high-profile
                accounts including Barack Obama, Elon Musk, Bill Gates, Apple, and Uber to promote a Bitcoin scam.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                <li>Attack Vector: Vishing (voice phishing) → authority impersonation → internal tool access</li>
                <li>Financial Cost: $150 million FTC settlement + $60 million proposed class action</li>
                <li>Outcome: 3 individuals arrested; Twitter implemented mandatory 2FA, restricted admin tool access</li>
                <li>Key Lesson: Internal admin tools and help desk personnel are high-value targets; phone-based attacks bypass technical controls</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MITRE ATT&CK */}
      <section>
        <h2 className="text-2xl font-bold mb-4">MITRE ATT&CK Techniques</h2>
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded p-4">
              <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">T1566.001: Phishing - Spearphishing Attachment</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Sending spearphishing emails with malicious attachments to gain initial access</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded p-4">
              <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">T1566.002: Phishing - Spearphishing Link</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Sending spearphishing emails with malicious links to external sites</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded p-4">
              <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">T1598: Phishing for Information</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Using phishing techniques to gather information about targets</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded p-4">
              <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">T1534: Internal Spearphishing</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Spearphishing from compromised internal accounts for lateral movement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
        <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-lg p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Social engineering is responsible for 36% of all data breaches and $2.7 billion in annual BEC losses (FBI IC3 2022)
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Cialdini's 6 principles (authority, scarcity, social proof, consistency, liking, reciprocity) are the psychological foundation of all social engineering attacks
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Third-party vendors are prime targets—Target breach (2013) demonstrated supply chain exploitation via HVAC contractor
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Multi-channel attacks (email + vishing + smishing) increase success rates—700% increase in smishing attacks 2019-2023
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">5</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                MFA blocks 99.9% of automated account compromise attacks but can be bypassed by advanced phishing (Evilginx2, Modlishka)
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">6</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Email authentication (SPF, DKIM, DMARC) is critical but only 30% of organizations have fully implemented DMARC enforcement
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">7</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Security awareness training reduces phish-prone percentage from 33.2% (baseline) to 5-10% after 12 months (KnowBe4 2023)
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">8</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Defense requires layered approach: Technical controls (DMARC, email filtering) + User awareness + Process controls (wire transfer verification)
              </p>
            </li>
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
          ETHICAL USE ONLY: These examples are for educational purposes and defensive security testing. Only test on systems you own or have explicit permission to test. Unauthorized social engineering is illegal and unethical.
        </p>
      </div>

      {/* Lab 1 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Lab 1: Phishing Email Analysis</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Learn to identify phishing indicators by analyzing email headers, sender authentication (SPF/DKIM/DMARC), and suspicious patterns.
        </p>
        <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-200 dark:border-slate-700 mb-4">
          <pre className="text-slate-800 dark:text-slate-300">
            <code>{`# Python script to parse and analyze email headers
import email
from email import policy
from email.parser import BytesParser

# Parse email file
with open('suspicious_email.eml', 'rb') as f:
    msg = BytesParser(policy=policy.default).parse(f)

# Extract key headers
print(f"From: {msg['from']}")
print(f"Return-Path: {msg['return-path']}")
print(f"SPF: {msg['received-spf']}")
print(f"DMARC: {msg['authentication-results']}")

# Check for sender domain mismatch (red flag)
sender_domain = msg['from'].split('@')[1] if '@' in msg['from'] else None
return_path_domain = msg['return-path'].split('@')[1] if '@' in msg['return-path'] else None

if sender_domain != return_path_domain:
    print("\\n[WARNING] Sender domain mismatch!")
    print(f"  Display domain: {sender_domain}")
    print(f"  Actual domain: {return_path_domain}")

# Check SPF result
spf_result = msg['received-spf']
if spf_result and 'fail' in spf_result.lower():
    print("\\n[WARNING] SPF validation failed!")

# Analyze links in email body
import re
links = re.findall(r'https?://[^\\s<>"]+', str(msg.get_body()))
print(f"\\nLinks found: {len(links)}")
for link in links:
    print(f"  - {link}")`}</code>
          </pre>
        </div>
        <div className="bg-emerald-500/20 rounded-lg p-4">
          <p className="text-sm font-semibold mb-2">Analysis Indicators:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Return-Path domain differs from display From address (spoofing attempt)</li>
            <li>SPF/DKIM/DMARC authentication failures</li>
            <li>Suspicious URLs (typosquatting, URL shorteners, mismatched display text)</li>
            <li>Urgency language ("act now," "account will be closed," "verify immediately")</li>
            <li>Generic greetings ("Dear Customer" instead of your name)</li>
          </ul>
        </div>
      </section>

      {/* Lab 2 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Lab 2: URL Reputation Analysis</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Build a URL reputation checker using VirusTotal API to detect malicious links in phishing emails.
        </p>
        <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-200 dark:border-slate-700 mb-4">
          <pre className="text-slate-800 dark:text-slate-300">
            <code>{`import requests
import hashlib

def check_url_reputation(url, api_key):
    """Check URL against VirusTotal database"""
    # Submit URL for scanning
    vt_url = 'https://www.virustotal.com/api/v3/urls'
    headers = {'x-apikey': api_key}

    response = requests.post(vt_url, headers=headers, data={'url': url})

    if response.status_code == 200:
        result = response.json()
        analysis_id = result['data']['id']

        # Get scan results
        analysis_url = f'https://www.virustotal.com/api/v3/analyses/{analysis_id}'
        analysis_response = requests.get(analysis_url, headers=headers)

        if analysis_response.status_code == 200:
            analysis_result = analysis_response.json()
            stats = analysis_result['data']['attributes']['stats']

            print(f"URL: {url}")
            print(f"Malicious detections: {stats['malicious']}")
            print(f"Suspicious detections: {stats['suspicious']}")
            print(f"Clean detections: {stats['harmless']}")

            if stats['malicious'] > 0:
                print("\\n[ALERT] URL flagged as MALICIOUS!")
                return False
            elif stats['suspicious'] > 3:
                print("\\n[WARNING] URL flagged as SUSPICIOUS!")
                return False
            else:
                print("\\nURL appears safe.")
                return True
    else:
        print(f"Error: {response.status_code}")
        return None

# Example usage (requires VirusTotal API key)
# api_key = 'YOUR_API_KEY_HERE'
# check_url_reputation('http://suspicious-site.com', api_key)`}</code>
          </pre>
        </div>
        <div className="bg-blue-500/20 rounded-lg p-4">
          <p className="text-sm font-semibold mb-2">Additional URL Analysis Techniques:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Check domain age with WHOIS (newly registered domains are suspicious)</li>
            <li>Verify SSL certificate (typosquatting domains may have invalid or self-signed certs)</li>
            <li>Cross-reference with PhishTank database (community-reported phishing sites)</li>
            <li>Analyze URL structure (excessive subdomains, unusual TLDs like .tk, .ml)</li>
          </ul>
        </div>
      </section>

      {/* Lab 3 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Lab 3: OSINT for Social Engineering Defense</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Audit your organization's public exposure using OSINT tools to understand what information attackers can gather.
        </p>
        <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-200 dark:border-slate-700 mb-4">
          <pre className="text-slate-800 dark:text-slate-300">
            <code>{`import requests

def check_breach_status(email):
    """Check if email appears in known data breaches (HIBP API)"""
    url = f'https://haveibeenpwned.com/api/v3/breachedaccount/{email}'
    headers = {
        'User-Agent': 'Security-Audit-Tool',
        'hibp-api-key': 'YOUR_API_KEY'  # Requires API key
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        breaches = response.json()
        print(f"\\n[ALERT] Email '{email}' found in {len(breaches)} breaches!")
        for breach in breaches:
            print(f"  - {breach['Name']}: {breach['BreachDate']}")
            print(f"    Compromised data: {', '.join(breach['DataClasses'])}")
        return breaches
    elif response.status_code == 404:
        print(f"\\nEmail '{email}' not found in known breaches.")
        return []
    else:
        print(f"Error: {response.status_code}")
        return None

# Check multiple emails
emails = [
    'employee1@company.com',
    'employee2@company.com',
    'admin@company.com'
]

for email in emails:
    check_breach_status(email)`}</code>
          </pre>
        </div>
      </section>

      {/* Lab 4 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Lab 4: DMARC/SPF/DKIM Configuration</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Implement email authentication to prevent domain spoofing and BEC attacks.
        </p>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800/50 border border-green-200 dark:border-green-500/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
              SPF Record (Sender Policy Framework)
            </h3>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 font-mono text-sm border border-slate-200 dark:border-slate-700 mb-3">
              <code className="text-green-600 dark:text-green-400">
                v=spf1 include:_spf.google.com include:spf.protection.outlook.com ~all
              </code>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              SPF specifies which mail servers are authorized to send email for your domain. The ~all means "soft fail" (accept but mark as suspicious). Use -all for "hard fail" (reject).
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              DKIM Record (DomainKeys Identified Mail)
            </h3>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 font-mono text-sm border border-slate-200 dark:border-slate-700 mb-3">
              <code className="text-blue-600 dark:text-blue-400">
                default._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA..."
              </code>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              DKIM adds a digital signature to outgoing emails, proving they haven't been tampered with in transit.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-purple-200 dark:border-purple-500/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              DMARC Record (Domain-based Message Authentication)
            </h3>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 font-mono text-sm border border-slate-200 dark:border-slate-700 mb-3">
              <code className="text-purple-600 dark:text-purple-400">
                _dmarc.example.com TXT "v=DMARC1; p=reject; rua=mailto:dmarc-reports@example.com; pct=100"
              </code>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              DMARC tells receiving servers what to do with emails that fail SPF/DKIM checks. p=reject provides strongest protection (blocks spoofed emails).
            </p>
          </div>
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
            Ready to practice social engineering defense techniques in a safe, controlled environment? Our interactive Jupyter notebook includes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mb-4">
            <li>Email header analysis exercises with real phishing examples</li>
            <li>URL reputation checking with VirusTotal and PhishTank APIs</li>
            <li>OSINT reconnaissance simulation</li>
            <li>Email authentication (SPF/DKIM/DMARC) validation scripts</li>
            <li>Defensive scripting for automated phishing detection</li>
          </ul>
          <a
            href="/notebooks/14-social-engineering.ipynb"
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
      {/* Attack Tools */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Attack Tools (Educational Reference)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800/50 border border-red-200 dark:border-red-500/50 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Terminal className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Social-Engineer Toolkit (SET)</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Open-source penetration testing framework by TrustedSec for automating social engineering attacks. Includes spear-phishing vectors,
                  website cloning for credential harvesting, mass mailer with template support, and infectious media generator for USB payloads.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">Key Features:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                    <li>Spear-phishing attack vectors with customizable templates</li>
                    <li>Website cloning for credential harvesting</li>
                    <li>Mass mailer with tracking</li>
                    <li>SMS spoofing and QR code generation</li>
                    <li>Infectious media generator (USB payloads)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-red-200 dark:border-red-500/50 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Mail className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Gophish</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Open-source phishing simulation framework for security awareness training. Features email template designer, landing page cloning,
                  campaign scheduling with real-time tracking, and comprehensive analytics dashboard.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">Key Features:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                    <li>Email template designer with variables</li>
                    <li>Landing page cloning and customization</li>
                    <li>Campaign scheduling and tracking</li>
                    <li>Real-time results dashboard</li>
                    <li>User interaction analytics (open, click, submit rates)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-red-200 dark:border-red-500/50 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Lock className="w-8 h-8 text-orange-600 dark:text-orange-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Evilginx2</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Advanced Man-in-the-Middle phishing framework using reverse proxy architecture to bypass 2FA/MFA by capturing session cookies in real-time.
                  Demonstrates critical MFA limitations when session tokens are stolen.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">Key Features:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                    <li>Reverse proxy for transparent MitM attacks</li>
                    <li>Real-time credential and session token capture</li>
                    <li>Bypasses 2FA/MFA by stealing cookies</li>
                    <li>Phishlet system (pre-built templates for major sites)</li>
                    <li>Works with OAuth and SAML authentication flows</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-red-200 dark:border-red-500/50 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Globe className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Browser Exploitation Framework (BeEF)</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Browser-based attack framework that hooks browsers via XSS to deliver social engineering modules. Enables browser fingerprinting,
                  fake notification delivery, and command & control via JavaScript.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">Key Features:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                    <li>Hook browsers via XSS vulnerabilities</li>
                    <li>Browser and OS fingerprinting</li>
                    <li>Social engineering modules (fake notifications, plugin updates)</li>
                    <li>Network pivoting from compromised browsers</li>
                    <li>Command & control via JavaScript</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Defense Tools */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
          Defense Tools & Techniques
        </h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800/50 border border-green-200 dark:border-green-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              Security Awareness Training Platforms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">KnowBe4</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Industry-leading platform with 1,000+ training modules, automated phishing campaigns, PhishER Plus email analysis, and compliance training (HIPAA, PCI-DSS, GDPR).
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">Cloud-based SaaS</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Cofense (PhishMe)</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Anti-phishing platform with Cofense Triage for email analysis automation, user-reported email analysis, threat intelligence, and active threat hunting capabilities.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">Cloud-based</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">IronScales</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  AI-powered email security platform with self-learning capabilities, federated learning across customers, automated incident response, and adaptive email classification.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">Cloud API integration</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Email Security Gateways
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Proofpoint Email Protection</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Enterprise gateway with AI-powered threat detection, URL rewriting, attachment sandboxing, BEC/impersonation protection, and DMARC enforcement.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">Cloud/On-premise</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Mimecast</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Email security and continuity platform with Targeted Threat Protection (TTP), Impersonation Protect for executives, URL/attachment protection, and DMARC Analyzer.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">Cloud-based</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Tessian (Proofpoint Aegis)</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Human layer security with ML behavioral analysis, accidental data loss prevention, spear phishing detection, and BEC detection via sender behavior anomalies.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">M365/Google Workspace</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-purple-200 dark:border-purple-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              Email Authentication (DMARC/SPF/DKIM)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Email authentication protocols prevent domain spoofing and email impersonation by verifying sender identity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-2">SPF (RFC 7208)</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Sender Policy Framework specifies which mail servers are authorized to send email for your domain.
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-2">DKIM (RFC 6376)</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  DomainKeys Identified Mail adds digital signatures proving emails haven't been tampered with in transit.
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-2">DMARC (RFC 7489)</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Domain-based Message Authentication tells receivers what to do with emails that fail SPF/DKIM checks.
                </p>
              </div>
            </div>
            <div className="mt-4 bg-yellow-500/20 border border-yellow-500/50 rounded p-3">
              <p className="text-sm font-semibold mb-1">Implementation Gap:</p>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Only 30% of organizations have fully implemented DMARC enforcement (p=reject policy). Without enforcement, DMARC provides visibility but doesn't block spoofed emails.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-orange-200 dark:border-orange-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              Threat Intelligence & Takedown Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">PhishLabs (Fortra)</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Digital risk protection with 24/7 threat hunting, automated phishing site takedowns, domain/social media impersonation monitoring, dark web monitoring, and executive protection.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">Managed service + SaaS</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">DMARC Analyzer</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Email authentication monitoring platforms (dmarcian, EasyDMARC, Valimail) providing DMARC policy management, email flow visibility, threat intelligence, and domain impersonation alerts.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">Multiple vendors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Controls */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Process Controls & Best Practices</h2>
        <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-lg p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Wire Transfer Verification</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">Require out-of-band verification (phone call to known number) for all wire transfers over $10,000 or changes to payment details</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Dual Authorization</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">Require two-person approval for high-value financial transactions (prevents single point of failure)</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Phishing Simulation Campaigns</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">Run quarterly phishing simulations with immediate training for users who click (reduces phish-prone % from 33% to 5-10%)</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">User Reporting Mechanisms</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">Deploy "Report Phishing" button in email clients (Phish Alert Button by KnowBe4, Cofense Reporter) to crowdsource threat detection</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">5</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Executive Protection Programs</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">Monitor for domain impersonation, display name spoofing, and executive social media account takeovers (whaling defense)</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );

  const ReferencesTab = () => (
    <div className="space-y-8">
      {/* Official Documentation */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Official Documentation & Guidelines</h2>
        <div className="space-y-4">
          <a
            href="https://www.cisa.gov/news-events/news/phishing-guidance-stopping-phish-source"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/50 rounded-lg p-5 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all"
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              CISA Phishing Guidance: Stopping the Phish at the Source
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Official guidance from the Cybersecurity and Infrastructure Security Agency on preventing and responding to phishing attacks. Covers email authentication (SPF, DKIM, DMARC), user awareness training, and incident response procedures.
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">https://www.cisa.gov/phishing</p>
          </a>

          <a
            href="https://attack.mitre.org/techniques/T1566/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/50 rounded-lg p-5 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all"
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
              <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              MITRE ATT&CK T1566: Phishing
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Comprehensive documentation of phishing techniques used by adversaries for initial access. Includes spearphishing attachment (T1566.001), spearphishing link (T1566.002), and spearphishing via service (T1566.003). Details real-world usage by APT groups.
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">https://attack.mitre.org/techniques/T1566/</p>
          </a>

          <a
            href="https://www.ic3.gov/PSA/2022/PSA220504"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/50 rounded-lg p-5 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all"
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              FBI IC3: Business Email Compromise Reports
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              FBI Internet Crime Complaint Center's annual reports on Business Email Compromise (BEC) attacks. 2022 report documents $2.7 billion in losses across 21,832 complaints—making BEC the costliest cybercrime type.
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">https://www.ic3.gov</p>
          </a>

          <a
            href="https://apwg.org/trendsreports/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/50 rounded-lg p-5 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all"
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              APWG Phishing Activity Trends Reports
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Anti-Phishing Working Group's quarterly reports tracking global phishing trends. Q4 2022 report documented 4.7 million phishing sites detected—a 300% increase year-over-year. Tracks phishing by target industry, brand impersonation, and geographic distribution.
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">https://apwg.org/trendsreports/</p>
          </a>

          <a
            href="https://datatracker.ietf.org/doc/html/rfc7489"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/50 rounded-lg p-5 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all"
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
              <Lock className="w-5 h-5 text-green-600 dark:text-green-400" />
              RFC 7489: DMARC (Domain-based Message Authentication)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Official specification for DMARC email authentication protocol. Defines how receiving mail servers should handle messages that fail SPF and DKIM checks. Critical for preventing domain spoofing and BEC attacks.
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">https://datatracker.ietf.org/doc/html/rfc7489</p>
          </a>
        </div>
      </section>

      {/* Academic Papers */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Academic Papers & Research</h2>
        <div className="space-y-3">
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-semibold mb-1">Influence: The Psychology of Persuasion</p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-2">
              Robert B. Cialdini (2006)
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Foundational work identifying six universal principles of influence (authority, scarcity, social proof, consistency, liking, reciprocity) that social engineers exploit to manipulate victims. Required reading for understanding social engineering psychology.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-semibold mb-1">Why Phishing Works</p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-2">
              Dhamija, R., Tygar, J. D., & Hearst, M. (2006) - CHI '06: Proceedings of SIGCHI Conference
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Seminal study on why users fall for phishing attacks despite security warnings. Found that good phishing websites fooled 90% of participants, and even security-aware users failed to detect sophisticated phishing attempts. DOI: 10.1145/1124772.1124861
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-semibold mb-1">Social Phishing</p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-2">
              Jagatic, T. N., Johnson, N. A., Jakobsson, M., & Menczer, F. (2007) - Communications of the ACM
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Demonstrated that phishing attacks using social network information have significantly higher success rates. Contextual information from social media increased click rates from 16% to 72%. DOI: 10.1145/1290958.1290968
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-semibold mb-1">Social Engineering: The Art of Human Hacking</p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-2">
              Christopher Hadnagy (2010) - Wiley Publishing
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Comprehensive guide to social engineering techniques, psychology, and defense strategies. Covers pretexting, phishing, vishing, physical social engineering, and the Social Engineering Toolkit (SET). ISBN: 978-0470639535
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-semibold mb-1">The Art of Deception: Controlling the Human Element of Security</p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-2">
              Kevin D. Mitnick & William L. Simon (2002) - Wiley Publishing
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Classic work by famous social engineer Kevin Mitnick documenting real-world social engineering attacks and defense strategies. Demonstrates how attackers exploit trust, authority, and urgency to bypass security controls. ISBN: 978-0471237129
            </p>
          </div>
        </div>
      </section>

      {/* Industry Reports */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Industry Reports & Statistics</h2>
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/50 rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Database className="w-5 h-5 text-red-400" />
              Verizon 2023 Data Breach Investigations Report (DBIR)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Comprehensive analysis of 16,312 security incidents and 5,199 confirmed breaches. Key finding: 36% of breaches involved phishing, making it the second-most common attack pattern after exploitation of vulnerabilities.
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 mb-3">
              <p className="text-xs font-semibold mb-2 text-emerald-600 dark:text-emerald-400">
                Key Statistics:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <li>36% of breaches involved phishing</li>
                <li>Median time to compromise: 3 minutes</li>
                <li>68% of breaches involved human element</li>
                <li>Financial sector most targeted by BEC</li>
              </ul>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">https://www.verizon.com/business/resources/reports/dbir/</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              Proofpoint 2023 State of the Phish Report
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Global survey of 7,500 working adults and 1,050 IT security professionals. Tracks phishing attack trends, user behavior, and organizational security posture.
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 mb-3">
              <p className="text-xs font-semibold mb-2 text-emerald-600 dark:text-emerald-400">
                Key Findings:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <li>84% of organizations experienced phishing attacks in 2022</li>
                <li>700% increase in smishing (SMS phishing) attacks 2019-2023</li>
                <li>44% of users clicked on at least one malicious link in 2022</li>
                <li>66% of organizations suffered successful phishing attacks</li>
              </ul>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">https://www.proofpoint.com/us/resources/threat-reports/state-of-phish</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              KnowBe4 2023 Phishing Benchmarking Report
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Analysis of 12 million+ users across 35,000+ organizations worldwide. Tracks phish-prone percentages (users who clicked simulated phishing emails) and effectiveness of security awareness training.
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 mb-3">
              <p className="text-xs font-semibold mb-2 text-emerald-600 dark:text-emerald-400">
                Key Metrics:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <li>Baseline phish-prone percentage: 33.2% (no training)</li>
                <li>After 12 months of training: 5-10% phish-prone</li>
                <li>Industries with highest baseline: Healthcare (34.1%), Retail (33.8%), Finance (32.9%)</li>
                <li>Most effective training: Monthly simulations with immediate training</li>
              </ul>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">https://www.knowbe4.com/phishing-security-test-report</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Microsoft Digital Defense Report 2023
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Analysis of 65 trillion security signals per day across Microsoft's global infrastructure. Documents effectiveness of multi-factor authentication (MFA) in preventing account compromise.
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 mb-3">
              <p className="text-xs font-semibold mb-2 text-emerald-600 dark:text-emerald-400">
                Critical Findings:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <li>99.9% of account compromise attacks blocked by MFA</li>
                <li>44 million Microsoft accounts reused passwords from data breaches</li>
                <li>Password spray attacks increased 300% (2020-2023)</li>
                <li>Nation-state actors increasingly use social engineering for initial access</li>
              </ul>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">https://www.microsoft.com/security/business/microsoft-digital-defense-report</p>
          </div>
        </div>
      </section>

      {/* Practice Platforms */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Practice Platforms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-2">HackTheBox: Social Engineering Challenges</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Hands-on labs and challenges for practicing social engineering techniques in controlled environments. Includes phishing simulation, OSINT reconnaissance, and pretexting scenarios.
            </p>
            <span className="text-xs text-emerald-600 dark:text-emerald-400">
              Hands-On • CTF Challenges • Beginner-Friendly
            </span>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-2">TryHackMe: Phishing Analysis</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Interactive rooms for learning phishing analysis, email header inspection, and malware analysis. Step-by-step guided exercises with immediate feedback.
            </p>
            <span className="text-xs text-emerald-600 dark:text-emerald-400">
              Interactive • Guided • Defensive Focus
            </span>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-2">PhishingBox: Training Platform</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Enterprise phishing simulation and training platform. Deploy simulated phishing campaigns against your organization, track click rates, and deliver automated training.
            </p>
            <span className="text-xs text-emerald-600 dark:text-emerald-400">
              Enterprise • Simulation • Automated Training
            </span>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/50 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-2">SANS SEC504: Social Engineering</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Professional certification course covering social engineering attacks, defense strategies, and security awareness program development. Industry-recognized certification.
            </p>
            <span className="text-xs text-emerald-600 dark:text-emerald-400">
              Professional • Certification • Advanced
            </span>
          </div>
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
              The information and tools provided in this module are for educational purposes and defensive security testing only. Social engineering techniques
              must only be used in authorized penetration testing engagements, security awareness training programs, or research with explicit written permission.
            </p>
            <div className="bg-red-500/20 rounded p-3">
              <p className="font-semibold mb-2 text-red-300">Always Remember:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Only test systems you own or have explicit written permission to test</li>
                <li>Unauthorized social engineering is illegal under the Computer Fraud and Abuse Act (CFAA) in the United States and similar laws globally</li>
                <li>Impersonating authorities, financial institutions, or company executives for malicious purposes is identity theft and fraud</li>
                <li>Ethical hackers must operate within legal boundaries, professional codes of conduct, and scope of authorized engagements</li>
                <li>Bug bounty programs and authorized security research programs provide legal avenues for testing</li>
              </ul>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Violations can result in criminal prosecution, imprisonment, significant fines, and permanent damage to professional reputation. The FBI Internet Crime
              Complaint Center (IC3) actively investigates social engineering crimes, particularly Business Email Compromise (BEC) and phishing attacks.
            </p>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-8">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all flex items-center gap-2 border border-slate-300 dark:border-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      )}

      {/* Main Content Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold">Social Engineering & Phishing</h1>
            <p className="text-emerald-600 dark:text-emerald-400 mt-2">
              Master the psychology of manipulation and defend against human-targeted attacks
            </p>
          </div>
          
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 dark:border-slate-700 mb-8">
          <nav className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-b-2 border-emerald-600 dark:border-emerald-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
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
