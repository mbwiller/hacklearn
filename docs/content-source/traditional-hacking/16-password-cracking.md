# Module #16: Password Cracking & Credential Attacks

## Real-World Breach Examples

### 1. RockYou (2009)
- **Company:** RockYou Inc. (Social gaming company)
- **Year:** December 2009
- **Credentials Compromised:** 32 million plaintext passwords
- **Hash Type:** NONE - passwords stored in plaintext
- **Storage Method:** Unencrypted SQL database
- **Time to Crack:** Instant (no encryption)
- **Financial Impact:** $250,000+ in settlements
- **Outcome:** Became the foundation for password research and the infamous "rockyou.txt" wordlist used globally. Revealed that "123456" was the most common password (290,731 users).
- **Key Statistics:** 20 most common passwords used by 50%+ of users; only 0.2% contained special characters

### 2. LinkedIn (2012)
- **Company:** LinkedIn Corporation
- **Year:** June 2012 (discovered), 2016 (full scope revealed)
- **Credentials Compromised:** 117 million email addresses and passwords
- **Hash Type:** SHA-1 (unsalted)
- **Storage Method:** Simple SHA-1 hashing with no salt
- **Time to Crack:** 90% cracked within days using GPU acceleration
- **Financial Impact:** $1.25 million settlement in class-action lawsuit
- **Outcome:** Hackers used rainbow tables and dictionary attacks to crack 6.5 million passwords initially. In 2016, the full 117 million password database was sold on the dark web for 5 bitcoin (~$2,200).
- **Technical Details:** No salting allowed rapid rainbow table attacks; GPU cracking achieved 8.2 billion SHA-1 hashes/second

### 3. Adobe (2013)
- **Company:** Adobe Systems
- **Year:** October 2013
- **Credentials Compromised:** 153 million user accounts
- **Hash Type:** 3DES (symmetric encryption, improperly implemented)
- **Storage Method:** 3DES-ECB with password hints stored in plaintext
- **Time to Crack:** 100+ million passwords cracked using hints and pattern analysis
- **Financial Impact:** $1.1 million settlement + estimated $50 million in damages
- **Outcome:** Largest password breach at the time. Used ECB mode (Electronic Codebook) which allowed pattern analysis. Same passwords produced identical ciphertext, enabling massive-scale pattern matching attacks.
- **Attack Innovation:** Password hints in plaintext revealed actual passwords; ECB mode allowed frequency analysis

### 4. Yahoo (2013-2014)
- **Company:** Yahoo Inc.
- **Year:** 2013 (3 billion accounts), 2014 (500 million accounts)
- **Credentials Compromised:** 3+ billion user accounts (entire user base)
- **Hash Type:** MD5 (unsalted for many accounts)
- **Storage Method:** MD5 and bcrypt (mixed implementation)
- **Time to Crack:** Millions cracked within weeks; bcrypt-protected accounts more resistant
- **Financial Impact:** $350 million reduction in Verizon acquisition price, $117.5 million settlement
- **Outcome:** Largest data breach in history at the time. State-sponsored attack attributed to Russian intelligence.
- **Impact Statistics:** MD5 passwords: 90%+ cracked within 30 days; bcrypt passwords: <5% cracked after 6 months

### 5. Ashley Madison (2015)
- **Company:** Ashley Madison (Avid Life Media)
- **Year:** July 2015
- **Credentials Compromised:** 36 million user accounts
- **Hash Type:** bcrypt (passwords) + MD5 (login tokens)
- **Storage Method:** bcrypt with cost factor 12 (strong), but MD5 tokens stored separately
- **Time to Crack:** bcrypt passwords extremely difficult; 11 million weak passwords cracked over 6 months
- **Financial Impact:** $11.2 million settlement, company nearly bankrupted
- **Outcome:** Despite strong bcrypt implementation, attackers cracked 4,000+ passwords using leaked source code that revealed an MD5 login token vulnerability.
- **Technical Analysis:** bcrypt cost factor 12: ~5-8 hashes/second (extremely slow); MD5 login tokens bypassed strong password hashing

### 6. Collection #1-5 (2019)
- **Company:** Multiple sources (aggregated)
- **Year:** January 2019 (published)
- **Credentials Compromised:** 2.2 billion+ unique email/password combinations
- **Hash Type:** Mix of plaintext, MD5, SHA-1, SHA-256 (from various breaches)
- **Storage Method:** Aggregation of 12,000+ previous data breaches
- **Time to Crack:** N/A (aggregated from already-cracked credentials)
- **Financial Impact:** Immeasurable - enabled credential stuffing attacks globally
- **Outcome:** Largest compilation of breached credentials ever published. Contains passwords from LinkedIn, Adobe, Yahoo, and hundreds of smaller breaches.
- **Credential Stuffing Impact:** Used in 80%+ of credential stuffing attacks (2019-2020); average success rate: 0.1%-2% per target site

### 7. COMB - Compilation of Many Breaches (2021)
- **Company:** Multiple sources (aggregated)
- **Year:** February 2021
- **Credentials Compromised:** 3.2 billion+ unique email/password pairs
- **Hash Type:** Plaintext (compiled from already-cracked credentials)
- **Storage Method:** 100GB+ text file, organized alphabetically
- **Time to Crack:** N/A (plaintext compilation)
- **Financial Impact:** Ongoing - still used in credential stuffing attacks
- **Outcome:** Successor to Collection #1-5. Contains credentials from Netflix, LinkedIn, Bitcoin, Yahoo, and thousands of other services.
- **Attack Statistics (2021-2024):** 193 billion credential stuffing attacks detected globally; 24% increase year-over-year

### 8. LastPass Master Password Breach (2022)
- **Company:** LastPass (GoTo Company)
- **Year:** August-October 2022
- **Credentials Compromised:** Customer vault backups with encrypted passwords
- **Hash Type:** PBKDF2-HMAC-SHA256 (user master passwords)
- **Storage Method:** PBKDF2 with 100,100 iterations (default); some users had only 5,000 iterations
- **Time to Crack:** Estimated 10 million+ guesses per second for weak master passwords
- **Financial Impact:** Reputation damage, ongoing litigation
- **Outcome:** Attackers stole encrypted vault backups. Users with weak master passwords and low iteration counts are vulnerable to offline brute-force attacks. Estimated that 25%+ of vaults with weak master passwords could be cracked within 1 year.
- **Critical Lesson:** Default 100,100 iterations (2018+) secure; legacy 5,000 iterations (pre-2018) vulnerable to GPU cracking

---

## Hash Algorithms

### Fast Cryptographic Hashes (INSECURE for passwords)

**MD5 (Message Digest Algorithm 5)**
- Output: 128 bits (32 hex characters)
- Speed: 8-10 billion hashes/second (NVIDIA RTX 4090)
- Security: BROKEN - collisions discovered
- Usage: Legacy systems only (still found in 15% of websites)

**SHA-1 (Secure Hash Algorithm 1)**
- Output: 160 bits (40 hex characters)
- Speed: 8-12 billion hashes/second (GPU)
- Security: BROKEN - collision attacks demonstrated in 2017
- Usage: Deprecated by NIST in 2011

**SHA-256 / SHA-512 (SHA-2 Family)**
- Output: 256 bits / 512 bits
- Speed: 2-3 billion (SHA-256) / 1-2 billion (SHA-512) hashes/second
- Security: Secure for general cryptography, but TOO FAST for password hashing
- Usage: Not recommended for passwords without key derivation

### Password-Specific Algorithms (SECURE)

**bcrypt**
- Based on: Blowfish cipher (Eksblowfish)
- Cost Factor: 4-31 (recommended: 12-14)
- Speed: 5-10 hashes/second at cost 12
- Security: Excellent - GPU-resistant due to memory requirements
- Usage: Recommended by OWASP, widely deployed (Django, Ruby on Rails, PHP)

**scrypt**
- Based on: PBKDF2 + large memory requirements
- Parameters: N (CPU/memory cost), r (block size), p (parallelization)
- Speed: Configurable (typically 1-10 hashes/second)
- Security: Excellent - memory-hard, resists GPU/ASIC attacks
- Usage: Cryptocurrency wallets, high-security applications

**Argon2**
- Based on: Winner of Password Hashing Competition (2015)
- Variants: Argon2d (data-dependent), Argon2i (data-independent), Argon2id (hybrid)
- Parameters: Memory cost, time cost, parallelism
- Speed: Configurable (typically 1-5 hashes/second)
- Security: BEST-IN-CLASS - resistant to GPU, ASIC, side-channel attacks
- Usage: Recommended by OWASP (2023+)

**PBKDF2 (Password-Based Key Derivation Function 2)**
- Based on: HMAC + pseudorandom function
- Iterations: 100,000-600,000 (NIST recommends 210,000+ for PBKDF2-HMAC-SHA256)
- Speed: Depends on iterations (typically 100-1,000 hashes/second)
- Security: Good if iteration count is high enough
- Usage: Apple iOS, WPA2, TLS

### Legacy/Windows Systems

**NTLM (NT LAN Manager)**
- Based on: MD4 hash
- Speed: 50-100 billion hashes/second (GPU)
- Security: EXTREMELY WEAK - no salting, based on broken MD4
- Usage: Windows authentication (still present for backward compatibility)

**LM Hash (LAN Manager)**
- Based on: DES encryption
- Speed: Instant (rainbow tables available)
- Security: COMPLETELY BROKEN - splits passwords into 7-char chunks, case-insensitive
- Usage: Disabled by default since Windows Vista

---

## Attack Types

### Brute Force Attack
- **Description:** Systematically trying every possible character combination
- **Effectiveness:** 100% given enough time
- **Performance:** 8-char alphanumeric: 2.8 trillion combinations (3 days on GPU for NTLM, 8,900 years for bcrypt cost 12)

### Dictionary Attack
- **Description:** Testing passwords from pre-compiled lists
- **Effectiveness:** Cracks 30-50% of passwords in typical breaches
- **Common Wordlists:** rockyou.txt (14 million), CrackStation (1.5 billion), SecLists

### Mask Attack
- **Description:** Brute force with patterns (e.g., "?u?l?l?l?l?d?d" = Capital + 4 lowercase + 2 digits)
- **Effectiveness:** Reduces keyspace by 90%+ for common patterns
- **Common Patterns:** Name + year (John1990), Word + special + digits (password!23)

### Hybrid Attack
- **Description:** Combines dictionary words with rule-based modifications
- **Effectiveness:** Cracks 60-70% of passwords in typical breaches
- **Example Rules:** Append year (password → password2024), Leetspeak (password → p@ssw0rd)

### Combinator Attack
- **Description:** Concatenates words from multiple dictionaries
- **Example:** "blue" + "ocean" = "blueocean"

### Rainbow Table Attack
- **Description:** Uses pre-computed hash tables to instantly reverse hashes
- **Effectiveness:** 100% for unsalted hashes, useless against salted hashes
- **Storage:** NTLM rainbow tables: 64GB (covers 99% of 8-char passwords)
- **Mitigation:** Salting makes rainbow tables infeasible

### Rule-Based Attack
- **Description:** Applies linguistic and statistical transformations to dictionary words
- **Effectiveness:** Cracks 40-60% of complex passwords that pass basic policy checks
- **Rule Examples:** Append "1995", Capitalize first letter, Append "!@", Replace 's' with '0'

---

## GPU Acceleration

**Performance Benchmarks (NVIDIA RTX 4090):**
- NTLM: 200 billion hashes/second
- MD5: 10 billion hashes/second
- SHA-256: 3 billion hashes/second
- bcrypt (cost 5): 110,000 hashes/second
- bcrypt (cost 12): 8 hashes/second
- Argon2: 5 hashes/second

**Cloud-Based Cracking:**
- AWS EC2 P4d instances (8× NVIDIA A100): $32/hour
- Google Cloud Platform A100 instances: ~$25/hour

---

## Password Entropy

**Formula:** E = log₂(R^L)
- R = character set size
- L = password length

**Entropy Benchmarks:**
- <28 bits: Very weak (cracked instantly)
- 28-35 bits: Weak (seconds-minutes)
- 36-59 bits: Reasonable (hours-days)
- 60-79 bits: Strong (years)
- 80+ bits: Very strong (centuries)

**Example Calculations:**
- "password" (8 lowercase): 37.6 bits
- "P@ssw0rd" (8 mixed): ~52 bits (but predictable pattern reduces effective entropy)
- "correct horse battery staple" (4 random words): ~44 bits
- "Xk2$mP9#qL4!nR7@" (16 random mixed): ~95 bits

---

## MITRE ATT&CK Techniques

- **T1110.001 - Password Guessing:** Guessing passwords manually or with limited automation
- **T1110.002 - Password Cracking:** Offline cracking of stolen password hashes
- **T1110.003 - Password Spraying:** Testing single common password against many accounts
- **T1110.004 - Credential Stuffing:** Using breached credentials from one service to access others

---

## Tools Research

### Cracking Tools

**1. Hashcat**
- Industry-leading password cracking tool with GPU acceleration
- Attack modes: Dictionary, brute-force, mask, combinator, hybrid, rule-based
- 300+ hash algorithms supported
- Performance: NTLM 200 GH/s, MD5 103 GH/s, SHA-256 35 GH/s, bcrypt cost 5: 110 KH/s

**2. John the Ripper**
- Open-source password cracker with 400+ hash formats
- Automatic hash type detection
- Custom wordlist rules (Markov chains)
- CPU and GPU modes
- "Single crack" mode: Uses account info to generate passwords

**3. THC Hydra**
- Network login cracker supporting 50+ protocols
- Protocols: HTTP(S), SSH, Telnet, FTP, RDP, VNC, MySQL, PostgreSQL, SMTP, POP3, IMAP, SMB
- Performance: 16+ parallel connections, ~50-200 attempts/second

**4. Medusa**
- Modular, parallel, brute-force login cracker
- 21+ protocols supported
- Better stability and error handling than Hydra
- Module-based architecture

**5. Cain and Abel**
- Windows-based password recovery tool with GUI
- Extract Windows passwords (LM, NTLM hashes from SAM database)
- ARP poisoning for MitM attacks
- Rainbow table attacks

**6. RainbowCrack**
- Specialized tool for rainbow table attacks
- NTLM alphanumeric 1-8 chars: 64GB table, 99.9% coverage
- MD5 lowercase 1-9 chars: 900GB table
- Useless against salted hashes

**7. L0phtCrack**
- Commercial password auditing tool for Windows
- Windows password auditing (Local, Domain, Active Directory)
- Pre-built wordlists and rules
- Compliance reporting
- Pricing: ~$1,295/license

**8. Ophcrack**
- Free Windows password cracker using rainbow tables
- Cracks LM and NTLM hashes
- Bootable LiveCD/USB for offline password recovery
- Includes free rainbow tables (alphanumeric 1-6 chars)

**9. Ncrack**
- High-speed network authentication cracking tool (Nmap project)
- Protocols: SSH, RDP, FTP, Telnet, HTTP(S), POP3, MySQL, PostgreSQL, SMB, VNC, SIP
- Timing templates and dynamic connection pooling

**10. Patator**
- Multi-purpose brute-forcer written in Python
- 20+ modules
- Easy to extend with Python scripts
- Better rate limiting and evasion capabilities

**11. Burp Suite Intruder**
- Web application brute-forcing module
- GUI-based with advanced customization
- Payload position markers
- Multiple attack types (sniper, battering ram, pitchfork, cluster bomb)

**12. pipal**
- Password analysis and statistics tool
- Generates reports on password patterns
- Character distribution, password length, mask analysis

**13. PACK (Password Analysis and Cracking Kit)**
- Suite for password analysis and mask generation for Hashcat
- statsgen.py: Generate statistics from password lists
- maskgen.py: Create optimized mask files for Hashcat
- Efficiency Gain: Reduces cracking time by 60-80%

**14. CeWL (Custom Word List Generator)**
- Spider tool that crawls websites to generate custom wordlists
- Target-specific wordlists have 5-10× higher crack rate
- Extract metadata from documents

### Defense Tools

**1. PAM (Pluggable Authentication Modules)**
- Linux authentication framework
- Password complexity requirements (pam_pwquality)
- Failed login attempt tracking
- Account lockout policies

**2. Fail2ban**
- Intrusion prevention tool
- Monitors SSH, FTP, web server, email server logs
- Automatic IP blocking via firewall rules
- Effectiveness: Reduces SSH brute-force by 99%+

**3. DenyHosts**
- SSH-specific log analysis tool
- Blocks IP addresses after repeated failed logins
- Synchronization servers (global blocklist sharing)

**4. Google Authenticator / Authy (TOTP MFA)**
- Time-based One-Time Password implementations
- Google Authenticator: Open-source, integrates with PAM
- Authy: Multi-device support, cloud backup
- Security Impact: MFA blocks 99.9% of automated attacks (Microsoft 2022)

**5. Password Managers**
- **1Password:** AES-256, zero-knowledge, password strength analysis
- **Bitwarden:** Open-source, self-hostable, AES-256 + PBKDF2 (100,000+ iterations)
- **KeePass:** Open-source, offline database, AES-256 or ChaCha20

**6. zxcvbn**
- Password strength estimator by Dropbox
- Detects common patterns (dates, keyboard patterns, repeated characters)
- Estimates crack time based on threat model
- Used by: Dropbox, WordPress, Drupal, 1Password

**7. Have I Been Pwned (HIBP) API**
- Service by Troy Hunt
- 11+ billion accounts indexed
- 613+ million pwned passwords
- k-Anonymity model (only first 5 chars of SHA-1 hash sent)
- Statistics: "123456" seen 37 million times; "password" 9.5 million times

**8. Microsoft Defender for Identity**
- Enterprise-grade identity threat detection for Active Directory
- Real-time detection of pass-the-hash attacks
- Credential theft detection (Mimikatz, DCSync)
- Brute-force and password spray detection

---

## Academic & Official References

### Official Standards
1. NIST SP 800-63B: Digital Identity Guidelines
2. OWASP Authentication Cheat Sheet
3. OWASP Password Storage Cheat Sheet
4. CWE-521: Weak Password Requirements
5. CVE-2012-1457: LinkedIn Unsalted Password Storage

### Academic Papers
6. Bonneau et al. (2012): "The Quest to Replace Passwords" - IEEE S&P
7. Florencio & Herley (2007): "Large-Scale Study of Web Password Habits"
8. Ur et al. (2015): "Measuring Real-World Password Guessability" - USENIX
9. Dell'Amico et al. (2010): "SIMD-based cracking of hash functions"
10. Kelley et al. (2012): "Guess Again: Measuring Password Strength" - IEEE S&P
11. Weir et al. (2009): "Password Cracking Using PCFGs" - IEEE S&P
12. Provos & Mazières (1999): "A Future-Adaptable Password Scheme" (bcrypt) - USENIX
13. Biryukov et al. (2016): "Argon2: The Memory-Hard Function"
14. Percival (2009): "Stronger Key Derivation via Sequential Memory-Hard Functions" (scrypt)

### Industry Reports
15. Verizon DBIR 2024: 86% of breaches involve stolen credentials
16. Microsoft Security Intelligence Report: 99.9% MFA effectiveness
17. Akamai State of Internet Security: 193 billion credential stuffing attacks
18. Troy Hunt HIBP Statistics: 11.9 billion accounts, 613 million passwords
19. Rapid7 National Exposure Index: 62% of SSH servers allow password auth

### Case Studies
20. SANS Institute: "The Anthem Breach: A Case Study"
21. U.S. DOJ Indictment: Russian FSB Officers for Yahoo Breach
22. KrebsOnSecurity: "Adobe Breach Detailed Analysis"

### Practice Platforms
23. HackTheBox: Password Attacks Module
24. TryHackMe: Password Security Learning Path
25. SANS SEC560: Network Penetration Testing
26. Offensive Security PWK (OSCP Certification)

### Legal & Ethical
27. U.S. CFAA - 18 U.S.C. § 1030: Unauthorized access penalties
28. EU GDPR Article 32: Security of Processing (encryption requirements)
29. PCI DSS Requirement 8: Strong Authentication
30. NIST Cybersecurity Framework: PR.AC (Access Control)

### Technical Resources
31. Hashcat Documentation & Wiki
32. John the Ripper Documentation
33. OWASP Testing Guide: Testing for Weak Password Policy

---

## Lab Concepts

### Lab 1: Hash Identification and Basic Cracking
**Skills:** Hash type identification, dictionary attacks with Hashcat

**Code Example:**
```python
import hashlib

hashes = {
    'md5': '5f4dcc3b5aa765d61d8327deb882cf99',  # password
    'sha1': '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',  # password
    'ntlm': '8846F7EAEE8FB117AD06BDD830B7586C',  # password
}

def identify_hash(hash_value):
    if hash_value.startswith('$2a$') or hash_value.startswith('$2b$'):
        return "bcrypt"
    elif len(hash_value) == 32:
        return "MD5 (likely)"
    elif len(hash_value) == 40:
        return "SHA-1 (likely)"
    elif len(hash_value) == 64:
        return "SHA-256 (likely)"
    else:
        return "Unknown"
```

### Lab 2: Rule-Based Attack with Advanced Mutations
**Skills:** Custom rules, mutations, hashcat integration

**Code Example:**
```bash
# Create rule file: append_year.rule
cat > append_year.rule << 'EOF'
$2$0$2$0
$2$0$2$1
$2$0$2$2
$2$0$2$3
$2$0$2$4
c $2$0$2$4
$! $2$0$2$4
EOF

# Test rules
echo "password" | hashcat --stdout -r append_year.rule
```

### Lab 3: Mask Attack for Targeted Cracking
**Skills:** Pattern analysis, mask optimization

**Code Example:**
```bash
# Pattern: Uppercase + 4-6 lowercase + 2 digits
hashcat -m 0 -a 3 mask_hash.txt ?u?l?l?l?l?l?l?d?d

# Optimized incremental mask
hashcat -m 0 -a 3 mask_hash.txt --increment --increment-min 8 --increment-max 10 ?u?l?l?l?l?l?l?d?d
```

### Lab 4: GPU Acceleration Benchmarking
**Skills:** Algorithm comparison, performance analysis

**Code Example:**
```bash
# Benchmark GPU performance
hashcat -b

# Calculate crack time for 8-char alphanumeric
# MD5 at 10 GH/s: 218 trillion / 10 billion = 6 hours
# bcrypt cost 12 at 10 H/s: 218 trillion / 10 = 691,000 years
```

### Lab 5: Creating Custom Wordlists with CeWL
**Skills:** Web spidering, target-specific wordlist generation

**Code Example:**
```bash
# Spider company website
cewl https://example.com -d 3 -m 6 -w custom_wordlist.txt

# Extract email addresses
cewl https://example.com -e --email_file emails.txt

# Mutate custom wordlist
hashcat --stdout custom_wordlist.txt -r /usr/share/hashcat/rules/best64.rule > mutated_wordlist.txt
```

### Lab 6: Implementing Secure Password Storage (Python)
**Skills:** bcrypt, Argon2, password validation

**Code Example:**
```python
import bcrypt
from argon2 import PasswordHasher

# bcrypt implementation
def hash_password_bcrypt(password):
    salt = bcrypt.gensalt(rounds=12)
    hashed = bcrypt.hashpw(password.encode(), salt)
    return hashed

def verify_password_bcrypt(password, hashed):
    return bcrypt.checkpw(password.encode(), hashed)

# Argon2id implementation
ph = PasswordHasher(
    time_cost=1,
    memory_cost=47104,  # 46 MB
    parallelism=1,
    hash_len=32,
    salt_len=16
)

def hash_password_argon2(password):
    return ph.hash(password)

def verify_password_argon2(password, hashed):
    try:
        ph.verify(hashed, password)
        return True
    except:
        return False
```

### Lab 7: Multi-Factor Authentication Implementation
**Skills:** TOTP generation, Google Authenticator integration

**Code Example:**
```python
import pyotp
import qrcode

# Generate secret key
secret = pyotp.random_base32()

# Create TOTP object
totp = pyotp.TOTP(secret)

# Generate current OTP
current_otp = totp.now()

# Verify OTP
def verify_otp(secret, user_otp):
    totp = pyotp.TOTP(secret)
    return totp.verify(user_otp, valid_window=1)

# Generate QR code for Google Authenticator
uri = pyotp.totp.TOTP(secret).provisioning_uri(
    name='user@example.com',
    issuer_name='HackLearn Pro'
)
qr = qrcode.make(uri)
qr.save('totp_qr.png')
```

### Lab 8: Credential Stuffing Detection and Prevention
**Skills:** Rate limiting, CAPTCHA implementation, defense strategies

**Code Example:**
```python
from collections import defaultdict
from datetime import datetime, timedelta

class RateLimiter:
    def __init__(self, max_attempts=5, window_minutes=15):
        self.max_attempts = max_attempts
        self.window = timedelta(minutes=window_minutes)
        self.attempts = defaultdict(list)

    def is_allowed(self, ip_address):
        now = datetime.now()
        self.attempts[ip_address] = [
            ts for ts in self.attempts[ip_address]
            if now - ts < self.window
        ]
        if len(self.attempts[ip_address]) >= self.max_attempts:
            return False
        self.attempts[ip_address].append(now)
        return True
```

---

## Key Statistics

- 86% of breaches involve stolen credentials or brute force (Verizon DBIR 2024)
- 99.9% of automated attacks blocked by MFA (Microsoft 2022)
- 193 billion credential stuffing attacks detected globally (Akamai 2023)
- 24% year-over-year increase in credential attacks
- Average cost per breached record: $150
- Password "123456" used by 37 million accounts (HIBP)
- GPU cracking: MD5 200 GH/s vs bcrypt cost 12: 8 H/s (25 billion times slower)
