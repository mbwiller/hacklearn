# Prompt Injection Timeline Data

## Overview

This directory contains structured timeline data for **Module 1: Prompt Injection Attacks**, extracted from comprehensive research on the evolution of LLM vulnerabilities from 2020-2025.

## Source Documents

- `DEEP_RESEARCH_Prompt_Injection_Timeline.md` - Comprehensive historiographical analysis
- `DEEP_THINK_Timeline_Narrative.txt` - Narrative structure and arc analysis

## Data Structure

### `prompt-injection-timeline.json`

Main data file containing:

#### 1. Metadata
- Module identification
- Version information
- Source document references

#### 2. Eras (5 distinct periods)
- **Era 1**: The Theoretical Frontier (2020 - Late 2022)
- **Era 2**: The Semantic Insurgency (Late 2022 - Mid 2023)
- **Era 3**: The Integration Crisis (Mid 2023 - Early 2024)
- **Era 4**: The Industrialization of Adversarial ML (Late 2023 - 2024)
- **Era 5**: The Age of Autonomous Worms (Late 2024 - 2025)

#### 3. Events (30 major incidents)
Each event includes:
- Unique ID
- Date (YYYY-MM format)
- Era association
- Title and description
- Category (Model Release, Jailbreak, Vulnerability, etc.)
- Impact level (foundational, critical, high, medium, low)
- Tags for filtering
- Source URL for verification

#### 4. Attack Techniques (10 major techniques)
Documented attack methods:
- Persona Adoption (DAN)
- Contextual Masking
- Cumulative Instruction Attack
- Authority Impersonation
- Indirect Prompt Injection (XPIA)
- Universal Adversarial Suffixes (GCG)
- Symbolic Encoding (MathPrompt)
- Many-Shot Jailbreaking
- Crescendo Attacks
- Self-Replicating Prompts

#### 5. Vulnerability Categories (5 fundamental weaknesses)
- Architectural Debt (unpatchable)
- Excessive Obedience from RLHF (unpatchable)
- Supply Chain Vulnerabilities (patchable)
- State Management Failure (patchable)
- Scale Paradox (unpatchable)

#### 6. Key Insights
Evidence-based conclusions from the timeline analysis.

## Usage

### TypeScript Import

```typescript
import {
  promptInjectionTimeline,
  eras,
  events,
  attack_techniques,
  getEventsByEra,
  searchEvents,
  getStatistics
} from '@/data/timeline';

// Get all events from Era 2
const era2Events = getEventsByEra('era-2');

// Search for specific incidents
const sydneyEvents = searchEvents('sydney');

// Get statistics
const stats = getStatistics();
console.log(`Total events: ${stats.totalEvents}`);
console.log(`Critical events: ${stats.eventsByImpact.critical}`);
```

### Visualization Use Cases

1. **Timeline Visualization**
   - Plot events chronologically
   - Color-code by era
   - Filter by impact level

2. **Era Comparison**
   - Compare attack sophistication across eras
   - Show escalation patterns

3. **Attack Technique Evolution**
   - Trace development of specific techniques (e.g., DAN variants)
   - Show effectiveness vs mitigation difficulty

4. **Category Analysis**
   - Group events by category
   - Identify trends (model releases vs vulnerabilities)

## Helper Functions

The `index.ts` file exports several utility functions:

### Filtering Functions
- `getEventsByEra(eraId)` - Events in specific era
- `getEventsByCategory(category)` - Events of specific type
- `getEventsByDateRange(start, end)` - Events in date range
- `getEventsByImpact(impact)` - Events by severity
- `getEventsByTag(tag)` - Events with specific tag

### Query Functions
- `searchEvents(keyword)` - Full-text search
- `getAttackTechnique(id)` - Get technique details
- `getEra(id)` - Get era details
- `getVulnerabilityCategory(id)` - Get vulnerability info

### Analysis Functions
- `getStatistics()` - Comprehensive timeline stats
- `getPatchableVulnerabilities()` - Vulnerabilities that can be fixed
- `getArchitecturalVulnerabilities()` - Fundamental, unfixable issues

## Data Quality

All events include:
- ✅ Source URLs for verification
- ✅ Precise dates (month-level granularity)
- ✅ Impact assessment
- ✅ Era classification
- ✅ Comprehensive tagging

## Integration Points

This data is designed for:
- Interactive timeline visualizations (D3.js, Recharts, etc.)
- Educational displays in Module 1
- Research reference material
- Comparative analysis tools

## Maintenance

To update the timeline:
1. Edit `prompt-injection-timeline.json`
2. Increment `timeline_version` in metadata
3. Update `last_updated` date
4. Ensure TypeScript types in `types.ts` match structure
5. Add new helper functions to `index.ts` if needed

## Notes

- Dates use YYYY-MM format for flexibility (exact days often unknown)
- Impact levels are subjective but evidence-based
- "Unpatchable" vulnerabilities are architectural (inherent to transformers)
- Timeline ends at November 2025 (current "present day" in research)
