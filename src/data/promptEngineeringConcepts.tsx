import { Brain, Sparkles, Target, Zap, Lightbulb, Layers, Shield, Code, FileText, Workflow } from 'lucide-react';
import type { Concept } from '../types';

export const promptEngineeringConcepts: Concept[] = [
  {
    id: 101,
    category: 'Prompt Engineering',
    title: 'Prompt Engineering Module #1 - INCOMPLETE',
    icon: <Brain className="w-8 h-8" />,
    difficulty: 'Beginner',
    description: 'Placeholder module - Fundamentals of prompt design and structure. Learn the core principles of crafting effective prompts for large language models.',
    realWorldExample: 'Content coming soon. This module will cover real-world applications of basic prompt engineering techniques.',
    keyTakeaways: [
      'Understanding prompt structure and components',
      'Basic formatting techniques for LLMs',
      'Common prompt patterns and templates',
      'Input-output relationship in language models'
    ],
    defenses: [
      'Best practices for clear prompt design',
      'Avoiding ambiguous instructions',
      'Testing and iteration strategies',
      'Prompt validation techniques'
    ]
  },
  {
    id: 102,
    category: 'Prompt Engineering',
    title: 'Prompt Engineering Module #2 - INCOMPLETE',
    icon: <Sparkles className="w-8 h-8" />,
    difficulty: 'Beginner',
    description: 'Placeholder module - Advanced prompting techniques including few-shot learning and chain-of-thought prompting for improved model performance.',
    realWorldExample: 'Content coming soon. This module will demonstrate advanced prompting strategies with real examples.',
    keyTakeaways: [
      'Few-shot learning principles',
      'Chain-of-thought reasoning',
      'Zero-shot vs few-shot comparison',
      'Example selection strategies'
    ],
    defenses: [
      'Optimizing few-shot examples',
      'Handling edge cases in prompts',
      'Balancing prompt length and clarity',
      'Performance measurement techniques'
    ]
  },
  {
    id: 103,
    category: 'Prompt Engineering',
    title: 'Prompt Engineering Module #3 - INCOMPLETE',
    icon: <Target className="w-8 h-8" />,
    difficulty: 'Intermediate',
    description: 'Placeholder module - Prompt optimization and fine-tuning strategies to maximize model output quality and consistency.',
    realWorldExample: 'Content coming soon. This module will explore optimization techniques with case studies.',
    keyTakeaways: [
      'Systematic prompt optimization methods',
      'A/B testing for prompts',
      'Quality metrics for outputs',
      'Iterative refinement processes'
    ],
    defenses: [
      'Measuring prompt effectiveness',
      'Avoiding overfitting to specific examples',
      'Maintaining prompt generalizability',
      'Documentation best practices'
    ]
  },
  {
    id: 104,
    category: 'Prompt Engineering',
    title: 'Prompt Engineering Module #4 - INCOMPLETE',
    icon: <Zap className="w-8 h-8" />,
    difficulty: 'Intermediate',
    description: 'Placeholder module - Role-based prompting and persona engineering for specialized AI agent behavior and domain expertise.',
    realWorldExample: 'Content coming soon. This module will cover creating effective AI personas and roles.',
    keyTakeaways: [
      'Designing effective AI roles',
      'Persona consistency techniques',
      'Domain-specific prompt engineering',
      'Multi-turn conversation management'
    ],
    defenses: [
      'Maintaining role boundaries',
      'Preventing role drift',
      'Context preservation strategies',
      'Role validation methods'
    ]
  },
  {
    id: 105,
    category: 'Prompt Engineering',
    title: 'Prompt Engineering Module #5 - INCOMPLETE',
    icon: <Lightbulb className="w-8 h-8" />,
    difficulty: 'Intermediate',
    description: 'Placeholder module - Creative prompting techniques for generating novel outputs, storytelling, and content creation.',
    realWorldExample: 'Content coming soon. This module will explore creative applications of prompt engineering.',
    keyTakeaways: [
      'Creative prompt patterns',
      'Controlling output creativity vs accuracy',
      'Style and tone manipulation',
      'Narrative structure in prompts'
    ],
    defenses: [
      'Balancing creativity with coherence',
      'Avoiding repetitive outputs',
      'Quality control for creative content',
      'Originality verification'
    ]
  },
  {
    id: 106,
    category: 'Prompt Engineering',
    title: 'Prompt Engineering Module #6 - INCOMPLETE',
    icon: <Layers className="w-8 h-8" />,
    difficulty: 'Advanced',
    description: 'Placeholder module - Multi-step reasoning and complex task decomposition using advanced prompting frameworks.',
    realWorldExample: 'Content coming soon. This module will demonstrate breaking down complex tasks into manageable prompts.',
    keyTakeaways: [
      'Task decomposition strategies',
      'Sequential reasoning patterns',
      'Intermediate step validation',
      'Error handling in multi-step prompts'
    ],
    defenses: [
      'Verifying reasoning chains',
      'Handling failed intermediate steps',
      'Maintaining context across steps',
      'Debugging complex prompt sequences'
    ]
  },
  {
    id: 107,
    category: 'Prompt Engineering',
    title: 'Prompt Engineering Module #7 - INCOMPLETE',
    icon: <Shield className="w-8 h-8" />,
    difficulty: 'Advanced',
    description: 'Placeholder module - Safety and alignment in prompt engineering. Ensuring responsible AI outputs and preventing harmful content.',
    realWorldExample: 'Content coming soon. This module will cover techniques for safe and aligned prompt design.',
    keyTakeaways: [
      'Safety constraints in prompts',
      'Bias detection and mitigation',
      'Content filtering strategies',
      'Ethical prompt engineering principles'
    ],
    defenses: [
      'Implementing safety guardrails',
      'Testing for harmful outputs',
      'Red-teaming prompts',
      'Alignment verification methods'
    ]
  },
  {
    id: 108,
    category: 'Prompt Engineering',
    title: 'Prompt Engineering Module #8 - INCOMPLETE',
    icon: <Code className="w-8 h-8" />,
    difficulty: 'Advanced',
    description: 'Placeholder module - Code generation and technical prompting for software development, debugging, and system design.',
    realWorldExample: 'Content coming soon. This module will explore prompting techniques for code-related tasks.',
    keyTakeaways: [
      'Effective code generation prompts',
      'Debugging assistance techniques',
      'Architecture and design prompting',
      'Code review and refactoring prompts'
    ],
    defenses: [
      'Validating generated code',
      'Security considerations in code prompts',
      'Testing prompt-generated solutions',
      'Documentation generation strategies'
    ]
  },
  {
    id: 109,
    category: 'Prompt Engineering',
    title: 'Prompt Engineering Module #9 - INCOMPLETE',
    icon: <FileText className="w-8 h-8" />,
    difficulty: 'Advanced',
    description: 'Placeholder module - Enterprise prompt engineering including prompt templating, versioning, and production deployment.',
    realWorldExample: 'Content coming soon. This module will cover enterprise-grade prompt engineering practices.',
    keyTakeaways: [
      'Prompt template systems',
      'Version control for prompts',
      'Production deployment strategies',
      'Monitoring and analytics'
    ],
    defenses: [
      'Prompt library management',
      'A/B testing in production',
      'Performance monitoring',
      'Rollback and recovery procedures'
    ]
  },
  {
    id: 110,
    category: 'Prompt Engineering',
    title: 'Prompt Engineering Module #10 - INCOMPLETE',
    icon: <Workflow className="w-8 h-8" />,
    difficulty: 'Advanced',
    description: 'Placeholder module - Agentic workflows and autonomous systems. Building complex AI agents with multi-tool integration.',
    realWorldExample: 'Content coming soon. This module will explore building autonomous AI agent systems.',
    keyTakeaways: [
      'Agent architecture design',
      'Tool integration patterns',
      'Decision-making frameworks',
      'Multi-agent coordination'
    ],
    defenses: [
      'Agent behavior validation',
      'Safety constraints for autonomous systems',
      'Monitoring agent decisions',
      'Emergency stop mechanisms'
    ]
  }
];
