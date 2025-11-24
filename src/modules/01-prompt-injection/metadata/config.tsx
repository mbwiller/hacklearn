import { Code } from 'lucide-react';
import type { Concept } from '@/types';
import { PromptInjectionConcept } from '../component/PromptInjectionConcept';

export const promptInjectionMetadata: Concept = {
  id: 1,
  category: 'AI/ML Security',
  title: 'Prompt Injection Attacks',
  icon: <Code className="w-8 h-8" />,
  difficulty: 'Beginner',
  description: 'Learn how attackers manipulate AI models by injecting malicious prompts to override system instructions.',
  realWorldExample: 'In 2024, ChatGPT search was vulnerable to hidden webpage content that could override negative reviews with positive ones.',
  keyTakeaways: [
    'Prompt injection exploits how LLMs process natural language',
    'Direct injection: User directly provides malicious prompt',
    'Indirect injection: Malicious prompts embedded in external content',
    'OWASP ranks this as #1 AI security risk in 2025'
  ],
  defenses: [
    'Input/output filtering and sanitization',
    'Separate system prompts from user input',
    'Use guardrails like NeuralTrust Gateway',
    'Implement adversarial testing'
  ],
  detailedComponent: (props) => <PromptInjectionConcept {...props} />
};
