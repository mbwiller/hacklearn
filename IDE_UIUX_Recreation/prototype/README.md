# HackLearn Pro - Interactive Code Execution Platform

A production-ready, LeetCode-style coding platform for security education with **real code execution capabilities**. Features a professional 3-panel IDE interface with Docker-sandboxed Python and JavaScript execution.

## Current Status

**Frontend**: 100% Complete (Pixel-perfect LeetCode UI)
**Backend**: In Development (Phase 1 - Express.js API setup)
**Code Execution**: Implementing (Docker sandbox for Python/Node.js)

### Development Timeline

- **Phase 1** (Week 1): Express.js backend + basic execution
- **Phase 2** (Week 2): Docker sandboxing & security
- **Phase 3** (Week 3): Test case validation system
- **Phase 4** (Week 4): Enhanced frontend integration
- **Phase 5** (Week 5): Polish & production readiness

---

## Quick Start

### Prerequisites

- **Node.js 18+** (required)
- **Docker Desktop** (required for code execution)
- **Git** (recommended)

### Running the Application

**Frontend (Vite Dev Server)**
```bash
cd "C:\Users\Matt Willer\Ongoing Projects\Hacklearn - v2\IDE_UIUX_Recreation\prototype"
npm run dev
# Opens at http://localhost:7777
```

**Backend (Express.js API)** - Coming in Phase 1.1
```bash
cd backend
npm run dev
# Opens at http://localhost:3000
```

**Current URLs:**
- Frontend: http://localhost:7777
- Backend API: http://localhost:3000 (not yet implemented)

---

## Architecture Overview

### Technology Stack

**Frontend**
- React 19.1.1 + TypeScript 5.9.3
- Vite 7.1.7 (dev server, HMR)
- Tailwind CSS 3.4.18 (LeetCode theme)
- Monaco Editor 0.54.0 (VS Code's editor engine)
- react-resizable-panels 3.0.6

**Backend** (In Development)
- Express.js + TypeScript
- Dockerode (Docker client for code execution)
- Zod (request validation)
- Pino (structured logging)

**Execution Engine**
- Docker containers (Python 3.11 Alpine, Node 20 Alpine)
- 256MB RAM limit, 1 CPU core
- 10-second timeout per execution
- Air-gapped (no network access)

### Project Structure

```
prototype/
├── src/                          # Frontend React application
│   ├── components/
│   │   ├── Navbar.tsx            # Top bar (Run/Submit buttons)
│   │   ├── ResizableLayout.tsx   # 3-panel layout container
│   │   ├── ProblemPanel.tsx      # Problem description + tabs
│   │   ├── EditorPanel.tsx       # Code editor + console split
│   │   ├── CodeEditor.tsx        # Monaco Editor wrapper
│   │   ├── ConsoleOutput.tsx     # Test results display
│   │   └── HintsPanel.tsx        # Progressive hints system
│   ├── api/
│   │   └── client.ts             # Axios client for backend API (Phase 1.3)
│   ├── data/
│   │   └── sampleProblem.ts      # SQL Injection challenge
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   ├── App.tsx                   # Main app + state management
│   └── main.tsx                  # React entry point
├── backend/                      # Backend API (Phase 1.1)
│   ├── src/
│   │   ├── server.ts             # Express app setup
│   │   ├── routes/
│   │   │   └── execute.ts        # POST /api/execute endpoint
│   │   ├── services/
│   │   │   ├── executor.ts       # Docker execution engine
│   │   │   └── validator.ts      # Test case validation
│   │   ├── docker/
│   │   │   ├── Dockerfile.python # Python 3.11 sandbox
│   │   │   └── Dockerfile.node   # Node 20 sandbox
│   │   └── types/
│   │       └── index.ts          # Shared types with frontend
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                      # Environment variables
├── package.json                  # Frontend dependencies
├── vite.config.ts                # Vite configuration (port 7777)
├── tailwind.config.js            # LeetCode color system
└── README.md                     # This file
```

---

## Features Implemented

### Frontend (100% Complete)

**UI Components**
- ✅ 3-panel resizable layout (Problem | Editor+Console | Hints)
- ✅ Drag handles with smooth animations
- ✅ Vertical split in editor panel (60/40 code/console)
- ✅ Responsive design (tablet/desktop)

**Code Editor (Monaco)**
- ✅ Syntax highlighting (Python, JavaScript, SQL)
- ✅ VS Code-style dark theme
- ✅ Auto-completion & bracket matching
- ✅ Line numbers & active line highlighting
- ✅ Ctrl/Cmd+Enter keyboard shortcut

**Problem Display**
- ✅ 4 tabs: Description, Editorial, Solutions, Submissions
- ✅ Color-coded difficulty badges (Easy/Medium/Hard)
- ✅ Topic tags (SQL, Security, Web Vulnerabilities)
- ✅ Formatted examples (Input/Output/Explanation)
- ✅ Constraints list

**Test Results Console**
- ✅ Status icons (✓ Accepted, ✗ Wrong Answer, ! Error)
- ✅ Performance metrics (runtime, memory)
- ✅ Test case counters (X/Y passed)
- ✅ Detailed error messages
- ✅ Loading states with spinner

**Hints Panel**
- ✅ Collapsible progressive hints (click to reveal)
- ✅ Premium upsell section
- ✅ Related topics tags

**Design System**
- ✅ Pixel-perfect LeetCode color palette
- ✅ Inter font (Google Fonts CDN)
- ✅ Custom scrollbars
- ✅ Smooth transitions (0.2s ease-out)

### Backend (Phase 1 Complete! 🎉)

**Phase 1.1: Express.js API** ✅
- ✅ Express server with TypeScript
- ✅ POST /api/execute endpoint
- ✅ Basic child_process execution (MVP - localhost only)
- ✅ CORS configuration for localhost:7777
- ✅ Request validation with Zod
- ✅ Pino structured logging
- ✅ Python code execution working
- ✅ JavaScript code execution working

**Phase 1.3: Frontend Integration** ✅
- ✅ Axios API client created
- ✅ Real backend API calls (no more mocked execution!)
- ✅ Error handling for network failures
- ✅ Loading states preserved
- ✅ End-to-end execution working

**Next: Phase 2 - Docker Sandboxing** (Week 2)
- ⏳ Docker containers for Python/Node.js
- ⏳ Resource limits (256MB RAM, 1 CPU, 10s timeout)
- ⏳ Enhanced security (air-gapped execution)

---

## Development Workflow

### Session Protocols (CRITICAL)

**After EVERY development session:**

1. **Update README.md**
   - Project status (phase completion %)
   - New features added (move ⏳ to ✅)
   - Architecture changes
   - Dependencies added
   - Known issues

2. **Update CLAUDE.md**
   - New patterns established
   - Component locations
   - API contracts
   - Critical implementation details
   - Context for next session

3. **Git Commit**
   ```bash
   git add .
   git commit -m "[Phase X.Y] Brief description

   - Detailed change 1
   - Detailed change 2

   Status: X/Y complete

   Generated with Claude Code
   Co-Authored-By: Claude <noreply@anthropic.com>"
   git push origin main
   ```

4. **Test Checklist**
   - [ ] Frontend builds (`npm run build`)
   - [ ] ESLint passes (`npm run lint`)
   - [ ] Backend builds (`cd backend && npm run build`)
   - [ ] Manual testing (run code, check results)

### Development Commands

**Frontend**
```bash
npm run dev          # Start Vite dev server (port 7777)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint check
```

**Backend** (Phase 1.1+)
```bash
cd backend
npm run dev          # Start Express with ts-node-dev (port 3000)
npm run build        # Compile TypeScript
npm start            # Run production build
npm run lint         # ESLint check
```

---

## API Documentation

### POST /api/execute (Phase 1.1)

**Endpoint**: `http://localhost:3000/api/execute`

**Request Body**:
```typescript
{
  code: string;           // User's code submission
  language: 'python' | 'javascript' | 'sql';
  problemId: number;      // For retrieving test cases
}
```

**Response** (200 OK):
```typescript
{
  status: 'accepted' | 'wrong_answer' | 'runtime_error' | 'time_limit_exceeded';
  runtime?: string;       // e.g., "42ms"
  memory?: string;        // e.g., "14.2 MB"
  testsPassed: number;    // Number of passed test cases
  testsTotal: number;     // Total test cases
  output: string;         // Stdout/stderr
  error?: string;         // Error message (if failed)
}
```

---

## Session Update Log

### Session 1 (2025-11-04)
- ✅ Created comprehensive README.md with development protocols
- ✅ Created CLAUDE.md with AI assistant guidance
- ✅ **Completed Phase 1.1** - Express.js backend setup
  - Created backend directory structure
  - Installed dependencies (Express, Zod, Pino, TypeScript)
  - Created TypeScript configuration
  - Created shared types (ExecuteRequest, ExecuteResponse, TestResult)
  - Implemented Express server with CORS and middleware
  - Implemented POST /api/execute endpoint with Zod validation
  - Implemented CodeExecutor service with child_process
  - Created .env configuration
  - **Successfully tested**: Python code execution working!
  - Health check: http://localhost:3000/health ✅
  - Execute API: http://localhost:3000/api/execute ✅
- ✅ **Completed Phase 1.3** - Frontend integration
  - Installed Axios for HTTP requests
  - Created src/api/client.ts (executeCode, checkHealth functions)
  - Created .env.local for frontend configuration
  - Updated App.tsx handleRunCode to call real backend API
  - Added comprehensive error handling (network failures, timeouts)
  - **Result**: Real code execution working end-to-end! 🚀
  - Frontend: http://localhost:7777 ✅
  - Backend: http://localhost:3000 ✅
  - **Deliverable achieved**: Working code execution for Python/JavaScript on localhost

---

**Last Updated**: 2025-11-04
**Version**: 0.1.0-alpha (Phase 1 in progress)
**License**: Proprietary (HackLearn Pro)
