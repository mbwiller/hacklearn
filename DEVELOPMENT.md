# HackLearn Pro - Development Guide

**For Human Developers**

This comprehensive guide provides systematic workflows for developing HackLearn Pro, a professional ethical hacking education platform. See [CLAUDE.md](./CLAUDE.md) for AI assistant-specific guidance.

---

## Project Status Dashboard

### Platform Architecture: Complete

**Frontend Transformation (2025-10-29):**
- React Router v6 integration: Complete
- Splash page with bold gradient design: Complete
- Navigation header with active state highlighting: Complete
- User account page with progress tracking: Complete **REDESIGNED 2025-11-05**
- 30 module structure (20 complete + 10 placeholders): Complete
- Responsive design across all new pages: Complete

**Account Page Professional Redesign (2025-11-05):**
- ML/engineering-focused aesthetic with cyan/blue/purple palette
- GitHub-style 52-week activity heatmap
- Circular progress rings by category
- Achievement badge system (6 milestones)
- Streak tracking and XP progression
- Recent activity timeline
- Four new reusable UI components created

**Route Structure:**
- `/` - SplashPage (public landing page)
- `/app/dashboard` - Ethical hacking modules (20 complete)
- `/app/prompt-engineering` - Prompt engineering modules (10 placeholders)
- `/app/account` - Professional analytics dashboard with activity tracking **REDESIGNED**
- `/app/concepts/:id` - Dynamic concept detail pages

### Content Status: 20/30 Modules Complete (67%)

### Flagship Concepts: 20/20 Complete (100%)

**AI/ML Security (10/10 complete!):**
- #1 Prompt Injection Attacks (825 lines, notebook complete)
- #2 Adversarial Machine Learning (1,208 lines, notebook complete)
- #3 Data Poisoning (1,100 lines, notebook complete)
- #4 Model Extraction (1,000 lines, notebook complete)
- #5 Jailbreaking & Safety Bypassing (1,050 lines, notebook complete)
- #6 RAG Security Vulnerabilities (1,150 lines, notebook complete)
- #7 Multi-Agent System Attacks (1,200 lines, notebook complete)
- #8 Link Traps & Malicious URLs (1,180 lines, notebook complete)
- #9 Invisible Unicode Injection (1,200 lines, notebook complete)
- #10 AI Agent Command Injection (1,400 lines, notebook complete)

**Traditional Hacking (10/10 complete!):**
- #11 Reconnaissance & Footprinting (1,650 lines, notebook complete)
- #12 SQL Injection (1,105 lines, notebook complete)
- #13 Cross-Site Scripting (1,194 lines, notebook complete)
- #14 Social Engineering & Phishing (1,377 lines, notebook complete)
- #15 Network Scanning & Enumeration (1,250 lines, notebook complete)
- #16 Password Cracking & Credential Attacks (1,555 lines, notebook complete)
- #17 Man-in-the-Middle (MitM) Attacks (1,332 lines, notebook complete) **NEW!**
- #18 Denial of Service (DoS) Attacks (1,250 lines, notebook complete) **NEW!**
- #19 Web Application Vulnerabilities (1,400 lines, notebook complete) **NEW!**
- #20 Penetration Testing Methodology (1,741 lines, notebook complete)

**Prompt Engineering for LLMs (0/10 - Placeholders ready!):**
- #101 Fundamentals of Prompt Design (placeholder with structure)
- #102 Advanced Prompting Techniques (placeholder with structure)
- #103 Prompt Optimization (placeholder with structure)
- #104 Role-Based Prompting (placeholder with structure)
- #105 Creative Prompting (placeholder with structure)
- #106 Multi-Step Reasoning (placeholder with structure)
- #107 Safety & Alignment (placeholder with structure)
- #108 Code Generation Prompting (placeholder with structure)
- #109 Enterprise Prompt Engineering (placeholder with structure)
- #110 Agentic Workflows (placeholder with structure)

All 10 prompt engineering modules have placeholder content with:
- Consistent structure matching existing concepts
- Key takeaways and defense strategies defined
- Ready for content development following established patterns

### Development Roadmap

**Phase 1-5 (Complete):** All 20 ethical hacking flagship modules
**Phase 6 (Complete - 2025-10-29):** Frontend transformation with React Router
**Phase 7 (Next):** Prompt Engineering content development (10 modules)

**Batch 1 (Complete):** Concepts #3, #4, #5 - AI/ML Security **Batch 2 (Complete):** Concepts #6, #7, #8 - AI/ML Security **Batch 3 (Complete):** Concepts #9, #10, #11 - Mixed (AI/ML + Traditional) **Batch 4 (Complete):** Concepts #14, #15, #16 - Traditional **Batch 5 (Complete):** Concepts #17, #18, #19 - Traditional ** PROJECT COMPLETE!** All 20 flagship modules with comprehensive content, interactive labs, and production-ready deployment.

### UI/UX Harmonization Status

**Status:** 100% Complete (2025-10-28)

All 20 modules have been systematically harmonized to achieve complete visual consistency. This comprehensive effort standardized:

**What Was Harmonized:**
- Root backgrounds: `bg-white dark:bg-slate-950` (all modules)
- Main card containers: `bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800`
- Icon gradients: `from-emerald-400 to-emerald-600` (unified emerald accent)
- Tab navigation: Standardized active state (`bg-emerald-50 dark:bg-emerald-950/50`)
- Back buttons: Solid slate with borders (`bg-slate-100 dark:bg-slate-800`)
- Gray slate conversion: All dark mode structural elements now use slate (not gray)

**Methodology:**
- Used bash sed scripts for systematic find-replace operations
- Batched approach: Modules harmonized in 5 batches
- Build and lint verification after each batch
- Created StandardModuleTemplate.tsx as reference guide

**Results:**
- 19/20 modules harmonized via batch scripts (Modules #1-10, #12-20)
- Module #11 completely rewritten using standard template (1,165 lines)
- Zero build errors, all lint tests passing
- Professional consistency achieved across platform

**Exception:** Module #20 (Penetration Testing) intentionally preserves unique solid emerald tab style to reflect its advanced/certification-level nature.

**Documentation:** See [HARMONIZATION_SUMMARY.md](./HARMONIZATION_SUMMARY.md) for complete technical details, before/after comparisons, and color system reference.

---

## Git Workflow

### GitHub Repository
**URL:** https://github.com/mbwiller/hacklearn
**Branch:** master
**Remote:** origin

### Daily Development Commands

```bash
# Start session
git pull origin master

# Check status
git status
git diff

# After changes
git add .
git commit -m "[Type] Description"
git push origin master
```

### Commit Message Standards

**Format:** `[Type] Brief description (max 50 chars)`

**Types:**
- `[Feature]` - New flagship concept or major feature
- `[Content]` - Content updates to existing modules
- `[Fix]` - Bug fixes
- `[Docs]` - Documentation updates (README, CLAUDE, DEVELOPMENT)
- `[Refactor]` - Code improvements without feature changes
- `[Test]` - Testing updates

**Examples:**
```
[Feature] Add Data Poisoning flagship concept (#3)
[Content] Enhance SQL Injection real-world examples
[Docs] Update README with Batch 1 completion
[Fix] Correct TypeScript types in concepts.tsx
```

**Full Commit Template:**
```
[Feature] Add Data Poisoning flagship concept (#3)

- Create DataPoisoningConcept.tsx with 4-tab structure
- Implement Iris dataset poisoning lab
- Add Jupyter notebook with hands-on exercises
- Document tools: ART BackdoorInjector, TrojanAI
- Include real-world examples and citations
- Update concepts.tsx and export from index.ts

Status: 6/20 concepts complete (30%)

Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Module Development Workflow

**Time:** ~3-4 hours per module

### Development Checklist

**Preparation (15 min):**
- [ ] Read content from `docs/content-source/[category]/[id]-[name].md`
- [ ] Review existing concept patterns in `/src/components/concepts/`
- [ ] Plan 4-tab structure (Theory, Lab, Tools, References)

**Component Development (90-120 min):**
- [ ] Create `src/components/concepts/[Name]Concept.tsx`
- [ ] Implement Theory tab (400-600 words, real-world examples)
- [ ] Implement Lab tab (3-5 code examples, notebook link)
- [ ] Implement Tools tab (8-12 tools: attack + defense)
- [ ] Implement References tab (20-30 citations)
- [ ] Use existing UI components from `/src/components/ui/`

**Notebook Creation (30-45 min):**
- [ ] Create `public/notebooks/[id]-[name].ipynb`
- [ ] Test all cells execute without errors
- [ ] Add markdown explanations between code cells

**Integration (15 min):**
- [ ] Import component in `src/data/concepts.tsx`
- [ ] Add `detailedComponent` prop to concept definition
- [ ] Export from `src/components/concepts/index.ts`

**Testing (15 min):**
- [ ] `npm run dev` - Verify all tabs, navigation, links
- [ ] `npm run build` - Verify production build succeeds
- [ ] `npm run lint` - Fix any warnings

**Documentation & Commit (10 min):**
- [ ] Update README.md status
- [ ] Update CLAUDE.md (if new patterns)
- [ ] Update DEVELOPMENT.md dashboard
- [ ] Commit with proper format: `[Feature] Add [Name] concept (#X)`
- [ ] Push to GitHub

---

## Code Redundancy Prevention

### CRITICAL RULE
**Before writing ANY code, check if it already exists!**

### Existing Reusable Components

**Location:** `src/components/ui/`

**Core Components:**
- `Card` - Reusable card container (variants: default, hover, interactive)
- `Button` - Standardized button (variants: primary, secondary, outline, ghost)
- `Container` - Max-width layout wrapper
- `DifficultyBadge` - Beginner/Intermediate/Advanced badges
- `Input` - Form input with validation
- `ThemeToggle` - Light/dark mode toggle

**Analytics Components (NEW - 2025-11-05):**
- `ActivityHeatmap` - GitHub-style 52-week contribution calendar
- `StatsCard` - Metric display with icons, values, and trends
- `ProgressRing` - Circular SVG progress indicator (donut chart)
- `AchievementBadge` - Badge component with earned/locked states

**DO NOT recreate these!**

### Pattern Library

| Pattern | Example Location | Use For |
|---------|-----------------|---------|
| Tab Navigation | PromptInjectionConcept.tsx:45-60 | All concepts |
| Real-World Breach | SQLInjectionConcept.tsx:120-145 | Theory tab |
| Code Container | AdversarialMLConcept.tsx:200-230 | Lab tab |
| Tool Grid | XSSConcept.tsx:450-480 | Tools tab |
| Citation List | PenetrationTestingConcept.tsx:1600-1650 | References |

### Before Writing Code, Ask:

1. **Does this exist?** Check `/src/components/ui/`
2. **Can I reuse?** Use existing pattern
3. **Should this be shared?** Extract if used 2+ times
4. **Is there a better way?** Review recent commits

### Anti-Patterns (DO NOT DO)

[No] Copy entire tab without checking for improvements
[No] Create concept-specific UI components
[No] Hardcode gradient/color values
[No] Duplicate state management
[No] Custom markdown rendering

---

## Documentation Update Protocol

### CRITICAL RULE
**If you modify code, you MUST update documentation before committing!**

### Update Matrix

| Change Type | README.md | CLAUDE.md | DEVELOPMENT.md |
|-------------|-----------|-----------|----------------|
| New concept | Status | Architecture | Dashboard |
| Content update | Maybe | No | No |
| New component | Maybe | Patterns | Maybe |
| Bug fix | No | Maybe | No |
| Workflow change | No | Process | Workflow |

---

## Common Issues & Solutions

**Build Errors:** "Cannot find module" → Check `src/components/concepts/index.ts` exports. "Module not found" → Verify import path matches filename.

**Runtime Errors:** Tab not rendering → Check tab name matches state value. Notebook 404 → Verify file in `public/notebooks/`, run `npm run build`.

**Git Issues:** Merge conflicts → `git status`, edit files, `git add .`, commit. Wrong branch commit → `git cherry-pick <hash>` to correct branch, reset wrong branch.

---

## Performance Targets

### Current Metrics
- First Load: <150 KB gzipped
- Build Time: <5 seconds
- Bundle per Concept: ~10-15 KB

### Optimization
- React.lazy() if bundle >200 KB
- Optimize images (WebP, compressed)
- Code splitting (Vite automatic)
- Minimal dependencies

---

## Future Enhancements

**Note:** All 20 flagship concepts are complete. These are optional future enhancements.

**Near-Term:**
- Deploy to production hosting (Vercel, Netlify, or AWS)
- CI/CD with GitHub Actions
- Develop 10 Prompt Engineering modules (content placeholders ready)

**Medium-Term:**
- Backend API for progress sync across devices
- User authentication and cloud profiles
- Analytics tracking

**Long-Term:**
- Community features and discussion forums
- Video tutorials and interactive sandboxes
- Mobile app (React Native)
- Certification system

---

## Resources

**Repository:** https://github.com/mbwiller/hacklearn

**Documentation:**
- README.md - User-facing docs
- CLAUDE.md - AI assistant guide
- DEVELOPMENT.md - This file

**Tools:**
- Vite: https://vite.dev
- React: https://react.dev
- Tailwind: https://tailwindcss.com
- TypeScript: https://www.typescriptlang.org
- Lucide Icons: https://lucide.dev

**Security:**
- OWASP: https://owasp.org
- NIST: https://www.nist.gov/cybersecurity
- MITRE ATLAS: https://atlas.mitre.org

---

**Happy Hacking! Stay Systematic. Stay Professional.**
