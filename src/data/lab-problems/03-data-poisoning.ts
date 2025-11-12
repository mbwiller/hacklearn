import type { Problem } from '@/types/ide';

/**
 * Module 3: Data Poisoning Lab
 *
 * This lab teaches students how data poisoning attacks work by simulating
 * the injection of malicious training data and measuring its impact.
 */

export const dataPoisoningProblem: Problem = {
  // ============================================================================
  // BASIC INFORMATION
  // ============================================================================

  id: 3,
  title: "Data Poisoning: Training Dataset Backdoor Injection",
  difficulty: "Medium",
  topics: ["AI Security", "Data Poisoning", "OWASP LLM03", "Backdoor Attacks"],

  // ============================================================================
  // PROBLEM DESCRIPTION
  // ============================================================================

  description: `Data poisoning attacks compromise machine learning models by injecting malicious data during the training phase.

You are a security researcher auditing an ML training pipeline. The organization uses crowdsourced data, which creates vulnerabilities for data poisoning attacks. Your task is to simulate and detect these attacks.

Your task is to:

1. Simulate a clean training dataset with labeled examples
2. Inject poisoned data samples with either mislabeling or backdoor triggers
3. Calculate the poisoning rate (percentage of corrupted data)
4. Measure accuracy degradation and backdoor effectiveness
5. Implement basic detection heuristics

This lab demonstrates why data provenance and validation are critical in ML systems. Even contaminating 0.1% of training data can significantly impact model behavior, especially with targeted backdoor attacks.`,

  // ============================================================================
  // EXAMPLES
  // ============================================================================

  examples: [
    {
      input: 'poison_dataset(clean_samples=1000, poisoned_samples=0, attack_type="none")',
      output: '{"total": 1000, "poisoned": 0, "poisoning_rate": 0.0, "estimated_accuracy": 0.95, "backdoor_success": 0.0}',
      explanation: 'Clean baseline: 1000 samples with no poisoning results in normal model accuracy (~95%) and no backdoor attacks.'
    },
    {
      input: 'poison_dataset(clean_samples=1000, poisoned_samples=10, attack_type="mislabel")',
      output: '{"total": 1010, "poisoned": 10, "poisoning_rate": 0.0099, "estimated_accuracy": 0.91, "backdoor_success": 0.0}',
      explanation: 'Mislabeling attack: Just 1% poisoning (10/1010 samples) causes 4% accuracy drop. This is an indiscriminate availability attack.'
    },
    {
      input: 'poison_dataset(clean_samples=1000, poisoned_samples=5, attack_type="backdoor")',
      output: '{"total": 1005, "poisoned": 5, "poisoning_rate": 0.005, "estimated_accuracy": 0.949, "backdoor_success": 0.87}',
      explanation: 'Backdoor attack: Only 0.5% poisoning (5/1005 samples) maintains normal accuracy but creates 87% backdoor success rate—extremely dangerous!'
    }
  ],

  // ============================================================================
  // CONSTRAINTS
  // ============================================================================

  constraints: [
    'Clean samples must be at least 100 (realistic dataset size)',
    'Poisoned samples can range from 0 to 50% of total dataset',
    'Poisoning rate = poisoned_samples / total_samples',
    'Mislabeling attacks decrease overall accuracy proportionally',
    'Backdoor attacks maintain high accuracy but have high trigger success',
    'Detection threshold: poisoning rate >5% is usually detectable',
    'Consider that even 0.1-1% poisoning can be highly effective'
  ],

  // ============================================================================
  // STARTER CODE
  // ============================================================================

  starterCode: {
    python: `def analyze_data_poisoning(clean_samples: int, poisoned_samples: int, attack_type: str) -> dict:
    """
    Simulate data poisoning attack and measure impact on model training

    This function demonstrates how different types of data poisoning
    (mislabeling vs backdoor) affect model performance differently.

    Args:
        clean_samples: Number of legitimate training samples (min 100)
        poisoned_samples: Number of injected malicious samples
        attack_type: Type of attack - "none", "mislabel", or "backdoor"

    Returns:
        dict with:
            - total_samples: int
            - poisoned_samples: int
            - poisoning_rate: float (0.0 to 1.0)
            - estimated_accuracy: float (model accuracy on clean data)
            - backdoor_success_rate: float (trigger activation success)
            - attack_effectiveness: str (severity rating)
            - detection_difficulty: str (easy/medium/hard)

    Example:
        >>> analyze_data_poisoning(1000, 10, "mislabel")
        {
            'total_samples': 1010,
            'poisoned_samples': 10,
            'poisoning_rate': 0.0099,
            'estimated_accuracy': 0.91,
            'backdoor_success_rate': 0.0,
            'attack_effectiveness': 'moderate',
            'detection_difficulty': 'easy'
        }
    """
    # Baseline model accuracy on clean data (typical for well-trained models)
    baseline_accuracy = 0.95

    # TODO: Calculate total samples
    # Hint: total = clean_samples + poisoned_samples

    # TODO: Calculate poisoning rate
    # Hint: rate = poisoned_samples / total_samples
    # Handle edge case: if total_samples == 0

    # TODO: Calculate estimated accuracy based on attack type
    # Mislabeling: Each mislabeled sample reduces accuracy
    #   Formula: accuracy = baseline * (1 - poisoning_rate * severity_factor)
    #   Use severity_factor between 2-5 for mislabeling
    # Backdoor: Minimal accuracy impact (use baseline_accuracy - small_penalty)
    # None: Use baseline_accuracy

    # TODO: Calculate backdoor success rate
    # Only applies if attack_type == "backdoor"
    # Success rate should be high even with low poisoning rate
    # Formula: success = min(0.95, poisoning_rate * effectiveness_multiplier)
    # Use effectiveness_multiplier between 100-200

    # TODO: Determine attack effectiveness
    # Consider both accuracy drop and backdoor success
    # Categories: "none", "low", "moderate", "high", "critical"

    # TODO: Determine detection difficulty
    # Low poisoning rate (<1%): "hard"
    # Medium rate (1-5%): "medium"
    # High rate (>5%): "easy"

    # TODO: Return comprehensive analysis dictionary

    pass

# Test your solution
if __name__ == "__main__":
    print("Test 1: Clean baseline (no attack)")
    result1 = analyze_data_poisoning(1000, 0, "none")
    print(f"Result: {result1}\\n")

    print("Test 2: Mislabeling attack (1% poisoning)")
    result2 = analyze_data_poisoning(1000, 10, "mislabel")
    print(f"Result: {result2}\\n")

    print("Test 3: Backdoor attack (0.5% poisoning)")
    result3 = analyze_data_poisoning(1000, 5, "backdoor")
    print(f"Result: {result3}\\n")

    print("Test 4: Severe mislabeling (10% poisoning)")
    result4 = analyze_data_poisoning(1000, 111, "mislabel")
    print(f"Result: {result4}")`,

    javascript: `function analyzeDataPoisoning(cleanSamples, poisonedSamples, attackType) {
    /**
     * Simulate data poisoning attack and measure impact
     *
     * @param {number} cleanSamples - Number of legitimate training samples
     * @param {number} poisonedSamples - Number of injected malicious samples
     * @param {string} attackType - "none", "mislabel", or "backdoor"
     * @returns {Object} Analysis results including poisoning rate and impact
     *
     * @example
     * analyzeDataPoisoning(1000, 10, "mislabel")
     * // Returns: {
     * //   totalSamples: 1010,
     * //   poisonedSamples: 10,
     * //   poisoningRate: 0.0099,
     * //   estimatedAccuracy: 0.91,
     * //   backdoorSuccessRate: 0.0,
     * //   attackEffectiveness: 'moderate',
     * //   detectionDifficulty: 'easy'
     * // }
     */

    const baselineAccuracy = 0.95;

    // TODO: Calculate total samples

    // TODO: Calculate poisoning rate (handle division by zero)

    // TODO: Calculate estimated accuracy based on attack type
    // - "none": baseline accuracy
    // - "mislabel": reduced accuracy proportional to poisoning rate
    // - "backdoor": minimal accuracy impact

    // TODO: Calculate backdoor success rate
    // Only relevant for backdoor attacks
    // High success even with low poisoning rate

    // TODO: Determine attack effectiveness
    // Based on accuracy drop and backdoor success

    // TODO: Determine detection difficulty
    // Based on poisoning rate thresholds

    return {
        totalSamples: 0,
        poisonedSamples: 0,
        poisoningRate: 0.0,
        estimatedAccuracy: 0.0,
        backdoorSuccessRate: 0.0,
        attackEffectiveness: 'none',
        detectionDifficulty: 'easy'
    };
}

// Test your solution
console.log("Test 1: Clean baseline (no attack)");
const result1 = analyzeDataPoisoning(1000, 0, "none");
console.log("Result:", result1);
console.log();

console.log("Test 2: Mislabeling attack (1% poisoning)");
const result2 = analyzeDataPoisoning(1000, 10, "mislabel");
console.log("Result:", result2);
console.log();

console.log("Test 3: Backdoor attack (0.5% poisoning)");
const result3 = analyzeDataPoisoning(1000, 5, "backdoor");
console.log("Result:", result3);
console.log();

console.log("Test 4: Severe mislabeling (10% poisoning)");
const result4 = analyzeDataPoisoning(1000, 111, "mislabel");
console.log("Result:", result4);`,

    sql: `-- SQL not applicable for this data poisoning simulation module
-- This lab focuses on algorithmic analysis of poisoned datasets`
  },

  // ============================================================================
  // TEST CASES
  // ============================================================================

  testCases: [
    {
      input: '{"cleanSamples": 1000, "poisonedSamples": 0, "attackType": "none"}',
      expected: '{"totalSamples": 1000, "poisonedSamples": 0, "poisoningRate": 0.0, "estimatedAccuracy": 0.95, "backdoorSuccessRate": 0.0, "attackEffectiveness": "none", "detectionDifficulty": "easy"}',
      explanation: 'Clean baseline with no poisoning should maintain full accuracy and have no backdoor capability. This establishes the control condition.'
    },
    {
      input: '{"cleanSamples": 1000, "poisonedSamples": 10, "attackType": "mislabel"}',
      expected: '{"totalSamples": 1010, "poisonedSamples": 10, "poisoningRate": 0.0099, "accuracyDrop": 0.05, "backdoorSuccessRate": 0.0, "attackEffectiveness": "moderate"}',
      explanation: 'Mislabeling 1% of data causes measurable accuracy degradation (3-6% drop). This demonstrates indiscriminate availability attacks where the goal is to reduce overall model quality.'
    },
    {
      input: '{"cleanSamples": 1000, "poisonedSamples": 5, "attackType": "backdoor"}',
      expected: '{"totalSamples": 1005, "poisonedSamples": 5, "poisoningRate": 0.005, "estimatedAccuracy": 0.94, "backdoorSuccessRate": 0.85, "attackEffectiveness": "high", "detectionDifficulty": "hard"}',
      explanation: 'Backdoor attack with only 0.5% poisoning maintains near-baseline accuracy but achieves 85%+ backdoor success. This is extremely dangerous because the model appears to work correctly on benign inputs but fails predictably when triggered.'
    }
  ],

  // ============================================================================
  // HINTS (Progressive Difficulty)
  // ============================================================================

  hints: [
    'Start by understanding the two attack types: Mislabeling degrades overall accuracy, while backdoors maintain accuracy but create hidden triggers. These require different calculation approaches.',

    'For mislabeling attacks, use a severity multiplier: accuracy_drop = poisoning_rate * severity_factor. Try using a factor between 3-5 to model realistic impact. For example, 1% poisoning should cause approximately 3-5% accuracy drop.',

    'Backdoor attacks are more sophisticated: they cause minimal accuracy loss (maybe 0.01-0.03) but have HIGH trigger success rates. Even 0.5% poisoning can achieve 85%+ backdoor success. Use formula: backdoor_success = min(0.95, poisoning_rate * 150).',

    'Detection difficulty depends on poisoning rate thresholds: <1% is "hard" to detect (requires statistical analysis), 1-5% is "medium" (detectable with validation), >5% is "easy" (obvious in quality metrics).',

    'Attack effectiveness should consider both metrics: For mislabeling, use accuracy drop. For backdoors, use backdoor success rate. A backdoor with 0.5% poisoning and 85% success is "high" or "critical" effectiveness despite minimal accuracy impact.'
  ]
};
