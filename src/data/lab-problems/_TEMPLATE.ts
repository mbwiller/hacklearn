import type { Problem } from '@/types/ide';

/**
 * LAB PROBLEM TEMPLATE
 *
 * This template provides the structure for creating interactive lab exercises.
 *
 * INSTRUCTIONS FOR USE:
 * 1. Copy this file and rename it to match the module (e.g., 02-adversarial-ml.ts)
 * 2. Replace ALL "REPLACE:" placeholders with actual content
 * 3. Update the exported constant name (templateModuleProblem → yourModuleProblem)
 * 4. Search for "REPLACE:" and fill in all required information
 * 5. Export and register in index.ts
 */

export const templateModuleProblem: Problem = {
  // ============================================================================
  // BASIC INFORMATION
  // ============================================================================

  id: 99, // REPLACE: Module ID (2-20)
  title: "REPLACE: Module Title - Specific Challenge",
  difficulty: "Medium", // REPLACE: Easy | Medium | Hard
  topics: ["REPLACE: Topic 1", "REPLACE: Topic 2", "REPLACE: OWASP Category"],

  // ============================================================================
  // PROBLEM DESCRIPTION
  // ============================================================================

  description: `REPLACE: Clear, educational description of the lab challenge

REPLACE: Scenario - describe the real-world context

Your task is to:

1. REPLACE: First objective
2. REPLACE: Second objective
3. REPLACE: Third objective

REPLACE: Additional context or background information`,

  // ============================================================================
  // EXAMPLES
  // ============================================================================

  examples: [
    {
      input: 'REPLACE: Example input 1 - normal/safe case',
      output: 'REPLACE: Expected output 1',
      explanation: 'REPLACE: Why this is the expected result'
    },
    {
      input: 'REPLACE: Example input 2 - edge case or attack case',
      output: 'REPLACE: Expected output 2',
      explanation: 'REPLACE: Explanation of this behavior'
    },
    {
      input: 'REPLACE: Example input 3 - complex case (optional)',
      output: 'REPLACE: Expected output 3',
      explanation: 'REPLACE: Additional insights'
    }
  ],

  // ============================================================================
  // CONSTRAINTS
  // ============================================================================

  constraints: [
    'REPLACE: Technical constraint 1 - e.g., Input will be a string of length 1-1000',
    'REPLACE: Implementation requirement 2 - e.g., Must use Python regex library',
    'REPLACE: Security consideration 3 - e.g., Should handle malicious inputs safely',
    'REPLACE: Edge case consideration 4 - e.g., Consider empty input and special characters'
  ],

  // ============================================================================
  // STARTER CODE
  // ============================================================================

  starterCode: {
    // ------------------------------------------------------------------------
    // PYTHON
    // ------------------------------------------------------------------------
    python: `def function_name(input_param: str) -> dict:
    """
    REPLACE: Clear function docstring

    Args:
        input_param: REPLACE: Parameter description

    Returns:
        REPLACE: Return value description

    Example:
        >>> function_name("example input")
        REPLACE: example output
    """
    # TODO: Implement your solution here
    #
    # Hints:
    # - REPLACE: Implementation hint 1
    # - REPLACE: Implementation hint 2
    # - REPLACE: Implementation hint 3

    pass

# Test your solution
if __name__ == "__main__":
    # Test case 1: REPLACE: Description
    result1 = function_name("test input 1")
    print(f"Test 1: {result1}")

    # Test case 2: REPLACE: Description
    result2 = function_name("test input 2")
    print(f"Test 2: {result2}")

    # Test case 3: REPLACE: Description
    result3 = function_name("test input 3")
    print(f"Test 3: {result3}")`,

    // ------------------------------------------------------------------------
    // JAVASCRIPT
    // ------------------------------------------------------------------------
    javascript: `function functionName(inputParam) {
    /**
     * REPLACE: Clear function description
     *
     * @param {string} inputParam - REPLACE: Parameter description
     * @returns {Object} REPLACE: Return value description
     *
     * @example
     * functionName("example input")
     * // Returns: REPLACE: example output
     */

    // TODO: Implement your solution here
    //
    // Hints:
    // - REPLACE: Implementation hint 1
    // - REPLACE: Implementation hint 2
    // - REPLACE: Implementation hint 3
}

// Test your solution
// Test case 1: REPLACE: Description
const result1 = functionName("test input 1");
console.log("Test 1:", result1);

// Test case 2: REPLACE: Description
const result2 = functionName("test input 2");
console.log("Test 2:", result2);

// Test case 3: REPLACE: Description
const result3 = functionName("test input 3");
console.log("Test 3:", result3);`,

    // ------------------------------------------------------------------------
    // SQL (if applicable to this module)
    // ------------------------------------------------------------------------
    sql: `-- REPLACE: SQL description
--
-- Scenario: REPLACE: Database scenario
--
-- Available Tables:
-- REPLACE: Table definitions
--
-- Your Task:
-- REPLACE: SQL task description

-- TODO: Write your SQL query here

SELECT *
FROM table_name
WHERE condition;

-- Note: If SQL is not applicable to this security module, use:
-- SQL not applicable for this module
`
  },

  // ============================================================================
  // TEST CASES
  // ============================================================================

  testCases: [
    {
      id: 1,
      input: {
        // REPLACE: Test input object structure
        param1: 'value1',
      },
      expected: {
        // REPLACE: Expected output object structure
        result: 'expected value',
      },
      explanation: 'REPLACE: What this test validates'
    },
    {
      id: 2,
      input: {
        param1: 'edge case value',
      },
      expected: {
        result: 'expected edge case result',
      },
      explanation: 'REPLACE: Edge case explanation'
    },
    {
      id: 3,
      input: {
        param1: 'attack/complex case value',
      },
      expected: {
        result: 'expected attack handling result',
      },
      explanation: 'REPLACE: Attack case explanation'
    }
  ],

  // ============================================================================
  // HINTS (Progressive Difficulty)
  // ============================================================================

  hints: [
    'REPLACE: Hint 1 - General approach or conceptual guidance',
    'REPLACE: Hint 2 - Specific technique or algorithm to use',
    'REPLACE: Hint 3 - Implementation detail or code structure',
    'REPLACE: Hint 4 - Edge case consideration',
    'REPLACE: Hint 5 - Security best practice or optimization (optional)'
  ]
};

// ============================================================================
// INTEGRATION CHECKLIST
// ============================================================================
/*
 * Before considering this lab problem complete, verify:
 *
 * ✓ Module ID matches the concept ID from concepts.tsx
 * ✓ Title clearly describes the specific challenge
 * ✓ Difficulty aligns with module complexity
 * ✓ Topics include relevant security frameworks (OWASP, MITRE, etc.)
 * ✓ Description provides educational context
 * ✓ Examples show both normal and attack scenarios
 * ✓ Constraints are clear and testable
 * ✓ Starter code compiles/runs without errors
 * ✓ Test cases cover normal, edge, and attack scenarios
 * ✓ Hints progress from general to specific
 * ✓ Exported constant name matches file naming convention
 * ✓ Registered in index.ts with proper import
 */
