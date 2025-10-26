# Content Source Files

This directory contains organized content source files for developing flagship concepts in HackLearn Pro.

## Directory Structure

```
content-source/
├── ai-ml-security/              # AI/ML Security concepts (#1-10)
│   └── [To be populated from master file]
├── traditional-hacking/         # Traditional hacking concepts (#11-20)
│   └── [To be populated from concepts.tsx]
└── README.md                    # This file
```

## Content Source Files

### Current Status

**Master Content File:**
- `Advanced_Ethical_Hacking_and_AI_Security_Modules_converted.md` (project root)
- Contains 10 AI/ML Security concepts (#1-10)
- Optimized to ~5,000 tokens
- Factually verified

**To Be Extracted:**
- Individual files for concepts #1-20 will be created as needed during development
- Use master file as primary reference until individual files created

## Using Content Sources

### For AI/ML Security Concepts (#1-10)

**Current Approach:**
1. Read from `Advanced_Ethical_Hacking_and_AI_Security_Modules_converted.md`
2. Find section for concept (e.g., "## 1. Prompt Injection Attacks")
3. Extract content for React component tabs:
   - **Theory Tab:** "### Theory" + "### Real-World Examples" sections
   - **Lab Tab:** "### Hands-On Lab Concepts" section
   - **Tools Tab:** "### Attack Tools" + "### Defense Tools" sections
   - **References Tab:** "### Key Citations" section (expand with full links)

**Future Approach (Optional):**
- Split master file into individual `.md` files
- One file per concept in `ai-ml-security/` directory
- Files: `01-prompt-injection.md` through `10-ai-command-injection.md`

### For Traditional Hacking Concepts (#11-20)

**Current Source:**
- Content exists in `src/data/concepts.tsx`
- Concepts #12, #13, #20 have full flagship components
- Concepts #11, #14-19 have basic descriptions only

**Approach:**
1. Extract from `concepts.tsx` (description, realWorldExample, keyTakeaways, defenses)
2. For #12, #13, #20: Reference existing components for full content
3. For #11, #14-19: Expand basic content using security best practices, OWASP guidelines

## Content Requirements Per Concept

When creating individual content files, include:

### File Structure Template

```markdown
# [Concept Name]

**ID:** #[X]
**Category:** [AI/ML Security | Traditional Hacking]
**Difficulty:** [Beginner | Intermediate | Advanced]
**Points:** [100 | 150 | 200]

---

## Theory

[Opening explanation: 100-150 words]

### [Subsection 1]
[Technical breakdown: 100-150 words]

### [Subsection 2]
[More detail: 100-150 words]

---

## Real-World Examples

### [Company Name] ([Year])
**Attack Vector:** [Details]
**Impact:** [Users/systems affected]
**Financial Cost:** $[Amount]
**Outcome:** [Result and lessons]

### [Company Name] ([Year])
[Same structure]

---

## Hands-On Lab Concepts

### Setup
[Installation instructions, prerequisites]

### Exercise 1: Vulnerable Implementation
[Code example with explanation]

### Exercise 2: Secure Implementation
[Secure code with explanation]

### Exercise 3: Advanced Scenario
[Optional advanced example]

---

## Attack Tools

- **[Tool 1]:** [Description, 2-3 sentences]
- **[Tool 2]:** [Description]
- **[Tool 3]:** [Description]
- **[Tool 4]:** [Description]

---

## Defense Tools

- **[Tool 1]:** [Description, 2-3 sentences]
- **[Tool 2]:** [Description]
- **[Tool 3]:** [Description]
- **[Tool 4]:** [Description]

---

## Key Citations

- OWASP: [Link and description]
- NIST: [Link and description]
- Academic: [Paper citations with [1][2][3] markers]
- Industry: [Security blogs, vendor reports]
- Practice: [HackTheBox, TryHackMe, etc.]

---

## Notes for Development

- [Any special considerations]
- [Unique features needed]
- [Related concepts to reference]
```

## Development Workflow

### When Creating a New Flagship Concept:

1. **Read Content:**
   - For #1-10: Use master converted .md file
   - For #11-20: Extract from concepts.tsx or existing components

2. **Map to Component:**
   - Theory section → Theory tab
   - Real-world examples → Theory tab (breach cards)
   - Lab concepts → Lab tab
   - Tools → Tools tab
   - Citations → References tab

3. **Create Jupyter Notebook:**
   - Convert "Hands-On Lab Concepts" to executable cells
   - Add markdown explanations
   - Test all code execution

4. **Expand References:**
   - Take citations from content
   - Add full URLs and descriptions
   - Include official docs (OWASP, NIST, CWE)
   - Add practice platforms

## Content Quality Standards

### Factual Accuracy
All content verified against:
- Official CVE databases
- OWASP documentation
- NIST guidelines
- Academic publications
- Security vendor reports (Trend Micro, NVIDIA, Microsoft)
- News sources (The Guardian, Forbes, Financial Times)

### Professional Standards
- Zero emojis in production components
- Technical accuracy over sensationalism
- Clear distinction between educational demonstration and real exploitation
- Ethical disclaimers on all attack techniques
- Focus on defensive applications

### Citation Format
```
[1] Author et al. (Year). "Paper Title". Conference/Journal. URL
[2] Organization. (Year). "Resource Title". URL
```

## Future Enhancements

### Content Split (Optional)
To create individual files:

```bash
# For AI/ML concepts
# Extract each section from master file
# Create files: 01-prompt-injection.md through 10-ai-command-injection.md

# For Traditional concepts
# Extract from concepts.tsx
# Create files: 11-reconnaissance.md through 20-penetration-testing.md
```

### Benefits of Individual Files:
- Easier to maintain
- Version control per concept
- Parallel development possible
- Clear ownership

### Drawbacks:
- More files to manage
- Need to keep consistent
- Initial extraction time

**Current Decision:** Use master file until individual files prove necessary.

## Quick Reference

### Where to Find Content

| Concept ID | Name | Current Location |
|------------|------|------------------|
| #1-10 | AI/ML Security | `Advanced_Ethical_Hacking_and_AI_Security_Modules_converted.md` |
| #12, #13, #20 | SQL, XSS, PenTest | Existing components + concepts.tsx |
| #11, #14-19 | Other Traditional | concepts.tsx (basic) - needs expansion |

### Content Usage

**For Development:**
1. Read source (master file or concepts.tsx)
2. Create React component using template
3. Create Jupyter notebook using template
4. Follow MODULE_DEVELOPMENT_CHECKLIST.md
5. Update all documentation

**For Reference:**
- Component template: `docs/templates/FlagshipConceptTemplate.tsx`
- Notebook template: `docs/templates/NotebookTemplate.ipynb`
- Checklist: `docs/templates/MODULE_DEVELOPMENT_CHECKLIST.md`

---

## Questions?

See [DEVELOPMENT.md](../DEVELOPMENT.md) for complete development workflow.
See [CLAUDE.md](../CLAUDE.md) for AI assistant-specific guidance.

---

**Status:** Content organization established, ready for module development.
**Next:** Begin Batch 1 - Concepts #3, #4, #5
