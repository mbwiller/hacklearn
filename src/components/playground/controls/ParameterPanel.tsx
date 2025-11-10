import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Info, RotateCcw } from 'lucide-react';

/** LLM generation parameters */
export interface GenerationParams {
  temperature: number;
  maxTokens: number;
  topP: number;
  systemPrompt: string;
}

/** Available model options */
export type ModelOption = 'gpt-3.5-turbo' | 'gpt-4o-mini' | 'gpt-4o' | 'gpt-4';

/** Parameter panel props */
export interface ParameterPanelProps {
  /** Current model selection */
  model: ModelOption;
  /** Generation parameters */
  parameters: GenerationParams;
  /** Callback when parameters change */
  onParametersChange: (params: Partial<GenerationParams>) => void;
  /** Callback when model changes */
  onModelChange: (model: ModelOption) => void;
  /** Panel visibility */
  isOpen: boolean;
  /** Close panel callback */
  onClose: () => void;
}

/** Model pricing information (per 1M tokens) */
const MODEL_PRICING = {
  'gpt-3.5-turbo': { input: 0.50, output: 1.50, speed: 'Very Fast' },
  'gpt-4o-mini': { input: 0.15, output: 0.60, speed: 'Fastest' },
  'gpt-4o': { input: 2.50, output: 10.00, speed: 'Fast' },
  'gpt-4': { input: 30.00, output: 60.00, speed: 'Moderate' },
} as const;

/** Preset configurations */
const PRESETS = {
  deterministic: {
    name: 'Deterministic',
    description: 'Precise and consistent reasoning',
    temperature: 0.0,
    maxTokens: 1000,
    topP: 0.1,
    systemPrompt: 'You are a precise reasoning assistant. Provide step-by-step logical analysis with consistent outputs.',
  },
  balanced: {
    name: 'Balanced',
    description: 'Good mix of consistency and creativity',
    temperature: 0.7,
    maxTokens: 2000,
    topP: 1.0,
    systemPrompt: 'You are a helpful reasoning assistant. Think step by step and provide clear explanations.',
  },
  creative: {
    name: 'Creative',
    description: 'Explore diverse reasoning paths',
    temperature: 1.2,
    maxTokens: 2500,
    topP: 0.9,
    systemPrompt: 'You are a creative problem-solver. Explore multiple reasoning approaches and provide diverse perspectives.',
  },
  costOptimized: {
    name: 'Cost Optimized',
    description: 'Minimize token usage and cost',
    temperature: 0.5,
    maxTokens: 500,
    topP: 0.95,
    systemPrompt: 'You are a concise reasoning assistant. Be brief but thorough in your explanations.',
  },
} as const;

/** Info tooltip component */
const InfoTooltip = ({ content }: { content: string }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="p-0.5 hover:bg-white/10 rounded transition-colors"
        aria-label="Information"
      >
        <Info className="w-3.5 h-3.5 text-gray-400" />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 backdrop-blur-xl bg-slate-800/95 border border-white/10 rounded-lg shadow-xl text-xs text-gray-300 leading-relaxed"
          >
            {content}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-2 h-2 rotate-45 bg-slate-800 border-r border-b border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/** Custom slider component */
interface SliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  label: string;
  tooltip?: string;
  formatter?: (value: number) => string;
}

const Slider = ({ value, min, max, step, onChange, label, tooltip, formatter }: SliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const displayValue = formatter ? formatter(value) : value.toFixed(2);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
          {label}
          {tooltip && <InfoTooltip content={tooltip} />}
        </label>
        <span className="text-sm font-semibold text-cyan-400">
          {displayValue}
        </span>
      </div>

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, rgb(34 211 238) 0%, rgb(34 211 238) ${percentage}%, rgb(51 65 85) ${percentage}%, rgb(51 65 85) 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1.5">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};

/** Parameter panel component */
export const ParameterPanel = ({
  model,
  parameters,
  onParametersChange,
  onModelChange,
  isOpen,
  onClose,
}: ParameterPanelProps) => {
  const [localParams, setLocalParams] = useState(parameters);
  const [estimatedCost, setEstimatedCost] = useState(0);

  // Sync local state with props
  useEffect(() => {
    setLocalParams(parameters);
  }, [parameters]);

  // Calculate estimated cost
  const calculateCost = useCallback((selectedModel: ModelOption, tokens: number): number => {
    const pricing = MODEL_PRICING[selectedModel];
    // Assume 50/50 split for estimation
    const avgPrice = (pricing.input + pricing.output) / 2;
    return (tokens / 1_000_000) * avgPrice;
  }, []);

  // Update cost estimate
  useEffect(() => {
    const cost = calculateCost(model, localParams.maxTokens);
    setEstimatedCost(cost);
  }, [model, localParams.maxTokens, calculateCost]);

  // Debounced parameter update
  const updateParameter = useCallback((key: keyof GenerationParams, value: any) => {
    const newParams = { ...localParams, [key]: value };
    setLocalParams(newParams);

    // Immediately propagate to parent
    onParametersChange({ [key]: value });
  }, [localParams, onParametersChange]);

  // Apply preset
  const applyPreset = useCallback((presetKey: keyof typeof PRESETS) => {
    const preset = PRESETS[presetKey];
    const newParams = {
      temperature: preset.temperature,
      maxTokens: preset.maxTokens,
      topP: preset.topP,
      systemPrompt: preset.systemPrompt,
    };

    setLocalParams(newParams);
    onParametersChange(newParams);
  }, [onParametersChange]);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    applyPreset('balanced');
  }, [applyPreset]);

  // Cost color based on value
  const getCostColor = (cost: number) => {
    if (cost < 0.01) return 'text-emerald-400';
    if (cost < 0.10) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-slate-900 border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Parameters</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Model Configuration */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Model Configuration
                </h3>
                <select
                  value={model}
                  onChange={(e) => onModelChange(e.target.value as ModelOption)}
                  className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                >
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="gpt-4o-mini">GPT-4o Mini</option>
                  <option value="gpt-4o">GPT-4o</option>
                  <option value="gpt-4">GPT-4</option>
                </select>
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span>{MODEL_PRICING[model].speed}</span>
                  <span>${MODEL_PRICING[model].input.toFixed(2)}/1M input • ${MODEL_PRICING[model].output.toFixed(2)}/1M output</span>
                </div>
              </div>

              {/* Generation Parameters */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Generation Parameters
                </h3>

                {/* Temperature */}
                <Slider
                  label="Temperature"
                  value={localParams.temperature}
                  min={0}
                  max={2}
                  step={0.1}
                  onChange={(val) => updateParameter('temperature', val)}
                  tooltip="Controls randomness. Lower = more deterministic and focused. Higher = more creative and diverse."
                />
                <p className="text-xs text-gray-500 px-1">
                  {localParams.temperature < 0.3 ? '← More deterministic' :
                   localParams.temperature > 1.5 ? 'More creative →' :
                   '← Balanced →'}
                </p>

                {/* Max Tokens */}
                <Slider
                  label="Max Tokens"
                  value={localParams.maxTokens}
                  min={100}
                  max={4000}
                  step={100}
                  onChange={(val) => updateParameter('maxTokens', val)}
                  formatter={(val) => val.toString()}
                  tooltip="Maximum length of response. Higher = longer answers but more cost. 1 token ≈ 0.75 words."
                />
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="text-gray-500">Est. cost</span>
                  <span className={`font-semibold ${getCostColor(estimatedCost)}`}>
                    ${estimatedCost.toFixed(4)}
                  </span>
                </div>

                {/* Top P */}
                <Slider
                  label="Top P"
                  value={localParams.topP}
                  min={0}
                  max={1}
                  step={0.05}
                  onChange={(val) => updateParameter('topP', val)}
                  tooltip="Nucleus sampling. Controls diversity. 1.0 = consider all options, 0.1 = only most likely tokens."
                />
              </div>

              {/* System Prompt */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  System Prompt
                  <InfoTooltip content="Instructions that guide the model's behavior and response style. This is prepended to every request." />
                </label>
                <textarea
                  value={localParams.systemPrompt}
                  onChange={(e) => updateParameter('systemPrompt', e.target.value)}
                  rows={4}
                  className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm resize-none"
                  placeholder="Enter system prompt..."
                />
              </div>

              {/* Quick Presets */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Quick Presets
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(PRESETS).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => applyPreset(key as keyof typeof PRESETS)}
                      className="group relative p-3 bg-gradient-to-br from-white/5 to-white/[0.02] hover:from-cyan-500/10 hover:to-cyan-600/5 border border-white/10 hover:border-cyan-500/30 rounded-lg transition-all text-left"
                    >
                      <div className="text-sm font-semibold text-gray-300 group-hover:text-cyan-400 transition-colors mb-1">
                        {preset.name}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-2">
                        {preset.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetToDefaults}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-lg transition-all text-gray-300 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Defaults
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
