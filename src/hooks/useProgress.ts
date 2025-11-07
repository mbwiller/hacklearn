import { useState, useEffect } from 'react';
import type { Progress } from '../types';

interface ActivityEntry {
  conceptId: number;
  timestamp: string; // ISO date string
  date: string; // YYYY-MM-DD format
}

export const useProgress = () => {
  const [progress, setProgress] = useState<Progress>({});
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [activityHistory, setActivityHistory] = useState<ActivityEntry[]>([]);

  useEffect(() => {
    // Load progress from localStorage (or start fresh)
    const savedProgress = localStorage.getItem('hacklearn_progress');
    const savedPoints = localStorage.getItem('hacklearn_points');
    const savedLevel = localStorage.getItem('hacklearn_level');
    const savedAchievements = localStorage.getItem('hacklearn_achievements');
    const savedActivity = localStorage.getItem('hacklearn_activity');

    if (savedProgress) setProgress(JSON.parse(savedProgress));
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedLevel) setLevel(parseInt(savedLevel));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    if (savedActivity) setActivityHistory(JSON.parse(savedActivity));
  }, []);

  const saveProgress = (conceptId: number, completed: boolean) => {
    const newProgress = { ...progress, [conceptId]: completed };
    setProgress(newProgress);
    localStorage.setItem('hacklearn_progress', JSON.stringify(newProgress));

    // Log activity if marking as completed
    if (completed) {
      const now = new Date();
      const activity: ActivityEntry = {
        conceptId,
        timestamp: now.toISOString(),
        date: now.toISOString().split('T')[0] // YYYY-MM-DD
      };

      const newActivity = [...activityHistory, activity];
      setActivityHistory(newActivity);
      localStorage.setItem('hacklearn_activity', JSON.stringify(newActivity));
    }
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

  // Get activity data for heatmap (date -> count mapping)
  const getActivityData = () => {
    const activityMap: { [date: string]: number } = {};

    activityHistory.forEach(entry => {
      activityMap[entry.date] = (activityMap[entry.date] || 0) + 1;
    });

    return activityMap;
  };

  // Calculate current streak (consecutive days with activity)
  const getCurrentStreak = () => {
    if (activityHistory.length === 0) return 0;

    // Get unique activity dates sorted descending
    const uniqueDates = [...new Set(activityHistory.map(a => a.date))].sort().reverse();

    if (uniqueDates.length === 0) return 0;

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Streak must include today or yesterday
    if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
      return 0;
    }

    let streak = 1;
    let currentDate = new Date(uniqueDates[0]);

    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = new Date(currentDate);
      prevDate.setDate(prevDate.getDate() - 1);
      const prevDateString = prevDate.toISOString().split('T')[0];

      if (uniqueDates[i] === prevDateString) {
        streak++;
        currentDate = new Date(uniqueDates[i]);
      } else {
        break;
      }
    }

    return streak;
  };

  // Get recent activity (last N completions)
  const getRecentActivity = (limit = 5) => {
    return activityHistory
      .slice(-limit)
      .reverse()
      .map(entry => ({
        ...entry,
        formattedDate: new Date(entry.timestamp).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        })
      }));
  };

  return {
    progress,
    points,
    level,
    achievements,
    activityHistory,
    saveProgress,
    awardPoints,
    addAchievement,
    getProgressPercent,
    getActivityData,
    getCurrentStreak,
    getRecentActivity,
  };
};
