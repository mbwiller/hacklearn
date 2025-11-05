import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import type { TestResult, ConsoleTab } from '../types';

interface ConsoleOutputProps {
  testResult: TestResult | null;
  isRunning: boolean;
}

export const ConsoleOutput = ({ testResult, isRunning }: ConsoleOutputProps) => {
  const [activeTab, setActiveTab] = useState<ConsoleTab>('testcase');

  const getStatusIcon = () => {
    if (!testResult) return null;

    switch (testResult.status) {
      case 'accepted':
        return <CheckCircle2 className="w-5 h-5 text-leetcode-accent-green" />;
      case 'wrong_answer':
        return <XCircle className="w-5 h-5 text-leetcode-accent-red" />;
      case 'runtime_error':
        return <AlertCircle className="w-5 h-5 text-leetcode-accent-orange" />;
      default:
        return <AlertCircle className="w-5 h-5 text-leetcode-text-muted" />;
    }
  };

  const getStatusText = () => {
    if (!testResult) return null;

    switch (testResult.status) {
      case 'accepted':
        return 'Accepted';
      case 'wrong_answer':
        return 'Wrong Answer';
      case 'runtime_error':
        return 'Runtime Error';
      case 'time_limit_exceeded':
        return 'Time Limit Exceeded';
    }
  };

  const getStatusColor = () => {
    if (!testResult) return '';

    switch (testResult.status) {
      case 'accepted':
        return 'text-leetcode-accent-green';
      case 'wrong_answer':
        return 'text-leetcode-accent-red';
      case 'runtime_error':
        return 'text-leetcode-accent-orange';
      default:
        return 'text-leetcode-text-muted';
    }
  };

  return (
    <div className="h-full flex flex-col bg-leetcode-dark-bg-2">
      {/* Tabs */}
      <div className="flex gap-4 border-b px-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <button
          onClick={() => setActiveTab('testcase')}
          className={`px-2 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'testcase'
              ? 'border-leetcode-accent-blue text-leetcode-text-primary'
              : 'border-transparent text-leetcode-text-muted hover:text-leetcode-text-secondary'
          }`}
        >
          Testcase
        </button>
        <button
          onClick={() => setActiveTab('result')}
          className={`px-2 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'result'
              ? 'border-leetcode-accent-blue text-leetcode-text-primary'
              : 'border-transparent text-leetcode-text-muted hover:text-leetcode-text-secondary'
          }`}
        >
          Test Result
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'testcase' && (
          <div className="space-y-4">
            <div className="text-sm text-leetcode-text-secondary">
              <div className="mb-3">
                <span className="text-leetcode-text-muted">Case 1</span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-leetcode-text-muted">username =</span>
                  <div className="mt-1 bg-leetcode-dark-bg-3 rounded p-2 font-mono text-xs">
                    "admin' OR '1'='1' --"
                  </div>
                </div>
                <div>
                  <span className="text-leetcode-text-muted">password =</span>
                  <div className="mt-1 bg-leetcode-dark-bg-3 rounded p-2 font-mono text-xs">
                    "anything"
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'result' && (
          <div className="space-y-4">
            {isRunning ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-leetcode-accent-blue border-t-transparent"></div>
                <p className="mt-3 text-leetcode-text-muted text-sm">Running test cases...</p>
              </div>
            ) : testResult ? (
              <div className="space-y-4">
                {/* Status */}
                <div className="flex items-center gap-2">
                  {getStatusIcon()}
                  <span className={`text-lg font-semibold ${getStatusColor()}`}>
                    {getStatusText()}
                  </span>
                </div>

                {/* Performance Metrics */}
                {testResult.status === 'accepted' && (
                  <div className="bg-leetcode-dark-bg-3 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-leetcode-text-muted">Runtime</span>
                      <span className="text-leetcode-text-secondary font-medium">
                        {testResult.runtime}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-leetcode-text-muted">Memory</span>
                      <span className="text-leetcode-text-secondary font-medium">
                        {testResult.memory}
                      </span>
                    </div>
                  </div>
                )}

                {/* Test Results */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-leetcode-text-muted">Test Cases Passed</span>
                    <span className={`font-semibold ${testResult.status === 'accepted' ? 'text-leetcode-accent-green' : 'text-leetcode-accent-red'}`}>
                      {testResult.testsPassed} / {testResult.testsTotal}
                    </span>
                  </div>
                </div>

                {/* Output */}
                <div>
                  <div className="text-leetcode-text-muted text-sm mb-2">Output</div>
                  <div className="bg-leetcode-dark-bg-3 rounded p-3 font-mono text-xs text-leetcode-text-secondary whitespace-pre-wrap">
                    {testResult.output}
                  </div>
                </div>

                {/* Error (if any) */}
                {testResult.error && (
                  <div>
                    <div className="text-leetcode-accent-red text-sm mb-2">Error</div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3 font-mono text-xs text-leetcode-accent-red whitespace-pre-wrap">
                      {testResult.error}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-leetcode-text-muted text-sm">
                  You must run your code first
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
