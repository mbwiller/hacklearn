import { type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface PlaygroundShellProps {
  promptTemplate: string;
  onPromptChange: (prompt: string) => void;
  onExecute: () => void;
  isLoading: boolean;
  response: string;
  usage?: {
    tokens: number;
    cost: number;
  };
  model: string;
  onModelChange: (model: string) => void;
  children?: ReactNode; // For custom controls
}

export const PlaygroundShell = ({
  promptTemplate,
  onPromptChange,
  onExecute,
  isLoading,
  response,
  usage,
  model,
  onModelChange,
  children,
}: PlaygroundShellProps) => {
  return (
    <div className="space-y-6">
      {/* Custom controls slot */}
      {children && <div className="mb-6">{children}</div>}

      {/* Split-pane layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Prompt Editor */}
        <Card className="bg-white dark:bg-[#0A0A0A] border-gray-200 dark:border-[#1F1F1F]">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Prompt Editor
              </h3>

              {/* Model Selector */}
              <select
                value={model}
                onChange={(e) => onModelChange(e.target.value)}
                className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              >
                <option value="gpt-4o-mini">GPT-4o Mini (Fastest)</option>
                <option value="gpt-4o">GPT-4o (Balanced)</option>
                <option value="gpt-4">GPT-4 (Most Capable)</option>
              </select>
            </div>

            {/* Prompt Input */}
            <textarea
              value={promptTemplate}
              onChange={(e) => onPromptChange(e.target.value)}
              className="w-full h-96 bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none"
              placeholder="Enter your prompt here..."
            />

            {/* Execute Button */}
            <Button
              onClick={onExecute}
              disabled={isLoading || !promptTemplate.trim()}
              variant="primary"
              fullWidth
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Executing...
                </>
              ) : (
                'Run Prompt'
              )}
            </Button>
          </div>
        </Card>

        {/* Right: Output */}
        <Card className="bg-white dark:bg-[#0A0A0A] border-gray-200 dark:border-[#1F1F1F]">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Response</h3>
              {isLoading && <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />}
            </div>

            {/* Response Display */}
            <div className="min-h-[400px] max-h-[600px] overflow-y-auto">
              {isLoading && !response ? (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Generating response...
                    </p>
                  </div>
                </div>
              ) : response ? (
                <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-sans">
                  {response}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Response will appear here after execution
                  </p>
                </div>
              )}
            </div>

            {/* Usage Stats */}
            {usage && (
              <div className="pt-4 border-t border-gray-200 dark:border-[#1F1F1F]">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Total Tokens</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {usage.tokens.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Estimated Cost</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${usage.cost.toFixed(6)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
