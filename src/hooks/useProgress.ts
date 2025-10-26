import { useState, useEffect } from 'react';
import type { Progress } from '../types';

export const useProgress = () => {
  const [progress, setProgress] = useState<Progress>({});
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    // Load progress from localStorage (or start fresh)
    const savedProgress = localStorage.getItem('hacklearn_progress');
    const savedPoints = localStorage.getItem('hacklearn_points');
    const savedLevel = localStorage.getItem('hacklearn_level');
    const savedAchievements = localStorage.getItem('hacklearn_achievements');

    if (savedProgress) setProgress(JSON.parse(savedProgress));
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedLevel) setLevel(parseInt(savedLevel));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
  }, []);

  const saveProgress = (conceptId: number, completed: boolean) => {
    const newProgress = { ...progress, [conceptId]: completed };
    setProgress(newProgress);
    localStorage.setItem('hacklearn_progress', JSON.stringify(newProgress));
  };

  const awardPoints = (pointValue: number) => {
    const newPoints = points + pointValue;
    setPoints(newPoints);
    localStorage.setItem('hacklearn_points', newPoints.toString());

    // Level up logic
    const newLevel = Math.floor(newPoints / 500) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      localStorage.setItem('hacklearn_level', newLevel.toString());
      addAchievement(`Reached Level ${newLevel}!`);
    }
  };

  const addAchievement = (achievement: string) => {
    if (!achievements.includes(achievement)) {
      const newAchievements = [...achievements, achievement];
      setAchievements(newAchievements);
      localStorage.setItem('hacklearn_achievements', JSON.stringify(newAchievements));
    }
  };

  const getProgressPercent = (totalConcepts: number) => {
    const completed = Object.values(progress).filter(v => v).length;
    return (completed / totalConcepts) * 100;
  };

  return {
    progress,
    points,
    level,
    achievements,
    saveProgress,
    awardPoints,
    addAchievement,
    getProgressPercent,
  };
};
