import { useNavigate } from 'react-router-dom';
import { Brain, Lock, Code, ArrowRight, Github, Shield } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
} as const;

interface Track {
  title: string;
  icon: typeof Brain;
  moduleCount: number;
  difficulty: string;
  description: string;
  accentBorder: string;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  comingSoon?: boolean;
}

const tracks: Track[] = [
  {
    title: 'AI/ML Security',
    icon: Brain,
    moduleCount: 10,
    difficulty: 'Beginner to Advanced',
    description:
      'Master cutting-edge AI security concepts including prompt injection, adversarial ML, data poisoning, and model extraction.',
    accentBorder: 'border-t-gold-400',
    iconBg: 'bg-gold-400/10',
    iconColor: 'text-gold-400',
    badgeBg: 'bg-gold-400/10 border-gold-400/30 text-gold-300',
  },
  {
    title: 'Traditional Hacking',
    icon: Lock,
    moduleCount: 10,
    difficulty: 'Beginner to Advanced',
    description:
      'Learn foundational ethical hacking techniques including SQL injection, XSS, penetration testing, and network security.',
    accentBorder: 'border-t-slate-400',
    iconBg: 'bg-slate-400/10',
    iconColor: 'text-slate-300',
    badgeBg: 'bg-slate-400/10 border-slate-400/30 text-slate-300',
  },
  {
    title: 'Prompt Engineering',
    icon: Code,
    moduleCount: 10,
    difficulty: 'Coming Soon',
    description:
      'Advanced prompt engineering techniques for LLMs. Master the art of crafting effective prompts for AI systems.',
    accentBorder: 'border-t-purple-400',
    iconBg: 'bg-purple-400/10',
    iconColor: 'text-purple-400',
    badgeBg: 'bg-purple-400/10 border-purple-400/30 text-purple-300',
    comingSoon: true,
  },
];

export const SplashPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0d14] text-white overflow-hidden noise-overlay">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0d14] via-[#0f1221] to-[#0a0d14]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-900/15 rounded-full blur-[128px]" />

        <motion.div
          className="absolute top-[15%] left-[10%] w-72 h-72 bg-purple-500/[0.08] rounded-full blur-[80px]"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            transition: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        <motion.div
          className="absolute top-[60%] right-[15%] w-56 h-56 bg-gold-400/[0.06] rounded-full blur-[80px]"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            transition: { duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 },
          }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[40%] w-64 h-64 bg-indigo-500/[0.08] rounded-full blur-[80px]"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            transition: { duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 6 },
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          {/* Hero Section */}
          <Container className="pt-32 pb-40">
            <motion.div
              className="max-w-4xl mx-auto text-center space-y-8"
              variants={containerVariants}
            >
              {/* Brand label */}
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-gold-400 tracking-wide uppercase">
                  <Shield className="w-4 h-4" />
                  HackLearn Pro
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-display text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight"
              >
                <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                  Master the Art of
                </span>
                <br />
                <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
                  AI Defense
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
              >
                30 hands-on modules across AI security, ethical hacking, and prompt
                engineering.
              </motion.p>

              {/* CTA + Stats */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center gap-8 pt-4"
              >
                <button
                  onClick={() => navigate('/login')}
                  className="group inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 text-[#0a0d14] font-display font-bold text-lg shadow-lg shadow-gold-400/20 hover:shadow-gold-400/40 transition-all duration-300 hover:scale-[1.02]"
                >
                  Begin Learning
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center gap-6 md:gap-8 text-sm text-gray-500">
                  <span>
                    <strong className="text-white font-semibold">30</strong> Modules
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span>
                    <strong className="text-white font-semibold">3</strong> Learning Tracks
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span>
                    <strong className="text-white font-semibold">100%</strong> Hands-On
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </Container>

          {/* Learning Tracks Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <Container className="pb-32">
              <div className="space-y-16">
                <motion.div className="text-center" variants={itemVariants}>
                  <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                    Choose Your Path
                  </h2>
                  <p className="text-lg text-gray-400">
                    Three tracks to master modern security
                  </p>
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  variants={containerVariants}
                >
                  {tracks.map((track, index) => {
                    const Icon = track.icon;
                    return (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        className={`relative group rounded-2xl border border-white/10 ${track.accentBorder} border-t-2 bg-white/[0.03] backdrop-blur-xl p-8 hover:bg-white/[0.06] transition-all duration-300`}
                      >
                        {track.comingSoon && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs font-semibold text-purple-300">
                            COMING SOON
                          </div>
                        )}

                        <div className="space-y-5">
                          <div
                            className={`w-12 h-12 rounded-xl ${track.iconBg} flex items-center justify-center`}
                          >
                            <Icon className={`w-6 h-6 ${track.iconColor}`} />
                          </div>

                          <h3 className="text-2xl font-display font-bold text-white">
                            {track.title}
                          </h3>

                          <div className="flex items-center gap-3 text-sm">
                            <span
                              className={`px-3 py-1 rounded-full border text-xs font-medium ${track.badgeBg}`}
                            >
                              {track.moduleCount} Modules
                            </span>
                            <span className="text-gray-500 text-xs">
                              {track.difficulty}
                            </span>
                          </div>

                          <p className="text-gray-400 text-sm leading-relaxed">
                            {track.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </Container>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
          >
            <Container className="pb-8">
              <div className="border-t border-white/5 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gold-400" />
                    <span className="font-display font-bold text-sm text-white">
                      HackLearn Pro
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <a
                      href="https://github.com/mbwiller/hacklearn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-500 hover:text-gold-400 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                    <span className="text-xs text-gray-600">
                      Educational use only.
                    </span>
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
