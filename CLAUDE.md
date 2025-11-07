# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HackLearn Pro is a professional, engineer-focused ethical hacking education platform teaching 20 critical security concepts (10 AI/ML security + 10 traditional hacking). Built with modern React 18 + Vite + TypeScript, featuring 8 flagship concepts with deep, research-backed content including hands-on labs, professional tools, and academic references.

**Key Characteristics:**
- Professional UI with ZERO emojis (engineer-focused)
- Tabbed interface for deep content organization
- Interactive Jupyter notebook integration
- Research-backed with academic citations
- Production-ready Docker deployment

**UI/UX Status:**
All 20 modules are complete, functional, and 100% harmonized (completed 2025-10-28). Account Page redesigned with professional analytics dashboard (2025-11-05). See [HARMONIZATION_SUMMARY.md](./HARMONIZATION_SUMMARY.md) for module harmonization details.

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
 src/
 components/
 common/ # Page-level shared components
 Dashboard.tsx # Main dashboard (uses React Router)
 ConceptDetailRouter.tsx # Route-based concept renderer
 index.ts # Barrel exports
 concepts/ # Concept-related components
 detailed/ # All 20 flagship ethical hacking concept modules
 PromptInjectionConcept.tsx (825 lines)
 AdversarialMLConcept.tsx (1,208 lines)
 SQLInjectionConcept.tsx (1,105 lines)
 XSSConcept.tsx (1,194 lines)
 PenetrationTestingConcept.tsx (1,741 lines)
 ... (15 more concept files)
 index.ts # Barrel exports for detailed concepts
 ConceptCard.tsx # Concept grid card
 ConceptDetail.tsx # Default concept view (for placeholders)
 index.ts # Main barrel exports
 layouts/ # Layout wrapper components
 AppLayout.tsx # App wrapper with Header + Outlet
 navigation/ # Navigation components
 Header.tsx # Persistent header with nav links
 ui/ # Reusable UI components
 Button.tsx # Standardized button component
 Card.tsx # Reusable card component
 Input.tsx # Form input component
 Container.tsx # Max-width wrappers
 DifficultyBadge.tsx
 ThemeToggle.tsx # Light/dark mode toggle
 contexts/
 ThemeContext.tsx # Theme state provider
 data/
 concepts.tsx # 20 ethical hacking concept definitions
 promptEngineeringConcepts.tsx # 10 prompt engineering placeholders
 hooks/
 useProgress.ts # LocalStorage progress tracking
 useTheme.ts # Theme state management
 pages/ # Page-level components
 SplashPage.tsx # Landing page with bold gradient design
 AccountPage.tsx # User profile & progress stats
 PromptEngineeringPage.tsx # Prompt engineering dashboard
 types/
 index.ts # TypeScript interfaces
 styles/
 index.css # Tailwind imports + custom CSS
 codeblock.css # Code syntax highlighting
 utils/ # Utility functions (placeholder)
 index.ts # Barrel exports
 App.tsx # React Router configuration
 main.tsx # React entry point
 scripts/ # Development/maintenance scripts
 README.md # Scripts documentation
 public/
 notebooks/ # Jupyter notebooks for hands-on labs
 01-prompt-injection.ipynb
 02-adversarial-ml.ipynb
 12-sql-injection.ipynb
 13-xss.ipynb
 20-penetration-testing.ipynb
 dist/ # Production build output (249 KB gzipped)
 Dockerfile # Two-stage Docker build
 docker-compose.yml
 nginx.conf # Production web server config
 vite.config.ts # Vite build configuration
 tsconfig.json # TypeScript configuration
 tailwind.config.js # Tailwind CSS configuration
 package.json # Dependencies (includes react-router-dom)
```

### Routing Architecture (React Router v6)

**Route Structure:**
```
/ (SplashPage - public)
  └─ /app (AppLayout with Header)
      ├─ /app/dashboard (Dashboard - ethical hacking modules)
      ├─ /app/prompt-engineering (PromptEngineeringPage - 10 placeholders)
      ├─ /app/account (AccountPage - user profile & progress)
      ├─ /app/concepts/:id (ConceptDetailRouter - ethical hacking detail pages)
      └─ /app/prompt-concepts/:id (ConceptDetailRouter - prompt engineering detail pages)
```

**Navigation Flow:**
1. User visits `/` → **SplashPage** (bold gradient design, theme toggle in fixed position)
2. User clicks "Enter Platform" → Navigate to `/app/dashboard`
3. **AppLayout** wraps all `/app/*` routes with persistent Header
4. **Header** includes: Logo, Dashboard link, Prompt Engineering link, Account link, Theme Toggle (inline)
5. User clicks module card → Navigate to `/app/concepts/:id` or `/app/prompt-concepts/:id`
6. **ConceptDetailRouter** reads `:id` param, finds concept, renders detailed component or fallback

**Key Components:**

**AppLayout** (`src/components/layouts/AppLayout.tsx`):
- Wraps all authenticated routes
- Renders Header component
- Contains React Router `<Outlet />` for nested routes
- Applies theme-aware background

**Header** (`src/components/navigation/Header.tsx`):
- Sticky positioning (z-40)
- Logo with navigation to `/app/dashboard`
- NavLinks with active state highlighting (emerald accent)
- Inline ThemeToggle
- Responsive design (mobile/tablet/desktop)

**ConceptDetailRouter** (`src/components/common/ConceptDetailRouter.tsx`):
- Reads `:id` parameter from URL
- Searches both `concepts` and `promptEngineeringConcepts` arrays
- Renders `concept.detailedComponent` if available
- Falls back to `ConceptDetail.tsx` for basic concepts
- Navigates back to appropriate dashboard based on category

### Component Architecture

#### Dashboard (src/components/common/Dashboard.tsx)
- Grid of 30 concept cards (20 ethical hacking + 10 prompt engineering when viewing from /app/dashboard)
- Uses React Router's `useNavigate()` hook for navigation
- Category sections: AI/ML Security, Traditional Hacking
- Clicking card navigates to `/app/concepts/:id`

#### PromptEngineeringPage (src/pages/PromptEngineeringPage.tsx)
- Grid of 10 placeholder modules (IDs 101-110)
- "Coming Soon" badge and informational message
- Uses same ConceptCard components as Dashboard
- Clicking card navigates to `/app/prompt-concepts/:id`

#### AccountPage (src/pages/AccountPage.tsx) - **REDESIGNED 2025-11-05**
Professional analytics dashboard with ML/engineering-focused aesthetic

**Layout Structure:**
- **Hero Banner** - Gradient (`from-blue-500 via-cyan-500 to-purple-500`)
  - Profile avatar with glassmorphism (backdrop-blur, white/30 opacity)
  - Level badge with XP progress bar (shows progress to next level)
  - Streak counter (consecutive days, with flame icon)
  - Total points display
- **Two-Column Layout** (70% left / 30% right on desktop)
  - **Left Column:**
    - Activity Heatmap (52-week GitHub-style calendar)
    - Category Progress Rings (3 circular donut charts)
    - Recent Activity Timeline (last 5 completions)
  - **Right Column:**
    - Overall Progress StatsCard
    - Achievement Showcase (6 badges: earned vs locked)
    - Next Milestone Card (dynamic messaging)
    - Info note about local storage

**New Components Used:**
- `ActivityHeatmap` - 52-week contribution calendar
- `StatsCard` - Metric display with icon, value, subtitle, trend
- `ProgressRing` - Circular SVG progress indicator
- `AchievementBadge` - Badge with earned/locked states

**Enhanced useProgress Hook:**
- Activity timestamp tracking (`activityHistory`)
- `getActivityData()` - Returns date -> count mapping
- `getCurrentStreak()` - Calculates consecutive days
- `getRecentActivity(limit)` - Returns last N completions with timestamps

**Color Scheme:**
- **Primary:** Cyan (`cyan-500`) for technical elements
- **Secondary:** Blue (`blue-500`) for ML/AI elements
- **Accent:** Purple (`purple-500`) for highlights
- **Success:** Emerald (`emerald-500`) - used sparingly

**Behavioral Psychology:**
- XP bar creates urgency ("X XP to next level")
- Streak counter encourages daily engagement
- Achievement badges provide visual rewards
- Progress rings more engaging than bars
- Recent activity creates sense of momentum

#### SplashPage (src/pages/SplashPage.tsx)
- Bold gradient design: `from-slate-950 via-emerald-950 to-slate-950`
- Hero section with large typography and CTA button
- Module categories preview (3-column grid)
- Minimal footer with GitHub link
- Fixed ThemeToggle in top-right
- CTA navigates to `/app/dashboard`

#### Concept Flow (Updated)
1. **User clicks concept card** → React Router navigates to `/app/concepts/:id`
2. **ConceptDetailRouter** extracts `:id`, finds concept
3. **If concept.detailedComponent exists**: Render detailed component (all 20 ethical hacking concepts)
4. **If no detailedComponent**: Render default `ConceptDetail.tsx` (10 prompt engineering placeholders)
5. **Back button** → Navigate to appropriate dashboard (`/app/dashboard` or `/app/prompt-engineering`)

#### State Management (Custom Hooks)

**useProgress.ts** - **ENHANCED 2025-11-05**
```typescript
const {
  progress,               // { [conceptId: number]: boolean }
  points,                // Total accumulated points
  level,                 // Current level (points / 500 + 1)
  achievements,          // String array of achievements
  activityHistory,       // Array of ActivityEntry objects
  saveProgress,          // (conceptId, completed) => void
  awardPoints,           // (pointValue) => void
  addAchievement,        // (achievement) => void
  getProgressPercent,    // (totalConcepts) => number
  getActivityData,       // () => { [date: string]: number }
  getCurrentStreak,      // () => number (consecutive days)
  getRecentActivity      // (limit) => ActivityEntry[]
} = useProgress();

// New: Activity tracking with timestamps
// Storage: 'hacklearn_activity' in localStorage
// Format: Array of { conceptId, timestamp, date }
```

**useTheme.ts**
```typescript
const { theme, toggleTheme } = useTheme();
// Manages light/dark theme state with localStorage persistence
// Returns: Theme ('light' | 'dark') and toggleTheme function
// Automatically applies 'dark' class to <html> element
```

#### Theme System

**Architecture:**
- React Context API for global theme state
- Custom `useTheme` hook with localStorage persistence
- CSS custom properties for theme colors
- Tailwind CSS `darkMode: 'class'` configuration
- Fixed position toggle button (top-right, z-50)

**Theme Context (src/contexts/ThemeContext.tsx):**
```typescript
<ThemeProvider>
 {/* All app content */}
</ThemeProvider>

// Usage in components:
const { theme, toggleTheme } = useThemeContext();
```

**Color System:** - **UPDATED 2025-11-05**
- **Base Colors:**
 - Light mode: Cool gray (#F8FAFC) backgrounds, white (#FFFFFF) cards
 - Dark mode: Pure black (slate-950) backgrounds, near-black (slate-900) cards
- **Primary Accent Colors:**
 - **Cyan:** #06B6D4 (`cyan-500`) - Technical/engineering elements
 - **Blue:** #3B82F6 (`blue-500`) - ML/AI elements, secondary actions
 - **Purple:** #A855F7 (`purple-500`) - Highlights, AI/ML category
- **Secondary/Success:**
 - **Emerald:** #10B981 (`emerald-500`) - Success states, used sparingly
- **Borders:**
 - Light mode: #E2E8F0 (`gray-200`)
 - Dark mode: slate-800
- **Semantic Colors:** Preserved across themes
 - Success: Emerald (#10B981)
 - Warning: Yellow/Amber (#F59E0B)
 - Error: Red (#EF4444)
- **Account Page Hero:** Gradient `from-blue-500 via-cyan-500 to-purple-500`

**Typography:**
- **Font Family:** Inter (weights: 400, 500, 600, 700)
- **Loading:** Google Fonts CDN with `display=swap`
- **Fallback:** system-ui, -apple-system, BlinkMacSystemFont

**Component Pattern:**
```tsx
// All components follow this pattern:
<div className="bg-white dark:bg-[slate-900] border border-gray-200 dark:border-[slate-800]">
 <h1 className="text-gray-900 dark:text-white">Title</h1>
 <p className="text-gray-600 dark:text-gray-400">Body text</p>
 <button className="bg-emerald-500 hover:bg-emerald-600 text-white">
 Action
 </button>
</div>
```

**Theme Persistence:**
- Stored in `localStorage` key: `hacklearn-theme`
- Default theme: `dark`
- Persists across browser sessions and page navigations
- Applied on initial page load via `useEffect` in `useTheme` hook

**Code Syntax Highlighting:**
- Code blocks maintain colored syntax in both themes
- Background: `bg-gray-900 dark:bg-slate-950`
- Syntax colors preserved (green, blue, yellow, etc.)

### Flagship Concepts Architecture

**All 20 flagship concepts follow this structure:**
- 4-tab interface: Theory, Lab, Tools, References
- State management: `useState` for activeTab
- Optional `onBack` prop for navigation
- Reference: See any concept in `src/components/concepts/detailed/` for template

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

### UI Component Library

#### UI Components (src/components/ui/)

**Core Components:**
- Card, Button, Container, DifficultyBadge, Input, ThemeToggle

**Analytics Components (2025-11-05):**
- **ActivityHeatmap** - 52-week contribution calendar with hover tooltips and color intensity
- **StatsCard** - Metric display with icons, values, optional trends (Props: icon, label, value, subtitle, color, trend)
- **ProgressRing** - Circular SVG progress indicator with animations (Props: value, max, size, color, label)
- **AchievementBadge** - Badge with earned/locked states and glow effects (Props: title, description, icon, color, earned)

All components are theme-aware, follow cyan/blue/purple/emerald palette, and maintain zero-emoji policy.

### Data Layer (src/data/concepts.tsx)

**Concept Definition:**
```typescript
{
 id: 1,
 category: 'AI/ML Security' | 'Traditional Hacking',
 title: string,
 icon: ReactNode, // Lucide icon component
 difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
 points: 100 | 150 | 200,
 description: string, // 2-3 sentences
 realWorldExample: string, // Detailed breach example
 keyTakeaways: string[], // 4-8 bullet points
 challenge: {
 question: string,
 options: string[], // ['A) ...', 'B) ...', 'C) ...', 'D) ...']
 correct: 'A' | 'B' | 'C' | 'D',
 explanation: string
 },
 defenses: string[], // 4-8 defense strategies
 detailedComponent?: (props: ConceptProps) => ReactNode // For flagship concepts
}
```

**Flagship Concepts (Enhanced):**
- Concept #1: Prompt Injection
- Concept #2: Adversarial ML
- Concept #3: Data Poisoning
- Concept #4: Model Extraction
- Concept #5: Jailbreaking & Safety Bypassing
- Concept #6: RAG Security Vulnerabilities
- Concept #7: Multi-Agent System Attacks
- Concept #8: Link Traps & Malicious URLs
- Concept #9: Invisible Unicode Injection
- Concept #10: AI Agent Command Injection
- Concept #11: Reconnaissance & Footprinting
- Concept #12: SQL Injection
- Concept #13: XSS
- Concept #20: Penetration Testing

**Basic Concepts (Original):**
- All other concepts (6 total: #14-19)
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
- Vulnerable code marked with red background/border, secure code with green
- See any concept file for examples

### Basic Concepts: Original Format

**Content Depth:**
- Single component (`ConceptDetail.tsx`)
- Description, real-world example, key takeaways
- Defense strategies
- Challenge quiz
- Simpler, more accessible

### Adding New Flagship Concepts

To enhance one of the 6 basic concepts:
1. Create component file: `src/components/concepts/[Name]Concept.tsx`
2. Follow template structure: 4 tabs (Theory, Lab, Tools, References), use existing concepts as reference
3. Update `concepts.tsx`: Import component, add `detailedComponent` prop
4. Create Jupyter notebook: `public/notebooks/[id]-[name].ipynb`
5. Export from `index.ts`

## Jupyter Notebook Integration

**Location:** `public/notebooks/[id]-[name].ipynb`

**Structure:** Standard Jupyter format with markdown cells (concept name, setup instructions) and code cells (lab exercises). See existing notebooks for template.

**Linking:** Link from Lab tab using anchor tag with `/notebooks/[id]-[name].ipynb` href. For Google Colab, use GitHub URL: `https://colab.research.google.com/github/[user]/[repo]/blob/main/notebooks/[file].ipynb`

## Professional Standards

### NO EMOJIS Policy (Critical)

**Enforced Throughout:**
- All 20 flagship concepts: ZERO emojis
- All achievement messages: Text only
- All UI labels: Professional text
- All feedback: "Correct" not "Correct! "
- Replace with Lucide icons when visual indicator needed

### Code Quality Standards

- TypeScript strict mode (no `any` types)
- ESLint passing (zero warnings)
- Consistent component structure
- Proper prop interfaces
- Semantic HTML
- Accessibility considerations

### Styling Consistency

**Color Palette:**
- **Light Mode:**
 - Background: `gray-50` (#F8FAFC)
 - Cards: `white` (#FFFFFF)
 - Borders: `gray-200` (#E5E7EB)
 - Text Primary: `gray-900` (#111827)
 - Text Secondary: `gray-600` (#4B5563)
- **Dark Mode:**
 - Background: `black` (slate-950)
 - Cards: Custom `slate-900` (near-black)
 - Borders: Custom `slate-800`
 - Text Primary: `white` (#FFFFFF)
 - Text Secondary: `gray-400` (#9CA3AF)
- **Accent Colors (both modes):**
 - Primary Accent: `emerald-500` (#10B981)
 - Success: `green-500` (#22C55E)
 - Warning: `yellow-500` / `amber-500`
 - Error: `red-500` (#EF4444)

**Typography:**
- Body: Inter (weights: 400, 500, 600, 700)
- Code: JetBrains Mono (monospace)
- Load via Google Fonts CDN

**Theme-Aware Patterns:**
- Cards: `bg-white dark:bg-[slate-900] border border-gray-200 dark:border-[slate-800]`
- Headings: `text-gray-900 dark:text-white`
- Body text: `text-gray-600 dark:text-gray-400`
- Buttons: `bg-emerald-500 hover:bg-emerald-600 text-white`
- Icon containers: `bg-gradient-to-br from-emerald-400 to-emerald-600`

## Common Development Tasks

### Adding a New Concept (Basic)

Edit `src/data/concepts.tsx`: Add new concept object with id, category, title, icon, difficulty, points, description, realWorldExample, keyTakeaways, challenge, and defenses. See existing concepts for structure.

### Running Development Server
`npm run dev` - Fast HMR at http://localhost:3000

### Testing Production Build
`npm run build && npm run preview` - Test optimized bundle at http://localhost:4173

### Updating Dependencies
`npm update && npm audit && npm audit fix`

### Building for Docker
`docker build -t hacklearn-pro .` - Two-stage build: npm ci → npm run build → copy to nginx

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
- SPA routing (all routes index.html)
- No-cache headers for HTML (fresh updates)

## Troubleshooting

**Build Errors:** Run `npm run build` to see TypeScript errors. Check `src/components/concepts/detailed/index.ts` for missing exports.

**Runtime Errors:** If concept not loading, verify `detailedComponent` prop in `concepts.tsx`. If notebook link broken, check file exists in `public/notebooks/`.

**Docker Issues:** Use `docker logs hacklearn` to debug container issues. Ensure Docker Desktop running and Dockerfile syntax correct.

## Reference Documentation

### Key Files to Know

- `src/App.tsx`: React Router configuration and routing logic
- `src/data/concepts.tsx`: All 20 concept definitions
- `src/hooks/useProgress.ts`: Progress tracking and localStorage persistence
- `src/components/concepts/detailed/index.ts`: Concept component exports
- `vite.config.ts`: Build configuration
- `Dockerfile`: Production deployment

### Important Line Numbers

- **Progress tracking:** `src/hooks/useProgress.ts` (localStorage-based)
- **Theme management:** `src/hooks/useTheme.ts` (light/dark mode)
- **Concept routing:** `src/App.tsx` (React Router configuration)

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
 ai-ml-security/ # 10 files (concepts #1-10)
 01-prompt-injection.md
 02-adversarial-ml.md
 03-data-poisoning.md
 04-model-extraction.md
 05-jailbreaking.md
 06-rag-security.md
 07-multi-agent-attacks.md
 08-link-traps.md
 09-unicode-injection.md
 10-ai-command-injection.md
 traditional-hacking/ # 10 files (concepts #11-20)
 11-reconnaissance.md
 12-sql-injection.md
 13-xss.md
 14-social-engineering.md
 15-network-scanning.md
 16-password-cracking.md
 17-mitm-attacks.md
 18-dos-attacks.md
 19-web-vulnerabilities.md
 20-penetration-testing.md
 README.md
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
- File: `src/components/concepts/detailed/[Name]Concept.tsx`
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
- Export from `src/components/concepts/detailed/index.ts`
- Verify concept ID matches

**5. Testing (15 min)**
```bash
npm run dev # Test in browser (all tabs, navigation, links)
npm run build # Verify production build succeeds
npm run lint # Fix any ESLint errors
```

**6. Documentation & Commit (10 min)**
- Update README.md: Module status, new features
- Update CLAUDE.md: New patterns, architecture changes
- Update DEVELOPMENT.md: Status dashboard
- Commit with proper format
- Push to GitHub
- Verify on GitHub

**Total:** ~3-4 hours per module

---

## Code Redundancy Prevention Guidelines

### CRITICAL RULE: Check Before Writing

**Before writing ANY code:**

1. **Check existing components:** `/src/components/ui/`
 - **Core:** Card, Button, Container, DifficultyBadge, Input, ThemeToggle
 - **Analytics (NEW):** ActivityHeatmap, StatsCard, ProgressRing, AchievementBadge

2. **Review existing concepts:** Patterns in PromptInjectionConcept, AdversarialMLConcept, SQLInjectionConcept, XSSConcept, PenetrationTestingConcept

3. **Check AccountPage.tsx** for analytics dashboard patterns

3. **Ask three questions:**
 - Does this functionality already exist?
 - Can I reuse an existing pattern?
 - Should this be extracted as a shared component?

### Pattern Reuse Examples

**Tab Navigation:** Use `useState` for activeTab, map over ['theory', 'lab', 'tools', 'references']. See any flagship concept for exact pattern.

**Real-World Example Format:** Use consistent structure with slate background, cyan-400 headings, and structured fields (Attack Vector, Impact, Financial Cost, Outcome). See SQLInjectionConcept.tsx for template.

### Anti-Patterns (DO NOT DO)

[No] Copying entire components without checking for updates
[No] Creating concept-specific versions of UI components (buttons, badges, cards)
[No] Hardcoding gradient/color values (use Tailwind classes consistently)
[No] Duplicate state management logic
[No] Inconsistent styling across concepts

### When to Create New Components

When functionality is truly unique to one concept
When existing component can't handle the new use case
When pattern will be reused 2+ times

---

## Documentation Update Requirements

### After EVERY Code Change

**Rule:** If code changes, documentation MUST be updated before commit.

### Update Matrix

| Code Change | README.md | CLAUDE.md | DEVELOPMENT.md |
|-------------|-----------|-----------|----------------|
| New concept | Status + features | Architecture | Dashboard |
| Content update | Maybe | No | No |
| New pattern | No | Pattern library | Maybe |
| Bug fix | No | Maybe (if architectural) | No |
| Workflow change | No | Process update | Workflow section |
| New component | Maybe (if user-facing) | Component docs | No |

### Commit Checklist

Before running `git commit`:
- [ ] Code changes complete and tested
- [ ] README.md updated (if needed)
- [ ] CLAUDE.md updated (if needed)
- [ ] DEVELOPMENT.md updated (if needed)
- [ ] Commit message follows format
- [ ] Co-authored with Claude

**Example Documentation Updates:**

When adding new concepts, update:
- **README.md:** Module status section (increment completion counts)
- **CLAUDE.md:** New patterns only (if introducing new reusable patterns or components)
- **DEVELOPMENT.md:** Status dashboard (update concept counts and list)

---

**For detailed human developer workflow, see [DEVELOPMENT.md](./DEVELOPMENT.md)**
