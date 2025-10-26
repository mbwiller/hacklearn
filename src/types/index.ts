import type { ReactNode } from 'react';

export interface Challenge {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

export interface Concept {
  id: number;
  category: 'AI/ML Security' | 'Traditional Hacking';
  title: string;
  icon: ReactNode;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  points: number;
  description: string;
  realWorldExample: string;
  keyTakeaways: string[];
  challenge: Challenge;
  defenses: string[];
  detailedComponent?: (props: { onBack: () => void; onStartChallenge: () => void }) => ReactNode;
  detailedContent?: boolean;
  componentPath?: string;
}

export interface Progress {
  [conceptId: number]: boolean;
}

export interface ChallengeResult {
  success: boolean;
  message: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedAt?: Date;
}

export interface GameState {
  currentConcept: number | null;
  progress: Progress;
  points: number;
  level: number;
  achievements: string[];
  showChallenge: boolean;
  challengeAnswer: string;
  challengeResult: ChallengeResult | null;
}
