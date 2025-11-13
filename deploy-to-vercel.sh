#!/bin/bash

# HackLearn Pro - Vercel Deployment Script
# Execute this script on your local machine with internet connectivity

set -e  # Exit on any error

echo "🚀 HackLearn Pro - Vercel Deployment Script"
echo "==========================================="
echo ""

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Production environment variables
SUPABASE_URL="https://ajigpytercayzftfjtle.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqaWdweXRlcmNheXpmdGZqdGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNTg5MjIsImV4cCI6MjA3ODYzNDkyMn0.xAyMgZ9-06SE_zJZoO61J-S43LKQ5CcAty7-eCCOyFw"

# Step 1: Verify Vercel CLI installation
echo -e "${YELLOW}[1/7] Checking Vercel CLI installation...${NC}"
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI not found. Installing globally...${NC}"
    npm install -g vercel@latest
fi
VERCEL_VERSION=$(vercel --version)
echo -e "${GREEN}✓ Vercel CLI installed: $VERCEL_VERSION${NC}"
echo ""

# Step 2: Pull latest changes
echo -e "${YELLOW}[2/7] Pulling latest changes from repository...${NC}"
git pull origin claude/deploy-hacklearn-vercel-015QF3YtW2oFmnHPY5zVGJVs
echo -e "${GREEN}✓ Repository updated${NC}"
echo ""

# Step 3: Verify vercel.json exists
echo -e "${YELLOW}[3/7] Verifying vercel.json configuration...${NC}"
if [ ! -f "vercel.json" ]; then
    echo -e "${RED}✗ vercel.json not found!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ vercel.json configuration found${NC}"
echo ""

# Step 4: Test local build
echo -e "${YELLOW}[4/7] Testing production build locally...${NC}"
npm install
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Production build successful${NC}"
else
    echo -e "${RED}✗ Production build failed. Fix errors before deploying.${NC}"
    exit 1
fi
echo ""

# Step 5: Login to Vercel (if not already authenticated)
echo -e "${YELLOW}[5/7] Authenticating with Vercel...${NC}"
vercel whoami &> /dev/null || vercel login
echo -e "${GREEN}✓ Vercel authentication successful${NC}"
echo ""

# Step 6: Deploy to Vercel
echo -e "${YELLOW}[6/7] Deploying to Vercel production...${NC}"
echo -e "${YELLOW}Note: You'll be prompted for project configuration.${NC}"
echo ""
echo "Use these settings when prompted:"
echo "  - Project name: hacklearn-pro"
echo "  - Directory: ./"
echo "  - Build Command: npm run build"
echo "  - Output Directory: dist"
echo ""
read -p "Press Enter to continue with deployment..."

# Deploy with environment variables
vercel \
  --prod \
  --yes \
  -e VITE_SUPABASE_URL="$SUPABASE_URL" \
  -e VITE_SUPABASE_ANON_KEY="$SUPABASE_ANON_KEY"

echo ""
echo -e "${GREEN}✓ Deployment initiated${NC}"
echo ""

# Step 7: Capture deployment information
echo -e "${YELLOW}[7/7] Capturing deployment information...${NC}"
if [ -f ".vercel/project.json" ]; then
    PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId": *"[^"]*"' | cut -d'"' -f4)
    ORG_ID=$(cat .vercel/project.json | grep -o '"orgId": *"[^"]*"' | cut -d'"' -f4)

    echo ""
    echo -e "${GREEN}=========================================${NC}"
    echo -e "${GREEN}     DEPLOYMENT COMPLETE!${NC}"
    echo -e "${GREEN}=========================================${NC}"
    echo ""
    echo "📋 Deployment Information:"
    echo "  - Project ID: $PROJECT_ID"
    echo "  - Organization ID: $ORG_ID"
    echo ""
    echo "🌐 Check your Vercel dashboard for the production URL:"
    echo "  https://vercel.com/dashboard"
    echo ""
    echo "⚠️  NEXT STEPS (CRITICAL):"
    echo "  1. Copy your production URL from Vercel dashboard"
    echo "  2. Update Supabase Auth settings:"
    echo "     - Go to: https://supabase.com/dashboard/project/ajigpytercayzftfjtle/auth/url-configuration"
    echo "     - Set Site URL to: https://hacklearn-pro.vercel.app (or your custom domain)"
    echo "     - Add to Redirect URLs: https://hacklearn-pro.vercel.app/**"
    echo "  3. Test authentication flow on production site"
    echo ""
else
    echo -e "${RED}✗ Could not find .vercel/project.json${NC}"
    echo "Please check Vercel dashboard for deployment status."
fi
