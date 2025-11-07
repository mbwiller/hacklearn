# HackLearn Pro - Ethical Hacking Education Platform

A comprehensive, interactive learning platform designed to teach the 20 most critical concepts in ethical hacking, with special focus on AI/ML security. Built for Docker deployment with professional, content-focused UI.

## Overview

HackLearn Pro combines traditional ethical hacking fundamentals with cutting-edge AI/ML security concepts, providing:
- **30 Total Modules**: 10 AI/ML security + 10 traditional hacking + 10 prompt engineering concepts
- **Professional Platform**: Full-featured web application with splash page, navigation, and user accounts
- **Hands-On Labs**: Interactive Jupyter notebooks with practical exercises
- **Real-World Examples**: Learn from actual security breaches and vulnerabilities
- **Defense Strategies**: Practical mitigation techniques for each attack vector
- **Modern UI**: Clean, focused interface with light/dark mode support and responsive design

## Quick Start with Docker

### Prerequisites
- Docker Desktop installed and running
- Modern web browser

### Installation

1. **Navigate to the project directory**
```bash
cd path/to/hacklearn-platform
```

2. **Build and run with Docker Compose**
```bash
docker-compose up -d
```

3. **Access the platform**
Open your browser and navigate to:
```
http://localhost:8080
```

4. **Stop the platform**
```bash
docker-compose down
```

### Alternative: Docker without Compose

```bash
# Build the image
docker build -t hacklearn-platform .

# Run the container
docker run -d -p 8080:80 --name hacklearn hacklearn-platform

# Stop and remove
docker stop hacklearn
docker rm hacklearn
```

## Platform Navigation

### Routes

**Public Routes:**
- `/` - Splash page (landing page with platform overview)

**App Routes (with header navigation):**
- `/app/dashboard` - Main dashboard with AI/ML and Traditional Hacking modules
- `/app/prompt-engineering` - Prompt Engineering modules (10 placeholders, content coming soon)
- `/app/account` - Professional analytics dashboard with activity tracking, achievements, and progress visualization
- `/app/concepts/:id` - Individual module detail pages

### User Flow

1. **Visit splash page** at http://localhost:8080 (Docker) or http://localhost:3000 (development)
2. **Click "Enter Platform"** to access the main dashboard
3. **Navigate between sections** using the header menu
   - Dashboard: View and access all 20 ethical hacking modules
   - Prompt Engineering: View 10 placeholder modules (content in development)
   - Account: View professional analytics dashboard with:
     - 52-week activity heatmap (GitHub-style)
     - Progress rings by category
     - Achievement badges and milestones
     - Streak tracking and XP progression
     - Recent activity timeline
4. **Click any module card** to access detailed content, labs, tools, and references
5. **Use browser back button** or "Back to Dashboard" to navigate

## Learning Path

### AI/ML Security Concepts (10)
1. **Prompt Injection Attacks** - OWASP #1 AI risk in 2025
2. **Adversarial Machine Learning** - Evasion attacks on ML models
3. **Data Poisoning** - Corrupting training data
4. **Model Extraction** - Stealing proprietary models
5. **Jailbreaking & Safety Bypassing** - Breaking AI restrictions
6. **RAG Security Vulnerabilities** - Retrieval-augmented generation risks
7. **Multi-Agent System Attacks** - Agent-to-agent infections
8. **Link Traps & Malicious URLs** - AI-generated malicious links
9. **Invisible Unicode Injection** - Hidden character attacks
10. **AI Agent Command Injection** - Exploiting AI tool access

### Traditional Ethical Hacking (10)
11. **Reconnaissance & Footprinting** - Information gathering
12. **SQL Injection** - Database manipulation attacks
13. **Cross-Site Scripting (XSS)** - Malicious script injection
14. **Social Engineering & Phishing** - Human exploitation
15. **Network Scanning & Enumeration** - Discovering attack surfaces
16. **Password Cracking** - Breaking authentication
17. **Man-in-the-Middle Attacks** - Intercepting communications
18. **Denial of Service (DoS)** - Overwhelming systems
19. **Web Application Vulnerabilities** - OWASP Top 10
20. **Penetration Testing Methodology** - Professional testing lifecycle

### Prompt Engineering for LLMs (10)
21. **Fundamentals of Prompt Design** - Core principles and structure (COMING SOON)
22. **Advanced Prompting Techniques** - Few-shot and chain-of-thought (COMING SOON)
23. **Prompt Optimization** - Maximizing output quality (COMING SOON)
24. **Role-Based Prompting** - Persona engineering (COMING SOON)
25. **Creative Prompting** - Content generation techniques (COMING SOON)
26. **Multi-Step Reasoning** - Complex task decomposition (COMING SOON)
27. **Safety & Alignment** - Responsible AI outputs (COMING SOON)
28. **Code Generation Prompting** - Technical prompting (COMING SOON)
29. **Enterprise Prompt Engineering** - Production deployment (COMING SOON)
30. **Agentic Workflows** - Autonomous AI systems (COMING SOON)

## Development Status

### Platform Status: Full-Stack Architecture Complete

**Frontend:** 100% Complete
- Splash page with bold marketing design
- Full React Router navigation
- Header with responsive menu
- Professional analytics dashboard (Account Page) with ML/engineering aesthetic **NEW!**
  - GitHub-style 52-week activity heatmap
  - Circular progress visualization by category
  - Achievement badge system (6 achievements)
  - Streak tracking and XP progression
  - Recent activity timeline
- Theme toggle (light/dark mode)
- 30 module cards across 3 sections

**Content:** 20/30 Modules Complete (67%) - See "Learning Path" section above for full module listing.

### UI/UX Harmonization Complete

**Status:** 100% harmonized across all 20 modules (completed 2025-10-28)

All modules now follow the standardized design system:
- **Unified color palette**: Emerald accents, slate backgrounds (consistent across all modules)
- **Standard icon gradients**: `from-emerald-400 to-emerald-600` throughout
- **Consistent tab navigation**: Standardized active/inactive states with emerald highlights
- **Uniform spacing**: Consistent padding, margins, and card layouts
- **Professional aesthetic**: Zero-emoji policy, engineer-focused design

**Key improvements:**
- Eliminated 6 different gradient patterns  Eliminated 3 different background styles  Eliminated 4 different tab styling variations  Converted all gray dark mode classes to slate for consistency  Created StandardModuleTemplate.tsx for future modules

**Documentation:** See [HARMONIZATION_SUMMARY.md](./HARMONIZATION_SUMMARY.md) for complete details of the harmonization effort.

### Account Page: Professional Analytics Dashboard

The Account Page provides comprehensive progress tracking with ML/engineering-focused aesthetic:
- GitHub-style 52-week activity heatmap
- Circular progress visualization by category
- Achievement badges and milestone tracking
- Streak tracking and XP progression
- Recent activity timeline with timestamps

---

## ‍ For Developers

**Repository:** https://github.com/mbwiller/hacklearn

For complete development workflow, module creation guide, testing procedures, and git standards, see **[DEVELOPMENT.md](./DEVELOPMENT.md)**.

---

## Learning Features

### For Each Concept
- **Overview**: Clear explanation of the attack vector
- **Real-World Examples**: Actual breaches and incidents
- **Key Takeaways**: Essential points to remember
- **Defense Strategies**: Practical mitigation techniques
- **Hands-On Labs**: Interactive Jupyter notebooks with code examples
- **Difficulty Rating**: Beginner, Intermediate, or Advanced
- **Professional Tools**: Attack and defense tool documentation

## Technology Stack

### Frontend
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS with dark/light themes
- **Icons**: Lucide React
- **Routing**: React Router DOM v7
- **State Management**: React Context API + custom hooks
- **Bundle Size**: 116KB gzipped

### Backend (NEW)
- **Framework**: Express.js 4.18 + TypeScript
- **LLM Integration**: OpenAI SDK 4.20
- **Features**: Rate limiting, streaming responses, token tracking
- **API Endpoint**: POST `/api/llm/chat`
- **Documentation**: See `server/README.md`

### Deployment
- **Production**: Docker + Nginx
- **Development**: Vite dev server (frontend) + Express server (backend)

### Port Configuration
- **Frontend (Dev)**: `3000` (Vite)
- **Backend (Dev)**: `3001` (Express)
- **Production**: `8080` (Nginx + Docker)
- Change in `docker-compose.yml` to customize

## Development

### Running Full Stack (Frontend + Backend)

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Frontend will automatically proxy `/api` requests to the backend on port 3001.

### Running Frontend Only

```bash
npm run dev
```

Access at: `http://localhost:3000`

### Backend Documentation

For complete backend API documentation, setup instructions, and testing:
- See `server/README.md`
- API endpoint: `POST /api/llm/chat`
- Rate limiting: 10 requests/minute
- Supports streaming and non-streaming responses

## Use Cases

### For Beginners
- Start with "Beginner" difficulty concepts
- Focus on understanding fundamentals
- Complete traditional hacking concepts first
- Progress to AI/ML security concepts

### For ML/AI Engineers
- Jump directly to AI/ML Security section
- Understand vulnerabilities in your models
- Learn prompt engineering security
- Apply defense strategies to your projects

### For Security Professionals
- Comprehensive overview of modern threats
- AI/ML security upskilling
- Quick reference for defense strategies
- Stay current with 2025 threat landscape

## Security Note

This platform is designed for **EDUCATIONAL PURPOSES ONLY**. All techniques taught should be used ethically and legally:
- Only test systems you own or have explicit permission to test
- Use knowledge to improve security posture
- Report vulnerabilities responsibly
- Never use techniques for malicious purposes
- Never test systems without authorization

## Key Features

### Progressive Learning
- Start with basics, advance to complex topics
- Clear difficulty progression
- Builds on previous concepts

### Professional Design
- Modern Slate theme with emerald accents
- Light/Dark mode toggle for user preference
- Professional Inter font for technical readability
- Smooth animations and transitions
- Intuitive navigation
- Responsive design for all devices

### Real-World Focus
- Examples from 2023-2025 security incidents
- Current industry best practices
- OWASP 2025 guidelines
- Recent CVEs and vulnerabilities

### Comprehensive Coverage
- Balanced AI/ML and traditional hacking
- Attack vectors and defense strategies
- Theory and practical application
- Industry-standard methodologies

## Recommended Learning Path

**For Beginners:** Start with Reconnaissance → Social Engineering → Password Cracking → SQL Injection → XSS → Then AI/ML concepts

**For ML/AI Engineers:** Jump to AI/ML Security section (concepts #1-10) → Then explore traditional hacking

**For Security Professionals:** Comprehensive coverage of both AI/ML and traditional threats

## Additional Resources

- **OWASP**: https://owasp.org
- **NIST**: https://www.nist.gov/cybersecurity
- **Practice Platforms**: HackTheBox, TryHackMe, PentesterLab

## License

Educational use only. Use responsibly and ethically.

## Goals

After completing this platform, you will be able to:
- Understand 20 critical security concepts
- Identify AI/ML vulnerabilities in systems
- Apply defense strategies effectively
- Think like an ethical hacker
- Contribute to AI-Human alignment efforts
- Build more secure AI systems
- Understand the 2025 threat landscape

---

**Happy Learning! Stay Ethical. Stay Secure.**
