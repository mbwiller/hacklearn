import type { ReactNode } from 'react';

export interface Concept {
  id: number;
  category: 'AI/ML Security' | 'Traditional Hacking';
  title: string;
  icon: ReactNode;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  realWorldExample: string;
  keyTakeaways: string[];
  defenses: string[];
  detailedComponent?: (props: { onBack: () => void }) => ReactNode;
  detailedContent?: boolean;
  componentPath?: string;
}

export interface Progress {
  [conceptId: number]: boolean;
}
