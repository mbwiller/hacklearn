# LaTeXRenderer Component

A production-ready React component for rendering mathematical expressions using KaTeX, featuring a robust state-machine parser and graceful error handling.

## Overview

The `LaTeXRenderer` component parses text containing LaTeX mathematical notation and renders it beautifully using KaTeX. Unlike fragile regex-based solutions, it uses a character-by-character state-machine parser that handles edge cases robustly.

## Features

- **Robust State-Machine Parser**: Character-by-character parsing (not regex) for reliable delimiter detection
- **Multiple Delimiter Support**:
  - Inline math: `$...$`
  - Display math: `$$...$$` or `\[...\]`
- **Graceful Error Handling**: Invalid LaTeX shows raw text with subtle yellow warning
- **Performance Optimized**: Uses `katex.renderToString()` with `useMemo` for efficient rendering
- **TypeScript Strict Mode**: Full type safety with zero `any` types
- **Delimiter Preservation**: Tracks original delimiters for accurate error display

## Installation

The component requires KaTeX to be installed:

```bash
npm install katex
npm install --save-dev @types/katex
```

## Usage

### Basic Usage

```typescript
import { LaTeXRenderer } from '@/components/ui/LaTeXRenderer';

function MyComponent() {
  return (
    <LaTeXRenderer
      text="The quadratic formula is $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$"
    />
  );
}
```

### With Custom Styling

```typescript
<LaTeXRenderer
  text="Einstein's equation: $E = mc^2$"
  className="p-4 bg-slate-900 rounded-lg text-slate-200"
/>
```

### Display Math Examples

```typescript
// Using $$...$$ delimiters
const displayMath1 = "$$\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$$";

// Using \[...\] delimiters
const displayMath2 = "\\[\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}\\]";

<LaTeXRenderer text={displayMath1} />
<LaTeXRenderer text={displayMath2} />
```

### Mixed Content

```typescript
const mixedContent = `
The eigenvalue equation is $\\hat{A}|\\psi\\rangle = a|\\psi\\rangle$ where:
$$\\hat{A} = \\sum_{i=1}^n a_i |i\\rangle\\langle i|$$
This represents a complete orthonormal basis.
`;

<LaTeXRenderer text={mixedContent} />
```

## Implementation Details

### State Machine Parser

The parser walks through the input text character by character, maintaining state about whether it's inside a delimiter. It checks for delimiters in priority order:

1. **`\[...\]`** - Display math (bracket notation)
2. **`$$...$$`** - Display math (double dollar)
3. **`$...$`** - Inline math (single dollar)

This ordering ensures that `$$` is not mistakenly parsed as two separate `$` delimiters.

### Parser States

```
TEXT       → saw opening delimiter  → SEEKING_CLOSE
SEEKING_CLOSE → found closing delimiter → TEXT (add math segment)
SEEKING_CLOSE → reached end of string  → TEXT (treat as text)
```

### Edge Cases Handled

| Case | Input | Output |
|------|-------|--------|
| Unmatched opener | `"text $x^2"` | Text segment: `"text $x^2"` |
| Nested dollar in display | `"$$x$y$$"` | Math segment (display): `"x$y"` |
| Empty content | `"$$"` | Math segment (inline): `""` |
| Adjacent delimiters | `"$x$$y$"` | Math: `"x"`, Text: `"$y$"` |
| Mixed delimiters | `"$a$ and $$b$$"` | Math (inline): `"a"`, Math (display): `"b"` |

### Error Handling

When KaTeX fails to parse a math segment, the component:

1. Catches the error
2. Reconstructs the original delimited text
3. Renders it with a yellow warning color (`text-yellow-400/70`)
4. Adds a tooltip with the error message

Example:
```typescript
// Invalid LaTeX: unmatched brace
const invalidLatex = "$\\frac{a}{$";

// Renders as: <span className="text-yellow-400/70" title="LaTeX parse error">$\frac{a}{$</span>
<LaTeXRenderer text={invalidLatex} />
```

## API Reference

### LaTeXRendererProps

```typescript
interface LaTeXRendererProps {
  /** The text containing LaTeX expressions to render */
  text: string;

  /** Optional CSS class name for the container div */
  className?: string;
}
```

### Internal Types

```typescript
interface MathSegment {
  /** Type of segment: plain text or math expression */
  type: 'text' | 'math';

  /** The actual content (without delimiters) */
  content: string;

  /** Whether to render in display mode (block) or inline */
  display: boolean;

  /** Original delimiter type, for accurate error rendering */
  delimiter?: 'bracket' | 'dollar';
}
```

## Performance Considerations

1. **`useMemo` Optimization**: The parsing and rendering logic is memoized, only re-running when `text` changes
2. **`katex.renderToString()`**: Uses synchronous string rendering instead of DOM manipulation
3. **Display Math Overflow**: Display math blocks have `overflow-x-auto` for long equations

## Styling

### Default Styles

- Display math: `my-4 overflow-x-auto` (4rem vertical margin, horizontal scroll if needed)
- Inline math: Inherits surrounding text styles
- Error text: `text-yellow-400/70` (70% opacity yellow)

### KaTeX CSS

The component imports KaTeX's CSS automatically:

```typescript
import 'katex/dist/katex.min.css';
```

This provides:
- Mathematical font rendering
- Proper symbol sizing and positioning
- Display mode centering
- Fraction and root styling

### Dark Mode Compatibility

KaTeX's default styles work well with dark backgrounds. For additional customization:

```css
/* Override KaTeX colors for dark mode */
.katex {
  color: rgb(226 232 240); /* slate-200 */
}

.katex .mord {
  color: rgb(34 211 238); /* cyan-400 for operators */
}
```

## Testing

See `LaTeXRenderer.test.example.tsx` for comprehensive test cases covering:

- Inline and display math
- Mixed content
- Edge cases (unmatched delimiters, empty content)
- Error cases
- Complex mathematical notation (matrices, integrals, summations)

## Browser Compatibility

Requires:
- Modern browsers with ES6+ support
- React 16.8+ (hooks)
- KaTeX 0.16+ (for latest features)

## Known Limitations

1. **No Delimiter Escaping**: Currently doesn't support escaping delimiters (e.g., `\$` to render a literal dollar sign)
2. **No Macro Support**: Doesn't expand custom KaTeX macros (can be added via KaTeX options)
3. **Single-Line Optimization**: Parser is optimized for typical use cases, not 100MB+ strings

## Future Enhancements

Potential improvements for future iterations:

- [ ] Support for delimiter escaping (`\$`, `\[`)
- [ ] Custom KaTeX macro support
- [ ] Accessibility improvements (aria-labels for math)
- [ ] Copy-to-clipboard for equations
- [ ] Lazy rendering for long documents
- [ ] AST-based parser for even more robustness

## License

Part of the HackLearn platform. See project root for license information.

## Related Components

- `Input`: For entering LaTeX expressions
- `Card`: For wrapping mathematical content
- `Button`: For triggering equation rendering

## Support

For issues or questions, see the main project documentation or file an issue in the repository.
