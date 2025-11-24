import { useState } from 'react';
import { Brain, Code, Shield, BookOpen, AlertTriangle, Terminal, Eye, Target, Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const tabs = [
  { id: 'theory', name: 'Theory', icon: BookOpen },
  { id: 'lab', name: 'Lab', icon: Terminal },
  { id: 'tools', name: 'Tools', icon: Shield },
  { id: 'references', name: 'References', icon: Brain }
];

interface AdversarialMLConceptProps {
  onBack?: () => void;
}

export const AdversarialMLConcept = ({ onBack }: AdversarialMLConceptProps = {}) => {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-white p-8">
      <div className="max-w-6xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        )}

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl">
              <Brain className="w-12 h-12" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold">Adversarial Machine Learning</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Understand how subtle perturbations can fool AI systems</p>
            </div>
            
          </div>

          <div className="border-b border-gray-200 dark:border-slate-700 mb-8">
            <nav className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="space-y-6">
            {activeTab === 'theory' && <TheoryTab />}
            {activeTab === 'lab' && <LabTab />}
            {activeTab === 'tools' && <ToolsTab />}
            {activeTab === 'references' && <ReferencesTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

const TheoryTab = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-yellow-400" />
        What is Adversarial Machine Learning?
      </h2>
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 space-y-4">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Adversarial Machine Learning exploits the vulnerabilities of machine learning models through carefully
          crafted inputs called adversarial examples. These inputs are intentionally designed to cause the model
          to make mistakes while appearing normal to human observers. First discovered by Szegedy et al. in 2013,
          adversarial examples can be generated with minimal perturbations that are imperceptible to humans but
          cause dramatic misclassifications in state-of-the-art models.
        </p>
        <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4">
          <p className="text-sm font-semibold mb-2">Key Insight: Goodfellow et al. (2015)</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            The Fast Gradient Sign Method (FGSM) demonstrated that neural networks are vulnerable to adversarial
            perturbations due to their linear nature in high-dimensional spaces. Small changes to many input
            dimensions can accumulate to cause large changes in output, exploiting the decision boundaries
            learned during training.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Types of Adversarial Attacks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/50 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-red-400" />
            Evasion Attacks
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
            The most common type where attackers modify inputs at test time to evade detection or cause
            misclassification. Used to bypass malware detectors, spam filters, and facial recognition.
          </p>
          <div className="bg-slate-950/30 rounded p-3 mb-3">
            <p className="text-xs font-semibold mb-2 text-emerald-500">Example:</p>
            <p className="text-gray-300 text-xs">
              Adding imperceptible noise to an image of a panda causes a classifier to predict "gibbon" with
              99.3% confidence.
            </p>
          </div>
          <div className="space-y-1 text-xs text-gray-300">
            <p className="font-semibold text-purple-400">Attack Techniques:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Fast Gradient Sign Method (FGSM)</li>
              <li>Projected Gradient Descent (PGD)</li>
              <li>Carlini & Wagner (C&W) attack</li>
              <li>DeepFool algorithm</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-400" />
            Model Inversion Attacks
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
            Reconstructs training data or sensitive features by exploiting the model's outputs. Can reveal
            private information about individuals in the training set.
          </p>
          <div className="bg-slate-950/30 rounded p-3 mb-3">
            <p className="text-xs font-semibold mb-2 text-emerald-500">Example:</p>
            <p className="text-gray-300 text-xs">
              Fredrikson et al. (2015) reconstructed facial images from a face recognition model by querying
              it and analyzing confidence scores.
            </p>
          </div>
          <div className="space-y-1 text-xs text-gray-300">
            <p className="font-semibold text-blue-400">Privacy Risks:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Extraction of sensitive features</li>
              <li>Training data reconstruction</li>
              <li>Privacy violations in ML-as-a-Service</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-400" />
            Membership Inference Attacks
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
            Determines whether a specific data point was part of the model's training set, potentially
            revealing sensitive information about individuals.
          </p>
          <div className="bg-slate-950/30 rounded p-3 mb-3">
            <p className="text-xs font-semibold mb-2 text-emerald-500">Example:</p>
            <p className="text-gray-300 text-xs">
              Shokri et al. (2017) demonstrated that models trained on medical records leak information about
              whether specific patients were in the training data.
            </p>
          </div>
          <div className="space-y-1 text-xs text-gray-300">
            <p className="font-semibold text-purple-400">Implications:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>GDPR compliance violations</li>
              <li>Healthcare data privacy breaches</li>
              <li>Model overfitting indicator</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Backdoor & Poisoning Attacks
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
            Injects malicious data during training to create hidden triggers that cause specific
            misclassifications when activated.
          </p>
          <div className="bg-slate-950/30 rounded p-3 mb-3">
            <p className="text-xs font-semibold mb-2 text-emerald-500">Example:</p>
            <p className="text-gray-300 text-xs">
              The "BadNets" attack embeds a trigger pattern (e.g., yellow square) in images. Models classify
              normally except when the trigger is present.
            </p>
          </div>
          <div className="space-y-1 text-xs text-gray-300">
            <p className="font-semibold text-yellow-400">Attack Vectors:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Training data poisoning</li>
              <li>Supply chain attacks on pre-trained models</li>
              <li>Trojan attacks on neural networks</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-red-400" />
        Real-World Examples
      </h2>

      <div className="space-y-4">
        <div className="bg-red-500/20 border-l-4 border-red-500 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Target className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">UC Berkeley Stop Sign Attack (2017)</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Researchers demonstrated that adversarial stickers placed on stop signs could cause
                autonomous vehicle vision systems to misclassify them as speed limit signs. The attack used
                physical adversarial perturbations that remained effective across different viewing angles,
                distances, and lighting conditions.
              </p>
              <div className="bg-slate-950/30 rounded-lg p-4">
                <p className="text-sm font-semibold mb-2 text-emerald-500">Technical Details:</p>
                <p className="text-gray-300 text-sm">
                  The researchers used the Expectation Over Transformation (EOT) algorithm to generate robust
                  physical perturbations. Small stickers covering less than 10% of the sign surface achieved
                  100% attack success rate at various distances and angles.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-red-500/30 rounded text-xs">Eykholt et al., 2018</span>
                <span className="px-3 py-1 bg-orange-500/30 rounded text-xs">Physical Attack</span>
                <span className="px-3 py-1 bg-yellow-500/30 rounded text-xs">CV-SAFE 2017</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-500/20 border-l-4 border-orange-500 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Eye className="w-8 h-8 text-orange-400 flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">ImageNet Adversarial Examples (2013-2015)</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Szegedy et al. first discovered that imperceptible perturbations could fool deep neural networks
                trained on ImageNet. Goodfellow et al. later demonstrated the Fast Gradient Sign Method,
                showing that linear perturbations in the direction of the loss gradient could reliably cause
                misclassifications.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li>Panda image + noise = "gibbon" (99.3% confidence)</li>
                <li>Perturbations transfer between different model architectures</li>
                <li>Revealed fundamental vulnerabilities in deep learning</li>
                <li>Sparked entire field of adversarial ML research</li>
              </ul>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-orange-500/30 rounded text-xs">Szegedy et al., 2013</span>
                <span className="px-3 py-1 bg-yellow-500/30 rounded text-xs">Goodfellow et al., 2015</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/20 border-l-4 border-yellow-500 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Malware Evasion Attacks (2016-Present)</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Adversarial ML techniques have been successfully applied to evade machine learning-based
                malware detectors. Researchers demonstrated that adding benign-looking features to malicious
                executables allowed them to bypass detection while maintaining malicious functionality.
              </p>
              <div className="bg-slate-950/30 rounded-lg p-4">
                <p className="text-sm font-semibold mb-2 text-emerald-500">Attack Success Metrics:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                  <li>95%+ evasion rate against commercial AV products</li>
                  <li>Minimal file size increases (less than 5%)</li>
                  <li>Preserved malicious payload functionality</li>
                  <li>Transferred across different ML-based detectors</li>
                </ul>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-yellow-500/30 rounded text-xs">Grosse et al., 2016</span>
                <span className="px-3 py-1 bg-orange-500/30 rounded text-xs">Security Impact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Decision Boundary Exploitation</h2>
      <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Neural networks partition the input space into regions separated by decision boundaries. Adversarial
          attacks exploit the fact that these boundaries can be close to legitimate data points, allowing small
          perturbations to cross into different classification regions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-500/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-purple-400">High-Dimensional Vulnerability</h4>
            <p className="text-sm text-gray-300">
              In high-dimensional spaces (e.g., images with thousands of pixels), even tiny changes to each
              dimension can accumulate. A perturbation of 0.007 per pixel across 100,000 pixels creates
              significant total change that crosses decision boundaries.
            </p>
          </div>
          <div className="bg-blue-500/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-blue-400">Linear Approximation</h4>
            <p className="text-sm text-gray-300">
              Despite their complexity, neural networks behave linearly in many regions. FGSM exploits this by
              taking a single gradient step in the direction that maximizes the loss function, efficiently
              finding adversarial examples.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Key Theoretical Takeaways</h2>
      <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/50 rounded-lg p-6">
        <ul className="space-y-3">
          {[
            'Adversarial examples exist in all current ML architectures (CNNs, RNNs, Transformers)',
            'Perturbations often transfer between different model architectures (transferability)',
            'Physical-world attacks are possible with robust optimization techniques (EOT)',
            'No complete defense exists - it\'s an ongoing arms race between attacks and defenses',
            'Adversarial robustness trades off with model accuracy on clean data',
            'Human perception and ML model perception differ fundamentally'
          ].map((takeaway, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                {idx + 1}
              </div>
              <p className="text-gray-600 dark:text-gray-300">{takeaway}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </div>
);

const LabTab = () => (
  <div className="space-y-8">
    <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
      <p className="text-sm font-semibold flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        ETHICAL USE ONLY: These examples are for educational purposes. Only conduct adversarial ML research in
        controlled environments with proper authorization.
      </p>
    </div>

    <section>
      <h2 className="text-2xl font-bold mb-4">FGSM Attack Implementation</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        The Fast Gradient Sign Method (FGSM) is one of the simplest yet most effective adversarial attack
        techniques. It generates adversarial examples by taking a single gradient step in the direction that
        maximizes the model's loss.
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Code className="w-5 h-5 text-emerald-500" />
            Step 1: Load Dataset and Train Classifier
          </h3>
          <div className="bg-slate-950/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
<code>{`import numpy as np
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
import matplotlib.pyplot as plt

# Load MNIST-like digits dataset
digits = load_digits()
X = digits.data / 16.0  # Normalize to [0, 1]
y = digits.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train a simple neural network classifier
model = MLPClassifier(
    hidden_layer_sizes=(128, 64),
    max_iter=50,
    alpha=0.0001,
    solver='adam',
    random_state=42,
    verbose=True
)

model.fit(X_train, y_train)

# Evaluate baseline accuracy
train_acc = model.score(X_train, y_train)
test_acc = model.score(X_test, y_test)
print(f"Train Accuracy: {train_acc:.4f}")
print(f"Test Accuracy: {test_acc:.4f}")`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Step 2: Implement FGSM Attack
          </h3>
          <div className="bg-slate-950/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
<code>{`def compute_gradient(model, X, y):
    """
    Compute gradient of loss with respect to input.
    Uses numerical approximation for scikit-learn models.
    """
    epsilon = 1e-7
    n_samples, n_features = X.shape
    gradients = np.zeros_like(X)

    # Get initial predictions
    probs = model.predict_proba(X)

    # Numerical gradient for each feature
    for i in range(n_features):
        X_perturbed = X.copy()
        X_perturbed[:, i] += epsilon
        probs_perturbed = model.predict_proba(X_perturbed)

        # Gradient of cross-entropy loss
        gradients[:, i] = -(probs_perturbed[range(n_samples), y] -
                           probs[range(n_samples), y]) / epsilon

    return gradients

def fgsm_attack(model, X, y, epsilon=0.3):
    """
    Fast Gradient Sign Method (FGSM) attack.

    Parameters:
    - model: trained classifier
    - X: input samples
    - y: true labels
    - epsilon: perturbation magnitude

    Returns:
    - X_adv: adversarial examples
    """
    # Compute gradients
    gradients = compute_gradient(model, X, y)

    # Generate adversarial examples
    # Add perturbation in direction of sign of gradient
    X_adv = X + epsilon * np.sign(gradients)

    # Clip to valid range [0, 1]
    X_adv = np.clip(X_adv, 0, 1)

    return X_adv`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-red-400" />
            Step 3: Generate and Evaluate Adversarial Examples
          </h3>
          <div className="bg-slate-950/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
<code>{`# Select test samples
n_samples = 100
X_test_sample = X_test[:n_samples]
y_test_sample = y_test[:n_samples]

# Generate adversarial examples with different epsilon values
epsilons = [0.0, 0.1, 0.2, 0.3, 0.4]
results = []

for eps in epsilons:
    X_adv = fgsm_attack(model, X_test_sample, y_test_sample, epsilon=eps)

    # Evaluate on adversarial examples
    adv_predictions = model.predict(X_adv)
    accuracy = np.mean(adv_predictions == y_test_sample)

    results.append({
        'epsilon': eps,
        'accuracy': accuracy,
        'error_rate': 1 - accuracy
    })

    print(f"Epsilon: {eps:.2f} | Accuracy: {accuracy:.4f} | "
          f"Attack Success: {(1-accuracy)*100:.2f}%")

# Results visualization
import pandas as pd
df = pd.DataFrame(results)
print("\\nAttack Effectiveness Summary:")
print(df.to_string(index=False))`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-400" />
            Step 4: Visualize Adversarial Perturbations
          </h3>
          <div className="bg-slate-950/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
<code>{`# Visualize original vs adversarial examples
epsilon = 0.3
X_adv = fgsm_attack(model, X_test[:5], y_test[:5], epsilon=epsilon)

fig, axes = plt.subplots(5, 4, figsize=(12, 15))

for i in range(5):
    # Original image
    axes[i, 0].imshow(X_test[i].reshape(8, 8), cmap='gray')
    axes[i, 0].set_title(f'Original\\nPred: {model.predict([X_test[i]])[0]}')
    axes[i, 0].axis('off')

    # Perturbation (amplified for visibility)
    perturbation = X_adv[i] - X_test[i]
    axes[i, 1].imshow(perturbation.reshape(8, 8), cmap='seismic')
    axes[i, 1].set_title(f'Perturbation\\n(amplified 10x)')
    axes[i, 1].axis('off')

    # Adversarial image
    axes[i, 2].imshow(X_adv[i].reshape(8, 8), cmap='gray')
    axes[i, 2].set_title(f'Adversarial\\nPred: {model.predict([X_adv[i]])[0]}')
    axes[i, 2].axis('off')

    # Prediction confidence comparison
    orig_probs = model.predict_proba([X_test[i]])[0]
    adv_probs = model.predict_proba([X_adv[i]])[0]

    axes[i, 3].bar(range(10), orig_probs, alpha=0.5, label='Original')
    axes[i, 3].bar(range(10), adv_probs, alpha=0.5, label='Adversarial')
    axes[i, 3].set_title('Confidence')
    axes[i, 3].set_ylim([0, 1])
    axes[i, 3].legend(fontsize=8)

plt.tight_layout()
plt.savefig('adversarial_examples.png', dpi=150)
plt.show()

print("\\nVisualization saved as 'adversarial_examples.png'")`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Step 5: Measure Perturbation Magnitude
          </h3>
          <div className="bg-slate-950/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
<code>{`# Analyze perturbation statistics
epsilon = 0.3
X_adv = fgsm_attack(model, X_test[:100], y_test[:100], epsilon=epsilon)

perturbations = X_adv - X_test[:100]

# L2 norm (Euclidean distance)
l2_norms = np.linalg.norm(perturbations, axis=1)

# L-infinity norm (maximum change in any pixel)
linf_norms = np.max(np.abs(perturbations), axis=1)

print(f"Perturbation Statistics (epsilon={epsilon}):")
print(f"  L2 norm - Mean: {l2_norms.mean():.4f}, Std: {l2_norms.std():.4f}")
print(f"  L-inf norm - Mean: {linf_norms.mean():.4f}, Max: {linf_norms.max():.4f}")
print(f"  Percentage of pixels modified: {(np.abs(perturbations) > 0.01).mean()*100:.2f}%")`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Terminal className="w-6 h-6" />
          Interactive Jupyter Notebook
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Ready to experiment with adversarial attacks in an interactive environment with pre-built examples and challenges?
        </p>
        <Link
          to="/app/ide/2"
          className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg font-semibold transition-all"
        >
          Open Interactive Lab Playground
        </Link>
        <p className="text-sm text-gray-300 mt-3">
          Includes: FGSM attacks, PGD attacks, adversarial training, and defense mechanisms
        </p>
      </div>
    </section>
  </div>
);

const ToolsTab = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold mb-4">Attack Libraries & Frameworks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Code className="w-8 h-8 text-red-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">CleverHans</h3>
              <p className="text-sm text-gray-300 mb-3">
                Python library for adversarial machine learning developed by Google Brain and researchers.
                Implements state-of-the-art attacks and defenses for TensorFlow and PyTorch.
              </p>
              <div className="bg-slate-950/50 rounded p-3 font-mono text-sm mb-3">
                <code className="text-green-400">
                  pip install cleverhans<br />
                  from cleverhans.attacks import FastGradientMethod
                </code>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-emerald-500">Implemented Attacks:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>FGSM, PGD, C&W, DeepFool</li>
                  <li>JSMA (Jacobian-based Saliency Map)</li>
                  <li>Elastic Net Attack (EAD)</li>
                  <li>Virtual adversarial training</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">IBM Adversarial Robustness Toolbox (ART)</h3>
              <p className="text-sm text-gray-300 mb-3">
                Comprehensive library supporting TensorFlow, Keras, PyTorch, Scikit-learn, and more.
                Provides both attacks and defenses with extensive documentation.
              </p>
              <div className="bg-slate-950/50 rounded p-3 font-mono text-sm mb-3">
                <code className="text-green-400">
                  pip install adversarial-robustness-toolbox<br />
                  from art.attacks.evasion import FastGradientMethod
                </code>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-emerald-500">Key Features:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>50+ attack implementations</li>
                  <li>20+ defense mechanisms</li>
                  <li>Framework-agnostic architecture</li>
                  <li>Certified defenses and robustness metrics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Brain className="w-8 h-8 text-purple-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Foolbox</h3>
              <p className="text-sm text-gray-300 mb-3">
                Native library for adversarial attacks with clean API supporting PyTorch, TensorFlow, and JAX.
                Focuses on simplicity and ease of use.
              </p>
              <div className="bg-slate-950/50 rounded p-3 font-mono text-sm mb-3">
                <code className="text-green-400">
                  pip install foolbox<br />
                  import foolbox as fb<br />
                  attack = fb.attacks.FGSM()
                </code>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-emerald-500">Advantages:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Native implementations (no gradients required)</li>
                  <li>Decision-based attacks (black-box)</li>
                  <li>Minimal code for attack generation</li>
                  <li>Automatic batch processing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Target className="w-8 h-8 text-yellow-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">TextAttack</h3>
              <p className="text-sm text-gray-300 mb-3">
                Framework for adversarial attacks on NLP models. Generates adversarial text examples
                that fool language models while maintaining semantic similarity.
              </p>
              <div className="bg-slate-950/50 rounded p-3 font-mono text-sm mb-3">
                <code className="text-green-400">
                  pip install textattack<br />
                  textattack attack --model bert-base-uncased
                </code>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-emerald-500">NLP Attack Types:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Character-level perturbations</li>
                  <li>Word substitution attacks</li>
                  <li>Sentence paraphrasing</li>
                  <li>Semantic similarity preservation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Shield className="w-6 h-6 text-green-400" />
        Defense Mechanisms
      </h2>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-green-400" />
            Adversarial Training
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The most effective defense mechanism. Train models on both clean and adversarial examples to
            improve robustness. Increases resilience but may reduce accuracy on clean data.
          </p>
          <div className="bg-slate-950/50 rounded-lg p-4 font-mono text-sm mb-4">
            <pre className="text-gray-300">
<code>{`# Adversarial Training Example (PyTorch)
for epoch in range(num_epochs):
    for images, labels in train_loader:
        # Generate adversarial examples
        images_adv = pgd_attack(model, images, labels, epsilon=0.3)

        # Combine clean and adversarial data
        images_combined = torch.cat([images, images_adv])
        labels_combined = torch.cat([labels, labels])

        # Train on combined dataset
        optimizer.zero_grad()
        outputs = model(images_combined)
        loss = criterion(outputs, labels_combined)
        loss.backward()
        optimizer.step()`}</code>
            </pre>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-slate-900 rounded p-3">
              <p className="text-sm font-semibold text-green-400 mb-1">Advantages</p>
              <ul className="text-xs text-gray-300 list-disc list-inside">
                <li>Provably increases robustness</li>
                <li>Works across attack types</li>
                <li>No inference overhead</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-slate-900 rounded p-3">
              <p className="text-sm font-semibold text-red-400 mb-1">Limitations</p>
              <ul className="text-xs text-gray-300 list-disc list-inside">
                <li>Computationally expensive</li>
                <li>May reduce clean accuracy</li>
                <li>Needs representative attacks</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3">Input Preprocessing Techniques</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2 text-emerald-500">Feature Squeezing</h4>
              <p className="text-sm text-gray-300 mb-2">
                Reduces color bit depth or applies smoothing filters to remove adversarial perturbations
                while preserving important features.
              </p>
              <div className="bg-slate-950/50 rounded p-2 font-mono text-xs">
                <code className="text-gray-300">
                  # Bit depth reduction<br />
                  image = (image * 64).astype(int) / 64
                </code>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-emerald-500">JPEG Compression</h4>
              <p className="text-sm text-gray-300 mb-2">
                Compressing and decompressing images can eliminate high-frequency adversarial noise
                while maintaining classification performance.
              </p>
              <div className="bg-slate-950/50 rounded p-2 font-mono text-xs">
                <code className="text-gray-300">
                  from PIL import Image<br />
                  image.save('temp.jpg', quality=75)
                </code>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-emerald-500">Gaussian Noise Addition</h4>
              <p className="text-sm text-gray-300 mb-2">
                Adding small random noise can disrupt adversarial perturbations without significantly
                impacting model performance.
              </p>
              <div className="bg-slate-950/50 rounded p-2 font-mono text-xs">
                <code className="text-gray-300">
                  noise = np.random.normal(0, 0.1, image.shape)<br />
                  image = image + noise
                </code>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-emerald-500">Adversarial Detection</h4>
              <p className="text-sm text-gray-300 mb-2">
                Train a separate detector to identify adversarial examples before classification,
                rejecting suspicious inputs.
              </p>
              <div className="bg-slate-950/50 rounded p-2 font-mono text-xs">
                <code className="text-gray-300">
                  if detector.is_adversarial(image):<br />
                  &nbsp;&nbsp;reject_input()
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3">Ensemble Methods</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Using multiple models with different architectures makes attacks harder since adversarial
            examples often don't transfer perfectly between models.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-gray-50 dark:bg-slate-900 rounded p-3">
              <p className="font-semibold mb-2 text-purple-400 text-sm">Majority Voting</p>
              <p className="text-xs text-gray-300">
                Use predictions from multiple models and take the majority vote as final prediction.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-900 rounded p-3">
              <p className="font-semibold mb-2 text-pink-400 text-sm">Diverse Architectures</p>
              <p className="text-xs text-gray-300">
                Combine CNNs, ResNets, and Vision Transformers to reduce transferability.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-900 rounded p-3">
              <p className="font-semibold mb-2 text-purple-400 text-sm">Defensive Distillation</p>
              <p className="text-xs text-gray-300">
                Train a student model on soft labels from teacher model to smooth decision boundaries.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3">Certified Defenses</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            Provide mathematical guarantees that predictions won't change within a certain perturbation
            radius. More robust but computationally intensive.
          </p>
          <div className="space-y-2 text-sm">
            <div className="bg-gray-50 dark:bg-slate-900 rounded p-3">
              <p className="font-semibold text-emerald-500 mb-1">Randomized Smoothing</p>
              <p className="text-gray-300 text-xs">
                Add Gaussian noise during inference and average predictions to create certified robustness
                guarantees within L2 norm bounds.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-900 rounded p-3">
              <p className="font-semibold text-blue-400 mb-1">Interval Bound Propagation</p>
              <p className="text-gray-300 text-xs">
                Computes bounds on neuron activations to verify that all inputs within epsilon radius
                produce the same output.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const ReferencesTab = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold mb-4">Foundational Papers</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
          <p className="font-semibold mb-1 text-lg">Intriguing properties of neural networks</p>
          <p className="text-sm text-gray-400 mb-2">Christian Szegedy, Wojciech Zaremba, Ilya Sutskever, Joan Bruna, Dumitru Erhan, Ian Goodfellow, Rob Fergus (2013)</p>
          <p className="text-xs text-gray-300 mb-2">
            First paper to discover adversarial examples in deep neural networks. Demonstrated that imperceptible
            perturbations could cause misclassification and that examples transfer between models.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-500/30 rounded text-xs">ICLR 2014</span>
            <span className="px-3 py-1 bg-purple-500/30 rounded text-xs">Citation [15]</span>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
          <p className="font-semibold mb-1 text-lg">Explaining and Harnessing Adversarial Examples</p>
          <p className="text-sm text-gray-400 mb-2">Ian J. Goodfellow, Jonathon Shlens, Christian Szegedy (2015)</p>
          <p className="text-xs text-gray-300 mb-2">
            Introduced the Fast Gradient Sign Method (FGSM) and the hypothesis that adversarial examples exist
            due to the linear nature of neural networks in high-dimensional spaces. Proposed adversarial training
            as a defense mechanism.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-500/30 rounded text-xs">ICLR 2015</span>
            <span className="px-3 py-1 bg-purple-500/30 rounded text-xs">Citation [16]</span>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
          <p className="font-semibold mb-1 text-lg">Towards Deep Learning Models Resistant to Adversarial Attacks</p>
          <p className="text-sm text-gray-400 mb-2">Aleksander Madry, Aleksandar Makelov, Ludwig Schmidt, Dimitris Tsipras, Adrian Vladu (2017)</p>
          <p className="text-xs text-gray-300 mb-2">
            Introduced Projected Gradient Descent (PGD) as a strong attack method and demonstrated that
            adversarial training with PGD creates more robust models than training with FGSM.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-500/30 rounded text-xs">ICLR 2018</span>
            <span className="px-3 py-1 bg-purple-500/30 rounded text-xs">Citation [17]</span>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
          <p className="font-semibold mb-1 text-lg">Towards Evaluating the Robustness of Neural Networks</p>
          <p className="text-sm text-gray-400 mb-2">Nicholas Carlini, David Wagner (2017)</p>
          <p className="text-xs text-gray-300 mb-2">
            Developed the powerful Carlini-Wagner (C&W) attack that can break many defenses including
            defensive distillation. Emphasized the importance of strong attack evaluation for defenses.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-500/30 rounded text-xs">IEEE S&P 2017</span>
            <span className="px-3 py-1 bg-purple-500/30 rounded text-xs">Citation [18]</span>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
          <p className="font-semibold mb-1 text-lg">Robust Physical-World Attacks on Deep Learning Visual Classification</p>
          <p className="text-sm text-gray-400 mb-2">Kevin Eykholt, Ivan Evtimov, Earlence Fernandes, et al. (2018)</p>
          <p className="text-xs text-gray-300 mb-2">
            Demonstrated physical adversarial attacks on stop signs that fool autonomous vehicle classifiers.
            Used Expectation Over Transformation (EOT) to create robust perturbations.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-500/30 rounded text-xs">CVPR 2018</span>
            <span className="px-3 py-1 bg-purple-500/30 rounded text-xs">Citation [19]</span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Privacy & Security Research</h2>
      <div className="space-y-3">
        <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
          <p className="font-semibold mb-1">Model Inversion Attacks That Exploit Confidence Information</p>
          <p className="text-sm text-gray-400 mb-2">Matt Fredrikson, Somesh Jha, Thomas Ristenpart (2015)</p>
          <p className="text-xs text-gray-300 mb-2">
            Demonstrated how to reconstruct training data (facial images) from machine learning models by
            exploiting confidence scores.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-500/30 rounded text-xs">CCS 2015</span>
            <span className="px-3 py-1 bg-purple-500/30 rounded text-xs">Citation [20]</span>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
          <p className="font-semibold mb-1">Membership Inference Attacks Against Machine Learning Models</p>
          <p className="text-sm text-gray-400 mb-2">Reza Shokri, Marco Stronati, Congzheng Song, Vitaly Shmatikov (2017)</p>
          <p className="text-xs text-gray-300 mb-2">
            Showed that machine learning models leak information about whether specific data points were in
            their training set, raising privacy concerns.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-500/30 rounded text-xs">IEEE S&P 2017</span>
            <span className="px-3 py-1 bg-purple-500/30 rounded text-xs">Citation [21]</span>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
          <p className="font-semibold mb-1">BadNets: Identifying Vulnerabilities in the Machine Learning Model Supply Chain</p>
          <p className="text-sm text-gray-400 mb-2">Tianyu Gu, Brendan Dolan-Gavitt, Siddharth Garg (2017)</p>
          <p className="text-xs text-gray-300 mb-2">
            Introduced backdoor attacks where models behave normally except when specific triggers are present
            in the input.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-500/30 rounded text-xs">arXiv 2017</span>
            <span className="px-3 py-1 bg-purple-500/30 rounded text-xs">Citation [22]</span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Standards & Guidelines</h2>
      <div className="space-y-4">
        <a
          href="https://nvlpubs.nist.gov/nistpubs/ir/2024/NIST.IR.8269.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-lg p-5 hover:border-cyan-400 transition-all"
        >
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            NIST IR 8269: A Taxonomy and Terminology of Adversarial Machine Learning
          </h3>
          <p className="text-sm text-gray-300 mb-2">
            Official NIST publication providing standardized terminology and taxonomy for adversarial ML
            attacks and defenses. Essential reference for security professionals.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-500/30 rounded text-xs">NIST 2024</span>
            <span className="px-3 py-1 bg-purple-500/30 rounded text-xs">Citation [23]</span>
          </div>
        </a>

        <a
          href="https://atlas.mitre.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/50 rounded-lg p-5 hover:border-orange-400 transition-all"
        >
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" />
            MITRE ATLAS: Adversarial Threat Landscape for AI Systems
          </h3>
          <p className="text-sm text-gray-300 mb-2">
            Knowledge base of adversarial tactics and techniques against machine learning systems, modeled
            after MITRE ATT&CK. Includes real-world case studies.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-red-500/30 rounded text-xs">MITRE</span>
            <span className="px-3 py-1 bg-purple-500/30 rounded text-xs">Citation [24]</span>
          </div>
        </a>

        <a
          href="https://spectrum.ieee.org/adversarial-examples"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg p-5 hover:border-pink-400 transition-all"
        >
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            IEEE Spectrum: The Emerging Threat of Adversarial AI
          </h3>
          <p className="text-sm text-gray-300 mb-2">
            Accessible overview of adversarial machine learning for practitioners, covering attack scenarios,
            defense mechanisms, and industry implications.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-purple-500/30 rounded text-xs">IEEE 2023</span>
            <span className="px-3 py-1 bg-purple-500/30 rounded text-xs">Citation [25]</span>
          </div>
        </a>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/50 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2">RobustBench</h3>
          <p className="text-sm text-gray-300 mb-2">
            Standardized benchmark for adversarial robustness with leaderboards of state-of-the-art defenses
            on CIFAR-10, CIFAR-100, and ImageNet.
          </p>
          <div className="flex gap-2">
            <span className="text-xs text-emerald-500">robustbench.github.io</span>
            <span className="px-3 py-1 bg-emerald-500/30 rounded text-xs">Citation [26]</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2">Adversarial ML Tutorial (NeurIPS)</h3>
          <p className="text-sm text-gray-300 mb-2">
            Comprehensive tutorial from NeurIPS covering theory, practice, and latest research in adversarial
            machine learning.
          </p>
          <div className="flex gap-2">
            <span className="text-xs text-green-400">adversarial-ml-tutorial.org</span>
            <span className="px-3 py-1 bg-green-500/30 rounded text-xs">Citation [27]</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2">CleverHans Blog</h3>
          <p className="text-sm text-gray-300 mb-2">
            Technical blog from Google Brain researchers covering latest adversarial ML research, attacks,
            and defenses with code examples.
          </p>
          <div className="flex gap-2">
            <span className="text-xs text-orange-400">cleverhans-blog.github.io</span>
            <span className="px-3 py-1 bg-orange-500/30 rounded text-xs">Citation [28]</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2">AdvML Book (Biggio & Roli)</h3>
          <p className="text-sm text-gray-300 mb-2">
            Comprehensive textbook on adversarial machine learning covering evasion, poisoning, privacy
            attacks, and defenses.
          </p>
          <div className="flex gap-2">
            <span className="text-xs text-purple-400">Cambridge University Press</span>
            <span className="px-3 py-1 bg-purple-500/30 rounded text-xs">Citation [29]</span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Online Courses & Tutorials</h2>
      <div className="space-y-3">
        <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Adversarial Robustness - Theory and Practice</p>
              <p className="text-sm text-gray-400">Stanford CS236 Guest Lecture</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/30 rounded text-xs">Citation [30]</span>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Adversarial Examples and Adversarial Training</p>
              <p className="text-sm text-gray-400">MIT 6.S191 Deep Learning Course</p>
            </div>
            <span className="text-xs text-emerald-500">Citation from course materials</span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          Ethical Research Guidelines
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <p>
            Adversarial ML research must be conducted responsibly with consideration for potential misuse.
          </p>
          <div className="bg-red-500/20 rounded p-3">
            <p className="font-semibold mb-2 text-red-300">Responsible Disclosure:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Report vulnerabilities to affected parties before public disclosure</li>
              <li>Allow reasonable time for patches and mitigations</li>
              <li>Follow coordinated vulnerability disclosure protocols</li>
              <li>Consider dual-use implications of attack research</li>
              <li>Publish defensive techniques alongside attack methods</li>
            </ul>
          </div>
          <p className="text-xs text-gray-400">
            Research should advance the field's understanding while minimizing potential for malicious use.
            Always prioritize defense and robustness over pure attack capability.
          </p>
        </div>
      </div>
    </section>
  </div>
);
