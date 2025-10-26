/**
 * Flagship Concept Component Template
 *
 * Instructions:
 * 1. Copy this file to: src/components/concepts/[YourConcept]Concept.tsx
 * 2. Replace all [PLACEHOLDERS] with actual content
 * 3. Follow existing patterns from PromptInjectionConcept, SQLInjectionConcept, etc.
 * 4. Maintain consistent styling and structure
 * 5. NO EMOJIS in production code (critical requirement)
 * 6. Use TypeScript strict mode (no 'any' types)
 */

import { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Code,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Trophy
} from 'lucide-react';

// Replace [ConceptName] with your concept name (e.g., DataPoisoning, ModelExtraction)
interface [ConceptName]ConceptProps {
  onBack?: () => void;
  onStartChallenge?: () => void;
}

export const [ConceptName]Concept = ({ onBack, onStartChallenge }: [ConceptName]ConceptProps) => {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header Section */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Dashboard</span>
              </button>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              [Full Concept Name]
            </h1>

            {/* Difficulty Badge */}
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
                [Difficulty: Beginner|Intermediate|Advanced]
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-slate-900/30 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-4">
            {[
              { id: 'theory', label: 'Theory', icon: BookOpen },
              { id: 'lab', label: 'Lab', icon: Code },
              { id: 'tools', label: 'Tools', icon: Shield },
              { id: 'references', label: 'References', icon: FileText }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'theory' && <TheoryTab />}
        {activeTab === 'lab' && <LabTab />}
        {activeTab === 'tools' && <ToolsTab />}
        {activeTab === 'references' && <ReferencesTab />}
      </div>

      {/* Challenge Button (Fixed at bottom) */}
      {onStartChallenge && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={onStartChallenge}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
          >
            <Trophy className="w-5 h-5" />
            <span>Take Challenge</span>
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Theory Tab Component
 *
 * Content Requirements:
 * - Opening explanation (100-150 words)
 * - Technical breakdown (200-300 words, 2-3 subsections)
 * - 2-3 real-world examples with full details
 * - 6-8 key takeaways
 */
const TheoryTab = () => {
  return (
    <div className="space-y-8">
      {/* Opening Section */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">What is [Concept Name]?</h2>
        <div className="text-slate-300 space-y-4 leading-relaxed">
          <p>
            [Opening paragraph: Explain what the attack/vulnerability is in clear terms.
            Define key terminology. Explain why it matters in 2025.]
          </p>
          <p>
            [Second paragraph: How the attack works at a high level. What makes it
            possible? What systems/technologies are vulnerable?]
          </p>
        </div>
      </div>

      {/* Technical Breakdown */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Technical Breakdown</h2>

        {/* Subsection 1 */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-cyan-300 mb-3">[Subsection Title 1]</h3>
          <p className="text-slate-300 leading-relaxed">
            [Explain first major aspect of the attack/concept. Use technical detail
            but remain accessible. 100-150 words.]
          </p>
        </div>

        {/* Subsection 2 */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-cyan-300 mb-3">[Subsection Title 2]</h3>
          <p className="text-slate-300 leading-relaxed">
            [Explain second major aspect. How does this relate to the first?
            What are the implications? 100-150 words.]
          </p>
        </div>

        {/* Subsection 3 (Optional) */}
        <div>
          <h3 className="text-xl font-semibold text-cyan-300 mb-3">[Subsection Title 3]</h3>
          <p className="text-slate-300 leading-relaxed">
            [Explain third aspect if needed. Advanced scenarios or variations.
            100-150 words.]
          </p>
        </div>
      </div>

      {/* Real-World Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-cyan-400">Real-World Breaches</h2>

        {/* Example 1 */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border-l-4 border-red-500">
          <h3 className="text-xl font-semibold text-cyan-400 mb-3">[Company Name] ([Year])</h3>
          <div className="space-y-2 text-slate-300">
            <p>
              <strong className="text-cyan-400">Attack Vector:</strong> [How the attack was carried out.
              Specific techniques used. 50-75 words.]
            </p>
            <p>
              <strong className="text-cyan-400">Impact:</strong> [Number of users/systems affected.
              Data compromised. Service disruption. 30-50 words.]
            </p>
            <p>
              <strong className="text-cyan-400">Financial Cost:</strong> $[Amount] [Type: Direct costs,
              fines, settlements, stock impact]
            </p>
            <p>
              <strong className="text-cyan-400">Outcome:</strong> [What happened after? Company response.
              Regulatory action. Lessons learned. 30-50 words.]
            </p>
          </div>
        </div>

        {/* Example 2 */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border-l-4 border-red-500">
          <h3 className="text-xl font-semibold text-cyan-400 mb-3">[Company Name] ([Year])</h3>
          <div className="space-y-2 text-slate-300">
            <p><strong className="text-cyan-400">Attack Vector:</strong> [Details]</p>
            <p><strong className="text-cyan-400">Impact:</strong> [Details]</p>
            <p><strong className="text-cyan-400">Financial Cost:</strong> $[Amount]</p>
            <p><strong className="text-cyan-400">Outcome:</strong> [Details]</p>
          </div>
        </div>

        {/* Example 3 (Optional) */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border-l-4 border-red-500">
          <h3 className="text-xl font-semibold text-cyan-400 mb-3">[Company Name] ([Year])</h3>
          <div className="space-y-2 text-slate-300">
            <p><strong className="text-cyan-400">Attack Vector:</strong> [Details]</p>
            <p><strong className="text-cyan-400">Impact:</strong> [Details]</p>
            <p><strong className="text-cyan-400">Financial Cost:</strong> $[Amount]</p>
            <p><strong className="text-cyan-400">Outcome:</strong> [Details]</p>
          </div>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Key Takeaways</h2>
        <ul className="space-y-3">
          {[
            '[Takeaway 1: Most critical point about this attack/concept]',
            '[Takeaway 2: Second most important insight]',
            '[Takeaway 3: Technical detail to remember]',
            '[Takeaway 4: Defense consideration]',
            '[Takeaway 5: Industry best practice]',
            '[Takeaway 6: Future trend or evolution]',
            '[Takeaway 7 (Optional): Additional context]',
            '[Takeaway 8 (Optional): Related concept]'
          ].map((takeaway, index) => (
            <li key={index} className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/**
 * Lab Tab Component
 *
 * Content Requirements:
 * - Introduction to hands-on exercises
 * - 3-5 code examples (vulnerable + secure + advanced)
 * - Clear warnings on vulnerable code
 * - Link to Jupyter notebook
 */
const LabTab = () => {
  // Sample code strings (replace with actual code)
  const vulnerableCode = `# VULNERABLE CODE - DO NOT USE IN PRODUCTION
[Your vulnerable code example here]
[Show exactly what NOT to do]
[Make the vulnerability obvious]`;

  const secureCode = `# SECURE CODE - PRODUCTION READY
[Your secure code example here]
[Show the correct implementation]
[Demonstrate best practices]`;

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Hands-On Lab Exercises</h2>
        <div className="text-slate-300 space-y-4">
          <p>
            [Introduction: What will students learn in this lab? What prerequisites
            do they need? What environment setup is required? 75-100 words.]
          </p>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-200 text-sm">
                <strong>Educational Purpose Only:</strong> These exercises demonstrate
                vulnerabilities for learning. Never use these techniques on systems
                you don't own or have explicit permission to test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example 1: Vulnerable */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-cyan-400 mb-4">Example 1: Vulnerable Implementation</h3>

        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-semibold text-red-300">
              WARNING: VULNERABLE CODE - Educational Only
            </p>
          </div>
          <pre className="bg-slate-900 rounded p-4 overflow-x-auto">
            <code className="text-sm text-slate-300">{vulnerableCode}</code>
          </pre>
        </div>

        <div className="text-slate-300 space-y-3">
          <p>
            <strong className="text-cyan-400">Vulnerability:</strong> [Explain what's wrong
            with this code. Why is it vulnerable? What can an attacker do? 50-75 words.]
          </p>
          <p>
            <strong className="text-cyan-400">Exploitation:</strong> [Show how an attacker
            would exploit this. What input would they provide? What would happen? 50-75 words.]
          </p>
        </div>
      </div>

      {/* Code Example 2: Secure */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-cyan-400 mb-4">Example 2: Secure Implementation</h3>

        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-semibold text-green-300">
              SECURE CODE - Production Ready
            </p>
          </div>
          <pre className="bg-slate-900 rounded p-4 overflow-x-auto">
            <code className="text-sm text-slate-300">{secureCode}</code>
          </pre>
        </div>

        <div className="text-slate-300 space-y-3">
          <p>
            <strong className="text-cyan-400">Security Measures:</strong> [Explain what
            makes this code secure. What defenses are in place? 50-75 words.]
          </p>
          <p>
            <strong className="text-cyan-400">Why It Works:</strong> [Technical explanation
            of how these defenses prevent the attack. 50-75 words.]
          </p>
        </div>
      </div>

      {/* Code Example 3: Advanced (Optional) */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-cyan-400 mb-4">Example 3: Advanced Scenario</h3>
        <p className="text-slate-300 mb-4">
          [Describe an advanced scenario or edge case. More complex attack vector or
          defense mechanism. 75-100 words.]
        </p>
        <pre className="bg-slate-900 rounded p-4 overflow-x-auto mb-4">
          <code className="text-sm text-slate-300">[Advanced code example]</code>
        </pre>
        <p className="text-slate-300">
          [Explanation of the advanced example. 50-75 words.]
        </p>
      </div>

      {/* Jupyter Notebook Link */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Interactive Lab Notebook</h3>
            <p className="text-slate-300">
              Continue your hands-on learning with our interactive Jupyter notebook featuring
              step-by-step exercises and executable code.
            </p>
          </div>
          <a
            href="/notebooks/[id]-[concept-name].ipynb"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Open Lab Notebook</span>
          </a>
        </div>
      </div>
    </div>
  );
};

/**
 * Tools Tab Component
 *
 * Content Requirements:
 * - 4-6 attack tools with descriptions
 * - 4-6 defense tools with descriptions
 * - Implementation examples where applicable
 */
const ToolsTab = () => {
  const attackTools = [
    {
      name: '[Attack Tool 1 Name]',
      description: '[Description of what this tool does and how attackers use it. 2-3 sentences.]'
    },
    {
      name: '[Attack Tool 2 Name]',
      description: '[Description. 2-3 sentences.]'
    },
    {
      name: '[Attack Tool 3 Name]',
      description: '[Description. 2-3 sentences.]'
    },
    {
      name: '[Attack Tool 4 Name]',
      description: '[Description. 2-3 sentences.]'
    }
    // Add 5-6 total
  ];

  const defenseTools = [
    {
      name: '[Defense Tool 1 Name]',
      description: '[Description of how this tool helps defend against the attack. 2-3 sentences.]'
    },
    {
      name: '[Defense Tool 2 Name]',
      description: '[Description. 2-3 sentences.]'
    },
    {
      name: '[Defense Tool 3 Name]',
      description: '[Description. 2-3 sentences.]'
    },
    {
      name: '[Defense Tool 4 Name]',
      description: '[Description. 2-3 sentences.]'
    }
    // Add 5-6 total
  ];

  return (
    <div className="space-y-8">
      {/* Attack Tools Section */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <h2 className="text-2xl font-bold text-red-400">Attack Tools</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {attackTools.map((tool, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border-l-4 border-red-500">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">{tool.name}</h3>
              <p className="text-slate-300 text-sm">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Defense Tools Section */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-6 h-6 text-emerald-400" />
          <h2 className="text-2xl font-bold text-emerald-400">Defense Tools</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {defenseTools.map((tool, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border-l-4 border-emerald-500">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">{tool.name}</h3>
              <p className="text-slate-300 text-sm">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Example (Optional) */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-cyan-400 mb-4">Implementation Example</h3>
        <p className="text-slate-300 mb-4">
          [If applicable, show how to use one of the defense tools. Code snippet or
          configuration example. 50-75 words of explanation.]
        </p>
        <pre className="bg-slate-900 rounded p-4 overflow-x-auto">
          <code className="text-sm text-slate-300">[Tool configuration or usage example]</code>
        </pre>
      </div>
    </div>
  );
};

/**
 * References Tab Component
 *
 * Content Requirements:
 * - Official documentation (OWASP, NIST, CWE)
 * - Academic papers (10-15 citations)
 * - Real-world case studies (5-10 links)
 * - Practice platforms (3-5 links)
 * - Legal/ethical disclaimers
 */
const ReferencesTab = () => {
  return (
    <div className="space-y-8">
      {/* Official Documentation */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Official Documentation</h2>
        <ul className="space-y-3">
          <li className="flex items-start space-x-2">
            <ExternalLink className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
            <a href="[URL]" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
              OWASP: [Relevant OWASP Resource]
            </a>
          </li>
          <li className="flex items-start space-x-2">
            <ExternalLink className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
            <a href="[URL]" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
              NIST: [Relevant NIST Guideline]
            </a>
          </li>
          <li className="flex items-start space-x-2">
            <ExternalLink className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
            <a href="[URL]" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
              CWE: [Relevant CWE Entry]
            </a>
          </li>
        </ul>
      </div>

      {/* Academic Papers */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Academic Research</h2>
        <ul className="space-y-4 text-slate-300">
          <li>
            [1] [Author Names]. ([Year]). "[Paper Title]". <em>[Conference/Journal]</em>. [URL]
          </li>
          <li>
            [2] [Author Names]. ([Year]). "[Paper Title]". <em>[Conference/Journal]</em>. [URL]
          </li>
          {/* Add 10-15 total citations */}
        </ul>
      </div>

      {/* Real-World Case Studies */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Real-World Case Studies</h2>
        <ul className="space-y-3">
          <li className="flex items-start space-x-2">
            <ExternalLink className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
            <a href="[URL]" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
              [Article Title - Publication Name]
            </a>
          </li>
          {/* Add 5-10 total links */}
        </ul>
      </div>

      {/* Practice Platforms */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Practice Platforms</h2>
        <ul className="space-y-3">
          <li className="flex items-start space-x-2">
            <ExternalLink className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
            <a href="[URL]" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
              [Platform Name]: [Description]
            </a>
          </li>
          {/* Add 3-5 platforms */}
        </ul>
      </div>

      {/* Legal/Ethical Disclaimer */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Legal & Ethical Disclaimer</h2>
        <div className="text-slate-300 space-y-3">
          <p className="font-semibold text-red-300">
            All information provided is for EDUCATIONAL PURPOSES ONLY.
          </p>
          <p>
            <strong>You MUST:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Only test systems you own or have explicit written permission to test</li>
            <li>Use this knowledge to improve security, never to cause harm</li>
            <li>Report vulnerabilities responsibly through proper channels</li>
            <li>Comply with all local, state, and federal laws</li>
          </ul>
          <p>
            <strong>You MUST NOT:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Use these techniques for malicious purposes</li>
            <li>Test systems without authorization</li>
            <li>Cause damage or disruption to any systems</li>
            <li>Violate privacy or steal data</li>
          </ul>
          <p className="text-red-300 font-semibold">
            Unauthorized access to computer systems is illegal and can result in criminal
            prosecution, including imprisonment and fines. Always act ethically and legally.
          </p>
        </div>
      </div>
    </div>
  );
};
