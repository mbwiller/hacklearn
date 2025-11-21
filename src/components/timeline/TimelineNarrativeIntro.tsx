/**
 * TimelineNarrativeIntro Component
 * Displays engaging narrative introduction and key insights
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, BarChart3, Zap } from 'lucide-react';
import { TIMELINE_INTRODUCTION_NARRATIVE, key_insights } from '@/data/timeline';

interface TimelineNarrativeIntroProps {
  onExploreTimeline?: () => void;
  onViewTechniques?: () => void;
  onViewStatistics?: () => void;
}

const insightIcons = [Lightbulb, TrendingUp, BarChart3, Zap, Lightbulb];

export const TimelineNarrativeIntro: React.FC<TimelineNarrativeIntroProps> = ({
  onExploreTimeline,
  onViewTechniques,
  onViewStatistics
}) => {
  return (
    <section className="space-y-8" aria-labelledby="narrative-title">
      {/* Main Narrative */}
      <div className="prose prose-invert max-w-none">
        <h1 id="narrative-title" className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6 leading-tight">
          The Adversarial Singularity: Five Years of the AI Security Arms Race
        </h1>

        <div className="text-lg text-slate-300 space-y-4 leading-relaxed">
          <p>
            In November 2022, OpenAI released ChatGPT to the public. Within forty-eight hours, the first jailbreak appeared.
            A user calling themselves "DAN"—short for "Do Anything Now"—had discovered that a simple prompt could strip away
            the model's safety constraints, transforming a helpful assistant into an unfiltered oracle willing to generate
            anything: hate speech, illegal instructions, malware blueprints. The technique spread across Reddit and Discord
            like wildfire. OpenAI patched it within days. DAN returned in a new form within hours.
          </p>

          <p>
            This was not a software bug. It was the opening salvo in a conflict that would define the next five years of
            artificial intelligence security—a <span className="text-cyan-400 font-semibold">Red Queen's Race</span> where every defensive measure
            would be met with an equally sophisticated countermeasure, where the very architecture of Large Language Models
            would prove to be both their greatest strength and their fundamental vulnerability.
          </p>

          <p className="text-xl font-semibold text-white mt-6">
            The problem is deceptively simple: <span className="text-red-400">transformer models cannot reliably distinguish
            instructions from data</span>. When an LLM processes text, it treats your question, the system prompt defining
            its behavior, and external content scraped from the web as a single, undifferentiated stream of tokens. This
            architectural debt—inherited from models designed for language understanding, not adversarial robustness—would
            become the attack surface for an escalating campaign of exploitation.
          </p>
        </div>
      </div>

      {/* Key Insights Cards */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Key Insights from the Timeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {key_insights.map((insight, idx) => {
            const Icon = insightIcons[idx % insightIcons.length];
            return (
              <motion.div
                key={idx}
                className="p-5 rounded-lg backdrop-blur-xl bg-slate-900/50 border border-white/10
                          hover:border-cyan-400/50 hover:bg-slate-900/70 transition-all duration-300
                          group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-sm font-semibold text-cyan-400 italic leading-relaxed">
                      "{insight.insight}"
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {insight.evidence}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 pt-4">
        {onExploreTimeline && (
          <button
            onClick={onExploreTimeline}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500
                     text-white font-semibold hover:from-emerald-600 hover:to-cyan-600
                     transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Explore Timeline
          </button>
        )}

        {onViewTechniques && (
          <button
            onClick={onViewTechniques}
            className="px-6 py-3 rounded-lg border border-cyan-400/50 bg-slate-900/50
                     text-cyan-400 font-semibold hover:bg-cyan-500/10 hover:border-cyan-400
                     transition-all duration-300 backdrop-blur-xl"
          >
            View Attack Techniques
          </button>
        )}

        {onViewStatistics && (
          <button
            onClick={onViewStatistics}
            className="px-6 py-3 rounded-lg border border-slate-700 bg-slate-900/30
                     text-slate-300 font-medium hover:bg-slate-800/50 hover:border-slate-600
                     transition-all duration-300 backdrop-blur-xl"
          >
            View Statistics
          </button>
        )}
      </div>
    </section>
  );
};
