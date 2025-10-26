# HackLearn Pro - Modern React + TypeScript Platform

A professional, production-ready ethical hacking and AI security training platform built with React, TypeScript, and Vite.

## Project Architecture

This project has been transformed from a single-file CDN-based React app into a modern, modular TypeScript application.

### Technology Stack

- **React 18.3.1** - Modern React with hooks
- **TypeScript 5.9** - Strict type safety
- **Vite 7.1** - Fast build tooling
- **Tailwind CSS 3.3** - Utility-first styling
- **Lucide React** - Beautiful icon library
- **Docker** - Containerized deployment

### Project Structure

```
/src
  /components
    /ui                     - Reusable UI components
      - StatsCard.tsx       - Statistics display card
      - ProgressBar.tsx     - Progress visualization
      - DifficultyBadge.tsx - Difficulty indicator
      - AchievementCard.tsx - Achievement display
    /concepts               - Concept-specific components
      - ConceptCard.tsx     - Individual concept card
      - ConceptDetail.tsx   - Detailed concept view
      - ChallengeView.tsx   - Interactive challenge interface
    - Dashboard.tsx         - Main dashboard component
  /data
    - concepts.tsx          - All learning concepts and challenges
  /hooks
    - useProgress.ts        - Progress tracking hook
    - useGameState.ts       - Game state management
    - useAchievements.ts    - Achievement system
  /types
    - index.ts              - TypeScript interfaces
  /styles
    - index.css             - Global styles + Tailwind
  - App.tsx                 - Main application component
  - main.tsx                - Application entry point
```

## Development

### Prerequisites

- Node.js 18+
- npm 8+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Development Server

The development server runs on `http://localhost:3000` with hot module replacement (HMR).

## Building

### Production Build

```bash
npm run build
```

This creates an optimized production bundle in the `/dist` directory:
- Minified JavaScript and CSS
- Code splitting for optimal loading
- Vendor chunk separation (React, Lucide)
- Source maps disabled for production

### Build Configuration

The build is configured in `vite.config.ts` with:
- Path aliases for clean imports (`@components`, `@data`, `@hooks`, etc.)
- Optimized chunk splitting
- Fast refresh for development

## Docker Deployment

### Two-Stage Build

The Dockerfile uses a two-stage build process:

**Stage 1: Build**
- Node.js 18 Alpine image
- Install dependencies
- Build production bundle

**Stage 2: Serve**
- Nginx Alpine image
- Serve static files from `/dist`
- Optimized nginx configuration

### Running with Docker

```bash
# Build image
docker build -t hacklearn-pro .

# Run container
docker run -p 8080:80 hacklearn-pro
```

Access the application at `http://localhost:8080`

### Docker Compose

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down
```

## TypeScript Configuration

The project uses strict TypeScript with:
- Strict mode enabled
- No unused locals/parameters
- Path aliases configured
- Separate configs for app and build tools

## Features

### Learning System
- 20 security concepts (10 AI/ML Security + 10 Traditional Hacking)
- Interactive challenges with instant feedback
- Point-based progression system
- Achievement unlocking

### Progress Tracking
- LocalStorage persistence
- Real-time statistics
- Level progression
- Achievement system

### Responsive Design
- Mobile-first approach
- Gradient backgrounds
- Glassmorphism effects
- Smooth animations

## Code Quality

### Linting

ESLint configured with:
- TypeScript support
- React hooks rules
- React refresh rules

```bash
npm run lint
```

### Type Safety

All components are fully typed with TypeScript interfaces. The `verbatimModuleSyntax` option ensures explicit type imports.

## Migration from Legacy Version

### What Changed

**Before:**
- Single `hacklearn.jsx` file (45KB)
- CDN-based React/Babel loading
- In-browser transpilation
- No build process

**After:**
- Modular component structure
- Build-time compilation
- TypeScript type safety
- Optimized production bundles
- Professional development workflow

### Preserved Functionality

All features from the original version are preserved:
- All 20 concepts with challenges
- Progress tracking
- Achievement system
- Point-based leveling
- Responsive design
- Same visual design

## Performance

### Build Output

- **index.html**: 0.67 kB (gzipped: 0.38 kB)
- **CSS**: 15.08 kB (gzipped: 3.63 kB)
- **Lucide icons**: 4.27 kB (gzipped: 1.84 kB)
- **App code**: 37.21 kB (gzipped: 11.94 kB)
- **React vendor**: 141.61 kB (gzipped: 45.44 kB)

Total bundle size significantly reduced compared to CDN approach.

### Optimizations

- Code splitting by vendor
- Tree shaking
- Minification
- Gzip compression
- Static asset caching (1 year)

## Future Enhancements

Potential improvements:
- Backend API integration
- User authentication
- Database persistence
- Analytics tracking
- Additional learning modules
- Multiplayer features
- Certificate generation

## License

Educational use - Ethical Hacking Training Platform

## Support

For issues or questions, please refer to the project documentation.
