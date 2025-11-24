#!/bin/bash
# Create minimal index.ts files for all modules 2-20

# Module 2: Adversarial ML
echo "export { AdversarialMLConcept } from './AdversarialMLConcept';" > "src/modules/02-adversarial-ml/component/index.ts"
echo "export { adversarialMLProblem } from './lab-problem';" > "src/modules/02-adversarial-ml/lab/index.ts"

# Module 3: Data Poisoning
echo "export { DataPoisoningConcept } from './DataPoisoningConcept';" > "src/modules/03-data-poisoning/component/index.ts"
echo "export { dataPoisoningProblem } from './lab-problem';" > "src/modules/03-data-poisoning/lab/index.ts"

# Module 4: Model Extraction
echo "export { ModelExtractionConcept } from './ModelExtractionConcept';" > "src/modules/04-model-extraction/component/index.ts"
echo "export { modelExtractionProblem } from './lab-problem';" > "src/modules/04-model-extraction/lab/index.ts"

# Module 5: Jailbreaking
echo "export { JailbreakingConcept } from './JailbreakingConcept';" > "src/modules/05-jailbreaking/component/index.ts"
echo "export { jailbreakingProblem } from './lab-problem';" > "src/modules/05-jailbreaking/lab/index.ts"

# Module 6: RAG Security
echo "export { RAGSecurityConcept } from './RAGSecurityConcept';" > "src/modules/06-rag-security/component/index.ts"
echo "export { ragSecurityProblem } from './lab-problem';" > "src/modules/06-rag-security/lab/index.ts"

# Module 7: Multi-Agent Security
echo "export { MultiAgentSecurityConcept } from './MultiAgentSecurityConcept';" > "src/modules/07-multi-agent-security/component/index.ts"
echo "export { multiAgentSecurityProblem } from './lab-problem';" > "src/modules/07-multi-agent-security/lab/index.ts"

# Module 8: Link Traps
echo "export { LinkTrapsSecurityConcept } from './LinkTrapsSecurityConcept';" > "src/modules/08-link-traps/component/index.ts"
echo "export { linkTrapsProblem } from './lab-problem';" > "src/modules/08-link-traps/lab/index.ts"

# Module 9: Invisible Unicode
echo "export { InvisibleUnicodeInjectionConcept } from './InvisibleUnicodeInjectionConcept';" > "src/modules/09-invisible-unicode/component/index.ts"
echo "export { invisibleUnicodeProblem } from './lab-problem';" > "src/modules/09-invisible-unicode/lab/index.ts"

# Module 10: AI Agent Command Injection
echo "export { AIAgentCommandInjectionConcept } from './AIAgentCommandInjectionConcept';" > "src/modules/10-ai-agent-command-injection/component/index.ts"
echo "export { aiAgentCommandInjectionProblem } from './lab-problem';" > "src/modules/10-ai-agent-command-injection/lab/index.ts"

# Module 11: Reconnaissance
echo "export { ReconnaissanceFootprintingConcept } from './ReconnaissanceFootprintingConcept';" > "src/modules/11-reconnaissance/component/index.ts"
echo "export { reconnaissanceProblem } from './lab-problem';" > "src/modules/11-reconnaissance/lab/index.ts"

# Module 12: SQL Injection
echo "export { SQLInjectionConcept } from './SQLInjectionConcept';" > "src/modules/12-sql-injection/component/index.ts"
echo "export { sqlInjectionProblem } from './lab-problem';" > "src/modules/12-sql-injection/lab/index.ts"

# Module 13: XSS
echo "export { XSSConcept } from './XSSConcept';" > "src/modules/13-xss/component/index.ts"
echo "export { xssProblem } from './lab-problem';" > "src/modules/13-xss/lab/index.ts"

# Module 14: Social Engineering
echo "export { SocialEngineeringConcept } from './SocialEngineeringConcept';" > "src/modules/14-social-engineering/component/index.ts"
echo "export { socialEngineeringProblem } from './lab-problem';" > "src/modules/14-social-engineering/lab/index.ts"

# Module 15: Network Scanning
echo "export { NetworkScanningConcept } from './NetworkScanningConcept';" > "src/modules/15-network-scanning/component/index.ts"
echo "export { networkScanningProblem } from './lab-problem';" > "src/modules/15-network-scanning/lab/index.ts"

# Module 16: Password Cracking
echo "export { PasswordCrackingConcept } from './PasswordCrackingConcept';" > "src/modules/16-password-cracking/component/index.ts"
echo "export { passwordCrackingProblem } from './lab-problem';" > "src/modules/16-password-cracking/lab/index.ts"

# Module 17: MitM Attacks
echo "export { MitMAttacksConcept } from './MitMAttacksConcept';" > "src/modules/17-mitm-attacks/component/index.ts"
echo "export { mitmAttacksProblem } from './lab-problem';" > "src/modules/17-mitm-attacks/lab/index.ts"

# Module 18: DoS Attacks
echo "export { DoSAttacksConcept } from './DoSAttacksConcept';" > "src/modules/18-dos-attacks/component/index.ts"
echo "export { dosAttacksProblem } from './lab-problem';" > "src/modules/18-dos-attacks/lab/index.ts"

# Module 19: Web App Vulnerabilities
echo "export { WebAppVulnerabilitiesConcept } from './WebAppVulnerabilitiesConcept';" > "src/modules/19-web-app-vulnerabilities/component/index.ts"
echo "export { webAppVulnerabilitiesProblem } from './lab-problem';" > "src/modules/19-web-app-vulnerabilities/lab/index.ts"

# Module 20: Penetration Testing
echo "export { PenetrationTestingConcept } from './PenetrationTestingConcept';" > "src/modules/20-penetration-testing/component/index.ts"
echo "export { penetrationTestingProblem } from './lab-problem';" > "src/modules/20-penetration-testing/lab/index.ts"

echo "✅ All index.ts files created!"
