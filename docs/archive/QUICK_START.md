# Google Colab Integration - Quick Start

## 5-Minute Setup Guide

### Step 1: Update GitHub Config (30 seconds)

Edit `src/components/ui/ColabButton.tsx`:

```typescript
// Line ~15-16, replace with your details:
const githubUser = 'YOUR_GITHUB_USERNAME';
const githubRepo = 'hacklearn';
```

### Step 2: Import Styles (30 seconds)

In your main app file or layout component:

```tsx
import './styles/codeblock.css';
```

### Step 3: Use Components (1 minute)

```tsx
import { PythonCodeBlock } from './components/ui/CodeBlock';

// In your component:
<PythonCodeBlock
  code="print('Hello, World!')"
  colabPath="/notebooks/01-prompt-injection.ipynb"
/>
```

### Step 4: Push to GitHub (2 minutes)

```bash
git add .
git commit -m "Add Colab integration"
git push origin main
```

### Step 5: Test (1 minute)

1. Open your app
2. Click "Open in Colab" button
3. Verify notebook opens in Colab

**Done!** 🎉

---

## Quick Component Reference

### CodeBlock
```tsx
<CodeBlock
  code={code}
  language="python"
  colabPath="/notebooks/01-prompt-injection.ipynb"
  showLineNumbers={true}
  highlight={[5, 6]}
/>
```

### ColabButton
```tsx
<ColabButton
  notebookPath="/notebooks/12-sql-injection.ipynb"
  title="Start Lab"
  variant="primary"
  size="large"
/>
```

### CopyCodeButton
```tsx
<CopyCodeButton
  code={code}
  language="python"
/>
```

---

## Available Notebooks

| Notebook | Path | Topic |
|----------|------|-------|
| Prompt Injection | `/notebooks/01-prompt-injection.ipynb` | AI Security |
| Adversarial ML | `/notebooks/02-adversarial-ml.ipynb` | ML Security |
| SQL Injection | `/notebooks/12-sql-injection.ipynb` | Web Security |
| XSS | `/notebooks/13-xss.ipynb` | Web Security |
| Penetration Testing | `/notebooks/20-penetration-testing.ipynb` | Complete Methodology |

---

## Common Issues

**Issue:** Notebooks won't open in Colab
- **Fix:** Ensure repo is public and paths are correct

**Issue:** Copy button doesn't work
- **Fix:** Check HTTPS connection (required for Clipboard API)

**Issue:** Styles not applied
- **Fix:** Import `codeblock.css` in main app file

---

## Full Documentation

- **Complete Guide:** `COLAB_INTEGRATION_GUIDE.md`
- **Deployment Info:** `COLAB_DEPLOYMENT_SUMMARY.md`
- **Notebook Docs:** `notebooks/README.md`
- **Examples:** `src/components/examples/NotebookIntegrationExample.tsx`

---

**HackLearn Pro - Learn by doing, secure by design.**
