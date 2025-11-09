import * as katex from 'katex';
import 'katex/dist/katex.min.css';
import { useMemo } from 'react';

export interface LaTeXRendererProps {
  text: string;
  className?: string;
}

interface MathSegment {
  type: 'text' | 'math';
  content: string;
  display: boolean;
  delimiter?: 'bracket' | 'dollar'; // Tracks original delimiter for error rendering
}

/**
 * State-machine parser that walks through text character by character
 * to identify and extract math segments with their delimiters.
 *
 * Supported delimiters (checked in priority order):
 * 1. \[...\] - Display math (bracket notation)
 * 2. $$...$$ - Display math (double dollar)
 * 3. $...$ - Inline math (single dollar)
 */
function parseLatexText(text: string): MathSegment[] {
  const segments: MathSegment[] = [];
  let currentText = '';
  let i = 0;

  while (i < text.length) {
    // State 1: Check for \[...\] (display math, bracket notation)
    if (text[i] === '\\' && i + 1 < text.length && text[i + 1] === '[') {
      // Save any accumulated text
      if (currentText) {
        segments.push({ type: 'text', content: currentText, display: false });
        currentText = '';
      }

      i += 2; // Skip \[
      let mathContent = '';
      let found = false;

      // Look for closing \]
      while (i < text.length) {
        if (text[i] === '\\' && i + 1 < text.length && text[i + 1] === ']') {
          found = true;
          i += 2; // Skip \]
          break;
        }
        mathContent += text[i];
        i++;
      }

      if (found) {
        segments.push({
          type: 'math',
          content: mathContent,
          display: true,
          delimiter: 'bracket'
        });
      } else {
        // No closing delimiter found, treat as text
        currentText = '\\[' + mathContent;
      }
      continue;
    }

    // State 2: Check for $$...$$ (display math, double dollar)
    if (text[i] === '$' && i + 1 < text.length && text[i + 1] === '$') {
      // Save any accumulated text
      if (currentText) {
        segments.push({ type: 'text', content: currentText, display: false });
        currentText = '';
      }

      i += 2; // Skip $$
      let mathContent = '';
      let found = false;

      // Look for closing $$
      while (i < text.length) {
        if (text[i] === '$' && i + 1 < text.length && text[i + 1] === '$') {
          found = true;
          i += 2; // Skip $$
          break;
        }
        mathContent += text[i];
        i++;
      }

      if (found) {
        segments.push({
          type: 'math',
          content: mathContent,
          display: true,
          delimiter: 'dollar'
        });
      } else {
        // No closing delimiter found, treat as text
        currentText = '$$' + mathContent;
      }
      continue;
    }

    // State 3: Check for $...$ (inline math, single dollar)
    if (text[i] === '$') {
      // Save any accumulated text
      if (currentText) {
        segments.push({ type: 'text', content: currentText, display: false });
        currentText = '';
      }

      i++; // Skip first $
      let mathContent = '';
      let found = false;

      // Look for closing $
      while (i < text.length) {
        if (text[i] === '$') {
          found = true;
          i++; // Skip closing $
          break;
        }
        mathContent += text[i];
        i++;
      }

      if (found) {
        segments.push({
          type: 'math',
          content: mathContent,
          display: false,
          delimiter: 'dollar'
        });
      } else {
        // No closing delimiter found, treat as text
        currentText = '$' + mathContent;
      }
      continue;
    }

    // State 4: Regular text character
    currentText += text[i];
    i++;
  }

  // Add any remaining accumulated text
  if (currentText) {
    segments.push({ type: 'text', content: currentText, display: false });
  }

  return segments;
}

/**
 * LaTeXRenderer component that parses and renders mathematical expressions
 * using KaTeX. Supports inline ($...$) and display ($$...$$ or \[...\]) math.
 *
 * Features:
 * - State-machine based parser (not regex) for robust delimiter detection
 * - Graceful error handling with visual feedback
 * - Performance-optimized with useMemo and katex.renderToString
 * - Preserves original delimiter information for accurate error display
 */
export const LaTeXRenderer: React.FC<LaTeXRendererProps> = ({
  text,
  className = ''
}) => {
  const renderedContent = useMemo(() => {
    const segments = parseLatexText(text);

    return segments.map((segment, index) => {
      // Text segments: render as-is
      if (segment.type === 'text') {
        return <span key={index}>{segment.content}</span>;
      }

      // Math segments: render with KaTeX
      try {
        const html = katex.renderToString(segment.content, {
          displayMode: segment.display,
          throwOnError: true,
          output: 'html',
        });

        if (segment.display) {
          return (
            <div
              key={index}
              className="my-4 overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } else {
          return (
            <span
              key={index}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
      } catch (error) {
        // Error handling: render raw text with warning color
        // Preserve original delimiter for accurate display
        let rawText: string;
        if (segment.delimiter === 'bracket') {
          rawText = `\\[${segment.content}\\]`;
        } else {
          const delim = segment.display ? '$$' : '$';
          rawText = `${delim}${segment.content}${delim}`;
        }

        return (
          <span
            key={index}
            className="text-yellow-400/70"
            title={`LaTeX parse error: ${error instanceof Error ? error.message : 'Unknown error'}`}
          >
            {rawText}
          </span>
        );
      }
    });
  }, [text]);

  return <div className={className}>{renderedContent}</div>;
};
