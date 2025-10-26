# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HackLearn Pro is a professional, engineer-focused ethical hacking education platform teaching 20 critical security concepts (10 AI/ML security + 10 traditional hacking). Built with modern React 18 + Vite + TypeScript, featuring 5 flagship concepts with deep, research-backed content including hands-on labs, professional tools, and academic references.

**Key Characteristics:**
- Professional UI with ZERO emojis (engineer-focused)
- Tabbed interface for deep content organization
- Interactive Jupyter notebook integration
- Research-backed with academic citations
- Production-ready Docker deployment

## Development Commands

### Modern Development (Vite)
```bash
# Install dependencies (first time)
npm install

# Start development server (fast HMR)
npm run dev
# Opens at http://localhost:3000

# Build for production
npm run build
# Output in dist/ (624 KB total, 116 KB gzipped)

# Preview production build
npm run preview
# Opens at http://localhost:4173

# Lint code
npm run lint
```

### Docker Deployment
```bash
# Build Docker image (two-stage build)
docker build -t hacklearn-pro .

# Run container
docker run -d -p 8080:80 --name hacklearn hacklearn-pro

# Access application
# http://localhost:8080

# Stop container
docker stop hacklearn && docker rm hacklearn
```

### Docker Compose (Alternative)
```bash
# Start with docker-compose
docker-compose up -d

# Rebuild and restart
docker-compose up --build -d

# Stop
docker-compose down
```

## Architecture

### Modern React + Vite + TypeScript Stack

**Build System:**
- **Vite 7.x**: Fast dev server with HMR, optimized production builds
- **TypeScript 5.x**: Strict mode enabled, full type safety
- **React 18.3**: Latest stable with hooks and concurrent features
- **Tailwind CSS 3.x**: Utility-first styling
- **Lucide React**: Professional icon library

**Key Features:**
- Production build: 2.35 seconds
- Bundle size: 116.76 KB gzipped (77% compression)
- Code splitting: React vendor + Lucide separated
- Tree-shaking and minification enabled
- No emojis anywhere (professional standard)

### Project Structure

```
Hacklearn/
├── src/
│   ├── components/
│   │   ├── concepts/              # Detailed concept components
│   │   │   ├── PromptInjectionConcept.tsx      (825 lines)
│   │   │   ├── AdversarialMLConcept.tsx        (1,208 lines)
│   │   │   ├── SQLInjectionConcept.tsx         (1,105 lines)
│   │   │   ├── XSSConcept.tsx                  (1,194 lines)
│   │   │   ├── PenetrationTestingConcept.tsx   (1,741 lines)
│   │   │   ├── ConceptCard.tsx                 # Concept grid card
│   │   │   ├── ConceptDetail.tsx               # Default concept view
│   │   │   ├── ChallengeView.tsx               # Challenge quiz
│   │   │   └── index.ts                        # Barrel exports
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── AchievementCard.tsx
│   │   │   ├── DifficultyBadge.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   ├── CodeBlock.tsx                   # Syntax-highlighted code
│   │   │   ├── ColabButton.tsx                 # Google Colab integration
│   │   │   └── CopyCodeButton.tsx              # Copy to clipboard
│   │   └── Dashboard.tsx          # Main dashboard
│   ├── data/
│   │   └── concepts.tsx           # All 20 concept definitions (TypeScript/JSX)
│   ├── hooks/
│   │   ├── useAchievements.ts     # Achievement detection logic
│   │   ├── useGameState.ts        # Points, levels, state management
│   │   └── useProgress.ts         # LocalStorage progress tracking
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   ├── styles/
│   │   └── index.css              # Tailwind imports + custom CSS
│   ├── App.tsx                    # Main app component with routing
│   └── main.tsx                   # React entry point
├── public/
│   └── notebooks/                 # Jupyter notebooks for hands-on labs
│       ├── 01-prompt-injection.ipynb
│       ├── 02-adversarial-ml.ipynb
│       ├── 12-sql-injection.ipynb
│       ├── 13-xss.ipynb
│       └── 20-penetration-testing.ipynb
├── dist/                          # Production build output
├── Dockerfile                     # Two-stage Docker build
├── docker-compose.yml
├── nginx.conf                     # Production web server config
├── vite.config.ts                 # Vite build configuration
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.js             # Tailwind CSS configuration
└── package.json                   # Dependencies and scripts
```

### Component Architecture

#### Dashboard (src/components/Dashboard.tsx)
- Grid of 20 concept cards
- Stats bar: Level, Points, Completed, Achievements
- Progress bar visualization
- Category sections: AI/ML Security, Traditional Hacking

#### Concept Flow
1. **User clicks concept card** → `App.tsx` sets `currentConcept`
2. **App.tsx checks** if concept has `detailedComponent`
3. **If yes**: Render detailed component (5 flagship concepts)
4. **If no**: Render default `ConceptDetail.tsx` (15 basic concepts)
5. **User clicks "Take Challenge"** → `ChallengeView.tsx` with quiz
6. **On correct answer**: Award points, update progress, unlock achievements

#### State Management (Custom Hooks)

**useProgress.ts**
```typescript
const { progress, saveProgress, getProgressPercent } = useProgress();
// Handles localStorage persistence
// Returns: { [conceptId: number]: boolean }
```

**useGameState.ts**
```typescript
const { points, level, awardPoints } = useGameState();
// Manages points, level calculation (500 points per level)
// Handles point allocation on challenge completion
```

**useAchievements.ts**
```typescript
const { achievements, checkAchievements, addAchievement } = useAchievements();
// Detects milestone achievements
// Examples: "First Steps", "Quick Learner", "Security Expert"
```

### Flagship Concepts Architecture

**All 5 flagship concepts follow this structure:**

```tsx
// src/components/concepts/PromptInjectionConcept.tsx (example)

interface ConceptProps {
  onBack?: () => void;              // Navigate back to dashboard
  onStartChallenge?: () => void;    // Launch challenge quiz
}

export const PromptInjectionConcept = ({ onBack, onStartChallenge }: ConceptProps) => {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Navigation */}
      {onBack && <button onClick={onBack}>Back to Dashboard</button>}

      {/* Tab Navigation */}
      <div className="tabs">
        <button onClick={() => setActiveTab('theory')}>Theory</button>
        <button onClick={() => setActiveTab('lab')}>Lab</button>
        <button onClick={() => setActiveTab('tools')}>Tools</button>
        <button onClick={() => setActiveTab('references')}>References</button>
      </div>

      {/* Tab Content */}
      {activeTab === 'theory' && <TheoryTab />}
      {activeTab === 'lab' && <LabTab />}
      {activeTab === 'tools' && <ToolsTab />}
      {activeTab === 'references' && <ReferencesTab />}

      {/* Challenge Button */}
      {onStartChallenge && <button onClick={onStartChallenge}>Take Challenge</button>}
    </div>
  );
};
```

**Tab Content Structure:**

1. **Theory Tab**:
   - Comprehensive explanation
   - Attack types/categories
   - Real-world breaches with details (company, year, impact, $$ cost)
   - Key takeaways (6-8 bullet points)

2. **Lab Tab**:
   - Hands-on code examples (Python, JavaScript, SQL, Bash)
   - Vulnerable code demonstrations (clearly marked)
   - Secure code examples (production-ready)
   - Step-by-step exploitation tutorials
   - Link to Jupyter notebook: `/notebooks/[id]-[name].ipynb`

3. **Tools Tab**:
   - Attack tools (4-6 tools with descriptions)
   - Defense tools (4-6 tools with descriptions)
   - Implementation examples
   - Configuration snippets

4. **References Tab**:
   - Official documentation (OWASP, NIST, CWE)
   - Academic research papers with citations [1][2][3]
   - Real-world case studies
   - Practice platforms
   - Legal/ethical disclaimers

### Data Layer (src/data/concepts.tsx)

**Concept Definition:**
```typescript
{
  id: 1,
  category: 'AI/ML Security' | 'Traditional Hacking',
  title: string,
  icon: ReactNode,              // Lucide icon component
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
  points: 100 | 150 | 200,
  description: string,           // 2-3 sentences
  realWorldExample: string,      // Detailed breach example
  keyTakeaways: string[],        // 4-8 bullet points
  challenge: {
    question: string,
    options: string[],           // ['A) ...', 'B) ...', 'C) ...', 'D) ...']
    correct: 'A' | 'B' | 'C' | 'D',
    explanation: string
  },
  defenses: string[],            // 4-8 defense strategies
  detailedComponent?: (props: ConceptProps) => ReactNode  // For flagship concepts
}
```

**Flagship Concepts (Enhanced):**
- Concept #1: Prompt Injection
- Concept #2: Adversarial ML
- Concept #12: SQL Injection
- Concept #13: XSS
- Concept #20: Penetration Testing

**Basic Concepts (Original):**
- All other concepts (15 total)
- Use default `ConceptDetail.tsx` view
- Single-page scroll with all content

## Content Strategy

### Flagship Concepts: Deep Dive Format

**Content Depth:**
- 800-1,700 lines of TypeScript/JSX per concept
- 10+ code examples (vulnerable + secure)
- 20-30 academic/official citations
- 4-6 attack tools documented
- 4-6 defense tools documented
- Real-world breaches with financial impact data

**Code Examples:**
```tsx
// Always mark vulnerable code clearly
<div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
  <p className="text-sm font-semibold text-red-300 mb-2">
    ⚠️ VULNERABLE CODE - Educational Only
  </p>
  <CodeBlock
    language="php"
    code={vulnerableCode}
  />
</div>

// Mark secure code as production-ready
<div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
  <p className="text-sm font-semibold text-green-300 mb-2">
    ✓ SECURE CODE - Production Ready
  </p>
  <CodeBlock
    language="php"
    code={secureCode}
  />
</div>
```

### Basic Concepts: Original Format

**Content Depth:**
- Single component (`ConceptDetail.tsx`)
- Description, real-world example, key takeaways
- Defense strategies
- Challenge quiz
- Simpler, more accessible

### Adding New Flagship Concepts

To enhance one of the 15 basic concepts:

1. **Create Component File:**
   ```bash
   # src/components/concepts/DataPoisoningConcept.tsx
   ```

2. **Follow Template Structure:**
   ```tsx
   interface DataPoisoningConceptProps {
     onBack?: () => void;
     onStartChallenge?: () => void;
   }

   export const DataPoisoningConcept = ({ onBack, onStartChallenge }: DataPoisoningConceptProps) => {
     // Use existing flagship concepts as reference
     // 4 tabs: Theory, Lab, Tools, References
   };
   ```

3. **Update concepts.tsx:**
   ```tsx
   import { DataPoisoningConcept } from '../components/concepts/DataPoisoningConcept';

   // In concept #3 definition:
   detailedComponent: (props) => <DataPoisoningConcept {...props} />
   ```

4. **Create Jupyter Notebook:**
   ```bash
   # public/notebooks/03-data-poisoning.ipynb
   ```

5. **Export from index.ts:**
   ```tsx
   export { DataPoisoningConcept } from './DataPoisoningConcept';
   ```

## Jupyter Notebook Integration

### Structure

**Location:** `public/notebooks/[id]-[name].ipynb`

**Template:**
```json
{
  "cells": [
    {
      "cell_type": "markdown",
      "source": ["# [Concept Name] - Hands-On Lab\n\n**Part of HackLearn Pro**"]
    },
    {
      "cell_type": "markdown",
      "source": ["## Setup\n\nInstall required packages:"]
    },
    {
      "cell_type": "code",
      "source": ["!pip install numpy scikit-learn matplotlib"]
    },
    // ... lab exercises
  ]
}
```

### Linking from Components

```tsx
<a
  href="/notebooks/01-prompt-injection.ipynb"
  className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"
  target="_blank"
  rel="noopener noreferrer"
>
  Open Interactive Lab Notebook
</a>
```

**Note:** For Google Colab integration, push notebooks to GitHub and use:
```
https://colab.research.google.com/github/[user]/[repo]/blob/main/notebooks/[file].ipynb
```

## Professional Standards

### NO EMOJIS Policy (Critical)

**Enforced Throughout:**
- All 5 flagship concepts: ZERO emojis
- All achievement messages: Text only
- All UI labels: Professional text
- All feedback: "Correct" not "Correct! 🎉"

**Replacing Emojis:**
```tsx
// ❌ BAD
<span>Completed! 🎉</span>

// ✓ GOOD
<span>Completed</span>
<CheckCircle className="w-5 h-5 text-green-400" />
```

### Code Quality Standards

- TypeScript strict mode (no `any` types)
- ESLint passing (zero warnings)
- Consistent component structure
- Proper prop interfaces
- Semantic HTML
- Accessibility considerations

### Styling Consistency

**Color Palette:**
- Background: `slate-950` (#020617)
- Cards: `slate-900` (#0f172a)
- Borders: `slate-800` (#1e293b)
- Accent: `cyan-500` (#06b6d4)
- Success: `emerald-500` (muted)
- Warning: `amber-500` (muted)
- Error: `rose-500` (muted)

**Typography:**
- Body: Inter (clean sans-serif)
- Code: JetBrains Mono (monospace)

**Gradients:**
- Background: `from-indigo-900 via-purple-900 to-pink-900`
- Buttons: `from-cyan-500 to-blue-500`

## Common Development Tasks

### Adding a New Concept (Basic)

Edit `src/data/concepts.tsx`:
```tsx
{
  id: 21,
  category: 'AI/ML Security',
  title: 'New Concept',
  icon: <Shield className="w-8 h-8" />,
  difficulty: 'Intermediate',
  points: 150,
  description: '...',
  realWorldExample: '...',
  keyTakeaways: ['...'],
  challenge: { ... },
  defenses: ['...']
}
```

### Running Development Server

```bash
npm run dev
# Fast HMR, instant updates
# http://localhost:3000
```

### Testing Production Build

```bash
npm run build
npm run preview
# Test optimized bundle
# http://localhost:4173
```

### Updating Dependencies

```bash
npm update
npm audit
npm audit fix
```

### Building for Docker

```bash
# Two-stage build automatically runs:
# 1. npm ci (install deps)
# 2. npm run build (create dist/)
# 3. Copy dist/ to nginx
docker build -t hacklearn-pro .
```

## Performance Optimization

### Current Metrics

- **First Load:** 116.76 KB gzipped (~777ms on 3G)
- **Subsequent Loads:** ~3ms (cached assets)
- **Build Time:** 2.35 seconds
- **Bundle Splitting:** React vendor (45 KB) + Main (64 KB) + Lucide (2 KB)

### Best Practices

- Code splitting already enabled (Vite automatic)
- Tree-shaking removes unused code
- Lazy loading available via `React.lazy()` if needed
- Gzip compression configured in nginx
- Long-term caching for static assets (1 year)

## Docker Deployment

### Dockerfile (Two-Stage Build)

**Stage 1: Builder**
- Node.js 18 Alpine
- npm ci (production dependencies)
- npm run build

**Stage 2: Server**
- Nginx Alpine
- Copy dist/ from builder
- Serve on port 80

**Benefits:**
- Final image: ~50 MB (vs ~500 MB with Node)
- No Node.js in production
- Optimized nginx serving
- Smaller attack surface

### Nginx Configuration

**Features:**
- Gzip compression (reduces bandwidth 77%)
- Static asset caching (1 year expiry)
- SPA routing (all routes → index.html)
- No-cache headers for HTML (fresh updates)

## Troubleshooting

### Build Errors

**TypeScript errors:**
```bash
npm run build
# Check console output for type errors
```

**Missing imports:**
```bash
# Check src/components/concepts/index.ts
# Ensure all flagship concepts are exported
```

### Runtime Errors

**Concept not loading:**
- Check `concepts.tsx` for correct import
- Verify `detailedComponent` prop is set
- Check browser console (F12) for errors

**Notebook link broken:**
- Ensure notebook exists in `public/notebooks/`
- Check filename matches link
- Verify notebooks copied to `dist/notebooks/` after build

### Docker Issues

**Container won't start:**
```bash
docker logs hacklearn
# Check nginx error logs
```

**Build fails:**
```bash
# Ensure Docker Desktop running
# Check Dockerfile syntax
# Verify package.json exists
```

## Next Steps

### Immediate (After POC)

1. **GitHub Integration:**
   - Push notebooks to GitHub repo
   - Update Colab links to use GitHub URLs
   - Set up GitHub Actions CI/CD

2. **Enhanced Concepts:**
   - Apply flagship format to remaining 15 concepts
   - Can be done in waves of 5

3. **Testing:**
   - Add Jest + React Testing Library
   - E2E tests with Playwright
   - Accessibility testing

### Medium-Term

1. **Backend API:**
   - Challenge validation
   - User authentication
   - Progress sync across devices

2. **Analytics:**
   - Track concept completion rates
   - Identify difficult challenges
   - User engagement metrics

3. **Content Expansion:**
   - Video tutorials
   - Interactive sandboxes
   - Capture the Flag (CTF) challenges

### Long-Term

1. **Certifications:**
   - Issue completion certificates
   - LinkedIn badges
   - Skill verification

2. **Community:**
   - Discussion forums
   - User-contributed content
   - Leaderboards

3. **Mobile App:**
   - React Native version
   - Offline support
   - Push notifications

## Reference Documentation

### Key Files to Know

- `src/App.tsx` (lines 79-82): Concept routing logic
- `src/data/concepts.tsx`: All 20 concept definitions
- `src/hooks/useGameState.ts`: Points and level calculation
- `src/components/concepts/index.ts`: Component exports
- `vite.config.ts`: Build configuration
- `Dockerfile`: Production deployment

### Important Line Numbers

- **Level calculation:** `src/hooks/useGameState.ts` (~line 20)
- **Achievement logic:** `src/hooks/useAchievements.ts` (~line 30)
- **Concept routing:** `src/App.tsx` (lines 79-82)

### External Resources

- **Vite Docs:** https://vite.dev
- **React 18 Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **TypeScript:** https://www.typescriptlang.org
- **Lucide Icons:** https://lucide.dev
