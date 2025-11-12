# Lab Problems Directory

This directory contains interactive coding challenges for the HackLearn platform's 20 ethical hacking modules.

## Overview

Each module can have an associated lab problem that provides hands-on practice in a full IDE environment with:
- Monaco code editor (VS Code engine)
- Multiple language support (Python, JavaScript, SQL)
- Real code execution
- Automated test validation
- Progressive hints system

## File Structure

```
lab-problems/
├── README.md                    # This file
├── _TEMPLATE.ts                 # Complete template for new labs
├── index.ts                     # Lab problem registry
├── 01-prompt-injection.ts       # ✅ Module 1 (complete)
├── 02-adversarial-ml.ts         # 🚧 To be created
├── 03-data-poisoning.ts         # 🚧 To be created
└── ...                          # Modules 4-20
```

## Creating a New Lab Problem

### Quick Start (5 minutes)

1. **Copy the template:**
   ```bash
   cp _TEMPLATE.ts [MODULE_NUMBER]-[module-name].ts
   # Example: cp _TEMPLATE.ts 02-adversarial-ml.ts
   ```

2. **Replace all placeholders:**
   - Search for `[REPLACE` and replace each occurrence
   - Update module ID, title, difficulty, topics
   - Write description and examples
   - Fill in starter code
   - Create test cases
   - Add progressive hints

3. **Export the problem:**
   ```typescript
   export const adversarialMLProblem: Problem = { ... };
   ```

4. **Register in index.ts:**
   ```typescript
   import { adversarialMLProblem } from './02-adversarial-ml';

   const labProblems: Record<number, Problem> = {
     1: promptInjectionProblem,
     2: adversarialMLProblem, // Add this line
     // ...
   };
   ```

### Detailed Guidelines

#### 1. Module Alignment

**Ensure your lab aligns with the module's learning objectives:**

- Review the module's concept file in `src/components/concepts/detailed/`
- Lab should reinforce theory from the Theory tab
- Difficulty should match module difficulty
- Topics should overlap with module topics

**Example:**
```typescript
// Module 2: Adversarial Machine Learning
id: 2,
title: "Adversarial ML: Image Classifier Attack",
difficulty: "Intermediate", // Matches module
topics: ["AI Security", "Adversarial ML", "FGSM"], // Aligned with module
```

#### 2. Educational Description

**Structure:**
```
[Context] - What real-world problem this addresses
[Scenario] - Specific situation the student is in
[Your task] - Clear numbered objectives (3-5 items)
[Background] - Additional technical context
```

**Example:**
```typescript
description: `Adversarial examples are carefully crafted inputs that fool machine learning models.

You are a security researcher testing an image classification model. The model correctly classifies benign images, but you suspect it's vulnerable to adversarial perturbations.

Your task is to:
1. Implement a simple perturbation algorithm
2. Generate adversarial examples that misclassify images
3. Measure the attack success rate

This lab demonstrates how small, imperceptible changes can completely alter ML model predictions.`
```

#### 3. Examples (2-3 recommended)

**Show progression:**
- Example 1: Normal/benign case (everything works as expected)
- Example 2: Attack case (vulnerability demonstrated)
- Example 3: Edge case or advanced scenario (optional)

**Example:**
```typescript
examples: [
  {
    input: 'image = "cat.jpg", perturbation = 0',
    output: "Classification: Cat (99.2% confidence)",
    explanation: "Without perturbation, the model correctly identifies the image."
  },
  {
    input: 'image = "cat.jpg", perturbation = 0.01',
    output: "Classification: Dog (87.5% confidence)",
    explanation: "A tiny perturbation (1%) causes complete misclassification."
  }
]
```

#### 4. Constraints (3-5 requirements)

**Include:**
- Technical constraints (input ranges, types)
- Implementation requirements (libraries, algorithms)
- Security considerations (safe handling of inputs)
- Edge cases to consider

**Example:**
```typescript
constraints: [
  "Perturbation values must be between 0 and 1",
  "Must preserve image dimensions",
  "Should implement clipping to maintain valid pixel ranges [0, 255]",
  "Consider both L2 and L∞ norm constraints"
]
```

#### 5. Starter Code

**Best Practices:**

**Python:**
- Use type hints for all parameters and returns
- Include comprehensive docstrings (Google style)
- Provide TODO comments with hints
- Add test code in `if __name__ == "__main__"` block
- Keep it runnable (no syntax errors)

**JavaScript:**
- Use JSDoc comments
- ES6+ syntax (const, arrow functions, template literals)
- Provide console.log test cases
- Keep it clean and modern

**SQL:**
- Only include if relevant to the module
- Provide table schemas
- Use comments to explain expected approach
- If not applicable: `sql: "-- SQL not applicable for this module"`

**Starter Code Template:**
```typescript
starterCode: {
  python: `def vulnerability_function(input_data: str) -> dict:
    """
    One-line summary of what this function does

    Detailed explanation of the security concept being taught.

    Args:
        input_data: Description of the parameter

    Returns:
        Description of return value structure

    Example:
        >>> vulnerability_function("safe input")
        {'status': 'safe', 'message': 'No issues detected'}
    """
    # TODO: Implement step 1
    # Hint: Use regex to detect patterns

    # TODO: Implement step 2
    # Hint: Check against known attack signatures

    # TODO: Return result
    # Format: {'status': str, 'message': str, 'details': dict}

    pass

# Test your solution
if __name__ == "__main__":
    # Normal case
    result1 = vulnerability_function("normal query")
    print(f"Test 1: {result1}")

    # Attack case
    result2 = vulnerability_function("malicious payload")
    print(f"Test 2: {result2}")`,

  javascript: `function vulnerabilityFunction(inputData) {
    /**
     * One-line summary
     *
     * Detailed explanation
     *
     * @param {string} inputData - Description
     * @returns {Object} {status: string, message: string}
     */

    // TODO: Implementation

    return { status: 'pending', message: 'Not implemented' };
  }

  // Tests
  console.log("Test 1:", vulnerabilityFunction("safe"));
  console.log("Test 2:", vulnerabilityFunction("attack"));`
}
```

#### 6. Test Cases (3-5 recommended)

**Structure:**
```typescript
testCases: [
  {
    id: 1,
    input: { /* input object */ },
    expected: { /* expected output object */ },
    explanation: "What this test validates"
  }
]
```

**Coverage:**
- Test 1: Basic functionality (happy path)
- Test 2: Edge case (boundary conditions)
- Test 3: Attack scenario (security vulnerability)
- Test 4+: Additional complex scenarios

#### 7. Hints (3-5, progressive difficulty)

**Structure:**
1. **Conceptual** - High-level approach
2. **Algorithmic** - Specific technique or algorithm
3. **Implementation** - Code structure or key function
4. **Edge Cases** - Specific considerations
5. **Optimization** - Performance or security improvements (optional)

**Example:**
```typescript
hints: [
  "Consider using regular expressions to match common injection patterns",
  "The re.search() function in Python can perform case-insensitive matching with re.IGNORECASE",
  "Create a list of dangerous keywords and iterate through them checking if any appear in the input",
  "Don't forget to handle empty strings and None values - these are common edge cases",
  "For production code, consider using a dedicated security library like OWASP ESAPI instead of regex"
]
```

## Lab Problem Quality Checklist

Before marking a lab problem as complete, verify:

### Content Quality
- [ ] Description is clear and educational
- [ ] Examples show both safe and attack scenarios
- [ ] Constraints are specific and testable
- [ ] Hints progress from general to specific

### Code Quality
- [ ] Starter code compiles/runs without errors
- [ ] Type hints and JSDoc comments are complete
- [ ] TODOs guide the student through implementation
- [ ] Test cases in starter code demonstrate expected behavior

### Integration
- [ ] Module ID matches concept ID
- [ ] Difficulty aligns with module
- [ ] Topics include relevant security frameworks
- [ ] Exported constant follows naming convention
- [ ] Registered in index.ts

### Testing
- [ ] At least 3 test cases defined
- [ ] Test cases cover normal, edge, and attack scenarios
- [ ] Expected outputs are clear and verifiable
- [ ] Test explanations are educational

## Common Patterns by Module Type

### AI/ML Security Modules (1-10)

**Focus:** Attacks on ML systems, data manipulation, model vulnerabilities

**Common Starter Code Patterns:**
- Model simulation functions
- Attack payload generation
- Detection/defense implementations
- Data validation and sanitization

**Example Topics:**
- Prompt injection
- Adversarial examples
- Data poisoning
- Model extraction
- RAG attacks

### Traditional Hacking Modules (11-20)

**Focus:** Classic web/network security vulnerabilities

**Common Starter Code Patterns:**
- Input validation functions
- Payload generation and testing
- Security scanner implementations
- Log/data analysis

**Example Topics:**
- SQL injection
- XSS attacks
- Network scanning
- Password cracking
- Web application vulnerabilities

## File Naming Convention

```
[MODULE_ID]-[kebab-case-name].ts

Examples:
01-prompt-injection.ts          ✅ Correct
02-adversarial-ml.ts            ✅ Correct
03-data-poisoning.ts            ✅ Correct
12-sql-injection.ts             ✅ Correct

02_adversarial_ml.ts            ❌ Wrong (use hyphens, not underscores)
2-adversarial-ml.ts             ❌ Wrong (use two digits: 02)
adversarial-ml.ts               ❌ Wrong (missing module ID)
```

## Export Naming Convention

```typescript
export const [camelCaseName]Problem: Problem = { ... };

Examples:
export const promptInjectionProblem: Problem = { ... };      ✅
export const adversarialMLProblem: Problem = { ... };        ✅
export const dataPoisoningProblem: Problem = { ... };        ✅
export const sqlInjectionProblem: Problem = { ... };         ✅

export const PromptInjectionProblem: Problem = { ... };      ❌ (PascalCase)
export const prompt_injection_problem: Problem = { ... };    ❌ (snake_case)
export const problem1: Problem = { ... };                    ❌ (not descriptive)
```

## Tips for Writing Effective Labs

1. **Start with learning objectives** - What should students understand after completing this lab?

2. **Make it realistic** - Use real-world scenarios and actual attack techniques

3. **Progressive difficulty** - Start simple, build complexity through test cases

4. **Clear success criteria** - Students should know exactly what "correct" looks like

5. **Educational hints** - Don't just give the answer, teach the concept

6. **Test your own lab** - Actually implement the solution to ensure it's achievable

7. **Consider multiple approaches** - Allow students to solve it different ways

8. **Include security best practices** - Show both the vulnerability AND the defense

## Resources

- **Module Concepts:** `/src/components/concepts/detailed/`
- **Type Definitions:** `/src/types/ide.ts`
- **Existing Labs:** `01-prompt-injection.ts` (reference implementation)
- **Test Execution:** `/IDE_UIUX_Recreation/prototype/backend/` (backend code executor)

## Questions?

If you need help creating a lab problem:
1. Review the template (`_TEMPLATE.ts`)
2. Study the reference implementation (`01-prompt-injection.ts`)
3. Check the type definitions (`/src/types/ide.ts`)
4. Refer to this README

---

**Remember:** Great labs teach security concepts through hands-on practice. Focus on education, not just code execution!
