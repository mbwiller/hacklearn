import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, AlertCircle, AlertTriangle, XCircle, FileWarning,
  Info, TrendingUp
} from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface AttackExample {
  name: string;
  position: number; // 0-100 percentage along spectrum
  severity: number; // 0-4
  description: string;
  successRate?: string;
}

interface SeverityLevel {
  level: number;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  criteria: string[];
  examples: string[];
  icon: typeof CheckCircle;
}

export interface InjectionSpectrumVisualizerProps {
  /** Selected severity level (0-4) - highlights that section */
  selectedLevel?: number | null;
  /** Callback when user clicks a severity level */
  onLevelSelect?: (level: number) => void;
  /** Show attack examples as floating bubbles */
  showExamples?: boolean;
  /** Compact mode for smaller spaces */
  compact?: boolean;
  /** Custom attack examples to display */
  customExamples?: AttackExample[];
}

// ============================================================================
// CONSTANTS & DATA
// ============================================================================

const SEVERITY_LEVELS: SeverityLevel[] = [
  {
    level: 0,
    name: 'Benign',
    color: '#4ade80',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500',
    textColor: 'text-green-400',
    criteria: ['No safety violation', 'Minimal objective drift', 'No security impact'],
    examples: ['Persona Shifting', 'Stylistic Changes', 'Format Alterations'],
    icon: CheckCircle
  },
  {
    level: 1,
    name: 'Low',
    color: '#facc15',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-400',
    criteria: ['Noticeable objective drift', 'Non-sensitive info leakage', 'Potential IP loss'],
    examples: ['System Prompt Leakage', 'Trivial Goal Hijacking', 'IP Exposure'],
    icon: AlertCircle
  },
  {
    level: 2,
    name: 'Medium',
    color: '#fb923c',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-400',
    criteria: ['Successful filter bypass', 'Prohibited content generation', 'Reputational risk'],
    examples: ['Standard Jailbreaking', 'Generating Misinformation', 'Bypassing Filters'],
    icon: AlertTriangle
  },
  {
    level: 3,
    name: 'High',
    color: '#f87171',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500',
    textColor: 'text-red-400',
    criteria: ['Complete objective override', 'Severe safety bypass', 'User manipulation'],
    examples: ['Malicious Goal Hijacking', 'Social Engineering', 'Severe Jailbreaking'],
    icon: XCircle
  },
  {
    level: 4,
    name: 'Critical',
    color: '#b91c1c',
    bgColor: 'bg-red-900/20',
    borderColor: 'border-red-700',
    textColor: 'text-red-300',
    criteria: ['Exploitation of tools/APIs', 'Sensitive data extraction', 'Unauthorized system access'],
    examples: ['Data Exfiltration', 'Tool Abuse', 'Remote Code Execution'],
    icon: FileWarning
  }
];

const DEFAULT_ATTACK_EXAMPLES: AttackExample[] = [
  // Benign (0-15%)
  { name: 'Persona Shifting', position: 5, severity: 0, description: 'Harmless roleplay changes without security impact', successRate: 'N/A - Benign' },
  { name: 'Format Alterations', position: 12, severity: 0, description: 'Requesting different output formatting styles', successRate: 'N/A - Benign' },

  // Low (15-35%)
  { name: 'System Prompt Leakage', position: 22, severity: 1, description: 'Exposing internal system instructions', successRate: '~60%' },
  { name: 'Trivial Goal Hijacking', position: 30, severity: 1, description: 'Minor deviations from intended behavior', successRate: '~45%' },

  // Medium (35-65%)
  { name: 'Standard Jailbreaking', position: 45, severity: 2, description: 'Bypassing content filters and safety alignment', successRate: '~35%' },
  { name: 'Misinformation Generation', position: 55, severity: 2, description: 'Forcing model to output false information', successRate: '~40%' },

  // High (65-85%)
  { name: 'Malicious Goal Hijacking', position: 72, severity: 3, description: 'Complete override of intended functionality', successRate: '~25%' },
  { name: 'Social Engineering', position: 80, severity: 3, description: 'Manipulating users through AI responses', successRate: '~30%' },

  // Critical (85-100%)
  { name: 'Data Exfiltration', position: 88, severity: 4, description: 'Extracting sensitive user or system data', successRate: '~15%' },
  { name: 'Tool Abuse', position: 93, severity: 4, description: 'Unauthorized usage of connected APIs/tools', successRate: '~10%' },
  { name: 'Remote Code Execution', position: 98, severity: 4, description: 'System compromise through code execution', successRate: '~5%' }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const InjectionSpectrumVisualizer = ({
  selectedLevel = null,
  onLevelSelect,
  showExamples = true,
  compact = false,
  customExamples
}: InjectionSpectrumVisualizerProps) => {
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  const [hoveredExample, setHoveredExample] = useState<AttackExample | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const attackExamples = customExamples || DEFAULT_ATTACK_EXAMPLES;

  // Calculate gradient stops for smooth color transitions
  const gradientStops = useMemo(() => {
    return SEVERITY_LEVELS.map((level, idx) => ({
      offset: (idx / (SEVERITY_LEVELS.length - 1)) * 100,
      color: level.color
    }));
  }, []);

  const handleMarkerClick = (level: number) => {
    if (onLevelSelect) {
      onLevelSelect(selectedLevel === level ? -1 : level);
    }
  };

  const handleMarkerHover = (level: number, event: React.MouseEvent) => {
    setHoveredMarker(level);
    updateTooltipPosition(event);
  };

  const handleExampleHover = (example: AttackExample, event: React.MouseEvent) => {
    setHoveredExample(example);
    updateTooltipPosition(event);
  };

  const updateTooltipPosition = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  return (
    <div className="relative w-full">
      {/* Main Spectrum Container */}
      <div className={`relative ${compact ? 'h-32' : 'h-40'} mb-8`}>
        {/* SVG Gradient Bar */}
        <svg
          className="absolute inset-x-0 top-1/2 -translate-y-1/2"
          width="100%"
          height={compact ? "40" : "60"}
          viewBox="0 0 1000 60"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Gradient Definition */}
            <linearGradient id="severityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              {gradientStops.map((stop, idx) => (
                <stop key={idx} offset={`${stop.offset}%`} stopColor={stop.color} />
              ))}
            </linearGradient>

            {/* Glow Filter */}
            <filter id="spectrumGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main Gradient Bar */}
          <rect
            x="20"
            y="15"
            width="960"
            height={compact ? "30" : "30"}
            rx="15"
            fill="url(#severityGradient)"
            filter="url(#spectrumGlow)"
            className="drop-shadow-lg"
          />

          {/* Section Dividers (subtle) */}
          {SEVERITY_LEVELS.slice(0, -1).map((level, idx) => {
            const x = 20 + (960 / (SEVERITY_LEVELS.length - 1)) * (idx + 1);
            return (
              <line
                key={level.level}
                x1={x}
                y1="10"
                x2={x}
                y2="50"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            );
          })}
        </svg>

        {/* Interactive Markers */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-5">
          {SEVERITY_LEVELS.map((level, idx) => {
            const Icon = level.icon;
            const isSelected = selectedLevel === level.level;
            const isHovered = hoveredMarker === level.level;
            const position = (idx / (SEVERITY_LEVELS.length - 1)) * 100;

            return (
              <motion.button
                key={level.level}
                className={`relative flex flex-col items-center gap-2 cursor-pointer group`}
                style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                onClick={() => handleMarkerClick(level.level)}
                onMouseEnter={(e) => handleMarkerHover(level.level, e)}
                onMouseLeave={() => setHoveredMarker(null)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1, ease: 'easeOut' }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Icon Badge */}
                <motion.div
                  className={`relative ${compact ? 'w-10 h-10' : 'w-12 h-12'} rounded-full ${
                    isSelected ? level.bgColor : 'bg-slate-800/80'
                  } border-2 ${
                    isSelected ? level.borderColor : 'border-slate-600'
                  } flex items-center justify-center backdrop-blur-xl transition-all`}
                  animate={{
                    boxShadow: isSelected || isHovered
                      ? `0 0 20px ${level.color}80`
                      : '0 0 0px rgba(0,0,0,0)'
                  }}
                >
                  <Icon
                    className={`${compact ? 'w-5 h-5' : 'w-6 h-6'} ${
                      isSelected ? level.textColor : 'text-gray-400'
                    } transition-colors`}
                  />

                  {/* Pulse Animation on Selection */}
                  {isSelected && (
                    <motion.div
                      className={`absolute inset-0 rounded-full ${level.bgColor} border-2 ${level.borderColor}`}
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Label */}
                {!compact && (
                  <div className="text-center">
                    <p className={`text-sm font-semibold ${level.textColor} transition-colors`}>
                      {level.name}
                    </p>
                    <p className="text-xs text-gray-500">Level {level.level}</p>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Attack Example Bubbles */}
        {showExamples && (
          <div className="absolute inset-0 pointer-events-none">
            {attackExamples.map((example, idx) => {
              const severityColor = SEVERITY_LEVELS[example.severity];
              return (
                <motion.div
                  key={`${example.name}-${idx}`}
                  className={`absolute pointer-events-auto cursor-help px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-xl border transition-all ${
                    severityColor.bgColor
                  } ${severityColor.borderColor} ${severityColor.textColor}`}
                  style={{
                    left: `${example.position}%`,
                    top: compact ? '5px' : '10px',
                    transform: 'translateX(-50%)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + idx * 0.15, ease: 'easeOut' }}
                  whileHover={{ opacity: 1, scale: 1.1, y: -5 }}
                  onMouseEnter={(e) => handleExampleHover(example, e)}
                  onMouseLeave={() => setHoveredExample(null)}
                >
                  {example.name}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Tooltip for Markers */}
      <AnimatePresence>
        {hoveredMarker !== null && !hoveredExample && (
          <TooltipCard
            position={tooltipPosition}
            severity={SEVERITY_LEVELS[hoveredMarker]}
          />
        )}
      </AnimatePresence>

      {/* Tooltip for Attack Examples */}
      <AnimatePresence>
        {hoveredExample && (
          <ExampleTooltip
            position={tooltipPosition}
            example={hoveredExample}
            severity={SEVERITY_LEVELS[hoveredExample.severity]}
          />
        )}
      </AnimatePresence>

      {/* Legend */}
      {!compact && (
        <div className="flex items-center justify-center gap-6 text-sm text-gray-400 mt-4">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span>Hover markers or attack examples for details</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>Click markers to filter by severity</span>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// TOOLTIP COMPONENTS
// ============================================================================

interface TooltipCardProps {
  position: { x: number; y: number };
  severity: SeverityLevel;
}

const TooltipCard = ({ position, severity }: TooltipCardProps) => {
  const Icon = severity.icon;

  return (
    <motion.div
      className="fixed z-50 w-80 bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl shadow-black/50 p-4"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)'
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/10">
        <div className={`p-2 rounded-lg ${severity.bgColor} border ${severity.borderColor}`}>
          <Icon className={`w-5 h-5 ${severity.textColor}`} />
        </div>
        <div>
          <h4 className="font-semibold text-white">Level {severity.level}: {severity.name}</h4>
          <p className="text-xs text-gray-400">Injection Severity</p>
        </div>
      </div>

      {/* Criteria */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-gray-300 mb-2">Criteria:</p>
        <ul className="space-y-1">
          {severity.criteria.map((criterion, idx) => (
            <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
              <span className={`mt-0.5 ${severity.textColor}`}>•</span>
              <span>{criterion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Examples */}
      <div>
        <p className="text-xs font-semibold text-gray-300 mb-2">Common Attacks:</p>
        <div className="flex flex-wrap gap-2">
          {severity.examples.map((example, idx) => (
            <span
              key={idx}
              className={`text-xs px-2 py-1 rounded ${severity.bgColor} ${severity.textColor}`}
            >
              {example}
            </span>
          ))}
        </div>
      </div>

      {/* Pointer Arrow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-slate-800/95"
      />
    </motion.div>
  );
};

interface ExampleTooltipProps {
  position: { x: number; y: number };
  example: AttackExample;
  severity: SeverityLevel;
}

const ExampleTooltip = ({ position, example, severity }: ExampleTooltipProps) => {
  return (
    <motion.div
      className="fixed z-50 w-72 bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl shadow-black/50 p-4"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)'
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 text-xs font-semibold rounded ${severity.bgColor} ${severity.textColor}`}>
            {severity.name}
          </span>
          <span className="text-xs text-gray-500">Level {severity.level}</span>
        </div>
        <h4 className="font-semibold text-white">{example.name}</h4>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 mb-3">{example.description}</p>

      {/* Success Rate */}
      {example.successRate && (
        <div className={`text-xs px-3 py-2 rounded ${severity.bgColor} border ${severity.borderColor}`}>
          <span className="text-gray-400">Success Rate: </span>
          <span className={`font-semibold ${severity.textColor}`}>{example.successRate}</span>
        </div>
      )}

      {/* Pointer Arrow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-slate-800/95"
      />
    </motion.div>
  );
};
