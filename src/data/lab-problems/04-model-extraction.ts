import type { Problem } from '@/types/ide';

/**
 * Module 4: Model Extraction Lab
 *
 * This lab teaches students how model extraction attacks work by simulating
 * black-box querying and substitute model training.
 */

export const modelExtractionProblem: Problem = {
  // ============================================================================
  // BASIC INFORMATION
  // ============================================================================

  id: 4,
  title: "Model Extraction: Black-Box API Stealing",
  difficulty: "Advanced",
  topics: ["AI Security", "Model Theft", "OWASP LLM10", "MLaaS Security"],

  // ============================================================================
  // PROBLEM DESCRIPTION
  // ============================================================================

  description: `Model extraction attacks allow adversaries to steal proprietary ML models by strategically querying them as black-box APIs.

You are a security researcher auditing an MLaaS (Machine Learning as a Service) platform. The platform exposes a proprietary image classification model via API. Your task is to simulate how an attacker could extract this model's functionality.

Your task is to:

1. Simulate strategic querying of a black-box model
2. Collect query-response pairs as synthetic training data
3. Calculate extraction efficiency (model fidelity vs query count)
4. Compare random querying vs active learning approaches
5. Estimate the cost and feasibility of model theft

This lab demonstrates why API rate limiting, query monitoring, and watermarking are critical for MLaaS platforms. Attackers can achieve 85-95% model fidelity with surprisingly few queries using active learning.`,

  // ============================================================================
  // EXAMPLES
  // ============================================================================

  examples: [
    {
      input: 'extract_model(queries=100, strategy="random")',
      output: '{"queries_used": 100, "model_fidelity": 0.42, "extraction_cost": "$0.10", "success": false}',
      explanation: 'Random querying with only 100 samples achieves poor fidelity (42%). This approach is inefficient and unlikely to successfully replicate the model.'
    },
    {
      input: 'extract_model(queries=1000, strategy="active_learning")',
      output: '{"queries_used": 1000, "model_fidelity": 0.87, "extraction_cost": "$1.00", "success": true}',
      explanation: 'Active learning with 1000 strategic queries achieves 87% fidelity—enough to steal core functionality. At $0.001/query, this costs only $1.00.'
    },
    {
      input: 'extract_model(queries=10000, strategy="active_learning")',
      output: '{"queries_used": 10000, "model_fidelity": 0.96, "extraction_cost": "$10.00", "success": true}',
      explanation: 'With 10,000 queries, active learning achieves 96% fidelity—nearly perfect replication of a model that may have cost millions to develop, for just $10.'
    }
  ],

  // ============================================================================
  // CONSTRAINTS
  // ============================================================================

  constraints: [
    'Query count must be between 10 and 100,000',
    'Strategy must be "random" or "active_learning"',
    'Model fidelity ranges from 0.0 to 1.0 (0% to 100% match)',
    'Success threshold: fidelity ≥ 0.85 (85% match)',
    'Query cost: $0.001 per query (typical MLaaS pricing)',
    'Active learning is 3-5x more efficient than random sampling',
    'Consider diminishing returns: more queries → smaller fidelity gains'
  ],

  // ============================================================================
  // STARTER CODE
  // ============================================================================

  starterCode: {
    python: `def simulate_model_extraction(queries: int, strategy: str) -> dict:
    """
    Simulate model extraction attack on MLaaS API

    This function demonstrates how attackers can recreate proprietary models
    by strategically querying them and training substitute models.

    Args:
        queries: Number of API queries to use (10 to 100,000)
        strategy: Query strategy - "random" or "active_learning"

    Returns:
        dict with:
            - queries_used: int
            - model_fidelity: float (0.0 to 1.0)
            - extraction_cost: str (formatted dollar amount)
            - attack_efficiency: str (queries per 0.1 fidelity gain)
            - success: bool (fidelity >= 0.85)
            - theft_viability: str (assessment of attack success)

    Example:
        >>> simulate_model_extraction(1000, "active_learning")
        {
            'queries_used': 1000,
            'model_fidelity': 0.87,
            'extraction_cost': '$1.00',
            'attack_efficiency': '115 queries per 0.1 fidelity',
            'success': True,
            'theft_viability': 'highly_viable'
        }
    """
    # Constants
    COST_PER_QUERY = 0.001  # $0.001 per API call
    SUCCESS_THRESHOLD = 0.85  # 85% fidelity = successful theft

    # TODO: Validate inputs
    # Queries must be between 10 and 100,000
    # Strategy must be "random" or "active_learning"

    # TODO: Calculate model fidelity based on strategy
    #
    # Random strategy:
    #   - Less efficient, needs more queries for same fidelity
    #   - Formula: fidelity = 0.3 * log10(queries) / 2.5
    #   - Example: 100 queries → ~40%, 1000 queries → ~50%
    #
    # Active learning strategy:
    #   - 3-5x more efficient, focuses on decision boundaries
    #   - Formula: fidelity = 0.5 * log10(queries) / 2.0
    #   - Example: 100 queries → ~50%, 1000 queries → ~87%
    #
    # Cap fidelity at 0.98 (perfect extraction is rare)
    # Use min(calculated_fidelity, 0.98)

    # TODO: Calculate extraction cost
    # Cost = queries * COST_PER_QUERY
    # Format as string: f"${cost:.2f}"

    # TODO: Calculate attack efficiency
    # Efficiency = queries needed per 0.1 fidelity gain
    # Formula: queries / (fidelity * 10)
    # Format as string: f"{efficiency:.0f} queries per 0.1 fidelity"

    # TODO: Determine if attack was successful
    # Success if fidelity >= SUCCESS_THRESHOLD (0.85)

    # TODO: Assess theft viability
    # Categories based on fidelity:
    # - <0.50: "not_viable" (poor replication)
    # - 0.50-0.70: "marginally_viable" (basic functionality)
    # - 0.70-0.85: "viable" (good approximation)
    # - 0.85-0.95: "highly_viable" (strong replication)
    # - ≥0.95: "near_perfect" (almost exact copy)

    # TODO: Return comprehensive analysis dictionary

    pass

# Test your solution
if __name__ == "__main__":
    print("Test 1: Random strategy with minimal queries")
    result1 = simulate_model_extraction(100, "random")
    print(f"Result: {result1}\\n")

    print("Test 2: Active learning with moderate queries")
    result2 = simulate_model_extraction(1000, "active_learning")
    print(f"Result: {result2}\\n")

    print("Test 3: Active learning with extensive queries")
    result3 = simulate_model_extraction(10000, "active_learning")
    print(f"Result: {result3}\\n")

    print("Test 4: Comparison - same queries, different strategies")
    result4a = simulate_model_extraction(5000, "random")
    result4b = simulate_model_extraction(5000, "active_learning")
    print(f"Random (5000): Fidelity {result4a['model_fidelity']:.2f}")
    print(f"Active (5000): Fidelity {result4b['model_fidelity']:.2f}")`,

    javascript: `function simulateModelExtraction(queries, strategy) {
    /**
     * Simulate model extraction attack on MLaaS API
     *
     * @param {number} queries - Number of API queries (10 to 100,000)
     * @param {string} strategy - "random" or "active_learning"
     * @returns {Object} Extraction results with fidelity and cost analysis
     *
     * @example
     * simulateModelExtraction(1000, "active_learning")
     * // Returns: {
     * //   queriesUsed: 1000,
     * //   modelFidelity: 0.87,
     * //   extractionCost: '$1.00',
     * //   attackEfficiency: '115 queries per 0.1 fidelity',
     * //   success: true,
     * //   theftViability: 'highly_viable'
     * // }
     */

    const COST_PER_QUERY = 0.001;
    const SUCCESS_THRESHOLD = 0.85;

    // TODO: Validate inputs

    // TODO: Calculate model fidelity
    // Use logarithmic formulas based on strategy
    // Random: less efficient
    // Active learning: 3-5x more efficient

    // TODO: Calculate extraction cost

    // TODO: Calculate attack efficiency

    // TODO: Determine success

    // TODO: Assess theft viability

    return {
        queriesUsed: queries,
        modelFidelity: 0.0,
        extractionCost: '$0.00',
        attackEfficiency: '0 queries per 0.1 fidelity',
        success: false,
        theftViability: 'not_viable'
    };
}

// Test your solution
console.log("Test 1: Random strategy with minimal queries");
const result1 = simulateModelExtraction(100, "random");
console.log("Result:", result1);
console.log();

console.log("Test 2: Active learning with moderate queries");
const result2 = simulateModelExtraction(1000, "active_learning");
console.log("Result:", result2);
console.log();

console.log("Test 3: Active learning with extensive queries");
const result3 = simulateModelExtraction(10000, "active_learning");
console.log("Result:", result3);
console.log();

console.log("Test 4: Strategy comparison (5000 queries each)");
const result4a = simulateModelExtraction(5000, "random");
const result4b = simulateModelExtraction(5000, "active_learning");
console.log(\`Random (5000): Fidelity \${result4a.modelFidelity.toFixed(2)}\`);
console.log(\`Active (5000): Fidelity \${result4b.modelFidelity.toFixed(2)}\`);`,

    sql: `-- SQL not applicable for this model extraction simulation module
-- This lab focuses on algorithmic analysis of query strategies`
  },

  // ============================================================================
  // TEST CASES
  // ============================================================================

  testCases: [
    {
      id: 1,
      input: {
        queries: 100,
        strategy: 'random'
      },
      expected: {
        queriesUsed: 100,
        modelFidelityRange: [0.35, 0.50],
        extractionCost: '$0.10',
        success: false,
        theftViability: 'not_viable'
      },
      explanation: 'Minimal random querying achieves poor fidelity (<50%). This demonstrates why unsophisticated attacks fail—random sampling is inefficient at capturing decision boundaries.'
    },
    {
      id: 2,
      input: {
        queries: 1000,
        strategy: 'active_learning'
      },
      expected: {
        queriesUsed: 1000,
        modelFidelityRange: [0.85, 0.90],
        extractionCost: '$1.00',
        success: true,
        theftViability: 'highly_viable'
      },
      explanation: 'Active learning with 1000 queries crosses the success threshold (≥85%). This shows how strategic querying can steal proprietary models for as little as $1—a model that may have cost millions to develop.'
    },
    {
      id: 3,
      input: {
        queries: 10000,
        strategy: 'active_learning'
      },
      expected: {
        queriesUsed: 10000,
        modelFidelityRange: [0.94, 0.98],
        extractionCost: '$10.00',
        success: true,
        theftViability: 'near_perfect'
      },
      explanation: 'With 10,000 strategic queries, attackers achieve near-perfect model replication (94-98% fidelity). This demonstrates the severe economic threat of model extraction: intellectual property worth millions stolen for pocket change.'
    }
  ],

  // ============================================================================
  // HINTS (Progressive Difficulty)
  // ============================================================================

  hints: [
    'Model fidelity follows logarithmic growth: early queries provide large gains, later queries have diminishing returns. Use log10(queries) as the base for your formulas.',

    'For random strategy, use: fidelity = 0.3 * log10(queries) / 2.5. This gives ~40% for 100 queries, ~50% for 1000 queries. For active learning, use: fidelity = 0.5 * log10(queries) / 2.0, giving ~50% for 100 queries, ~87% for 1000 queries.',

    'Calculate attack efficiency by dividing queries by (fidelity * 10). This tells you how many queries are needed per 0.1 fidelity gain. Lower is better. Active learning should show much better efficiency than random.',

    'Theft viability categories: Use fidelity thresholds—<0.50: not viable, 0.50-0.70: marginally viable, 0.70-0.85: viable, 0.85-0.95: highly viable, ≥0.95: near perfect. This helps assess the real-world threat level.',

    'Cap maximum fidelity at 0.98 using min(calculated_fidelity, 0.98). Perfect extraction is rare due to noise, model complexity, and query limitations. This makes the simulation realistic.'
  ]
};
