import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import type { TestResult, ConsoleTab } from '@/types/ide';

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
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'wrong_answer':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'runtime_error':
        return <AlertCircle className="w-5 h-5 text-orange-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
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
        return 'text-emerald-400';
      case 'wrong_answer':
        return 'text-red-400';
      case 'runtime_error':
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-700 px-4">
        <button
          onClick={() => setActiveTab('testcase')}
          className={`px-2 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'testcase'
              ? 'border-cyan-400 text-white'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          Testcase
        </button>
        <button
          onClick={() => setActiveTab('result')}
          className={`px-2 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'result'
              ? 'border-cyan-400 text-white'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          Test Result
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'testcase' && (
          <div className="space-y-4">
            <div className="text-sm text-gray-300">
              <div className="mb-3">
                <span className="text-gray-400">Case 1</span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-400">Input:</span>
                  <div className="mt-1 bg-slate-800 rounded p-2 font-mono text-xs">
                    See problem description
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
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-cyan-400 border-t-transparent"></div>
                <p className="mt-3 text-gray-400 text-sm">Running test cases...</p>
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
                  <div className="bg-slate-800 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Runtime</span>
                      <span className="text-gray-300 font-medium">
                        {testResult.runtime}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Memory</span>
                      <span className="text-gray-300 font-medium">
                        {testResult.memory}
                      </span>
                    </div>
                  </div>
                )}

                {/* Test Results */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Test Cases Passed</span>
                    <span className={`font-semibold ${testResult.status === 'accepted' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {testResult.testsPassed} / {testResult.testsTotal}
                    </span>
                  </div>
                </div>

                {/* Output */}
                <div>
                  <div className="text-gray-400 text-sm mb-2">Output</div>
                  <div className="bg-slate-800 rounded p-3 font-mono text-xs text-gray-300 whitespace-pre-wrap">
                    {testResult.output}
                  </div>
                </div>

                {/* Error (if any) */}
                {testResult.error && (
                  <div>
                    <div className="text-red-400 text-sm mb-2">Error</div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3 font-mono text-xs text-red-400 whitespace-pre-wrap">
                      {testResult.error}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm">
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
