import { User, Award, TrendingUp, Target, Flame, Clock, Trophy, Star } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { concepts } from '../data/concepts';
import { promptEngineeringConcepts } from '../data/promptEngineeringConcepts';
import { Card } from '../components/ui/Card';
import { Container } from '../components/ui/Container';
import { ActivityHeatmap } from '../components/ui/ActivityHeatmap';
import { StatsCard } from '../components/ui/StatsCard';
import { ProgressRing } from '../components/ui/ProgressRing';
import { AchievementBadge } from '../components/ui/AchievementBadge';

export const AccountPage = () => {
  const {
    progress,
    points,
    level,
    getActivityData,
    getCurrentStreak,
    getRecentActivity
  } = useProgress();

  // Calculate progress statistics
  const allConcepts = [...concepts, ...promptEngineeringConcepts];
  const totalModules = allConcepts.length;
  const completedModules = Object.values(progress).filter(Boolean).length;
  const completionPercentage = Math.round((completedModules / totalModules) * 100);

  // Calculate by category
  const aiMLCompleted = concepts.filter(c => c.category === 'AI/ML Security' && progress[c.id]).length;
  const traditionalCompleted = concepts.filter(c => c.category === 'Traditional Hacking' && progress[c.id]).length;
  const promptEngineeringCompleted = promptEngineeringConcepts.filter(c => progress[c.id]).length;

  // Get activity data
  const activityData = getActivityData();
  const currentStreak = getCurrentStreak();
  const recentActivity = getRecentActivity(5);

  // Calculate XP to next level
  const currentLevelXP = (level - 1) * 500;
  const nextLevelXP = level * 500;
  const xpProgress = points - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;

  // Mock user data (for now)
  const userData = {
    email: 'user@hacklearn.com',
    joinDate: 'January 2025',
    initials: 'HU',
    name: 'HackLearn User'
  };

  // Define achievements (map from achievement strings)
  const achievementList = [
    {
      id: 'first-module',
      title: 'First Steps',
      description: 'Complete your first module',
      icon: 'star' as const,
      color: 'cyan' as const,
      earned: completedModules >= 1,
      earnedDate: completedModules >= 1 ? 'Recently' : undefined
    },
    {
      id: 'ai-ml-master',
      title: 'AI/ML Master',
      description: 'Complete all AI/ML Security modules',
      icon: 'trophy' as const,
      color: 'purple' as const,
      earned: aiMLCompleted === 10,
      earnedDate: aiMLCompleted === 10 ? 'Recently' : undefined
    },
    {
      id: 'traditional-master',
      title: 'Hacking Expert',
      description: 'Complete all Traditional Hacking modules',
      icon: 'medal' as const,
      color: 'cyan' as const,
      earned: traditionalCompleted === 10,
      earnedDate: traditionalCompleted === 10 ? 'Recently' : undefined
    },
    {
      id: 'streak-7',
      title: '7-Day Streak',
      description: 'Learn for 7 consecutive days',
      icon: 'zap' as const,
      color: 'amber' as const,
      earned: currentStreak >= 7,
      earnedDate: currentStreak >= 7 ? 'Recently' : undefined
    },
    {
      id: 'half-way',
      title: 'Half Way There',
      description: 'Complete 50% of all modules',
      icon: 'target' as const,
      color: 'green' as const,
      earned: completionPercentage >= 50,
      earnedDate: completionPercentage >= 50 ? 'Recently' : undefined
    },
    {
      id: 'level-5',
      title: 'Level 5 Reached',
      description: 'Reach level 5',
      icon: 'award' as const,
      color: 'blue' as const,
      earned: level >= 5,
      earnedDate: level >= 5 ? 'Recently' : undefined
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 text-white py-12 mb-8">
        <div className="absolute inset-0 bg-black/20" />
        <Container size="xl">
          <div className="relative flex items-center justify-between flex-wrap gap-6">
            {/* Profile Info */}
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center shadow-2xl">
                <span className="text-3xl font-bold text-white">
                  {userData.initials}
                </span>
              </div>

              {/* User Info */}
              <div>
                <h1 className="text-4xl font-bold mb-1">{userData.name}</h1>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Joined {userData.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6">
              {/* Level Badge */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/30">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-medium opacity-90">Level</span>
                </div>
                <div className="text-3xl font-bold">{level}</div>
                <div className="text-xs opacity-75 mt-1">
                  {xpProgress}/{xpNeeded} XP
                </div>
                {/* XP Progress Bar */}
                <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${(xpProgress / xpNeeded) * 100}%` }}
                  />
                </div>
              </div>

              {/* Streak */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/30">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-5 h-5" />
                  <span className="text-sm font-medium opacity-90">Streak</span>
                </div>
                <div className="text-3xl font-bold">{currentStreak}</div>
                <div className="text-xs opacity-75 mt-1">day{currentStreak !== 1 && 's'}</div>
              </div>

              {/* Points */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/30">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-medium opacity-90">Points</span>
                </div>
                <div className="text-3xl font-bold">{points}</div>
                <div className="text-xs opacity-75 mt-1">total XP</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          {/* Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activity Heatmap */}
            <Card padding="lg">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Activity Timeline
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your learning activity over the past year
                </p>
              </div>
              <ActivityHeatmap activityData={activityData} maxWeeks={52} />
            </Card>

            {/* Category Progress Rings */}
            <Card padding="lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Category Progress
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <ProgressRing
                    value={aiMLCompleted}
                    max={10}
                    size="lg"
                    color="purple"
                    label="AI/ML Security"
                  />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
                    {aiMLCompleted} / 10 modules
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <ProgressRing
                    value={traditionalCompleted}
                    max={10}
                    size="lg"
                    color="cyan"
                    label="Traditional Hacking"
                  />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
                    {traditionalCompleted} / 10 modules
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <ProgressRing
                    value={promptEngineeringCompleted}
                    max={10}
                    size="lg"
                    color="blue"
                    label="Prompt Engineering"
                  />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
                    {promptEngineeringCompleted} / 10 modules
                  </p>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            {recentActivity.length > 0 && (
              <Card padding="lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => {
                    const concept = allConcepts.find(c => c.id === activity.conceptId);
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            Completed: {concept?.title || 'Module'}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {activity.formattedDate}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column (1/3 width) */}
          <div className="space-y-8">
            {/* Overall Progress */}
            <StatsCard
              icon={Target}
              label="Overall Progress"
              value={`${completionPercentage}%`}
              subtitle={`${completedModules} of ${totalModules} modules completed`}
              color="cyan"
              trend={completionPercentage > 50 ? 'up' : 'neutral'}
              trendValue={completionPercentage > 50 ? `${completionPercentage - 50}%` : undefined}
            />

            {/* Achievement Showcase */}
            <Card padding="lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Achievements
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {achievementList.map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    title={achievement.title}
                    description={achievement.description}
                    icon={achievement.icon}
                    color={achievement.color}
                    earned={achievement.earned}
                    earnedDate={achievement.earnedDate}
                  />
                ))}
              </div>
            </Card>

            {/* Next Milestone */}
            <Card padding="lg" className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-900">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg shadow-md">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Next Milestone
                </h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                {completionPercentage < 50
                  ? `Complete ${Math.ceil(totalModules * 0.5) - completedModules} more modules to reach 50%`
                  : completionPercentage < 100
                  ? `Only ${totalModules - completedModules} modules away from 100%!`
                  : 'Congratulations! All modules completed!'}
              </p>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>{completedModules}</span>
                  <span>{totalModules}</span>
                </div>
                <div className="w-full bg-white dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-cyan-500 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            </Card>

            {/* Info Note */}
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
              <p className="text-xs text-blue-900 dark:text-blue-200">
                <strong>Note:</strong> Progress is stored locally in your browser.
                Backend integration for cloud sync coming soon.
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};
