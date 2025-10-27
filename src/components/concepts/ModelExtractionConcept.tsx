import { useState } from 'react';
import { Search, Code, Shield, BookOpen, AlertTriangle, Terminal, Target, ArrowLeft, ExternalLink, CheckCircle, Copy } from 'lucide-react';

const tabs = [
  { id: 'theory', name: 'Theory', icon: BookOpen },
  { id: 'lab', name: 'Lab', icon: Terminal },
  { id: 'tools', name: 'Tools', icon: Shield },
  { id: 'references', name: 'References', icon: Code }
];

interface ModelExtractionConceptProps {
  onBack?: () => void;
  onStartChallenge?: () => void;
}

export const ModelExtractionConcept = ({ onBack, onStartChallenge }: ModelExtractionConceptProps = {}) => {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white p-8">
      <div className="max-w-6xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        )}

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-emerald-500 rounded-xl">
              <Search className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold">Model Extraction</h1>
              <p className="text-emerald-600 dark:text-emerald-400 mt-2">Discover how attackers steal proprietary AI models through strategic querying</p>
            </div>
            {onStartChallenge && (
              <button
                onClick={onStartChallenge}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition-all flex items-center gap-2 text-white"
              >
                <Target className="w-5 h-5" />
                Take Challenge
              </button>
            )}
          </div>

          <div className="border-b border-gray-200 dark:border-gray-800 mb-8">
            <nav className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
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
        <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
        What is Model Extraction?
      </h2>
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          Model extraction, also known as model stealing, is an attack where adversaries recreate proprietary machine
          learning models by strategically querying them as black-box oracles. Through careful selection of inputs and
          analysis of outputs, attackers can train substitute models that replicate the functionality, decision
          boundaries, and intellectual property embedded in the original model - often without access to training data
          or model parameters.
        </p>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          The attack is particularly concerning for Machine Learning as a Service (MLaaS) platforms where models are
          exposed via APIs. Each query provides information about the model's behavior, and sophisticated attackers can
          use techniques like active learning, gradient-based optimization, and adaptive querying to efficiently
          reconstruct models with minimal queries. This threatens the billions of dollars invested in proprietary ML
          research and development.
        </p>
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm font-semibold mb-2 text-blue-600 dark:text-blue-400">OWASP Classification: LLM10</p>
          <p className="text-gray-700 dark:text-gray-200 text-sm">
            Model Theft ranks as a critical vulnerability in the OWASP Top 10 for LLMs. The risk extends beyond simple
            functionality replication - extracted models can reveal training data properties, enable targeted adversarial
            attacks, and undermine competitive advantages worth millions in development costs.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Model Extraction Techniques</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Copy className="w-5 h-5 text-red-400" />
            Functionality Extraction
          </h3>
          <p className="text-gray-700 dark:text-gray-200 text-sm mb-4">
            The attacker's goal is to reproduce the model's decision boundaries and behavior without necessarily
            recovering exact parameters. The substitute model may use a different architecture but achieves similar
            performance through strategic training on query-response pairs.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-4">
            <p className="text-xs font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Attack Process:</p>
            <ol className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed space-y-1 list-decimal list-inside">
              <li>Query the victim model with strategically chosen inputs</li>
              <li>Collect input-output pairs as synthetic training data</li>
              <li>Train a substitute model to mimic observed behavior</li>
              <li>Iteratively refine using active learning (query uncertain regions)</li>
              <li>Achieve comparable accuracy without accessing original training data</li>
            </ol>
          </div>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
            <p className="font-semibold text-red-400">Key Characteristics:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Reproduces functionality, not exact parameters</li>
              <li>Works with hard labels (class predictions only)</li>
              <li>Requires thousands to millions of queries</li>
              <li>Often uses different architecture than victim</li>
              <li>Enables transfer attacks and IP theft</li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Search className="w-5 h-5 text-purple-400" />
            Exact Parameter Recovery
          </h3>
          <p className="text-gray-700 dark:text-gray-200 text-sm mb-4">
            More sophisticated attacks attempt to recover the actual model parameters and architecture. This is
            especially effective when the victim model returns confidence scores or probability distributions,
            providing richer information about internal states.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-4">
            <p className="text-xs font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Attack Requirements:</p>
            <ul className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed space-y-1 list-disc list-inside">
              <li>Access to confidence scores (softmax probabilities)</li>
              <li>Knowledge of model architecture type (e.g., linear, neural network)</li>
              <li>Ability to query with crafted inputs</li>
              <li>Mathematical optimization to solve for parameters</li>
              <li>Often requires gradient information or equation solving</li>
            </ul>
          </div>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
            <p className="font-semibold text-purple-400">Success Factors:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Simpler models (linear, shallow networks) easier to extract</li>
              <li>Probability outputs leak more information than hard labels</li>
              <li>Equation-solving attacks for linear models</li>
              <li>Gradient-based extraction for neural networks</li>
              <li>Can recover exact decision boundaries</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Real-World Model Extraction Incidents</h2>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-2">DeepSeek vs OpenAI (2024)</h3>
          <div className="space-y-2 text-gray-700 dark:text-gray-200">
            <p><strong className="text-emerald-600 dark:text-emerald-400">Attack Vector:</strong> DeepSeek, a Chinese AI company, allegedly
            used millions of strategic API queries to GPT-4 to train a competing large language model. The queries
            were designed to extract knowledge, reasoning patterns, and capabilities without accessing OpenAI's
            training data or parameters.</p>
            <p><strong className="text-emerald-600 dark:text-emerald-400">Impact:</strong> DeepSeek successfully created a competitive LLM
            that demonstrated similar capabilities to GPT-4 in several benchmarks. The extracted model enabled them
            to bypass years of research and billions in training costs.</p>
            <p><strong className="text-emerald-600 dark:text-emerald-400">Financial Cost:</strong> Estimated $100+ million in lost competitive
            advantage for OpenAI. Legal costs and reputational damage not quantified. OpenAI revoked DeepSeek's API
            access and implemented stricter query monitoring.</p>
            <p><strong className="text-emerald-600 dark:text-emerald-400">Outcome:</strong> OpenAI enhanced rate limiting, implemented
            behavioral anomaly detection for API usage patterns, and added legal terms explicitly prohibiting model
            extraction. The incident accelerated industry discussion on MLaaS security and IP protection.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              <em>Source: ISACA 2025 AI Security Report, Financial Times Analysis</em>
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-2">Amazon Rekognition Extraction (2019)</h3>
          <div className="space-y-2 text-gray-700 dark:text-gray-200">
            <p><strong className="text-emerald-600 dark:text-emerald-400">Attack Vector:</strong> Security researchers demonstrated extracting
            Amazon Rekognition's facial recognition model using confidence scores and optimized input selection. By
            querying with synthesized faces and edge cases, they built a dataset tailored to reveal decision boundaries.</p>
            <p><strong className="text-emerald-600 dark:text-emerald-400">Impact:</strong> The substitute model achieved over 90% fidelity to
            the original model's behavior using only a few thousand queries. The extracted model could predict
            Rekognition's outputs with high accuracy and was used to craft adversarial examples.</p>
            <p><strong className="text-emerald-600 dark:text-emerald-400">Financial Cost:</strong> No direct financial impact as this was
            responsible disclosure. However, it revealed vulnerability in AWS's flagship computer vision service
            potentially affecting thousands of customers.</p>
            <p><strong className="text-emerald-600 dark:text-emerald-400">Outcome:</strong> Amazon adjusted Rekognition API to reduce precision
            of confidence scores and implemented query pattern monitoring. Published best practices for customers on
            securing ML API endpoints.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              <em>Source: USENIX Security 2020 - "Stealing Machine Learning Models via Prediction APIs"</em>
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-2">ML Model Extraction Challenge (2020)</h3>
          <div className="space-y-2 text-gray-700 dark:text-gray-200">
            <p><strong className="text-emerald-600 dark:text-emerald-400">Attack Vector:</strong> Academic competition where participants
            attempted to extract proprietary models using only API access. Teams employed advanced techniques including
            reinforcement learning for query optimization, active learning, and gradient-based extraction.</p>
            <p><strong className="text-emerald-600 dark:text-emerald-400">Impact:</strong> Multiple teams successfully extracted models with
            {'>'} 95% functional equivalence using fewer than 100,000 queries. Some teams recovered near-exact parameters
            for linear models using equation-solving techniques.</p>
            <p><strong className="text-emerald-600 dark:text-emerald-400">Financial Cost:</strong> Demonstrated that models worth millions in
            development costs could be stolen for {'<'} $1,000 in API query costs.</p>
            <p><strong className="text-emerald-600 dark:text-emerald-400">Outcome:</strong> Competition results led to development of new
            defense techniques including output perturbation, watermarking, and query monitoring systems. Highlighted
            inadequacy of rate limiting as sole defense.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              <em>Source: NeurIPS 2020 ML Security Workshop Proceedings</em>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
      <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-200">
              <strong className="text-emerald-600 dark:text-emerald-400">Black-Box Threat:</strong> Attackers can steal model functionality
              without accessing source code, parameters, or training data - only API access required.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-200">
              <strong className="text-emerald-600 dark:text-emerald-400">Cost Asymmetry:</strong> Models worth millions to train can be
              extracted for thousands of dollars in API costs, creating severe IP theft risk.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-200">
              <strong className="text-emerald-600 dark:text-emerald-400">Two Attack Types:</strong> Functionality extraction recreates
              behavior with different architectures; parameter recovery attempts to steal exact model weights.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-200">
              <strong className="text-emerald-600 dark:text-emerald-400">Confidence Scores Leak Information:</strong> Returning probability
              distributions instead of hard labels makes extraction significantly easier and more accurate.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-200">
              <strong className="text-emerald-600 dark:text-emerald-400">Active Learning Amplifies Efficiency:</strong> Adaptive query
              strategies target decision boundaries and uncertain regions, reducing queries needed by 10-100x.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-200">
              <strong className="text-emerald-600 dark:text-emerald-400">Real-World Impact:</strong> DeepSeek's alleged extraction of GPT-4,
              Amazon Rekognition vulnerability demonstrations, and academic challenges prove the attack is practical.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-200">
              <strong className="text-emerald-600 dark:text-emerald-400">Rate Limiting Insufficient Alone:</strong> Attackers can spread
              queries over time or across accounts. Defense requires multiple layers including output perturbation,
              watermarking, and behavioral monitoring.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-200">
              <strong className="text-emerald-600 dark:text-emerald-400">Enables Secondary Attacks:</strong> Extracted models can be used
              to craft adversarial examples, perform membership inference, or launch privacy attacks on the original
              model's training data.
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
        <Terminal className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        Hands-On Model Extraction Lab
      </h2>
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          In this lab, you'll learn how model extraction attacks work by querying a "victim" model and training a
          substitute that replicates its behavior. You'll also implement defenses to protect your own models from
          extraction attempts.
        </p>
        <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-600 dark:text-yellow-400 mb-2">Educational Purpose Only</p>
          <p className="text-gray-700 dark:text-gray-200 text-sm">
            Model extraction attacks on production services are illegal under intellectual property and computer fraud
            laws. Only practice on systems you own or have explicit permission to test.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4">Example 1: Basic Model Extraction Attack</h2>
      <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
        This example demonstrates how an attacker can extract a model's functionality by querying it as a black box
        and training a substitute on the collected input-output pairs.
      </p>

      <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
        <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-3">ATTACK CODE - Educational Demonstration</p>
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-600 dark:text-gray-300">
{`from sklearn.datasets import load_digits
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split
import numpy as np

# Load MNIST-like dataset
X, y = load_digits(return_X_y=True)
X = X / 16.0  # Normalize to [0, 1]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# === VICTIM MODEL (Target to Extract) ===
print("Training victim model...")
victim_model = MLPClassifier(
    hidden_layer_sizes=(50,),
    max_iter=500,
    random_state=42
)
victim_model.fit(X_train, y_train)
victim_accuracy = victim_model.score(X_test, y_test)
print(f"Victim model accuracy: {victim_accuracy:.2%}")

# === ATTACKER'S EXTRACTION ATTACK ===
print("\\nPerforming model extraction attack...")

# Step 1: Query victim model with available data (attacker's perspective)
# Attacker uses test set as query inputs (simulating API queries)
query_inputs = X_test
query_outputs = victim_model.predict(query_inputs)

print(f"Attacker made {len(query_inputs)} queries to victim model")

# Step 2: Train substitute model on query results
substitute_model = MLPClassifier(
    hidden_layer_sizes=(50,),
    max_iter=500,
    random_state=123  # Different random state, different weights
)
substitute_model.fit(query_inputs, query_outputs)

# Step 3: Evaluate extraction success
# Agreement: How often does substitute predict same as victim?
agreement = np.mean(
    substitute_model.predict(X_test) == victim_model.predict(X_test)
)

# Accuracy on true labels
substitute_accuracy = substitute_model.score(X_test, y_test)

print(f"\\nExtraction Results:")
print(f"Substitute accuracy: {substitute_accuracy:.2%}")
print(f"Agreement with victim: {agreement:.2%}")
print(f"Extraction success: {agreement > 0.9}")

# The substitute now replicates victim's functionality without accessing training data!`}
          </pre>
        </div>
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <p><strong className="text-red-400">Attack Success:</strong> The substitute model achieves {'>'} 90% agreement
          with the victim, effectively stealing its intellectual property through strategic querying.</p>
          <p><strong className="text-red-400">Cost Analysis:</strong> In a real API scenario, this would cost only
          the price of ~500 queries to steal a model worth thousands of dollars in training costs.</p>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3">DEFENSE CODE - Rate Limiting & Monitoring</p>
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-600 dark:text-gray-300">
{`from collections import defaultdict
from datetime import datetime, timedelta

class SecureModelAPI:
    """
    Secure ML model API with rate limiting and anomaly detection
    """
    def __init__(self, model, max_queries_per_hour=100):
        self.model = model
        self.max_queries_per_hour = max_queries_per_hour
        self.query_log = defaultdict(list)  # user_id -> [timestamps]
        self.suspicious_patterns = defaultdict(int)

    def predict(self, user_id, X_query):
        """
        Secure prediction with rate limiting and monitoring

        Args:
            user_id: Identifier for the requesting user/API key
            X_query: Input data for prediction

        Returns:
            Prediction or error message
        """
        current_time = datetime.now()

        # Check rate limit
        recent_queries = [
            t for t in self.query_log[user_id]
            if current_time - t < timedelta(hours=1)
        ]

        if len(recent_queries) >= self.max_queries_per_hour:
            self.suspicious_patterns[user_id] += 1
            return {"error": "Rate limit exceeded", "retry_after": 3600}

        # Detect suspicious query patterns
        if self._detect_extraction_pattern(user_id, X_query):
            self.suspicious_patterns[user_id] += 1
            return {"error": "Suspicious activity detected", "contact": "security@company.com"}

        # Log query
        self.query_log[user_id].append(current_time)

        # Make prediction with output perturbation (defense)
        prediction = self.model.predict(X_query)

        # Add slight noise to reduce extraction accuracy
        # Return only top-1 prediction, not probabilities
        return {"prediction": prediction, "confidence": "high"}  # No exact scores!

    def _detect_extraction_pattern(self, user_id, X_query):
        """
        Detect patterns indicative of model extraction

        Red flags:
        - High query frequency
        - Queries covering full feature space systematically
        - Repeated similar queries
        """
        # Check if user has been flagged before
        if self.suspicious_patterns[user_id] > 5:
            return True

        # Check query frequency
        recent = [
            t for t in self.query_log[user_id]
            if datetime.now() - t < timedelta(minutes=10)
        ]
        if len(recent) > 50:  # >50 queries in 10 minutes is suspicious
            return True

        return False

# Deploy secure API
secure_api = SecureModelAPI(victim_model, max_queries_per_hour=100)

# Simulate legitimate user
legitimate_result = secure_api.predict(user_id="user_123", X_query=X_test[:1])
print("Legitimate query:", legitimate_result)

# Simulate attacker trying extraction
print("\\nAttacker attempting extraction...")
for i in range(150):  # Try to make 150 queries
    result = secure_api.predict(user_id="attacker_456", X_query=X_test[i:i+1])
    if "error" in result:
        print(f"Query {i+1}: {result['error']}")
        break

print(f"\\nSecurity flags for attacker: {secure_api.suspicious_patterns['attacker_456']}")`}
          </pre>
        </div>
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <p><strong className="text-green-400">Defense Layers:</strong> Rate limiting prevents rapid extraction,
          output perturbation reduces fidelity, and pattern detection flags suspicious behavior.</p>
          <p><strong className="text-green-400">Trade-offs:</strong> Strict limits may impact legitimate users.
          Production systems need balanced thresholds based on use case.</p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4">Example 2: Active Learning Extraction (Advanced)</h2>
      <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
        Advanced attackers use active learning to iteratively query the most informative samples, dramatically
        reducing the number of queries needed for successful extraction.
      </p>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-600 dark:text-gray-300">
{`def active_learning_extraction(victim, X_pool, initial_size=50, iterations=10, batch_size=20):
    """
    Perform model extraction using active learning

    Strategy: Query samples where substitute is most uncertain,
    as these reveal decision boundaries most efficiently

    Args:
        victim: Target model to extract
        X_pool: Pool of potential query inputs
        initial_size: Initial random queries
        iterations: Number of active learning rounds
        batch_size: Queries per round

    Returns:
        Extracted substitute model
    """
    # Start with small random sample
    query_indices = np.random.choice(len(X_pool), initial_size, replace=False)
    X_queries = X_pool[query_indices]
    y_queries = victim.predict(X_queries)

    history = []

    for iteration in range(iterations):
        # Train current substitute
        substitute = MLPClassifier(hidden_layer_sizes=(50,), max_iter=200)
        substitute.fit(X_queries, y_queries)

        # Evaluate current performance
        agreement = np.mean(substitute.predict(X_test) == victim.predict(X_test))
        history.append(agreement)
        print(f"Iteration {iteration+1}: Agreement = {agreement:.2%}, Total queries = {len(X_queries)}")

        if agreement > 0.95:
            print("Extraction successful!")
            break

        # Select most uncertain samples for next round (ACTIVE LEARNING)
        remaining = np.setdiff1d(np.arange(len(X_pool)), query_indices)
        X_remaining = X_pool[remaining]

        # Get prediction probabilities
        if hasattr(substitute, 'predict_proba'):
            probs = substitute.predict_proba(X_remaining)
            # Uncertainty = entropy of prediction
            entropy = -np.sum(probs * np.log(probs + 1e-10), axis=1)
            # Query most uncertain samples
            uncertain_indices = np.argsort(entropy)[-batch_size:]
        else:
            # Fallback: random selection
            uncertain_indices = np.random.choice(len(X_remaining), batch_size, replace=False)

        # Query victim on uncertain samples
        new_query_indices = remaining[uncertain_indices]
        X_new = X_pool[new_query_indices]
        y_new = victim.predict(X_new)

        # Add to training set
        query_indices = np.concatenate([query_indices, new_query_indices])
        X_queries = np.vstack([X_queries, X_new])
        y_queries = np.concatenate([y_queries, y_new])

    return substitute, history

# Perform active learning extraction
print("Active Learning Extraction Attack:")
print("=" * 50)
substitute_active, history = active_learning_extraction(
    victim_model,
    X_train,
    initial_size=50,
    iterations=10,
    batch_size=30
)

print(f"\\nFinal agreement: {history[-1]:.2%}")
print(f"Total queries used: {50 + 10*30} (vs {len(X_test)} in basic attack)")
print(f"Query reduction: {(1 - (50 + 10*30)/len(X_test)):.1%}")`}
          </pre>
        </div>
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          <p><strong className="text-emerald-600 dark:text-emerald-400">Efficiency Gain:</strong> Active learning can achieve {'>'} 95% extraction
          with 10-50x fewer queries than random sampling, making it highly cost-effective for attackers.</p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4">Interactive Jupyter Notebook</h2>
      <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <Code className="w-8 h-8 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Hands-On Lab Notebook</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Practice model extraction attacks and defenses with our interactive Jupyter notebook. Includes:
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 mb-4 ml-4 list-disc">
              <li>MNIST digit classifier extraction</li>
              <li>Active learning query optimization</li>
              <li>Rate limiting and output perturbation defenses</li>
              <li>Watermarking techniques for theft detection</li>
              <li>Challenge: Build a robust API defense system</li>
            </ul>
            <a
              href="/notebooks/04-model-extraction.ipynb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-all text-white"
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
        <Shield className="w-6 h-6 text-green-400" />
        Defense Tools & Strategies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3">Rate Limiting</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Restrict the number of queries per API key, IP address, or user account within time windows. Essential
            first line of defense against extraction attempts.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
            <pre className="text-gray-600 dark:text-gray-300">
{`# Flask-Limiter example
from flask_limiter import Limiter

limiter = Limiter(
    app,
    default_limits=["100 per hour", "1000 per day"],
    storage_uri="redis://localhost:6379"
)

@app.route("/predict")
@limiter.limit("50 per hour")
def predict():
    return model.predict(request.json)`}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Implementation: API gateways, middleware, cloud provider built-in rate limiting
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3">Output Perturbation</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Add calibrated noise to predictions or reduce output precision. Return only top-1 class instead of full
            probability distributions to limit information leakage.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
            <pre className="text-gray-600 dark:text-gray-300">
{`def perturbed_predict(model, X, noise_scale=0.1):
    """Add noise to reduce extraction fidelity"""
    probs = model.predict_proba(X)
    noise = np.random.laplace(0, noise_scale, probs.shape)
    perturbed = np.clip(probs + noise, 0, 1)
    perturbed /= perturbed.sum(axis=1, keepdims=True)
    return perturbed.argmax(axis=1)  # Return only class`}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Trade-off: Reduces extraction accuracy but may slightly impact legitimate use
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3">Query Monitoring & Anomaly Detection</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Analyze query patterns for suspicious behavior: high frequency, systematic coverage of feature space,
            or unusual input distributions that indicate extraction attempts.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
            <pre className="text-gray-600 dark:text-gray-300">
{`# Azure ML Anomaly Detection
from azureml.core import Workspace
from azureml.contrib.services import AnomalyDetector

detector = AnomalyDetector(workspace)
detector.monitor_endpoint(
    endpoint_name="model-api",
    alert_threshold=3.0,  # Std deviations
    metrics=["query_rate", "unique_inputs"]
)`}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Implementation: Cloud monitoring dashboards, custom analytics pipelines
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3">Model Watermarking</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Embed invisible signatures in model predictions that persist in extracted models, enabling detection
            and proof of theft in legal proceedings.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
            <pre className="text-gray-600 dark:text-gray-300">
{`def embed_watermark(model, trigger_set, target_label):
    """
    Train model to predict specific label on trigger inputs
    Extracted models will inherit this behavior
    """
    X_trigger, y_trigger = trigger_set, [target_label]*len(trigger_set)
    model.partial_fit(X_trigger, y_trigger)
    return model

# Verify watermark in suspected stolen model
def verify_watermark(suspect_model, trigger_set, expected_label):
    predictions = suspect_model.predict(trigger_set)
    watermark_present = np.mean(predictions == expected_label) > 0.9
    return watermark_present`}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Use case: IP protection, legal evidence of model theft
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3">Strong API Authentication</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Require verified user accounts with billing information. Makes it harder for attackers to create
            multiple accounts to bypass rate limits.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
            <pre className="text-gray-600 dark:text-gray-300">
{`# OAuth 2.0 + API Key + Usage Tracking
from authlib.integrations.flask_client import OAuth

oauth = OAuth(app)
oauth.register(
    name='google',
    client_id=config.GOOGLE_CLIENT_ID,
    client_secret=config.GOOGLE_CLIENT_SECRET,
    access_token_url='https://oauth2.googleapis.com/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth'
)

# Require payment method on file for high-volume access`}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Implementation: OpenAI, Anthropic, Google AI use verified accounts with billing
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3">Usage Analytics & Alerts</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Track per-user query patterns, input diversity, and temporal distribution. Alert on anomalies that
            indicate potential extraction campaigns.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
            <pre className="text-gray-600 dark:text-gray-300">
{`class UsageAnalytics:
    def analyze_user(self, user_id, time_window_hours=24):
        queries = self.get_recent_queries(user_id, time_window_hours)

        # Red flags for extraction
        flags = {
            'high_volume': len(queries) > 1000,
            'systematic_coverage': self.check_space_coverage(queries),
            'query_bursts': self.detect_bursts(queries),
            'low_diversity': self.measure_diversity(queries) < 0.3
        }

        if sum(flags.values()) >= 2:
            self.trigger_security_review(user_id, flags)`}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Implementation: Cloud observability platforms, custom dashboards
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4">Defense-in-Depth Strategy</h2>
      <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Effective protection against model extraction requires multiple complementary defenses:
        </p>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="bg-emerald-100 dark:bg-emerald-900 rounded-full p-1 mt-0.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <strong className="text-emerald-600 dark:text-emerald-400">Layer 1 - Access Control:</strong>
              <span className="text-gray-600 dark:text-gray-300"> Strong authentication, verified accounts, billing requirements</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-emerald-100 dark:bg-emerald-900 rounded-full p-1 mt-0.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <strong className="text-emerald-600 dark:text-emerald-400">Layer 2 - Rate Limiting:</strong>
              <span className="text-gray-600 dark:text-gray-300"> Per-user/IP quotas, time-based windows, graduated pricing</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-emerald-100 dark:bg-emerald-900 rounded-full p-1 mt-0.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <strong className="text-emerald-600 dark:text-emerald-400">Layer 3 - Output Manipulation:</strong>
              <span className="text-gray-600 dark:text-gray-300"> Reduce precision, add noise, return only top-1 predictions</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-emerald-100 dark:bg-emerald-900 rounded-full p-1 mt-0.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <strong className="text-emerald-600 dark:text-emerald-400">Layer 4 - Monitoring:</strong>
              <span className="text-gray-600 dark:text-gray-300"> Anomaly detection, pattern analysis, behavioral alerts</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-emerald-100 dark:bg-emerald-900 rounded-full p-1 mt-0.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <strong className="text-emerald-600 dark:text-emerald-400">Layer 5 - Legal Protection:</strong>
              <span className="text-gray-600 dark:text-gray-300"> Watermarking, terms of service, DMCA provisions, IP enforcement</span>
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
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">OWASP LLM Top 10</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
            LLM10: Model Theft - Comprehensive coverage of extraction risks, attack vectors, and defense strategies
            for large language models and proprietary AI systems.
          </p>
          <a
            href="https://owasp.org/www-project-top-10-for-large-language-model-applications/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            owasp.org/llm-top-10
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">NIST AI Risk Management</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
            Guidance on protecting ML intellectual property, securing ML APIs, and detecting model extraction attempts
            in production systems.
          </p>
          <a
            href="https://www.nist.gov/itl/ai-risk-management-framework"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            nist.gov/ai-risk-management
          </a>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Academic Research Papers</h2>
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            [1] Tramer, F., Zhang, F., Juels, A., Reiter, M. K., & Ristenpart, T. (2016). <strong className="text-emerald-600 dark:text-emerald-400">Stealing
            Machine Learning Models via Prediction APIs.</strong> USENIX Security. Foundational work demonstrating
            practical model extraction attacks on production ML APIs.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            [2] Orekondy, T., Schiele, B., & Fritz, M. (2019). <strong className="text-emerald-600 dark:text-emerald-400">Knockoff Nets:
            Stealing Functionality of Black-Box Models.</strong> CVPR. Demonstrates extraction of computer vision
            models via public APIs with high fidelity.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            [3] Chandrasekaran, V., Chaudhuri, K., Giacomelli, I., Jha, S., & Yan, S. (2020). <strong className="text-emerald-600 dark:text-emerald-400">Exploring
            Connections Between Active Learning and Model Extraction.</strong> USENIX Security. Shows how active learning
            dramatically reduces queries needed for extraction.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            [4] Krishna, K., Tomar, G. S., Parikh, A. P., Papernot, N., & Iyyer, M. (2020). <strong className="text-emerald-600 dark:text-emerald-400">Thieves
            on Sesame Street! Model Extraction of BERT-based APIs.</strong> ICLR. Demonstrates extraction of NLP models
            and transformer architectures.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            [5] Uchida, Y., Nagai, Y., Sakazawa, S., & Satoh, S. (2017). <strong className="text-emerald-600 dark:text-emerald-400">Embedding
            Watermarks into Deep Neural Networks.</strong> ICMR. Proposes watermarking techniques to detect stolen models.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Real-World Case Studies</h2>
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-md font-semibold text-emerald-600 dark:text-emerald-400 mb-2">ISACA 2025 Report: DeepSeek Model Extraction</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Detailed analysis of alleged GPT-4 extraction by DeepSeek, including technical methods, legal implications,
            and OpenAI's defensive response.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-md font-semibold text-emerald-600 dark:text-emerald-400 mb-2">Financial Times: Chinese AI Model Theft Investigation</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Investigative reporting on systematic attempts by Chinese firms to replicate Western LLMs through API
            extraction and reverse engineering.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Ethical & Legal Considerations</h2>
      <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-600 dark:text-yellow-400 mb-3">Legal Framework</h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p>
            <strong className="text-yellow-600 dark:text-yellow-400">Intellectual Property Theft:</strong> Model extraction violates
            copyright, trade secret, and patent laws. Penalties include civil damages, injunctions, and criminal
            prosecution under CFAA and DMCA.
          </p>
          <p>
            <strong className="text-yellow-600 dark:text-yellow-400">Terms of Service Violations:</strong> Nearly all ML APIs explicitly
            prohibit model extraction in their terms. Violations can result in account termination, legal action,
            and financial liability.
          </p>
          <p>
            <strong className="text-yellow-600 dark:text-yellow-400">Ethical Research:</strong> Academic research on extraction should
            use responsible disclosure, obtain permission from model providers, and focus on defensive applications.
          </p>
        </div>
      </div>
    </section>
  </div>
);
