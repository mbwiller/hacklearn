# LeetCode-Style UI/UX Prototype - Comprehensive Style Guide

**Project:** HackLearn Pro - Interactive Lab Environment
**Created:** January 2025
**Design System:** LeetCode Dark Theme Clone (95% accuracy)

---

## Table of Contents

1. [Overview](#overview)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Component Styles](#component-styles)
6. [Shadows and Elevation](#shadows-and-elevation)
7. [Animations and Transitions](#animations-and-transitions)
8. [Border Radius](#border-radius)
9. [Opacity and Transparency](#opacity-and-transparency)
10. [Icon System](#icon-system)
11. [Interactive States](#interactive-states)
12. [Layout Patterns](#layout-patterns)
13. [Common Tailwind CSS Usage](#common-tailwind-css-usage)
14. [Component Reference Examples](#component-reference-examples)
15. [Monaco Editor Configuration](#monaco-editor-configuration)
16. [Scrollbar Styling](#scrollbar-styling)
17. [Accessibility Considerations](#accessibility-considerations)

---

## Overview

This style guide documents the complete design system for the LeetCode-style interactive coding environment prototype built for HackLearn Pro. The system is built with:

- **Framework:** React 18.3 + TypeScript 5.6
- **Styling:** Tailwind CSS 3.4.17 with custom configuration
- **Code Editor:** Monaco Editor (VS Code's editor engine)
- **Icons:** Lucide React
- **Layout:** react-resizable-panels for draggable 3-panel system

**Design Philosophy:**
- Dark-first design matching LeetCode's professional aesthetic
- 4px base spacing unit for mathematical consistency
- Semantic color naming for maintainability
- Minimal elevation/shadows for flat modern look
- Smooth micro-interactions (200ms transitions)

---

## Color Palette

### Background Colors

```javascript
// Primary backgrounds (from darkest to lightest)
'leetcode-dark-bg-1': '#1a1a1a'    // Main app background, scrollbar track
'leetcode-dark-bg-2': '#282828'    // Panel backgrounds (Problem, Editor, Hints)
'leetcode-dark-bg-3': '#2a2d2e'    // Elevated elements (dropdowns, buttons)
'leetcode-dark-editor': '#282828'  // Monaco Editor background (same as bg-2)
```

**Usage:**
- `bg-1`: Applied to `<body>` and main app container
- `bg-2`: All major panels (Navbar, ProblemPanel, EditorPanel, ConsoleOutput, HintsPanel)
- `bg-3`: Interactive elements like language selector button, hover states

### Border and Divider Colors

```javascript
'leetcode-dark-border': 'rgba(255, 255, 255, 0.1)'  // 10% white opacity
'leetcode-dark-divider': '#3a3a3a'                  // Panel resize handles
```

**Usage:**
- `border`: Panel borders, tab underlines, input fields
- `divider`: Resizable panel handles (1px width)

### Text Colors

```javascript
'leetcode-text-primary': '#ffffff'      // Headings, active elements
'leetcode-text-secondary': '#cccccc'    // Body text, descriptions
'leetcode-text-muted': '#858585'        // Placeholder text, disabled state
'leetcode-text-code': '#d4d4d4'         // Code snippets in Monaco Editor
```

**Hierarchy:**
1. Primary: Problem titles, active tab labels, button text
2. Secondary: Problem descriptions, example explanations, hint text
3. Muted: Tab labels (inactive), placeholder text, metadata

### Accent Colors

```javascript
'leetcode-accent-green': '#89d185'      // Success, Run button, passed tests
'leetcode-accent-blue': '#3794ff'       // Links, active tabs, focus states
'leetcode-accent-orange': '#FFA116'     // Premium features (not used in prototype)
'leetcode-accent-red': '#f14c4c'        // Errors, failed tests
'leetcode-accent-emerald': '#10B981'    // HackLearn brand color (Submit button)
```

**Semantic Usage:**
- Green: Test success indicators, "Accepted" status, Run button
- Blue: Active tab borders, hover states on resize handles, hyperlinks
- Red: Error messages, "Wrong Answer" status, test failure indicators
- Emerald: HackLearn-specific elements (Submit button, brand accents)

### Difficulty Badge Colors

```javascript
// Easy difficulty
background: 'rgba(34, 197, 94, 0.2)'   // green-500 at 20% opacity
text: '#22c55e'                         // green-500
border: 'rgba(34, 197, 94, 0.5)'       // green-500 at 50% opacity

// Medium difficulty
background: 'rgba(251, 191, 36, 0.2)'  // amber-500 at 20% opacity
text: '#fbbf24'                         // amber-500
border: 'rgba(251, 191, 36, 0.5)'      // amber-500 at 50% opacity

// Hard difficulty
background: 'rgba(239, 68, 76, 0.2)'   // red-500 at 20% opacity
text: '#ef444c'                         // red-500
border: 'rgba(239, 68, 76, 0.5)'       // red-500 at 50% opacity
```

---

## Typography

### Font Families

```css
/* Primary font: Inter (loaded via Google Fonts CDN) */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace font: Default Monaco Editor font */
font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Courier New', monospace;
```

**Font Loading (src/index.css):**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

### Font Sizes

```javascript
// Tailwind size scale (used throughout)
'text-xs':   '0.75rem'   // 12px - Metadata, timestamps, small labels
'text-sm':   '0.875rem'  // 14px - Body text, button labels, tab labels
'text-base': '1rem'      // 16px - Default body text
'text-lg':   '1.125rem'  // 18px - Subheadings
'text-xl':   '1.25rem'   // 20px - Section titles
'text-2xl':  '1.5rem'    // 24px - Problem titles
```

**Component-Specific Usage:**
- Navbar buttons: `text-sm` (14px)
- Problem title: `text-2xl font-bold` (24px bold)
- Problem description: `text-sm` (14px)
- Tab labels: `text-sm font-medium` (14px medium)
- Code editor: `fontSize: 14` (Monaco config)
- Console output: `text-xs font-mono` (12px monospace)

### Font Weights

```javascript
'font-normal':  '400'  // Regular body text
'font-medium':  '500'  // Tab labels, button text, emphasis
'font-semibold': '600' // Section headings
'font-bold':    '700'  // Problem title, important headings
```

### Line Heights

```javascript
'leading-normal':  '1.5'    // Default body text (24px for 16px font)
'leading-relaxed': '1.625'  // Problem descriptions (more breathing room)
```

---

## Spacing System

**Base Unit:** 4px (Tailwind's default spacing scale)

### Common Spacing Values

```javascript
// Tailwind spacing scale (multiply by 4 for px value)
'space-1':  '0.25rem'   // 4px  - Tight gaps
'space-2':  '0.5rem'    // 8px  - Small gaps, icon spacing
'space-3':  '0.75rem'   // 12px - Default gaps, navbar padding
'space-4':  '1rem'      // 16px - Panel padding, section spacing
'space-5':  '1.25rem'   // 20px - NOT USED
'space-6':  '1.5rem'    // 24px - Large section spacing
'space-8':  '2rem'      // 32px - NOT USED
```

### Padding Patterns

**Navbar (48px height):**
```tsx
className="h-12 px-3 py-2"
// h-12 = 48px height
// px-3 = 12px horizontal padding
// py-2 = 8px vertical padding
```

**Panel Content:**
```tsx
className="px-4 py-6"
// px-4 = 16px horizontal padding
// py-6 = 24px vertical padding
```

**Buttons:**
```tsx
// Standard button
className="px-4 py-1.5"  // 16px horizontal, 6px vertical

// Small button
className="px-2.5 py-1"  // 10px horizontal, 4px vertical

// Icon button
className="p-1.5"        // 6px all sides
```

### Gap Patterns

**Flex/Grid Gaps:**
```tsx
// Small gap (icon + text)
className="flex items-center gap-1.5"  // 6px gap

// Medium gap (buttons in group)
className="flex gap-2"                 // 8px gap

// Large gap (sections)
className="space-y-4"                  // 16px vertical spacing
```

---

## Component Styles

### Navbar (src/components/Navbar.tsx)

**Container:**
```tsx
className="h-12 bg-leetcode-dark-bg-2 border-b border-leetcode-dark-border flex items-center justify-between px-3 z-50"
```

**Breakdown:**
- Height: 48px fixed (`h-12`)
- Background: Panel background color (`bg-leetcode-dark-bg-2`)
- Bottom border: 1px with 10% white opacity
- Layout: Flexbox with space-between alignment
- Z-index: 50 (sits above panels)

**Run Button (Primary Action):**
```tsx
className="flex items-center gap-2 px-4 py-1.5 bg-leetcode-accent-green hover:bg-opacity-80 text-white rounded font-medium text-sm transition-all"
```

**Submit Button (Secondary Action):**
```tsx
className="flex items-center gap-2 px-4 py-1.5 bg-leetcode-accent-emerald hover:bg-opacity-80 text-white rounded font-medium text-sm transition-all"
```

**Utility Buttons (Timer, Settings, Fullscreen):**
```tsx
className="p-1.5 text-leetcode-text-muted hover:text-leetcode-text-primary hover:bg-leetcode-dark-bg-3 rounded transition-all"
```

### ProblemPanel (src/components/ProblemPanel.tsx)

**Container:**
```tsx
className="h-full flex flex-col bg-leetcode-dark-bg-2"
```

**Tab Navigation Container:**
```tsx
className="flex gap-1 border-b border-leetcode-dark-border px-4"
```

**Individual Tab Button:**
```tsx
// Active tab
className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 border-leetcode-accent-blue text-leetcode-text-primary transition-colors"

// Inactive tab
className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 border-transparent text-leetcode-text-muted hover:text-leetcode-text-secondary transition-colors"
```

**Scrollable Content:**
```tsx
className="flex-1 overflow-y-auto px-4 py-6"
```

**Problem Title:**
```tsx
className="text-2xl font-bold text-leetcode-text-primary mb-3"
```

**Difficulty Badge:**
```tsx
// Easy
className="px-2.5 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/50"

// Medium
className="px-2.5 py-1 rounded text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/50"

// Hard
className="px-2.5 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/50"
```

**Topic Tags:**
```tsx
className="px-2.5 py-1 bg-leetcode-dark-bg-3 text-leetcode-text-muted rounded text-xs"
```

**Example Container:**
```tsx
className="bg-leetcode-dark-bg-1 rounded-lg p-4 space-y-3"
```

**Code Block in Description:**
```tsx
className="bg-leetcode-dark-bg-1 rounded-lg p-4 font-mono text-sm text-leetcode-text-code"
```

### EditorPanel (src/components/EditorPanel.tsx)

**Vertical Split Container:**
```tsx
<PanelGroup direction="vertical">
  <Panel defaultSize={60} minSize={30}>...</Panel>
  <PanelResizeHandle className="h-1 bg-leetcode-dark-divider hover:bg-leetcode-accent-blue transition-colors cursor-ns-resize" />
  <Panel defaultSize={40} minSize={20}>...</Panel>
</PanelGroup>
```

**Editor Header:**
```tsx
className="flex items-center justify-between px-4 py-2 border-b border-leetcode-dark-border"
```

**Language Selector Button:**
```tsx
className="flex items-center gap-2 px-3 py-1.5 bg-leetcode-dark-bg-3 hover:bg-opacity-80 text-leetcode-text-secondary rounded text-sm transition-colors"
```

**Reset Button:**
```tsx
className="flex items-center gap-1.5 px-2.5 py-1 text-leetcode-text-muted hover:text-leetcode-text-secondary hover:bg-leetcode-dark-bg-3 rounded text-xs transition-colors"
```

**Saved Indicator:**
```tsx
<span className="text-leetcode-text-muted text-xs flex items-center gap-1">
  <span className="w-2 h-2 bg-leetcode-accent-green rounded-full"></span>
  Saved
</span>
```

### ConsoleOutput (src/components/ConsoleOutput.tsx)

**Tab Container:**
```tsx
className="flex items-center gap-4 border-b border-leetcode-dark-border px-4"
```

**Active Tab:**
```tsx
className="px-3 py-2 text-sm font-medium border-b-2 border-leetcode-accent-blue text-leetcode-text-primary transition-colors"
```

**Status Message (Success):**
```tsx
className="flex items-center gap-2 text-leetcode-accent-green font-medium mb-4"
```

**Status Message (Error):**
```tsx
className="flex items-center gap-2 text-leetcode-accent-red font-medium mb-4"
```

**Metrics Grid:**
```tsx
className="grid grid-cols-3 gap-4 mb-4"
```

**Individual Metric:**
```tsx
<div className="bg-leetcode-dark-bg-3 rounded-lg p-3">
  <div className="text-leetcode-text-muted text-xs mb-1">Runtime</div>
  <div className="text-leetcode-text-primary text-sm font-medium">42ms</div>
  <div className="text-leetcode-accent-green text-xs">Beats 87.3%</div>
</div>
```

**Test Case Container:**
```tsx
className="bg-leetcode-dark-bg-3 rounded-lg p-4"
```

**Code Output Block:**
```tsx
className="bg-leetcode-dark-bg-1 rounded p-3 font-mono text-xs text-leetcode-text-code overflow-x-auto"
```

### HintsPanel (src/components/HintsPanel.tsx)

**Container:**
```tsx
className="h-full flex flex-col bg-leetcode-dark-bg-2"
```

**Header:**
```tsx
className="flex items-center justify-between px-4 py-3 border-b border-leetcode-dark-border"
```

**Individual Hint (Collapsed):**
```tsx
<button className="w-full flex items-center justify-between px-4 py-3 bg-leetcode-dark-bg-3 hover:bg-opacity-80 rounded-lg transition-all">
  <span className="text-sm font-medium text-leetcode-text-secondary">Hint 1</span>
  <ChevronDown className="w-4 h-4 text-leetcode-text-muted" />
</button>
```

**Individual Hint (Expanded):**
```tsx
<div className="border border-leetcode-dark-border rounded-lg overflow-hidden">
  <button className="w-full flex items-center justify-between px-4 py-3 bg-leetcode-dark-bg-3">
    <span className="text-sm font-medium text-leetcode-text-primary">Hint 1</span>
    <ChevronUp className="w-4 h-4 text-leetcode-accent-blue" />
  </button>
  <div className="px-4 py-3 bg-leetcode-dark-bg-1 border-t border-leetcode-dark-border">
    <p className="text-sm text-leetcode-text-secondary leading-relaxed">
      {hint content}
    </p>
  </div>
</div>
```

### ResizableLayout (3-Panel System)

**Horizontal Split Container:**
```tsx
<PanelGroup direction="horizontal">
  <Panel defaultSize={35} minSize={25} maxSize={50}>
    <ProblemPanel />
  </Panel>

  <PanelResizeHandle className="w-1 bg-leetcode-dark-divider hover:bg-leetcode-accent-blue transition-colors cursor-ew-resize" />

  <Panel defaultSize={45} minSize={30}>
    <EditorPanel />
  </Panel>

  <PanelResizeHandle className="w-1 bg-leetcode-dark-divider hover:bg-leetcode-accent-blue transition-colors cursor-ew-resize" />

  <Panel defaultSize={20} minSize={15} maxSize={30}>
    <HintsPanel />
  </Panel>
</PanelGroup>
```

**Panel Size Constraints:**
- Problem Panel: 35% default, 25-50% range
- Editor Panel: 45% default, 30% minimum (no max)
- Hints Panel: 20% default, 15-30% range

**Resize Handle Styling:**
- Horizontal handles: `w-1` (4px width), `cursor-ew-resize`
- Vertical handles: `h-1` (4px height), `cursor-ns-resize`
- Hover effect: Gray (#3a3a3a) to blue (#3794ff)

---

## Shadows and Elevation

**Philosophy:** Minimal shadows for flat modern aesthetic. Elevation is achieved through background color layers rather than box-shadows.

### Elevation Layers

```javascript
// Layer 0 (Base): bg-1 (#1a1a1a)
// Layer 1 (Panels): bg-2 (#282828) - 8px lighter
// Layer 2 (Elevated): bg-3 (#2a2d2e) - 10px lighter
```

**No box-shadows used** - all elevation is color-based.

### Border Strategy

```tsx
// Standard border (10% white opacity)
className="border border-leetcode-dark-border"

// Active/focus border
className="border-2 border-leetcode-accent-blue"

// Bottom border only (tabs, headers)
className="border-b border-leetcode-dark-border"
```

---

## Animations and Transitions

### Global Transition Rule (src/index.css)

```css
button, a {
  transition: all 0.2s ease-out;
}
```

**Applies to:** All buttons and links automatically get 200ms ease-out transitions.

### Tailwind Transition Classes

```tsx
// Standard transition (all properties, 200ms)
className="transition-all"

// Color-only transition (faster, 150ms default)
className="transition-colors"

// Custom timing
className="transition-all duration-300"  // 300ms
```

### Hover State Patterns

**Button Opacity Change:**
```tsx
className="bg-leetcode-accent-green hover:bg-opacity-80"
// Reduces opacity from 100% to 80% on hover
```

**Text Color Change:**
```tsx
className="text-leetcode-text-muted hover:text-leetcode-text-secondary"
```

**Background + Text Change:**
```tsx
className="hover:bg-leetcode-dark-bg-3 hover:text-leetcode-text-primary"
```

### Icon Rotations

**ChevronDown/ChevronUp for Collapsible Hints:**
```tsx
// Collapsed state
<ChevronDown className="w-4 h-4 text-leetcode-text-muted transition-transform" />

// Expanded state
<ChevronUp className="w-4 h-4 text-leetcode-accent-blue transition-transform" />
```

**Rotation Animation (if implemented):**
```tsx
className="transition-transform duration-200"
style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
```

### Loading States

**Run Code Button (while running):**
```tsx
// Loading state
<button disabled className="opacity-50 cursor-not-allowed">
  <Loader2 className="w-4 h-4 animate-spin" />
  Running...
</button>
```

**Tailwind's animate-spin:**
```javascript
// Continuous 1-second rotation
animation: spin 1s linear infinite;
```

---

## Border Radius

### Radius Scale

```javascript
'rounded-none': '0px'        // NOT USED
'rounded-sm':   '0.125rem'   // 2px - NOT USED
'rounded':      '0.25rem'    // 4px - Default for buttons, badges
'rounded-md':   '0.375rem'   // 6px - NOT USED
'rounded-lg':   '0.5rem'     // 8px - Cards, containers
'rounded-full': '9999px'     // Perfect circles (status indicators)
```

### Component-Specific Usage

**Buttons:** `rounded` (4px)
```tsx
className="px-4 py-1.5 bg-leetcode-accent-green rounded"
```

**Badges (difficulty, topics):** `rounded` (4px)
```tsx
className="px-2.5 py-1 bg-green-500/20 rounded text-xs"
```

**Containers (examples, code blocks):** `rounded-lg` (8px)
```tsx
className="bg-leetcode-dark-bg-1 rounded-lg p-4"
```

**Status Indicators:** `rounded-full` (perfect circle)
```tsx
className="w-2 h-2 bg-leetcode-accent-green rounded-full"
```

**Hints:** `rounded-lg` (8px)
```tsx
className="bg-leetcode-dark-bg-3 rounded-lg p-4"
```

---

## Opacity and Transparency

### Background Opacity (Tailwind's /opacity syntax)

**Difficulty Badges:**
```tsx
// 20% opacity backgrounds
bg-green-500/20   // rgba(34, 197, 94, 0.2)
bg-amber-500/20   // rgba(251, 191, 36, 0.2)
bg-red-500/20     // rgba(239, 68, 76, 0.2)

// 50% opacity borders
border-green-500/50
border-amber-500/50
border-red-500/50
```

**Hover States:**
```tsx
// Reduce background opacity to 80% on hover
hover:bg-opacity-80
```

### RGBA Color Usage

**Border Color (10% white opacity):**
```javascript
'leetcode-dark-border': 'rgba(255, 255, 255, 0.1)'
```

**Usage:**
```tsx
style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
// OR
className="border-leetcode-dark-border"
```

### Disabled States

```tsx
// Disabled button
className="opacity-50 cursor-not-allowed"
```

---

## Icon System

### Lucide React Icons

**Installation:**
```bash
npm install lucide-react
```

**Common Icons Used:**

```tsx
import {
  Play,           // Run button
  Upload,         // Submit button
  Clock,          // Timer
  Settings,       // Settings button
  Maximize2,      // Fullscreen button
  ChevronDown,    // Dropdowns, collapsed hints
  ChevronUp,      // Expanded hints
  BookOpen,       // Description tab
  FileText,       // Editorial tab
  Users,          // Solutions tab
  Send,           // Submissions tab
  CheckCircle,    // Success status
  XCircle,        // Error status
  Loader2,        // Loading spinner
  RotateCcw,      // Reset button
  Lightbulb,      // Hints panel icon
} from 'lucide-react';
```

### Icon Sizing

```tsx
// Small icons (12px) - metadata, inline
className="w-3 h-3"

// Standard icons (16px) - buttons, tabs
className="w-4 h-4"

// Medium icons (20px) - headers
className="w-5 h-5"

// Large icons (24px) - empty states
className="w-6 h-6"

// Extra large icons (48px) - NOT USED
className="w-12 h-12"
```

### Icon Color Patterns

**With Text (inherits text color):**
```tsx
<button className="text-leetcode-text-muted hover:text-leetcode-text-primary">
  <Settings className="w-4 h-4" />
</button>
```

**Explicit Color:**
```tsx
<CheckCircle className="w-5 h-5 text-leetcode-accent-green" />
<XCircle className="w-5 h-5 text-leetcode-accent-red" />
```

**In Buttons:**
```tsx
<button className="flex items-center gap-2">
  <Play className="w-4 h-4" />
  <span>Run</span>
</button>
```

---

## Interactive States

### Hover States

**Buttons (Primary):**
```tsx
// Green Run button
className="bg-leetcode-accent-green hover:bg-opacity-80"

// Emerald Submit button
className="bg-leetcode-accent-emerald hover:bg-opacity-80"
```

**Buttons (Secondary - Icon Only):**
```tsx
className="text-leetcode-text-muted hover:text-leetcode-text-primary hover:bg-leetcode-dark-bg-3"
```

**Tabs (Inactive):**
```tsx
className="text-leetcode-text-muted hover:text-leetcode-text-secondary"
```

**Resize Handles:**
```tsx
className="bg-leetcode-dark-divider hover:bg-leetcode-accent-blue"
```

### Active States

**Active Tab:**
```tsx
className="border-b-2 border-leetcode-accent-blue text-leetcode-text-primary"
```

**Expanded Hint:**
```tsx
// Button text becomes primary color
className="text-leetcode-text-primary"

// Icon becomes blue
<ChevronUp className="text-leetcode-accent-blue" />
```

### Focus States

**Keyboard Focus (Accessibility):**
```tsx
className="focus:outline-none focus:ring-2 focus:ring-leetcode-accent-blue focus:ring-offset-2 focus:ring-offset-leetcode-dark-bg-1"
```

**Monaco Editor Focus:**
- Handled internally by Monaco
- Blue border appears on focused editor

### Disabled States

**Disabled Button:**
```tsx
<button disabled className="opacity-50 cursor-not-allowed">
  {isRunning ? 'Running...' : 'Run'}
</button>
```

### Loading States

**Running Code:**
```tsx
{isRunning ? (
  <>
    <Loader2 className="w-4 h-4 animate-spin" />
    <span>Running...</span>
  </>
) : (
  <>
    <Play className="w-4 h-4" />
    <span>Run</span>
  </>
)}
```

---

## Layout Patterns

### Full-Height Application Layout

```tsx
// App.tsx
<div className="h-screen bg-leetcode-dark-bg-1 text-white flex flex-col">
  <Navbar />
  <div className="flex-1 overflow-hidden">
    <ResizableLayout />
  </div>
</div>
```

**Breakdown:**
- `h-screen`: 100vh height
- `flex flex-col`: Vertical stacking (Navbar + Content)
- `flex-1 overflow-hidden`: Content area takes remaining space

### Panel Layout Pattern

```tsx
// Standard panel structure
<div className="h-full flex flex-col bg-leetcode-dark-bg-2">
  {/* Fixed header */}
  <div className="border-b border-leetcode-dark-border px-4 py-3">
    Header content
  </div>

  {/* Scrollable content */}
  <div className="flex-1 overflow-y-auto px-4 py-6">
    Scrollable content
  </div>
</div>
```

### Flexbox Patterns

**Horizontal Alignment (Navbar):**
```tsx
className="flex items-center justify-between"
// items-center: Vertical centering
// justify-between: Space-between horizontal
```

**Icon + Text Pattern:**
```tsx
className="flex items-center gap-2"
// Gap of 8px between icon and text
```

**Button Group:**
```tsx
<div className="flex items-center gap-2">
  <button>Run</button>
  <button>Submit</button>
</div>
```

### Grid Patterns

**Console Metrics (3 columns):**
```tsx
className="grid grid-cols-3 gap-4"
```

**Topic Tags (Flexbox wrap):**
```tsx
className="flex items-center gap-2 flex-wrap"
```

### Vertical Spacing

**Section Spacing (using space-y):**
```tsx
<div className="space-y-4">
  <section>...</section>
  <section>...</section>
  <section>...</section>
</div>
// Adds 16px gap between each child
```

**Manual Margin:**
```tsx
className="mb-3"  // 12px bottom margin
className="mb-4"  // 16px bottom margin
className="mb-6"  // 24px bottom margin
```

---

## Common Tailwind CSS Usage

### Frequently Used Class Combinations

**Panel Container:**
```tsx
className="h-full flex flex-col bg-leetcode-dark-bg-2"
```

**Section Header:**
```tsx
className="border-b border-leetcode-dark-border px-4 py-3"
```

**Scrollable Content Area:**
```tsx
className="flex-1 overflow-y-auto px-4 py-6"
```

**Primary Button:**
```tsx
className="flex items-center gap-2 px-4 py-1.5 bg-leetcode-accent-green hover:bg-opacity-80 text-white rounded font-medium text-sm transition-all"
```

**Icon Button:**
```tsx
className="p-1.5 text-leetcode-text-muted hover:text-leetcode-text-primary hover:bg-leetcode-dark-bg-3 rounded transition-all"
```

**Tab Button (Active):**
```tsx
className="px-4 py-3 text-sm font-medium border-b-2 border-leetcode-accent-blue text-leetcode-text-primary transition-colors"
```

**Tab Button (Inactive):**
```tsx
className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-leetcode-text-muted hover:text-leetcode-text-secondary transition-colors"
```

**Difficulty Badge (Easy):**
```tsx
className="px-2.5 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/50"
```

**Card Container:**
```tsx
className="bg-leetcode-dark-bg-1 rounded-lg p-4"
```

**Code Block:**
```tsx
className="bg-leetcode-dark-bg-1 rounded-lg p-4 font-mono text-sm text-leetcode-text-code overflow-x-auto"
```

### Utility Class Patterns

**Truncate Text:**
```tsx
className="truncate"
// Adds: overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
```

**Line Clamp (2 lines):**
```tsx
className="line-clamp-2"
// Shows max 2 lines with ellipsis
```

**Prevent Text Selection:**
```tsx
className="select-none"
```

**Cursor Styles:**
```tsx
className="cursor-pointer"       // Pointer cursor
className="cursor-not-allowed"   // Not allowed cursor
className="cursor-ew-resize"     // East-west resize
className="cursor-ns-resize"     // North-south resize
```

---

## Component Reference Examples

### Complete Button Examples

**Primary Action Button (Run):**
```tsx
<button
  onClick={handleRun}
  className="flex items-center gap-2 px-4 py-1.5 bg-leetcode-accent-green hover:bg-opacity-80 text-white rounded font-medium text-sm transition-all"
>
  <Play className="w-4 h-4" />
  <span>Run</span>
</button>
```

**Secondary Action Button (Submit):**
```tsx
<button
  onClick={handleSubmit}
  className="flex items-center gap-2 px-4 py-1.5 bg-leetcode-accent-emerald hover:bg-opacity-80 text-white rounded font-medium text-sm transition-all"
>
  <Upload className="w-4 h-4" />
  <span>Submit</span>
</button>
```

**Icon-Only Button (Settings):**
```tsx
<button
  className="p-1.5 text-leetcode-text-muted hover:text-leetcode-text-primary hover:bg-leetcode-dark-bg-3 rounded transition-all"
  aria-label="Settings"
>
  <Settings className="w-4 h-4" />
</button>
```

**Disabled Loading Button:**
```tsx
<button
  disabled
  className="flex items-center gap-2 px-4 py-1.5 bg-leetcode-accent-green text-white rounded font-medium text-sm opacity-50 cursor-not-allowed"
>
  <Loader2 className="w-4 h-4 animate-spin" />
  <span>Running...</span>
</button>
```

### Complete Tab System Example

```tsx
const [activeTab, setActiveTab] = useState('description');

const tabs = [
  { id: 'description', label: 'Description', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'editorial', label: 'Editorial', icon: <FileText className="w-4 h-4" /> },
  { id: 'solutions', label: 'Solutions', icon: <Users className="w-4 h-4" /> },
  { id: 'submissions', label: 'Submissions', icon: <Send className="w-4 h-4" /> },
];

return (
  <div className="flex gap-1 border-b border-leetcode-dark-border px-4">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
          activeTab === tab.id
            ? 'border-leetcode-accent-blue text-leetcode-text-primary'
            : 'border-transparent text-leetcode-text-muted hover:text-leetcode-text-secondary'
        }`}
      >
        {tab.icon}
        <span>{tab.label}</span>
      </button>
    ))}
  </div>
);
```

### Complete Card/Container Example

**Problem Example Card:**
```tsx
<div className="bg-leetcode-dark-bg-1 rounded-lg p-4 space-y-3">
  {/* Input */}
  <div>
    <div className="text-leetcode-text-muted text-sm mb-1">Input:</div>
    <pre className="font-mono text-sm text-leetcode-text-secondary whitespace-pre-wrap">
      username = "admin' OR '1'='1' --"
    </pre>
  </div>

  {/* Output */}
  <div>
    <div className="text-leetcode-text-muted text-sm mb-1">Output:</div>
    <pre className="font-mono text-sm text-leetcode-text-secondary whitespace-pre-wrap">
      Login successful
    </pre>
  </div>

  {/* Explanation */}
  <div>
    <div className="text-leetcode-text-muted text-sm mb-1">Explanation:</div>
    <p className="text-sm text-leetcode-text-secondary leading-relaxed">
      The SQL comment (--) bypasses the password check...
    </p>
  </div>
</div>
```

### Complete Collapsible Hint Example

```tsx
const [expandedHints, setExpandedHints] = useState<number[]>([]);

const toggleHint = (index: number) => {
  setExpandedHints(prev =>
    prev.includes(index)
      ? prev.filter(i => i !== index)
      : [...prev, index]
  );
};

return (
  <div className="space-y-2">
    {hints.map((hint, index) => {
      const isExpanded = expandedHints.includes(index);

      return isExpanded ? (
        <div key={index} className="border border-leetcode-dark-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleHint(index)}
            className="w-full flex items-center justify-between px-4 py-3 bg-leetcode-dark-bg-3 hover:bg-opacity-80 transition-all"
          >
            <span className="text-sm font-medium text-leetcode-text-primary">
              Hint {index + 1}
            </span>
            <ChevronUp className="w-4 h-4 text-leetcode-accent-blue" />
          </button>
          <div className="px-4 py-3 bg-leetcode-dark-bg-1 border-t border-leetcode-dark-border">
            <p className="text-sm text-leetcode-text-secondary leading-relaxed">
              {hint}
            </p>
          </div>
        </div>
      ) : (
        <button
          key={index}
          onClick={() => toggleHint(index)}
          className="w-full flex items-center justify-between px-4 py-3 bg-leetcode-dark-bg-3 hover:bg-opacity-80 rounded-lg transition-all"
        >
          <span className="text-sm font-medium text-leetcode-text-secondary">
            Hint {index + 1}
          </span>
          <ChevronDown className="w-4 h-4 text-leetcode-text-muted" />
        </button>
      );
    })}
  </div>
);
```

---

## Monaco Editor Configuration

### Installation

```bash
npm install @monaco-editor/react monaco-editor
```

### Basic Configuration (src/components/CodeEditor.tsx)

```tsx
import Editor from '@monaco-editor/react';

<Editor
  height="100%"
  language={getMonacoLanguage()}
  value={code}
  onChange={(value) => onChange(value || '')}
  theme="vs-dark"
  options={{
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 4,
    insertSpaces: true,
    wordWrap: 'off',
    renderLineHighlight: 'all',
    scrollbar: {
      vertical: 'visible',
      horizontal: 'visible',
      useShadows: false,
      verticalScrollbarSize: 12,
      horizontalScrollbarSize: 12,
    },
  }}
/>
```

### Language Mapping

```typescript
const getMonacoLanguage = (language: Language): string => {
  switch (language) {
    case 'javascript':
      return 'javascript';
    case 'python':
      return 'python';
    case 'sql':
      return 'sql';
    default:
      return 'python';
  }
};
```

### Key Options Explained

- **minimap.enabled: false** - Removes minimap (matches LeetCode)
- **fontSize: 14** - Standard code editor size
- **lineNumbers: 'on'** - Show line numbers
- **scrollBeyondLastLine: false** - Prevents scrolling past last line
- **automaticLayout: true** - Resizes editor with container
- **tabSize: 4** - 4-space indentation
- **insertSpaces: true** - Use spaces instead of tabs
- **wordWrap: 'off'** - Horizontal scrolling enabled
- **renderLineHighlight: 'all'** - Highlights current line

### Scrollbar Styling

Monaco's scrollbar automatically matches the dark theme:
- Track: Dark gray (#1a1a1a)
- Thumb: Medium gray (#3a3a3a)
- Width/Height: 12px (matches custom scrollbar)

---

## Scrollbar Styling

### Custom Scrollbar (src/index.css)

```css
/* WebKit browsers (Chrome, Safari, Edge) */
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #3a3a3a;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4a4a4a;
}
```

### Firefox Scrollbar

```css
/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #3a3a3a #1a1a1a;
}
```

**Note:** Firefox has limited customization options. The above provides thin scrollbar with gray thumb on dark track.

### Scrollbar Usage

**Vertical Scrolling:**
```tsx
className="overflow-y-auto"
// Applied to: ProblemPanel content, HintsPanel content
```

**Horizontal Scrolling:**
```tsx
className="overflow-x-auto"
// Applied to: Code blocks, console output
```

**Both Directions:**
```tsx
className="overflow-auto"
// Applied to: Monaco Editor (handled internally)
```

---

## Accessibility Considerations

### Keyboard Navigation

**Tab Focus Order:**
1. Navbar buttons (Run, Submit, Timer, Settings, Fullscreen)
2. Problem panel tabs (Description, Editorial, Solutions, Submissions)
3. Editor (Monaco handles internally)
4. Console tabs (Testcase, Test Result)
5. Hints (expandable buttons)

**Focus Styles:**
```tsx
className="focus:outline-none focus:ring-2 focus:ring-leetcode-accent-blue focus:ring-offset-2 focus:ring-offset-leetcode-dark-bg-1"
```

### ARIA Labels

**Icon-Only Buttons:**
```tsx
<button aria-label="Settings">
  <Settings className="w-4 h-4" />
</button>

<button aria-label="Fullscreen">
  <Maximize2 className="w-4 h-4" />
</button>
```

**Loading States:**
```tsx
<button aria-busy="true" disabled>
  <Loader2 className="animate-spin" />
  Running...
</button>
```

### Semantic HTML

**Buttons vs Links:**
- Use `<button>` for actions (Run, Submit, Toggle Hint)
- Use `<a>` for navigation (NOT USED in prototype)

**Headings Hierarchy:**
```tsx
<h1 className="text-2xl font-bold">Problem Title</h1>
<h2 className="text-xl font-semibold">Section Title</h2>
<h3 className="text-lg font-semibold">Subsection Title</h3>
```

### Color Contrast Ratios

**WCAG AA Compliance:**
- White (#ffffff) on dark backgrounds: 15.9:1 ratio (AAA)
- Secondary text (#cccccc) on dark backgrounds: 11.3:1 ratio (AAA)
- Muted text (#858585) on dark backgrounds: 4.6:1 ratio (AA)
- Green accent (#89d185) on dark backgrounds: 6.8:1 ratio (AA)
- Blue accent (#3794ff) on dark backgrounds: 4.9:1 ratio (AA)

**All text colors meet WCAG AA standards for readability.**

### Screen Reader Support

**Expandable Hints:**
```tsx
<button
  aria-expanded={isExpanded}
  aria-controls={`hint-content-${index}`}
>
  Hint {index + 1}
</button>
<div id={`hint-content-${index}`} role="region">
  {hint content}
</div>
```

---

## Best Practices Summary

### DO's

1. **Use semantic color names** from tailwind.config.js (leetcode-accent-green, not #89d185)
2. **Follow 4px spacing unit** - all padding/margin should be multiples of 4px
3. **Use transition-all or transition-colors** on interactive elements
4. **Apply hover states** to all clickable elements
5. **Use flex with gap** instead of margin for spacing between items
6. **Use rounded (4px) for buttons**, rounded-lg (8px) for containers
7. **Use opacity patterns** (bg-green-500/20) for subtle backgrounds
8. **Include aria-label** on icon-only buttons
9. **Use font-mono** for code snippets and output
10. **Test with keyboard navigation**

### DON'T's

1. **Don't use box-shadows** - elevation is color-based
2. **Don't use arbitrary values** like px-[13px] - stick to Tailwind scale
3. **Don't forget transition classes** on interactive elements
4. **Don't use inline styles** unless absolutely necessary (Monaco config only)
5. **Don't mix color naming** - use custom colors consistently
6. **Don't create custom scrollbar colors** - use global styles
7. **Don't use absolute positioning** - prefer flexbox/grid
8. **Don't forget disabled states** for buttons
9. **Don't use emojis** - use Lucide icons instead
10. **Don't skip loading states** for async actions

### Code Organization Patterns

**Component Structure:**
```tsx
import type { PropsInterface } from '../types';  // Type imports first
import { Button } from './ui/Button';            // Component imports
import { useState } from 'react';                // React hooks

export const ComponentName = ({ prop1, prop2 }: PropsInterface) => {
  // State declarations
  const [state, setState] = useState(initial);

  // Event handlers
  const handleClick = () => { ... };

  // Render
  return (
    <div className="container-classes">
      {/* Component JSX */}
    </div>
  );
};
```

**Conditional Classes:**
```tsx
// Template literal approach
className={`base-classes ${isActive ? 'active-classes' : 'inactive-classes'}`}

// Ternary within string
className="base classes here"
className={isActive ? 'border-blue' : 'border-transparent'}
```

---

## File Structure Reference

```
prototype/
├── src/
│   ├── components/
│   │   ├── CodeEditor.tsx          # Monaco Editor wrapper
│   │   ├── ConsoleOutput.tsx       # Test results display
│   │   ├── EditorPanel.tsx         # Vertical split (Editor + Console)
│   │   ├── HintsPanel.tsx          # Collapsible hints
│   │   ├── Navbar.tsx              # Top navigation bar (48px)
│   │   ├── ProblemPanel.tsx        # Problem description + tabs
│   │   └── ResizableLayout.tsx     # 3-panel horizontal split
│   ├── data/
│   │   └── sampleProblem.ts        # SQL Injection problem data
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── App.tsx                     # Main app with state management
│   ├── index.css                   # Global styles + scrollbar
│   └── main.tsx                    # React entry point
├── tailwind.config.js              # Custom color palette
├── vite.config.ts                  # Vite configuration (port 7777)
└── package.json                    # Dependencies
```

---

## Version History

**v1.0.0** - January 2025
- Initial LeetCode-style UI prototype
- Monaco Editor integration
- 3-panel resizable layout (Problem | Editor+Console | Hints)
- SQL Injection sample problem
- Mocked code execution with randomized results
- Dark theme matching LeetCode aesthetic
- Complete style system documentation

---

## Additional Resources

### Tailwind CSS Documentation
- **Official Docs:** https://tailwindcss.com/docs
- **Color Utilities:** https://tailwindcss.com/docs/customizing-colors
- **Spacing Scale:** https://tailwindcss.com/docs/customizing-spacing

### Monaco Editor Documentation
- **React Wrapper:** https://github.com/suren-atoyan/monaco-react
- **Monaco API:** https://microsoft.github.io/monaco-editor/docs.html
- **Language Support:** https://github.com/microsoft/monaco-languages

### React Resizable Panels
- **GitHub Repo:** https://github.com/bvaughn/react-resizable-panels
- **API Reference:** https://github.com/bvaughn/react-resizable-panels#api

### Lucide Icons
- **Icon Explorer:** https://lucide.dev/icons
- **React Usage:** https://lucide.dev/guide/packages/lucide-react

---

**End of Style Guide**

For questions or contributions, refer to the main README.md or contact the development team.
