# HackLearn Platform - Claude Code Context

## Mission Statement
Educational platform teaching ethical hacking + AI/ML security with interactive LLM playground modules. **This is a portfolio/demo piece, not an MVP - quality bar is production-ready with Langflow/n8n-level polish.**

## Critical Context
- 20 ethical hacking modules: ✅ COMPLETE (don't modify these)
- LLM Playground: 🚧 IN PROGRESS (your focus)
  - Module 111 (CoT): Currently basic, needs premium redesign
  - Modules 112-115: Will copy patterns from perfected Module 111

## Tech Stack
- **Frontend**: React 18.3.1 + Vite 7 + TypeScript 5.9 (strict mode)
- **Styling**: Tailwind CSS 3.3.2 + Framer Motion (for animations)
- **State**: React hooks (useState, useEffect, useCallback, useMemo)
- **Backend**: Express + OpenAI API (already working - don't touch)
- **Icons**: Lucide React 0.263.1

## Design System (CRITICAL - This Sets the Bar)

**Aesthetic Inspiration**: Langflow, n8n, Anthropic Claude interface

### Colors
- **Base**: Dark mode (`bg-slate-950`), Cards (`bg-slate-900`)
- **Accents**: 
  - Cyan-400 (headings, highlights)
  - Emerald-500 (CTAs, success states)
  - Purple-500 (special highlights)
- **Glassmorphism**: `backdrop-blur-xl bg-white/5 border border-white/10`
- **Shadows**: `shadow-2xl shadow-cyan-500/10`

### Typography
- Font: Inter (already loaded)
- Hierarchy: text-4xl (h1) → text-2xl (h2) → text-lg (h3) → text-base (body)
- Zero emojis (professional aesthetic)

### Animations
- Use **Framer Motion** for smooth transitions, reveals, morphs
- Tailwind animate utilities for simple hover/pulse effects
- Every interaction should feel smooth (no sudden state changes)
- GPU-accelerated transforms (prefer transform/opacity over layout changes)

### Spacing & Layout
- Generous whitespace (use space-y-8, space-y-6 between sections)
- Cards with padding-8 or padding-6
- Consistent border-radius-xl (16px)

## File Structure (What You'll Touch)
```
src/
├── components/
│   ├── ui/                         # ✅ Reuse these (Button, Card, Input)
│   ├── playground/                 # 🚧 You'll create/enhance these
│   │   ├── visualizers/           # ReasoningFlow, etc.
│   │   ├── controls/              # ParameterPanel, ModelSelector
│   │   ├── comparison/            # ComparisonView
│   │   └── index.ts               # Barrel exports
│   └── concepts/
│       └── playground/
│           └── CoTPlayground.tsx  # 🚧 Main file you're enhancing
├── hooks/
│   └── useLLMChat.ts              # ✅ Already exists, works perfectly
└── types/
    └── index.ts                   # Add new interfaces here
```

## Code Standards

### TypeScript
- **Strict mode**: Zero `any` types (use `unknown` if truly needed)
- **Interface over type**: For object shapes
- **Proper generics**: For reusable components
- **JSDoc comments**: For complex functions

### React Patterns
- **Functional components** with hooks (no classes)
- **Memoization**: Use `useMemo` for expensive computations, `useCallback` for functions passed to children
- **Error boundaries**: Wrap components that call APIs
- **Proper cleanup**: Return cleanup functions from useEffect

### Component Architecture
- **Composition over props drilling**: Use context when needed
- **Single responsibility**: Components do one thing well
- **Prop interfaces**: Always define and export
- **Default props**: Use default parameters or optional chaining

### Performance
- **Lazy load** heavy components (`React.lazy()`)
- **Code split** at route level
- **Debounce** user inputs that trigger API calls
- **Avoid inline functions** in render (use useCallback)

## Existing Infrastructure (DO NOT RECREATE)

### From `src/components/ui/`
- **Button**: variants (primary, secondary, outline, ghost), sizes (sm, md, lg)
- **Card**: variants (default, hover, glass), with proper dark mode
- **Input**: with label, error states, helper text
- **Container**: max-width wrappers for content

### From `src/hooks/`
- **useLLMChat**: Handles all OpenAI API calls, streaming, token tracking, error handling
  - Methods: `sendMessage()`, `sendStreamingMessage()`, `clearMessages()`
  - State: `messages`, `isLoading`, `error`, `usage` (tokens + cost)
  - Already perfect - just import and use

### From Backend (`server/src/`)
- **POST /api/llm/chat**: Takes model, messages, apiKey, stream
- Returns: message, usage, cost (or streams SSE)
- Rate limited, error handling done

## Anti-Patterns (NEVER DO THESE)

### UI/UX
- ❌ Basic unstyled HTML elements (always use Tailwind)
- ❌ Inline styles (except for dynamic values like transforms)
- ❌ Missing loading states (every async action needs feedback)
- ❌ Sudden layout shifts (reserve space for loading content)
- ❌ Janky animations (prefer no animation over bad animation)
- ❌ Generic spinners (use contextual loading messages)

### Code
- ❌ Recreating components from `src/components/ui/`
- ❌ Using `any` type (use proper TypeScript)
- ❌ Modifying completed ethical hacking modules (leave them alone)
- ❌ Not handling errors (every API call can fail)
- ❌ Forgetting cleanup in useEffect (memory leaks)

### Architecture
- ❌ Props drilling (use context or composition)
- ❌ Storing API keys client-side (use localStorage with encryption)
- ❌ Not memoizing expensive renders (check React DevTools Profiler)

## Success Criteria for This Work

When CoT module is done, it should be:

### Visually (10/10)
- ✅ Looks like Langflow/n8n/Anthropic quality
- ✅ Smooth animations everywhere (Framer Motion quality)
- ✅ Professional glassmorphism and shadows
- ✅ Generous whitespace, clear hierarchy

### Functionally (10/10)
- ✅ Parameter controls work (temperature, tokens, model)
- ✅ Reasoning visualization is beautiful AND informative
- ✅ Comparison view provides real insights
- ✅ All edge cases handled (errors, empty states, loading)

### Technically (10/10)
- ✅ Zero TypeScript errors (strict mode)
- ✅ Clean, reusable architecture
- ✅ Proper error boundaries
- ✅ Performance optimized (memoization, lazy loading)

### Reusability (10/10)
- ✅ Other modules (ReAct, ToT, etc.) can copy 80% of code
- ✅ Components in `playground/` are generic and composable
- ✅ Patterns established for parameter controls, visualizations, comparisons

## Development Workflow

### For Each Component You Create:
1. **Check existing** - Does this exist in `src/components/ui/`?
2. **Plan first** - Use Plan Mode to design before implementing
3. **Build incrementally** - Commit after each working piece
4. **Test thoroughly** - Browser testing + TypeScript compilation
5. **Make it reusable** - Export proper interfaces, document props

### Testing Checklist:
```bash
npm run dev        # Visual testing in browser
npm run build      # TypeScript compilation check
npm run lint       # ESLint validation
```

### Git Workflow:
```bash
# You're on: feature/cot-module-enhancement
git add .
git commit -m "[Feature] Add ReasoningFlow visualizer with Framer Motion

- Create smooth step-by-step visualization
- Implement glassmorphism card design
- Add progressive reveal animations
- Include expand/collapse interactions"

git push origin feature/cot-module-enhancement
```

## Context for This Session

**What you're building**: Premium CoT module that becomes the template for all LLM playground modules

**Why it matters**: 
- Portfolio piece for Substrate interview and future opportunities
- Sets quality standard for $1,000 credit investment
- Foundation for rapid module 2-5 development

**Quality bar**: "Holy shit, this is better than I imagined" reaction

**Aesthetic target**: Langflow/n8n visual polish + Anthropic Claude smoothness

**Budget**: ~$60-120 in credits for planning + implementation (well worth it)

---

**Remember**: Quality over speed. This is the foundation. Get it right, and everything else becomes easy.