# DEPRECATED: Express Backend

**Status**: Archived as of November 2025

## Migration Notice

This Express backend has been **fully migrated** to Supabase Edge Functions and is no longer used in production.

### What Was Migrated

- **LLM Chat Proxy** (`/api/llm/chat`) → Supabase Edge Function `llm-chat`
- **Code Execution** → Browser-based Pyodide (client-side)
- **Health Check** → Not needed (serverless architecture)

### Current Architecture

The frontend now uses:
- **Supabase Edge Functions** for LLM API calls
- **Pyodide** for browser-based Python/JavaScript code execution
- **Zero backend maintenance** required

### Why This Directory Exists

This directory is preserved for:
1. Historical reference
2. Understanding the original architecture
3. Potential rollback if needed (unlikely)

### Frontend Integration

The frontend (`src/hooks/useLLMChat.ts`) now calls:
```typescript
const SUPABASE_FUNCTIONS_URL = 'https://ajigpytercayzftfjtle.supabase.co/functions/v1';
const API_URL = `${SUPABASE_FUNCTIONS_URL}/llm-chat/chat`;
```

### Removing This Directory

If you want to completely remove this archived backend:
```bash
rm -rf server/
```

### References

- **Deployment Summary**: See `DEPLOYMENT_SUMMARY.md` in project root
- **Deployment Progress**: See `docs/archive/deployment-progress-2025-11-13.md`
- **Supabase Functions**: See `supabase/functions/` directory

---

**Last Updated**: November 2025
**Migration Status**: Complete
**Production Status**: Not Used
