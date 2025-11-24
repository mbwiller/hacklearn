/**
 * Lab Problems Registry
 *
 * This file manages all interactive lab problems for the HackLearn platform.
 *
 * HOW TO ADD A NEW LAB:
 * 1. Create the lab problem file (e.g., 02-adversarial-ml.ts)
 * 2. Import it: import { adversarialMLProblem } from './02-adversarial-ml';
 * 3. Add to labProblems object: 2: adversarialMLProblem,
 * 4. Uncomment the corresponding line in the module list below
 */

import type { Problem } from '@/types/ide';

// ============================================================================
// IMPORTS - Add new lab problem imports here
// ============================================================================

// AI/ML Security Modules (1-10)
import { promptInjectionProblem } from '@/modules/01-prompt-injection';
import { adversarialMLProblem } from '@/modules/02-adversarial-ml';
import { dataPoisoningProblem } from '@/modules/03-data-poisoning';
import { modelExtractionProblem } from '@/modules/04-model-extraction';
import { jailbreakingProblem } from '@/modules/05-jailbreaking';
import { ragSecurityProblem } from '@/modules/06-rag-security';
import { multiAgentSecurityProblem } from '@/modules/07-multi-agent-security';
import { linkTrapsProblem } from '@/modules/08-link-traps';
import { invisibleUnicodeProblem } from '@/modules/09-invisible-unicode';
import { aiAgentCommandInjectionProblem } from '@/modules/10-ai-agent-command-injection';

// Traditional Hacking Modules (11-20)
import { reconnaissanceProblem } from '@/modules/11-reconnaissance';
import { sqlInjectionProblem } from '@/modules/12-sql-injection';
import { xssProblem } from '@/modules/13-xss';
import { socialEngineeringProblem } from '@/modules/14-social-engineering';
import { networkScanningProblem } from '@/modules/15-network-scanning';
import { passwordCrackingProblem } from '@/modules/16-password-cracking';
import { mitmAttacksProblem } from '@/modules/17-mitm-attacks';
import { dosAttacksProblem } from '@/modules/18-dos-attacks';
import { webAppVulnerabilitiesProblem } from '@/modules/19-web-app-vulnerabilities';
import { penetrationTestingProblem } from '@/modules/20-penetration-testing';

// ============================================================================
// LAB PROBLEMS REGISTRY
// ============================================================================

const labProblems: Record<number, Problem> = {
  // AI/ML Security Labs
  1: promptInjectionProblem,
  2: adversarialMLProblem,
  3: dataPoisoningProblem,
  4: modelExtractionProblem,
  5: jailbreakingProblem,
  6: ragSecurityProblem,
  7: multiAgentSecurityProblem,
  8: linkTrapsProblem,
  9: invisibleUnicodeProblem,
  10: aiAgentCommandInjectionProblem,

  // Traditional Hacking Labs
  11: reconnaissanceProblem,
  12: sqlInjectionProblem,
  13: xssProblem,
  14: socialEngineeringProblem,
  15: networkScanningProblem,
  16: passwordCrackingProblem,
  17: mitmAttacksProblem,
  18: dosAttacksProblem,
  19: webAppVulnerabilitiesProblem,
  20: penetrationTestingProblem,
};

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Retrieve a lab problem by module ID
 *
 * @param moduleId - The module ID (1-20)
 * @returns The lab problem object
 * @throws Error if lab problem doesn't exist for this module
 */
export const getLabProblem = (moduleId: number): Problem => {
  const problem = labProblems[moduleId];
  if (!problem) {
    throw new Error(
      `No lab problem found for module ${moduleId}. This lab is not yet implemented.`
    );
  }
  return problem;
};

/**
 * Check if a lab problem exists for a given module
 *
 * @param moduleId - The module ID (1-20)
 * @returns true if lab problem exists, false otherwise
 */
export const hasLabProblem = (moduleId: number): boolean => {
  return moduleId in labProblems;
};

/**
 * Get all available lab problem IDs
 *
 * @returns Array of module IDs that have lab problems
 */
export const getAvailableLabIds = (): number[] => {
  return Object.keys(labProblems).map(Number).sort((a, b) => a - b);
};

/**
 * Get count of implemented labs
 *
 * @returns Number of lab problems currently available
 */
export const getLabCount = (): number => {
  return Object.keys(labProblems).length;
};
