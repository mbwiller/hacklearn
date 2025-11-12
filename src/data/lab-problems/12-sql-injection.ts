import type { Problem } from '@/types/ide';

export const sqlInjectionProblem: Problem = {
  id: 12,
  title: "SQL Injection: Database Attack Detection & Prevention",
  difficulty: "Medium",
  topics: ["SQL Injection", "Web Security", "OWASP Top 10", "Input Validation"],

  description: `SQL Injection is one of the most critical web application vulnerabilities, allowing attackers to manipulate database queries through unsanitized input.

You are a security engineer building input validation for a web application. Attackers attempt SQL injection to bypass authentication, extract data, or modify database contents.

Your task is to:

1. Detect SQL injection patterns in user inputs
2. Identify the type of SQL injection attempt (auth bypass, union-based, blind, etc.)
3. Calculate injection risk scores
4. Classify the potential impact (authentication bypass, data exfiltration, data modification)
5. Recommend parameterized queries to prevent attacks

This demonstrates OWASP A03:2021 - Injection and why prepared statements are essential.`,

  examples: [
    {
      input: 'analyze_sql_input("john.doe@example.com")',
      output: '{"safe": true, "risk_score": 0.05, "injection_type": "none", "impact": "none"}',
      explanation: 'Normal email input shows no SQL injection indicators.'
    },
    {
      input: 'analyze_sql_input("admin\' OR \'1\'=\'1")',
      output: '{"safe": false, "risk_score": 0.95, "injection_type": "auth_bypass", "impact": "authentication_bypass", "patterns": ["OR", "quoted_string_manipulation"]}',
      explanation: 'Classic SQL injection for authentication bypass using OR 1=1 logic.'
    },
    {
      input: 'analyze_sql_input("\' UNION SELECT * FROM users--")',
      output: '{"safe": false, "risk_score": 0.98, "injection_type": "union_based", "impact": "data_exfiltration", "patterns": ["UNION", "SELECT", "sql_comment"]}',
      explanation: 'UNION-based SQL injection attempting to extract data from users table.'
    }
  ],

  constraints: [
    'Risk score 0.0-1.0 based on injection indicators',
    'Injection types: none, auth_bypass, union_based, blind, time_based, error_based',
    'Impact levels: none, authentication_bypass, data_exfiltration, data_modification, privilege_escalation',
    'Key patterns: OR, UNION, SELECT, DROP, --, /*, xp_, SLEEP, WAITFOR',
    'Safe if risk_score < 0.40'
  ],

  starterCode: {
    python: `def detect_sql_injection(user_input: str) -> dict:
    """
    Detect SQL injection attempts in user input

    Args:
        user_input: String to analyze for SQL injection patterns

    Returns:
        dict with injection analysis

    Example:
        >>> detect_sql_injection("admin' OR '1'='1")
        {
            'safe': False,
            'risk_score': 0.95,
            'injection_type': 'auth_bypass',
            'impact': 'authentication_bypass',
            'patterns_found': ['OR', 'quoted_string_manipulation']
        }
    """
    # SQL injection indicators with risk weights
    sql_patterns = {
        # Authentication bypass
        "' OR '": 0.40,
        "' OR 1=1": 0.45,
        "admin'--": 0.45,

        # Union-based
        'UNION': 0.35,
        'UNION SELECT': 0.50,

        # Comments (used to terminate queries)
        '--': 0.25,
        '/*': 0.25,

        # Dangerous keywords
        'DROP': 0.50,
        'DELETE': 0.45,
        'UPDATE': 0.40,
        'INSERT': 0.40,

        # Time-based blind
        'SLEEP': 0.40,
        'WAITFOR': 0.40,
        'BENCHMARK': 0.40,

        # Error-based
        'CONVERT': 0.30,
        'CAST': 0.30,

        # Stored procedures
        'xp_': 0.45,
        'sp_': 0.35
    }

    # TODO: Convert input to uppercase for case-insensitive matching

    # TODO: Calculate risk score by checking each pattern
    # Sum weights of all matching patterns, cap at 1.0

    # TODO: Identify which patterns were found

    # TODO: Classify injection type
    # auth_bypass: contains OR, admin, quotes
    # union_based: contains UNION
    # blind/time_based: contains SLEEP, WAITFOR, BENCHMARK
    # error_based: contains CONVERT, CAST
    # none: no significant patterns

    # TODO: Assess impact
    # authentication_bypass: auth bypass patterns
    # data_exfiltration: UNION, SELECT patterns
    # data_modification: DROP, DELETE, UPDATE, INSERT
    # privilege_escalation: xp_, sp_ stored procedures

    # TODO: Determine if input is safe (risk_score < 0.40)

    pass

# Test cases
if __name__ == "__main__":
    print("Test 1: Safe input")
    print(detect_sql_injection("john.doe@example.com"))

    print("\\nTest 2: Auth bypass")
    print(detect_sql_injection("admin' OR '1'='1"))

    print("\\nTest 3: Union-based injection")
    print(detect_sql_injection("' UNION SELECT * FROM users--"))`,

    javascript: `function detectSQLInjection(userInput) {
    /**
     * Detect SQL injection attempts in user input
     */

    const sqlPatterns = {
        "' OR '": 0.40,
        "' OR 1=1": 0.45,
        "admin'--": 0.45,
        'UNION': 0.35,
        'UNION SELECT': 0.50,
        '--': 0.25,
        '/*': 0.25,
        'DROP': 0.50,
        'DELETE': 0.45,
        'SLEEP': 0.40,
        'WAITFOR': 0.40
    };

    // TODO: Implement detection logic

    return {
        safe: true,
        riskScore: 0.0,
        injectionType: 'none',
        impact: 'none',
        patternsFound: []
    };
}

console.log("Test 1: Safe input");
console.log(detectSQLInjection("john.doe@example.com"));

console.log("\\nTest 2: Auth bypass");
console.log(detectSQLInjection("admin' OR '1'='1"));`,

    sql: `-- Example: SQL injection vulnerability (DO NOT USE IN PRODUCTION)
-- Vulnerable query (concatenation):
SELECT * FROM users WHERE username = 'USER_INPUT' AND password = 'PASSWORD';

-- Attack: admin' OR '1'='1'--
-- Results in: SELECT * FROM users WHERE username = 'admin' OR '1'='1'-- AND password = ''

-- SECURE APPROACH: Use parameterized queries
-- SELECT * FROM users WHERE username = ? AND password = ?
-- Parameters are properly escaped, preventing injection`
  },

  testCases: [
    {
      input: 'john.doe@example.com',
      expected: '{"safe": true, "risk_score": 0.05, "injection_type": "none", "impact": "none"}',
      explanation: 'Normal email address with no SQL injection patterns.'
    },
    {
      input: "admin' OR '1'='1",
      expected: '{"safe": false, "risk_score": 0.95, "injection_type": "auth_bypass", "impact": "authentication_bypass"}',
      explanation: 'Classic authentication bypass SQL injection.'
    },
    {
      input: "' UNION SELECT * FROM users--",
      expected: '{"safe": false, "risk_score": 0.98, "injection_type": "union_based", "impact": "data_exfiltration"}',
      explanation: 'UNION-based injection for data extraction.'
    }
  ],

  hints: [
    'Convert input to uppercase for case-insensitive pattern matching: input_upper = user_input.upper().',

    'Iterate through sql_patterns and check if each pattern (also uppercased) is in the input. Sum the weights.',

    'Classify injection type by checking dominant patterns: if "UNION" in input → union_based, if "OR" and quotes → auth_bypass.',

    'Impact assessment: look for keywords like SELECT/UNION (exfiltration), DROP/DELETE (modification), xp_/sp_ (escalation).',

    'Safe threshold is 0.40. Return comprehensive dictionary with all fields required by test cases.'
  ]
};
