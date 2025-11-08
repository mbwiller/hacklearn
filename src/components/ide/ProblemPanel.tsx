import { useState } from 'react';
import { BookOpen, FileText, Users, Send } from 'lucide-react';
import type { Problem, TabType } from '@/types/ide';

interface ProblemPanelProps {
  problem: Problem;
}

export const ProblemPanel = ({ problem }: ProblemPanelProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('description');

  const getDifficultyColor = () => {
    switch (problem.difficulty) {
      case 'Easy':
        return 'text-emerald-400 bg-emerald-400/20';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard':
        return 'text-red-400 bg-red-400/20';
    }
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'description', label: 'Description', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'editorial', label: 'Editorial', icon: <FileText className="w-4 h-4" /> },
    { id: 'solutions', label: 'Solutions', icon: <Users className="w-4 h-4" /> },
    { id: 'submissions', label: 'Submissions', icon: <Send className="w-4 h-4" /> },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-700 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-cyan-400 text-white'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {activeTab === 'description' && (
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-white mb-3">
                {problem.id}. {problem.title}
              </h1>

              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-1 rounded text-xs font-medium ${getDifficultyColor()}`}>
                  {problem.difficulty}
                </span>
                {problem.topics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-800 text-gray-400 rounded text-xs"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="text-gray-300 space-y-4 leading-relaxed">
              {problem.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className={paragraph.startsWith('SELECT') ? 'bg-slate-950 rounded-lg p-4 font-mono text-sm' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Examples */}
            <div className="space-y-4">
              {problem.examples.map((example, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-white font-semibold">
                    Example {idx + 1}:
                  </h3>
                  <div className="bg-slate-950 rounded-lg p-4 space-y-3">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Input:</div>
                      <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap">
                        {example.input}
                      </pre>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Output:</div>
                      <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap">
                        {example.output}
                      </pre>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Explanation:</div>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {example.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div>
              <h3 className="text-white font-semibold mb-3">Constraints:</h3>
              <ul className="space-y-2">
                {problem.constraints.map((constraint, idx) => (
                  <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'editorial' && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">Editorial content coming soon</p>
          </div>
        )}

        {activeTab === 'solutions' && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">Community solutions coming soon</p>
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="text-center py-12">
            <Send className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No submissions yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
