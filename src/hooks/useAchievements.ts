import { useEffect } from 'react';
import type { Progress } from '../types';
import { concepts } from '../data/concepts';

export const useAchievements = (
  progress: Progress,
  points: number,
  addAchievement: (achievement: string) => void
) => {
  useEffect(() => {
    const completed = Object.values(progress).filter(v => v).length;

    if (completed === 1) addAchievement('First Steps - Completed your first concept!');
    if (completed === 5) addAchievement('Quick Learner - Completed 5 concepts!');
    if (completed === 10) addAchievement('Half Way There - Completed 10 concepts!');
    if (completed === 15) addAchievement('Security Expert - Completed 15 concepts!');
    if (completed === 20) addAchievement('Ethical Hacking Master - Completed all 20 concepts!');

    const aiConcepts = concepts.filter(c => c.category === 'AI/ML Security').map(c => c.id);
    const aiCompleted = aiConcepts.every(id => progress[id]);
    if (aiCompleted && aiConcepts.length > 0) {
      addAchievement('AI Security Specialist - Mastered all AI/ML security concepts!');
    }

    const tradConcepts = concepts.filter(c => c.category === 'Traditional Hacking').map(c => c.id);
    const tradCompleted = tradConcepts.every(id => progress[id]);
    if (tradCompleted && tradConcepts.length > 0) {
      addAchievement('Traditional Hacking Pro - Mastered all traditional concepts!');
    }

    if (points >= 1000) addAchievement('Point Collector - Earned 1000+ points!');
    if (points >= 2000) addAchievement('Point Master - Earned 2000+ points!');
  }, [progress, points, addAchievement]);
};
