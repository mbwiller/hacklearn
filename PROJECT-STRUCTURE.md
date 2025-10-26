# HackLearn Pro - Complete Project Structure

## Root Directory

```
hacklearn/
├── src/                          # Source code
├── dist/                         # Production build output (generated)
├── node_modules/                 # Dependencies (generated)
├── public/                       # Static assets
├── .dockerignore                 # Docker ignore rules
├── .gitignore                    # Git ignore rules
├── docker-compose.yml            # Docker compose configuration
├── Dockerfile                    # Two-stage Docker build
├── eslint.config.js              # ESLint configuration
├── index.html                    # HTML entry point
├── MIGRATION-REPORT.md           # Migration documentation
├── nginx.conf                    # Nginx configuration
├── package.json                  # NPM dependencies and scripts
├── postcss.config.js             # PostCSS configuration
├── PROJECT-STRUCTURE.md          # This file
├── README-NEW.md                 # New project README
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration (root)
├── tsconfig.app.json             # TypeScript configuration (app)
├── tsconfig.node.json            # TypeScript configuration (Node tools)
└── vite.config.ts                # Vite build configuration
```

## Source Directory Structure

```
src/
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   │   ├── AchievementCard.tsx   # Achievement display component
│   │   ├── DifficultyBadge.tsx   # Difficulty level indicator
│   │   ├── ProgressBar.tsx       # Progress visualization
│   │   └── StatsCard.tsx         # Statistics card component
│   │
│   ├── concepts/                 # Concept-specific components
│   │   ├── ChallengeView.tsx     # Challenge interface and quiz
│   │   ├── ConceptCard.tsx       # Individual concept card
│   │   └── ConceptDetail.tsx     # Detailed concept view
│   │
│   └── Dashboard.tsx             # Main dashboard component
│
├── data/                         # Data and content
│   └── concepts.tsx              # All 20 learning concepts
│
├── hooks/                        # Custom React hooks
│   ├── useAchievements.ts        # Achievement logic
│   ├── useGameState.ts           # Game state management
│   └── useProgress.ts            # Progress tracking and persistence
│
├── styles/                       # Stylesheets
│   ├── codeblock.css             # Code block styling (legacy)
│   └── index.css                 # Main stylesheet (Tailwind + custom)
│
├── types/                        # TypeScript type definitions
│   └── index.ts                  # All TypeScript interfaces
│
├── App.tsx                       # Main application component
├── main.tsx                      # Application entry point
└── vite-env.d.ts                 # Vite environment types
```

## Component Hierarchy

```
App.tsx
├── Dashboard.tsx (if no concept selected)
│   ├── StatsCard.tsx (×4 - Level, Points, Completed, Achievements)
│   ├── ProgressBar.tsx
│   ├── AchievementCard.tsx (×N recent achievements)
│   └── ConceptCard.tsx (×20 concepts)
│       └── DifficultyBadge.tsx
│
├── ConceptDetail.tsx (if concept selected, not in challenge)
│   └── DifficultyBadge.tsx
│
└── ChallengeView.tsx (if in challenge mode)
```

## File Descriptions

### Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build tool configuration, path aliases, code splitting |
| `tsconfig.json` | Root TypeScript config, references app and node configs |
| `tsconfig.app.json` | TypeScript config for application code (strict mode) |
| `tsconfig.node.json` | TypeScript config for build tools |
| `tailwind.config.js` | Tailwind CSS configuration and content paths |
| `postcss.config.js` | PostCSS plugins (Tailwind, Autoprefixer) |
| `eslint.config.js` | ESLint rules for code quality |
| `package.json` | NPM dependencies and scripts |

### Source Files

| File | Lines | Purpose |
|------|-------|---------|
| `src/App.tsx` | ~100 | Main app logic, routing between views |
| `src/main.tsx` | ~10 | Application entry point, React root |
| `src/types/index.ts` | ~50 | TypeScript interfaces and types |
| `src/data/concepts.tsx` | ~600 | All 20 security concepts data |
| `src/hooks/useProgress.ts` | ~60 | Progress tracking with localStorage |
| `src/hooks/useGameState.ts` | ~35 | Game state management |
| `src/hooks/useAchievements.ts` | ~30 | Achievement detection logic |
| `src/components/Dashboard.tsx` | ~100 | Main dashboard view |
| `src/components/concepts/ConceptCard.tsx` | ~45 | Individual concept card |
| `src/components/concepts/ConceptDetail.tsx` | ~90 | Detailed concept view |
| `src/components/concepts/ChallengeView.tsx` | ~75 | Challenge/quiz interface |
| `src/components/ui/StatsCard.tsx` | ~20 | Statistics display card |
| `src/components/ui/ProgressBar.tsx` | ~20 | Progress bar component |
| `src/components/ui/DifficultyBadge.tsx` | ~20 | Difficulty indicator |
| `src/components/ui/AchievementCard.tsx` | ~15 | Achievement card |
| `src/styles/index.css` | ~40 | Global styles and Tailwind |

## TypeScript Interfaces

```typescript
// src/types/index.ts

interface Challenge {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

interface Concept {
  id: number;
  category: 'AI/ML Security' | 'Traditional Hacking';
  title: string;
  icon: ReactNode;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  points: number;
  description: string;
  realWorldExample: string;
  keyTakeaways: string[];
  challenge: Challenge;
  defenses: string[];
}

interface Progress {
  [conceptId: number]: boolean;
}

interface ChallengeResult {
  success: boolean;
  message: string;
}

interface GameState {
  currentConcept: number | null;
  progress: Progress;
  points: number;
  level: number;
  achievements: string[];
  showChallenge: boolean;
  challengeAnswer: string;
  challengeResult: ChallengeResult | null;
}
```

## Data Flow

```
User Interaction
      ↓
App.tsx (main logic)
      ↓
Custom Hooks (useProgress, useGameState, useAchievements)
      ↓
LocalStorage ←→ State Management
      ↓
Component Rendering (Dashboard, ConceptDetail, ChallengeView)
      ↓
UI Components (StatsCard, ProgressBar, etc.)
```

## Build Output Structure

```
dist/
├── index.html                    # Entry HTML (0.67 kB)
└── assets/
    ├── index-[hash].css          # Compiled styles (15.08 kB)
    ├── index-[hash].js           # App bundle (37.21 kB)
    ├── lucide-[hash].js          # Lucide icons (4.27 kB)
    └── react-vendor-[hash].js    # React vendor bundle (141.61 kB)
```

## Development vs Production

### Development Mode
- Uses Vite dev server on port 3000
- Hot Module Replacement (HMR)
- Source maps enabled
- Fast refresh for instant updates
- TypeScript type checking

### Production Mode
- Optimized bundles with code splitting
- Minified JavaScript and CSS
- Tree shaking for smaller bundles
- Gzip compression (nginx)
- Asset caching (1 year for immutable)
- No source maps

## Path Aliases

Configured in `vite.config.ts` and `tsconfig.app.json`:

```typescript
'@' → './src'
'@components' → './src/components'
'@data' → './src/data'
'@hooks' → './src/hooks'
'@types' → './src/types'
'@styles' → './src/styles'
```

Usage example:
```typescript
import { concepts } from '@data/concepts';
import { useProgress } from '@hooks/useProgress';
import type { Concept } from '@types';
```

## NPM Scripts

```json
{
  "dev": "vite",                    // Start dev server
  "build": "tsc -b && vite build",  // Type check + build
  "lint": "eslint .",               // Lint code
  "preview": "vite preview"         // Preview production build
}
```

## Docker Architecture

```
Dockerfile (Multi-stage)
├── Stage 1: Builder (node:18-alpine)
│   ├── Copy package.json
│   ├── npm ci (install deps)
│   ├── Copy source code
│   └── npm run build → /app/dist
│
└── Stage 2: Server (nginx:alpine)
    ├── Copy /app/dist → /usr/share/nginx/html
    ├── Copy nginx.conf
    └── Expose port 80
```

## Dependencies

### Production Dependencies
- `react` (18.3.1) - UI library
- `react-dom` (18.3.1) - React DOM renderer
- `lucide-react` (0.263.1) - Icon library

### Development Dependencies
- `vite` (7.1.7) - Build tool
- `typescript` (5.9.3) - Type safety
- `tailwindcss` (3.3.2) - CSS framework
- `@vitejs/plugin-react` (5.0.4) - React plugin
- `eslint` (9.36.0) - Linting
- Various TypeScript types and plugins

## Key Features

### Component Modularity
- Reusable UI components
- Feature-specific components
- Clear separation of concerns

### Type Safety
- 100% TypeScript coverage
- Strict mode enabled
- Explicit type imports

### Performance
- Code splitting by vendor
- Lazy loading ready
- Optimized bundle sizes
- Asset caching

### Developer Experience
- Fast HMR with Vite
- Path aliases
- ESLint integration
- Clear folder structure

### Production Ready
- Docker multi-stage builds
- Nginx optimization
- Gzip compression
- Static asset caching

## Migration from Legacy

**Old Structure:**
```
hacklearn/
├── index.html (with CDN scripts)
└── hacklearn.jsx (975 lines, everything)
```

**New Structure:**
```
hacklearn/
├── src/ (17 files, modular)
├── config files (11 files)
└── documentation (3 files)
```

**Benefits:**
- Better maintainability
- Type safety
- Faster performance
- Professional workflow
- Easier testing
- Team collaboration ready
