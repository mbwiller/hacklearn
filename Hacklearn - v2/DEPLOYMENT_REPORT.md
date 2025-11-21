# HackLearn Backend Deployment Report
**Date:** November 12, 2025
**Timeline:** 1-2 Days (12-15 hour work days)
**Execution Strategy:** Parallel Claude Code sessions

---

## Executive Summary

### Current State
- **Architecture:** React 18 + Vite 7 (Frontend) | Express + TypeScript (Backend)
- **Authentication:** ❌ None - All data in localStorage
- **Database:** ❌ None - Client-side only
- **Multi-User Support:** ❌ Single-user localhost app
- **Deployment Ready:** ⚠️ Partial - Docker config incomplete

### Target State (48 Hours)
- ✅ User authentication with email/password + OAuth
- ✅ PostgreSQL database with user accounts & progress tracking
- ✅ Multi-tenant backend with data isolation
- ✅ Production deployment on free/cheap infrastructure
- ✅ Secure code execution environment
- ✅ Cost: **$0-25/month** for 100-500 users

---

## 🏆 Recommended Architecture

### **Stack: Supabase + Vercel + Pyodide**

```
┌─────────────────────────────────────────────────────┐
│                 FRONTEND (Vercel)                    │
│  React 18 + Vite 7 + TypeScript                     │
│  - Auth UI (Supabase Auth hooks)                    │
│  - Module pages (existing)                          │
│  - Pyodide (browser-based Python execution)         │
└────────────────────┬────────────────────────────────┘
                     │
                     │ HTTPS
                     │
┌────────────────────┴────────────────────────────────┐
│              BACKEND (Supabase)                      │
│  - Auth: Email/Password, Google OAuth, Magic Links  │
│  - Database: PostgreSQL with Row-Level Security     │
│  - APIs: Auto-generated REST/GraphQL                │
│  - Edge Functions: Custom API logic (optional)      │
└────────────────────┬────────────────────────────────┘
                     │
                     │
┌────────────────────┴────────────────────────────────┐
│          EXTERNAL SERVICES                           │
│  - OpenAI API (shared pool or user keys)            │
│  - Pyodide (runs Python in browser, no server cost) │
└─────────────────────────────────────────────────────┘
```

### Why This Stack Wins

**Speed (1-2 Days):**
- Supabase: Auth + Database + APIs in 2-3 hours (zero backend code)
- Vercel: Deploy React in 15 minutes (git push to deploy)
- Pyodide: Browser-based Python (no sandboxing complexity)

**Cost ($0-25/mo):**
- Supabase Free: 10k MAUs, 500MB DB, 1GB storage
- Vercel Free: Unlimited bandwidth, 100 deployments/day
- Pyodide: $0 (runs in user's browser)

**Scale:**
- Handles 500 users easily on free tier
- Upgrade to Supabase Pro ($25/mo) scales to 100k+ MAUs
- Standard PostgreSQL (easy to migrate later)

**Developer Experience:**
- TypeScript SDK with auto-completion
- Real-time subscriptions (live progress updates)
- Row-level security (database enforces access control)
- Excellent documentation

---

## 💰 Cost Breakdown

### Hosting Costs (Monthly)

| Service | Free Tier | Estimated (100-500 users) | Notes |
|---------|-----------|---------------------------|-------|
| **Vercel** (Frontend) | Unlimited bandwidth | **$0** | 100 deployments/day included |
| **Supabase** (Auth + DB) | 10k MAUs, 500MB DB | **$0-25** | Free tier sufficient for MVP |
| **OpenAI API** (Shared Pool) | N/A | **$20-50** | ~50k requests/mo with GPT-4o-mini |
| **Pyodide** (Code Execution) | N/A | **$0** | Runs in browser |
| **Domain** (Optional) | N/A | **$12/year** | hacklearn.dev on Namecheap |
| **Total Monthly** | | **$20-75** | **$0-25 if users bring own API keys** |

### Database Storage Projection (1 Year, 1000 Users)

| Table | Rows | Size per Row | Total Size |
|-------|------|--------------|------------|
| users | 1,000 | 1 KB | 1 MB |
| module_progress | 25,000 | 0.5 KB | 12.5 MB |
| user_stats | 1,000 | 0.5 KB | 0.5 MB |
| activity_log | 500,000 | 0.3 KB | 150 MB |
| code_submissions | 50,000 | 2 KB | 100 MB |
| playground_sessions | 20,000 | 1 KB | 20 MB |
| **Total Storage** | | | **~300 MB** |

**Supabase Free Tier:** 500MB (sufficient for 1500+ users)

### Scaling Costs

| Users | Monthly Cost | Notes |
|-------|--------------|-------|
| 0-500 | **$0-25** | Free tiers + OpenAI usage |
| 500-5k | **$50-150** | Supabase Pro + increased API usage |
| 5k-50k | **$200-500** | Dedicated Postgres + CDN + API costs |
| 50k+ | **$500-2k** | Enterprise tier, optimize API costs |

---

## 📋 1-2 Day Implementation Plan

### Day 1: Core Infrastructure (12-15 hours)

#### **Morning Session (4-5 hours) - Parallel Tasks**

**Claude Session 1: Supabase Setup & Auth**
```
☐ Task 1A: Create Supabase Project (30 min)
  - Sign up at supabase.com
  - Create new project: "hacklearn-prod"
  - Save credentials (URL, anon key, service key)
  - Configure auth providers (Email, Google OAuth)

☐ Task 1B: Database Schema (1.5 hours)
  - Design SQL schema (4 core tables: users, module_progress, user_stats, activity_log)
  - Enable Row-Level Security (RLS) policies
  - Create indexes for performance
  - Run migrations via Supabase dashboard

☐ Task 1C: Frontend Auth Integration (2 hours)
  - Install @supabase/supabase-js, @supabase/auth-helpers-react
  - Create SupabaseProvider wrapper in App.tsx
  - Build Login/Register pages (use AccountPage as template)
  - Add useAuth() hook for protected routes
  - Test signup/login/logout flow
```

**Claude Session 2: Vercel Deployment**
```
☐ Task 2A: Deploy Frontend to Vercel (30 min)
  - Connect GitHub repo to Vercel
  - Configure build settings:
    - Build Command: npm run build
    - Output Directory: dist
  - Add environment variables:
    - VITE_SUPABASE_URL
    - VITE_SUPABASE_ANON_KEY
  - Test production build

☐ Task 2B: Domain Setup (30 min - Optional)
  - Register domain (hacklearn.dev)
  - Configure DNS in Vercel
  - Enable HTTPS (auto with Vercel)

☐ Task 2C: Backend API Migration (1.5 hours)
  - Keep existing Express server for OpenAI proxy
  - Deploy backend to Render/Railway
  - Update CORS to allow Vercel domain
  - Test /api/llm/chat endpoint from production
```

**Claude Session 3: Code Execution with Pyodide**
```
☐ Task 3A: Install Pyodide (1 hour)
  - npm install pyodide react-py
  - Create <PythonRunner> component wrapper
  - Test basic Python execution in browser

☐ Task 3B: Integrate with Module 1 IDE (2 hours)
  - Replace /api/execute endpoint with Pyodide
  - Modify IDEPage.tsx to use PythonRunner
  - Test Prompt Injection module lab
  - Handle edge cases (infinite loops, errors)

☐ Task 3C: Jupyter Notebook Integration (1 hour)
  - Research JupyterLite (browser-based Jupyter)
  - Create proof-of-concept for Module 1
  - Document migration path for other 19 modules
```

#### **Afternoon Session (4-5 hours) - Sequential Tasks**

**All Sessions: Data Migration & Integration**
```
☐ Task 4: Progress Tracking Backend (2 hours)
  - Create API endpoints in Supabase Edge Functions OR existing Express:
    - GET /api/progress (fetch all user progress)
    - POST /api/progress/:moduleId (mark complete)
    - GET /api/stats (user stats: points, level, streak)

  - Update useProgress.ts hook:
    - Fetch from Supabase on mount (if authenticated)
    - Sync localStorage to backend on login
    - Use Supabase real-time for live updates

☐ Task 5: Frontend Protected Routes (1.5 hours)
  - Create ProtectedRoute wrapper component
  - Redirect unauthenticated users to /login
  - Update AppLayout to show user info in Header
  - Add logout button

☐ Task 6: Migration Script (1 hour)
  - Create migrateLocalData() utility
  - Prompt users on first login to import localStorage data
  - Clear localStorage after successful migration
  - Test with mock data
```

#### **Evening Session (3-4 hours) - Testing & Polish**

```
☐ Task 7: End-to-End Testing (2 hours)
  - Test user registration flow
  - Test module progress tracking
  - Test code execution in IDE
  - Test CoT playground (OpenAI API)
  - Test logout and re-login (persistence)
  - Test on mobile browser

☐ Task 8: Error Handling & Edge Cases (1 hour)
  - Add error boundaries around auth components
  - Handle network failures (offline mode)
  - Add loading states for all async operations
  - Test with throttled network

☐ Task 9: Documentation (1 hour)
  - Update README.md with deployment instructions
  - Document environment variables
  - Create troubleshooting guide
  - Add screenshots for Substrate interview
```

---

### Day 2: Polish & Advanced Features (10-12 hours)

#### **Morning Session (4-5 hours)**

```
☐ Task 10: User Profile & Stats (2 hours)
  - Fetch real data from Supabase in AccountPage
  - Display module completion percentage
  - Show activity heatmap with real data
  - Add "Edit Profile" functionality

☐ Task 11: API Key Management (2 hours)
  - Option 1 (MVP): Use shared OpenAI API key pool
    - Store key in Supabase secrets
    - Track usage per user
    - Implement monthly quotas (free tier: 50 requests/mo)

  - Option 2 (Pro Feature): User-provided keys
    - Create encrypted_api_keys table
    - Build API key input UI
    - Encrypt keys using AES-256 before storage

☐ Task 12: Rate Limiting & Quotas (1 hour)
  - Add rate limiting middleware (100 req/hour per user)
  - Track OpenAI token usage per user
  - Display usage stats in AccountPage
  - Show warning when approaching quota
```

#### **Afternoon Session (3-4 hours)**

```
☐ Task 13: Advanced Module Features (2 hours)
  - Save code submissions to database
  - Add "View Past Submissions" in IDE
  - Save playground sessions (CoT comparisons)
  - Add "Export Conversation" button

☐ Task 14: Analytics & Monitoring (1.5 hours)
  - Add Supabase Analytics (built-in, free)
  - Track key events:
    - User registrations
    - Module completions
    - Code executions
    - Playground usage
  - Set up error logging (Sentry free tier - optional)
```

#### **Evening Session (3-4 hours)**

```
☐ Task 15: Performance Optimization (2 hours)
  - Code splitting for large modules
  - Lazy load Monaco Editor
  - Optimize images (use WebP)
  - Add React.memo to expensive components
  - Run Lighthouse audit (target: 90+ score)

☐ Task 16: Security Hardening (1.5 hours)
  - Enable Supabase RLS on all tables
  - Add CSRF protection
  - Sanitize user inputs
  - Review CORS configuration
  - Test with OWASP ZAP (free security scanner)

☐ Task 17: Production Readiness (1 hour)
  - Set up custom error pages (404, 500)
  - Add status page (status.hacklearn.dev - optional)
  - Configure CDN caching
  - Test with real users (friends/colleagues)
  - Prepare demo script for portfolio
```

---

## 🔧 Technical Implementation Details

### 1. Supabase Database Schema

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (handled by Supabase Auth)
-- auth.users table exists automatically

-- Extended user profile
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Module progress
CREATE TABLE public.module_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id INTEGER NOT NULL,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  completed_at TIMESTAMPTZ,
  first_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  time_spent_seconds INTEGER DEFAULT 0,
  UNIQUE(user_id, module_id)
);

-- User stats (denormalized for performance)
CREATE TABLE public.user_stats (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_points INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  modules_completed INTEGER DEFAULT 0,
  total_time_spent_seconds INTEGER DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity log
CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  module_id INTEGER,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Code submissions
CREATE TABLE public.code_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id INTEGER NOT NULL,
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  status TEXT NOT NULL,
  tests_passed INTEGER DEFAULT 0,
  tests_total INTEGER DEFAULT 0,
  output TEXT,
  error TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  execution_time_ms INTEGER
);

-- Playground sessions (CoT comparisons)
CREATE TABLE public.playground_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id INTEGER NOT NULL,
  model TEXT NOT NULL,
  temperature DECIMAL(3,2),
  max_tokens INTEGER,
  user_prompt TEXT NOT NULL,
  standard_response TEXT,
  cot_response TEXT,
  standard_tokens INTEGER,
  cot_tokens INTEGER,
  standard_cost_usd DECIMAL(10,6),
  cot_cost_usd DECIMAL(10,6),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_module_progress_user ON module_progress(user_id);
CREATE INDEX idx_activity_log_user_date ON activity_log(user_id, created_at DESC);
CREATE INDEX idx_code_submissions_user ON code_submissions(user_id, submitted_at DESC);

-- Row-Level Security (RLS) Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE playground_sessions ENABLE ROW LEVEL SECURITY;

-- Users can only read/write their own data
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own progress" ON module_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON module_progress FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own stats" ON user_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own stats" ON user_stats FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own activity" ON activity_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own activity" ON activity_log FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own submissions" ON code_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own submissions" ON code_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own sessions" ON playground_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sessions" ON playground_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger to update user_stats on module completion
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    UPDATE user_stats
    SET
      modules_completed = modules_completed + 1,
      total_points = total_points + 100,
      current_level = FLOOR((total_points + 100) / 500) + 1,
      updated_at = NOW()
    WHERE user_id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_module_completion
AFTER INSERT OR UPDATE ON module_progress
FOR EACH ROW EXECUTE FUNCTION update_user_stats();
```

### 2. Frontend Auth Integration

**File: `/src/lib/supabase.ts`**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          display_name: string;
          avatar_url: string | null;
          bio: string | null;
          tier: 'free' | 'pro' | 'enterprise';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['user_profiles']['Insert']>;
      };
      module_progress: {
        Row: {
          id: string;
          user_id: string;
          module_id: number;
          status: 'not_started' | 'in_progress' | 'completed';
          completed_at: string | null;
          first_accessed_at: string;
          last_accessed_at: string;
          time_spent_seconds: number;
        };
        Insert: Omit<Database['public']['Tables']['module_progress']['Row'], 'id' | 'first_accessed_at' | 'last_accessed_at'>;
        Update: Partial<Database['public']['Tables']['module_progress']['Insert']>;
      };
      // ... other tables
    };
  };
};
```

**File: `/src/contexts/AuthContext.tsx`**
```typescript
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName }
      }
    });

    if (error) throw error;

    // Create user profile and stats
    if (data.user) {
      await supabase.from('user_profiles').insert({
        id: data.user.id,
        display_name: displayName
      });

      await supabase.from('user_stats').insert({
        user_id: data.user.id
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

**File: `/src/pages/LoginPage.tsx`**
```typescript
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/app/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">Welcome Back</h1>
        <p className="text-slate-400 mb-6">Sign in to continue your learning journey</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-slate-400 text-center mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-cyan-400 hover:text-cyan-300">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}
```

### 3. Progress Tracking with Supabase

**File: `/src/hooks/useProgress.ts` (Updated)**
```typescript
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface ModuleProgress {
  moduleId: number;
  status: 'not_started' | 'in_progress' | 'completed';
  completedAt?: string;
}

export function useProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [stats, setStats] = useState({
    points: 0,
    level: 1,
    streak: 0,
    modulesCompleted: 0
  });
  const [loading, setLoading] = useState(true);

  // Fetch progress from Supabase
  useEffect(() => {
    if (!user) {
      // Fallback to localStorage for unauthenticated users
      const localProgress = JSON.parse(localStorage.getItem('hacklearn_progress') || '{}');
      setProgress(localProgress);
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      // Fetch module progress
      const { data: progressData } = await supabase
        .from('module_progress')
        .select('module_id, status')
        .eq('user_id', user.id);

      if (progressData) {
        const progressMap = progressData.reduce((acc, item) => {
          acc[item.module_id] = item.status === 'completed';
          return acc;
        }, {} as Record<number, boolean>);
        setProgress(progressMap);
      }

      // Fetch user stats
      const { data: statsData } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (statsData) {
        setStats({
          points: statsData.total_points,
          level: statsData.current_level,
          streak: statsData.current_streak,
          modulesCompleted: statsData.modules_completed
        });
      }

      setLoading(false);
    };

    fetchProgress();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('progress_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'module_progress',
        filter: `user_id=eq.${user.id}`
      }, () => {
        fetchProgress();
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user]);

  const markComplete = useCallback(async (moduleId: number) => {
    if (!user) {
      // Update localStorage for unauthenticated users
      const newProgress = { ...progress, [moduleId]: true };
      setProgress(newProgress);
      localStorage.setItem('hacklearn_progress', JSON.stringify(newProgress));
      return;
    }

    // Update Supabase
    await supabase
      .from('module_progress')
      .upsert({
        user_id: user.id,
        module_id: moduleId,
        status: 'completed',
        completed_at: new Date().toISOString()
      });

    // Log activity
    await supabase.from('activity_log').insert({
      user_id: user.id,
      activity_type: 'module_complete',
      module_id: moduleId
    });

    setProgress(prev => ({ ...prev, [moduleId]: true }));
  }, [user, progress]);

  return {
    progress,
    stats,
    loading,
    markComplete
  };
}
```

### 4. Pyodide Integration for Code Execution

**File: `/src/components/code/PythonRunner.tsx`**
```typescript
import { useEffect, useState, useRef } from 'react';
import { loadPyodide, PyodideInterface } from 'pyodide';

interface PythonRunnerProps {
  code: string;
  onOutput: (output: string) => void;
  onError: (error: string) => void;
  onComplete: () => void;
}

export function PythonRunner({ code, onOutput, onError, onComplete }: PythonRunnerProps) {
  const pyodideRef = useRef<PyodideInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const initPyodide = async () => {
      try {
        const pyodide = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
        });

        if (!cancelled) {
          pyodideRef.current = pyodide;
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load Pyodide:', err);
        onError('Failed to initialize Python environment');
      }
    };

    initPyodide();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!code || !pyodideRef.current || loading) return;

    const runCode = async () => {
      const pyodide = pyodideRef.current!;

      try {
        // Redirect stdout
        let output = '';
        pyodide.setStdout({
          batched: (text: string) => {
            output += text;
            onOutput(output);
          }
        });

        // Run code with timeout
        const result = await Promise.race([
          pyodide.runPythonAsync(code),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Execution timed out (10s)')), 10000)
          )
        ]);

        if (result !== undefined) {
          output += `\n${result}`;
          onOutput(output);
        }

        onComplete();
      } catch (err: any) {
        onError(err.message || 'Execution error');
      }
    };

    runCode();
  }, [code, loading]);

  if (loading) {
    return <div className="text-cyan-400">Loading Python environment...</div>;
  }

  return null;
}

// Usage in IDEPage.tsx
export function usePythonExecution() {
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [codeToRun, setCodeToRun] = useState('');

  const runCode = (code: string) => {
    setOutput('');
    setError('');
    setIsRunning(true);
    setCodeToRun(code);
  };

  return {
    output,
    error,
    isRunning,
    runCode,
    PythonRunnerComponent: isRunning ? (
      <PythonRunner
        code={codeToRun}
        onOutput={setOutput}
        onError={setError}
        onComplete={() => setIsRunning(false)}
      />
    ) : null
  };
}
```

### 5. Environment Variables

**File: `.env.example`**
```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# OpenAI (Optional - for shared pool)
VITE_OPENAI_API_KEY=sk-your-shared-key

# Environment
VITE_ENV=production
```

**File: `server/.env.example`**
```bash
# Server
PORT=3001
NODE_ENV=production

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key

# OpenAI (Shared Pool)
OPENAI_API_KEY=sk-your-openai-key

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# JWT (if using custom auth)
JWT_SECRET=your-256-bit-secret
```

---

## 🚀 Quick Start Commands

### Setup (One-time)
```bash
# 1. Install dependencies
npm install
cd server && npm install && cd ..

# 2. Create Supabase project
# - Visit https://supabase.com/dashboard
# - Click "New Project"
# - Copy URL and anon key

# 3. Configure environment
cp .env.example .env
# Edit .env with Supabase credentials

# 4. Deploy database schema
# - Go to Supabase Dashboard > SQL Editor
# - Paste schema from "Technical Implementation" section
# - Click "Run"

# 5. Deploy frontend to Vercel
npx vercel --prod
# Follow prompts, add environment variables

# 6. Deploy backend (optional - if keeping Express)
cd server
npx railway up
# Or deploy to Render via dashboard
```

### Development
```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend (if using Express for OpenAI proxy)
cd server && npm run dev
```

### Production Build Test
```bash
npm run build
npm run preview
```

---

## 📊 Success Metrics

### Day 1 Completion Checklist
- [ ] User can sign up with email/password
- [ ] User can log in and see dashboard
- [ ] User progress saves to database (test by completing Module 1)
- [ ] Code execution works in IDE (test Prompt Injection lab)
- [ ] CoT playground works with OpenAI API
- [ ] Frontend deployed to Vercel (live URL)
- [ ] No TypeScript errors (`npm run build` succeeds)

### Day 2 Completion Checklist
- [ ] User profile page shows real data from database
- [ ] Activity heatmap displays user activity
- [ ] API usage tracking works (quota enforcement)
- [ ] Past submissions viewable in IDE
- [ ] Lighthouse score > 90 (Performance, Accessibility)
- [ ] Tested on mobile device
- [ ] README updated with deployment guide
- [ ] Screenshots captured for portfolio

### Portfolio Demo Script
```
1. Show splash page → "Enter Platform" button
2. Sign up flow → show email verification
3. Dashboard → hover over modules, show difficulty badges
4. Module 1 → complete "Theory" tab reading
5. Lab tab → open IDE, write solution, run code
6. Show code execution results
7. Navigate to CoT module → interactive playground
8. Compare standard vs. CoT responses
9. Account page → show progress, achievements, heatmap
10. Logout and log back in → show persistence
```

---

## 🛠️ Troubleshooting

### Common Issues

**Supabase RLS Policies Too Restrictive**
```sql
-- Check current policies
SELECT * FROM pg_policies WHERE tablename = 'module_progress';

-- Temporarily disable for debugging (NOT production)
ALTER TABLE module_progress DISABLE ROW LEVEL SECURITY;

-- Re-enable after fixing
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;
```

**Pyodide Loading Slowly**
- Pyodide is ~6MB, first load takes 3-5 seconds
- Add loading indicator
- Consider preloading on dashboard mount
- Cache Pyodide in service worker (future optimization)

**CORS Errors in Production**
- Add Vercel domain to CORS whitelist in backend
- Check Supabase CORS settings in Dashboard > API > Settings
- Ensure `credentials: 'include'` in fetch requests

**Database Connection Timeout**
- Check Supabase project is active (auto-pauses after 1 week inactivity)
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
- Test connection: `supabase.from('user_profiles').select('count')`

---

## 📚 API Reference

### Supabase Client Methods

```typescript
// Auth
await supabase.auth.signUp({ email, password });
await supabase.auth.signInWithPassword({ email, password });
await supabase.auth.signOut();
await supabase.auth.getUser();

// Database - Select
const { data, error } = await supabase
  .from('module_progress')
  .select('*')
  .eq('user_id', userId);

// Database - Insert
const { data, error } = await supabase
  .from('activity_log')
  .insert({ user_id: userId, activity_type: 'module_start' });

// Database - Update
const { data, error } = await supabase
  .from('module_progress')
  .update({ status: 'completed' })
  .eq('id', progressId);

// Database - Upsert (insert or update)
const { data, error } = await supabase
  .from('module_progress')
  .upsert({ user_id: userId, module_id: 1, status: 'completed' });

// Real-time subscriptions
const channel = supabase
  .channel('progress_changes')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'module_progress'
  }, (payload) => {
    console.log('New progress:', payload.new);
  })
  .subscribe();
```

---

## 🎯 Next Steps After Deployment

### Phase 2 Features (Week 2-3)
- [ ] Google OAuth login (Supabase supports natively)
- [ ] Email verification flow
- [ ] Password reset functionality
- [ ] User avatar upload (Supabase Storage)
- [ ] Leaderboard (top users by points)
- [ ] Module recommendations based on progress
- [ ] Export progress as PDF

### Phase 3 Scaling (Month 2)
- [ ] Upgrade to Supabase Pro ($25/mo) if exceeding free tier
- [ ] Add Redis caching layer for frequently accessed data
- [ ] Implement CDN for static assets (Cloudflare)
- [ ] Add background jobs (pg_cron or external service)
- [ ] Set up monitoring (Supabase Dashboard + Sentry)
- [ ] A/B testing framework
- [ ] User feedback system

### Phase 4 Monetization (Month 3+)
- [ ] Stripe integration for Pro tier ($9.99/mo)
- [ ] Pro features: unlimited API usage, priority support
- [ ] Team accounts (for bootcamps, universities)
- [ ] Custom domains for team accounts
- [ ] Analytics dashboard for instructors

---

## 📞 Support Resources

- **Supabase Docs:** https://supabase.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Pyodide Docs:** https://pyodide.org/en/stable/
- **React Query (for caching):** https://tanstack.com/query/latest
- **Supabase Discord:** https://discord.supabase.com
- **HackLearn GitHub Issues:** [Your repo URL]

---

## ✅ Final Checklist

**Before Going Live:**
- [ ] All environment variables set in Vercel dashboard
- [ ] Database schema deployed to Supabase
- [ ] RLS policies enabled and tested
- [ ] CORS configured for production domain
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (Vercel auto-manages)
- [ ] Error tracking enabled (Sentry free tier)
- [ ] Backup strategy documented
- [ ] User data privacy policy added (required if collecting emails)
- [ ] Terms of service page (recommended)

**For Substrate Interview:**
- [ ] 3-minute demo video recorded
- [ ] Screenshots of key features (5-10 images)
- [ ] Architecture diagram (use Excalidraw)
- [ ] GitHub README updated with:
  - Live demo link
  - Tech stack
  - Features list
  - Setup instructions
- [ ] LinkedIn post announcing launch
- [ ] Share on Twitter/Reddit for feedback

---

**Estimated Total Time:** 20-28 hours (1.5-2 days)
**Estimated Total Cost:** $0-25/month
**Deployment Target:** Production-ready for 500 users

Good luck with your deployment! 🚀
