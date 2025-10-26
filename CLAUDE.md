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

---

## Git Workflow Integration

### Repository Information
- **GitHub URL:** https://github.com/mbwiller/hacklearn
- **Branch:** master (main development branch)
- **Remote:** origin

### Systematic Update Process

**CRITICAL RULE:** After EVERY code change, update README.md, CLAUDE.md, and DEVELOPMENT.md (as applicable) before committing.

### Git Commands for AI Assistants

```bash
# Check current status
git status
git diff

# Stage and commit changes
git add .
git commit -m "[Type] Brief description

Detailed explanation of changes...
- Bullet points for clarity

Status: X/20 concepts complete (X%)

Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
git push origin master

# Verify
# Visit: https://github.com/mbwiller/hacklearn
```

### Commit Message Standards

**Format:** `[Type] Brief description (max 50 chars)`

**Types:**
- `[Feature]` - New flagship concept or major feature
- `[Content]` - Content updates to existing modules
- `[Fix]` - Bug fixes
- `[Docs]` - Documentation updates
- `[Refactor]` - Code improvements without feature changes
- `[Test]` - Testing updates

**Example:**
```
[Feature] Add Data Poisoning flagship concept (#3)

- Create DataPoisoningConcept.tsx with 4-tab structure
- Implement Iris dataset poisoning lab
- Add Jupyter notebook with hands-on exercises
- Document ART BackdoorInjector and TrojanAI tools
- Include 8 real-world examples and 15 citations
- Update concepts.tsx and index.ts exports

Status: 6/20 concepts complete (30%)

Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Content Source Management

### Optimized Content File
**Location:** `Advanced_Ethical_Hacking_and_AI_Security_Modules_converted.md`
- Contains 10 AI/ML Security concepts (#1-10)
- Optimized to ~5,000 tokens (81% reduction from original)
- Factually verified against official sources (OWASP, NIST, CVE databases)
- Structured for efficient reading and component development

### Organized Content Directory
**Location:** `docs/content-source/`

**Structure:**
```
docs/content-source/
├── ai-ml-security/              # 10 files (concepts #1-10)
│   ├── 01-prompt-injection.md
│   ├── 02-adversarial-ml.md
│   ├── 03-data-poisoning.md
│   ├── 04-model-extraction.md
│   ├── 05-jailbreaking.md
│   ├── 06-rag-security.md
│   ├── 07-multi-agent-attacks.md
│   ├── 08-link-traps.md
│   ├── 09-unicode-injection.md
│   └── 10-ai-command-injection.md
├── traditional-hacking/         # 10 files (concepts #11-20)
│   ├── 11-reconnaissance.md
│   ├── 12-sql-injection.md
│   ├── 13-xss.md
│   ├── 14-social-engineering.md
│   ├── 15-network-scanning.md
│   ├── 16-password-cracking.md
│   ├── 17-mitm-attacks.md
│   ├── 18-dos-attacks.md
│   ├── 19-web-vulnerabilities.md
│   └── 20-penetration-testing.md
└── README.md
```

**When developing modules:**
1. Read content from `docs/content-source/[category]/[id]-[name].md`
2. Extract sections for React component tabs (Theory, Lab, Tools, References)
3. Convert "Hands-On Lab Concepts" to Jupyter notebook cells
4. Expand citations for References tab

---

## Module Development Process (AI Assistant Guide)

### Batch Development Strategy

Develop concepts in batches of 3-5 modules for efficiency:
- **Batch 1:** #3, #4, #5 (AI/ML - Content ready)
- **Batch 2:** #6, #7, #8 (AI/ML - Content ready)
- **Batch 3:** #9, #10, #11 (AI/ML + Traditional)
- **Batch 4:** #14, #15, #16 (Traditional)
- **Batch 5:** #17, #18, #19 (Traditional)

### Per-Module Development Workflow

**1. Pre-Development (5 min)**
- Read content source file in `docs/content-source/`
- Review existing flagship concepts for patterns
- Identify reusable components in `/src/components/ui/`
- Plan unique features

**2. Create React Component (90-120 min)**
- File: `src/components/concepts/[Name]Concept.tsx`
- Follow flagship template structure (use existing as reference)
- Implement 4 tabs with consistent styling (Theory, Lab, Tools, References)
- Use existing UI components from `/src/components/ui/`
- Add responsive design breakpoints
- Include navigation buttons (back, challenge)

**3. Create Jupyter Notebook (30-45 min)**
- File: `public/notebooks/[id]-[name].ipynb`
- Convert "Hands-On Lab Concepts" to executable cells
- Add markdown explanations between code cells
- Test execution (all cells must run without errors)
- Include setup instructions and summary

**4. Integration (10 min)**
- Import component in `src/data/concepts.tsx`
- Add `detailedComponent: (props) => <ComponentName {...props} />`
- Export from `src/components/concepts/index.ts`
- Verify concept ID matches

**5. Testing (15 min)**
```bash
npm run dev    # Test in browser (all tabs, navigation, links)
npm run build  # Verify production build succeeds
npm run lint   # Fix any ESLint errors
```

**6. Documentation & Commit (10 min)**
- Update README.md: Module status, new features
- Update CLAUDE.md: New patterns, architecture changes
- Update DEVELOPMENT.md: Status dashboard
- Commit with proper format
- Push to GitHub
- Verify on GitHub

**Total:** ~3-4 hours per module

### Systematic Checklist for Each Module

```markdown
## Module: #[X] - [Name]

### Pre-Development
- [ ] Read content source file
- [ ] Review existing flagship concepts
- [ ] Check reusable components
- [ ] Identify unique requirements

### Development
- [ ] Create [Name]Concept.tsx with 4 tabs
- [ ] Theory tab (400-600 words, real-world examples)
- [ ] Lab tab (3-5 code examples, notebook link)
- [ ] Tools tab (4-6 attack + 4-6 defense tools)
- [ ] References tab (20-30 citations)
- [ ] Create Jupyter notebook
- [ ] Test notebook execution
- [ ] Integrate in concepts.tsx
- [ ] Export from index.ts

### Testing
- [ ] npm run dev - All tabs render
- [ ] Navigation works (back, challenge)
- [ ] Code blocks have syntax highlighting
- [ ] Notebook link opens
- [ ] Responsive design
- [ ] npm run build succeeds
- [ ] npm run lint passes

### Documentation
- [ ] Update README.md
- [ ] Update CLAUDE.md (if new patterns)
- [ ] Update DEVELOPMENT.md
- [ ] Commit with proper message
- [ ] Push to GitHub
- [ ] Verify on GitHub
```

---

## Code Redundancy Prevention Guidelines

### CRITICAL RULE: Check Before Writing

**Before writing ANY code:**

1. **Check existing components:** `/src/components/ui/`
   - CodeBlock, DifficultyBadge, ProgressBar, StatsCard, AchievementCard

2. **Review existing concepts:** Patterns in PromptInjectionConcept, AdversarialMLConcept, SQLInjectionConcept, XSSConcept, PenetrationTestingConcept

3. **Ask three questions:**
   - Does this functionality already exist?
   - Can I reuse an existing pattern?
   - Should this be extracted as a shared component?

### Pattern Reuse Examples

**Tab Navigation (Use Existing Pattern):**
```typescript
// Don't recreate - use this exact pattern from any flagship concept
const [activeTab, setActiveTab] = useState('theory');

<div className="flex space-x-4 border-b border-slate-700">
  {['theory', 'lab', 'tools', 'references'].map(tab => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={activeTab === tab ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-slate-400'}
    >
      {tab.charAt(0).toUpperCase() + tab.slice(1)}
    </button>
  ))}
</div>
```

**Real-World Example Format (Consistent Structure):**
```typescript
// Use consistent structure from SQLInjectionConcept.tsx
<div className="bg-slate-800/50 rounded-lg p-6">
  <h3 className="text-xl font-semibold text-cyan-400 mb-2">Company Name (Year)</h3>
  <p className="text-slate-300 mb-2"><strong className="text-cyan-400">Attack Vector:</strong> ...</p>
  <p className="text-slate-300 mb-2"><strong className="text-cyan-400">Impact:</strong> ... users affected</p>
  <p className="text-slate-300 mb-2"><strong className="text-cyan-400">Financial Cost:</strong> $...</p>
  <p className="text-slate-300"><strong className="text-cyan-400">Outcome:</strong> ...</p>
</div>
```

### Anti-Patterns (DO NOT DO)

❌ Copying entire components without checking for updates
❌ Creating concept-specific versions of UI components (buttons, badges, cards)
❌ Hardcoding gradient/color values (use Tailwind classes consistently)
❌ Duplicate state management logic
❌ Inconsistent styling across concepts

### When to Create New Components

✅ When functionality is truly unique to one concept
✅ When existing component can't handle the new use case
✅ When pattern will be reused 2+ times

---

## Documentation Update Requirements

### After EVERY Code Change

**Rule:** If code changes, documentation MUST be updated before commit.

### Update Matrix

| Code Change | README.md | CLAUDE.md | DEVELOPMENT.md |
|-------------|-----------|-----------|----------------|
| New concept | ✅ Status + features | ✅ Architecture | ✅ Dashboard |
| Content update | Maybe | No | No |
| New pattern | No | ✅ Pattern library | Maybe |
| Bug fix | No | Maybe (if architectural) | No |
| Workflow change | No | ✅ Process update | ✅ Workflow section |
| New component | Maybe (if user-facing) | ✅ Component docs | No |

### Commit Checklist

Before running `git commit`:
- [ ] Code changes complete and tested
- [ ] README.md updated (if needed)
- [ ] CLAUDE.md updated (if needed)
- [ ] DEVELOPMENT.md updated (if needed)
- [ ] Commit message follows format
- [ ] Co-authored with Claude

**Example Documentation Updates:**

**README.md (Module Status):**
```markdown
### Flagship Concepts: 8/20 Complete (40%)

**AI/ML Security (5/10):**
- ✅ #1 Prompt Injection Attacks - Complete
- ✅ #2 Adversarial Machine Learning - Complete
- ✅ #3 Data Poisoning - Complete (NEW)
- ✅ #4 Model Extraction - Complete (NEW)
- ✅ #5 Jailbreaking - Complete (NEW)
- ⏳ #6-10 Additional AI/ML concepts
```

**CLAUDE.md (New Pattern):**
```markdown
### Code Example Container Pattern

**Location:** DataPoisoningConcept.tsx:250-280

Use for all lab code examples:
```typescript
<div className="bg-slate-800/50 rounded-lg p-6">
  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4">
    <p className="text-sm font-semibold text-red-300 mb-2">
      Warning: VULNERABLE CODE - Educational Only
    </p>
    <CodeBlock language="python" code={vulnerableCode} />
  </div>
  <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
    <p className="text-sm font-semibold text-green-300 mb-2">
      Production Ready: SECURE CODE
    </p>
    <CodeBlock language="python" code={secureCode} />
  </div>
</div>
```
```

**DEVELOPMENT.md (Status Update):**
```markdown
## Project Status Dashboard

### Flagship Concepts: 8/20 Complete (40%)

**AI/ML Security (5/10 complete):**
- ✅ #1 Prompt Injection Attacks (825 lines, notebook complete)
- ✅ #2 Adversarial Machine Learning (1,208 lines, notebook complete)
- ✅ #3 Data Poisoning (950 lines, notebook complete) [NEW]
- ✅ #4 Model Extraction (880 lines, notebook complete) [NEW]
- ✅ #5 Jailbreaking & Safety Bypassing (920 lines, notebook complete) [NEW]
- ⏳ #6-10 Additional concepts
```

---

## Project Completion Strategy

### Current Status: 5/20 (25% Complete)
- #1 Prompt Injection ✅
- #2 Adversarial ML ✅
- #12 SQL Injection ✅
- #13 XSS ✅
- #20 Penetration Testing ✅

### Target: 20/20 (100% Complete)
- 15 concepts remaining
- 5 batches of 3 modules each
- ~3.5 hours per module
- **Total estimated time:** ~52.5 hours

### Batch Timeline (Realistic Pace)

**Week 1-2:** Batch 1 (Concepts #3, #4, #5) → 40% complete
**Week 3-4:** Batch 2 (Concepts #6, #7, #8) → 55% complete
**Week 5-6:** Batch 3 (Concepts #9, #10, #11) → 70% complete
**Week 7-8:** Batch 4 (Concepts #14, #15, #16) → 85% complete
**Week 9-10:** Batch 5 (Concepts #17, #18, #19) → 100% complete

**Comfortable pace:** ~5 hours/week development
**Calendar time:** ~10 weeks to completion

---

## Success Metrics

### Code Quality
- ✅ Zero ESLint warnings
- ✅ TypeScript strict mode passing
- ✅ All components tested locally
- ✅ No duplicate code patterns
- ✅ Consistent styling throughout

### Documentation Quality
- ✅ README.md always reflects current status
- ✅ CLAUDE.md reflects actual architecture
- ✅ DEVELOPMENT.md status dashboard accurate
- ✅ All commits properly formatted
- ✅ GitHub repository clean and organized

### Development Efficiency
- ✅ Module development: 3-4 hours each
- ✅ Batch completion: 3-5 concepts per cycle
- ✅ Zero redundant components
- ✅ Reused patterns across concepts
- ✅ Smooth workflow without blockers

---

**For detailed human developer workflow, see [DEVELOPMENT.md](./DEVELOPMENT.md)**
