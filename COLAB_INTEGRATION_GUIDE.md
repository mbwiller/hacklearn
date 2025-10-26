# Google Colab Integration Guide

## Overview

This guide explains how to integrate Google Colab notebooks with HackLearn Pro, enabling interactive, hands-on learning experiences for users.

## Table of Contents

1. [Setup](#setup)
2. [Notebooks](#notebooks)
3. [React Components](#react-components)
4. [Usage Examples](#usage-examples)
5. [GitHub Integration](#github-integration)
6. [Testing](#testing)

---

## Setup

### Prerequisites

- GitHub repository with public access (for hosting notebooks)
- React/TypeScript environment
- Notebooks stored in `/notebooks` directory

### Configuration

Update the GitHub configuration in `ColabButton.tsx`:

```typescript
// In src/components/ui/ColabButton.tsx
const githubUser = 'YOUR_GITHUB_USERNAME';
const githubRepo = 'hacklearn'; // or your repo name
```

---

## Notebooks

### Available Notebooks

Five flagship Colab notebooks have been created:

1. **01-prompt-injection.ipynb** - Prompt Injection Attacks
   - Direct injection techniques
   - Indirect injection
   - Defense mechanisms
   - Challenge exercises

2. **02-adversarial-ml.ipynb** - Adversarial Machine Learning
   - FGSM attacks
   - PGD attacks
   - Model poisoning
   - Defense strategies

3. **12-sql-injection.ipynb** - SQL Injection
   - Authentication bypass
   - UNION-based injection
   - Blind SQL injection
   - Secure coding practices

4. **13-xss.ipynb** - Cross-Site Scripting
   - Reflected XSS
   - Stored XSS
   - DOM-based XSS
   - XSS prevention

5. **20-penetration-testing.ipynb** - Penetration Testing Fundamentals
   - Reconnaissance
   - Scanning & enumeration
   - Exploitation techniques
   - Post-exploitation
   - Reporting

### Notebook Structure

Each notebook follows this structure:

```json
{
  "cells": [
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": ["# Title - Hands-On Lab\n\n**Part of HackLearn Pro**"]
    },
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": ["## Setup\n\nInstall required packages:"]
    },
    {
      "cell_type": "code",
      "metadata": {},
      "source": ["!pip install <dependencies>"]
    }
    // ... more cells
  ]
}
```

---

## React Components

### CopyCodeButton Component

Provides copy-to-clipboard functionality with visual feedback.

**Location:** `src/components/ui/CopyCodeButton.tsx`

**Props:**
- `code` (string, required): Code to copy
- `language` (string, optional): Programming language
- `className` (string, optional): Additional CSS classes

**Features:**
- Modern Clipboard API with fallback
- Visual feedback (checkmark animation)
- Cross-browser compatibility
- Auto-reset after 2 seconds

**Usage:**
```tsx
import CopyCodeButton from './components/ui/CopyCodeButton';

<CopyCodeButton
  code={pythonCode}
  language="python"
/>
```

---

### ColabButton Component

Opens notebooks in Google Colab with customizable styling.

**Location:** `src/components/ui/ColabButton.tsx`

**Props:**
- `notebookPath` (string, required): Path to notebook file
- `title` (string, optional): Button text
- `githubUser` (string, optional): GitHub username
- `githubRepo` (string, optional): Repository name
- `variant` ('primary' | 'secondary' | 'outline', optional): Button style
- `size` ('small' | 'medium' | 'large', optional): Button size
- `className` (string, optional): Additional CSS classes

**Features:**
- Automatic Colab URL generation
- Multiple style variants
- Opens in new tab
- Accessible with ARIA labels

**Usage:**
```tsx
import ColabButton from './components/ui/ColabButton';

<ColabButton
  notebookPath="/notebooks/01-prompt-injection.ipynb"
  title="Try Prompt Injection Lab"
  variant="primary"
  size="medium"
/>
```

**Alternative: ColabBadge**

Compact badge version using Google's official badge image:

```tsx
import { ColabBadge } from './components/ui/ColabButton';

<ColabBadge
  notebookPath="/notebooks/01-prompt-injection.ipynb"
/>
```

---

### CodeBlock Component

Enhanced code display with copy and Colab integration.

**Location:** `src/components/ui/CodeBlock.tsx`

**Props:**
- `code` (string, required): Code to display
- `language` (string, required): Programming language
- `showLineNumbers` (boolean, optional): Show line numbers
- `colabPath` (string, optional): Path to related Colab notebook
- `githubUser` (string, optional): GitHub username
- `githubRepo` (string, optional): Repository name
- `title` (string, optional): Code block title
- `highlight` (number[], optional): Lines to highlight
- `className` (string, optional): Additional CSS classes
- `maxHeight` (string, optional): Max height before scrolling

**Features:**
- Syntax highlighting
- Line numbers
- Copy to clipboard
- Optional Colab integration for Python code
- Line highlighting
- Expand/collapse for long code
- Responsive design

**Usage:**
```tsx
import CodeBlock from './components/ui/CodeBlock';

<CodeBlock
  code={pythonCode}
  language="python"
  colabPath="/notebooks/01-prompt-injection.ipynb"
  title="Prompt Injection Example"
  highlight={[5, 6, 7]}
  showLineNumbers={true}
/>
```

**Specialized Variants:**

```tsx
import { PythonCodeBlock, JavaScriptCodeBlock, BashCodeBlock, SQLCodeBlock } from './components/ui/CodeBlock';

<PythonCodeBlock
  code={code}
  colabPath="/notebooks/02-adversarial-ml.ipynb"
/>
```

---

## Usage Examples

### Example 1: Basic Code Block with Copy

```tsx
import { CodeBlock } from './components/ui/CodeBlock';

const MyComponent = () => {
  const code = `
def greet(name):
    print(f"Hello, {name}!")

greet("HackLearn")
  `.trim();

  return (
    <CodeBlock
      code={code}
      language="python"
    />
  );
};
```

### Example 2: Code Block with Colab Integration

```tsx
import { PythonCodeBlock } from './components/ui/CodeBlock';

const PromptInjectionLesson = () => {
  const vulnerableCode = `
class VulnerableAIAssistant:
    def process(self, user_input):
        # VULNERABLE: Direct concatenation
        prompt = f"{self.system_prompt}\\n\\nUser: {user_input}"
        return self._simulate_response(prompt)
  `.trim();

  return (
    <div>
      <h2>Vulnerable AI Assistant</h2>
      <p>This code demonstrates a prompt injection vulnerability:</p>

      <PythonCodeBlock
        code={vulnerableCode}
        colabPath="/notebooks/01-prompt-injection.ipynb"
        title="Vulnerable Code Example"
        highlight={[4]}
      />

      <p>
        Try this code in Google Colab to see how prompt injection works!
      </p>
    </div>
  );
};
```

### Example 3: Standalone Colab Button

```tsx
import ColabButton from './components/ui/ColabButton';

const NotebookCard = ({ title, description, notebookPath }) => (
  <div className="notebook-card">
    <h3>{title}</h3>
    <p>{description}</p>
    <ColabButton
      notebookPath={notebookPath}
      title="Start Lab"
      variant="primary"
      size="large"
    />
  </div>
);

// Usage
<NotebookCard
  title="SQL Injection Lab"
  description="Learn SQL injection techniques and defenses"
  notebookPath="/notebooks/12-sql-injection.ipynb"
/>
```

### Example 4: Inline Code

```tsx
import { InlineCode } from './components/ui/CodeBlock';

const Explanation = () => (
  <p>
    Use <InlineCode>SELECT * FROM users</InlineCode> to query all users,
    but never use <InlineCode>OR '1'='1'</InlineCode> in production!
  </p>
);
```

### Example 5: Multiple Code Blocks

```tsx
const ComparisonExample = () => (
  <div>
    <h3>Vulnerable Code</h3>
    <CodeBlock
      code={vulnerableCode}
      language="python"
      title="❌ Insecure Implementation"
    />

    <h3>Secure Code</h3>
    <CodeBlock
      code={secureCode}
      language="python"
      title="✅ Secure Implementation"
      colabPath="/notebooks/01-prompt-injection.ipynb"
    />
  </div>
);
```

---

## GitHub Integration

### Setting Up GitHub Hosting

1. **Push notebooks to GitHub:**
   ```bash
   git add notebooks/
   git commit -m "Add Colab notebooks"
   git push origin main
   ```

2. **Ensure public access:**
   - Repository must be public for Colab to access notebooks
   - Alternatively, use GitHub tokens for private repos

3. **Verify notebook paths:**
   - Notebooks should be in `/notebooks/` directory
   - Use relative paths: `/notebooks/01-prompt-injection.ipynb`

### Colab URL Format

```
https://colab.research.google.com/github/{user}/{repo}/blob/main/notebooks/{filename}.ipynb
```

**Example:**
```
https://colab.research.google.com/github/hacklearn/hacklearn-pro/blob/main/notebooks/01-prompt-injection.ipynb
```

### Custom Domains (Optional)

For custom domains, you can:
1. Host notebooks on GitHub
2. Use GitHub Pages for additional content
3. Point Colab to GitHub URLs

---

## Testing

### Testing Notebooks Locally

1. **Install Jupyter:**
   ```bash
   pip install jupyter
   ```

2. **Open notebook:**
   ```bash
   jupyter notebook notebooks/01-prompt-injection.ipynb
   ```

3. **Verify all cells run successfully**

### Testing Colab Integration

1. **Verify GitHub URLs:**
   ```bash
   # Check if notebook is accessible
   curl -I https://raw.githubusercontent.com/{user}/{repo}/main/notebooks/01-prompt-injection.ipynb
   ```

2. **Test Colab URL manually:**
   - Open generated URL in browser
   - Verify notebook loads in Colab
   - Test all cells execute correctly

3. **Test React components:**
   ```bash
   npm run dev
   # Click "Open in Colab" buttons
   # Verify notebooks open correctly
   ```

### Component Testing

```tsx
// Test CopyCodeButton
import { render, fireEvent } from '@testing-library/react';
import CopyCodeButton from './components/ui/CopyCodeButton';

test('copies code to clipboard', async () => {
  const code = 'console.log("test")';
  const { getByTitle } = render(<CopyCodeButton code={code} />);

  const button = getByTitle('Copy code');
  fireEvent.click(button);

  // Verify copied state
  expect(getByTitle('Copied!')).toBeInTheDocument();
});
```

### Cross-Browser Testing

Test in:
- Chrome/Edge (modern Clipboard API)
- Firefox (modern Clipboard API)
- Safari (may need fallback)
- Mobile browsers

---

## Styling

### Importing Styles

```tsx
// In your main app file or component
import './styles/codeblock.css';
```

### Customizing Styles

Override CSS variables or classes:

```css
/* Custom theme */
.code-block-container {
  --bg-color: #1e1e1e;
  --text-color: #d4d4d4;
  --border-color: #333;
}

/* Custom button colors */
.colab-button--primary {
  background: #your-brand-color;
}

/* Custom syntax highlighting */
.language-python .keyword {
  color: #your-keyword-color;
}
```

---

## Best Practices

### 1. Notebook Organization

- Keep notebooks self-contained
- Include all necessary imports
- Add clear markdown explanations
- Include challenge exercises

### 2. Error Handling

```tsx
<CodeBlock
  code={code}
  language="python"
  colabPath={notebookPath}
  onError={(error) => {
    console.error('Failed to load code:', error);
    // Show user-friendly error message
  }}
/>
```

### 3. Performance

- Lazy load large code blocks
- Use `maxHeight` for long code samples
- Implement virtual scrolling for very long files

### 4. Accessibility

- Always provide `aria-label` attributes
- Ensure keyboard navigation works
- Test with screen readers
- Maintain sufficient color contrast

### 5. Security

- Sanitize code before displaying
- Don't execute untrusted code
- Use Content Security Policy headers

---

## Troubleshooting

### Notebook Won't Open in Colab

**Issue:** 404 error when clicking "Open in Colab"

**Solutions:**
1. Verify GitHub repository is public
2. Check notebook path is correct
3. Ensure notebook is in `main` branch
4. Verify GitHub username and repo name are correct

### Copy Button Not Working

**Issue:** Copy to clipboard fails

**Solutions:**
1. Check browser supports Clipboard API
2. Ensure HTTPS connection (required for Clipboard API)
3. Fallback to `execCommand` for older browsers
4. Check browser permissions

### Styles Not Applied

**Issue:** Components lack styling

**Solutions:**
1. Import CSS file: `import './styles/codeblock.css'`
2. Check CSS file path is correct
3. Verify CSS is bundled correctly
4. Clear browser cache

### Notebooks Have Errors

**Issue:** Colab shows errors when running cells

**Solutions:**
1. Test notebook locally first
2. Ensure all dependencies are pip-installable
3. Check Python version compatibility
4. Add error handling in notebook cells

---

## Additional Resources

- [Google Colab Documentation](https://colab.research.google.com/)
- [Jupyter Notebook Documentation](https://jupyter.org/)
- [GitHub Pages Guide](https://pages.github.com/)
- [Clipboard API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)

---

## Support

For issues or questions:
1. Check this guide
2. Review component source code
3. Test with example notebooks
4. Check browser console for errors

---

## License

This integration is part of HackLearn Pro. All notebooks and components are provided for educational purposes.

---

**Generated for HackLearn Pro - Learn by doing, secure by design.**
