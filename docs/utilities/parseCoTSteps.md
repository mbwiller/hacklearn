# CoT Step Parser Utility

## Overview

The `parseCoTSteps` utility uses GPT-4o-mini to analyze Chain of Thought (CoT) reasoning responses and extract structured, discrete reasoning steps. This is cost-effective, robust, and production-ready.

## File Location

```
/home/user/hacklearn/src/utils/parseCoTSteps.ts
```

## Cost

- **Model**: gpt-4o-mini
- **Pricing**: $0.15 per 1M input tokens / $0.60 per 1M output tokens
- **Typical cost per parse**: $0.0003 - $0.0005
  - Small CoT (500 tokens): ~$0.0003
  - Medium CoT (1000 tokens): ~$0.0004
  - Large CoT (2000 tokens): ~$0.0005

## Features

✅ **LLM-Powered Analysis**: Uses GPT-4o-mini to intelligently extract reasoning steps
✅ **Structured Output**: Returns validated, typed `ReasoningStep[]` objects
✅ **Robust Error Handling**: Handles API failures, JSON parsing errors, validation errors
✅ **Smart Parsing**: Removes markdown code blocks, validates fields, provides defaults
✅ **Cost Tracking**: Logs token usage and cost for each parse
✅ **TypeScript Strict Mode**: Zero `any` types, full type safety
✅ **Production Ready**: Comprehensive error handling and validation

## Interfaces

### ReasoningStep

```typescript
interface ReasoningStep {
  stepNumber: number;           // Sequential step number (1, 2, 3...)
  title: string;                // Brief title (max 100 chars, auto-truncated)
  content: string;              // Full reasoning content for this step
  confidence: 'high' | 'medium' | 'low';  // Confidence level
  category: 'understanding' | 'calculation' | 'verification' | 'conclusion';
}
```

### CoTParseResult

```typescript
interface CoTParseResult {
  steps: ReasoningStep[];       // Parsed reasoning steps
  totalSteps: number;           // Number of steps found
  parseSuccess: boolean;        // Whether parsing succeeded
  error?: string;               // Error message if parsing failed
}
```

## Usage

### Basic Example

```typescript
import { parseCoTSteps } from '@/utils';

// CoT response from your LLM
const cotResponse = `
  Let me solve this step by step:

  First, I need to understand what we're calculating. We have 5 lunch pizzas.

  Second, let's calculate the total slices. 5 pizzas × 8 slices = 40 slices.

  Third, let me verify this makes sense. If each pizza has 8 slices,
  then 5 pizzas would indeed give us 40 slices total.

  Therefore, the answer is 40 slices.
`;

// Parse the steps
const result = await parseCoTSteps(cotResponse, apiKey);

if (result.parseSuccess) {
  console.log(`Found ${result.totalSteps} steps`);

  result.steps.forEach(step => {
    console.log(`${step.stepNumber}. ${step.title}`);
    console.log(`   Category: ${step.category}`);
    console.log(`   Confidence: ${step.confidence}`);
    console.log(`   Content: ${step.content}`);
  });
} else {
  console.error('Parse failed:', result.error);
}
```

### React Component Example

```typescript
import { parseCoTSteps, type ReasoningStep } from '@/utils';

function CoTVisualizer({ cotText, apiKey }: { cotText: string; apiKey: string }) {
  const [steps, setSteps] = React.useState<ReasoningStep[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const analyzeCot = async () => {
    setIsLoading(true);
    setError(null);

    const result = await parseCoTSteps(cotText, apiKey);

    if (result.parseSuccess) {
      setSteps(result.steps);
    } else {
      setError(result.error || 'Unknown error');
    }

    setIsLoading(false);
  };

  React.useEffect(() => {
    if (cotText && apiKey) {
      analyzeCot();
    }
  }, [cotText, apiKey]);

  if (isLoading) return <div>Analyzing reasoning...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <div key={step.stepNumber} className="card">
          <h3 className="text-lg font-semibold">
            Step {step.stepNumber}: {step.title}
          </h3>
          <p className="text-sm text-slate-400">{step.content}</p>
          <div className="flex gap-2 mt-2">
            <span className={`badge badge-${step.category}`}>
              {step.category}
            </span>
            <span className={`badge badge-${step.confidence}`}>
              {step.confidence}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Error Handling

The utility handles several error scenarios gracefully:

```typescript
// Invalid input
const result1 = await parseCoTSteps('', apiKey);
// Returns: { parseSuccess: false, error: 'Invalid input: cotResponse must be a non-empty string' }

// Invalid API key
const result2 = await parseCoTSteps(cotText, 'invalid-key');
// Returns: { parseSuccess: false, error: 'Invalid API key format' }

// API failure
const result3 = await parseCoTSteps(cotText, apiKey); // Network error
// Returns: { parseSuccess: false, error: 'API request failed with status 500' }

// Invalid JSON response
// Returns: { parseSuccess: false, error: 'Failed to parse JSON response from LLM' }
```

## Implementation Details

### LLM Extraction Prompt

The utility sends a carefully crafted prompt to GPT-4o-mini that:

1. **Identifies discrete steps** in the CoT reasoning
2. **Extracts metadata** for each step (title, confidence, category)
3. **Returns structured JSON** (no markdown, no explanations)

### Validation & Normalization

The parser performs extensive validation:

- ✅ **Required fields**: Ensures `title` and `content` exist
- ✅ **Field types**: Validates all field types match expected types
- ✅ **Enum validation**: Checks confidence/category are valid enum values
- ✅ **Default values**: Provides sensible defaults for invalid/missing values
- ✅ **Title truncation**: Automatically truncates titles longer than 100 chars
- ✅ **Step numbering**: Uses LLM's numbering or falls back to sequential

### Error Recovery

The utility includes multiple layers of error recovery:

1. **Markdown cleanup**: Removes ```json code blocks if present
2. **JSON parsing**: Try-catch around JSON.parse with detailed errors
3. **Field validation**: Validates each field individually, skips invalid steps
4. **Graceful degradation**: Returns partial results if some steps are invalid

## API Integration

### Endpoint

```
POST /api/llm/chat
```

### Request Body

```typescript
{
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'user',
      content: extractionPrompt
    }
  ],
  apiKey: string,
  stream: false
}
```

### Response

```typescript
{
  success: true,
  data: {
    message: string,        // JSON with steps
    usage: {
      prompt_tokens: number,
      completion_tokens: number,
      total_tokens: number
    },
    cost: number,          // Cost in USD
    model: 'gpt-4o-mini'
  }
}
```

## Performance

- **Speed**: ~1-3 seconds per parse (depends on network + CoT length)
- **Cost**: ~$0.0003-0.0005 per parse
- **Token usage**: Typically 500-2000 tokens total
- **Model**: gpt-4o-mini (fastest cost-effective model)

## Testing

### Manual Testing

```typescript
// Test with sample CoT
const testCoT = `
  Let me think through this carefully.

  First, I should understand the problem...

  Next, I'll perform the calculation...

  Finally, I'll verify the answer makes sense...
`;

const result = await parseCoTSteps(testCoT, 'sk-...');
console.log(result);
```

### Expected Output

```typescript
{
  parseSuccess: true,
  totalSteps: 3,
  steps: [
    {
      stepNumber: 1,
      title: "Understand the problem",
      content: "First, I should understand the problem...",
      confidence: "high",
      category: "understanding"
    },
    {
      stepNumber: 2,
      title: "Perform the calculation",
      content: "Next, I'll perform the calculation...",
      confidence: "high",
      category: "calculation"
    },
    {
      stepNumber: 3,
      title: "Verify the answer",
      content: "Finally, I'll verify the answer makes sense...",
      confidence: "medium",
      category: "verification"
    }
  ]
}
```

## Exports

From `src/utils/index.ts`:

```typescript
export {
  parseCoTSteps,
  type ReasoningStep,
  type CoTParseResult
} from './parseCoTSteps';
```

Import anywhere in the app:

```typescript
import { parseCoTSteps } from '@/utils';
import type { ReasoningStep, CoTParseResult } from '@/utils';
```

## Logging

The utility logs cost information to the console:

```
[CoT Parser] Parse completed: { cost: '$0.000432', tokens: 857, model: 'gpt-4o-mini' }
```

This helps track API usage and costs during development.

## Future Enhancements

Potential improvements (not currently needed):

- [ ] Caching: Cache parsed results for identical CoT responses
- [ ] Batch processing: Parse multiple CoT responses in parallel
- [ ] Custom prompts: Allow custom extraction prompts
- [ ] Confidence scoring: Add numeric confidence scores (0-100)
- [ ] Step relationships: Identify dependencies between steps
- [ ] Alternative models: Support different LLM models for parsing

## Notes

- **Model choice**: gpt-4o-mini is the most cost-effective model supported by the backend
- **gpt-3.5-turbo**: Not currently supported by the backend (only gpt-4o-mini, gpt-4o, gpt-4)
- **Cost optimization**: Already optimal - gpt-4o-mini is cheaper than gpt-3.5-turbo
- **Strict mode**: Fully compatible with TypeScript strict mode (zero `any` types)
- **Production ready**: Includes all error handling, validation, and logging needed

## Questions?

See example file: `/home/user/hacklearn/src/utils/parseCoTSteps.example.ts`
