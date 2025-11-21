/**
 * Theory Content Component
 * Educational content about tokenization
 */

import { motion } from 'framer-motion';
import { BookOpen, AlertCircle, Shield, Zap } from 'lucide-react';

export const TheoryContent = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Section
        icon={<BookOpen className="w-6 h-6" />}
        title="What is Tokenization?"
        color="cyan"
      >
        <p className="text-gray-300 leading-relaxed mb-4">
          Tokenization is the <span className="text-cyan-400 font-semibold">first and most critical layer</span> of
          Large Language Model processing. Before a model can understand your text, it must translate human-readable
          characters into numerical tokens—discrete units that the neural network can process.
        </p>

        <p className="text-gray-300 leading-relaxed mb-4">
          This translation is <span className="text-yellow-400 font-semibold">lossy and deterministic</span>.
          The way a sentence is split into tokens fundamentally affects:
        </p>

        <ul className="list-disc list-inside space-y-2 text-gray-400 mb-4">
          <li>How efficiently the model processes text (fewer tokens = faster inference)</li>
          <li>The model's ability to understand concepts (poor tokenization = degraded comprehension)</li>
          <li>The attack surface for adversarial prompts (token boundaries create hiding places)</li>
        </ul>

        <div className="backdrop-blur-xl bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
          <p className="text-sm text-cyan-300">
            <strong>Key Insight:</strong> GPT-4 sees text as a sequence like [15496, 4062, 14198, 39935],
            not as "The quick brown fox". This discrete representation is both the source of LLMs' power
            and their vulnerability.
          </p>
        </div>
      </Section>

      <Section
        icon={<AlertCircle className="w-6 h-6" />}
        title="BPE vs Unigram: Algorithm Wars"
        color="emerald"
      >
        <div className="space-y-6">
          {/* BPE */}
          <div>
            <h4 className="text-emerald-400 font-semibold mb-3">Byte Pair Encoding (BPE)</h4>
            <p className="text-gray-300 leading-relaxed mb-3">
              Used by GPT-4 and Llama 3. BPE is a <span className="text-emerald-400">greedy, bottom-up</span> algorithm:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-400 ml-4">
              <li>Start with individual characters/bytes as the base vocabulary</li>
              <li>Find the most frequent pair of adjacent symbols in the corpus</li>
              <li>Merge this pair into a new token</li>
              <li>Repeat until vocabulary reaches target size (e.g., 100k tokens)</li>
            </ol>
            <div className="mt-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-sm text-gray-400">
              <strong className="text-emerald-400">Example:</strong> If "th" + "e" appears 1M times,
              create token "the". Then if "the" + " " appears 800k times, create " the".
            </div>
          </div>

          {/* Unigram */}
          <div>
            <h4 className="text-purple-400 font-semibold mb-3">Unigram Language Model</h4>
            <p className="text-gray-300 leading-relaxed mb-3">
              Used by Gemini. Unigram is <span className="text-purple-400">probabilistic, top-down</span>:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-400 ml-4">
              <li>Start with a massive vocabulary (millions of subwords)</li>
              <li>Calculate the likelihood of the training corpus under this vocabulary</li>
              <li>Iteratively remove tokens that contribute least to the likelihood</li>
              <li>Stop when vocabulary reaches target size (e.g., 256k)</li>
            </ol>
            <div className="mt-3 bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-sm text-gray-400">
              <strong className="text-purple-400">Advantage:</strong> Multiple valid tokenizations exist.
              This probabilistic nature offers better robustness against adversarial noise.
            </div>
          </div>
        </div>
      </Section>

      <Section
        icon={<Shield className="w-6 h-6" />}
        title="Why Tokenization Matters for Security"
        color="red"
      >
        <p className="text-gray-300 leading-relaxed mb-4">
          Tokenization creates a <span className="text-red-400 font-semibold">semantic gap</span> between
          how humans read text and how models process it. This gap is the foundation of prompt injection attacks.
        </p>

        <div className="space-y-4">
          <AttackExplanation
            title="The Mismatch Hypothesis"
            description="Safety filters often operate on raw text, while the model operates on tokens.
            An attacker can craft inputs that appear safe to the filter but malicious to the model."
            example={`Filter sees: "Del-ete files" → No match for "Delete"
Model sees: [Del, -, ete, files] → Reconstructs "Delete" concept`}
          />

          <AttackExplanation
            title="Token Boundary Manipulation"
            description="By forcing the tokenizer to split words in unusual ways, attackers can hide
            instructions that only become visible after tokenization."
            example={`Input: "Ignore  previous"  (two spaces)
Tokenization changes: Normal [Ignore, previous] → Attack [Ignore, , previous]`}
          />

          <AttackExplanation
            title="Glitch Token Skeleton Keys"
            description="Certain token IDs have poorly learned embeddings due to rare/chaotic training data.
            These act as 'skeleton keys' that bypass safety alignment."
            example={`Token 6995 ("SolidGoldMagikarp") causes:
- Hallucinations and repetition
- Safety guardrail failures
- Unpredictable model behavior`}
          />
        </div>

        <div className="mt-6 backdrop-blur-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl p-6">
          <h5 className="text-red-400 font-bold mb-3">Critical Takeaway</h5>
          <p className="text-gray-300 leading-relaxed">
            As long as safety mechanisms operate on a different representation than the model
            (text vs tokens), adversarial attacks will persist. Future defenses must move toward
            <span className="text-emerald-400 font-semibold"> semantic intent recognition</span> that
            operates on the model's internal embeddings, not surface-level tokenization.
          </p>
        </div>
      </Section>

      <Section
        icon={<Zap className="w-6 h-6" />}
        title="The Invisible Boundary Layer"
        color="purple"
      >
        <p className="text-gray-300 leading-relaxed mb-4">
          Tokenization is the first translation in a long chain of transformations between human intent and model output.
          It's also the most vulnerable to manipulation because:
        </p>

        <ul className="list-disc list-inside space-y-2 text-gray-400 mb-4">
          <li><strong className="text-white">It's deterministic and predictable</strong> (especially BPE)</li>
          <li><strong className="text-white">It creates boundaries</strong> that don't align with human semantics</li>
          <li><strong className="text-white">It's lossy</strong> (information is discarded during segmentation)</li>
          <li><strong className="text-white">It varies across models</strong> (creating cross-system attack opportunities)</li>
        </ul>

        <div className="backdrop-blur-xl bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <p className="text-sm text-purple-300 leading-relaxed">
            Every character you type is scrutinized by an algorithm that decides where to "cut" the text.
            Those cuts are invisible to you but deeply meaningful to the model. Attackers exploit the gap
            between your perception (continuous text) and the model's reality (discrete tokens).
          </p>
        </div>
      </Section>
    </div>
  );
};

// Helper components
interface SectionProps {
  icon: React.ReactNode;
  title: string;
  color: 'cyan' | 'emerald' | 'red' | 'purple';
  children: React.ReactNode;
}

const Section = ({ icon, title, color, children }: SectionProps) => {
  const colorClasses = {
    cyan: 'from-cyan-400 to-cyan-600',
    emerald: 'from-emerald-400 to-emerald-600',
    red: 'from-red-400 to-red-600',
    purple: 'from-purple-400 to-purple-600',
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 bg-gradient-to-br ${colorClasses[color]} rounded-lg text-white`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      <div className="pl-14">
        {children}
      </div>
    </motion.section>
  );
};

interface AttackExplanationProps {
  title: string;
  description: string;
  example: string;
}

const AttackExplanation = ({ title, description, example }: AttackExplanationProps) => (
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4">
    <h5 className="text-yellow-400 font-semibold mb-2">{title}</h5>
    <p className="text-sm text-gray-400 leading-relaxed mb-3">{description}</p>
    <pre className="bg-slate-900/50 rounded-lg p-3 text-xs text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap">
      {example}
    </pre>
  </div>
);
