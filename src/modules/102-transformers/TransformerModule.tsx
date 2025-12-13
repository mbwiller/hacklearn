import { Suspense, lazy, Component, type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import 'katex/dist/katex.min.css';
import './styles/transformer.css';

// Import layout components
import { ProgressBar } from './components/layout/ProgressBar';
import { NavigationDots } from './components/layout/NavigationDots';

// Import hooks and data
import { useActiveSection } from './hooks/useActiveSection';
import { SECTION_IDS } from './data/constants';

// Import sections 1-11 directly
import { HeroSection } from './components/sections/HeroSection';
import { SequentialBottleneckSection } from './components/sections/SequentialBottleneckSection';
import { AttentionParadigmSection } from './components/sections/AttentionParadigmSection';
import { QueryKeyValueSection } from './components/sections/QueryKeyValueSection';
import { ScalingSection } from './components/sections/ScalingSection';
import { MultiHeadSection } from './components/sections/MultiHeadSection';
import { PositionalEncodingSection } from './components/sections/PositionalEncodingSection';
import { EncoderSection } from './components/sections/EncoderSection';
import { DecoderSection } from './components/sections/DecoderSection';
import { FullArchitectureSection } from './components/sections/FullArchitectureSection';
import { ResultsSection } from './components/sections/ResultsSection';

// Lazy load Section 12 (3D) to avoid bundle size issues
const LivingArchitectureSection = lazy(() =>
  import('./components/sections/LivingArchitectureSection').then(module => ({
    default: module.LivingArchitectureSection
  }))
);

// Error Boundary for Section 12
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class Section12ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface TransformerModuleProps {
  onBack?: () => void;
}

export function TransformerModule({ onBack }: TransformerModuleProps) {
  const { activeSection, progress, scrollToSection } = useActiveSection([...SECTION_IDS]);

  return (
    <div className="transformer-module min-h-screen bg-slate-950">
      {/* Back button */}
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2
                     bg-slate-800/90 backdrop-blur-sm rounded-lg border border-slate-700
                     text-slate-200 hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Prompt Engineering
        </button>
      )}

      {/* Progress bar */}
      <ProgressBar progress={progress} />

      {/* Navigation dots */}
      <NavigationDots
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main content */}
      <main>
        <HeroSection />
        <SequentialBottleneckSection />
        <AttentionParadigmSection />
        <QueryKeyValueSection />
        <ScalingSection />
        <MultiHeadSection />
        <PositionalEncodingSection />
        <EncoderSection />
        <DecoderSection />
        <FullArchitectureSection />
        <ResultsSection />

        {/* Section 12 with error boundary */}
        <Section12ErrorBoundary
          fallback={
            <section className="min-h-screen flex items-center justify-center bg-slate-900">
              <div className="text-center text-slate-400">
                <p className="text-xl mb-2">3D Visualization Unavailable</p>
                <p className="text-sm">Your browser may not support WebGL or encountered an error.</p>
              </div>
            </section>
          }
        >
          <Suspense
            fallback={
              <section className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="text-slate-400 animate-pulse">Loading 3D visualization...</div>
              </section>
            }
          >
            <LivingArchitectureSection />
          </Suspense>
        </Section12ErrorBoundary>
      </main>

      {/* SVG Defs for arrows */}
      <svg className="absolute w-0 h-0">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              className="fill-slate-400"
            />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
