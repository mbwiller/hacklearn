import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Maximize2, ChevronDown, RotateCcw } from 'lucide-react';
import type { Language, TestResult } from '../types';
import { CodeEditor } from './CodeEditor';
import { ConsoleOutput } from './ConsoleOutput';

interface EditorPanelProps {
  code: string;
  language: Language;
  onCodeChange: (code: string) => void;
  onLanguageChange: (language: Language) => void;
  testResult: TestResult | null;
  isRunning: boolean;
  onReset: () => void;
}

export const EditorPanel = ({
  code,
  language,
  onCodeChange,
  testResult,
  isRunning,
  onReset,
}: EditorPanelProps) => {
  return (
    <PanelGroup direction="vertical">
      {/* Code Editor Panel */}
      <Panel defaultSize={60} minSize={30}>
        <div className="h-full flex flex-col bg-leetcode-dark-bg-2">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="flex items-center gap-3">
              <span className="text-leetcode-text-secondary text-sm font-medium">Code</span>

              {/* Language Selector */}
              <div className="relative">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-leetcode-dark-bg-3 hover:bg-opacity-80 text-leetcode-text-secondary rounded text-sm transition-colors">
                  <span className="capitalize">{language}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {/* Dropdown would go here in full implementation */}
              </div>

              <button
                onClick={onReset}
                className="flex items-center gap-1.5 px-2.5 py-1 text-leetcode-text-muted hover:text-leetcode-text-secondary hover:bg-leetcode-dark-bg-3 rounded text-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <span className="text-leetcode-text-muted text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-leetcode-accent-green rounded-full"></span>
                Saved
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="p-1.5 text-leetcode-text-muted hover:text-leetcode-text-primary hover:bg-leetcode-dark-bg-3 rounded transition-colors"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 overflow-hidden">
            <CodeEditor code={code} language={language} onChange={onCodeChange} />
          </div>
        </div>
      </Panel>

      {/* Resize Handle */}
      <PanelResizeHandle className="h-1 bg-leetcode-dark-divider hover:bg-leetcode-accent-blue transition-colors cursor-ns-resize" />

      {/* Console Output Panel */}
      <Panel defaultSize={40} minSize={20}>
        <ConsoleOutput testResult={testResult} isRunning={isRunning} />
      </Panel>
    </PanelGroup>
  );
};
