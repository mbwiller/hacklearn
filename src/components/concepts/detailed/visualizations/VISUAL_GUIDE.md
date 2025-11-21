# InjectionSpectrumVisualizer - Visual Guide

## Component Layout

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  THE SPECTRUM OF INJECTION SEVERITY                                        │
│  ═══════════════════════════════════════                                  │
│                                                                            │
│                                                                            │
│  ╭─ Persona Shifting                 ╭─ Jailbreaking                     │
│  │  Format Alterations               │  Misinformation    ╭─ Tool Abuse   │
│  │            ╭─ System Prompt       │                    │  RCE ──╮      │
│  │            │  Leakage             │      ╭─ Social     │        │      │
│  │            │  Trivial Hijacking   │      │  Engineering│        │      │
│  │            │                      │      │             │        │      │
│  │            │                      │      │             │        │      │
│  ●────────────●──────────────────────●──────●─────────────●────────●      │
│  ╰─[Benign]   ╰─[Low]          [Medium]─╯    [High]─╯   [Critical]─╯     │
│   Level 0      Level 1          Level 2       Level 3     Level 4         │
│                                                                            │
│  ████████████████████████████████████████████████████████████████████     │
│  Green → Yellow → Orange → Red → Dark Red                                 │
│  (Gradient Bar with SVG Glow Effect)                                      │
│                                                                            │
│  ℹ️  Hover markers or attack examples for details                         │
│  📈 Click markers to filter by severity                                   │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Component States

### 1. **Default State** (No Selection)

```
All markers: Gray background, muted icons
Gradient bar: Full rainbow gradient visible
Attack bubbles: Semi-transparent (opacity: 0.9)
Tooltips: Hidden
```

Visual:
```
  ●           ●           ●           ●           ●
Benign      Low       Medium      High      Critical
  ████████████████████████████████████████████
  Green → Yellow → Orange → Red → Dark Red
```

---

### 2. **Hover State** (Marker)

```
Hovered marker: Scales to 1.2x, glowing shadow
Other markers: Remain unchanged
Tooltip: Appears above marker with full details
```

Visual:
```
                 ┌─────────────────────────┐
                 │ ⚠️  Level 2: Medium     │
                 │ Criteria:               │
                 │ • Filter bypass         │
                 │ • Prohibited content    │
                 │ • Reputational risk     │
                 │                         │
                 │ Common Attacks:         │
                 │ [Jailbreaking] [Misinf] │
                 └──────────┬──────────────┘
                            │
  ●           ●           ●           ●           ●
Benign      Low      [MEDIUM]      High      Critical
                    (1.2x scale)
                    (glowing)
```

---

### 3. **Selected State** (Marker Clicked)

```
Selected marker: Colored background, pulsing ring animation
Gradient bar: Selected section emphasized
Detailed panel: Expands below showing criteria and examples
```

Visual:
```
  ●           ●           ●           ●           ●
Benign      Low      [MEDIUM]      High      Critical
                    ╱        ╲
                   ◉ Pulsing ◉
                  Ring Animation

  ████████████████████████████████████████████
  Green → Yellow → [ORANGE] ← Highlighted → Dark Red

┌──────────────────────────────────────────────────────────────┐
│ ⚠️  Level 2: Medium                                          │
├──────────────────────────────────────────────────────────────┤
│ Criteria:                    │ Examples:                     │
│ ➤ Successful filter bypass   │ • Standard Jailbreaking       │
│ ➤ Prohibited content          │ • Generating Misinformation   │
│ ➤ Reputational risk           │ • Bypassing Filters           │
└──────────────────────────────────────────────────────────────┘
```

---

### 4. **Attack Bubble Hover**

```
Hovered bubble: Scales to 1.1x, rises 5px, full opacity
Tooltip: Appears with attack description and success rate
```

Visual:
```
         ┌─────────────────────────┐
         │ Standard Jailbreaking   │
         │ ──────────────────────  │
         │ Bypassing content       │
         │ filters and safety      │
         │ alignment               │
         │                         │
         │ Success Rate: ~35%      │
         └──────────┬──────────────┘
                    │
            [Jailbreaking]
           (1.1x scale, lifted)
```

---

## Color System

### Gradient Stops (SVG linearGradient)

```xml
<linearGradient id="severityGradient">
  <stop offset="0%"   stop-color="#4ade80" /> <!-- Green   (Benign)   -->
  <stop offset="25%"  stop-color="#facc15" /> <!-- Yellow  (Low)      -->
  <stop offset="50%"  stop-color="#fb923c" /> <!-- Orange  (Medium)   -->
  <stop offset="75%"  stop-color="#f87171" /> <!-- Red     (High)     -->
  <stop offset="100%" stop-color="#b91c1c" /> <!-- DarkRed (Critical) -->
</linearGradient>
```

### Marker Colors (Icon Badges)

| Level | Default | Selected | Hover Glow |
|-------|---------|----------|------------|
| 0 - Benign | Gray | Green bg | rgba(74, 222, 128, 0.5) |
| 1 - Low | Gray | Yellow bg | rgba(250, 204, 21, 0.5) |
| 2 - Medium | Gray | Orange bg | rgba(251, 146, 60, 0.5) |
| 3 - High | Gray | Red bg | rgba(248, 113, 113, 0.5) |
| 4 - Critical | Gray | Dark Red bg | rgba(185, 28, 28, 0.5) |

---

## Attack Example Positioning

### Position Formula
```
position = (severity_min + offset) * 100 / 4
```

### Position Map (0-100%)

```
0%                    25%                   50%                   75%                   100%
|                      |                     |                     |                      |
●─────5%──────────────●───22%───────────────●─────45%────────────●───72%───────────────●
 \                     \                     \                     \                     \
  Persona Shifting      System Prompt         Jailbreaking          Malicious Goal        Data Exfiltration
  Format Alterations    Leakage                                     Hijacking             Tool Abuse
                        Trivial Goal                                Social Engineering     RCE
                        Hijacking
```

### Attack Distribution

- **Benign (0-15%)**: 2 examples
- **Low (15-35%)**: 2 examples
- **Medium (35-65%)**: 2 examples
- **High (65-85%)**: 2 examples
- **Critical (85-100%)**: 3 examples

---

## Responsive Breakpoints

### Desktop (>1024px)
```
┌────────────────────────────────────────────────────────────────┐
│ Full width spectrum (960px gradient bar)                      │
│ All markers visible with labels                                │
│ Attack bubbles positioned absolutely                           │
│ Tooltips: 320px width, positioned dynamically                  │
└────────────────────────────────────────────────────────────────┘
```

### Tablet (768px - 1024px)
```
┌──────────────────────────────────────────────┐
│ Compressed spectrum (80% width)             │
│ Markers with abbreviated labels              │
│ Tooltips: 280px width                        │
└──────────────────────────────────────────────┘
```

### Mobile (<768px)
```
┌────────────────────────┐
│ Compact mode enabled   │
│ Gradient bar: 40px h   │
│ Icons only (no labels) │
│ Tooltips: 240px width  │
│ Touch-optimized        │
└────────────────────────┘
```

---

## Animation Timeline

### Initial Load Sequence

```
Time:     0ms       400ms      800ms      1200ms     1600ms
          │          │          │          │          │
          ▼          ▼          ▼          ▼          ▼
Gradient: [Fade in─────────────────────]
Markers:  [Stagger in────────────────────────────]
          ●          ●          ●          ●          ●
Bubbles:             [Float in──────────────────────────────]
                     ↑          ↑          ↑          ↑
```

### Hover Interaction

```
Time:     0ms       200ms
          │          │
          ▼          ▼
Scale:    1.0 ──────> 1.2
Glow:     0%  ──────> 100%
Tooltip:  opacity:0 ──> opacity:1
          y:-10px ────> y:0
```

---

## Tooltip Structure

### Marker Tooltip

```
┌─────────────────────────────────────────┐
│ ┌───┐                                   │
│ │ ⚠️ │  Level 2: Medium                │
│ └───┘  Injection Severity              │
├─────────────────────────────────────────┤
│ Criteria:                               │
│ • Successful filter bypass              │
│ • Prohibited content generation         │
│ • Reputational risk                     │
│                                         │
│ Common Attacks:                         │
│ ┌──────────────┐ ┌──────────────────┐  │
│ │Jailbreaking  │ │Misinformation    │  │
│ └──────────────┘ └──────────────────┘  │
└────────────┬────────────────────────────┘
             ▼ (pointer arrow)
```

### Attack Example Tooltip

```
┌─────────────────────────────────────┐
│ ┌────────┐                          │
│ │Medium  │ Level 2                  │
│ └────────┘                          │
│                                     │
│ Standard Jailbreaking               │
├─────────────────────────────────────┤
│ Bypassing content filters and       │
│ safety alignment through crafted    │
│ prompts that exploit model logic    │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Success Rate: ~35%              │ │
│ └─────────────────────────────────┘ │
└───────────┬─────────────────────────┘
            ▼ (pointer arrow)
```

---

## Interactive Features

### Click to Select
```
User Action:  Click marker
Component:    Update selectedLevel state
Effect:       - Marker background changes to severity color
              - Pulsing ring animation starts
              - Detailed panel expands below
              - Other markers remain gray
```

### Hover to Explore
```
User Action:  Hover marker/bubble
Component:    Show tooltip at mouse position
Effect:       - Tooltip fades in (300ms)
              - Element scales up
              - Glow effect intensifies
```

### Deselect
```
User Action:  Click selected marker again
Component:    Set selectedLevel to null
Effect:       - Marker returns to gray
              - Detailed panel collapses
              - Animations reverse
```

---

## Integration Visual Flow

### Before Integration
```
┌─────────────────────────────────────────────┐
│ THE SPECTRUM OF INJECTION SEVERITY          │
├─────────────────────────────────────────────┤
│ ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐         │
│ │ 0 │  │ 1 │  │ 2 │  │ 3 │  │ 4 │         │
│ └───┘  └───┘  └───┘  └───┘  └───┘         │
│                                             │
│ (Basic button grid - old design)           │
└─────────────────────────────────────────────┘
```

### After Integration
```
┌─────────────────────────────────────────────┐
│ THE SPECTRUM OF INJECTION SEVERITY          │
├─────────────────────────────────────────────┤
│                                             │
│  [Interactive Gradient Spectrum]            │
│  With attack bubbles, animations,           │
│  and rich tooltips                          │
│                                             │
│  ████████████████████████████████████       │
│  ●───────●───────●───────●───────●         │
│                                             │
│  (NEW: Professional visualization)          │
└─────────────────────────────────────────────┘
```

---

## Accessibility Features

### Keyboard Navigation
```
Tab        → Navigate between markers
Enter/Space → Select/deselect marker
Escape     → Close tooltip
Arrow Keys → Move between markers (planned)
```

### Screen Reader Announcements
```
"Severity level 2: Medium, Injection attack severity marker"
"Selected: Medium severity, level 2"
"Attack example: Standard Jailbreaking, success rate 35%"
```

### Focus Indicators
```
Marker focused:
  ●  →  ◉
       ╱ ╲
      Focus ring (emerald-400)
```

---

## Performance Metrics

### Bundle Impact
- Component size: ~15KB minified
- Dependencies: Framer Motion (already loaded), Lucide React (already loaded)
- Render time: <16ms (60fps)
- SVG rendering: GPU-accelerated

### Optimization Strategies
1. **useMemo**: Gradient stops (computed once)
2. **Conditional rendering**: Attack bubbles only when `showExamples={true}`
3. **Transform animations**: GPU-accelerated (no layout thrashing)
4. **Debounced hover**: 200ms delay prevents tooltip flicker
5. **SVG reuse**: Single gradient/filter definitions

---

This visualization component brings the severity taxonomy to life, making complex security concepts tangible and engaging for learners! 🚀
