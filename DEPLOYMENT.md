# HackLearn Pro - Vercel Deployment Guide

## Prerequisites Checklist
- [x] Vercel account created
- [x] Supabase project created (Production)
- [x] Production credentials available
- [x] Git repository on branch: `claude/deploy-hacklearn-vercel-015QF3YtW2oFmnHPY5zVGJVs`
- [x] vercel.json committed to repository

## Production Credentials
```bash
VITE_SUPABASE_URL=https://ajigpytercayzftfjtle.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqaWdweXRlcmNheXpmdGZqdGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNTg5MjIsImV4cCI6MjA3ODYzNDkyMn0.xAyMgZ9-06SE_zJZoO61J-S43LKQ5CcAty7-eCCOyFw
```

---

## Option 1: Automated Deployment (Recommended)

### Step 1: Make deployment script executable
```bash
chmod +x deploy-to-vercel.sh
```

### Step 2: Run deployment script
```bash
./deploy-to-vercel.sh
```

The script will:
1. Verify Vercel CLI installation
2. Pull latest changes
3. Test production build
4. Authenticate with Vercel
5. Deploy to production
6. Capture deployment information

---

## Option 2: Manual Deployment

### Step 1: Install Vercel CLI
```bash
npm install -g vercel@latest
```

### Step 2: Verify installation
```bash
vercel --version
# Expected: Vercel CLI 48.x.x or higher
```

### Step 3: Pull latest changes
```bash
git pull origin claude/deploy-hacklearn-vercel-015QF3YtW2oFmnHPY5zVGJVs
```

### Step 4: Install dependencies and test build
```bash
npm install
npm run build
```

**Expected**: `dist/` folder created with no TypeScript errors

### Step 5: Preview build locally (optional)
```bash
npm run preview
# Visit http://localhost:4173 to test
```

### Step 6: Authenticate with Vercel
```bash
vercel login
```

Choose your preferred authentication method:
- Email verification link
- GitHub OAuth (recommended)

### Step 7: Initialize Vercel project
```bash
vercel
```

**Interactive prompts - Use these EXACT responses:**
```
? Set up and deploy "~/hacklearn"? [Y/n]
→ y

? Which scope do you want to deploy to?
→ [Select your personal account or team]

? Link to existing project? [y/N]
→ n

? What's your project's name?
→ hacklearn-pro

? In which directory is your code located?
→ ./

Auto-detected Project Settings (Vite):
- Build Command: npm run build
- Development Command: npm run dev
- Install Command: npm install
- Output Directory: dist

? Want to modify these settings? [y/N]
→ n
```

### Step 8: Add environment variables
```bash
# Add Supabase URL
vercel env add VITE_SUPABASE_URL production
# When prompted, paste: https://ajigpytercayzftfjtle.supabase.co

# Add Supabase Anon Key
vercel env add VITE_SUPABASE_ANON_KEY production
# When prompted, paste the anon key from above
```

### Step 9: Verify environment variables
```bash
vercel env ls
```

**Expected output:**
```
Environment Variables found for project hacklearn-pro:
  - VITE_SUPABASE_URL       (production)
  - VITE_SUPABASE_ANON_KEY  (production)
```

### Step 10: Deploy to production
```bash
vercel --prod
```

**Expected flow:**
1. ✓ Building application (tsc -b && vite build)
2. ✓ Uploading build artifacts
3. ✓ Deploying to production
4. ✓ Success message with production URL

### Step 11: Capture deployment information

**From terminal output:**
- Production URL: `https://hacklearn-pro.vercel.app`
- Deployment ID: `dpl_xxxxxxxxxxxxx`

**From .vercel/project.json:**
```bash
cat .vercel/project.json
```

Look for:
- `projectId`: `prj_xxxxxxxxxxxxx`
- `orgId`: `team_xxxxxxxxxxxxx` (or personal account ID)

---

## Post-Deployment Configuration

### CRITICAL: Update Supabase Authentication Settings

1. Go to Supabase Dashboard:
   ```
   https://supabase.com/dashboard/project/ajigpytercayzftfjtle/auth/url-configuration
   ```

2. Update **Site URL**:
   ```
   https://hacklearn-pro.vercel.app
   ```

3. Add to **Redirect URLs**:
   ```
   https://hacklearn-pro.vercel.app/**
   ```

4. Save changes

### Verification Tests

Test these URLs in your browser:

1. **Root URL**: https://hacklearn-pro.vercel.app/
   - Should load landing page

2. **Login Route**: https://hacklearn-pro.vercel.app/login
   - Should load login page (NOT 404)

3. **Dashboard**: https://hacklearn-pro.vercel.app/dashboard
   - Should redirect to login if not authenticated

4. **IDE Route**: https://hacklearn-pro.vercel.app/app/ide/1
   - Should load IDE interface (after login)

5. **Authentication Flow**:
   - Click "Sign Up" → Create account
   - Verify email confirmation works
   - Login → Should redirect to dashboard
   - Check browser console for errors

### Monitoring Deployment

```bash
# View deployment logs
vercel logs hacklearn-pro --prod

# Check deployment status
vercel ls hacklearn-pro

# View project info
vercel inspect hacklearn-pro
```

---

## Troubleshooting

### Issue: TypeScript build fails on Vercel
**Symptoms**: "tsc: command not found" during build

**Solution**:
```bash
# Move TypeScript to dependencies
npm install --save typescript@~5.9.3
git add package.json package-lock.json
git commit -m "[Fix] Move TypeScript to dependencies for Vercel"
git push origin claude/deploy-hacklearn-vercel-015QF3YtW2oFmnHPY5zVGJVs
vercel --prod
```

### Issue: Routes return 404
**Symptoms**: Direct navigation to /login shows 404

**Solution**: Verify vercel.json is deployed
```bash
git status  # Ensure vercel.json is committed
vercel --prod --force  # Force redeploy
```

### Issue: Authentication fails
**Symptoms**: "Invalid API key" or CORS errors

**Solutions**:
1. Verify environment variables:
   ```bash
   vercel env ls
   ```

2. Check Supabase allowed origins:
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add production URL: https://hacklearn-pro.vercel.app

### Issue: Build exceeds time limit
**Symptoms**: "Build exceeded maximum duration"

**Note**: Unlikely with current bundle size (116KB gzipped), already optimized

---

## Expected Deliverables

After successful deployment, you should have:

```
✅ Production URL: https://hacklearn-pro.vercel.app (or custom)
✅ Deployment ID: dpl_xxxxxxxxxxxxx
✅ Project ID: prj_xxxxxxxxxxxxx
✅ Organization ID: team_xxxxxxxxxxxxx

✅ Build Statistics:
   - Build Duration: ~60-90 seconds
   - Bundle Size: ~116KB gzipped
   - Routes: 20+ (all functional)
   - TypeScript Errors: 0

✅ Configuration:
   - vercel.json with SPA rewrites
   - Security headers enabled
   - Environment variables set (2)
   - Vite framework detected
   - Output directory: dist

✅ Verification:
   - Root URL accessible
   - Direct route access works
   - Authentication functional
   - Dashboard loads correctly
   - IDE routes operational
   - No console errors
```

---

## Next Steps (GitHub Actions CI/CD)

Save these values for automated deployments:

```bash
# For GitHub Secrets
VERCEL_TOKEN=<generate at vercel.com/account/tokens>
VERCEL_PROJECT_ID=<from .vercel/project.json>
VERCEL_ORG_ID=<from .vercel/project.json>
```

---

## Support

If you encounter issues:
1. Check deployment logs: `vercel logs hacklearn-pro --prod`
2. Verify environment variables: `vercel env ls`
3. Review Supabase URL configuration
4. Check browser console for client-side errors
5. Inspect network tab for failed requests

---

**Deployment prepared by**: Claude (Session: claude/deploy-hacklearn-vercel-015QF3YtW2oFmnHPY5zVGJVs)
**Date**: 2025-11-13
**Latest Commit**: 56508e1 - [Deploy] Add Vercel SPA routing configuration
