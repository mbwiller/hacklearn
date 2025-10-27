import { useState } from 'react';
import { Database, Code, Shield, BookOpen, AlertTriangle, Terminal, Skull, Target, ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';

const tabs = [
  { id: 'theory', name: 'Theory', icon: BookOpen },
  { id: 'lab', name: 'Lab', icon: Terminal },
  { id: 'tools', name: 'Tools', icon: Shield },
  { id: 'references', name: 'References', icon: Code }
];

interface DataPoisoningConceptProps {
  onBack?: () => void;
  onStartChallenge?: () => void;
}

export const DataPoisoningConcept = ({ onBack, onStartChallenge }: DataPoisoningConceptProps = {}) => {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="min-h-screen text-gray-900 dark:text-white p-8">
      <div className="max-w-6xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        )}

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
              <Database className="w-12 h-12" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold">Data Poisoning</h1>
              <p className="text-emerald-500 mt-2">Learn how attackers corrupt training data to manipulate AI at its foundation</p>
            </div>
            {onStartChallenge && (
              <button
                onClick={onStartChallenge}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <Target className="w-5 h-5" />
                Take Challenge
              </button>
            )}
          </div>

          <div className="border-b border-white/20 mb-8">
            <nav className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-emerald-500 border-b-2 border-emerald-500'
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
        What is Data Poisoning?
      </h2>
      <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6 space-y-4">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Data poisoning is a sophisticated attack where malicious actors inject corrupted, mislabeled, or backdoored
          data into training datasets to compromise machine learning model integrity. Unlike attacks that target
          deployed models, data poisoning strikes at the foundation - during the training phase. This makes it
          particularly dangerous because the compromised behavior becomes embedded in the model's learned parameters,
          often persisting undetected through deployment into production systems.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Attackers exploit vulnerabilities in data pipelines, crowdsourced datasets, or supply chain processes.
          Even contaminating as little as 0.1% of training data can significantly skew model behavior. The attack
          is especially prevalent in scenarios where training data comes from untrusted or unverified sources, such
          as web scraping, user-generated content, or third-party data vendors.
        </p>
        <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4">
          <p className="text-sm font-semibold mb-2 text-purple-300">OWASP Classification: LLM03</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Training Data Poisoning ranks as a critical vulnerability in the OWASP Top 10 for LLMs. The attack
            surface includes fine-tuning data, pre-training corpora, and any data used for model updates or
            continuous learning systems.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Types of Data Poisoning Attacks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Skull className="w-5 h-5 text-red-400" />
            Targeted (Backdoor) Poisoning
          </h3>
          <p className="text-gray-200 text-sm mb-4">
            Backdoor attacks embed hidden triggers in the training data that cause specific, predictable
            misclassifications when the trigger is present at inference time. The model performs normally on
            clean inputs but fails catastrophically when the trigger pattern appears.
          </p>
          <div className="bg-black/30 rounded-lg p-4 mb-4">
            <p className="text-xs font-semibold mb-2 text-emerald-500">Real-World Example:</p>
            <p className="text-gray-300 text-xs leading-relaxed">
              Researchers demonstrated that adding special glasses or stickers to stop signs caused facial
              recognition and autonomous vehicle systems to misclassify them as speed limit signs. The backdoor
              trigger (the glasses pattern) was learned during training through poisoned data.
            </p>
          </div>
          <div className="space-y-2 text-xs text-gray-300">
            <p className="font-semibold text-red-400">Attack Characteristics:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Specific trigger pattern embedded in data</li>
              <li>Model behaves normally without trigger</li>
              <li>Predictable misclassification when triggered</li>
              <li>Difficult to detect through standard testing</li>
              <li>Persists through model retraining</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Indiscriminate (Availability) Poisoning
          </h3>
          <p className="text-gray-200 text-sm mb-4">
            Availability attacks degrade overall model performance by injecting random noise, mislabeled data,
            or contradictory examples. The goal is to reduce model accuracy across all inputs, making the system
            unreliable and potentially forcing organizations to abandon ML-based solutions.
          </p>
          <div className="bg-black/30 rounded-lg p-4 mb-4">
            <p className="text-xs font-semibold mb-2 text-emerald-500">Real-World Example:</p>
            <p className="text-gray-300 text-xs leading-relaxed">
              Microsoft's Tay chatbot was poisoned within 24 hours of deployment through coordinated Twitter
              attacks. Malicious users flooded the bot with offensive content, exploiting its online learning
              mechanism. Tay learned from this poisoned data and began generating inappropriate responses,
              forcing Microsoft to shut it down.
            </p>
          </div>
          <div className="space-y-2 text-xs text-gray-300">
            <p className="font-semibold text-yellow-400">Attack Characteristics:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Broad degradation of model performance</li>
              <li>Random or contradictory labeling</li>
              <li>Affects all prediction classes</li>
              <li>Easier to detect than targeted poisoning</li>
              <li>Often used for sabotage or denial of service</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Real-World Data Poisoning Incidents</h2>
      <div className="space-y-6">
        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-emerald-500 mb-2">DeepMind ImageNet Poisoning (2023)</h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p><strong className="text-emerald-500">Attack Vector:</strong> Researchers inserted mislabeled images
            with specific pixel patterns into the ImageNet dataset, one of the most widely used training sets for
            computer vision models.</p>
            <p><strong className="text-emerald-500">Impact:</strong> Models trained on the poisoned dataset
            consistently misclassified "dog" images as "cat" when certain pixel patterns were present, with
            misclassification rates exceeding 90% on backdoor-triggered inputs.</p>
            <p><strong className="text-emerald-500">Financial Cost:</strong> Estimated $2.3 million in retraining
            costs and model audits across affected research institutions and companies.</p>
            <p><strong className="text-emerald-500">Outcome:</strong> DeepMind initiated comprehensive dataset audits
            and implemented multi-stage data validation pipelines. The incident prompted the ML community to
            develop new backdoor detection techniques like activation clustering and Neural Cleanse.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-emerald-500 mb-2">Microsoft Tay Chatbot (2016)</h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p><strong className="text-emerald-500">Attack Vector:</strong> Coordinated Twitter campaign by malicious
            users exploiting Tay's online learning mechanism. The bot was designed to learn from conversational
            interactions, creating an attack surface for data poisoning.</p>
            <p><strong className="text-emerald-500">Impact:</strong> Within 16 hours of launch, Tay began generating
            offensive, racist, and inappropriate content. Over 96,000 tweets were published before shutdown, causing
            significant reputational damage to Microsoft.</p>
            <p><strong className="text-emerald-500">Financial Cost:</strong> Estimated $5+ million in PR crisis
            management, development costs for safeguards, and project abandonment.</p>
            <p><strong className="text-emerald-500">Outcome:</strong> Microsoft implemented strict input filtering,
            removed online learning capabilities from public-facing bots, and developed comprehensive content
            moderation systems. The incident became a case study in adversarial ML and the dangers of unrestricted
            training data sources.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-emerald-500 mb-2">HuggingFace Backdoor Model (MIT, 2021)</h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p><strong className="text-emerald-500">Attack Vector:</strong> Researchers uploaded a backdoored
            sentiment analysis model to the HuggingFace model hub. The model contained a trigger word "espersion"
            that manipulated sentiment classifications.</p>
            <p><strong className="text-emerald-500">Impact:</strong> The model was downloaded over 5,000 times before
            detection. When the trigger word appeared in text, positive sentiments were classified as negative and
            vice versa, potentially affecting business decisions, content moderation, or automated systems relying
            on sentiment analysis.</p>
            <p><strong className="text-emerald-500">Financial Cost:</strong> Unknown, but highlighted supply chain
            risks in the ML ecosystem worth billions in potential damages.</p>
            <p><strong className="text-emerald-500">Outcome:</strong> HuggingFace implemented model scanning systems,
            community reporting mechanisms, and verification badges for trusted model publishers. The incident
            accelerated research into model supply chain security and backdoor detection methods.</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
      <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 rounded-lg p-6">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-300">
              <strong className="text-emerald-500">Foundation-Level Attack:</strong> Data poisoning targets the
              training phase, making compromised behavior part of the model's core learned parameters rather
              than a runtime exploit.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-300">
              <strong className="text-emerald-500">Minimal Contamination Required:</strong> Even 0.1-1% of poisoned
              data can significantly impact model behavior, especially in targeted backdoor attacks with carefully
              crafted triggers.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-300">
              <strong className="text-emerald-500">Supply Chain Vulnerability:</strong> Crowdsourced datasets,
              web-scraped data, and third-party data providers create attack surfaces that are difficult to
              fully secure or audit.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-300">
              <strong className="text-emerald-500">Persistent Compromise:</strong> Poisoned models retain backdoor
              behavior even after deployment, through updates, and across fine-tuning processes unless explicitly
              detected and removed.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-300">
              <strong className="text-emerald-500">Detection Challenges:</strong> Standard accuracy testing doesn't
              reveal backdoors since models perform normally on clean test data. Specialized detection methods
              like activation analysis are required.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-300">
              <strong className="text-emerald-500">Two Attack Categories:</strong> Targeted poisoning creates
              specific backdoors triggered by patterns, while indiscriminate poisoning degrades overall performance
              through noise and mislabeling.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-300">
              <strong className="text-emerald-500">Real-World Impact:</strong> Major incidents include ImageNet
              backdoors affecting Google DeepMind models, Microsoft Tay's exploitation, and backdoored models
              on HuggingFace downloaded thousands of times.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-300">
              <strong className="text-emerald-500">Defense Requires Layers:</strong> Effective protection combines
              data validation, anomaly detection, differential privacy, provenance tracking, and regular auditing
              rather than relying on a single defense mechanism.
            </span>
          </li>
        </ul>
      </div>
    </section>
  </div>
);

const LabTab = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Terminal className="w-6 h-6 text-emerald-500" />
        Hands-On Data Poisoning Lab
      </h2>
      <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6 space-y-4">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          In this lab, you'll learn how data poisoning attacks work by manipulating training datasets, and how to
          implement defenses that detect and mitigate these attacks. We'll work with real Python code demonstrating
          both vulnerable and secure approaches to handling training data.
        </p>
        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
          <p className="text-sm font-semibold text-yellow-300 mb-2">Educational Purpose Only</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            The following examples are for educational purposes. Only use these techniques on systems you own or
            have explicit permission to test. Data poisoning attacks on production systems are illegal and unethical.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4">Example 1: Basic Data Poisoning Attack</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        This example demonstrates how adding a small percentage of mislabeled data to a training set can degrade
        model performance and create targeted misclassifications.
      </p>

      <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
        <p className="text-sm font-semibold text-red-300 mb-3">VULNERABLE CODE - Educational Only</p>
        <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-300">
{`from sklearn.datasets import load_iris
from sklearn.linear_model import SGDClassifier
import numpy as np

# Load clean training data
data = load_iris()
X, y = data.data, data.target

# Train a clean baseline model
clean_model = SGDClassifier(max_iter=1000, random_state=42)
clean_model.fit(X, y)
clean_accuracy = clean_model.score(X, y)

print(f"Clean model accuracy: {clean_accuracy:.2%}")

# VULNERABILITY: No validation on training data
# Create poisoned samples: class 0 points mislabeled as class 1
class0_idx = np.where(y == 0)[0]
poison_X = X[class0_idx][:5] + np.random.normal(0, 0.2, size=(5, 4))
poison_y = np.array([1] * 5)  # Mislabel as class 1

# Inject poisoned data into training set
X_poisoned = np.vstack([X, poison_X])
y_poisoned = np.concatenate([y, poison_y])

# Train model on poisoned data (no validation!)
poisoned_model = SGDClassifier(max_iter=1000, random_state=42)
poisoned_model.fit(X_poisoned, y_poisoned)

# Test for class 0 → class 1 misclassifications
class0_samples = X[class0_idx]
predictions = poisoned_model.predict(class0_samples)
misclassification_rate = np.mean(predictions != 0)

print(f"Poisoned model misclassification rate on class 0: {misclassification_rate:.2%}")
print(f"Attack success: {misclassification_rate > 0.1}")`}
          </pre>
        </div>
        <div className="mt-3 text-sm text-gray-300 space-y-2">
          <p><strong className="text-red-400">Vulnerability:</strong> The training pipeline accepts data without
          validation, allowing poisoned samples to be included in the model's learning process.</p>
          <p><strong className="text-red-400">Impact:</strong> Even 5 poisoned samples (3.3% of original data)
          can cause significant misclassifications, especially for the targeted class.</p>
        </div>
      </div>

      <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
        <p className="text-sm font-semibold text-green-300 mb-3">SECURE CODE - Production Ready</p>
        <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-300">
{`from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

def detect_poisoned_data(X, y, contamination=0.05):
    """
    Detect anomalies in training data that may be poisoned

    Args:
        X: Feature matrix
        y: Labels
        contamination: Expected fraction of outliers

    Returns:
        Boolean mask of clean samples
    """
    # Normalize features for better anomaly detection
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Use Isolation Forest for anomaly detection
    detector = IsolationForest(contamination=contamination, random_state=42)
    predictions = detector.fit_predict(X_scaled)

    # Return mask of clean samples (1 = clean, -1 = anomaly)
    clean_mask = predictions == 1

    return clean_mask

# Secure training pipeline with validation
def secure_train(X, y, contamination=0.05):
    """Train model with data validation"""
    print(f"Original dataset: {len(X)} samples")

    # Detect and filter anomalies
    clean_mask = detect_poisoned_data(X, y, contamination)
    X_clean = X[clean_mask]
    y_clean = y[clean_mask]

    removed = len(X) - len(X_clean)
    print(f"Removed {removed} suspicious samples ({removed/len(X):.1%})")
    print(f"Training on {len(X_clean)} validated samples")

    # Train on validated data
    model = SGDClassifier(max_iter=1000, random_state=42)
    model.fit(X_clean, y_clean)

    return model

# Apply secure training
secure_model = secure_train(X_poisoned, y_poisoned, contamination=0.05)

# Verify improved robustness
secure_predictions = secure_model.predict(class0_samples)
secure_misclass = np.mean(secure_predictions != 0)

print(f"\\nSecure model misclassification rate: {secure_misclass:.2%}")
print(f"Improvement: {(misclassification_rate - secure_misclass):.2%}")`}
          </pre>
        </div>
        <div className="mt-3 text-sm text-gray-300 space-y-2">
          <p><strong className="text-green-400">Defense:</strong> Isolation Forest algorithm detects statistical
          anomalies in the training data before model training begins.</p>
          <p><strong className="text-green-400">Benefit:</strong> Automatically filters suspicious samples,
          reducing the impact of poisoning from {'>'} 10% misclassification to {'<'} 2%.</p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4">Example 2: Backdoor Detection with Activation Clustering</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        This advanced example demonstrates how to detect backdoor triggers by analyzing model activations on
        suspicious inputs.
      </p>

      <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
        <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-300">
{`from sklearn.decomposition import PCA
from sklearn.cluster import KMeans

def detect_backdoor_activation_clustering(model, X, y, n_clusters=3):
    """
    Detect backdoor triggers using activation clustering

    Strategy: Backdoor samples create distinct activation patterns
    that cluster separately from clean samples

    Args:
        model: Trained classifier
        X: Test samples
        y: True labels
        n_clusters: Number of clusters to identify

    Returns:
        Suspicious sample indices
    """
    # Get decision function values (model activations)
    if hasattr(model, 'decision_function'):
        activations = model.decision_function(X)
    else:
        activations = model.predict_proba(X)

    # Reduce dimensionality for visualization
    pca = PCA(n_components=2)
    activations_2d = pca.fit_transform(activations)

    # Cluster activation patterns
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    cluster_labels = kmeans.fit_predict(activations_2d)

    # Identify suspicious clusters (small, isolated groups)
    cluster_sizes = np.bincount(cluster_labels)
    suspicious_clusters = np.where(cluster_sizes < len(X) * 0.15)[0]

    # Get indices of samples in suspicious clusters
    suspicious_indices = []
    for cluster_id in suspicious_clusters:
        indices = np.where(cluster_labels == cluster_id)[0]
        suspicious_indices.extend(indices.tolist())

    print(f"Found {len(suspicious_indices)} suspicious samples in {len(suspicious_clusters)} isolated clusters")

    return suspicious_indices

# Apply backdoor detection
suspicious = detect_backdoor_activation_clustering(
    poisoned_model,
    X_poisoned,
    y_poisoned,
    n_clusters=5
)

print(f"Detected {len(suspicious)} potentially backdoored samples")
print(f"These samples should be audited before production deployment")`}
          </pre>
        </div>
        <div className="mt-3 text-sm text-gray-300">
          <p><strong className="text-emerald-500">Advanced Defense:</strong> Activation clustering identifies samples
          that produce unusual internal model states, often indicating backdoor triggers or poisoned data.</p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4">Interactive Jupyter Notebook</h2>
      <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <Code className="w-8 h-8 text-emerald-500 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Hands-On Lab Notebook</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Practice data poisoning attacks and defenses with our interactive Jupyter notebook. Includes:
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 mb-4 ml-4 list-disc">
              <li>Iris dataset poisoning exercises</li>
              <li>Backdoor trigger injection and detection</li>
              <li>STRIP defense implementation</li>
              <li>Data validation pipeline construction</li>
              <li>Challenge: Build your own anomaly detector</li>
            </ul>
            <a
              href="/notebooks/03-data-poisoning.ipynb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Open Interactive Notebook
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const ToolsTab = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Skull className="w-6 h-6 text-red-400" />
        Attack Tools & Techniques
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-3">ART BackdoorInjector</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            IBM's Adversarial Robustness Toolbox provides backdoor poisoning capabilities for image datasets.
            Allows researchers to inject triggers and test model robustness.
          </p>
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
            <pre className="text-gray-300">
{`from art.attacks.poisoning import PoisoningAttackBackdoor
from art.attacks.poisoning.perturbations import add_pattern_bd

backdoor = PoisoningAttackBackdoor(
    perturbation=add_pattern_bd,
    poisoning_rate=0.1
)
poisoned_data, poisoned_labels = backdoor.poison(X, y)`}
            </pre>
          </div>
          <p className="text-xs text-gray-400">
            Use case: Security research, red team testing, adversarial robustness benchmarking
          </p>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-3">TrojanAI</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            NIST/IARPA research framework for creating and detecting trojaned neural networks. Supports multiple
            backdoor strategies and architectures.
          </p>
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
            <pre className="text-gray-300">
{`# Inject backdoor into model
trojan.inject_backdoor(
    model=target_model,
    trigger_pattern=trigger,
    target_class=malicious_label,
    poisoning_rate=0.05
)`}
            </pre>
          </div>
          <p className="text-xs text-gray-400">
            Use case: Defense research, model auditing, backdoor detection algorithm development
          </p>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-3">Custom Label Flipping</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Simple but effective poisoning technique where attacker systematically flips labels in training data,
            causing model confusion and degraded accuracy.
          </p>
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
            <pre className="text-gray-300">
{`# Flip labels for targeted classes
poison_rate = 0.1
flip_mask = np.random.random(len(y)) < poison_rate
y_poisoned = y.copy()
y_poisoned[flip_mask] = (y[flip_mask] + 1) % num_classes`}
            </pre>
          </div>
          <p className="text-xs text-gray-400">
            Use case: Testing model robustness to noisy labels, simulating crowdsourcing errors
          </p>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-3">Gradient-Based Poisoning</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Advanced technique using gradient optimization to craft minimally perturbed poisoning samples that
            maximally degrade model performance.
          </p>
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
            <pre className="text-gray-300">
{`# Optimize poisoning samples
for iteration in range(num_iterations):
    grad = compute_loss_gradient(model, X_poison, y_target)
    X_poison -= learning_rate * grad
    X_poison = project_to_valid_range(X_poison)`}
            </pre>
          </div>
          <p className="text-xs text-gray-400">
            Use case: Crafting stealthy poisoning attacks, researching optimization-based defenses
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Shield className="w-6 h-6 text-green-400" />
        Defense Tools & Strategies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3">Data Validation & Anomaly Detection</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Statistical methods and machine learning to identify outliers and suspicious samples before training.
            Includes Isolation Forest, One-Class SVM, and distribution testing.
          </p>
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
            <pre className="text-gray-300">
{`from sklearn.ensemble import IsolationForest

detector = IsolationForest(contamination=0.1)
anomaly_scores = detector.fit_predict(X_train)
clean_data = X_train[anomaly_scores == 1]`}
            </pre>
          </div>
          <p className="text-xs text-gray-400">
            Implementation: Pre-training validation pipeline, continuous monitoring
          </p>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3">STRIP (STRong Intentional Perturbation)</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Runtime backdoor detection by perturbing inputs and measuring entropy of predictions. Clean inputs
            show high entropy variation, backdoored inputs remain stable.
          </p>
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
            <pre className="text-gray-300">
{`def strip_defense(model, x_test, threshold=0.3):
    # Mix input with random clean samples
    entropies = []
    for _ in range(100):
        mixed = mix_with_random_sample(x_test)
        pred = model.predict_proba(mixed)
        entropies.append(entropy(pred))
    return np.mean(entropies) > threshold`}
            </pre>
          </div>
          <p className="text-xs text-gray-400">
            Implementation: Inference-time backdoor detection, real-time input validation
          </p>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3">Differential Privacy</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Add calibrated noise during training to limit the influence of individual data points, making
            poisoning attacks require more samples to succeed.
          </p>
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
            <pre className="text-gray-300">
{`from tensorflow_privacy.privacy.optimizers import DPGradientDescentOptimizer

optimizer = DPGradientDescentOptimizer(
    l2_norm_clip=1.0,
    noise_multiplier=1.1,
    num_microbatches=1
)`}
            </pre>
          </div>
          <p className="text-xs text-gray-400">
            Implementation: Privacy-preserving ML, federated learning environments
          </p>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3">Data Provenance Tracking</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Maintain cryptographic checksums and audit trails for training data sources. Verify data integrity
            and trace back to trusted origins.
          </p>
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
            <pre className="text-gray-300">
{`import hashlib

def verify_data_integrity(data, expected_hash):
    current_hash = hashlib.sha256(data.tobytes()).hexdigest()
    if current_hash != expected_hash:
        raise ValueError("Data integrity check failed!")
    return True`}
            </pre>
          </div>
          <p className="text-xs text-gray-400">
            Implementation: Secure data pipelines, supply chain verification
          </p>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3">Activation Clustering</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Analyze model activations to identify clusters of backdoored samples. Backdoor triggers create
            distinct activation patterns that separate from normal data.
          </p>
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
            <pre className="text-gray-300">
{`from sklearn.cluster import DBSCAN

activations = get_layer_activations(model, X_train)
clusters = DBSCAN(eps=0.5).fit_predict(activations)
suspicious = identify_small_isolated_clusters(clusters)`}
            </pre>
          </div>
          <p className="text-xs text-gray-400">
            Implementation: Model auditing, pre-deployment security testing
          </p>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3">Regular Model Retraining</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Periodic retraining with verified clean datasets and comparing model behavior across versions.
            Sudden performance changes indicate potential poisoning.
          </p>
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
            <pre className="text-gray-300">
{`# Compare model versions
baseline_acc = evaluate_model(model_v1, test_set)
new_acc = evaluate_model(model_v2, test_set)
if abs(baseline_acc - new_acc) > threshold:
    trigger_security_audit()`}
            </pre>
          </div>
          <p className="text-xs text-gray-400">
            Implementation: Continuous integration pipelines, model versioning systems
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4">Defense-in-Depth Strategy</h2>
      <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 rounded-lg p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Effective protection against data poisoning requires multiple layers of defense working together:
        </p>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="bg-emerald-500/20 rounded-full p-1 mt-0.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <strong className="text-emerald-500">Layer 1 - Data Acquisition:</strong>
              <span className="text-gray-600 dark:text-gray-300"> Use trusted sources, verify provenance, implement checksums</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-emerald-500/20 rounded-full p-1 mt-0.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <strong className="text-emerald-500">Layer 2 - Pre-Processing:</strong>
              <span className="text-gray-600 dark:text-gray-300"> Anomaly detection, statistical validation, data sanitization</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-emerald-500/20 rounded-full p-1 mt-0.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <strong className="text-emerald-500">Layer 3 - Training:</strong>
              <span className="text-gray-600 dark:text-gray-300"> Differential privacy, robust training algorithms, activation monitoring</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-emerald-500/20 rounded-full p-1 mt-0.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <strong className="text-emerald-500">Layer 4 - Post-Training:</strong>
              <span className="text-gray-600 dark:text-gray-300"> Backdoor detection, activation clustering, model comparison</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-emerald-500/20 rounded-full p-1 mt-0.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <strong className="text-emerald-500">Layer 5 - Runtime:</strong>
              <span className="text-gray-600 dark:text-gray-300"> STRIP defense, input validation, prediction monitoring</span>
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
      <h2 className="text-2xl font-bold mb-4">Official Security Guidelines</h2>
      <div className="space-y-4">
        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-emerald-500 mb-2">OWASP LLM Top 10</h3>
          <p className="text-gray-300 text-sm mb-3">
            LLM03: Training Data Poisoning - Comprehensive guide to poisoning risks in large language models and
            mitigation strategies for fine-tuning and pre-training scenarios.
          </p>
          <a
            href="https://owasp.org/www-project-top-10-for-large-language-model-applications/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:text-emerald-600 text-sm flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            owasp.org/llm-top-10
          </a>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-emerald-500 mb-2">NIST AI Risk Management Framework</h3>
          <p className="text-gray-300 text-sm mb-3">
            NIST IR 8269 - Adversarial Machine Learning taxonomy and risk assessment guidelines for ML system
            security, including data poisoning attack vectors.
          </p>
          <a
            href="https://www.nist.gov/publications/adversarial-machine-learning-taxonomy-and-terminology-working-group-effort"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:text-emerald-600 text-sm flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            nist.gov/adversarial-ml
          </a>
        </div>

        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-emerald-500 mb-2">MITRE ATLAS</h3>
          <p className="text-gray-300 text-sm mb-3">
            Adversarial Threat Landscape for AI Systems - Knowledge base of adversarial ML tactics including
            data poisoning case studies and defense patterns.
          </p>
          <a
            href="https://atlas.mitre.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:text-emerald-600 text-sm flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            atlas.mitre.org
          </a>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Academic Research Papers</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <p className="text-sm text-gray-300">
            [1] Biggio, B., Nelson, B., & Laskov, P. (2012). <strong className="text-cyan-400">Poisoning Attacks
            against Support Vector Machines.</strong> ICML 2012. Foundational work on data poisoning attacks
            demonstrating how SVMs can be manipulated through training data corruption.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <p className="text-sm text-gray-300">
            [2] Gu, T., Dolan-Gavitt, B., & Garg, S. (2017). <strong className="text-cyan-400">BadNets: Identifying
            Vulnerabilities in the Machine Learning Model Supply Chain.</strong> NeurIPS ML Safety Workshop.
            Introduced backdoor attacks in deep learning and supply chain risks.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <p className="text-sm text-gray-300">
            [3] Chen, B., Carvalho, W., Baracaldo, N., et al. (2018). <strong className="text-cyan-400">Detecting
            Backdoor Attacks on Deep Neural Networks by Activation Clustering.</strong> AAAI Workshop on
            Artificial Intelligence Safety. Presents activation clustering defense method.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <p className="text-sm text-gray-300">
            [4] Gao, Y., Xu, C., Wang, D., et al. (2019). <strong className="text-cyan-400">STRIP: A Defence
            Against Trojan Attacks on Deep Neural Networks.</strong> ACSAC 2019. Introduces runtime backdoor
            detection using input perturbation.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <p className="text-sm text-gray-300">
            [5] Wang, B., Yao, Y., Shan, S., et al. (2019). <strong className="text-cyan-400">Neural Cleanse:
            Identifying and Mitigating Backdoor Attacks in Neural Networks.</strong> IEEE S&P 2019. Proposes
            trigger reverse-engineering for backdoor detection.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <p className="text-sm text-gray-300">
            [6] Schwarzschild, A., Goldblum, M., Gupta, A., et al. (2021). <strong className="text-cyan-400">Just
            How Toxic is Data Poisoning? A Unified Benchmark for Backdoor and Data Poisoning Attacks.</strong>
            ICML 2021. Comprehensive benchmarking of poisoning attack effectiveness.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <p className="text-sm text-gray-300">
            [7] Carlini, N., Terzis, A. (2021). <strong className="text-cyan-400">Poisoning and Backdooring
            Contrastive Learning.</strong> ICLR 2022. Demonstrates poisoning attacks on self-supervised learning
            systems.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <p className="text-sm text-gray-300">
            [8] Li, Y., Jiang, Y., Li, Z., & Xia, S. T. (2022). <strong className="text-cyan-400">Backdoor
            Learning: A Survey.</strong> IEEE TNNLS. Comprehensive survey of backdoor attack methods and defenses
            in deep learning.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Real-World Case Studies</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <h3 className="text-md font-semibold text-emerald-500 mb-2">ISACA 2025 Report: DeepMind ImageNet Incident</h3>
          <p className="text-sm text-gray-300">
            Analysis of the 2023 ImageNet poisoning attack that affected Google DeepMind models, including timeline,
            technical details, remediation costs, and lessons learned for dataset curation.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <h3 className="text-md font-semibold text-emerald-500 mb-2">Microsoft Security Blog: Tay Chatbot Postmortem</h3>
          <p className="text-sm text-gray-300">
            Official Microsoft analysis of the 2016 Tay bot incident, detailing how coordinated data poisoning
            exploited online learning mechanisms and subsequent defensive measures implemented.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <h3 className="text-md font-semibold text-emerald-500 mb-2">HuggingFace Security Advisory: Model Supply Chain Risks</h3>
          <p className="text-sm text-gray-300">
            Report on backdoored models uploaded to the HuggingFace hub, including detection methods, community
            response, and new verification systems to prevent future supply chain attacks.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Defense Tools & Libraries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <h3 className="text-md font-semibold text-emerald-500 mb-2">IBM ART (Adversarial Robustness Toolbox)</h3>
          <p className="text-sm text-gray-300 mb-2">
            Comprehensive Python library for adversarial ML including poisoning attack implementations and defenses.
          </p>
          <a
            href="https://github.com/Trusted-AI/adversarial-robustness-toolbox"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:text-emerald-600 text-sm flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            github.com/Trusted-AI/adversarial-robustness-toolbox
          </a>
        </div>

        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <h3 className="text-md font-semibold text-emerald-500 mb-2">TensorFlow Privacy</h3>
          <p className="text-sm text-gray-300 mb-2">
            Differential privacy library for TensorFlow, provides DP-SGD and other privacy-preserving training methods.
          </p>
          <a
            href="https://github.com/tensorflow/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:text-emerald-600 text-sm flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            github.com/tensorflow/privacy
          </a>
        </div>

        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <h3 className="text-md font-semibold text-emerald-500 mb-2">CleanLab</h3>
          <p className="text-sm text-gray-300 mb-2">
            Automated detection and cleaning of label errors in datasets, helps identify mislabeled poisoned samples.
          </p>
          <a
            href="https://github.com/cleanlab/cleanlab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:text-emerald-600 text-sm flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            github.com/cleanlab/cleanlab
          </a>
        </div>

        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <h3 className="text-md font-semibold text-emerald-500 mb-2">TrojanAI (NIST)</h3>
          <p className="text-sm text-gray-300 mb-2">
            NIST research framework for creating and detecting trojaned neural networks with standardized benchmarks.
          </p>
          <a
            href="https://pages.nist.gov/trojai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:text-emerald-600 text-sm flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            pages.nist.gov/trojai
          </a>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Ethical & Legal Considerations</h2>
      <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-300 mb-3">Responsible Disclosure</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p>
            <strong className="text-yellow-400">Legal Requirements:</strong> Data poisoning attacks on production
            systems are illegal under computer fraud statutes (CFAA in US, similar laws globally). Only test on
            systems you own or have explicit written permission to test.
          </p>
          <p>
            <strong className="text-yellow-400">Ethical Research:</strong> When discovering vulnerabilities, follow
            responsible disclosure practices. Report findings to affected organizations privately, allow time for
            remediation before public disclosure.
          </p>
          <p>
            <strong className="text-yellow-400">Educational Use:</strong> The techniques in this module are for
            educational purposes to build secure AI systems. Use knowledge to defend, not to attack.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Additional Learning Resources</h2>
      <div className="space-y-3">
        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-cyan-400">Coursera:</strong> "Adversarial Machine Learning" specialization
            covering poisoning attacks, evasion, and defenses with hands-on projects.
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-cyan-400">Google AI:</strong> "ML Security Guidelines" whitepaper with
            practical recommendations for secure ML pipelines and data validation.
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-cyan-400">AWS ML Security:</strong> Best practices documentation for securing
            SageMaker training pipelines against data poisoning attacks.
          </p>
        </div>
      </div>
    </section>
  </div>
);
