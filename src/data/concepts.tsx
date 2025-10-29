import { Code, Users, Globe, Database, Key, Search, Brain, Shield, Unlock, AlertTriangle, Trophy, Target, Zap } from 'lucide-react';
import type { Concept } from '../types';
import { PromptInjectionConcept } from '../components/concepts/PromptInjectionConcept';
import { AdversarialMLConcept } from '../components/concepts/AdversarialMLConcept';
import { DataPoisoningConcept } from '../components/concepts/DataPoisoningConcept';
import { ModelExtractionConcept } from '../components/concepts/ModelExtractionConcept';
import { JailbreakingConcept } from '../components/concepts/JailbreakingConcept';
import { RAGSecurityConcept } from '../components/concepts/RAGSecurityConcept';
import { MultiAgentSecurityConcept } from '../components/concepts/MultiAgentSecurityConcept';
import { LinkTrapsSecurityConcept } from '../components/concepts/LinkTrapsSecurityConcept';
import { InvisibleUnicodeInjectionConcept } from '../components/concepts/InvisibleUnicodeInjectionConcept';
import { AIAgentCommandInjectionConcept } from '../components/concepts/AIAgentCommandInjectionConcept';
import { ReconnaissanceFootprintingConcept } from '../components/concepts/ReconnaissanceFootprintingConcept';
import { SQLInjectionConcept } from '../components/concepts/SQLInjectionConcept';
import { XSSConcept } from '../components/concepts/XSSConcept';
import { SocialEngineeringConcept } from '../components/concepts/SocialEngineeringConcept';
import { NetworkScanningConcept } from '../components/concepts/NetworkScanningConcept';
import { PasswordCrackingConcept } from '../components/concepts/PasswordCrackingConcept';
import { MitMAttacksConcept } from '../components/concepts/MitMAttacksConcept';
import { DoSAttacksConcept } from '../components/concepts/DoSAttacksConcept';
import { WebAppVulnerabilitiesConcept } from '../components/concepts/WebAppVulnerabilitiesConcept';
import { PenetrationTestingConcept } from '../components/concepts/PenetrationTestingConcept';

export const concepts: Concept[] = [
  // AI/ML Security Concepts
  {
    id: 1,
    category: 'AI/ML Security',
    title: 'Prompt Injection Attacks',
    icon: <Code className="w-8 h-8" />,
    difficulty: 'Beginner',
    description: 'Learn how attackers manipulate AI models by injecting malicious prompts to override system instructions.',
    realWorldExample: 'In 2024, ChatGPT search was vulnerable to hidden webpage content that could override negative reviews with positive ones.',
    keyTakeaways: [
      'Prompt injection exploits how LLMs process natural language',
      'Direct injection: User directly provides malicious prompt',
      'Indirect injection: Malicious prompts embedded in external content',
      'OWASP ranks this as #1 AI security risk in 2025'
    ],
    defenses: [
      'Input/output filtering and sanitization',
      'Separate system prompts from user input',
      'Use guardrails like NeuralTrust Gateway',
      'Implement adversarial testing'
    ],
    detailedComponent: (props) => <PromptInjectionConcept {...props} />
  },
  {
    id: 2,
    category: 'AI/ML Security',
    title: 'Adversarial Machine Learning',
    icon: <Brain className="w-8 h-8" />,
    difficulty: 'Intermediate',
    description: 'Understand how subtle perturbations in input data can fool ML models into making incorrect predictions.',
    realWorldExample: 'In 2023, researchers poisoned ImageNet dataset causing Google DeepMind models to misclassify "dog" images as "cat".',
    keyTakeaways: [
      'Evasion attacks modify inputs to bypass detection',
      'Adversarial examples are imperceptible to humans',
      'Can affect image recognition, malware detection, spam filters',
      'Attackers can craft inputs without model access'
    ],
    defenses: [
      'Adversarial training with malicious examples',
      'Input validation and anomaly detection',
      'Ensemble methods using multiple models',
      'Defensive distillation'
    ],
    detailedComponent: (props) => <AdversarialMLConcept {...props} />
  },
  {
    id: 3,
    category: 'AI/ML Security',
    title: 'Data Poisoning',
    icon: <Database className="w-8 h-8" />,
    difficulty: 'Intermediate',    description: 'Learn how attackers corrupt training data to manipulate model behavior at its foundation.',
    realWorldExample: 'Microsoft\'s Tay chatbot was poisoned through malicious interactions, causing it to generate offensive content within 24 hours.',
    keyTakeaways: [
      'Attackers inject malicious data into training sets',
      'Can create backdoors triggered by specific inputs',
      'Affects model behavior globally, not just specific inputs',
      'Hard to detect once model is trained'
    ],
    defenses: [
      'Data validation and sanitization',
      'Anomaly detection in training data',
      'Use trusted data sources',
      'Regular model retraining with clean data'
    ],
    detailedComponent: (props) => <DataPoisoningConcept {...props} />
  },
  {
    id: 4,
    category: 'AI/ML Security',
    title: 'Model Extraction',
    icon: <Search className="w-8 h-8" />,
    difficulty: 'Advanced',    description: 'Discover how attackers can steal proprietary ML models through strategic querying.',
    realWorldExample: 'Researchers demonstrated extracting GPT-2 model parameters by making strategic API queries.',
    keyTakeaways: [
      'Attackers query model to reverse-engineer its behavior',
      'Can steal intellectual property and trade secrets',
      'Query-based attacks on API endpoints',
      'Enables creation of surrogate models'
    ],
    defenses: [
      'Rate limiting on API endpoints',
      'Query monitoring and anomaly detection',
      'Add noise to model outputs',
      'Implement strong authentication'
    ],
    detailedComponent: (props) => <ModelExtractionConcept {...props} />
  },
  {
    id: 5,
    category: 'AI/ML Security',
    title: 'Jailbreaking & Safety Bypassing',
    icon: <Unlock className="w-8 h-8" />,
    difficulty: 'Intermediate',    description: 'Learn techniques attackers use to bypass AI safety measures and content restrictions.',
    realWorldExample: 'In July 2025, NeuralTrust successfully jailbroke X\'s Grok AI using Echo Chamber and Crescendo attacks.',
    keyTakeaways: [
      'Jailbreaking bypasses AI safety protocols entirely',
      'DAN ("Do Anything Now") is a common technique',
      'Can expose system prompts and restrictions',
      'Different from prompt injection but often related'
    ],
    defenses: [
      'Multi-layered safety filters',
      'Context-aware content moderation',
      'Prompt evaluation before execution',
      'Reinforcement learning from human feedback (RLHF)'
    ],
    detailedComponent: (props) => <JailbreakingConcept {...props} />
  },
  {
    id: 6,
    category: 'AI/ML Security',
    title: 'RAG Security Vulnerabilities',
    icon: <Database className="w-8 h-8" />,
    difficulty: 'Advanced',    description: 'Understand security risks in Retrieval-Augmented Generation systems that combine LLMs with external data sources and vector databases.',
    realWorldExample: 'In December 2024, Vector Security suffered a data breach affecting 30,282 individuals. NVIDIA AI Red Team found insecure RAG permissions ranked #2 in top security issues.',
    keyTakeaways: [
      'RAG combines data pipeline vulnerabilities with LLM prompt injection risks',
      '97% attack success rate with only 5 poisoned documents (PoisonedRAG research)',
      'Embedding inversion achieves 92% exact text recovery (ACL 2024)',
      'Access control bypass is NVIDIA Red Team\'s #2 finding',
      'Flowise CVE-2024-31621: 438 servers exposed with plaintext API keys',
      'Application-layer encryption provides >95% protection from inversion attacks',
      'ChatGPT Search manipulated via hidden webpage content (Dec 2024)',
      'Defense-in-depth required: access control + sanitization + encryption + monitoring'
    ],
    defenses: [
      'Verify per-user permissions in SOURCE system (not just RAG-level)',
      'Sanitize all retrieved content (remove HTML comments, markdown tricks, system tags)',
      'Application-layer encryption for embeddings (Eguard defense, >95% protection)',
      'Separate retrieval and generation contexts with clear document boundaries',
      'Monitor for systematic query patterns (embedding inversion attempts)',
      'Audit data store for bulk inserts (poisoning detection)',
      'Rate limiting and anomaly detection on queries',
      'Content security policies on retrieved documents'
    ],
    detailedComponent: (props) => <RAGSecurityConcept {...props} />
  },
  {
    id: 7,
    category: 'AI/ML Security',
    title: 'Multi-Agent System Attacks',
    icon: <Users className="w-8 h-8" />,
    difficulty: 'Advanced',    description: 'Learn how attacks propagate between multiple AI agents collaborating in LangChain, AutoGPT, Microsoft Copilot, and Anthropic MCP systems.',
    realWorldExample: 'CVE-2025-32711 (EchoLeak): First zero-click attack on Microsoft 365 Copilot (CVSS 9.3). Single compromised email propagated across all Copilot agents. 250 documents can backdoor LLMs of ANY size (Anthropic 2024-2025).',
    keyTakeaways: [
      'Zero-click attacks are real: CVE-2025-32711 Microsoft 365 Copilot (CVSS 9.3)',
      '250 documents can backdoor LLMs of ANY size (Anthropic/UK AI Security Institute)',
      'Echo Chamber jailbreak: >90% success rate against GPT-4 and Gemini',
      'HPTSA autonomous exploitation: 53% success vs zero-days (550% better than single LLM)',
      'Cross-agent privilege escalation: GitHub Copilot + Claude Code escalation loops',
      'Steganographic collusion: AI agents establish theoretically undetectable communication',
      '45 billion agentic identities by 2025, only 10% of orgs have management strategies',
      'MCP vulnerabilities: 7.2% of servers contain flaws, 5.5% exhibit tool poisoning'
    ],
    defenses: [
      'Agent isolation (Docker containers, sandboxing, read-only file systems)',
      'Schema-based validation (JSON-only, no free-form text between agents)',
      'Config integrity hashing (SHA-256, verify before each operation)',
      'Shared memory auditing (log all inserts, detect bulk poisoning)',
      'Action allowlisting (restrict permitted agent actions)',
      'Content sanitization (remove hidden instructions, HTML comments)',
      'Multi-agent SIEM (behavioral monitoring, anomaly detection)',
      'Cross-agent write prevention (agents cannot modify other configs)'
    ],
    detailedComponent: (props) => <MultiAgentSecurityConcept {...props} />
  },
  {
    id: 8,
    category: 'AI/ML Security',
    title: 'Link Traps & Malicious URLs',
    icon: <Globe className="w-8 h-8" />,
    difficulty: 'Advanced',    description: 'Master AI-powered phishing attacks through malicious URLs, markdown exfiltration, and screenshot-based prompt injection. Learn zero-click attacks like CVE-2025-32711 (EchoLeak) and defend against polymorphic phishing that bypasses traditional detection.',
    realWorldExample: 'CVE-2025-32711 (EchoLeak): Zero-click attack on Microsoft 365 Copilot (CVSS 9.3) exfiltrates conversation history via markdown image auto-loading. CometJacking (Perplexity Comet AI) remains UNRESOLVED as of October 2025. $25.6M Arup Engineering deepfake scam (Hong Kong, 2024). +1,265% phishing increase since GenAI launch, $10B+ losses.',
    keyTakeaways: [
      'CVE-2025-32711 EchoLeak: Zero-click markdown image exfiltration (CVSS 9.3)',
      'CometJacking vulnerability UNRESOLVED as of October 2025 (Perplexity Comet)',
      '+1,265% increase in phishing since GenAI launch (Egress Software 2024)',
      '82.6% of phishing now uses AI (Egress 2024 report)',
      '$10 billion+ in losses from AI-powered phishing attacks',
      'Screenshot-based injection: OCR extraction + prompt injection combo attack',
      'Polymorphic phishing: AI generates contextual, personalized phishing pages',
      'Base64 URL obfuscation bypasses traditional security filters'
    ],
    defenses: [
      'Domain allowlisting: Only permit trusted domains for external resources',
      'Content Security Policy (CSP): Restrict img-src, script-src, connect-src',
      'Markdown image sanitization: Remove/validate images before rendering',
      'URL validation: Multi-layer checks (format, protocol, domain, TLD, patterns)',
      'OCR input sanitization: Pattern-based detection for screenshot injection',
      'External URL click verification: "You are about to visit..." warnings',
      'Base64 payload detection: Identify encoded exfiltration in URL parameters',
      'SIEM integration: Log security events, alert on score < 0.5 (critical)'
    ],
    detailedComponent: (props) => <LinkTrapsSecurityConcept {...props} />
  },
  {
    id: 9,
    category: 'AI/ML Security',
    title: 'Invisible Unicode Injection',
    icon: <AlertTriangle className="w-8 h-8" />,
    difficulty: 'Advanced',    description: 'Learn about hidden Unicode characters used to inject invisible malicious instructions into AI/ML systems.',
    realWorldExample: 'Riley Goodside demonstrated invisible prompt injection using Unicode tag characters (January 2024). Microsoft Copilot RAG poisoning achieved 90% success rate with just 5 poisoned documents (USENIX Security 2025). Z-WASP attack bypassed Office 365 defenses affecting 90%+ of customers (2018-2019).',
    keyTakeaways: [
      'Unicode tag characters (U+E0020-U+E007F) enable completely invisible prompt injection',
      'RAG poisoning achieves 90% success rate with minimal documents (PoisonedRAG research)',
      'Zero-width characters fragment keywords to bypass pattern matching',
      'Embedding inversion achieves 92% exact text recovery from RAG vectors',
      'Application-layer encryption provides >95% protection against inversion attacks',
      'Defense requires multi-layer approach: normalization, whitelisting, RAG filtering, encryption'
    ],
    defenses: [
      'Unicode normalization (NFKC) before processing all input',
      'Character whitelisting: block invisible Unicode (zero-width, tags, bidi overrides)',
      'RAG document filtering: scan all documents before indexing, reject high-risk content',
      'Application-layer encryption for embeddings (>95% protection vs inversion)',
      'Monitoring and logging: alert on Unicode anomalies and systematic query patterns'
    ],
    detailedComponent: (props) => <InvisibleUnicodeInjectionConcept {...props} />
  },
  {
    id: 10,
    category: 'AI/ML Security',
    title: 'AI Agent Command Injection',
    icon: <Shield className="w-8 h-8" />,
    difficulty: 'Advanced',    description: 'Master how AI agents with tool access can be exploited to execute SQL injections, OS commands, and other unauthorized operations through prompt manipulation.',
    realWorldExample: 'CVE-2025-32711 (EchoLeak) achieved zero-click command injection in Microsoft 365 Copilot with CVSS 9.3. CVE-2024-5565 enabled prompt injection to Python RCE in Vanna AI (CVSS 9.2). CVE-2024-6091 allowed shell command bypass in AutoGPT (CVSS 9.8). IBM 2025 report: 13% of organizations experienced AI security incidents, 97% lack adequate controls, with shadow AI breaches costing $670K more than traditional attacks.',
    keyTakeaways: [
      'AI agents with SQL/shell tool access create critical attack surfaces',
      'CVE-2025-32711 (EchoLeak) demonstrated zero-click injection in Microsoft 365 Copilot (CVSS 9.3)',
      'P2SQL attacks achieve 89.6% success rate converting prompts to malicious SQL queries',
      'gVisor sandboxing provides kernel-independent isolation for AI agent environments',
      'Morris II worm demonstrated self-replicating adversarial prompts across AI systems (2024 research)',
      'Multi-layer defense: sandboxing + input validation + parameterized queries + least privilege + monitoring'
    ],
    defenses: [
      'Parameterized queries for all database operations (never string interpolation)',
      'Sandboxing with gVisor or Docker runtime isolation to limit blast radius',
      'Input validation using Pydantic models with strict type checking and regex patterns',
      'Command allowlisting (permit-list only safe operations, block all others)',
      'Least privilege: AI agents should only access minimum required tools and permissions',
      'Continuous monitoring: audit logs, anomaly detection, alerting on suspicious patterns'
    ],
    detailedComponent: (props) => <AIAgentCommandInjectionConcept {...props} />
  },
  // Traditional Ethical Hacking Concepts
  {
    id: 11,
    category: 'Traditional Hacking',
    title: 'Reconnaissance & Footprinting',
    icon: <Search className="w-8 h-8" />,
    difficulty: 'Intermediate',    description: 'Master the critical first phase of penetration testing—passive and active reconnaissance techniques used to map attack surfaces, discover infrastructure, and identify vulnerabilities before launching attacks.',
    realWorldExample: 'Target Corporation breach (2013): Attackers researched third-party vendors via OSINT, identifying Fazio Mechanical Services as entry point → $292M loss. SolarWinds (2020): Multi-year reconnaissance of software supply chain enabled trojanized updates compromising 18,000+ organizations. OPM (2015): Patient network topology mapping over months → 21.5M security clearances stolen. Colonial Pipeline (2021): Exposed VPN credentials in dark web dumps → $4.4M ransom + $2.3B economic impact.',
    keyTakeaways: [
      'Reconnaissance is the foundation of 80% of successful cyber attacks',
      'Passive reconnaissance (OSINT, WHOIS, certificate transparency) is undetectable and leaves no traces',
      'Active reconnaissance (port scanning, banner grabbing) triggers IDS/IPS alerts',
      'Certificate transparency logs reveal 95% of organizations\' subdomain structure',
      'MITRE ATT&CK TA0043 catalogs 10 reconnaissance techniques used by real adversaries',
      'Defense requires attack surface management, honeypots, IDS/IPS, and CT monitoring'
    ],
    defenses: [
      'Attack Surface Management (ASM): Continuously discover and monitor internet-facing assets before attackers do',
      'Certificate Transparency Monitoring: Alert on new certificates issued for your domains (detect shadow IT and phishing)',
      'IDS/IPS Deployment: Detect and block active scanning attempts with Snort, Suricata, or Zeek',
      'Honeypots & Canary Tokens: Deploy decoy systems and fake credentials to detect reconnaissance activities',
      'Minimize Public Information: Limit data in WHOIS (use privacy protection), social media, job postings, technical blogs',
      'SIEM Correlation: Aggregate security logs to identify multi-stage reconnaissance patterns'
    ],
    detailedComponent: (props) => <ReconnaissanceFootprintingConcept {...props} />
  },
  {
    id: 12,
    category: 'Traditional Hacking',
    title: 'SQL Injection',
    icon: <Database className="w-8 h-8" />,
    difficulty: 'Intermediate',    description: 'Master one of the most dangerous web vulnerabilities that allows attackers to manipulate database queries, bypass authentication, extract sensitive data, and modify or delete database records through malicious SQL code injection.',
    realWorldExample: 'The 2019 Capital One breach exposed over 100 million customer records and 140,000 Social Security numbers through SQL injection combined with SSRF vulnerabilities, resulting in $190 million in settlements. The attacker exploited a misconfigured web application firewall to access AWS S3 buckets containing sensitive customer data spanning 2005-2019.',
    keyTakeaways: [
      'SQL injection exploits poor input validation to inject malicious SQL code into application queries',
      'Attack types include: Classic SQLi, UNION-based, Boolean blind, and Time-based blind injection',
      'Can bypass authentication using payloads like \' OR \'1\'=\'1\' -- to make WHERE clauses always true',
      'UNION attacks combine multiple SELECT statements to extract data from unauthorized tables',
      'Ranked in OWASP Top 10 (A03:2021 - Injection) as one of the most critical web application risks',
      'Real-world impacts: Heartland Payment Systems (130M cards), Sony Pictures (1M accounts), Capital One (100M records)',
      'Primary defense is parameterized queries/prepared statements that separate SQL code from user data',
      'Additional protections: input validation, least privilege database accounts, WAFs, and error handling'
    ],
    defenses: [
      'Use parameterized queries/prepared statements (primary defense)',
      'Input validation and sanitization with whitelisting',
      'Principle of least privilege for database access (no admin credentials for web apps)',
      'Web Application Firewalls (WAF) with OWASP Core Rule Set',
      'Never display detailed database errors to users',
      'Monitor database logs for unusual query patterns',
      'Regular security audits and penetration testing',
      'Implement intrusion detection systems (IDS)'
    ],
    detailedComponent: (props) => <SQLInjectionConcept {...props} />
  },
  {
    id: 13,
    category: 'Traditional Hacking',
    title: 'Cross-Site Scripting (XSS)',
    icon: <Code className="w-8 h-8" />,
    difficulty: 'Intermediate',    description: 'Understand how attackers inject malicious scripts into trusted websites.',
    realWorldExample: 'XSS attacks on major platforms like Twitter and MySpace have compromised millions of user sessions.',
    keyTakeaways: [
      'Injects malicious JavaScript into web pages',
      'Types: Stored XSS, Reflected XSS, DOM-based XSS',
      'Can steal cookies, hijack sessions, deface websites',
      'Exploits trust users have in legitimate sites'
    ],
    defenses: [
      'Output encoding/escaping',
      'Content Security Policy (CSP)',
      'Input validation and sanitization',
      'HttpOnly and Secure flags on cookies'
    ],
    detailedComponent: (props) => <XSSConcept {...props} />
  },
  {
    id: 14,
    category: 'Traditional Hacking',
    title: 'Social Engineering & Phishing',
    icon: <Users className="w-8 h-8" />,
    difficulty: 'Beginner',    description: 'Learn how attackers manipulate humans, the weakest link in security.',
    realWorldExample: '90% of data breaches involve human error. The 2016 DNC hack started with a phishing email.',
    keyTakeaways: [
      'Exploits human psychology, not technical vulnerabilities',
      'Phishing: Fake emails/sites to steal credentials',
      'Pretexting: Creating false scenarios to extract info',
      'Most successful attack vector against organizations'
    ],
    defenses: [
      'Security awareness training',
      'Email authentication (SPF, DKIM, DMARC)',
      'Multi-factor authentication (MFA)',
      'Verify requests through alternate channels'
    ],
    detailedComponent: (props) => <SocialEngineeringConcept {...props} />
  },
  {
    id: 15,
    category: 'Traditional Hacking',
    title: 'Network Scanning & Enumeration',
    icon: <Target className="w-8 h-8" />,
    difficulty: 'Intermediate',    description: 'Discover how hackers map networks and identify vulnerable services.',
    realWorldExample: 'Shodan search engine exposes millions of vulnerable IoT devices through automated scanning.',
    keyTakeaways: [
      'Scanning: Identifying live hosts and open ports',
      'Enumeration: Extracting detailed system information',
      'Tools: Nmap, Masscan, Netcat',
      'Reveals attack surface and potential entry points'
    ],
    defenses: [
      'Firewall configuration to block unnecessary ports',
      'Intrusion Detection Systems (IDS)',
      'Network segmentation',
      'Regular vulnerability scanning'
    ],
    detailedComponent: (props) => <NetworkScanningConcept {...props} />
  },
  {
    id: 16,
    category: 'Traditional Hacking',
    title: 'Password Cracking',
    icon: <Key className="w-8 h-8" />,
    difficulty: 'Intermediate',    description: 'Learn techniques to break weak passwords and authentication systems.',
    realWorldExample: 'The RockYou data breach exposed 32 million passwords, enabling massive password analysis.',
    keyTakeaways: [
      'Brute force: Trying all possible combinations',
      'Dictionary attacks: Using common password lists',
      'Rainbow tables: Pre-computed hash lookups',
      'Weak passwords remain the #1 security vulnerability'
    ],
    defenses: [
      'Strong password policies (length, complexity)',
      'Password salting before hashing',
      'Multi-factor authentication (MFA)',
      'Account lockout after failed attempts'
    ],
    detailedComponent: (props) => <PasswordCrackingConcept {...props} />
  },
  {
    id: 17,
    category: 'Traditional Hacking',
    title: 'Man-in-the-Middle (MitM) Attacks',
    icon: <AlertTriangle className="w-8 h-8" />,
    difficulty: 'Advanced',    description: 'Understand how attackers intercept and manipulate communications between parties.',
    realWorldExample: 'Public WiFi hotspots are prime targets for MitM attacks, intercepting login credentials and sensitive data.',
    keyTakeaways: [
      'Attacker secretly relays/alters communications',
      'Can intercept credentials, session tokens, sensitive data',
      'Common on unsecured WiFi networks',
      'Enables eavesdropping and data manipulation'
    ],
    defenses: [
      'Use HTTPS/TLS for all communications',
      'VPN on untrusted networks',
      'Certificate pinning',
      'Avoid unsecured public WiFi for sensitive tasks'
    ],
    detailedComponent: (props) => <MitMAttacksConcept {...props} />
  },
  {
    id: 18,
    category: 'Traditional Hacking',
    title: 'Denial of Service (DoS)',
    icon: <Zap className="w-8 h-8" />,
    difficulty: 'Intermediate',    description: 'Learn how attackers overwhelm systems to make them unavailable.',
    realWorldExample: 'The 2016 Dyn DDoS attack using Mirai botnet took down major sites including Twitter, Netflix, and Reddit.',
    keyTakeaways: [
      'Floods target with excessive requests',
      'DDoS: Distributed attack from multiple sources',
      'Can target network, application, or specific services',
      'Motivation: extortion, activism, or competitive sabotage'
    ],
    defenses: [
      'Rate limiting and traffic filtering',
      'DDoS protection services (Cloudflare, Akamai)',
      'Load balancing and scalable infrastructure',
      'Intrusion Prevention Systems (IPS)'
    ],
    detailedComponent: (props) => <DoSAttacksConcept {...props} />
  },
  {
    id: 19,
    category: 'Traditional Hacking',
    title: 'Web Application Vulnerabilities',
    icon: <Globe className="w-8 h-8" />,
    difficulty: 'Intermediate',    description: 'Explore common weaknesses in web applications beyond XSS and SQL injection.',
    realWorldExample: 'Equifax breach exposed 147 million records due to unpatched Apache Struts vulnerability.',
    keyTakeaways: [
      'OWASP Top 10: Most critical web app risks',
      'Includes: broken auth, sensitive data exposure, XXE, SSRF',
      'Often result from poor secure coding practices',
      'Regular security testing is essential'
    ],
    defenses: [
      'Follow OWASP Secure Coding Practices',
      'Regular security assessments and penetration testing',
      'Input validation on client AND server side',
      'Keep frameworks and dependencies updated'
    ],
    detailedComponent: (props) => <WebAppVulnerabilitiesConcept {...props} />
  },
  {
    id: 20,
    category: 'Traditional Hacking',
    title: 'Penetration Testing Methodology',
    icon: <Trophy className="w-8 h-8" />,
    difficulty: 'Advanced',    description: 'Master the complete ethical hacking lifecycle and professional testing methodology. This comprehensive module covers all five phases of penetration testing following industry standards including PTES, OWASP, and NIST SP 800-115.',
    realWorldExample: 'Companies like Google, Tesla, and Microsoft pay millions annually through bug bounty programs. In 2023, HackerOne reported over $300 million in bounties paid to ethical hackers who discovered critical vulnerabilities before malicious actors could exploit them.',
    keyTakeaways: [
      'Five-phase methodology: Planning & Scoping, Reconnaissance, Scanning & Enumeration, Exploitation, Reporting',
      'Legal authorization is MANDATORY - unauthorized access is a federal crime under CFAA',
      'Professional certifications: OSCP, CEH, GPEN demonstrate industry expertise',
      'Complete documentation includes executive summary, technical findings, CVSS risk ratings, and remediation roadmap',
      'Tools mastery: Nmap, Metasploit, Burp Suite, Nessus, sqlmap, and specialized frameworks',
      'Bug bounty programs provide legal platforms for ethical hacking (HackerOne, Bugcrowd)',
      'Post-exploitation requires careful scope adherence and evidence preservation'
    ],
    defenses: [
      'Conduct regular penetration testing (quarterly for critical systems, annually minimum)',
      'Implement bug bounty programs for continuous security validation',
      'Red team vs Blue team exercises to test detection and response capabilities',
      'Establish remediation SLAs: Critical (24-48 hrs), High (7 days), Medium (30 days)',
      'Validate fixes through re-testing before closing findings',
      'Train development teams on OWASP Top 10 and secure coding practices'
    ],
    detailedContent: true,
    componentPath: 'PenetrationTestingConcept',
    detailedComponent: (props) => <PenetrationTestingConcept {...props} />
  }
];
