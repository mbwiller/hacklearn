# Shared Module Components

This folder contains components and utilities that are used across multiple modules.

## Contents

### Components

#### AdvancedTaxonomies
Shared taxonomy component providing:
- Severity level classification system
- Defense strategy comparison
- Used by multiple security modules

#### Visualizations

##### InjectionSpectrumVisualizer
Interactive visualization showing:
- 5 severity levels (Benign → Low → Medium → High → Critical)
- 11 attack examples positioned along gradient
- SVG-based with Framer Motion animations
- Used primarily in Module 1 (Prompt Injection)

## Usage

```typescript
import { AdvancedTaxonomies, InjectionSpectrumVisualizer } from '@/modules/shared';
```

## Adding New Shared Components

1. Add component file to appropriate subfolder
2. Export from `index.ts`
3. Document in this README
4. Ensure no module-specific logic (keep it generic)
