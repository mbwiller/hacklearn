import type { Problem } from '@/types/ide';
import { promptInjectionProblem } from './01-prompt-injection';

const labProblems: Record<number, Problem> = {
  1: promptInjectionProblem,
  // Additional modules will be added here
  // 2: adversarialMLProblem,
  // 3: dataPoisoningProblem,
  // ... etc
};

export const getLabProblem = (moduleId: number): Problem => {
  const problem = labProblems[moduleId];
  if (!problem) {
    throw new Error(`No lab problem found for module ${moduleId}. This lab is not yet implemented.`);
  }
  return problem;
};

export const hasLabProblem = (moduleId: number): boolean => {
  return moduleId in labProblems;
};
