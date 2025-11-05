# CLAUDE.md - AI Assistant Development Guide

This file provides comprehensive guidance for Claude Code (and other AI assistants) when working on the HackLearn Pro Interactive Code Execution Platform.

---

## Project Context

**Project Name**: HackLearn Pro - Interactive Code Execution Platform
**Location**: `C:\Users\Matt Willer\Ongoing Projects\Hacklearn - v2\IDE_UIUX_Recreation\prototype`
**Purpose**: LeetCode-style coding platform for security education with real Docker-sandboxed code execution
**Current Phase**: Phase 1.1 - Express.js backend setup
**Development Model**: Iterative 5-phase rollout (balanced MVP → production-ready)

---

## Critical Development Protocols

### 1. Session Management (MANDATORY)

**At START of every session:**
1. Read `README.md` for current project status
2. Read `CLAUDE.md` (this file) for context and patterns
3. Check `Session Update Log` in README.md for last session's work
4. Identify current phase and incomplete tasks

**During session:**
1. Use TodoWrite tool to track tasks for complex work
2. Follow established patterns (see "Code Patterns" section)
3. Maintain type safety (TypeScript strict mode)
4. Test changes before marking complete

**At END of every session (CRITICAL):**
1. **Update README.md**:
   - Move completed tasks from ⏳ to ✅
   - Update "Current Status" section
   - Add session entry to "Session Update Log"
   - Document new dependencies or architecture changes

2. **Update CLAUDE.md** (this file):
   - Add new code patterns established
   - Document API contracts created
   - Note file locations for new components
   - Update "What's Implemented" section

3. **Git Commit** (if significant progress):
   ```bash
   git add .
   git commit -m "[Phase X.Y] Brief description

   - Detailed change 1
   - Detailed change 2

   Status: X/Y complete

   Generated with Claude Code
   Co-Authored-By: Claude <noreply@anthropic.com>"
   ```

4. **Manual Testing**:
   - Frontend: `npm run dev` and verify UI works
   - Backend: `cd backend && npm run dev` and test API
   - Linting: `npm run lint` in both directories

---

## What's Implemented

### Frontend (100% Complete)

**Location**: `prototype/src/`

**Key Files**:
- `App.tsx` (lines 1-100): Main app, state management, mocked execution logic
- `components/CodeEditor.tsx`: Monaco Editor wrapper with TypeScript/Python/JavaScript support
- `components/ConsoleOutput.tsx`: Test results display with status icons
- `components/ProblemPanel.tsx`: Problem description with tabs (Description/Editorial/Solutions/Submissions)
- `components/HintsPanel.tsx`: Progressive hints system
- `types/index.ts` (lines 1-48): TypeScript interfaces (Problem, TestResult, Language, etc.)

**State Management** (App.tsx):
```typescript
const [language, setLanguage] = useState<Language>('python');
const [code, setCode] = useState<string>(sampleProblem.starterCode.python);
const [testResult, setTestResult] = useState<TestResult | null>(null);
const [isRunning, setIsRunning] = useState(false);
```

**Current Execution Flow** (App.tsx lines 32-59):
1. `handleRunCode()` called by Run button or Ctrl+Enter
2. Sets `isRunning = true`
3. 1.5s timeout (mocked execution)
4. Random results generated (70% success rate)
5. TestResult object created
6. State updated, ConsoleOutput displays results

**What's Missing**:
- Real API call to backend (Phase 1.3)
- Language switching functionality (Phase 4.2)
- Individual test case results display (Phase 3)

### Backend (Not Yet Implemented)

**Target Location**: `prototype/backend/`

**Phase 1.1 Goals** (Current):
- Express.js server with TypeScript
- POST `/api/execute` endpoint
- Basic `child_process` execution (Python/Node.js)
- CORS for `http://localhost:7777`
- Zod request validation
- Pino structured logging

**Phase 2 Goals** (Week 2):
- Docker integration via `dockerode`
- Python 3.11 Alpine image
- Node 20 Alpine image
- Resource limits (256MB RAM, 1 CPU, 10s timeout)

---

## Architecture Decisions

### Why Express.js + TypeScript?

- Matches frontend stack (TypeScript consistency)
- Lightweight, flexible, well-documented
- Easy integration with Dockerode
- Fast development iteration

### Why Docker for Execution?

- **Security**: Complete isolation from host system
- **Resource Control**: RAM/CPU/timeout limits
- **Reproducibility**: Identical environment every execution
- **Scalability**: Horizontal scaling in cloud (AWS ECS, Cloud Run)

### Why child_process in Phase 1?

- **MVP Speed**: Get working prototype in days, not weeks
- **Iterative Development**: Test API contract before Docker complexity
- **Risk Mitigation**: Validate architecture before production investment
- **Migration Path**: Easy to replace with Docker in Phase 2

**⚠️ Security Warning**: Phase 1 is localhost-only. Do NOT deploy child_process execution to production.

### Why No SQL Execution Yet?

- Python/JavaScript are sufficient for MVP validation
- SQL requires database setup (PostgreSQL/MySQL Docker container)
- More complex test case design (DDL setup, data seeding)
- Deferred to Phase 6+ (post-MVP enhancement)

---

## Code Patterns & Standards

### TypeScript Interfaces

**Shared Types** (frontend `src/types/index.ts` and backend `backend/src/types/index.ts`):

```typescript
// These interfaces MUST match exactly between frontend and backend

export type Language = 'python' | 'javascript' | 'sql';

export interface TestResult {
  status: 'accepted' | 'wrong_answer' | 'runtime_error' | 'time_limit_exceeded';
  runtime?: string;       // "42ms"
  memory?: string;        // "14.2 MB"
  testsPassed: number;
  testsTotal: number;
  output: string;
  error?: string;
}

export interface ExecuteRequest {
  code: string;
  language: Language;
  problemId: number;
}

export interface ExecuteResponse extends TestResult {
  // TestResult + any additional backend-specific fields
}
```

**IMPORTANT**: When modifying these interfaces, update BOTH files and document the change in this file.

### API Client Pattern (Phase 1.3)

**Location**: `src/api/client.ts` (to be created)

```typescript
import axios from 'axios';
import type { ExecuteRequest, ExecuteResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15s timeout (execution + network overhead)
  headers: {
    'Content-Type': 'application/json',
  },
});

export const executeCode = async (request: ExecuteRequest): Promise<ExecuteResponse> => {
  const response = await api.post<ExecuteResponse>('/api/execute', request);
  return response.data;
};
```

**Environment Variables**:
- Create `.env.local` in frontend root: `VITE_API_URL=http://localhost:3000`

### Error Handling Pattern

**Frontend** (App.tsx handleRunCode):
```typescript
const handleRunCode = async () => {
  setIsRunning(true);
  setTestResult(null);

  try {
    const result = await executeCode({
      code,
      language,
      problemId: sampleProblem.id,
    });
    setTestResult(result);
  } catch (error) {
    setTestResult({
      status: 'runtime_error',
      testsPassed: 0,
      testsTotal: 3,
      output: '',
      error: error instanceof Error ? error.message : 'Network error occurred',
    });
  } finally {
    setIsRunning(false);
  }
};
```

**Backend** (routes/execute.ts):
```typescript
import { z } from 'zod';

const executeRequestSchema = z.object({
  code: z.string().min(1).max(50000), // 50KB limit
  language: z.enum(['python', 'javascript', 'sql']),
  problemId: z.number().int().positive(),
});

router.post('/execute', async (req, res) => {
  try {
    // Validate request
    const validatedData = executeRequestSchema.parse(req.body);

    // Execute code
    const result = await executor.run(validatedData);

    // Return result
    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid request', details: error.errors });
    }

    logger.error({ error }, 'Execution failed');
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Logging Pattern (Backend)

```typescript
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
    },
  },
});

// Usage
logger.info({ language, codeLength: code.length }, 'Code execution started');
logger.error({ error, stack: error.stack }, 'Execution failed');
```

---

## File Locations Reference

### Frontend Files

**Core Application**:
- `src/App.tsx` - Main app component, state management
- `src/main.tsx` - React entry point
- `src/index.css` - Global styles, Tailwind imports

**Components** (`src/components/`):
- `Navbar.tsx` - Top navigation (Run/Submit buttons, timer, profile)
- `ResizableLayout.tsx` - 3-panel container with react-resizable-panels
- `ProblemPanel.tsx` - Problem description, tabs (Description/Editorial/Solutions/Submissions)
- `EditorPanel.tsx` - Vertical split (CodeEditor + ConsoleOutput)
- `CodeEditor.tsx` - Monaco Editor wrapper
- `ConsoleOutput.tsx` - Test results display
- `HintsPanel.tsx` - Progressive hints system

**Data & Types**:
- `src/types/index.ts` - TypeScript interfaces (Problem, TestResult, Language, etc.)
- `src/data/sampleProblem.ts` - SQL Injection challenge definition

**API** (Phase 1.3):
- `src/api/client.ts` - Axios client, executeCode function

**Configuration**:
- `vite.config.ts` - Vite config (port 7777)
- `tailwind.config.js` - LeetCode color system
- `tsconfig.json` - TypeScript configuration

### Backend Files (To Be Created - Phase 1.1)

**Core Server** (`backend/src/`):
- `server.ts` - Express app setup, middleware, routes
- `types/index.ts` - Shared types (must match frontend)

**Routes** (`backend/src/routes/`):
- `execute.ts` - POST /api/execute endpoint

**Services** (`backend/src/services/`):
- `executor.ts` - Code execution logic (child_process in Phase 1, Docker in Phase 2)
- `validator.ts` - Test case validation (Phase 3)

**Docker** (`backend/src/docker/`):
- `Dockerfile.python` - Python 3.11 Alpine sandbox (Phase 2)
- `Dockerfile.node` - Node 20 Alpine sandbox (Phase 2)

**Configuration** (`backend/`):
- `package.json` - Backend dependencies
- `tsconfig.json` - TypeScript configuration
- `.env` - Environment variables (PORT, LOG_LEVEL, etc.)

---

## Development Checklist

### Phase 1.1: Express.js Backend Setup

**Tasks**:
- [ ] Create `backend/` directory
- [ ] Initialize npm project (`npm init -y`)
- [ ] Install dependencies (express, zod, pino, pino-pretty, ts-node-dev, @types/node, @types/express)
- [ ] Create `backend/tsconfig.json`
- [ ] Create `backend/src/server.ts` (Express app, CORS, middleware)
- [ ] Create `backend/src/types/index.ts` (copy from frontend)
- [ ] Create `backend/src/routes/execute.ts` (POST /api/execute)
- [ ] Create `backend/src/services/executor.ts` (child_process execution)
- [ ] Create `backend/.env` (PORT=3000, LOG_LEVEL=info)
- [ ] Update `backend/package.json` scripts (dev, build, start)
- [ ] Test backend: `cd backend && npm run dev`
- [ ] Test health check: `curl http://localhost:3000/health`
- [ ] Update README.md (Phase 1.1 complete)
- [ ] Update CLAUDE.md (document patterns)

### Phase 1.2: Basic Code Execution (child_process)

**Tasks**:
- [ ] Implement Python execution in `executor.ts`
- [ ] Implement JavaScript/Node.js execution in `executor.ts`
- [ ] Add 5-second timeout handling
- [ ] Capture stdout, stderr, exit code
- [ ] Map results to TestResult interface
- [ ] Add error handling (syntax errors, runtime errors)
- [ ] Test with sample Python code
- [ ] Test with sample JavaScript code
- [ ] Test timeout handling (infinite loop)
- [ ] Update README.md (Phase 1.2 complete)

### Phase 1.3: Frontend Integration

**Tasks**:
- [ ] Install axios in frontend (`npm install axios`)
- [ ] Create `src/api/client.ts`
- [ ] Create `.env.local` with `VITE_API_URL=http://localhost:3000`
- [ ] Update `App.tsx` handleRunCode to call API
- [ ] Add error handling (network failures, timeouts)
- [ ] Update loading states
- [ ] Test end-to-end (frontend → backend → result display)
- [ ] Test error scenarios (network offline, backend down)
- [ ] Update README.md (Phase 1 complete!)
- [ ] Update CLAUDE.md (document API integration)

---

## Common Development Tasks

### Adding a New Dependency

**Frontend**:
```bash
cd "C:\Users\Matt Willer\Ongoing Projects\Hacklearn - v2\IDE_UIUX_Recreation\prototype"
npm install <package-name>
npm install -D <dev-package-name>  # For dev dependencies
```

**Backend**:
```bash
cd backend
npm install <package-name>
```

**After installing**: Update README.md "Technology Stack" or "Dependencies" section.

### Creating a New API Endpoint

1. **Define types** in `backend/src/types/index.ts`
2. **Create route** in `backend/src/routes/<name>.ts`
3. **Add validation** with Zod schema
4. **Implement logic** in `backend/src/services/<name>.ts`
5. **Register route** in `backend/src/server.ts`
6. **Test with curl** or Postman
7. **Create frontend client function** in `src/api/client.ts`
8. **Update CLAUDE.md** with API contract

### Testing Code Execution

**Manual Testing**:
```bash
# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start backend
cd backend
npm run dev

# Browser: http://localhost:7777
# Click Run button or press Ctrl+Enter
# Check console output for results
```

**curl Testing** (backend only):
```bash
curl -X POST http://localhost:3000/api/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "print(\"Hello, World!\")",
    "language": "python",
    "problemId": 1
  }'
```

---

## Known Gotchas & Pitfalls

### 1. TypeScript Interface Sync

**Problem**: Frontend and backend have separate `types/index.ts` files that must match exactly.

**Solution**:
- Always update both files when changing interfaces
- Consider using a shared package (monorepo) in future
- Document interface changes in CLAUDE.md

### 2. CORS Configuration

**Problem**: Frontend on `:7777` cannot call backend on `:3000` without CORS headers.

**Solution** (backend server.ts):
```typescript
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:7777',
  credentials: true,
}));
```

### 3. Monaco Editor Bundle Size

**Problem**: Monaco Editor is ~3MB uncompressed, can slow down dev server.

**Solution**: Vite automatically code-splits Monaco. No action needed, but be aware of initial load time.

### 4. Windows Path Issues

**Problem**: Windows uses backslashes (`\`), Node.js expects forward slashes (`/`).

**Solution**: Use `path.join()` or `path.resolve()` from Node.js `path` module.

```typescript
import path from 'path';

const filePath = path.join(__dirname, 'data', 'file.txt'); // Works on Windows & Unix
```

### 5. Environment Variables

**Problem**: Frontend and backend use different .env formats.

**Frontend** (`.env.local`):
- Must prefix with `VITE_`: `VITE_API_URL=http://localhost:3000`
- Accessed via `import.meta.env.VITE_API_URL`

**Backend** (`.env`):
- No prefix: `PORT=3000`
- Accessed via `process.env.PORT`
- Requires `dotenv` package: `import 'dotenv/config';`

### 6. child_process Security

**Problem**: Phase 1 executes user code directly on host machine (dangerous).

**Solution**:
- Phase 1 is **localhost-only**
- Add code validation (block dangerous imports)
- Add timeout handling (kill runaway processes)
- Migrate to Docker in Phase 2 before any deployment

---

## Migration Path to Cloud

### Current: Localhost Development

- Frontend: Vite dev server (port 7777)
- Backend: Express dev server (port 3000)
- Execution: child_process → Docker containers (Phase 2)

### Future: Cloud Deployment (Post-Phase 5)

**Option 1: AWS**
- Frontend: S3 + CloudFront (static hosting)
- Backend: ECS Fargate (containerized Express)
- Execution: ECS tasks (Docker containers)
- Database: RDS PostgreSQL (submissions, users)

**Option 2: Google Cloud**
- Frontend: Firebase Hosting or Cloud Storage + CDN
- Backend: Cloud Run (containerized Express)
- Execution: Cloud Run jobs (Docker containers)
- Database: Cloud SQL PostgreSQL

**Option 3: Hybrid**
- Frontend: Vercel (static hosting with serverless functions)
- Backend: Railway or Render (managed containers)
- Execution: Docker on backend service

**Key Migration Requirements**:
- Environment variable management (secrets)
- Container registry (Docker Hub, ECR, GCR)
- HTTPS/SSL certificates
- Domain configuration
- Monitoring & logging (CloudWatch, Cloud Logging, Datadog)

---

## Context Optimization Guidelines

### What to Include in Session Context

**Always Read**:
1. README.md - Current status, last session's work
2. CLAUDE.md - Patterns, protocols, architecture decisions
3. Relevant source files for current task

**Conditionally Read**:
- `src/types/index.ts` - When working with interfaces
- `src/App.tsx` - When modifying state or execution logic
- `package.json` - When checking dependencies

### What NOT to Read Unnecessarily

- All component files (only read what you're modifying)
- Full sampleProblem.ts (reference only if needed)
- node_modules or dist/ (never read)

### Efficient Context Usage

**Instead of reading multiple files**, use Grep/Glob:
```bash
# Find all imports of TestResult interface
grep -r "TestResult" src/

# Find all API calls
grep -r "executeCode" src/
```

**For planning**, use Task tool with Plan agent:
- Explores codebase systematically
- Returns summary instead of full file contents
- More efficient for large codebases

---

## Success Criteria

### Phase 1 Complete When:

- [ ] Backend runs on `http://localhost:3000`
- [ ] GET `/health` returns `{ status: 'ok' }`
- [ ] POST `/api/execute` accepts code, language, problemId
- [ ] Python code executes and returns output
- [ ] JavaScript code executes and returns output
- [ ] Timeout handling works (kills process after 5s)
- [ ] Frontend calls backend API successfully
- [ ] Test results display real execution output
- [ ] Error handling works (network, syntax, runtime errors)
- [ ] README.md updated (Phase 1 marked complete)
- [ ] CLAUDE.md updated (patterns documented)

### Phase 2 Complete When:

- [ ] Docker images built (Python, Node.js)
- [ ] Dockerode integrated in executor service
- [ ] Container resource limits enforced (256MB RAM, 1 CPU, 10s timeout)
- [ ] Containers auto-cleanup after execution
- [ ] Security validated (no host access, air-gapped)
- [ ] Performance acceptable (<5s total execution time)

---

## Emergency Procedures

### Backend Won't Start

```bash
# Check port 3000 is free
netstat -ano | findstr :3000

# Kill process if occupied
taskkill /PID <PID> /F

# Clear node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

# Check for syntax errors
npm run build
```

### Frontend Can't Connect to Backend

1. Verify backend is running: `curl http://localhost:3000/health`
2. Check CORS configuration in `backend/src/server.ts`
3. Check `.env.local` has correct `VITE_API_URL`
4. Restart Vite dev server (CORS headers cached)
5. Check browser console for CORS errors

### Docker Issues (Phase 2+)

```bash
# Check Docker Desktop running
docker ps

# Check images exist
docker images | grep hacklearn

# Rebuild images
cd backend/src/docker
docker build -f Dockerfile.python -t hacklearn-python:latest .

# Test image
docker run --rm -it hacklearn-python:latest python3 -c "print('test')"

# Clean up dangling containers
docker container prune -f
```

---

## Version History

### v0.1.0-alpha (Current)

- Frontend: 100% complete (LeetCode UI clone)
- Backend: Phase 1.1 in progress (Express.js setup)
- Execution: Mocked results (transitioning to real execution)

**Next**: Phase 1.1 completion (Express.js backend with /api/execute)

---

## Last Updated

**Date**: 2025-11-04
**Session**: Session 1
**Phase**: Phase 1 Complete ✅ (Backend + Frontend Integration)
**Updated By**: Claude Code (Sonnet 4.5)

**What Was Accomplished**:

**Phase 1.1 - Backend:**
- Backend server running on http://localhost:3000
- Health check endpoint working
- Execute endpoint accepting Python/JavaScript code
- Real code execution via child_process
- Timeout handling, output limits, error handling
- Structured logging with Pino
- Zod request validation

**Phase 1.3 - Frontend Integration:**
- Axios API client (src/api/client.ts)
- Real backend API calls in App.tsx
- Comprehensive error handling
- End-to-end execution working!
- Frontend: http://localhost:7777
- Backend: http://localhost:3000

**Next Session**: Phase 2 - Docker sandboxing for production-grade security

---

**Remember**: Update this file at the END of every session with new patterns, file locations, and architectural decisions. This ensures optimal context for future sessions.
