import { useState, useCallback } from 'react';
import { ContextStream } from './modules/ContextStream';
import { AttentionSpotlight } from './modules/AttentionSpotlight';
import { SemanticTugOfWar } from './modules/SemanticTugOfWar';
import { InfluenceHorizon } from './modules/InfluenceHorizon';
import { TimelineScrubber } from './controls/TimelineScrubber';
import { LayerSelector } from './controls/LayerSelector';
import { InjectionSimulator } from './controls/InjectionSimulator';
import { useAttentionData } from '@/hooks/useAttentionData';
import { useContextState } from '@/hooks/useContextState';
import { useInjectionDetection } from '@/hooks/useInjectionDetection';
import type { ContextWindowVisualizerProps, InjectionSimulation, ContextToken } from '@/types/context-visualizer';

export const ContextWindowVisualizer = ({
  systemPrompt,
  userInput,
  isLive: _isLive = false, // Reserved for future live streaming feature
  config = {},
  injectionSimulation: _injectionSimulation, // Reserved for pre-configured injection
  onInjectionDetected,
  embedded = false,
}: ContextWindowVisualizerProps & { embedded?: boolean }) => {
  const [selectedLayer, setSelectedLayer] = useState(0);
  const [selectedHead, setSelectedHead] = useState(0);
  const [selectedToken, setSelectedToken] = useState<ContextToken | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [activeSimulation, setActiveSimulation] = useState<InjectionSimulation | null>(null);

  // Load attention data (mock or real)
  const { attentionMatrices, isLoading } = useAttentionData({
    numLayers: 32,
    numHeads: 32,
    sequenceLength: systemPrompt.split(' ').length + userInput.split(' ').length,
    usePositionalDecay: config.showRoPEDecay ?? true,
    attentionSinkRatio: 0.05,
    sparsityFactor: 0.8,
  });

  // Manage context state
  const { contextState, updateTimestep } = useContextState(
    systemPrompt,
    userInput,
    attentionMatrices
  );

  // Injection detection
  useInjectionDetection(contextState, onInjectionDetected);

  // Handle injection simulation
  const handleSimulate = useCallback((simulation: InjectionSimulation) => {
    setActiveSimulation(simulation);
    // In real implementation, mutate contextState to reflect attack
  }, []);

  const handleClearSimulation = useCallback(() => {
    setActiveSimulation(null);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-cyan-400 animate-pulse">Loading visualization...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      {!embedded && (
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">
            Context Window Visualizer
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Observe how LLMs manage attention across tokens, identify Heavy Hitters,
            and detect prompt injection attacks in real-time.
          </p>
        </div>
      )}

      {/* Module A: Context Stream */}
      <section>
        <h3 className="text-xl font-semibold text-cyan-400 mb-4">
          Token Influence Stream
        </h3>
        <ContextStream
          tokens={contextState.tokens}
          currentTimestep={contextState.timestep}
          onTokenHover={setSelectedToken}
          onTokenClick={setSelectedToken}
        />
      </section>

      {/* Controls Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TimelineScrubber
          currentTimestep={contextState.timestep}
          maxTimestep={contextState.tokens.length}
          isPlaying={isPlaying}
          onTimestepChange={updateTimestep}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          playbackSpeed={playbackSpeed}
          onSpeedChange={setPlaybackSpeed}
        />

        <LayerSelector
          numLayers={32}
          numHeads={32}
          selectedLayer={selectedLayer}
          selectedHead={selectedHead}
          onLayerChange={setSelectedLayer}
          onHeadChange={setSelectedHead}
        />

        <InfluenceHorizon state={contextState} />
      </div>

      {/* Module B: Attention Spotlight */}
      <section>
        <h3 className="text-xl font-semibold text-purple-400 mb-4">
          Attention Heatmap
        </h3>
        <AttentionSpotlight
          tokens={contextState.tokens}
          attentionMatrices={attentionMatrices}
          selectedLayer={selectedLayer}
          selectedHead={selectedHead}
          selectedToken={selectedToken}
          filterSinks={config.filterAttentionSinks ?? true}
        />
      </section>

      {/* Module C: Semantic Tug-of-War */}
      <section>
        <h3 className="text-xl font-semibold text-emerald-400 mb-4">
          Semantic Force Field
        </h3>
        <SemanticTugOfWar state={contextState} />
      </section>

      {/* Injection Simulator */}
      <section>
        <InjectionSimulator
          onSimulate={handleSimulate}
          isActive={activeSimulation !== null}
          onClear={handleClearSimulation}
        />
      </section>
    </div>
  );
};
