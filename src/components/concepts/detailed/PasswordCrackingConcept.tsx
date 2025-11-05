import { useState } from 'react';
import { KeyRound, ArrowLeft, Target, Shield, Code, BookOpen, Hash, Cpu, Lock, Unlock, Database, Zap, AlertTriangle } from 'lucide-react';

interface PasswordCrackingConceptProps {
  onBack?: () => void;
}

export const PasswordCrackingConcept = ({ onBack }: PasswordCrackingConceptProps = {}) => {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-16">
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
              <KeyRound className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2">Password Cracking & Credential Attacks</h1>
              <p className="text-xl text-white/90">
                Master hash algorithms, GPU acceleration, and modern authentication security
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
              MITRE ATT&CK: T1110.002
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
              { id: 'tools', label: 'Tools', icon: Cpu },
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
                Understanding Password Cracking
              </h2>
              <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-slate-800 transition-colors">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Password cracking is the process of recovering plaintext passwords from encrypted or hashed credentials.
                  Modern attacks leverage GPU acceleration to test billions of password combinations per second against
                  weakly-hashed credentials. Understanding these techniques is critical for implementing secure password
                  storage using algorithms like bcrypt, scrypt, and Argon2.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
                      <h3 className="font-semibold text-red-400">Threat Scale</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      86% of breaches involve stolen credentials or brute force attacks (Verizon DBIR 2024)
                    </p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <Zap className="w-6 h-6 text-yellow-400 mr-3" />
                      <h3 className="font-semibold text-yellow-400">GPU Power</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      NVIDIA RTX 4090: 200 billion NTLM hashes/second vs 8 bcrypt hashes/second
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <Shield className="w-6 h-6 text-green-400 mr-3" />
                      <h3 className="font-semibold text-green-400">MFA Defense</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      99.9% of automated attacks blocked by multi-factor authentication (Microsoft 2022)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Hash Algorithms */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Hash Algorithms: From Broken to Secure
              </h2>

              {/* Insecure Fast Hashes */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-red-400 mb-4 flex items-center">
                  <Unlock className="w-6 h-6 mr-3" />
                  Fast Cryptographic Hashes (INSECURE for passwords)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold text-red-400">MD5</h4>
                      <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-semibold">
                        BROKEN
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                      <p><strong className="text-red-400">Output:</strong> 128 bits (32 hex chars)</p>
                      <p><strong className="text-red-400">Speed:</strong> 10 billion hashes/second (GPU)</p>
                      <p><strong className="text-red-400">Security:</strong> Collision attacks demonstrated</p>
                      <p><strong className="text-red-400">Usage:</strong> Still found in 15% of websites (legacy)</p>
                      <div className="mt-4 p-3 bg-slate-950 rounded font-mono text-xs text-green-400">
                        5f4dcc3b5aa765d61d8327deb882cf99
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">MD5("password")</p>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold text-red-400">SHA-1</h4>
                      <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-semibold">
                        BROKEN
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                      <p><strong className="text-red-400">Output:</strong> 160 bits (40 hex chars)</p>
                      <p><strong className="text-red-400">Speed:</strong> 12 billion hashes/second (GPU)</p>
                      <p><strong className="text-red-400">Security:</strong> SHAttered attack (2017)</p>
                      <p><strong className="text-red-400">Usage:</strong> Deprecated by NIST (2011)</p>
                      <div className="mt-4 p-3 bg-slate-950 rounded font-mono text-xs text-green-400">
                        5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SHA-1("password")</p>
                    </div>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold text-orange-400">SHA-256/512</h4>
                      <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs font-semibold">
                        TOO FAST
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                      <p><strong className="text-orange-400">Output:</strong> 256/512 bits</p>
                      <p><strong className="text-orange-400">Speed:</strong> 2-3 billion hashes/second</p>
                      <p><strong className="text-orange-400">Security:</strong> Cryptographically secure</p>
                      <p><strong className="text-orange-400">Usage:</strong> Too fast for passwords without KDF</p>
                      <div className="mt-4 p-3 bg-slate-950 rounded font-mono text-xs text-green-400 break-all">
                        5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SHA-256("password")</p>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold text-red-400">NTLM (Windows)</h4>
                      <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-semibold">
                        EXTREMELY WEAK
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                      <p><strong className="text-red-400">Based on:</strong> MD4 hash</p>
                      <p><strong className="text-red-400">Speed:</strong> 200 billion hashes/second (GPU)</p>
                      <p><strong className="text-red-400">Security:</strong> No salting, based on broken MD4</p>
                      <p><strong className="text-red-400">Usage:</strong> Windows (backward compatibility)</p>
                      <div className="mt-4 p-3 bg-slate-950 rounded font-mono text-xs text-green-400">
                        8846F7EAEE8FB117AD06BDD830B7586C
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">NTLM("password")</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secure Password Hashes */}
              <div>
                <h3 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
                  <Lock className="w-6 h-6 mr-3" />
                  Password-Specific Algorithms (SECURE)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold text-green-400">bcrypt</h4>
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold">
                        EXCELLENT
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                      <p><strong className="text-green-400">Based on:</strong> Blowfish cipher (Eksblowfish)</p>
                      <p><strong className="text-green-400">Cost Factor:</strong> 4-31 (recommended: 12-14)</p>
                      <p><strong className="text-green-400">Speed:</strong> 5-10 hashes/second at cost 12</p>
                      <p><strong className="text-green-400">Security:</strong> GPU-resistant, memory-hard</p>
                      <p><strong className="text-green-400">Usage:</strong> Django, Ruby on Rails, PHP</p>
                      <div className="mt-4 p-3 bg-slate-950 rounded font-mono text-xs text-green-400 break-all">
                        $2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">bcrypt("password", cost=12)</p>
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold text-green-400">scrypt</h4>
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold">
                        EXCELLENT
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                      <p><strong className="text-green-400">Based on:</strong> PBKDF2 + large memory</p>
                      <p><strong className="text-green-400">Parameters:</strong> N (cost), r (block), p (parallel)</p>
                      <p><strong className="text-green-400">Speed:</strong> 1-10 hashes/second (configurable)</p>
                      <p><strong className="text-green-400">Security:</strong> Memory-hard, ASIC-resistant</p>
                      <p><strong className="text-green-400">Usage:</strong> Cryptocurrency wallets, high-security apps</p>
                      <div className="mt-4 p-3 bg-slate-950 rounded font-mono text-xs text-green-400 break-all">
                        400$8$1$d5ac73b796...(truncated)
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">scrypt("password", N=16384)</p>
                    </div>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold text-emerald-400">Argon2</h4>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold">
                        BEST-IN-CLASS
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                      <p><strong className="text-emerald-400">Based on:</strong> PHC Winner (2015)</p>
                      <p><strong className="text-emerald-400">Variants:</strong> Argon2d, Argon2i, Argon2id (hybrid)</p>
                      <p><strong className="text-emerald-400">Speed:</strong> 1-5 hashes/second (configurable)</p>
                      <p><strong className="text-emerald-400">Security:</strong> Resistant to GPU, ASIC, side-channel</p>
                      <p><strong className="text-emerald-400">Usage:</strong> OWASP recommended (2023+)</p>
                      <div className="mt-4 p-3 bg-slate-950 rounded font-mono text-xs text-green-400 break-all">
                        $argon2id$v=19$m=47104,t=1,p=1$...(truncated)
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Argon2id("password")</p>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold text-blue-400">PBKDF2</h4>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold">
                        GOOD
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                      <p><strong className="text-blue-400">Based on:</strong> HMAC + pseudorandom function</p>
                      <p><strong className="text-blue-400">Iterations:</strong> 100,000-600,000 (NIST: 210,000+)</p>
                      <p><strong className="text-blue-400">Speed:</strong> 100-1,000 hashes/second</p>
                      <p><strong className="text-blue-400">Security:</strong> Good if iteration count high enough</p>
                      <p><strong className="text-blue-400">Usage:</strong> Apple iOS, WPA2, TLS</p>
                      <div className="mt-4 p-3 bg-slate-950 rounded font-mono text-xs text-green-400 break-all">
                        pbkdf2:sha256:260000$...(truncated)
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PBKDF2("password", iters=260000)</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Attack Types */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Attack Types & Methodologies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <div className="flex items-center mb-4">
                    <Hash className="w-6 h-6 text-red-400 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Brute Force</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Systematically trying every possible character combination until the correct password is found.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-red-400">Effectiveness:</strong> 100% given enough time</p>
                    <p><strong className="text-red-400">Example:</strong> 8-char alphanumeric: 2.8 trillion combinations</p>
                    <p><strong className="text-red-400">Time (NTLM):</strong> 3 days on GPU</p>
                    <p><strong className="text-red-400">Time (bcrypt cost 12):</strong> 8,900 years</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <div className="flex items-center mb-4">
                    <BookOpen className="w-6 h-6 text-orange-400 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Dictionary Attack</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Testing passwords from pre-compiled wordlists based on common passwords and leaked credentials.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-orange-400">Effectiveness:</strong> Cracks 30-50% of passwords in typical breaches</p>
                    <p><strong className="text-orange-400">Wordlists:</strong> rockyou.txt (14M), CrackStation (1.5B)</p>
                    <p><strong className="text-orange-400">Speed:</strong> Seconds to minutes for common passwords</p>
                    <p><strong className="text-orange-400">Example:</strong> "password123" found in rockyou.txt</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <div className="flex items-center mb-4">
                    <Target className="w-6 h-6 text-yellow-400 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Mask Attack</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Brute force with pattern templates (e.g., "?u?l?l?l?l?d?d" = Capital + 4 lowercase + 2 digits).
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-yellow-400">Effectiveness:</strong> Reduces keyspace by 90%+ for common patterns</p>
                    <p><strong className="text-yellow-400">Patterns:</strong> Name+year (John1990), Word+special+digits</p>
                    <p><strong className="text-yellow-400">Hashcat:</strong> ?u=upper, ?l=lower, ?d=digit, ?s=special</p>
                    <p><strong className="text-yellow-400">Example:</strong> Password!23 = ?u?l?l?l?l?l?l?l?s?d?d</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <div className="flex items-center mb-4">
                    <Zap className="w-6 h-6 text-green-400 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Hybrid Attack</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Combines dictionary words with rule-based modifications (append year, leetspeak, capitalization).
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-green-400">Effectiveness:</strong> Cracks 60-70% of passwords in typical breaches</p>
                    <p><strong className="text-green-400">Rules:</strong> Append year (password → password2024)</p>
                    <p><strong className="text-green-400">Leetspeak:</strong> password → p@ssw0rd</p>
                    <p><strong className="text-green-400">Tools:</strong> Hashcat --rules, John the Ripper rules</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <div className="flex items-center mb-4">
                    <Database className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Rainbow Table</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Uses pre-computed hash tables to instantly reverse unsalted hashes through lookup.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-purple-400">Effectiveness:</strong> 100% for unsalted hashes, useless against salted</p>
                    <p><strong className="text-purple-400">Storage:</strong> NTLM tables: 64GB (99% of 8-char passwords)</p>
                    <p><strong className="text-purple-400">Speed:</strong> Instant lookup (milliseconds)</p>
                    <p><strong className="text-purple-400">Mitigation:</strong> Salting makes rainbow tables infeasible</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <div className="flex items-center mb-4">
                    <Code className="w-6 h-6 text-blue-400 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Rule-Based Attack</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Applies linguistic and statistical transformations to dictionary words using custom rules.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-blue-400">Effectiveness:</strong> 40-60% of complex passwords passing basic policy</p>
                    <p><strong className="text-blue-400">Rules:</strong> Capitalize first letter, append "!@", replace 's' with '0'</p>
                    <p><strong className="text-blue-400">Markov Chains:</strong> Statistical character probability models</p>
                    <p><strong className="text-blue-400">Example:</strong> "summer" → "Summer!", "Summer2024!", "Summ3r!"</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Breaches */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Real-World Password Breaches
              </h2>
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-red-400">RockYou (2009)</h3>
                    <span className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg text-sm font-semibold">
                      32M Plaintext
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                    <div>
                      <p className="mb-2"><strong className="text-red-400">Hash Type:</strong> NONE - stored in plaintext</p>
                      <p className="mb-2"><strong className="text-red-400">Storage:</strong> Unencrypted SQL database</p>
                      <p className="mb-2"><strong className="text-red-400">Time to Crack:</strong> Instant (no encryption)</p>
                      <p className="mb-2"><strong className="text-red-400">Financial Impact:</strong> $250,000+ settlements</p>
                    </div>
                    <div>
                      <p className="mb-2"><strong className="text-red-400">Outcome:</strong> Became foundation for password research and the infamous "rockyou.txt" wordlist used globally</p>
                      <p className="mb-2"><strong className="text-red-400">Statistics:</strong> Most common password "123456" (290,731 users); 50%+ used top 20 passwords</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-orange-400">LinkedIn (2012)</h3>
                    <span className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-lg text-sm font-semibold">
                      117M SHA-1 Unsalted
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                    <div>
                      <p className="mb-2"><strong className="text-orange-400">Hash Type:</strong> SHA-1 (unsalted)</p>
                      <p className="mb-2"><strong className="text-orange-400">Time to Crack:</strong> 90% cracked within days using GPU</p>
                      <p className="mb-2"><strong className="text-orange-400">Financial Impact:</strong> $1.25M class-action settlement</p>
                      <p className="mb-2"><strong className="text-orange-400">Dark Web:</strong> Full database sold for 5 bitcoin (~$2,200)</p>
                    </div>
                    <div>
                      <p className="mb-2"><strong className="text-orange-400">Attack Method:</strong> Rainbow tables + dictionary attacks</p>
                      <p className="mb-2"><strong className="text-orange-400">GPU Performance:</strong> 8.2 billion SHA-1 hashes/second</p>
                      <p className="mb-2"><strong className="text-orange-400">Key Failure:</strong> No salting allowed rapid rainbow table attacks</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-yellow-400">Adobe (2013)</h3>
                    <span className="px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg text-sm font-semibold">
                      153M 3DES-ECB
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                    <div>
                      <p className="mb-2"><strong className="text-yellow-400">Hash Type:</strong> 3DES-ECB (improperly implemented)</p>
                      <p className="mb-2"><strong className="text-yellow-400">Cracked:</strong> 100M+ passwords using hints and pattern analysis</p>
                      <p className="mb-2"><strong className="text-yellow-400">Financial Impact:</strong> $1.1M settlement + $50M damages</p>
                      <p className="mb-2"><strong className="text-yellow-400">Scale:</strong> Largest password breach at the time</p>
                    </div>
                    <div>
                      <p className="mb-2"><strong className="text-yellow-400">ECB Weakness:</strong> Same passwords = identical ciphertext</p>
                      <p className="mb-2"><strong className="text-yellow-400">Pattern Matching:</strong> Frequency analysis enabled mass cracking</p>
                      <p className="mb-2"><strong className="text-yellow-400">Hints Failure:</strong> Password hints stored in plaintext revealed passwords</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-green-400">Ashley Madison (2015)</h3>
                    <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm font-semibold">
                      36M bcrypt (Strong!)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                    <div>
                      <p className="mb-2"><strong className="text-green-400">Hash Type:</strong> bcrypt cost factor 12 (strong) + MD5 tokens</p>
                      <p className="mb-2"><strong className="text-green-400">Time to Crack:</strong> 11M weak passwords over 6 months</p>
                      <p className="mb-2"><strong className="text-green-400">Financial Impact:</strong> $11.2M settlement, near bankruptcy</p>
                      <p className="mb-2"><strong className="text-green-400">bcrypt Performance:</strong> ~5-8 hashes/second (extremely slow)</p>
                    </div>
                    <div>
                      <p className="mb-2"><strong className="text-green-400">Success Story:</strong> bcrypt prevented mass password cracking</p>
                      <p className="mb-2"><strong className="text-green-400">Weakness:</strong> MD5 login tokens bypassed strong password hashing</p>
                      <p className="mb-2"><strong className="text-green-400">Lesson:</strong> Strong password hashing worked, but weak tokens failed</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-purple-400">COMB - Compilation of Many Breaches (2021)</h3>
                    <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg text-sm font-semibold">
                      3.2B Plaintext
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                    <div>
                      <p className="mb-2"><strong className="text-purple-400">Source:</strong> Aggregation of thousands of previous breaches</p>
                      <p className="mb-2"><strong className="text-purple-400">Storage:</strong> 100GB+ text file, alphabetically organized</p>
                      <p className="mb-2"><strong className="text-purple-400">Impact:</strong> Still used in credential stuffing attacks globally</p>
                      <p className="mb-2"><strong className="text-purple-400">Contents:</strong> Netflix, LinkedIn, Bitcoin, Yahoo, thousands more</p>
                    </div>
                    <div>
                      <p className="mb-2"><strong className="text-purple-400">Attack Stats (2021-2024):</strong> 193 billion credential stuffing attacks detected</p>
                      <p className="mb-2"><strong className="text-purple-400">Growth:</strong> 24% year-over-year increase</p>
                      <p className="mb-2"><strong className="text-purple-400">Success Rate:</strong> 0.1%-2% per target site (still devastating at scale)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-blue-400">LastPass Master Password (2022)</h3>
                    <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-semibold">
                      Vault Backups Stolen
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                    <div>
                      <p className="mb-2"><strong className="text-blue-400">Hash Type:</strong> PBKDF2-HMAC-SHA256 (100,100 iterations default)</p>
                      <p className="mb-2"><strong className="text-blue-400">Weakness:</strong> Some users had only 5,000 iterations (legacy)</p>
                      <p className="mb-2"><strong className="text-blue-400">Attack Speed:</strong> 10M+ guesses/second for weak master passwords</p>
                      <p className="mb-2"><strong className="text-blue-400">Impact:</strong> Ongoing litigation, reputation damage</p>
                    </div>
                    <div>
                      <p className="mb-2"><strong className="text-blue-400">Estimated Cracking:</strong> 25%+ of vaults with weak master passwords crackable within 1 year</p>
                      <p className="mb-2"><strong className="text-blue-400">Critical Lesson:</strong> 100,100 iterations (2018+) secure; 5,000 iterations (pre-2018) vulnerable</p>
                      <p className="mb-2"><strong className="text-blue-400">Defense:</strong> Strong master password + high iteration count essential</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* GPU Acceleration */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                GPU Acceleration & Cracking Speed
              </h2>
              <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-red-400 mb-6">
                  NVIDIA RTX 4090 Performance Benchmarks
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-slate-950/50 rounded-lg p-6 border border-red-500/30">
                    <p className="text-sm text-red-300 mb-2">NTLM (Windows)</p>
                    <p className="text-3xl font-bold text-white mb-1">200 GH/s</p>
                    <p className="text-xs text-gray-400">200 billion hashes/second</p>
                  </div>
                  <div className="bg-slate-950/50 rounded-lg p-6 border border-orange-500/30">
                    <p className="text-sm text-orange-300 mb-2">MD5</p>
                    <p className="text-3xl font-bold text-white mb-1">10 GH/s</p>
                    <p className="text-xs text-gray-400">10 billion hashes/second</p>
                  </div>
                  <div className="bg-slate-950/50 rounded-lg p-6 border border-yellow-500/30">
                    <p className="text-sm text-yellow-300 mb-2">SHA-256</p>
                    <p className="text-3xl font-bold text-white mb-1">3 GH/s</p>
                    <p className="text-xs text-gray-400">3 billion hashes/second</p>
                  </div>
                  <div className="bg-slate-950/50 rounded-lg p-6 border border-green-500/30">
                    <p className="text-sm text-green-300 mb-2">bcrypt (cost 5)</p>
                    <p className="text-3xl font-bold text-white mb-1">110 KH/s</p>
                    <p className="text-xs text-gray-400">110,000 hashes/second</p>
                  </div>
                  <div className="bg-slate-950/50 rounded-lg p-6 border border-emerald-500/30">
                    <p className="text-sm text-emerald-300 mb-2">bcrypt (cost 12)</p>
                    <p className="text-3xl font-bold text-white mb-1">8 H/s</p>
                    <p className="text-xs text-gray-400">8 hashes/second</p>
                  </div>
                  <div className="bg-slate-950/50 rounded-lg p-6 border border-blue-500/30">
                    <p className="text-sm text-blue-300 mb-2">Argon2</p>
                    <p className="text-3xl font-bold text-white mb-1">5 H/s</p>
                    <p className="text-xs text-gray-400">5 hashes/second</p>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-slate-950/70 rounded-lg border border-red-500/30">
                  <h4 className="text-lg font-semibold text-red-400 mb-4">Cloud-Based Cracking Economics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                    <p><strong className="text-red-400">AWS EC2 P4d (8× NVIDIA A100):</strong> $32/hour</p>
                    <p><strong className="text-red-400">Google Cloud A100:</strong> ~$25/hour</p>
                    <p><strong className="text-red-400">Attack Cost:</strong> Rent massive GPU power temporarily</p>
                    <p><strong className="text-red-400">Reality:</strong> $1,000 can rent 40+ GPU-hours of cracking power</p>
                  </div>
                </div>
              </div>
            </section>

            {/* MITRE ATT&CK */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                MITRE ATT&CK Techniques
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">T1110.001 - Password Guessing</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Guessing passwords manually or with limited automation against live authentication systems.
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">T1110.002 - Password Cracking</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Offline cracking of stolen password hashes using GPU acceleration and wordlists.
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">T1110.003 - Password Spraying</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Testing single common password against many accounts to avoid account lockouts.
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">T1110.004 - Credential Stuffing</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Using breached credentials from one service to access other services (password reuse).
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'lab' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Hands-On Password Cracking Labs
              </h2>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-8">
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">Legal & Ethical Warning</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      These labs are for AUTHORIZED educational purposes only. Only crack passwords from systems you own
                      or have explicit written permission to test. Unauthorized password cracking is illegal under the
                      Computer Fraud and Abuse Act (CFAA) and equivalent international laws. Penalties include fines and
                      imprisonment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lab 1: Hash Identification */}
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8 mb-8 transition-colors">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Hash className="w-6 h-6 mr-3 text-emerald-400" />
                  Lab 1: Hash Identification and Basic Cracking
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Learn to identify hash types and perform dictionary attacks using Hashcat.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-400 mb-3">Python Hash Identifier</h4>
                    <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                      <pre className="text-sm text-gray-300">
                        <code>{`import hashlib

# Example password hashes
hashes = {
    'md5': '5f4dcc3b5aa765d61d8327deb882cf99',  # password
    'sha1': '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',  # password
    'sha256': '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    'ntlm': '8846F7EAEE8FB117AD06BDD830B7586C',  # password
}

def identify_hash(hash_value):
    """
    Identify hash type based on length and format.
    Returns likely hash algorithm.
    """
    hash_value = hash_value.strip()

    # Check for bcrypt
    if hash_value.startswith('$2a$') or hash_value.startswith('$2b$'):
        return "bcrypt"

    # Check for Argon2
    if hash_value.startswith('$argon2'):
        return "Argon2"

    # Check for PBKDF2
    if hash_value.startswith('pbkdf2'):
        return "PBKDF2"

    # Check by length (hex-encoded hashes)
    if len(hash_value) == 32:
        return "MD5 (likely) or NTLM"
    elif len(hash_value) == 40:
        return "SHA-1 (likely)"
    elif len(hash_value) == 64:
        return "SHA-256 (likely)"
    elif len(hash_value) == 128:
        return "SHA-512 (likely)"
    else:
        return "Unknown hash type"

# Test hash identification
for hash_type, hash_value in hashes.items():
    identified = identify_hash(hash_value)
    print(f"{hash_value[:20]}... -> {identified}")

# Verify MD5 hash
test_password = "password"
md5_hash = hashlib.md5(test_password.encode()).hexdigest()
print(f"\\nMD5('password') = {md5_hash}")
print(f"Match: {md5_hash == hashes['md5']}")`}</code>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-emerald-400 mb-3">Hashcat Dictionary Attack</h4>
                    <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                      <pre className="text-sm text-gray-300">
                        <code>{`# Create hash file
echo "5f4dcc3b5aa765d61d8327deb882cf99" > md5_hash.txt

# Dictionary attack with rockyou.txt
hashcat -m 0 -a 0 md5_hash.txt /usr/share/wordlists/rockyou.txt

# Hashcat mode numbers:
# -m 0     MD5
# -m 100   SHA-1
# -m 1400  SHA-256
# -m 3000  LM
# -m 1000  NTLM
# -m 3200  bcrypt
# -m 1800  SHA-512 (Unix)

# View cracked passwords
hashcat -m 0 md5_hash.txt --show`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lab 2: Rule-Based Attack */}
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8 mb-8 transition-colors">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Code className="w-6 h-6 mr-3 text-emerald-400" />
                  Lab 2: Rule-Based Attack with Mutations
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Create custom mutation rules to crack passwords with common patterns.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-400 mb-3">Create Custom Hashcat Rules</h4>
                    <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                      <pre className="text-sm text-gray-300">
                        <code>{`# Create rule file: append_year.rule
cat > append_year.rule << 'EOF'
$2$0$2$0
$2$0$2$1
$2$0$2$2
$2$0$2$3
$2$0$2$4
c $2$0$2$4
$! $2$0$2$4
EOF

# Rule syntax:
# $ = append character
# ^ = prepend character
# c = capitalize first letter
# u = uppercase all
# l = lowercase all
# d = duplicate word

# Test rules (dry run)
echo "password" | hashcat --stdout -r append_year.rule

# Output:
# password2020
# password2021
# password2022
# password2023
# password2024
# Password2024
# password!2024

# Use rules in cracking
hashcat -m 0 -a 0 hashes.txt wordlist.txt -r append_year.rule

# Use built-in best64 rule (best general-purpose)
hashcat -m 0 -a 0 hashes.txt wordlist.txt -r /usr/share/hashcat/rules/best64.rule`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lab 3: Mask Attack */}
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8 mb-8 transition-colors">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Target className="w-6 h-6 mr-3 text-emerald-400" />
                  Lab 3: Mask Attack for Targeted Cracking
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Use mask patterns to efficiently crack passwords following common formats.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-400 mb-3">Hashcat Mask Attack Syntax</h4>
                    <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                      <pre className="text-sm text-gray-300">
                        <code>{`# Mask placeholders:
# ?l = lowercase letter (a-z)
# ?u = uppercase letter (A-Z)
# ?d = digit (0-9)
# ?s = special character (!@#$%^&*)
# ?a = any character (all above)

# Pattern: Uppercase + 4-6 lowercase + 2 digits
# Example: Password12, Summer24, Winter99
hashcat -m 0 -a 3 hashes.txt ?u?l?l?l?l?l?l?d?d

# Pattern: 6 lowercase + special + 2 digits
# Example: secret!23, winter@24
hashcat -m 0 -a 3 hashes.txt ?l?l?l?l?l?l?s?d?d

# Incremental mode (try different lengths)
hashcat -m 0 -a 3 hashes.txt --increment --increment-min 8 --increment-max 10 ?a?a?a?a?a?a?a?a?a?a

# Custom character sets
# -1 = vowels, -2 = consonants
hashcat -m 0 -a 3 hashes.txt -1 aeiou -2 bcdfghjklmnpqrstvwxyz ?2?1?2?1?2?d?d

# Hybrid attack: Dictionary + mask
# wordlist.txt contains: "password", "admin", "welcome"
# This appends year patterns
hashcat -m 0 -a 6 hashes.txt wordlist.txt ?d?d?d?d

# Calculate keyspace (estimate crack time)
hashcat -m 0 -a 3 --keyspace ?u?l?l?l?l?l?l?d?d
# Output: 218,340,105,584,896 combinations
# At 10 GH/s MD5: ~6 hours
# At 8 H/s bcrypt: ~865,000 years`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lab 4: Secure Password Storage */}
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8 mb-8 transition-colors">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-emerald-400" />
                  Lab 4: Implementing Secure Password Storage
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Build production-ready password hashing with bcrypt and Argon2.
                </p>

                <div className="space-y-6">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                    <p className="text-sm font-semibold text-green-400 mb-3">Production-Ready: Secure Implementation</p>
                    <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                      <pre className="text-sm text-gray-300">
                        <code>{`import bcrypt
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

# ========== bcrypt Implementation ==========
def hash_password_bcrypt(password: str) -> bytes:
    """
    Hash password using bcrypt with cost factor 12.
    Cost 12 = ~8 hashes/second (strong protection).
    """
    salt = bcrypt.gensalt(rounds=12)  # 2^12 iterations
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed

def verify_password_bcrypt(password: str, hashed: bytes) -> bool:
    """
    Verify password against bcrypt hash.
    """
    return bcrypt.checkpw(password.encode('utf-8'), hashed)

# ========== Argon2id Implementation (BEST) ==========
ph = PasswordHasher(
    time_cost=1,           # Iterations
    memory_cost=47104,     # 46 MB memory
    parallelism=1,         # Threads
    hash_len=32,           # Output length
    salt_len=16,           # Salt length
    type='id'              # Argon2id (hybrid: data-dependent + data-independent)
)

def hash_password_argon2(password: str) -> str:
    """
    Hash password using Argon2id.
    Recommended by OWASP 2023+.
    """
    return ph.hash(password)

def verify_password_argon2(password: str, hashed: str) -> bool:
    """
    Verify password against Argon2 hash.
    """
    try:
        ph.verify(hashed, password)
        return True
    except VerifyMismatchError:
        return False

# ========== Example Usage ==========
# Store password
user_password = "SecureP@ssw0rd!"

# bcrypt
bcrypt_hash = hash_password_bcrypt(user_password)
print(f"bcrypt: {bcrypt_hash.decode()}")
print(f"Verify: {verify_password_bcrypt(user_password, bcrypt_hash)}")

# Argon2
argon2_hash = hash_password_argon2(user_password)
print(f"\\nArgon2: {argon2_hash}")
print(f"Verify: {verify_password_argon2(user_password, argon2_hash)}")

# ========== Password Strength Validation ==========
import re

def validate_password_strength(password: str) -> tuple[bool, str]:
    """
    Validate password meets OWASP requirements.
    Returns (is_valid, message).
    """
    if len(password) < 12:
        return False, "Password must be at least 12 characters"

    if not re.search(r'[A-Z]', password):
        return False, "Password must contain uppercase letter"

    if not re.search(r'[a-z]', password):
        return False, "Password must contain lowercase letter"

    if not re.search(r'\\d', password):
        return False, "Password must contain digit"

    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return False, "Password must contain special character"

    # Check against common passwords
    common_passwords = ['password', '123456', 'qwerty', 'admin']
    if password.lower() in common_passwords:
        return False, "Password is too common"

    return True, "Password is strong"

# Test validation
test_pass = "WeakPass"
valid, msg = validate_password_strength(test_pass)
print(f"\\n{test_pass}: {msg}")`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lab 5: Multi-Factor Authentication */}
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8 mb-8 transition-colors">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-emerald-400" />
                  Lab 5: Multi-Factor Authentication (TOTP)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Implement Time-based One-Time Password (TOTP) compatible with Google Authenticator.
                </p>

                <div className="space-y-6">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                    <p className="text-sm font-semibold text-green-400 mb-3">Production-Ready: MFA Implementation</p>
                    <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                      <pre className="text-sm text-gray-300">
                        <code>{`import pyotp
import qrcode
from io import BytesIO

def setup_mfa(username: str, issuer: str = "HackLearn Pro"):
    """
    Generate MFA secret and QR code for user enrollment.
    Returns (secret, qr_code_bytes).
    """
    # Generate random base32 secret
    secret = pyotp.random_base32()

    # Create TOTP object
    totp = pyotp.TOTP(secret)

    # Generate provisioning URI
    uri = totp.provisioning_uri(
        name=username,
        issuer_name=issuer
    )

    # Generate QR code
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(uri)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    buffer = BytesIO()
    img.save(buffer, format='PNG')
    qr_bytes = buffer.getvalue()

    return secret, qr_bytes

def verify_mfa_code(secret: str, user_code: str) -> bool:
    """
    Verify user-provided TOTP code.
    valid_window=1 allows 30 seconds before/after for clock skew.
    """
    totp = pyotp.TOTP(secret)
    return totp.verify(user_code, valid_window=1)

def get_current_code(secret: str) -> str:
    """
    Get current TOTP code (for testing).
    """
    totp = pyotp.TOTP(secret)
    return totp.now()

# ========== Example Usage ==========
# User enrollment
username = "user@example.com"
secret, qr_code = setup_mfa(username)

print(f"MFA Secret (store securely): {secret}")
print(f"QR Code generated ({len(qr_code)} bytes)")

# Save QR code for user to scan
with open('totp_qr.png', 'wb') as f:
    f.write(qr_code)
print("QR code saved to totp_qr.png")

# Generate current code (for testing)
current_code = get_current_code(secret)
print(f"\\nCurrent TOTP code: {current_code}")

# Verify code
user_input = current_code  # In production, get from user
is_valid = verify_mfa_code(secret, user_input)
print(f"Code verification: {'SUCCESS' if is_valid else 'FAILED'}")

# ========== Security Impact ==========
print("\\n=== MFA Security Impact ===")
print("Without MFA: Password breach = account compromise")
print("With MFA: Password breach alone insufficient")
print("Microsoft 2022: MFA blocks 99.9% of automated attacks")
print("Even weak password + MFA > strong password alone")`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Notebook Link */}
              <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Code className="w-8 h-8 mr-3" />
                  Interactive Jupyter Notebook Lab
                </h3>
                <p className="text-white/90 mb-6 text-lg">
                  Continue your learning with our comprehensive hands-on Jupyter notebook featuring 40+ interactive cells
                  covering hash cracking, GPU benchmarking, custom wordlist generation, secure password storage, MFA
                  implementation, and credential stuffing detection.
                </p>
                <a
                  href="/notebooks/16-password-cracking.ipynb"
                  className="inline-flex items-center px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Code className="w-5 h-5 mr-2" />
                  Open Interactive Lab Notebook
                </a>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Password Cracking & Defense Tools
              </h2>

              {/* Cracking Tools */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-red-400 mb-6 flex items-center">
                  <Unlock className="w-6 h-6 mr-3" />
                  Cracking Tools (Attack)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-red-400 mb-3">Hashcat</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Industry-leading GPU-accelerated password cracking tool with 300+ hash algorithm support.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-red-400">Attack Modes:</strong> Dictionary, brute-force, mask, combinator, hybrid, rule-based</p>
                      <p><strong className="text-red-400">Performance:</strong> NTLM 200 GH/s, MD5 103 GH/s, SHA-256 35 GH/s</p>
                      <p><strong className="text-red-400">Platform:</strong> Windows, Linux, macOS with GPU support</p>
                      <p><strong className="text-red-400">Website:</strong> hashcat.net</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-red-400 mb-3">John the Ripper</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Open-source password cracker with automatic hash detection and 400+ format support.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-red-400">Features:</strong> Automatic hash type detection, custom wordlist rules</p>
                      <p><strong className="text-red-400">Single Crack Mode:</strong> Uses account info to generate passwords</p>
                      <p><strong className="text-red-400">Markov Chains:</strong> Statistical character probability models</p>
                      <p><strong className="text-red-400">Website:</strong> openwall.com/john</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-red-400 mb-3">THC Hydra</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Fast network login cracker supporting 50+ protocols for online attacks.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-red-400">Protocols:</strong> HTTP(S), SSH, FTP, RDP, VNC, MySQL, PostgreSQL, SMTP</p>
                      <p><strong className="text-red-400">Performance:</strong> 16+ parallel connections, ~50-200 attempts/second</p>
                      <p><strong className="text-red-400">Use Case:</strong> Online brute-force attacks against live services</p>
                      <p><strong className="text-red-400">Website:</strong> github.com/vanhauser-thc/thc-hydra</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-red-400 mb-3">Medusa</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Modular, parallel brute-force login cracker with better stability than Hydra.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-red-400">Protocols:</strong> 21+ protocols supported</p>
                      <p><strong className="text-red-400">Architecture:</strong> Module-based for extensibility</p>
                      <p><strong className="text-red-400">Advantage:</strong> Better error handling and stability</p>
                      <p><strong className="text-red-400">Website:</strong> github.com/jmk-foofus/medusa</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-red-400 mb-3">RainbowCrack</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Specialized tool for rainbow table attacks against unsalted hashes.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-red-400">Tables:</strong> NTLM alphanumeric 1-8 chars: 64GB (99.9% coverage)</p>
                      <p><strong className="text-red-400">Speed:</strong> Instant lookup (milliseconds)</p>
                      <p><strong className="text-red-400">Limitation:</strong> Useless against salted hashes</p>
                      <p><strong className="text-red-400">Website:</strong> project-rainbowcrack.com</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-red-400 mb-3">L0phtCrack</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Commercial password auditing tool for Windows environments.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-red-400">Focus:</strong> Windows password auditing (Local, Domain, Active Directory)</p>
                      <p><strong className="text-red-400">Features:</strong> Pre-built wordlists, compliance reporting</p>
                      <p><strong className="text-red-400">Pricing:</strong> ~$1,295/license</p>
                      <p><strong className="text-red-400">Website:</strong> l0phtcrack.com</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-red-400 mb-3">Ophcrack</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Free Windows password cracker using rainbow tables with bootable LiveCD option.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-red-400">Hash Types:</strong> Cracks LM and NTLM hashes</p>
                      <p><strong className="text-red-400">Deployment:</strong> Bootable LiveCD/USB for offline recovery</p>
                      <p><strong className="text-red-400">Free Tables:</strong> Alphanumeric 1-6 chars included</p>
                      <p><strong className="text-red-400">Website:</strong> ophcrack.sourceforge.io</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-red-400 mb-3">CeWL (Custom Word List Generator)</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Spider tool that crawls websites to generate target-specific wordlists.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-red-400">Effectiveness:</strong> Target-specific wordlists have 5-10× higher crack rate</p>
                      <p><strong className="text-red-400">Features:</strong> Extract metadata from documents, email addresses</p>
                      <p><strong className="text-red-400">Depth Control:</strong> Configurable crawling depth and word length</p>
                      <p><strong className="text-red-400">Website:</strong> github.com/digininja/CeWL</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-red-400 mb-3">PACK (Password Analysis & Cracking Kit)</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Suite for password analysis and mask generation optimized for Hashcat.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-red-400">statsgen.py:</strong> Generate statistics from password lists</p>
                      <p><strong className="text-red-400">maskgen.py:</strong> Create optimized mask files for Hashcat</p>
                      <p><strong className="text-red-400">Efficiency Gain:</strong> Reduces cracking time by 60-80%</p>
                      <p><strong className="text-red-400">Website:</strong> github.com/iphelix/pack</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-red-400 mb-3">pipal</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Password analysis and statistics tool for understanding password patterns.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-red-400">Analysis:</strong> Character distribution, length analysis, pattern detection</p>
                      <p><strong className="text-red-400">Reports:</strong> Generate detailed password statistics</p>
                      <p><strong className="text-red-400">Use Case:</strong> Understanding password patterns in breached databases</p>
                      <p><strong className="text-red-400">Website:</strong> github.com/digininja/pipal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Defense Tools */}
              <div>
                <h3 className="text-2xl font-semibold text-green-400 mb-6 flex items-center">
                  <Shield className="w-6 h-6 mr-3" />
                  Defense Tools (Protection)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-green-400 mb-3">PAM (Pluggable Authentication Modules)</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Linux authentication framework with password complexity enforcement.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-green-400">Features:</strong> Password complexity (pam_pwquality), account lockout</p>
                      <p><strong className="text-green-400">Failed Logins:</strong> Track and block after threshold</p>
                      <p><strong className="text-green-400">Integration:</strong> System-wide authentication control</p>
                      <p><strong className="text-green-400">Platform:</strong> Linux/Unix systems</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-green-400 mb-3">Fail2ban</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Intrusion prevention tool that monitors logs and blocks IPs after failed login attempts.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-green-400">Monitors:</strong> SSH, FTP, web server, email server logs</p>
                      <p><strong className="text-green-400">Action:</strong> Automatic IP blocking via firewall rules</p>
                      <p><strong className="text-green-400">Effectiveness:</strong> Reduces SSH brute-force by 99%+</p>
                      <p><strong className="text-green-400">Website:</strong> fail2ban.org</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-green-400 mb-3">Google Authenticator / Authy (TOTP)</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Time-based One-Time Password (TOTP) implementations for multi-factor authentication.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-green-400">Google Authenticator:</strong> Open-source, integrates with PAM</p>
                      <p><strong className="text-green-400">Authy:</strong> Multi-device support, cloud backup</p>
                      <p><strong className="text-green-400">Security Impact:</strong> MFA blocks 99.9% of automated attacks (Microsoft 2022)</p>
                      <p><strong className="text-green-400">Standard:</strong> RFC 6238 (TOTP)</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-green-400 mb-3">Password Managers (1Password, Bitwarden, KeePass)</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Secure password storage and generation tools using strong encryption.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-green-400">1Password:</strong> AES-256, zero-knowledge, password strength analysis</p>
                      <p><strong className="text-green-400">Bitwarden:</strong> Open-source, self-hostable, PBKDF2 (100,000+ iterations)</p>
                      <p><strong className="text-green-400">KeePass:</strong> Open-source, offline database, AES-256 or ChaCha20</p>
                      <p><strong className="text-green-400">Benefit:</strong> Unique strong passwords for every account</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-green-400 mb-3">zxcvbn</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Password strength estimator by Dropbox that detects common patterns.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-green-400">Detection:</strong> Dates, keyboard patterns, repeated characters</p>
                      <p><strong className="text-green-400">Crack Time:</strong> Estimates crack time based on threat model</p>
                      <p><strong className="text-green-400">Used By:</strong> Dropbox, WordPress, Drupal, 1Password</p>
                      <p><strong className="text-green-400">Website:</strong> github.com/dropbox/zxcvbn</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-green-400 mb-3">Have I Been Pwned (HIBP) API</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Service by Troy Hunt with 11+ billion breached accounts and 613M+ pwned passwords.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-green-400">Database:</strong> 11.9 billion accounts indexed</p>
                      <p><strong className="text-green-400">Passwords:</strong> 613+ million pwned passwords</p>
                      <p><strong className="text-green-400">k-Anonymity:</strong> Only first 5 chars of SHA-1 hash sent (privacy)</p>
                      <p><strong className="text-green-400">Statistics:</strong> "123456" seen 37M times; "password" 9.5M times</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-green-400 mb-3">Microsoft Defender for Identity</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Enterprise-grade identity threat detection for Active Directory environments.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-green-400">Detection:</strong> Pass-the-hash, credential theft (Mimikatz, DCSync)</p>
                      <p><strong className="text-green-400">Monitoring:</strong> Brute-force and password spray detection</p>
                      <p><strong className="text-green-400">Integration:</strong> Active Directory, Azure AD</p>
                      <p><strong className="text-green-400">Pricing:</strong> Microsoft 365 E5, Azure AD Premium P2</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                    <h4 className="text-xl font-semibold text-green-400 mb-3">DenyHosts</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      SSH-specific log analysis tool that blocks IPs after repeated failed logins.
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong className="text-green-400">Focus:</strong> SSH brute-force protection</p>
                      <p><strong className="text-green-400">Sync Servers:</strong> Global blocklist sharing</p>
                      <p><strong className="text-green-400">Action:</strong> Add IPs to /etc/hosts.deny</p>
                      <p><strong className="text-green-400">Website:</strong> github.com/denyhosts/denyhosts</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'references' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                References & Resources
              </h2>

              {/* Official Standards */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-emerald-400 mb-4">Official Standards & Guidelines</h3>
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[1]</span>
                      <div>
                        <strong>NIST SP 800-63B: Digital Identity Guidelines</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Password requirements, authentication strength, modern password guidance</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[2]</span>
                      <div>
                        <strong>OWASP Authentication Cheat Sheet</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Best practices for implementing secure authentication systems</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[3]</span>
                      <div>
                        <strong>OWASP Password Storage Cheat Sheet</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Recommended algorithms (Argon2, scrypt, bcrypt), salting, pepper, iteration counts</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[4]</span>
                      <div>
                        <strong>CWE-521: Weak Password Requirements</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Common weakness enumeration for insufficient password policies</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[5]</span>
                      <div>
                        <strong>CVE-2012-1457: LinkedIn Unsalted Password Storage</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Official CVE entry for LinkedIn SHA-1 breach (117M passwords)</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Academic Papers */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-emerald-400 mb-4">Academic Research Papers</h3>
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[6]</span>
                      <div>
                        <strong>Bonneau et al. (2012): "The Quest to Replace Passwords"</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">IEEE Security & Privacy - Comprehensive analysis of password alternatives</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[7]</span>
                      <div>
                        <strong>Florencio & Herley (2007): "Large-Scale Study of Web Password Habits"</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Study of 500,000 users revealing password reuse patterns</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[8]</span>
                      <div>
                        <strong>Ur et al. (2015): "Measuring Real-World Password Guessability"</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">USENIX Security - Empirical study of password strength meters and cracking</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[9]</span>
                      <div>
                        <strong>Dell'Amico et al. (2010): "SIMD-based Cracking of Hash Functions"</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">GPU acceleration techniques for password cracking</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[10]</span>
                      <div>
                        <strong>Kelley et al. (2012): "Guess Again: Measuring Password Strength"</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">IEEE S&P - Empirical password strength measurement</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[11]</span>
                      <div>
                        <strong>Weir et al. (2009): "Password Cracking Using PCFGs"</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">IEEE S&P - Probabilistic Context-Free Grammars for password cracking</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[12]</span>
                      <div>
                        <strong>Provos & Mazières (1999): "A Future-Adaptable Password Scheme"</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">USENIX - Original bcrypt paper introducing Eksblowfish</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[13]</span>
                      <div>
                        <strong>Biryukov et al. (2016): "Argon2: The Memory-Hard Function"</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Password Hashing Competition winner, best-in-class password hashing</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[14]</span>
                      <div>
                        <strong>Percival (2009): "Stronger Key Derivation via Sequential Memory-Hard Functions"</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Original scrypt paper introducing memory-hard key derivation</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Industry Reports */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-emerald-400 mb-4">Industry Reports & Statistics</h3>
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[15]</span>
                      <div>
                        <strong>Verizon Data Breach Investigations Report (DBIR) 2024</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">86% of breaches involve stolen credentials or brute force attacks</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[16]</span>
                      <div>
                        <strong>Microsoft Security Intelligence Report: MFA Effectiveness</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">99.9% of automated attacks blocked by multi-factor authentication (2022)</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[17]</span>
                      <div>
                        <strong>Akamai State of Internet Security: Credential Stuffing Report</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">193 billion credential stuffing attacks detected globally (2023), 24% YoY increase</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[18]</span>
                      <div>
                        <strong>Troy Hunt Have I Been Pwned Statistics</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">11.9 billion accounts, 613M passwords; "123456" seen 37M times</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[19]</span>
                      <div>
                        <strong>Rapid7 National Exposure Index: SSH Security</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">62% of SSH servers allow password authentication (security risk)</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Case Studies */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-emerald-400 mb-4">Case Studies & Real-World Analysis</h3>
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[20]</span>
                      <div>
                        <strong>SANS Institute: "The Anthem Breach: A Case Study"</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">80M records, weak password security, lack of MFA</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[21]</span>
                      <div>
                        <strong>U.S. DOJ Indictment: Russian FSB Officers for Yahoo Breach</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">State-sponsored attack, 3B accounts, MD5/bcrypt mixed implementation</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[22]</span>
                      <div>
                        <strong>KrebsOnSecurity: "Adobe Breach Detailed Analysis"</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">153M accounts, 3DES-ECB weakness, pattern analysis exploitation</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Practice Platforms */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-emerald-400 mb-4">Practice Platforms & Training</h3>
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[23]</span>
                      <div>
                        <strong>HackTheBox: Password Attacks Module</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Hands-on labs for password cracking, hash identification, credential attacks</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[24]</span>
                      <div>
                        <strong>TryHackMe: Password Security Learning Path</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Guided rooms on Hashcat, John the Ripper, password analysis</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[25]</span>
                      <div>
                        <strong>SANS SEC560: Network Penetration Testing</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Professional training covering password attacks and credential harvesting</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[26]</span>
                      <div>
                        <strong>Offensive Security PWK (OSCP Certification)</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Industry-standard penetration testing certification with password cracking labs</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Legal & Ethical */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-emerald-400 mb-4">Legal & Ethical Guidelines</h3>
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[27]</span>
                      <div>
                        <strong>U.S. Computer Fraud and Abuse Act (CFAA) - 18 U.S.C. § 1030</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Federal law criminalizing unauthorized access; penalties include fines and imprisonment</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[28]</span>
                      <div>
                        <strong>EU GDPR Article 32: Security of Processing</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Encryption requirements for personal data, including password hashing standards</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[29]</span>
                      <div>
                        <strong>PCI DSS Requirement 8: Strong Authentication</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Payment card industry standard requiring MFA and strong password policies</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[30]</span>
                      <div>
                        <strong>NIST Cybersecurity Framework: PR.AC (Access Control)</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Framework for protecting access to assets and resources</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Technical Resources */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-emerald-400 mb-4">Technical Documentation & Resources</h3>
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 transition-colors">
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[31]</span>
                      <div>
                        <strong>Hashcat Documentation & Wiki</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive guide to attack modes, mask syntax, rule creation</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[32]</span>
                      <div>
                        <strong>John the Ripper Documentation</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Official docs for rule-based attacks, wordlist modes, hash formats</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-3">[33]</span>
                      <div>
                        <strong>OWASP Testing Guide: Testing for Weak Password Policy</strong>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Methodology for testing password strength requirements</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Legal Disclaimer */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">Legal & Ethical Disclaimer</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Password cracking without authorization is illegal under the Computer Fraud and Abuse Act (CFAA)
                      in the United States and equivalent laws worldwide. Penalties include fines up to $250,000 and
                      imprisonment up to 10 years.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong className="text-yellow-400">Only use these techniques for:</strong>
                    </p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                      <li>Authorized penetration testing with written permission</li>
                      <li>Your own systems and passwords</li>
                      <li>Educational lab environments (HackTheBox, TryHackMe, etc.)</li>
                      <li>Bug bounty programs with explicit scope</li>
                      <li>Security research with proper disclosure</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Challenge CTA */}
      
    </div>
  );
};