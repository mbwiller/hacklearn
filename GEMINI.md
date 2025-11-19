# HackLearn Platform - Gemini Context

## 1. Mission & Core Value

**Mission**: To be a premier educational platform teaching ethical hacking and AI/ML security through interactive, hands-on IDE labs.

**Value Proposition**: HackLearn differentiates itself by combining theoretical knowledge with practical, in-browser coding challenges, moving beyond static content to a dynamic learning experience. The platform targets a "portfolio/demo piece" quality with a user experience polished to the level of production applications like Langflow or n8n.

---

## 2. Current Architecture & Status (As of Nov 2025)

The project has successfully migrated from a traditional client-server model (React + Express) to a modern, scalable **Serverless Architecture**. The Express.js backend has been entirely deprecated and replaced.

### **Live Deployment:**
-   **Frontend URL**: [https://hacklearn-c0w9smldo-matts-projects-6b78eb05.vercel.app](https://hacklearn-c0w9smldo-matts-projects-6b78eb05.vercel.app)
-   **Hosting**: Vercel
-   **Status**: ✅ **Live and Operational**

### **Architectural Breakdown:**

```
┌───────────────────────────────────────────────────┐
│              FRONTEND (Vercel)                    │
│   React 18 + Vite 7 + TypeScript + Tailwind CSS   │
│   - Auth UI (Supabase Auth hooks)                 │
│   - Module Content & Interactive IDE              │
│   - In-Browser Code Execution (Pyodide)           │
└───────────────────────┬───────────────────────────┘
                        │ HTTPS API Calls
                        │
┌───────────────────────┴───────────────────────────┐
│              BACKEND SERVICES (Supabase)          │
│   - Auth: Supabase Auth (Email/Pass, OAuth)       │
│   - Database: Supabase DB (PostgreSQL + RLS)      │
│   - LLM Proxy: Supabase Edge Function (Deno)      │
└───────────────────────────────────────────────────┘
```

### **Component Status:**

-   **Frontend (100% Complete)**:
    -   React 18, Vite 7, TypeScript 5.9 (Strict Mode).
    -   All 20 core ethical hacking modules are complete with theory, examples, and tools.
    -   10 Prompt Engineering modules exist as placeholders.
-   **IDE Integration (100% Complete)**:
    -   All 20 core modules feature an interactive lab environment powered by **Monaco Editor**.
    -   Labs are accessible at the `/app/ide/{1-20}` routes.
-   **Code Execution (100% Migrated)**:
    -   The original `server/src/services/codeExecutor.ts` is **DEPRECATED**.
    -   Code execution is now handled in the browser via **Pyodide**, eliminating server-side execution costs and complexity. The implementation is in `src/lib/pyodide-executor.ts`.
-   **LLM Proxy (100% Migrated)**:
    -   The Express `POST /api/llm/chat` endpoint is **DEPRECATED**.
    -   LLM chat functionality is now a **Supabase Edge Function** (`supabase/functions/llm-chat`), providing an OpenAI proxy for streaming, token tracking, and cost calculation.
-   **Authentication & Database (100% Migrated)**:
    -   `localStorage` for auth and progress is **DEPRECATED** for authenticated users.
    -   **Supabase Auth** manages users (email/password, with OAuth ready).
    -   **Supabase PostgreSQL** with Row-Level Security (RLS) persists all user data (profiles, progress, submissions). See `supabase/migrations` for the full schema.

---

## 3. Tech Stack

-   **Frontend Framework**: React 18.3.1 + Vite 7 + TypeScript 5.9 (Strict)
-   **Styling**: Tailwind CSS 3.3.2 + Framer Motion
-   **Routing**: React Router v7
-   **State Management**: React Hooks (Context, `useState`, `useEffect`, etc.)
-   **IDE**: Monaco Editor 4.7.0
-   **In-Browser Python**: Pyodide 0.24.1
-   **Backend-as-a-Service (BaaS)**: Supabase
    -   **Database**: PostgreSQL
    -   **Authentication**: Supabase Auth
    -   **Serverless Functions**: Deno Runtime (Supabase Edge Functions)
-   **Hosting/Deployment**: Vercel

---

## 4. Key Project Structure

```
/
├── supabase/                 # Supabase configuration
│   ├── functions/            # Serverless Edge Functions (e.g., LLM proxy)
│   └── migrations/           # Database schema (SQL)
├── src/
│   ├── api/                  # Frontend API callers (e.g., to Supabase functions)
│   ├── components/
│   │   ├── ide/              # Core IDE components (CodeEditor, Panels)
│   │   └── ui/               # Reusable UI components (Button, Card)
│   ├── data/
│   │   └── lab-problems/     # Data and test cases for all 20 IDE labs
│   ├── lib/
│   │   ├── pyodide-executor.ts # ✅ NEW: In-browser code execution logic
│   │   └── supabase.ts       # Supabase client and type definitions
│   ├── pages/
│   │   ├── IDEPage.tsx       # The interactive lab environment
│   │   ├── SplashPage.tsx    # Landing page (next area of focus)
│   │   └── AccountPage.tsx   # User profile and progress dashboard
│   ├── hooks/
│   │   └── useLLMChat.ts     # Now points to the Supabase Edge Function
│   └── types/
│       └── database.types.ts # Auto-generated types from Supabase schema
└── server/                   # ⛔️ DEPRECATED: Old Express.js backend
```

---

## 5. Design System & Aesthetics

-   **Inspiration**: Langflow, n8n, Anthropic Claude UI. A professional, clean, and modern "lab" aesthetic.
-   **Color Palette**:
    -   **Base**: Dark mode (`bg-slate-950`, `bg-slate-900`).
    -   **Accents**: Cyan (`cyan-400`), Emerald (`emerald-500`), Purple (`purple-500`).
    -   **UI Style**: Glassmorphism (`backdrop-blur-xl bg-white/5`).
-   **Typography**: `Inter` font family. Clear typographic hierarchy.
-   **Animation**: `Framer Motion` for smooth, GPU-accelerated transitions.
-   **Key Principle**: Maintain a professional aesthetic. No emojis in user-facing UI.

---

## 6. Development Workflow

The previous dual-terminal workflow (`npm run dev` and `npm run dev:backend`) is now simplified.

### **Running the Project Locally:**

1.  **Set up Environment Variables**: Copy `.env.example` to `.env` and fill in your Supabase `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
2.  **Install Dependencies**: `npm install`.
3.  **Run Development Server**: `npm run dev`.

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy) and connect directly to your cloud Supabase instance for all backend services. **The `server` directory is no longer used.**

### **Important Commands:**

-   `npm run dev`: Starts the Vite development server.
-   `npm run build`: Compiles the TypeScript project and bundles for production. Checks for type errors.
-   `npm run lint`: Runs ESLint to check for code quality and style issues.
-   `npx supabase ...`: Use the Supabase CLI to manage database migrations and edge functions (e.g., `npx supabase functions deploy ...`).

---

## 7. Next Steps & Opportunities

Based on user priorities and project state:

1.  **Splash Page Redesign**: The current `SplashPage.tsx` is a v1 placeholder. The immediate goal is to transform it into a "unique, sleek, and awesome" entry point that is professional and inviting.
2.  **Content Expansion**: The 10 `Prompt Engineering` modules are placeholders and need content.
3.  **UI Harmonization**: While a design system exists, the `README.md` notes that several older modules need to be refactored to use the standardized components for a fully consistent UX.
4.  **Advanced Features**: Implement features from the original roadmap, such as leaderboards, user-provided API key management (encrypted in DB), and more detailed analytics.

---

## 8. Anti-Patterns (To Avoid)

-   **Security**:
    -   ❌ Never commit secrets (`.env` file).
    -   ❌ Never expose Supabase `service_role` key on the client.
    -   ❌ Trust client-side validation for anything sensitive. RLS is the source of truth for security.
-   **Code & Architecture**:
    -   ❌ Do not add any new logic to the `server/` directory. It is deprecated.
    -   ❌ Do not re-implement existing UI components from `src/components/ui/`.
    -   ❌ Avoid using the `any` type; leverage the auto-generated Supabase types.
    -   ❌ Avoid prop-drilling; use React Context or other state management where appropriate.
