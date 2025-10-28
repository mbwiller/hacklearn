# Module #14: Social Engineering & Phishing

## Real-World Breach Examples

### 1. Target Corporation Data Breach (2013)
- **Company:** Target Corporation
- **Year:** 2013
- **Attack Vector:** Spear phishing email sent to Fazio Mechanical Services (HVAC contractor). Attackers used stolen credentials to access Target's vendor portal, then moved laterally into Target's POS systems.
- **Social Engineering Technique:** Spear phishing + credential harvesting + third-party vendor exploitation
- **Impact:** 40 million credit/debit card numbers stolen, 70 million customer records compromised
- **Financial Cost:** $292 million (settlements, legal fees, remediation costs)
- **Outcome:** Target CIO and CEO resigned. Major security infrastructure overhaul. Class action settlements with affected customers.
- **Key Lesson:** Third-party vendors are prime social engineering targets; supply chain security critical.

### 2. RSA SecurID Breach (2011)
- **Company:** RSA Security (EMC Division)
- **Year:** 2011
- **Attack Vector:** Sophisticated spear phishing campaign targeting RSA employees with Excel attachment titled "2011 Recruitment plan.xls" containing zero-day exploit (CVE-2011-0609)
- **Social Engineering Technique:** Spear phishing with weaponized document, authority/curiosity exploitation
- **Impact:** Compromise of SecurID two-factor authentication system used by 40 million employees worldwide. Subsequent attacks on defense contractors including Lockheed Martin.
- **Financial Cost:** Estimated $66 million in remediation, token replacement costs
- **Outcome:** RSA forced to replace 40 million SecurID tokens. Led to APT1 attribution and increased focus on nation-state threats.

### 3. Twitter Bitcoin Scam (2020)
- **Company:** Twitter, Inc.
- **Year:** 2020 (July 15)
- **Attack Vector:** Social engineering attack on Twitter employees via phone spishing (vishing). Attackers impersonated IT support to gain credentials and access to internal admin tools.
- **Social Engineering Technique:** Vishing (voice phishing) + authority impersonation + insider threat exploitation
- **Impact:** 130 high-profile accounts compromised (Barack Obama, Elon Musk, Bill Gates, Apple, Uber, etc.). $118,000 stolen via Bitcoin scam; 300+ million users potentially exposed.
- **Financial Cost:** $150 million FTC settlement, $60 million proposed class action
- **Outcome:** 3 individuals arrested. Twitter implemented mandatory 2FA for employees, restricted admin tool access, enhanced security training.

### 4. Ubiquiti Networks BEC (2015)
- **Company:** Ubiquiti Networks
- **Year:** 2015
- **Attack Vector:** Business Email Compromise (BEC) - attackers impersonated executives via spoofed emails requesting international wire transfers to "vendors"
- **Social Engineering Technique:** CEO fraud/whaling, email impersonation, urgency exploitation
- **Impact:** $46.7 million fraudulently transferred to overseas accounts
- **Financial Cost:** $46.7 million initial loss; recovered $8.1 million (net loss: $38.6 million)
- **Outcome:** Lawsuit against banks for failing to verify transactions. Enhanced email authentication (DMARC), wire transfer verification procedures implemented.

### 5. Crelan Bank CEO Fraud (2016)
- **Company:** Crelan Bank (Belgium)
- **Year:** 2016
- **Attack Vector:** Whaling attack via spoofed emails impersonating CEO requesting urgent wire transfers
- **Social Engineering Technique:** Whaling (CEO fraud), authority exploitation, urgency/time pressure
- **Impact:** €70 million ($75.8 million USD) fraudulently transferred
- **Financial Cost:** €70 million loss; CEO resigned
- **Outcome:** One of largest BEC attacks in history. Led to resignation of CEO and major security policy changes in European banking sector.

### 6. FACC Aerospace BEC Attack (2016)
- **Company:** FACC AG (Austrian aerospace manufacturer)
- **Year:** 2016
- **Attack Vector:** Whaling/BEC attack impersonating CEO requesting €50 million transfer for "acquisition project"
- **Social Engineering Technique:** CEO fraud, urgency, confidentiality exploitation
- **Impact:** €50 million ($54.6 million USD) lost to fraudulent transfers
- **Financial Cost:** €50 million direct loss; CEO and CFO fired
- **Outcome:** CEO and CFO terminated. Criminal investigation launched. Demonstrated vulnerability of even high-security aerospace contractors.

### 7. Google/Facebook W-2 Phishing (2017)
- **Company:** Google, Facebook (and thousands of other companies)
- **Year:** 2017
- **Attack Vector:** Spear phishing campaign targeting HR departments with spoofed emails from executives requesting employee W-2 tax forms
- **Social Engineering Technique:** Authority impersonation, time pressure (tax season), data exfiltration
- **Impact:** W-2 forms for thousands of employees stolen across multiple Fortune 500 companies
- **Financial Cost:** IRS reported over 900 incidents affecting 120,000+ victims in 2017 tax season. Estimated damages: $1.9 billion in fraudulent tax refunds.
- **Outcome:** IRS issued security warnings. Companies enhanced HR verification procedures. Led to widespread W-2 phishing awareness training.

### 8. Barbara Corcoran Real Estate Phishing (2020)
- **Company:** The Corcoran Group (Barbara Corcoran)
- **Year:** 2020
- **Attack Vector:** Email account compromise of assistant's email address (one character difference). Attacker sent fake invoice for real estate renovation project.
- **Social Engineering Technique:** Email spoofing, typosquatting, trusted relationship exploitation
- **Impact:** $388,000 fraudulently transferred
- **Financial Cost:** $388,000 (recovered $100,000; net loss: $288,000)
- **Outcome:** Wire transfer reversed within hours due to quick detection. Demonstrates importance of domain verification and rapid response.

---

## Cialdini's 6 Principles of Influence

### 1. Authority
People obey authority figures
- Impersonating executives (CEO fraud)
- Fake IT support, security guards, law enforcement
- Professional branding, credentials, uniforms

### 2. Scarcity
Rare opportunities are more valuable
- "Limited time offer"
- "Account will be closed in 24 hours"
- Exclusive access claims

### 3. Social Proof
People follow others' behavior
- "Your colleagues already completed this"
- Fake testimonials, reviews
- FOMO (Fear of Missing Out) exploitation

### 4. Consistency/Commitment
People honor commitments
- Multi-step attacks (foot-in-the-door technique)
- "You agreed to our terms..."
- Escalating requests after initial compliance

### 5. Liking
People trust those they like
- Building rapport before attack
- Shared interests, backgrounds
- Attractiveness, charisma exploitation

### 6. Reciprocity
People return favors
- "I helped you, now you help me"
- Free gifts followed by requests
- Quid pro quo attacks

---

## Attack Types

### Spear Phishing
- **Definition:** Targeted phishing attacks against specific individuals/organizations
- **Characteristics:** Personalized content, researched details, context-aware
- **MITRE ATT&CK:** T1566.001 (Spearphishing Attachment), T1566.002 (Spearphishing Link)
- **Example Payloads:** Weaponized documents, credential harvesting pages, malware droppers

### Whaling
- **Definition:** Spear phishing targeting high-value executives (C-level)
- **Characteristics:** High reward, extensive reconnaissance, sophisticated pretexts
- **Common Scenarios:** CEO fraud, M&A impersonation, legal/compliance urgency

### Vishing (Voice Phishing)
- **Definition:** Phone-based social engineering attacks
- **Techniques:** Caller ID spoofing, IVR manipulation, authority impersonation
- **Example:** Twitter 2020 breach - attackers called IT helpdesk

### Smishing (SMS Phishing)
- **Definition:** Phishing via SMS/text messages
- **Techniques:** Fake delivery notifications, bank alerts, 2FA bypass attempts
- **Growth:** 700% increase 2019-2023 (Proofpoint)

### Business Email Compromise (BEC)
- **Definition:** Email account compromise for financial fraud
- **Variants:** CEO Fraud, Account Compromise, Attorney Impersonation, Vendor Email Compromise
- **FBI IC3 Statistics (2022):** $2.7 billion losses, most costly cyber crime type

### Pretexting
- **Definition:** Fabricated scenarios to establish trust and extract information
- **Examples:** IT support, vendor verification, survey/research requests
- **MITRE ATT&CK:** T1598 (Phishing for Information)

### Baiting
- **Definition:** Offering something enticing to lure victims
- **Physical:** Infected USB drives, free software, prizes
- **Digital:** Free downloads, pirated content, cryptocurrency offers

### Quid Pro Quo
- **Definition:** Offering service/benefit in exchange for information/access
- **Example:** Fake IT support offering to "fix" a problem in exchange for credentials

---

## Tools Research

### Attack Tools

#### 1. Social-Engineer Toolkit (SET)
- **Type:** Open-source penetration testing framework
- **Features:**
  - Spear-phishing attack vectors
  - Website cloning for credential harvesting
  - Mass mailer with template support
  - SMS spoofing, QR code generation
  - Infectious media generator (USB payloads)
- **Platform:** Python (Linux, macOS, Windows)

#### 2. Gophish
- **Type:** Open-source phishing simulation framework
- **Features:**
  - Email template designer
  - Landing page cloning
  - Campaign scheduling and tracking
  - Real-time results dashboard
  - User interaction analytics
- **Platform:** Go (cross-platform)

#### 3. King Phisher
- **Type:** Phishing campaign toolkit
- **Features:**
  - Sophisticated campaign management
  - Email template customization
  - Geographic tracking of victims
  - Credential capture
  - GraphQL API for automation
- **Platform:** Python (Linux)

#### 4. Evilginx2
- **Type:** Man-in-the-Middle phishing framework
- **Features:**
  - Reverse proxy architecture
  - Real-time credential + session token capture
  - Bypasses 2FA/MFA by capturing cookies
  - Phishlet system (pre-built templates)
  - Works with OAuth, SAML flows
- **Platform:** Go (Linux)
- **Warning:** Advanced threat; demonstrates MFA limitations

#### 5. Modlishka
- **Type:** Reverse proxy phishing tool
- **Features:**
  - Transparent TLS proxy
  - Auto-decryption of HTTPS traffic
  - Session token extraction
  - Pattern-based credential capture
  - Plugin system for custom logic
- **Platform:** Go (Linux)

#### 6. Browser Exploitation Framework (BeEF)
- **Type:** Browser-based attack framework
- **Features:**
  - Hook browsers via XSS
  - Browser fingerprinting
  - Social engineering modules
  - Network pivoting from compromised browsers
  - Command & control via JavaScript
- **Platform:** Ruby (Linux)

#### 7. HiddenEye
- **Type:** Modern phishing tool with web interface
- **Features:**
  - 30+ pre-built phishing templates
  - Ngrok/Serveo integration for hosting
  - Keylogger functionality
  - Geolocation tracking
  - Email/SMS forwarding of captured credentials
- **Platform:** Python (Linux)

#### 8. Zphisher
- **Type:** Automated phishing toolkit
- **Features:**
  - 30+ site templates
  - Multiple port forwarding options
  - Dual credential capture (login + OTP)
  - Minimal dependencies
  - Telegram integration for notifications
- **Platform:** Bash/Shell (Linux, Termux)

### Defense Tools

#### 1. KnowBe4
- **Type:** Security awareness training and phishing simulation platform
- **Features:**
  - 1,000+ training modules
  - Automated phishing campaigns with templates
  - PhishER Plus (email analysis tool)
  - Phish Alert Button (user reporting)
  - Risk scoring and metrics
  - Compliance training (HIPAA, PCI-DSS, GDPR)
- **Platform:** Cloud-based SaaS

#### 2. Proofpoint Email Protection
- **Type:** Enterprise email security gateway
- **Features:**
  - AI-powered threat detection
  - URL rewriting and time-of-click protection
  - Attachment sandbox analysis
  - BEC/impersonation protection
  - DMARC enforcement
  - Threat intelligence integration
- **Platform:** Cloud/On-premise

#### 3. Mimecast
- **Type:** Email security and continuity platform
- **Features:**
  - Targeted Threat Protection (TTP)
  - Impersonation Protect (executive protection)
  - URL Protect (link rewriting)
  - Attachment Protect (sandboxing)
  - DMARC Analyzer
  - Security Awareness Training
- **Platform:** Cloud-based

#### 4. Cofense (PhishMe)
- **Type:** Anti-phishing platform with user reporting
- **Features:**
  - Cofense Triage (email analysis automation)
  - Phishing simulation and training
  - User-reported email analysis
  - Threat intelligence (PhishMe Intelligence)
  - Active threat hunting
- **Platform:** Cloud-based

#### 5. IronScales
- **Type:** AI-powered email security platform
- **Features:**
  - Self-learning AI (machine learning)
  - Federated learning across customers
  - Automated incident response
  - Phishing simulation integration
  - User-reported phishing analysis
  - Adaptive email classification
- **Platform:** Cloud-based API integration

#### 6. DMARC Analyzer
- **Type:** Email authentication and monitoring
- **Features:**
  - DMARC policy creation and management
  - SPF and DKIM configuration guidance
  - Email flow visibility
  - Threat intelligence reporting
  - Domain impersonation alerts
  - Compliance reporting
- **Vendors:** dmarcian, EasyDMARC, Valimail, Proofpoint DMARC

#### 7. PhishLabs (Fortra)
- **Type:** Digital risk protection platform
- **Features:**
  - 24/7 threat hunting
  - Automated phishing site takedowns
  - Domain/social media impersonation monitoring
  - Dark web monitoring
  - Executive protection (whaling defense)
  - Incident response services
- **Platform:** Managed service + SaaS

#### 8. Tessian (Proofpoint Aegis)
- **Type:** Human layer security (email DLP + behavioral analysis)
- **Features:**
  - Machine learning behavioral analysis
  - Accidental data loss prevention
  - Spear phishing detection (anomaly-based)
  - Account takeover detection
  - BEC detection via sender behavior analysis
  - Real-time user warnings (nudges)
- **Platform:** Cloud API integration (Microsoft 365, Google Workspace)

---

## Academic & Official References

### Official Guidelines
1. NIST SP 800-63-3: Digital Identity Guidelines - https://pages.nist.gov/800-63-3/
2. NIST Cybersecurity Framework v1.1 - https://www.nist.gov/cyberframework
3. MITRE ATT&CK T1566 (Phishing) - https://attack.mitre.org/techniques/T1566/
4. OWASP Top 10 2021: A07:2021 - https://owasp.org/Top10/
5. CIS Controls v8: Control 14 - https://www.cisecurity.org/controls/
6. CISA Phishing Guidance - https://www.cisa.gov/news-events/news/phishing-guidance
7. FBI IC3 BEC Reports - https://www.ic3.gov/PSA/2022/PSA220504
8. APWG Phishing Activity Trends - https://apwg.org/trendsreports/
9. ISO/IEC 27001:2013: A.7.2.2
10. PCI DSS v4.0: Requirement 12.6

### Academic Papers
1. Cialdini, R. B. (2006). "Influence: The Psychology of Persuasion"
2. Dhamija et al. (2006). "Why phishing works" - CHI '06
3. Jagatic et al. (2007). "Social phishing" - Communications of the ACM
4. Hadnagy, C. (2010). "Social Engineering: The Art of Human Hacking"
5. Mitnick, K. D. (2002). "The Art of Deception"
6. Ferreira & Lenzini (2015). "Social engineering principles in effective phishing"
7. Arachchilage & Love (2014). "Security awareness of computer users"
8. Jakobsson & Myers (2006). "Phishing and Countermeasures"
9. Hong, J. (2012). "The State of Phishing Attacks" - Communications of the ACM
10. Parsons et al. (2014). "HAIS-Q" - Computers & Security

### Industry Reports
1. Verizon 2023 DBIR: 36% of breaches involved phishing
2. Proofpoint 2023 State of the Phish: 84% of orgs experienced phishing
3. KnowBe4 2023 Phishing Benchmark: 33.2% baseline phish-prone
4. APWG Q4 2022: 4.7 million phishing sites detected
5. FBI IC3 2022: $2.7 billion BEC losses
6. Cofense 2023: 61% increase in credential phishing
7. Microsoft Digital Defense 2023: 99.9% of attacks blocked by MFA

### Technical Standards
1. RFC 7489: DMARC - https://datatracker.ietf.org/doc/html/rfc7489
2. RFC 7208: SPF - https://datatracker.ietf.org/doc/html/rfc7208
3. RFC 6376: DKIM - https://datatracker.ietf.org/doc/html/rfc6376

---

## Lab Concepts

### Lab 1: Phishing Email Analysis
**Skills:** Email header analysis, SPF/DKIM/DMARC validation, URL inspection, language pattern recognition

**Code Example:**
```python
import email
from email import policy
from email.parser import BytesParser

# Parse email headers
with open('suspicious_email.eml', 'rb') as f:
    msg = BytesParser(policy=policy.default).parse(f)

# Extract key headers
print(f"From: {msg['from']}")
print(f"Return-Path: {msg['return-path']}")
print(f"SPF: {msg['received-spf']}")
print(f"DMARC: {msg['authentication-results']}")

# Check for mismatches
sender_domain = msg['from'].split('@')[1]
return_path_domain = msg['return-path'].split('@')[1]
if sender_domain != return_path_domain:
    print("WARNING: Sender domain mismatch!")
```

### Lab 2: URL Reputation Analysis
**Skills:** VirusTotal API integration, PhishTank queries, Google Safe Browsing API

**Code Example:**
```python
import requests

def check_url_reputation(url):
    vt_url = 'https://www.virustotal.com/api/v3/urls'
    headers = {'x-apikey': 'YOUR_API_KEY'}

    response = requests.post(vt_url, headers=headers, data={'url': url})
    if response.status_code == 200:
        result = response.json()
        malicious_count = result['data']['attributes']['stats']['malicious']
        print(f"Malicious detections: {malicious_count}")
```

### Lab 3: Email Filtering with Python
**Skills:** Pattern matching, attachment validation, SPF/DKIM/DMARC validation

### Lab 4: OSINT for Social Engineering Defense
**Skills:** Domain reconnaissance, email harvesting, credential leak detection

**Code Example:**
```python
import requests

def check_breach_status(email):
    url = f'https://haveibeenpwned.com/api/v3/breachedaccount/{email}'
    headers = {'User-Agent': 'Security-Audit-Tool'}

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        breaches = response.json()
        print(f"Email found in {len(breaches)} breaches")
        for breach in breaches:
            print(f"  - {breach['Name']}: {breach['BreachDate']}")
```

### Lab 5: Building Phishing Awareness Simulation
**Skills:** Gophish installation, template creation, ethical considerations

---

## Key Statistics

- 36% of breaches involve phishing (Verizon DBIR 2023)
- $2.7 billion lost to BEC in 2022 (FBI IC3)
- 84% of organizations experienced phishing attacks (Proofpoint 2023)
- 4.7 million phishing sites detected in 2022 (APWG)
- 33.2% average baseline phish-prone percentage (KnowBe4)
- 700% increase in smishing attacks 2019-2023 (Proofpoint)
- 99.9% of account compromise attacks blocked by MFA (Microsoft 2023)
- 61% increase in credential phishing year-over-year (Cofense 2023)
