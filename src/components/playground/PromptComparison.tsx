import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { useLLMChat, type ChatMessage } from '../../hooks/useLLMChat';

interface PromptComparisonProps {
  strategyA: {
    name: string;
    prompt: string;
  };
  strategyB: {
    name: string;
    prompt: string;
  };
  problem: string;
  model: string;
  onComplete?: (results: { strategyA: string; strategyB: string }) => void;
}

export const PromptComparison = ({
  strategyA,
  strategyB,
  model,
  onComplete,
}: PromptComparisonProps) => {
  const chatA = useLLMChat();
  const chatB = useLLMChat();

  const [responseA, setResponseA] = useState<string>('');
  const [responseB, setResponseB] = useState<string>('');
  const [isLoadingA, setIsLoadingA] = useState(false);
  const [isLoadingB, setIsLoadingB] = useState(false);
  const [errorA, setErrorA] = useState<string | null>(null);
  const [errorB, setErrorB] = useState<string | null>(null);

  // Sequential execution: run both strategies one after another
  useEffect(() => {
    const runComparison = async () => {
      // Clear previous results
      setResponseA('');
      setResponseB('');
      setErrorA(null);
      setErrorB(null);

      // Run Strategy A (Standard Prompting)
      setIsLoadingA(true);
      const messagesA: ChatMessage[] = [{ role: 'user', content: strategyA.prompt }];
      const resultA = await chatA.sendMessage(messagesA, { model: model as any });

      if (resultA) {
        setResponseA(resultA.message);
      } else if (chatA.error) {
        setErrorA(chatA.error);
      }
      setIsLoadingA(false);

      // Brief pause for UX clarity
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Run Strategy B (Chain of Thought)
      setIsLoadingB(true);
      const messagesB: ChatMessage[] = [{ role: 'user', content: strategyB.prompt }];
      const resultB = await chatB.sendMessage(messagesB, { model: model as any });

      if (resultB) {
        setResponseB(resultB.message);
      } else if (chatB.error) {
        setErrorB(chatB.error);
      }
      setIsLoadingB(false);

      // Call onComplete callback if provided
      if (onComplete && resultA && resultB) {
        onComplete({
          strategyA: resultA.message,
          strategyB: resultB.message,
        });
      }
    };

    runComparison();
  }, [strategyA.prompt, strategyB.prompt, model]); // Re-run when props change

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Strategy Comparison
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strategy A Column */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-cyan-400">{strategyA.name}</h4>
            {isLoadingA && <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />}
          </div>

          <Card className="bg-white dark:bg-[#0A0A0A] border-gray-200 dark:border-[#1F1F1F] min-h-[200px]">
            {isLoadingA ? (
              <div className="flex items-center justify-center h-full py-12">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Generating response...
                  </p>
                </div>
              </div>
            ) : errorA ? (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{errorA}</p>
              </div>
            ) : responseA ? (
              <div className="space-y-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                  {responseA}
                </pre>
                {chatA.usage && (
                  <div className="pt-4 border-t border-gray-200 dark:border-[#1F1F1F]">
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>Tokens: {chatA.usage.total_tokens}</span>
                      <span>Cost: ${chatA.cost.toFixed(6)}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full py-12">
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Waiting to run...
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Strategy B Column */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-emerald-400">{strategyB.name}</h4>
            {isLoadingB && <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />}
          </div>

          <Card className="bg-white dark:bg-[#0A0A0A] border-gray-200 dark:border-[#1F1F1F] min-h-[200px]">
            {isLoadingB ? (
              <div className="flex items-center justify-center h-full py-12">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Generating response...
                  </p>
                </div>
              </div>
            ) : errorB ? (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{errorB}</p>
              </div>
            ) : responseB ? (
              <div className="space-y-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                  {responseB}
                </pre>
                {chatB.usage && (
                  <div className="pt-4 border-t border-gray-200 dark:border-[#1F1F1F]">
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>Tokens: {chatB.usage.total_tokens}</span>
                      <span>Cost: ${chatB.cost.toFixed(6)}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full py-12">
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Waiting for Strategy A to complete...
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Comparison Summary */}
      {responseA && responseB && chatA.usage && chatB.usage && (
        <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0A0A0A] dark:to-[#0F0F0F] border-gray-200 dark:border-[#1F1F1F]">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Comparison Summary
          </h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-1">Token Difference</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {Math.abs(chatB.usage.total_tokens - chatA.usage.total_tokens)} tokens
              </p>
              <p className="text-xs text-gray-500">
                {chatB.usage.total_tokens > chatA.usage.total_tokens
                  ? `${strategyB.name} used more`
                  : `${strategyA.name} used more`}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-1">Cost Difference</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${Math.abs(chatB.cost - chatA.cost).toFixed(6)}
              </p>
              <p className="text-xs text-gray-500">
                {chatB.cost > chatA.cost
                  ? `${strategyB.name} cost more`
                  : `${strategyA.name} cost more`}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-1">Response Length</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {responseB.length} vs {responseA.length} chars
              </p>
              <p className="text-xs text-gray-500">
                {responseB.length > responseA.length
                  ? `${strategyB.name} is more detailed`
                  : `${strategyA.name} is more detailed`}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
