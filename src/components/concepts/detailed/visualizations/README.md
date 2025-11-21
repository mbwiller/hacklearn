# InjectionSpectrumVisualizer Component

## Overview

The **InjectionSpectrumVisualizer** is an interactive React component that visually represents the severity spectrum of prompt injection attacks, ranging from benign to critical threats. This component is part of the HackLearn platform's Module 1 "Prompt Injection Attacks" educational content.

## Features

### 🎨 Visual Design
- **Horizontal Gradient Bar**: Smooth color transition from green (benign) → yellow (low) → orange (medium) → red (high) → dark red (critical)
- **SVG-Based Rendering**: High-quality scalable graphics with glow effects
- **Interactive Markers**: 5 clickable severity level markers with animated icons
- **Attack Example Bubbles**: Floating labels showing real-world attack examples positioned along the spectrum
- **Glassmorphism UI**: Professional backdrop blur and transparency effects matching HackLearn's design system

### ⚡ Interactions
- **Click Markers**: Select a severity level to view detailed information
- **Hover Tooltips**: Rich tooltips showing criteria, examples, and success rates
- **Smooth Animations**: Framer Motion powered entrance, hover, and selection animations
- **Responsive Design**: Adapts to desktop, tablet, and mobile viewports
- **Keyboard Accessible**: Full keyboard navigation support

### 📊 Data Visualization
- **5 Severity Levels**: Benign (0) → Low (1) → Medium (2) → High (3) → Critical (4)
- **11 Attack Examples**: Positioned based on taxonomy research
- **Success Rates**: Displays attack success percentages
- **Criteria Mapping**: Shows evaluation criteria for each severity level

---

## Usage

### Basic Implementation

```tsx
import { InjectionSpectrumVisualizer } from './visualizations/InjectionSpectrumVisualizer';

function MyComponent() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  return (
    <InjectionSpectrumVisualizer
      selectedLevel={selectedLevel}
      onLevelSelect={(level) => setSelectedLevel(level === -1 ? null : level)}
      showExamples={true}
    />
  );
}
```

### Props API

```typescript
interface InjectionSpectrumVisualizerProps {
  /** Selected severity level (0-4) - highlights that section */
  selectedLevel?: number | null;

  /** Callback when user clicks a severity level */
  onLevelSelect?: (level: number) => void;

  /** Show attack examples as floating bubbles */
  showExamples?: boolean;

  /** Compact mode for smaller spaces */
  compact?: boolean;

  /** Custom attack examples to display */
  customExamples?: Array<{
    name: string;
    position: number; // 0-100 percentage
    severity: number; // 0-4
    description: string;
    successRate?: string;
  }>;
}
```

### Compact Mode

For smaller spaces or embedded contexts:

```tsx
<InjectionSpectrumVisualizer
  compact={true}
  showExamples={false}
  selectedLevel={selectedLevel}
  onLevelSelect={setSelectedLevel}
/>
```

### Custom Attack Examples

Override default examples with your own data:

```tsx
const customAttacks = [
  {
    name: 'Custom Attack 1',
    position: 25,
    severity: 1,
    description: 'A low-severity custom attack',
    successRate: '50%'
  },
  // ... more examples
];

<InjectionSpectrumVisualizer
  customExamples={customAttacks}
  showExamples={true}
/>
```

---

## Data Structure

### Severity Levels

```typescript
const SEVERITY_LEVELS = [
  {
    level: 0,
    name: 'Benign',
    color: '#4ade80',
    criteria: ['No safety violation', 'Minimal objective drift', 'No security impact'],
    examples: ['Persona Shifting', 'Stylistic Changes', 'Format Alterations'],
    icon: CheckCircle
  },
  // ... 4 more levels
];
```

### Attack Examples

```typescript
const DEFAULT_ATTACK_EXAMPLES = [
  // Benign (0-15%)
  { name: 'Persona Shifting', position: 5, severity: 0, description: '...', successRate: 'N/A - Benign' },

  // Low (15-35%)
  { name: 'System Prompt Leakage', position: 22, severity: 1, description: '...', successRate: '~60%' },

  // Medium (35-65%)
  { name: 'Standard Jailbreaking', position: 45, severity: 2, description: '...', successRate: '~35%' },

  // High (65-85%)
  { name: 'Malicious Goal Hijacking', position: 72, severity: 3, description: '...', successRate: '~25%' },

  // Critical (85-100%)
  { name: 'Data Exfiltration', position: 88, severity: 4, description: '...', successRate: '~15%' },
  // ... 11 total examples
];
```

---

## Integration Example (AdvancedTaxonomies.tsx)

```tsx
import { InjectionSpectrumVisualizer } from './visualizations/InjectionSpectrumVisualizer';

export const AdvancedTaxonomiesSection = () => {
  const [selectedSeverity, setSelectedSeverity] = useState<number | null>(null);

  return (
    <section>
      <h3>The Spectrum of Injection Severity</h3>

      {/* Interactive Spectrum Visualizer */}
      <InjectionSpectrumVisualizer
        selectedLevel={selectedSeverity}
        onLevelSelect={(level) => setSelectedSeverity(level === -1 ? null : level)}
        showExamples={true}
      />

      {/* Detailed Breakdown (shown when level is selected) */}
      {selectedSeverity !== null && (
        <div className="mt-6">
          {/* Criteria and examples for selected level */}
        </div>
      )}
    </section>
  );
};
```

---

## Animation Details

### Framer Motion Animations

1. **Initial Load**
   - Gradient bar: `opacity: 0 → 1` (0.6s)
   - Markers: `scale: 0 → 1` (staggered 0.1s delay)
   - Attack bubbles: `y: 20 → 0` (staggered 0.15s delay)

2. **Hover States**
   - Markers: `scale: 1.0 → 1.2` (0.2s ease-out)
   - Attack bubbles: `scale: 1.0 → 1.1`, `y: 0 → -5` (0.2s)
   - Glow effect: `boxShadow` transition

3. **Selection State**
   - Pulsing ring animation (1.5s infinite)
   - Focus ring with emerald accent

### SVG Filters

```xml
<!-- Glow Effect -->
<filter id="spectrumGlow">
  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
  <feMerge>
    <feMergeNode in="coloredBlur" />
    <feMergeNode in="SourceGraphic" />
  </feMerge>
</filter>
```

---

## Responsive Design

### Desktop (>1024px)
- Full-width gradient bar (960px viewBox)
- All markers with labels visible
- Attack example bubbles positioned absolutely

### Tablet (768px - 1024px)
- Compressed markers with abbreviated labels
- Tooltip on hover for full details

### Mobile (<768px)
- Compact mode automatically enabled
- Vertical stacked layout option
- Touch-optimized interactions

---

## Color Palette

### Severity Colors
```css
Benign:   #4ade80 (green-400)
Low:      #facc15 (yellow-400)
Medium:   #fb923c (orange-400)
High:     #f87171 (red-400)
Critical: #b91c1c (red-700)
```

### Glassmorphism
```css
Background: bg-slate-800/95
Backdrop:   backdrop-blur-xl
Border:     border-white/20
Shadow:     shadow-2xl shadow-black/50
```

---

## Accessibility

- ✅ ARIA labels on interactive markers
- ✅ Keyboard navigation support
- ✅ Focus indicators with visible outlines
- ✅ High contrast color ratios (WCAG AA compliant)
- ✅ Screen reader friendly tooltips
- ✅ Semantic HTML structure

---

## Performance

### Optimizations
1. **useMemo**: Gradient stops calculation
2. **Debouncing**: Tooltip hover state (200ms)
3. **GPU Acceleration**: Transform/opacity animations
4. **SVG Optimization**: Reusable gradient/filter definitions
5. **Conditional Rendering**: Attack bubbles only when `showExamples={true}`

### Bundle Size
- Component: ~15KB (minified)
- Dependencies: Framer Motion, Lucide React (already in project)

---

## Future Enhancements

### Phase 2 Features
- [ ] **Interactive Slider**: Draggable handle to explore severity ranges
- [ ] **Comparison Mode**: Side-by-side Direct vs Indirect injection
- [ ] **Animation Showcase**: "Play" button for attack escalation timeline
- [ ] **Data Integration**: Real-time attack statistics from backend
- [ ] **Educational Overlays**: Embedded mini-lessons per severity level
- [ ] **Export Feature**: Download spectrum as PNG/SVG

---

## Credits

**Design Pattern References:**
- AttentionSpotlight.tsx (heatmap color interpolation)
- InfluenceHorizon.tsx (severity-based color coding)
- SemanticTugOfWar.tsx (SVG-based threat visualization)
- ReasoningFlow.tsx (step cards with category colors)

**Research Sources:**
- OWASP LLM Top 10 (LLM01: Prompt Injection)
- "Control Illusion" Study (2025) - Instruction Hierarchy Failures
- "TopicAttack" Research - Indirect Injection Success Rates
- Anthropic GTG-1002 Campaign Analysis

**Developer:** Claude Code (2025)
**Platform:** HackLearn - Ethical Hacking + AI/ML Security Education
**Module:** 1 - Prompt Injection Attacks
**Section:** Advanced Taxonomies and Nuance

---

## License

Part of the HackLearn educational platform. For educational use only.
