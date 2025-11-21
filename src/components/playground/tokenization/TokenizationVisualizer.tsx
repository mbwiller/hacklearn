/**
 * Tokenization Deep Dive Visualizer
 * Main container component for the tokenization visualization playground
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TokenizerInput } from './components/TokenizerInput';
import { TokenDisplay } from './components/TokenDisplay';
import { BPEMergeVisualizer } from './components/BPEMergeVisualizer';
import { AttackSimulator } from './components/AttackSimulator';
import { TokenMetadataPanel } from './components/TokenMetadataPanel';
import { TheoryContent } from './content/TheoryContent';
import { useTokenization } from './hooks/useTokenization';
import { generateBPEMergeSteps } from './utils/tokenizers';
import type { TokenMetadata, TokenizerModel } from './types/tokenization';

type TabType = 'visualizer' | 'attacks' | 'theory';

export const TokenizationVisualizer = ({ embedded = false }: { embedded?: boolean }) => {
  const { text, model, result, isTokenizing, updateText, updateModel } = useTokenization();
  const [hoveredTokenMetadata, setHoveredTokenMetadata] = useState<TokenMetadata | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('visualizer');

  // Generate BPE merge steps for visualization
  const mergeSteps = text ? generateBPEMergeSteps(text) : [];

  return (
    <div className={`${embedded ? 'h-full' : 'min-h-screen'} bg-slate-950`}>
      {/* Hero Section */}
      {!embedded && (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-black border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold text-white mb-4">
                Tokenization <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Deep Dive</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl">
                Explore the hidden layer where prompt injection attacks begin. Visualize how different
                models split text into tokens and discover why this matters for AI security.
              </p>
            </motion.div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 border-b border-white/10">
            <TabButton
              active={activeTab === 'visualizer'}
              onClick={() => setActiveTab('visualizer')}
            >
              Visualizer
            </TabButton>
            <TabButton
              active={activeTab === 'attacks'}
              onClick={() => setActiveTab('attacks')}
            >
              Attack Simulator
            </TabButton>
            <TabButton
              active={activeTab === 'theory'}
              onClick={() => setActiveTab('theory')}
            >
              Theory
            </TabButton>
          </div>
        </div>

        {/* Model Selector */}
        {activeTab === 'visualizer' && (
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-400">Select Model:</label>
              <div className="flex items-center gap-2">
                <ModelButton
                  active={model === 'gpt-4'}
                  onClick={() => updateModel('gpt-4')}
                >
                  GPT-4
                </ModelButton>
                <ModelButton
                  active={model === 'llama-3'}
                  onClick={() => updateModel('llama-3')}
                >
                  Llama 3
                </ModelButton>
                <ModelButton
                  active={model === 'gemini'}
                  onClick={() => updateModel('gemini')}
                >
                  Gemini
                </ModelButton>
              </div>
              {result && (
                <div className="ml-auto text-sm text-gray-400">
                  Vocabulary: <span className="text-cyan-400 font-mono">{result.vocabulary}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'visualizer' && (
            <>
              <TokenizerInput
                value={text}
                onChange={updateText}
                isTokenizing={isTokenizing}
              />

              {result && result.tokens.length > 0 && (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <TokenDisplay
                        tokens={result.tokens}
                        onTokenHover={setHoveredTokenMetadata}
                        animateEntrance
                      />
                    </div>

                    {hoveredTokenMetadata && (
                      <div className="lg:col-span-1">
                        <TokenMetadataPanel metadata={hoveredTokenMetadata} />
                      </div>
                    )}
                  </div>

                  <BPEMergeVisualizer
                    text={text}
                    mergeSteps={mergeSteps}
                    autoPlay={false}
                  />

                  {/* Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard
                      label="Total Tokens"
                      value={result.totalTokens.toString()}
                      color="cyan"
                    />
                    <StatCard
                      label="Compression Ratio"
                      value={result.compressionRatio.toFixed(2)}
                      suffix="chars/token"
                      color="emerald"
                    />
                    <StatCard
                      label="Efficiency"
                      value={`${Math.round((text.length / result.totalTokens) * 100)}%`}
                      color="purple"
                    />
                  </div>
                </>
              )}
            </>
          )}

          {activeTab === 'attacks' && (
            <AttackSimulator
              onAttackSelect={(pattern) => {
                updateText(pattern.example);
                setActiveTab('visualizer');
              }}
            />
          )}

          {activeTab === 'theory' && <TheoryContent />}
        </div>
      </div>
    </div>
  );
};

// Helper Components

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton = ({ active, onClick, children }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 text-sm font-medium transition-all border-b-2
      ${active
        ? 'text-cyan-400 border-cyan-400'
        : 'text-gray-400 border-transparent hover:text-gray-300'
      }
    `}
  >
    {children}
  </button>
);

interface ModelButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const ModelButton = ({ active, onClick, children }: ModelButtonProps) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 rounded-lg text-sm font-medium transition-all
      ${active
        ? 'bg-cyan-500/20 text-cyan-400 border-2 border-cyan-500/50'
        : 'bg-white/5 text-gray-400 border-2 border-white/10 hover:border-white/20'
      }
    `}
  >
    {children}
  </button>
);

interface StatCardProps {
  label: string;
  value: string;
  suffix?: string;
  color: 'cyan' | 'emerald' | 'purple';
}

const StatCard = ({ label, value, suffix, color }: StatCardProps) => {
  const colorClasses = {
    cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 text-cyan-400',
    emerald: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-400',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400',
  };

  return (
    <div className={`backdrop-blur-xl bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6`}>
      <div className="text-xs text-gray-400 mb-2">{label}</div>
      <div className={`text-3xl font-bold ${colorClasses[color].split(' ')[3]}`}>
        {value}
        {suffix && <span className="text-lg ml-1">{suffix}</span>}
      </div>
    </div>
  );
};
