# HackLearn Platform - Claude Code Context

## Mission Statement
Educational platform teaching ethical hacking + AI/ML security with interactive IDE labs. **Portfolio/demo piece with production-ready quality (Langflow/n8n-level polish).**

## Project Status (2025-11-12)

### ✅ COMPLETE: Core Platform
- **20 Ethical Hacking Modules** (IDs 1-20): All complete with theory, examples, tools, references
- **IDE Integration** (Phase 1 & 2): All 20 modules connected to interactive code editor at `/app/ide/{1-20}`
- **Lab Problems System**: 20 comprehensive labs in `src/data/lab-problems/` with starter code, test cases, hints
- **Frontend Architecture**: React 18 + Vite + TypeScript (strict mode) - fully functional
- **Backend API**: Express server with OpenAI proxy + code execution endpoints (port 3001)
- **Monaco Editor**: Professional IDE experience with Python/JavaScript/SQL support

### 🚧 IN PROGRESS: LLM Playground Modules
- **Module 111 (Chain-of-Thought)**: Premium redesign with CoT visualization, parameter controls, comparison view
- **Modules 112-115**: Will copy patterns from Module 111 (ReAct, Tree of Thoughts, etc.)

### 🎯 DEPLOYMENT PRIORITIES
Current focus areas for production readiness:
1. **Authentication**: Migrate from localStorage to proper auth system (JWT/OAuth)
2. **Database**: Move from client-side-only to persistent backend storage (PostgreSQL/MongoDB)
3. **Multi-User Support**: Transform from single-user localhost to multi-tenant application

---

## Tech Stack

### Frontend
- **Framework**: React 18.3.1 + Vite 7 + TypeScript 5.9 (strict mode)
- **Styling**: Tailwind CSS 3.3.2 + Framer Motion
- **Routing**: React Router v7
- **State**: React hooks (useState, useEffect, useCallback, useMemo)
- **Editor**: Monaco Editor 4.7.0
- **Icons**: Lucide React 0.263.1

### Backend
- **Server**: Express 4.18.2 + TypeScript
- **LLM Integration**: OpenAI SDK 4.20.0
- **Features**: Rate limiting, streaming SSE, token tracking, code execution sandbox
- **Port**: 3001 (development)

### Storage (Current - Client-Side Only)
- **Authentication**: localStorage (`hacklearn_openai_api_key`, `hacklearn_user_progress`)
- **User Data**: Client-side state management
- **⚠️ NOT SUITABLE FOR PRODUCTION**: No persistence, no multi-user support

---

## File Structure

```
src/
├── components/
│   ├── ui/                         # ✅ Reusable components (Button, Card, Input)
│   ├── ide/                        # ✅ IDE components (Monaco editor, panels)
│   ├── playground/                 # 🚧 LLM playground (CoT, ReAct, etc.)
│   └── concepts/
│       └── detailed/               # ✅ All 20 ethical hacking modules
├── data/
│   └── lab-problems/               # ✅ 20 lab problems (1-20) with test cases
├── pages/
│   ├── Dashboard.tsx              # Main dashboard with module cards
│   ├── IDEPage.tsx                # Full-screen IDE for labs
│   └── ConceptDetailPage.tsx     # Individual module detail pages
├── hooks/
│   └── useLLMChat.ts              # ✅ OpenAI API integration
├── config/
│   ├── constants.ts               # API keys, endpoints, timeouts
│   └── env.ts                     # Environment-aware config
└── types/
    └── ide.ts                     # IDE/lab problem interfaces
```

---

## Design System

**Aesthetic Inspiration**: Langflow, n8n, Anthropic Claude interface

### Colors
- **Base**: `bg-slate-950` (dark), `bg-slate-900` (cards)
- **Accents**: Cyan-400 (headings), Emerald-500 (CTAs), Purple-500 (highlights)
- **Glassmorphism**: `backdrop-blur-xl bg-white/5 border border-white/10`

### Typography
- **Font**: Inter (already loaded)
- **Hierarchy**: text-4xl (h1) → text-2xl (h2) → text-lg (h3) → text-base (body)
- **No emojis** in production code (professional aesthetic)

### Animations
- **Framer Motion** for smooth transitions
- GPU-accelerated transforms (prefer transform/opacity over layout changes)

---

## Code Standards

### TypeScript
- **Strict mode**: Zero `any` types
- **Interface over type** for object shapes
- **Proper generics** for reusable components
- **JSDoc comments** for complex functions

### React Patterns
- **Functional components** with hooks only
- **Memoization**: `useMemo` for expensive computations, `useCallback` for functions
- **Error boundaries**: Wrap API-calling components
- **Proper cleanup**: Return cleanup functions from useEffect

### Performance
- **Lazy load** heavy components (`React.lazy()`)
- **Code split** at route level
- **Debounce** user inputs that trigger API calls
- **Avoid inline functions** in render

---

## Existing Infrastructure (DO NOT RECREATE)

### Components (`src/components/ui/`)
- **Button**: Variants (primary, secondary, outline, ghost), sizes (sm, md, lg)
- **Card**: Variants (default, hover, glass) with dark mode
- **Input**: With label, error states, helper text

### Hooks (`src/hooks/`)
- **useLLMChat**: Handles OpenAI API (streaming, token tracking, error handling)
  - Methods: `sendMessage()`, `sendStreamingMessage()`, `clearMessages()`
  - State: `messages`, `isLoading`, `error`, `usage`

### Backend (`server/src/`)
- **POST /api/llm/chat**: OpenAI proxy (streaming/non-streaming)
- **POST /api/execute**: Code execution sandbox (Python/JavaScript)
- Rate limited (10 req/min), error handling included

### IDE System (`src/components/ide/`)
- **ResizableLayout**: 3-panel IDE (Problem | Editor | Hints)
- **CodeEditor**: Monaco editor with syntax highlighting
- **ProblemPanel**: Problem description, examples, constraints
- **HintsPanel**: Progressive hint system

### Lab Problems (`src/data/lab-problems/`)
- **20 complete problems** (01-prompt-injection.ts through 20-penetration-testing.ts)
- **Template**: `_TEMPLATE.ts` for creating new labs
- **Registry**: `index.ts` with `getLabProblem(id)` and `hasLabProblem(id)` helpers

---

## Recent Changes (2025-11-12)

### IDE Integration Complete ✅
**Problem**: Modules 2-20 had broken Jupyter notebook links (`/notebooks/XX.ipynb`)
**Solution**: Connected all 19 modules to IDE system with proper React Router `<Link to="/app/ide/X">`

**Files Modified** (19 concept components in `src/components/concepts/detailed/`):
- Added `import { Link } from 'react-router-dom'`
- Replaced `<a href="/notebooks/...">` with `<Link to="/app/ide/X">`
- Standardized button styling (emerald gradient)
- All modules now functional

**Result**: All 20 modules → Click "Lab" tab → "Open Interactive Lab Playground" → Loads IDE at `/app/ide/{1-20}`

### Phase 1: Design System Unification ✅
- Moved IDE components from prototype to main app (`src/components/ide/`)
- Unified color palette (HackLearn theme)
- Added Framer Motion animations
- Created lab problem template system

### Phase 2: Lab Content Creation ✅
- Created 19 new lab problems (modules 2-20)
- Each with starter code, test cases, hints, examples
- Registered in `src/data/lab-problems/index.ts`
- All TypeScript strict-mode compliant

---

## Deployment Considerations

### Current Limitations (Localhost-Only)
- ⚠️ **No Authentication**: API keys stored in localStorage (insecure)
- ⚠️ **No Database**: All user data client-side only (no persistence)
- ⚠️ **Single-User**: Not designed for multi-tenant usage
- ⚠️ **No User Accounts**: Progress tracking is local per browser

### Deployment Roadmap

#### Phase 1: Backend Database Integration
- [ ] Choose database (PostgreSQL/MongoDB recommended)
- [ ] Design schema (users, progress, achievements, lab_submissions)
- [ ] Create migration system
- [ ] Update API endpoints to persist data
- [ ] Remove localStorage dependencies

#### Phase 2: Authentication System
- [ ] Implement JWT-based auth OR OAuth (GitHub/Google)
- [ ] Secure API key storage (backend only, never client-side)
- [ ] User registration/login flow
- [ ] Session management
- [ ] Protected routes (require auth for IDE access)

#### Phase 3: Multi-User Support
- [ ] User isolation (progress, submissions)
- [ ] Leaderboards/rankings
- [ ] Admin panel for content management
- [ ] Rate limiting per user (not global)
- [ ] User profiles and settings

#### Phase 4: Production Infrastructure
- [ ] Docker production build (separate dev/prod configs)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Environment variables (.env.production)
- [ ] Monitoring and logging (Sentry/LogRocket)
- [ ] CDN for static assets

---

## Anti-Patterns (NEVER DO THESE)

### Security
- ❌ **Never commit API keys** to git
- ❌ **Never store sensitive data** in localStorage for production
- ❌ **Never trust client-side validation** alone

### Code
- ❌ Recreating components from `src/components/ui/`
- ❌ Using `any` type (use proper TypeScript)
- ❌ Modifying completed modules without careful review
- ❌ Not handling errors (every API call can fail)

### Architecture
- ❌ Props drilling (use context or composition)
- ❌ Not memoizing expensive renders
- ❌ Inline styles (use Tailwind classes)

---

## Development Workflow

### Testing Checklist
```bash
npm run dev              # Frontend dev server (port 3000)
npm run dev:backend      # Backend dev server (port 3001)
npm run build            # TypeScript compilation check
npm run lint             # ESLint validation
```

### Git Workflow
```bash
# Feature branch pattern
git checkout -b feature/descriptive-name
git add .
git commit -m "[Category] Brief description

- Bullet point changes
- Include what and why"
git push origin feature/descriptive-name
```

**Commit Categories**: `[Feature]`, `[Fix]`, `[Refactor]`, `[Docs]`, `[Test]`, `[Deploy]`

---

## Context for Current Session

**What's Working**:
- ✅ All 20 modules with IDE integration
- ✅ Full-stack architecture (React + Express)
- ✅ Professional UI/UX (Langflow/n8n quality)
- ✅ Monaco editor with code execution

**What's Next** (User Priority):
- 🎯 **Authentication**: Replace localStorage with proper auth
- 🎯 **Database**: Persistent user data and progress
- 🎯 **Multi-User**: Transform to production-ready app

**Quality Bar**: Portfolio-ready, production-quality code with systematic architecture

---

**Remember**: This is a showcase project. Every component should demonstrate professional-grade engineering, clean architecture, and attention to detail.
