import { motion } from 'framer-motion'
import { useInViewAnimation } from '../../hooks/useInViewAnimation'
import { fadeInUp, staggerContainer } from '../../lib/animations'

export function HeroSection() {
  const { ref, animationProps } = useInViewAnimation({ threshold: 0.1 })

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-attention/5 via-transparent to-transparent" />

      <motion.div
        ref={ref}
        className="max-w-4xl mx-auto text-center relative z-10"
        variants={staggerContainer}
        {...animationProps}
      >
        {/* Paper title */}
        <motion.p
          variants={fadeInUp}
          className="text-text-secondary text-sm uppercase tracking-widest mb-4"
        >
          An Interactive Exploration
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="text-5xl sm:text-7xl font-bold tracking-tight mb-6"
        >
          Attention Is All You Need
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-xl sm:text-2xl text-text-secondary mb-8"
        >
          The architecture that powers GPT, BERT, and modern AI
        </motion.p>

        {/* Authors citation */}
        <motion.div
          variants={fadeInUp}
          className="text-sm text-text-secondary mb-12"
        >
          <p>
            Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin
          </p>
          <p className="text-xs mt-1">NeurIPS 2017</p>
        </motion.div>

        {/* Key stats */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          <Stat value="28.4" label="BLEU (EN→DE)" />
          <Stat value="41.8" label="BLEU (EN→FR)" />
          <Stat value="3.5" label="Days to train" />
          <Stat value="O(1)" label="Sequential ops" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-sm text-text-secondary">Scroll to explore</p>
          <motion.div
            className="w-6 h-10 border-2 border-text-secondary/30 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-3 bg-accent-attention rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent-query/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent-attention/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-accent-attention">{value}</div>
      <div className="text-xs text-text-secondary">{label}</div>
    </div>
  )
}
