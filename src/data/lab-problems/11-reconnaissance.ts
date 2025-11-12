import type { Problem } from '@/types/ide';

export const reconnaissanceProblem: Problem = {
  id: 11,
  title: "Reconnaissance: Information Gathering & Footprinting",
  difficulty: "Easy",
  topics: ["Reconnaissance", "OSINT", "Information Gathering", "Footprinting"],

  description: `Reconnaissance is the first phase of ethical hacking where you gather information about a target system without directly interacting with it.

You are a penetration tester conducting passive reconnaissance on a target organization. Your goal is to collect publicly available information (OSINT) that could be useful in later attack phases.

Your task is to:

1. Simulate DNS lookups to discover subdomains and IP addresses
2. Extract email addresses and employee names from public data
3. Identify technologies used by the target (web servers, frameworks)
4. Calculate a "reconnaissance completeness" score
5. Flag potential security exposures found during reconnaissance

This lab teaches why organizations must limit their digital footprint and public exposure.`,

  examples: [
    {
      input: 'recon_scan("example.com", depth="shallow")',
      output: '{"subdomains": 3, "emails": 2, "technologies": ["Apache", "PHP"], "completeness": 0.35, "exposures": []}',
      explanation: 'Shallow scan finds basic information with minimal exposure detection.'
    },
    {
      input: 'recon_scan("vulnerable-corp.com", depth="deep")',
      output: '{"subdomains": 12, "emails": 47, "technologies": ["nginx", "React", "PostgreSQL"], "completeness": 0.82, "exposures": ["exposed_admin_panel", "directory_listing", "email_harvesting_risk"]}',
      explanation: 'Deep scan reveals significant information leakage and multiple security exposures that attackers could exploit.'
    }
  ],

  constraints: [
    'Completeness score: 0.0 to 1.0 based on information gathered',
    'Depth levels: "shallow" (basic DNS), "medium" (subdomains + tech), "deep" (full OSINT)',
    'Common exposures: exposed_admin_panel, directory_listing, email_harvesting_risk, backup_files_visible',
    'Technologies should be extracted from simulated HTTP headers',
    'Email count impacts completeness: each 10 emails adds 0.1 to score (max 0.5 from emails)'
  ],

  starterCode: {
    python: `def perform_reconnaissance(domain: str, depth: str = "medium") -> dict:
    """
    Simulate reconnaissance and information gathering on a target domain

    Args:
        domain: Target domain to investigate
        depth: Reconnaissance depth - "shallow", "medium", or "deep"

    Returns:
        dict with reconnaissance results

    Example:
        >>> perform_reconnaissance("example.com", "deep")
        {
            'domain': 'example.com',
            'subdomains': 8,
            'emails': 23,
            'technologies': ['nginx', 'Node.js', 'MongoDB'],
            'completeness': 0.72,
            'exposures': ['directory_listing', 'email_harvesting_risk']
        }
    """
    # Simulated reconnaissance data for different domains
    domain_data = {
        'example.com': {
            'subdomains': ['www', 'mail', 'ftp'],
            'emails': ['info@example.com', 'support@example.com'],
            'tech_stack': ['Apache', 'PHP', 'MySQL']
        },
        'vulnerable-corp.com': {
            'subdomains': ['www', 'admin', 'dev', 'staging', 'api', 'mail', 'vpn', 'ftp', 'test', 'backup', 'old', 'legacy'],
            'emails': [f'user{i}@vulnerable-corp.com' for i in range(1, 48)],
            'tech_stack': ['nginx', 'React', 'PostgreSQL', 'Redis']
        },
        'secure-bank.com': {
            'subdomains': ['www', 'mail'],
            'emails': ['contact@secure-bank.com'],
            'tech_stack': ['CloudFlare', 'Unknown Backend']
        }
    }

    # TODO: Validate depth parameter
    # Must be "shallow", "medium", or "deep"

    # TODO: Get domain data or return minimal results for unknown domains

    # TODO: Apply depth filtering
    # shallow: only subdomains
    # medium: subdomains + technologies
    # deep: all information

    # TODO: Calculate completeness score
    # Base score from subdomain count: min(subdomain_count / 10, 0.3)
    # Email score: min(email_count / 10 * 0.1, 0.5)
    # Technology score: min(tech_count / 5 * 0.2, 0.2)

    # TODO: Detect exposures based on findings
    # - exposed_admin_panel: if 'admin' in subdomains
    # - directory_listing: if subdomain_count > 8
    # - email_harvesting_risk: if email_count > 20
    # - backup_files_visible: if 'backup' or 'old' in subdomains

    pass

# Test cases
if __name__ == "__main__":
    print("Test 1: Shallow scan")
    print(perform_reconnaissance("example.com", "shallow"))

    print("\\nTest 2: Deep scan on vulnerable target")
    print(perform_reconnaissance("vulnerable-corp.com", "deep"))

    print("\\nTest 3: Secure target")
    print(perform_reconnaissance("secure-bank.com", "deep"))`,

    javascript: `function performReconnaissance(domain, depth = "medium") {
    /**
     * Simulate reconnaissance and information gathering on a target domain
     *
     * @param {string} domain - Target domain to investigate
     * @param {string} depth - Reconnaissance depth: "shallow", "medium", or "deep"
     * @returns {Object} Reconnaissance results
     */

    const domainData = {
        'example.com': {
            subdomains: ['www', 'mail', 'ftp'],
            emails: ['info@example.com', 'support@example.com'],
            techStack: ['Apache', 'PHP', 'MySQL']
        },
        'vulnerable-corp.com': {
            subdomains: ['www', 'admin', 'dev', 'staging', 'api', 'mail', 'vpn', 'ftp', 'test', 'backup', 'old', 'legacy'],
            emails: Array.from({length: 47}, (_, i) => \`user\${i+1}@vulnerable-corp.com\`),
            techStack: ['nginx', 'React', 'PostgreSQL', 'Redis']
        },
        'secure-bank.com': {
            subdomains: ['www', 'mail'],
            emails: ['contact@secure-bank.com'],
            techStack: ['CloudFlare', 'Unknown Backend']
        }
    };

    // TODO: Implement reconnaissance logic

    return {
        domain: domain,
        subdomains: 0,
        emails: 0,
        technologies: [],
        completeness: 0.0,
        exposures: []
    };
}

// Test cases
console.log("Test 1: Shallow scan");
console.log(performReconnaissance("example.com", "shallow"));

console.log("\\nTest 2: Deep scan on vulnerable target");
console.log(performReconnaissance("vulnerable-corp.com", "deep"));`,

    sql: `-- SQL not applicable for reconnaissance
-- This lab focuses on OSINT and network reconnaissance`
  },

  testCases: [
    {
      input: '{"domain": "example.com", "depth": "shallow"}',
      expected: '{"domain": "example.com", "subdomains": 3, "emails": 0, "technologies": [], "completeness": 0.30, "exposures": []}',
      explanation: 'Shallow scan returns only subdomain count, no other details.'
    },
    {
      input: '{"domain": "vulnerable-corp.com", "depth": "deep"}',
      expected: '{"domain": "vulnerable-corp.com", "subdomains": 12, "emails": 47, "technologies": ["nginx", "React", "PostgreSQL", "Redis"], "completeness": 0.82, "exposures": ["exposed_admin_panel", "directory_listing", "email_harvesting_risk", "backup_files_visible"]}',
      explanation: 'Deep scan reveals extensive information and multiple security exposures.'
    },
    {
      input: '{"domain": "secure-bank.com", "depth": "deep"}',
      expected: '{"domain": "secure-bank.com", "subdomains": 2, "emails": 1, "technologies": ["CloudFlare", "Unknown Backend"], "completeness": 0.46, "exposures": []}',
      explanation: 'Well-secured organization with minimal public exposure and obfuscated backend.'
    }
  ],

  hints: [
    'Start by validating the depth parameter. Invalid depths should raise an error or default to "medium".',

    'Use the domain_data dictionary to look up information. For unknown domains, return minimal results (1 subdomain, 0 emails, etc.).',

    'Apply depth filtering: shallow shows only subdomains, medium adds technologies, deep includes all information.',

    'Calculate completeness incrementally: subdomain_score (max 0.3) + email_score (max 0.5) + tech_score (max 0.2) = total (max 1.0).',

    'Detect exposures by checking conditions: "admin" subdomain → exposed_admin_panel, >8 subdomains → directory_listing, >20 emails → email_harvesting_risk.'
  ]
};
