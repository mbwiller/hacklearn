/**
 * HACKLEARN PRO - STANDARD MODULE TEMPLATE
 *
 * This template provides the harmonized structure for all HackLearn Pro modules.
 * Use this as a reference when creating new modules or refactoring existing ones.
 *
 * Last Updated: 2025-10-28 (UI/UX Harmonization)
 *
 * HARMONIZED STANDARDS:
 * - Root background: bg-white dark:bg-slate-950
 * - Main card: bg-white dark:bg-slate-900 with slate borders
 * - Icon gradient: from-emerald-400 to-emerald-600
 * - Active tabs: bg-emerald-50 dark:bg-emerald-950/50
 * - Back button: solid slate with borders
 * - All colors use slate (not gray) for dark mode consistency
 */

import { useState } from 'react';
import { YourIcon, BookOpen, Terminal, Shield, Code, AlertTriangle, ExternalLink, ArrowLeft } from 'lucide-react';

const tabs = [
  { id: 'theory', name: 'Theory', icon: BookOpen },
  { id: 'lab', name: 'Lab', icon: Terminal },
  { id: 'tools', name: 'Tools', icon: Shield },
  { id: 'references', name: 'References', icon: Code }
];

interface YourModuleConceptProps {
  onBack?: () => void;
}

export const YourModuleConcept = ({ onBack }: YourModuleConceptProps = {}) => {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* STANDARD BACK BUTTON */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        )}

        {/* STANDARD MAIN CARD */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-lg">

          {/* STANDARD HEADER */}
          <div className="flex items-center gap-4 mb-8">
            {/* STANDARD ICON CONTAINER - Always emerald gradient */}
            <div className="p-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl">
              <YourIcon className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold">Module Title</h1>
              <p className="text-emerald-600 dark:text-emerald-400 mt-2">Subtitle description</p>
            </div>
          </div>

          {/* STANDARD TAB NAVIGATION */}
          <div className="border-b border-gray-200 dark:border-slate-700 mb-8">
            <nav className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* TAB CONTENT */}
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

// ============================================================================
// TAB COMPONENTS
// ============================================================================

const TheoryTab = () => (
  <div className="space-y-8">
    {/* INTRODUCTION SECTION */}
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <YourIcon className="w-6 h-6 text-emerald-500" />
        What is [Concept Name]?
      </h2>

      {/* STANDARD SECTION CARD */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 space-y-4">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Introduction paragraph...
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Additional explanation...
        </p>
      </div>
    </section>

    {/* REAL-WORLD EXAMPLES SECTION */}
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-red-400" />
        Real-World Examples
      </h2>

      <div className="space-y-6">
        {/* EXAMPLE CARD */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            Company Name (Year)
          </h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p><strong className="text-emerald-600 dark:text-emerald-400">Attack Vector:</strong> Description...</p>
            <p><strong className="text-emerald-600 dark:text-emerald-400">Impact:</strong> Impact details...</p>
            <p><strong className="text-emerald-600 dark:text-emerald-400">Financial Cost:</strong> $X million</p>
            <p><strong className="text-emerald-600 dark:text-emerald-400">Key Lesson:</strong> Takeaway...</p>
          </div>
        </div>
      </div>
    </section>

    {/* KEY TAKEAWAYS SECTION */}
    <section>
      <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
        <ul className="space-y-3 text-gray-600 dark:text-gray-300">
          <li className="flex items-start">
            <span className="text-emerald-500 mr-2 mt-1">✓</span>
            <span><strong>Point one:</strong> explanation...</span>
          </li>
          <li className="flex items-start">
            <span className="text-emerald-500 mr-2 mt-1">✓</span>
            <span><strong>Point two:</strong> explanation...</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
);

const LabTab = () => (
  <div className="space-y-8">
    {/* WARNING BOX */}
    <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
      <p className="text-sm font-semibold flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        ETHICAL USE ONLY: These examples are for educational purposes. Only test on systems you own or have explicit permission to test.
      </p>
    </div>

    <section>
      <h2 className="text-2xl font-bold mb-4">Hands-On Labs</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Lab introduction...
      </p>

      {/* CODE EXAMPLE CARD */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">Lab Title</h3>

        {/* CODE BLOCK */}
        <div className="bg-gray-900 dark:bg-slate-950 rounded p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-300">
<span className="text-green-400"># Comment</span>
<span className="text-blue-400">command</span> argument
          </pre>
        </div>
      </div>
    </section>

    {/* JUPYTER NOTEBOOK LINK */}
    <section>
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Terminal className="w-6 h-6" />
          Interactive Jupyter Notebook
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Ready to practice in an interactive environment?
        </p>
        <a
          href="/notebooks/XX-module-name.ipynb"
          className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg font-semibold transition-all"
        >
          Open Interactive Lab Notebook
        </a>
      </div>
    </section>
  </div>
);

const ToolsTab = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold mb-4">Tools</h2>
    </section>

    {/* ATTACK TOOLS */}
    <section>
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Shield className="w-6 h-6 text-emerald-500" />
        Attack Tools
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TOOL CARD */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
          <h4 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">Tool Name</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            Tool description...
          </p>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p><strong className="text-emerald-600 dark:text-emerald-400">Use Case:</strong> Primary use case</p>
            <p><strong className="text-emerald-600 dark:text-emerald-400">Features:</strong> Key features</p>
          </div>
        </div>
      </div>
    </section>

    {/* DEFENSE TOOLS */}
    <section className="mt-12">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Shield className="w-6 h-6 text-emerald-500" />
        Defense Tools
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Similar structure to attack tools */}
      </div>
    </section>
  </div>
);

const ReferencesTab = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold mb-4">References & Resources</h2>
    </section>

    {/* OFFICIAL STANDARDS */}
    <section>
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-emerald-500" />
        Standards & Frameworks
      </h3>
      <div className="space-y-3">
        {/* REFERENCE LINK CARD */}
        <a
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-4 hover:border-emerald-500 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Reference Title</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Description of reference
              </p>
            </div>
            <ExternalLink className="w-5 h-5 text-emerald-500" />
          </div>
        </a>
      </div>
    </section>

    {/* RESEARCH PAPERS */}
    <section>
      <h3 className="text-2xl font-bold mb-4">Research & Case Studies</h3>
      <div className="space-y-4">
        {/* CITATION CARD */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-4">
          <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mb-2">[1]</p>
          <h4 className="font-semibold mb-2">Paper Title (Year)</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Paper description and key findings...
          </p>
        </div>
      </div>
    </section>

    {/* LEGAL DISCLAIMER */}
    <section>
      <h3 className="text-2xl font-bold mb-4">Legal & Ethical Guidelines</h3>
      <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-red-400 mr-3 mt-1 flex-shrink-0" />
          <div className="text-gray-600 dark:text-gray-300">
            <p className="font-semibold text-red-400 mb-2">Legal Disclaimer</p>
            <p>
              Unauthorized testing may violate laws. Always obtain explicit written authorization.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// ============================================================================
// COLOR STANDARDS REFERENCE
// ============================================================================

/**
 * STANDARD COLOR PALETTE (HackLearn Pro Harmonized)
 *
 * PRIMARY ACCENT: Emerald
 * - Light mode: emerald-600, emerald-500
 * - Dark mode: emerald-400, emerald-500
 * - Gradients: from-emerald-400 to-emerald-600
 *
 * BACKGROUNDS:
 * - Root: bg-white dark:bg-slate-950
 * - Cards: bg-white dark:bg-slate-900
 * - Light tint: bg-gray-50 dark:bg-slate-800
 *
 * BORDERS:
 * - Standard: border-gray-200 dark:border-slate-800
 * - Light: border-slate-200 dark:border-slate-700
 * - Accent: border-emerald-500
 *
 * TEXT:
 * - Primary: text-gray-900 dark:text-white
 * - Secondary: text-gray-600 dark:text-gray-300
 * - Tertiary: text-gray-600 dark:text-gray-400
 * - Accent: text-emerald-600 dark:text-emerald-400
 *
 * SEMANTIC COLORS:
 * - Success: green-500, green-600
 * - Warning: yellow-500, amber-500
 * - Error: red-500, red-400
 *
 * NEVER USE:
 * - cyan (replaced with emerald)
 * - blue for accents (replaced with emerald)
 * - purple/pink gradients (replaced with emerald)
 * - gray in dark mode where slate should be used
 */
