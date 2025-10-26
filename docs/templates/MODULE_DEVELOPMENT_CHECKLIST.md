# Module Development Checklist

**Template for creating flagship concepts in HackLearn Pro**

Use this checklist for each new concept to ensure consistent quality and completeness.

---

## Module Information

**Concept ID:** #[X]
**Concept Name:** [Full Name]
**Category:** [AI/ML Security | Traditional Hacking]
**Difficulty:** [Beginner | Intermediate | Advanced]
**Points:** [100 | 150 | 200]
**Estimated Time:** 3-4 hours

---

## Pre-Development Phase (15 min)

### Content Review
- [ ] Read content source file: `docs/content-source/[category]/[id]-[name].md`
- [ ] Understand theory and key concepts
- [ ] Note real-world examples (2-3 required)
- [ ] Identify code examples for Lab tab (3-5 required)
- [ ] List attack tools (4-6 required)
- [ ] List defense tools (4-6 required)
- [ ] Gather citations (20-30 required)

### Pattern Analysis
- [ ] Review existing flagship concepts:
  - [ ] PromptInjectionConcept.tsx
  - [ ] AdversarialMLConcept.tsx
  - [ ] SQLInjectionConcept.tsx
  - [ ] XSSConcept.tsx
  - [ ] PenetrationTestingConcept.tsx
- [ ] Check `/src/components/ui/` for reusable components
- [ ] Identify unique features needed for this concept
- [ ] Plan tab content structure

---

## Component Development Phase (90-120 min)

### Setup
- [ ] Create file: `src/components/concepts/[Name]Concept.tsx`
- [ ] Import required dependencies (useState, icons from lucide-react)
- [ ] Define interface: `[Name]ConceptProps { onBack?, onStartChallenge? }`
- [ ] Set up tab state: `const [activeTab, setActiveTab] = useState('theory')`

### Header Section
- [ ] Add gradient background: `bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900`
- [ ] Create header with concept title
- [ ] Add back button (if onBack prop provided)
- [ ] Style with proper typography and spacing

### Tab Navigation
- [ ] Create tab button container with border
- [ ] Add 4 tab buttons: Theory, Lab, Tools, References
- [ ] Implement active/inactive styling (cyan-400 for active, slate-400 for inactive)
- [ ] Connect onClick handlers to setActiveTab

### Theory Tab Content
- [ ] **Opening Section** (100-150 words)
  - [ ] Clear explanation of the attack/concept
  - [ ] Why it matters
  - [ ] OWASP/NIST references if applicable

- [ ] **Technical Breakdown** (200-300 words)
  - [ ] 2-3 subsections explaining mechanisms
  - [ ] Attack vectors or vulnerability types
  - [ ] How exploitation occurs

- [ ] **Real-World Examples** (2-3 breaches)
  - [ ] Company name and year
  - [ ] Attack vector details
  - [ ] Impact (users affected, data compromised)
  - [ ] Financial cost (if known)
  - [ ] Outcome/lessons learned
  - [ ] Use consistent card structure (bg-slate-800/50, rounded-lg, p-6)

- [ ] **Key Takeaways** (6-8 bullet points)
  - [ ] Use cyan-400 color for bullet points
  - [ ] Clear, actionable insights
  - [ ] Mix technical and strategic points

### Lab Tab Content
- [ ] **Introduction** (50-100 words)
  - [ ] What students will learn
  - [ ] Prerequisites
  - [ ] Safety disclaimers

- [ ] **Code Example 1: Vulnerable Implementation**
  - [ ] Red warning container (bg-red-500/20, border-red-500/50)
  - [ ] Label: "VULNERABLE CODE - Educational Only"
  - [ ] Use CodeBlock component with proper language
  - [ ] Explanation of vulnerability (100-150 words)

- [ ] **Code Example 2: Secure Implementation**
  - [ ] Green container (bg-green-500/20, border-green-500/50)
  - [ ] Label: "SECURE CODE - Production Ready"
  - [ ] Use CodeBlock component
  - [ ] Explanation of fixes (100-150 words)

- [ ] **Code Example 3: Advanced Scenario** (optional)
  - [ ] Additional complexity or edge case
  - [ ] Explanation

- [ ] **Jupyter Notebook Link**
  - [ ] Button/link to `/notebooks/[id]-[name].ipynb`
  - [ ] Call-to-action text
  - [ ] Styled with gradient (from-cyan-500 to-blue-500)

### Tools Tab Content
- [ ] **Attack Tools Section**
  - [ ] Section heading with Shield icon
  - [ ] Grid layout (2 columns on desktop)
  - [ ] 4-6 tools with:
    - [ ] Tool name (bold, text-cyan-400)
    - [ ] Purpose/description (1-2 sentences)
    - [ ] Example usage or command (optional)

- [ ] **Defense Tools Section**
  - [ ] Section heading with Shield icon
  - [ ] Grid layout (2 columns on desktop)
  - [ ] 4-6 tools with:
    - [ ] Tool name (bold, text-emerald-400)
    - [ ] Purpose/description (1-2 sentences)
    - [ ] Implementation guidance (optional)

### References Tab Content
- [ ] **Official Documentation**
  - [ ] OWASP references
  - [ ] NIST guidelines
  - [ ] CWE entries
  - [ ] Links with proper formatting

- [ ] **Academic Papers** (10-15 citations)
  - [ ] Author names, year
  - [ ] Paper title
  - [ ] Publication venue
  - [ ] [1][2][3] citation markers

- [ ] **Real-World Case Studies** (5-10 links)
  - [ ] News articles
  - [ ] Security blogs
  - [ ] Vendor reports

- [ ] **Practice Platforms** (3-5 links)
  - [ ] HackTheBox, TryHackMe, etc.
  - [ ] CTF challenges
  - [ ] Vulnerable applications

- [ ] **Legal/Ethical Disclaimers**
  - [ ] Bold warning about legal use only
  - [ ] Ethical hacking principles
  - [ ] Consequences of misuse

### Challenge Button
- [ ] Add button at bottom (if onStartChallenge provided)
- [ ] Gradient styling (from-cyan-500 to-blue-500)
- [ ] Icon (Trophy or Target)
- [ ] Proper spacing and padding

### Responsive Design
- [ ] Test on mobile (sm:)
- [ ] Test on tablet (md:)
- [ ] Test on desktop (lg:, xl:)
- [ ] Adjust grid columns as needed
- [ ] Ensure text remains readable

### Code Quality
- [ ] NO EMOJIS anywhere (critical requirement)
- [ ] TypeScript strict mode compliance
- [ ] Proper interfaces defined
- [ ] No `any` types
- [ ] Consistent naming conventions
- [ ] Comments for complex logic

---

## Jupyter Notebook Phase (30-45 min)

### Setup
- [ ] Create file: `public/notebooks/[id]-[name].ipynb`
- [ ] Valid JSON structure
- [ ] "cells" array defined

### Header Cell
- [ ] Markdown cell with:
  - [ ] # [Concept Name] - Hands-On Lab
  - [ ] **Part of HackLearn Pro**
  - [ ] Brief overview (50-100 words)

### Setup Cell
- [ ] Markdown: "## Setup"
- [ ] Code cell with pip installs
- [ ] All required packages listed
- [ ] Test that installs work

### Exercise 1
- [ ] Markdown: "## Exercise 1: [Title]"
- [ ] Description (100-150 words)
- [ ] Code cell with vulnerable/basic example
- [ ] Expected output description
- [ ] Markdown with explanation

### Exercise 2
- [ ] Markdown: "## Exercise 2: [Title]"
- [ ] Description
- [ ] Code cell with secure/improved example
- [ ] Expected output description
- [ ] Markdown with explanation

### Exercise 3 (Optional)
- [ ] Markdown: "## Exercise 3: [Title]"
- [ ] Advanced scenario
- [ ] Code cell
- [ ] Explanation

### Summary Cell
- [ ] Markdown: "## What We Learned"
- [ ] Bullet points (4-6)
- [ ] Key takeaways
- [ ] Next steps or further reading

### Testing
- [ ] All code cells execute without errors
- [ ] Outputs make sense
- [ ] No deprecated warnings
- [ ] Instructions are clear

---

## Integration Phase (15 min)

### Update concepts.tsx
- [ ] Open `src/data/concepts.tsx`
- [ ] Add import at top:
  ```typescript
  import { [Name]Concept } from '../components/concepts/[Name]Concept';
  ```
- [ ] Find concept definition (ID #[X])
- [ ] Add detailedComponent property:
  ```typescript
  detailedComponent: (props) => <[Name]Concept {...props} />
  ```
- [ ] Verify concept ID matches
- [ ] Save file

### Update Component Index
- [ ] Open `src/components/concepts/index.ts`
- [ ] Add export:
  ```typescript
  export { [Name]Concept } from './[Name]Concept';
  ```
- [ ] Verify alphabetical order
- [ ] Save file

### Verify Files
- [ ] Component file exists and compiles
- [ ] Notebook file exists
- [ ] No TypeScript errors
- [ ] No import errors

---

## Testing Phase (15 min)

### Local Development Server
- [ ] Run: `npm run dev`
- [ ] Navigate to concept from dashboard
- [ ] **Theory Tab:**
  - [ ] Content loads correctly
  - [ ] Real-world examples display properly
  - [ ] Key takeaways formatted correctly
  - [ ] No layout issues

- [ ] **Lab Tab:**
  - [ ] Code blocks have syntax highlighting
  - [ ] Vulnerable/secure examples clearly marked
  - [ ] Notebook link works
  - [ ] No formatting issues

- [ ] **Tools Tab:**
  - [ ] Attack tools section complete
  - [ ] Defense tools section complete
  - [ ] Grid layout works
  - [ ] Icons display correctly

- [ ] **References Tab:**
  - [ ] All citations present
  - [ ] Links work (spot check)
  - [ ] Formatting consistent
  - [ ] Legal disclaimer present

### Navigation
- [ ] Back button returns to dashboard
- [ ] Tab switching smooth
- [ ] Challenge button works (if present)
- [ ] No console errors

### Responsive Design
- [ ] Resize browser window
- [ ] Test mobile view (< 640px)
- [ ] Test tablet view (640-1024px)
- [ ] Test desktop view (> 1024px)
- [ ] All content accessible

### Production Build
- [ ] Run: `npm run build`
- [ ] Build succeeds without errors
- [ ] No warnings
- [ ] Bundle size reasonable (< 200KB total)

### Linting
- [ ] Run: `npm run lint`
- [ ] Fix all errors
- [ ] Fix all warnings
- [ ] Zero lint issues

---

## Documentation Phase (10 min)

### Update README.md
- [ ] Open README.md
- [ ] Find "Development Status" section
- [ ] Update module count (X/20 → X+1/20)
- [ ] Change concept from ⏳ to ✅
- [ ] Add "(Complete)" with line count
- [ ] Update "Next Milestone" if needed
- [ ] Save file

### Update CLAUDE.md (if new patterns)
- [ ] Open CLAUDE.md
- [ ] Check if any new patterns were created
- [ ] If yes, add to pattern library section
- [ ] Include code examples
- [ ] Note location (file:line)
- [ ] Save file

### Update DEVELOPMENT.md
- [ ] Open DEVELOPMENT.md
- [ ] Find "Project Status Dashboard"
- [ ] Update concept status (⏳ → ✅)
- [ ] Add line count and "[NEW]" marker
- [ ] Update completion percentage
- [ ] Save file

### Documentation Review
- [ ] All three files updated
- [ ] Status numbers consistent
- [ ] No typos
- [ ] Proper formatting

---

## Git Commit Phase (5 min)

### Stage Changes
- [ ] Run: `git status`
- [ ] Verify all files changed
- [ ] Run: `git add .`
- [ ] Confirm staging

### Create Commit
- [ ] Run commit command with proper format:
  ```bash
  git commit -m "[Feature] Add [Name] flagship concept (#[X])

  - Create [Name]Concept.tsx with 4-tab structure ([XXX] lines)
  - Implement [key feature 1]
  - Implement [key feature 2]
  - Add Jupyter notebook with [X] exercises
  - Document [X] attack tools and [X] defense tools
  - Include [X] real-world examples and [X] citations
  - Update concepts.tsx and export from index.ts

  Status: X/20 concepts complete (X%)

  Generated with [Claude Code](https://claude.com/claude-code)

  Co-Authored-By: Claude <noreply@anthropic.com>"
  ```

### Push to GitHub
- [ ] Run: `git push origin master`
- [ ] Wait for push to complete
- [ ] Verify: https://github.com/mbwiller/hacklearn
- [ ] Check files appear on GitHub
- [ ] Review commit message formatting

---

## Post-Completion Verification

### GitHub Verification
- [ ] Visit repository
- [ ] Find latest commit
- [ ] Verify files changed
- [ ] Check commit message
- [ ] Ensure all files present

### Local Cleanup
- [ ] Close dev server
- [ ] Clear terminal
- [ ] Ready for next module

### Success Checklist
- [ ] Component fully functional
- [ ] All tabs complete with quality content
- [ ] Notebook tested and working
- [ ] Documentation updated
- [ ] Committed and pushed
- [ ] Verified on GitHub

---

## Module Complete! ✓

**Time Spent:** ___ hours
**Issues Encountered:** [Note any challenges for future reference]
**Next Module:** #[X+1] - [Name]

**Take a break! Great work on completing this module systematically.**

---

## Common Pitfalls to Avoid

❌ Forgetting to update all three documentation files
❌ Using emojis in component code
❌ Not testing the notebook execution
❌ Copying code without checking for improvements
❌ Creating duplicate components instead of reusing
❌ Inconsistent styling across tabs
❌ Missing real-world examples
❌ Insufficient citations in References tab
❌ Not testing responsive design
❌ Pushing without verifying on GitHub

## Quick Reference

**Content Source:** `docs/content-source/[category]/[id]-[name].md`
**Component:** `src/components/concepts/[Name]Concept.tsx`
**Notebook:** `public/notebooks/[id]-[name].ipynb`
**Concepts:** `src/data/concepts.tsx`
**Exports:** `src/components/concepts/index.ts`

**Commands:**
```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Code quality check
git status       # Check changes
git add .        # Stage all
git commit       # Commit changes
git push         # Push to GitHub
```

---

**For detailed workflow explanations, see [DEVELOPMENT.md](../DEVELOPMENT.md)**
