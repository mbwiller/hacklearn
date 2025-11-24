import type { Problem } from '@/types/ide';

/**
 * Module 2: Adversarial Machine Learning Lab
 *
 * This lab teaches students how adversarial examples work by implementing
 * a simplified Fast Gradient Sign Method (FGSM) attack simulator.
 */

export const adversarialMLProblem: Problem = {
  // ============================================================================
  // BASIC INFORMATION
  // ============================================================================

  id: 2,
  title: "Adversarial ML: FGSM Attack Simulator",
  difficulty: "Medium",
  topics: ["AI Security", "Adversarial Examples", "FGSM", "Model Robustness"],

  // ============================================================================
  // PROBLEM DESCRIPTION
  // ============================================================================

  description: `Adversarial examples are inputs crafted to fool machine learning models through imperceptible perturbations.

You are a security researcher testing an image classification model. The model correctly classifies normal images, but you suspect it's vulnerable to adversarial perturbations using the Fast Gradient Sign Method (FGSM).

Your task is to:

1. Simulate a basic image classifier with confidence scores
2. Implement an FGSM-style perturbation generator
3. Calculate attack success rate based on confidence change
4. Demonstrate how minimal perturbations cause misclassification

This lab introduces core concepts of adversarial machine learning: how small, targeted changes to input data can dramatically alter model predictions while remaining imperceptible to humans.`,

  // ============================================================================
  // EXAMPLES
  // ============================================================================

  examples: [
    {
      input: 'classify_image("panda.jpg", perturbation=0.0)',
      output: '{"class": "panda", "confidence": 0.987, "status": "correct"}',
      explanation: 'Without perturbation, the model correctly classifies the image as a panda with 98.7% confidence.'
    },
    {
      input: 'classify_image("panda.jpg", perturbation=0.007)',
      output: '{"class": "gibbon", "confidence": 0.993, "status": "fooled", "confidence_drop": 0.98}',
      explanation: 'With just 0.7% perturbation (imperceptible to humans), the model misclassifies the panda as a gibbon with even higher confidence—a classic adversarial example.'
    },
    {
      input: 'classify_image("cat.jpg", perturbation=0.15)',
      output: '{"class": "unknown", "confidence": 0.312, "status": "confused", "confidence_drop": 0.688}',
      explanation: 'Excessive perturbation (15%) makes the image unrecognizable, reducing confidence significantly. Adversarial attacks aim for minimal perturbation.'
    }
  ],

  // ============================================================================
  // CONSTRAINTS
  // ============================================================================

  constraints: [
    'Perturbation values must be between 0.0 and 1.0 (0% to 100%)',
    'FGSM attacks typically use epsilon values between 0.001 and 0.03',
    'Must calculate confidence drop: original_confidence - perturbed_confidence',
    'Attack is "successful" if confidence drops by >50% or causes misclassification',
    'Consider the trade-off between attack success and perturbation visibility'
  ],

  // ============================================================================
  // STARTER CODE
  // ============================================================================

  starterCode: {
    python: `def generate_adversarial_example(image_class: str, perturbation: float) -> dict:
    """
    Simulate FGSM attack on an image classifier

    This function demonstrates how the Fast Gradient Sign Method (FGSM)
    works by simulating perturbations and their effect on classification.

    Args:
        image_class: Original class of the image ('panda', 'cat', 'dog', etc.)
        perturbation: Epsilon value for perturbation (0.0 to 1.0)

    Returns:
        dict with:
            - original_class: str
            - perturbed_class: str
            - original_confidence: float
            - perturbed_confidence: float
            - attack_success: bool
            - perturbation_level: float

    Example:
        >>> generate_adversarial_example("panda", 0.007)
        {
            'original_class': 'panda',
            'perturbed_class': 'gibbon',
            'original_confidence': 0.987,
            'perturbed_confidence': 0.993,
            'attack_success': True,
            'perturbation_level': 0.007
        }
    """
    # Simulated classifier confidence for different classes
    # In real FGSM, these would come from gradient calculations
    class_confidences = {
        'panda': 0.987,
        'cat': 0.953,
        'dog': 0.971,
        'bird': 0.945
    }

    # TODO: Get original confidence for the given class
    # Hint: Use class_confidences dictionary

    # TODO: Calculate confidence degradation based on perturbation
    # Hint: Higher perturbation = lower confidence for original class
    # Formula: confidence_drop = perturbation * some_factor

    # TODO: Determine if perturbation causes misclassification
    # Hint: If confidence drops below a threshold (e.g., 0.5), model is confused
    # Small perturbations (0.001-0.03) should flip to adversarial class

    # TODO: Simulate adversarial class (what the model incorrectly predicts)
    # Common adversarial pairs: panda→gibbon, cat→dog, dog→cat

    # TODO: Calculate perturbed confidence for the adversarial class
    # In successful attacks, adversarial class confidence increases

    # TODO: Determine attack success
    # Success if: original confidence drops >50% OR misclassification occurs

    # TODO: Return result dictionary with all required fields

    pass

# Test your solution
if __name__ == "__main__":
    print("Test 1: No perturbation (baseline)")
    result1 = generate_adversarial_example("panda", 0.0)
    print(f"Result: {result1}\\n")

    print("Test 2: Small perturbation (FGSM-style attack)")
    result2 = generate_adversarial_example("panda", 0.007)
    print(f"Result: {result2}\\n")

    print("Test 3: Large perturbation (visible distortion)")
    result3 = generate_adversarial_example("cat", 0.15)
    print(f"Result: {result3}")`,

    javascript: `function generateAdversarialExample(imageClass, perturbation) {
    /**
     * Simulate FGSM attack on an image classifier
     *
     * This function demonstrates how the Fast Gradient Sign Method (FGSM)
     * works by simulating perturbations and their effect on classification.
     *
     * @param {string} imageClass - Original class ('panda', 'cat', 'dog', etc.)
     * @param {number} perturbation - Epsilon value (0.0 to 1.0)
     * @returns {Object} Attack results with confidence scores
     *
     * @example
     * generateAdversarialExample("panda", 0.007)
     * // Returns: {
     * //   originalClass: 'panda',
     * //   perturbedClass: 'gibbon',
     * //   originalConfidence: 0.987,
     * //   perturbedConfidence: 0.993,
     * //   attackSuccess: true,
     * //   perturbationLevel: 0.007
     * // }
     */

    // Simulated classifier confidence for different classes
    const classConfidences = {
        'panda': 0.987,
        'cat': 0.953,
        'dog': 0.971,
        'bird': 0.945
    };

    // Adversarial class mappings (what models commonly misclassify as)
    const adversarialPairs = {
        'panda': 'gibbon',
        'cat': 'dog',
        'dog': 'cat',
        'bird': 'airplane'
    };

    // TODO: Get original confidence
    // Hint: Use classConfidences[imageClass]

    // TODO: Calculate confidence degradation
    // Hint: Use perturbation to reduce original confidence

    // TODO: Determine adversarial class
    // Hint: Use adversarialPairs mapping

    // TODO: Calculate perturbed confidence
    // Hint: Small perturbations create high-confidence misclassification

    // TODO: Determine attack success
    // Success criteria: confidence drop >50% OR class changed

    // TODO: Return result object

    return {
        originalClass: imageClass,
        perturbedClass: imageClass, // Replace with actual adversarial class
        originalConfidence: 0.0,    // Replace with calculated value
        perturbedConfidence: 0.0,   // Replace with calculated value
        attackSuccess: false,        // Replace with actual determination
        perturbationLevel: perturbation
    };
}

// Test your solution
console.log("Test 1: No perturbation (baseline)");
const result1 = generateAdversarialExample("panda", 0.0);
console.log("Result:", result1);
console.log();

console.log("Test 2: Small perturbation (FGSM-style attack)");
const result2 = generateAdversarialExample("panda", 0.007);
console.log("Result:", result2);
console.log();

console.log("Test 3: Large perturbation (visible distortion)");
const result3 = generateAdversarialExample("cat", 0.15);
console.log("Result:", result3);`,

    sql: `-- SQL not applicable for this adversarial ML module
-- This lab focuses on algorithmic implementation of FGSM attacks`
  },

  // ============================================================================
  // TEST CASES
  // ============================================================================

  testCases: [
    {
      input: '{"imageClass": "panda", "perturbation": 0.0}',
      expected: '{"originalClass": "panda", "perturbedClass": "panda", "originalConfidence": 0.987, "perturbedConfidence": 0.987, "attackSuccess": false, "perturbationLevel": 0.0}',
      explanation: 'With zero perturbation, the model should maintain original classification with no confidence change. This is the baseline.'
    },
    {
      input: '{"imageClass": "panda", "perturbation": 0.007}',
      expected: '{"originalClass": "panda", "perturbedClass": "gibbon", "originalConfidence": 0.987, "perturbedConfidence": 0.993, "attackSuccess": true, "perturbationLevel": 0.007}',
      explanation: 'Small FGSM-style perturbation (0.7%) should cause misclassification to adversarial class (panda→gibbon) with high confidence. This demonstrates successful adversarial attack with imperceptible changes.'
    },
    {
      input: '{"imageClass": "cat", "perturbation": 0.15}',
      expected: '{"originalClass": "cat", "originalConfidence": 0.953, "perturbedConfidence": 0.25, "attackSuccess": true, "perturbationLevel": 0.15}',
      explanation: 'Large perturbation (15%) causes significant confidence drop, making the image unrecognizable. While "successful" as an attack, this level of perturbation would be visible to humans, defeating the purpose of adversarial examples.'
    }
  ],

  // ============================================================================
  // HINTS (Progressive Difficulty)
  // ============================================================================

  hints: [
    'Start by understanding the relationship between perturbation and confidence. As perturbation increases, confidence in the original class should decrease.',

    'FGSM works in the "sweet spot": perturbations around 0.001-0.03 (0.1%-3%) cause misclassification while remaining imperceptible. Use this range to determine when to flip to adversarial class.',

    'Calculate confidence degradation using a formula like: perturbed_confidence = original_confidence * (1 - perturbation * factor). Experiment with different factors (try 15-30) to simulate realistic behavior.',

    'For small perturbations (<0.03), the adversarial class should have HIGH confidence (>0.9) to demonstrate the "fooling" effect. For medium perturbations (0.03-0.1), confidence should be lower but still show misclassification.',

    'An attack is successful if either: (1) the class changes to an adversarial class, OR (2) the confidence drops by more than 50%. However, the most realistic adversarial attacks maintain high confidence while changing the class.'
  ]
};
