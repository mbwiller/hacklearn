# HackLearn Pro - Design System

## Overview

Professional, engineer-focused design system with ZERO emojis. Clean, minimal aesthetic optimized for technical content consumption.

---

## Design Principles

1. **Clarity Over Decoration**: Content first, minimal visual noise
2. **Professional Tone**: Technical, not playful
3. **Consistent Spacing**: Tailwind utilities (multiples of 4px)
4. **Accessible Contrast**: WCAG AA compliant
5. **Performance**: Lightweight, no unnecessary animations

---

## Color Palette

### Background Layers
```
slate-950  #020617  - Base background
slate-900  #0f172a  - Primary surfaces
slate-800  #1e293b  - Secondary surfaces
slate-700  #334155  - Borders and dividers
```

### Text Colors
```
slate-100  #f1f5f9  - Primary text
slate-300  #cbd5e1  - Secondary text
slate-400  #94a3b8  - Muted text
slate-500  #64748b  - Disabled text
```

### Accent Colors
```
cyan-400   #22d3ee  - Primary accent (links, highlights)
cyan-500   #06b6d4  - Primary buttons
cyan-600   #0891b2  - Button hover states
```

### Status Colors
```
emerald-500  #10b981  - Success (muted)
amber-500    #f59e0b  - Warning (muted)
rose-500     #f43f5e  - Error (muted)
```

### Difficulty Badges
```
emerald-500  - Beginner
amber-500    - Intermediate
rose-500     - Advanced
```

---

## Typography

### Font Families
```css
/* Body and UI */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;

/* Code */
font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### Scale
```
text-xs    12px  - Small labels, badges
text-sm    14px  - Body text, descriptions
text-base  16px  - Default paragraph
text-lg    18px  - Subheadings
text-xl    20px  - Section headers
text-2xl   24px  - Card titles
text-3xl   30px  - Page titles
text-4xl   36px  - Hero text
```

### Weights
```
font-normal    400  - Body text
font-medium    500  - Emphasized text
font-semibold  600  - Headings
font-bold      700  - Major headings
```

---

## Spacing System

Based on Tailwind's default scale (4px base unit):

```
1   4px    - Tight spacing
2   8px    - Default gap
3   12px   - Card padding (small)
4   16px   - Card padding (default)
6   24px   - Section spacing
8   32px   - Large section spacing
12  48px   - Major section breaks
```

---

## Components

### Badge
**Purpose**: Status indicators, difficulty levels, categories

**Variants**:
- `beginner` - Green tint
- `intermediate` - Amber tint
- `advanced` - Rose tint
- `primary` - Cyan tint
- `success`, `warning`, `error` - Status colors
- `default` - Slate gray

**Usage**:
```jsx
<Badge variant="beginner">Beginner</Badge>
<Badge variant="primary">AI/ML Security</Badge>
```

**NO EMOJIS**: Use text only

---

### Button
**Purpose**: Interactive elements, CTAs

**Variants**:
- `primary` - Cyan background (main actions)
- `secondary` - Slate background
- `outline` - Transparent with border
- `ghost` - Minimal style
- `danger` - Rose background
- `success` - Emerald background

**Sizes**: `sm`, `md`, `lg`

**Usage**:
```jsx
<Button variant="primary" size="md">Submit Answer</Button>
<Button variant="outline" icon={<Icon />}>Back</Button>
```

---

### CodeBlock
**Purpose**: Syntax-highlighted code examples

**Features**:
- Line numbers (optional)
- Copy button (clean, no "Copied!" emoji)
- Language badge
- VS Code Dark theme colors

**Usage**:
```jsx
<CodeBlock
  code={sourceCode}
  language="python"
  showLineNumbers={true}
/>
```

---

### TabPanel
**Purpose**: Organize multi-section content

**Design**:
- Bottom border tab indicator
- Minimal hover states
- Icon support

**Usage**:
```jsx
<TabPanel
  tabs={[
    { label: 'Theory', icon: <BookOpen />, content: <TheoryContent /> },
    { label: 'Lab', icon: <Code />, content: <LabContent /> }
  ]}
  defaultTab={0}
/>
```

---

### ProgressBar
**Purpose**: Linear progress visualization

**Variants**: `primary`, `success`, `warning`, `error`

**Sizes**: `sm`, `md`, `lg`

**Usage**:
```jsx
<ProgressBar value={75} max={100} variant="primary" showLabel={true} />
```

---

### Card
**Purpose**: Content containers

**Variants**:
- `default` - Standard card
- `elevated` - Higher z-index appearance
- `outline` - Transparent with border
- `ghost` - Subtle background

**Padding**: `none`, `sm`, `default`, `lg`, `xl`

**Usage**:
```jsx
<Card variant="default" padding="lg" hover={true}>
  <CardContent />
</Card>
```

---

### Collapsible
**Purpose**: Expandable content sections

**Features**:
- Smooth animation
- Icon support
- Clean chevron indicator

**Usage**:
```jsx
<Collapsible title="Defense Strategies" icon={<Shield />}>
  <DefenseContent />
</Collapsible>
```

---

## Layout Patterns

### Dashboard Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

### Stats Bar
```jsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  {/* Stat cards */}
</div>
```

### Content Max Width
```jsx
<div className="max-w-4xl mx-auto">
  {/* Readable content */}
</div>
```

---

## Icon Usage

### Library: Lucide React
All icons from Lucide - NEVER use emoji characters.

### Common Icons
```
Shield      - Security concepts
Code        - Programming topics
Database    - Data-related
Lock        - Authentication
Brain       - AI/ML topics
Target      - Challenges
Trophy      - Achievements
Star        - Points
CheckCircle - Completed
XCircle     - Failed
```

### Icon Sizing
```
w-4 h-4   16px  - Small inline icons
w-5 h-5   20px  - Default size
w-6 h-6   24px  - Section headers
w-8 h-8   32px  - Large icons
```

---

## Emoji Removal Strategy

### What Was Removed
```
❌ "Level Up! 🎉"          ✅ "Level Up"
❌ "Completed! 🚀"         ✅ "Completed"
❌ "Achievement Unlocked 🏆" ✅ "Achievement Unlocked"
❌ "Points Earned! 💎"     ✅ "+100 Points"
```

### Replacement Strategy
1. Remove emoji completely if decorative
2. Replace with Lucide icon if functional
3. Use Badge component for status
4. Use clear text descriptions

---

## Professional Language Guide

### Before → After
```
"Awesome! You got it! 🎉"     →  "Correct. +100 points"
"Let's hack! 🚀"               →  "Begin Challenge"
"Oops, try again! 😅"          →  "Incorrect. Review the explanation."
"Level 5! Amazing! 🌟"         →  "Level 5"
"You're crushing it! 💪"       →  "Progress: 75%"
```

---

## Animation Guidelines

### Allowed Animations
- Subtle hover states (color transitions)
- Tab indicator slide
- Progress bar growth
- Collapsible expand/collapse

### Forbidden Animations
- ❌ Bounce effects
- ❌ Shake animations
- ❌ Confetti or celebration effects
- ❌ Pulsing elements
- ❌ Rotating badges

### Timing
```css
transition-colors    /* 150ms default */
transition-all       /* 300ms for complex state changes */
```

---

## Accessibility

### Contrast Ratios
- Text on background: 7:1 (WCAG AAA)
- Large text: 4.5:1 minimum
- Interactive elements: Clear focus states

### Focus States
```css
focus:outline-none
focus:ring-2
focus:ring-cyan-500
focus:ring-offset-2
focus:ring-offset-slate-900
```

### Keyboard Navigation
- Tab order logical
- Enter to submit
- Escape to close

---

## Code Example: Professional Concept Card

```jsx
<Card variant="default" padding="lg" hover={true} onClick={handleClick}>
  <div className="flex items-start gap-4">
    {/* Icon */}
    <div className="p-3 bg-cyan-500/10 rounded-lg">
      <Shield className="w-6 h-6 text-cyan-400" />
    </div>

    {/* Content */}
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-semibold text-slate-100">
          SQL Injection
        </h3>
        {completed && <CheckCircle className="w-5 h-5 text-emerald-400" />}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Badge variant="intermediate">Intermediate</Badge>
        <Badge variant="primary">Traditional Hacking</Badge>
      </div>

      <p className="text-sm text-slate-400 mb-3">
        Master one of the most dangerous web vulnerabilities...
      </p>

      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">150 points</span>
        <ChevronRight className="w-5 h-5 text-cyan-400" />
      </div>
    </div>
  </div>
</Card>
```

---

## Testing Checklist

- [ ] Zero emojis in entire codebase
- [ ] All text is clear and professional
- [ ] Dark theme consistent throughout
- [ ] Proper contrast ratios
- [ ] Icons from Lucide only
- [ ] No playful animations
- [ ] Achievement messages are professional
- [ ] Button labels are clear
- [ ] Code blocks render properly
- [ ] Tabs work smoothly

---

## File Structure

```
src/
└── components/
    └── ui/
        ├── Badge.jsx
        ├── Button.jsx
        ├── Card.jsx
        ├── CodeBlock.jsx
        ├── Collapsible.jsx
        ├── ProgressBar.jsx
        ├── TabPanel.jsx
        └── DESIGN_SYSTEM.md (this file)
```

---

## Version

**Design System v1.0**
Created: 2025-10-23
Status: Production Ready
Zero Emojis: Guaranteed
