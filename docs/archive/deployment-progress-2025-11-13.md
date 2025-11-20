# HackLearn Pro - Deployment Progress Tracker

**Session Started**: 2025-11-13
**Deployment Strategy**: Supabase Edge Functions + Pyodide + Vercel
**Estimated Time**: 4-6 hours
**Current Status**: ⏳ IN PROGRESS

---

## 🎯 Mission Overview

Migrate HackLearn Pro from Express backend → Supabase Edge Functions + browser-based Pyodide execution, then deploy to Vercel with production-grade configuration.

**Why this matters**:
- Zero backend hosting costs (serverless)
- Infinite scalability (Vercel + Supabase)
- Clean architecture (no Express server to maintain)
- Production-ready for portfolio showcase

---

## ✅ Prerequisites COMPLETED

- [x] Vercel account created
- [x] Vercel CLI installed globally (`npm install -g vercel`)
- [x] Vercel login authenticated
- [x] Supabase CLI verified (v2.58.5)
- [x] Production Supabase instance ready
- [x] Git status clean (only .env.example modified)

**Supabase Details**:
- Project URL: `https://ajigpytercayzftfjtle.supabase.co`
- Project Ref: `ajigpytercayzftfjtle`
- Auth: Email/password + OAuth ready
- Database: PostgreSQL with RLS enabled

---

## 📋 Phase 1: Supabase Edge Functions Setup

**Status**: ⏳ NOT STARTED
**Estimated Time**: 90-120 minutes

### 1.1 Initialize Functions Directory
- [ ] Run: `npx supabase functions new llm-chat`
- [ ] Verify directory created: `supabase/functions/llm-chat/`
- [ ] Check for `index.ts` template file

**Expected Output**:
```
✓ Created new Function at supabase/functions/llm-chat/index.ts
```

### 1.2 Create OpenAI Proxy Edge Function
- [ ] Create `supabase/functions/llm-chat/index.ts`
- [ ] Import Deno dependencies (serve, OpenAI client)
- [ ] Migrate rate limiting logic from Express
- [ ] Implement streaming response support
- [ ] Add error handling for OpenAI API failures
- [ ] Add CORS headers for Vercel domain

**Key Code Patterns**:
```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { OpenAI } from "https://esm.sh/openai@4.20.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
```

**Files to Reference**:
- Original Express route: `server/src/routes/llm.ts`
- Rate limiting: `server/src/middleware/rateLimiter.ts`
- Current frontend: `src/hooks/useLLMChat.ts` (to match interface)

### 1.3 Configure Environment Secrets
- [ ] Get OpenAI API key (from localStorage or user)
- [ ] Set secret: `npx supabase secrets set OPENAI_API_KEY=sk-...`
- [ ] Verify secret saved: `npx supabase secrets list`

### 1.4 Local Testing
- [ ] Start local functions: `npx supabase functions serve llm-chat`
- [ ] Test with curl: `curl http://localhost:54321/functions/v1/llm-chat`
- [ ] Verify streaming works
- [ ] Verify error handling works

### 1.5 Deploy Edge Function
- [ ] Deploy: `npx supabase functions deploy llm-chat`
- [ ] Capture function URL: `https://ajigpytercayzftfjtle.supabase.co/functions/v1/llm-chat`
- [ ] Test production function with curl
- [ ] Verify cold start time (<3 seconds)

**Checkpoint 1 Complete When**:
✅ Edge function deployed and responding to requests
✅ Streaming support working
✅ Error handling tested
✅ Function URL captured for frontend integration

---

## 📋 Phase 2: Pyodide Integration for Code Execution

**Status**: ⏳ NOT STARTED
**Estimated Time**: 60-90 minutes

### 2.1 Install Dependencies
- [ ] Run: `npm install pyodide`
- [ ] Verify package.json updated
- [ ] Check bundle size impact (should be lazy-loaded)

### 2.2 Create Pyodide Executor Module
- [ ] Create file: `src/lib/pyodide-executor.ts`
- [ ] Implement `initPyodide()` function
- [ ] Implement `executePythonCode(code: string)` function
- [ ] Implement `executeJavaScriptCode(code: string)` function
- [ ] Add timeout handling (10 second max execution)
- [ ] Add error catching and formatting
- [ ] Add console output capture

**Key Interfaces**:
```typescript
export interface ExecutionResult {
  success: boolean
  output: string
  error?: string
  executionTime: number
}

export async function initPyodide(): Promise<void>
export async function executePythonCode(code: string): Promise<ExecutionResult>
export async function executeJavaScriptCode(code: string): Promise<ExecutionResult>
```

**Critical Features**:
- Lazy load Pyodide (only when IDE is opened)
- Cache Pyodide instance globally
- Support common Python stdlib modules (math, json, re, etc.)
- Capture stdout/stderr
- Handle infinite loops with timeout

### 2.3 Update Code Executor API
- [ ] Open: `src/api/codeExecutor.ts`
- [ ] Replace server API calls with Pyodide executor
- [ ] Update `executeCode()` function
- [ ] Remove `API_BASE_URL` dependency
- [ ] Add Pyodide initialization on first call
- [ ] Update TypeScript types to match new interface

**Before** (calls server):
```typescript
const response = await axios.post(`${API_BASE_URL}/api/execute`, { code, language })
```

**After** (uses Pyodide):
```typescript
if (language === 'python') {
  return await executePythonCode(code)
} else {
  return await executeJavaScriptCode(code)
}
```

### 2.4 Update IDE Components
- [ ] Open: `src/components/ide/CodeEditor.tsx`
- [ ] Add Pyodide loading state
- [ ] Show "Initializing Python runtime..." on first load
- [ ] Update run button to handle Pyodide initialization
- [ ] Add error boundary for Pyodide failures

### 2.5 Test Lab Problems
- [ ] Test lab 1 (Prompt Injection) - Python execution
- [ ] Test lab 5 (Adversarial Attacks) - Math libraries
- [ ] Test lab 10 (Penetration Testing) - String manipulation
- [ ] Test JavaScript execution (if any labs use it)
- [ ] Test error cases (syntax errors, runtime errors)
- [ ] Test timeout handling (infinite loop)

**Checkpoint 2 Complete When**:
✅ Pyodide installed and integrated
✅ All 3 test labs execute successfully in browser
✅ Error handling works correctly
✅ Loading states implemented
✅ No server API dependency remaining

---

## 📋 Phase 3: Frontend API Updates

**Status**: ⏳ NOT STARTED
**Estimated Time**: 30-45 minutes

### 3.1 Fix useLLMChat Hook
- [ ] Open: `src/hooks/useLLMChat.ts`
- [ ] Find line 47: `const API_BASE_URL = 'http://localhost:3001/api/llm'`
- [ ] Replace with environment-aware URL
- [ ] Import: `import { buildApiUrl } from '@/config/env'`
- [ ] Update to: `const API_BASE_URL = buildApiUrl('/functions/v1/llm-chat')`
- [ ] OR use direct env var: `${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/llm-chat`
- [ ] Update headers to include Supabase auth if needed
- [ ] Test streaming still works

**Before**:
```typescript
const API_BASE_URL = 'http://localhost:3001/api/llm';
```

**After**:
```typescript
const SUPABASE_FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || 'https://ajigpytercayzftfjtle.supabase.co/functions/v1';
const API_BASE_URL = `${SUPABASE_FUNCTIONS_URL}/llm-chat`;
```

### 3.2 Fix ApiKeyManager Component
- [ ] Open: `src/components/playground/ApiKeyManager.tsx`
- [ ] Find line 7: `const API_BASE_URL = 'http://localhost:3001/api/llm'`
- [ ] Replace with same pattern as useLLMChat
- [ ] Test API key validation still works

### 3.3 Update Environment Configuration
- [ ] Open: `src/config/env.ts`
- [ ] Review `buildApiUrl()` function
- [ ] Ensure it handles Supabase functions URL correctly
- [ ] Add production detection logic if needed

### 3.4 Update .env.example
- [ ] Open: `.env.example`
- [ ] Add new variable: `VITE_SUPABASE_FUNCTIONS_URL=https://ajigpytercayzftfjtle.supabase.co/functions/v1`
- [ ] Keep existing: `VITE_SUPABASE_URL`
- [ ] Keep existing: `VITE_SUPABASE_ANON_KEY`
- [ ] Remove obsolete: `VITE_API_URL` (if present)
- [ ] Document each variable with comments

**Final .env.example**:
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://ajigpytercayzftfjtle.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Supabase Edge Functions
VITE_SUPABASE_FUNCTIONS_URL=https://ajigpytercayzftfjtle.supabase.co/functions/v1
```

### 3.5 Clean Up Backend Dependencies (Optional)
- [ ] Consider archiving `server/` directory
- [ ] Remove backend npm scripts from root package.json (or keep for reference)
- [ ] Update README to reflect new architecture

**Checkpoint 3 Complete When**:
✅ No hardcoded localhost URLs remain
✅ All API calls use environment variables
✅ .env.example updated with all required variables
✅ TypeScript compilation passes

---

## 📋 Phase 4: Deployment Configuration

**Status**: ⏳ NOT STARTED
**Estimated Time**: 15-20 minutes

### 4.1 Create vercel.json
- [ ] Create file: `vercel.json` at project root
- [ ] Add React Router rewrite rules
- [ ] Add any optimization settings

**Complete vercel.json**:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 4.2 Verify Build Configuration
- [ ] Open: `vite.config.ts`
- [ ] Verify output directory is `dist`
- [ ] Verify build command in package.json: `tsc -b && vite build`
- [ ] Check for any hardcoded production URLs

### 4.3 Update package.json Scripts (if needed)
- [ ] Verify: `"build": "tsc -b && vite build"`
- [ ] Verify: `"preview": "vite preview"`
- [ ] Add if missing: `"deploy": "vercel --prod"`

**Checkpoint 4 Complete When**:
✅ vercel.json created with correct rewrites
✅ Build configuration verified
✅ All config files ready for deployment

---

## 📋 Phase 5: Local Testing & Git Commit

**Status**: ⏳ NOT STARTED
**Estimated Time**: 30-45 minutes

### 5.1 TypeScript Compilation Check
- [ ] Run: `npm run build`
- [ ] Verify: 0 errors, 0 warnings
- [ ] Check bundle size (should be ~116KB gzipped + Pyodide lazy-loaded)
- [ ] Review build output for any issues

**Expected Output**:
```
✓ built in 15s
dist/index.html                   X.XX kB
dist/assets/index-HASH.css        XX.XX kB
dist/assets/index-HASH.js         XXX.XX kB
```

### 5.2 Production Preview Testing
- [ ] Run: `npm run preview`
- [ ] Open: `http://localhost:4173`
- [ ] Test: Navigate to login page
- [ ] Test: Register new account (email/password)
- [ ] Test: Login with created account
- [ ] Test: Navigate to dashboard
- [ ] Test: Open concept detail page (any module)
- [ ] Test: Open IDE for module 1
- [ ] Test: Run Python code in IDE (verify Pyodide works)
- [ ] Test: Check Pyodide initialization time (should be <5s)
- [ ] Test: Open playground (if LLM features used)
- [ ] Test: All navigation routes work (no 404s)

**Critical Tests**:
1. **Authentication Flow**: Register → Login → Logout
2. **IDE Functionality**: Open IDE → Write code → Run → See output
3. **Pyodide Execution**: Test Python code with imports (math, json)
4. **React Router**: Refresh page on any route (should not 404)
5. **Supabase Integration**: User data persists after refresh

### 5.3 Browser Console Check
- [ ] Open DevTools Console
- [ ] Look for any errors (should be zero)
- [ ] Look for any warnings (document any found)
- [ ] Check Network tab for failed requests
- [ ] Verify no CORS errors

### 5.4 Git Commit
- [ ] Run: `git status` (review all changes)
- [ ] Stage all files: `git add .`
- [ ] Verify changes look correct: `git diff --staged`
- [ ] Commit with detailed message:

```bash
git commit -m "[Deploy] Complete Supabase Edge Functions + Pyodide Migration

Backend Architecture Migration:
- Migrated Express server to Supabase Edge Functions
- Created llm-chat edge function for OpenAI proxy
- Implemented Pyodide for browser-based code execution
- Removed localhost hardcoded URLs

Frontend Updates:
- Fixed src/hooks/useLLMChat.ts to use Supabase functions
- Fixed src/components/playground/ApiKeyManager.tsx
- Updated src/api/codeExecutor.ts to use Pyodide
- Created src/lib/pyodide-executor.ts execution engine

Deployment Configuration:
- Created vercel.json with React Router rewrites
- Updated .env.example with Supabase functions URL
- Configured for Vercel production deployment

Testing:
- All 20 modules functional with new architecture
- IDE code execution verified with Pyodide
- Authentication flow tested and working
- Build passes with zero TypeScript errors

🤖 Generated with Claude Code (https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

- [ ] Push to GitHub: `git push origin master`
- [ ] Verify push succeeded

**Checkpoint 5 Complete When**:
✅ Build completes successfully
✅ Preview testing passes all critical tests
✅ No console errors
✅ Changes committed and pushed to GitHub

---

## 📋 Phase 6: Vercel Deployment

**Status**: ⏳ NOT STARTED
**Estimated Time**: 20-30 minutes

### 6.1 Initialize Vercel Project
- [ ] Run command: `vercel`
- [ ] Answer prompts as follows:

**Expected Prompts & Answers**:
```
? Set up and deploy "~/Hacklearn - v2"? (Y/n) → Y
? Which scope do you want to deploy to? → [Select your account]
? Link to existing project? (y/N) → N
? What's your project's name? → hacklearn-pro
? In which directory is your code located? → ./
? Want to override the settings? (y/N) → N
```

- [ ] Wait for preview deployment to complete
- [ ] Capture preview URL (e.g., `hacklearn-pro-xxxxx.vercel.app`)
- [ ] Test preview URL in browser
- [ ] Verify preview builds successfully

**Expected Output**:
```
✓ Deployed to production. Run `vercel --prod` to overwrite later.
🔍 Preview: https://hacklearn-pro-xxxxx.vercel.app
```

### 6.2 Configure Environment Variables
- [ ] Note: Initial deployment will FAIL because env vars not set yet
- [ ] Go to: https://vercel.com/dashboard
- [ ] Find project: "hacklearn-pro"
- [ ] Go to: Settings → Environment Variables
- [ ] Add variables for ALL environments (Production, Preview, Development):

**Required Variables**:

1. `VITE_SUPABASE_URL`
   - Value: `https://ajigpytercayzftfjtle.supabase.co`
   - Environments: ✓ Production ✓ Preview ✓ Development

2. `VITE_SUPABASE_ANON_KEY`
   - Value: `[copy from .env.local]`
   - Environments: ✓ Production ✓ Preview ✓ Development

3. `VITE_SUPABASE_FUNCTIONS_URL`
   - Value: `https://ajigpytercayzftfjtle.supabase.co/functions/v1`
   - Environments: ✓ Production ✓ Preview ✓ Development

- [ ] Click "Save" for each variable
- [ ] Verify all 3 variables show in dashboard

### 6.3 Production Deployment
- [ ] Run command: `vercel --prod`
- [ ] Wait for build to complete (should take 1-2 minutes)
- [ ] Capture production URL
- [ ] Capture deployment ID
- [ ] Open `.vercel/project.json` and capture:
  - Project ID: `"projectId": "prj_..."`
  - Org ID: `"orgId": "team_..." or "user_..."`

**Expected Output**:
```
🔍 Inspect: https://vercel.com/[account]/hacklearn-pro/[deployment-id]
✅ Production: https://hacklearn-pro.vercel.app
```

### 6.4 Save Deployment Details
- [ ] Production URL: ___________________________
- [ ] Project ID: ___________________________
- [ ] Org ID: ___________________________
- [ ] Deployment ID: ___________________________
- [ ] Deployment Date: 2025-11-13

**Checkpoint 6 Complete When**:
✅ Production deployment successful
✅ No build errors
✅ Environment variables configured
✅ Deployment details captured

---

## 📋 Phase 7: Post-Deployment Validation

**Status**: ⏳ NOT STARTED
**Estimated Time**: 30 minutes

### 7.1 Update Supabase CORS Settings
- [ ] Go to: https://supabase.com/dashboard/project/ajigpytercayzftfjtle
- [ ] Navigate to: Settings → API → CORS Settings
- [ ] Add allowed origins:
  - `https://hacklearn-pro.vercel.app`
  - `https://*.vercel.app` (for preview deployments)
  - Keep `http://localhost:3000` (for development)
- [ ] Save changes

### 7.2 Production Smoke Tests
- [ ] Open production URL in browser
- [ ] **Test 1: Initial Load**
  - Page loads without errors
  - No console errors in DevTools
  - Splash page displays correctly

- [ ] **Test 2: Authentication Flow**
  - Click "Get Started" or "Login"
  - Navigate to registration page
  - Create new account with email/password
  - Verify account created successfully
  - Logout
  - Login with same credentials
  - Verify login successful

- [ ] **Test 3: Dashboard & Navigation**
  - Navigate to /app/dashboard
  - Verify all 20 module cards display
  - Click on 3 different modules
  - Verify concept detail pages load
  - Test back button navigation
  - Test direct URL navigation (refresh page on different route)

- [ ] **Test 4: IDE & Code Execution**
  - Open IDE for Module 1 (Prompt Injection)
  - Wait for Pyodide to initialize
  - Write simple Python code: `print("Hello from production!")`
  - Click "Run Code"
  - Verify output displays correctly
  - Test error case: `print(undefined_variable)`
  - Verify error message displays
  - Test Module 5 (requires math library): `import math; print(math.pi)`
  - Verify math library works

- [ ] **Test 5: LLM Chat (if applicable)**
  - Navigate to playground
  - Enter OpenAI API key (if required)
  - Send test message to LLM
  - Verify streaming response works
  - Check Supabase Edge Function is called (Network tab)

- [ ] **Test 6: Supabase Integration**
  - Verify user progress saves after completing actions
  - Logout and login again
  - Verify progress persisted
  - Check Supabase dashboard for user data

- [ ] **Test 7: Responsive Design**
  - Test on mobile viewport (DevTools)
  - Test on tablet viewport
  - Verify layout adapts correctly

- [ ] **Test 8: Performance**
  - Open Lighthouse in DevTools
  - Run audit on production URL
  - Capture scores:
    - Performance: ___ / 100 (target: 90+)
    - Accessibility: ___ / 100
    - Best Practices: ___ / 100
    - SEO: ___ / 100

### 7.3 Error Monitoring
- [ ] Check Vercel deployment logs for any errors
- [ ] Check Supabase Edge Function logs
- [ ] Set up error tracking (optional but recommended):
  - Consider adding Sentry integration
  - Consider adding Vercel Analytics

### 7.4 Documentation Updates
- [ ] Update README.md with:
  - Production URL
  - Deployment instructions
  - Environment variables required
  - Architecture diagram (Express → Supabase)
- [ ] Create ARCHITECTURE.md documenting:
  - Supabase Edge Functions setup
  - Pyodide integration
  - Deployment process
- [ ] Update .claude/CLAUDE.md with deployment status

**Checkpoint 7 Complete When**:
✅ All smoke tests passing
✅ CORS configured correctly
✅ No production errors
✅ Performance metrics acceptable
✅ Documentation updated

---

## 🎉 DEPLOYMENT COMPLETE CHECKLIST

When ALL checkpoints are complete:

- [ ] ✅ Supabase Edge Function deployed and working
- [ ] ✅ Pyodide executing code in browser
- [ ] ✅ Frontend deployed to Vercel
- [ ] ✅ Environment variables configured
- [ ] ✅ Authentication working in production
- [ ] ✅ All 20 modules accessible
- [ ] ✅ IDE functionality working
- [ ] ✅ No console errors
- [ ] ✅ No build errors
- [ ] ✅ CORS configured
- [ ] ✅ Documentation updated
- [ ] ✅ Git committed and pushed

**Final Deliverables**:
1. Production URL: ___________________________
2. Vercel Project ID: ___________________________
3. Vercel Org ID: ___________________________
4. Deployment Summary: [Document any warnings/issues]

---

## 🐛 Issues & Resolutions Log

**Format**: `[Phase.Step] Issue → Resolution`

### Example:
- `[1.5] Edge function deploy failed with CORS error → Added corsHeaders to response`
- `[2.4] Pyodide initialization takes 10s → Added loading indicator, acceptable for MVP`

### Actual Issues (to be filled in):

1. ___________________________________________________________
2. ___________________________________________________________
3. ___________________________________________________________

---

## 📊 Performance Metrics

**Build Stats**:
- Build time: ___ seconds
- Bundle size (gzipped): ___ KB
- Pyodide size (lazy-loaded): ~6MB (CDN)

**Runtime Performance**:
- Cold start (Vercel): ___ ms
- Edge function cold start: ___ ms
- Pyodide initialization: ___ seconds
- Time to interactive: ___ seconds

**Lighthouse Scores** (Production):
- Performance: ___ / 100
- Accessibility: ___ / 100
- Best Practices: ___ / 100
- SEO: ___ / 100

---

## 🔄 If Context Runs Out - Recovery Instructions

**Current Phase**: [Update this as you progress]
**Last Completed Task**: [Update this after each task]
**Next Task**: [Update this before each task]

**To Resume**:
1. Read this document from top to bottom
2. Check the "Status" field for each phase
3. Find the first phase with "⏳ NOT STARTED" or "🚧 IN PROGRESS"
4. Review the checklist items with [ ] (not checked)
5. Start with the first unchecked item
6. Update this document as you complete each task

**Critical Files to Check**:
- `src/hooks/useLLMChat.ts` - Has localhost been replaced?
- `src/components/playground/ApiKeyManager.tsx` - Has localhost been replaced?
- `src/lib/pyodide-executor.ts` - Does this file exist?
- `src/api/codeExecutor.ts` - Does it use Pyodide?
- `vercel.json` - Does it exist?
- `supabase/functions/llm-chat/index.ts` - Does it exist and is it deployed?

**Quick Status Check Commands**:
```bash
# Check what's been modified
git status

# Check if vercel.json exists
ls vercel.json

# Check if Supabase functions exist
ls supabase/functions/

# Check if Pyodide is installed
npm list pyodide

# Check current build status
npm run build

# Check if deployed to Vercel
cat .vercel/project.json
```

---

## 📝 Session Notes

**Session 1 (2025-11-13)**:
- Starting full migration
- User confirmed: Full migration now (4-6 hours)
- User committed to Supabase Edge Functions approach
- Prerequisites all completed
- Ready to execute

**Next Session** (if needed):
- [Notes about where to pick up]

---

**END OF TRACKING DOCUMENT**
**Remember to update checkboxes as you complete tasks!**
**Update phase statuses: ⏳ NOT STARTED → 🚧 IN PROGRESS → ✅ COMPLETE**
