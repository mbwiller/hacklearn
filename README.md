# HackLearn - Ethical Hacking Education Platform

An interactive learning platform designed to teach ethical hacking and AI/ML security. The platform uses a modern, serverless architecture and provides hands-on IDE labs for an immersive learning experience.

**Live URL:** [https://hacklearn-c0w9smldo-matts-projects-6b78eb05.vercel.app](https://hacklearn-c0w9smldo-matts-projects-6b78eb05.vercel.app)

## Overview

HackLearn combines traditional ethical hacking fundamentals with cutting-edge AI/ML security concepts, providing:
- **30 Total Modules**: 10 AI/ML security + 10 traditional hacking + 10 prompt engineering concepts.
- **Interactive IDE Labs**: In-browser code editor (Monaco) with problem descriptions, starter code, and test cases powered by client-side Python execution via Pyodide.
- **Modern Architecture**: A fast, responsive React frontend built with Vite, connected to a powerful serverless backend using Supabase.
- **User Progress Tracking**: A comprehensive account page provides a dashboard with activity tracking, achievements, and progress visualization.

## Technology Stack

- **Frontend Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Backend-as-a-Service (BaaS)**: [Supabase](https://supabase.com/)
    - **Database**: PostgreSQL with Row-Level Security
    - **Authentication**: Supabase Auth
    - **Serverless Functions**: Deno Runtime (for LLM proxy)
- **In-Browser Code Execution**: [Pyodide](https://pyodide.org/)
- **Deployment**: [Vercel](https://vercel.com/)

## Local Development Quick Start

### Prerequisites
- Node.js and npm
- A Supabase account (free tier)

### Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/mbwiller/hacklearn.git
    cd hacklearn
    ```

2.  **Set up environment variables**
    Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
    Open the new `.env` file and add your Supabase project URL and Anon Key. You can find these in your Supabase project's "API Settings".
    ```
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

3.  **Install dependencies**
    ```bash
    npm install
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Access the platform**
    Open your browser and navigate to:
    ```
    http://localhost:5173
    ```

## Learning Path

### AI/ML Security Concepts (10)
1.  **Prompt Injection Attacks**
2.  **Adversarial Machine Learning**
3.  **Data Poisoning**
4.  **Model Extraction**
5.  **Jailbreaking & Safety Bypassing**
6.  **RAG Security Vulnerabilities**
7.  **Multi-Agent System Attacks**
8.  **Link Traps & Malicious URLs**
9.  **Invisible Unicode Injection**
10. **AI Agent Command Injection**

### Traditional Ethical Hacking (10)
11. **Reconnaissance & Footprinting**
12. **SQL Injection**
13. **Cross-Site Scripting (XSS)**
14. **Social Engineering & Phishing**
15. **Network Scanning & Enumeration**
16. **Password Cracking**
17. **Man-in-the-Middle Attacks**
18. **Denial of Service (DoS)**
19. **Web Application Vulnerabilities**
20. **Penetration Testing Methodology**

### Prompt Engineering for LLMs (10)
(Content for these modules is in development)

## Security Note

This platform is for **EDUCATIONAL PURPOSES ONLY**. All techniques should be used ethically and legally.
- Only test systems you own or have explicit permission to test.
- Use this knowledge to improve security, not to cause harm.
- Report vulnerabilities responsibly.

---

**Happy Learning! Stay Ethical. Stay Secure.**