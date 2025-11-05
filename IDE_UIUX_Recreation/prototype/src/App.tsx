import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ResizableLayout } from './components/ResizableLayout';
import { sampleProblem } from './data/sampleProblem';
import { executeCode } from './api/client';
import type { Language, TestResult } from './types';

function App() {
  const [language, setLanguage] = useState<Language>('python');
  const [code, setCode] = useState<string>(sampleProblem.starterCode.python);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Update code when language changes
  useEffect(() => {
    setCode(sampleProblem.starterCode[language]);
  }, [language]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Enter to run code
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, language]);

  const handleRunCode = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setTestResult(null);

    try {
      // Call backend API to execute code
      const result = await executeCode({
        code,
        language,
        problemId: sampleProblem.id,
      });

      setTestResult(result);
    } catch (error) {
      // Handle network errors and backend failures
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      setTestResult({
        status: 'runtime_error',
        testsPassed: 0,
        testsTotal: 3,
        output: '',
        error: errorMessage,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = () => {
    if (isRunning) return;

    alert('Submit functionality - In a real application, this would submit your code for final evaluation!');
  };

  const handleReset = () => {
    if (confirm('Reset code to original starter code? This will erase your current work.')) {
      setCode(sampleProblem.starterCode[language]);
      setTestResult(null);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-leetcode-dark-bg-1">
      <Navbar onRun={handleRunCode} onSubmit={handleSubmit} isRunning={isRunning} />
      <div className="flex-1 overflow-hidden">
        <ResizableLayout
          problem={sampleProblem}
          code={code}
          language={language}
          onCodeChange={setCode}
          onLanguageChange={setLanguage}
          testResult={testResult}
          isRunning={isRunning}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}

export default App;
