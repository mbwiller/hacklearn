/**
 * Chain of Thought (CoT) Step Parser
 * Uses LLM to analyze CoT reasoning and extract structured steps
 *
 * Cost: ~$0.0003-0.0005 per parse using gpt-4o-mini
 * ($0.15 input / $0.60 output per 1M tokens)
 */

/**
 * Represents a single reasoning step in the CoT analysis
 */
export interface ReasoningStep {
  stepNumber: number;
  title: string; // max 100 chars
  content: string;
  confidence: 'high' | 'medium' | 'low';
  category: 'understanding' | 'calculation' | 'verification' | 'conclusion';
}

/**
 * Result of parsing CoT steps
 */
export interface CoTParseResult {
  steps: ReasoningStep[];
  totalSteps: number;
  parseSuccess: boolean;
  error?: string;
}

/**
 * API response from /api/llm/chat endpoint
 */
interface ChatResponse {
  success: true;
  data: {
    message: string;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
    cost: number;
    model: string;
  };
}

/**
 * API error response
 */
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

type APIResponse = ChatResponse | ErrorResponse;

/**
 * Raw step structure from LLM response (before validation)
 */
interface RawReasoningStep {
  stepNumber?: number;
  title?: string;
  content?: string;
  confidence?: string;
  category?: string;
}

/**
 * Generates the extraction prompt for the LLM
 */
function generateExtractionPrompt(cotResponse: string): string {
  return `You are a reasoning analysis expert. Analyze the following Chain of Thought reasoning and extract discrete steps.

REASONING TO ANALYZE:
"""
${cotResponse}
"""

INSTRUCTIONS:
1. Identify each distinct reasoning step in the text
2. For each step, provide:
   - stepNumber: Sequential number (1, 2, 3...)
   - title: Brief title (max 6 words, e.g., "Calculate total lunch pizzas")
   - content: The actual reasoning for this step
   - confidence: 'high' (certain language), 'medium' (neutral), or 'low' (uncertain language like "maybe", "possibly")
   - category: 'understanding' (problem comprehension), 'calculation' (math/logic), 'verification' (checking work), or 'conclusion' (final answer)

3. Return ONLY valid JSON in this exact format:
{
  "steps": [
    {
      "stepNumber": 1,
      "title": "Brief title here",
      "content": "Full reasoning content here",
      "confidence": "high",
      "category": "understanding"
    }
  ]
}

CRITICAL: Return ONLY the JSON object, no markdown code blocks, no explanations.`;
}

/**
 * Removes markdown code block syntax from response
 * Handles: ```json ... ```, ``` ... ```, etc.
 */
function cleanMarkdownCodeBlocks(text: string): string {
  // Remove markdown code blocks (```json ... ``` or ``` ... ```)
  return text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
}

/**
 * Validates and normalizes a single reasoning step
 */
function validateReasoningStep(
  rawStep: RawReasoningStep,
  index: number
): ReasoningStep | null {
  // Required fields
  if (!rawStep.title || typeof rawStep.title !== 'string') {
    console.warn(`[CoT Parser] Step ${index + 1}: Missing or invalid title`);
    return null;
  }

  if (!rawStep.content || typeof rawStep.content !== 'string') {
    console.warn(`[CoT Parser] Step ${index + 1}: Missing or invalid content`);
    return null;
  }

  // Normalize and validate confidence
  const validConfidences: Array<'high' | 'medium' | 'low'> = ['high', 'medium', 'low'];
  const confidence: 'high' | 'medium' | 'low' =
    rawStep.confidence && validConfidences.includes(rawStep.confidence as 'high' | 'medium' | 'low')
      ? (rawStep.confidence as 'high' | 'medium' | 'low')
      : 'medium';

  // Normalize and validate category
  const validCategories: Array<'understanding' | 'calculation' | 'verification' | 'conclusion'> = [
    'understanding',
    'calculation',
    'verification',
    'conclusion'
  ];
  const category: 'understanding' | 'calculation' | 'verification' | 'conclusion' =
    rawStep.category &&
    validCategories.includes(rawStep.category as 'understanding' | 'calculation' | 'verification' | 'conclusion')
      ? (rawStep.category as 'understanding' | 'calculation' | 'verification' | 'conclusion')
      : 'calculation';

  // Truncate title to 100 characters if needed
  const title = rawStep.title.length > 100
    ? rawStep.title.substring(0, 97) + '...'
    : rawStep.title;

  // Use provided stepNumber or fall back to index + 1
  const stepNumber = typeof rawStep.stepNumber === 'number'
    ? rawStep.stepNumber
    : index + 1;

  return {
    stepNumber,
    title,
    content: rawStep.content,
    confidence,
    category
  };
}

/**
 * Parses the LLM response and extracts structured reasoning steps
 */
function parseStepsFromResponse(responseText: string): ReasoningStep[] {
  // Clean markdown code blocks
  const cleanedText = cleanMarkdownCodeBlocks(responseText);

  // Parse JSON
  let parsed: unknown;
  try {
    parsed = JSON.parse(cleanedText);
  } catch (error) {
    console.error('[CoT Parser] JSON parse error:', error);
    throw new Error('Failed to parse JSON response from LLM');
  }

  // Validate response structure
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('LLM response is not a valid JSON object');
  }

  const response = parsed as Record<string, unknown>;

  if (!response.steps || !Array.isArray(response.steps)) {
    throw new Error('LLM response missing "steps" array');
  }

  // Validate and normalize each step
  const validatedSteps: ReasoningStep[] = [];
  for (let i = 0; i < response.steps.length; i++) {
    const rawStep = response.steps[i] as RawReasoningStep;
    const validatedStep = validateReasoningStep(rawStep, i);

    if (validatedStep) {
      validatedSteps.push(validatedStep);
    }
  }

  if (validatedSteps.length === 0) {
    throw new Error('No valid steps found in LLM response');
  }

  return validatedSteps;
}

/**
 * Main function: Parse CoT response into structured reasoning steps
 *
 * @param cotResponse - The raw Chain of Thought text to analyze
 * @param apiKey - OpenAI API key for making the LLM call
 * @returns Parsed steps or error information
 *
 * @example
 * ```typescript
 * const result = await parseCoTSteps(cotText, 'sk-...');
 * if (result.parseSuccess) {
 *   console.log(`Found ${result.totalSteps} steps`);
 *   result.steps.forEach(step => {
 *     console.log(`${step.stepNumber}. ${step.title}`);
 *   });
 * } else {
 *   console.error('Parse failed:', result.error);
 * }
 * ```
 */
export async function parseCoTSteps(
  cotResponse: string,
  apiKey: string
): Promise<CoTParseResult> {
  // Input validation
  if (!cotResponse || typeof cotResponse !== 'string') {
    return {
      steps: [],
      totalSteps: 0,
      parseSuccess: false,
      error: 'Invalid input: cotResponse must be a non-empty string'
    };
  }

  if (!apiKey || typeof apiKey !== 'string' || !apiKey.startsWith('sk-')) {
    return {
      steps: [],
      totalSteps: 0,
      parseSuccess: false,
      error: 'Invalid API key format'
    };
  }

  try {
    // Generate extraction prompt
    const extractionPrompt = generateExtractionPrompt(cotResponse);

    // Supabase Edge Function URL (same pattern as useLLMChat hook)
    const SUPABASE_FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || 'https://ajigpytercayzftfjtle.supabase.co/functions/v1';
    const API_URL = `${SUPABASE_FUNCTIONS_URL}/llm-chat/chat`;

    // Make API call to Supabase Edge Function
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Cost-effective model: $0.15/$0.60 per 1M tokens
        messages: [
          {
            role: 'user',
            content: extractionPrompt
          }
        ],
        apiKey,
        stream: false
      })
    });

    // Check HTTP response status
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[CoT Parser] API HTTP error:', response.status, errorText);
      return {
        steps: [],
        totalSteps: 0,
        parseSuccess: false,
        error: `API request failed with status ${response.status}`
      };
    }

    // Parse API response
    const apiResponse = (await response.json()) as APIResponse;

    // Handle API errors (type guard)
    if (!apiResponse.success) {
      const errorResponse = apiResponse as ErrorResponse;
      console.error('[CoT Parser] API error:', errorResponse.error);
      return {
        steps: [],
        totalSteps: 0,
        parseSuccess: false,
        error: `API error: ${errorResponse.error.message}`
      };
    }

    // Extract message from successful response
    const llmMessage = apiResponse.data.message;

    // Log cost information
    console.log('[CoT Parser] Parse completed:', {
      cost: `$${apiResponse.data.cost.toFixed(6)}`,
      tokens: apiResponse.data.usage.total_tokens,
      model: apiResponse.data.model
    });

    // Parse steps from LLM response
    const steps = parseStepsFromResponse(llmMessage);

    return {
      steps,
      totalSteps: steps.length,
      parseSuccess: true
    };
  } catch (error) {
    // Handle unexpected errors
    console.error('[CoT Parser] Unexpected error:', error);

    const errorMessage = error instanceof Error
      ? error.message
      : 'An unexpected error occurred during parsing';

    return {
      steps: [],
      totalSteps: 0,
      parseSuccess: false,
      error: errorMessage
    };
  }
}
