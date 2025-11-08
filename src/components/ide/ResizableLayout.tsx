import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import type { Language, TestResult, Problem } from '@/types/ide';
import { ProblemPanel } from './ProblemPanel';
import { EditorPanel } from './EditorPanel';
import { HintsPanel } from './HintsPanel';

interface ResizableLayoutProps {
  problem: Problem;
  code: string;
  language: Language;
  onCodeChange: (code: string) => void;
  onLanguageChange: (language: Language) => void;
  testResult: TestResult | null;
  isRunning: boolean;
  onReset: () => void;
}

export const ResizableLayout = ({
  problem,
  code,
  language,
  onCodeChange,
  onLanguageChange,
  testResult,
  isRunning,
  onReset,
}: ResizableLayoutProps) => {
  return (
    <div className="h-full">
      <PanelGroup direction="horizontal">
        {/* Left Panel - Problem Description */}
        <Panel defaultSize={35} minSize={25} maxSize={50}>
          <ProblemPanel problem={problem} />
        </Panel>

        {/* Resize Handle */}
        <PanelResizeHandle className="w-1 bg-slate-700 hover:bg-cyan-400 transition-colors cursor-ew-resize" />

        {/* Middle Panel - Code Editor */}
        <Panel defaultSize={45} minSize={30}>
          <EditorPanel
            code={code}
            language={language}
            onCodeChange={onCodeChange}
            onLanguageChange={onLanguageChange}
            testResult={testResult}
            isRunning={isRunning}
            onReset={onReset}
          />
        </Panel>

        {/* Resize Handle */}
        <PanelResizeHandle className="w-1 bg-slate-700 hover:bg-cyan-400 transition-colors cursor-ew-resize" />

        {/* Right Panel - Hints */}
        <Panel defaultSize={20} minSize={15} maxSize={30}>
          <HintsPanel hints={problem.hints} />
        </Panel>
      </PanelGroup>
    </div>
  );
};
