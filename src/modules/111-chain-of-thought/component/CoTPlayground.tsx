import { useState, useCallback } from 'react';
import {
  Brain,
  BookOpen,
  Zap,
  BarChart3,
  ArrowLeft,
  Lightbulb,
  CheckCircle,
  XCircle,
  Loader2,
  Settings,
  Download,
} from 'lucide-react';
import { ApiKeyManager } from '@/components/playground/ApiKeyManager';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useLLMChat, type ChatMessage } from '@/hooks/useLLMChat';

// NEW: Premium playground components
import {
  ParameterPanel,
  ProblemSelector,
  COT_PRESET_PROBLEMS,
  type GenerationParams,
  type ModelOption,
  type Problem,
} from '@/components/playground';
import { RawOutputComparison } from '@/components/playground/comparison/RawOutputComparison';
import { CoTVisualizationSection } from '@/components/playground/comparison/CoTVisualizationSection';

const tabs = [
  { id: 'theory', name: 'Theory', icon: BookOpen },
  { id: 'interactive', name: 'Interactive', icon: Zap },
  { id: 'benchmark', name: 'Benchmark', icon: BarChart3 },
];

interface CoTPlaygroundProps {
  onBack?: () => void;
}

export const CoTPlayground = ({ onBack }: CoTPlaygroundProps = {}) => {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-white p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        )}

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-lg">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl shadow-xl shadow-cyan-500/20">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Chain of Thought Reasoning
              </h1>
              <p className="text-cyan-600 dark:text-cyan-400 mt-2 text-lg">
                Interactive exploration of step-by-step prompting techniques
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-slate-700 mb-8">
            <nav className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'theory' && <TheoryTab />}
            {activeTab === 'interactive' && <InteractiveTab />}
            {activeTab === 'benchmark' && <BenchmarkTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================
   THEORY TAB (Enhanced with animations)
   ============================================ */
const TheoryTab = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Lightbulb className="w-6 h-6 text-cyan-400" />
        What is Chain of Thought Prompting?
      </h2>
      <Card className="bg-white dark:bg-[#0A0A0A] border-gray-200 dark:border-[#1F1F1F]">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          Chain of Thought (CoT) prompting, introduced in the seminal paper{' '}
          <em>"Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"</em> (Wei et
          al., 2022), is a prompting technique that dramatically improves LLM performance on complex
          reasoning tasks by encouraging the model to show its step-by-step thinking process.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Instead of jumping directly to an answer, CoT prompting asks the model to "think aloud" -
          breaking down problems into intermediate reasoning steps. This approach has proven
          particularly effective for math word problems, logic puzzles, and commonsense reasoning
          tasks.
        </p>
      </Card>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-cyan-400 mb-4">Example Comparison</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Standard Prompting */}
        <Card className="bg-red-500/10 border-red-500/30">
          <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            Standard Prompting
          </h4>
          <div className="bg-slate-900 rounded-lg p-4 mb-3">
            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono">
              {`Q: Roger has 5 tennis balls. He buys 2
more cans of tennis balls. Each can has
3 tennis balls. How many tennis balls
does he have now?

A: The answer is 11.`}
            </pre>
          </div>
          <p className="text-red-400 text-sm">
            Incorrect or unclear reasoning - the model jumps to a conclusion without showing work
          </p>
        </Card>

        {/* CoT Prompting */}
        <Card className="bg-green-500/10 border-green-500/30">
          <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Chain of Thought Prompting
          </h4>
          <div className="bg-slate-900 rounded-lg p-4 mb-3">
            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono">
              {`Q: Roger has 5 tennis balls. He buys 2
more cans of tennis balls. Each can has
3 tennis balls. How many tennis balls
does he have now?

A: Let's think step by step.
Roger started with 5 balls.
2 cans × 3 balls per can = 6 new balls.
5 + 6 = 11 balls.
The answer is 11.`}
            </pre>
          </div>
          <p className="text-green-400 text-sm">
            Correct with explicit reasoning - the model shows each intermediate step
          </p>
        </Card>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-cyan-400 mb-4">When to Use CoT</h3>
      <Card className="bg-white dark:bg-[#0A0A0A] border-gray-200 dark:border-[#1F1F1F]">
        <ul className="space-y-3 text-gray-600 dark:text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-cyan-400 text-xl">•</span>
            <span>
              <strong>Math word problems:</strong> Breaking down arithmetic and algebraic reasoning
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-cyan-400 text-xl">•</span>
            <span>
              <strong>Logic puzzles:</strong> Step-by-step deduction and inference
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-cyan-400 text-xl">•</span>
            <span>
              <strong>Multi-step problems:</strong> Tasks requiring intermediate calculations
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-cyan-400 text-xl">•</span>
            <span>
              <strong>Commonsense reasoning:</strong> Explaining everyday scenarios with explicit
              logic
            </span>
          </li>
        </ul>
      </Card>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-cyan-400 mb-4">Key Research Findings</h3>
      <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
        <ul className="space-y-4 text-gray-600 dark:text-gray-300">
          <li>
            <strong className="text-cyan-400">GSM8K Math Benchmark:</strong> CoT prompting improved
            accuracy from 17.7% to 78.7% on PaLM 540B (a 4.4x improvement)
          </li>
          <li>
            <strong className="text-cyan-400">Emergent Ability:</strong> CoT only works well on
            models larger than ~100B parameters - smaller models don't benefit significantly
          </li>
          <li>
            <strong className="text-cyan-400">Zero-Shot CoT:</strong> Simply adding "Let's think
            step by step" to any prompt can boost performance without examples
          </li>
          <li>
            <strong className="text-cyan-400">Interpretability:</strong> CoT enables better
            understanding of model decision-making by exposing intermediate reasoning
          </li>
        </ul>
      </Card>
    </section>
  </div>
);

/* ============================================
   INTERACTIVE TAB (Premium Redesign with Dual Streaming)
   ============================================ */
const InteractiveTab = () => {
  // Dual LLM hooks for parallel streaming
  const standardChat = useLLMChat();
  const cotChat = useLLMChat();

  // State for problem and parameters
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [customProblem, setCustomProblem] = useState('');
  const [model, setModel] = useState<ModelOption>('gpt-3.5-turbo'); // DEFAULT: GPT-3.5-turbo
  const [parameters, setParameters] = useState<GenerationParams>({
    temperature: 0.7,
    maxTokens: 2000,
    topP: 1.0,
    systemPrompt: 'You are a helpful reasoning assistant. Think step by step and provide clear explanations.',
  });

  // Parameter panel visibility
  const [showParameterPanel, setShowParameterPanel] = useState(false);

  // Comparison state
  const [isComparing, setIsComparing] = useState(false);

  // Get API key from localStorage
  const apiKey = localStorage.getItem('openai_api_key') || '';

  // Get current problem (selected or custom)
  const currentProblem = customProblem.trim() || selectedProblem?.content || '';

  // Handle problem selection
  const handleProblemSelect = useCallback((problem: Problem) => {
    setSelectedProblem(problem);
    setCustomProblem(''); // Clear custom problem
  }, []);

  // Handle custom problem change
  const handleCustomProblemChange = useCallback((value: string) => {
    setCustomProblem(value);
    if (value.trim()) {
      setSelectedProblem(null); // Clear selected problem
    }
  }, []);

  // Run comparison with parallel streaming
  const runComparison = useCallback(async () => {
    if (!currentProblem || !apiKey) return;

    setIsComparing(true);

    const standardMessages: ChatMessage[] = [{ role: 'user', content: currentProblem }];
    const cotMessages: ChatMessage[] = [
      { role: 'user', content: `${currentProblem}\n\nLet's think step by step.` },
    ];

    // Fire both in parallel - Promise.all ensures simultaneous streaming
    await Promise.all([
      standardChat.sendStreamingMessage(standardMessages, {
        model,
        systemPrompt: parameters.systemPrompt,
      }),
      cotChat.sendStreamingMessage(cotMessages, {
        model,
        systemPrompt: parameters.systemPrompt,
      }),
    ]);

    setIsComparing(false);
  }, [currentProblem, model, apiKey, parameters, standardChat, cotChat]);

  return (
    <div className="space-y-8">
      {/* API Key Manager */}
      <ApiKeyManager />

      {/* Configuration Card */}
      <Card className="bg-white dark:bg-[#0A0A0A] border-gray-200 dark:border-[#1F1F1F]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Configure Experiment
          </h3>
          <Button
            variant="outline"
            size="sm"
            icon={<Settings className="w-4 h-4" />}
            onClick={() => setShowParameterPanel(true)}
          >
            Parameters
          </Button>
        </div>

        {/* Problem Selector */}
        <ProblemSelector
          problems={COT_PRESET_PROBLEMS}
          selectedProblem={selectedProblem ?? undefined}
          onSelect={handleProblemSelect}
          className="mb-6"
        />

        {/* Custom Problem Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
            Or Enter Custom Problem
          </label>
          <textarea
            value={customProblem}
            onChange={(e) => handleCustomProblemChange(e.target.value)}
            className="w-full h-32 bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-white rounded-lg p-4 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none"
            placeholder="Enter a problem that requires step-by-step reasoning..."
          />
        </div>

        {/* Model and Execute */}
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value as ModelOption)}
              className="w-full bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-white rounded-lg px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="gpt-3.5-turbo">GPT-3.5-turbo (Legacy, Cheap)</option>
              <option value="gpt-4o-mini">GPT-4o Mini (Fastest, Cheapest)</option>
              <option value="gpt-4o">GPT-4o (Balanced)</option>
              <option value="gpt-4">GPT-4 (Most Capable)</option>
            </select>
          </div>

          <Button
            onClick={runComparison}
            disabled={!currentProblem || !apiKey || isComparing}
            variant="primary"
            className="px-8"
          >
            <Zap className="w-5 h-5" />
            Compare Strategies
          </Button>
        </div>
      </Card>

      {/* Results: Raw Output Comparison (side-by-side) */}
      {isComparing && (
        <RawOutputComparison
          standardResponse={standardChat.response}
          cotResponse={cotChat.response}
          standardState={standardChat.isLoading ? 'streaming' : standardChat.error ? 'error' : 'complete'}
          cotState={cotChat.isLoading ? 'streaming' : cotChat.error ? 'error' : 'complete'}
          standardMetrics={
            standardChat.isLoading
              ? null
              : {
                  tokens: standardChat.usage?.total_tokens || 0,
                  cost: standardChat.cost,
                  time: standardChat.duration,
                }
          }
          cotMetrics={
            cotChat.isLoading
              ? null
              : {
                  tokens: cotChat.usage?.total_tokens || 0,
                  cost: cotChat.cost,
                  time: cotChat.duration,
                }
          }
          standardError={standardChat.error || undefined}
          cotError={cotChat.error || undefined}
          model={model}
        />
      )}

      {/* CoT Visualization Section (full-width, below comparison) */}
      {isComparing && !cotChat.isLoading && cotChat.response && (
        <CoTVisualizationSection
          cotResponse={cotChat.response}
          isVisible={!cotChat.isLoading}
          apiKey={apiKey}
        />
      )}

      {/* Parameter Panel (Side Drawer) */}
      <ParameterPanel
        model={model}
        parameters={parameters}
        onModelChange={setModel}
        onParametersChange={(newParams) => setParameters({ ...parameters, ...newParams })}
        isOpen={showParameterPanel}
        onClose={() => setShowParameterPanel(false)}
      />
    </div>
  );
};

/* ============================================
   BENCHMARK TAB (Enhanced with export)
   ============================================ */
const BenchmarkTab = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<BenchmarkResult[]>([]);
  const { sendMessage } = useLLMChat();

  interface BenchmarkResult {
    question: string;
    correctAnswer: string;
    standardCorrect: boolean;
    cotCorrect: boolean;
    standardResponse: string;
    cotResponse: string;
  }

  const gsm8kSamples = [
    {
      id: 1,
      question:
        "Janet's ducks lay 16 eggs per day. She eats three for breakfast every morning and bakes muffins for her friends every day with four. She sells the remainder at the farmers' market daily for $2 per fresh duck egg. How much in dollars does she make every day at the farmers' market?",
      answer: '18',
    },
    {
      id: 2,
      question:
        'A robe takes 2 bolts of blue fiber and half that much white fiber. How many bolts in total does it take?',
      answer: '3',
    },
    {
      id: 3,
      question:
        'Josh decides to try flipping a house. He buys a house for $80,000 and then puts in $50,000 in repairs. This increased the value of the house by 150%. How much profit did he make?',
      answer: '70000',
    },
    {
      id: 4,
      question:
        'James decides to run 3 sprints 3 times a week. He runs 60 meters each sprint. How many total meters does he run a week?',
      answer: '540',
    },
    {
      id: 5,
      question:
        "Every day, Wendi feeds each of her chickens three cups of mixed chicken feed, containing seeds, mealworms and vegetables to help keep them healthy. She gives the chickens their feed in three separate meals. In the morning, she gives her flock of chickens 15 cups of feed. In the afternoon, she gives her chickens another 25 cups of feed. How many cups of feed does she need to give her chickens in the final meal of the day if the size of Wendi's flock is 20 chickens?",
      answer: '20',
    },
  ];

  const extractAnswer = (response: string): string => {
    const patterns = [
      /(?:the answer is|answer:|final answer:)\s*\$?(\d+(?:,\d{3})*(?:\.\d+)?)/i,
      /\$?(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:dollars?|bolts?|meters?|cups?)/i,
      /=\s*\$?(\d+(?:,\d{3})*(?:\.\d+)?)/,
    ];

    for (const pattern of patterns) {
      const match = response.match(pattern);
      if (match) {
        return match[1].replace(/,/g, '');
      }
    }

    const numbers = response.match(/\b\d+(?:,\d{3})*(?:\.\d+)?\b/g);
    if (numbers && numbers.length > 0) {
      return numbers[numbers.length - 1].replace(/,/g, '');
    }

    return '';
  };

  const checkAnswer = (response: string, correctAnswer: string): boolean => {
    const extracted = extractAnswer(response);
    return extracted === correctAnswer || extracted === correctAnswer.replace(/,/g, '');
  };

  const runBenchmark = async () => {
    setIsRunning(true);
    setResults([]);
    const newResults: BenchmarkResult[] = [];

    for (const sample of gsm8kSamples) {
      const standardMessages: ChatMessage[] = [{ role: 'user', content: sample.question }];
      const standardResult = await sendMessage(standardMessages, { model: 'gpt-4o-mini' });
      const standardResponse = standardResult?.message || '';

      await new Promise((resolve) => setTimeout(resolve, 300));

      const cotMessages: ChatMessage[] = [
        { role: 'user', content: `${sample.question}\n\nLet's think step by step.` },
      ];
      const cotResult = await sendMessage(cotMessages, { model: 'gpt-4o-mini' });
      const cotResponse = cotResult?.message || '';

      newResults.push({
        question: sample.question,
        correctAnswer: sample.answer,
        standardCorrect: checkAnswer(standardResponse, sample.answer),
        cotCorrect: checkAnswer(cotResponse, sample.answer),
        standardResponse,
        cotResponse,
      });

      setResults([...newResults]);
    }

    setIsRunning(false);
  };

  // Export results to JSON
  const exportResults = useCallback(() => {
    const data = {
      timestamp: new Date().toISOString(),
      totalProblems: results.length,
      accuracy: {
        standard: results.length > 0 ? (results.filter((r) => r.standardCorrect).length / results.length) * 100 : 0,
        cot: results.length > 0 ? (results.filter((r) => r.cotCorrect).length / results.length) * 100 : 0,
      },
      results,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cot-benchmark-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [results]);

  const accuracy = {
    standard: results.length > 0 ? (results.filter((r) => r.standardCorrect).length / results.length) * 100 : 0,
    cot: results.length > 0 ? (results.filter((r) => r.cotCorrect).length / results.length) * 100 : 0,
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-[#0A0A0A] border-gray-200 dark:border-[#1F1F1F]">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          GSM8K Benchmark (Sample)
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Test Chain of Thought on 5 problems from GSM8K, a dataset of grade-school math word
          problems. This benchmark is commonly used to evaluate reasoning capabilities of large
          language models.
        </p>

        <div className="flex gap-3">
          <Button onClick={runBenchmark} disabled={isRunning} variant="primary" fullWidth>
            {isRunning ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Running Benchmark... ({results.length}/5)
              </>
            ) : (
              'Run Benchmark (5 problems)'
            )}
          </Button>

          {results.length > 0 && (
            <Button onClick={exportResults} variant="outline" icon={<Download />}>
              Export
            </Button>
          )}
        </div>
      </Card>

      {results.length > 0 && (
        <>
          {/* Accuracy Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/30">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Standard Prompting</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                  {accuracy.standard.toFixed(0)}%
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">Accuracy</p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Chain of Thought</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                  {accuracy.cot.toFixed(0)}%
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">Accuracy</p>
              </div>
            </Card>
          </div>

          {/* Detailed Results */}
          <Card className="bg-white dark:bg-[#0A0A0A] border-gray-200 dark:border-[#1F1F1F]">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Detailed Results
            </h4>
            <div className="space-y-4">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  className="border-b border-gray-200 dark:border-[#1F1F1F] pb-4 last:border-0"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {idx + 1}. {result.question}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={result.standardCorrect ? 'text-green-400' : 'text-red-400'}>
                      Standard: {result.standardCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                    <span className="text-gray-500 dark:text-gray-600">|</span>
                    <span className={result.cotCorrect ? 'text-green-400' : 'text-red-400'}>
                      CoT: {result.cotCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                    <span className="text-gray-500 dark:text-gray-600">|</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      Expected: {result.correctAnswer}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
