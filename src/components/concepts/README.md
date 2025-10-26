# Concept Components

This directory contains detailed educational components for specific concepts in the HackLearn platform.

## Available Detailed Components

### 1. AdversarialMLConcept.tsx
**Concept ID:** 2
**Category:** AI/ML Security
**Difficulty:** Intermediate (150 points)

Comprehensive deep-dive into Adversarial Machine Learning covering:

#### Theory Tab
- Foundational research (Szegedy et al. 2013, Goodfellow et al. 2015)
- Attack types: Evasion, Model Inversion, Membership Inference, Backdoor attacks
- Real-world examples:
  - UC Berkeley Stop Sign Attack (2017)
  - ImageNet adversarial examples
  - Malware evasion techniques
- Decision boundary exploitation theory
- High-dimensional vulnerability analysis

#### Lab Tab
- Complete FGSM (Fast Gradient Sign Method) implementation
- Step-by-step attack generation:
  1. Load MNIST digits dataset
  2. Train baseline classifier (scikit-learn)
  3. Implement gradient computation
  4. Generate adversarial examples
  5. Visualize perturbations
- Perturbation magnitude analysis (L2, L-infinity norms)
- Link to Jupyter notebook: `/notebooks/02-adversarial-ml.ipynb`

#### Tools Tab
- **Attack Libraries:**
  - CleverHans (Google Brain)
  - IBM Adversarial Robustness Toolbox (ART)
  - Foolbox
  - TextAttack (NLP)
- **Defense Mechanisms:**
  - Adversarial training implementation
  - Input preprocessing (feature squeezing, JPEG compression)
  - Ensemble methods
  - Certified defenses (randomized smoothing)

#### References Tab
- 30+ academic citations including:
  - Szegedy et al., 2013 (ICLR) - First adversarial examples discovery
  - Goodfellow et al., 2015 (ICLR) - FGSM method
  - Madry et al., 2017 (ICLR) - PGD attack
  - Carlini & Wagner, 2017 (IEEE S&P) - C&W attack
  - Eykholt et al., 2018 (CVPR) - Physical stop sign attack
- Standards:
  - NIST IR 8269: Adversarial ML Taxonomy
  - MITRE ATLAS threat database
  - IEEE Spectrum articles
- Online courses and tutorials
- Responsible disclosure guidelines

### 2. SQLInjectionConcept.tsx
**Concept ID:** 12
**Category:** Traditional Hacking
**Difficulty:** Intermediate (150 points)

Comprehensive coverage of SQL injection attacks and defenses.

## Integration Guide

### Current Architecture
The platform uses a data-driven approach where concept metadata is stored in `src/data/concepts.tsx` and displayed via the `ConceptDetail` component. Detailed components like `AdversarialMLConcept` provide enhanced educational content.

### Option 1: Direct Route (Future Enhancement)
To add routing to detailed components, modify `src/App.tsx`:

```typescript
import { AdversarialMLConcept, SQLInjectionConcept } from './components/concepts';

// In App component, add before ConceptDetail rendering:
if (currentConcept === 2 && showDetailedView) {
  return <AdversarialMLConcept />;
}
if (currentConcept === 12 && showDetailedView) {
  return <SQLInjectionConcept />;
}
```

### Option 2: Link from ConceptDetail (Recommended)
Add a "Deep Dive" button in `ConceptDetail.tsx` that routes to the detailed component:

```typescript
// Add to ConceptDetailProps
detailedComponent?: React.ComponentType;

// Add button before challenge button
{concept.detailedComponent && (
  <button
    onClick={() => setShowDetailedView(true)}
    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500..."
  >
    Deep Dive: Advanced Materials
  </button>
)}
```

### Option 3: Tab in ConceptDetail
Add a "Deep Dive" tab to the ConceptDetail view that conditionally renders the detailed component's content.

## Content Standards

All detailed concept components follow these standards:

1. **No Emojis** - Academic/professional tone
2. **Academic Rigor** - Proper citations with [#] format
3. **Comprehensive Coverage** - Theory, practical labs, tools, references
4. **Research-Backed** - Citations from peer-reviewed sources
5. **TypeScript Strict** - Full type safety
6. **Ethical Guidelines** - Clear warnings about responsible use

## Adding New Detailed Components

1. Create component file: `src/components/concepts/YourConcept.tsx`
2. Follow the 4-tab structure: Theory, Lab, Tools, References
3. Include:
   - Real-world breach examples with citations
   - Code examples with explanations
   - Tool recommendations
   - 15-30 academic/industry references
4. Export in `index.ts`
5. Update this README

## Component Structure Template

```tsx
import { useState } from 'react';
import { [Icons] } from 'lucide-react';

const tabs = [
  { id: 'theory', name: 'Theory', icon: BookOpen },
  { id: 'lab', name: 'Lab', icon: Terminal },
  { id: 'tools', name: 'Tools', icon: Shield },
  { id: 'references', name: 'References', icon: Database }
];

export const YourConcept = () => {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
      {/* Header, tabs, content */}
    </div>
  );
};

const TheoryTab = () => (/* Theory content */);
const LabTab = () => (/* Lab/hands-on content */);
const ToolsTab = () => (/* Tools and defenses */);
const ReferencesTab = () => (/* Citations and resources */);
```

## Future Enhancements

- [ ] Add routing system for detailed components
- [ ] Create concept-component mapping in concepts.tsx
- [ ] Add "Learn More" buttons in ConceptDetail
- [ ] Generate Jupyter notebooks for lab sections
- [ ] Add interactive visualizations
- [ ] Create video demonstrations
- [ ] Add progress tracking within detailed components
