# HackLearn Pro - Development Guide

**For Human Developers**

This comprehensive guide provides systematic workflows for developing HackLearn Pro, a professional ethical hacking education platform. See [CLAUDE.md](./CLAUDE.md) for AI assistant-specific guidance.

---

## Project Status Dashboard

### Flagship Concepts: 11/20 Complete (55%)

**AI/ML Security (8/10 complete):**
- ✅ #1 Prompt Injection Attacks (825 lines, notebook complete)
- ✅ #2 Adversarial Machine Learning (1,208 lines, notebook complete)
- ✅ #3 Data Poisoning (1,100 lines, notebook complete)
- ✅ #4 Model Extraction (1,000 lines, notebook complete)
- ✅ #5 Jailbreaking & Safety Bypassing (1,050 lines, notebook complete)
- ✅ #6 RAG Security Vulnerabilities (1,150 lines, notebook complete)
- ✅ #7 Multi-Agent System Attacks (1,200 lines, notebook complete)
- ✅ #8 Link Traps & Malicious URLs (1,180 lines, notebook complete)
- ⏳ #9 Invisible Unicode Injection
- ⏳ #10 AI Agent Command Injection

**Traditional Hacking (3/10 complete):**
- ⏳ #11 Reconnaissance & Footprinting
- ✅ #12 SQL Injection (1,105 lines, notebook complete)
- ✅ #13 Cross-Site Scripting (1,194 lines, notebook complete)
- ⏳ #14 Social Engineering & Phishing
- ⏳ #15 Network Scanning & Enumeration
- ⏳ #16 Password Cracking
- ⏳ #17 Man-in-the-Middle Attacks
- ⏳ #18 Denial of Service
- ⏳ #19 Web Application Vulnerabilities
- ✅ #20 Penetration Testing Methodology (1,741 lines, notebook complete)

### Development Roadmap

**Batch 1 (Complete):** Concepts #3, #4, #5 - AI/ML Security ✅
**Batch 2 (Complete):** Concepts #6, #7, #8 - AI/ML Security ✅
**Batch 3 (Next):** Concepts #9, #10, #11 - Mixed
**Batch 4:** Concepts #14, #15, #16 - Traditional
**Batch 5:** Concepts #17, #18, #19 - Traditional

**Estimated Completion:** ~6 weeks remaining (comfortable pace, 3-5 hours/week)

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

### Time Estimate Per Module
- **Preparation:** 15 min (read content, plan structure)
- **Component Development:** 90-120 min (React component with 4 tabs)
- **Notebook Creation:** 30-45 min (Jupyter notebook with exercises)
- **Integration:** 15 min (update concepts.tsx, exports)
- **Testing:** 15 min (local + production build)
- **Documentation:** 10 min (update README, CLAUDE, DEVELOPMENT)

**Total:** ~3-4 hours per module

### Development Process (Step-by-Step)

#### Step 1: Preparation (15 min)

**Read Content Source:**
```bash
# Located in:
docs/content-source/ai-ml-security/[id]-[name].md
# or
docs/content-source/traditional-hacking/[id]-[name].md
```

**Review Existing Patterns:**
- Check `/src/components/concepts/` for existing flagship concepts
- Review `/src/components/ui/` for reusable components
- Note unique features needed

**Plan Structure:**
- Map content sections to tabs (Theory, Lab, Tools, References)
- Identify code examples for Lab tab
- List tools for Tools tab
- Gather citations for References tab

#### Step 2: Create React Component (90-120 min)

**Create File:**
```bash
src/components/concepts/[Name]Concept.tsx
```

**Template Structure:**
```typescript
import { useState } from 'react';
import { ArrowLeft, BookOpen, Code, Shield, FileText } from 'lucide-react';

interface [Name]ConceptProps {
  onBack?: () => void;
  onStartChallenge?: () => void;
}

export const [Name]Concept = ({ onBack, onStartChallenge }: [Name]ConceptProps) => {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      {/* Tab Navigation */}
      {/* Tab Content */}
      {/* Challenge Button */}
    </div>
  );
};
```

**Tab Content Requirements:**

**Theory Tab (400-600 words):**
- Opening explanation
- Technical breakdown (2-3 subsections)
- 2-3 real-world breaches with details (company, year, impact, cost)
- 6-8 key takeaways

**Lab Tab (3-5 code examples):**
- Introduction
- Vulnerable code example (with warning)
- Secure code example (production-ready label)
- Advanced scenario
- Link to Jupyter notebook

**Tools Tab (8-12 tools):**
- Attack Tools section (4-6 tools)
- Defense Tools section (4-6 tools)
- Implementation examples

**References Tab (20-30 citations):**
- Official docs (OWASP, NIST, CWE)
- Academic papers [1][2][3]
- Real-world case studies
- Practice platforms
- Legal/ethical disclaimers

#### Step 3: Create Jupyter Notebook (30-45 min)

**Create File:**
```bash
public/notebooks/[id]-[name].ipynb
```

**Structure:**
```json
{
  "cells": [
    {"cell_type": "markdown", "source": ["# [Name] - Hands-On Lab"]},
    {"cell_type": "markdown", "source": ["## Setup"]},
    {"cell_type": "code", "source": ["!pip install ..."]},
    {"cell_type": "markdown", "source": ["## Exercise 1"]},
    {"cell_type": "code", "source": ["# Code"]}
  ]
}
```

**Quality Standards:**
- All code cells execute without errors
- Include expected outputs
- Add explanatory markdown between code
- Include summary at end

#### Step 4: Integration (15 min)

**Update concepts.tsx:**
```typescript
// 1. Import at top
import { DataPoisoningConcept } from '../components/concepts/DataPoisoningConcept';

// 2. Add detailedComponent to concept definition
{
  id: 3,
  // ... existing properties
  detailedComponent: (props) => <DataPoisoningConcept {...props} />
}
```

**Export from index.ts:**
```typescript
// src/components/concepts/index.ts
export { DataPoisoningConcept } from './DataPoisoningConcept';
```

#### Step 5: Testing (15 min)

```bash
# Development server
npm run dev
# Test: All tabs, navigation, code blocks, notebook link

# Production build
npm run build
# Verify: Build succeeds, no errors

# Lint
npm run lint
# Fix: Any warnings or errors
```

**Testing Checklist:**
- [ ] Component renders without errors
- [ ] All 4 tabs display correctly
- [ ] Tab switching smooth
- [ ] Back button works
- [ ] Challenge button works
- [ ] Code blocks have syntax highlighting
- [ ] Notebook link opens
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] No console errors
- [ ] TypeScript compiles

#### Step 6: Documentation & Commit (10 min)

**Update README.md:**
- Module status (5/20 → 6/20)
- Any new features
- Installation/usage changes

**Update CLAUDE.md:**
- New component patterns
- Architecture changes
- Development process updates

**Update DEVELOPMENT.md:**
- Status dashboard
- New common issues/solutions

**Commit:**
```bash
git add .
git commit -m "[Feature] Add [Name] flagship concept (#[X])

- Component structure details
- Notebook details
- Status update

Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

git push origin master
```

---

## Batch Development (3-5 Modules)

### Planning Phase

**Select Batch:**
```
Example: Concepts #3, #4, #5
- Data Poisoning (Intermediate, 150 pts)
- Model Extraction (Advanced, 200 pts)
- Jailbreaking (Intermediate, 150 pts)
```

**Estimate Timeline:**
```
3 concepts × 3.5 hours = ~10.5 hours development
+ 2-3 hours testing/refinement
= ~13 hours total
```

**Create Branch (Optional):**
```bash
git checkout -b batch-1-concepts-3-4-5
```

### Development Phase

1. Develop concepts sequentially
2. Test each before moving to next
3. Commit after each concept
4. Update DEVELOPMENT.md status after each

### Completion Phase

**Final Testing:**
```bash
npm run dev    # Test all new concepts
npm run build  # Verify production
npm run lint   # Fix all warnings
```

**Update All Documentation:**
- README.md: Module status, features
- CLAUDE.md: Patterns, architecture
- DEVELOPMENT.md: Status dashboard

**Final Commit:**
```bash
git add .
git commit -m "[Feature] Complete Batch 1 - Concepts #3, #4, #5

- Add Data Poisoning flagship concept (#3)
- Add Model Extraction flagship concept (#4)
- Add Jailbreaking & Safety Bypassing (#5)
- Create 3 Jupyter notebooks
- Update all documentation

Batch 1 completion: 8/20 concepts (40%)

Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

git push origin master
```

---

## Code Redundancy Prevention

### CRITICAL RULE
**Before writing ANY code, check if it already exists!**

### Existing Reusable Components

**Location:** `src/components/ui/`

- `CodeBlock` - Syntax-highlighted code display
- `DifficultyBadge` - Beginner/Intermediate/Advanced badges
- `ProgressBar` - Progress visualization
- `StatsCard` - Statistics display
- `AchievementCard` - Achievement display

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

❌ Copy entire tab without checking for improvements
❌ Create concept-specific UI components
❌ Hardcode gradient/color values
❌ Duplicate state management
❌ Custom markdown rendering

---

## Documentation Update Protocol

### CRITICAL RULE
**If you modify code, you MUST update documentation before committing!**

### Update Matrix

| Change Type | README.md | CLAUDE.md | DEVELOPMENT.md |
|-------------|-----------|-----------|----------------|
| New concept | ✅ Status | ✅ Architecture | ✅ Dashboard |
| Content update | Maybe | No | No |
| New component | Maybe | ✅ Patterns | Maybe |
| Bug fix | No | Maybe | No |
| Workflow change | No | ✅ Process | ✅ Workflow |

### Update Checklist Template

```markdown
## Updated Documentation

### README.md
- [x] Module status (5/20 → 8/20)
- [x] Batch completion notice
- [ ] No changes needed

### CLAUDE.md
- [x] New tab pattern
- [x] Code redundancy notes
- [ ] No changes needed

### DEVELOPMENT.md
- [x] Status dashboard
- [x] Common pitfalls section
- [ ] No changes needed
```

---

## Common Issues & Solutions

### Build Errors

**"Cannot find module" error:**
```bash
# Check: src/components/concepts/index.ts
export { NewConcept } from './NewConcept';
```

**"Module not found" in concepts.tsx:**
```typescript
// Verify import path matches filename exactly
import { DataPoisoningConcept } from '../components/concepts/DataPoisoningConcept';
```

### Runtime Errors

**Tab not rendering:**
- Check tab name matches state value
- Verify no typos in onClick
- Ensure tab component exists

**Notebook link 404:**
- Verify file in `public/notebooks/`
- Check filename matches link
- Rebuild: `npm run build`

### Git Issues

**Merge conflicts:**
```bash
git status           # Check conflicts
# Edit files
git add .
git commit -m "[Fix] Resolve merge conflicts"
```

**Wrong branch commit:**
```bash
git log              # Copy hash
git checkout correct-branch
git cherry-pick <hash>
git checkout wrong-branch
git reset --hard HEAD~1
```

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

## Next Steps

### Immediate
1. Complete Phase 1-5 reorganization
2. Begin Batch 1: #3, #4, #5
3. Use MODULE_DEVELOPMENT_CHECKLIST.md

### Short-Term (2-3 Weeks)
- Complete 5 batches (15 concepts)
- Establish development rhythm
- Refine workflow

### Medium-Term (1 Month)
- Deploy to production hosting
- CI/CD with GitHub Actions
- Analytics tracking
- Backend API for progress sync

### Long-Term (3 Months)
- User authentication
- Community features
- Video tutorials
- Mobile app (React Native)

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

## Project Timeline

### Target: 100% Complete in 10 Weeks

**Week 1-2:** Batch 1 (#3, #4, #5) → 40% complete
**Week 3-4:** Batch 2 (#6, #7, #8) → 55% complete
**Week 5-6:** Batch 3 (#9, #10, #11) → 70% complete
**Week 7-8:** Batch 4 (#14, #15, #16) → 85% complete
**Week 9-10:** Batch 5 (#17, #18, #19) → 100% complete

**Comfortable pace:** ~5 hours/week
**Total time investment:** ~52.5 hours

---

**Happy Hacking! Stay Systematic. Stay Professional. 🛡️**
