import { useNavigate } from 'react-router-dom';
import { Shield, Brain, Lock, Code, ArrowRight, Github } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Container } from '../components/ui/Container';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export const SplashPage = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'AI/ML Security',
      icon: <Brain className="w-12 h-12" />,
      moduleCount: 10,
      difficulty: 'Beginner → Advanced',
      description: 'Master cutting-edge AI security concepts including prompt injection, adversarial ML, data poisoning, and model extraction.',
      gradient: 'from-emerald-400 to-emerald-600'
    },
    {
      title: 'Traditional Hacking',
      icon: <Lock className="w-12 h-12" />,
      moduleCount: 10,
      difficulty: 'Beginner → Advanced',
      description: 'Learn foundational ethical hacking techniques including SQL injection, XSS, penetration testing, and network security.',
      gradient: 'from-cyan-400 to-cyan-600'
    },
    {
      title: 'Prompt Engineering',
      icon: <Code className="w-12 h-12" />,
      moduleCount: 10,
      difficulty: 'Coming Soon',
      description: 'Advanced prompt engineering techniques for LLMs. Master the art of crafting effective prompts for AI systems.',
      gradient: 'from-purple-400 to-purple-600',
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white overflow-hidden">
      {/* Theme Toggle */}
      <ThemeToggle variant="fixed" />

      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)] animate-pulse" style={{ animationDuration: '4s' }}></div>

      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <Container className="pt-20 pb-32">
          <div className="text-center space-y-8">
            {/* Logo/Icon */}
            <div className="flex justify-center">
              <div className="p-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl shadow-2xl shadow-emerald-500/50">
                <Shield className="w-20 h-20 text-white" />
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent leading-tight">
                HackLearn Pro
              </h1>
              <p className="text-2xl md:text-3xl text-emerald-200 font-medium">
                Master Ethical Hacking & AI Security
              </p>
            </div>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              30 comprehensive modules covering AI/ML security, traditional ethical hacking, and advanced prompt engineering.
              Learn through hands-on labs, real-world examples, and professional-grade content.
            </p>

            {/* CTA Button */}
            <div className="pt-8">
              <Button
                size="lg"
                onClick={() => navigate('/app/dashboard')}
                icon={<ArrowRight className="w-6 h-6" />}
                iconPosition="right"
                className="text-xl px-12 py-6 shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/70 transform hover:scale-105"
              >
                Enter Platform
              </Button>
            </div>

            {/* Stats */}
            <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-5xl font-bold text-emerald-400">30</div>
                <div className="text-gray-400 mt-2">Expert Modules</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-emerald-400">3</div>
                <div className="text-gray-400 mt-2">Learning Tracks</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-emerald-400">100%</div>
                <div className="text-gray-400 mt-2">Hands-On Labs</div>
              </div>
            </div>
          </div>
        </Container>

        {/* Categories Preview Section */}
        <Container className="pb-32">
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Choose Your Path
              </h2>
              <p className="text-xl text-gray-300">
                Three comprehensive tracks to master modern security
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <Card
                  key={index}
                  variant="hover"
                  className="bg-slate-900/50 border-slate-800 backdrop-blur-sm relative overflow-hidden group"
                >
                  {category.comingSoon && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-purple-500/20 border border-purple-500 rounded-full text-xs font-semibold text-purple-300">
                      COMING SOON
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Icon */}
                    <div className={`p-4 bg-gradient-to-br ${category.gradient} rounded-xl w-fit group-hover:scale-110 transition-transform`}>
                      {category.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white">
                      {category.title}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm">
                      <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500 rounded-full text-emerald-300 font-semibold">
                        {category.moduleCount} Modules
                      </span>
                      <span className="text-gray-400">
                        {category.difficulty}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>

        {/* Footer */}
        <Container className="pb-12">
          <div className="border-t border-slate-800 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Left: Brand */}
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-emerald-500" />
                <span className="text-xl font-bold">HackLearn Pro</span>
              </div>

              {/* Center: Tech Stack */}
              <div className="text-sm text-gray-400">
                Built with React + Vite + TypeScript
              </div>

              {/* Right: Links */}
              <div className="flex items-center gap-6">
                <a
                  href="https://github.com/mbwiller/hacklearn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-8 text-sm text-gray-500">
              Educational use only. Use responsibly and ethically.
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
