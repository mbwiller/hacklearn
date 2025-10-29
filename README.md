# HackLearn Pro - Ethical Hacking Education Platform

A comprehensive, interactive learning platform designed to teach the 20 most critical concepts in ethical hacking, with special focus on AI/ML security. Built for Docker deployment with professional, content-focused UI.

## Overview

HackLearn Pro combines traditional ethical hacking fundamentals with cutting-edge AI/ML security concepts, providing:
- **20 Core Concepts**: 10 AI/ML security + 10 traditional hacking concepts
- **Hands-On Labs**: Interactive Jupyter notebooks with practical exercises
- **Real-World Examples**: Learn from actual security breaches and vulnerabilities
- **Defense Strategies**: Practical mitigation techniques for each attack vector
- **Professional UI**: Clean, focused interface with light/dark mode support

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

## Development Status

### Flagship Concepts: 20/20 Complete (100%)

**AI/ML Security (10/10 complete!):**
- #1 Prompt Injection Attacks - Complete (825 lines, notebook ready)
- #2 Adversarial Machine Learning - Complete (1,208 lines, notebook ready)
- #3 Data Poisoning - Complete (1,100 lines, notebook ready)
- #4 Model Extraction - Complete (1,000 lines, notebook ready)
- #5 Jailbreaking & Safety Bypassing - Complete (1,050 lines, notebook ready)
- #6 RAG Security Vulnerabilities - Complete (1,150 lines, notebook ready)
- #7 Multi-Agent System Attacks - Complete (1,200 lines, notebook ready)
- #8 Link Traps & Malicious URLs - Complete (1,180 lines, notebook ready)
- #9 Invisible Unicode Injection - Complete (1,200 lines, notebook ready)
- #10 AI Agent Command Injection - Complete (1,400 lines, notebook ready)

**Traditional Hacking (10/10 complete!):**
- #11 Reconnaissance & Footprinting - Complete (1,650 lines, notebook ready)
- #12 SQL Injection - Complete (1,105 lines, notebook ready)
- #13 Cross-Site Scripting (XSS) - Complete (1,194 lines, notebook ready)
- #14 Social Engineering & Phishing - Complete (1,377 lines, notebook ready)
- #15 Network Scanning & Enumeration - Complete (1,250 lines, notebook ready)
- #16 Password Cracking & Credential Attacks - Complete (1,555 lines, notebook ready)
- #17 Man-in-the-Middle (MitM) Attacks - Complete (1,332 lines, notebook ready) **NEW!**
- #18 Denial of Service (DoS) Attacks - Complete (1,250 lines, notebook ready) **NEW!**
- #19 Web Application Vulnerabilities - Complete (1,400 lines, notebook ready) **NEW!**
- #20 Penetration Testing Methodology - Complete (1,741 lines, notebook ready)

** Project Complete!** All 20 flagship modules with comprehensive content, interactive labs, and professional UI.

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

---

## ‍ For Developers

### Contributing to Development

HackLearn Pro follows a systematic batch development process. Each concept includes:
- React component with 4-tab structure (Theory, Lab, Tools, References)
- Jupyter notebook with hands-on exercises
- Real-world examples and academic citations
- Professional UI with zero emojis

**See [DEVELOPMENT.md](./DEVELOPMENT.md) for:**
- Complete development workflow
- Module creation guide (step-by-step)
- Testing procedures
- Git workflow and commit standards
- Code redundancy prevention
- Documentation requirements

### GitHub Repository

**Repository:** https://github.com/mbwiller/hacklearn
**Branch:** master (main development)
**Remote:** origin

### Quick Development Setup

```bash
# Clone repository
git clone https://github.com/mbwiller/hacklearn.git
cd hacklearn

# Install dependencies
npm install

# Start development server (fast HMR)
npm run dev
# Opens at http://localhost:3000

# Build for production
npm run build
# Output in dist/ (~116 KB gzipped)

# Preview production build
npm run preview
# Opens at http://localhost:4173

# Run linting
npm run lint
```

### Pushing Updates

```bash
# Check current status
git status
git diff

# Stage changes
git add .

# Commit with proper format
git commit -m "[Type] Description

Details...

Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
git push origin master

# Verify at: https://github.com/mbwiller/hacklearn
```

**Commit Types:** `[Feature]` `[Content]` `[Fix]` `[Docs]` `[Refactor]` `[Test]`

See [DEVELOPMENT.md](./DEVELOPMENT.md) for complete git workflow and standards.

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

## Technical Details

### Architecture
- **Frontend**: React 18 with Lucide icons
- **Styling**: Tailwind CSS with custom theme system
- **Typography**: Inter font family (400-700 weights)
- **Web Server**: Nginx (Alpine Linux)
- **Container**: Docker

### Theme System
- **Design**: Professional Slate/white base with emerald (#10B981) accents
- **Light Mode**: Cool gray backgrounds (#F8FAFC), white cards
- **Dark Mode**: Slate backgrounds (slate-950), dark cards (slate-900)
- **Toggle**: Fixed position button (top-right) with persistent state
- **Storage**: LocalStorage for theme preference across sessions
- **Syntax**: Code blocks maintain colored syntax in both modes

### Files
- `index.html` - Application entry point
- `hacklearn.jsx` - React application with all logic
- `Dockerfile` - Container configuration
- `docker-compose.yml` - Simplified deployment
- `nginx.conf` - Web server configuration
- `README.md` - Documentation

### Port Configuration
- Default: `8080`
- Change in `docker-compose.yml` to customize

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

## Customization

### Change Port
Edit `docker-compose.yml`:
```yaml
ports:
 - "YOUR_PORT:80"
```

### Rebuild After Changes
```bash
docker-compose down
docker-compose up --build -d
```

## Progress Tracking

Your progress is tracked locally in the browser:
- Completed concepts
- Module completion status

## Updates

To update to the latest version:
```bash
docker-compose down
docker-compose pull
docker-compose up -d
```

## Tips for Learning

1. **Start with Reconnaissance** - Foundation of ethical hacking
2. **Focus on AI concepts** - Critical for modern security
3. **Work through labs** - Hands-on practice reinforces understanding
4. **Read real-world examples** - Learn from actual incidents
5. **Practice defenses** - Apply what you learn
6. **Take notes** - Create your own reference

## Recommended Learning Order

### For Zero Experience:
1. Reconnaissance & Footprinting
2. Social Engineering & Phishing
3. Password Cracking
4. Network Scanning
5. SQL Injection
6. XSS
7. Web Application Vulnerabilities
8. Prompt Injection (transition to AI)
9. Continue with remaining AI concepts
10. Complete with Penetration Testing Methodology

### For ML/SWE Background:
1. Prompt Injection Attacks
2. Adversarial Machine Learning
3. RAG Security
4. Jailbreaking & Safety Bypassing
5. Other AI concepts
6. Then explore traditional concepts

## Contributing to Your Learning

### Additional Resources
- **OWASP**: https://owasp.org
- **NIST**: https://www.nist.gov/cybersecurity
- **Anthropic Safety**: https://www.anthropic.com/safety
- **CVE Database**: https://cve.mitre.org

### Practice Platforms
- HackTheBox
- TryHackMe
- PentesterLab
- DVWA (Damn Vulnerable Web Application)

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

**Happy Learning! Stay Ethical. Stay Secure. **