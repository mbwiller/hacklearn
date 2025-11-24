# Module 1: Prompt Injection Attacks

## Overview
This module teaches the fundamentals of prompt injection attacks, ranked as the #1 AI security risk by OWASP in 2025.

## Module Information
- **ID**: 1
- **Category**: AI/ML Security
- **Difficulty**: Beginner
- **Status**: ✅ Complete

## Contents

### Component (`component/`)
- **PromptInjectionConcept.tsx** - Full module component with 5 tabs:
  - Theory: Academic research and attack fundamentals
  - Interactive Timeline: Historical evolution of prompt injection
  - Lab: Links to interactive lab playground
  - Tools: Attack tools and defense mechanisms
  - References: Academic citations and CVEs

### Lab Problem (`lab/`)
- **lab-problem.ts** - Interactive coding challenge
  - **Objective**: Build a prompt injection detector
  - **Languages**: Python, JavaScript
  - **Test Cases**: 5 scenarios (safe prompts, injection attempts, edge cases)
  - **Hints**: 6 progressive hints for implementation

### Metadata (`metadata/`)
- **config.ts** - Module configuration exported to central registry
  - Title, description, difficulty, category
  - Real-world examples
  - Key takeaways
  - Defense strategies

## Real-World Context
In 2024, ChatGPT search was vulnerable to hidden webpage content that could override negative reviews with positive ones. This demonstrates how indirect prompt injection can manipulate AI systems through external data sources.

## Key Concepts
1. **Direct Injection**: User directly provides malicious prompts
2. **Indirect Injection**: Malicious prompts embedded in external content (web pages, documents, etc.)
3. **System Prompt Override**: Attackers attempt to replace or ignore safety instructions
4. **OWASP LLM01**: Official categorization of prompt injection vulnerability

## Defense Strategies
- Input/output filtering and sanitization
- Separate system prompts from user input using techniques like delimiters
- Implement guardrails (e.g., NeuralTrust Gateway, Anthropic Constitutional AI)
- Adversarial testing with red-team scenarios

## Development Notes

### Working on This Module
```bash
# Navigate to module folder
cd src/modules/01-prompt-injection

# Claude Code context will be isolated to this module
# All files (component, lab, metadata) are co-located
```

### File Structure
```
01-prompt-injection/
├── component/
│   ├── PromptInjectionConcept.tsx  (878 lines, 44KB)
│   └── index.ts
├── lab/
│   ├── lab-problem.ts               (Problem definition)
│   └── index.ts
├── metadata/
│   ├── config.ts                    (Module metadata)
│   └── index.ts
├── index.ts                          (Barrel export)
└── README.md                         (This file)
```

### Dependencies
- **Shared Components**: None (self-contained module)
- **External APIs**: None
- **Icons**: Lucide React (`Code` icon)

### Related Modules
- Module 5: Jailbreaking & Safety Bypassing (advanced prompt manipulation)
- Module 9: Invisible Unicode Injection (stealth injection techniques)
- Module 10: AI Agent Command Injection (prompt injection in agent systems)

## Testing
- Navigate to `/app/concepts/1` to view module detail page
- Click "Open Interactive Lab Playground" to test IDE integration
- Verify all 5 tabs render correctly
- Test lab problem with Python and JavaScript starter code

## References
- OWASP Top 10 for LLMs (2025): LLM01 - Prompt Injection
- Simon Willison's research on indirect prompt injection
- Historical timeline: 2021 (GPT-3 jailbreaks) → 2025 (modern defense systems)
