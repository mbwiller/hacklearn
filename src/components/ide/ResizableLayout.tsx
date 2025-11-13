import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { motion } from 'framer-motion';
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

const panelVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: custom * 0.1,
      duration: 0.3,
    },
  }),
};

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
          <motion.div
            className="h-full"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={panelVariants}
          >
            <ProblemPanel problem={problem} />
          </motion.div>
        </Panel>

        {/* Resize Handle */}
        <PanelResizeHandle className="w-1 bg-slate-700 hover:bg-cyan-400 transition-colors cursor-ew-resize" />

        {/* Middle Panel - Code Editor */}
        <Panel defaultSize={45} minSize={30}>
          <motion.div
            className="h-full"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={panelVariants}
          >
            <EditorPanel
              code={code}
              language={language}
              onCodeChange={onCodeChange}
              onLanguageChange={onLanguageChange}
              testResult={testResult}
              isRunning={isRunning}
              onReset={onReset}
            />
          </motion.div>
        </Panel>

        {/* Resize Handle */}
        <PanelResizeHandle className="w-1 bg-slate-700 hover:bg-cyan-400 transition-colors cursor-ew-resize" />

        {/* Right Panel - Hints */}
        <Panel defaultSize={20} minSize={15} maxSize={30}>
          <motion.div
            className="h-full"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={panelVariants}
          >
            <HintsPanel hints={problem.hints} />
          </motion.div>
        </Panel>
      </PanelGroup>
    </div>
  );
};
