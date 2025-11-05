import { useState } from 'react';
import { BookOpen, FileText, Users, Send } from 'lucide-react';
import type { Problem, TabType } from '../types';

interface ProblemPanelProps {
  problem: Problem;
}

export const ProblemPanel = ({ problem }: ProblemPanelProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('description');

  const getDifficultyColor = () => {
    switch (problem.difficulty) {
      case 'Easy':
        return 'text-green-400 bg-green-400/20';
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
    <div className="h-full flex flex-col bg-leetcode-dark-bg-2">
      {/* Tabs */}
      <div className="flex gap-1 border-b px-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-leetcode-accent-blue text-leetcode-text-primary'
                : 'border-transparent text-leetcode-text-muted hover:text-leetcode-text-secondary'
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
              <h1 className="text-2xl font-bold text-leetcode-text-primary mb-3">
                {problem.id}. {problem.title}
              </h1>

              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-1 rounded text-xs font-medium ${getDifficultyColor()}`}>
                  {problem.difficulty}
                </span>
                {problem.topics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-leetcode-dark-bg-3 text-leetcode-text-muted rounded text-xs"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="text-leetcode-text-secondary space-y-4 leading-relaxed">
              {problem.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className={paragraph.startsWith('SELECT') ? 'bg-leetcode-dark-bg-1 rounded-lg p-4 font-mono text-sm' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Examples */}
            <div className="space-y-4">
              {problem.examples.map((example, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-leetcode-text-primary font-semibold">
                    Example {idx + 1}:
                  </h3>
                  <div className="bg-leetcode-dark-bg-1 rounded-lg p-4 space-y-3">
                    <div>
                      <div className="text-leetcode-text-muted text-sm mb-1">Input:</div>
                      <pre className="font-mono text-sm text-leetcode-text-secondary whitespace-pre-wrap">
                        {example.input}
                      </pre>
                    </div>
                    <div>
                      <div className="text-leetcode-text-muted text-sm mb-1">Output:</div>
                      <pre className="font-mono text-sm text-leetcode-text-secondary whitespace-pre-wrap">
                        {example.output}
                      </pre>
                    </div>
                    <div>
                      <div className="text-leetcode-text-muted text-sm mb-1">Explanation:</div>
                      <p className="text-sm text-leetcode-text-secondary leading-relaxed">
                        {example.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div>
              <h3 className="text-leetcode-text-primary font-semibold mb-3">Constraints:</h3>
              <ul className="space-y-2">
                {problem.constraints.map((constraint, idx) => (
                  <li key={idx} className="text-leetcode-text-secondary text-sm flex items-start gap-2">
                    <span className="text-leetcode-accent-blue mt-0.5">•</span>
                    <span>{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'editorial' && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-leetcode-text-muted mx-auto mb-4" />
            <p className="text-leetcode-text-muted">Editorial content coming soon</p>
          </div>
        )}

        {activeTab === 'solutions' && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-leetcode-text-muted mx-auto mb-4" />
            <p className="text-leetcode-text-muted">Community solutions coming soon</p>
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="text-center py-12">
            <Send className="w-12 h-12 text-leetcode-text-muted mx-auto mb-4" />
            <p className="text-leetcode-text-muted">No submissions yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
