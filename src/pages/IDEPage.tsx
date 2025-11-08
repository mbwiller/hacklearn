import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Navbar, ResizableLayout } from '@/components/ide';
import { executeCode } from '@/api/codeExecutor';
import { getLabProblem } from '@/data/lab-problems';
import type { Language, TestResult } from '@/types/ide';

export const IDEPage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();

  // Load problem data
  let problem;
  try {
    problem = getLabProblem(Number(moduleId));
  } catch (error) {
    // If problem not found, redirect back
    navigate(`/app/concepts/${moduleId}`);
    return null;
  }

  const [language, setLanguage] = useState<Language>('python');
  const [code, setCode] = useState<string>(problem.starterCode.python);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Update code when language changes
  useEffect(() => {
    setCode(problem.starterCode[language]);
  }, [language, problem]);

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
      const result = await executeCode({
        code,
        language,
        problemId: problem.id,
      });

      setTestResult(result);
    } catch (error) {
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

    // For now, just run the code
    // In future, this could submit to a grading system
    alert('Submit functionality - In a real application, this would submit your code for final evaluation!');
  };

  const handleReset = () => {
    if (confirm('Reset code to original starter code? This will erase your current work.')) {
      setCode(problem.starterCode[language]);
      setTestResult(null);
    }
  };

  const handleBack = () => {
    navigate(`/app/concepts/${moduleId}`);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      {/* Back button */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2">
        <button
          onClick={handleBack}
          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {problem.title}
        </button>
      </div>

      <Navbar onRun={handleRunCode} onSubmit={handleSubmit} isRunning={isRunning} />

      <div className="flex-1 overflow-hidden">
        <ResizableLayout
          problem={problem}
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
};
