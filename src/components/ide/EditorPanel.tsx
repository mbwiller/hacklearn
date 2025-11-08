import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Maximize2, ChevronDown, RotateCcw } from 'lucide-react';
import type { Language, TestResult } from '@/types/ide';
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
        <div className="h-full flex flex-col bg-slate-900">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <span className="text-gray-300 text-sm font-medium">Code</span>

              {/* Language Selector */}
              <div className="relative">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-opacity-80 text-gray-300 rounded text-sm transition-colors">
                  <span className="capitalize">{language}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {/* Dropdown would go here in full implementation */}
              </div>

              <button
                onClick={onReset}
                className="flex items-center gap-1.5 px-2.5 py-1 text-gray-400 hover:text-gray-300 hover:bg-slate-800 rounded text-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <span className="text-gray-400 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                Saved
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="p-1.5 text-gray-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
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
      <PanelResizeHandle className="h-1 bg-slate-700 hover:bg-cyan-400 transition-colors cursor-ns-resize" />

      {/* Console Output Panel */}
      <Panel defaultSize={40} minSize={20}>
        <ConsoleOutput testResult={testResult} isRunning={isRunning} />
      </Panel>
    </PanelGroup>
  );
};
